import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";

interface Competitor {
  segment: string;
  examples: string;
  price: string;
  weakness: string;
  ailysPosition: string;
}

export function WhyAiLysSection() {
  const { t } = useLang();

  const rows: Competitor[] = [
    {
      segment: t.whyAilys.row1Segment,
      examples: t.whyAilys.row1Examples,
      price: t.whyAilys.row1Price,
      weakness: t.whyAilys.row1Weakness,
      ailysPosition: t.whyAilys.row1Ailys,
    },
    {
      segment: t.whyAilys.row2Segment,
      examples: t.whyAilys.row2Examples,
      price: t.whyAilys.row2Price,
      weakness: t.whyAilys.row2Weakness,
      ailysPosition: t.whyAilys.row2Ailys,
    },
    {
      segment: t.whyAilys.row3Segment,
      examples: t.whyAilys.row3Examples,
      price: t.whyAilys.row3Price,
      weakness: t.whyAilys.row3Weakness,
      ailysPosition: t.whyAilys.row3Ailys,
    },
    {
      segment: t.whyAilys.row4Segment,
      examples: t.whyAilys.row4Examples,
      price: t.whyAilys.row4Price,
      weakness: t.whyAilys.row4Weakness,
      ailysPosition: t.whyAilys.row4Ailys,
    },
  ];

  return (
    <section
      id="why-ailys"
      className="relative py-24 sm:py-32 px-4"
      aria-labelledby="why-heading"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up" delay={50} duration={600}>
              <div className="ailys-section-no mb-6">
                <span>{t.whyAilys.sectionLabel}</span>
              </div>
              <h2
                id="why-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                {t.whyAilys.heading1}
                <br />
                <span className="italic">{t.whyAilys.heading2}</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t.whyAilys.intro}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Editorial comparison rows */}
        <div className="space-y-px bg-border/30 rounded-2xl overflow-hidden border border-border/50">
          {rows.map((row, i) => (
            <ScrollReveal
              key={row.segment}
              variant="fade-up"
              delay={i * 90}
              duration={650}
            >
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 bg-background/60 backdrop-blur-sm p-6 sm:p-8 hover:bg-background/80 transition-colors">
                {/* Segment column */}
                <div className="lg:col-span-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-2">
                    {t.whyAilys.colSegment} {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-2xl text-foreground/95 mb-1">
                    {row.segment}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground/70 leading-relaxed">
                    {row.examples}
                  </p>
                </div>

                {/* Price column */}
                <div className="lg:col-span-2 lg:border-l lg:border-border/40 lg:pl-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-2">
                    {t.whyAilys.colPricing}
                  </div>
                  <p className="font-display text-xl text-foreground/85 leading-tight">
                    {row.price}
                  </p>
                </div>

                {/* Weakness column */}
                <div className="lg:col-span-3 lg:border-l lg:border-border/40 lg:pl-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-2">
                    {t.whyAilys.colWeakness}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {row.weakness}
                  </p>
                </div>

                {/* AiLys position column */}
                <div className="lg:col-span-4 lg:border-l lg:border-primary/30 lg:pl-6 relative">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
                      {t.whyAilys.colAilys}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {row.ailysPosition}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing pull quote */}
        <ScrollReveal variant="fade-up" delay={500} duration={700}>
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <div className="ailys-gold-thread w-24 mx-auto mb-6" />
            <p className="font-display text-2xl sm:text-3xl italic text-foreground/85 leading-snug">
              {t.whyAilys.closingQuote}
            </p>
            <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60">
              {t.whyAilys.closingCaption}
            </div>
          </div>
        </ScrollReveal>
      </div>
      <div className="sr-only" aria-hidden="false">{t.whyAilys.srSeo}</div>
    </section>
  );
}
