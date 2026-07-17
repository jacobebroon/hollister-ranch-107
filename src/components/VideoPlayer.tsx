import { videoUrl, photoUrl } from "@/lib/media";

export default function VideoPlayer({ posterSlug }: { posterSlug: string }) {
  return (
    <video
      controls
      preload="none"
      poster={photoUrl(posterSlug)}
      className="aspect-video w-full rounded-2xl bg-ink object-cover shadow-xl"
    >
      <source src={videoUrl()} type="video/mp4" />
      Your browser does not support embedded video.
    </video>
  );
}
