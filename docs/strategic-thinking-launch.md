# Strategic Thinking: launch connection checklist

This change uses the existing public marketing repository and Netlify host. The paid source ZIP, credentials and order records must never be committed or published in `public/` or `dist/`.

## Approved offer
USD $49, one-time, current downloadable release 1.2.1. No hosted assistant, LLM subscription, future edition or lifetime-update promise. Customer terms are dated 2026-10-28. The owner should review merchant identity, terms, digital-product tax setup and purchase-concern handling before switching live payments on.

## Customer path
`/strategic-thinking` -> accept license -> Stripe Checkout -> `/strategic-thinking/download` -> server verifies paid session, the exact price/product/release and an unrefunded, undisputed successful charge -> private ZIP -> `/strategic-thinking/start`.

This first release uses a private bearer purchase reference rather than customer accounts. Possession of a valid reference permits retrieval for seven days; forwarding it can share access. The reference is removed from the URL before third-party resources load and retained only in sessionStorage. Every download rechecks Stripe. Expiration limits the delivery link, not the licensed working copy. A customer whose tab or reference is lost can contact Marc with their Stripe receipt for manual recovery. The webhook records successful purchase references for recovery without sending email. Automated emailed download links and customer accounts are not implemented.

## Private Netlify configuration
Configure these via the Netlify UI, CLI or API with the Functions scope. Do not put secret values in `netlify.toml`, source files, a browser-exposed VITE variable, commit messages or a chat message. Deploy previews should use test settings only; live origin is fixed to `https://mindfulpages.app`.

- `STRATEGIC_THINKING_ENABLED`: `false` until the test checkout/download completes, then `true` to enable the selected test/live mode.
- `STRATEGIC_THINKING_MODE`: `test`, later `live`.
- `STRATEGIC_THINKING_ORIGIN`: the exact HTTPS test deployment origin, later `https://mindfulpages.app`.
- `STRATEGIC_THINKING_PRICE_ID`: verified Stripe one-time USD 4900-cent price for this product in the matching mode.
- `STRIPE_SECRET_KEY`: server-side Stripe key for the matching mode, with permission to create/retrieve Checkout sessions and read prices, PaymentIntents and charges. Prefer a scoped key where supported. Never expose it to browser code.
- `STRIPE_WEBHOOK_SECRET`: signing secret for the endpoint below, matching the selected account/mode.
- `STRATEGIC_THINKING_AUTOMATIC_TAX`: `true` only after configuring and verifying the merchant's appropriate Stripe Tax settings. Checkout shows applicable tax before payment. No tax registrations or legal tax determination are performed by this change.

The public status endpoint returns only readiness, never keys, private storage URLs or customer records. It keeps checkout closed unless the mode/key/origin/price/webhook configuration and expected ZIP metadata exist. Store access is enforced in server code, not by LLM instructions.

## Stripe setup
Create or reuse the product named “Mindful Pages Strategic Thinking System” with metadata `mindful_pages_product=mindful-pages-strategic-thinking`. Create/reuse one-time USD $49 prices in test and live modes; do not create duplicate products on retries. No subscription is needed.

Configure `https://mindfulpages.app/.netlify/functions/strategic-thinking-webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Use a test endpoint/origin for test mode. Store the returned signing secret privately in Netlify. Configure receipts and support/contact details in the Stripe merchant account. The webhook verifies the raw-body signature and writes a small private order record; actual downloads independently verify the current Stripe state, including refunds and disputes. Repeated events do not send duplicate messages or grant unrelated access.

## Upload the customer ZIP privately
Build a customer distribution from the master seller kit, or create an unpersonalized retail ZIP excluding seller-only files and private release records. Verify that its version and license match the page. Keep it outside this public repository. Run `node scripts/upload-strategic-thinking.mjs` and provide one JSON object on private stdin with `siteID`, a Netlify token, and the absolute `file` path. Never put the token in shell history, source or arguments. The helper writes `paid-downloads/strategic-thinking-1.2.1.zip` to the selected Netlify site's private Blobs store with SHA-256 metadata. No public upload endpoint exists.

This requires actual Netlify authorization, not just GitHub repository permission. An installed Stripe connector does not automatically give the deployed website a Stripe secret key or Netlify storage access.

## Required live checks
Run `npm run test:commerce` and `npm run build`. Then test a real Stripe TEST-mode checkout through the deployed Netlify functions: current terms accepted, matching price, canceled checkout, unpaid session, wrong product, forged reference, successful download, missing private ZIP, expired reference, refunded payment, dispute and webhook signature/retry. Confirm that the actual ZIP opens and contains the expected release. Run a mobile and desktop browser check. Only then enable live mode and do the merchant-approved live verification without charging anyone else's card.

## Current operational limits
The source tests mock external Stripe/Blobs calls. Passing them is not a live payment or storage test. The implementation does not provide time-limited signed URLs independent of the purchase session, per-download fingerprinting, account-bound access, automatic email delivery or automated refund decisions. Do not advertise those features. Avoid including raw purchase references in analytics or logging. Private order records need an owner-defined retention/deletion policy. Retain proof of the exact terms shown at purchase.
