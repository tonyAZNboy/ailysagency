import { CSSProperties } from "react";

interface FleurDeLysProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** "gradient" applies the brand gradient, or pass a CSS color */
  fill?: "gradient" | string;
}

/**
 * Stylized fleur-de-lys, the AiLys mark.
 * Modern symmetric geometry, scales cleanly from 16px (favicon) to 96px+ (hero).
 */
export function FleurDeLys({
  size = 24,
  className = "",
  style,
  fill = "gradient",
}: FleurDeLysProps) {
  const gradientId = `fdl-grad-${Math.random().toString(36).slice(2, 8)}`;
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
            <stop offset="0%" stopColor="hsl(185 100% 55%)" />
            <stop offset="50%" stopColor="hsl(265 90% 65%)" />
            <stop offset="100%" stopColor="hsl(310 90% 65%)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M32 4 C 28 12, 26 18, 28 24 C 26 22, 22 22, 22 26 C 22 30, 28 30, 32 30 C 36 30, 42 30, 42 26 C 42 22, 38 22, 36 24 C 38 18, 36 12, 32 4 Z"
        fill={fillValue}
      />
      <path
        d="M22 26 C 14 28, 8 36, 10 44 C 12 38, 18 34, 24 34 C 22 32, 22 28, 22 26 Z"
        fill={fillValue}
        opacity="0.9"
      />
      <path
        d="M42 26 C 50 28, 56 36, 54 44 C 52 38, 46 34, 40 34 C 42 32, 42 28, 42 26 Z"
        fill={fillValue}
        opacity="0.9"
      />
      <rect x="14" y="34" width="36" height="4" rx="2" fill={fillValue} opacity="0.85" />
      <path
        d="M28 38 L 28 50 C 28 55, 30 58, 32 60 C 34 58, 36 55, 36 50 L 36 38 Z"
        fill={fillValue}
      />
      <path
        d="M24 42 C 20 46, 18 52, 22 56 C 22 52, 24 48, 28 46 Z"
        fill={fillValue}
        opacity="0.8"
      />
      <path
        d="M40 42 C 44 46, 46 52, 42 56 C 42 52, 40 48, 36 46 Z"
        fill={fillValue}
        opacity="0.8"
      />
    </svg>
  );
}
