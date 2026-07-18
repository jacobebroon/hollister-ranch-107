"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { photoUrl } from "@/lib/media";
import { CATEGORY_LABELS, type Category, type Photo } from "@/data/photos";

const FILTERS: Array<{ key: Category | "all"; label: string }> = [
  { key: "all", label: "All Photos" },
  { key: "residence", label: CATEGORY_LABELS.residence },
  { key: "grounds", label: CATEGORY_LABELS.grounds },
  { key: "coastline", label: CATEGORY_LABELS.coastline },
  { key: "sky", label: CATEGORY_LABELS.sky },
];

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [photos, filter]
  );

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
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

  const active = index !== null ? filtered[index] : null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.key
                ? "border-terracotta bg-terracotta text-sand"
                : "border-cream-line text-ink/70 hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((photo, i) => (
          <button
            key={photo.slug}
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <Image
              src={photoUrl(photo.slug, "thumb")}
              alt={photo.caption ?? "Rancho Alegria, Parcel 107"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              placeholder={photo.blurDataURL ? "blur" : undefined}
              blurDataURL={photo.blurDataURL}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink/50">No photos in this category yet.</p>
      )}

      {active && (
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

          <Image
            src={photoUrl(active.slug, "full")}
            alt={active.caption ?? "Rancho Alegria, Parcel 107"}
            width={active.width}
            height={active.height}
            sizes="90vw"
            placeholder={active.blurDataURL ? "blur" : undefined}
            blurDataURL={active.blurDataURL}
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-[80vh] w-auto max-w-[90vw] rounded-lg object-contain"
          />
          {active.caption && (
            <p className="mt-4 max-w-2xl text-center text-sm text-sand/70">{active.caption}</p>
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
