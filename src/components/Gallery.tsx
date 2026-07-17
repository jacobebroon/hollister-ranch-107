"use client";

import { useState, useCallback, useEffect } from "react";
import { photoUrl } from "@/lib/media";
import type { Photo } from "@/data/photos";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {photos.map((photo, i) => (
          <button
            key={photo.slug}
            onClick={() => setIndex(i)}
            className="block w-full overflow-hidden rounded-xl bg-sand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <img
              src={photoUrl(photo.slug, "thumb")}
              alt={photo.caption ?? "Rancho Alegria, Parcel 107"}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 hover:scale-105"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 px-4 py-8"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 text-sand/80 hover:text-sand"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-sand/70 hover:text-sand sm:left-6"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <img
            src={photoUrl(photos[index].slug, "full")}
            alt={photos[index].caption ?? "Rancho Alegria, Parcel 107"}
            className="max-h-[80vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {photos[index].caption && (
            <p className="mt-4 max-w-2xl text-center text-sm text-sand/70">{photos[index].caption}</p>
          )}

          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-sand/70 hover:text-sand sm:right-6"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
