"use client";

import { useEffect, useRef } from "react";

export default function ParallaxLayer({
  children,
  strength = 30,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = el.parentElement;
    let frame = 0;

    const update = () => {
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      const progress = Math.max(-1, Math.min(1, centerOffset / vh));
      el.style.transform = `translate3d(0, ${(progress * strength).toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={ref} className="absolute inset-[-6%]">
      {children}
    </div>
  );
}
