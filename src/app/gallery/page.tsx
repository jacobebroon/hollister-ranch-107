import { photos } from "@/data/photos";
import Gallery from "@/components/Gallery";
import VideoPlayer from "@/components/VideoPlayer";

export const metadata = {
  title: "Gallery & Film — Rancho Alegria",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
        Gallery
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
        Rancho Alegria in Full
      </h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        A film tour of the property, followed by photographs of the residence,
        gardens, and coastline &mdash; taken across different seasons and years
        at Parcel 107.
      </p>

      <div className="mt-10">
        <VideoPlayer posterSlug="ranch-004" />
      </div>

      <div className="mt-14">
        <Gallery photos={photos} />
      </div>
    </div>
  );
}
