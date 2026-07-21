import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Quill — the Mindful Pages brand motif.
 * An elegant feather pen that "draws itself" on mount (Framer Motion path animation).
 */
export default function Quill({ className, animate = true }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.2 + i * 0.25, duration: 1.4, ease: "easeInOut" },
        opacity: { delay: 0.2 + i * 0.25, duration: 0.4 },
      },
    }),
  };

  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("h-10 w-10", className)}
      initial={animate ? "hidden" : false}
      animate={animate ? "visible" : false}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true }}
    >
      {/* Feather body */}
      <motion.path
        d="M50 12C39 13.8 29.5 19.2 23 27.2 16.6 35 13.3 42.6 11.8 51.5c7.2-1.8 14.9-4.6 21.1-9.9C41 34.9 46.5 25.4 50 12Z"
        className="fill-gold/20 stroke-gold"
        strokeWidth="1.6"
        strokeLinejoin="round"
        variants={draw}
        custom={0}
      />
      {/* Vane lines */}
      <motion.path
        d="M42 18c-7 4.8-13 11.4-17.4 19.2M45 24c-7 4.3-13 10.3-17.5 18"
        className="stroke-gold-deep"
        strokeWidth="1.3"
        strokeLinecap="round"
        variants={draw}
        custom={1}
      />
      {/* Ink nib flourish */}
      <motion.path
        d="M11.8 51.5 7.5 55.6l3.9.7.8 4"
        className="stroke-sage-deep"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        custom={2}
      />
    </motion.svg>
  );
}
