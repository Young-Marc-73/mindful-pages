import { renderToString } from 'react-dom/server';
import App from './App';
import { journals } from './data/journals';
import { apps, bookPaths, pageMeta } from './data/pages';
import { resources } from './pages/Resources';
export const routes = {...pageMeta};
for (const j of journals) routes[bookPaths[j.id]]=[j.title,j.description];
for (const a of apps) routes['/apps/'+a.slug]=[a.name,a.description];
for (const [path,r] of Object.entries(resources)) routes[path]=[r.title,r.description];
export function render(path){return renderToString(<App path={path}/>)}
