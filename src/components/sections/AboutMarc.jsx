import ReaderForm from "../ReaderForm";
import Reveal from "../motion/Reveal";

export default function AboutMarc() {
  return (
    <section id="about" className="container-page py-20">
      <Reveal className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="kicker">About Mindful Pages</span>
          <h2 className="mt-5 font-serif text-4xl">Built by a business owner.</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-charcoal-muted">
            <p>
              I’m Marc Young. I’ve been an entrepreneur since I was twelve.
            </p>
            <p>
              Early on I developed a simple method for thinking through business problems:
              three legal pads and a 3×5 card. One pad for collecting information, one for
              organizing it into understanding, and one for writing a practical plan. When
              the work was finished I cleared the boards and started the next problem.
              Later I added a fourth step — evaluating what actually happened.
            </p>
            <p>
              That process is the foundation of Mindful Pages.
            </p>
            <p>
              I also learned that most formal planning tools are written once and then filed
              away. That never made sense to me. The journals take the essential signals a
              business needs to track and turn them into living documents you return to as
              things change.
            </p>
            <p>
              The books teach the method for moving through the work. The journals give the
              work a durable place to live. The app (Business Bloom) will make the same
              system continuous and assisted.
            </p>
            <p>
              I built this because the thinking work of a small business is real work — and
              it deserves better tools than scraps of paper and half-remembered conversations.
            </p>
          </div>
        </div>
        <div
          id="contact"
          className="rounded-3xl border border-ink/10 bg-cream-soft p-6 sm:p-8"
        >
          <h3 className="mb-3 font-serif text-2xl">Contact Marc</h3>
          <p className="mb-6 text-sm text-charcoal-muted">
            Questions about a book or the app? Send a message here.
          </p>
          <ReaderForm kind="contact" />
        </div>
      </Reveal>
    </section>
  );
}
