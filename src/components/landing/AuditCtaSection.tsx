import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal, MagneticWrapper } from "@/components/animation";
import { FleurDeLys } from "@/components/brand/FleurDeLys";
import { useLang } from "@/i18n/LangContext";

export function AuditCtaSection() {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <section
      id="audit-cta"
      className="relative py-20 sm:py-28 px-4"
      aria-labelledby="audit-cta-heading"
    >
      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal variant="fade-up" delay={50} duration={750}>
          <div
            className="relative rounded-3xl overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-xl p-8 sm:p-12 lg:p-16"
            style={{
              boxShadow:
                "0 0 80px -20px hsl(var(--primary) / 0.4), inset 0 1px 0 hsl(var(--primary) / 0.15)",
            }}
          >
            {/* Background fleur-de-lys watermark */}
            <div
              className="absolute -right-12 -bottom-16 opacity-[0.06] pointer-events-none"
              aria-hidden="true"
            >
              <FleurDeLys size={420} fill="hsl(var(--primary))" />
            </div>

            {/* Diagonal grain */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 3px)",
              }}
            />

            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="ailys-section-no mb-5">
                  <span>{t.auditCta.sectionLabel}</span>
                </div>
                <h2
                  id="audit-cta-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-5"
                >
                  {t.auditCta.heading1}
                  <br />
                  <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {t.auditCta.heading2}
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-2">
                  {t.auditCta.intro}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/60 mb-7">
                  {t.auditCta.legal}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <MagneticWrapper strength={0.15}>
                    <Button
                      onClick={() => navigate("/audit")}
                      size="lg"
                      className="rounded-full px-7 py-6 font-semibold text-base bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 group"
                      style={{
                        boxShadow:
                          "0 0 32px -8px hsl(var(--primary) / 0.6), 0 0 60px -20px hsl(var(--secondary) / 0.4)",
                      }}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t.auditCta.cta}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticWrapper>
                </div>
              </div>

              {/* Right column: scoring preview */}
              <div className="lg:col-span-5 lg:pl-4">
                <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md p-5 font-mono text-xs">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                    <span className="uppercase tracking-[0.22em] text-muted-foreground/70">
                      {t.auditCta.sampleHeading}
                    </span>
                    <span className="text-[10px] text-primary">●  {t.auditCta.sampleLive}</span>
                  </div>
                  <div className="space-y-3">
                    <ScoreLine label={t.auditCta.sampleAeo} value={42} max={100} tone="amber" />
                    <ScoreLine label={t.auditCta.sampleGeo} value={28} max={100} tone="rose" />
                    <ScoreLine label={t.auditCta.sampleEeat} value={67} max={100} tone="cyan" />
                    <ScoreLine label={t.auditCta.sampleCitations} value={3} max={50} tone="violet" />
                  </div>
                  <div className="mt-5 pt-3 border-t border-border/50 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    {t.auditCta.samplePlanNote}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <div className="sr-only" aria-hidden="false">{t.auditCta.srSeo}</div>
    </section>
  );
}

function ScoreLine({
  label,
  value,
  max,
  tone,
}: {
  label: string;
  value: number;
  max: number;
  tone: "amber" | "rose" | "cyan" | "violet";
}) {
  const pct = (value / max) * 100;
  const toneMap = {
    amber: "from-amber-400 to-orange-500",
    rose: "from-rose-400 to-pink-500",
    cyan: "from-cyan-400 to-sky-500",
    violet: "from-violet-400 to-fuchsia-500",
  };
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-foreground/85">{label}</span>
        <span className="tabular-nums text-foreground/95">
          {value}
          <span className="text-muted-foreground/50">/{max}</span>
        </span>
      </div>
      <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${toneMap[tone]} rounded-full transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
