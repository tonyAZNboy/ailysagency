import { useEffect, useState } from "react";

// TopologyBackground
// SVG topographic isolines pattern (geometric). Tech-corporate mood.
// Subtle slow drift, respects prefers-reduced-motion.

interface TopologyBackgroundProps {
  className?: string;
  baseColor?: string;
  accentColor?: string;
  highlightColor?: string;
}

export function TopologyBackground({
  className = "",
  baseColor = "212 95% 58%",
  accentColor = "85 80% 55%",
  highlightColor = "222 32% 9%",
}: TopologyBackgroundProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
      style={{ background: `hsl(${highlightColor})` }}
    >
      {/* Glow layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 30% 20%, hsla(${baseColor} / 0.20), transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, hsla(${accentColor} / 0.16), transparent 60%)
          `,
        }}
      />
      {/* Topology lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          animation: reduced ? "none" : "topoDrift 60s linear infinite",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="topo" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path
              d="M 0 100 Q 50 50, 100 100 T 200 100"
              fill="none"
              stroke={`hsl(${baseColor})`}
              strokeWidth="1"
              opacity="0.45"
            />
            <path
              d="M 0 60 Q 50 20, 100 60 T 200 60"
              fill="none"
              stroke={`hsl(${baseColor})`}
              strokeWidth="0.7"
              opacity="0.30"
            />
            <path
              d="M 0 140 Q 50 100, 100 140 T 200 140"
              fill="none"
              stroke={`hsl(${accentColor})`}
              strokeWidth="0.7"
              opacity="0.35"
            />
            <circle cx="50" cy="50" r="1.5" fill={`hsl(${accentColor})`} opacity="0.6" />
            <circle cx="150" cy="150" r="1.5" fill={`hsl(${baseColor})`} opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>
      <style>{`
        @keyframes topoDrift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-200px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
