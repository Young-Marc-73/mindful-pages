import { dependencies, checkReady, json } from '../lib/strategic-thinking.mjs';
export default async function(request){
  if(request.method!=='GET')return json({message:'Method not allowed.'},405);
  try{await checkReady(dependencies());return json({ready:true});}catch{return json({ready:false});}
}
