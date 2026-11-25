import { dependencies, checkReady, json } from '../lib/strategic-thinking.mjs';
import { workforceBuilder } from '../../src/commerce/strategicThinking.js';
export default async function(request){
  if(request.method!=='GET')return json({message:'Method not allowed.'},405);
  try{const deps=dependencies(process.env,workforceBuilder);await checkReady(deps);return json({ready:true,testMode:deps.config.mode==='test'});}catch{return json({ready:false});}
}
