import { useState } from "react";

export default function ReaderForm({ kind = "books" }) {
  const contact = kind === "contact";
  const name = contact ? "reader-contact" : "book-updates";
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending"); setError("");
    const data = new FormData(form);
    if (data.get("bot-field")) { setStatus("success"); return; }
    const payload = new URLSearchParams();
    for (const [key, value] of data.entries()) payload.append(key, value);
    try {
      const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: payload.toString() });
      if (!response.ok) throw new Error("Submission failed");
      form.reset(); setStatus("success");
    } catch {
      setError("Your request could not be saved. Please try again."); setStatus("error");
    }
  }
  if (status === "success") return <div role="status" className="rounded-2xl border border-sage/40 bg-sage/10 p-6 text-ink"><p className="font-serif text-xl">{contact ? "Thank you. Your message has been received." : "Thank you. You’re on the book release list."}</p><p className="mt-2 text-sm">{contact ? "Marc can review your message and reply by email." : "We’ll email you when the books are available. App updates are included only if you selected them."}</p><button className="mt-4 underline" onClick={() => setStatus("idle")}>Back to form</button></div>;
  return <form name={name} method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} className="space-y-4 text-left">
    <input type="hidden" name="form-name" value={name} />
    <div hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium text-ink">Name (optional)<input name="name" autoComplete="name" className="reader-input" /></label>
      <label className="block text-sm font-medium text-ink">Email address<input name="email" type="email" autoComplete="email" required className="reader-input" /></label>
    </div>
    {contact ? <>
      <label className="block text-sm font-medium text-ink">Subject<select name="subject" className="reader-input"><option>Book question</option><option>Business Bloom question</option><option>Stop release emails</option><option>Privacy or deletion request</option><option>Other</option></select></label>
      <label className="block text-sm font-medium text-ink">Your message<textarea name="message" required rows={4} maxLength={5000} className="reader-input" /></label>
    </> : <>
      <input type="hidden" name="book-updates" value="yes" />
      <label className="flex items-start gap-3 text-sm text-charcoal-muted"><input type="checkbox" name="app-updates" value="yes" className="mt-1 h-4 w-4 accent-[#15182b]" />Also let me know when Business Bloom early access is available.</label>
    </>}
    <p className="text-sm leading-relaxed text-charcoal-muted">{contact ? "We use these details to respond to your request. Please don’t include sensitive business or personal information." : "By signing up, you’re asking for book release emails. To stop them, use the contact form below."} <a href="#privacy" className="underline underline-offset-2">How we use your information</a></p>
    {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
    <button type="submit" disabled={status === "sending"} className="btn-gold disabled:opacity-60">{status === "sending" ? "Sending…" : contact ? "Send message" : "Notify me when the books are available"}</button>
  </form>;
}
