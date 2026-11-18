import manifest from "./photos-manifest.json";

export type Category = "family" | "residence" | "grounds" | "coastline" | "sky";

export type Photo = {
  slug: string;
  width: number;
  height: number;
  caption?: string;
  category: Category;
  blurDataURL?: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  family: "Family & Memories",
  residence: "Residence",
  grounds: "Grounds & Gardens",
  coastline: "Coastline",
  sky: "Sky & Weather",
};

const CAPTIONS: Record<string, { caption?: string; category: Category }> = {
  "157": { caption: "The entry hall, hand-forged iron and reclaimed wood beneath a wrought-iron chandelier.", category: "residence" },
  "162": { caption: "The great room window seat, framing an unbroken line of Pacific horizon.", category: "residence" },
  "167": { caption: "The primary bath's clawfoot tub, positioned for an ocean view from the water.", category: "residence" },
  "201": { caption: "Rancho Alegria at dusk, tucked into the Santa Rosa Hills above the water.", category: "residence" },

  "ranch-001": { caption: "Blue agave in bloom above the Pacific — Rancho Alegria's garden bluff.", category: "coastline" },
  "ranch-002": { category: "coastline" },
  "ranch-003": { category: "coastline" },
  "ranch-004": { caption: "The residence from above, roofline against open ocean.", category: "residence" },
  "ranch-005": { caption: "An aerial view of the property's terraced approach and motor court.", category: "residence" },
  "ranch-006": { category: "residence" },
  "ranch-007": { category: "residence" },
  "ranch-008": { category: "residence" },
  "ranch-009": { caption: "A stone-walled overlook built for watching the horizon.", category: "grounds" },
  "ranch-010": { category: "residence" },
  "ranch-011": { category: "residence" },
  "ranch-012": { category: "residence" },
  "ranch-013": { category: "residence" },
  "ranch-014": { category: "residence" },
  "ranch-015": { category: "residence" },
  "ranch-016": { category: "residence" },
  "ranch-017": { category: "residence" },
  "ranch-018": { category: "residence" },
  "ranch-019": { category: "residence" },
  "ranch-020": { caption: "Spring wildflowers carpet the hillside beside the house.", category: "grounds" },
  "ranch-021": { caption: "Ice plant and agave along the bluff-top garden path.", category: "grounds" },
  "ranch-022": { caption: "Lavender and flowering succulents above the Channel.", category: "grounds" },
  "ranch-023": { caption: "The ranch road winding through palms toward the coast.", category: "grounds" },
  "ranch-024": { caption: "The stone path climbing to the house through spring bloom.", category: "grounds" },
  "ranch-025": { caption: "A bistro table at the garden's edge, palms framing the sea.", category: "grounds" },
  "ranch-026": { caption: "The stone path's end, looking straight out to open water.", category: "grounds" },
  "ranch-027": { caption: "The property's private tennis court, ocean beyond the fence line.", category: "grounds" },

  "dscn3202": { caption: "Guests and one of the ranch's horses on the bluff-top lawn.", category: "grounds" },
  "dscn3204": { category: "grounds" },

  "dsc-0050": { caption: "The great room, vaulted beam ceiling and a three-tier iron chandelier.", category: "residence" },
  "dsc-0052": { caption: "The kitchen — copper pendant lights over a long stone-topped island.", category: "residence" },
  "dsc-0067": { caption: "The guest house among the gardens, the coastline stretching to the horizon.", category: "residence" },
  "dsc-0074": { caption: "A palm-lined motor court above the Santa Barbara Channel.", category: "residence" },
  "dsc-0077": { caption: "Rancho Alegria's roofline against 180 degrees of open Pacific.", category: "coastline" },
  "dsc-0078": { caption: "A quiet study, ranch memorabilia and ocean light.", category: "residence" },

  "img-0599": { caption: "Sunrise through the window seat, roses in bloom.", category: "residence" },
  "img-0601": { caption: "The covered veranda at golden hour, sea beyond.", category: "residence" },
  "img-0602": { caption: "First light on the rose garden, ocean beyond.", category: "grounds" },
  "img-0603": { caption: "The stone-walled overlook at sunset, set for an evening outdoors.", category: "grounds" },
  "img-0604": { caption: "The residence at sunset, roses climbing toward the eaves.", category: "residence" },
  "img-0605": { caption: "The dining room, set for sunset over the Channel.", category: "residence" },

  "img-20141116-123109393": { category: "grounds" },
  "img-20141116-125352885": { category: "grounds" },

  "img-20150118-173149189": { caption: "Sunset over the Santa Barbara Channel from the bluff.", category: "coastline" },
  "img-20150118-173643817": { category: "coastline" },
  "img-20150118-173656767": { category: "coastline" },
  "img-20150118-173727311": { category: "coastline" },
  "img-20150118-173738328": { category: "coastline" },
  "img-20150118-173747849": { category: "coastline" },
  "img-20150118-173759668": { category: "coastline" },
  "img-20150118-174151757": { category: "coastline" },
  "img-20150118-174326756": { category: "coastline" },
  "img-20150118-174347238": { category: "coastline" },
  "img-20150118-174359425": { category: "coastline" },

  "img-20150119-123532632": { caption: "Coastal fog rolling over the ranch's oak-studded hills.", category: "sky" },
  "img-20150119-123545189": { category: "grounds" },
  "img-20150119-123551848": { category: "grounds" },
  "img-20150119-123601988": { category: "grounds" },
  "img-20150119-123607400": { category: "grounds" },
  "img-20150119-123612180": { category: "grounds" },
  "img-20150119-123746035": { category: "grounds" },
  "img-20150119-123757429": { category: "grounds" },
  "img-20150119-123827364": { category: "grounds" },

  "img-20150215-124719191": { caption: "Beach access below the bluffs, one of Hollister Ranch's coves.", category: "coastline" },

  "img-20150504-123536790": { caption: "The house framed by mature date palms, hillside behind.", category: "grounds" },
  "img-20150504-123559819-hdr": { category: "grounds" },
  "img-20150504-123801302": { category: "grounds" },
  "img-20150504-123911697": { category: "grounds" },

  "1000000893": { caption: "Dusk settles over the Gaviota Coast, looking east from the bluff.", category: "coastline" },
  "1000000918": { caption: "Golden hour on the lawn, palms backlit against the coastal hillside.", category: "grounds" },
  "1000002157": { caption: "The sitting room window, framing palms and the open Pacific.", category: "residence" },
  "1000002160": { caption: "Coastal fog burning off at sunrise, a lone oak against the glow.", category: "sky" },
  "1000002725": { caption: "Sunrise breaking through the marine layer over the Santa Barbara Channel.", category: "sky" },
  "1000002820": { caption: "Ranch cattle grazing the bluff at sunset, the Pacific below.", category: "grounds" },
  "1000002822": { caption: "Cattle on the spring-green hillside, morning sun over the water.", category: "grounds" },
  "1000003478": { caption: "Ice plant in bloom above the orchard, sunset over the Pacific.", category: "coastline" },
  "img-0991": { caption: "Waves rolling in below the bluffs at first light.", category: "coastline" },

  // Photos from Harold Clavin (Aug 2026): family life, wildlife, and the grounds today
  "hc-5264": { caption: "Sunset from the bluff, the Channel glowing pink and gold below the orchard.", category: "sky" },
  "hc-front-a": { caption: "The main house from the hillside above, its tile roof set against the open Pacific.", category: "residence" },
  "hc-front-b": { caption: "The covered veranda, looking out past the palms to the sea.", category: "residence" },
  "hc-jeanette-garden": { caption: "Jeanette Clavin in her ranch garden.", category: "family" },
  "hc-1385": { caption: "A rest on the old stump seats by the ranch gate.", category: "family" },
  "hc-1395": { caption: "Under the palms in the hillside garden.", category: "family" },
  "hc-dining": { caption: "The dining room, its window looking straight out to sea.", category: "residence" },
  "hc-bobcat-patio": { caption: "A bobcat stops by the patio — one of the ranch's regular visitors.", category: "family" },
  "hc-1440": { caption: "Tide pools on the rocky shore below the ranch.", category: "coastline" },
  "hc-1494": { caption: "A storm sky breaking over the point.", category: "sky" },
  "hc-1907": { caption: "Wading in the surf on a ranch beach.", category: "family" },
  "hc-1908": { caption: "A beach walk with the family dog.", category: "family" },
  "hc-1917": { caption: "Sun hats and bare feet on a morning beach walk.", category: "family" },
  "hc-garden-stairs": { caption: "The stone stairway winding down through the garden.", category: "grounds" },
  "hc-garden-lawn": { caption: "Geraniums, cactus, and a chair on the garden lawn.", category: "grounds" },
  "hc-house-cactus": { caption: "The main house above the cactus garden.", category: "residence" },
  "hc-palms-sea": { caption: "Palms and orchard trees stepping down toward the sea.", category: "grounds" },
  "hc-palm-path": { caption: "The palm-lined stone path out to the bluff.", category: "grounds" },
  "hc-terrace-chairs": { caption: "Iron chairs on the stone terrace, a red-tile roof beyond.", category: "grounds" },
  "hc-low-tide": { caption: "Exploring the reef at low tide.", category: "family" },
  "hc-family-beach": { caption: "Together on the beach below the ranch.", category: "family" },
  "hc-5251": { caption: "Walking up the stone path at sunset.", category: "family" },
  "hc-5260": { caption: "The coastal railroad trestle at dusk.", category: "coastline" },
  "hc-5296": { caption: "The family dog keeping watch over the Channel.", category: "family" },
  "hc-5298": { caption: "Waiting on the stepping stones for the next walk.", category: "family" },
  "hc-2999": { caption: "An evening on the beach.", category: "family" },
  "hc-3014": { caption: "Relaxing on the hillside above the house.", category: "family" },
  "hc-4772": { caption: "The sun setting into the Pacific from the beach.", category: "coastline" },
  "hc-4876": { caption: "Out on the rocks at low tide.", category: "family" },
  "hc-4942": { caption: "Watching the sun go down from the rocks.", category: "family" },
  "hc-4943": { caption: "Golden hour on the rocks below the ranch.", category: "family" },
  "hc-5232": { caption: "Dusk over the green hills, the coastline curving away below.", category: "coastline" },
  "hc-5234": { caption: "The fire-pit terrace at sunset.", category: "grounds" },
  "hc-guest-house-sign": { caption: "The guest house, signposted at the end of the drive.", category: "residence" },
  "hc-tennis": { caption: "The ocean-view tennis court.", category: "grounds" },
  "hc-spa": { caption: "The hot tub on the bluff-top terrace, among flowering coral trees.", category: "grounds" },
  "hc-sunset-gathering": { caption: "Gathered on the bluff to watch the sunset.", category: "family" },
  "hc-bobcat-drive": { caption: "Another bobcat crossing the drive.", category: "family" },
  "hc-967": { caption: "A morning with the dog in the spring grass.", category: "family" },
  "hc-968": { caption: "Morning coffee in the spring grass.", category: "family" },
  "hc-quail": { caption: "A California quail on the roofline.", category: "family" },
  "hc-cactus-garden": { caption: "The cactus garden on the hillside, the ocean beyond.", category: "grounds" },
  "hc-guest-house": { caption: "The guest house under its red-tile roof, spring grass all around.", category: "residence" },
  "hc-veranda-chairs": { caption: "Adirondack chairs at the end of the veranda.", category: "grounds" },
  "hc-garden-path": { caption: "Stone steps through the flowering garden.", category: "grounds" },
  "hc-palm-walk": { caption: "The palm walk out to the edge of the bluff.", category: "grounds" },
};

type ManifestEntry = {
  slug: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export const photos: Photo[] = (manifest as ManifestEntry[]).map((entry) => ({
  slug: entry.slug,
  width: entry.width,
  height: entry.height,
  blurDataURL: entry.blurDataURL,
  caption: CAPTIONS[entry.slug]?.caption,
  category: CAPTIONS[entry.slug]?.category ?? "grounds",
}));

export function getPhoto(slug: string): Photo | undefined {
  return photos.find((p) => p.slug === slug);
}

export const featuredSlugs = [
  "hc-front-a",
  "162",
  "hc-5232",
  "201",
  "hc-spa",
  "img-0602",
  "hc-palm-walk",
  "157",
];

export const featuredPhotos = featuredSlugs
  .map((slug) => photos.find((p) => p.slug === slug))
  .filter((p): p is Photo => Boolean(p));

export const heroSlug = "hc-5264";
