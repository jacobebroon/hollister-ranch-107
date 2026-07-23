"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Point Conception, the western edge of Hollister Ranch
const START = { center: [-120.4713, 34.4486] as [number, number], zoom: 12.2 };
// Gaviota, the eastern edge of the ranch
const END = { center: [-120.2288, 34.4717] as [number, number], zoom: 12.2 };

// Approximate positions along the coast, west (Point Conception) to east (Gaviota).
// Hollister Ranch does not publish surveyed coordinates for these breaks, so these
// are estimated from their described order and are not exact.
const SURF_SPOTS: Array<{ name: string; center: [number, number] }> = [
  { name: "Government Point", center: [-120.4713, 34.4486] },
  { name: "Cojo", center: [-120.4366, 34.4519] },
  { name: "Perko's", center: [-120.402, 34.4552] },
  { name: "Drake's", center: [-120.3673, 34.4585] },
  { name: "Little Drake's", center: [-120.3328, 34.4618] },
  { name: "Utah", center: [-120.2981, 34.4651] },
  { name: "St. Augustine's", center: [-120.2635, 34.4684] },
  { name: "Razor Blades", center: [-120.2288, 34.4717] },
];

const STYLE: StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 18,
      attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics",
    },
    terrain: {
      type: "raster-dem",
      tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
      tileSize: 256,
      encoding: "terrarium",
      maxzoom: 14,
      attribution: "Terrain data: AWS Terrain Tiles / Mapzen",
    },
  },
  layers: [{ id: "satellite", type: "raster", source: "satellite" }],
  terrain: { source: "terrain", exaggeration: 1.6 },
  sky: {
    "sky-color": "#bcd9ea",
    "horizon-color": "#f8f4ea",
    "fog-color": "#f8f4ea",
    "fog-ground-blend": 0.5,
  },
};

function buildMarkerEl(name: string) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "surf-marker";
  el.setAttribute("aria-label", `Fly to ${name}`);
  el.innerHTML = `
    <span class="surf-marker-dot"></span>
    <span class="surf-marker-label">${name}</span>
  `;
  return el;
}

export default function Terrain3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);
  const [flying, setFlying] = useState(true);
  const [activeSpot, setActiveSpot] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE,
      center: START.center,
      zoom: START.zoom,
      pitch: 68,
      bearing: 15,
      maxPitch: 85,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

    map.on("error", (e) => {
      console.error("Terrain3D map error:", e.error?.message ?? e);
    });

    map.on("load", () => {
      setReady(true);

      for (const spot of SURF_SPOTS) {
        const el = buildMarkerEl(spot.name);
        el.addEventListener("click", () => {
          setActiveSpot(spot.name);
          setFlying(false);
          map.flyTo({
            center: spot.center,
            zoom: 14.8,
            pitch: 72,
            bearing: -20,
            duration: 2600,
          });
        });
        new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(spot.center)
          .addTo(map);
      }

      runFlythrough(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  function runFlythrough(map: MapLibreMap) {
    setFlying(true);
    setActiveSpot(null);
    map.jumpTo({ center: START.center, zoom: START.zoom, pitch: 68, bearing: 15 });
    map.flyTo({
      center: END.center,
      zoom: END.zoom,
      pitch: 60,
      bearing: -15,
      duration: 14000,
      curve: 1.2,
      essential: true,
    });
    const onEnd = () => {
      setFlying(false);
      map.off("moveend", onEnd);
    };
    map.on("moveend", onEnd);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cream-line shadow-lg">
      <div ref={containerRef} className="h-[480px] w-full sm:h-[620px]" />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-sand-deep text-sm text-ink/50">
          Loading terrain&hellip;
        </div>
      )}

      <button
        onClick={() => mapRef.current && runFlythrough(mapRef.current)}
        disabled={flying}
        className="absolute bottom-4 left-4 max-w-[65%] truncate rounded-full bg-ink/80 px-4 py-2.5 text-xs font-semibold text-sand shadow-lg backdrop-blur transition-colors hover:bg-ink disabled:opacity-50 sm:max-w-none sm:px-5 sm:text-sm"
      >
        {flying ? "Flying the coastline…" : "↻ Replay flyover"}
      </button>

      {activeSpot && (
        <div className="absolute left-4 top-4 max-w-[70%] truncate rounded-full bg-terracotta px-4 py-2 text-xs font-semibold text-sand shadow-lg">
          {activeSpot}
        </div>
      )}

      <div className="absolute bottom-4 right-4 hidden max-w-[45%] rounded-lg bg-ink/70 px-3 py-1.5 text-xs text-sand/90 backdrop-blur sm:block">
        Drag to rotate &middot; Click a break to fly there
      </div>
    </div>
  );
}
