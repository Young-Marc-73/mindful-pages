import Quill from "../brand/Quill";
import Reveal from "../motion/Reveal";

export default function Newsletter() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="rounded-[2.5rem] border border-sage/30 bg-gradient-to-br from-cream-soft to-sage/10 px-6 py-14 text-center shadow-soft sm:px-10">
          <Quill className="mx-auto mb-5 h-10 w-10" animate={false} />
          <h2 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">Start where you are.</h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-charcoal-muted">You may have a question to investigate, a decision to make, or an experience you want to understand. Start there. Mindful Pages gives that work a place—and gives you something to return to as you learn.</p>
          <a href="#journals" className="btn-gold mt-7">Explore the books</a>
        </Reveal>
      </div>
    </section>
  );
}
