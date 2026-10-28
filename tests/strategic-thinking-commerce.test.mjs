import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import Stripe from 'stripe';
import { settings, createCheckout, retrieveDownload, assertPaidSession, checkReady, ZIP_KEY, PRODUCT, RELEASE, TERMS, AccessError } from '../netlify/lib/strategic-thinking.mjs';
import webhook from '../netlify/functions/strategic-thinking-webhook.mjs';
const env={STRATEGIC_THINKING_ENABLED:'true',STRATEGIC_THINKING_MODE:'test',STRIPE_SECRET_KEY:'sk_test_FAKE_FOR_UNIT_TESTS_ONLY',STRATEGIC_THINKING_PRICE_ID:'price_example123',STRIPE_WEBHOOK_SECRET:'whsec_FAKE_FOR_UNIT_TESTS_ONLY',STRATEGIC_THINKING_ORIGIN:'https://test.example'};
const config=settings(env);
const zipBytes=Buffer.from('PK\x03\x04FAKE_TEST_BYTES');
const digest=createHash('sha256').update(zipBytes).digest('hex');
function paid(){return {id:'cs_test_example12345678',livemode:false,mode:'payment',status:'complete',payment_status:'paid',created:Date.now()/1000,metadata:{product:PRODUCT,release:RELEASE,terms_version:TERMS,terms_accepted:'true'},line_items:{has_more:false,data:[{price:{id:config.priceId},quantity:1}]},payment_intent:{status:'succeeded',latest_charge:{refunded:false,amount_refunded:0,disputed:false,paid:true}}};}
function dependencies(){return {config,stripe:{prices:{retrieve:async()=>({active:true,currency:'usd',unit_amount:4900,type:'one_time',livemode:false})},checkout:{sessions:{create:async data=>({url:'https://checkout.stripe.com/c/pay/test_session',input:data}),retrieve:async()=>paid()}}},store:{getMetadata:async()=>({metadata:{version:RELEASE,sha256:digest}}),get:async()=>zipBytes}};}
function request(data,origin=config.origin,type='application/json'){return new Request('https://test.example/.netlify/functions/example',{method:'POST',headers:{origin,'content-type':type},body:type==='application/json'?JSON.stringify(data):new URLSearchParams(data)});}
const expectError=(fn,status)=>assert.rejects(fn,e=>e instanceof AccessError&&e.status===status);

