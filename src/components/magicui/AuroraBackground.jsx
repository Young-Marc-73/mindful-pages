import { cn } from "../../lib/utils";

/**
 * AuroraBackground — magicui-style soft animated gradient field.
 * Slow-panning brand-colored blobs behind a subtle grid — calm, premium, "new".
 * Purely decorative (aria-hidden).
 */
export default function AuroraBackground({ className }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Panning gradient wash */}
      <div className="absolute inset-0 animate-gradient-pan bg-[length:200%_200%] bg-[linear-gradient(115deg,#14182a_0%,#1b2136_35%,#233a4a_55%,#14182a_100%)]" />

      {/* Aurora blobs */}
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold/25 blur-[90px] animate-float-slow" />
      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-sage/20 blur-[90px] animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-1/3 h-72 w-96 rounded-full bg-plum/20 blur-[100px] animate-float-slow" style={{ animationDelay: "3s" }} />

      {/* Fine grid texture */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fffdf8_1px,transparent_1px),linear-gradient(to_bottom,#fffdf8_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(80%_80%_at_50%_40%,#000,transparent)]" />
    </div>
  );
}
