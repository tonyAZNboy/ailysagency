import { useEffect, useRef, useState } from "react";
import type { IndustryMethodologyStep } from "@/data/industries";
import type { Mood } from "@/design-system/moods";

// MethodologyStepper
// Visual upgrade over a flat list. Vertical timeline with mood-gradient
// step circles, animated connecting line that "fills in" as the user
// scrolls past each step. Each step expands on click for full detail.
//
// Recycles existing IndustryMethodologyStep[] data shape, no new strings.

interface MethodologyStepperProps {
  steps: IndustryMethodologyStep[];
  mood: Mood;
}

export function MethodologyStepper({ steps, mood }: MethodologyStepperProps) {
  const containerRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  // Track which step is centered in the viewport (for active highlight + line fill).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll("li[data-step]"));
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute("data-step"));
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 },
    );

    items.forEach((it) => observer.observe(it));
    return () => observer.disconnect();
  }, [steps.length]);

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  // Compute fill percentage for the connecting timeline line
  const fillPct = steps.length === 0 ? 0 : ((activeIndex + 1) / steps.length) * 100;

  return (
    <ol ref={containerRef} className="relative space-y-3">
      {/* Connecting vertical line behind the dots, with progress fill */}
      <div
        className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border/40"
        aria-hidden="true"
      />
      <div
        className={`absolute left-[19px] top-0 w-0.5 bg-gradient-to-b ${mood.accentGradient} transition-[height] duration-700 ease-out`}
        style={{ height: `${fillPct}%` }}
        aria-hidden="true"
      />

      {steps.map((step, i) => {
        const isActive = i <= activeIndex;
        const isOpen = openSet.has(i);
        return (
          <li
            key={i}
            data-step={i}
            className="relative grid grid-cols-[40px_1fr] gap-4 sm:gap-5"
          >
            {/* Step circle */}
            <div className="relative pt-2">
              <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 ${
                  isActive
                    ? `bg-gradient-to-br ${mood.accentGradient} text-background shadow-lg`
                    : "bg-card border border-border/50 text-muted-foreground"
                }`}
              >
                {step.step}
                {isActive && (
                  <span
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${mood.accentGradient} opacity-30 blur-md -z-10`}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>

            {/* Step content card */}
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className={`text-left rounded-xl border p-5 sm:p-6 transition-all duration-300 ${
                isActive
                  ? "border-border/60 bg-card/60 backdrop-blur-md"
                  : "border-border/30 bg-card/30 backdrop-blur-md hover:border-border/50"
              }`}
            >
              <h3
                className={`font-display text-lg sm:text-xl mb-2 leading-tight transition-colors ${
                  isActive ? "text-foreground" : "text-foreground/85"
                }`}
              >
                {step.title}
              </h3>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] sm:grid-rows-[1fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {/* Mobile-only expand affordance */}
              <span className="mt-2 inline-flex sm:hidden text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70">
                {isOpen ? "−" : "+"}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
