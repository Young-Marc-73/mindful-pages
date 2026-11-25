import Stripe from 'stripe';
import { getStore } from '@netlify/blobs';
import { createHash, randomBytes } from 'node:crypto';
import { strategicThinking, workforceBuilder } from '../../src/commerce/strategicThinking.js';

export const PRODUCT = 'mindful-pages-strategic-thinking';
export const RELEASE = strategicThinking.version;
export const TERMS = strategicThinking.termsVersion;
export const ZIP_KEY = `strategic-thinking-${RELEASE}.zip`;
export const PRIVATE_HEADERS = { 'Cache-Control':'private, no-store', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff', 'X-Robots-Tag':'noindex, nofollow' };
export class AccessError extends Error { constructor(status,message){super(message);this.status=status;} }
export function json(data,status=200){return Response.json(data,{status,headers:PRIVATE_HEADERS});}
const details = config => config.product || strategicThinking;
const productId = config => `mindful-pages-${details(config).slug}`;
const zipKey = config => `${details(config).slug}-${details(config).version}.zip`;
// Sandbox orders must never deliver commercial archives. This tiny ZIP contains only a QA README.
const QA_ARCHIVE=Buffer.from('UEsDBBQAAAAIAM6keF11Yb5hcQAAAIwAAAAKABwAUkVBRE1FLnR4dFVUCQADEzwGaxM8Bmt1eAsAAQToAwAABOgDAAANjMENAjEMBP9UsQ1wPVAAEkg0ENk+YpHYKHEi0j357WhGe1fjcxQ80ls6KAt9fASeN5z6i9HkwCtrR2qUdQrILZJah/netUojTQXf5jwokIyx641TWRhuZSEcU5qeC13rKCm2COlxrc4ClrKP2zouf1BLAQIeAxQAAAAIAM6keF11Yb5hcQAAAIwAAAAKABgAAAAAAAEAAACkgQAAAABSRUFETUUudHh0VVQFAAMTPAZrdXgLAAEE6AMAAAToAwAAUEsFBgAAAAABAAEAUAAAALUAAAAAAA==','base64');
const QA_SHA=createHash('sha256').update(QA_ARCHIVE).digest('hex');
export function storageNames(config){const test=config.mode==='test';return {downloads:test?'qa-paid-downloads':'paid-downloads',orders:`${test?'qa-':''}${details(config).slug}-orders`};}
export async function seedQaArchive(config,store){
  if(config.mode!=='test')return;
  const key=zipKey(config);
  let metadata=await store.getMetadata(key);
  if(!metadata){await store.set(key,QA_ARCHIVE,{onlyIfNew:true,metadata:{version:details(config).version,sha256:QA_SHA}});metadata=await store.getMetadata(key);}
  if(metadata?.metadata?.sha256!==QA_SHA || metadata.metadata.version!==details(config).version)throw new AccessError(503,'Sandbox archive is not ready.');
}
export function settings(env=process.env, product=strategicThinking) {
  const prefix=product.slug.replaceAll('-','_').toUpperCase();
  const mode=env[`${prefix}_MODE`] || env.STRATEGIC_THINKING_MODE;
  const key=env.STRIPE_SECRET_KEY || '';
  let origin;
  try { const u=new URL(env.STRATEGIC_THINKING_ORIGIN || 'https://mindfulpages.app'); if(u.pathname!=='/'||u.search||u.hash||u.username||u.password)throw new Error();origin=u.origin; } catch {throw new AccessError(503,'Checkout is not open yet.');}
  if(!['test','live'].includes(mode) || !new RegExp(`^(sk|rk)_${mode}_`).test(key) || !/^price_[A-Za-z0-9]+$/.test(env[`${prefix}_PRICE_ID`]||'') || !env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_')) throw new AccessError(503,'Checkout is not open yet.');
  if(mode==='live' && origin!=='https://mindfulpages.app')throw new AccessError(503,'Checkout is not open yet.');
  if(mode==='test' && origin==='https://mindfulpages.app')throw new AccessError(503,'Checkout is not open yet.');
  if(mode==='test' && !origin.startsWith('https://') && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))throw new AccessError(503,'Checkout is not open yet.');
  return {product,salesOpen:env[`${prefix}_ENABLED`]==='true',reviewCodes:env[`${prefix}_REVIEW_CODES`]==='true',mode,key,origin,priceId:env[`${prefix}_PRICE_ID`],webhookSecret:env.STRIPE_WEBHOOK_SECRET,automaticTax:env.STRATEGIC_THINKING_AUTOMATIC_TAX==='true'};
}
export function dependencies(env=process.env,product=strategicThinking){const config=settings(env,product),names=storageNames(config),store=getStore({name:names.downloads,consistency:'strong'});return {config,stripe:new Stripe(config.key,{maxNetworkRetries:1,timeout:12000}),store,orders:getStore({name:names.orders,consistency:'strong'}),...(config.mode==='test'?{seedQa:()=>seedQaArchive(config,store)}:{})};}
export function checkOrigin(request,config){if(request.headers.get('origin')!==config.origin)throw new AccessError(403,'Please use the checkout or download page on Mindful Pages.');}
export async function parseBody(request){
  if(Number(request.headers.get('content-length')||0)>4096)throw new AccessError(413,'Request is too large.');
  const type=request.headers.get('content-type')||'';
  const body=await request.text();if(body.length>4096)throw new AccessError(413,'Request is too large.');
  try {return type.includes('application/json')?JSON.parse(body):Object.fromEntries(new URLSearchParams(body));}catch{throw new AccessError(400,'Please try again from the product page.');}
}
export async function checkReady({config,stripe,store,seedQa}){
  if(!config.salesOpen)throw new AccessError(503,'Checkout is not open yet.');
  if(config.mode==='test' && seedQa)await seedQa();
  const entry=await store.getMetadata(zipKey(config));
  if(!entry || entry.metadata?.version!==details(config).version || !/^[a-f0-9]{64}$/.test(entry.metadata?.sha256||''))throw new AccessError(503,'The download is being prepared. Purchases are not open yet.');
  const price=await stripe.prices.retrieve(config.priceId);
  if(!price.active || price.currency!=='usd' || price.unit_amount!==4900 || price.type!=='one_time' || price.livemode!==(config.mode==='live'))throw new AccessError(503,'Checkout is not open yet.');
  return entry;
}
export async function createCheckout(request,deps){
  checkOrigin(request,deps.config);
  const body=await parseBody(request);
  const p=details(deps.config), id=productId(deps.config);
  if(body.acceptedTerms!==true || body.termsVersion!==p.termsVersion)throw new AccessError(400,'Please read and accept the current digital product license.');
  await checkReady(deps);
  const session=await deps.stripe.checkout.sessions.create({
    integration_identifier:'mindfulpages-strategic-'+Array.from(randomBytes(8),b=>String.fromCharCode(97+b%26)).join(''),
    mode:'payment',line_items:[{price:deps.config.priceId,quantity:1}],
    success_url:`${deps.config.origin}${p.path}/download?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`${deps.config.origin}${p.path}#get-the-system`,
    ...(deps.config.reviewCodes ? {allow_promotion_codes:true} : {}),
    automatic_tax:{enabled:deps.config.automaticTax},
    metadata:{product:id,release:p.version,terms_version:p.termsVersion,terms_accepted:'true',terms_accepted_at:new Date().toISOString(),...(deps.config.reviewCodes?{review_codes:'true'}:{})},
    payment_intent_data:{metadata:{product:id,release:p.version}},
    custom_text:{submit:{message:'Download on the confirmation page after payment. Please save the file before closing that page. Contact Mindful Pages if you need help recovering your purchase.'}},
  });
  if(!/^https:\/\/checkout\.stripe\.com\//.test(session.url||''))throw new AccessError(503,'Checkout is unavailable. Please try again.');
  return {url:session.url};
}
export function assertPaidSession(session,config,{allowExpired=false}={}){
  const p=details(config);
  const complimentary=session.payment_status==='no_payment_required' && session.metadata?.review_codes==='true' && session.currency==='usd' && session.amount_subtotal===4900 && session.amount_total===0 && session.total_details?.amount_discount===4900 && session.payment_intent===null;
  if(session.livemode!==(config.mode==='live') || session.mode!=='payment' || session.status!=='complete' || (session.payment_status!=='paid'&&!complimentary))throw new AccessError(403,'Order is not confirmed yet. Please return after it completes, or contact Marc with your receipt.');
  if(session.metadata?.product!==productId(config) || session.metadata?.release!==p.version || session.metadata?.terms_version!==p.termsVersion || session.metadata?.terms_accepted!=='true')throw new AccessError(403,'This purchase does not include the requested download.');
  const items=session.line_items;
  if(!items || items.has_more || items.data?.length!==1 || items.data[0].price?.id!==config.priceId || items.data[0].quantity!==1)throw new AccessError(403,'This purchase does not include the requested download.');
  const intent=session.payment_intent;
  const charge=typeof intent==='object'&&intent?.latest_charge;
  if(!complimentary&&(!intent || typeof intent!=='object' || intent.status!=='succeeded' || !charge || typeof charge!=='object' || charge.refunded || charge.amount_refunded>0 || charge.disputed || charge.paid!==true))throw new AccessError(403,'Download access needs review. Please contact Marc with your receipt.');
  // Seven days limits the lifetime of the bearer purchase link, not the license.
  if(!Number.isFinite(session.created) || (!allowExpired && Date.now()/1000-session.created>7*86400))throw new AccessError(403,'This download link has expired. Please contact Marc with your receipt to recover your purchase; do not buy again.');
}
export async function recordFulfillment(session,deps,{allowExpired=false}={}) {
  assertPaidSession(session,deps.config,{allowExpired});
  const id=createHash('sha256').update(session.id).digest('hex');
  await deps.orders.setJSON(id,{sessionId:session.id,product:productId(deps.config),release:details(deps.config).version,termsVersion:session.metadata.terms_version,termsAccepted:true,termsAcceptedAt:session.metadata.terms_accepted_at||null,created:session.created,paymentStatus:session.payment_status,amountTotal:session.amount_total,currency:session.currency,live:session.livemode,downloadKey:zipKey(deps.config),deliveryStatus:'authorized'});
}
export async function retrieveDownload(request,deps){
  checkOrigin(request,deps.config);
  const body=await parseBody(request);
  if(typeof body.sessionId!=='string' || !/^cs_(test|live)_[A-Za-z0-9]{8,240}$/.test(body.sessionId))throw new AccessError(400,'Your purchase reference is missing or invalid.');
  let session;
  try {session=await deps.stripe.checkout.sessions.retrieve(body.sessionId,{expand:['line_items','payment_intent.latest_charge']});}
  catch(e){if(e.statusCode===404 || e.type==='StripeInvalidRequestError')throw new AccessError(403,'We could not confirm this purchase. Please contact Marc with your receipt.');throw e;}
  await recordFulfillment(session,deps);
  const key=zipKey(deps.config), p=details(deps.config);
  const entry=await deps.store.getMetadata(key);
  if(!entry)throw new AccessError(503,'Your payment is confirmed, but the file is temporarily unavailable. Please contact Marc; do not buy again.');
  if(deps.config.mode==='test' && deps.seedQa && entry.metadata?.sha256!==QA_SHA)throw new AccessError(503,'Sandbox archive is not ready.');
  if(body.action==='verify')return json({ready:true,version:p.version});
  const bytes=await deps.store.get(key,{type:'arrayBuffer'});
  if(!bytes || createHash('sha256').update(new Uint8Array(bytes)).digest('hex')!==entry.metadata?.sha256)throw new AccessError(503,'The download needs attention. Please contact Marc; do not buy again.');
  return new Response(bytes,{headers:{...PRIVATE_HEADERS,'Content-Type':'application/zip','Content-Disposition':`attachment; filename="${deps.config.mode==='test'?'TEST-ONLY-':''}${p.name.replaceAll(' ','-')}-${p.version}.zip"`}});
}
export function safeError(error){
  // Never log request bodies, keys, session IDs, full Stripe errors or purchase URLs.
  if(error instanceof AccessError)return json({message:error.message},error.status);
  console.error('Strategic Thinking request failed:',error.type||error.name||'Error');
  return json({message:'This service is temporarily unavailable. Please try again or contact Marc with your receipt.'},503);
}
