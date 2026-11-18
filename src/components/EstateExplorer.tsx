"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { photoUrl } from "@/lib/media";
import { openPhotoTour } from "@/components/PhotoTour";
import type { Photo } from "@/data/photos";
import type { Dict } from "@/i18n";
import { SPOTS, AMENITY_SLUGS } from "@/data/estate";

const AERIAL_SLUG = "dsc-0077";
const TOUR_MS = 5500;
const ZOOM = 1.22;

export default function EstateExplorer({ t, photos }: { t: Dict["estate"]; photos: Photo[] }) {
  const [active, setActive] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [touring, setTouring] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const spot = SPOTS[active];
  const info = t.spots[active];
  const slug = spot.slugs[photoIndex % spot.slugs.length];
  const photo = photos.find((p) => p.slug === slug);
  const spotPhotos = spot.slugs.map((s) => photos.find((p) => p.slug === s)).filter((p): p is Photo => Boolean(p));

  const select = useCallback((i: number, fromTour = false) => {
    if (!fromTour) setTouring(false);
    setActive((i + SPOTS.length) % SPOTS.length);
    setPhotoIndex(0);
    setZoomed(true);
  }, []);

  // Guided tour: step through the spots on a timer until the visitor takes over
  useEffect(() => {
    if (!touring) return;
    const id = window.setTimeout(() => select(active + 1, true), TOUR_MS);
    return () => window.clearTimeout(id);
  }, [touring, active, select]);

  // Arrow keys move between spots while the guide has focus
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); select(active + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); select(active - 1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [active, select]);

  return (
    <div ref={rootRef}>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-stretch">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lg">
          {/* The aerial and its markers zoom together toward the selected spot */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{
              transform: zoomed ? `scale(${ZOOM})` : "scale(1)",
              transformOrigin: `${spot.x}% ${spot.y}%`,
            }}
          >
            <Image
              src={photoUrl(AERIAL_SLUG)}
              alt={t.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="photo-enhance object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            {SPOTS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={t.spots[i].title}
                  aria-pressed={isActive}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                  style={{ left: `${s.x}%`, top: `${s.y}%`, zIndex: isActive ? 2 : 1 }}
                >
                  <span className="relative grid h-9 w-9 place-items-center">
                    <span
                      className={`absolute inset-0 rounded-full ${isActive ? "bg-gold" : "bg-sand"} animate-marker-pulse`}
                      aria-hidden="true"
                    />
                    <span
                      className={`relative grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold shadow-lg transition-transform group-hover:scale-110 ${
                        isActive ? "scale-110 border-sand bg-terracotta text-sand" : "border-terracotta bg-sand text-terracotta"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-sand shadow sm:block ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    } transition-opacity`}
                  >
                    {t.spots[i].title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls stay put while the photo zooms */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (touring) setTouring(false);
                else { setTouring(true); setZoomed(true); }
              }}
              className="flex items-center gap-1.5 rounded-full bg-ink/80 px-3.5 py-2 text-xs font-semibold text-sand shadow-lg backdrop-blur transition-colors hover:bg-ink"
            >
              {touring ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
              )}
              {touring ? t.tourStop : t.tour}
            </button>
            <button
              type="button"
              onClick={() => { setTouring(false); setZoomed((z) => !z); }}
              aria-pressed={zoomed}
              className="rounded-full bg-ink/80 px-3.5 py-2 text-xs font-semibold text-sand shadow-lg backdrop-blur transition-colors hover:bg-ink"
            >
              {zoomed ? t.zoomOut : t.zoomIn}
            </button>
          </div>
          <p className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-sand/90 backdrop-blur sm:hidden">
            {t.hint}
          </p>
          {touring && (
            <div className="absolute inset-x-0 top-0 h-0.5 bg-sand/20">
              <div key={active} className="animate-tour-progress h-full bg-gold" style={{ animationDuration: `${TOUR_MS}ms` }} />
            </div>
          )}
        </div>

        <div
          key={active}
          className="animate-fade-in flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-sand-deep/40"
          aria-live="polite"
        >
          <div className="relative aspect-[3/2] w-full bg-sand-deep">
            {photo && (
              <button
                type="button"
                onClick={() => openPhotoTour(photo.slug)}
                className="group absolute inset-0"
                aria-label={photo.caption ?? info.title}
              >
                <Image
                  key={photo.slug}
                  src={photoUrl(photo.slug, "thumb")}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={80}
                  className="photo-enhance animate-fade-in object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.7rem] font-semibold text-sand opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  {t.openTour}
                </span>
              </button>
            )}
          </div>
          {spotPhotos.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto border-b border-cream-line bg-sand-deep/60 p-2 [scrollbar-width:thin]">
              {spotPhotos.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => { setTouring(false); setPhotoIndex(i); }}
                  aria-label={`${t.nextPhoto}: ${p.caption ?? info.title}`}
                  aria-pressed={i === photoIndex % spot.slugs.length}
                  className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md transition ${
                    i === photoIndex % spot.slugs.length ? "ring-2 ring-terracotta ring-offset-1 ring-offset-sand-deep" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={photoUrl(p.slug, "thumb")} alt="" fill sizes="64px" quality={60} className="object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              {active + 1} / {SPOTS.length}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-ink">{info.title}</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{info.body}</p>
            {photo?.caption && <p className="mt-4 text-sm italic text-ink/55">{photo.caption}</p>}
          </div>
          <div className="flex items-center gap-2 border-t border-cream-line px-4 py-3">
            <button type="button" onClick={() => select(active - 1)} aria-label={t.prevSpot} className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-ink/70 transition-colors hover:bg-cream-line/60 hover:text-terracotta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="flex flex-1 gap-2">
              {SPOTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={t.spots[i].title}
                  aria-pressed={i === active}
                  className={`h-2.5 flex-1 rounded-full transition-colors ${i === active ? "bg-terracotta" : "bg-cream-line hover:bg-terracotta/40"}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => select(active + 1)} aria-label={t.nextSpot} className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-ink/70 transition-colors hover:bg-cream-line/60 hover:text-terracotta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t.amenitiesTitle}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.amenities.map((label, i) => {
            const amenitySlug = AMENITY_SLUGS[i];
            return amenitySlug ? (
              <button
                key={label}
                type="button"
                onClick={() => openPhotoTour(amenitySlug)}
                className="flex items-center gap-2 rounded-full border border-terracotta/40 bg-terracotta/5 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-terracotta hover:bg-terracotta hover:text-sand"
              >
                {label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            ) : (
              <span key={label} className="rounded-full border border-cream-line px-4 py-2 text-sm font-medium text-ink/70">
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
