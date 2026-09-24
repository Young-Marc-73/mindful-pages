import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

/**
 * AnnouncementBar — slim, dismissible top bar promoting the app waitlist.
 * Controlled by the parent (App) so the navbar can offset beneath it.
 */
export default function AnnouncementBar({ onClose }) {
  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[60] h-10 bg-ink text-cream-soft"
      role="region"
      aria-label="Announcement"
    >
      <div className="container-page flex h-full items-center justify-center gap-3 text-center text-xs sm:text-sm">
        <a
          href="#app"
          className="group inline-flex items-center gap-1.5 font-medium text-cream-soft/90 transition-colors hover:text-gold-bright"
        >
          <span className="hidden sm:inline">Business Bloom is in development —</span>
          <span className="sm:hidden">New app coming —</span>
          <span className="font-semibold text-gold-bright underline-offset-4 group-hover:underline">
            join the waitlist
          </span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-cream-soft/60 transition-colors hover:bg-cream-soft/10 hover:text-cream-soft"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
