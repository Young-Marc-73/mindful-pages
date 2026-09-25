import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import Reveal from "../motion/Reveal";
import CoverArt from "../brand/CoverArt";
import DotPattern from "../magicui/DotPattern";
import { featuredJournal } from "../../data/journals";

const highlights = [
  "Guided questions across seven connected areas of your business",
  "Space to connect evidence and experience",
  "A place to identify assumptions and unanswered questions",
  "A record you can revisit as your understanding grows",
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
                <BookOpen className="h-3.5 w-3.5" /> Featured journal
              </span>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-cream-soft sm:text-5xl">
                {j.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-soft/75">
                In a small business, you may be responsible for marketing, operations, sales,
                and the money. The conversations between those departments still happen.
                Often, they happen inside your head. The Business Journal gives those
                conversations somewhere to go.
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
                <a href="#business-journal" className="btn-gold">
                  Explore the journal <ArrowRight className="h-4 w-4" />
                </a>
                <span className="text-cream-soft/70">Coming soon · {j.price} planned paperback price</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
