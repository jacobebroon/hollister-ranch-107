const TICKS = Array.from({ length: 12 }, (_, i) => i * 30);

export default function WindCompass({
  windDeg,
  swellDeg,
  windCompass,
  swellCompass,
  className,
}: {
  windDeg?: number;
  swellDeg?: number;
  windCompass?: string;
  swellCompass?: string;
  className?: string;
}) {
  const label = [
    swellCompass ? `Swell from the ${swellCompass}` : null,
    windCompass ? `wind from the ${windCompass}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="h-16 w-16" role={label ? "img" : undefined} aria-label={label || undefined}>
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--cream-line)" strokeWidth="2" />
        {TICKS.map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const major = angle % 90 === 0;
          const r1 = major ? 38 : 41;
          return (
            <line
              key={angle}
              x1={50 + r1 * Math.cos(rad)}
              y1={50 + r1 * Math.sin(rad)}
              x2={50 + 46 * Math.cos(rad)}
              y2={50 + 46 * Math.sin(rad)}
              stroke="var(--cream-line)"
              strokeWidth={major ? 2 : 1}
            />
          );
        })}
        <text x="50" y="10" textAnchor="middle" fontSize="9" fill="var(--ink)" opacity="0.45">
          N
        </text>

        {swellDeg != null && (
          <g transform={`rotate(${swellDeg} 50 50)`}>
            <line x1="50" y1="50" x2="50" y2="20" stroke="var(--terracotta)" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 14 l-5 9 h10 z" fill="var(--terracotta)" />
          </g>
        )}
        {windDeg != null && (
          <g transform={`rotate(${windDeg} 50 50)`}>
            <line x1="50" y1="50" x2="50" y2="26" stroke="var(--ocean)" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 21 l-3.5 6.5 h7 z" fill="var(--ocean)" />
          </g>
        )}
        <circle cx="50" cy="50" r="2.5" fill="var(--ink)" />
      </svg>
      <div className="mt-1 flex gap-3 text-[0.65rem] text-ink/50">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" /> Swell
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-ocean" /> Wind
        </span>
      </div>
    </div>
  );
}
