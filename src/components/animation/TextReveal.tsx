import { ReactNode, useMemo, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
type RevealMode = 'words' | 'characters' | 'lines';
interface TextRevealProps {
  children: string;
  className?: string;
  mode?: RevealMode;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}
export function TextReveal({
  children,
  className,
  mode = 'words',
  staggerDelay = 50,
  duration = 500,
  threshold = 0.2,
  as: Component = 'span'
}: TextRevealProps) {
  const {
    ref,
    isInView
  } = useScrollAnimation({
    threshold,
    triggerOnce: true
  });
  const elements = useMemo(() => {
    switch (mode) {
      case 'characters':
        return children.split('').map((char, i) => ({
          text: char === ' ' ? '\u00A0' : char,
          key: i
        }));
      case 'lines':
        return children.split('\n').map((line, i) => ({
          text: line,
          key: i
        }));
      case 'words':
      default:
        return children.split(' ').map((word, i) => ({
          text: word,
          key: i
        }));
    }
  }, [children, mode]);
  const ElementComponent = Component as React.ElementType;
  // Outer wrapper must stay `inline` (not inline-block) so each per-word
  // inline-block child can break to the next line on narrow viewports.
  // inline-block on the outer wrapper sizes the box to fit ALL children on
  // a single line, which clipped headlines on iOS Safari at 375px.
  return <ElementComponent ref={ref} className={cn(className)} style={{ display: 'inline', overflowWrap: 'anywhere', maxWidth: '100%' }}>
      {elements.map(({
      text,
      key
    }, index) => <span key={key} className="inline-block overflow-hidden align-baseline" style={{
      marginRight: mode === 'words' ? '0.25em' : undefined,
      maxWidth: '100%'
    }}>
          <span className="inline-block" style={{
        transform: isInView ? 'translateY(0)' : 'translateY(100%)',
        opacity: isInView ? 1 : 0,
        transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms, opacity ${duration}ms ease-out ${index * staggerDelay}ms`,
        willChange: 'transform, opacity'
      }}>
            {text}
          </span>
        </span>)}
    </ElementComponent>;
}

// Gradient text reveal with animation
interface GradientTextRevealProps {
  children: string;
  className?: string;
  gradientClassName?: string;
  duration?: number;
  threshold?: number;
}
export function GradientTextReveal({
  children,
  className,
  gradientClassName = 'bg-gradient-to-r from-primary via-secondary to-accent',
  duration = 800,
  threshold = 0.2
}: GradientTextRevealProps) {
  const {
    ref,
    isInView
  } = useScrollAnimation({
    threshold,
    triggerOnce: true
  });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const show = isInView && mounted;

  // Split into per-word spans so the line wraps naturally on narrow viewports.
  // Treating the full string as one inline-block clipped headlines on iOS Safari
  // at 375px (e.g. "Conçu pour les commerces" cut at "commerc"). Each word now
  // wraps independently while keeping the gradient + transform animation.
  const words = children.split(' ');
  return <span ref={ref as React.RefObject<HTMLSpanElement>} className={cn(className)} style={{ display: 'inline', perspective: '800px', overflow: 'visible', overflowWrap: 'anywhere', maxWidth: '100%' }}>
      {words.map((word, i) => (
        <span key={i} className={cn('inline-block bg-clip-text text-transparent pb-[0.35em]', gradientClassName)} style={{
          marginRight: i < words.length - 1 ? '0.25em' : 0,
          transform: show
            ? 'translateY(0) translateZ(0) rotateX(0deg)'
            : 'translateY(60%) translateZ(-80px) rotateX(45deg)',
          opacity: show ? 1 : 0,
          transformOrigin: 'center bottom',
          transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms, opacity ${duration * 0.6}ms ease-out ${i * 60}ms`,
          willChange: 'transform, opacity',
        }}>
          {word}
        </span>
      ))}
    </span>;
}

// Split text that reveals from center
interface SplitRevealProps {
  children: string;
  className?: string;
  duration?: number;
  threshold?: number;
}
export function SplitReveal({
  children,
  className,
  duration = 800,
  threshold = 0.2
}: SplitRevealProps) {
  const {
    ref,
    isInView
  } = useScrollAnimation({
    threshold,
    triggerOnce: true
  });
  const midpoint = Math.ceil(children.length / 2);
  const firstHalf = children.slice(0, midpoint);
  const secondHalf = children.slice(midpoint);
  return <span ref={ref as React.RefObject<HTMLSpanElement>} className={cn('inline-flex', className)}>
      <span style={{
      transform: isInView ? 'translateX(0)' : 'translateX(50%)',
      opacity: isInView ? 1 : 0,
      transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
    }}>
        {firstHalf}
      </span>
      <span style={{
      transform: isInView ? 'translateX(0)' : 'translateX(-50%)',
      opacity: isInView ? 1 : 0,
      transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
    }}>
        {secondHalf}
      </span>
    </span>;
}