test('checkout stays closed when configuration is disabled or inconsistent',()=>{
 for(const changes of [{STRATEGIC_THINKING_ENABLED:'false'},{STRIPE_SECRET_KEY:''},{STRATEGIC_THINKING_PRICE_ID:''},{STRIPE_WEBHOOK_SECRET:''},{STRATEGIC_THINKING_MODE:'live'},{STRATEGIC_THINKING_ORIGIN:'https://test.example/path'},{STRATEGIC_THINKING_ORIGIN:'http://untrusted.example'}])assert.throws(()=>settings({...env,...changes}),AccessError);
 assert.equal(settings({...env,STRATEGIC_THINKING_MODE:'live',STRIPE_SECRET_KEY:'rk_live_FAKE_FOR_UNIT_TESTS_ONLY',STRATEGIC_THINKING_ORIGIN:'https://mindfulpages.app'}).mode,'live');
});
test('checkout rejects wrong origins and absent or stale terms acceptance',async()=>{
 await expectError(()=>createCheckout(request({acceptedTerms:true,termsVersion:TERMS},'https://evil.example'),dependencies()),403);
 for(const data of [{},{acceptedTerms:'true',termsVersion:TERMS},{acceptedTerms:true,termsVersion:'old'}])await expectError(()=>createCheckout(request(data),dependencies()),400);
});
test('checkout refuses missing file, wrong release metadata or mismatched price',async()=>{
 for(const result of [null,{metadata:{version:'old',sha256:digest}},{metadata:{version:RELEASE}}]){const d=dependencies();d.store.getMetadata=async()=>result;await expectError(()=>checkReady(d),503);}
 for(const changes of [{active:false},{currency:'eur'},{unit_amount:100},{type:'recurring'},{livemode:true}]){const d=dependencies();const base=await d.stripe.prices.retrieve();d.stripe.prices.retrieve=async()=>({...base,...changes});await expectError(()=>checkReady(d),503);}
});
test('server chooses exact one-time price and records scoped terms acceptance',async()=>{
 const d=dependencies();let input;d.stripe.checkout.sessions.create=async body=>{input=body;return {url:'https://checkout.stripe.com/c/pay/test_session'};};
 await createCheckout(request({acceptedTerms:true,termsVersion:TERMS,amount:1,priceId:'price_attacker',success_url:'https://evil.example'}),d);
 assert.equal(input.mode,'payment');assert.deepEqual(input.line_items,[{price:config.priceId,quantity:1}]);assert.equal(input.metadata.product,PRODUCT);assert.equal(input.metadata.terms_version,TERMS);assert.equal(input.metadata.terms_accepted,'true');assert.equal(input.success_url,'https://test.example/strategic-thinking/download?session_id={CHECKOUT_SESSION_ID}');
});
test('payment gate rejects unpaid, wrong-mode, wrong-product and unconsented sessions',()=>{
 const changes=[{payment_status:'unpaid'},{status:'open'},{livemode:true},{mode:'subscription'},{metadata:{}},{metadata:{...paid().metadata,product:'other'}},{metadata:{...paid().metadata,release:'old'}},{metadata:{...paid().metadata,terms_accepted:'false'}}];
 for(const change of changes)assert.throws(()=>assertPaidSession({...paid(),...change},config),AccessError);
});
test('payment gate rejects a different product price, excess items or wrong quantity',()=>{
 for(const line_items of [{has_more:true,data:paid().line_items.data},{has_more:false,data:[]},{has_more:false,data:[{price:{id:'price_other'},quantity:1}]},{has_more:false,data:[{price:{id:config.priceId},quantity:2}]}])assert.throws(()=>assertPaidSession({...paid(),line_items},config),AccessError);
});
test('refunds, partial refunds, disputes, failed charges and expired references lose download access',()=>{
 for(const charge of [{...paid().payment_intent.latest_charge,refunded:true},{...paid().payment_intent.latest_charge,amount_refunded:1},{...paid().payment_intent.latest_charge,disputed:true},{...paid().payment_intent.latest_charge,paid:false}])assert.throws(()=>assertPaidSession({...paid(),payment_intent:{status:'succeeded',latest_charge:charge}},config),AccessError);
 for(const payment_intent of ['pi_unexpanded',null,{status:'processing',latest_charge:paid().payment_intent.latest_charge}])assert.throws(()=>assertPaidSession({...paid(),payment_intent},config),AccessError);
 assert.throws(()=>assertPaidSession({...paid(),created:Date.now()/1000-8*86400},config),AccessError);
});
test('valid paid session receives a ZIP with private noncacheable headers',async()=>{
 const response=await retrieveDownload(request({sessionId:paid().id}),dependencies());
 assert.equal(response.headers.get('content-type'),'application/zip');assert.match(response.headers.get('cache-control'),/no-store/);assert.equal(response.headers.get('referrer-policy'),'no-referrer');assert.deepEqual(Buffer.from(await response.arrayBuffer()),zipBytes);
});
test('status verification gives no source URL or ZIP contents',async()=>{
 const response=await retrieveDownload(request({sessionId:paid().id,action:'verify'}),dependencies());assert.deepEqual(await response.json(),{ready:true,version:RELEASE});
});
test('missing or forged purchase references fail before any file read',async()=>{
 for(const id of ['',null,'cs_test_x','../../secret']){const d=dependencies();d.store.get=async()=>{throw new Error('File must not be read');};await expectError(()=>retrieveDownload(request({sessionId:id}),d),400);}
 const d=dependencies();d.stripe.checkout.sessions.retrieve=async()=>{throw {type:'StripeInvalidRequestError'};};await expectError(()=>retrieveDownload(request({sessionId:paid().id}),d),403);
});
test('file absence and integrity mismatch fail without returning bytes',async()=>{
 const missing=dependencies();missing.store.getMetadata=async()=>null;await expectError(()=>retrieveDownload(request({sessionId:paid().id}),missing),503);
 const corrupt=dependencies();corrupt.store.get=async()=>Buffer.from('corrupt');await expectError(()=>retrieveDownload(request({sessionId:paid().id}),corrupt),503);
});
test('browser download form posts bearer reference in body, not a public link',async()=>{
 const response=await retrieveDownload(request({sessionId:paid().id},config.origin,'application/x-www-form-urlencoded'),dependencies());assert.equal(response.status,200);
});
test('Stripe webhook rejects invalid signatures and accepts signed irrelevant events without side effects',async()=>{
 const oldKey=process.env.STRIPE_SECRET_KEY,oldSecret=process.env.STRIPE_WEBHOOK_SECRET;
 process.env.STRIPE_SECRET_KEY=env.STRIPE_SECRET_KEY;process.env.STRIPE_WEBHOOK_SECRET=env.STRIPE_WEBHOOK_SECRET;
 try{
  assert.equal((await webhook(new Request('https://test.example/webhook',{method:'POST',body:'{}'}))).status,400);
  const payload=JSON.stringify({id:'evt_test',object:'event',type:'payment_intent.created',data:{object:{}}});
  const signature=Stripe.webhooks.generateTestHeaderString({payload,secret:env.STRIPE_WEBHOOK_SECRET});
  assert.equal((await webhook(new Request('https://test.example/webhook',{method:'POST',headers:{'stripe-signature':signature},body:payload}))).status,200);
 }finally{if(oldKey===undefined)delete process.env.STRIPE_SECRET_KEY;else process.env.STRIPE_SECRET_KEY=oldKey;if(oldSecret===undefined)delete process.env.STRIPE_WEBHOOK_SECRET;else process.env.STRIPE_WEBHOOK_SECRET=oldSecret;}
});
test('all functions reject unsupported methods',async()=>{
 for(const file of ['checkout','download','status','webhook']){const fn=(await import(`../netlify/functions/strategic-thinking-${file}.mjs`)).default;const method=file==='status'?'POST':'GET';const response=await fn(new Request('https://test.example',{method}));assert.equal(response.status,405);}
});
test('public source does not include paid package or private keys',async()=>{
 async function walk(dir){for(const file of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+file.name;if(file.isDirectory())await walk(path);else {assert.ok(!file.name.endsWith('.zip'),'ZIP must stay private');const data=await readFile(path);assert.ok(!data.includes(Buffer.from('sk_live_')),'No live key marker in public assets');}}}
 await walk('public');
 const html=await readFile('index.html','utf8');assert.ok(html.indexOf('purchaseUrl.searchParams.delete')<html.indexOf('fonts.googleapis.com'));assert.ok(html.includes('history.replaceState'));
});
