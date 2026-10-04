import { getConditions } from "@/lib/conditions";
import { IconWave, IconMoon, IconCompass, IconEye } from "@/components/icons";
import TideCurve from "@/components/TideCurve";
import WeatherIcon from "@/components/WeatherIcon";
import WindCompass from "@/components/WindCompass";
import type { Dict } from "@/i18n";

export default async function Conditions({ t }: { t: Dict["conditions"] }) {
  const { weather, surf, sun, tides, tideCurve, moon } = await getConditions();
  const nowHour = new Date().getHours();

  return (
    <div className="overflow-hidden rounded-2xl border border-cream-line bg-sand-deep/40 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream-line px-6 py-4">
        <h3 className="font-serif text-lg font-bold text-ink">{t.title}</h3>
        <p className="text-xs text-ink/40">{t.sub}</p>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            {weather ? <WeatherIcon code={weather.code} className="h-5 w-5" /> : <IconEye className="h-4 w-4" />}
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t.weather}</p>
          {weather ? (
            <>
              <p className="mt-1 font-serif text-2xl font-bold text-ink">{weather.tempF}&deg;F</p>
              <p className="text-sm text-ink/65">{t.weatherCodes[weather.code] ?? weather.label}</p>
              <p className="text-sm text-ink/65">
                {t.wind} {weather.windMph} mph {weather.windCompass}
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-ink/40">{t.unavailable}</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconWave className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t.surf}</p>
          {surf ? (
            <>
              <p className="mt-1 font-serif text-2xl font-bold text-ink">{surf.waveHeightFt} ft</p>
              <p className="text-sm text-ink/65">
                {surf.swellHeightFt} ft {t.swell} &middot; {surf.swellPeriodS}s
              </p>
              <p className="text-sm text-ink/65">{t.from} {surf.swellCompass}</p>
              <WindCompass
                windDeg={weather?.windDeg}
                swellDeg={surf.swellDeg}
                windCompass={weather?.windCompass}
                swellCompass={surf.swellCompass}
                t={t.compass}
                className="mt-3"
              />
            </>
          ) : (
            <p className="mt-1 text-sm text-ink/40">{t.unavailable}</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconCompass className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t.tides}</p>
          {tides && tides.length > 0 ? (
            <ul className="mt-1 space-y-0.5 text-sm text-ink/65">
              {tides.map((tide, i) => (
                <li key={i}>
                  {tide.type === "H" ? t.high : t.low} {tide.time} &middot; {tide.heightFt} ft
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-ink/40">{t.unavailable}</p>
          )}
          {tideCurve && tideCurve.length > 1 && (
            <TideCurve points={tideCurve} nowHour={nowHour} label={t.tideCurve} />
          )}
        </div>

        <div>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <IconMoon className="h-4 w-4" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">{t.sunMoon}</p>
          {sun ? (
            <p className="mt-1 text-sm text-ink/65">
              {t.sunrise} {sun.sunrise} &middot; {t.sunset} {sun.sunset}
            </p>
          ) : null}
          <p className="text-sm text-ink/65">
            {t.moonPhases[moon.phaseName] ?? moon.phaseName} &middot; {moon.illuminationPct}% {t.lit}
          </p>
        </div>
      </div>

      <p className="border-t border-cream-line px-6 py-3 text-xs text-ink/40">
        {t.credit}
      </p>
    </div>
  );
}
