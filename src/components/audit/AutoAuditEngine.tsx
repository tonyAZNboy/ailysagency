import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Loader2,
  Lock,
  Send,
  Sparkles,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Star,
  MessageSquare,
  Bot,
  Calendar,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  auditSourceClient,
  type AuditResult,
} from "@/integrations/audit-source/client";

export type AuditFlavor = "gbp" | "ai-visibility";

interface AutoAuditEngineProps {
  flavor: AuditFlavor;
  /** Optional default industry, used by /audit (more general) */
  defaultIndustry?: string;
}

/**
 * Auto audit engine, shared by both /audit/gbp (GBP Pulse) and
 * /audit (AI Visibility Audit). Calls Reviuzy's reputation-audit edge function,
 * renders an animated score, gates the full diagnostic behind email capture,
 * sends the full report by email on unlock.
 */
export function AutoAuditEngine({ flavor, defaultIndustry = "" }: AutoAuditEngineProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState(defaultIndustry);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submittingEmail, setSubmittingEmail] = useState(false);

  const flavorMeta = {
    gbp: {
      eyebrow: "GBP Pulse · Auto-audit",
      headline: "Pulse your Google Business Profile.",
      sub: "We pull your live GBP data, score 14 reputation signals, and surface the three highest-leverage fixes. 30 seconds.",
      ctaPrimary: "Run my GBP Pulse",
      lockTitle: "Unlock the full GBP report",
      lockDesc:
        "Enter your email to see the full action plan, competitor gap analysis, and revenue projection. No spam, no calls.",
      sendCopy: "Send me the full GBP report",
    },
    "ai-visibility": {
      eyebrow: "AI Visibility Audit · Auto-audit",
      headline: "See if AI engines cite you.",
      sub: "We scan your live web footprint, score AEO + GEO + E-E-A-T signals, and project where you sit vs competitors across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot.",
      ctaPrimary: "Run my AI Visibility Audit",
      lockTitle: "Unlock your full AI Visibility report",
      lockDesc:
        "Enter your email to see the 90-day action plan, competitor gap, AI response simulation, and revenue projection. We will email a PDF you can share.",
      sendCopy: "Email me the full report",
    },
  }[flavor];

  const runAudit = async () => {
    if (!businessName.trim() || !industry.trim() || !city.trim()) {
      toast({
        title: "We need three things",
        description: "Business name, industry, and city.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    setUnlocked(false);
    try {
      const { data, error } = await auditSourceClient.functions.invoke(
        "reputation-audit",
        {
          body: {
            businessName: businessName.trim(),
            industry: industry.trim(),
            city: city.trim(),
            lang: "en",
          },
        },
      );
      if (error) throw error;
      const payload = data as AuditResult & { error?: string };
      if (payload?.error) throw new Error(payload.error);
      setResult(payload);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "We could not reach the audit engine.";
      toast({
        title: "Audit failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      toast({
        title: "Email looks off",
        description: "Try again with a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setSubmittingEmail(true);
    try {
      // Capture lead
      await auditSourceClient.functions.invoke("capture-landing-lead", {
        body: {
          name: businessName.trim(),
          email: trimmed,
          businessName: businessName.trim(),
          chatMessages: [
            {
              role: "system",
              content: `[AiLys ${flavor === "gbp" ? "GBP Pulse" : "AI Visibility Audit"}] ${businessName} / ${industry} / ${city}`,
            },
          ],
        },
      });
      setUnlocked(true);
      toast({
        title: "Unlocked",
        description: "Full report on screen and on its way to your inbox.",
      });
      // Send email report (non-blocking)
      auditSourceClient.functions
        .invoke("send-audit-report", {
          body: {
            email: trimmed,
            businessName: businessName.trim(),
            auditResult: result,
            lang: "en",
          },
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("Email send failed:", err);
        });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "We could not record your email.";
      toast({
        title: "Could not unlock",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setSubmittingEmail(false);
    }
  };

  // ── No result yet → show input form
  if (!result) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90 mb-3">
          {flavorMeta.eyebrow}
        </div>
        <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-3 leading-tight">
          {flavorMeta.headline}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-prose">
          {flavorMeta.sub}
        </p>

        <div className="space-y-3 mb-5">
          <Input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business name"
            className="bg-background/50 border-border/50 h-11"
            disabled={loading}
            aria-label="Business name"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Industry (Restaurant, Dentist, Lawyer, etc.)"
              className="bg-background/50 border-border/50 h-11"
              disabled={loading}
              aria-label="Industry"
            />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="bg-background/50 border-border/50 h-11"
              disabled={loading}
              aria-label="City"
            />
          </div>
        </div>

        <Button
          onClick={runAudit}
          disabled={loading}
          size="lg"
          className="w-full rounded-full font-semibold"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            boxShadow: "0 0 24px -8px hsl(var(--primary) / 0.5)",
          }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Pulling live data...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              {flavorMeta.ctaPrimary}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-center text-muted-foreground/70 font-mono uppercase tracking-[0.18em]">
          Free · No credit card · 30 seconds
        </p>
      </div>
    );
  }

  // ── Result rendering
  return (
    <ResultsPanel
      result={result}
      flavor={flavor}
      flavorMeta={flavorMeta}
      unlocked={unlocked}
      email={email}
      setEmail={setEmail}
      handleUnlock={handleUnlock}
      submittingEmail={submittingEmail}
      onRestart={() => {
        setResult(null);
        setUnlocked(false);
        setEmail("");
      }}
      navigate={navigate}
    />
  );
}

// ─── Results panel ───────────────────────────────────────────

interface ResultsPanelProps {
  result: AuditResult;
  flavor: AuditFlavor;
  flavorMeta: {
    eyebrow: string;
    headline: string;
    sub: string;
    ctaPrimary: string;
    lockTitle: string;
    lockDesc: string;
    sendCopy: string;
  };
  unlocked: boolean;
  email: string;
  setEmail: (e: string) => void;
  handleUnlock: () => void;
  submittingEmail: boolean;
  onRestart: () => void;
  navigate: ReturnType<typeof useNavigate>;
}

function ResultsPanel({
  result,
  flavor,
  flavorMeta,
  unlocked,
  email,
  setEmail,
  handleUnlock,
  submittingEmail,
  onRestart,
  navigate,
}: ResultsPanelProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    const target = result.reputation_score;
    let raf = 0;
    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [result.reputation_score]);

  const tier =
    result.reputation_score >= 75
      ? { label: "Strong", tone: "from-emerald-400 to-cyan-400", text: "text-emerald-300" }
      : result.reputation_score >= 50
        ? { label: "Solid foundation", tone: "from-cyan-400 to-violet-400", text: "text-cyan-300" }
        : result.reputation_score >= 30
          ? { label: "Real gaps", tone: "from-amber-400 to-orange-400", text: "text-amber-300" }
          : { label: "Critical gaps", tone: "from-rose-500 to-pink-500", text: "text-rose-300" };

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const dash = (animated / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Hero score reveal */}
      <div className="rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_80px_-20px_hsl(var(--primary)/0.5)]">
        <div className="flex items-center justify-between mb-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90">
            {flavorMeta.eyebrow}
          </div>
          <button
            onClick={onRestart}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Run again
          </button>
        </div>

        <div className="grid sm:grid-cols-[200px_1fr] gap-8 items-center mt-6">
          {/* Radial gauge */}
          <div className="relative w-[200px] h-[200px] mx-auto sm:mx-0">
            <svg width="200" height="200" className="transform -rotate-90">
              <defs>
                <linearGradient id="auto-pulse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(185 100% 55%)" />
                  <stop offset="50%" stopColor="hsl(265 90% 65%)" />
                  <stop offset="100%" stopColor="hsl(310 90% 65%)" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                opacity="0.3"
              />
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#auto-pulse-grad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                style={{ transition: "stroke-dasharray 0.05s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-display text-6xl tabular-nums leading-none bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                {animated}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mt-1">
                / 100
              </div>
            </div>
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${tier.tone} mb-4`}
            >
              {tier.label}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-3 leading-tight">
              Diagnostic summary.
            </h2>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {result.diagnostic_summary}
            </p>
          </div>
        </div>
      </div>

      {/* Always-visible signal cards (free preview) */}
      <div className="grid sm:grid-cols-2 gap-4">
        <SignalBlock icon={Star} label="Sentiment" value={result.sentiment_breakdown} />
        <SignalBlock icon={Activity} label="Review velocity" value={result.review_velocity} />
        <SignalBlock icon={MessageSquare} label="Response rate" value={result.response_rate_analysis} />
        <SignalBlock icon={BarChart3} label="Platform presence" value={result.platform_presence} />
      </div>

      {/* Locked / Unlocked deeper sections */}
      {!unlocked ? (
        <div className="relative rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/[0.07] via-rose-500/[0.04] to-transparent backdrop-blur-md p-6 sm:p-8 overflow-hidden">
          {/* Locked content preview, blurred */}
          <div className="absolute inset-0 pointer-events-none opacity-40 blur-md select-none p-6 sm:p-8">
            <div className="space-y-3 text-xs">
              <div className="h-3 bg-foreground/30 rounded w-3/4" />
              <div className="h-3 bg-foreground/30 rounded w-5/6" />
              <div className="h-3 bg-foreground/30 rounded w-2/3" />
              <div className="h-3 bg-foreground/30 rounded w-4/5" />
              <div className="h-3 bg-foreground/30 rounded w-3/4" />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-amber-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
                Locked sections
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mb-2">
              {flavorMeta.lockTitle}
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-prose">
              {flavorMeta.lockDesc}
            </p>

            <div className="grid sm:grid-cols-[1fr_auto] gap-3 max-w-xl">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@business.ca"
                className="bg-background/60 border-border/50 h-11"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUnlock();
                }}
              />
              <Button
                onClick={handleUnlock}
                disabled={submittingEmail}
                className="rounded-full font-semibold whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                }}
              >
                {submittingEmail ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {flavorMeta.sendCopy}
                  </>
                )}
              </Button>
            </div>
            <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
              No spam. We email you the full PDF and stop. You can unsubscribe in one click.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border/30">
              {[
                { icon: TrendingUp, label: "Growth projection" },
                { icon: AlertTriangle, label: "Weakness analysis" },
                { icon: BarChart3, label: "Competitor gap" },
                { icon: CheckCircle, label: "Local SEO impact" },
                { icon: Bot, label: "AI response simulation" },
                { icon: Sparkles, label: "90-day action plan" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <item.icon className="w-3.5 h-3.5 text-amber-300/70" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
              Unlocked · full report sent to {email}
            </span>
          </div>

          <DiagnosticCard
            icon={AlertTriangle}
            tone="amber"
            label="Weakness analysis"
            body={result.weakness_analysis}
          />
          <DiagnosticCard
            icon={TrendingUp}
            tone="emerald"
            label="Growth projection"
            body={result.growth_projection}
          />
          <DiagnosticCard
            icon={BarChart3}
            tone="violet"
            label="Competitor gap"
            body={result.competitor_gap}
          />
          <DiagnosticCard
            icon={CheckCircle}
            tone="cyan"
            label="Local SEO impact"
            body={result.local_seo_impact}
          />
          <DiagnosticCard
            icon={Bot}
            tone="rose"
            label="AI response simulation"
            body={result.ai_response_example}
          />
          <DiagnosticCard
            icon={Sparkles}
            tone="primary"
            label="Customer retention insight"
            body={result.customer_retention_insight}
          />
          <DiagnosticCard
            icon={TrendingUp}
            tone="emerald"
            label="Revenue projection"
            body={result.revenue_projection}
          />
          <DiagnosticCard
            icon={CheckCircle}
            tone="primary"
            label="90-day action plan"
            body={result.action_plan}
          />
        </div>
      )}

      {/* Always-on cross-sells */}
      <div className="grid sm:grid-cols-2 gap-4">
        {flavor === "gbp" ? (
          <CrossLink
            title="Want the full AI Visibility analysis?"
            desc="GBP is one input. The AI Visibility Audit checks AEO, GEO, E-E-A-T across 6 LLM engines."
            cta="Run AI Visibility Audit"
            onClick={() => navigate("/audit")}
          />
        ) : (
          <CrossLink
            title="Need a faster GBP-only snapshot?"
            desc="GBP Pulse focuses on Google Business Profile signals. 30 seconds, instant score."
            cta="Run GBP Pulse"
            onClick={() => navigate("/audit/gbp")}
          />
        )}
        <CrossLink
          title="Walk through this with a human?"
          desc="60-min strategy call in EN, FR-CA, ES, ZH, AR, RU, UK, SR. Free, no pitch."
          cta="Book a strategy call"
          icon="calendar"
          onClick={() => navigate("/book-call")}
        />
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────

function SignalBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Star;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-md p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
          {label}
        </span>
      </div>
      <p className="text-sm text-foreground/85 leading-relaxed">{value}</p>
    </div>
  );
}

function DiagnosticCard({
  icon: Icon,
  label,
  body,
  tone,
}: {
  icon: typeof Star;
  label: string;
  body: string;
  tone: "amber" | "emerald" | "violet" | "cyan" | "rose" | "primary";
}) {
  const toneMap = {
    amber: { border: "border-amber-400/30", bg: "bg-amber-500/[0.05]", icon: "text-amber-300" },
    emerald: { border: "border-emerald-400/30", bg: "bg-emerald-500/[0.05]", icon: "text-emerald-300" },
    violet: { border: "border-violet-400/30", bg: "bg-violet-500/[0.05]", icon: "text-violet-300" },
    cyan: { border: "border-cyan-400/30", bg: "bg-cyan-500/[0.05]", icon: "text-cyan-300" },
    rose: { border: "border-rose-400/30", bg: "bg-rose-500/[0.05]", icon: "text-rose-300" },
    primary: { border: "border-primary/30", bg: "bg-primary/[0.05]", icon: "text-primary" },
  }[tone];

  return (
    <div className={`rounded-2xl border ${toneMap.border} ${toneMap.bg} backdrop-blur-md p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${toneMap.icon}`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/85">
          {label}
        </span>
      </div>
      <p className="text-sm sm:text-base text-foreground/85 leading-relaxed whitespace-pre-line">
        {body}
      </p>
    </div>
  );
}

function CrossLink({
  title,
  desc,
  cta,
  onClick,
  icon = "arrow",
}: {
  title: string;
  desc: string;
  cta: string;
  onClick: () => void;
  icon?: "arrow" | "calendar" | "mail";
}) {
  const Icon = icon === "calendar" ? Calendar : icon === "mail" ? Mail : ArrowRight;
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-md p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80 mb-2">
        {title}
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{desc}</p>
      <Button
        onClick={onClick}
        variant="outline"
        size="sm"
        className="rounded-full border-primary/40 hover:bg-primary/10"
      >
        <Icon className="w-3.5 h-3.5 mr-1.5" />
        {cta}
      </Button>
    </div>
  );
}
