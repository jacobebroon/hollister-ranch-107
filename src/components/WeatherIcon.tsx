function iconForCode(code: number): "sun" | "partly" | "cloudy" | "fog" | "rain" | "storm" | "snow" {
  if (code === 0 || code === 1) return "sun";
  if (code === 2) return "partly";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 95) return "storm";
  return "rain";
}

export default function WeatherIcon({ code, className = "h-6 w-6" }: { code: number; className?: string }) {
  const kind = iconForCode(code);

  if (kind === "sun") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="4.5" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.6 5.4l-1.6 1.6M6.9 17.1l-1.6 1.6M18.6 18.6l-1.6-1.6M6.9 6.9L5.3 5.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "partly") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="8.5" cy="8.5" r="3.5" />
        <path d="M8.5 2.5v1.6M14.3 8.5h-1.6M4 5l1.2 1.2M4 12l1.2-1.2" strokeLinecap="round" />
        <path
          d="M9 20h8a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8.2 14.5 3 3 0 0 0 9 20z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "fog") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path
          d="M6 9a4 4 0 0 1 7.6-1.8A3.5 3.5 0 0 1 18 10.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 13h18M3 17h18M5 21h14" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "storm") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path
          d="M7 16h9.5a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.5 10.5 3 3 0 0 0 7 16z"
          strokeLinejoin="round"
        />
        <path d="M12.5 17l-2 3.5h2.5L11 24" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "snow") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path
          d="M7 15h9.5a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.5 9.5 3 3 0 0 0 7 15z"
          strokeLinejoin="round"
        />
        <path d="M9 18v4M12 18v4M15 18v4" strokeLinecap="round" />
      </svg>
    );
  }

  // rain / drizzle / showers
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path
        d="M7 15h9.5a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.5 9.5 3 3 0 0 0 7 15z"
        strokeLinejoin="round"
      />
      <path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" strokeLinecap="round" />
    </svg>
  );
}
