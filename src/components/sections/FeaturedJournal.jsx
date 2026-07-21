import { motion } from "framer-motion";
import { ArrowUpRight, Music, Check } from "lucide-react";
import Reveal from "../motion/Reveal";
import CoverArt from "../brand/CoverArt";
import DotPattern from "../magicui/DotPattern";
import { featuredJournal } from "../../data/journals";

const highlights = [
  "Lyric pages with built-in rhyme & syllable guides",
  "Chord charts and song-structure templates",
  "A verse → chorus → bridge writing workflow",
  "Space to log ideas before they slip away",
];

export default function FeaturedJournal() {
  const j = featuredJournal;

  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-cream-soft shadow-lift sm:px-14">
          <DotPattern className="fill-cream-soft/[0.06]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Cover */}
            <Reveal className="mx-auto w-full max-w-[18rem]">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl shadow-cover ring-1 ring-cream-soft/10"
              >
                <CoverArt journal={j} className="rounded-2xl" />
              </motion.div>
            </Reveal>

            {/* Details */}
            <Reveal delay={0.15}>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
                <Music className="h-3.5 w-3.5" /> Featured journal
              </span>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                {j.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-soft/75">
                Our most-developed journal. Built with songwriters, for songwriters — it turns
                the messy magic of writing a song into a process you can actually follow, without
                killing the spark.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-cream-soft/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20">
                      <Check className="h-3 w-3 text-gold-bright" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={j.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => j.amazonUrl === "REPLACE-WITH-AMAZON-URL" && e.preventDefault()}
                  className="btn-gold"
                >
                  View on Amazon <ArrowUpRight className="h-4 w-4" />
                </a>
                <span className="text-cream-soft/70">
                  <span className="font-serif text-2xl text-cream-soft">{j.price}</span> · paperback
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
