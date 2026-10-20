import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { routes, render } from '../.prerender/entry-server.js';
const template=await readFile('dist/index.html','utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const [path,[title,description]] of Object.entries(routes)){
 const url='https://mindfulpages.app'+path;
 let html=template.replace('<div id="root"></div>',()=>'<div id="root">'+render(path)+'</div>');
 html=html.replace(/<title>.*?<\/title>/s,'<title>'+escape(title)+' | Mindful Pages</title>')
 .replace(/(<meta\s+name="description"\s+content=")[^"]*/,'$1'+escape(description))
 .replace(/(<link rel="canonical" href=")[^"]*/,'$1'+url)
 .replace(/(<meta property="og:title" content=")[^"]*/,'$1'+escape(title+' | Mindful Pages'))
 .replace(/(<meta property="og:description" content=")[^"]*/,'$1'+escape(description))
 .replace(/(<meta property="og:url" content=")[^"]*/,'$1'+url);
 await mkdir('dist'+path,{recursive:true});await writeFile('dist'+path+'/index.html',html);
}
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['/',...Object.keys(routes)].map(p=>'<url><loc>https://mindfulpages.app'+p+'</loc></url>').join('')+'</urlset>');
console.log('Prerendered '+Object.keys(routes).length+' dedicated pages with unique metadata.');
