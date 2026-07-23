import Link from "next/link";
import Photo from "@/components/Photo";
import ContactCTA from "@/components/ContactCTA";
import VideoPlayer from "@/components/VideoPlayer";
import Reveal from "@/components/Reveal";
import { IconLand, IconEye, IconGate, IconWave, IconHome, IconMoon, IconTennis } from "@/components/icons";

export const metadata = {
  title: "The Property",
  description:
    "Rancho Alegria, Parcel 107 — 113 private, bluff-top acres on Hollister Ranch, with a hacienda-style residence and unbroken Pacific views.",
};

const ADVANTAGES = [
  {
    icon: IconLand,
    title: "113 private acres",
    body: "A full parcel of Hollister Ranch's protected 100-acre-minimum land — room to roam, ride, and never see a neighbor.",
  },
  {
    icon: IconEye,
    title: "Bluff-top ocean views",
    body: "Panoramic, unobstructed Pacific views across the Santa Barbara Channel, from sunrise to whale season.",
  },
  {
    icon: IconGate,
    title: "Single guarded gate",
    body: "One private, guarded entrance controls all access to the ranch — total privacy and security, mile after mile.",
  },
  {
    icon: IconWave,
    title: "Legendary surf coast",
    body: "Parcel 107 sits within Hollister Ranch's storied 8.5-mile stretch of point breaks, among the finest in the continental US.",
  },
  {
    icon: IconHome,
    title: "Hacienda-style residence",
    body: "A single-level home with terracotta tile roofline, hand-forged ironwork, and a wraparound window-seat great room built to frame the horizon.",
  },
  {
    icon: IconMoon,
    title: "Dark skies, working ranch",
    body: "Surrounded by an active cattle cooperative and native grassland — no light pollution, no traffic, just open land.",
  },
  {
    icon: IconTennis,
    title: "Private ocean-view tennis court",
    body: "A full-size tennis court set into the bluff, backdropped by open Pacific and the ranch's coastal hills.",
  },
];

const HIGHLIGHTS = [
  "162",
  "167",
  "157",
  "img-0602",
  "1000002157",
  "img-20150118-173149189",
  "ranch-020",
  "1000002822",
  "1000003478",
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LandmarksOrHistoricalBuildings",
  name: "Rancho Alegria — Parcel 107, Hollister Ranch",
  description:
    "A 113-acre private parcel on Hollister Ranch's protected coastline on California's Gaviota Coast.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gaviota",
    addressRegion: "CA",
    addressCountry: "US",
  },
};

export default function RanchoAlegriaPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
        <Photo
          slug="ranch-004"
          alt="Rancho Alegria, Parcel 107, viewed from above"
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 text-sand sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
            Parcel 107 &middot; 113 Acres
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-6xl">Rancho Alegria</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink/80">
            Rancho Alegria occupies 113 acres of bluff, grassland, and garden on
            the western reach of Hollister Ranch, where the Santa Rosa Hills meet
            the Santa Barbara Channel. Established in 1987 and held by the
            Clavin family ever since, the single-level residence was built to
            disappear into the land around it &mdash; terracotta roof tiles,
            reclaimed wood, and hand-forged iron inside, with every principal
            room opening onto the same view: open Pacific, unbroken to the
            horizon.
          </p>
        </Reveal>
      </section>

      {/* Video */}
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <Reveal>
          <VideoPlayer posterSlug="ranch-004" />
          <p className="mt-3 text-center text-sm text-ink/50">
            A tour of Rancho Alegria, Parcel 107.
          </p>
        </Reveal>
      </section>

      {/* Advantages grid */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Why Rancho Alegria
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              113 acres, one view that never changes
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <div className="rounded-2xl border border-cream-line bg-sand/70 p-6 transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                    <a.icon />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo highlights */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Inside &amp; Out</h2>
          <Link href="/gallery" className="hidden text-sm font-semibold text-ocean hover:text-ocean-deep sm:block">
            View full gallery &rarr;
          </Link>
        </Reveal>
        <Reveal delay={120} className="grid gap-3 sm:grid-cols-3">
          {HIGHLIGHTS.map((slug) => (
            <div key={slug} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Photo
                slug={slug}
                variant="thumb"
                alt="Rancho Alegria, Parcel 107"
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <Reveal>
          <ContactCTA />
        </Reveal>
      </section>
    </div>
  );
}
