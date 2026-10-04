"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { videoUrl, photoUrl } from "@/lib/media";

export default function VideoPlayer({ posterSlug }: { posterSlug: string }) {
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
          alt="Rancho Alegria property tour — Hollister Ranch 107"
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          quality={80}
          className="photo-enhance object-cover"
        />
      )}

      {!playing && (!started || !requested) && (
        <button
          type="button"
          aria-label={requested ? "Loading the property tour" : "Play the property tour"}
          onClick={play}
          disabled={requested}
          className="group absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/10"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand/95 text-terracotta shadow-lg transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
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
    </div>
  );
}
