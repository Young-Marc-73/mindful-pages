import { motion } from "framer-motion";

/**
 * Reveal — Framer Motion scroll-reveal wrapper.
 * Fades + slides its children in the first time they scroll into view.
 * `delay` staggers siblings; `y` sets the travel distance.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  as = "div",
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger — parent container that staggers Reveal-like children.
 */
export function Stagger({ children, className, stagger = 0.12 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
