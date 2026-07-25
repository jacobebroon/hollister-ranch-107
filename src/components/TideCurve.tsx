const WIDTH = 220;
const HEIGHT = 56;
const PADDING = 4;

export default function TideCurve({
  points,
  nowHour,
}: {
  points: Array<{ hour: number; heightFt: number }>;
  nowHour: number;
}) {
  if (points.length < 2) return null;

  const heights = points.map((p) => p.heightFt);
  const min = Math.min(...heights);
  const max = Math.max(...heights);
  const range = max - min || 1;

  const x = (hour: number) => PADDING + (hour / 23) * (WIDTH - PADDING * 2);
  const y = (h: number) => HEIGHT - PADDING - ((h - min) / range) * (HEIGHT - PADDING * 2);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.hour)} ${y(p.heightFt)}`).join(" ");
  const areaPath = `${linePath} L ${x(23)} ${HEIGHT} L ${x(0)} ${HEIGHT} Z`;

  const nowIndex = Math.min(points.length - 1, Math.round(nowHour));
  const nowPoint = points[nowIndex];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="mt-2 h-14 w-full"
      role="img"
      aria-label="Today's tide curve"
    >
      <defs>
        <linearGradient id="tide-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ocean)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--ocean)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#tide-fill)" />
      <path d={linePath} fill="none" stroke="var(--ocean)" strokeWidth="1.5" strokeLinejoin="round" />
      {nowPoint && (
        <circle cx={x(nowPoint.hour)} cy={y(nowPoint.heightFt)} r="3" fill="var(--terracotta)" />
      )}
    </svg>
  );
}
