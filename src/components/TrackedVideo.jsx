import { useEffect, useRef } from "react";

// Use the site's existing Google tag; never load a second tag or collect identities.
export function trackVideoEvent(name, video, extra = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    video_id: video.id,
    video_title: video.title,
    video_url: new URL(video.src, window.location.origin).href,
    video_provider: "html5",
    ...extra,
  });
}

export default function TrackedVideo({ video, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const player = ref.current;
    let started = false;
    let completed = false;
    let lastTime = null;
    let watched = 0;
    const milestones = new Set();
    const emit = (name, extra = {}) => trackVideoEvent(name, video, {
      video_duration: Math.round(player.duration || 0),
      video_current_time: Math.round(player.currentTime),
      watched_seconds: Math.round(watched),
      ...extra,
    });
    const playing = () => {
      lastTime = player.currentTime;
      if (!started) { started = true; emit("video_start"); }
    };
    const progress = () => {
      const now = player.currentTime;
      // Count forward playback only: seeking ahead must not count as watching.
      if (!player.paused && !player.seeking && lastTime !== null) {
        const delta = now - lastTime;
        if (delta > 0 && delta <= 2) watched += delta;
      }
      lastTime = now;
      if (!started || !Number.isFinite(player.duration) || player.duration <= 0) return;
      for (const percent of [25, 50, 75, 90]) {
        if (watched / player.duration >= percent / 100 && !milestones.has(percent)) {
          milestones.add(percent);
          emit("video_progress", { video_percent: percent });
        }
      }
    };
    const resetClock = () => { lastTime = null; };
    const ended = () => {
      if (started && !completed) {
        completed = true;
        emit(watched / player.duration >= 0.95 ? "video_complete" : "video_end", {
          video_percent: Math.min(100, Math.round(watched / player.duration * 100)),
        });
      }
    };
    const listeners = { playing, timeupdate: progress, seeking: resetClock, pause: resetClock, ended };
    for (const [name, listener] of Object.entries(listeners)) player.addEventListener(name, listener);
    return () => {
      for (const [name, listener] of Object.entries(listeners)) player.removeEventListener(name, listener);
    };
  }, [video]);
  return <video ref={ref} {...props} src={video.src} />;
}
