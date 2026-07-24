import { Suspense } from "react";
import { featuredPhotos, heroSlug, photos } from "@/data/photos";
import Photo from "@/components/Photo";
import StatBar from "@/components/StatBar";
import VideoPlayer from "@/components/VideoPlayer";
import Gallery from "@/components/Gallery";
import Terrain3D from "@/components/Terrain3D";
import LazyMount from "@/components/LazyMount";
import Conditions from "@/components/Conditions";
import DistanceFinder from "@/components/DistanceFinder";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";
import { SURF_BREAKS } from "@/data/surf";
import {
  IconLand,
  IconEye,
  IconGate,
  IconWave,
  IconHome,
  IconMoon,
  IconTennis,
  IconCompass,
  IconMail,
  IconPhone,
  IconWhale,
  IconFlower,
} from "@/components/icons";

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

const TIMELINE = [
  {
    year: "9,000+ years ago",
    title: "The Chumash",
    body: "The Chumash people inhabited this stretch of coast for millennia before European contact, drawing on its rich tidepools, kelp forests, and sheltered coves. At the ranch's western tip, Point Conception — Humqaq in the Chumash language — was considered the sacred \"Western Gate,\" where the souls of the dead were believed to depart the mortal world for the afterlife.",
  },
  {
    year: "1542",
    title: "First European sighting",
    body: "Juan Rodríguez Cabrillo sailed past the Gaviota Coast, the first European known to have sighted this shoreline.",
  },
  {
    year: "1794",
    title: "Rancho Nuestra Señora del Refugio",
    body: "Spanish soldier José Francisco de Ortega — who had scouted for the 1769 Portolá expedition and helped found the Santa Barbara Presidio — was granted the land as a retirement reward from the Spanish crown.",
  },
  {
    year: "1866",
    title: "Colonel Hollister arrives",
    body: "Col. William Welles Hollister, an Ohio entrepreneur who had driven some 10,000 merino sheep west in 1854, acquired the land in partnership with the Dibblee brothers. When the partnership later divided its holdings, this parcel went to Hollister — giving the ranch its name.",
  },
  {
    year: "1899–1961",
    title: "A century of cattle and sheep",
    body: "The Hollister family ran cattle and sheep across the ranch for roughly a century. Jim Hollister, the colonel's youngest son, became ranch superintendent in 1899 and led the operation until his death in 1961.",
  },
  {
    year: "1971",
    title: "Subdivision",
    body: "Following a brief, failed plan by a subsequent owner to build a resort community for 20,000 residents, the ranch was subdivided into individual parcels of 100 acres or more — permanently protected from further subdivision by county mandate.",
  },
  {
    year: "1976",
    title: "Hollister Ranch Owners' Association",
    body: "Governance of shared roads, utilities, and the working cattle cooperative passed to the newly formed Hollister Ranch Owners' Association, which continues to run cattle on the property today.",
  },
  {
    year: "Today",
    title: "One of the last wild coasts",
    body: "Nearly 1,000 owners now hold interests across the ranch's 133 parcels. A single guarded gate controls access along the ranch's private two-lane road, and the overwhelming majority of the property remains open grazing and native habitat.",
  },
];

const WILDLIFE = [
  {
    title: "Over 200 bird species",
    body: "The ranch's grassland and coastline support one of the region's richest bird lists, including regionally rare hawks and owls. The endangered western snowy plover fledges here every year, and the Santa Barbara Audubon Society runs organized birding trips to the property.",
  },
  {
    title: "Mountain lion to tidepool octopus",
    body: "Mountain lion, black bear, bobcat, coyote, and deer all range across the ranch and the wildlife corridor it forms with neighboring preserves. Below the bluffs, tidepools hold mussels, sea hares, octopus, crabs, and the occasional lobster.",
  },
  {
    title: "A federally endangered wildflower",
    body: "The Gaviota tarplant, found nowhere outside a handful of sites on this stretch of coast, has one of its core populations on Hollister Ranch itself — a rare plant found essentially nowhere else on Earth.",
  },
  {
    title: "A marine reserve at its edge",
    body: "The no-take Point Conception State Marine Reserve, over 22 square miles of protected water, sits directly off the ranch's western end, part of a chain of marine protected areas along the Gaviota Coast.",
  },
];

