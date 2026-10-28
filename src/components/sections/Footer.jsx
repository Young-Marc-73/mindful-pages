import { ShoppingBag, Sparkles } from "lucide-react";
import Quill from "../brand/Quill";

const nav = {
  Explore: [
    { label: "AI Thinking System", href: "/strategic-thinking" },
    { label: "Books & Journals", href: "/books" },
    { label: "Our Approach", href: "/approach" },
    { label: "Apps", href: "/apps" },
    { label: "About Marc", href: "/about-the-author" },
  ],
  "Available books": [
    { label: "The Workshop", href: "/books/strategic-thinking-workshop" },
    { label: "The Repository", href: "/books/strategic-thinking-repository" },
    { label: "Business Journal", href: "/journals/business-journal" },
    { label: "Research Journal", href: "/journals/research-journal" },
  ],
};

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative mt-10 border-t border-ink/10 bg-cream-soft">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <Quill className="h-9 w-9" animate={false} />
              <span className="font-serif text-xl font-semibold tracking-brand text-ink">
                Mindful Pages
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-muted">
              Books, journals, and a growing app for gathering knowledge, developing understanding,
              putting it to work, and learning from what happens.
            </p>
            <p className="mt-5 font-serif text-lg italic text-gold-deep">
              Give your business thinking a place to grow.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-serif text-base text-ink">{heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      className="text-sm text-charcoal-muted transition-colors hover:text-ink"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <h4 className="font-serif text-base text-ink">Explore Mindful Pages</h4>
            <a
              href="/books"
              className="btn-gold mt-4 w-full justify-center px-4 py-2.5 text-sm"
            >
              <ShoppingBag className="h-4 w-4" /> Explore the books
            </a>
            <a
              href="/apps/business-bloom"
              className="btn-ghost mt-3 w-full justify-center px-4 py-2.5 text-sm"
            >
              <Sparkles className="h-4 w-4" /> Join the app waitlist
            </a>
            <div className="mt-4 flex flex-wrap gap-4 text-sm"><a href="/about-the-author#contact" className="underline">Contact Marc</a><a href="/#privacy" className="underline">Privacy</a></div>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-charcoal-muted sm:flex-row">
          <p>© {year} Mindful Pages. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with care
            <span className="text-terracotta">·</span>
            Four books available now · Business Bloom in development
          </p>
        </div>
      </div>
    </footer>
  );
}
