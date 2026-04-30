import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { FleurDeLys } from "@/components/brand/FleurDeLys";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LangContext";

type TierPalette = "teal" | "violet" | "amber" | "emerald";

interface Tier {
  id: string;
  number: string;
  name: string;
  price: string;
  per: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  palette: TierPalette;
  /** When set to "in-development", a small amber badge surfaces top-right
      to flag the tier as not yet generally available (used for Agency at
      $2,500 while final tooling lands). */
  status?: "in-development";
}

interface PaletteTokens {
  cardBg: string;
  border: string;
  glow: string;
  priceGrad: string;
  numberMarker: string;
  arrow: string;
  accentDot: string;
  buttonClass: string;
  ribbonGrad: string;
  separator: string;
}

// Neon-glow palette tokens — Truvizy-inspired. Each tier wears its own
// vivid color: bright cyan (Starter), magenta-violet (Core, the featured
// pick), orange-rose (Growth), emerald-cyan (Agency). Glow uses heavy
// blur shadows + bright borders for a "neon outlined" feel.
const paletteMap: Record<TierPalette, PaletteTokens> = {
  teal: {
    cardBg:
      "bg-gradient-to-br from-cyan-500/[0.14] via-sky-500/[0.06] to-transparent",
    border: "border-cyan-400/80 hover:border-cyan-300/100",
    glow:
      "shadow-[0_0_0_2px_rgba(34,211,238,0.225),0_0_50px_0_rgba(34,211,238,0.275),0_0_120px_-4px_rgba(34,211,238,0.425),0_0_220px_-30px_rgba(34,211,238,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_0_2px_rgba(34,211,238,0.35),0_0_70px_4px_rgba(34,211,238,0.375),0_0_160px_-2px_rgba(34,211,238,0.5),0_0_280px_-24px_rgba(34,211,238,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]",
    priceGrad:
      "bg-gradient-to-br from-cyan-200 via-cyan-300 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]",
    numberMarker: "text-cyan-300",
    arrow: "text-cyan-300 group-hover:text-cyan-200",
    accentDot: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)]",
    buttonClass:
      "bg-gradient-to-r from-cyan-500/20 to-sky-500/20 text-cyan-100 border border-cyan-400/60 hover:bg-cyan-500/30 hover:border-cyan-300 shadow-[0_0_20px_-4px_rgba(34,211,238,0.25)]",
    ribbonGrad: "from-cyan-300 to-sky-400",
    separator: "via-cyan-400/50",
  },
  violet: {
    cardBg:
      "bg-gradient-to-br from-fuchsia-600/25 via-violet-600/15 to-cyan-500/15",
    border: "border-fuchsia-400/85 hover:border-fuchsia-300/100",
    glow:
      "shadow-[0_0_0_2px_rgba(217,70,239,0.275),0_0_60px_4px_rgba(217,70,239,0.375),0_0_140px_-2px_rgba(217,70,239,0.5),0_0_240px_-20px_rgba(167,139,250,0.35),0_0_360px_-40px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_0_0_2px_rgba(217,70,239,0.4),0_0_80px_8px_rgba(217,70,239,0.475),0_0_180px_2px_rgba(217,70,239,0.5),0_0_300px_-14px_rgba(167,139,250,0.425),0_0_440px_-30px_rgba(34,211,238,0.3),inset_0_1px_0_rgba(255,255,255,0.11)]",
    priceGrad:
      "bg-gradient-to-br from-cyan-200 via-fuchsia-300 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(217,70,239,0.35)]",
    numberMarker: "text-fuchsia-300",
    arrow: "text-fuchsia-300 group-hover:text-fuchsia-200",
    accentDot:
      "bg-gradient-to-r from-fuchsia-400 to-violet-400 shadow-[0_0_14px_rgba(217,70,239,0.5)]",
    buttonClass:
      "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 text-white hover:opacity-95 shadow-[0_0_40px_-6px_rgba(217,70,239,0.425)] hover:shadow-[0_0_55px_-4px_rgba(217,70,239,0.5)]",
    ribbonGrad: "from-cyan-300 via-fuchsia-400 to-violet-400",
    separator: "via-fuchsia-400/60",
  },
  amber: {
    cardBg:
      "bg-gradient-to-br from-orange-500/[0.18] via-rose-500/[0.10] to-amber-500/[0.06]",
    border: "border-orange-400/85 hover:border-orange-300/100",
    glow:
      "shadow-[0_0_0_2px_rgba(251,146,60,0.25),0_0_55px_2px_rgba(251,146,60,0.325),0_0_130px_-4px_rgba(251,146,60,0.45),0_0_240px_-24px_rgba(244,63,94,0.275),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_0_0_2px_rgba(251,146,60,0.375),0_0_75px_6px_rgba(251,146,60,0.425),0_0_170px_-2px_rgba(251,146,60,0.5),0_0_300px_-18px_rgba(244,63,94,0.35),inset_0_1px_0_rgba(255,255,255,0.09)]",
    priceGrad:
      "bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.325)]",
    numberMarker: "text-orange-300",
    arrow: "text-orange-300 group-hover:text-orange-200",
    accentDot: "bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.475)]",
    buttonClass:
      "bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-orange-100 border border-orange-400/65 hover:bg-orange-500/30 hover:border-orange-300 shadow-[0_0_20px_-4px_rgba(251,146,60,0.275)]",
    ribbonGrad: "from-orange-300 to-rose-400",
    separator: "via-orange-400/55",
  },
  emerald: {
    cardBg:
      "bg-gradient-to-br from-emerald-500/22 via-cyan-500/12 to-teal-500/15",
    border: "border-emerald-400/85 hover:border-emerald-300/100",
    glow:
      "shadow-[0_0_0_2px_rgba(52,211,153,0.275),0_0_60px_4px_rgba(52,211,153,0.375),0_0_140px_-2px_rgba(52,211,153,0.5),0_0_240px_-20px_rgba(34,211,238,0.325),0_0_360px_-40px_rgba(20,184,166,0.225),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_0_0_2px_rgba(52,211,153,0.4),0_0_80px_8px_rgba(52,211,153,0.475),0_0_180px_2px_rgba(52,211,153,0.5),0_0_300px_-14px_rgba(34,211,238,0.4),0_0_440px_-30px_rgba(20,184,166,0.3),inset_0_1px_0_rgba(255,255,255,0.11)]",
    priceGrad:
      "bg-gradient-to-br from-emerald-200 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(52,211,153,0.35)]",
    numberMarker: "text-emerald-300",
    arrow: "text-emerald-300 group-hover:text-cyan-200",
    accentDot:
      "bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_14px_rgba(52,211,153,0.5)]",
    buttonClass:
      "bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 text-background hover:opacity-95 shadow-[0_0_40px_-6px_rgba(52,211,153,0.425)] hover:shadow-[0_0_55px_-4px_rgba(52,211,153,0.5)]",
    ribbonGrad: "from-emerald-300 via-cyan-400 to-teal-400",
    separator: "via-emerald-400/55",
  },
};

