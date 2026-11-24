import { renderToString } from 'react-dom/server';
import App from './App';
import { journals } from './data/journals';
import { apps, bookPaths, pageMeta } from './data/pages';
import { resources } from './pages/Resources';
export const routes = {...pageMeta,
 '/ai-workforce-builder': ['AI Workforce Builder', 'Build and test an organized AI workforce around your business. $49 early access download.'],
 '/ai-workforce-builder/download': ['Your AI Workforce Builder download', 'Retrieve your digital package.'],
 '/ai-workforce-builder/license': ['AI Workforce Builder license', 'Personal and internal business use and download terms.'],
 '/strategic-thinking': ['Strategic Thinking System for your AI', 'A $49 downloadable thinking process with human review, context questions, 164 tool cards and a four-movement cycle.'],
 '/strategic-thinking/start': ['Set up the Strategic Thinking System', 'Load the instructions, confirm access and begin with one real business question.'],
 '/strategic-thinking/download': ['Your Strategic Thinking download', 'Retrieve your purchased Strategic Thinking System and open the setup guide.'],
 '/strategic-thinking/license': ['Strategic Thinking digital product license', 'Permitted personal and internal business use, source restrictions, purchase information and support.'],
};
for (const j of journals) routes[bookPaths[j.id]]=[j.title,j.description];
for (const a of apps) routes['/apps/'+a.slug]=[a.name,a.description];
for (const [path,r] of Object.entries(resources)) routes[path]=[r.title,r.description];
export function render(path){return renderToString(<App path={path}/>)}
