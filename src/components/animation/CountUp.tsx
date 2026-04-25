import { useEffect, useState, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  threshold?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut';
}

const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

export function CountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  threshold = 0.3,
  easing = 'easeOut',
}: CountUpProps) {
  const { ref, isInView } = useScrollAnimation({ threshold, triggerOnce: true });
  const [count, setCount] = useState(start);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);
      const currentCount = start + (end - start) * easedProgress;

      setCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    },
    [start, end, duration, easing]
  );

  useEffect(() => {
    if (isInView) {
      // Respect reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        setCount(end);
        return;
      }

      startTimeRef.current = null;
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, animate, end]);

  const formattedCount = count.toFixed(decimals);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={cn(className)}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}

// Specialized count up for percentage values
interface CountUpPercentProps extends Omit<CountUpProps, 'suffix' | 'decimals'> {
  showSymbol?: boolean;
}

export function CountUpPercent({
  showSymbol = true,
  ...props
}: CountUpPercentProps) {
  return <CountUp {...props} suffix={showSymbol ? '%' : ''} decimals={0} />;
}

// Specialized count up for currency values
interface CountUpCurrencyProps extends Omit<CountUpProps, 'prefix' | 'decimals'> {
  currency?: string;
}

export function CountUpCurrency({
  currency = '$',
  ...props
}: CountUpCurrencyProps) {
  return <CountUp {...props} prefix={currency} decimals={0} />;
}

// Count up with K/M suffix for large numbers
interface CountUpCompactProps extends Omit<CountUpProps, 'suffix' | 'end'> {
  value: number;
  addSuffix?: string;
}

export function CountUpCompact({
  value,
  addSuffix = '',
  ...props
}: CountUpCompactProps) {
  const getCompactValue = (num: number): { value: number; suffix: string } => {
    if (num >= 1000000) {
      return { value: num / 1000000, suffix: 'M' };
    }
    if (num >= 1000) {
      return { value: num / 1000, suffix: 'K' };
    }
    return { value: num, suffix: '' };
  };

  const { value: compactValue, suffix } = getCompactValue(value);

  return (
    <CountUp
      {...props}
      end={compactValue}
      suffix={suffix + addSuffix}
      decimals={compactValue % 1 !== 0 ? 1 : 0}
    />
  );
}
