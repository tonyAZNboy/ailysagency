import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { FleurDeLys } from "@/components/brand/FleurDeLys";
import { useNavigate } from "react-router-dom";

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

const tiers: Tier[] = [
  {
    id: "starter",
    number: "01",
    name: "Starter",
    price: "300",
    per: "/mo CAD",
    tagline:
      "For solo restos, indie practitioners, small salons getting visible in AI search.",
    features: [
      "Google Business Profile management",
      "LLM citation tracking across 6 engines",
      "Monthly performance report",
      "One strategy call per month",
    ],
    cta: "Begin with Starter",
    palette: "teal",
  },
  {
    id: "core",
    number: "02",
    name: "Core",
    price: "600",
    per: "/mo CAD",
    tagline:
      "For dentists, contractors, growing restos that need to be cited by name.",
    features: [
      "Everything in Starter",
      "AEO schema implementation",
      "Citation building, 5 per month",
      "Bilingual content, one piece per month",
      "Bi-weekly strategy call",
    ],
    cta: "Begin with Core",
    featured: true,
    palette: "violet",
  },
  {
    id: "growth",
    number: "03",
    name: "Growth",
    price: "1,200",
    per: "/mo CAD",
    tagline: "For multi-location, franchises, expansion plays.",
    features: [
      "Everything in Core",
      "GEO entity authority work",
      "Citation building, 10+ per month",
      "Weekly bilingual content",
      "Competitive monitoring",
      "In-person quarterly review",
    ],
    cta: "Begin with Growth",
    palette: "amber",
  },
  {
    id: "autopilot",
    number: "04",
    name: "Autopilot",
    price: "1,299",
    per: "/mo CAD",
    tagline:
      "Done for you. Reviuzy SaaS bundled. Monthly contest engine running on your locations.",
    features: [
      "Everything in Growth",
      "Reviuzy SaaS Max bundled in",
      "Monthly review contest, run by us",
      "Legal T&C handled, winner draw, prize handoff, social amp",
      "Fresh review velocity, 20 to 50 per month per location",
      "NFC tap cards shipped to your locations",
      "Domain Speed Boost + Domain Shield included",
      "Quarterly contest performance review",
    ],
    cta: "Go Autopilot",
    palette: "emerald",
  },
];

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
                <span>01 / Services</span>
              </div>
              <h2
                id="services-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                Four plans.
                <br />
                <span className="italic text-primary">One discipline.</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-prose">
                AiLys delivers the same disciplines as tier-1 agencies (AEO, GEO,
                E-E-A-T) at SMB prices. The only reason this works is that our
                operational delivery is automated through our verified-review and
                Google Business Profile engine. You get agency-quality work for
                what most shops charge for tools.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70">
                <span>$300 to $1,299 /mo</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>Bilingual EN/FR-CA</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>Month to month</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="text-emerald-400/90">Autopilot includes Reviuzy</span>
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
                      ★ Most chosen
                    </div>
                  )}
                  {isAutopilot && (
                    <div
                      className={`absolute -top-3 left-7 px-3 py-1 rounded-full bg-gradient-to-r ${p.ribbonGrad} text-[10px] font-mono uppercase tracking-[0.18em] text-background font-bold shadow-[0_4px_20px_-4px_rgba(52,211,153,0.55)]`}
                    >
                      ⚡ Autopilot · Done for you
                    </div>
                  )}

                  {/* Filing card label */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                      <span className={`w-1.5 h-1.5 rounded-full ${p.accentDot}`} />
                      Tier {tier.number} / {tier.name}
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
                Why $300, not $2,000
              </span>
            </div>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              Reviuzy handles the operational layer (review collection, GBP, content drafting, citation tracking).
              Our humans focus on strategy, schema, and the citations that actually move LLM rankings. The math works.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison block: AiLys vs mid-market agencies */}
        <ScrollReveal variant="fade-up" delay={820} duration={650}>
          <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md overflow-hidden">
            <div className="grid grid-cols-3 text-xs sm:text-sm">
              <div className="p-5 sm:p-6 font-mono uppercase tracking-[0.22em] text-[10px] text-muted-foreground/70 border-r border-border/40">
                Compare
              </div>
              <div className="p-5 sm:p-6 text-center font-mono uppercase tracking-[0.22em] text-[10px] text-muted-foreground/70 border-r border-border/40">
                Mid-market agencies
              </div>
              <div className="p-5 sm:p-6 text-center font-mono uppercase tracking-[0.22em] text-[10px]">
                <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent font-semibold">
                  AiLys Agency
                </span>
              </div>

              <ComparisonRow label="Starting price" left="$2,000/mo" right="$300/mo" highlight />
              <ComparisonRow label="Languages served" left="EN, FR" right="EN, FR, ES, ZH, AR, RU, UK, SR" />
              <ComparisonRow label="Focus" left="17 generalist services" right="Classical SEO + LLM visibility, layered" />
              <ComparisonRow label="What we do" left="SEO, content, PPC, etc." right="Technical SEO, GBP, citations, schema, AEO, GEO, E-E-A-T" highlight />
              <ComparisonRow label="Operational backbone" left="Hand-built" right="Reviuzy SaaS automated" />
              <ComparisonRow label="Money-back guarantee" left="Yes" right="Yes, 30 days" highlight />
            </div>
          </div>
        </ScrollReveal>

        {/* Money-back guarantee + trust signals */}
        <ScrollReveal variant="fade-up" delay={900} duration={600}>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <TrustChip
              eyebrow="Risk reversal"
              line="30-day satisfaction guarantee. Refund if no measurable schema or citation lift."
            />
            <TrustChip
              eyebrow="No lock-in"
              line="Month to month. Two weeks notice, no clawback. Keep the schema and citations we shipped."
            />
            <TrustChip
              eyebrow="Quebec-anchored"
              line="Bilingual EN/FR-CA in-house. Spanish, Chinese, Arabic, Russian via partner network."
            />
          </div>
        </ScrollReveal>

        {/* Footnote-style addendum */}
        <ScrollReveal variant="fade-up" delay={950} duration={600}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono text-muted-foreground/60">
            <span className="ailys-cite">†</span>
            <span>
              All plans run month to month. Cancel any time, two weeks notice.
              No setup fees.
            </span>
          </div>
        </ScrollReveal>
      </div>
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
