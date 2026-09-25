import Reveal from "../motion/Reveal";
const choices = [
  ["Learn a practical process for working through decisions", "The Workshop", "strategic-thinking", "Instructional book"],
  ["Find a method for a particular thinking task", "The Repository", "strategic-thinking-repository", "Reference book · 166 methods"],
  ["Develop a working understanding of your own business", "Business Journal", "business-journal", "Guided journal with writing space"],
  ["Keep questions, sources, and study notes together", "Research Journal", "research", "Research journal with open notes"]
];
export default function BookGuide() {
  return <Reveal className="mt-10 rounded-3xl border border-ink/10 bg-cream-soft p-6 sm:p-8"><h3 className="font-serif text-2xl">Which book should I start with?</h3><p className="mt-2 text-sm text-charcoal-muted">Choose one for the work you need to do. You don’t need the whole collection—or the app—to begin.</p><div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-ink/15"><th scope="col" className="py-3 pr-4">If you want to…</th><th scope="col" className="py-3">Start with…</th></tr></thead><tbody>{choices.map(([need,title,id,type])=><tr key={id} className="border-b border-ink/10 last:border-0"><td className="py-4 pr-4 align-top">{need}</td><td className="py-4 align-top"><a href={`#${id}`} className="font-semibold underline decoration-gold underline-offset-4">{title}</a><span className="mt-1 block text-xs text-charcoal-muted">{type}</span></td></tr>)}</tbody></table></div></Reveal>;
}
