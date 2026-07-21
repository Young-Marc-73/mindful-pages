import { motion } from "framer-motion";
import { Lightbulb, ListTree, CalendarCheck, RefreshCw } from "lucide-react";
import Reveal, { Stagger, staggerItem } from "../motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Brainstorm",
    icon: Lightbulb,
    body: "Start messy. Open prompts pull every idea, worry, and half-thought out of your head and onto the page.",
    accent: "text-[#8a6410]", // deeper antique gold — the lighter gold-deep failed contrast on cream
    ring: "ring-gold/40",
    bg: "bg-gold/15",
  },
  {
    n: "02",
    title: "Organize",
    icon: ListTree,
    body: "Sort the noise into themes. Structured layouts help you group, prioritize, and see what actually matters.",
    accent: "text-sage-deep",
    ring: "ring-sage/40",
    bg: "bg-sage/15",
  },
  {
    n: "03",
    title: "Plan",
    icon: CalendarCheck,
    body: "Turn clarity into a path. Break the goal into steps you can act on this week — and this morning.",
    accent: "text-terracotta",
    ring: "ring-terracotta/25",
    bg: "bg-terracotta/10",
  },
  {
    n: "04",
    title: "Review",
    icon: RefreshCw,
    body: "Close the loop. Reflect on what worked, adjust with intention, and carry the momentum into what's next.",
    accent: "text-plum",
    ring: "ring-plum/25",
    bg: "bg-plum/10",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker mb-5">Our Approach</span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            A journal that walks you
            <span className="italic text-gold-deep"> through the process</span>
          </h2>
          <p className="mt-5 text-lg text-charcoal-muted">
            Blank pages ask you to figure it out alone. Every Mindful Pages journal is built
            around one simple, repeatable rhythm — the same four movements, every time.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent lg:block" />

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <motion.div
                key={s.n}
                variants={staggerItem}
                className="group relative flex flex-col rounded-3xl border border-ink/10 bg-cream-soft p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${s.bg} ring-1 ${s.ring} transition-transform duration-500 group-hover:scale-105`}
                >
                  <s.icon className={`h-7 w-7 ${s.accent}`} strokeWidth={1.6} />
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className={`font-serif text-sm font-semibold ${s.accent}`}>{s.n}</span>
                  <h3 className="font-serif text-2xl text-ink">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{s.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
