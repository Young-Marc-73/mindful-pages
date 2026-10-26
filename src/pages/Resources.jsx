import { ArrowLeft, ArrowRight, Download } from 'lucide-react';

export const resources = {
  '/resources/scope-change-checklist': {
    app: 'ScopeTrack', slug: 'scopetrack', title: 'Before agreeing to extra work',
    description: 'A free six-step scope-change checklist for freelance web designers and small agencies. Clarify the work, price, timing and client decision.',
    intro: 'An extra request deserves a clear conversation. Use these six checks to explain what changes before you begin the additional work.',
    pdf: '/resources/scope-change-checklist.pdf', color: '#586347', tint: '#F4F3EF',
    steps: [
      ['Describe the request', 'Write down what the client wants added or changed. Use concrete deliverables.'],
      ['Compare it with the agreed scope', 'Identify what is already included and which part of the request changes that agreement.'],
      ['Explain the price', 'State the additional charge, or explain explicitly when there is no price change.'],
      ['Explain the effect on timing', 'Show any additional working days, dependencies, or revised delivery date.'],
      ['Present one clear version for review', 'Give the client a specific proposal. Keep revised versions distinguishable.'],
      ['Record the decision before starting', 'Confirm the outcome, preserve the relevant version, and update your working plan.'],
    ],
    conversation: 'Yes, I can look at that. I will set out what changes, the additional price, and the effect on timing so you can review it before I begin.',
    example: 'For example, a five-page website becomes a seven-page website. Describe the two additional pages, the additional charge, and the effect on delivery. Present those details together for the client to review.',
    product: 'ScopeTrack helps you record the agreed scope, present a change with its price and timing, and keep a client decision tied to the proposal version they reviewed.',
    offer: '$15/month plus applicable tax. One-time seven-day trial after email confirmation. No card required; no automatic paid conversion.',
    cta: 'Explore ScopeTrack', other: '/resources/website-client-content-checklist', otherLabel: 'Collecting client materials? Use the website content checklist.',
  },
  '/resources/website-client-content-checklist': {
    app: 'ReadyDesk', slug: 'readydesk', title: 'Before the project begins',
    description: 'A free website client-content checklist for designers and small agencies. Request usable answers and files, review submissions and make the next step clear.',
    intro: 'Give your client a specific starting point. Use these six checks to explain what to send, review what arrives, and identify what still needs attention.',
    pdf: '/resources/website-client-content-checklist.pdf', color: '#275E60', tint: '#F4F5F2',
    steps: [
      ['Confirm the project and main contact', 'Record who supplies the material and who can confirm it is ready to use.'],
      ['List each required item separately', 'Name the logo, page copy, photographs, links, and answers the project needs.'],
      ['Explain what a usable submission looks like', 'Specify the required format, context, or example so the client can respond clearly.'],
      ['Set a useful delivery point', 'Connect the requested date to the work it enables. Confirm dependencies together.'],
      ['Review what arrives', 'Distinguish received material from material that is complete and accepted.'],
      ['Make the next step specific', 'Explain any correction needed, identify missing items, and confirm readiness to begin.'],
    ],
    conversation: 'Here is the material I need to get started. Each request explains what to send. I will review the submissions and let you know what still needs attention.',
    example: 'For example, ask for the logo file, homepage copy and project photographs as separate items. If the copy is incomplete, say what needs correcting while keeping the other outstanding requests visible.',
    product: 'ReadyDesk focuses on collecting client answers and files, reviewing submissions, and seeing what still needs attention.',
    offer: 'Preparing for paid launch. Contact Marc for current availability; public pricing has not been announced on the product page.',
    cta: 'Ask about ReadyDesk', other: '/resources/scope-change-checklist', otherLabel: 'Handling extra work? Use the scope-change checklist.',
  },
};

export default function ResourcePage({ resource: r }) {
  return <article className="container-page pb-20">
    <a href={'/apps/'+r.slug} className="mb-8 inline-flex items-center gap-2 text-sm underline"><ArrowLeft size={15}/> About {r.app}</a>
    <header className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{color:r.color}}>Free practical resource / {r.app} by Mindful Pages</p>
      <h1 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">{r.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-charcoal-muted">{r.intro}</p>
      <a href={r.pdf} className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 font-semibold text-white" style={{backgroundColor:r.color}}><Download size={18}/> Download the one-page checklist</a>
      <p className="mt-3 text-sm text-charcoal-muted">Free PDF. No email or account required.</p>
    </header>
    <ol className="mx-auto mt-12 max-w-3xl space-y-5">{r.steps.map(([title,body],i)=><li key={title} className="flex gap-5 rounded-2xl border border-ink/10 p-6" style={{backgroundColor:r.tint}}><span className="font-serif text-2xl" style={{color:r.color}}>{String(i+1).padStart(2,'0')}</span><div><h2 className="text-lg font-semibold">{title}</h2><p className="mt-2 leading-relaxed text-charcoal-muted">{body}</p></div></li>)}</ol>
    <section className="mx-auto mt-10 max-w-3xl rounded-2xl p-7 text-white sm:p-9" style={{backgroundColor:r.color}}><h2 className="font-serif text-2xl">A useful way to begin the conversation</h2><blockquote className="mt-5 text-lg leading-relaxed">“{r.conversation}”</blockquote></section>
    <section className="mx-auto mt-10 max-w-3xl"><h2 className="font-serif text-3xl">Put it into practice</h2><p className="mt-4 leading-relaxed text-charcoal-muted">{r.example}</p><p className="mt-3 text-sm text-charcoal-muted">Illustrative example. Adapt it to your project and existing process.</p></section>
    <section className="mx-auto mt-12 max-w-3xl rounded-3xl border border-ink/10 bg-cream-soft p-7 sm:p-9"><h2 className="font-serif text-3xl">Continue with {r.app}</h2><p className="mt-4 leading-relaxed text-charcoal-muted">{r.product}</p><p className="mt-4 text-sm leading-relaxed text-charcoal-muted">{r.offer}</p><a href={'/apps/'+r.slug} className="mt-6 inline-flex items-center gap-2 font-semibold underline underline-offset-4" style={{color:r.color}}>{r.cta} <ArrowRight size={17}/></a></section>
    <div className="mx-auto mt-10 max-w-3xl"><a href={r.other} className="underline underline-offset-4">{r.otherLabel}</a></div>
  </article>;
}
