import Stripe from 'stripe';
import { dependencies, recordFulfillment, json, PRIVATE_HEADERS, runtimeEnv } from '../lib/strategic-thinking.mjs';
import { strategicThinking, workforceBuilder } from '../../src/commerce/strategicThinking.js';
export default async function(request){
 if(request.method!=='POST')return json({message:'Method not allowed.'},405);
 let env;try{env=runtimeEnv(process.env);}catch{return json({message:'Not configured.'},503);}
 const key=env.STRIPE_SECRET_KEY,secret=env.STRIPE_WEBHOOK_SECRET;
 if(!key || !secret)return json({message:'Not configured.'},503);
 let event;
 try {const stripe=new Stripe(key);event=stripe.webhooks.constructEvent(await request.text(),request.headers.get('stripe-signature')||'',secret);}catch{return json({message:'Invalid signature.'},400);}
 if(!['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type))return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 const source=event.data.object;
 const product=[strategicThinking,workforceBuilder].find(p=>source.metadata?.product===`mindful-pages-${p.slug}`&&source.metadata?.release===p.version&&source.metadata?.terms_version===p.termsVersion);
 if(!product || !['paid','no_payment_required'].includes(source.payment_status))return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 try {
  const deps=dependencies(env,product);
  const session=await deps.stripe.checkout.sessions.retrieve(source.id,{expand:['line_items','payment_intent.latest_charge']});
  // A signed event is a trigger; current Stripe state and the exact price authorize fulfillment.
  // Record delivery entitlement even if the customer never reaches the return page.
  await recordFulfillment(session,deps,{allowExpired:true});
  return new Response(null,{status:200,headers:PRIVATE_HEADERS});
 } catch {return json({message:'Please retry.'},503);}
}
