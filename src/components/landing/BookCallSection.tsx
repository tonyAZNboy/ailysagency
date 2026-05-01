import { Button } from "@/components/ui/button";
import { CalendarClock, Globe2, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { useLang } from "@/i18n/LangContext";

const CONTACT_EMAIL = "hello@ailysagency.ca";

interface Language {
  code: string;
  name: string;
  native: string;
  type: "in-house" | "partner";
  flag: string;
}

export function BookCallSection() {
  const { t } = useLang();

  const languages: Language[] = [
    { code: "en", name: t.bookCall.lang1Name, native: "English", type: "in-house", flag: "🇨🇦" },
    { code: "fr", name: t.bookCall.lang2Name, native: "Français", type: "in-house", flag: "⚜" },
    { code: "es", name: t.bookCall.lang3Name, native: "Español", type: "in-house", flag: "🇪🇸" },
    { code: "zh", name: t.bookCall.lang4Name, native: "中文", type: "partner", flag: "🇨🇳" },
    { code: "ar", name: t.bookCall.lang5Name, native: "العربية", type: "partner", flag: "🇦🇪" },
    { code: "ru", name: t.bookCall.lang6Name, native: "Русский", type: "partner", flag: "🇷🇺" },
    { code: "uk", name: t.bookCall.lang7Name, native: "Українська", type: "partner", flag: "🇺🇦" },
    { code: "sr", name: t.bookCall.lang8Name, native: "Srpski", type: "partner", flag: "🇷🇸" },
  ];

  return (
    <section
      id="book-call"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      aria-labelledby="book-call-heading"
    >
      {/* Decorative diagonal accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 28px, hsl(var(--secondary)) 28px, hsl(var(--secondary)) 29px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: header + language list */}
          <div className="min-w-0 lg:col-span-6">
            <ScrollReveal variant="fade-up" delay={50} duration={650}>
              <div className="ailys-section-no mb-6">
                <span>{t.bookCall.sectionLabel}</span>
              </div>
              <h2
                id="book-call-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-5"
              >
                {t.bookCall.heading1}
                <br />
                <span className="italic">{t.bookCall.heading2}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose mb-8">
                {t.bookCall.intro}
              </p>

              {/* Languages spoken */}
              <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe2 className="w-4 h-4 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
                    {t.bookCall.languagesLabel}
                  </span>
                </div>
                <ul className="grid grid-cols-2 gap-2.5">
                  {languages.map((l) => (
                    <li
                      key={l.code}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        l.type === "in-house"
                          ? "border-primary/30 bg-primary/5"
                          : "border-border/40 bg-background/40"
                      }`}
                    >
                      <span className="text-base leading-none">{l.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground/95 truncate">
                          {l.native}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
                          {l.type === "in-house" ? t.bookCall.inHouse : t.bookCall.partner}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground/70 leading-relaxed">
                  {t.bookCall.languagesNote}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: coming-soon placeholder */}
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <ScrollReveal variant="fade-up" delay={150} duration={700}>
              <ComingSoonCard />
            </ScrollReveal>
          </div>
        </div>
      </div>
      <div className="sr-only" aria-hidden="false">{t.bookCall.srSeo}</div>
    </section>
  );
}

function ComingSoonCard() {
  const { t } = useLang();
  return (
    <div
      className="rounded-2xl border border-secondary/30 bg-card/40 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_-15px_hsl(var(--secondary)/0.35)]"
    >
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/40">
        <CalendarClock className="w-4 h-4 text-secondary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
          {t.bookCall.comingSoonLabel}
        </span>
      </div>

      <h3 className="font-display text-3xl sm:text-4xl leading-tight mb-4">
        {t.bookCall.comingSoonHeading}
      </h3>
      <p className="text-base text-muted-foreground leading-relaxed mb-6">
        {t.bookCall.comingSoonBody}
      </p>

      <Button
        asChild
        size="lg"
        className="w-full rounded-full font-semibold"
        style={{
          boxShadow:
            "0 0 24px hsl(var(--secondary) / 0.4), 0 0 48px hsl(var(--primary) / 0.2)",
          background:
            "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))",
        }}
      >
        <a href={`mailto:${CONTACT_EMAIL}`}>
          <Mail className="w-4 h-4 mr-2" />
          {t.bookCall.comingSoonCta}
        </a>
      </Button>
      <p className="mt-3 text-[11px] text-muted-foreground/70 text-center font-mono tracking-wide">
        {CONTACT_EMAIL}
      </p>
    </div>
  );
}
