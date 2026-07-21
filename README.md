# Mindful Pages — Marketing Website

A polished, animated single-page marketing site for the Mindful Pages journal brand.
Built with **Vite + React + Tailwind CSS + Framer Motion**, using magicui-style components
and real cover art pulled from Canva.

> **Tagline in use:** "Structure, not just paper."
> Alternates you can swap into `src/components/sections/Hero.jsx`:
> • "A journal that thinks with you." • "Guided pages for a clearer mind."

---

## ▶️ Run it locally

```bash
cd ~/mindful-pages
npm install     # first time only
npm run dev     # then open the printed http://localhost:5173 URL
```

Other commands:
- `npm run build` — build the production site into `dist/`
- `npm run preview` — preview that production build

---

## 🔗 Where to paste your real Amazon links

Open **`src/data/journals.js`**. Every journal has this line:

```js
amazonUrl: PLACEHOLDER,   //  ← currently "REPLACE-WITH-AMAZON-URL"
```

Replace `PLACEHOLDER` with your real listing URL as a string, e.g.:

```js
amazonUrl: "https://www.amazon.com/dp/B0XXXXXXXX",
```

Do this for each journal you want linked. Every "View on Amazon" button and the
"Shop on Amazon" navbar button use these automatically. (Buttons with the placeholder
are intentionally inert so nothing links to a dead page.)

---

## 🖼️ The cover images

Real covers exported from your Canva live in **`public/images/covers/`**:

| File | Journal |
|------|---------|
| `business-journal.png` | Business Journal |
| `business-planner.png` | Business Planner |
| `strategic-thinking.png` | Strategic Thinking |
| `research-journal.png` | Research Journal |
| `platforms-logbook.png` | Digital Life Log / Platform Organizer |
| `daily-planner.png` | Daily Planner (interior) |
| `floral-womens.png` | Floral Women's Journal (interior) |
| `brand-titlepage.png` | Brand quill wordmark (reference) |

Journals **without** a Canva cover render a designed, on-brand cover *tile*
(navy+gold or cream+sage) — see `src/components/brand/CoverArt.jsx`. To use a real
cover later, drop the PNG into `public/images/covers/` and set `cover: "/images/covers/your.png"`
on that journal in `src/data/journals.js`.

---

## 🎨 Palette & fonts

All colors were sampled from your actual covers and live in **`tailwind.config.js`**
(`ink`, `gold`, `cream`, `sage`, `terracotta`, `plum`, …). Fonts are **Fraunces**
(serif display) + **Inter** (sans), loaded in `index.html`.

---

## 📥 The app waitlist (Netlify Forms)

The **"The App"** section (`src/components/sections/AppSection.jsx`) ends with a
waitlist signup (`src/components/WaitlistForm.jsx`) wired to **Netlify Forms**.

**How submissions reach you:** once this repo is deployed to Netlify, entries land in
**Netlify dashboard → Forms → "waitlist"** (you can add email notifications there).
Nothing to paste — it works automatically because:
- `index.html` contains a hidden `<form name="waitlist" data-netlify="true">` twin that
  Netlify detects at deploy time.
- The React form POSTs url-encoded data to `/` with `form-name=waitlist`.
- A honeypot field (`bot-field`) blocks basic spam.

**Local testing:** in `npm run dev`, Netlify isn't in the loop, so the form *simulates*
a successful submit (so you can see the success UX). Real recording only happens on the
deployed site — submit there, then check Forms → waitlist.

**Prefer Formspree instead?** Open `src/components/WaitlistForm.jsx` and set
`FORMSPREE_ENDPOINT` (top of file) to your endpoint, e.g. `"https://formspree.io/f/abcdxyz"`.
The form auto-switches to Formspree when that value is set.

Deploy config lives in `netlify.toml` (build `npm run build`, publish `dist`).

## 🧩 Project structure

```
src/
  components/
    magicui/     Marquee, BentoGrid, AnimatedShinyText, DotPattern
    motion/      Reveal + Stagger (Framer Motion scroll reveals)
    brand/       Quill (animated), CoverArt (real cover or designed tile)
    sections/    Navbar, Hero, CoverMarquee, Approach, JournalGrid,
                 FeaturedJournal, WhySection, Testimonials, Newsletter, Footer
    JournalCard.jsx
  data/journals.js   ← edit your journals + Amazon links here
  App.jsx            ← page section order
```
