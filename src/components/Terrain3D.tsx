"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { SURF_BREAKS, LANDMARKS, PROPERTY } from "@/data/surf";
import { fmt, type Dict } from "@/i18n";
import Image from "next/image";
import { photoUrl } from "@/lib/media";
import { openPhotoTour } from "@/components/PhotoTour";
import { MARINE_COORDS } from "@/lib/conditions";

const MAX_EXAGGERATION = 1.6;
const STOP_PAUSE_MS = 3200;
const LABELS_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";
const DEM_TILES = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";

const STYLE: StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
      tileSize: 256,
      maxzoom: 18,
      attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics",
    },
    terrain: {
      type: "raster-dem",
      tiles: [DEM_TILES],
      tileSize: 256,
      encoding: "terrarium",
      maxzoom: 14,
      attribution: "Terrain data: AWS Terrain Tiles / Mapzen",
    },
    // MapLibre wants a separate DEM source for hillshading
    hillshade: { type: "raster-dem", tiles: [DEM_TILES], tileSize: 256, encoding: "terrarium", maxzoom: 14 },
    labels: { type: "raster", tiles: [LABELS_TILES], tileSize: 256, maxzoom: 16 },
  },
  layers: [
    { id: "satellite", type: "raster", source: "satellite" },
    {
      id: "hillshade",
      type: "hillshade",
      source: "hillshade",
      paint: {
        "hillshade-exaggeration": 0.35,
        "hillshade-shadow-color": "#1d2a33",
        "hillshade-highlight-color": "#fff6e6",
        "hillshade-illumination-direction": 300,
      },
    },
    { id: "labels", type: "raster", source: "labels", layout: { visibility: "none" }, paint: { "raster-opacity": 0.9 } },
  ],
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
  [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5], [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0],
  [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5], [0, 2, 3, 2], [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5],
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// A rough circle for illustrating the property's approximate scale on the
// map — not a surveyed parcel boundary, just sized to roughly match 113 acres.
function circlePolygon(center: [number, number], radiusMeters: number, steps = 64) {
  const [lng, lat] = center;
  const distanceX = radiusMeters / (111320 * Math.cos((lat * Math.PI) / 180));
  const distanceY = radiusMeters / 110540;
  const coords: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    coords.push([lng + distanceX * Math.cos(theta), lat + distanceY * Math.sin(theta)]);
  }
  return { type: "Feature" as const, properties: {}, geometry: { type: "Polygon" as const, coordinates: [coords] } };
}

/** Great-circle distance in miles */
function milesBetween(a: [number, number], b: [number, number]) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[1])) * Math.cos(toRad(b[1])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

type SkyPreset = {
  key: "night" | "dawn" | "day" | "dusk";
  sky: { skyColor: string; horizonColor: string; fogColor: string };
  raster: { brightnessMin: number; brightnessMax: number; saturation: number; contrast: number };
};

// A light, time-of-day-aware sky so the map feels alive rather than
// showing the same midday lighting no matter when you visit the site.
type LightKey = SkyPreset["key"];
const LIGHT_KEYS: LightKey[] = ["dawn", "day", "dusk", "night"];

function hourToLight(hour: number): LightKey {
  if (hour < 5 || hour >= 20) return "night";
  if (hour < 8) return "dawn";
  if (hour < 17) return "day";
  return "dusk";
}

function presetFor(key: LightKey): SkyPreset {
  return getSkyPreset({ night: 2, dawn: 6, day: 12, dusk: 18 }[key]);
}

function getSkyPreset(hour: number): SkyPreset {
  if (hour < 5 || hour >= 20) {
    return { key: "night", sky: { skyColor: "#0d1a2b", horizonColor: "#1c2c3f", fogColor: "#16232f" }, raster: { brightnessMin: 0, brightnessMax: 0.55, saturation: -0.3, contrast: 0.05 } };
  }
  if (hour < 8) {
    return { key: "dawn", sky: { skyColor: "#7ea8c4", horizonColor: "#f2b98a", fogColor: "#f4c9a0" }, raster: { brightnessMin: 0, brightnessMax: 0.85, saturation: -0.05, contrast: 0.05 } };
  }
  if (hour < 17) {
    return { key: "day", sky: { skyColor: "#bcd9ea", horizonColor: "#f8f4ea", fogColor: "#f8f4ea" }, raster: { brightnessMin: 0, brightnessMax: 1, saturation: 0.05, contrast: 0.05 } };
  }
  return { key: "dusk", sky: { skyColor: "#4a5f83", horizonColor: "#e8845f", fogColor: "#e6a077" }, raster: { brightnessMin: 0, brightnessMax: 0.8, saturation: 0.05, contrast: 0.05 } };
}

function applyPreset(map: MapLibreMap, preset: SkyPreset) {
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
}

/** Bearing (degrees from north) of today's sunset, from solar declination; good to about a degree */
function sunsetBearing(lat: number, date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start) / 86400000);
  const decl = (23.44 * Math.PI / 180) * Math.sin((2 * Math.PI / 365) * (day - 81));
  const cosA = Math.sin(decl) / Math.cos((lat * Math.PI) / 180);
  return 360 - (Math.acos(Math.max(-1, Math.min(1, cosA))) * 180) / Math.PI;
}

