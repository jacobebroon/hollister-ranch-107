"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { SURF_BREAKS, LANDMARKS } from "@/data/surf";

// Point Conception, the western edge of Hollister Ranch
const START = { center: [-120.4713, 34.4486] as [number, number], zoom: 12.2 };
// Gaviota, the eastern edge of the ranch
const END = { center: [-120.2288, 34.4717] as [number, number], zoom: 12.2 };

const MAX_EXAGGERATION = 1.6;

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
  terrain: { source: "terrain", exaggeration: 0 },
  sky: {
    "sky-color": "#bcd9ea",
    "horizon-color": "#f8f4ea",
    "fog-color": "#f8f4ea",
    "fog-ground-blend": 0.5,
  },
};

// The dash-cycle used to animate a "flowing" line along the coast route,
// adapted from the standard MapLibre/Mapbox animated-line pattern.
const DASH_SEQUENCE: number[][] = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
  [0, 0.5, 3, 3.5],
  [0, 1, 3, 3],
  [0, 1.5, 3, 2.5],
  [0, 2, 3, 2],
  [0, 2.5, 3, 1.5],
  [0, 3, 3, 1],
  [0, 3.5, 3, 0.5],
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type SkyPreset = {
  label: string;
  sky: { skyColor: string; horizonColor: string; fogColor: string };
  raster: { brightnessMin: number; brightnessMax: number; saturation: number; contrast: number };
};

// A light, time-of-day-aware sky so the map feels alive rather than
// showing the same midday lighting no matter when you visit the site.
function getSkyPreset(hour: number): SkyPreset {
  if (hour < 5 || hour >= 20) {
    return {
      label: "Night",
      sky: { skyColor: "#0d1a2b", horizonColor: "#1c2c3f", fogColor: "#16232f" },
      raster: { brightnessMin: 0, brightnessMax: 0.55, saturation: -0.3, contrast: 0.05 },
    };
  }
  if (hour < 8) {
    return {
      label: "Dawn",
      sky: { skyColor: "#7ea8c4", horizonColor: "#f2b98a", fogColor: "#f4c9a0" },
      raster: { brightnessMin: 0, brightnessMax: 0.85, saturation: -0.05, contrast: 0.05 },
    };
  }
  if (hour < 17) {
    return {
      label: "Day",
      sky: { skyColor: "#bcd9ea", horizonColor: "#f8f4ea", fogColor: "#f8f4ea" },
      raster: { brightnessMin: 0, brightnessMax: 1, saturation: 0, contrast: 0 },
    };
  }
  return {
    label: "Dusk",
    sky: { skyColor: "#4a5f83", horizonColor: "#e8845f", fogColor: "#e6a077" },
    raster: { brightnessMin: 0, brightnessMax: 0.8, saturation: 0.05, contrast: 0.05 },
  };
}

function buildMarkerEl(name: string, kind: "surf" | "landmark") {
  const el = document.createElement("button");
  el.type = "button";
  el.className = kind === "surf" ? "surf-marker" : "surf-marker landmark-marker";
  el.setAttribute("aria-label", `Fly to ${name}`);
  el.innerHTML = `
    <span class="surf-marker-dot"><span class="surf-marker-ping"></span></span>
    <span class="surf-marker-label">${name}</span>
  `;
  return el;
}

type ActiveInfo = { name: string; note: string; swell?: string } | null;

