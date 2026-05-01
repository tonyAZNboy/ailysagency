import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/i18n/LangContext";

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
  const { t } = useLang();
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [citation, setCitation] = useState<LiveCitation | null>(null);
  const [citationLoading, setCitationLoading] = useState(true);

  // Real LLM citation pulled from Anthropic via Cloudflare Pages Function.
  // KV-cached on the edge: fresh fetch every 5th render, served warm to others.
  // No mock data — when API is unreachable, strip is hidden entirely.
  useEffect(() => {
    let mounted = true;
    fetch("/api/hero-citation")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!mounted) return;
        if (data && data.query && data.cited_business) {
          setCitation(data as LiveCitation);
        }
        setCitationLoading(false);
      })
      .catch(() => {
        if (mounted) setCitationLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!businessName.trim() || !city.trim() || !emailRegex.test(email.trim())) {
      toast({
        title: t.heroAuditCard.toastTitle,
        description: t.heroAuditCard.toastDesc,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      navigate("/audit", {
        state: { businessName, city, url, email, prefilled: true },
      });
    }, 300);
  };

  return (
    <div className="relative w-full max-w-md mx-auto isolate">
      {/* TRIPLE HALO STACK — bloom contained inside isolate so it never overflows viewport */}
      <div
        className="absolute -inset-3 sm:-inset-16 rounded-[3rem] blur-[40px] sm:blur-[80px] opacity-70 sm:opacity-90 pointer-events-none animate-pulse -z-10"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.7), transparent 60%), radial-gradient(circle at 70% 80%, rgba(244,114,182,0.65), transparent 60%), radial-gradient(circle at 50% 50%, rgba(167,139,250,0.55), transparent 70%)",
          animationDuration: "4s",
        }}
      />
      <div
        className="absolute -inset-2 sm:-inset-10 rounded-[2.5rem] blur-xl sm:blur-3xl opacity-60 sm:opacity-80 pointer-events-none -z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(167,139,250,0.45) 50%, rgba(244,114,182,0.55))",
        }}
      />
      <div
        className="absolute -inset-1 sm:-inset-4 rounded-[2.2rem] blur-md sm:blur-xl opacity-80 sm:opacity-90 pointer-events-none -z-10"
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

      {/* Main card — much tighter on mobile, full design on sm+ */}
      <div
        className="relative rounded-3xl p-4 sm:p-9 overflow-hidden"
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

        {/* Floating sparkle — anchored to top-right of card */}
        <div className="hidden sm:flex absolute top-5 right-5 w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/50 items-center justify-center pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.6)] z-10">
          <Sparkles className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        </div>

        <div className="relative">
          {/* LLM citation preview — real Anthropic-pulled data, KV-cached on the edge */}
          {citationLoading && (
            <div className="mb-3 sm:mb-5 rounded-xl bg-black/30 backdrop-blur-md border border-white/30 px-3 py-2 sm:px-3.5 sm:py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/85 mb-1 sm:mb-1.5 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-80 bg-emerald-300 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </span>
                <span>{t.heroAuditCard.citationLabel}</span>
              </div>
              <div className="h-3 sm:h-3.5 rounded bg-white/10 animate-pulse" />
            </div>
          )}
          {!citationLoading && citation && (
            <div className="mb-3 sm:mb-5 rounded-xl bg-black/30 backdrop-blur-md border border-white/30 px-3 py-2 sm:px-3.5 sm:py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white mb-1 sm:mb-1.5 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-80 bg-emerald-300 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </span>
                <span>{t.heroAuditCard.citationLabel}</span>
              </div>
              <p className="text-[11.5px] sm:text-[13px] text-white leading-snug italic line-clamp-2 sm:line-clamp-none">
                "{citation.query}" → <span className="font-semibold not-italic">{citation.cited_business}</span>
              </p>
            </div>
          )}

          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-white/95 mb-2 sm:mb-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            {t.heroAuditCard.eyebrow}
          </div>
          <h3 className="font-display text-white leading-[1.05] tracking-tight mb-1.5 sm:mb-2 drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]" style={{ fontSize: "clamp(1.125rem, 4.6vw, 2.25rem)", overflowWrap: "anywhere", maxWidth: "100%" }}>
            {t.heroAuditCard.title1}
            <br />
            <span className="italic text-white">{t.heroAuditCard.title2}</span>
          </h3>
          <p className="text-[12px] sm:text-sm text-white/95 leading-snug sm:leading-relaxed mb-3 sm:mb-6">
            {t.heroAuditCard.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
            <Input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={t.heroAuditCard.placeholderBusiness}
              className="h-11 bg-white border-white/70 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-sm sm:text-base"
              required
              aria-label={t.heroAuditCard.placeholderBusiness}
            />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t.heroAuditCard.placeholderCity}
              className="h-11 bg-white border-white/70 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-sm sm:text-base"
              required
              aria-label={t.heroAuditCard.placeholderCity}
            />
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.heroAuditCard.placeholderUrl ?? "yourbusiness.ca (optional, deeper crawl)"}
              className="h-11 bg-white border-white/70 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-sm sm:text-base"
              aria-label={t.heroAuditCard.placeholderUrl ?? "Website URL"}
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.heroAuditCard.placeholderEmail}
              className="h-11 bg-white border-white/70 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-sm sm:text-base"
              required
              aria-label={t.heroAuditCard.ariaEmail ?? "Email"}
            />
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full h-11 sm:h-12 rounded-full font-semibold bg-foreground text-background hover:bg-foreground/90 group shadow-[0_10px_40px_-5px_rgba(0,0,0,0.5)] text-sm sm:text-base"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {submitting ? t.heroAuditCard.submitLoading : t.heroAuditCard.submit}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>

          <p className="mt-2.5 sm:mt-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/85 text-center">
            {t.heroAuditCard.legal}
          </p>
        </div>
      </div>

      {/* Floating accent pills (outside card) */}
      <div className="hidden sm:flex absolute -top-3 -left-4 px-3 py-1.5 rounded-full bg-foreground/95 backdrop-blur-sm text-[10px] font-mono uppercase tracking-[0.18em] text-background font-semibold shadow-[0_0_30px_rgba(34,211,238,0.6)] z-10">
        {t.heroAuditCard.badgeLive}
      </div>
      <div className="hidden sm:flex absolute -bottom-3 -right-2 px-3 py-1.5 rounded-full bg-emerald-500 text-[10px] font-mono uppercase tracking-[0.18em] text-background font-semibold shadow-[0_0_30px_rgba(52,211,153,0.7)] items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {t.heroAuditCard.badgeFree}
      </div>

      {/* Particle dust */}
      <Particle className="top-[10%] left-[5%]" delay={0} />
      <Particle className="top-[80%] left-[15%]" delay={1.2} />
      <Particle className="top-[15%] right-[8%]" delay={2.4} />
      <Particle className="top-[85%] right-[15%]" delay={0.6} />
      <Particle className="top-[50%] left-[-2%]" delay={1.8} />
      <Particle className="top-[30%] right-[-2%]" delay={3} />

      {/* sr-only SEO content: visible to LLM bot crawlers regardless of fetch state */}
      <div className="sr-only" aria-hidden="false">{t.heroAuditCard.srSeo}</div>
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
