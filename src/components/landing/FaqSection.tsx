import { useState } from "react";
import { ScrollReveal } from "@/components/animation";
import { Plus } from "lucide-react";

interface QA {
  number: string;
  q: string;
  a: string;
}

const faqs: QA[] = [
  {
    number: "01",
    q: "What is AEO?",
    a: "Answer Engine Optimization. We structure your content so AI engines like Google AI Overviews, Bing Copilot and ChatGPT pull a clean answer from your site instead of summarizing a competitor. The work is schema markup, structured Q and A formats, scannable content, and entity disambiguation.",
  },
  {
    number: "02",
    q: "What is GEO?",
    a: "Generative Engine Optimization. We get your brand named inside the actual responses of ChatGPT, Perplexity, Claude, and Gemini. The work is authoritative publications, Wikipedia and Wikidata presence, forum signals, and digital PR.",
  },
  {
    number: "03",
    q: "What is E-E-A-T?",
    a: "Experience, Expertise, Authoritativeness, Trust. Google's framework for evaluating content quality. AI engines use the same signals when picking who to cite. We make those signals visible: real bylines, first-hand experience markers, original data, credentials.",
  },
  {
    number: "04",
    q: "Why does AI search matter for a local business?",
    a: "ChatGPT alone runs roughly 60 billion queries a month. Perplexity is doubling year over year. Sixty percent of Fortune 500 employees use Claude for research. If your business is not cited in those answers, you are invisible to a growing share of buyers.",
  },
  {
    number: "05",
    q: "Is AiLys only for Québec businesses?",
    a: "We are anchored in Québec because that is our home market and our bilingual advantage. We also serve businesses across Canada, the United States, and Latin America. Spanish content is available.",
  },
  {
    number: "06",
    q: "How long until I see results?",
    a: "AI citations build over weeks to months, not days. Schema and GBP improvements show up in 30 to 60 days. Real LLM citation lift typically lands at the 90 to 120 day mark. We send a monthly citation report so you see the progression.",
  },
  {
    number: "07",
    q: "Do you guarantee rankings?",
    a: "No. Anyone who guarantees AI citations is selling you smoke. We promise process: a 90-day plan, monthly reports, and visible work. The citations follow.",
  },
  {
    number: "08",
    q: "What happens if I cancel?",
    a: "Two weeks notice and we wind down. You keep the schema we shipped, the citations we landed, and the audit reports. No clawbacks, no held assets.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("01");

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
              <span>06 / Questions</span>
            </div>
            <h2
              id="faq-heading"
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
            >
              Things people
              <br />
              <span className="italic">actually ask.</span>
            </h2>
          </ScrollReveal>
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
