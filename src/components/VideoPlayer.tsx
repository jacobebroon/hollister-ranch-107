"use client";

import { useRef, useState } from "react";
import { videoUrl, photoUrl } from "@/lib/media";

export default function VideoPlayer({ posterSlug }: { posterSlug: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink shadow-xl">
      <video
        ref={videoRef}
        controls={playing}
        preload="none"
        poster={photoUrl(posterSlug)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="aspect-video w-full object-cover"
      >
        <source src={videoUrl()} type="video/mp4" />
        Your browser does not support embedded video.
      </video>

      {!playing && (
        <button
          type="button"
          aria-label="Play the property tour"
          onClick={() => videoRef.current?.play()}
          className="group absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/10"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand/95 text-terracotta shadow-lg transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
