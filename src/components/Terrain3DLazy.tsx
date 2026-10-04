"use client";

import dynamic from "next/dynamic";

// MapLibre is ~1MB of JS; load it only when the map is about to scroll into view
const Terrain3DLazy = dynamic(() => import("@/components/Terrain3D"), {
  ssr: false,
  loading: () => (
    <div className="skeleton-shimmer flex h-[480px] w-full items-center justify-center rounded-2xl border border-cream-line bg-sand-deep sm:h-[620px]">
      <p className="text-sm text-ink/40">Loading terrain&hellip;</p>
    </div>
  ),
});

export default Terrain3DLazy;
