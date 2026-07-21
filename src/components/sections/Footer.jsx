import { Instagram, ShoppingBag, Sparkles } from "lucide-react";
import Quill from "../brand/Quill";

const nav = {
  Explore: [
    { label: "Journals", href: "#journals" },
    { label: "Our Approach", href: "#approach" },
    { label: "The App", href: "#app" },
    { label: "Why Mindful Pages", href: "#about" },
  ],
  Popular: [
    { label: "Songwriter's Journal", href: "#journals" },
    { label: "Business Journal", href: "#journals" },
    { label: "Digital Life Log Book", href: "#journals" },
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
            <a href="#top" className="flex items-center gap-2.5">
              <Quill className="h-9 w-9" animate={false} />
              <span className="font-serif text-xl font-semibold tracking-brand text-ink">
                Mindful Pages
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-muted">
              Structured journals and planners that walk you through the process — so you get
              structure, not just paper.
            </p>
            <p className="mt-5 font-serif text-lg italic text-gold-deep">
              Structure, not just paper.
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
            <h4 className="font-serif text-base text-ink">Get one</h4>
            <a
              href="#journals"
              className="btn-gold mt-4 w-full justify-center px-4 py-2.5 text-sm"
            >
              <ShoppingBag className="h-4 w-4" /> Shop on Amazon
            </a>
            <a
              href="#app"
              className="btn-ghost mt-3 w-full justify-center px-4 py-2.5 text-sm"
            >
              <Sparkles className="h-4 w-4" /> Join the app waitlist
            </a>
            <a
              href="https://instagram.com/tenfoldmarc"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-charcoal-muted transition-colors hover:text-ink"
            >
              <Instagram className="h-4 w-4" /> Follow along
            </a>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-charcoal-muted sm:flex-row">
          <p>© {year} Mindful Pages. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with care
            <span className="text-terracotta">·</span>
            Printed on demand & shipped via Amazon KDP
          </p>
        </div>
      </div>
    </footer>
  );
}
