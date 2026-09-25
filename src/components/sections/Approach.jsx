import { motion } from "framer-motion";
import { Lightbulb, ListTree, CalendarCheck, RefreshCw } from "lucide-react";
import Reveal, { Stagger, staggerItem } from "../motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Knowledge",
    icon: Lightbulb,
    body: "Gather the material you need. Preserve questions, observations, sources, and experience.",
    accent: "text-[#8a6410]",
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
    body: "Turn understanding into a practical plan and act.",
    accent: "text-terracotta",
    ring: "ring-terracotta/25",
    bg: "bg-terracotta/10",
  },
  {
    n: "04",
    title: "Evaluation",
    icon: RefreshCw,
    body: "Review the result and carry the learning forward.",
    accent: "text-plum",
    ring: "ring-plum/25",
    bg: "bg-plum/10",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="kicker mb-5">How it works</span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Four movements.
            <span className="italic text-gold-deep"> One clear method.</span>
          </h2>
          <p className="mt-5 text-lg text-charcoal-muted">
            Most small-business owners do the thinking work of an entire company inside
            their own head. There is usually nowhere solid to put that thinking, so it
            stays scattered, half-finished, or lost.
          </p>
          <p className="mt-4 text-lg text-charcoal-muted">
            Mindful Pages gives that work a clear place and a repeatable method.
          </p>
        </Reveal>

        {/* Origin story */}
        <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl rounded-3xl border border-ink/10 bg-cream-soft p-8 sm:p-10">
          <h3 className="font-serif text-2xl text-ink">How the method started</h3>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal-muted">
            <p>
              When I first began in business I used three legal pads hanging on the wall
              and a single 3×5 card.
            </p>
            <p>
              I wrote the name of the problem on the card and tacked it above the pads.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                On the first legal pad I collected every piece of information I could find.
                Order did not matter. Mess did not matter. I kept going until I had
                exhausted every useful source.
              </li>
              <li>
                On the second legal pad I reorganized that material. The act of sorting
                and connecting it is what produced understanding.
              </li>
              <li>
                On the third legal pad I wrote a practical, step-by-step plan.
              </li>
            </ul>
            <p>
              When the work was finished I took the pages down, hung the empty pads back
              up, threw away the card, and started the next problem.
            </p>
            <p>
              That simple process — Knowledge, then Understanding, then Wisdom — is the
              foundation of everything here. Later I added a fourth movement: Evaluation.
              You have to look at what actually happened and carry the learning forward.
            </p>
          </div>
        </Reveal>

        {/* Four movements */}
        <div className="relative mt-16">
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

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-ink/10 bg-cream-soft p-6 text-sm leading-relaxed text-charcoal-muted">
            <h3 className="mb-2 font-serif text-xl text-ink">
              For example: should you raise your prices?
            </h3>
            <p>
              Gather customer feedback and cost information. Examine what it means for
              your offer. Compare options and choose a practical change. Then review what
              happened. The books and journals give each part of that work somewhere to
              develop.
            </p>
          </div>
        </div>

        {/* How the tools fit */}
        <Reveal delay={0.15} className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-center font-serif text-2xl text-ink sm:text-3xl">
            How the journals embody the process
          </h3>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-charcoal-muted">
            <div>
              <p className="font-medium text-ink">Knowledge</p>
              <p className="mt-1">
                <strong>Research Journal</strong> — collect source material and investigation,
                organized around the seven business signals.
              </p>
              <p className="mt-1">
                <strong>Team Management Journal</strong> — for the person still wearing every
                hat. It helps you recognize the informal team you already have and deliberately
                strengthen those relationships.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Understanding</p>
              <p className="mt-1">
                <strong>Business Journal</strong> — built around the seven business signals.
                Instead of writing something once and putting it away, you return to the same
                signals as the business changes.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Wisdom</p>
              <p className="mt-1">
                <strong>Business Planner</strong> and <strong>Business Diary</strong> — practical
                planning tools plus a private place for the thoughts you would not share with
                anyone else.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink">Strategic Thinking</p>
              <p className="mt-1">
                Sits across the whole process. It is the method for recognizing which kind of
                thinking work a situation needs and for moving through that work without
                skipping steps.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
