import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { FleurDeLys } from "@/components/brand/FleurDeLys";
import { useNavigate } from "react-router-dom";

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
  },
];

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
                Three plans.
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
              <div className="mt-5 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70">
                <span>From $300/mo</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>Bilingual EN/FR-CA</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>No annual lock-in</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Tier cards, asymmetric grid */}
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-7 items-stretch">
          {tiers.map((tier, i) => (
            <ScrollReveal
              key={tier.id}
              variant="fade-up"
              delay={300 + i * 120}
              duration={650}
              className={tier.featured ? "lg:-mt-6" : ""}
            >
              <article
                onMouseEnter={() => setHovered(tier.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative h-full rounded-2xl p-7 sm:p-8 transition-all duration-500 ${
                  tier.featured
                    ? "border-[1.5px] border-primary/40 bg-gradient-to-b from-primary/[0.08] via-secondary/[0.04] to-transparent shadow-[0_0_60px_-15px_hsl(var(--primary)/0.3)]"
                    : "border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-mono uppercase tracking-[0.18em] text-white font-semibold">
                    Most chosen
                  </div>
                )}

                {/* Filing card label */}
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70">
                    Tier {tier.number} / {tier.name}
                  </span>
                  <span
                    className={`transition-transform duration-500 ${
                      hovered === tier.id ? "rotate-45 translate-x-0.5" : ""
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-4 h-4 ${
                        tier.featured
                          ? "text-primary"
                          : "text-muted-foreground/50 group-hover:text-primary"
                      }`}
                    />
                  </span>
                </div>

                {/* Display price */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[14px] text-muted-foreground/70 leading-none">
                      $
                    </span>
                    <span
                      className={`font-display text-7xl sm:text-8xl leading-none tracking-tight ${
                        tier.featured
                          ? "bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent"
                          : "text-foreground"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60 ml-1">
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

                {/* Hand-drawn separator */}
                <div className="relative h-px mb-7 bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Features as numbered editorial list */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`font-mono text-[10px] tabular-nums pt-[2px] flex-shrink-0 ${
                          tier.featured
                            ? "text-primary"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground/85 leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => navigate("/audit")}
                  className={`w-full rounded-full font-medium ${
                    tier.featured
                      ? "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-[0_0_24px_-8px_hsl(var(--primary)/0.5)]"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border/60"
                  }`}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Footnote-style addendum */}
        <ScrollReveal variant="fade-up" delay={800} duration={600}>
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
