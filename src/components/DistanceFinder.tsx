"use client";

import { useState } from "react";
import { IconCompass } from "@/components/icons";

const RANCH = { lat: 34.4717, lng: -120.2288 };

const COMPASS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function bearingCompass(lat1: number, lng1: number, lat2: number, lng2: number) {
  const y = Math.sin(toRad(lng2 - lng1)) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lng2 - lng1));
  const deg = (Math.atan2(y, x) * 180) / Math.PI;
  return COMPASS[Math.round(((deg + 360) % 360) / 22.5) % 16];
}

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "denied" }
  | { status: "error" }
  | { status: "done"; miles: number; compass: string };

export default function DistanceFinder() {
  const [state, setState] = useState<State>({ status: "idle" });

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setState({ status: "error" });
      return;
    }
    setState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const miles = haversineMiles(latitude, longitude, RANCH.lat, RANCH.lng);
        const compass = bearingCompass(latitude, longitude, RANCH.lat, RANCH.lng);
        setState({ status: "done", miles: Math.round(miles), compass });
      },
      (err) => {
        setState(err.code === err.PERMISSION_DENIED ? { status: "denied" } : { status: "error" });
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-cream-line bg-sand-deep/40 px-6 py-5">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
        <IconCompass className="h-5 w-5" />
      </span>

      {state.status === "idle" && (
        <>
          <p className="text-sm text-ink/70">Curious how far you are from the ranch?</p>
          <button
            onClick={locate}
            className="ml-auto rounded-full border border-ocean/30 px-4 py-2 text-sm font-semibold text-ocean transition-colors hover:bg-ocean hover:text-sand"
          >
            Find out
          </button>
        </>
      )}

      {state.status === "loading" && <p className="text-sm text-ink/60">Locating&hellip;</p>}

      {state.status === "done" && (
        <p className="text-sm text-ink/75">
          You&rsquo;re about <span className="font-bold text-ink">{state.miles} miles</span> from
          Rancho Alegria, roughly to the {state.compass} of you &mdash; as the crow flies.
        </p>
      )}

      {state.status === "denied" && (
        <p className="text-sm text-ink/60">
          Location access was declined &mdash; no problem, come back anytime.
        </p>
      )}

      {state.status === "error" && (
        <p className="text-sm text-ink/60">Couldn&rsquo;t determine your location right now.</p>
      )}
    </div>
  );
}
