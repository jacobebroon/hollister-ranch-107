// Marker positions (% of the aerial photo) for features clearly visible in it, in the same
// order as t.spots, plus the gallery photos that show each one up close.
export const SPOTS = [
  { x: 14, y: 40, slugs: ["dsc-0050", "dsc-0052", "162", "img-0605", "dsc-0078"] },
  { x: 31, y: 59, slugs: ["dsc-0074", "ranch-005"] },
  { x: 87, y: 66, slugs: ["ranch-023", "ranch-024"] },
  { x: 68, y: 55, slugs: ["dsc-0067"] },
  { x: 62, y: 33, slugs: ["img-20150118-173149189", "img-0991", "img-20150215-124719191"] },
];

// Same order as t.amenities; a slug makes the chip open that photo in the tour
export const AMENITY_SLUGS: Array<string | null> = ["dsc-0067", null, "ranch-027", "1000003478", "img-0602", "ranch-009"];

/** Every photo the guide can show, so the page only sends those to the browser. */
export const ESTATE_SLUGS = new Set(SPOTS.flatMap((s) => s.slugs));

