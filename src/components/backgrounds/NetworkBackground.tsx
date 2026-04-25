import { useEffect, useRef, useCallback, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
}

interface NetworkBackgroundProps {
  className?: string;
  backgroundColor?: string;
  nodeColor?: string;
  lineColor?: string;
  nodeCount?: number;
  connectionDistance?: number;
  mouseInfluenceRadius?: number;
  mouseInfluenceStrength?: number;
}

export function NetworkBackground({
  className = '',
  backgroundColor = '#050505',
  nodeColor = '#00f3ff',
  lineColor = '#00f3ff',
  nodeCount = 80,
  mobileNodeCount = 30,
  connectionDistance = 150,
  mouseInfluenceRadius = 200,
  mouseInfluenceStrength = 0.15,
}: NetworkBackgroundProps & { mobileNodeCount?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Get effective node count based on device
  const effectiveNodeCount = isMobile ? mobileNodeCount : nodeCount;

  // Initialize nodes
  const initNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    for (let i = 0; i < effectiveNodeCount; i++) {
      const baseRadius = Math.random() * 2 + 1.5;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: baseRadius,
        baseRadius,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;
  }, [effectiveNodeCount]);

  // Animation loop
  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const nodes = nodesRef.current;
    const mouse = mouseRef.current;

    // Update and draw nodes
    nodes.forEach((node, i) => {
      // Apply mouse influence
      const dx = mouse.x - node.x;
      const dy = mouse.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseInfluenceRadius && distance > 0) {
        const force = (1 - distance / mouseInfluenceRadius) * mouseInfluenceStrength;
        node.vx += (dx / distance) * force;
        node.vy += (dy / distance) * force;
      }

      // Update position with reduced motion check
      if (!prefersReducedMotion) {
        node.x += node.vx;
        node.y += node.vy;
        
        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Wrap around edges
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
        
        // Pulse effect
        node.pulsePhase += 0.02;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.5;
      }

      // Draw connections to nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const cdx = node.x - other.x;
        const cdy = node.y - other.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        
        if (cdist < connectionDistance) {
          const opacity = (1 - cdist / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `${lineColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      // Draw node with glow effect
      const glowRadius = node.radius * 3;
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, glowRadius
      );
      gradient.addColorStop(0, nodeColor);
      gradient.addColorStop(0.3, `${nodeColor}88`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core node
      ctx.beginPath();
      ctx.fillStyle = nodeColor;
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame((t) => animate(ctx, width, height, t));
  }, [backgroundColor, nodeColor, lineColor, connectionDistance, mouseInfluenceRadius, mouseInfluenceStrength, prefersReducedMotion]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Handle touch movement
  const handleTouchMove = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.touches[0]) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Reinitialize nodes on resize
      initNodes(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    animate(ctx, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height, 0);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initNodes, animate, handleMouseMove, handleTouchMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        zIndex: -1,
        background: backgroundColor,
      }}
      aria-hidden="true"
    />
  );
}
