import { useEffect, useRef, useState } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import TrackedVideo, { trackVideoEvent } from "../TrackedVideo";

const videos = [
  {
    id: "knowledge", stage: "Knowledge", duration: "3:30",
    title: "Learn what matters. Find who can help.",
    description: "See how the Research Journal preserves learning and the Team Management Journal helps you strengthen the relationships around your business.",
    books: "Research Journal · Team Management Journal",
    src: "/videos/knowledge.mp4", poster: "/videos/knowledge-poster.webp",
    transcript: "/videos/knowledge-transcript.txt",
    links: [{ href: "/journals/research-journal", label: "Explore the Research Journal" }],
  },
  {
    id: "understanding", stage: "Understanding", duration: "4:01",
    title: "Make sense of your business.",
    description: "Watch scattered observations become a working understanding, then see how Strategic Thinking helps you choose a method for the work.",
    books: "Business Journal · Strategic Thinking: The Workshop & The Repository",
    src: "/videos/understanding.mp4", poster: "/videos/understanding-poster.webp",
    transcript: "/videos/understanding-transcript.txt",
    links: [{ href: "/journals/business-journal", label: "Explore the Business Journal" }, { href: "/books/strategic-thinking-workshop", label: "Explore Strategic Thinking" }],
  },
  {
    id: "wisdom", stage: "Wisdom", duration: "3:52",
    title: "Put learning into practice.",
    description: "See how the Business Planner gives commitments a home and the Business Diary gives you room to understand your experience and what matters to you.",
    books: "Business Planner · Business Diary",
    src: "/videos/wisdom.mp4", poster: "/videos/wisdom-poster.webp",
    transcript: "/videos/wisdom-transcript.txt",
    links: [{ href: "/#book-updates", label: "Get book release updates" }],
  },
];

function selectedFromHash() {
  const id = (typeof window === "undefined" ? "" : window.location.hash).replace("#watch-", "");
  return videos.some((v) => v.id === id) ? id : "knowledge";
}

export default function JournalVideos() {
  const [selected, setSelected] = useState(selectedFromHash);
  const [failed, setFailed] = useState(false);
  const tabRefs = useRef([]);
  const current = videos.find((v) => v.id === selected);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace("#watch-", "");
      if (videos.some((v) => v.id === id)) { setSelected(id); setFailed(false); }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function select(id) {
    setSelected(id);
    setFailed(false);
    window.history.replaceState(null, "", `#watch-${id}`);
  }

  function onTabKeyDown(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % videos.length;
    if (event.key === "ArrowLeft") next = (index + videos.length - 1) % videos.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = videos.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    select(videos[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div id="journal-videos" className="relative mt-16 scroll-mt-32 rounded-3xl border border-ink/10 bg-cream-soft p-5 shadow-soft sm:p-8">
      {videos.map((v) => <span key={v.id} id={`watch-${v.id}`} className="absolute top-0 scroll-mt-32" aria-hidden="true" />)}
      <div className="mx-auto max-w-2xl text-center">
        <span className="kicker mb-4"><PlayCircle className="h-4 w-4" aria-hidden="true" /> See the journals in use</span>
        <h3 className="font-serif text-3xl text-ink sm:text-4xl">See the journals at work.</h3>
        <p className="mt-3 text-charcoal-muted">Choose a stage. See the actual pages and follow one business example through the process. Each journal can also be used on its own.</p>
      </div>
      <div role="tablist" aria-label="Journal explainer videos" className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {videos.map((v, index) => (
          <button key={v.id} ref={(node) => { tabRefs.current[index] = node; }}
            id={`video-tab-${v.id}`} role="tab" type="button"
            aria-selected={selected === v.id} aria-controls="journal-video-panel"
            tabIndex={selected === v.id ? 0 : -1}
            onClick={() => select(v.id)} onKeyDown={(event) => onTabKeyDown(event, index)}
            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${selected === v.id ? "border-ink bg-ink text-cream-soft" : "border-ink/15 text-ink hover:border-gold hover:bg-gold/10"}`}>
            <span>{v.stage}</span><span className={selected === v.id ? "text-cream-soft/75" : "text-charcoal-muted"}>{v.duration}</span>
          </button>
        ))}
      </div>
      <div id="journal-video-panel" role="tabpanel" aria-labelledby={`video-tab-${selected}`} tabIndex={0} className="mt-6 rounded-xl focus-visible:outline-gold">
        <h4 className="font-serif text-2xl text-ink">{current.title}</h4>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-charcoal-muted">{current.description}</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-ink">
          <TrackedVideo key={current.id} video={current} controls playsInline preload="none" poster={current.poster}
            src={current.src} aria-label={`${current.stage}: ${current.title}`} onError={() => setFailed(true)}
            className="block aspect-video w-full">
            Your browser does not support this video. <a href={current.src}>Download the video</a>.
          </TrackedVideo>
        </div>
        {failed && <p role="status" className="mt-3 text-sm text-charcoal-muted">The video could not load. Please try <a href={current.src} className="underline">opening the video directly</a>.</p>}
        <p className="mt-4 text-sm font-medium text-ink">{current.books}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          {current.links.map((link) => <a key={link.href} href={link.href} onClick={() => trackVideoEvent("video_book_link_click", current, { link_target: link.href })} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-gold underline-offset-4">{link.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>)}
          <a href={current.transcript} className="text-sm text-charcoal-muted underline underline-offset-4">Read the transcript</a>
        </div>
      </div>
      <p className="mt-7 border-t border-ink/10 pt-5 text-sm leading-relaxed text-charcoal-muted"><strong className="text-ink">Evaluation connects every stage:</strong> review what happened and carry the learning forward.</p>
    </div>
  );
}
