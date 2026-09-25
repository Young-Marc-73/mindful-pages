import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Quill from "../brand/Quill";
import AnimatedShinyText from "../magicui/AnimatedShinyText";
import DotPattern from "../magicui/DotPattern";
import { cn } from "../../lib/utils";

// A few real covers float in the hero collage
const floatCovers = [
  { src: "/images/covers/business-journal.webp", cls: "left-0 top-6 rotate-[-8deg] z-20", d: 0 },
  { src: "/images/covers/workshop.webp", cls: "left-28 top-0 rotate-[4deg] z-30", d: 0.15 },
  { src: "/images/covers/research-journal.webp", cls: "left-52 top-32 rotate-[-4deg] z-20", d: 0.45 },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <DotPattern className="[mask-image:radial-gradient(600px_circle_at_50%_0%,white,transparent)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-cream-radial" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="kicker">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <AnimatedShinyText className="text-gold-deep">
                Practical books & guided business journals
              </AnimatedShinyText>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-serif text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
          >
            Give your business
            <br />
            thinking room to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-gold-deep">grow.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                className="absolute inset-x-0 bottom-1.5 z-0 h-3 origin-left rounded-full bg-gold/35"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-charcoal-muted"
          >
            Most small-business owners carry the thinking work of an entire company
            inside their own head. There is nowhere solid to put it, so important
            observations, questions, and decisions stay half-formed or disappear.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-charcoal-muted"
          >
            Mindful Pages gives that thinking a clear place and a repeatable method
            so you can move from scattered information to real understanding to a
            practical next step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#journals" className="btn-primary group">
              Explore the books
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#approach" className="btn-ghost">
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 flex items-center gap-5 text-sm text-charcoal-muted"
          >
            <span>Books coming soon · Business Bloom in development</span>
          </motion.div>
        </div>

        {/* Floating cover collage */}
        <div className="relative mx-auto hidden h-[26rem] w-full max-w-md lg:block">
          <Quill className="absolute -right-2 -top-6 z-40 h-14 w-14 opacity-90" />
          {floatCovers.map((c, i) => (
            <motion.div
              key={c.src}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 + c.d, ease: [0.22, 1, 0.36, 1] }}
              className={cn("absolute h-64 w-44 animate-float-slow", c.cls)}
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <img
                src={c.src}
                alt=""
                aria-hidden="true"
                className="h-full w-full rounded-lg object-contain drop-shadow-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
