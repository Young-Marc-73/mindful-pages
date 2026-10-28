import { dependencies, retrieveDownload, json, safeError } from '../lib/strategic-thinking.mjs';
export default async function(request){
  if(request.method!=='POST')return json({message:'Use the private download page after checkout.'},405);
  try{return await retrieveDownload(request,dependencies());}catch(error){return safeError(error);}
}
