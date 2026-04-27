import { useState } from "react";
import {
  Wrench,
  MapPin,
  Link2,
  Code2,
  BookOpen,
  Award,
  MessageSquare,
  Bot,
  ArrowRight,
  Quote,
} from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";

interface Step {
  n: string;
  icon: typeof Wrench;
  layer: string;
  title: string;
  short: string;
  detail: string;
  signal: string;
  tone: "cyan" | "violet" | "amber" | "emerald" | "rose";
}

const TONE: Record<
  Step["tone"],
  { bg: string; border: string; icon: string; line: string }
> = {
  cyan: {
    bg: "from-cyan-500/15 via-cyan-500/5 to-transparent",
    border: "border-cyan-400/30 hover:border-cyan-400/60",
    icon: "from-cyan-400 to-teal-500",
    line: "from-cyan-400/60",
  },
  violet: {
    bg: "from-violet-500/15 via-fuchsia-500/8 to-transparent",
    border: "border-violet-400/30 hover:border-violet-400/60",
    icon: "from-violet-500 to-fuchsia-500",
    line: "from-violet-400/60",
  },
  amber: {
    bg: "from-amber-500/15 via-orange-500/8 to-transparent",
    border: "border-amber-400/30 hover:border-amber-400/60",
    icon: "from-amber-400 to-orange-500",
    line: "from-amber-400/60",
  },
  emerald: {
    bg: "from-emerald-500/15 via-cyan-500/8 to-transparent",
    border: "border-emerald-400/30 hover:border-emerald-400/60",
    icon: "from-emerald-400 to-cyan-500",
    line: "from-emerald-400/60",
  },
  rose: {
    bg: "from-rose-500/15 via-pink-500/8 to-transparent",
    border: "border-rose-400/30 hover:border-rose-400/60",
    icon: "from-rose-400 to-pink-500",
    line: "from-rose-400/60",
  },
};

