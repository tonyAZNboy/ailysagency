import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ScrollAnimationResult {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): ScrollAnimationResult {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        
        if (isVisible) {
          setIsInView(true);
          setHasAnimated(true);
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: ref as React.RefObject<HTMLElement>, isInView, hasAnimated };
}

// Hook for staggered animations (multiple children)
interface UseStaggeredAnimationOptions extends UseScrollAnimationOptions {
  staggerDelay?: number;
  childCount?: number;
}

interface StaggeredAnimationResult extends ScrollAnimationResult {
  getDelay: (index: number) => number;
  getStyle: (index: number) => React.CSSProperties;
}

export function useStaggeredAnimation(
  options: UseStaggeredAnimationOptions = {}
): StaggeredAnimationResult {
  const { staggerDelay = 100, childCount = 0, ...scrollOptions } = options;
  const { ref, isInView, hasAnimated } = useScrollAnimation(scrollOptions);

  const getDelay = useCallback(
    (index: number) => index * staggerDelay,
    [staggerDelay]
  );

  const getStyle = useCallback(
    (index: number): React.CSSProperties => ({
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s ease-out ${getDelay(index)}ms, transform 0.6s ease-out ${getDelay(index)}ms`,
    }),
    [isInView, getDelay]
  );

  return { ref, isInView, hasAnimated, getDelay, getStyle };
}

// Hook for scroll progress within a section
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
