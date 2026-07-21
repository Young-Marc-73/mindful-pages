import { PenLine, Tag, Target, Truck } from "lucide-react";
import { BentoGrid, BentoCard } from "../magicui/BentoGrid";
import Marquee from "../magicui/Marquee";
import Reveal from "../motion/Reveal";
import { journals } from "../../data/journals";
import CoverArt from "../brand/CoverArt";

// Background: a soft drifting mini-cover marquee for the "niche" card
const MiniCovers = () => (
  <Marquee className="absolute top-6 [--duration:30s] opacity-70 [mask-image:linear-gradient(to_top,transparent,white_40%)]">
    {journals.slice(0, 7).map((j) => (
      <div key={j.id} className="w-16 shrink-0">
        <div className="overflow-hidden rounded shadow-soft ring-1 ring-ink/10">
          <CoverArt journal={j} />
        </div>
      </div>
    ))}
  </Marquee>
);

export default function WhySection() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker mb-5">Why Mindful Pages</span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Small books that make a
            <span className="italic text-gold-deep"> real difference</span>
          </h2>
          <p className="mt-5 text-lg text-charcoal-muted">
            We make calm, premium tools for thinking clearly — priced so anyone can start today.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <BentoGrid className="grid-cols-1 auto-rows-[16rem] md:grid-cols-3 md:auto-rows-[18rem]">
            {/* Structured — wide */}
            <BentoCard
              name="Structured, not blank"
              className="md:col-span-2"
              Icon={PenLine}
              description="Guided prompts and layouts that take you from a blank stare to a finished thought — every single page has a job."
              href="#approach"
              cta="See the process"
              background={
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(199,154,60,0.12),transparent_55%)]" />
              }
            />

            {/* Affordable — tall-ish */}
            <BentoCard
              name="$15–$30"
              Icon={Tag}
              description="Premium feel, honest price. Every journal sits in reach as a treat for yourself or a thoughtful gift."
              href="#journals"
              cta="Browse prices"
              background={
                <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_100%,rgba(47,111,106,0.14),transparent_55%)]" />
              }
            />

            {/* Niche-specific — with drifting covers */}
            <BentoCard
              name="Made for your niche"
              Icon={Target}
              description="Songwriters, founders, readers, busy women — each journal speaks to a specific life, not everyone at once."
              href="#journals"
              cta="Find yours"
              background={<MiniCovers />}
            />

            {/* Fast / POD — wide */}
            <BentoCard
              name="Print-on-demand, shipped by Amazon"
              className="md:col-span-2"
              Icon={Truck}
              description="Printed fresh when you order and delivered by Amazon — no warehouses, no waiting, no fuss. Just a beautiful book at your door."
              href="#journals"
              cta="Shop on Amazon"
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