export function MethodologySection() {
  const [active, setActive] = useState<string>("01");
  const { t } = useLang();

  const steps: Step[] = [
    {
      n: "01",
      icon: Wrench,
      layer: t.methodology.layerClassical,
      title: t.methodology.step1Title,
      short: t.methodology.step1Short,
      detail: t.methodology.step1Detail,
      signal: t.methodology.step1Signal,
      tone: "cyan",
    },
    {
      n: "02",
      icon: MapPin,
      layer: t.methodology.layerClassical,
      title: t.methodology.step2Title,
      short: t.methodology.step2Short,
      detail: t.methodology.step2Detail,
      signal: t.methodology.step2Signal,
      tone: "cyan",
    },
    {
      n: "03",
      icon: Link2,
      layer: t.methodology.layerClassical,
      title: t.methodology.step3Title,
      short: t.methodology.step3Short,
      detail: t.methodology.step3Detail,
      signal: t.methodology.step3Signal,
      tone: "amber",
    },
    {
      n: "04",
      icon: Code2,
      layer: t.methodology.layerAeoGeo,
      title: t.methodology.step4Title,
      short: t.methodology.step4Short,
      detail: t.methodology.step4Detail,
      signal: t.methodology.step4Signal,
      tone: "violet",
    },
    {
      n: "05",
      icon: BookOpen,
      layer: t.methodology.layerAeoGeo,
      title: t.methodology.step5Title,
      short: t.methodology.step5Short,
      detail: t.methodology.step5Detail,
      signal: t.methodology.step5Signal,
      tone: "violet",
    },
    {
      n: "06",
      icon: Award,
      layer: t.methodology.layerEeat,
      title: t.methodology.step6Title,
      short: t.methodology.step6Short,
      detail: t.methodology.step6Detail,
      signal: t.methodology.step6Signal,
      tone: "emerald",
    },
    {
      n: "07",
      icon: MessageSquare,
      layer: t.methodology.layerEeat,
      title: t.methodology.step7Title,
      short: t.methodology.step7Short,
      detail: t.methodology.step7Detail,
      signal: t.methodology.step7Signal,
      tone: "rose",
    },
    {
      n: "08",
      icon: Bot,
      layer: t.methodology.layerTracking,
      title: t.methodology.step8Title,
      short: t.methodology.step8Short,
      detail: t.methodology.step8Detail,
      signal: t.methodology.step8Signal,
      tone: "cyan",
    },
  ];

  return (
    <section
      id="methodology"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      aria-labelledby="methodology-heading"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up" delay={50} duration={650}>
              <div className="ailys-section-no mb-6">
                <span>{t.methodology.sectionLabel}</span>
              </div>
              <h2
                id="methodology-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                {t.methodology.heading1}
                <br />
                <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                  {t.methodology.heading2}
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t.methodology.intro}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Pipeline */}
        <div className="grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-6 lg:gap-10">
          {/* Stepper rail (left, desktop only) */}
          <nav
            className="hidden lg:block lg:sticky lg:top-28 lg:self-start"
            aria-label={t.methodology.stepsAria}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-4">
              {t.methodology.pipelineLabel}
            </div>
            <ol className="space-y-1.5 border-l border-border/40 pl-4">
              {steps.map((s) => {
                const tone = TONE[s.tone];
                const isActive = active === s.n;
                return (
                  <li
                    key={s.n}
                    style={{
                      borderLeft: isActive
                        ? "2px solid hsl(var(--primary))"
                        : "2px solid transparent",
                      marginLeft: "-17px",
                      paddingLeft: "15px",
                    }}
                  >
                    <button
                      onClick={() => {
                        setActive(s.n);
                        document
                          .getElementById(`step-${s.n}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`w-full text-left py-1.5 transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground/80"
                      }`}
                    >
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`font-mono text-[10px] tabular-nums ${
                            isActive ? "text-primary" : "text-muted-foreground/60"
                          }`}
                        >
                          {s.n}
                        </span>
                        <span className="text-sm">{s.title}</span>
                      </div>
                      {isActive && (
                        <span
                          className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.18em] bg-gradient-to-r ${tone.icon} text-white`}
                        >
                          {s.layer}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Step cards (right) */}
          <ol className="space-y-5 relative">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const tone = TONE[s.tone];
              return (
                <ScrollReveal
                  key={s.n}
                  variant="fade-up"
                  delay={i * 60}
                  duration={650}
                >
                  <li
                    id={`step-${s.n}`}
                    onMouseEnter={() => setActive(s.n)}
                    className={`group relative rounded-2xl border bg-gradient-to-br ${tone.bg} ${tone.border} backdrop-blur-md p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    {/* Accent line on left */}
                    <div
                      aria-hidden="true"
                      className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${tone.line} via-transparent to-transparent opacity-80`}
                    />

                    <div className="grid sm:grid-cols-[auto_1fr] gap-5">
                      {/* Icon + number */}
                      <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${tone.icon} shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-display text-3xl tabular-nums text-foreground/30 leading-none">
                          {s.n}
                        </div>
                      </div>

                      {/* Body */}
                      <div>
                        <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${tone.icon}`}
                          >
                            {s.layer}
                          </span>
                          <h3 className="font-display text-2xl sm:text-3xl text-foreground leading-tight">
                            {s.title}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-foreground/85 mb-3">
                          {s.short}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {s.detail}
                        </p>

                        {/* Signal pill */}
                        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-background/40 border border-border/40 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
                          <Quote className="w-3 h-3 flex-shrink-0 mt-0.5 text-primary/70" />
                          <span className="break-words">{s.signal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Connector arrow to next step */}
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="hidden sm:flex absolute -bottom-3.5 left-12 z-10 items-center justify-center w-7 h-7 rounded-full border border-border/40 bg-background/80 backdrop-blur-sm"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-primary/70 rotate-90" />
                      </div>
                    )}
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>

        {/* Closing pull */}
        <ScrollReveal variant="fade-up" delay={400} duration={650}>
          <div className="mt-20 max-w-4xl mx-auto text-center">
            <div className="ailys-gold-thread w-32 mx-auto mb-6" />
            <p className="font-display text-2xl sm:text-3xl italic text-foreground/85 leading-snug">
              {t.methodology.closingQuote}
            </p>
            <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60">
              {t.methodology.closingCaption}
            </div>
          </div>
        </ScrollReveal>
      </div>
      <div className="sr-only" aria-hidden="false">{t.methodology.srSeo}</div>
    </section>
  );
}
