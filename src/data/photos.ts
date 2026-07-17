import manifest from "./photos-manifest.json";

export type Photo = {
  slug: string;
  width: number;
  height: number;
  caption?: string;
  category: "residence" | "grounds" | "coastline" | "sky";
};

const CAPTIONS: Record<string, { caption: string; category: Photo["category"] }> = {
  "162": { caption: "The great room window seat, framing an unbroken line of Pacific horizon.", category: "residence" },
  "201": { caption: "Rancho Alegria at dusk, tucked into the Santa Rosa Hills above the water.", category: "residence" },
  "157": { caption: "The entry hall, hand-forged iron and reclaimed wood beneath a wrought-iron chandelier.", category: "residence" },
  "167": { caption: "The primary bath's clawfoot tub, positioned for an ocean view from the water.", category: "residence" },
  "img-0602": { caption: "First light on the rose garden, ocean beyond.", category: "grounds" },
  "img-0599": { caption: "Sunrise through the window seat, roses in bloom.", category: "residence" },
  "img-20150118-173149189": { caption: "Sunset over the Santa Barbara Channel from the bluff.", category: "coastline" },
  "img-20150119-123532632": { caption: "Coastal fog rolling over the ranch's oak-studded hills.", category: "sky" },
  "img-20150504-123536790": { caption: "The house framed by mature date palms, hillside behind.", category: "grounds" },
  "ranch-001": { caption: "Blue agave in bloom above the Pacific — Rancho Alegria's garden bluff.", category: "grounds" },
  "ranch-004": { caption: "The residence from above, roofline against open ocean.", category: "residence" },
  "ranch-005": { caption: "An aerial view of the property's terraced approach and motor court.", category: "residence" },
  "ranch-009": { caption: "A stone-walled overlook built for watching the horizon.", category: "grounds" },
  "ranch-020": { caption: "Spring wildflowers carpet the hillside beside the house.", category: "grounds" },
  "dsc-0050": { caption: "The ranch road winding through open grazing land.", category: "coastline" },
};

export const photos: Photo[] = (manifest as Array<{ slug: string; width: number; height: number }>).map(
  (entry) => ({
    slug: entry.slug,
    width: entry.width,
    height: entry.height,
    caption: CAPTIONS[entry.slug]?.caption,
    category: CAPTIONS[entry.slug]?.category ?? "grounds",
  })
);

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
