import { dependencies, checkReady, json } from '../lib/strategic-thinking.mjs';
import { workforceBuilder } from '../../src/commerce/strategicThinking.js';
export default async function(request){
  if(request.method!=='GET')return json({message:'Method not allowed.'},405);
  try{await checkReady(dependencies(process.env,workforceBuilder));return json({ready:true});}catch{return json({ready:false});}
}
