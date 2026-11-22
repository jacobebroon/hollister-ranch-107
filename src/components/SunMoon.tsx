// Server-rendered sun arc (where the sun is between sunrise and sunset right now, in
// California time) and a moon drawn in its current phase.

function toMinutes(t: string) {
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2]);
}

function nowMinutesLA() {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
    timeZone: "America/Los_Angeles",
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

export function SunArc({ sunrise, sunset, label }: { sunrise: string; sunset: string; label: string }) {
  const rise = toMinutes(sunrise);
  const set = toMinutes(sunset);
  if (rise === null || set === null || set <= rise) return null;
  const now = nowMinutesLA();
  const f = (now - rise) / (set - rise);
  const up = f >= 0 && f <= 1;
  const W = 170, H = 70, cx = W / 2, cy = 62, rx = 72, ry = 52;
  const angle = Math.PI * (1 - Math.min(1, Math.max(0, f)));
  const sx = cx + rx * Math.cos(angle);
  const sy = cy - ry * Math.sin(angle);
  const arc = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`;
  // The part of the arc already travelled today
  const done = up ? `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${sx.toFixed(1)} ${sy.toFixed(1)}` : null;

  return (
    <svg viewBox={`0 0 ${W} ${H + 6}`} className="mt-3 w-full max-w-[190px]" role="img" aria-label={label}>
      <defs>
        <linearGradient id="sun-arc" x1="0" x2="1">
          <stop offset="0" stopColor="#e9b768" />
          <stop offset="1" stopColor="#ad4f28" />
        </linearGradient>
      </defs>
      <line x1="4" x2={W - 4} y1={cy} y2={cy} stroke="currentColor" strokeOpacity="0.18" />
      <path d={arc} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="3 4" />
      {done && <path d={done} fill="none" stroke="url(#sun-arc)" strokeWidth="2.5" strokeLinecap="round" />}
      {up ? (
        <g>
          <circle cx={sx} cy={sy} r="9" fill="#e9b768" opacity="0.25" />
          <circle cx={sx} cy={sy} r="5.5" fill="#e9a23b" stroke="#fff6e6" strokeWidth="1.5" />
        </g>
      ) : (
        <circle cx={f < 0 ? cx - rx : cx + rx} cy={cy} r="4" fill="currentColor" fillOpacity="0.3" />
      )}
    </svg>
  );
}

export function MoonPhase({ phaseName, illuminationPct, label }: { phaseName: string; illuminationPct: number; label: string }) {
  const k = Math.min(1, Math.max(0, illuminationPct / 100));
  const waning = /waning|last|third/i.test(phaseName);
  const r = 18, cx = 20, cy = 20;
  const rx = r * Math.abs(1 - 2 * k);
  // Lit right half (waxing), closed by the terminator ellipse; mirrored when waning
  const lit =
    k >= 0.99
      ? null
      : `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rx} ${r} 0 0 ${k > 0.5 ? 1 : 0} ${cx} ${cy - r} Z`;
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11 drop-shadow-sm" role="img" aria-label={label}>
      <circle cx={cx} cy={cy} r={r} fill="#56616b" />
      {k >= 0.99 ? (
        <circle cx={cx} cy={cy} r={r} fill="#f7eed8" />
      ) : k > 0.01 && lit ? (
        <path d={lit} fill="#f7eed8" transform={waning ? `translate(${2 * cx} 0) scale(-1 1)` : undefined} />
      ) : null}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#b9a680" strokeWidth="1.2" />
    </svg>
  );
}
