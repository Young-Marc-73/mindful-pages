# Mindful Pages marketing website

Vite + React + Tailwind CSS + Framer Motion. Netlify builds with `npm run build`
and publishes `dist`. The public site is https://mindfulpages.app/.

## Local development

- `npm ci`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Current launch content — September 24, 2026

The catalog features Strategic Thinking: The Workshop, Strategic Thinking:
The Repository, Business Journal, and Research Journal. All are Coming soon.
Business Bloom is in development, with the existing app waitlist retained.
The established palette, animations, and cover assets are preserved. Both
Strategic Thinking entries currently use the existing series cover image;
individual volume cover exports can replace these at publication.

`src/data/journals.js` owns product copy, details, status, and planned prices.

| Title | Planned USD paperback price | Basis |
| --- | --- | --- |
| The Workshop | $21.99 | September 16 KDP Production Package v1.1 |
| The Repository | $29.99 | September 16 KDP Production Package v1.1 |
| Business Journal | $28 | Retained existing website price; earlier replacement not verified |
| Research Journal | $22 | Retained existing website price; earlier replacement not verified |

Marc requested final pricing review at publication. App subscription figures
previously discussed were tentative; no app price is displayed.

Before book launch, review prices, replace volume cover images as needed, and
add verified Amazon listing URLs plus purchase links. Pre-launch cards use
accessible expandable descriptions, with no placeholder purchase links.

The old testimonial section is not rendered because its claims are unverified.
The inactive newsletter mockup is replaced by the closing brand message.

## App waitlist

`src/components/WaitlistForm.jsx` submits to Netlify Forms using the `waitlist`
form name and fields `first-name`, `email`, and `bot-field`. Its matching static
form remains in `index.html`. Entries should appear in Netlify Forms; existing
submission handling is unchanged. Local dev simulates success. Verifying actual
storage requires access to the Netlify Forms dashboard.

## Marketing review improvements — September 25, 2026

- Distinct Strategic Thinking cover fronts extracted from approved v1.2 cover PDFs.
  Covers use contain sizing; optimized WebP assets preserve the complete artwork.
- Three actual manuscript pages per book at `/previews/*.html`, with text
  alternatives. Previews are labeled as current manuscript samples; final print
  layout may change. Source masters are unchanged.
- `book-updates` Netlify form separates book news from optional app news.
- `reader-contact` Netlify form supports questions, stopping updates, and privacy
  requests. Both static schemas are in `index.html`; the original `waitlist`
  form remains for Business Bloom. Read form submissions in Netlify; email
  notification rules still depend on the existing Netlify account configuration.
- Product chooser, practical example, creator introduction, privacy explanation,
  social-preview metadata/image, sitemap, and robots file added.
- Unverified Instagram link removed. Supporting card links no longer need hover.
- Book prices unchanged except for consistent decimal formatting.

Preview sources: Workshop and Repository KDP Interior v1.1; Business Journal
Reader Review Draft v0.12; Research Journal Production Interior v1.1.
