import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff } from "lucide-react";

interface OptimizedImageProps {
  src: string | undefined | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  fallbackIcon?: React.ReactNode;
  onError?: () => void;
  showErrorState?: boolean;
  /** Phase E.16: explicit width hint for browser layout reservation. Reduces CLS. */
  width?: number;
  /** Phase E.16: explicit height hint for browser layout reservation. Reduces CLS. */
  height?: number;
  /** Phase E.16: priority hint for above-the-fold images. Skips IntersectionObserver. */
  priority?: boolean;
  /** Phase E.16: native fetchpriority hint (high|low|auto). Browser-side resource prioritization. */
  fetchPriority?: "high" | "low" | "auto";
}

export function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio,
  fallbackIcon,
  onError,
  showErrorState = true,
  width,
  height,
  priority = false,
  fetchPriority = "auto",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  // Priority images bypass the IntersectionObserver (load immediately)
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for true lazy loading
  useEffect(() => {
    if (priority) return; // Skip observer for above-the-fold images
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [priority]);

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // No src provided
  if (!src) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        containerClassName
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton placeholder - shows while loading */}
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Error state */}
      {hasError && showErrorState && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          {fallbackIcon || <ImageOff className="w-6 h-6 text-muted-foreground" />}
        </div>
      )}

      {/* Actual image - only render when in view (or always for priority) */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={fetchPriority}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
        />
      )}
    </div>
  );
}
