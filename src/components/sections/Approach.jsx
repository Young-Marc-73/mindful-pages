import { motion } from "framer-motion";
import { Lightbulb, ListTree, CalendarCheck, RefreshCw } from "lucide-react";
import Reveal, { Stagger, staggerItem } from "../motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Knowledge",
    icon: Lightbulb,
    body: "Gather what you need to know. Preserve questions, observations, sources, and experience.",
    accent: "text-[#8a6410]", // deeper antique gold — the lighter gold-deep failed contrast on cream
    ring: "ring-gold/40",
    bg: "bg-gold/15",
  },
  {
    n: "02",
    title: "Understanding",
    icon: ListTree,
    body: "Make sense of what you have gathered. Find relationships, question assumptions, and see what is still missing.",
    accent: "text-sage-deep",
    ring: "ring-sage/40",
    bg: "bg-sage/15",
  },
  {
    n: "03",
    title: "Wisdom",
    icon: CalendarCheck,
    body: "Put understanding to work. Choose a direction, make a practical plan, and act.",
    accent: "text-terracotta",
    ring: "ring-terracotta/25",
    bg: "bg-terracotta/10",
  },
  {
    n: "04",
    title: "Evaluation",
    icon: RefreshCw,
    body: "Learn from what happens. Compare the result with what you expected and carry the lesson forward.",
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
            Four movements.
            <span className="italic text-gold-deep"> Connected thinking.</span>
          </h2>
          <p className="mt-5 text-lg text-charcoal-muted">
            Our books and journals support Knowledge, Understanding, Wisdom, and Evaluation.
            Each has a different job. Move between them as the question changes—real thinking
            does not always travel in a straight line.
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
                  <h3 className="font-serif text-xl text-ink">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">{s.body}</p>
              </motion.div>
            ))}
          </Stagger>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-ink/10 bg-cream-soft p-6 text-sm leading-relaxed text-charcoal-muted"><h3 className="mb-2 font-serif text-xl text-ink">For example: should you raise your prices?</h3><p>Gather customer feedback and cost information. Examine what it means for your offer. Compare options and choose a practical change. Then review what happened. The books give each part of that work somewhere to develop.</p></div>
        </div>
      </div>
    </section>
  );
}
