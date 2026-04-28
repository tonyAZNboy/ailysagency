import { ReactNode, useRef, useState, useCallback, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  radius = 150,
  as: Component = 'div',
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      // Respect reduced motion preference
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
          transition: 'transform 0.15s ease-out',
        });
      }
    },
    [strength, radius, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'translate(0, 0)',
      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  const ElementComponent = Component as any;

  return (
    <ElementComponent
      ref={ref}
      className={cn('inline-block max-w-full', className)}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </ElementComponent>
  );
}

// Wrapper that adds magnetic effect to any button-like element
interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticWrapper({
  children,
  className,
  strength = 0.25,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setPosition({ x, y });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={cn('inline-block max-w-full', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0
          ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
          : 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
}
