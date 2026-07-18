import manifest from "./photos-manifest.json";

export type Category = "residence" | "grounds" | "coastline" | "sky";

export type Photo = {
  slug: string;
  width: number;
  height: number;
  caption?: string;
  category: Category;
  blurDataURL?: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
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
  "ranch-021": { category: "grounds" },
  "ranch-022": { category: "grounds" },
  "ranch-023": { category: "grounds" },
  "ranch-024": { category: "grounds" },
  "ranch-025": { category: "grounds" },
  "ranch-026": { category: "grounds" },
  "ranch-027": { category: "grounds" },

  "dscn3202": { caption: "Guests and one of the ranch's horses on the bluff-top lawn.", category: "grounds" },
  "dscn3204": { category: "grounds" },

  "dsc-0050": { caption: "The great room, vaulted beam ceiling and a three-tier iron chandelier.", category: "residence" },
  "dsc-0052": { caption: "The kitchen — copper pendant lights over a long stone-topped island.", category: "residence" },
  "dsc-0067": { caption: "The residence and coastline seen from above, bluff to horizon.", category: "coastline" },
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
  "ranch-004",
  "162",
  "201",
  "167",
  "img-0602",
  "ranch-001",
  "img-20150118-173149189",
  "157",
];

export const featuredPhotos = featuredSlugs
  .map((slug) => photos.find((p) => p.slug === slug))
  .filter((p): p is Photo => Boolean(p));

export const heroSlug = "ranch-004";
