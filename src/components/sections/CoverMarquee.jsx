import Marquee from "../magicui/Marquee";
import CoverArt from "../brand/CoverArt";
import { journals } from "../../data/journals";

/**
 * CoverMarquee — a slow, elegant strip of covers gliding past.
 * One row, with a soft fade at both edges.
 */
export default function CoverMarquee() {
  const row = journals;

  const CoverTile = ({ journal }) => (
    <div className="w-32 shrink-0 sm:w-36">
      <div className="overflow-hidden rounded-lg shadow-cover ring-1 ring-ink/10 transition-transform duration-500 hover:-translate-y-1">
        <CoverArt journal={journal} />
      </div>
    </div>
  );

  return (
    <section aria-hidden="true" className="relative overflow-hidden py-10">
      <div className="hairline mb-10" />
      <div className="relative">
        <Marquee pauseOnHover className="[--duration:48s]">
          {row.map((j) => (
            <CoverTile key={j.id} journal={j} />
          ))}
        </Marquee>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent sm:w-40" />
      </div>
      <div className="hairline mt-10" />
    </section>
  );
}
