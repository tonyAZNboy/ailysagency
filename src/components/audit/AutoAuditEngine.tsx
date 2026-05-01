import { useState, useEffect, useRef } from "react";
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
  Globe,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  auditSourceClient,
  type AuditResult,
} from "@/integrations/audit-source/client";
import { LlmCitationMatrix } from "@/components/audit/LlmCitationMatrix";
import { PlacesPreview } from "@/components/audit/PlacesPreview";
import { SchemaPreview } from "@/components/audit/SchemaPreview";
import { CompetitorOverlay } from "@/components/audit/CompetitorOverlay";
import { ExportActionPlan } from "@/components/audit/ExportActionPlan";
import { AuditPdfDownload } from "@/components/audit/AuditPdfDownload";
import { useLang } from "@/i18n/LangContext";
import type { TranslationKeys } from "@/i18n";

interface PrefilledLocationState {
  businessName?: string;
  city?: string;
  industry?: string;
  url?: string;
  email?: string;
  prefilled?: boolean;
}

export type AuditFlavor = "gbp" | "ai-visibility";

// Typed industry options. Mirrors the 7 verticals in src/data/industries.ts.
// "other" is the fallback for anything not in the canonical list.
// Values are stable; labels are pulled from i18n at render time.
const INDUSTRY_VALUES = [
  "restaurant",
  "dentist",
  "lawyer",
  "contractor",
  "clinic",
  "real-estate",
  "hotel",
  "salon",
  "other",
] as const;

type IndustryValue = (typeof INDUSTRY_VALUES)[number];

// Map an industry value to its i18n key inside fields.industryOptions
const INDUSTRY_I18N_KEY: Record<IndustryValue, keyof TranslationKeys["audit"]["fields"]["industryOptions"]> = {
  restaurant: "restaurant",
  dentist: "dentist",
  lawyer: "lawyer",
  contractor: "contractor",
  clinic: "clinic",
  "real-estate": "realEstate",
  hotel: "hotel",
  salon: "salon",
  other: "other",
};

