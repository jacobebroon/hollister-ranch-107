"use client";

import { useState } from "react";
import Image from "next/image";
import { photoUrl } from "@/lib/media";

// Google Maps pulls in ~1MB of scripts, so it only loads once a visitor asks for it
export default function MapEmbed({
  src,
  title,
  label,
  posterAlt,
}: {
  src: string;
  title: string;
  label: string;
  posterAlt: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-cream-line shadow-lg sm:h-[420px]">
      {show ? (
        <iframe title={title} src={src} className="h-full w-full" />
      ) : (
        <button type="button" onClick={() => setShow(true)} className="group absolute inset-0">
          <Image
            src={photoUrl("ranch-004", "thumb")}
            alt={posterAlt}
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            quality={70}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-ink/45 transition-colors group-hover:bg-ink/35" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="flex items-center gap-2 rounded-full bg-sand px-6 py-3 text-sm font-semibold text-ink shadow-lg transition-transform group-hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              {label}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
