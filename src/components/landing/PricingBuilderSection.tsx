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
  minTier: 0 | 1 | 2 | 3; // 0=Starter, 1=Core, 2=Growth, 3=Agency
}

interface ExtraLanguageOption {
  id: string;
  label: string;
}

const EXTRA_LANGUAGE_PRICE = 50;
const REVIUZY_ADDON_PRICE = 100;
const TECH_HEALTH_PACK_PRICE = 150;
const GSC_INDEXATION_AUDIT_FROM = 100;
const NFC_CARD_SERVICE_ONETIME = 100;
const PREMIUM_OPS_INDIVIDUAL = 35;
const PREMIUM_OPS_BUNDLE = 79;

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
  ];

  // Extra-cost languages beyond the always-included EN + FR-CA base.
  // Each adds +$50/mo to the calculated plan price.
  const extraLanguageOptions: ExtraLanguageOption[] = [
    { id: "es", label: t.pricingBuilder.langEs },
    { id: "zh", label: t.pricingBuilder.langZh },
    { id: "ar", label: t.pricingBuilder.langAr },
    { id: "ru", label: t.pricingBuilder.langRu },
    { id: "uk", label: t.pricingBuilder.langUk },
    { id: "sr", label: t.pricingBuilder.langSr },
  ];

  function tierForPrice(p: number) {
    if (p <= 350) return { name: t.pricingBuilder.tierStarter, price: 300 };
    if (p <= 750) return { name: t.pricingBuilder.tierCore, price: 600 };
    if (p <= 1250) return { name: t.pricingBuilder.tierGrowth, price: 1200 };
    return { name: t.pricingBuilder.tierAutopilot, price: 2500 };
  }

  const [pages, setPages] = useState<number>(15);
  const [selectedServices, setSelectedServices] = useState<string[]>(["gbp", "tracking"]);
  const [extraLanguages, setExtraLanguages] = useState<Set<string>>(new Set());
  const [reviuzyAddon, setReviuzyAddon] = useState<boolean>(false);
  const [techHealthPack, setTechHealthPack] = useState<boolean>(false);
  const [gscIndexationAudit, setGscIndexationAudit] = useState<boolean>(false);
  const [nfcCardService, setNfcCardService] = useState<boolean>(false);
  const [domainShield, setDomainShield] = useState<boolean>(false);
  const [domainSpeedBoost, setDomainSpeedBoost] = useState<boolean>(false);
  const [dedicatedStrategist, setDedicatedStrategist] = useState<boolean>(false);

  // Pricing model:
  //   base + page scale + services -> snap to one of 4 tiers
  //   + extra language fee ($50 per language beyond EN+FR-CA)
  //   + Reviuzy add-on ($100, free on Agency)
  //   + Premium Ops items: bundle ($79 for the trio) OR individual ($35 each), free on Agency
  //
  // Page scale uses stepped 10-page brackets (per agency directive):
  //   1-9 pages    -> $0   (covered by base)
  //   10-19 pages  -> +$30
  //   20-29 pages  -> +$60
  //   30-39 pages  -> +$90
  //   40-49 pages  -> +$120
  //   50+ pages    -> +$150 (cap)
  // Each jump of 10 pages adds $30 to the recurring monthly tier price.
  const computed = useMemo(() => {
    const base = 300;
    const pageScale = Math.min(150, Math.max(0, Math.floor(pages / 10) * 30));
    const servicesAdd = services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((acc, s) => acc + s.monthlyAdd, 0);
    const subtotal = base + pageScale + servicesAdd;
    const tierPrice = Math.min(2500, Math.max(300, Math.round(subtotal / 50) * 50));
    const tier = tierForPrice(tierPrice);
    const isAgency = tier.price === 2500;

    const languageCost = extraLanguages.size * EXTRA_LANGUAGE_PRICE;

    const allThreeOps = domainShield && domainSpeedBoost && dedicatedStrategist;
    const opsIndividualCount =
      (domainShield ? 1 : 0) + (domainSpeedBoost ? 1 : 0) + (dedicatedStrategist ? 1 : 0);
    const opsCost = isAgency
      ? 0
      : allThreeOps
        ? PREMIUM_OPS_BUNDLE
        : opsIndividualCount * PREMIUM_OPS_INDIVIDUAL;
    const reviuzyCost = isAgency ? 0 : reviuzyAddon ? REVIUZY_ADDON_PRICE : 0;
    const techHealthCost = isAgency ? 0 : techHealthPack ? TECH_HEALTH_PACK_PRICE : 0;
    const addonsCost = reviuzyCost + techHealthCost + opsCost;
    const clamped = tierPrice + languageCost + addonsCost;

    return {
      subtotal: Math.round(subtotal),
      tierPrice,
      languageCost,
      reviuzyCost,
      techHealthCost,
      opsCost,
      allThreeOps,
      opsIndividualCount,
      addonsCost,
      clamped,
      tier,
      isAgency,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pages,
    selectedServices,
    extraLanguages,
    reviuzyAddon,
    techHealthPack,
    domainShield,
    domainSpeedBoost,
    dedicatedStrategist,
  ]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleLanguage = (id: string) => {
    setExtraLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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
                <span className="font-display text-2xl tabular-nums">{pages}</span>
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

            {/* Languages — EN + FR-CA included, each extra adds $50/mo */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80">
                  {t.pricingBuilder.languagesLabel}
                </label>
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  +${EXTRA_LANGUAGE_PRICE}/{t.pricingBuilder.perLangSuffix}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-400/40 bg-emerald-500/[0.08] text-emerald-200">
                  {t.pricingBuilder.langIncluded}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {extraLanguageOptions.map((l) => {
                  const active = extraLanguages.has(l.id);
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => toggleLanguage(l.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-between gap-2 ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 bg-background/30 text-muted-foreground hover:border-border"
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="font-mono text-[9px] opacity-70">+${EXTRA_LANGUAGE_PRICE}</span>
                    </button>
                  );
                })}
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
                          <span className="text-sm font-medium text-foreground/95">{s.label}</span>
                          {s.monthlyAdd > 0 && (
                            <span className="font-mono text-[10px] text-muted-foreground/70">
                              +${s.monthlyAdd}/mo
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Add-ons section */}
            <div className="pt-2 space-y-3">
              <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80 block">
                {t.pricingBuilder.addOnSectionLabel}
              </label>

              {/* Reviuzy automation add-on */}
              <AddonRow
                checked={reviuzyAddon || computed.isAgency}
                disabled={computed.isAgency}
                onToggle={() => setReviuzyAddon((v) => !v)}
                accent="emerald"
                title={t.pricingBuilder.addOnLabel}
                description={t.pricingBuilder.addOnDesc}
                priceLabel={
                  computed.isAgency
                    ? t.pricingBuilder.addOnIncludedNote
                    : `+$${REVIUZY_ADDON_PRICE}/${t.pricingBuilder.perMoSuffix}`
                }
                priceTone={computed.isAgency ? "muted-included" : "default"}
              />

              {/* Tech Health Pack: GSC indexation monitoring + auto-reindex of monthly blogs */}
              <AddonRow
                checked={techHealthPack || computed.isAgency}
                disabled={computed.isAgency}
                onToggle={() => setTechHealthPack((v) => !v)}
                accent="emerald"
                title={t.pricingBuilder.techHealthPackLabel}
                description={t.pricingBuilder.techHealthPackDesc}
                priceLabel={
                  computed.isAgency
                    ? t.pricingBuilder.addOnIncludedNote
                    : `+$${TECH_HEALTH_PACK_PRICE}/${t.pricingBuilder.perMoSuffix}`
                }
                priceTone={computed.isAgency ? "muted-included" : "default"}
              />

              {/* GSC Indexation Audit (one-time, priced by site size) */}
              <AddonRow
                checked={gscIndexationAudit}
                disabled={false}
                onToggle={() => setGscIndexationAudit((v) => !v)}
                accent="emerald"
                title={t.pricingBuilder.gscIndexationLabel}
                description={t.pricingBuilder.gscIndexationDesc}
                priceLabel={`${t.pricingBuilder.fromPrefix} +$${GSC_INDEXATION_AUDIT_FROM} ${t.pricingBuilder.oneTimeSuffix}`}
                priceTone="default"
              />

              {/* AiLys NFC card service (one-time, 3 pre-programmed cards) */}
              <AddonRow
                checked={nfcCardService}
                disabled={false}
                onToggle={() => setNfcCardService((v) => !v)}
                accent="emerald"
                title={t.pricingBuilder.nfcServiceLabel}
                description={t.pricingBuilder.nfcServiceDesc}
                priceLabel={`+$${NFC_CARD_SERVICE_ONETIME} ${t.pricingBuilder.oneTimeSuffix}`}
                priceTone="default"
              />

              {/* Premium Ops trio */}
              <div className="rounded-lg border border-cyan-400/30 bg-cyan-500/[0.04] p-3 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground/95">
                    {t.pricingBuilder.premiumOpsTitle}
                  </span>
                  {computed.isAgency ? (
                    <span className="font-mono text-[10px] text-emerald-300">
                      {t.pricingBuilder.addOnIncludedNote}
                    </span>
                  ) : computed.allThreeOps ? (
                    <span className="font-mono text-[10px] text-cyan-300">
                      {t.pricingBuilder.bundleAppliedLabel} +${PREMIUM_OPS_BUNDLE}
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-muted-foreground/70">
                      {t.pricingBuilder.bundleSavingsHint}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.pricingBuilder.premiumOpsDesc}
                </p>

                <AddonRow
                  checked={domainShield || computed.isAgency}
                  disabled={computed.isAgency}
                  onToggle={() => setDomainShield((v) => !v)}
                  accent="cyan"
                  title={t.pricingBuilder.domainShieldLabel}
                  description={t.pricingBuilder.domainShieldDesc}
                  priceLabel={
                    computed.isAgency
                      ? t.pricingBuilder.addOnIncludedNote
                      : `+$${PREMIUM_OPS_INDIVIDUAL}/${t.pricingBuilder.perMoSuffix}`
                  }
                  priceTone={computed.isAgency ? "muted-included" : "default"}
                  compact
                />
                <AddonRow
                  checked={domainSpeedBoost || computed.isAgency}
                  disabled={computed.isAgency}
                  onToggle={() => setDomainSpeedBoost((v) => !v)}
                  accent="cyan"
                  title={t.pricingBuilder.domainSpeedBoostLabel}
                  description={t.pricingBuilder.domainSpeedBoostDesc}
                  priceLabel={
                    computed.isAgency
                      ? t.pricingBuilder.addOnIncludedNote
                      : `+$${PREMIUM_OPS_INDIVIDUAL}/${t.pricingBuilder.perMoSuffix}`
                  }
                  priceTone={computed.isAgency ? "muted-included" : "default"}
                  compact
                />
                <AddonRow
                  checked={dedicatedStrategist || computed.isAgency}
                  disabled={computed.isAgency}
                  onToggle={() => setDedicatedStrategist((v) => !v)}
                  accent="cyan"
                  title={t.pricingBuilder.dedicatedStrategistLabel}
                  description={t.pricingBuilder.dedicatedStrategistDesc}
                  priceLabel={
                    computed.isAgency
                      ? t.pricingBuilder.addOnIncludedNote
                      : `+$${PREMIUM_OPS_INDIVIDUAL}/${t.pricingBuilder.perMoSuffix}`
                  }
                  priceTone={computed.isAgency ? "muted-included" : "default"}
                  compact
                />
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
                <span
                  className={`font-display text-7xl leading-none tracking-tight bg-gradient-to-br from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent tabular-nums transition-transform duration-300 ${
                    pricePulsing ? "scale-105" : "scale-100"
                  }`}
                >
                  {computed.clamped}
                </span>
                <span className="font-mono text-xs text-muted-foreground/60 ml-1">/mo CAD</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                {t.pricingBuilder.closestTier} · {computed.tier.name}
              </div>
            </div>

            <div className="space-y-2 mb-6 text-xs text-muted-foreground border-t border-border/30 pt-4">
              <Row label={t.pricingBuilder.rowPages} value={`${pages}`} />
              <Row
                label={t.pricingBuilder.rowLanguages}
                value={
                  extraLanguages.size === 0
                    ? t.pricingBuilder.langIncluded
                    : `${t.pricingBuilder.langIncluded} +${extraLanguages.size} (+$${computed.languageCost})`
                }
              />
              <Row
                label={t.pricingBuilder.rowServices}
                value={`${selectedServices.length} ${t.pricingBuilder.servicesSelected}`}
              />
              <Row
                label={t.pricingBuilder.addOnRowLabel}
                value={
                  computed.isAgency
                    ? t.pricingBuilder.addOnIncludedNote
                    : reviuzyAddon
                      ? `${t.pricingBuilder.addOnRowOn} +$${REVIUZY_ADDON_PRICE}`
                      : t.pricingBuilder.addOnRowOff
                }
              />
              <Row
                label={t.pricingBuilder.premiumOpsRowLabel}
                value={
                  computed.isAgency
                    ? t.pricingBuilder.addOnIncludedNote
                    : computed.allThreeOps
                      ? `${t.pricingBuilder.bundleAppliedLabel} +$${PREMIUM_OPS_BUNDLE}`
                      : computed.opsIndividualCount === 0
                        ? t.pricingBuilder.addOnRowOff
                        : `${computed.opsIndividualCount} × $${PREMIUM_OPS_INDIVIDUAL} = +$${computed.opsCost}`
                }
              />
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

interface AddonRowProps {
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
  accent: "emerald" | "cyan";
  title: string;
  description: string;
  priceLabel: string;
  priceTone: "default" | "muted-included";
  compact?: boolean;
}

function AddonRow({
  checked,
  disabled,
  onToggle,
  accent,
  title,
  description,
  priceLabel,
  priceTone,
  compact,
}: AddonRowProps) {
  const accentBorder =
    accent === "emerald"
      ? checked
        ? "border-emerald-400/50 bg-emerald-500/[0.08]"
        : "border-border/40 bg-background/30 hover:bg-background/50"
      : checked
        ? "border-cyan-400/50 bg-cyan-500/[0.08]"
        : "border-border/40 bg-background/30 hover:bg-background/50";
  const accentClass =
    accent === "emerald" ? "accent-emerald-500" : "accent-cyan-500";

  return (
    <label
      className={`flex items-start gap-3 ${compact ? "p-2.5" : "p-4"} rounded-lg border cursor-pointer transition-all ${accentBorder} ${disabled ? "opacity-90" : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => !disabled && onToggle()}
        className={`mt-1 h-4 w-4 rounded border-border ${accentClass} cursor-pointer disabled:opacity-60`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={`${compact ? "text-sm" : "text-sm font-semibold"} text-foreground/95`}
          >
            {title}
          </span>
          <span
            className={`font-mono text-[10px] tracking-wide ${
              priceTone === "muted-included"
                ? "text-emerald-300"
                : "text-muted-foreground/70"
            }`}
          >
            {priceLabel}
          </span>
        </div>
        <p
          className={`text-xs text-muted-foreground ${compact ? "mt-0.5" : "mt-1"} leading-relaxed`}
        >
          {description}
        </p>
      </div>
    </label>
  );
}
