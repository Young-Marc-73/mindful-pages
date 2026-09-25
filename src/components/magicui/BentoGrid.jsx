import { cn } from "../../lib/utils";

/**
 * BentoGrid / BentoCard — magicui-style bento layout.
 * BentoCard supports a background layer, an icon, title/description, and a
 * hover-revealed action row. Spans are controlled per-card via className.
 */
export function BentoGrid({ children, className }) {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta = "Learn more",
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
        "border border-ink/10 bg-cream-soft shadow-soft",
        "transform-gpu transition-all duration-500 hover:shadow-lift",
        className
      )}
    >
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-0">{background}</div>

      {/* Foreground content, slides up slightly on hover */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-7 pb-16 transition-all duration-500 ">
        {Icon && (
          <Icon className="h-9 w-9 origin-left text-gold-deep transition-all duration-500 ease-in-out group-hover:scale-90" />
        )}
        <h3 className="mt-2 text-2xl font-semibold text-ink">{name}</h3>
        <p className="max-w-lg text-charcoal-muted">{description}</p>
      </div>

      {/* Hover CTA */}
      <div className="pointer-events-none absolute bottom-0 z-10 flex w-full transform-gpu flex-row items-center p-7 opacity-100 transition-all duration-500">
        <a
          href={href}
          className="pointer-events-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep hover:text-ink"
        >
          {cta} <span aria-hidden>→</span>
        </a>
      </div>

      {/* Warm wash on hover */}
      <div className="pointer-events-none absolute inset-0 transform-gpu bg-gold/[0.03] opacity-0 transition-all duration-500 group-hover:opacity-100" />
    </div>
  );
}
