"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 113, decimals: 0, suffix: "", commas: false, label: "Private acres" },
  { target: 14400, decimals: 0, suffix: "", commas: true, label: "Acre ranch" },
  { target: 8.5, decimals: 1, suffix: " mi", commas: false, label: "Untouched coastline" },
  { target: 1866, decimals: 0, suffix: "", commas: false, label: "Ranch founded" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, decimals: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }

    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      setValue(target * easeOutCubic(t));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value.toFixed(decimals);
}

function Stat({
  target,
  decimals,
  suffix,
  commas,
  label,
  active,
}: (typeof STATS)[number] & { active: boolean }) {
  const raw = useCountUp(target, decimals, active);
  const display = commas ? Number(raw).toLocaleString() : raw;

  return (
    <div className="text-center">
      <p className="font-serif text-3xl font-bold text-terracotta tabular-nums sm:text-4xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-ink/60">{label}</p>
    </div>
  );
}

export default function StatBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} active={active} />
      ))}
    </div>
  );
}
