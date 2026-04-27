import { CSSProperties, useId } from "react";

type FleurFill = "gradient" | "quebec" | string;

interface FleurDeLysProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  /**
   * Fill mode:
   *  - "gradient" applies the AiLys neon gradient (cyan/violet/magenta)
   *  - "quebec" applies a Quebec-flag look: white petals + royal-blue
   *    inner accents, plus a subtle cyan/violet neon halo so the mark
   *    still reads as part of the AiLys site (not a flag clone)
   *  - any other string is used as a solid CSS color
   */
  fill?: FleurFill;
}

/**
 * AiLys mark · stylized fleur-de-lys.
 *
 * Geometry: 5 symmetric elements about x=32.
 *  - Center top: elongated almond/flame petal
 *  - Two side petals: outward-swooping arcs
 *  - Belt: thin rounded band
 *  - Bottom: tapered teardrop
 *
 * "quebec" variant adds inner blue accents inside the body of the petals
 * and a soft external halo so the white mark sits naturally on the dark
 * AiLys background. Inspired by the Quebec flag fleur but slimmer and
 * tuned to render at 14px (favicon) through 96px+ (hero).
 *
 * useId() over Math.random() so SSR + hydration produce stable IDs.
 */
export function FleurDeLys({
  size = 24,
  className = "",
  style,
  fill = "gradient",
}: FleurDeLysProps) {
  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const gradientId = `fdl-grad-${safeId}`;
  const blueGradId = `fdl-blue-${safeId}`;
  const haloId = `fdl-halo-${safeId}`;
  const highlightId = `fdl-hl-${safeId}`;

  const isGradient = fill === "gradient";
  const isQuebec = fill === "quebec";
  const baseFill = isGradient
    ? `url(#${gradientId})`
    : isQuebec
      ? "#FFFFFF"
      : fill;
  // Inner blue accent color for the "quebec" variant. Royal blue tuned a
  // touch more saturated than the Quebec flag so it pops on a dark BG.
  const blueAccent = `url(#${blueGradId})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
      role="img"
    >
      <defs>
        {isGradient && (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(185 100% 58%)" />
            <stop offset="50%" stopColor="hsl(265 92% 66%)" />
            <stop offset="100%" stopColor="hsl(310 92% 66%)" />
          </linearGradient>
        )}
        {isQuebec && (
          <>
            <linearGradient id={blueGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(208 88% 48%)" />
              <stop offset="100%" stopColor="hsl(218 92% 36%)" />
            </linearGradient>
            <radialGradient id={haloId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.25)" />
              <stop offset="60%" stopColor="rgba(167,139,250,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </>
        )}
        {(isGradient || isQuebec) && (
          <linearGradient id={highlightId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        )}
      </defs>

      {/* Quebec halo · only on the quebec variant, sits behind the mark */}
      {isQuebec && (
        <circle cx="32" cy="32" r="30" fill={`url(#${haloId})`} />
      )}

      {/* Left side petal */}
      <path
        d="M 30 30 C 22 32, 12 30, 6 20 C 12 24, 22 28, 30 30 Z"
        fill={baseFill}
        opacity={isQuebec ? 1 : 0.92}
      />

      {/* Right side petal */}
      <path
        d="M 34 30 C 42 32, 52 30, 58 20 C 52 24, 42 28, 34 30 Z"
        fill={baseFill}
        opacity={isQuebec ? 1 : 0.92}
      />

      {/* Center top petal · elongated almond / flame */}
      <path
        d="M 32 4
           C 27 12, 24 22, 28 30
           Q 32 32 36 30
           C 40 22, 37 12, 32 4 Z"
        fill={baseFill}
      />

      {/* Belt · thin rounded band */}
      <rect
        x="8"
        y="31.5"
        width="48"
        height="3.5"
        rx="1.75"
        fill={baseFill}
      />

      {/* Bottom drop · tapered teardrop */}
      <path
        d="M 28 35
           C 27.5 42, 28.5 50, 32 60
           C 35.5 50, 36.5 42, 36 35 Z"
        fill={baseFill}
      />

      {/* QUEBEC INNER ACCENTS · royal-blue carved-in details that read
          even at favicon scale. Inner sliver on the center petal, two
          dots on the side petals, and a thin spine on the bottom drop. */}
      {isQuebec && (
        <>
          {/* Center petal · vertical blue spine */}
          <path
            d="M 32 10 C 30 16, 29 22, 30.5 28 L 33.5 28 C 35 22, 34 16, 32 10 Z"
            fill={blueAccent}
          />
          {/* Side petal accents · small blue almonds tucked in the curve */}
          <path
            d="M 14 22 C 18 23, 22 25, 26 28 C 22 26, 17 24, 14 22 Z"
            fill={blueAccent}
            opacity="0.92"
          />
          <path
            d="M 50 22 C 46 23, 42 25, 38 28 C 42 26, 47 24, 50 22 Z"
            fill={blueAccent}
            opacity="0.92"
          />
          {/* Bottom drop · vertical blue spine */}
          <path
            d="M 31 38 L 33 38 C 32.8 46, 32.5 52, 32 58 C 31.5 52, 31.2 46, 31 38 Z"
            fill={blueAccent}
          />
          {/* Belt · thin blue inner stripe so the band has dimension */}
          <rect
            x="10"
            y="32.5"
            width="44"
            height="1.5"
            rx="0.75"
            fill={blueAccent}
            opacity="0.55"
          />
        </>
      )}

      {/* Top-petal highlight · only at sizes where it adds dimension */}
      {(isGradient || isQuebec) && size >= 32 && (
        <path
          d="M 32 6 C 30 12, 29 20, 30.5 26 C 31.5 22, 31.5 14, 32 6 Z"
          fill={`url(#${highlightId})`}
          opacity={isQuebec ? 0.55 : 0.9}
        />
      )}
    </svg>
  );
}
