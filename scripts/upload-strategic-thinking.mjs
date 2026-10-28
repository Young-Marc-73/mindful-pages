// Reads credentials from private stdin JSON; never pass tokens as command arguments.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { ZIP_KEY, RELEASE } from '../netlify/lib/strategic-thinking.mjs';
let input='';for await(const chunk of process.stdin)input+=chunk;
const {siteID,token,file}=JSON.parse(input);
if(!siteID||!token||!file)throw new Error('Private stdin JSON requires siteID, token and absolute ZIP file path.');
const data=await readFile(file);
if(data.length>4*1024*1024 || data.subarray(0,4).toString('hex')!=='504b0304')throw new Error('Expected a ZIP under 4 MiB.');
const store=getStore({name:'paid-downloads',siteID,token,consistency:'strong'});
const sha256=createHash('sha256').update(data).digest('hex');
await store.set(ZIP_KEY,data,{metadata:{version:RELEASE,sha256}});
const entry=await store.getMetadata(ZIP_KEY);
if(entry?.metadata?.sha256!==sha256)throw new Error('Upload verification failed.');
console.log(`Private release ${RELEASE} uploaded and verified (${data.length} bytes).`);
