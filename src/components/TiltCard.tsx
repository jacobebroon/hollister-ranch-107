"use client";

import { useRef } from "react";

export default function TiltCard({
  src,
  alt,
  aspect = "4 / 3",
}: {
  src: string;
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
      className="overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 ease-out will-change-transform"
      style={{ aspectRatio: aspect }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