export default function Terrain3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);
  const [flying, setFlying] = useState(true);
  const [active, setActive] = useState<ActiveInfo>(null);
  const [skyLabel, setSkyLabel] = useState<string | null>(null);
  const reducedMotionRef = useRef(false);
  const dashFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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

    const flyToSpot = (center: [number, number]) => {
      setFlying(false);
      const target = { center, zoom: 14.8, pitch: 72, bearing: -20 };
      if (reducedMotionRef.current) {
        map.jumpTo(target);
      } else {
        map.flyTo({ ...target, duration: 2600 });
      }
    };

    const riseTerrain = (onDone: () => void) => {
      if (reducedMotionRef.current) {
        map.setTerrain({ source: "terrain", exaggeration: MAX_EXAGGERATION });
        onDone();
        return;
      }
      const duration = 2200;
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const t = Math.min(1, (ts - start) / duration);
        map.setTerrain({ source: "terrain", exaggeration: easeOutCubic(t) * MAX_EXAGGERATION });
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          onDone();
        }
      };
      requestAnimationFrame(step);
    };

    const animateRouteLine = () => {
      if (reducedMotionRef.current) return;
      let step = 0;
      const tick = (ts: number) => {
        const next = Math.floor((ts / 90) % DASH_SEQUENCE.length);
        if (next !== step && map.getLayer("coastal-route-line")) {
          map.setPaintProperty("coastal-route-line", "line-dasharray", DASH_SEQUENCE[next]);
          step = next;
        }
        dashFrameRef.current = requestAnimationFrame(tick);
      };
      dashFrameRef.current = requestAnimationFrame(tick);
    };

    map.on("load", () => {
      setReady(true);

      const preset = getSkyPreset(new Date().getHours());
      setSkyLabel(preset.label);
      map.setSky({
        "sky-color": preset.sky.skyColor,
        "horizon-color": preset.sky.horizonColor,
        "fog-color": preset.sky.fogColor,
        "fog-ground-blend": 0.5,
      });
      map.setPaintProperty("satellite", "raster-brightness-min", preset.raster.brightnessMin);
      map.setPaintProperty("satellite", "raster-brightness-max", preset.raster.brightnessMax);
      map.setPaintProperty("satellite", "raster-saturation", preset.raster.saturation);
      map.setPaintProperty("satellite", "raster-contrast", preset.raster.contrast);

      map.addSource("coastal-route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: SURF_BREAKS.map((b) => b.center),
          },
        },
      });
      map.addLayer({
        id: "coastal-route-line",
        type: "line",
        source: "coastal-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#f8f4ea",
          "line-width": 2.5,
          "line-opacity": 0.75,
          "line-dasharray": [0, 4, 3],
        },
      });

      for (const spot of SURF_BREAKS) {
        const el = buildMarkerEl(spot.name, "surf");
        el.addEventListener("click", () => {
          setActive({ name: spot.name, note: spot.note, swell: spot.swell });
          flyToSpot(spot.center);
        });
        new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(spot.center)
          .addTo(map);
      }

      for (const landmark of LANDMARKS) {
        const el = buildMarkerEl(landmark.name, "landmark");
        el.addEventListener("click", () => {
          setActive({ name: landmark.name, note: landmark.note });
          flyToSpot(landmark.center);
        });
        new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(landmark.center)
          .addTo(map);
      }

      animateRouteLine();
      riseTerrain(() => runFlythrough(map));
    });

    return () => {
      if (dashFrameRef.current !== null) cancelAnimationFrame(dashFrameRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  function runFlythrough(map: MapLibreMap) {
    setActive(null);
    map.jumpTo({ center: START.center, zoom: START.zoom, pitch: 68, bearing: 15 });

    if (reducedMotionRef.current) {
      map.jumpTo({ center: END.center, zoom: END.zoom, pitch: 60, bearing: -15 });
      setFlying(false);
      return;
    }

    setFlying(true);
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

      {active && (
        <div className="absolute left-4 right-4 top-4 max-w-sm rounded-xl bg-ink/85 px-4 py-3 text-sand shadow-lg backdrop-blur sm:right-auto">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">{active.name}</p>
            {active.swell && (
              <p className="whitespace-nowrap rounded-full bg-terracotta/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide">
                {active.swell}
              </p>
            )}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-sand/80">{active.note}</p>
        </div>
      )}

      <div className="absolute bottom-4 right-4 hidden max-w-[45%] rounded-lg bg-ink/70 px-3 py-1.5 text-xs text-sand/90 backdrop-blur sm:block">
        Drag to rotate &middot; Click a marker for details
        {skyLabel && <> &middot; Live sky: {skyLabel}</>}
      </div>
    </div>
  );
}
