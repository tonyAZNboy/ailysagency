import { ReactNode, useEffect, useState, useRef } from 'react';
import { useMousePosition, useParallax } from '@/hooks/useMousePosition';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  inverted?: boolean;
}

export function ParallaxLayer({
  children,
  className,
  strength = 20,
  inverted = false,
}: ParallaxLayerProps) {
  const { style } = useParallax({ strength, inverted });

  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  );
}

// Floating element that bobs up and down
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  amplitude = 10,
  duration = 3,
  delay = 0,
}: FloatingElementProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const animationStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        '--float-amplitude': `${amplitude}px`,
      } as React.CSSProperties;

  return (
    <div className={cn(className)} style={animationStyle}>
      {children}
    </div>
  );
}

// Mouse-responsive gradient orb
interface GradientOrbProps {
  className?: string;
  size?: number;
  color?: string;
  blur?: number;
  strength?: number;
  inverted?: boolean;
}

export function GradientOrb({
  className,
  size = 300,
  color = 'var(--primary)',
  blur = 100,
  strength = 30,
  inverted = false,
}: GradientOrbProps) {
  const { style } = useParallax({ strength, inverted });

  return (
    <div
      className={cn('absolute rounded-full pointer-events-none', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, hsl(${color} / 0.3) 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        ...style,
      }}
    />
  );
}

// Scroll-based parallax (vertical movement based on scroll position)
interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Positive = moves slower than scroll, negative = moves faster
  offset?: number;
}

export function ScrollParallax({
  children,
  className,
  speed = 0.5,
  offset = 0,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress through viewport
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      // Calculate transform
      const movement = (clampedProgress - 0.5) * 100 * speed + offset;
      setTransform(movement);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        transform: `translateY(${transform}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

// Container for parallax background elements
interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxBackground({ children, className }: ParallaxBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {children}
    </div>
  );
}
