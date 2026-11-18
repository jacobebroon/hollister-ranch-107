// Photos shown in the "Family Photos & Memories" section, one list per group
// (same order as t.memories.groups). All come from the photos Harold Clavin shared.
export const MEMORY_GROUPS: string[][] = [
  ["hc-1917", "hc-family-beach", "hc-low-tide", "hc-1908", "hc-4876", "hc-1907"],
  ["hc-sunset-gathering", "hc-5251", "hc-4942", "hc-4943", "hc-2999", "hc-3014"],
  ["hc-jeanette-garden", "hc-968", "hc-967", "hc-1395", "hc-1385", "hc-5296"],
  ["hc-bobcat-patio", "hc-bobcat-drive", "hc-quail", "hc-5298"],
];

export const MEMORY_SLUGS = new Set(MEMORY_GROUPS.flat());
