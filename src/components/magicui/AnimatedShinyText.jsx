import { cn } from "../../lib/utils";

/**
 * AnimatedShinyText — magicui-style shimmering text.
 * A soft light sweeps across the text using an animated background clip.
 */
export default function AnimatedShinyText({ children, className, shimmerWidth = 100 }) {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px` }}
      className={cn(
        "mx-auto max-w-md text-charcoal-muted",
        // Shimmer sweep
        "animate-shine bg-clip-text [background-size:var(--shiny-width)_100%] [background-position:0_0] bg-no-repeat",
        "[background-image:linear-gradient(110deg,transparent_40%,rgba(199,154,60,0.9)_50%,transparent_60%)]",
        className
      )}
    >
      {children}
    </span>
  );
}
