import { CSSProperties, useId } from "react";

interface FleurDeLysProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** "gradient" applies the brand gradient, or pass a CSS color */
  fill?: "gradient" | string;
}

/**
 * AiLys mark · stylized fleur-de-lys.
 *
 * Geometry rebuilt from scratch for a cleaner silhouette:
 *  - Center top: a single elongated almond/flame petal
 *  - Two side petals: outward-swooping arcs that read as a single curve at small sizes
 *  - Band: thin rounded belt
 *  - Bottom: tapered teardrop that tracks the central axis
 *
 * Symmetric about x=32. ViewBox 64×64 so coordinates map 1:1 to "px units"
 * for visual reasoning. Scales cleanly from 14px (favicon) to 96px+ (hero).
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
  const gradientId = `fdl-grad-${reactId.replace(/:/g, "")}`;
  const highlightId = `fdl-hl-${reactId.replace(/:/g, "")}`;
  const fillValue = fill === "gradient" ? `url(#${gradientId})` : fill;

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
      {fill === "gradient" && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(185 100% 58%)" />
            <stop offset="50%" stopColor="hsl(265 92% 66%)" />
            <stop offset="100%" stopColor="hsl(310 92% 66%)" />
          </linearGradient>
          <linearGradient id={highlightId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      )}

      {/* Left side petal — single graceful arc swooping out and back */}
      <path
        d="M 30 30 C 22 32, 12 30, 6 20 C 12 24, 22 28, 30 30 Z"
        fill={fillValue}
        opacity="0.92"
      />

      {/* Right side petal — mirror */}
      <path
        d="M 34 30 C 42 32, 52 30, 58 20 C 52 24, 42 28, 34 30 Z"
        fill={fillValue}
        opacity="0.92"
      />

      {/* Center top petal — elongated almond / flame */}
      <path
        d="M 32 4
           C 27 12, 24 22, 28 30
           Q 32 32 36 30
           C 40 22, 37 12, 32 4 Z"
        fill={fillValue}
      />

      {/* Belt — thin rounded band */}
      <rect x="8" y="31.5" width="48" height="3.5" rx="1.75" fill={fillValue} />

      {/* Bottom drop — tapered teardrop with a subtle waist at y=46 */}
      <path
        d="M 28 35
           C 27.5 42, 28.5 50, 32 60
           C 35.5 50, 36.5 42, 36 35 Z"
        fill={fillValue}
      />

      {/* Optional top-petal highlight: only visible at larger sizes,
          adds depth without clogging small renders. Cuts off when
          fill is a solid color (caller has full control then). */}
      {fill === "gradient" && size >= 32 && (
        <path
          d="M 32 6 C 30 12, 29 20, 30.5 26 C 31.5 22, 31.5 14, 32 6 Z"
          fill={`url(#${highlightId})`}
          opacity="0.9"
        />
      )}
    </svg>
  );
}
