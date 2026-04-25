import { useEffect, useState, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionOptions {
  includeTouch?: boolean;
}

export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { includeTouch = true } = options;
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    if (includeTouch) {
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (includeTouch) {
        window.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [includeTouch]);

  return position;
}

// Hook for element-relative mouse position with parallax offset
interface UseParallaxOptions {
  strength?: number;
  inverted?: boolean;
}

interface ParallaxOffset {
  x: number;
  y: number;
  style: React.CSSProperties;
}

export function useParallax(options: UseParallaxOptions = {}): ParallaxOffset {
  const { strength = 20, inverted = false } = options;
  const mousePosition = useMousePosition();
  const [offset, setOffset] = useState<ParallaxOffset>({
    x: 0,
    y: 0,
    style: {},
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setOffset({ x: 0, y: 0, style: {} });
      return;
    }

    // Calculate offset based on center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const multiplier = inverted ? -1 : 1;
    const x = ((mousePosition.x - centerX) / centerX) * strength * multiplier;
    const y = ((mousePosition.y - centerY) / centerY) * strength * multiplier;

    setOffset({
      x,
      y,
      style: {
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.1s ease-out',
      },
    });
  }, [mousePosition.x, mousePosition.y, strength, inverted]);

  return offset;
}

// Hook for magnetic button effect
interface UseMagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic(options: UseMagneticOptions = {}) {
  const { strength = 0.3, radius = 150 } = options;
  const ref = useRef<HTMLElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        setStyle({
          transform: `translate(${distanceX * pull}px, ${distanceY * pull}px)`,
          transition: 'transform 0.2s ease-out',
        });
      } else {
        setStyle({
          transform: 'translate(0, 0)',
          transition: 'transform 0.3s ease-out',
        });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'translate(0, 0)',
      transition: 'transform 0.3s ease-out',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return { ref, style, onMouseLeave: handleMouseLeave };
}
