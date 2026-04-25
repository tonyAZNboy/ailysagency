import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sliders } from "lucide-react";
import { ScrollReveal } from "@/components/animation";
import { useNavigate } from "react-router-dom";

interface ServiceOption {
  id: string;
  label: string;
  description: string;
  monthlyAdd: number;
  minTier: 0 | 1 | 2 | 3; // 0=Starter, 1=Core, 2=Growth, 3=Autopilot
}

const services: ServiceOption[] = [
  { id: "gbp", label: "GBP management", description: "Categories, attributes, photos, Q&A.", monthlyAdd: 0, minTier: 0 },
  { id: "tracking", label: "LLM citation tracking", description: "Across 6 AI engines, weekly polls.", monthlyAdd: 0, minTier: 0 },
  { id: "schema", label: "AEO schema deployment", description: "FAQ + Review + LocalBusiness + HowTo.", monthlyAdd: 150, minTier: 1 },
  { id: "citations5", label: "Citation building (5/mo)", description: "High-DA submissions, NAP consistency.", monthlyAdd: 150, minTier: 1 },
  { id: "citations10", label: "Citation building (10+/mo)", description: "Aggressive citation pace + outreach.", monthlyAdd: 350, minTier: 2 },
  { id: "content_bilingual", label: "Bilingual content (EN+FR)", description: "1 piece/month.", monthlyAdd: 150, minTier: 1 },
  { id: "content_weekly", label: "Weekly content production", description: "4 pieces/month, multilingual capable.", monthlyAdd: 400, minTier: 2 },
  { id: "geo", label: "GEO entity authority work", description: "Wikipedia, Wikidata, digital PR.", monthlyAdd: 300, minTier: 2 },
  { id: "competitor", label: "Competitive monitoring", description: "Weekly tracker + monthly insights doc.", monthlyAdd: 100, minTier: 2 },
  { id: "contest", label: "Monthly review contest engine", description: "Reviuzy SaaS + done-for-you contest.", monthlyAdd: 250, minTier: 3 },
];

const languages = [
  { id: "en", label: "EN only", multiplier: 1 },
  { id: "en-fr", label: "EN + FR-CA", multiplier: 1 },
  { id: "en-fr-es", label: "EN + FR + ES", multiplier: 1.15 },
  { id: "en-fr-es-zh", label: "EN + FR + ES + ZH", multiplier: 1.3 },
  { id: "all-eight", label: "All 8 languages", multiplier: 1.5 },
];

function tierForPrice(p: number) {
  if (p <= 350) return { name: "Starter", price: 300 };
  if (p <= 750) return { name: "Core", price: 600 };
  if (p <= 1250) return { name: "Growth", price: 1200 };
  return { name: "Autopilot", price: 1299 };
}

export function PricingBuilderSection() {
  const navigate = useNavigate();
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
  }, [pages, selectedServices, language]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <section
      id="pricing-builder"
      className="relative py-24 sm:py-32 px-4 overflow-hidden"
      aria-labelledby="builder-heading"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up" delay={50} duration={650}>
              <div className="ailys-section-no mb-6">
                <span>Plan builder</span>
              </div>
              <h2
                id="builder-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              >
                Build your plan,
                <br />
                <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                  see the price.
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <ScrollReveal variant="fade-up" delay={150} duration={650}>
              <p className="text-base text-muted-foreground leading-relaxed">
                Adjust the inputs. The price snaps to one of our four tiers
                ($300 to $1,299). No "request a quote" theatre.
              </p>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal variant="fade-up" delay={200} duration={700}>
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            {/* Inputs */}
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-6 sm:p-7 space-y-7">
              {/* Pages slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                    Pages on your site
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
                  Languages served
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
                  Services included
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

            {/* Price output */}
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-6 sm:p-7 lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/40">
                <Sliders className="w-4 h-4 text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                  Your estimated plan
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
                  Closest tier · {computed.tier.name}
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-muted-foreground border-t border-border/30 pt-4">
                <Row label="Pages" value={`${pages}`} />
                <Row label="Languages" value={languages.find((l) => l.id === language)?.label ?? "—"} />
                <Row label="Services" value={`${selectedServices.length} selected`} />
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
                Start with {computed.tier.name}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[10px] text-center text-muted-foreground/70 font-mono uppercase tracking-[0.18em]">
                Free audit first · No credit card
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={500} duration={600}>
          <p className="mt-10 text-center text-xs font-mono text-muted-foreground/60 max-w-2xl mx-auto">
            <span className="ailys-cite">†</span> Estimates only. Final pricing
            is locked at contract signature. Plans are month to month with two
            weeks notice to cancel.
          </p>
        </ScrollReveal>
      </div>
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
