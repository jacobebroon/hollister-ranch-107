type IconProps = { className?: string };

const base = "h-6 w-6";

export function IconLand({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path d="M3 20l5-9 4 6 3-5 6 8H3z" strokeLinejoin="round" />
      <path d="M3 20h18" strokeLinecap="round" />
    </svg>
  );
}

export function IconEye({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

export function IconGate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path d="M12 2.5l7.5 3.2v6.1c0 5-3.2 8.2-7.5 9.7-4.3-1.5-7.5-4.7-7.5-9.7V5.7L12 2.5z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWave({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path
        d="M2 17c1.6 0 1.6-2 3.2-2s1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12c1.6 0 1.6-2 3.2-2s1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path d="M3.5 11.5L12 4l8.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9v-6h6v6h2.5a1 1 0 0 0 1-1V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path
        d="M6.5 3.5c.6 1.4 1 2.7 1 3.8 0 1-1.6 1.7-2 2.5-.6 1.1 3 6.7 6.7 6.7.8-.4 1.5-2 2.5-2 1.1 0 2.4.4 3.8 1v3c0 1.1-1 2-2 2-8 0-15-7-15-15 0-1 .9-2 2-2h3z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTennis({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.5 6.5c2.2 1.8 3.3 4 3.3 5.5s-1.1 3.7-3.3 5.5" strokeLinecap="round" />
      <path d="M19.5 6.5c-2.2 1.8-3.3 4-3.3 5.5s1.1 3.7 3.3 5.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconWhale({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <path
        d="M3 13c2-4 6-6 10-6 4.5 0 8 2.5 8 5.5S17 18 12 18c-3 0-5.5-1-7-2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 13c1.2-.3 2.2-.1 3 .8" strokeLinecap="round" />
      <path d="M19 10.5l2.5-2" strokeLinecap="round" />
      <circle cx="16.5" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFlower({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" />
      <path d="M12 18.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" />
      <path d="M9.8 12a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0z" />
      <path d="M18.6 12a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0z" />
    </svg>
  );
}

export function IconCompass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className ?? base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" strokeLinejoin="round" />
    </svg>
  );
}
