import { motion } from "framer-motion";
import CoverArt from "./brand/CoverArt";
import { staggerItem } from "./motion/Reveal";

export default function JournalCard({ journal }) {
  return (
    <motion.article id={journal.id} variants={staggerItem}
      className="group relative flex scroll-mt-32 flex-col rounded-3xl border border-ink/10 bg-cream-soft p-4 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative overflow-hidden rounded-xl shadow-cover">
        <CoverArt journal={journal} />
        <span className="absolute right-2.5 top-2.5 rounded-full bg-cream-soft/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">{journal.status}</span>
      </div>
      <div className="flex flex-1 flex-col px-1.5 pt-4">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">{journal.audience}</span>
        <h3 className="mt-1.5 font-serif text-xl leading-snug text-ink">{journal.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{journal.description}</p>
        <details className="mt-4 text-sm leading-relaxed text-charcoal-muted">
          <summary className="cursor-pointer rounded font-semibold text-ink focus-visible:outline-gold">About this book</summary>
          <div className="mt-3 space-y-3">{journal.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </details>
        <a href={journal.preview} className="mt-4 text-sm font-semibold text-ink underline decoration-gold underline-offset-4">Look inside <span className="sr-only">{journal.title}</span></a>
        <a href="#book-updates" className="mt-3 text-sm text-charcoal-muted underline underline-offset-4">Get release updates</a>
        <p className="mt-auto pt-5 text-sm text-charcoal-muted"><span className="font-serif text-xl text-ink">{journal.price}</span> · planned paperback price</p>
      </div>
    </motion.article>
  );
}
