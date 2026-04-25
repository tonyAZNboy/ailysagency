import { ScrollReveal } from "@/components/animation";

interface Competitor {
  segment: string;
  examples: string;
  price: string;
  weakness: string;
  ailysPosition: string;
}

const rows: Competitor[] = [
  {
    segment: "Tier-1 global",
    examples: "Jellyfish · Seer · Siege Media · NP Digital",
    price: "$5,000 to $25,000+ /mo",
    weakness:
      "Enterprise-only. Proprietary AI tracking. Inaccessible to local businesses.",
    ailysPosition:
      "Same disciplines (AEO, GEO, E-E-A-T) at SMB pricing because our delivery is automated.",
  },
  {
    segment: "Mass volume SMB",
    examples: "LocaliQ · Boostability · Marketing 360",
    price: "$10 to $2,300 /mo",
    weakness:
      "Industrialized. Quality drops with scale. Call-center vibes.",
    ailysPosition:
      "Small client roster. No call centers. Bilingual EN/FR-CA. We answer the phone.",
  },
  {
    segment: "Tools-only platforms",
    examples: "BrightLocal · Whitespark",
    price: "$799 to $1,299 /mo",
    weakness:
      "You buy the dashboard. You still have to do the actual work.",
    ailysPosition:
      "Done for you. Our team executes. You receive citations, not credentials to log into yet another tool.",
  },
  {
    segment: "Local specialists",
    examples: "Sterling Sky · Rablab · regional shops",
    price: "Custom, often $3K+ /mo",
    weakness:
      "Strong on classic local SEO. Light on AEO/GEO/E-E-A-T integration.",
    ailysPosition:
      "Built around AI search from day one. Reviews and GBP feed the LLM citation engine, not the other way around.",
  },
];

export function WhyAiLysSection() {
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
                <span>03 / Positioning</span>
              </div>
              <h2
                id="why-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                Where we sit
                <br />
                <span className="italic">in the market.</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-base text-muted-foreground leading-relaxed">
                A quick honesty pass on the competitive landscape. We are not
                the cheapest. We are not the biggest. We are the agency you
                hire when AI search is the problem you are trying to solve.
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
                    Segment {String(i + 1).padStart(2, "0")}
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
                    Pricing
                  </div>
                  <p className="font-display text-xl text-foreground/85 leading-tight">
                    {row.price}
                  </p>
                </div>

                {/* Weakness column */}
                <div className="lg:col-span-3 lg:border-l lg:border-border/40 lg:pl-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-2">
                    Where it falls short
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {row.weakness}
                  </p>
                </div>

                {/* AiLys position column */}
                <div className="lg:col-span-4 lg:border-l lg:border-primary/30 lg:pl-6 relative">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
                      AiLys position
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
              "If your local business is going to be cited by ChatGPT next year,
              someone has to do the schema, the citations, and the entity work
              this year."
            </p>
            <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60">
              The thesis behind AiLys
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
