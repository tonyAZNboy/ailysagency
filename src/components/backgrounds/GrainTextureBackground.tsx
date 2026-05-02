// GrainTextureBackground
// Warm cream gradient + SVG noise overlay. Chaleureux-artisan mood.
// Static (no animation needed for grain texture).

interface GrainTextureBackgroundProps {
  className?: string;
  baseColor?: string;
  accentColor?: string;
  highlightColor?: string;
}

export function GrainTextureBackground({
  className = "",
  baseColor = "14 75% 52%",
  accentColor = "35 80% 55%",
  highlightColor = "30 25% 96%",
}: GrainTextureBackgroundProps) {
  // SVG noise feTurbulence as data URI for the grain layer
  const noiseSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>';

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      style={{ background: `hsl(${highlightColor})` }}
    >
      {/* Warm gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 0% 0%, hsla(${baseColor} / 0.18), transparent 60%),
            radial-gradient(ellipse 100% 60% at 100% 100%, hsla(${accentColor} / 0.22), transparent 60%)
          `,
        }}
      />
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("${noiseSvg}")`,
          backgroundRepeat: "repeat",
          opacity: 0.55,
        }}
      />
    </div>
  );
}
