import Stripe from 'stripe';
import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';
import { PRODUCT, RELEASE, TERMS, json, PRIVATE_HEADERS } from '../lib/strategic-thinking.mjs';
export default async function(request){
 if(request.method!=='POST')return json({message:'Method not allowed.'},405);
 const key=process.env.STRIPE_SECRET_KEY,secret=process.env.STRIPE_WEBHOOK_SECRET;
 if(!key || !secret)return json({message:'Not configured.'},503);
 let event;
 try {const stripe=new Stripe(key);event=stripe.webhooks.constructEvent(await request.text(),request.headers.get('stripe-signature')||'',secret);}catch{return json({message:'Invalid signature.'},400);}
 if(!['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type))return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 const session=event.data.object;
 if(session.metadata?.product!==PRODUCT || session.metadata?.release!==RELEASE || session.metadata?.terms_version!==TERMS || session.payment_status!=='paid')return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 try {
  const store=getStore({name:'strategic-thinking-orders',consistency:'strong'});
  // Repeated events write the same small record. Do not email or grant unrelated privileges.
  const id=createHash('sha256').update(session.id).digest('hex');
  await store.setJSON(id,{sessionId:session.id,product:PRODUCT,release:RELEASE,termsVersion:session.metadata.terms_version,termsAccepted:session.metadata.terms_accepted==='true',termsAcceptedAt:session.metadata.terms_accepted_at,created:session.created,paymentStatus:session.payment_status,amountTotal:session.amount_total,currency:session.currency,live:session.livemode});
  return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 } catch {return json({message:'Please retry.'},503);}
}
