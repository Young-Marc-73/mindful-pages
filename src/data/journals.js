// ─────────────────────────────────────────────────────────────────────────────
//  Mindful Pages — journal catalog
//
//  👉 TO ADD YOUR REAL AMAZON LINKS: replace each `amazonUrl` value below.
//     Look for the string "REPLACE-WITH-AMAZON-URL" — swap it for the product's
//     Amazon listing URL (e.g. "https://www.amazon.com/dp/XXXXXXXXXX").
//     Everything else on the site wires up automatically.
// ─────────────────────────────────────────────────────────────────────────────

const PLACEHOLDER = "REPLACE-WITH-AMAZON-URL";

/**
 * cover  → path under /public for a real Canva cover, OR null to render a
 *          designed in-brand cover tile (see `tile`).
 * tile   → { variant: "ink" | "cream", motif: lucide icon name } used when
 *          no photographic cover exists yet.
 */
export const journals = [
  {
    id: "songwriter",
    title: "Songwriter's Journal",
    audience: "For songwriters",
    price: "$24",
    description:
      "Capture the spark, then shape it — lyric pages, chord charts, and a verse-to-bridge workflow that turns fragments into finished songs.",
    cover: "/images/covers/songwriter.jpg",
    amazonUrl: "https://www.amazon.com/dp/B0DLSNBN1R",
    featured: true,
    tags: ["Creative", "Structured"],
  },
  {
    id: "platforms",
    title: "Digital Life Log Book",
    audience: "For managing your online life",
    price: "$18",
    description:
      "One calm home for every account, subscription, and login you juggle — the Platforms Log Book brings order to your scattered digital life.",
    cover: "/images/covers/platforms-logbook.png",
    amazonUrl: PLACEHOLDER,
    tags: ["Organizer", "Everyday"],
  },
  {
    id: "business-journal",
    title: "Business Journal",
    audience: "For entrepreneurs",
    price: "$28",
    description:
      "The flagship. A guided system to think through your business daily — from big-picture vision down to the next right move.",
    cover: "/images/covers/business-journal.png",
    amazonUrl: PLACEHOLDER,
    series: "Business Series",
    tags: ["Business", "Flagship"],
  },
  {
    id: "strategic-thinking",
    title: "Strategic Thinking",
    audience: "Business Series companion",
    price: "$22",
    description:
      "Slow down and think in frameworks. Prompts that pull you up to strategy when the day keeps dragging you into the weeds.",
    cover: "/images/covers/strategic-thinking.png",
    amazonUrl: PLACEHOLDER,
    series: "Business Series",
    tags: ["Business", "Companion"],
  },
  {
    id: "research",
    title: "Research Journal",
    audience: "Business Series companion",
    price: "$22",
    description:
      "A structured place to gather, question, and synthesize what you learn — so research becomes decisions, not just notes.",
    cover: "/images/covers/research-journal.png",
    amazonUrl: PLACEHOLDER,
    series: "Business Series",
    tags: ["Business", "Companion"],
  },
  {
    id: "business-planner",
    title: "Business Planner",
    audience: "Business Series companion",
    price: "$26",
    description:
      "Turn strategy into a calendar. Quarterly goals, weekly focus, and daily priorities that keep your business moving forward.",
    cover: "/images/covers/business-planner.png",
    amazonUrl: PLACEHOLDER,
    series: "Business Series",
    tags: ["Business", "Planner"],
  },
  {
    id: "entrepreneur-series",
    title: "4-Journal Entrepreneur Series",
    audience: "For new entrepreneurs",
    price: "$30",
    description:
      "The complete starter set — Business Journal, Strategic Thinking, Research, and Planner working together as one guided system.",
    cover: null,
    tile: { variant: "ink", motif: "Layers" },
    amazonUrl: PLACEHOLDER,
    tags: ["Business", "Bundle"],
  },
];

export const featuredJournal = journals.find((j) => j.featured);
