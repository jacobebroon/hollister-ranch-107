"use client";

import { useRef } from "react";
import Photo from "@/components/Photo";

export default function TiltCard({
  slug,
  alt,
  aspect = "4 / 3",
}: {
  slug: string;
  alt: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.02,1.02,1.02)`;
    el.style.setProperty("--glare-x", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--glare-y", `${(y + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt-card relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 ease-out will-change-transform"
      style={{ aspectRatio: aspect }}
    >
      <Photo slug={slug} alt={alt} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      <div className="tilt-glare pointer-events-none absolute inset-0" />
    </div>
  );
}
