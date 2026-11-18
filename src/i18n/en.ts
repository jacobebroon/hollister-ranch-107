// All visitor-facing English copy. es.ts mirrors this shape exactly (typed as Dict).
const en = {
  lang: "en",
  htmlLang: "en-US",
  ogLocale: "en_US",
  homePath: "/",

  meta: {
    title: "Hollister Ranch 107 — Rancho Alegria, the Clavin Family Ranch",
    description:
      "Rancho Alegria, Hollister Ranch Parcel 107: the bluff-top ranch on California's Gaviota Coast that Harold and Jeanette Clavin built from the ground up in 1987 — its story, family photos, and history, above Razor Blades.",
  },

  nav: {
    links: [
      "Home",
      "Our Story",
      "Memories",
      "Gallery",
      "The Ranch",
      "Contact"
    ],
    brandSub: "Parcel 107 · Hollister Ranch",
    toggleMenu: "Toggle menu",
    switchLabel: "ES",
    switchName: "Español",
    switchHref: "/es",
    switchAria: "Ver este sitio en español",
  },

  footer: {
    sub: "Parcel 107, Hollister Ranch",
    signature: "Built by hand by Harold & Jeanette Clavin, 1987",
    blurb:
      "A family ranch on 113 acres of bluff above the Pacific, built by Harold and Jeanette Clavin on the Gaviota Coast north of Santa Barbara.",
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
      "A family ranch on the edge of the Pacific — built by hand by Harold and Jeanette Clavin, and loved by three generations since 1987.",
    facts: [
      "Built by the Clavin family",
      "Since 1987",
      "Three generations"
    ],
    ctaPrimary: "Read Our Story",
    ctaFilm: "Watch the Film",
    ctaTour: "Take the Photo Tour",
    scrollAria: "Scroll to the film",
    imageAlt: "Sunset over the Santa Barbara Channel from the bluff at Rancho Alegria, Hollister Ranch 107",
  },

  video: {
    eyebrow: "The Film",
    intro: "Fly over the bluff, walk the stone paths, and step inside the house Harold and Jeanette built — a four-and-a-half-minute film of the whole ranch.",
    title: "See Rancho Alegria",
    caption: "A film tour of Rancho Alegria, Parcel 107.",
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


  intro: {
    eyebrow: "Where It Is",
    title: "One of California’s last truly wild coastlines",
    p1: "Hollister Ranch is a private, gated 14,400-acre cattle ranch spanning 8.5 miles of undeveloped Pacific coastline on the Gaviota Coast, just north of Santa Barbara. Named for Colonel William Welles Hollister, who acquired the land in 1866, the ranch was divided in 1971 into parcels of 100 acres or more — permanently protected from further subdivision — and has remained one of the least-developed stretches of coast in the continental United States ever since.",
    p2: "Rancho Alegria — Hollister Ranch Parcel 107 — is the Clavin family's piece of it: 113 acres of bluff above the Santa Barbara Channel, framed by rolling grassland, the gardens they planted, and an unbroken view of open ocean.",
    link: "Read the full history of Hollister Ranch →",
  },

  property: {
    eyebrow: "Around the Ranch",
    title: "The home they built, and the life around it",
    p1: "Rancho Alegria takes its name from nearby Alegria Canyon, on the western reach of Hollister Ranch where the Santa Rosa Hills meet the Santa Barbara Channel. The single-level main house was built to sit quietly in the land — terracotta tiles, reclaimed wood, and hand-forged iron — with every main room opening onto the same view of open Pacific.",
    p2: "Around it, the family added a guest house for visiting children and grandchildren, a hot tub on the bluff, an ocean-view tennis court, a fruit orchard, and stone paths that wander through Jeanette's gardens to the edge of the bluff.",
    p3: "Below the bluff is Razor Blades, the named surf break closest to the Gaviota gate — close enough to watch the sets roll in from the house.",
    advantages: [
      {
        title: "113 acres of open land",
        body: "Grassland, orchard, and garden with room to wander — and a view in every direction."
      },
      {
        title: "The view from the bluff",
        body: "The Santa Barbara Channel and the Channel Islands, from first light to whale season."
      },
      {
        title: "One gate in",
        body: "A single guarded entrance to the whole ranch keeps the road quiet and the land wild."
      },
      {
        title: "A legendary surf coast",
        body: "Parcel 107 sits along Hollister Ranch's 8.5 miles of point breaks, first explored by Santa Barbara surfers in the 1950s."
      },
      {
        title: "Above Razor Blades",
        body: "The surf break directly below the bluff — the named break closest to the Gaviota gate."
      },
      {
        title: "The main house",
        body: "Single-level and hacienda-style, with a terracotta roof, hand-forged ironwork, and a window seat built for watching the horizon."
      },
      {
        title: "Dark skies, working ranch",
        body: "Cattle graze the hills around the parcel, and at night there's no light but the stars."
      },
      {
        title: "The tennis court",
        body: "Finished in 1989 and set into the bluff, with open Pacific behind the far baseline."
      },
      {
        title: "The guest house",
        body: "Completed in 1990 down the slope under its own red-tile roof, so visiting family have a place of their own."
      },
      {
        title: "The hot tub",
        body: "On the bluff-top terrace among the coral trees — the best seat on the ranch for sunset."
      },
      {
        title: "The fire pit",
        body: "A fire-pit terrace on the hillside, where cool evenings on the coast end with the stars coming out."
      },
      {
        title: "Miles of ranch trails",
        body: "Hollister Ranch keeps more than 120 miles of trails across its 14,400 acres for owners and their guests."
      }
    ],
    insideOut: "Inside & Out",
    viewGallery: "View full gallery →",
    viewInGallery: "View in gallery",
    fallbackAlt: "Rancho Alegria, Parcel 107",
  },

  story: {
    eyebrow: "Our Story",
    title: "Built from the ground up by Harold and Jeanette Clavin",
    paragraphs: [
      "Rancho Alegria wasn’t bought finished — it was made. Harold and Jeanette Clavin designed and built Parcel 107 themselves, starting from 113 acres of open, bluff-top grassland and shaping every part of the ranch you see today.",
      "It was the work of years. Building on Hollister Ranch means one gated road in, county agricultural-preserve rules, permits, and California Coastal Commission requirements at every stage — so the grading, the roads, the house sites, and the gardens here were all planned and built with patience. A lake on the parcel supplied the ranch’s agricultural water, feeding the orchard and plantings as they grew in.",
      "The result is a hacienda-style main house set low on the bluff, a guest house down the slope, an ocean-view tennis court, an orchard, and stone paths winding to the edge of the Pacific. More than three decades later, Rancho Alegria is still in the Clavin family — now shared by three generations.",
    ],
    builderEyebrow: "The builders",
    builderName: "Harold Clavin, M.D., and Jeanette Clavin",
    builderBio: [
      "Harold Clavin is a Los Angeles native who went to Fairfax High School, earned his undergraduate degree at UCLA, and his medical degree at the University of Southern California. A board-certified plastic and reconstructive surgeon and Fellow of the American College of Surgeons, he founded the Clavin Center in Santa Monica and served as president of the Los Angeles Society of Plastic Surgeons.",
      "He brought the same precision and eye for proportion to Parcel 107 — and with his wife, Jeanette, turned an empty hillside into a ranch built to last for generations.",
    ],
    timelineTitle: "How the ranch was built",
    timeline: [
      { year: "1987", title: "The land", body: "Work begins on 113 acres of untouched bluff-top grassland on the western reach of Hollister Ranch." },
      { year: "1988", title: "Grading", body: "The building sites, terraces, and ranch roads are graded into the hillside." },
      { year: "1989", title: "The tennis court", body: "The ocean-view tennis court is finished on the bluff." },
      { year: "1990", title: "The guest house", body: "The guest house is completed down the slope, under its own red-tile roof." },
      { year: "Today", title: "Three generations", body: "The main house, gardens, orchard, and stone paths complete the ranch — still enjoyed by three generations of the Clavin family." },
    ],
    photoAlt: "The main house from the hillside above, its tile roof against the Pacific",
    courtAlt: "The private tennis court, finished in 1989, with the ocean beyond",
  },

  memories: {
    eyebrow: "Family Photos & Memories",
    title: "Life at Rancho Alegria",
    intro: "More than three decades on, this is where the Clavin family comes together — beach walks at low tide, evenings on the bluff watching the sun drop into the Channel, and the occasional bobcat wandering past the patio as if it owns the place. These are some of the family's own photos.",
    groups: [
      {
        title: "Days on the beach",
        body: "Low tide on the reef, sun hats, bare feet, and the dog leading the way."
      },
      {
        title: "Evenings on the bluff",
        body: "Most days end the same way: everyone outside for the sunset."
      },
      {
        title: "Home and garden",
        body: "Jeanette in her garden, morning coffee in the spring grass, and the dog keeping watch."
      },
      {
        title: "Our wild neighbors",
        body: "Bobcats, quail, and the rest of the ranch's locals stop by often."
      }
    ],
    open: "Open in the photo tour",
    credit: "Photos courtesy of the Clavin family."
  },

  interludes: [
    {
      line: "113 acres. One family. Since 1987.",
      sub: "Rancho Alegria · Hollister Ranch 107",
      alt: "Dusk over the green hills of Rancho Alegria, the coastline curving away below"
    },
    {
      line: "Every evening, the same view — and it never gets old.",
      sub: "Sunset below the bluff",
      alt: "The sun setting into the Pacific from the beach below the ranch"
    }
  ],

  estate: {
    tour: "Tour the grounds",
    tourStop: "Stop the tour",
    zoomIn: "Zoom in",
    zoomOut: "Show all",
    openTour: "Open in photo tour",
    prevSpot: "Previous spot",
    nextSpot: "Next spot",
    eyebrow: "Explore the Estate",
    title: "Walk the grounds from above",
    intro:
      "Tap a marker on the aerial photograph to step inside that part of Rancho Alegria — the residence, the motor court, the ranch drive, the guest house, and the water below.",
    hint: "Tap a marker to explore",
    photoAlt: "Aerial photograph of Rancho Alegria’s residence, motor court, ranch drive, and guest house above the Pacific",
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
        title: "The guest house",
        body: "Down the slope under its own red-tile roof, the separate guest house gives visiting family and friends a private place of their own among the gardens — steps from the main house, with the same open view across the Santa Barbara Channel.",
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
      family: "Family & Memories",
      residence: "The Residence",
      grounds: "Grounds & Gardens",
      coastline: "The Coastline",
      sky: "Sky & Weather",
    },
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Rancho Alegria in Full",
    intro: "Photographs of the house, the gardens, the coastline, and family life at Parcel 107 — taken across many seasons and years.",
    filters: {
      all: "All Photos",
      family: "Family & Memories",
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
    showMore: "Show {count} more photos",
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
    eyebrow: "Through the Year",
    title: "The ranch through the seasons",
    intro: "The ranch changes with every season — here’s what each one brings.",
    now: "Happening now",
    items: [
      { months: "Dec – Feb", title: "Winter swell", body: "Big west and northwest swells wrap onto Drake's, Little Drake's, Utah, and Razor Blades — the ranch's most consistent, powerful stretch of the year." },
      { months: "May – Sep", title: "Summer south swell", body: "Cojo, Perko's, and St. Augustine's come alive on south swells wrapping around Point Conception, an exposure most of the ranch doesn't share." },
      { months: "Dec – May", title: "Gray whale migration", body: "Southbound whales pass the Channel Islands in December and January; the northbound migration runs closer to shore from February through May, with mother-and-calf pairs hugging the coast into May." },
      { months: "Mar – May", title: "Spring wildflowers", body: "Ice plant, agave, and native wildflowers carpet the bluffs and garden paths each spring, the season captured in much of the property's photography." },
    ],
  },

  map: {
    viewMap: "Map",
    viewSatellite: "Satellite",
    openGoogle: "Google Maps",
    openApple: "Apple Maps",
    eyebrow: "Location & Access",
    title: "Find the Ranch",
    body: "Hollister Ranch sits on the Gaviota Coast in Santa Barbara County, about 2 hours 15 minutes from Los Angeles and 30 minutes from downtown Santa Barbara. Because the ranch is a private, gated community with a single guarded entrance, Rancho Alegria’s exact address and gate directions aren’t published here.",
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
    showMap: "Show the interactive map",
    approx: "Approximate property location — Hollister Ranch does not publish exact coordinates or gate directions",
    earth: "Explore the coastline in Google Earth →",
    aboveEyebrow: "From Above",
    aboveTitle: "The residence itself",
    aboveBody: "Where the terrain map shows the land, these are the real aerial photographs of Rancho Alegria on it.",
    aerialAlt1: "Aerial view of Rancho Alegria and the Pacific",
    aerialAlt2: "The guest house and coastline from above",
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
    viewProperty: "View Rancho Alegria",
    close: "Close",
    tourPlay: "Play coastline tour",
    tourPause: "Pause tour",
    touring: "Touring the coast…",
    prev: "Previous stop",
    next: "Next stop",
    stopOf: "Stop {n} of {total}",
    stopsTitle: "Stops along the coast, west to east",
    relief: "3D relief",
    labels: "Place names",
    distanceFrom: "About {miles} miles {dir} of Rancho Alegria",
    west: "west",
    east: "east",
    gestureDesktop: "Use Ctrl + scroll to zoom the map",
    gestureMac: "Use ⌘ + scroll to zoom the map",
    gestureMobile: "Use two fingers to move the map",
    kinds: { surf: "Surf break", landmark: "Landmark", property: "The ranch" },
    hint: "Drag to look around · Tap any marker or stop for its story",
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
      "The Clavin family's ranch, on Hollister Ranch's protected coastline.",
      "Answers to questions about the property, its history, and the ranch.",
      "This site is for information only — reach out directly with any questions."
    ],
  },

  faq: {
    eyebrow: "Frequently Asked",
    title: "A few common questions",
    items: [
      { q: "What is Hollister Ranch 107?", a: "Hollister Ranch 107 is Rancho Alegria, Parcel 107 of Hollister Ranch: 113 private bluff-top acres on California's Gaviota Coast with a main house, guest house, ocean-view tennis court, and hot tub, directly above the Razor Blades surf break." },
      { q: "Who owns Hollister Ranch 107?", a: "Rancho Alegria, Parcel 107, has been held by the Clavin family since 1987 and is now enjoyed by three generations of the family." },
      { q: "Who built Hollister Ranch 107?", a: "Harold Clavin, M.D. — a Los Angeles plastic and reconstructive surgeon — and his wife, Jeanette Clavin, designed and built Rancho Alegria from the ground up, beginning in 1987: the site was graded in 1988, the tennis court finished in 1989, and the guest house completed in 1990, followed by the main house, gardens, and orchard." },
      { q: "What is Hollister Ranch?", a: "Hollister Ranch is a private, gated 14,400-acre cattle ranch with 8.5 miles of undeveloped Pacific coastline on the Gaviota Coast, west of Santa Barbara. It was subdivided in 1971 into parcels of 100 acres or more that can never be further divided." },
      { q: "Who owns Hollister Ranch?", a: "No single owner. Nearly 1,000 owners hold interests across the ranch's 136 parcels, and the Hollister Ranch Owners' Association manages the shared roads, utilities, and the working cattle cooperative." },
      { q: "Is Rancho Alegria open to the public?", a: "No. Hollister Ranch is a private, gated community with a single guarded entrance — access is limited to parcel owners, their guests, and confirmed visitors." },
      { q: "Where exactly is the property?", a: "On the Gaviota Coast in Santa Barbara County, about 2 hours 15 minutes from Los Angeles and 30 minutes from downtown Santa Barbara." },
      { q: "What amenities does the property have?", a: "A main house and a separate guest house, a private hot tub, and a full-size ocean-view tennis court — all inside the ranch's single guarded gate, on the bluff directly above the Razor Blades surf break." },
      { q: "Does this website handle bookings?", a: "No — this site exists to share the property's history and character. For any questions, including about visiting, reach out directly using the contact details above." },
      { q: "What wildlife lives at Rancho Alegria?", a: "Bobcats are regular visitors — the family has photographed them on the patio and crossing the drive — along with California quail, hawks, coyotes, and deer. Hollister Ranch as a whole records over 200 bird species, and gray whales pass offshore from December through May." },
      { q: "Where can I see photos of the family at the ranch?", a: "The Family Photos & Memories section on this page has the Clavin family's own photos — beach walks at low tide, sunsets on the bluff, Jeanette in her garden, and the ranch's wild neighbors. More are in the gallery under Family & Memories." },
    ],
  },

  schema: {
    placeDescription:
      "Rancho Alegria, Parcel 107 of Hollister Ranch: 113 private bluff-top acres on California's Gaviota Coast with a main house, guest house, ocean-view tennis court, and hot tub, directly above the Razor Blades surf break. Designed and built by Harold and Jeanette Clavin beginning in 1987.",
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
