import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface LiveTickerProps {
  goal: string;
  status: string;
}

/**
 * Aspirational live ticker.
 * Currently displays a goal + private-beta status.
 * Swap `goal`/`status` to real metrics once we hit 20+ clients
 * (e.g. "+3 new LLM citations across our beta cohort this week").
 */
export function LiveTicker({ goal, status }: LiveTickerProps) {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/25 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm text-xs sm:text-sm"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 ${
            pulse ? "animate-ping" : ""
          }`}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <Activity className="w-3.5 h-3.5 text-primary/80" aria-hidden="true" />
      <span className="text-foreground/90 font-medium">{goal}</span>
      <span className="hidden sm:inline text-border">·</span>
      <span className="hidden sm:inline text-muted-foreground/80">{status}</span>
    </div>
  );
}
