import { dependencies, checkReady, json } from '../lib/strategic-thinking.mjs';
export default async function(request){
  if(request.method!=='GET')return json({message:'Method not allowed.'},405);
  try{const deps=dependencies();await checkReady(deps);return json({ready:true,testMode:deps.config.mode==='test'});}catch{return json({ready:false});}
}
