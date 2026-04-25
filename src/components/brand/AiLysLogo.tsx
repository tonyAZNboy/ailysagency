import { FleurDeLys } from "./FleurDeLys";

interface AiLysLogoProps {
  variant?: "wordmark" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AiLysLogo({
  variant = "wordmark",
  size = "md",
  className = "",
}: AiLysLogoProps) {
  const sizeMap = {
    sm: { mark: 22, text: "text-base", agency: "text-[10px]" },
    md: { mark: 28, text: "text-xl", agency: "text-[11px]" },
    lg: { mark: 40, text: "text-3xl", agency: "text-sm" },
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="AiLys Agency"
    >
      <FleurDeLys size={sizeMap.mark} fill="gradient" />
      <span className="inline-flex items-baseline gap-1.5">
        <span className={`${sizeMap.text} font-bold tracking-tight leading-none`}>
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Ai
          </span>
          <span className="text-foreground">Lys</span>
        </span>
        {variant === "full" && (
          <span
            className={`${sizeMap.agency} font-mono uppercase tracking-[0.18em] text-muted-foreground/80 leading-none`}
          >
            Agency
          </span>
        )}
      </span>
    </span>
  );
}
