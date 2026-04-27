import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";

interface Phase {
  number: string;
  name: string;
  duration: string;
  body: string;
  pull: string;
}

export function ProcessSection() {
  const { t } = useLang();

  const phases: Phase[] = [
    {
      number: "01",
      name: t.process.phase1Name,
      duration: t.process.phase1Duration,
      body: t.process.phase1Body,
      pull: t.process.phase1Pull,
    },
    {
      number: "02",
      name: t.process.phase2Name,
      duration: t.process.phase2Duration,
      body: t.process.phase2Body,
      pull: t.process.phase2Pull,
    },
    {
      number: "03",
      name: t.process.phase3Name,
      duration: t.process.phase3Duration,
      body: t.process.phase3Body,
      pull: t.process.phase3Pull,
    },
    {
      number: "04",
      name: t.process.phase4Name,
      duration: t.process.phase4Duration,
      body: t.process.phase4Body,
      pull: t.process.phase4Pull,
    },
  ];

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Diagonal background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 24px, hsl(var(--primary)) 24px, hsl(var(--primary)) 25px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up" delay={50} duration={600}>
              <div className="ailys-section-no mb-6">
                <span>{t.process.sectionLabel}</span>
              </div>
              <h2
                id="process-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                {t.process.heading1}
                <br />
                <span className="italic">{t.process.heading2}</span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t.process.intro}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Phases as editorial timeline */}
        <div className="relative">
          {/* Vertical thread on left for desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[88px] top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          />

          <ol className="space-y-16 lg:space-y-20">
            {phases.map((phase, i) => (
              <ScrollReveal
                key={phase.number}
                variant="fade-up"
                delay={i * 120}
                duration={700}
              >
                <li className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start relative">
                  {/* Big italic numeral */}
                  <div className="lg:col-span-2 flex lg:justify-end">
                    <span className="font-display italic text-7xl sm:text-8xl lg:text-9xl leading-none text-foreground/15 tabular-nums select-none">
                      {phase.number}
                    </span>
                  </div>

                  {/* Dot marker on the thread */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute left-[82px] top-12 w-3 h-3 rounded-full bg-background border-2 border-primary z-10"
                  />

                  {/* Body */}
                  <div className="lg:col-span-7 lg:col-start-4">
                    <div className="flex items-baseline gap-4 mb-3">
                      <h3 className="font-display text-3xl sm:text-4xl text-foreground">
                        {phase.name}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose mb-4">
                      {phase.body}
                    </p>
                    <div className="flex items-center gap-3 text-sm font-display italic text-primary">
                      <span className="ailys-cite">↳</span>
                      <span>{phase.pull}</span>
                    </div>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
      <div className="sr-only" aria-hidden="false">{t.process.srSeo}</div>
    </section>
  );
}