/** Point a given distance (meters) along a bearing from a start point */
function destination(from: [number, number], bearingDeg: number, meters: number): [number, number] {
  const R = 6371000;
  const b = (bearingDeg * Math.PI) / 180;
  const lat1 = (from[1] * Math.PI) / 180;
  const lng1 = (from[0] * Math.PI) / 180;
  const d = meters / R;
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(b));
  const lng2 = lng1 + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
  return [(lng2 * 180) / Math.PI, (lat2 * 180) / Math.PI];
}

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const COMPASS = {
  en: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
  es: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"],
};
function compass(deg: number, lang: string) {
  const names = lang === "es" ? COMPASS.es : COMPASS.en;
  return names[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16];
}

type Swell = { ft: number; period: number; deg: number };
type Match = "good" | "fair" | "poor";

/** A rough read of whether today's swell suits a break: right direction and enough size */
function swellMatch(swell: Swell, from: [number, number], minFt: number): Match {
  const d = ((swell.deg % 360) + 360) % 360;
  const inSector = d >= from[0] && d <= from[1];
  const near = d >= from[0] - 20 && d <= from[1] + 20;
  if (inSector && swell.ft >= minFt) return "good";
  if ((inSector && swell.ft >= minFt * 0.6) || (near && swell.ft >= minFt)) return "fair";
  return "poor";
}

type Kind = "surf" | "landmark" | "property";
type Stop = {
  name: string;
  note: string;
  swell?: string;
  center: [number, number];
  kind: Kind;
  swellFrom?: [number, number];
  minFt?: number;
};

function buildMarkerEl(stop: Stop, label: string) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `surf-marker${stop.kind === "landmark" ? " landmark-marker" : ""}${stop.kind === "property" ? " property-marker" : ""}`;
  el.setAttribute("aria-label", label);
  const dot =
    stop.kind === "property"
      ? `<span class="property-marker-dot"><img src="/brand/icon-192.png" alt="" width="30" height="30" /><span class="surf-marker-ping"></span></span>`
      : `<span class="surf-marker-dot"><span class="surf-marker-ping"></span></span>`;
  const labelEl = document.createElement("span");
  labelEl.className = `surf-marker-label${stop.kind === "property" ? " property-marker-label" : ""}`;
  labelEl.textContent = stop.name;
  el.innerHTML = dot;
  el.appendChild(labelEl);
  return el;
}

