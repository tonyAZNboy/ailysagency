import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, MapPin } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { NapPulseEngine } from "@/components/audit/NapPulseEngine";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";

/**
 * /audit/nap = NAP (Name / Address / Phone) consistency audit.
 *
 * Self-assessment: 25 directory checks, weighted score, action plan.
 * Completes the audit triad alongside /audit/ai-visibility and /audit/gbp.
 *
 * Lead-magnet: results page links to GBP Pulse (cross-sell) and book-call.
 * Quebec-tuned: includes PJ.ca, Canada411, CCMM, FCEI, sectorial registries.
 */

export default function AuditNapPulse() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();

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
        <title>NAP Pulse audit · Free name/address/phone consistency check · AiLys Agency</title>
        <meta
          name="description"
          content="Free NAP (Name/Address/Phone) consistency audit across 25 directories. Weighted score, top-5 action plan, Quebec-tuned. Bilingual EN/FR."
        />
        <link rel="canonical" href="https://www.ailysagency.ca/audit/nap" />
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#FBBF24"
        lineColor="#22D3EE"
        nodeCount={22}
        mobileNodeCount={12}
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
              {T("Back to audits", "Retour aux audits")}
            </Link>

            <header className="mb-8">
              <div className="ailys-section-no mb-6">
                <span>{T("NAP audit", "Audit NAP")}</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-cyan-400/20 border border-amber-400/30 items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {T("Is your business", "Votre entreprise")}
                    <br />
                    <span className="italic bg-gradient-to-r from-amber-400 via-secondary to-accent bg-clip-text text-transparent">
                      {T("the same on every map?", "est-elle la même sur toutes les cartes?")}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                    {T(
                      "Self-assessment across 25 directories that AI engines and Google use to verify your business identity. Weighted score, top-5 action plan, 2 minutes total. No login, no email.",
                      "Auto-évaluation sur 25 répertoires que les moteurs IA et Google utilisent pour vérifier l'identité de votre entreprise. Score pondéré, plan d'action top 5, 2 minutes au total. Aucune connexion, aucun courriel.",
                    )}
                  </p>
                </div>
              </div>
            </header>

            <NapPulseEngine />

            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              <Link
                to={isFr ? "/fr/audit/gbp" : "/audit/gbp"}
                className="group rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 hover:border-primary/50 transition-all"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  {T("Companion audit", "Audit complémentaire")}
                </div>
                <div className="font-display text-lg group-hover:text-primary transition-colors">
                  {T("GBP Pulse · 90 sec", "GBP Pulse · 90 sec")}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {T(
                    "Score your Google Business Profile across 10 weighted signals.",
                    "Évaluez votre fiche Google Business Profile sur 10 signaux pondérés.",
                  )}
                </p>
              </Link>
              <Link
                to={isFr ? "/fr/audit/ai-visibility" : "/audit/ai-visibility"}
                className="group rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 hover:border-primary/50 transition-all"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  {T("Companion audit", "Audit complémentaire")}
                </div>
                <div className="font-display text-lg group-hover:text-primary transition-colors">
                  {T("AI Visibility · full report", "Visibilité IA · rapport complet")}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {T(
                    "Are you cited by ChatGPT, Perplexity, Gemini? Live data, 30 sec.",
                    "Êtes-vous cité par ChatGPT, Perplexity, Gemini? Données réelles, 30 sec.",
                  )}
                </p>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
