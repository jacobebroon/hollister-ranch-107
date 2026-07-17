import Link from "next/link";
import { photoUrl } from "@/lib/media";
import ContactCTA from "@/components/ContactCTA";
import VideoPlayer from "@/components/VideoPlayer";

const ADVANTAGES = [
  {
    title: "113 private acres",
    body: "A full parcel of Hollister Ranch's protected 100-acre-minimum land — room to roam, ride, and never see a neighbor.",
  },
  {
    title: "Bluff-top ocean views",
    body: "Panoramic, unobstructed Pacific views across the Santa Barbara Channel, from sunrise to whale season.",
  },
  {
    title: "Single guarded gate",
    body: "One private, guarded entrance controls all access to the ranch — total privacy and security, mile after mile.",
  },
  {
    title: "Legendary surf coast",
    body: "Parcel 107 sits within Hollister Ranch's storied 8.5-mile stretch of point breaks, among the finest in the continental US.",
  },
  {
    title: "Hacienda-style residence",
    body: "A single-level home with terracotta tile roofline, hand-forged ironwork, and a wraparound window-seat great room built to frame the horizon.",
  },
  {
    title: "Dark skies, working ranch",
    body: "Surrounded by an active cattle cooperative and native grassland — no light pollution, no traffic, just open land.",
  },
];

export default function RanchoAlegriaPage() {
  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
        <img
          src={photoUrl("ranch-004")}
          alt="Rancho Alegria, Parcel 107, viewed from above"
          className="absolute inset-0 h-full w-full object-cover"
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
        <p className="text-lg leading-relaxed text-ink/80">
          Rancho Alegria occupies 113 acres of bluff, grassland, and garden on
          the western reach of Hollister Ranch, where the Santa Rosa Hills meet
          the Santa Barbara Channel. The single-level residence was built to
          disappear into the land around it &mdash; terracotta roof tiles,
          reclaimed wood, and hand-forged iron inside, with every principal
          room opening onto the same view: open Pacific, unbroken to the
          horizon.
        </p>
      </section>

      {/* Video */}
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <VideoPlayer posterSlug="ranch-004" />
        <p className="mt-3 text-center text-sm text-ink/50">
          A tour of Rancho Alegria, Parcel 107.
        </p>
      </section>

      {/* Advantages grid */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Why Rancho Alegria
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
            113 acres, one view that never changes
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((a) => (
              <div key={a.title}>
                <div className="mb-3 h-px w-10 bg-terracotta" />
                <h3 className="font-serif text-xl font-bold text-ink">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo highlights */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Inside &amp; Out</h2>
          <Link href="/gallery" className="hidden text-sm font-semibold text-ocean hover:text-ocean-deep sm:block">
            View full gallery &rarr;
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {["162", "167", "157", "img-0602", "ranch-020", "img-20150118-173149189"].map((slug) => (
            <img
              key={slug}
              src={photoUrl(slug, "thumb")}
              alt="Rancho Alegria, Parcel 107"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <ContactCTA />
      </section>
    </div>
  );
}
