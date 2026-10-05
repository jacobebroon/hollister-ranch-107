"use client";

import { useState } from "react";
import Image from "next/image";
import { photoUrl } from "@/lib/media";
import { openPhotoTour } from "@/components/PhotoTour";
import type { Photo } from "@/data/photos";
import type { Dict } from "@/i18n";
import { SPOTS, AMENITY_SLUGS } from "@/data/estate";

const AERIAL_SLUG = "dsc-0077";

export default function EstateExplorer({ t, photos }: { t: Dict["estate"]; photos: Photo[] }) {
  const [active, setActive] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const spot = SPOTS[active];
  const info = t.spots[active];
  const slug = spot.slugs[photoIndex % spot.slugs.length];
  const photo = photos.find((p) => p.slug === slug);

  const select = (i: number) => {
    setActive(i);
    setPhotoIndex(0);
  };

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-stretch">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lg">
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
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <span className="relative grid h-9 w-9 place-items-center">
                  <span
                    className={`absolute inset-0 rounded-full ${isActive ? "bg-gold" : "bg-sand"} animate-marker-pulse`}
                    aria-hidden="true"
                  />
                  <span
                    className={`relative grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold shadow-lg transition-transform group-hover:scale-110 ${
                      isActive ? "border-sand bg-terracotta text-sand" : "border-terracotta bg-sand text-terracotta"
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
          <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-sand/90 backdrop-blur sm:hidden">
            {t.hint}
          </p>
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
                className="absolute inset-0"
                aria-label={photo.caption ?? info.title}
              >
                <Image
                  key={photo.slug}
                  src={photoUrl(photo.slug, "thumb")}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={80}
                  placeholder={photo.blurDataURL ? "blur" : undefined}
                  blurDataURL={photo.blurDataURL}
                  className="photo-enhance animate-fade-in object-cover"
                />
              </button>
            )}
            {spot.slugs.length > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1">
                <button
                  type="button"
                  onClick={() => setPhotoIndex((p) => (p - 1 + spot.slugs.length) % spot.slugs.length)}
                  aria-label={t.prevPhoto}
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-sand backdrop-blur transition-colors hover:bg-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoIndex((p) => (p + 1) % spot.slugs.length)}
                  aria-label={t.nextPhoto}
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-sand backdrop-blur transition-colors hover:bg-ink"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
              {active + 1} / {SPOTS.length}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-bold text-ink">{info.title}</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{info.body}</p>
            {photo?.caption && <p className="mt-4 text-sm italic text-ink/55">{photo.caption}</p>}
          </div>
          <div className="flex gap-2 border-t border-cream-line px-6 py-4">
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