export default function Terrain3D({ t, lang }: { t: Dict["terrain"]; lang: string }) {
  // West (Point Conception) to east (Gaviota), with the ranch where it sits on the coast
  const stops = useMemo<Stop[]>(() => {
    const lm = (i: number): Stop => ({
      name: t.landmarks[i]?.name ?? LANDMARKS[i].name,
      note: t.landmarks[i]?.note ?? LANDMARKS[i].note,
      center: LANDMARKS[i].center,
      kind: "landmark",
    });
    const breaks: Stop[] = SURF_BREAKS.map((b, i) => ({
      name: b.name,
      note: t.breaks[i]?.note ?? b.note,
      swell: t.breaks[i]?.swell ?? b.swell,
      center: b.center,
      kind: "surf",
      swellFrom: b.swellFrom,
      minFt: b.minFt,
    }));
    const property: Stop = { name: PROPERTY.name, note: t.propertyNote, center: PROPERTY.center, kind: "property" };
    return [lm(0), ...breaks, property, lm(1)];
  }, [t]);
  const propertyIndex = stops.findIndex((s) => s.kind === "property");

  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<HTMLElement[]>([]);
  const stopsRef = useRef(stops);
  const tourTimerRef = useRef<number | null>(null);
  const touringRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const dashFrameRef = useRef<number | null>(null);

  const [ready, setReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touring, setTouring] = useState(false);
  const [labels, setLabels] = useState(false);
  const [relief, setRelief] = useState(true);
  const [skyLabel, setSkyLabel] = useState<string | null>(null);
  const [light, setLight] = useState<LightKey | "live">("live");
  const [swell, setSwell] = useState<Swell | null>(null);
  const [sunLine, setSunLine] = useState(true);
  const [copied, setCopied] = useState(false);
  const sunBearing = useMemo(() => sunsetBearing(PROPERTY.center[1]), []);

  // Live swell for the surf cards (Open-Meteo marine data, same source as the conditions panel)
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${MARINE_COORDS.lat}&longitude=${MARINE_COORDS.lng}&current=swell_wave_height,swell_wave_period,swell_wave_direction&length_unit=imperial`,
      { signal: ctrl.signal }
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const c = d?.current;
        if (c && typeof c.swell_wave_height === "number") {
          setSwell({ ft: Math.round(c.swell_wave_height * 10) / 10, period: Math.round(c.swell_wave_period), deg: c.swell_wave_direction });
        }
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const clearTourTimer = () => {
    if (tourTimerRef.current !== null) window.clearTimeout(tourTimerRef.current);
    tourTimerRef.current = null;
  };

  const stopTour = useCallback(() => {
    touringRef.current = false;
    setTouring(false);
    clearTourTimer();
  }, []);

  const goTo = useCallback((index: number, opts: { fromTour?: boolean } = {}) => {
    const map = mapRef.current;
    if (!map) return;
    if (!opts.fromTour) stopTour();
    const stop = stopsRef.current[index];
    setActiveIndex(index);
    const target = {
      center: stop.center,
      zoom: stop.kind === "property" ? 14.8 : 14.2,
      pitch: 70,
      bearing: stop.kind === "property" ? -25 : -15 + index * 2,
    };
    if (reducedMotionRef.current) map.jumpTo(target);
    else map.flyTo({ ...target, duration: opts.fromTour ? 3200 : 2400, essential: true });
  }, [stopTour]);

  const startTour = useCallback((from = 0) => {
    const map = mapRef.current;
    if (!map) return;
    touringRef.current = true;
    setTouring(true);
    clearTourTimer();
    // Fly to a stop, pause there, then move on; any user action clears touringRef and ends it
    const step = (index: number) => {
      if (!touringRef.current) return;
      goTo(index, { fromTour: true });
      const onArrive = () => {
        map.off("moveend", onArrive);
        if (!touringRef.current) return;
        tourTimerRef.current = window.setTimeout(() => {
          if (index + 1 < stopsRef.current.length) step(index + 1);
          else stopTour();
        }, STOP_PAUSE_MS);
      };
      map.on("moveend", onArrive);
    };
    step(from);
  }, [goTo, stopTour]);

  // One-time map setup
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tt = t;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE,
      center: stopsRef.current[0].center,
      zoom: 12.2,
      pitch: 68,
      bearing: 15,
      maxPitch: 85,
      attributionControl: { compact: true },
      // Page scrolling stays page scrolling: the map needs Ctrl/⌘ + scroll or two fingers
      cooperativeGestures: true,
      locale: {
        "CooperativeGesturesHandler.WindowsHelpText": tt.gestureDesktop,
        "CooperativeGesturesHandler.MacHelpText": tt.gestureMac,
        "CooperativeGesturesHandler.MobileHelpText": tt.gestureMobile,
      },
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    map.addControl(new maplibregl.FullscreenControl(), "top-right");
    map.addControl(new maplibregl.ScaleControl({ unit: lang === "en" ? "imperial" : "metric", maxWidth: 90 }), "bottom-right");
    map.on("error", (e) => console.error("Terrain3D map error:", e.error?.message ?? e));

    // Any hands-on interaction ends the guided tour
    const userInterrupt = (e: { originalEvent?: unknown }) => {
      if (e.originalEvent && touringRef.current) stopTour();
    };
    map.on("dragstart", userInterrupt);
    map.on("rotatestart", userInterrupt);
    map.on("pitchstart", userInterrupt);
    map.on("zoomstart", userInterrupt);

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
        const k = Math.min(1, (ts - start) / duration);
        map.setTerrain({ source: "terrain", exaggeration: easeOutCubic(k) * MAX_EXAGGERATION });
        if (k < 1) requestAnimationFrame(step);
        else onDone();
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
      setSkyLabel(tt.sky[preset.key]);
      applyPreset(map, preset);

      map.addSource("coastal-route", {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: SURF_BREAKS.map((b) => b.center) } },
      });
      map.addLayer({
        id: "coastal-route-glow",
        type: "line",
        source: "coastal-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#e9b768", "line-width": 9, "line-opacity": 0.18, "line-blur": 6 },
      });
      map.addLayer({
        id: "coastal-route-line",
        type: "line",
        source: "coastal-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#f8f4ea", "line-width": 2.5, "line-opacity": 0.8, "line-dasharray": [0, 4, 3] },
      });

      // ~113 acres, circular approximation — illustrates scale, not a surveyed boundary.
      map.addSource("property-area", { type: "geojson", data: circlePolygon(PROPERTY.center, 381) });
      // Today's sunset direction from the house, out across the Channel
      const bearing = sunsetBearing(PROPERTY.center[1]);
      map.addSource("sunset-line", {
        type: "geojson",
        lineMetrics: true,
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: [PROPERTY.center, destination(PROPERTY.center, bearing, 2500), destination(PROPERTY.center, bearing, 9000)] },
        },
      });
      map.addLayer({
        id: "sunset-line-glow",
        type: "line",
        source: "sunset-line",
        layout: { "line-cap": "round" },
        paint: { "line-color": "#f2a65a", "line-width": 12, "line-opacity": 0.25, "line-blur": 8 },
      });
      map.addLayer({
        id: "sunset-line",
        type: "line",
        source: "sunset-line",
        layout: { "line-cap": "round" },
        paint: {
          "line-width": 3.5,
          "line-gradient": ["interpolate", ["linear"], ["line-progress"], 0, "#ffd9a0", 0.6, "#f2a65a", 1, "rgba(232,132,95,0)"],
        },
      });

      map.addLayer({ id: "property-area-fill", type: "fill", source: "property-area", paint: { "fill-color": "#c1943a", "fill-opacity": 0.16 } });
      map.addLayer({
        id: "property-area-line",
        type: "line",
        source: "property-area",
        paint: { "line-color": "#e9b768", "line-width": 2, "line-opacity": 0.85, "line-dasharray": [2, 2] },
      });

      markersRef.current = stopsRef.current.map((stop, i) => {
        const el = buildMarkerEl(stop, fmt(tt.flyTo, { name: stop.name }));
        el.addEventListener("click", () => goTo(i));
        new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(stop.center).addTo(map);
        return el;
      });

      animateRouteLine();
      // A shared link (?stop=razor-blades) opens straight on that stop
      const shared = new URLSearchParams(window.location.search).get("stop");
      const sharedIndex = shared ? stopsRef.current.findIndex((st) => slugify(st.name) === shared) : -1;
      riseTerrain(() => {
        if (sharedIndex >= 0) goTo(sharedIndex);
        else if (reducedMotionRef.current) goTo(propertyIndex);
        else startTour(0);
      });
    });

    return () => {
      clearTourTimer();
      if (dashFrameRef.current !== null) cancelAnimationFrame(dashFrameRef.current);
      map.remove();
      mapRef.current = null;
    };
    // One-time setup: later language/copy changes reuse the same map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Highlight the active marker and keep its chip in view
  useEffect(() => {
    markersRef.current.forEach((el, i) => el.classList.toggle("is-active", i === activeIndex));
    if (activeIndex === null || !stripRef.current) return;
    const chip = stripRef.current.querySelector<HTMLElement>(`[data-stop="${activeIndex}"]`);
    if (chip) stripRef.current.scrollTo({ left: chip.offsetLeft - stripRef.current.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [activeIndex]);

  const changeLight = (key: LightKey | "live") => {
    setLight(key);
    const map = mapRef.current;
    if (!map) return;
    applyPreset(map, presetFor(key === "live" ? hourToLight(new Date().getHours()) : key));
  };

  const toggleSunLine = () => {
    const next = !sunLine;
    setSunLine(next);
    const map = mapRef.current;
    if (!map) return;
    for (const id of ["sunset-line", "sunset-line-glow"]) map.setLayoutProperty(id, "visibility", next ? "visible" : "none");
  };

  const shareStop = async (stop: Stop) => {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("stop", slugify(stop.name));
    url.hash = "coast-map";
    const link = url.toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: `${stop.name} · Rancho Alegria`, url: link });
        return;
      }
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* share sheet dismissed */
    }
  };

  // Arrow keys step through the stops while the map area has focus
  const onMapKey = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest(".maplibregl-canvas-container")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const cur = activeIndex ?? -1;
      goTo(Math.max(0, Math.min(stops.length - 1, cur + (e.key === "ArrowRight" ? 1 : -1))));
    }
  };

  const toggleLabels = () => {
    const next = !labels;
    setLabels(next);
    mapRef.current?.setLayoutProperty("labels", "visibility", next ? "visible" : "none");
  };

  const toggleRelief = () => {
    const next = !relief;
    setRelief(next);
    const map = mapRef.current;
    if (!map) return;
    stopTour();
    map.setTerrain({ source: "terrain", exaggeration: next ? MAX_EXAGGERATION : 0 });
    map.easeTo({ pitch: next ? 65 : 0, duration: 900 });
  };

  const active = activeIndex !== null ? stops[activeIndex] : null;
  const distanceLine =
    active && active.kind !== "property"
      ? fmt(t.distanceFrom, {
          miles: milesBetween(active.center, PROPERTY.center).toFixed(1),
          dir: active.center[0] < PROPERTY.center[0] ? t.west : t.east,
        })
      : null;

  const ctrl = "rounded-full bg-ink/80 px-3.5 py-2 text-xs font-semibold text-sand shadow-lg backdrop-blur transition-colors hover:bg-ink disabled:opacity-50";

  return (
    <div onKeyDown={onMapKey}>
      {copied && <p className="sr-only" role="status">{t.copied}</p>}
      <div className="relative overflow-hidden rounded-2xl border border-cream-line shadow-lg">
        <div ref={containerRef} className="h-[520px] w-full sm:h-[640px]" />

        {!ready && (
          <div className="skeleton-shimmer absolute inset-0 flex items-center justify-center bg-sand-deep text-sm text-ink/50">
            {t.loading}
          </div>
        )}

        {/* Layer toggles */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <button type="button" aria-pressed={relief} onClick={toggleRelief} disabled={!ready} className={`${ctrl} ${relief ? "ring-1 ring-gold/70" : ""}`}>
            {t.relief}
          </button>
          <button type="button" aria-pressed={labels} onClick={toggleLabels} disabled={!ready} className={`${ctrl} ${labels ? "ring-1 ring-gold/70" : ""}`}>
            {t.labels}
          </button>
          <button type="button" aria-pressed={sunLine} onClick={toggleSunLine} disabled={!ready} className={`${ctrl} ${sunLine ? "ring-1 ring-gold/70" : ""}`}>
            {t.sunLine}
          </button>
          <div className="flex rounded-full bg-ink/80 p-0.5 shadow-lg backdrop-blur" role="group" aria-label={t.light}>
            {(["live", ...LIGHT_KEYS] as const).map((k) => (
              <button
                key={k}
                type="button"
                disabled={!ready}
                aria-pressed={light === k}
                onClick={() => changeLight(k)}
                className={`rounded-full px-2.5 py-1.5 text-[0.7rem] font-semibold transition-colors ${light === k ? "bg-sand text-ink" : "text-sand/80 hover:text-sand"}`}
              >
                {k === "live" ? t.lightLive : t.sky[k]}
              </button>
            ))}
          </div>
          {swell && (
            <span className="flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[0.7rem] font-semibold text-sand shadow-lg backdrop-blur">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ transform: `rotate(${swell.deg + 180}deg)` }} aria-hidden="true">
                <path d="M12 20V4M6 10l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t.liveSwell}: {swell.ft} ft {compass(swell.deg, lang)} · {swell.period}s
            </span>
          )}
        </div>

        {/* Stop card */}
        {active && (
          <div
            key={activeIndex}
            className="animate-fade-in absolute inset-x-3 bottom-16 max-h-[62%] overflow-y-auto rounded-xl bg-ink/85 p-4 text-sand shadow-xl backdrop-blur sm:inset-x-auto sm:bottom-20 sm:left-4 sm:w-[24rem]"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  {t.kinds[active.kind]} · {fmt(t.stopOf, { n: String((activeIndex ?? 0) + 1), total: String(stops.length) })}
                </p>
                <p className="mt-1 font-serif text-xl font-bold leading-tight">{active.name}</p>
              </div>
              <button
                type="button"
                aria-label={t.share}
                onClick={() => shareStop(active)}
                className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-sand/60 hover:bg-sand/10 hover:text-sand"
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12M7 8l5-5 5 5M5 14v5h14v-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </button>
              <button type="button" aria-label={t.close} onClick={() => setActiveIndex(null)} className="-mr-1 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-sand/60 hover:bg-sand/10 hover:text-sand">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
              </button>
            </div>
            {active.swell && (
              <p className="mt-2 inline-block rounded-full bg-terracotta/90 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide">{active.swell}</p>
            )}
            <p className="mt-2 text-xs leading-relaxed text-sand/85 sm:text-sm">{active.note}</p>
            {distanceLine && <p className="mt-2 text-xs font-medium text-gold/90">{distanceLine}</p>}
            {active.kind === "surf" && active.swellFrom && active.minFt !== undefined && (
              <div className="mt-3 rounded-lg bg-sand/10 p-2.5">
                <p className="text-[0.7rem] text-sand/75">
                  {fmt(t.swellWants, { dir: compass((active.swellFrom[0] + active.swellFrom[1]) / 2, lang), ft: String(active.minFt) })}
                </p>
                {swell && (() => {
                  const m = swellMatch(swell, active.swellFrom, active.minFt);
                  const tone = m === "good" ? "bg-emerald-500/90" : m === "fair" ? "bg-amber-500/90" : "bg-sand/25";
                  return (
                    <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.7rem] text-sand/85">
                      <span className="font-semibold">{t.swellMatch}:</span>
                      <span className={`rounded-full px-2 py-0.5 font-bold text-ink ${tone}`}>
                        {m === "good" ? t.matchGood : m === "fair" ? t.matchFair : t.matchPoor}
                      </span>
                      <span className="text-sand/60">{swell.ft} ft {compass(swell.deg, lang)} · {swell.period}s</span>
                    </p>
                  );
                })()}
                <p className="mt-1 text-[0.6rem] text-sand/45">{t.swellNote}</p>
              </div>
            )}
            {active.kind === "property" && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gold/90">
                <span className="inline-block h-1.5 w-4 rounded-full bg-gradient-to-r from-[#ffd9a0] to-[#e8845f]" aria-hidden="true" />
                {fmt(t.sunsetBearing, { deg: String(Math.round(sunBearing)), dir: compass(sunBearing, lang) })}
              </p>
            )}
            {active.kind === "property" && (
              <div className="mt-3 flex items-center gap-3">
                <button type="button" onClick={() => openPhotoTour("hc-front-a")} className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-sand/30">
                  <Image src={photoUrl("hc-front-a", "thumb")} alt="" fill sizes="80px" quality={60} className="object-cover" />
                </button>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => openPhotoTour("hc-front-a")} className="rounded-full bg-sand/15 px-3 py-1.5 text-[0.7rem] font-semibold hover:bg-sand/25">
                    {t.photos}
                  </button>
                  <a href="#video" className="rounded-full bg-terracotta px-3 py-1.5 text-[0.7rem] font-semibold hover:bg-terracotta-deep">
                    {t.film}
                  </a>
                </div>
              </div>
            )}
            <div className="mt-3 flex items-center gap-2">
              <button type="button" onClick={() => goTo(Math.max(0, (activeIndex ?? 0) - 1))} disabled={activeIndex === 0} aria-label={t.prev} className="grid h-8 w-8 place-items-center rounded-full bg-sand/10 hover:bg-sand/20 disabled:opacity-30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" onClick={() => goTo(Math.min(stops.length - 1, (activeIndex ?? 0) + 1))} disabled={activeIndex === stops.length - 1} aria-label={t.next} className="grid h-8 w-8 place-items-center rounded-full bg-sand/10 hover:bg-sand/20 disabled:opacity-30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {touring && <span className="ml-1 text-[0.7rem] text-sand/60">{t.touring}</span>}
            </div>
          </div>
        )}

        {/* Tour controls */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => (touring ? stopTour() : startTour(activeIndex !== null && activeIndex < stops.length - 1 ? activeIndex : 0))}
            disabled={!ready}
            className={`${ctrl} flex items-center gap-1.5 bg-terracotta/95 hover:bg-terracotta-deep`}
          >
            {touring ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
            )}
            {touring ? t.tourPause : t.tourPlay}
          </button>
          <button type="button" onClick={() => goTo(propertyIndex)} disabled={!ready} className={`${ctrl} border border-gold/60 text-gold`}>
            {t.viewProperty}
          </button>
        </div>
      </div>

      {/* Every stop, west to east */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink/50">{t.stopsTitle}</p>
        <div ref={stripRef} className="relative flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {stops.map((s, i) => (
            <button
              key={s.name}
              type="button"
              data-stop={i}
              onClick={() => goTo(i)}
              disabled={!ready}
              aria-pressed={activeIndex === i}
              className={`flex flex-shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
                activeIndex === i
                  ? "border-terracotta bg-terracotta text-sand"
                  : "border-cream-line bg-sand-deep/40 text-ink/80 hover:border-terracotta/60"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${s.kind === "property" ? "bg-gold" : s.kind === "surf" ? "bg-terracotta" : "bg-ocean"} ${activeIndex === i ? "ring-2 ring-sand" : ""}`}
                aria-hidden="true"
              />
              {s.name}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs text-ink/50">
          {t.hint}
          {skyLabel && <> &middot; {t.liveSky}: {skyLabel}</>}
        </p>
      </div>
    </div>
  );
}
