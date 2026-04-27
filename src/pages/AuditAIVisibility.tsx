import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Brain } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { AutoAuditEngine } from "@/components/audit/AutoAuditEngine";
import { useLang } from "@/i18n/LangContext";

export default function AuditAIVisibility() {
  const { t } = useLang();
  const aiVisPage = (t.audit as typeof t.audit & {
    aiVisPage?: {
      eyebrow: string;
      title1: string;
      title2: string;
      subtitle: string;
      switchToGbp: string;
    };
  }).aiVisPage ?? {
    eyebrow: "AI Visibility Audit · Live data",
    title1: "Are you cited by",
    title2: "ChatGPT, Perplexity & Google AIO?",
    subtitle:
      "Live data audit. We scan your business across 6 AI search engines, score AEO + GEO + E-E-A-T signals, and project where you sit vs competitors. Free, 30 seconds.",
    switchToGbp: "Switch to GBP Pulse",
  };
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Visibility Audit · Free, instant · AiLys Agency</title>
        <meta
          name="description"
          content="Free AI Visibility Audit. We score AEO, GEO, and E-E-A-T across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. Live data, 30 seconds, full report by email."
        />
        <link rel="canonical" href="https://www.ailysagency.ca/audit" />
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#A78BFA"
        lineColor="#22D3EE"
        nodeCount={26}
        mobileNodeCount={14}
        connectionDistance={140}
        mouseInfluenceRadius={220}
        mouseInfluenceStrength={0.13}
      />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/audit/gbp"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {aiVisPage.switchToGbp}
            </Link>

            <header className="mb-10">
              <div className="ailys-section-no mb-6">
                <span>{aiVisPage.eyebrow}</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/30 items-center justify-center">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    {aiVisPage.title1}
                    <br />
                    <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      {aiVisPage.title2}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                    {aiVisPage.subtitle}
                  </p>
                </div>
              </div>
            </header>

            <AutoAuditEngine flavor="ai-visibility" />
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
