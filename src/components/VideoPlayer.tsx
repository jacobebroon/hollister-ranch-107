"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { videoUrl, photoUrl } from "@/lib/media";
import type { Dict } from "@/i18n";

export default function VideoPlayer({ posterSlug, t }: { posterSlug: string; t: Dict["video"] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setRequested(true);
    videoRef.current?.play().catch(() => setRequested(false));
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink shadow-xl">
      <video
        ref={videoRef}
        controls={started}
        preload="none"
        playsInline
        onPlaying={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        className="aspect-video w-full object-cover"
      >
        <source src={videoUrl()} type="video/mp4" />
        Your browser does not support embedded video.
      </video>

      {/* The cover photo stays up until the first frame actually plays, so there's no black box while buffering */}
      {!started && (
        <Image
          src={photoUrl(posterSlug)}
          alt={t.coverAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          quality={85}
          className="photo-enhance animate-ken-burns object-cover"
        />
      )}
      {!started && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/20" aria-hidden="true" />
      )}

      {!playing && (!started || !requested) && (
        <button
          type="button"
          aria-label={requested ? t.loading : t.play}
          onClick={play}
          disabled={requested}
          className="group absolute inset-0 flex items-center justify-center transition-colors hover:bg-ink/10"
        >
          {!requested && <span className="absolute h-16 w-16 animate-ping rounded-full bg-sand/30 sm:h-20 sm:w-20" aria-hidden="true" />}
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-sand/95 text-terracotta shadow-lg transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
            {requested ? (
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-terracotta border-t-transparent" />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            )}
          </span>
        </button>
      )}

      {!started && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-sand sm:p-7">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sand/70">{t.eyebrow}</p>
            <p className="mt-1 font-serif text-xl font-bold sm:text-3xl">Rancho Alegria</p>
          </div>
          <span className="rounded-full bg-ink/60 px-3 py-1 text-xs font-semibold tabular-nums backdrop-blur">4:26</span>
        </div>
      )}
    </div>
  );
}
