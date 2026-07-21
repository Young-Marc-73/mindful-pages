import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Marquee from "../magicui/Marquee";
import Reveal from "../motion/Reveal";
import { cn } from "../../lib/utils";

const testimonials = [
  {
    quote:
      "I've bought a dozen journals that just became guilt on my shelf. This one I actually finished — the prompts do half the work for you.",
    name: "Renée A.",
    role: "Songwriter",
    tint: "gold",
  },
  {
    quote:
      "The Business Journal made me sit down and think about my company instead of just reacting to it. Worth ten times the price.",
    name: "Marcus T.",
    role: "Founder",
    tint: "sage",
  },
  {
    quote:
      "Calm, beautiful, and genuinely useful. It feels like a premium product but it was under $25.",
    name: "Priya S.",
    role: "Reader & planner",
    tint: "plum",
  },
  {
    quote:
      "Started with the Entrepreneur Series and it became the operating system for my whole week. The paper feels lovely too.",
    name: "Danielle K.",
    role: "Small business owner",
    tint: "terracotta",
  },
  {
    quote:
      "The Digital Life Log finally got every login and subscription out of my head. Such a relief.",
    name: "Owen R.",
    role: "Freelancer",
    tint: "sage",
  },
];

const tintMap = {
  gold: "text-gold-deep",
  sage: "text-sage-deep",
  plum: "text-plum",
  terracotta: "text-terracotta",
};

function Card({ t }) {
  return (
    <figure className="mx-2 flex w-[20rem] shrink-0 flex-col rounded-3xl border border-ink/10 bg-cream-soft p-6 shadow-soft sm:w-[24rem]">
      <Quote className={cn("h-7 w-7", tintMap[t.tint])} />
      <blockquote className="mt-3 flex-1 text-pretty leading-relaxed text-charcoal">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between">
        <div>
          <div className="font-serif text-lg text-ink">{t.name}</div>
          <div className="text-sm text-charcoal-muted">{t.role}</div>
        </div>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker mb-5">Kind words</span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Loved by people who
            <span className="italic text-gold-deep"> finally finished a journal</span>
          </h2>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mt-14"
      >
        <Marquee pauseOnHover className="[--duration:50s]">
          {testimonials.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent sm:w-40" />
      </motion.div>
    </section>
  );
}
