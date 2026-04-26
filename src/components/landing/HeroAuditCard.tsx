import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveCitation {
  query: string;
  city: string;
  vertical: string;
  cited_business: string;
  context: string;
  sources: string[];
  is_live: boolean;
}

/**
 * Punchy fluorescent audit card. Sits in the Hero's right column.
 * Triple-halo glow, animated gradient border, inner highlight, particle dust.
 */
export function HeroAuditCard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [citation, setCitation] = useState<LiveCitation | null>(null);

  // Pull a live LLM citation (rotates every 5 renders via /api/hero-citation)
  useEffect(() => {
    let mounted = true;
    fetch("/api/hero-citation")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (mounted && data) setCitation(data as LiveCitation);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !city.trim()) {
      toast({
        title: "Two quick fields",
        description: "We need a business name and a city to run the audit.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      navigate("/audit", {
        state: { businessName, city, prefilled: true },
      });
    }, 300);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* TRIPLE HALO STACK — fluorescent bloom */}
      <div
        className="absolute -inset-16 rounded-[3rem] blur-[80px] opacity-90 pointer-events-none animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.7), transparent 60%), radial-gradient(circle at 70% 80%, rgba(244,114,182,0.65), transparent 60%), radial-gradient(circle at 50% 50%, rgba(167,139,250,0.55), transparent 70%)",
          animationDuration: "4s",
        }}
      />
      <div
        className="absolute -inset-10 rounded-[2.5rem] blur-3xl opacity-80 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(167,139,250,0.45) 50%, rgba(244,114,182,0.55))",
        }}
      />
      <div
        className="absolute -inset-4 rounded-[2.2rem] blur-xl opacity-90 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(185 100% 50%), hsl(265 100% 65%) 50%, hsl(310 100% 65%))",
        }}
      />

      {/* Animated fluorescent border ring (conic) */}
      <div
        className="absolute -inset-1 rounded-[2rem] pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(185 100% 60%), hsl(265 100% 70%), hsl(310 100% 70%), hsl(185 100% 60%))",
          animation: "spin 8s linear infinite",
          filter: "blur(2px)",
          opacity: 0.95,
        }}
      />

      {/* Main card */}
      <div
        className="relative rounded-3xl p-8 sm:p-9 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(185 100% 42%) 0%, hsl(220 95% 55%) 25%, hsl(265 95% 60%) 55%, hsl(310 95% 60%) 100%)",
          boxShadow:
            "0 30px 90px -10px rgba(34,211,238,0.7), 0 20px 60px -10px rgba(167,139,250,0.6), 0 15px 50px -10px rgba(244,114,182,0.55), inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -2px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* Bright inner sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(255,255,255,0.35), transparent 50%)",
          }}
        />

        {/* Grain overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5' /></svg>\")",
          }}
        />

        {/* Floating sparkle */}
        <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.6)]">
          <Sparkles className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        </div>

        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/95 mb-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Free AI Visibility Audit · 24-hour turnaround
          </div>
          <h3 className="font-display text-3xl sm:text-4xl text-white leading-[1.05] tracking-tight mb-2 drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
            Score your site
            <br />
            <span className="italic text-white">across 6 AI engines.</span>
          </h3>
          <p className="text-sm text-white/95 leading-relaxed mb-6">
            ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot.
            Live data, 30 seconds, full report by email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business name"
              className="h-11 bg-white/95 border-white/60 text-foreground placeholder:text-foreground/50 focus-visible:ring-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              required
              aria-label="Business name"
            />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="h-11 bg-white/95 border-white/60 text-foreground placeholder:text-foreground/50 focus-visible:ring-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              required
              aria-label="City"
            />
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full h-12 rounded-full font-semibold bg-foreground text-background hover:bg-foreground/90 group shadow-[0_10px_40px_-5px_rgba(0,0,0,0.5)]"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {submitting ? "Loading..." : "Run my AI Visibility Audit"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 text-center">
            No credit card · Results in 24 hours · We hate spam too
          </p>

          {/* Live citation strip */}
          {citation && citation.is_live && (
            <div className="mt-5 pt-4 border-t border-white/30">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/85 mb-1.5 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </span>
                Live · One AI search query right now
              </div>
              <p className="text-xs text-white/95 leading-snug italic">
                "{citation.query}" → <span className="font-semibold not-italic">{citation.cited_business}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating accent pills (outside card) */}
      <div className="hidden sm:flex absolute -top-3 -left-4 px-3 py-1.5 rounded-full bg-foreground/95 backdrop-blur-sm text-[10px] font-mono uppercase tracking-[0.18em] text-background font-semibold shadow-[0_0_30px_rgba(34,211,238,0.6)] z-10">
        ★ Live data
      </div>
      <div className="hidden sm:flex absolute -bottom-3 -right-2 px-3 py-1.5 rounded-full bg-emerald-500 text-[10px] font-mono uppercase tracking-[0.18em] text-background font-semibold shadow-[0_0_30px_rgba(52,211,153,0.7)] items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Free + instant
      </div>

      {/* Particle dust */}
      <Particle className="top-[10%] left-[5%]" delay={0} />
      <Particle className="top-[80%] left-[15%]" delay={1.2} />
      <Particle className="top-[15%] right-[8%]" delay={2.4} />
      <Particle className="top-[85%] right-[15%]" delay={0.6} />
      <Particle className="top-[50%] left-[-2%]" delay={1.8} />
      <Particle className="top-[30%] right-[-2%]" delay={3} />
    </div>
  );
}

function Particle({ className, delay }: { className?: string; delay: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-1 h-1 rounded-full bg-white pointer-events-none ${className ?? ""}`}
      style={{
        boxShadow:
          "0 0 8px 2px rgba(255,255,255,0.8), 0 0 20px 4px rgba(34,211,238,0.6)",
        animation: `pulse 3s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.85,
      }}
    />
  );
}
