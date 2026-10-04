// All visitor-facing English copy. es.ts mirrors this shape exactly (typed as Dict).
const en = {
  lang: "en",
  htmlLang: "en-US",
  ogLocale: "en_US",
  homePath: "/",

  meta: {
    title: "Hollister Ranch 107 — Rancho Alegria, 113 Oceanfront Acres",
    description:
      "Rancho Alegria, Parcel 107: 113 private bluff-top acres on Hollister Ranch, Gaviota Coast — main house, guest house, tennis court and hot tub above Razor Blades.",
  },

  nav: {
    links: ["Home", "Rancho Alegria", "Gallery", "The Ranch", "Map & Access", "Contact"],
    brandSub: "Parcel 107 · Hollister Ranch",
    toggleMenu: "Toggle menu",
    switchLabel: "ES",
    switchName: "Español",
    switchHref: "/es",
    switchAria: "Ver este sitio en español",
  },

  footer: {
    sub: "Parcel 107, Hollister Ranch",
    blurb:
      "113 private acres on one of the last undeveloped stretches of the California coast, on the Gaviota Coast north of Santa Barbara.",
    explore: "Explore",
    links: ["The Property", "Photo Gallery", "History of the Ranch", "Map & Access"],
    contact: "Contact",
    callText: "Call or text",
    disclaimer:
      "Hollister Ranch is a private, gated community. This site describes Rancho Alegria, Parcel 107, and is not affiliated with the Hollister Ranch Owners’ Association.",
    backToTop: "Back to top",
    switchName: "Ver en español",
    switchHref: "/es",
    switchLang: "es",
  },

  hero: {
    eyebrow: "Hollister Ranch 107 · Gaviota Coast, California",
    tagline:
      "113 private, bluff-top acres — Parcel 107 of the last untouched 14,400-acre stretch of California’s coast.",
    facts: ["113 Private Acres", "8.5 Mi Coastline", "Est. 1866"],
    ctaPrimary: "Discover the Property",
    ctaTour: "Take the Photo Tour",
    ctaSecondary: "View Gallery & Film",
    scrollAria: "Scroll to see the property tour",
    imageAlt: "Rancho Alegria, Parcel 107, overlooking the Pacific at Hollister Ranch",
  },

  video: {
    eyebrow: "Watch the Tour",
    title: "See Rancho Alegria",
    caption: "A tour of Rancho Alegria, Parcel 107.",
    play: "Play the property tour",
    loading: "Loading the property tour",
    coverAlt: "Rancho Alegria property tour — Hollister Ranch 107",
  },

  conditions: {
    title: "Right Now at the Ranch",
    sub: "Live conditions · updates every 30 min",
    weather: "Weather",
    surf: "Surf",
    tides: "Tides Today",
    sunMoon: "Sun & Moon",
    unavailable: "Unavailable right now",
    wind: "Wind",
    swell: "swell",
    from: "From the",
    high: "High",
    low: "Low",
    sunrise: "Sunrise",
    sunset: "Sunset",
    lit: "lit",
    credit: "Weather & swell: Open-Meteo · Tides: NOAA Gaviota State Park station",
    tideCurve: "Today's tide curve",
    compass: { swell: "Swell", wind: "Wind", swellFrom: "Swell from the", windFrom: "wind from the" },
    weatherCodes: {} as Record<number, string>,
    moonPhases: {} as Record<string, string>,
  },

  stats: ["Private acres", "Acre ranch", "Untouched coastline", "Ranch founded"],

  intro: {
    eyebrow: "Welcome to the Ranch",
    title: "One of California’s last truly wild coastlines",
    p1: "Hollister Ranch is a private, gated 14,400-acre cattle ranch spanning 8.5 miles of undeveloped Pacific coastline on the Gaviota Coast, just north of Santa Barbara. Named for Colonel William Welles Hollister, who acquired the land in 1866, the ranch was divided in 1971 into roughly 100-acre parcels — permanently protected from further subdivision — and has remained one of the most exclusive and least-developed stretches of coast in the continental United States ever since.",
    p2: "Rancho Alegria — Hollister Ranch Parcel 107 — sits on 113 of those acres: a bluff-top perch above the Santa Barbara Channel, framed by rolling grassland, mature gardens, and an unbroken view of open ocean.",
    link: "Read the full history of Hollister Ranch →",
  },

  property: {
    eyebrow: "Why Rancho Alegria",
    title: "113 acres, one view that never changes",
    p1: "Rancho Alegria occupies 113 acres of bluff, grassland, and garden on the western reach of Hollister Ranch, where the Santa Rosa Hills meet the Santa Barbara Channel, named for nearby Alegria Canyon. Established in 1987 and held by the Clavin family ever since, the single-level main residence was built to disappear into the land around it — terracotta roof tiles, reclaimed wood, and hand-forged iron inside, with every principal room opening onto the same view: open Pacific, unbroken to the horizon.",
    p2: "A separate guest house, a private hot tub, a full-size tennis court, a fruit orchard, and landscaped stone pathways round out the grounds, threading between agave and native wildflowers on their way to the bluff’s edge — all inside the ranch’s single guarded gate.",
    p3: "The bluff below fronts Razor Blades, the named point break closest to the Gaviota entrance — putting some of the ranch’s most-surfed water directly out front, not just nearby.",
    advantages: [
      { title: "113 private acres", body: "A full parcel of Hollister Ranch's protected 100-acre-minimum land — room to roam, ride, and never see a neighbor." },
      { title: "Bluff-top ocean views", body: "Panoramic, unobstructed Pacific views across the Santa Barbara Channel, from sunrise to whale season." },
      { title: "Single guarded gate", body: "One private, guarded entrance controls all access to the ranch — total privacy and security, mile after mile." },
      { title: "Legendary surf coast", body: "Parcel 107 sits within Hollister Ranch's storied 8.5-mile stretch of point breaks, among the finest in the continental US." },
      { title: "Fronts Razor Blades", body: "Rancho Alegria sits directly across from Razor Blades, the named point break closest to the Gaviota gate — a rare, walk-out surf address, not just a nearby one." },
      { title: "Hacienda-style residence", body: "A single-level home with terracotta tile roofline, hand-forged ironwork, and a wraparound window-seat great room built to frame the horizon." },
      { title: "Dark skies, working ranch", body: "Surrounded by an active cattle cooperative and native grassland — no light pollution, no traffic, just open land." },
      { title: "Private ocean-view tennis court", body: "A full-size tennis court set into the bluff, backdropped by open Pacific and the ranch's coastal hills." },
      { title: "Main house plus guest house", body: "A separate guest house alongside the main residence gives visiting family or friends their own private space." },
      { title: "Private hot tub", body: "A hot tub set into the grounds for soaking after a day on the water or the trails — steps from the main house." },
      { title: "120+ miles of ranch trails", body: "Hollister Ranch maintains an extensive network of equestrian trails across its 14,400 acres, open to owners and their guests." },
    ],
    insideOut: "Inside & Out",
    viewGallery: "View full gallery →",
    viewInGallery: "View in gallery",
    fallbackAlt: "Rancho Alegria, Parcel 107",
  },

  estate: {
    eyebrow: "Explore the Estate",
    title: "Walk the grounds from above",
    intro:
      "Tap a marker on the aerial photograph to step inside that part of Rancho Alegria — the residence, the motor court, the ranch drive, and the water below.",
    hint: "Tap a marker to explore",
    photoAlt: "Aerial photograph of Rancho Alegria’s residence, motor court, and ranch drive above the Pacific",
    close: "Close",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    spots: [
      {
        title: "The main residence",
        body: "A single-level hacienda under a terracotta-tile roof: hand-forged iron and reclaimed wood in the entry hall, a vaulted great room with a three-tier iron chandelier, a stone-topped kitchen island, and a window seat that frames an unbroken Pacific horizon.",
      },
      {
        title: "The motor court",
        body: "A broad, palm-lined motor court sits at the front door, terraced into the hillside so arriving guests step straight out onto the view.",
      },
      {
        title: "The ranch drive",
        body: "A private paved drive curls up through palms and native planting from the ranch road — one of the few roads on 14,400 acres reached only through the single guarded gate.",
      },
      {
        title: "The Pacific & Razor Blades",
        body: "Below the bluff lies Razor Blades, the named point break closest to the Gaviota gate — with the whole Santa Barbara Channel, the Channel Islands, and passing gray whales in view from the house.",
      },
    ],
    amenitiesTitle: "Also on the grounds",
    amenities: ["Guest house", "Private hot tub", "Ocean-view tennis court", "Fruit orchard", "Rose garden & stone paths", "Bluff-top overlook"],
  },

  tour: {
    open: "Take the photo tour",
    title: "Photo tour",
    close: "Close the photo tour",
    play: "Play",
    pause: "Pause",
    next: "Next photo",
    prev: "Previous photo",
    of: "of",
    hint: "Use ← → keys or swipe · Space to pause",
    fullscreen: "Full screen",
    chapters: {
      residence: "The Residence",
      grounds: "Grounds & Gardens",
      coastline: "The Coastline",
      sky: "Sky & Weather",
    },
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Rancho Alegria in Full",
    intro: "Photographs of the residence, gardens, and coastline — taken across different seasons and years at Parcel 107.",
    filters: {
      all: "All Photos",
      residence: "Residence",
      grounds: "Grounds & Gardens",
      coastline: "Coastline",
      sky: "Sky & Weather",
    },
    openPhoto: "Open photo",
    viewer: "Photo viewer",
    close: "Close",
    previous: "Previous",
    next: "Next",
    empty: "No photos in this category yet.",
    fullscreen: "Full-screen tour",
  },

  history: {
    eyebrow: "History & Land",
    title: "The Story of Hollister Ranch",
    lead: "Few places on the California coast remain as they were two hundred years ago. Hollister Ranch — 14,400 acres of grassland, oak canyons, and 8.5 miles of undeveloped shoreline on the Gaviota Coast, just northwest of Santa Barbara — is one of them. Its history runs from Spanish land grants through a century of ranching to a private conservation-minded ownership model that has kept it wild ever since.",
    timeline: [
      { year: "9,000+ years ago", title: "The Chumash", body: "The Chumash people inhabited this stretch of coast for millennia before European contact, drawing on its rich tidepools, kelp forests, and sheltered coves — some archaeological accounts date occupation at Point Conception itself back as far as 18,000 years. At the ranch's western tip, Point Conception — Humqaq in the Chumash language — was considered the sacred \"Western Gate,\" where the souls of the dead were believed to depart the mortal world for the afterlife, and remains a cultural keystone site studied by archaeologists today." },
      { year: "1542", title: "First European sighting", body: "Juan Rodríguez Cabrillo sailed past the Gaviota Coast, the first European known to have sighted this shoreline." },
      { year: "1794", title: "Rancho Nuestra Señora del Refugio", body: "Spanish soldier José Francisco de Ortega — who had scouted for the 1769 Portolá expedition and helped found the Santa Barbara Presidio — was granted the land as a retirement reward from the Spanish crown." },
      { year: "1866", title: "Colonel Hollister arrives", body: "Col. William Welles Hollister, an Ohio entrepreneur who had driven some 10,000 merino sheep west in 1854, acquired the land in partnership with the Dibblee brothers. When the partnership later divided its holdings, this parcel went to Hollister — giving the ranch its name." },
      { year: "1899–1961", title: "A century of cattle and sheep", body: "The Hollister family ran cattle and sheep across the ranch for roughly a century. Jim Hollister, the colonel's youngest son, became ranch superintendent in 1899 and led the operation until his death in 1961." },
      { year: "1971", title: "Subdivision", body: "Following a brief, failed plan by a subsequent owner to build a resort community for 20,000 residents, the ranch was subdivided into individual parcels of 100 acres or more — permanently protected from further subdivision by county mandate." },
      { year: "1976", title: "Hollister Ranch Owners' Association", body: "Governance of shared roads, utilities, and the working cattle cooperative passed to the newly formed Hollister Ranch Owners' Association, which continues to run cattle on the property today." },
      { year: "Today", title: "One of the last wild coasts", body: "Nearly 1,000 owners now hold interests across the ranch's 136 parcels — 133 privately held, plus three reserved for shared ranch operations. A single guarded gate controls access along the ranch's private two-lane road, and the overwhelming majority of the property remains open grazing and native habitat." },
    ],
    surfPhotoAlt: "View of the Pacific from Hollister Ranch's coastal bluffs",
    surfEyebrow: "“The Ranch”",
    surfTitle: "A legend among surfers",
    surfBody: "In the summer of 1957, a Santa Barbara surfer named Bob Perko paddled out below the ranch on a friend’s invitation and found waves few outsiders had ever seen. By 1960 that loose group of locals had formalized into the Santa Barbara Surf Club, with board shaper Renny Yater as its founding president, a board of directors, $25 annual dues, and membership capped at 60. Landowner Clinton Hollister, worried about vandalism on the property, struck a deal: club members could keep surfing the ranch as long as they policed it against outside trespassers. Over the next decade, members explored and named most of the breaks still surfed today, and built driftwood shacks along the shore for gear and overnight stays — dismantled around 1970 as the ranch was subdivided into private parcels.",
    shortboardTitle: "A quiet birthplace of the shortboard revolution",
    shortboardBody: "The club’s founding roster read like a who’s-who of Santa Barbara surf history — Yater, John Bradbury, the Perko brothers, Arlen and Tim Knight, and a young board-and-fin experimenter named George Greenough. Greenough tested his radical flex-tail kneeboards in the ranch’s waves through the early 1960s, including a dolphin-fin-inspired swept fin he carved for a blunt-nosed balsa “spoon” kneeboard in 1961. Those designs directly influenced Bob McTavish and Nat Young, who rode a Greenough-designed flex fin to the 1966 World Title — meaning waves ridden quietly at Hollister Ranch helped spark a revolution in surfboard design that reshaped the sport worldwide. Yater, who had opened Santa Barbara’s first surfboard shop in 1959, would later become known for his own influential “Yater Spoon” longboard model.",
    pullQuote: "Waves ridden quietly at Hollister Ranch helped spark a revolution in surfboard design that reshaped the sport worldwide.",
    breaksTitle: "The breaks",
    breaksIntro: "Eight named breaks run west to east along the ranch’s coast, nearly all rock-bottom right-hand points that produce long, high-lining walls — a wave shape credited with shaping Santa Barbara’s own tradition of longboard shaping. Cojo and Perko’s, at the western end, are the only breaks that reliably catch summer south swells wrapping around Point Conception; everything east of them falls into the swell shadow of the Channel Islands and leans on winter west swells instead.",
    accessTitle: "Access today",
    access1: "California law guarantees the public the tidelands below the mean high tide line on every beach in the state, Hollister Ranch included — but reaching that strip of wet sand means a boat or a long paddle from Gaviota State Beach, since there is no overland public access to the coast. In practice, that leaves the named breaks the province of parcel owners and their guests, much as it has been since the Surf Club’s era.",
    access2: "That scarcity has its own economy: co-owned parcels, sold in fractional shares specifically for wave access, are common, and Ranch real estate has carried a “surf premium” for decades. A 2022 settlement meant to open a short public access route was later voided by a state appellate court, which found the responsible state agencies had violated public-process law in reaching it. Litigation has continued since, with both sides contesting subsequent rulings as of 2025 — the question of expanded public access remains unresolved.",
    consEyebrow: "Conservation",
    consTitle: "Kept wild, by design",
    cons1: "Hollister Ranch has stayed undeveloped by a combination of Santa Barbara County agricultural-preserve zoning, a 100-acre minimum parcel size that cannot be further subdivided, and continuous cattle grazing across nearly the entire property. An Angus cattle cooperative — roughly 400 resident mother cows plus over a thousand young stockers brought in each fall — still works virtually all 14,400 acres, producing grass-fed beef under the same cooperative structure the Hollister Ranch Owners’ Association set up in 1976. The result is one of the largest privately held, intact landscapes on the California coast.",
    cons2: "The land itself is still rising: the Gaviota Coast sits on an active fault system, and geologists have measured rock uplift here of roughly one to two millimeters a year, carving the stepped marine terraces visible along the bluffs today. Researchers have used Hollister Ranch’s own land access to date those terraces, tracing the coastline’s slow rise back tens of thousands of years.",
    cattleAlt: "Ranch cattle grazing the bluff at sunset above the Pacific",
    wildlife: [
      { title: "Over 200 bird species", body: "The ranch's grassland and coastline support one of the region's richest bird lists, including regionally rare hawks and owls. The endangered western snowy plover fledges here every year, and the Santa Barbara Audubon Society runs organized birding trips to the property." },
      { title: "Mountain lion to tidepool octopus", body: "Mountain lion, black bear, bobcat, coyote, and deer all range across the ranch and the wildlife corridor it forms with neighboring preserves. Below the bluffs, tidepools hold mussels, sea hares, octopus, crabs, and the occasional lobster." },
      { title: "A federally endangered wildflower", body: "The Gaviota tarplant, found nowhere outside a handful of sites on this stretch of coast, has one of its core populations on Hollister Ranch itself — a rare plant found essentially nowhere else on Earth." },
      { title: "A marine reserve at its edge", body: "The no-take Point Conception State Marine Reserve, over 22 square miles of protected water, sits directly off the ranch's western end, part of a chain of marine protected areas along the Gaviota Coast." },
    ],
    tidepool: "The nonprofit Hollister Ranch Conservancy runs a free “Tide Pool School” for children ages 5 to 12, a program started in the early 1990s that still brings hundreds of Santa Barbara-area schoolchildren — many from underserved communities — onto the ranch each year at no cost to their schools. The Conservancy also monitors a two-plus-mile stretch of coast it calls the Shoreline Preserve, and partners with researchers from UC Santa Barbara, UCLA, and UC Santa Cruz on ongoing intertidal studies of seaweed, limpets, and water temperature.",
  },

  seasons: {
    eyebrow: "Plan Your Season",
    title: "Best time to visit",
    intro: "The ranch changes with the seasons — here’s what to expect through the year.",
    now: "Happening now",
    items: [
      { months: "Dec – Feb", title: "Winter swell", body: "Big west and northwest swells wrap onto Drake's, Little Drake's, Utah, and Razor Blades — the ranch's most consistent, powerful stretch of the year." },
      { months: "May – Sep", title: "Summer south swell", body: "Cojo, Perko's, and St. Augustine's come alive on south swells wrapping around Point Conception, an exposure most of the ranch doesn't share." },
      { months: "Dec – May", title: "Gray whale migration", body: "Southbound whales pass the Channel Islands in December and January; the northbound migration runs closer to shore from February through May, with mother-and-calf pairs hugging the coast into May." },
      { months: "Mar – May", title: "Spring wildflowers", body: "Ice plant, agave, and native wildflowers carpet the bluffs and garden paths each spring, the season captured in much of the property's photography." },
    ],
  },

  map: {
    eyebrow: "Location & Access",
    title: "Find the Ranch",
    body: "Hollister Ranch sits on the Gaviota Coast in Santa Barbara County, about 2 hours 15 minutes from Los Angeles and 30 minutes from downtown Santa Barbara. Because the ranch is a private, gated community with a single guarded entrance, we share Rancho Alegria’s exact address and gate directions directly with confirmed guests rather than publishing them here.",
    terrainEyebrow: "Fly the Coastline",
    terrainTitle: "8.5 miles of coast, in real 3D terrain",
    terrainBody: "An actual terrain map built from real elevation and satellite data — not a photo. Watch the opening flight from Point Conception east along the ranch toward Gaviota, then drag to rotate, tilt, and explore the coastline yourself.",
    legend: { property: "Rancho Alegria", surf: "Surf break", landmark: "Landmark" },
    distances: [
      { label: "Los Angeles", value: "2h 15m" },
      { label: "Santa Barbara", value: "30 min" },
      { label: "Ranch coastline", value: "8.5 mi" },
      { label: "Access gates", value: "1" },
    ],
    iframeTitle: "Rancho Alegria, Parcel 107 — approximate location",
    approx: "Approximate property location — Hollister Ranch does not publish exact coordinates or gate directions",
    earth: "Explore the coastline in Google Earth →",
    aboveEyebrow: "From Above",
    aboveTitle: "The residence itself",
    aboveBody: "Where the terrain map shows the land, these are the real aerial photographs of Rancho Alegria on it.",
    aerialAlt1: "Aerial view of Rancho Alegria and the Pacific",
    aerialAlt2: "The residence and coastline from above",
    loadingTerrain: "Loading terrain…",
  },

  distance: {
    prompt: "Curious how far you are from the ranch?",
    button: "Find out",
    locating: "Locating…",
    result: "You’re about {miles} miles from Rancho Alegria, roughly to the {compass} of you — as the crow flies.",
    bearingAria: "Bearing to Rancho Alegria: {compass}",
    denied: "Location access was declined — no problem, come back anytime.",
    error: "Couldn’t determine your location right now.",
  },

  terrain: {
    sky: { night: "Night", dawn: "Dawn", day: "Day", dusk: "Dusk" },
    flyTo: "Fly to {name}",
    flying: "Flying the coastline…",
    replay: "↻ Replay flyover",
    viewProperty: "View Rancho Alegria",
    close: "Close",
    hint: "Drag to rotate · Click a marker for details",
    liveSky: "Live sky",
    loading: "Loading terrain…",
    propertyNote: "Parcel 107 — the bluff-top residence and grounds, directly above Razor Blades.",
    // Same order as SURF_BREAKS in data/surf.ts
    breaks: [
      { swell: "Big W swells", note: "A long, rocky right point near Point Conception, once reachable by ranch road — now accessible only by boat." },
      { swell: "SW summer, big W winter", note: "Widely considered the best wave on the ranch's western stretch — a reef and point that holds both big winter swells and summer south swells wrapping around Point Conception, an exposure most of the ranch's more easterly breaks don't share." },
      { swell: "S summer swells", note: "A cobblestone right point named for founding Surf Club members Bob and John Perko; a reliable summer break that needs a south swell to turn on." },
      { swell: "Big W swells", note: "The ranch's longest right point, holding well-overhead west swells up to double overhead with a long, workable wall." },
      { swell: "W swells", note: "A smaller, more forgiving break named alongside Big Drake's by the Santa Barbara Surf Club." },
      { swell: "W/NW swells", note: "One of the breaks named by the Santa Barbara Surf Club during its decade exploring the coastline." },
      { swell: "S summer swells", note: "An average wave with both rights and lefts, best on summer south swells." },
      { swell: "Big W/NW swells", note: "Named for the sharp rocks lining the beach; the break closest to the Gaviota launch, needing a big west or northwest swell. Rancho Alegria (Parcel 107) sits on the bluff directly above it." },
    ],
    // Same order as LANDMARKS in data/surf.ts
    landmarks: [
      { name: "Point Conception Lighthouse", note: "Marks the sharp bend where California's coast turns from north–south to east–west. To the Chumash this headland is Humqaq, the sacred \"Western Gate\" where souls were believed to depart for the afterlife." },
      { name: "Gaviota State Park", note: "The nearest public beach on the mainland side, and the usual launch point for the boat or long paddle needed to reach the ranch's breaks from the water." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Get in Touch",
    sunsetAlt: "Sunset over the Pacific from Rancho Alegria",
    reachTitle: "Reach out directly",
    reachBody: "This site is for information only. For more information or questions about Rancho Alegria, reach out directly — by email or by phone.",
    email: "Email",
    callOrText: "Call or Text",
    aboutTitle: "About this site",
    expect: [
      "A private, gated 113-acre parcel on Hollister Ranch's protected coastline.",
      "Answers to questions about the property, its history, and the ranch.",
      "This site is for information only — reach out directly with any questions.",
    ],
  },

  faq: {
    eyebrow: "Frequently Asked",
    title: "A few common questions",
    items: [
      { q: "What is Hollister Ranch 107?", a: "Hollister Ranch 107 is Rancho Alegria, Parcel 107 of Hollister Ranch: 113 private bluff-top acres on California's Gaviota Coast with a main house, guest house, ocean-view tennis court, and hot tub, directly above the Razor Blades surf break." },
      { q: "Who owns Hollister Ranch 107?", a: "Rancho Alegria, Parcel 107, was established in 1987 and has been held by the Clavin family ever since." },
      { q: "What is Hollister Ranch?", a: "Hollister Ranch is a private, gated 14,400-acre cattle ranch with 8.5 miles of undeveloped Pacific coastline on the Gaviota Coast, west of Santa Barbara. It was subdivided in 1971 into parcels of 100 acres or more that can never be further divided." },
      { q: "Who owns Hollister Ranch?", a: "No single owner. Nearly 1,000 owners hold interests across the ranch's 136 parcels, and the Hollister Ranch Owners' Association manages the shared roads, utilities, and the working cattle cooperative." },
      { q: "Is Rancho Alegria open to the public?", a: "No. Hollister Ranch is a private, gated community with a single guarded entrance — access is limited to parcel owners, their guests, and confirmed visitors." },
      { q: "Where exactly is the property?", a: "On the Gaviota Coast in Santa Barbara County, about 2 hours 15 minutes from Los Angeles and 30 minutes from downtown Santa Barbara." },
      { q: "What amenities does the property have?", a: "A main house and a separate guest house, a private hot tub, and a full-size ocean-view tennis court — all inside the ranch's single guarded gate, on the bluff directly above the Razor Blades surf break." },
      { q: "Does this website handle bookings?", a: "No — this site exists to share the property's history and character. For any questions, including about visiting, reach out directly using the contact details above." },
    ],
  },

  schema: {
    placeDescription:
      "Rancho Alegria, Parcel 107 of Hollister Ranch: 113 private bluff-top acres on California's Gaviota Coast with a main house, guest house, ocean-view tennis court, and hot tub, directly above the Razor Blades surf break.",
    videoName: "Rancho Alegria property tour — Hollister Ranch 107",
    videoDescription: "A video tour of Rancho Alegria, Parcel 107 of Hollister Ranch on California's Gaviota Coast.",
    amenities: [
      "Main house",
      "Separate guest house",
      "Private ocean-view tennis court",
      "Private hot tub",
      "Fruit orchard",
      "Single guarded gate",
      "Razor Blades surf break directly below",
    ],
  },

  // Photo captions keyed by slug; English captions live in data/photos.ts, so this is empty here.
  captions: {} as Record<string, string>,
};

export type Dict = typeof en;
export default en;
