const SpellingGameLogo = ({ className = "" }) => (
  <svg
    suppressHydrationWarning
    className={`w-full h-auto ${className}`} // full width and auto height
    viewBox="0 0 300 50"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00000055" />
      </filter>
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6EE7B7" />

        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <text
      x="0"
      y="40"
      fontFamily="Verdana, Geneva, sans-serif"
      fontSize="30"
      fontWeight="bold"
      fill="url(#textGradient)"
      filter="url(#softShadow)"
    >
      Spelling Game
    </text>
  </svg>
);

export default SpellingGameLogo;
