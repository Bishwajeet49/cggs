/** Subtle maritime hero illustration — visible but restrained */
export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Compass rose — right */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -right-12 top-1/2 h-[360px] w-[360px] -translate-y-1/2 opacity-[0.09]"
        fill="none"
        stroke="#C5A028"
        strokeWidth="1"
      >
        <circle cx="100" cy="100" r="88" />
        <circle cx="100" cy="100" r="62" />
        <circle cx="100" cy="100" r="36" />
        <line x1="100" y1="12" x2="100" y2="188" />
        <line x1="12" y1="100" x2="188" y2="100" />
        <line x1="30" y1="30" x2="170" y2="170" />
        <line x1="170" y1="30" x2="30" y2="170" />
        <polygon points="100,20 108,92 100,100 92,92" fill="#C5A028" opacity="0.45" />
        <polygon points="100,180 108,108 100,100 92,108" fill="#C5A028" opacity="0.25" />
      </svg>

      {/* Maritime grid — right half only */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)",
        }}
      />

      {/* Ship silhouette — bottom center */}
      <svg
        viewBox="0 0 320 80"
        className="absolute bottom-0 left-1/2 h-24 w-[480px] -translate-x-1/2 opacity-[0.07]"
        fill="#ffffff"
      >
        <path d="M20 55 L40 45 L280 45 L300 55 L300 65 L20 65 Z" />
        <rect x="130" y="25" width="60" height="20" rx="2" />
        <rect x="145" y="12" width="8" height="13" />
        <rect x="167" y="12" width="8" height="13" />
        <path d="M0 65 L320 65 L320 80 L0 80 Z" opacity="0.5" />
      </svg>

      {/* Wave lines — bottom */}
      <svg
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 h-12 w-full opacity-[0.08]"
        fill="none"
        stroke="#C5A028"
        strokeWidth="1.2"
      >
        <path d="M0 20 Q100 8 200 20 T400 20 T600 20 T800 20" />
        <path d="M0 30 Q100 18 200 30 T400 30 T600 30 T800 30" opacity="0.65" />
      </svg>
    </div>
  );
}
