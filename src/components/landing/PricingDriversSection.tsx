import {
  Sparkles,
  Bot,
  Globe2,
  FileCode,
  Languages,
} from "lucide-react";
import { ScrollReveal } from "@/components/animation";

interface Driver {
  icon: typeof Sparkles;
  title: string;
  body: string;
  tone: "cyan" | "violet" | "amber" | "emerald" | "rose";
}

const drivers: Driver[] = [
  {
    icon: Bot,
    title: "LLM engine coverage",
    body: "We track citations across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. Each engine has its own ranking signals. Tier price scales with how many engines we actively optimize for, not just monitor.",
    tone: "cyan",
  },
  {
    icon: Globe2,
    title: "Industry complexity",
    body: "E-E-A-T weight varies by vertical. Healthcare and law need credentialed authorship and citation density that restaurants do not. We price by the depth of E-E-A-T work your industry actually requires.",
    tone: "violet",
  },
  {
    icon: FileCode,
    title: "Schema and entity scope",
    body: "Schema deployment effort scales with site size and CMS. A 5-page WordPress site is one shape of work. A 200-page Shopify catalog with multi-location is another. We quote against scope, not a pre-set package.",
    tone: "amber",
  },
  {
    icon: Languages,
    title: "Content language depth",
    body: "Bilingual EN and FR-CA is in every tier. Adding Spanish, Chinese, Arabic, Russian, Ukrainian, or Serbian via our partner network adds production cost. Each extra language pulls a separate citation footprint.",
    tone: "emerald",
  },
  {
    icon: Sparkles,
    title: "Citation acquisition pace",
    body: "Citation building is a real outreach effort. Five high-DA citations a month at Core, ten plus at Growth. The cost difference reflects research and outreach hours, not arbitrary tiering.",
    tone: "rose",
  },
];

export function PricingDriversSection() {
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
              <span>Pricing rationale</span>
            </div>
            <h2
              id="drivers-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-4"
            >
              Why AiLys pricing
              <br />
              <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                varies by client.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Anyone quoting "$X for SEO" without asking about your industry,
              site size, language scope, or competitor density is guessing.
              Five real things drive what your AiLys plan actually costs.
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
      glow: "shadow-[0_0_40px_-15px_rgba(34,211,238,0.35)]",
    },
    violet: {
      iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
      title: "bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent",
      border: "border-violet-400/30 hover:border-violet-400/55",
      glow: "shadow-[0_0_40px_-15px_rgba(167,139,250,0.4)]",
    },
    amber: {
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      title: "bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent",
      border: "border-amber-400/25 hover:border-amber-400/50",
      glow: "shadow-[0_0_40px_-15px_rgba(245,158,11,0.35)]",
    },
    emerald: {
      iconBg: "bg-gradient-to-br from-emerald-400 to-cyan-500",
      title: "bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent",
      border: "border-emerald-400/25 hover:border-emerald-400/50",
      glow: "shadow-[0_0_40px_-15px_rgba(52,211,153,0.35)]",
    },
    rose: {
      iconBg: "bg-gradient-to-br from-rose-400 to-pink-500",
      title: "bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent",
      border: "border-rose-400/25 hover:border-rose-400/50",
      glow: "shadow-[0_0_40px_-15px_rgba(244,114,182,0.35)]",
    },
  }[driver.tone];

  return (
    <article
      className={`group relative h-full rounded-2xl p-5 sm:p-6 border bg-card/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${toneMap.border} ${toneMap.glow}`}
    >
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${toneMap.iconBg} shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]`}
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
