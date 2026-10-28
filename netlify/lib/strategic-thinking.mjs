import Stripe from 'stripe';
import { getStore } from '@netlify/blobs';
import { createHash, randomBytes } from 'node:crypto';
import { strategicThinking } from '../../src/commerce/strategicThinking.js';

export const PRODUCT = 'mindful-pages-strategic-thinking';
export const RELEASE = strategicThinking.version;
export const TERMS = strategicThinking.termsVersion;
export const ZIP_KEY = `strategic-thinking-${RELEASE}.zip`;
export const PRIVATE_HEADERS = { 'Cache-Control':'private, no-store', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff', 'X-Robots-Tag':'noindex, nofollow' };
export class AccessError extends Error { constructor(status,message){super(message);this.status=status;} }
export function json(data,status=200){return Response.json(data,{status,headers:PRIVATE_HEADERS});}
export function settings(env=process.env) {
  const mode=env.STRATEGIC_THINKING_MODE;
  const key=env.STRIPE_SECRET_KEY || '';
  let origin;
  try { const u=new URL(env.STRATEGIC_THINKING_ORIGIN || 'https://mindfulpages.app'); if(u.pathname!=='/'||u.search||u.hash||u.username||u.password)throw new Error();origin=u.origin; } catch {throw new AccessError(503,'Checkout is not open yet.');}
  if(!['test','live'].includes(mode) || !new RegExp(`^(sk|rk)_${mode}_`).test(key) || !/^price_[A-Za-z0-9]+$/.test(env.STRATEGIC_THINKING_PRICE_ID||'') || !env.STRIPE_WEBHOOK_SECRET?.startsWith('whsec_')) throw new AccessError(503,'Checkout is not open yet.');
  if(mode==='live' && origin!=='https://mindfulpages.app')throw new AccessError(503,'Checkout is not open yet.');
  if(mode==='test' && !origin.startsWith('https://') && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))throw new AccessError(503,'Checkout is not open yet.');
  return {salesOpen:env.STRATEGIC_THINKING_ENABLED==='true',mode,key,origin,priceId:env.STRATEGIC_THINKING_PRICE_ID,webhookSecret:env.STRIPE_WEBHOOK_SECRET,automaticTax:env.STRATEGIC_THINKING_AUTOMATIC_TAX==='true'};
}
export function dependencies(env=process.env){const config=settings(env);return {config,stripe:new Stripe(config.key,{maxNetworkRetries:1,timeout:12000}),store:getStore({name:'paid-downloads',consistency:'strong'}),orders:getStore({name:'strategic-thinking-orders',consistency:'strong'})};}
export function checkOrigin(request,config){if(request.headers.get('origin')!==config.origin)throw new AccessError(403,'Please use the checkout or download page on Mindful Pages.');}
export async function parseBody(request){
  if(Number(request.headers.get('content-length')||0)>4096)throw new AccessError(413,'Request is too large.');
  const type=request.headers.get('content-type')||'';
  const body=await request.text();if(body.length>4096)throw new AccessError(413,'Request is too large.');
  try {return type.includes('application/json')?JSON.parse(body):Object.fromEntries(new URLSearchParams(body));}catch{throw new AccessError(400,'Please try again from the product page.');}
}
export async function checkReady({config,stripe,store}){
  if(!config.salesOpen)throw new AccessError(503,'Checkout is not open yet.');
  const entry=await store.getMetadata(ZIP_KEY);
  if(!entry || entry.metadata?.version!==RELEASE || !/^[a-f0-9]{64}$/.test(entry.metadata?.sha256||''))throw new AccessError(503,'The download is being prepared. Purchases are not open yet.');
  const price=await stripe.prices.retrieve(config.priceId);
  if(!price.active || price.currency!=='usd' || price.unit_amount!==4900 || price.type!=='one_time' || price.livemode!==(config.mode==='live'))throw new AccessError(503,'Checkout is not open yet.');
  return entry;
}
export async function createCheckout(request,deps){
  checkOrigin(request,deps.config);
  const body=await parseBody(request);
  if(body.acceptedTerms!==true || body.termsVersion!==TERMS)throw new AccessError(400,'Please read and accept the current digital product license.');
  await checkReady(deps);
  const session=await deps.stripe.checkout.sessions.create({
    integration_identifier:'mindfulpages-strategic-'+Array.from(randomBytes(8),b=>String.fromCharCode(97+b%26)).join(''),
    mode:'payment',line_items:[{price:deps.config.priceId,quantity:1}],
    success_url:`${deps.config.origin}/strategic-thinking/download?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`${deps.config.origin}/strategic-thinking#get-the-system`,
    automatic_tax:{enabled:deps.config.automaticTax},
    metadata:{product:PRODUCT,release:RELEASE,terms_version:TERMS,terms_accepted:'true',terms_accepted_at:new Date().toISOString()},
    payment_intent_data:{metadata:{product:PRODUCT,release:RELEASE}},
    custom_text:{submit:{message:'Download on the confirmation page after payment. Please save the file before closing that page. Contact Mindful Pages if you need help recovering your purchase.'}},
  });
  if(!/^https:\/\/checkout\.stripe\.com\//.test(session.url||''))throw new AccessError(503,'Checkout is unavailable. Please try again.');
  return {url:session.url};
}
export function assertPaidSession(session,config,{allowExpired=false}={}){
  if(session.livemode!==(config.mode==='live') || session.mode!=='payment' || session.status!=='complete' || session.payment_status!=='paid')throw new AccessError(403,'Payment is not confirmed yet. Please return after it completes, or contact Marc with your receipt.');
  if(session.metadata?.product!==PRODUCT || session.metadata?.release!==RELEASE || session.metadata?.terms_version!==TERMS || session.metadata?.terms_accepted!=='true')throw new AccessError(403,'This purchase does not include the requested download.');
  const items=session.line_items;
  if(!items || items.has_more || items.data?.length!==1 || items.data[0].price?.id!==config.priceId || items.data[0].quantity!==1)throw new AccessError(403,'This purchase does not include the requested download.');
  const intent=session.payment_intent;
  const charge=typeof intent==='object'&&intent?.latest_charge;
  if(!intent || typeof intent!=='object' || intent.status!=='succeeded' || !charge || typeof charge!=='object' || charge.refunded || charge.amount_refunded>0 || charge.disputed || charge.paid!==true)throw new AccessError(403,'Download access needs review. Please contact Marc with your receipt.');
  // Seven days limits the lifetime of the bearer purchase link, not the license.
  if(!Number.isFinite(session.created) || (!allowExpired && Date.now()/1000-session.created>7*86400))throw new AccessError(403,'This download link has expired. Please contact Marc with your receipt to recover your purchase; do not buy again.');
}
export async function recordFulfillment(session,deps,{allowExpired=false}={}) {
  assertPaidSession(session,deps.config,{allowExpired});
  const id=createHash('sha256').update(session.id).digest('hex');
  await deps.orders.setJSON(id,{sessionId:session.id,product:PRODUCT,release:RELEASE,termsVersion:session.metadata.terms_version,termsAccepted:true,termsAcceptedAt:session.metadata.terms_accepted_at||null,created:session.created,paymentStatus:session.payment_status,amountTotal:session.amount_total,currency:session.currency,live:session.livemode,downloadKey:ZIP_KEY,deliveryStatus:'authorized'});
}
export async function retrieveDownload(request,deps){
  checkOrigin(request,deps.config);
  const body=await parseBody(request);
  if(typeof body.sessionId!=='string' || !/^cs_(test|live)_[A-Za-z0-9]{8,240}$/.test(body.sessionId))throw new AccessError(400,'Your purchase reference is missing or invalid.');
  let session;
  try {session=await deps.stripe.checkout.sessions.retrieve(body.sessionId,{expand:['line_items','payment_intent.latest_charge']});}
  catch(e){if(e.statusCode===404 || e.type==='StripeInvalidRequestError')throw new AccessError(403,'We could not confirm this purchase. Please contact Marc with your receipt.');throw e;}
  await recordFulfillment(session,deps);
  const entry=await deps.store.getMetadata(ZIP_KEY);
  if(!entry)throw new AccessError(503,'Your payment is confirmed, but the file is temporarily unavailable. Please contact Marc; do not buy again.');
  if(body.action==='verify')return json({ready:true,version:RELEASE});
  const bytes=await deps.store.get(ZIP_KEY,{type:'arrayBuffer'});
  if(!bytes || createHash('sha256').update(new Uint8Array(bytes)).digest('hex')!==entry.metadata?.sha256)throw new AccessError(503,'The download needs attention. Please contact Marc; do not buy again.');
  return new Response(bytes,{headers:{...PRIVATE_HEADERS,'Content-Type':'application/zip','Content-Disposition':`attachment; filename="Strategic-Thinking-System-${RELEASE}.zip"`}});
}
export function safeError(error){
  // Never log request bodies, keys, session IDs, full Stripe errors or purchase URLs.
  if(error instanceof AccessError)return json({message:error.message},error.status);
  console.error('Strategic Thinking request failed:',error.type||error.name||'Error');
  return json({message:'This service is temporarily unavailable. Please try again or contact Marc with your receipt.'},503);
}
