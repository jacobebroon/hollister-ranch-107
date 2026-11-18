"use client";

import dynamic from "next/dynamic";

// MapLibre is ~1MB of JS; load it only when the map is about to scroll into view
const Terrain3DLazy = dynamic(() => import("@/components/Terrain3D"), {
  ssr: false,
  loading: () => (
    <div className="skeleton-shimmer h-[520px] w-full rounded-2xl border border-cream-line bg-sand-deep sm:h-[640px]" />
  ),
});

export default Terrain3DLazy;