// Lightweight URL validator: matches the server-side check in
// /api/llm-citation-matrix. Empty string is OK (URL is optional).
function isLikelyValidUrl(s: string): boolean {
  if (!s.trim()) return true;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    return /^[a-z0-9\-.]+\.[a-z]{2,}$/i.test(u.hostname);
  } catch {
    return false;
  }
}

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
export function AutoAuditEngine({
  flavor,
  defaultIndustry = "Local business",
}: AutoAuditEngineProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLang();
  const prefill = (location.state ?? {}) as PrefilledLocationState;

  // Translated industry options for the select dropdown
  const industryOptions = INDUSTRY_VALUES.map((value) => ({
    value,
    label: t.audit.fields.industryOptions[INDUSTRY_I18N_KEY[value]],
  }));

  // `||` instead of `??` so an empty-string fallback still triggers the next default
  const [businessName, setBusinessName] = useState(prefill.businessName || "");
  // Map free-text default to typed value when possible; fallback to "other"
  const initialIndustry: IndustryValue = (() => {
    const seed = (prefill.industry || defaultIndustry || "").toLowerCase();
    const match = industryOptions.find(
      (o) =>
        o.value === seed ||
        o.label.toLowerCase() === seed ||
        seed.includes(o.value),
    );
    return (match?.value ?? "other") as IndustryValue;
  })();
  const [industry, setIndustry] = useState<IndustryValue>(initialIndustry);
  const [city, setCity] = useState(prefill.city || "");
  const [url, setUrl] = useState(prefill.url || "");
  const [email, setEmail] = useState(prefill.email || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const autoRanRef = useRef(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);

  const flavorMeta = {
    gbp: t.audit.gbp,
    "ai-visibility": t.audit.ai,
  }[flavor];

  const runAudit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!businessName.trim() || !industry.trim() || !city.trim() || !emailRegex.test(email.trim())) {
      toast({
        title: t.audit.toasts.fourThings,
        description: t.audit.toasts.fourThingsDesc,
        variant: "destructive",
      });
      return;
    }
    if (url.trim() && !isLikelyValidUrl(url.trim())) {
      toast({
        title: t.audit.toasts.badUrl,
        description: t.audit.toasts.badUrlDesc,
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    setUnlocked(false);
    try {
      // Capture lead immediately so we have the email even if they bounce before unlock
      auditSourceClient.functions
        .invoke("capture-landing-lead", {
          body: {
            name: businessName.trim(),
            email: email.trim(),
            businessName: businessName.trim(),
            chatMessages: [
              {
                role: "system",
                content: `[AiLys ${flavor === "gbp" ? "GBP Pulse" : "AI Visibility Audit"}] ${businessName} / ${industry} / ${city}`,
              },
            ],
          },
        })
        .catch(() => {
          // non-blocking; we will still try again at unlock time
        });

      const industryLabel =
        industryOptions.find((o) => o.value === industry)?.label ?? industry;
      const { data, error } = await auditSourceClient.functions.invoke(
        "reputation-audit",
        {
          body: {
            businessName: businessName.trim(),
            industry: industryLabel,
            city: city.trim(),
            url: url.trim() || undefined,
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
        err instanceof Error ? err.message : t.audit.loading.cantReach;
      toast({
        title: t.audit.toasts.auditFailed,
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-run when arriving with prefilled state from the hero card
  // (only fires when ALL fields including email are present)
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      prefill.prefilled &&
      prefill.businessName &&
      prefill.city &&
      prefill.email &&
      emailRegex.test(prefill.email) &&
      !autoRanRef.current &&
      !result &&
      !loading
    ) {
      autoRanRef.current = true;
      setTimeout(() => runAudit(), 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnlock = async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      toast({
        title: t.audit.toasts.emailLooksOff,
        description: t.audit.toasts.emailLooksOffDesc,
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
        title: t.audit.toasts.unlocked,
        description: t.audit.toasts.unlockedDesc,
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
        err instanceof Error ? err.message : t.audit.loading.cantRecord;
      toast({
        title: t.audit.toasts.cantUnlock,
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
            placeholder={t.audit.fields.businessName}
            className="bg-background/50 border-border/50 h-11"
            disabled={loading}
            aria-label={t.audit.fields.businessName}
            required
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as IndustryValue)}
              className="bg-background/50 border border-border/50 h-11 rounded-md px-3 text-base sm:text-sm appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              aria-label={t.audit.fields.industry}
              required
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2399a' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                paddingRight: "2.25rem",
              }}
            >
              {industryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t.audit.fields.city}
              className="bg-background/50 border-border/50 h-11"
              disabled={loading}
              aria-label={t.audit.fields.city}
              required
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.audit.fields.urlPlaceholder}
              className="bg-background/50 border-border/50 h-11 pl-10"
              disabled={loading}
              aria-label={t.audit.fields.url}
            />
          </div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.audit.fields.emailPlaceholder}
            className="bg-background/50 border-border/50 h-11"
            disabled={loading}
            aria-label={t.audit.fields.email}
            required
          />
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
            {t.audit.fields.legal}
          </p>
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
              {t.audit.loading.pullingData}
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
          {t.audit.results.free}
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
      businessName={businessName}
      city={city}
      url={url || undefined}
      vertical={industry}
    />
  );
}

// ─── Results panel ───────────────────────────────────────────

interface ResultsPanelProps {
  result: AuditResult;
  flavor: AuditFlavor;
  flavorMeta: TranslationKeys["audit"]["ai"];
  unlocked: boolean;
  email: string;
  setEmail: (e: string) => void;
  handleUnlock: () => void;
  submittingEmail: boolean;
  onRestart: () => void;
  navigate: ReturnType<typeof useNavigate>;
  businessName: string;
  city: string;
  url?: string;
  vertical: string;
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
  businessName,
  city,
  url,
  vertical,
}: ResultsPanelProps) {
  const { t } = useLang();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    const target = result.reputation_score;
    let raf = 0;
    const loop = (ts: number) => {
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [result.reputation_score]);

  const tier =
    result.reputation_score >= 75
      ? { label: t.audit.tiers.strong, tone: "from-emerald-400 to-cyan-400", text: "text-emerald-300" }
      : result.reputation_score >= 50
        ? { label: t.audit.tiers.solid, tone: "from-cyan-400 to-violet-400", text: "text-cyan-300" }
        : result.reputation_score >= 30
          ? { label: t.audit.tiers.gaps, tone: "from-amber-400 to-orange-400", text: "text-amber-300" }
          : { label: t.audit.tiers.critical, tone: "from-rose-500 to-pink-500", text: "text-rose-300" };

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
            {t.audit.results.runAgain}
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
              {t.audit.results.diagnosticSummary}
            </h2>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {result.diagnostic_summary}
            </p>
          </div>
        </div>
      </div>

      {/* Always-visible signal cards (free preview) */}
      <div className="grid sm:grid-cols-2 gap-4">
        <SignalBlock icon={Star} label={t.audit.results.sentiment} value={result.sentiment_breakdown} />
        <SignalBlock icon={Activity} label={t.audit.results.velocity} value={result.review_velocity} />
        <SignalBlock icon={MessageSquare} label={t.audit.results.responseRate} value={result.response_rate_analysis} />
        <SignalBlock icon={BarChart3} label={t.audit.results.platformPresence} value={result.platform_presence} />
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
                {t.audit.results.lockedSections}
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
              {t.audit.results.noSpam}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border/30">
              {[
                { icon: TrendingUp, label: t.audit.results.growthProjection },
                { icon: AlertTriangle, label: t.audit.results.weaknessAnalysis },
                { icon: BarChart3, label: t.audit.results.competitorGap },
                { icon: CheckCircle, label: t.audit.results.localSeo },
                { icon: Bot, label: t.audit.results.aiResponseSim },
                { icon: Sparkles, label: t.audit.results.actionPlanLabel },
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
              {t.audit.results.unlockedFlag} {email}
            </span>
          </div>

          <DiagnosticCard
            icon={AlertTriangle}
            tone="amber"
            label={t.audit.results.weakness}
            body={result.weakness_analysis}
          />
          <DiagnosticCard
            icon={TrendingUp}
            tone="emerald"
            label={t.audit.results.growth}
            body={result.growth_projection}
          />
          <DiagnosticCard
            icon={BarChart3}
            tone="violet"
            label={t.audit.results.competitorGap}
            body={result.competitor_gap}
          />
          <DiagnosticCard
            icon={CheckCircle}
            tone="cyan"
            label={t.audit.results.localSeo}
            body={result.local_seo_impact}
          />
          <DiagnosticCard
            icon={Bot}
            tone="rose"
            label={t.audit.results.aiSim}
            body={result.ai_response_example}
          />

          {/* Live Google Places data (real GBP, no Anthropic approximations) */}
          <PlacesPreview businessName={businessName} city={city} />

          {/* Competitor overlay: 3 nearest competitors via Places nearbysearch */}
          <CompetitorOverlay businessName={businessName} city={city} />

          {/* Real LLM citation matrix — the actual product behind the marketing.
              Renders only after unlock to control API spend (1 call per unlocked
              audit, KV-cached 24h on the edge for repeat visitors). */}
          {flavor === "ai-visibility" && (
            <LlmCitationMatrix
              businessName={businessName}
              city={city}
              url={url}
              vertical={vertical}
              autoFetch
            />
          )}

          <DiagnosticCard
            icon={Sparkles}
            tone="primary"
            label={t.audit.results.retention}
            body={result.customer_retention_insight}
          />
          <DiagnosticCard
            icon={TrendingUp}
            tone="emerald"
            label={t.audit.results.revenue}
            body={result.revenue_projection}
          />
          <DiagnosticCard
            icon={CheckCircle}
            tone="primary"
            label={t.audit.results.actionPlan}
            body={result.action_plan}
          />

          {/* Schema fix copy-paste block: generates LocalBusiness + FAQPage
              JSON-LD validated against Google Rich Results, tuned per vertical. */}
          <SchemaPreview
            businessName={businessName}
            city={city}
            url={url}
            vertical={vertical}
          />

          {/* Export action plan to Notion / Google Doc / clipboard */}
          <ExportActionPlan
            businessName={businessName}
            city={city}
            actionPlan={result.action_plan}
            score={result.reputation_score}
          />

          {/* B.4.3.b: branded 10-page PDF emailed to user (signed 24h link) */}
          <div className="flex justify-center">
            <AuditPdfDownload
              businessName={businessName}
              city={city}
              vertical={industry}
              scoreNumeric={result.reputation_score}
            />
          </div>
        </div>
      )}

      {/* Always-on cross-sells */}
      <div className="grid sm:grid-cols-2 gap-4">
        {flavor === "gbp" ? (
          <CrossLink
            title={t.audit.crossLinks.needAi}
            desc={t.audit.crossLinks.needAiDesc}
            cta={t.audit.crossLinks.needAiCta}
            onClick={() => navigate("/audit")}
          />
        ) : (
          <CrossLink
            title={t.audit.crossLinks.needGbp}
            desc={t.audit.crossLinks.needGbpDesc}
            cta={t.audit.crossLinks.needGbpCta}
            onClick={() => navigate("/audit/gbp")}
          />
        )}
        <CrossLink
          title={t.audit.crossLinks.talkHuman}
          desc={t.audit.crossLinks.talkHumanDesc}
          cta={t.audit.crossLinks.talkHumanCta}
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
