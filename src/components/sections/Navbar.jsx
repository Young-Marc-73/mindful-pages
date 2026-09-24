import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import Quill from "../brand/Quill";
import { cn } from "../../lib/utils";

const links = [
  { label: "Books & Journals", href: "#journals" },
  { label: "Our Approach", href: "#approach" },
  { label: "Business Bloom", href: "#app" },
  { label: "About", href: "#about" },
];

export default function Navbar({ barVisible = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 z-50 flex justify-center px-4 pt-3 transition-[top] duration-300 sm:pt-4",
        barVisible ? "top-10" : "top-0"
      )}
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled
            ? "glass border border-ink/10 shadow-soft"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5" aria-label="Mindful Pages — home">
          <Quill className="h-8 w-8" animate={false} />
          <span className="font-serif text-lg font-semibold tracking-brand text-ink">
            Mindful Pages
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:text-ink"
            >
              <span className="relative z-10">{l.label}</span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <a
            href="#journals"
            className="btn-gold hidden px-5 py-2.5 text-sm sm:inline-flex"
          >
            <ShoppingBag className="h-4 w-4" />
            Explore the books
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass absolute inset-x-4 top-[4.5rem] rounded-3xl border border-ink/10 p-3 shadow-lift md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-charcoal hover:bg-ink/5"
              >
                {l.label}
              </a>
            ))}
            <a href="#journals" onClick={() => setOpen(false)} className="btn-gold mt-1 w-full">
              <ShoppingBag className="h-4 w-4" /> Explore the books
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
