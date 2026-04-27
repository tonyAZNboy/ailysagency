import { useMemo, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sliders } from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LangContext";

interface ServiceOption {
  id: string;
  label: string;
  description: string;
  monthlyAdd: number;
  minTier: 0 | 1 | 2 | 3; // 0=Starter, 1=Core, 2=Growth, 3=Autopilot
}

export function PricingBuilderSection() {
  const navigate = useNavigate();
  const { t } = useLang();

  const services: ServiceOption[] = [
    { id: "gbp", label: t.pricingBuilder.svc1Label, description: t.pricingBuilder.svc1Desc, monthlyAdd: 0, minTier: 0 },
    { id: "tracking", label: t.pricingBuilder.svc2Label, description: t.pricingBuilder.svc2Desc, monthlyAdd: 0, minTier: 0 },
    { id: "schema", label: t.pricingBuilder.svc3Label, description: t.pricingBuilder.svc3Desc, monthlyAdd: 150, minTier: 1 },
    { id: "citations5", label: t.pricingBuilder.svc4Label, description: t.pricingBuilder.svc4Desc, monthlyAdd: 150, minTier: 1 },
    { id: "citations10", label: t.pricingBuilder.svc5Label, description: t.pricingBuilder.svc5Desc, monthlyAdd: 350, minTier: 2 },
    { id: "content_bilingual", label: t.pricingBuilder.svc6Label, description: t.pricingBuilder.svc6Desc, monthlyAdd: 150, minTier: 1 },
    { id: "content_weekly", label: t.pricingBuilder.svc7Label, description: t.pricingBuilder.svc7Desc, monthlyAdd: 400, minTier: 2 },
    { id: "geo", label: t.pricingBuilder.svc8Label, description: t.pricingBuilder.svc8Desc, monthlyAdd: 300, minTier: 2 },
    { id: "competitor", label: t.pricingBuilder.svc9Label, description: t.pricingBuilder.svc9Desc, monthlyAdd: 100, minTier: 2 },
    { id: "contest", label: t.pricingBuilder.svc10Label, description: t.pricingBuilder.svc10Desc, monthlyAdd: 250, minTier: 3 },
  ];

  const languages = [
    { id: "en", label: t.pricingBuilder.lang1, multiplier: 1 },
    { id: "en-fr", label: t.pricingBuilder.lang2, multiplier: 1 },
    { id: "en-fr-es", label: t.pricingBuilder.lang3, multiplier: 1.15 },
    { id: "en-fr-es-zh", label: t.pricingBuilder.lang4, multiplier: 1.3 },
    { id: "all-eight", label: t.pricingBuilder.lang5, multiplier: 1.5 },
  ];

  function tierForPrice(p: number) {
    if (p <= 350) return { name: t.pricingBuilder.tierStarter, price: 300 };
    if (p <= 750) return { name: t.pricingBuilder.tierCore, price: 600 };
    if (p <= 1250) return { name: t.pricingBuilder.tierGrowth, price: 1200 };
    return { name: t.pricingBuilder.tierAutopilot, price: 1299 };
  }

  const [pages, setPages] = useState<number>(15);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "gbp",
    "tracking",
  ]);
  const [language, setLanguage] = useState<string>("en-fr");

  const computed = useMemo(() => {
    const base = 300; // Starter floor
    const pageScale = Math.min(150, Math.max(0, (pages - 5) * 4)); // up to +150 for 50 pages
    const servicesAdd = services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((acc, s) => acc + s.monthlyAdd, 0);
    const langMult = languages.find((l) => l.id === language)?.multiplier ?? 1;
    const subtotal = (base + pageScale + servicesAdd) * langMult;
    const clamped = Math.min(1299, Math.max(300, Math.round(subtotal / 50) * 50));
    return { subtotal: Math.round(subtotal), clamped, tier: tierForPrice(clamped) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, selectedServices, language]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const inputsRef = useRef<HTMLDivElement>(null);
  const breakdownRef = useRef<HTMLDivElement>(null);
  const [chipVisible, setChipVisible] = useState(false);
  const [pricePulsing, setPricePulsing] = useState(false);
  const lastPriceRef = useRef(computed.clamped);

  useEffect(() => {
    if (!inputsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setChipVisible(e.isIntersecting));
      },
      { rootMargin: "-80px 0px -120px 0px", threshold: 0 },
    );
    obs.observe(inputsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (lastPriceRef.current !== computed.clamped) {
      lastPriceRef.current = computed.clamped;
      setPricePulsing(true);
      const t2 = setTimeout(() => setPricePulsing(false), 600);
      return () => clearTimeout(t2);
    }
  }, [computed.clamped]);

  return (
    <section
      id="pricing-builder"
      className="relative py-24 sm:py-32 px-4 overflow-clip"
      aria-labelledby="builder-heading"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up" delay={50} duration={650}>
              <div className="ailys-section-no mb-6">
                <span>{t.pricingBuilder.sectionLabel}</span>
              </div>
              <h2
                id="builder-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                {t.pricingBuilder.heading1}
                <br />
                <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                  {t.pricingBuilder.heading2}
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t.pricingBuilder.intro}
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          {/* Inputs */}
          <div ref={inputsRef} className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-7 space-y-7">
              {/* Pages slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                    {t.pricingBuilder.pagesLabel}
                  </label>
                  <span className="font-display text-2xl tabular-nums">
                    {pages}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted/40 accent-primary"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--secondary)) ${pages}%, hsl(var(--muted)) ${pages}%)`,
                  }}
                />
                <div className="flex justify-between mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
                  <span>1</span>
                  <span>50</span>
                  <span>100+</span>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80 block mb-3">
                  {t.pricingBuilder.languagesLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLanguage(l.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        language === l.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 bg-background/30 text-muted-foreground hover:border-border"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80 block mb-3">
                  {t.pricingBuilder.servicesLabel}
                </label>
                <div className="space-y-2">
                  {services.map((s) => {
                    const active = selectedServices.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          active
                            ? "border-primary/40 bg-primary/[0.06]"
                            : "border-border/40 bg-background/30 hover:bg-background/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleService(s.id)}
                          className="mt-1 h-4 w-4 rounded border-border accent-primary cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground/95">
                              {s.label}
                            </span>
                            {s.monthlyAdd > 0 && (
                              <span className="font-mono text-[10px] text-muted-foreground/70">
                                +${s.monthlyAdd}/mo
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {s.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

          {/* Price output (sticky on desktop, follows scroll) */}
          <div ref={breakdownRef} className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-6 sm:p-7 lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/40">
                <Sliders className="w-4 h-4 text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                  {t.pricingBuilder.estimatedHeading}
                </span>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="font-display text-2xl text-muted-foreground/70">$</span>
                  <span className="font-display text-7xl leading-none tracking-tight bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent tabular-nums">
                    {computed.clamped}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60 ml-1">
                    /mo CAD
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  {t.pricingBuilder.closestTier} · {computed.tier.name}
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-muted-foreground border-t border-border/30 pt-4">
                <Row label={t.pricingBuilder.rowPages} value={`${pages}`} />
                <Row label={t.pricingBuilder.rowLanguages} value={languages.find((l) => l.id === language)?.label ?? "."} />
                <Row label={t.pricingBuilder.rowServices} value={`${selectedServices.length} ${t.pricingBuilder.servicesSelected}`} />
              </div>

              <Button
                onClick={() => navigate("/audit")}
                className="w-full rounded-full font-semibold mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  boxShadow: "0 0 24px -8px hsl(var(--primary) / 0.5)",
                }}
              >
                {t.pricingBuilder.startWith} {computed.tier.name}
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-[10px] text-center text-muted-foreground/70 font-mono uppercase tracking-[0.18em]">
              {t.pricingBuilder.legal}
            </p>
          </div>
        </div>

        <ScrollReveal variant="fade-up" delay={500} duration={600}>
          <p className="mt-10 text-center text-xs font-mono text-muted-foreground/60 max-w-2xl mx-auto">
            <span className="ailys-cite">†</span> {t.pricingBuilder.footnote}
          </p>
        </ScrollReveal>
      </div>

      {/* Mobile floating price chip */}
      <div
        aria-hidden={!chipVisible}
        className="lg:hidden fixed left-3 z-[51] transition-all duration-300 ease-out max-w-[calc(100vw-1.5rem)]"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
          opacity: chipVisible ? 1 : 0,
          transform: chipVisible ? "translateY(0)" : "translateY(1rem)",
          pointerEvents: chipVisible ? "auto" : "none",
        }}
      >
        <button
          type="button"
          onClick={() =>
            breakdownRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="group flex items-center gap-2.5 pl-3 pr-1.5 py-1.5 rounded-full border border-primary/40 bg-background/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_-8px_hsl(var(--primary)/0.6)]"
          aria-label={t.pricingBuilder.chipAria}
        >
          <Sliders className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <div className="flex items-baseline gap-1 leading-none">
            <span
              className={`font-display tabular-nums bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent transition-transform duration-300 ${
                pricePulsing ? "scale-110" : "scale-100"
              }`}
              style={{ fontSize: "1.35rem" }}
            >
              ${computed.clamped}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70">
              {computed.tier.name}
            </span>
          </div>
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-background flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
            }}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
      <div className="sr-only" aria-hidden="false">{t.pricingBuilder.srSeo}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground/70">{label}</span>
      <span className="font-mono text-foreground tabular-nums">{value}</span>
    </div>
  );
}
