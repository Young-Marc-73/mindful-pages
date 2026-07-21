import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merge Tailwind class names intelligently.
 * Used by every component (this is the standard magicui / shadcn helper).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
