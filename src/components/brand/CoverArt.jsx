import { Music, Layers, BookOpen, Sparkles, Leaf, Feather, BookMarked } from "lucide-react";
import { cn } from "../../lib/utils";

// Motif icons referenced by journal tiles (keeps the bundle lean vs. import *)
const MOTIFS = { Music, Layers, BookOpen, Sparkles, Leaf, BookMarked };

/**
 * CoverArt — shows a real Canva cover image when available, otherwise renders a
 * designed, on-brand cover tile that echoes the two real cover families:
 *   • variant "ink"   → deep navy + golden color-block (the business series look)
 *   • variant "cream" → warm cream + sage leaf (the mindful/lifestyle look)
 *
 * Every tile carries the "Mindful Pages" wordmark + quill, a title, and a motif —
 * so the catalog reads as one cohesive, designed set even where no photo exists.
 */
export default function CoverArt({ journal, className }) {
  const ratio = "aspect-[2/3]";

  if (journal.cover) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl", ratio, className)}>
        <img
          src={journal.cover}
          alt={`${journal.title} — journal cover by Mindful Pages`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const variant = journal.tile?.variant ?? "ink";
  const Motif = MOTIFS[journal.tile?.motif] ?? BookMarked;

  if (variant === "cream") {
    return (
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-xl bg-cream-sand",
          ratio,
          className
        )}
        role="img"
        aria-label={`${journal.title} — journal cover by Mindful Pages`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(169,205,201,0.5),transparent_60%)]" />
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="font-serif text-[0.7rem] italic tracking-brand text-charcoal">
            Mindful Pages
          </span>
          <Feather className="h-3.5 w-3.5 text-sage-moss" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
          <Motif className="h-10 w-10 text-sage-deep" strokeWidth={1.4} />
          <h4 className="font-serif text-2xl leading-tight text-ink">{journal.title}</h4>
          <span className="h-px w-10 bg-sage-moss/50" />
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-charcoal-muted">
            {journal.tags?.[0]}
          </span>
        </div>
        <Leaf className="absolute -bottom-3 left-1/2 h-16 w-16 -translate-x-1/2 text-sage-moss/25" strokeWidth={1} />
      </div>
    );
  }

  // variant "ink" — navy + gold color-block, echoing the business-series covers
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl bg-ink text-cream-soft",
        ratio,
        className
      )}
      role="img"
      aria-label={`${journal.title} — journal cover by Mindful Pages`}
    >
      {/* Gold color-block cross, like the real covers */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-1/3 -translate-x-1/2 bg-gold/90" />
      <div className="pointer-events-none absolute inset-x-0 top-[38%] h-[18%] bg-gold/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_80%_10%,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="relative flex items-center justify-between px-4 pt-4">
        <span className="font-serif text-[0.7rem] italic tracking-brand text-cream-soft/90">
          Mindful Pages
        </span>
        <Feather className="h-3.5 w-3.5 text-gold-bright" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
        <Motif className="h-9 w-9 text-ink" strokeWidth={1.6} />
        <h4 className="font-serif text-2xl font-semibold leading-tight text-cream-soft drop-shadow-[0_1px_0_rgba(20,24,42,0.4)]">
          {journal.title}
        </h4>
      </div>

      <div className="relative px-4 pb-4 text-center">
        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-cream-soft/70">
          {journal.audience}
        </span>
      </div>
    </div>
  );
}
