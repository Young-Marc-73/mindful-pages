import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CoverArt from "./brand/CoverArt";
import { staggerItem } from "./motion/Reveal";

/**
 * JournalCard — animated product card.
 * Framer Motion: lifts on hover; the cover gets a soft glare sweep + scale.
 * The whole card is a link to the journal's Amazon listing.
 */
export default function JournalCard({ journal }) {
  const missingLink = journal.amazonUrl === "REPLACE-WITH-AMAZON-URL";

  return (
    <motion.a
      variants={staggerItem}
      href={journal.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      // If the link isn't set yet, keep it inert but still visible
      onClick={(e) => missingLink && e.preventDefault()}
      aria-label={`${journal.title} — view on Amazon`}
      className="group relative flex flex-col rounded-3xl border border-ink/10 bg-cream-soft p-4 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {/* Cover with glare sweep */}
      <div className="relative overflow-hidden rounded-xl shadow-cover">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <CoverArt journal={journal} />
        </div>
        {/* Diagonal glare */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
        {/* Price chip */}
        <span className="absolute right-2.5 top-2.5 rounded-full bg-cream-soft/90 px-2.5 py-1 text-xs font-semibold text-ink shadow-soft backdrop-blur">
          {journal.price}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col px-1.5 pt-4">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
          {journal.audience}
        </span>
        <h3 className="mt-1.5 font-serif text-xl leading-snug text-ink">{journal.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-muted">
          {journal.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors group-hover:text-gold-deep">
            View on Amazon
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {journal.series && (
            <span className="rounded-full bg-sage/25 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-sage-deep">
              {journal.series}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
