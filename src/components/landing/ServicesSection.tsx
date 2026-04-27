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

const paletteMap: Record<TierPalette, PaletteTokens> = {
  teal: {
    cardBg: "bg-gradient-to-br from-cyan-500/[0.10] via-teal-500/[0.05] to-transparent",
    border: "border-cyan-400/30 hover:border-cyan-400/60",
    glow: "shadow-[0_0_50px_-15px_rgba(34,211,238,0.35)]",
    priceGrad: "bg-gradient-to-br from-cyan-300 via-teal-300 to-sky-400 bg-clip-text text-transparent",
    numberMarker: "text-cyan-400",
    arrow: "text-cyan-400/70 group-hover:text-cyan-300",
    accentDot: "bg-cyan-400",
    buttonClass:
      "bg-gradient-to-r from-cyan-500/15 to-teal-500/15 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-500/25 hover:border-cyan-300",
    ribbonGrad: "from-cyan-400 to-teal-400",
    separator: "via-cyan-500/30",
  },
  violet: {
    cardBg:
      "bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-500/15",
    border: "border-violet-400/50 hover:border-violet-300/70",
    glow:
      "shadow-[0_0_70px_-12px_rgba(167,139,250,0.55),inset_0_1px_0_rgba(255,255,255,0.1)]",
    priceGrad:
      "bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(167,139,250,0.4)]",
    numberMarker: "text-violet-300",
    arrow: "text-violet-300 group-hover:text-fuchsia-300",
    accentDot: "bg-gradient-to-r from-violet-400 to-fuchsia-400",
    buttonClass:
      "bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-white hover:opacity-90 shadow-[0_0_30px_-8px_rgba(167,139,250,0.6)]",
    ribbonGrad: "from-cyan-400 via-violet-500 to-fuchsia-500",
    separator: "via-violet-400/40",
  },
  amber: {
    cardBg: "bg-gradient-to-br from-amber-500/[0.12] via-orange-500/[0.06] to-rose-500/[0.05]",
    border: "border-amber-400/40 hover:border-amber-300/70",
    glow: "shadow-[0_0_55px_-15px_rgba(245,158,11,0.4)]",
    priceGrad: "bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 bg-clip-text text-transparent",
    numberMarker: "text-amber-400",
    arrow: "text-amber-400/80 group-hover:text-amber-300",
    accentDot: "bg-amber-400",
    buttonClass:
      "bg-gradient-to-r from-amber-500/15 to-rose-500/15 text-amber-100 border border-amber-400/40 hover:bg-amber-500/25 hover:border-amber-300",
    ribbonGrad: "from-amber-400 to-rose-400",
    separator: "via-amber-500/30",
  },
  emerald: {
    cardBg:
      "bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-teal-500/12",
    border: "border-emerald-400/50 hover:border-emerald-300/70",
    glow:
      "shadow-[0_0_70px_-12px_rgba(52,211,153,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]",
    priceGrad:
      "bg-gradient-to-br from-emerald-200 via-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(52,211,153,0.4)]",
    numberMarker: "text-emerald-300",
    arrow: "text-emerald-300 group-hover:text-cyan-200",
    accentDot: "bg-gradient-to-r from-emerald-400 to-cyan-400",
    buttonClass:
      "bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 text-background hover:opacity-90 shadow-[0_0_30px_-8px_rgba(52,211,153,0.6)]",
    ribbonGrad: "from-emerald-400 via-cyan-400 to-teal-400",
    separator: "via-emerald-400/35",
  },
};

export function ServicesSection() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useLang();

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
      ],
      cta: t.services.tier2Cta,
      palette: "amber",
    },
    {
      id: "autopilot",
      number: "04",
      name: t.services.tier3Name,
      price: "1,299",
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
      ],
      cta: t.services.tier3Cta,
      palette: "emerald",
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

        {/* Tier cards, four-column grid with Core elevated and Autopilot accented */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-stretch">
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
                      className={`absolute -top-3 left-7 px-3 py-1 rounded-full bg-gradient-to-r ${p.ribbonGrad} text-[10px] font-mono uppercase tracking-[0.18em] text-white font-semibold shadow-[0_4px_20px_-4px_rgba(167,139,250,0.5)]`}
                    >
                      {t.services.badgeMostChosen}
                    </div>
                  )}
                  {isAutopilot && (
                    <div
                      className={`absolute -top-3 left-7 px-3 py-1 rounded-full bg-gradient-to-r ${p.ribbonGrad} text-[10px] font-mono uppercase tracking-[0.18em] text-background font-bold shadow-[0_4px_20px_-4px_rgba(52,211,153,0.55)]`}
                    >
                      {t.services.badgeAutopilot}
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

                  {/* Features as numbered editorial list */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
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
