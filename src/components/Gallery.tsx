"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [photos, filter]
  );

  const open = useCallback((i: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setIndex(i);
  }, []);
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

    const previouslyFocused = previousFocusRef.current;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])"
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [index, close, prev, next]);

  const active = index !== null ? filtered[index] : null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
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

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 [grid-auto-flow:dense]">
        {filtered.map((photo, i) => {
          const featured = filtered.length > 6 && i % 9 === 4;
          return (
            <button
              key={photo.slug}
              onClick={() => open(i)}
              aria-label={`Open photo${photo.caption ? `: ${photo.caption}` : ""}`}
              className={`group relative overflow-hidden rounded-xl bg-sand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                featured ? "sm:col-span-2 sm:row-span-2 aspect-square" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photoUrl(photo.slug, "thumb")}
                alt={photo.caption ?? "Rancho Alegria, Parcel 107"}
                fill
                sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
                placeholder={photo.blurDataURL ? "blur" : undefined}
                blurDataURL={photo.blurDataURL}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {photo.caption && (
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent px-3 pb-2 pt-6 text-left text-xs leading-snug text-sand opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {photo.caption}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink/50">No photos in this category yet.</p>
      )}

      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? "Photo viewer"}
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 px-4 py-8 outline-none"
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
            key={active.slug}
            src={photoUrl(active.slug, "full")}
            alt={active.caption ?? "Rancho Alegria, Parcel 107"}
            width={active.width}
            height={active.height}
            sizes="90vw"
            placeholder={active.blurDataURL ? "blur" : undefined}
            blurDataURL={active.blurDataURL}
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-in h-auto max-h-[80vh] w-auto max-w-[90vw] rounded-lg object-contain"
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
