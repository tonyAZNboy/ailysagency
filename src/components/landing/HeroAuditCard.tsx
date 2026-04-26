import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Loader2, Quote } from "lucide-react";
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
 * Punchy gradient audit card. Sits in the Hero's right column on desktop.
 * AiLys brand version of Prostar SEO's pink audit form, in cyan→violet→fuchsia.
 */
export function HeroAuditCard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      {/* Outer halo */}
      <div className="absolute -inset-8 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-[2rem] blur-3xl opacity-60 pointer-events-none" />

      {/* Card */}
      <div
        className="relative rounded-3xl p-8 sm:p-9 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(185 100% 45%), hsl(265 90% 55%) 50%, hsl(310 90% 55%))",
          boxShadow:
            "0 20px 60px -15px hsl(265 90% 55% / 0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
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
        <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center pointer-events-none">
          <Sparkles className="w-5 h-5 text-white" />
        </div>

        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 mb-3">
            Free AI Visibility Audit
          </div>
          <h3 className="font-display text-3xl sm:text-4xl text-white leading-[1.05] tracking-tight mb-2">
            Score your site
            <br />
            <span className="italic text-white/95">across 6 AI engines.</span>
          </h3>
          <p className="text-sm text-white/85 leading-relaxed mb-6">
            ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot.
            Live data, 30 seconds, full report by email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business name"
              className="h-11 bg-white/95 border-white/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-white/50"
              required
              aria-label="Business name"
            />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="h-11 bg-white/95 border-white/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-white/50"
              required
              aria-label="City"
            />
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full h-12 rounded-full font-semibold bg-foreground text-background hover:bg-foreground/90 group"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {submitting ? "Loading..." : "Run my audit"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75 text-center">
            No credit card · Results in 24 hours
          </p>
        </div>
      </div>

      {/* Floating engine pills */}
      <div className="hidden sm:flex absolute -top-3 -left-4 px-3 py-1.5 rounded-full bg-foreground/95 backdrop-blur-sm text-[10px] font-mono uppercase tracking-[0.18em] text-background font-semibold shadow-lg">
        ★ Live data
      </div>
      <div className="hidden sm:flex absolute -bottom-3 -right-2 px-3 py-1.5 rounded-full bg-emerald-500 text-[10px] font-mono uppercase tracking-[0.18em] text-background font-semibold shadow-lg items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Free + instant
      </div>
    </div>
  );
}