const SEASONS = [
  {
    icon: IconWave,
    months: "Dec – Feb",
    title: "Winter swell",
    body: "Big west and northwest swells wrap onto Drake's, Little Drake's, Utah, and Razor Blades — the ranch's most consistent, powerful stretch of the year.",
  },
  {
    icon: IconWave,
    months: "May – Sep",
    title: "Summer south swell",
    body: "Cojo, Perko's, and St. Augustine's come alive on south swells wrapping around Point Conception, an exposure most of the ranch doesn't share.",
  },
  {
    icon: IconWhale,
    months: "Dec – May",
    title: "Gray whale migration",
    body: "Southbound whales pass the Channel Islands in December and January; the northbound migration runs closer to shore from February through May, with mother-and-calf pairs hugging the coast into May.",
  },
  {
    icon: IconFlower,
    months: "Mar – May",
    title: "Spring wildflowers",
    body: "Ice plant, agave, and native wildflowers carpet the bluffs and garden paths each spring, the season captured in much of the property's photography.",
  },
];

const EXPECT = [
  "A private, gated 113-acre parcel on Hollister Ranch's protected coastline.",
  "Answers to questions about the property, its history, and the ranch.",
  "This site is for information only — reach out directly with any questions.",
];

const FAQ = [
  {
    q: "Is Rancho Alegria open to the public?",
    a: "No. Hollister Ranch is a private, gated community with a single guarded entrance — access is limited to parcel owners, their guests, and confirmed visitors.",
  },
  {
    q: "Where exactly is the property?",
    a: "On the Gaviota Coast in Santa Barbara County, about 2 hours 15 minutes from Los Angeles and 30 minutes from downtown Santa Barbara.",
  },
  {
    q: "Does this website handle bookings?",
    a: "No — this site exists to share the property's history and character. For any questions, including about visiting, reach out directly using the contact details above.",
  },
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

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* Hero */}
      <section id="top" className="relative flex min-h-[92vh] scroll-mt-24 items-end overflow-hidden">
        <Photo
          slug={heroSlug}
          alt="Rancho Alegria, Parcel 107, overlooking the Pacific at Hollister Ranch"
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-40 text-sand sm:px-8 sm:pb-24">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
            Hollister Ranch &middot; Gaviota Coast, California
          </p>
          <h1
            className="animate-fade-up mt-4 max-w-3xl text-balance font-serif text-5xl font-bold leading-[1.05] drop-shadow-sm sm:text-7xl"
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
            className="animate-fade-up mt-6 flex flex-wrap gap-2"
            style={{ animationDelay: "0.25s" }}
          >
            {["113 Private Acres", "8.5 Mi Coastline", "Est. 1866"].map((fact) => (
              <span
                key={fact}
                className="rounded-full border border-sand/30 bg-ink/20 px-3 py-1 text-xs font-medium text-sand/90 backdrop-blur-sm"
              >
                {fact}
              </span>
            ))}
          </div>

          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.35s" }}
          >
            <a
              href="#property"
              className="group rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-sand shadow-lg transition-colors hover:bg-terracotta-deep"
            >
              Discover the Property
              <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#gallery"
              className="rounded-full border border-sand/50 px-6 py-3 text-sm font-semibold text-sand backdrop-blur transition-colors hover:bg-sand/10"
            >
              View Gallery &amp; Film
            </a>
          </div>
        </div>

        <a
          href="#video"
          aria-label="Scroll to see the property tour"
          className="animate-bob absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-sand/70 transition-colors hover:text-sand sm:block"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* Video */}
      <section id="video" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Watch the Tour
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            See Rancho Alegria
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <VideoPlayer posterSlug="ranch-004" />
          <p className="mt-3 text-center text-sm text-ink/50">
            A tour of Rancho Alegria, Parcel 107.
          </p>
        </Reveal>
      </section>

      {/* Live conditions */}
      <section id="conditions" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-8">
        <Reveal>
          <Suspense fallback={<ConditionsFallback />}>
            <Conditions />
          </Suspense>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <StatBar />
        </Reveal>
      </section>

      {/* Intro */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Welcome to the Ranch
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              One of California&rsquo;s last truly wild coastlines
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-4 text-ink/75 leading-relaxed">
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
            <a
              href="#history"
              className="inline-block font-semibold text-ocean underline decoration-terracotta decoration-2 underline-offset-4 hover:text-ocean-deep"
            >
              Read the full history of Hollister Ranch &rarr;
            </a>
          </Reveal>
        </div>
      </section>

      {/* Property */}
      <section id="property" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Why Rancho Alegria
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            113 acres, one view that never changes
          </h2>
          <p className="mt-4 leading-relaxed text-ink/75">
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

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="rounded-2xl border border-cream-line bg-sand-deep/40 p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <a.icon />
                </div>
                <h3 className="font-serif text-xl font-bold text-ink">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-6 mt-20 flex items-end justify-between">
          <h3 className="font-serif text-3xl font-bold text-ink sm:text-4xl">Inside &amp; Out</h3>
          <a href="#gallery" className="hidden text-sm font-semibold text-ocean hover:text-ocean-deep sm:block">
            View full gallery &rarr;
          </a>
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

      {/* Featured teaser grid */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal delay={120} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {featuredPhotos.slice(0, 8).map((photo, i) => (
              <div
                key={photo.slug}
                className={`relative overflow-hidden rounded-xl bg-sand-deep ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Photo
                  slug={photo.slug}
                  variant="thumb"
                  alt={photo.caption ?? "Rancho Alegria, Parcel 107"}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
          Gallery
        </p>
        <h2 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
          Rancho Alegria in Full
        </h2>
        <p className="mt-4 max-w-2xl text-ink/70">
          Photographs of the residence, gardens, and coastline &mdash; taken
          across different seasons and years at Parcel 107.
        </p>

        <div className="mt-10">
          <Gallery photos={photos} />
        </div>
      </section>

      {/* History */}
      <section id="history" className="scroll-mt-24 border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              History &amp; Land
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
              The Story of Hollister Ranch
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Few places on the California coast remain as they were two hundred
              years ago. Hollister Ranch — 14,400 acres of grassland, oak canyons,
              and 8.5 miles of undeveloped shoreline on the Gaviota Coast, just
              northwest of Santa Barbara — is one of them. Its history runs from
              Spanish land grants through a century of ranching to a private
              conservation-minded ownership model that has kept it wild ever since.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
          <ol className="relative border-l-2 border-cream-line pl-8">
            {TIMELINE.map((item, i) => (
              <li key={item.title} className="mb-12 last:mb-0">
                <Reveal delay={i * 60}>
                  <div className="absolute -ml-[2.35rem] mt-1.5 h-3 w-3 rounded-full bg-terracotta ring-4 ring-sand" />
                  <p className="text-sm font-bold uppercase tracking-widest text-terracotta">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-ink sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Surf culture */}
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Photo
                slug="ranch-001"
                alt="View of the Pacific from Hollister Ranch's coastal bluffs"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
                &ldquo;The Ranch&rdquo;
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
                A legend among surfers
              </h3>
              <p className="mt-4 leading-relaxed text-ink/75">
                In the summer of 1957, a Santa Barbara surfer named Bob Perko
                paddled out below the ranch on a friend&rsquo;s invitation and
                found waves few outsiders had ever seen. By 1960 that loose
                group of locals had formalized into the Santa Barbara Surf
                Club, with board shaper Renny Yater as its founding president,
                a board of directors, $25 annual dues, and membership capped
                at 60. Landowner Clinton Hollister, worried about vandalism on
                the property, struck a deal: club members could keep surfing
                the ranch as long as they policed it against outside
                trespassers. Over the next decade, members explored and named
                most of the breaks still surfed today, and built driftwood
                shacks along the shore for gear and overnight stays &mdash;
                dismantled around 1970 as the ranch was subdivided into
                private parcels.
              </p>
            </Reveal>
          </div>

          <Reveal delay={100} className="mt-16 max-w-3xl">
            <h3 className="font-serif text-2xl font-bold text-ink">
              A quiet birthplace of the shortboard revolution
            </h3>
            <p className="mt-3 leading-relaxed text-ink/75">
              The club&rsquo;s founding roster read like a who&rsquo;s-who of
              Santa Barbara surf history &mdash; Yater, John Bradbury, the
              Perko brothers, Arlen and Tim Knight, and a young board-and-fin
              experimenter named George Greenough. Greenough tested his
              radical flex-tail kneeboards in the ranch&rsquo;s waves through
              the early 1960s, including a dolphin-fin-inspired swept fin he
              carved for a blunt-nosed balsa &ldquo;spoon&rdquo; kneeboard in
              1961. Those designs directly influenced Bob McTavish and Nat
              Young, who rode a Greenough-designed flex fin to the 1966 World
              Title &mdash; meaning waves ridden quietly at Hollister Ranch
              helped spark a revolution in surfboard design that reshaped the
              sport worldwide. Yater, who had opened Santa Barbara&rsquo;s
              first surfboard shop in 1959, would later become known for his
              own influential &ldquo;Yater Spoon&rdquo; longboard model.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-16">
            <h3 className="font-serif text-2xl font-bold text-ink">
              The breaks
            </h3>
            <p className="mt-3 max-w-2xl text-ink/70">
              Eight named breaks run west to east along the ranch&rsquo;s
              coast, nearly all rock-bottom right-hand points that produce
              long, high-lining walls &mdash; a wave shape credited with
              shaping Santa Barbara&rsquo;s own tradition of longboard
              shaping. Cojo and Perko&rsquo;s, at the western end, are the
              only breaks that reliably catch summer south swells wrapping
              around Point Conception; everything east of them falls into
              the swell shadow of the Channel Islands and leans on winter
              west swells instead.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SURF_BREAKS.map((b) => (
                <div key={b.name}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-serif text-lg font-bold text-ink">{b.name}</p>
                    <p className="whitespace-nowrap rounded-full bg-terracotta/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-terracotta">
                      {b.swell}
                    </p>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{b.note}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-16 max-w-3xl">
            <h3 className="font-serif text-2xl font-bold text-ink">
              Access today
            </h3>
            <div className="mt-3 space-y-4 leading-relaxed text-ink/75">
              <p>
                California law guarantees the public the tidelands below the
                mean high tide line on every beach in the state, Hollister
                Ranch included &mdash; but reaching that strip of wet sand
                means a boat or a long paddle from Gaviota State Beach, since
                there is no overland public access to the coast. In practice,
                that leaves the named breaks the province of parcel owners
                and their guests, much as it has been since the Surf
                Club&rsquo;s era.
              </p>
              <p>
                That scarcity has its own economy: co-owned parcels, sold in
                fractional shares specifically for wave access, are common,
                and Ranch real estate has carried a &ldquo;surf premium&rdquo;
                for decades. A 2022 settlement meant to open a short public
                access route was later struck down by a state appellate
                court on procedural grounds, and as of this writing the
                question of expanded public access remains unresolved.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Conservation & wildlife */}
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Conservation
            </p>
            <h3 className="mt-3 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              Kept wild, by design
            </h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink/75">
              Hollister Ranch has stayed undeveloped by a combination of
              Santa Barbara County agricultural-preserve zoning, a 100-acre
              minimum parcel size that cannot be further subdivided, and
              continuous cattle grazing across nearly the entire property. An
              Angus cattle cooperative &mdash; roughly 400 resident mother
              cows plus over a thousand young stockers brought in each fall
              &mdash; still works virtually all 14,400 acres, producing
              grass-fed beef under the same cooperative structure the
              Hollister Ranch Owners&rsquo; Association set up in 1976. The
              result is one of the largest privately held, intact
              landscapes on the California coast.
            </p>
          </Reveal>

          <Reveal delay={60} className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-lg">
            <Photo
              slug="1000002820"
              alt="Ranch cattle grazing the bluff at sunset above the Pacific"
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {WILDLIFE.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <h3 className="font-serif text-xl font-bold text-ink">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{w.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280} className="mt-12 max-w-2xl leading-relaxed text-ink/75">
            <p>
              The nonprofit Hollister Ranch Conservancy runs a free
              &ldquo;Tidepool Classroom&rdquo; for schoolchildren, a program
              started in the early 1990s that is still guiding students
              through the ranch&rsquo;s intertidal life today, alongside
              ongoing research partnerships with UC Santa Barbara and other
              universities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Best time to visit */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Plan Your Season
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            Best time to visit
          </h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            The ranch changes with the seasons — here&rsquo;s what to expect
            through the year.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEASONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="rounded-2xl border border-cream-line bg-sand-deep/40 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <s.icon />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
                  {s.months}
                </p>
                <h3 className="mt-1 font-serif text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Map & Access */}
      <section id="map" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 sm:px-8">
        <Reveal>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconCompass />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Location &amp; Access
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-ink sm:text-5xl">
            Find the Ranch
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70">
            Hollister Ranch sits on the Gaviota Coast in Santa Barbara County,
            about 2 hours 15 minutes from Los Angeles and 30 minutes from
            downtown Santa Barbara. Because the ranch is a private, gated
            community with a single guarded entrance, we share Rancho
            Alegria&rsquo;s exact address and gate directions directly with
            confirmed guests rather than publishing them here.
          </p>
        </Reveal>
        <Reveal delay={80} className="mt-6">
          <DistanceFinder />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Fly the Coastline
          </p>
          <h3 className="mt-3 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
            8.5 miles of coast, in real 3D terrain
          </h3>
          <p className="mt-4 max-w-2xl text-ink/70">
            An actual terrain map built from real elevation and satellite
            data &mdash; not a photo. Watch the opening flight from Point
            Conception east along the ranch toward Gaviota, then drag to
            rotate, tilt, and explore the coastline yourself.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <LazyMount fallback={<TerrainFallback />}>
            <Terrain3D />
          </LazyMount>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/60">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-terracotta" /> Surf break
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-ocean" /> Landmark
            </span>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Reveal className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Los Angeles", value: "2h 15m" },
            { label: "Santa Barbara", value: "30 min" },
            { label: "Ranch coastline", value: "8.5 mi" },
            { label: "Access gates", value: "1" },
          ].map((d) => (
            <div key={d.label} className="rounded-xl border border-cream-line bg-sand-deep/40 px-4 py-3 text-center">
              <p className="font-serif text-xl font-bold text-terracotta">{d.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink/50">{d.label}</p>
            </div>
          ))}
        </Reveal>
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-cream-line shadow-lg">
            <iframe
              title="Hollister Ranch, Gaviota Coast, California"
              src="https://www.google.com/maps?ll=34.4717,-120.2288&z=11&output=embed"
              className="h-[360px] w-full sm:h-[420px]"
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

      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              From Above
            </p>
            <h3 className="mt-3 max-w-xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              The residence itself
            </h3>
            <p className="mt-4 max-w-2xl text-ink/70">
              Where the terrain map shows the land, these are the real
              aerial photographs of Rancho Alegria on it.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 grid gap-8 sm:grid-cols-2">
            <TiltCard slug="ranch-004" alt="Aerial view of Rancho Alegria and the Pacific" />
            <TiltCard slug="dsc-0067" alt="The residence and coastline from above" />
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24">
        <div className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden">
          <Photo
            slug="img-20150118-173149189"
            alt="Sunset over the Pacific from Rancho Alegria"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 text-sand sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
              Contact
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold sm:text-6xl">Get in Touch</h2>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
          <Reveal>
            <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
              Reach out directly
            </h3>
            <p className="mt-3 leading-relaxed text-ink/70">
              This site is for information only. For more information or
              questions about Rancho Alegria, reach out directly &mdash; by
              email or by phone.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:jeanetteclavin@yahoo.com"
                className="flex items-center gap-4 rounded-xl border border-cream-line bg-sand-deep/50 px-6 py-5 transition-colors hover:border-terracotta"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <IconMail />
                </span>
                <span>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Email</p>
                  <p className="mt-1 font-serif text-xl font-bold text-ink">jeanetteclavin@yahoo.com</p>
                </span>
              </a>
              <a
                href="tel:+13107101516"
                className="flex items-center gap-4 rounded-xl border border-cream-line bg-sand-deep/50 px-6 py-5 transition-colors hover:border-terracotta"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <IconPhone />
                </span>
                <span>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Call or Text</p>
                  <p className="mt-1 font-serif text-xl font-bold text-ink">310-710-1516</p>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">About this site</h3>
            <ul className="mt-4 space-y-4">
              {EXPECT.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink/75">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="border-t border-cream-line bg-sand-deep/40">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
                Frequently Asked
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
                A few common questions
              </h3>
            </Reveal>
            <div className="mt-10 space-y-8">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 70}>
                  <h4 className="font-serif text-lg font-bold text-ink">{item.q}</h4>
                  <p className="mt-2 leading-relaxed text-ink/70">{item.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ConditionsFallback() {
  return (
    <div className="h-[220px] animate-pulse rounded-2xl border border-cream-line bg-sand-deep/40" />
  );
}

function TerrainFallback() {
  return (
    <div className="flex h-[480px] w-full animate-pulse items-center justify-center rounded-2xl border border-cream-line bg-sand-deep sm:h-[620px]">
      <p className="text-sm text-ink/40">Loading terrain&hellip;</p>
    </div>
  );
}
