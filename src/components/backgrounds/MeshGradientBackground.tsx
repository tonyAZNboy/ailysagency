import { useEffect, useState } from "react";

// MeshGradientBackground
// Soft animated mesh of conic gradients. Clean-medical mood.
// CSS-only (no canvas), respects prefers-reduced-motion.

interface MeshGradientBackgroundProps {
  className?: string;
  // HSL components without hsl() wrapper, e.g. "188 85% 42%"
  baseColor?: string;
  accentColor?: string;
  highlightColor?: string;
}

export function MeshGradientBackground({
  className = "",
  baseColor = "188 85% 42%",
  accentColor = "152 65% 42%",
  highlightColor = "210 30% 98%",
}: MeshGradientBackgroundProps) {
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
      style={{
        background: `hsl(${highlightColor})`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 15% 20%, hsla(${baseColor} / 0.35) 0%, transparent 45%),
            radial-gradient(at 85% 30%, hsla(${accentColor} / 0.28) 0%, transparent 50%),
            radial-gradient(at 50% 80%, hsla(${baseColor} / 0.22) 0%, transparent 55%),
            radial-gradient(at 20% 90%, hsla(${accentColor} / 0.20) 0%, transparent 45%)
          `,
          animation: reduced ? "none" : "meshDrift 24s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes meshDrift {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(2%, -1%, 0) scale(1.05); }
          100% { transform: translate3d(-1%, 1%, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
