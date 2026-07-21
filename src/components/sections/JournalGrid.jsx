import Reveal, { Stagger } from "../motion/Reveal";
import JournalCard from "../JournalCard";
import { journals } from "../../data/journals";

export default function JournalGrid() {
  return (
    <section id="journals" className="relative py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker mb-5">The Journals</span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Find the one that fits
            <span className="italic text-gold-deep"> your work</span>
          </h2>
          <p className="mt-5 text-lg text-charcoal-muted">
            A growing library of guided journals — for songwriters, entrepreneurs, readers,
            and anyone who wants a little more structure. Each one links straight to Amazon.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={0.08}
        >
          {journals.map((j) => (
            <JournalCard key={j.id} journal={j} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
