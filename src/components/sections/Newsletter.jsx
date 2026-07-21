import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Quill from "../brand/Quill";
import DotPattern from "../magicui/DotPattern";
import Reveal from "../motion/Reveal";

export default function Newsletter() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-sage/30 bg-gradient-to-br from-cream-soft to-sage/10 px-6 py-14 text-center shadow-soft sm:px-10">
          <DotPattern className="fill-sage-deep/10 [mask-image:radial-gradient(400px_circle_at_50%_50%,white,transparent)]" />

          <div className="relative mx-auto max-w-xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-soft shadow-soft ring-1 ring-sage/40">
              <Quill className="h-8 w-8" animate={false} />
            </div>
            <h2 className="text-balance font-serif text-3xl font-semibold text-ink sm:text-4xl">
              A little prompt in your inbox
            </h2>
            <p className="mx-auto mt-4 max-w-md text-charcoal-muted">
              Join for a gentle weekly journaling prompt and first word on new journals. No noise —
              just something small and thoughtful to write about.
            </p>

            {/* Styled-only form (non-functional for now) */}
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-full border border-ink/15 bg-cream-soft px-5 py-3.5 text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="btn-gold shrink-0 justify-center"
              >
                <Send className="h-4 w-4" /> Subscribe
              </motion.button>
            </form>
            <p className="mt-3 text-xs text-charcoal-muted">
              We'll never share your email. Unsubscribe anytime.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
