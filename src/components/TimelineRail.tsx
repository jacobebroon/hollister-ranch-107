"use client";

import { useEffect, useRef, useState } from "react";

export default function TimelineRail({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(frame);
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const pct = rect.height > 0 ? (anchor - rect.top) / rect.height : 0;
      setProgress(Math.min(1, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 top-0 h-full w-0.5 bg-cream-line" aria-hidden="true" />
      <div
        className="absolute left-0 top-0 w-0.5 bg-terracotta transition-[height] duration-150 ease-out"
        style={{ height: `${progress * 100}%` }}
        aria-hidden="true"
      />
      <ol className="pl-8">{children}</ol>
    </div>
  );
}
