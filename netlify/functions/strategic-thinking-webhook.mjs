import Stripe from 'stripe';
import { dependencies, recordFulfillment, PRODUCT, RELEASE, TERMS, json, PRIVATE_HEADERS } from '../lib/strategic-thinking.mjs';
export default async function(request){
 if(request.method!=='POST')return json({message:'Method not allowed.'},405);
 const key=process.env.STRIPE_SECRET_KEY,secret=process.env.STRIPE_WEBHOOK_SECRET;
 if(!key || !secret)return json({message:'Not configured.'},503);
 let event;
 try {const stripe=new Stripe(key);event=stripe.webhooks.constructEvent(await request.text(),request.headers.get('stripe-signature')||'',secret);}catch{return json({message:'Invalid signature.'},400);}
 if(!['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type))return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 const source=event.data.object;
 if(source.metadata?.product!==PRODUCT || source.metadata?.release!==RELEASE || source.metadata?.terms_version!==TERMS || source.payment_status!=='paid')return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 try {
  const deps=dependencies();
  const session=await deps.stripe.checkout.sessions.retrieve(source.id,{expand:['line_items','payment_intent.latest_charge']});
  // A signed event is a trigger; current Stripe state and the exact price authorize fulfillment.
  // Record delivery entitlement even if the customer never reaches the return page.
  await recordFulfillment(session,deps,{allowExpired:true});
  return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 } catch {return json({message:'Please retry.'},503);}
}
