import { useEffect, useRef, useState } from "react";

// AnimatedCounter
// Counts a numeric value from 0 to its target when scrolled into view.
// Preserves any non-numeric prefix/suffix in the original string
// (e.g. "82%", "3.1×", "$300", "21 days"). Respects prefers-reduced-motion.
//
// Usage:
//   <AnimatedCounter value="82%" durationMs={1400} />
//   <AnimatedCounter value="3.1×" />

interface AnimatedCounterProps {
  // Original string from data (e.g. "82%", "3.1×", "$300", "21 days").
  // The first numeric block is animated, the rest is preserved verbatim.
  value: string;
  durationMs?: number;
  className?: string;
}

// Extract numeric prefix from a string. Returns [numericString, prefix, suffix].
// "82%" -> ["82", "", "%"]
// "3.1×" -> ["3.1", "", "×"]
// "$300" -> ["300", "$", ""]
// "21 days" -> ["21", "", " days"]
function splitNumeric(input: string): { num: string; prefix: string; suffix: string } {
  const trimmed = input.trim();
  const match = trimmed.match(/^([^\d.,-]*?)([\d.,]+)(.*)$/);
  if (!match) return { num: "", prefix: input, suffix: "" };
  return { prefix: match[1], num: match[2], suffix: match[3] };
}

function parseNumber(numStr: string): { value: number; decimals: number; useComma: boolean } {
  // Detect comma decimal separator (European/Quebec FR)
  const useComma = numStr.includes(",") && !numStr.includes(".");
  const normalized = useComma ? numStr.replace(",", ".") : numStr.replace(/,/g, "");
  const value = parseFloat(normalized);
  if (isNaN(value)) return { value: 0, decimals: 0, useComma: false };
  const decIdx = normalized.indexOf(".");
  const decimals = decIdx === -1 ? 0 : normalized.length - decIdx - 1;
  return { value, decimals, useComma };
}

function formatNumber(value: number, decimals: number, useComma: boolean): string {
  const fixed = value.toFixed(decimals);
  return useComma ? fixed.replace(".", ",") : fixed;
}

export function AnimatedCounter({ value, durationMs = 1400, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState<string>(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const reducedRef = useRef(false);

  // Read prefers-reduced-motion once
  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Parse the target value once
  const parsed = useRef(splitNumeric(value));
  const numInfo = useRef(parseNumber(parsed.current.num));

  // Initialize display: if we'll animate, start at 0; if reduced motion or no num, show final
  useEffect(() => {
    parsed.current = splitNumeric(value);
    numInfo.current = parseNumber(parsed.current.num);
    if (reducedRef.current || numInfo.current.value === 0) {
      setDisplayed(value);
      setHasAnimated(true);
    } else {
      const zeroNum = formatNumber(0, numInfo.current.decimals, numInfo.current.useComma);
      setDisplayed(`${parsed.current.prefix}${zeroNum}${parsed.current.suffix}`);
    }
  }, [value]);

  // Trigger animation on scroll into view
  useEffect(() => {
    if (hasAnimated || reducedRef.current) return;
    if (!ref.current) return;
    const node = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const target = numInfo.current.value;
            const decimals = numInfo.current.decimals;
            const useComma = numInfo.current.useComma;
            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / durationMs);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = target * eased;
              setDisplayed(
                `${parsed.current.prefix}${formatNumber(current, decimals, useComma)}${parsed.current.suffix}`,
              );
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplayed(value); // Lock to exact original (handles formatting edge cases)
            };
            requestAnimationFrame(tick);
            observer.unobserve(node);
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated, durationMs, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {displayed}
    </span>
  );
}
