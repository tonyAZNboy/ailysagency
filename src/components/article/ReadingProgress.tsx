import { useEffect, useState } from "react";

/**
 * Top-of-page reading progress bar. Tracks scroll percentage through the
 * main content area. Fixed below the navbar.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, hsl(185 100% 55%), hsl(265 90% 65%) 50%, hsl(310 90% 65%))",
          boxShadow:
            "0 0 12px hsl(265 90% 65% / 0.6), 0 0 24px hsl(185 100% 55% / 0.4)",
        }}
      />
    </div>
  );
}
