import TiltCard from "@/components/TiltCard";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import { IconCompass } from "@/components/icons";

export const metadata = {
  title: "Map & Access",
  description: "How to find Hollister Ranch and Rancho Alegria, Parcel 107, on California's Gaviota Coast.",
};

export default function MapPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <Reveal>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconCompass />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Location &amp; Access
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
            Find the Ranch
          </h1>
          <p className="mt-4 max-w-2xl text-ink/70">
            Hollister Ranch sits on the Gaviota Coast in Santa Barbara County,
            about 2 hours 15 minutes from Los Angeles and 30 minutes from
            downtown Santa Barbara. Because the ranch is a private, gated
            community with a single guarded entrance, we share Rancho
            Alegria&rsquo;s exact address and gate directions directly with
            confirmed guests rather than publishing them here.
          </p>
        </Reveal>
      </section>

      {/* Map embed - general area only, not a pinpointed private address */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-cream-line shadow-lg">
            <iframe
              title="Hollister Ranch, Gaviota Coast, California"
              src="https://www.google.com/maps?ll=34.4717,-120.2288&z=11&output=embed"
              className="h-[420px] w-full sm:h-[520px]"
              loading="lazy"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
            <p>Gaviota Coast, Santa Barbara County — general ranch area shown</p>
            <a
              href="https://earth.google.com/web/search/Point+Conception,+California"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ocean hover:text-ocean-deep"
            >
              Explore the coastline in Google Earth &rarr;
            </a>
          </div>
        </Reveal>
      </section>

      {/* Flyover / 3D tilt gallery */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Fly the Coastline
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              113 acres of bluff, hill, and horizon
            </h2>
            <p className="mt-4 max-w-2xl text-ink/70">
              Tilt and explore aerial views of the property &mdash; a sense of
              the terrain from above, in three dimensions.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 grid gap-8 sm:grid-cols-2">
            <TiltCard slug="ranch-004" alt="Aerial view of Rancho Alegria and the Pacific" />
            <TiltCard slug="ranch-005" alt="Aerial view of the residence and motor court" />
            <TiltCard slug="dsc-0067" alt="The residence and coastline from above" />
            <TiltCard slug="img-20150119-123532632" alt="Fog rolling over the ranch's coastal hills" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <Reveal>
          <ContactCTA
            heading="Plan your visit"
            sub="Confirmed renters receive full directions, gate access details, and a property map."
          />
        </Reveal>
      </section>
    </div>
  );
}
