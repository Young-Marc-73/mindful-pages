import { dependencies, createCheckout, json, safeError } from '../lib/strategic-thinking.mjs';
export default async function(request){
  if(request.method!=='POST')return json({message:'Method not allowed.'},405);
  try{return json(await createCheckout(request,dependencies()));}catch(error){return safeError(error);}
}
