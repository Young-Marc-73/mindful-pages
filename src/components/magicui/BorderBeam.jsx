import { cn } from "../../lib/utils";

/**
 * BorderBeam — magicui-style traveling light that orbits an element's border.
 * Drop it inside a `relative` + `rounded-*` container. A small gradient dot rides
 * the element's edge using CSS motion path (offset-path / offset-distance).
 */
export default function BorderBeam({
  className,
  size = 220,
  duration = 9,
  delay = 0,
  colorFrom = "#c79a3c", // gold
  colorTo = "#a9cdc9", // sage
}) {
  return (
    <div
      style={{
        "--size": size,
        "--duration": `${duration}s`,
        "--delay": `-${delay}s`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        // the moving beam
        "[border:1px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
}
