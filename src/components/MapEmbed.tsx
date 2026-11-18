"use client";

import { useState } from "react";
import Image from "next/image";
import { photoUrl } from "@/lib/media";

type Labels = {
  title: string;
  show: string;
  posterAlt: string;
  map: string;
  satellite: string;
  openGoogle: string;
  openApple: string;
};

// Google Maps pulls in ~1MB of scripts, so it only loads once a visitor asks for it
export default function MapEmbed({
  lat,
  lng,
  lang,
  labels,
}: {
  lat: number;
  lng: number;
  lang: string;
  labels: Labels;
}) {
  const [show, setShow] = useState(false);
  const [view, setView] = useState<"k" | "m">("k");
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=14&t=${view}&hl=${lang}&output=embed`;
  const google = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const apple = `https://maps.apple.com/?ll=${lat},${lng}&q=Rancho%20Alegria&t=k`;

  const tab = (v: "k" | "m", label: string) => (
    <button
      type="button"
      onClick={() => { setView(v); setShow(true); }}
      aria-pressed={show && view === v}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        show && view === v ? "bg-ink text-sand" : "text-ink/70 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-full border border-cream-line bg-sand-deep/50 p-1">
          {tab("k", labels.satellite)}
          {tab("m", labels.map)}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={google} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cream-line px-3.5 py-1.5 text-xs font-semibold text-ocean transition-colors hover:border-terracotta hover:text-terracotta">
            {labels.openGoogle} ↗
          </a>
          <a href={apple} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cream-line px-3.5 py-1.5 text-xs font-semibold text-ocean transition-colors hover:border-terracotta hover:text-terracotta">
            {labels.openApple} ↗
          </a>
        </div>
      </div>
      <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-cream-line shadow-lg sm:h-[460px]">
        {show ? (
          <iframe key={view} title={labels.title} src={src} loading="lazy" className="h-full w-full" />
        ) : (
          <button type="button" onClick={() => setShow(true)} className="group absolute inset-0">
            <Image
              src={photoUrl("hc-front-a", "thumb")}
              alt={labels.posterAlt}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              quality={70}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/40 transition-colors group-hover:bg-ink/30" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="flex items-center gap-2 rounded-full bg-sand px-6 py-3 text-sm font-semibold text-ink shadow-lg transition-transform group-hover:scale-105">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {labels.show}
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
