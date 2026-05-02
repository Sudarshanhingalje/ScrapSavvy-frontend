const ScrapSavvyLogo = ({ className = "" }) => {
  return (
    <svg
      width="600"
      height="200"
      viewBox="0 0 600 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for the recycle icon */}
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>

        {/* Gradient for "Scrap" text */}
        <linearGradient id="scrapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#E53935" />
        </linearGradient>

        {/* Gradient for "Savvy" text */}
        <linearGradient id="savvyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>

        {/* Soft drop shadow filter */}
        <filter id="iconShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#00C853"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      {/* ── Background pill behind logo icon ── */}
      <rect x="48" y="50" width="104" height="104" rx="52" fill="#E8F5E9" />

      {/* ── Recycle Symbol Circle ── */}
      <circle
        cx="100"
        cy="102"
        r="42"
        fill="none"
        stroke="url(#iconGrad)"
        strokeWidth="5"
        filter="url(#iconShadow)"
      />

      {/* ── Arrow 1 — top (pointing up-right) ── */}
      <path
        d="M100 57 L122 83 L110 83 C114 94 110 107 98 114 L106 93 L91 93 Z"
        fill="#00C853"
      />

      {/* ── Arrow 2 — bottom-right ── */}
      <path
        d="M137 122 L111 122 L119 110 C131 114 143 107 146 94 L137 106 L147 106 Z"
        fill="#2E7D32"
      />

      {/* ── Arrow 3 — bottom-left ── */}
      <path
        d="M64 122 L79 102 L84 112 C74 120 71 134 79 144 L69 132 L59 132 Z"
        fill="#43A047"
      />

      {/* ── Small sparkle dots around the icon ── */}
      <circle cx="140" cy="62" r="4" fill="#FF6B35" opacity="0.75" />
      <circle cx="148" cy="75" r="2.5" fill="#FF6B35" opacity="0.5" />
      <circle cx="58" cy="62" r="3" fill="#00C853" opacity="0.6" />
      <circle cx="50" cy="78" r="2" fill="#00C853" opacity="0.4" />

      {/* ── "Scrap" text ── */}
      <text
        x="175"
        y="118"
        fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        fontSize="56"
        fontWeight="800"
        fill="url(#scrapGrad)"
        letterSpacing="-1"
      >
        Scrap
      </text>

      {/* ── "Savvy" text ── */}
      <text
        x="346"
        y="118"
        fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        fontSize="56"
        fontWeight="800"
        fill="url(#savvyGrad)"
        letterSpacing="-1"
      >
        Savvy
      </text>

      {/* ── Thin separator line between tagline and name ── */}
      <line
        x1="175"
        y1="128"
        x2="575"
        y2="128"
        stroke="#E0E0E0"
        strokeWidth="1"
      />

      {/* ── Tagline ── */}
      <text
        x="175"
        y="150"
        fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        fontSize="15"
        fontWeight="500"
        fill="#FF6B35"
        letterSpacing="1.5"
      >
        SMART SCRAP COLLECTION PLATFORM
      </text>
    </svg>
  );
};

export default ScrapSavvyLogo;
