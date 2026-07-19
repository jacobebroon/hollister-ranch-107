import Photo from "@/components/Photo";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "The History of Hollister Ranch",
  description:
    "From Spanish land grants to a century of ranching to today's private conservation-minded ownership — the story of Hollister Ranch on California's Gaviota Coast.",
};

const TIMELINE = [
  {
    year: "9,000+ years ago",
    title: "The Chumash",
    body: "The Chumash people inhabited this stretch of coast for millennia before European contact, drawing on its rich tidepools, kelp forests, and sheltered coves.",
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

const SURF_BREAKS = [
  {
    name: "Cojo",
    note: "Widely called the best wave on the ranch's western stretch — a reef and point that picks up both winter and summer swells.",
  },
  {
    name: "Perko's",
    note: "A cobblestone right point named for founding Surf Club members Bob and John Perko; needs a south swell to turn on.",
  },
  {
    name: "Government Point",
    note: "A long, rocky right point near Point Conception, once reachable by ranch road — now accessible only by boat.",
  },
  {
    name: "Drake's (\"Big Drake's\")",
    note: "The ranch's longest right point, holding well-overhead west swells with a long, workable wall.",
  },
  {
    name: "Little Drake's",
    note: "A smaller, more forgiving break named alongside Big Drake's by the Santa Barbara Surf Club.",
  },
  {
    name: "Razor Blades",
    note: "Named for the sharp rocks lining the beach; the break closest to the Gaviota launch, needing a big west or northwest swell.",
  },
  {
    name: "St. Augustine's",
    note: "A right and left summer break — reliable, if rarely described as the ranch's standout.",
  },
  {
    name: "Utah",
    note: "One of the breaks named by the Santa Barbara Surf Club during its decade exploring the coastline.",
  },
];

export default function HistoryPage() {
  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <Photo
          slug="dsc-0050"
          alt="The great room at Rancho Alegria, vaulted beam ceiling"
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 text-sand sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/80">
            History &amp; Land
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-6xl">
            The Story of Hollister Ranch
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink/80">
            Few places on the California coast remain as they were two hundred
            years ago. Hollister Ranch — 14,400 acres of grassland, oak canyons,
            and 8.5 miles of undeveloped shoreline on the Gaviota Coast, just
            northwest of Santa Barbara — is one of them. Its history runs from
            Spanish land grants through a century of ranching to a private
            conservation-minded ownership model that has kept it wild ever since.
          </p>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
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
      </section>

      {/* Surf culture */}
      <section className="border-y border-cream-line bg-sand-deep/40">
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
              <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
                A legend among surfers
              </h2>
              <p className="mt-4 leading-relaxed text-ink/75">
                In the summer of 1957, a Santa Barbara surfer named Bob Perko
                paddled out below the ranch on a friend&rsquo;s invitation and
                found waves few outsiders had ever seen. Within a few years, a
                loose group of local surfers had formalized into the Santa
                Barbara Surf Club &mdash; capped at a few dozen members,
                Santa Barbara County residents only. By 1962, landowner
                Clinton Hollister, worried about vandalism on the property,
                struck an informal deal with the club: police the ranch
                against outside trespassers, and keep surfing it. Over the
                next decade, club members explored and named most of the
                breaks still surfed today, and built driftwood shacks along
                the shore for gear and overnight stays &mdash; dismantled
                around 1970 as the ranch was subdivided into private parcels.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80} className="mt-16">
            <h3 className="font-serif text-2xl font-bold text-ink">
              The breaks
            </h3>
            <p className="mt-3 max-w-2xl text-ink/70">
              Eight named breaks run along the ranch&rsquo;s coast, nearly
              all rock-bottom right-hand points that produce long,
              high-lining walls &mdash; a wave shape credited with shaping
              Santa Barbara&rsquo;s own tradition of longboard shaping.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SURF_BREAKS.map((b) => (
                <div key={b.name}>
                  <p className="font-serif text-lg font-bold text-ink">{b.name}</p>
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
      </section>

      {/* Conservation & wildlife */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              Conservation
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold text-ink sm:text-4xl">
              Kept wild, by design
            </h2>
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

      {/* Access */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Access
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
            A single gate, a long-running question
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink/75">
            <p>
              Public beach access has long been the subject of discussion between
              the State of California and the ranch&rsquo;s ownership. When the
              property was subdivided in the 1970s, the county required public
              access easements as a condition of approval; the details of how and
              when that access should be provided have been debated in planning
              and legal proceedings ever since, and remain unresolved as of this
              writing. Today, access to the ranch&rsquo;s roads and beaches is
              limited to parcel owners, their guests, and their renters.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <Reveal>
          <ContactCTA
            heading="Experience it for yourself"
            sub="Rancho Alegria, Parcel 107, is available to rent for those who want to see the ranch firsthand."
          />
        </Reveal>
      </section>
    </div>
  );
}