export function ServicesSection() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const { t, lang } = useLang();

  const tiers: Tier[] = [
    {
      id: "starter",
      number: "01",
      name: t.services.tier0Name,
      price: "300",
      per: t.services.perMo,
      tagline: t.services.tier0Tagline,
      features: [
        t.services.tier0Feat1,
        t.services.tier0Feat2,
        t.services.tier0Feat3,
        t.services.tier0Feat4,
        t.services.tier0Feat5,
        t.services.tier0Feat6,
      ],
      cta: t.services.tier0Cta,
      palette: "teal",
    },
    {
      id: "core",
      number: "02",
      name: t.services.tier1Name,
      price: "600",
      per: t.services.perMo,
      tagline: t.services.tier1Tagline,
      features: [
        t.services.tier1Feat1,
        t.services.tier1Feat2,
        t.services.tier1Feat3,
        t.services.tier1Feat4,
        t.services.tier1Feat5,
        t.services.tier1Feat6,
        t.services.tier1Feat7,
      ],
      cta: t.services.tier1Cta,
      featured: true,
      palette: "violet",
    },
    {
      id: "growth",
      number: "03",
      name: t.services.tier2Name,
      price: "1,200",
      per: t.services.perMo,
      tagline: t.services.tier2Tagline,
      features: [
        t.services.tier2Feat1,
        t.services.tier2Feat2,
        t.services.tier2Feat3,
        t.services.tier2Feat4,
        t.services.tier2Feat5,
        t.services.tier2Feat6,
        t.services.tier2Feat7,
        t.services.tier2Feat8,
      ],
      cta: t.services.tier2Cta,
      palette: "amber",
    },
    {
      id: "autopilot",
      number: "04",
      name: t.services.tier3Name,
      price: "2,500",
      per: t.services.perMo,
      tagline: t.services.tier3Tagline,
      features: [
        t.services.tier3Feat1,
        t.services.tier3Feat2,
        t.services.tier3Feat3,
        t.services.tier3Feat4,
        t.services.tier3Feat5,
        t.services.tier3Feat6,
        t.services.tier3Feat7,
        t.services.tier3Feat8,
        t.services.tier3Feat9,
      ],
      cta: t.services.tier3Cta,
      palette: "emerald",
      status: "in-development",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Asymmetric corner ornaments */}
      <div
        className="absolute top-12 right-12 hidden lg:block opacity-30"
        aria-hidden="true"
      >
        <FleurDeLys size={56} fill="hsl(var(--primary) / 0.5)" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
          <div className="lg:col-span-5">
            <ScrollReveal variant="fade-up" delay={50} duration={600}>
              <div className="ailys-section-no mb-6">
                <span>{t.services.sectionLabel}</span>
              </div>
              <h2
                id="services-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                {t.services.heading1}
                <br />
                <span className="italic text-primary">{t.services.heading2}</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-prose">
                {t.services.intro}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70">
                <span>{t.services.metaPrice}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>{t.services.metaBilingual}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>{t.services.metaMonthly}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="text-emerald-400/90">{t.services.metaAutopilot}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Tier cards, four-column grid with Core elevated and Agency accented */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-10 items-stretch py-6">
          {tiers.map((tier, i) => {
            const p = paletteMap[tier.palette];
            const isAutopilot = tier.id === "autopilot";
            return (
              <ScrollReveal
                key={tier.id}
                variant="fade-up"
                delay={300 + i * 100}
                duration={650}
                className={tier.featured ? "lg:-mt-6" : ""}
              >
                <article
                  onMouseEnter={() => setHovered(tier.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative h-full rounded-2xl p-7 sm:p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 ${p.cardBg} ${
                    tier.featured ? "border-[1.5px]" : "border"
                  } ${p.border} ${p.glow}`}
                >
                  {/* Inner shine for premium feel */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />

                  {tier.featured && (
                    <div
                      className={`absolute -top-3 left-7 px-3 py-1 rounded-full bg-gradient-to-r ${p.ribbonGrad} text-[10px] font-mono uppercase tracking-[0.18em] text-white font-semibold shadow-[0_4px_20px_-4px_rgba(167,139,250,0.25)]`}
                    >
                      {t.services.badgeMostChosen}
                    </div>
                  )}
                  {isAutopilot && (
                    <div
                      className={`absolute -top-3 left-7 px-3 py-1 rounded-full bg-gradient-to-r ${p.ribbonGrad} text-[10px] font-mono uppercase tracking-[0.18em] text-background font-bold shadow-[0_4px_20px_-4px_rgba(52,211,153,0.275)]`}
                    >
                      {t.services.badgeAutopilot}
                    </div>
                  )}
                  {tier.status === "in-development" && (
                    <div
                      className="absolute -top-3 right-7 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[10px] font-mono uppercase tracking-[0.18em] text-background font-bold shadow-[0_4px_20px_-4px_rgba(251,191,36,0.275)]"
                      title={t.services.statusInDevelopmentTitle || "In development"}
                    >
                      {t.services.statusInDevelopment || "In development"}
                    </div>
                  )}

                  {/* Filing card label */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                      <span className={`w-1.5 h-1.5 rounded-full ${p.accentDot}`} />
                      {t.services.tierLabel} {tier.number} / {tier.name}
                    </span>
                    <span
                      className={`transition-transform duration-500 ${
                        hovered === tier.id ? "rotate-45 translate-x-0.5" : ""
                      }`}
                    >
                      <ArrowUpRight className={`w-4 h-4 ${p.arrow}`} />
                    </span>
                  </div>

                  {/* Display price */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[14px] text-muted-foreground/70 leading-none">
                        $
                      </span>
                      <span
                        className={`font-display text-7xl sm:text-8xl leading-none tracking-tight ${p.priceGrad}`}
                      >
                        {tier.price}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground/70 ml-1">
                        {tier.per}
                      </span>
                    </div>
                  </div>

                  {/* Tier name as italic editorial mark */}
                  <h3 className="font-display text-2xl italic text-foreground/95 mb-4">
                    {tier.name}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-7 min-h-[44px]">
                    {tier.tagline}
                  </p>

                  {/* Hand-drawn separator, palette-tinted */}
                  <div
                    className={`relative h-px mb-7 bg-gradient-to-r from-transparent ${p.separator} to-transparent`}
                  />

                  {/* Features compact: top 3 differentiating items.
                      Full feature list lives on /pricing-details to keep
                      cards scannable per agreed UX (no scroll trap on
                      mobile, no card height divergence between tiers). */}
                  <ul className="space-y-3 mb-5">
                    {tier.features.slice(0, 3).map((feature, idx) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`font-mono text-[10px] tabular-nums pt-[2px] flex-shrink-0 font-semibold ${p.numberMarker}`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-foreground/90 leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Per-card link to full tier detail in PricingDetails table */}
                  <button
                    type="button"
                    onClick={() => {
                      const path = lang === "fr"
                        ? `/${lang}/forfaits-complets`
                        : lang === "en"
                        ? "/pricing-details"
                        : `/${lang}/pricing-details`;
                      navigate(path);
                    }}
                    className="mb-6 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-foreground/90 transition-colors"
                  >
                    {lang === "fr" ? "Voir les détails complets" : "See full plan details"}
                    <ArrowUpRight className="w-3 h-3" />
                  </button>

                  {/* Reviuzy add-on indicator: bundled in Agency, optional add-on elsewhere */}
                  <div className="mb-4 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-[0.18em] ${
                        isAutopilot
                          ? "border-emerald-400/60 bg-emerald-500/[0.10] text-emerald-300"
                          : "border-border/40 bg-background/30 text-muted-foreground/80"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      {isAutopilot
                        ? t.services.addOnBadgeIncluded
                        : t.services.addOnBadgeAvailable}
                    </span>
                  </div>

                  <Button
                    onClick={() => navigate("/audit")}
                    className={`w-full rounded-full font-semibold transition-all ${p.buttonClass}`}
                    size="lg"
                  >
                    {tier.cta}
                  </Button>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Phase E.1.3: prominent CTA to detailed comparison page */}
        <ScrollReveal variant="fade-up" delay={700} duration={600}>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => {
                const path = lang === "fr"
                  ? `/${lang}/forfaits-complets`
                  : lang === "en"
                  ? "/pricing-details"
                  : `/${lang}/pricing-details`;
                navigate(path);
              }}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full border border-amber-400/40 bg-amber-400/[0.04] text-amber-200 hover:bg-amber-400/[0.08] hover:border-amber-400/60 transition text-sm sm:text-base font-medium"
            >
              {lang === "fr"
                ? "Voir la comparaison complete (30+ fonctionnalites, 9 categories)"
                : "View full comparison (30+ features, 9 categories)"}
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </button>
          </div>
        </ScrollReveal>

        {/* "Why $300" pre-emption caption */}
        <ScrollReveal variant="fade-up" delay={750} duration={600}>
          <div className="mt-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/[0.06] backdrop-blur-sm mb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300">
                {t.services.why300Eyebrow}
              </span>
            </div>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              {t.services.why300Body}
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison block: AiLys vs mid-market agencies */}
        <ScrollReveal variant="fade-up" delay={820} duration={650}>
          <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md overflow-hidden">
            <div className="grid grid-cols-3 text-xs sm:text-sm">
              <div className="p-5 sm:p-6 font-mono uppercase tracking-[0.22em] text-[10px] text-muted-foreground/70 border-r border-border/40">
                {t.services.compareLabel}
              </div>
              <div className="p-5 sm:p-6 text-center font-mono uppercase tracking-[0.22em] text-[10px] text-muted-foreground/70 border-r border-border/40">
                {t.services.compareMidMarket}
              </div>
              <div className="p-5 sm:p-6 text-center font-mono uppercase tracking-[0.22em] text-[10px]">
                <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent font-semibold">
                  {t.services.compareAilys}
                </span>
              </div>

              <ComparisonRow label={t.services.compareRow1Label} left={t.services.compareRow1Left} right={t.services.compareRow1Right} highlight />
              <ComparisonRow label={t.services.compareRow2Label} left={t.services.compareRow2Left} right={t.services.compareRow2Right} />
              <ComparisonRow label={t.services.compareRow3Label} left={t.services.compareRow3Left} right={t.services.compareRow3Right} />
              <ComparisonRow label={t.services.compareRow4Label} left={t.services.compareRow4Left} right={t.services.compareRow4Right} highlight />
              <ComparisonRow label={t.services.compareRow5Label} left={t.services.compareRow5Left} right={t.services.compareRow5Right} />
              <ComparisonRow label={t.services.compareRow6Label} left={t.services.compareRow6Left} right={t.services.compareRow6Right} highlight />
            </div>
          </div>
        </ScrollReveal>

        {/* Money-back guarantee + trust signals */}
        <ScrollReveal variant="fade-up" delay={900} duration={600}>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <TrustChip eyebrow={t.services.chip1Eyebrow} line={t.services.chip1Line} />
            <TrustChip eyebrow={t.services.chip2Eyebrow} line={t.services.chip2Line} />
            <TrustChip eyebrow={t.services.chip3Eyebrow} line={t.services.chip3Line} />
          </div>
        </ScrollReveal>

        {/* Footnote-style addendum */}
        <ScrollReveal variant="fade-up" delay={950} duration={600}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono text-muted-foreground/60">
            <span className="ailys-cite">†</span>
            <span>{t.services.footnote}</span>
          </div>
        </ScrollReveal>
      </div>
      <div className="sr-only" aria-hidden="false">{t.services.srSeo}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */

function ComparisonRow({
  label,
  left,
  right,
  highlight,
}: {
  label: string;
  left: string;
  right: string;
  highlight?: boolean;
}) {
  return (
    <>
      <div className="px-5 sm:px-6 py-4 border-t border-border/40 text-foreground/85">
        {label}
      </div>
      <div className="px-5 sm:px-6 py-4 border-t border-border/40 border-l border-l-border/40 text-center text-muted-foreground">
        {left}
      </div>
      <div
        className={`px-5 sm:px-6 py-4 border-t border-border/40 border-l border-l-border/40 text-center ${
          highlight
            ? "text-emerald-300 font-semibold"
            : "text-foreground/95"
        }`}
      >
        {right}
      </div>
    </>
  );
}

function TrustChip({ eyebrow, line }: { eyebrow: string; line: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80 mb-2">
        {eyebrow}
      </div>
      <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
        {line}
      </p>
    </div>
  );
}
