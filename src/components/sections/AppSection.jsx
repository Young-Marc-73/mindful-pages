import { motion } from "framer-motion";
import {
  Sparkles,
  Boxes,
  BrainCircuit,
  Sprout,
  NotebookPen,
  FolderInput,
  Download,
  ArrowRight,
} from "lucide-react";
import AuroraBackground from "../magicui/AuroraBackground";
import ShimmerButton from "../magicui/ShimmerButton";
import Reveal, { Stagger, staggerItem } from "../motion/Reveal";
import WaitlistForm from "../WaitlistForm";

// ── 3-pillar feature grid ──
const pillars = [
  {
    icon: Boxes,
    title: "Your business, organized",
    body: "One home base. Capture notes and they auto-file into a living business plan you can export anytime.",
  },
  {
    icon: BrainCircuit,
    title: "AI that actually knows you",
    body: "A structured context layer your AI reasons from — so you get answers about your business, not generic ones.",
  },
  {
    icon: Sprout,
    title: "Grows you, not dependent",
    body: "It surfaces questions and connections for you to reflect on. It never hands you the verdict — you stay sharp.",
  },
];

// ── How it works ──
const steps = [
  { icon: NotebookPen, label: "Capture", body: "Jot down what matters — notes, decisions, ideas — the moment they happen." },
  { icon: FolderInput, label: "Auto-file", body: "It organizes each note into a living business plan, building real understanding." },
  { icon: Download, label: "Reflect & export", body: "Your AI surfaces questions to reflect on — and you can export the plan anytime." },
];

function scrollToWaitlist() {
  const el = document.getElementById("waitlist");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.querySelector("input#wl-email")?.focus({ preventScroll: true });
}

export default function AppSection() {
  return (
    <section id="app" className="relative isolate overflow-hidden bg-ink py-24 text-cream-soft sm:py-32">
      <AuroraBackground />

      <div className="container-page relative">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
            <Sparkles className="h-3.5 w-3.5" /> Coming soon — early access
          </span>
          <h2 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.1] text-cream-soft sm:text-5xl lg:text-[3.4rem]">
            Your journals, now an app that makes your AI{" "}
            <span className="italic text-gold-bright">actually know your business.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream-soft/75">
            The organized home base for your business — capture what matters, and let your AI reason
            from a real understanding of you. Built to grow you, not replace your thinking.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ShimmerButton onClick={scrollToWaitlist}>
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
            <span className="text-sm text-cream-soft/55">MVP in early development · pre-launch</span>
          </div>
        </Reveal>

        {/* 3-pillar feature grid */}
        <Stagger className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              className="group relative flex flex-col rounded-3xl border border-cream-soft/12 bg-cream-soft/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:bg-cream-soft/[0.07]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/30 transition-transform duration-500 group-hover:scale-105">
                <p.icon className="h-7 w-7 text-gold-bright" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-cream-soft">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-soft/70">{p.body}</p>
            </motion.div>
          ))}
        </Stagger>

        {/* How it works */}
        <div className="mx-auto mt-20 max-w-4xl">
          <Reveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-soft/50">
              How it works
            </span>
            <p className="mt-3 font-serif text-lg text-cream-soft/80">
              Built on a simple spine — Knowledge → Understanding → Wisdom.
            </p>
          </Reveal>

          <div className="relative mt-10">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-cream-soft/20 to-transparent sm:block" />
            <Stagger className="grid gap-8 sm:grid-cols-3">
              {steps.map((s, i) => (
                <motion.div key={s.label} variants={staggerItem} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-ink ring-1 ring-gold/40">
                    <s.icon className="h-6 w-6 text-gold-bright" strokeWidth={1.6} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-ink">
                      {i + 1}
                    </span>
                  </div>
                  <h4 className="mt-4 font-serif text-xl text-cream-soft">{s.label}</h4>
                  <p className="mt-1.5 max-w-[15rem] text-sm leading-relaxed text-cream-soft/65">{s.body}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Waitlist form */}
        <Reveal delay={0.1} className="mx-auto mt-20 max-w-2xl">
          <div className="mb-5 text-center">
            <h3 className="font-serif text-2xl text-cream-soft sm:text-3xl">
              Be first through the door
            </h3>
            <p className="mt-2 text-cream-soft/65">
              Join the early-access waitlist for the Mindful Pages app.
            </p>
          </div>
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}
