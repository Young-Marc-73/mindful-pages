import { PenLine, Tag, Target, Truck } from "lucide-react";
import { BentoGrid, BentoCard } from "../magicui/BentoGrid";
import Reveal from "../motion/Reveal";

export default function WhySection() {
  return (
    <section id="why" className="relative py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker mb-5">Why Mindful Pages</span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            A place for the thinking
            <span className="italic text-gold-deep"> behind your business</span>
          </h2>
          <p className="mt-5 text-lg text-charcoal-muted">
            A question to investigate, a decision to make, or an experience to understand. Start there.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <BentoGrid className="grid-cols-1 auto-rows-[16rem] md:grid-cols-3 md:auto-rows-[18rem]">
            {/* Structured — wide */}
            <BentoCard
              name="Guidance with room to think"
              className="md:col-span-2"
              Icon={PenLine}
              description="Explanations and questions help you begin. Open space lets you develop the thought in your own way."
              href="#approach"
              cta="See the process"
              background={
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(199,154,60,0.12),transparent_55%)]" />
              }
            />

            {/* Affordable — tall-ish */}
            <BentoCard
              name="Start where you are"
              Icon={Tag}
              description="Choose the book that supports the work in front of you. Return to another when the question changes."
              href="#journals"
              cta="Explore the books"
              background={
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_100%,rgba(47,111,106,0.14),transparent_55%)]" />
              }
            />

            {/* Niche-specific — with drifting covers */}
            <BentoCard
              name="Built around your business"
              Icon={Target}
              description="Bring research, experience, and decisions together so you can see how the parts of your business connect."
              href="#journals"
              cta="Find yours"
              background={<div className="absolute inset-0 bg-sage/10" />}
            />

            {/* Fast / POD — wide */}
            <BentoCard
              name="Books coming soon"
              className="md:col-span-2"
              Icon={Truck}
              description="Strategic Thinking and the Business Journal are our first planned releases. Amazon purchase links will appear when the books are published."
              href="#journals"
              cta="See the upcoming titles"
              background={
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_120%,rgba(106,79,176,0.12),transparent_55%)]" />
              }
            />
          </BentoGrid>
        </Reveal>
      </div>
    </section>
  );
}
