export type SurfBreak = {
  name: string;
  swell: string;
  note: string;
  // Hollister Ranch does not publish surveyed coordinates for these breaks, so
  // these are estimated from their described order west (Point Conception) to
  // east (Gaviota) and are not exact.
  center: [number, number];
};

export const SURF_BREAKS: SurfBreak[] = [
  {
    name: "Government Point",
    swell: "Big W swells",
    note: "A long, rocky right point near Point Conception, once reachable by ranch road — now accessible only by boat.",
    center: [-120.4713, 34.4486],
  },
  {
    name: "Cojo",
    swell: "SW summer, big W winter",
    note: "Widely considered the best wave on the ranch's western stretch — a reef and point that holds both big winter swells and summer south swells wrapping around Point Conception, an exposure most of the ranch's more easterly breaks don't share.",
    center: [-120.4366, 34.4519],
  },
  {
    name: "Perko's",
    swell: "S summer swells",
    note: "A cobblestone right point named for founding Surf Club members Bob and John Perko; a reliable summer break that needs a south swell to turn on.",
    center: [-120.402, 34.4552],
  },
  {
    name: "Drake's",
    swell: "Big W swells",
    note: "The ranch's longest right point, holding well-overhead west swells up to double overhead with a long, workable wall.",
    center: [-120.3673, 34.4585],
  },
  {
    name: "Little Drake's",
    swell: "W swells",
    note: "A smaller, more forgiving break named alongside Big Drake's by the Santa Barbara Surf Club.",
    center: [-120.3328, 34.4618],
  },
  {
    name: "Utah",
    swell: "W/NW swells",
    note: "One of the breaks named by the Santa Barbara Surf Club during its decade exploring the coastline.",
    center: [-120.2981, 34.4651],
  },
  {
    name: "St. Augustine's",
    swell: "S summer swells",
    note: "An average wave with both rights and lefts, best on summer south swells.",
    center: [-120.2635, 34.4684],
  },
  {
    name: "Razor Blades",
    swell: "Big W/NW swells",
    note: "Named for the sharp rocks lining the beach; the break closest to the Gaviota launch, needing a big west or northwest swell.",
    center: [-120.2288, 34.4717],
  },
];

export type Landmark = {
  name: string;
  note: string;
  center: [number, number];
};

export const LANDMARKS: Landmark[] = [
  {
    name: "Point Conception Lighthouse",
    note: "Marks the sharp bend where California's coast turns from north–south to east–west — the boundary between the cold-water Central Coast and the warmer Santa Barbara Channel.",
    center: [-120.4713, 34.4498],
  },
  {
    name: "Gaviota State Park",
    note: "The nearest public beach on the mainland side, and the usual launch point for the boat or long paddle needed to reach the ranch's breaks from the water.",
    center: [-120.2265, 34.4735],
  },
];
