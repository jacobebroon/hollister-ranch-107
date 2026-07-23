const WEATHER_COORDS = { lat: 34.47, lng: -120.23 };
const MARINE_COORDS = { lat: 34.47, lng: -120.23 };
const TIDE_STATION = "9411399"; // Gaviota State Park, Pacific Ocean

const REVALIDATE_SECONDS = 1800;

export type Conditions = {
  weather: {
    tempF: number;
    label: string;
    windMph: number;
    windCompass: string;
    isDay: boolean;
  } | null;
  surf: {
    waveHeightFt: number;
    swellHeightFt: number;
    swellPeriodS: number;
    swellCompass: string;
  } | null;
  sun: {
    sunrise: string;
    sunset: string;
  } | null;
  tides: Array<{ time: string; type: "H" | "L"; heightFt: number }> | null;
  moon: {
    phaseName: string;
    illuminationPct: number;
  };
};

const COMPASS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

function degToCompass(deg: number): string {
  return COMPASS[Math.round(deg / 22.5) % 16];
}

const WEATHER_LABELS: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function getMoonPhase(date: Date): { phaseName: string; illuminationPct: number } {
  // Days since a known new moon (2000-01-06 18:14 UTC), divided by the synodic month.
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const synodicMonth = 29.530588853;
  const daysSince = (date.getTime() - knownNewMoon) / 86400000;
  const age = daysSince % synodicMonth;
  const phase = age / synodicMonth;
  const illuminationPct = Math.round((1 - Math.cos(phase * 2 * Math.PI)) * 50);

  let phaseName: string;
  if (phase < 0.03 || phase > 0.97) phaseName = "New Moon";
  else if (phase < 0.22) phaseName = "Waxing Crescent";
  else if (phase < 0.28) phaseName = "First Quarter";
  else if (phase < 0.47) phaseName = "Waxing Gibbous";
  else if (phase < 0.53) phaseName = "Full Moon";
  else if (phase < 0.72) phaseName = "Waning Gibbous";
  else if (phase < 0.78) phaseName = "Last Quarter";
  else phaseName = "Waning Crescent";

  return { phaseName, illuminationPct };
}

export async function getConditions(): Promise<Conditions> {
  const [weatherRes, marineRes, tideRes] = await Promise.allSettled([
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_COORDS.lat}&longitude=${WEATHER_COORDS.lng}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day&daily=sunrise,sunset&timezone=America%2FLos_Angeles&temperature_unit=fahrenheit&wind_speed_unit=mph`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    ),
    fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${MARINE_COORDS.lat}&longitude=${MARINE_COORDS.lng}&current=wave_height,swell_wave_height,swell_wave_period,swell_wave_direction&timezone=America%2FLos_Angeles&length_unit=imperial`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    ),
    fetch(
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?station=${TIDE_STATION}&product=predictions&datum=MLLW&time_zone=lst_ldt&units=english&interval=hilo&format=json&date=today`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    ),
  ]);

  let weather: Conditions["weather"] = null;
  let sun: Conditions["sun"] = null;
  if (weatherRes.status === "fulfilled" && weatherRes.value.ok) {
    const data = await weatherRes.value.json();
    weather = {
      tempF: Math.round(data.current.temperature_2m),
      label: WEATHER_LABELS[data.current.weather_code] ?? "—",
      windMph: Math.round(data.current.wind_speed_10m),
      windCompass: degToCompass(data.current.wind_direction_10m),
      isDay: data.current.is_day === 1,
    };
    sun = {
      sunrise: formatTime(data.daily.sunrise[0]),
      sunset: formatTime(data.daily.sunset[0]),
    };
  }

  let surf: Conditions["surf"] = null;
  if (marineRes.status === "fulfilled" && marineRes.value.ok) {
    const data = await marineRes.value.json();
    if (data.current?.wave_height != null) {
      surf = {
        waveHeightFt: Math.round(data.current.wave_height * 10) / 10,
        swellHeightFt: Math.round(data.current.swell_wave_height * 10) / 10,
        swellPeriodS: Math.round(data.current.swell_wave_period),
        swellCompass: degToCompass(data.current.swell_wave_direction),
      };
    }
  }

  let tides: Conditions["tides"] = null;
  if (tideRes.status === "fulfilled" && tideRes.value.ok) {
    const data = await tideRes.value.json();
    if (Array.isArray(data.predictions)) {
      tides = data.predictions.map((p: { t: string; v: string; type: "H" | "L" }) => ({
        time: formatTime(p.t.replace(" ", "T")),
        type: p.type,
        heightFt: Math.round(parseFloat(p.v) * 10) / 10,
      }));
    }
  }

  return { weather, surf, sun, tides, moon: getMoonPhase(new Date()) };
}
