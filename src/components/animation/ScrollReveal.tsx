import { ReactNode, forwardRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'scale' 
  | 'blur';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<AnimationVariant, { initial: React.CSSProperties; animate: React.CSSProperties }> = {
  'fade-up': {
    initial: { opacity: 0, transform: 'translateY(40px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-down': {
    initial: { opacity: 0, transform: 'translateY(-40px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
  },
  'fade-left': {
    initial: { opacity: 0, transform: 'translateX(-40px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
  },
  'fade-right': {
    initial: { opacity: 0, transform: 'translateX(40px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
  },
  'scale': {
    initial: { opacity: 0, transform: 'scale(0.9)' },
    animate: { opacity: 1, transform: 'scale(1)' },
  },
  'blur': {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
};

export const ScrollReveal = forwardRef<HTMLElement, ScrollRevealProps>(
  (
    {
      children,
      className,
      variant = 'fade-up',
      delay = 0,
      duration = 600,
      threshold = 0.1,
      triggerOnce = true,
      as: Component = 'div',
    },
    forwardedRef
  ) => {
    const { ref, isInView } = useScrollAnimation({ threshold, triggerOnce });

    const styles = variantStyles[variant];
    const animationStyle: React.CSSProperties = {
      ...(isInView ? styles.animate : styles.initial),
      transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: 'transform, opacity',
    };

    // Merge refs
    const setRef = (node: HTMLElement | null) => {
      (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const ElementComponent = Component as any;

    return (
      <ElementComponent
        ref={setRef}
        className={cn(className)}
        style={animationStyle}
      >
        {children}
      </ElementComponent>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';

// Staggered reveal container for multiple items
interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  variant?: AnimationVariant;
  duration?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
  itemClassName?: string;
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 100,
  variant = 'fade-up',
  duration = 600,
  threshold = 0.1,
  as: Component = 'div',
  itemClassName,
}: StaggerRevealProps) {
  const { ref, isInView } = useScrollAnimation({ threshold, triggerOnce: true });

  const styles = variantStyles[variant];

  const ElementComponent = Component as any;

  return (
    <ElementComponent ref={ref} className={cn(className)}>
      {children.map((child, index) => {
        const animationStyle: React.CSSProperties = {
          ...(isInView ? styles.animate : styles.initial),
          transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`,
          willChange: 'transform, opacity',
        };

        return (
          <div key={index} style={animationStyle} className={itemClassName}>
            {child}
          </div>
        );
      })}
    </ElementComponent>
  );
}
