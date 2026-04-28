import {
  Shield,
  Star,
  MessageSquareQuote,
  Bot,
  ChevronRight,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ScrollReveal,
  TextReveal,
  GradientTextReveal,
  MagneticWrapper,
  ParallaxLayer,
  ParallaxBackground,
  FloatingElement,
} from "@/components/animation";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";
import { LiveTicker } from "./LiveTicker";
import { HeroAuditCard } from "./HeroAuditCard";

const industries = [
  "Restaurants",
  "Dentists",
  "Lawyers",
  "Salons",
  "Contractors",
  "Clinics",
  "Real Estate",
  "Hotels",
];

export function HeroSection() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <section
      className="relative min-h-[92vh] flex items-center px-4 pt-32 sm:pt-28 lg:pt-28 pb-10 overflow-hidden max-w-[100vw]"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/ProfessionalService"
    >
      <meta itemProp="name" content="AiLys Agency" />
      <meta
        itemProp="serviceType"
        content="LLM Visibility & Optimization Agency (AEO · GEO · E-E-A-T)"
      />
      <meta itemProp="areaServed" content="Quebec, Canada, US, Latin America" />

      {/* Animated background — softer, less constellation-y */}
      <ParallaxBackground>
        <ParallaxLayer strength={30} inverted>
          <FloatingElement amplitude={15} duration={4} delay={0}>
            <div
              className="absolute top-16 left-8 w-72 h-72 bg-primary/15 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </FloatingElement>
        </ParallaxLayer>
        <ParallaxLayer strength={20}>
          <FloatingElement amplitude={20} duration={5} delay={1}>
            <div
              className="absolute bottom-24 right-8 w-96 h-96 bg-secondary/15 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </FloatingElement>
        </ParallaxLayer>
        <ParallaxLayer strength={15} inverted>
          <FloatingElement amplitude={10} duration={6} delay={0.5}>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-accent/5 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </FloatingElement>
        </ParallaxLayer>
      </ParallaxBackground>

      {/* Two-column layout: copy left, answer-engine visual right.
          On mobile (single column) the copy is split into two blocks so the
          audit card sits between the subheadline and the 3-card flow. On
          desktop the audit card spans both rows in the right column. */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-y-7 gap-x-10 lg:gap-x-14 lg:gap-y-0 items-start lg:items-center">
        {/* COPY BLOCK 1 — eyebrow + headline + subheadline (above audit card on mobile) */}
        <div className="min-w-0 text-center lg:text-left lg:row-start-1 lg:col-start-1">
          {/* Eyebrow tag — fluid, wraps naturally on narrow screens */}
          <ScrollReveal variant="fade-up" delay={100} duration={500}>
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 px-3 py-1.5 mb-5 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm max-w-full">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t.hero.eyebrow}
              </span>
              <span className="hidden md:inline text-border">·</span>
              <span className="hidden md:inline text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground/80">
                {t.hero.eyebrowPills}
              </span>
            </div>
          </ScrollReveal>

          {/* Headline — fluid clamp() so it never overflows narrow viewports.
              `overflowWrap: anywhere` is the only rule that survives long unbreakable
              brand-name runs ("ChatGPT, Perplexity, Claude") on 360px screens. */}
          <h1
            id="hero-heading"
            className="font-bold tracking-tight leading-[1.05] mb-5"
            style={{
              /* Defensive clamp: lower bound uses min(rem, vw) so iOS Safari
                 manual text-size zoom (the "aA" menu) cannot push the rem
                 above what the viewport can contain. The vw cap dominates
                 once user zoom would otherwise overflow. */
              fontSize: "clamp(min(1.375rem, 5.5vw), 5.5vw, 3.75rem)",
              overflowWrap: "anywhere",
              wordBreak: "normal",
              maxWidth: "100%",
            }}
          >
            <TextReveal
              mode="words"
              staggerDelay={70}
              duration={550}
              className="text-foreground block"
            >
              {t.hero.headline1}
            </TextReveal>
            <GradientTextReveal
              duration={800}
              gradientClassName="bg-gradient-to-r from-primary via-secondary to-accent"
              className="block pb-1 italic font-semibold"
            >
              {t.hero.headline2}
            </GradientTextReveal>
          </h1>

          {/* Subheadline + reviews-as-engine support line */}
          <ScrollReveal variant="fade-up" delay={400} duration={650}>
            <p
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-1.5 mx-auto lg:mx-0"
              itemProp="description"
            >
              {t.hero.subheadline}
            </p>
            <p className="text-sm text-muted-foreground/75 italic mb-2 mx-auto lg:mx-0">
              {t.hero.subheadlineSupport}
            </p>
          </ScrollReveal>
        </div>

        {/* AUDIT CARD — second on mobile (right after subheadline),
            right column spanning both rows on desktop. */}
        <div className="w-full lg:row-start-1 lg:row-span-2 lg:col-start-2 lg:self-center">
          <ScrollReveal variant="fade-up" delay={300} duration={800}>
            <FloatingElement amplitude={6} duration={6} delay={0}>
              <HeroAuditCard />
            </FloatingElement>
          </ScrollReveal>
        </div>

        {/* COPY BLOCK 2 — 3-card flow + CTAs + ticker + trust + industries + compliance */}
        <div className="min-w-0 text-center lg:text-left lg:row-start-2 lg:col-start-1">
          {/* 3-card flow — Reviews+GBP → Citations+E-E-A-T → LLM visibility */}
          <ScrollReveal variant="fade-up" delay={500} duration={650}>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 sm:gap-1.5 mb-7 max-w-2xl mx-auto lg:mx-0">
              <FlowCard
                icon={<Star className="w-4 h-4" />}
                label={t.hero.flowCard1Label}
                stat={t.hero.flowCard1Stat}
                tone="primary"
              />
              <FlowArrow />
              <FlowCard
                icon={<MessageSquareQuote className="w-4 h-4" />}
                label={t.hero.flowCard2Label}
                stat={t.hero.flowCard2Stat}
                tone="secondary"
              />
              <FlowArrow />
              <FlowCard
                icon={<Bot className="w-4 h-4" />}
                label={t.hero.flowCard3Label}
                stat={t.hero.flowCard3Stat}
                tone="accent"
              />
            </div>
          </ScrollReveal>

          {/* Primary CTA: Book a Strategy Call (audit form lives in the right gradient card) */}
          <ScrollReveal variant="fade-up" delay={600} duration={700}>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mb-4">
              <MagneticWrapper strength={0.12}>
                <Button
                  size="lg"
                  onClick={() => navigate("/book-call")}
                  className="w-full sm:w-auto rounded-full font-semibold text-base px-6 sm:px-7 py-6 group relative overflow-hidden whitespace-nowrap"
                  style={{
                    boxShadow:
                      "0 0 32px hsl(var(--primary) / 0.45), 0 0 64px hsl(var(--secondary) / 0.25)",
                    background:
                      "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)) 50%, hsl(var(--accent)))",
                  }}
                >
                  <CalendarCheck className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{t.heroExtras.bookCall60}</span>
                  <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticWrapper>
              <button
                type="button"
                onClick={() => navigate("/audit/gbp")}
                className="px-5 py-3 rounded-full border border-border/50 hover:border-primary/50 text-sm font-medium transition-colors text-foreground/85 hover:text-primary whitespace-nowrap"
              >
                {t.heroExtras.scoreGbp90} →
              </button>
            </div>
            <p className="text-xs text-muted-foreground/70 mb-3 max-w-md">
              {t.heroExtras.bookHelper}
            </p>
          </ScrollReveal>

          {/* Aspirational live ticker */}
          <ScrollReveal variant="fade-up" delay={750} duration={600}>
            <div className="mb-7 flex justify-center lg:justify-start">
              <LiveTicker
                goal={t.hero.tickerGoal}
                status={t.hero.tickerStatus}
              />
            </div>
          </ScrollReveal>

          {/* Trust strip — engines tracked */}
          <ScrollReveal variant="fade-up" delay={900} duration={600}>
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground/60 mb-2.5 font-mono">
                {t.hero.trustLabel}
              </p>
              <p className="text-sm text-foreground/80 font-medium leading-relaxed">
                {t.hero.trustEngines}
              </p>
            </div>
          </ScrollReveal>

          {/* Industries */}
          <ScrollReveal variant="fade-up" delay={1000} duration={600}>
            <div className="mb-3">
              <p className="text-xs text-muted-foreground/70 mb-2.5">
                {t.hero.industriesLabel}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="px-2.5 py-1 text-[11px] sm:text-xs font-medium text-muted-foreground border border-border/40 rounded-full bg-muted/10 backdrop-blur-sm"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Compliance line */}
          <ScrollReveal variant="fade-up" delay={1100} duration={600}>
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4 text-[11px] text-muted-foreground/60">
              <Shield
                className="w-3.5 h-3.5 text-primary/60"
                aria-hidden="true"
              />
              <span>{t.hero.compliance}</span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Hidden SEO content for AI crawlers */}
      <div className="sr-only" aria-hidden="false">
        <p>{t.hero.srOnly}</p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */

interface FlowCardProps {
  icon: React.ReactNode;
  label: string;
  stat: string;
  tone: "primary" | "secondary" | "accent";
}

function FlowCard({ icon, label, stat, tone }: FlowCardProps) {
  const toneClasses = {
    primary:
      "border-cyan-400/40 bg-gradient-to-br from-cyan-500/15 via-teal-500/8 to-transparent text-cyan-300 shadow-[0_0_24px_-8px_rgba(34,211,238,0.4)]",
    secondary:
      "border-violet-400/40 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/8 to-transparent text-violet-300 shadow-[0_0_24px_-8px_rgba(167,139,250,0.4)]",
    accent:
      "border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-rose-500/8 to-transparent text-amber-300 shadow-[0_0_24px_-8px_rgba(245,158,11,0.4)]",
  }[tone];

  return (
    <div
      className={`group rounded-xl border backdrop-blur-md p-3.5 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 ${toneClasses}`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
      <p className="text-[11px] sm:text-xs text-foreground/80 leading-snug font-medium">
        {stat}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden sm:flex items-center justify-center text-muted-foreground/40">
      <ChevronRight className="w-4 h-4" aria-hidden="true" />
    </div>
  );
}
