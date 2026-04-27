import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Activity, Sparkles } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { GbpPulseEngine } from "@/components/audit/GbpPulseEngine";
import { AutoAuditEngine } from "@/components/audit/AutoAuditEngine";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";

/**
 * /audit/gbp = two-tier GBP audit.
 *
 * Tier 1 (default): GbpPulseEngine — instant client-side self-assessment,
 *   8 questions, 10 weighted signals, no email gate, results in 90 seconds.
 *   Shareable URL, localStorage-persisted.
 *
 * Tier 2 (toggle): AutoAuditEngine flavor="gbp" — AI-backed deep audit via
 *   Reviuzy reputation-audit edge function, Anthropic-powered diagnostic,
 *   email-gated full report.
 *
 * Strategy: most visitors run Tier 1 first (no friction), then upgrade to
 * Tier 2 when they want the AI-generated 90-day plan. Two products, one URL.
 */

export default function AuditGbpPulse() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();
  // "pulse" = client-side self-assessment (default). "deep" = AI-backed audit.
  const [mode, setMode] = useState<"pulse" | "deep">("pulse");

  // Sync URL lang param into context
  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  const isFr = lang === "fr";
  const T = (en: string, fr: string) => (isFr ? fr : en);

  return (
    <>
      <Helmet>
        <title>GBP Pulse · Instant Google Business Profile audit · AiLys Agency</title>
        <meta
          name="description"
          content="Instant Google Business Profile audit with live data. Score 14 reputation signals. Free, 30 seconds, email gate for full report. Bilingual."
        />
        <link rel="canonical" href="https://www.ailysagency.ca/audit/gbp" />
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={24}
        mobileNodeCount={14}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.13}
      />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to={isFr ? "/fr/audit" : "/audit"}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {T("Switch to AI Visibility Audit", "Passer à l'audit de visibilité IA")}
            </Link>

            <header className="mb-8">
              <div className="ailys-section-no mb-6">
                <span>{T("GBP audit", "Audit GBP")}</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {mode === "pulse" ? (
                      <>
                        {T("Pulse your Google", "Évaluez votre fiche")}
                        <br />
                        <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                          {T("Business Profile.", "Google.")}
                        </span>
                      </>
                    ) : (
                      <>
                        {T("Deep AI audit of your", "Audit IA approfondi de vos")}
                        <br />
                        <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                          {T("GBP signals.", "signaux GBP.")}
                        </span>
                      </>
                    )}
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                    {mode === "pulse"
                      ? T(
                          "Self-assessment, instant client-side score across 10 weighted signals. 8 questions, 90 seconds total. No login, no email.",
                          "Auto-évaluation, score instantané côté client sur 10 signaux pondérés. 8 questions, 90 secondes au total. Aucune connexion, aucun courriel.",
                        )
                      : T(
                          "AI-backed deep diagnostic via Anthropic Claude. Full 90-day action plan, competitor gap analysis, revenue projection. Email gate for the full report.",
                          "Diagnostic approfondi alimenté par Anthropic Claude. Plan d'action 90 jours complet, analyse de l'écart concurrentiel, projection de revenus. Courriel requis pour le rapport complet.",
                        )}
                  </p>
                </div>
              </div>
            </header>

            {/* Mode toggle — segmented control */}
            <div className="mb-8 inline-flex p-1 rounded-full border border-border/50 bg-card/40 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setMode("pulse")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  mode === "pulse"
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Activity className="w-3.5 h-3.5 inline mr-1.5" />
                {T("Pulse · 90 sec", "Pulse · 90 sec")}
              </button>
              <button
                type="button"
                onClick={() => setMode("deep")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  mode === "deep"
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                {T("Deep AI · full report", "IA approfondie · rapport complet")}
              </button>
            </div>

            {mode === "pulse" ? <GbpPulseEngine /> : <AutoAuditEngine flavor="gbp" />}
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
