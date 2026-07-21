import { cn } from "../../lib/utils";

/**
 * ShimmerButton — magicui-style button with a slow shimmer traveling its border.
 * A rotating conic-gradient sits behind a solid inset surface, so only a thin
 * shimmering ring shows. Calm and premium — not flashy.
 */
export default function ShimmerButton({
  children,
  className,
  shimmerColor = "#f0ce5b", // bright gold
  background = "#14182a", // ink
  as: Tag = "button",
  ...props
}) {
  return (
    <Tag
      {...props}
      style={{ "--shimmer": shimmerColor, "--bg": background }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5",
        "text-sm font-semibold text-cream-soft shadow-gold transition-transform duration-300 hover:-translate-y-0.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        className
      )}
    >
      {/* Rotating shimmer ring */}
      <span
        aria-hidden
        className="absolute inset-0 [container-type:size]"
      >
        <span className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,var(--shimmer)_10%,transparent_25%)] opacity-80" />
      </span>
      {/* Solid inset surface */}
      <span
        className="absolute inset-[1.5px] rounded-full"
        style={{ background: "var(--bg)" }}
      />
      {/* Soft highlight sweep on hover */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  );
}
