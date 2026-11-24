import { dependencies, retrieveDownload, json, safeError } from '../lib/strategic-thinking.mjs';
import { workforceBuilder } from '../../src/commerce/strategicThinking.js';
export default async function(request){
  if(request.method!=='POST')return json({message:'Use the private download page after checkout.'},405);
  try{return await retrieveDownload(request,dependencies(process.env,workforceBuilder));}catch(error){return safeError(error);}
}
