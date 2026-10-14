import Reveal, { Stagger } from "../motion/Reveal";
import BookGuide from "./BookGuide";
import JournalCard from "../JournalCard";
import { journals } from "../../data/journals";

export default function JournalGrid() {
  return (
    <section id="journals" className="relative py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker mb-5">The Books & Journals</span>
          <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Find the one that fits
            <span className="italic text-gold-deep"> your work</span>
          </h2>
          <p className="mt-5 text-lg text-charcoal-muted">
            Start with the work in front of you. Choose the book or journal that supports
            the thinking job you need to do right now. The Workshop, Repository, Business Journal and Research Journal are available now.
          </p>
        </Reveal>

        <BookGuide />
        <Stagger
          className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          stagger={0.08}
        >
          {journals.map((j) => (
            <JournalCard key={j.id} journal={j} />
          ))}
        </Stagger>
        <p className="mt-6 text-center text-sm text-charcoal-muted">
          Prices are in USD. Shipping and applicable tax
          are calculated at checkout.
        </p>
      </div>
    </section>
  );
}
