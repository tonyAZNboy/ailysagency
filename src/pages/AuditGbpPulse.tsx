import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Activity } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { AutoAuditEngine } from "@/components/audit/AutoAuditEngine";

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
              to="/audit"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Switch to AI Visibility Audit
            </Link>

            <header className="mb-10">
              <div className="ailys-section-no mb-6">
                <span>GBP Pulse · Live data audit</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                    Pulse your Google
                    <br />
                    <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      Business Profile.
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                    Live data audit. We pull your GBP, review velocity, and
                    citation footprint, then score 14 reputation signals.
                    Score on screen in 30 seconds. Full action plan emailed.
                  </p>
                </div>
              </div>
            </header>

            <AutoAuditEngine flavor="gbp" />
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
