import { ScrollReveal } from "@/components/animation";
import { FleurDeLys } from "@/components/brand/FleurDeLys";
import { useLang } from "@/i18n/LangContext";

export function AboutSection() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left column: portrait placeholder + caption */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="fade-up" delay={50} duration={700}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-primary/15 via-secondary/10 to-background">
                {/* Watermark fleur-de-lys */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center opacity-25"
                >
                  <FleurDeLys size={220} fill="gradient" />
                </div>

                {/* Grain overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5' /></svg>\")",
                  }}
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-1">
                    {t.about.plateLabel}
                  </div>
                  <p className="font-display text-base italic text-foreground/85 leading-snug">
                    {t.about.plateCaption}
                  </p>
                </div>
              </div>

              {/* Editorial caption beneath */}
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                {t.about.photoNote}
              </p>
            </ScrollReveal>
          </div>

          {/* Right column: manifesto */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up" delay={150} duration={700}>
              <div className="ailys-section-no mb-6">
                <span>{t.about.sectionLabel}</span>
              </div>
              <h2
                id="about-heading"
                className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-tight mb-10"
              >
                {t.about.heading1}
                <br />
                <span className="italic">{t.about.heading2}</span>
              </h2>

              <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                <p className="first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-foreground">
                  {t.about.body1}
                </p>

                <p>{t.about.body2}</p>

                <p>{t.about.body3}</p>

                <p>{t.about.body4}</p>

                <p className="text-foreground/95">{t.about.body5}</p>
              </div>

              {/* Signature block */}
              <div className="mt-10 pt-6 border-t border-border/40 flex items-center gap-4">
                <FleurDeLys size={32} fill="gradient" />
                <div>
                  <div className="font-display text-xl italic text-foreground">
                    {t.about.signatureBrand}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                    {t.about.signatureMeta}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <div className="sr-only" aria-hidden="false">{t.about.srSeo}</div>
    </section>
  );
}
