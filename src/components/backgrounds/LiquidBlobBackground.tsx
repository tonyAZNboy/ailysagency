import { useEffect, useState } from "react";

// LiquidBlobBackground
// Animated SVG blobs morphing slowly. Friendly-local mood.
// CSS animation, respects prefers-reduced-motion.

interface LiquidBlobBackgroundProps {
  className?: string;
  baseColor?: string;
  accentColor?: string;
  highlightColor?: string;
}

export function LiquidBlobBackground({
  className = "",
  baseColor = "12 85% 62%",
  accentColor = "48 95% 60%",
  highlightColor = "200 60% 97%",
}: LiquidBlobBackgroundProps) {
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
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(40px)" }}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ animation: reduced ? "none" : "blob1 28s ease-in-out infinite alternate" }}>
          <ellipse cx="250" cy="280" rx="280" ry="220" fill={`hsl(${baseColor})`} opacity="0.45" />
        </g>
        <g style={{ animation: reduced ? "none" : "blob2 36s ease-in-out infinite alternate" }}>
          <ellipse cx="750" cy="700" rx="320" ry="260" fill={`hsl(${accentColor})`} opacity="0.40" />
        </g>
        <g style={{ animation: reduced ? "none" : "blob3 32s ease-in-out infinite alternate" }}>
          <ellipse cx="600" cy="200" rx="200" ry="180" fill={`hsl(${baseColor})`} opacity="0.30" />
        </g>
      </svg>
      <style>{`
        @keyframes blob1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(60px, 40px, 0) scale(1.15); }
        }
        @keyframes blob2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-40px, -30px, 0) scale(1.12); }
        }
        @keyframes blob3 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-30px, 50px, 0) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
