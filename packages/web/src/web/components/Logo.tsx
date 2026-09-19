export function Logo({ size = 44 }: { size?: number }) {
  const s = size;
  const id = "vdmc3";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: s * 0.32 }}>
      {/* ── ICONO: casa con pin integrado ── */}
      <svg width={s} height={s * 0.9} viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`${id}-g`} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Tejado izquierda */}
        <path d="M2 24L24 4L46 24" stroke={`url(#${id}-g)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Cuerpo casa */}
        <path d="M8 24V40H20V30H28V40H40V24" fill={`url(#${id}-g)`} />

        {/* Pin de ubicación — encima del tejado centrado */}
        {/* Cuerpo del pin */}
        <path
          d="M24 1C20.96 1 18.5 3.46 18.5 6.5C18.5 10.5 24 16 24 16C24 16 29.5 10.5 29.5 6.5C29.5 3.46 27.04 1 24 1Z"
          fill={`url(#${id}-g)`}
        />
        {/* Punto blanco interior del pin */}
        <circle cx="24" cy="6.5" r="2.2" fill="white" fillOpacity="0.95" />
      </svg>

      {/* ── TEXTO ── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          fontSize: s * 0.38,
          color: "rgba(255,255,255,0.90)",
          letterSpacing: "0.01em",
          lineHeight: 1,
        }}>
          valoraciondemicasa
        </span>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: s * 0.26,
          color: "#34d399",
          letterSpacing: "0.02em",
          marginLeft: "0.08em",
          lineHeight: 1,
        }}>
          .es
        </span>
      </div>
    </div>
  );
}
