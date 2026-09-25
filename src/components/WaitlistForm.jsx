import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import ShimmerButton from "./magicui/ShimmerButton";
import BorderBeam from "./magicui/BorderBeam";

// ── How submissions reach you ──────────────────────────────────────────────
// Primary: NETLIFY FORMS. The matching hidden static form lives in index.html
// (name="waitlist") so Netlify detects it at deploy; here we POST url-encoded
// data to "/". Nothing to paste — it just works once deployed to Netlify.
//
// Fallback: if you'd rather use Formspree, set FORMSPREE_ENDPOINT below to your
// endpoint (e.g. "https://formspree.io/f/abcdxyz") — the form auto-switches to it.
const FORMSPREE_ENDPOINT = "REPLACE-WITH-FORMSPREE-ENDPOINT";
const useFormspree = FORMSPREE_ENDPOINT !== "REPLACE-WITH-FORMSPREE-ENDPOINT";

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState(""); // honeypot
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Honeypot: if filled, silently "succeed" (it's a bot)
    if (botField) {
      setStatus("success");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }

    setStatus("submitting");
    const payload = { "first-name": firstName, email, "bot-field": botField };

    // Local dev: Netlify only intercepts POST "/" once deployed, so simulate a
    // successful submit here to test the UX. Real entries record on the live site.
    if (import.meta.env.DEV && !useFormspree) {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setFirstName("");
      setEmail("");
      return;
    }

    try {
      if (useFormspree) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Netlify Forms: POST url-encoded to "/" with the form name
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "waitlist", ...payload }),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      setStatus("success");
      setFirstName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <div id="waitlist" className="relative overflow-hidden rounded-3xl border border-cream-soft/15 bg-ink-soft/60 p-6 shadow-lift backdrop-blur-sm sm:p-8">
      <BorderBeam duration={10} />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-8 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 ring-1 ring-sage/40">
              <Check className="h-7 w-7 text-sage" />
            </div>
            <h3 className="font-serif text-2xl text-cream-soft">You're on the list.</h3>
            <p className="max-w-sm text-cream-soft/70">
              We'll be in touch when early access opens. Thanks for being here early.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-1 text-sm font-semibold text-gold-bright hover:text-gold"
            >
              Add another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name="waitlist"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
            noValidate
          >
            {/* Netlify needs this hidden input to match the form name */}
            <input type="hidden" name="form-name" value="waitlist" />
            {/* Honeypot (hidden from humans, off screen + aria-hidden) */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label>
                Don't fill this out if you're human:
                <input
                  tabIndex={-1}
                  name="bot-field"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="wl-first" className="text-xs font-semibold uppercase tracking-wider text-cream-soft/70">
                  First name <span className="font-normal normal-case text-cream-soft/40">(optional)</span>
                </label>
                <input
                  id="wl-first"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jordan"
                  className="rounded-xl border border-cream-soft/15 bg-ink/40 px-4 py-3 text-sm text-cream-soft placeholder:text-cream-soft/30 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="wl-email" className="text-xs font-semibold uppercase tracking-wider text-cream-soft/70">
                  Email <span className="text-gold-bright">*</span>
                </label>
                <input
                  id="wl-email"
                  ref={emailRef}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? "wl-error" : "wl-reassure"}
                  placeholder="you@yourbusiness.com"
                  className="rounded-xl border border-cream-soft/15 bg-ink/40 px-4 py-3 text-sm text-cream-soft placeholder:text-cream-soft/30 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>
            </div>

            {error && (
              <p id="wl-error" role="alert" className="mt-3 flex items-center gap-1.5 text-sm text-terracotta">
                <AlertCircle className="h-4 w-4" /> {error}
              </p>
            )}

            <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ShimmerButton type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Joining…
                  </>
                ) : (
                  <>
                    Join the waitlist <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </ShimmerButton>
              <p id="wl-reassure" className="text-xs leading-relaxed text-cream-soft/55">
                Be first in line for early access.
                <br className="hidden sm:block" /> App early-access news. <a href="#privacy" className="underline">Privacy</a> · <a href="#contact" className="underline">Stop updates</a>
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
