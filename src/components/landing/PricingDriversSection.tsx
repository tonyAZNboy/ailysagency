import {
  Sparkles,
  Bot,
  Globe2,
  FileCode,
  Languages,
} from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";

interface Driver {
  icon: typeof Sparkles;
  title: string;
  body: string;
  tone: "cyan" | "violet" | "amber" | "emerald" | "rose";
}

export function PricingDriversSection() {
  const { t } = useLang();

  const drivers: Driver[] = [
    {
      icon: Bot,
      title: t.pricingDrivers.d1Title,
      body: t.pricingDrivers.d1Body,
      tone: "cyan",
    },
    {
      icon: Globe2,
      title: t.pricingDrivers.d2Title,
      body: t.pricingDrivers.d2Body,
      tone: "violet",
    },
    {
      icon: FileCode,
      title: t.pricingDrivers.d3Title,
      body: t.pricingDrivers.d3Body,
      tone: "amber",
    },
    {
      icon: Languages,
      title: t.pricingDrivers.d4Title,
      body: t.pricingDrivers.d4Body,
      tone: "emerald",
    },
    {
      icon: Sparkles,
      title: t.pricingDrivers.d5Title,
      body: t.pricingDrivers.d5Body,
      tone: "rose",
    },
  ];

  return (
    <section
      id="pricing-drivers"
      className="relative py-20 sm:py-28 px-4"
      aria-labelledby="drivers-heading"
    >
      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal variant="fade-up" delay={50} duration={600}>
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <div className="ailys-section-no mb-5 justify-center">
              <span>{t.pricingDrivers.sectionLabel}</span>
            </div>
            <h2
              id="drivers-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-4"
            >
              {t.pricingDrivers.heading1}
              <br />
              <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t.pricingDrivers.heading2}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.pricingDrivers.intro}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {drivers.map((d, i) => (
            <ScrollReveal
              key={d.title}
              variant="fade-up"
              delay={150 + i * 80}
              duration={650}
            >
              <DriverCard driver={d} />
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="sr-only" aria-hidden="false">{t.pricingDrivers.srSeo}</div>
    </section>
  );
}

function DriverCard({ driver }: { driver: Driver }) {
  const Icon = driver.icon;
  const toneMap = {
    cyan: {
      iconBg: "bg-gradient-to-br from-cyan-400 to-teal-500",
      title: "bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent",
      border: "border-cyan-400/25 hover:border-cyan-400/50",
      glow: "shadow-[0_0_40px_-15px_rgba(34,211,238,0.175)]",
    },
    violet: {
      iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
      title: "bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent",
      border: "border-violet-400/30 hover:border-violet-400/55",
      glow: "shadow-[0_0_40px_-15px_rgba(167,139,250,0.2)]",
    },
    amber: {
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      title: "bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent",
      border: "border-amber-400/25 hover:border-amber-400/50",
      glow: "shadow-[0_0_40px_-15px_rgba(245,158,11,0.175)]",
    },
    emerald: {
      iconBg: "bg-gradient-to-br from-emerald-400 to-cyan-500",
      title: "bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent",
      border: "border-emerald-400/25 hover:border-emerald-400/50",
      glow: "shadow-[0_0_40px_-15px_rgba(52,211,153,0.175)]",
    },
    rose: {
      iconBg: "bg-gradient-to-br from-rose-400 to-pink-500",
      title: "bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent",
      border: "border-rose-400/25 hover:border-rose-400/50",
      glow: "shadow-[0_0_40px_-15px_rgba(244,114,182,0.175)]",
    },
  }[driver.tone];

  return (
    <article
      className={`group relative h-full rounded-2xl p-5 sm:p-6 border bg-card/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${toneMap.border} ${toneMap.glow}`}
    >
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${toneMap.iconBg} shadow-[inset_0_1px_0_rgba(255,255,255,0.125)]`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3
        className={`font-display text-xl mb-2.5 leading-tight font-semibold ${toneMap.title}`}
      >
        {driver.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {driver.body}
      </p>
    </article>
  );
}
