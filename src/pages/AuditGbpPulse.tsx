import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Activity } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { GbpPulseEngine } from "@/components/audit/GbpPulseEngine";

export default function AuditGbpPulse() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  return (
    <>
      <Helmet>
        <title>GBP Pulse · Instant Google Business Profile audit · AiLys Agency</title>
        <meta
          name="description"
          content="90-second self-assessment of your Google Business Profile. Score across 10 weighted signals. Free, instant, no email. Pairs with the AI Visibility Audit for full AEO/GEO/E-E-A-T scoring."
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
              to="/audit"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Switch to AI Visibility Audit
            </Link>

            <header className="mb-10">
              <div className="ailys-section-no mb-6">
                <span>GBP Pulse · Instant audit</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    Score your Google
                    <br />
                    <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      Business Profile in 90 seconds.
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                    Ten weighted signals. Self-assessment, no login required.
                    You walk away with a score, the three highest-leverage fixes,
                    and a per-signal breakdown. Instant.
                  </p>
                </div>
              </div>
            </header>

            {/* Honesty banner */}
            <div className="mb-10 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80 flex-shrink-0">
                Honest framing
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The Pulse is a self-assessment. We score the answers you give
                us, not your live GBP data. For real-time, deep analysis across
                6 LLM engines plus AEO and GEO scoring, run the{" "}
                <Link to="/audit" className="text-primary hover:underline">
                  AI Visibility Audit
                </Link>
                .
              </p>
            </div>

            <GbpPulseEngine />
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
