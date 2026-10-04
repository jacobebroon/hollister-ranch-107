"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { photoUrl } from "@/lib/media";
import type { Category, Photo } from "@/data/photos";
import type { Dict } from "@/i18n";

const OPEN_EVENT = "open-photo-tour";
const SLIDE_MS = 6500;
const CHAPTER_ORDER: Category[] = ["residence", "grounds", "coastline", "sky"];

/** Opens the tour from anywhere on the page (e.g. a server-rendered hero button). */
export function openPhotoTour(startSlug?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { startSlug } }));
}

export function TourTrigger({
  label,
  className,
  startSlug,
  children,
}: {
  label: string;
  className?: string;
  startSlug?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={() => openPhotoTour(startSlug)} className={className} aria-label={label}>
      {children ?? label}
    </button>
  );
}

export default function PhotoTour({ photos, t }: { photos: Photo[]; t: Dict["tour"] }) {
  // Captioned photos first within each chapter, so the tour leads with its strongest images
  const slides = useMemo(
    () =>
      CHAPTER_ORDER.flatMap((c) =>
        photos
          .filter((p) => p.category === c)
          .sort((a, b) => Number(Boolean(b.caption)) - Number(Boolean(a.caption)))
      ),
    [photos]
  );
  const chapterStarts = useMemo(
    () =>
      CHAPTER_ORDER.map((c) => ({ chapter: c, index: slides.findIndex((p) => p.category === c) })).filter(
        (c) => c.index >= 0
      ),
    [slides]
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<number | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  const close = useCallback(() => {
    setOpen(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<{ startSlug?: string }>).detail?.startSlug;
      const start = slug ? slides.findIndex((p) => p.slug === slug) : 0;
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setIndex(Math.max(0, start));
      setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [slides]);

  // Scroll lock, keyboard controls, focus return
  useEffect(() => {
    if (!open) return;
    const returnTo = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFs);
      document.body.style.overflow = "";
      returnTo?.focus();
    };
  }, [open, close, next, prev]);

  // Auto-advance; restarting the timer whenever the slide changes
  useEffect(() => {
    if (!open || !playing) return;
    const id = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [open, playing, index, next]);

  if (!open || slides.length === 0) return null;

  const current = slides[index];
  const upcoming = slides[(index + 1) % slides.length];
  const currentChapter = current.category;

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else dialogRef.current?.requestFullscreen?.().catch(() => {});
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      tabIndex={-1}
      className="fixed inset-0 z-[120] flex flex-col bg-black text-sand outline-none"
      onTouchStart={(e) => (touchStartRef.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartRef.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartRef.current;
        touchStartRef.current = null;
        if (Math.abs(dx) > 50) {
          setPlaying(false);
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      {/* Slide */}
      <div className="relative flex-1 overflow-hidden">
        {/* Soft blurred fill behind the photo so any aspect ratio fills the screen */}
        <Image
          key={`bg-${current.slug}`}
          src={photoUrl(current.slug, "thumb")}
          alt=""
          fill
          sizes="10vw"
          quality={50}
          className="scale-110 object-cover opacity-40 blur-2xl"
          aria-hidden="true"
        />
        <div key={current.slug} className="animate-tour-in absolute inset-0">
          <Image
            src={photoUrl(current.slug)}
            alt={current.caption ?? ""}
            fill
            sizes="100vw"
            quality={85}
            priority
            placeholder={current.blurDataURL ? "blur" : undefined}
            blurDataURL={current.blurDataURL}
            className={`photo-enhance object-contain ${playing ? "animate-tour-zoom" : ""}`}
          />
        </div>
        {/* Preload the next slide */}
        <Image
          src={photoUrl(upcoming.slug)}
          alt=""
          width={16}
          height={16}
          sizes="100vw"
          quality={85}
          className="pointer-events-none absolute h-px w-px opacity-0"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/85 to-transparent" />

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sand/60">{t.title}</p>
            <p className="truncate font-serif text-lg font-bold sm:text-xl">{t.chapters[currentChapter]}</p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={t.fullscreen}
              aria-pressed={isFullscreen}
              className="hidden h-11 w-11 place-items-center rounded-full text-sand/80 transition-colors hover:bg-sand/10 hover:text-sand sm:grid"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {isFullscreen ? (
                  <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                ) : (
                  <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                )}
              </svg>
            </button>
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="grid h-11 w-11 place-items-center rounded-full text-sand/80 transition-colors hover:bg-sand/10 hover:text-sand"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Side arrows */}
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            prev();
          }}
          aria-label={t.prev}
          className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full text-sand/70 transition-all hover:bg-sand/10 hover:text-sand sm:grid"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            next();
          }}
          aria-label={t.next}
          className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full text-sand/70 transition-all hover:bg-sand/10 hover:text-sand sm:grid"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-10 sm:pb-8">
          <p key={`cap-${current.slug}`} className="animate-fade-in max-w-3xl font-serif text-lg leading-snug sm:text-2xl" aria-live="polite">
            {current.caption ?? " "}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-sand/10 bg-black px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 sm:px-8">
        <div className="mb-3 h-0.5 w-full overflow-hidden rounded bg-sand/15">
          <div
            key={`${current.slug}-${playing}`}
            className={playing ? "animate-tour-progress h-full bg-terracotta" : "h-full w-0 bg-terracotta"}
            style={{ animationDuration: `${SLIDE_MS}ms` }}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? t.pause : t.play}
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-sand/10 text-sand transition-colors hover:bg-sand/20"
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            )}
          </button>
          <p className="flex-shrink-0 text-sm tabular-nums text-sand/70">
            {index + 1} {t.of} {slides.length}
          </p>
          <div className="ml-auto flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {chapterStarts.map((c) => (
              <button
                key={c.chapter}
                type="button"
                onClick={() => setIndex(c.index)}
                aria-pressed={currentChapter === c.chapter}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                  currentChapter === c.chapter ? "bg-terracotta text-sand" : "text-sand/60 hover:bg-sand/10 hover:text-sand"
                }`}
              >
                {t.chapters[c.chapter]}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 hidden text-center text-[0.7rem] text-sand/40 sm:block">{t.hint}</p>
      </div>
    </div>
  );
}
