import ReaderForm from "../ReaderForm";
import Reveal from "../motion/Reveal";
export default function BookUpdates() {
  return <section id="book-updates" className="container-page py-12"><Reveal className="rounded-[2.5rem] border border-sage/30 bg-cream-soft p-7 shadow-soft sm:p-12"><div className="mx-auto max-w-2xl"><span className="kicker">Coming soon</span><h2 className="mt-4 font-serif text-3xl sm:text-4xl">Be here for the first releases.</h2><p className="mb-7 mt-4 text-charcoal-muted">Leave your email for news when the books are available. No need to join the app waitlist to hear about the books.</p><ReaderForm /></div></Reveal></section>;
}
