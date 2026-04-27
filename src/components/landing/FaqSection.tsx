import { useState } from "react";
import { ScrollReveal } from "@/components/animation";
import { Plus } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

interface QA {
  number: string;
  q: string;
  a: string;
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("01");
  const { t } = useLang();

  const faqs: QA[] = [
    { number: "01", q: t.faqLanding.q1, a: t.faqLanding.a1 },
    { number: "02", q: t.faqLanding.q2, a: t.faqLanding.a2 },
    { number: "03", q: t.faqLanding.q3, a: t.faqLanding.a3 },
    { number: "04", q: t.faqLanding.q4, a: t.faqLanding.a4 },
    { number: "05", q: t.faqLanding.q5, a: t.faqLanding.a5 },
    { number: "06", q: t.faqLanding.q6, a: t.faqLanding.a6 },
    { number: "07", q: t.faqLanding.q7, a: t.faqLanding.a7 },
    { number: "08", q: t.faqLanding.q8, a: t.faqLanding.a8 },
    { number: "09", q: t.faqLanding.q9, a: t.faqLanding.a9 },
    { number: "10", q: t.faqLanding.q10, a: t.faqLanding.a10 },
    { number: "11", q: t.faqLanding.q11, a: t.faqLanding.a11 },
  ];

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 px-4"
      aria-labelledby="faq-heading"
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="mb-14 lg:mb-20">
          <ScrollReveal variant="fade-up" delay={50} duration={600}>
            <div className="ailys-section-no mb-6">
              <span>{t.faqLanding.sectionLabel}</span>
            </div>
            <h2
              id="faq-heading"
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
            >
              {t.faqLanding.heading1}
              <br />
              <span className="italic">{t.faqLanding.heading2}</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* sr-only SEO block: bots get full Q+A summary regardless of accordion state */}
        <div className="sr-only" aria-hidden="false">
          {t.faqLanding.srSeo}
          <ul>
            {faqs.map((faq) => (
              <li key={faq.number}>
                <strong>{faq.q}</strong> {faq.a}
              </li>
            ))}
          </ul>
        </div>

        <div className="divide-y divide-border/40 border-y border-border/40">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.number;
            return (
              <ScrollReveal
                key={faq.number}
                variant="fade-up"
                delay={i * 50}
                duration={500}
              >
                <div className="group">
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.number)}
                    className="w-full text-left py-7 sm:py-8 grid grid-cols-[60px_1fr_44px] items-start gap-4 sm:gap-6 hover:bg-foreground/[0.015] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono text-xs tabular-nums text-muted-foreground/60 pt-2">
                      {faq.number}
                    </span>
                    <span
                      className={`font-display text-2xl sm:text-3xl leading-tight transition-colors ${
                        isOpen ? "text-foreground" : "text-foreground/80"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "bg-primary border-primary rotate-45"
                          : "border-border/60 group-hover:border-primary/50"
                      }`}
                    >
                      <Plus
                        className={`w-4 h-4 transition-colors ${
                          isOpen ? "text-primary-foreground" : "text-foreground/70"
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-[60px_1fr_44px] gap-4 sm:gap-6 pb-8">
                        <span aria-hidden="true" />
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
