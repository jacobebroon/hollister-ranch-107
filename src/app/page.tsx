import Link from "next/link";
import { photoUrl } from "@/lib/media";
import { featuredPhotos, heroSlug } from "@/data/photos";
import StatBar from "@/components/StatBar";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={photoUrl(heroSlug)}
          alt="Rancho Alegria, Parcel 107, overlooking the Pacific at Hollister Ranch"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-40 text-sand sm:px-8 sm:pb-24">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
            Hollister Ranch &middot; Gaviota Coast, California
          </p>
          <h1
            className="animate-fade-up mt-4 max-w-3xl text-balance font-serif text-5xl font-bold leading-[1.05] sm:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Rancho Alegria
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-xl text-lg text-sand/85 sm:text-xl"
            style={{ animationDelay: "0.2s" }}
          >
            113 private, bluff-top acres — Parcel 107 of the last untouched
            14,400-acre stretch of California&rsquo;s coast.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/rancho-alegria"
              className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-sand shadow-lg transition-colors hover:bg-terracotta-deep"
            >
              Discover the Property
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border border-sand/50 px-6 py-3 text-sm font-semibold text-sand backdrop-blur transition-colors hover:bg-sand/10"
            >
              View Gallery &amp; Film
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <StatBar />
      </section>

      {/* Intro */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Welcome to the Ranch
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              One of California&rsquo;s last truly wild coastlines
            </h2>
          </div>
          <div className="space-y-4 text-ink/75 leading-relaxed">
            <p>
              Hollister Ranch is a private, gated 14,400-acre cattle ranch spanning
              8.5 miles of undeveloped Pacific coastline on the Gaviota Coast, just
              north of Santa Barbara. Named for Colonel William Welles Hollister,
              who acquired the land in 1866, the ranch was divided in 1971 into
              roughly 100-acre parcels &mdash; permanently protected from further
              subdivision &mdash; and has remained one of the most exclusive and
              least-developed stretches of coast in the continental United States
              ever since.
            </p>
            <p>
              Rancho Alegria, Parcel 107, sits on 113 of those acres: a bluff-top
              perch above the Santa Barbara Channel, framed by rolling grassland,
              mature gardens, and an unbroken view of open ocean.
            </p>
            <Link
              href="/history"
              className="inline-block font-semibold text-ocean underline decoration-terracotta decoration-2 underline-offset-4 hover:text-ocean-deep"
            >
              Read the full history of Hollister Ranch &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured gallery teaser */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              A Closer Look
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
              The Property
            </h2>
          </div>
          <Link href="/gallery" className="hidden text-sm font-semibold text-ocean hover:text-ocean-deep sm:block">
            View full gallery &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredPhotos.slice(0, 8).map((photo, i) => (
            <div
              key={photo.slug}
              className={`overflow-hidden rounded-xl bg-sand-deep ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={photoUrl(photo.slug, "thumb")}
                alt={photo.caption ?? "Rancho Alegria, Parcel 107"}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ aspectRatio: i === 0 ? "1 / 1" : `${photo.width} / ${photo.height}` }}
              />
            </div>
          ))}
        </div>

        <Link href="/gallery" className="mt-6 block text-center text-sm font-semibold text-ocean hover:text-ocean-deep sm:hidden">
          View full gallery &rarr;
        </Link>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
        <ContactCTA />
      </section>
    </div>
  );
}
