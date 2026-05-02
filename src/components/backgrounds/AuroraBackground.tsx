import { useEffect, useState } from "react";

// AuroraBackground
// Slow drifting aurora bands. Luxe-editorial mood.

interface AuroraBackgroundProps {
  className?: string;
  baseColor?: string;
  accentColor?: string;
  highlightColor?: string;
}

export function AuroraBackground({
  className = "",
  baseColor = "350 65% 35%",
  accentColor = "42 70% 52%",
  highlightColor = "35 35% 96%",
}: AuroraBackgroundProps) {
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
      <div
        className="absolute -inset-[20%] opacity-70"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsla(${baseColor} / 0.35), transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 30%, hsla(${accentColor} / 0.28), transparent 55%),
            radial-gradient(ellipse 70% 50% at 80% 50%, hsla(${baseColor} / 0.22), transparent 60%),
            radial-gradient(ellipse 90% 40% at 50% 100%, hsla(${accentColor} / 0.18), transparent 55%)
          `,
          filter: "blur(40px)",
          animation: reduced ? "none" : "auroraFlow 32s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes auroraFlow {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(-3%, 2%, 0) rotate(2deg); }
          100% { transform: translate3d(2%, -2%, 0) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
