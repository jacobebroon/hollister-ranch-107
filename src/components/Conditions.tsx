import { getConditions } from "@/lib/conditions";
import { IconWave, IconMoon, IconCompass, IconEye } from "@/components/icons";
import TideCurve from "@/components/TideCurve";
import WeatherIcon from "@/components/WeatherIcon";

export default async function Conditions() {
  const { weather, surf, sun, tides, tideCurve, moon } = await getConditions();
  const nowHour = new Date().getHours();

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-line bg-sand-deep/40 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream-line px-6 py-4">
        <h3 className="font-serif text-lg font-bold text-ink">Right Now at the Ranch</h3>
        <p className="text-xs text-ink/40">Live conditions &middot; updates every 30 min</p>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            {weather ? <WeatherIcon code={weather.code} className="h-5 w-5" /> : <IconEye className="h-4 w-4" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Weather</p>
          {weather ? (
            <>
              <p className="mt-1 font-serif text-2xl font-bold text-ink">{weather.tempF}&deg;F</p>
              <p className="text-sm text-ink/65">{weather.label}</p>
              <p className="text-sm text-ink/65">
                Wind {weather.windMph} mph {weather.windCompass}
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-ink/40">Unavailable right now</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconWave className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Surf</p>
          {surf ? (
            <>
              <p className="mt-1 font-serif text-2xl font-bold text-ink">{surf.waveHeightFt} ft</p>
              <p className="text-sm text-ink/65">
                {surf.swellHeightFt} ft swell &middot; {surf.swellPeriodS}s
              </p>
              <p className="text-sm text-ink/65">From the {surf.swellCompass}</p>
            </>
          ) : (
            <p className="mt-1 text-sm text-ink/40">Unavailable right now</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconCompass className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Tides Today</p>
          {tides && tides.length > 0 ? (
            <ul className="mt-1 space-y-0.5 text-sm text-ink/65">
              {tides.map((t, i) => (
                <li key={i}>
                  {t.type === "H" ? "High" : "Low"} {t.time} &middot; {t.heightFt} ft
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-ink/40">Unavailable right now</p>
          )}
          {tideCurve && tideCurve.length > 1 && (
            <TideCurve points={tideCurve} nowHour={nowHour} />
          )}
        </div>

        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconMoon className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">Sun &amp; Moon</p>
          {sun ? (
            <p className="mt-1 text-sm text-ink/65">
              Sunrise {sun.sunrise} &middot; Sunset {sun.sunset}
            </p>
          ) : null}
          <p className="text-sm text-ink/65">
            {moon.phaseName} &middot; {moon.illuminationPct}% lit
          </p>
        </div>
      </div>

      <p className="border-t border-cream-line px-6 py-3 text-xs text-ink/40">
        Weather &amp; swell: Open-Meteo &middot; Tides: NOAA Gaviota State Park station
      </p>
    </div>
  );
}
