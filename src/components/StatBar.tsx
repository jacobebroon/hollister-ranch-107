const STATS = [
  { value: "113", label: "Private acres" },
  { value: "14,400", label: "Acre ranch" },
  { value: "8.5 mi", label: "Untouched coastline" },
  { value: "1866", label: "Ranch founded" },
];

export default function StatBar() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="text-center">
          <p className="font-serif text-3xl font-bold text-terracotta sm:text-4xl">{s.value}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-ink/60">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
