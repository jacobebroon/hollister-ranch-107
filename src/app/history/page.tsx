import { photoUrl } from "@/lib/media";
import ContactCTA from "@/components/ContactCTA";

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
    body: "Nearly 1,000 owners now hold interests across the ranch's roughly 130+ parcels. A single guarded gate controls access along the ranch's private two-lane road, and the overwhelming majority of the property remains open grazing and native habitat.",
  },
];

export default function HistoryPage() {
  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <img
          src={photoUrl("dsc-0050")}
          alt="The ranch road through open grazing land at Hollister Ranch"
          className="absolute inset-0 h-full w-full object-cover"
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
        <p className="text-lg leading-relaxed text-ink/80">
          Few places on the California coast remain as they were two hundred
          years ago. Hollister Ranch — 14,400 acres of grassland, oak canyons,
          and 8.5 miles of undeveloped shoreline on the Gaviota Coast, just
          northwest of Santa Barbara — is one of them. Its history runs from
          Spanish land grants through a century of ranching to a private
          conservation-minded ownership model that has kept it wild ever since.
        </p>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        <ol className="relative border-l-2 border-cream-line pl-8">
          {TIMELINE.map((item) => (
            <li key={item.title} className="mb-12 last:mb-0">
              <div className="absolute -ml-[2.35rem] mt-1.5 h-3 w-3 rounded-full bg-terracotta" />
              <p className="text-sm font-bold uppercase tracking-widest text-terracotta">
                {item.year}
              </p>
              <h3 className="mt-1 font-serif text-xl font-bold text-ink sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink/75">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Surf culture */}
      <section className="border-y border-cream-line bg-sand-deep/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center">
          <img
            src={photoUrl("ranch-001")}
            alt="View of the Pacific from Hollister Ranch's coastal bluffs"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
              &ldquo;The Ranch&rdquo;
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
              A legend among surfers
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              Long before it was known for exclusivity, Hollister Ranch was
              known for its waves. Members of the Santa Barbara Surf Club began
              discovering and naming its point breaks in the late 1950s, and the
              six-mile core of the ranch&rsquo;s coastline is still regarded as
              one of the best and most consistent stretches of point-break surf
              in the continental United States. When the ranch was subdivided in
              1971, that reputation drew surfers and collectors alike, seeking
              private access to breaks few outsiders will ever ride.
            </p>
          </div>
        </div>
      </section>

      {/* Conservation & access */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
          Conservation &amp; Access
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-ink sm:text-4xl">
          Kept wild, by design
        </h2>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/75">
          <p>
            Hollister Ranch has stayed undeveloped for a combination of
            reasons: a 100-acre minimum parcel size that cannot be further
            subdivided, continuous cattle grazing across nearly the entire
            property, a single guarded entrance limiting traffic, and decades
            of sustained resistance to large-scale development. The result is
            a rare, intact landscape of coastal sage scrub, native grassland,
            oak woodland, and tidepools along an otherwise heavily developed
            coast.
          </p>
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
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <ContactCTA
          heading="Experience it for yourself"
          sub="Rancho Alegria, Parcel 107, is available to rent for those who want to see the ranch firsthand."
        />
      </section>
    </div>
  );
}
