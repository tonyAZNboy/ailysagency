// /forfaits-complets (FR) and /pricing-details (EN)
//
// Phase E.1.4 + E.1.5 + E.1.6 + E.1.7: detailed pricing page with sticky
// comparison grid, engagement toggle (mensuel/annuel/biennal), Quebec tax
// toggle, "show only differences" toggle, website construction grid +
// cancellation calculator, 90-day uplift guarantee section.
//
// Bilingual EN+FR-CA strings inline (data file) to avoid 100+ new i18n
// keys in every locale (CLAUDE.md hard rule #4 + #8 placeholder fatigue).
//
// Mobile-first: 375x812 baseline, sticky tier nav pill + horizontal swipe
// scroll-snap on small screens, full grid on tablets+.

import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, Check, X, Star } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { SEOHead } from "@/components/seo";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import {
  TIER_COMPARISON,
  TIERS,
  ENGAGEMENT_OPTIONS,
  applyEngagement,
  applyTax,
  type EngagementMode,
  type TierMeta,
  type TierCell,
  type TierRow,
} from "@/data/tier-comparison";

const COPY = {
  en: {
    pageTitle: "Detailed plans and full comparison",
    pageDescription: "60+ feature comparison across all 4 AiLys plans, engagement discounts up to 20%, website construction tier eligibility, and our 90-day measurable visibility uplift guarantee.",
    heroEyebrow: "Plans and pricing",
    heroTitle: "Every feature, every plan, every detail.",
    heroSubtitle: "Compare 4 plans side by side. See exactly what is included, what is bundled, what is an add-on. Lock in 15% with annual prepay or 20% with biennial on Growth and Agency.",
    engagementLabel: "Engagement",
    engagementMonthly: "Monthly",
    engagementAnnual: "Annual (-15%)",
    engagementBiennial: "Biennial (-20%)",
    engagementBiennialOnly: "Biennial available on Growth and Agency only.",
    taxToggleOff: "Prices before tax",
    taxToggleOn: "Prices with TPS + TVQ (14.975%)",
    diffToggleLabel: "Show only differences",
    diffToggleOff: "Showing all rows",
    diffToggleOn: "Showing differences only",
    perMonth: "/mo",
    perMonthTaxIncl: "/mo (tax incl)",
    popular: "MOST POPULAR",
    chooseTier: "Choose this plan",
    chooseAgency: "Talk to us",
    websiteSection: "Website construction service",
    websiteIntro: "We build your site too. Build cost amortized over 6 months on top of your monthly plan. Cancel within 6 months and a recovery fee applies, calculated linearly. After month 6, zero cancellation fee on the build cost.",
    websiteVitrine: "Vitrine site (1-5 pages)",
    websiteVitrinePrice: "$800",
    websiteVitrineEligible: "Eligible Starter, Core, Growth",
    websitePme: "PME site (6-15 pages, blog, forms)",
    websitePmePrice: "$1,500",
    websitePmeEligible: "Eligible Core, Growth",
    websiteCommerce: "Commerce site (16-25 pages, integrations)",
    websiteCommercePrice: "$3,000+",
    websiteCommerceEligible: "Growth tier only",
    websiteAgencyNote: "Website service not offered on the Agency tier (clients on this tier typically have their own dev team or creative agency).",
    cancellationLabel: "Cancellation fee preview",
    cancellationMonths: (m: number) => `If you cancel after ${m} ${m === 1 ? "month" : "months"}`,
    cancellationFee: (fee: number) => `Recovery fee: $${fee.toLocaleString("en-CA")}`,
    cancellationZero: "No cancellation fee, the build is fully amortized.",
    notIncludedTitle: "What is NOT included (we believe in honesty)",
    notIncludedItems: [
      "Active link-building outreach to bloggers, journalists, podcasts",
      "Wikipedia article creation or editing on your behalf",
      "Reddit or Quora participation by our team in your name",
      "Custom photography or videography on your premises",
      "Long-form ad copywriting (Facebook Ads, Google Ads creatives)",
      "Press release distribution to mass media",
    ],
    notIncludedNote: "These services require human-only authentic participation, expert relationships, or editorial gatekeeping that we do not staff. If you need them, we honestly redirect you to a partner specialist.",
    guaranteeTitle: "90-day measurable visibility guarantee",
    guaranteeBody: "On Core, Growth, and Agency plans: if your Share of Model score does not increase by at least 15 points within 90 days from onboarding, we refund 100% of the last 3 months billed. Measured by our weekly probes across 6 AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot).",
    guaranteeEligible: "Eligible plans: Core, Growth, Agency",
    guaranteeNotEligible: "Not eligible: Starter (insufficient probe frequency for measurable signal)",
    bookCta: "Book a free 15-minute strategy call",
    backToLanding: "Back to plans overview",
    addonNote: "Reviuzy reputation add-on (NFC + AI replies + contest engine) is bundled in Agency or +$100/mo on Starter, Core, Growth.",
    monthsLabel: (m: number) => `${m}`,
    sectionDifferentiation: "Plan differences",
    intlAddonNote: "International citation packs (USA via BrightLocal +$199/mo, EU via Marquant +$349/mo) coming soon. Eligible on Growth and Agency at launch.",
  },
  fr: {
    pageTitle: "Forfaits detailles et comparaison complete",
    pageDescription: "Comparaison 60+ fonctionnalites sur les 4 forfaits AiLys, remises d'engagement jusqu'a 20%, eligibilite construction de site par tier, et notre garantie de hausse de visibilite mesurable a 90 jours.",
    heroEyebrow: "Forfaits et tarifs",
    heroTitle: "Chaque fonctionnalite, chaque forfait, chaque detail.",
    heroSubtitle: "Comparez les 4 forfaits cote a cote. Voyez exactement ce qui est inclus, ce qui est groupe, ce qui est en module. Verrouillez 15% avec engagement annuel ou 20% avec biennal sur Growth et Agency.",
    engagementLabel: "Engagement",
    engagementMonthly: "Mensuel",
    engagementAnnual: "Annuel (-15%)",
    engagementBiennial: "Biennal (-20%)",
    engagementBiennialOnly: "Biennal disponible sur Growth et Agency uniquement.",
    taxToggleOff: "Prix avant taxes",
    taxToggleOn: "Prix avec TPS + TVQ (14.975%)",
    diffToggleLabel: "Afficher seulement les differences",
    diffToggleOff: "Affiche toutes les lignes",
    diffToggleOn: "Affiche les differences seulement",
    perMonth: "/mois",
    perMonthTaxIncl: "/mois (tx incl)",
    popular: "PLUS POPULAIRE",
    chooseTier: "Choisir ce forfait",
    chooseAgency: "Nous contacter",
    websiteSection: "Service de construction de site web",
    websiteIntro: "On construit votre site aussi. Le cout de construction est amorti sur 6 mois en plus de votre forfait mensuel. Si vous resiliez avant 6 mois, des frais de recuperation s'appliquent, calcules de facon lineaire. Apres le mois 6, aucun frais de resiliation sur le cout de construction.",
    websiteVitrine: "Site Vitrine (1-5 pages)",
    websiteVitrinePrice: "800 $",
    websiteVitrineEligible: "Eligible Starter, Core, Growth",
    websitePme: "Site PME (6-15 pages, blogue, formulaires)",
    websitePmePrice: "1 500 $",
    websitePmeEligible: "Eligible Core, Growth",
    websiteCommerce: "Site Commerce (16-25 pages, integrations)",
    websiteCommercePrice: "3 000 $+",
    websiteCommerceEligible: "Forfait Growth uniquement",
    websiteAgencyNote: "Service de site web non offert sur le forfait Agency (les clients sur ce tier ont generalement leur propre equipe dev ou agence creative).",
    cancellationLabel: "Apercu des frais de resiliation",
    cancellationMonths: (m: number) => `Si vous resiliez apres ${m} ${m === 1 ? "mois" : "mois"}`,
    cancellationFee: (fee: number) => `Frais de recuperation : ${fee.toLocaleString("fr-CA")} $`,
    cancellationZero: "Aucun frais de resiliation, la construction est entierement amortie.",
    notIncludedTitle: "Ce qui n'est PAS inclus (on croit a l'honnetete)",
    notIncludedItems: [
      "Outreach actif de link-building vers blogueurs, journalistes, podcasts",
      "Creation ou edition d'articles Wikipedia en votre nom",
      "Participation Reddit ou Quora par notre equipe en votre nom",
      "Photographie ou videographie sur place",
      "Redaction longue d'annonces (Facebook Ads, creatives Google Ads)",
      "Distribution de communiques de presse aux mass media",
    ],
    notIncludedNote: "Ces services requierent une participation humaine authentique, des relations expert, ou un gatekeeping editorial que nous ne dotons pas en personnel. Si vous en avez besoin, on vous redirige honnetement vers un specialiste partenaire.",
    guaranteeTitle: "Garantie de visibilite mesurable a 90 jours",
    guaranteeBody: "Sur les forfaits Core, Growth et Agency : si votre score Share of Model n'augmente pas d'au moins 15 points en 90 jours apres votre integration, nous remboursons 100 % des 3 derniers mois factures. Mesure par nos sondes hebdomadaires sur 6 moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot).",
    guaranteeEligible: "Forfaits eligibles : Core, Growth, Agency",
    guaranteeNotEligible: "Non eligible : Starter (frequence de sondage insuffisante pour signal mesurable)",
    bookCta: "Reserver un appel strategique gratuit de 15 min",
    backToLanding: "Retour a l'apercu des forfaits",
    addonNote: "Module Reviuzy reputation (NFC + reponses IA + moteur de concours) est inclus dans Agency ou +100 $/mois sur Starter, Core, Growth.",
    monthsLabel: (m: number) => `${m}`,
    sectionDifferentiation: "Differences entre forfaits",
    intlAddonNote: "Modules internationaux de citations (USA via BrightLocal +199 $/mois, UE via Marquant +349 $/mois) a venir. Eligibles sur Growth et Agency au lancement.",
  },
};

function CellRenderer({ cell, lang }: { cell: TierCell; lang: "en" | "fr" }) {
  const value = cell.value[lang] ?? cell.value.en;
  const lower = value.toLowerCase();
  if (lower === "yes" || lower === "oui") {
    return <Check className="w-5 h-5 text-emerald-400 mx-auto" aria-label={value} />;
  }
  if (lower === "not included" || lower === "non inclus") {
    return <X className="w-5 h-5 text-zinc-600 mx-auto" aria-label={value} />;
  }
  return <span className="text-sm text-zinc-200">{value}</span>;
}

function rowsAllSame(row: TierRow): boolean {
  const vals = [row.starter, row.core, row.growth, row.agency].map((c) => `${c.value.en}|${c.value.fr}`);
  return vals.every((v) => v === vals[0]);
}

function WebsiteCancellationCalc({ buildCost, lang, copy }: { buildCost: number; lang: "en" | "fr"; copy: typeof COPY.en }) {
  const [months, setMonths] = useState(1);
  const fee = Math.max(0, Math.round((buildCost * (6 - months)) / 6));
  return (
    <div className="mt-4 p-4 rounded-lg border border-white/10 bg-white/[0.03]">
      <div className="text-xs uppercase tracking-wider text-zinc-400 mb-2">{copy.cancellationLabel}</div>
      <input
        type="range"
        min={1}
        max={7}
        value={months}
        onChange={(e) => setMonths(parseInt(e.target.value, 10))}
        className="w-full accent-amber-400"
      />
      <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
        {[1, 2, 3, 4, 5, 6, 7].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <div className="mt-3 text-sm text-zinc-300">
        {copy.cancellationMonths(months)}
      </div>
      <div className="mt-1 text-lg font-semibold text-amber-300">
        {fee > 0 ? copy.cancellationFee(fee) : copy.cancellationZero}
      </div>
    </div>
  );
}

export default function PricingDetails() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const { lang: ctxLang, setLang } = useLang();

  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  // Force dark theme on this page (matches landing aesthetic)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => {
      root.removeAttribute("data-force-dark");
    };
  }, []);

  // Restrict to en/fr for inline data; fall back to en otherwise
  const lang: "en" | "fr" = ctxLang === "fr" ? "fr" : "en";
  const copy = COPY[lang];

  const [engagement, setEngagement] = useState<EngagementMode>("monthly");
  const [taxIncluded, setTaxIncluded] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("ailys_tax_incl") === "true";
  });
  const [diffOnly, setDiffOnly] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("ailys_tax_incl", String(taxIncluded));
  }, [taxIncluded]);

  const computedPrices = useMemo(() => {
    return TIERS.map((t) => {
      const discounted = applyEngagement(t.monthlyPriceCAD, engagement, t.id);
      const final = applyTax(discounted, taxIncluded);
      return { ...t, finalPrice: final, hasDiscount: discounted < t.monthlyPriceCAD };
    });
  }, [engagement, taxIncluded]);

  const filteredCategories = useMemo(() => {
    if (!diffOnly) return TIER_COMPARISON;
    return TIER_COMPARISON.map((cat) => ({
      ...cat,
      rows: cat.rows.filter((r) => !rowsAllSame(r)),
    })).filter((cat) => cat.rows.length > 0);
  }, [diffOnly]);

  const langPrefix = ctxLang === "en" ? "" : `/${ctxLang}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={copy.pageTitle}
        description={copy.pageDescription}
        path={lang === "fr" ? "/forfaits-complets" : "/pricing-details"}
      />
      <NetworkBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-10 max-w-6xl mx-auto">
          <div className="text-xs uppercase tracking-[0.18em] text-amber-400 font-mono mb-4">{copy.heroEyebrow}</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">{copy.heroTitle}</h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl">{copy.heroSubtitle}</p>

          {/* Toggles */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-zinc-400">{copy.engagementLabel}</span>
              <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
                {(["monthly", "annual", "biennial"] as const).map((mode) => {
                  const isBiennial = mode === "biennial";
                  return (
                    <button
                      key={mode}
                      onClick={() => setEngagement(mode)}
                      className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full transition ${
                        engagement === mode
                          ? "bg-amber-400 text-zinc-900 font-semibold"
                          : "text-zinc-300 hover:text-white"
                      }`}
                      title={isBiennial ? copy.engagementBiennialOnly : undefined}
                    >
                      {mode === "monthly" && copy.engagementMonthly}
                      {mode === "annual" && copy.engagementAnnual}
                      {mode === "biennial" && copy.engagementBiennial}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-zinc-400">Quebec TPS+TVQ</span>
              <button
                onClick={() => setTaxIncluded((v) => !v)}
                className={`px-4 py-1.5 text-xs sm:text-sm rounded-full border transition ${
                  taxIncluded
                    ? "bg-cyan-400/10 border-cyan-400/40 text-cyan-200"
                    : "border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {taxIncluded ? copy.taxToggleOn : copy.taxToggleOff}
              </button>
            </div>
          </div>
        </section>

        {/* Tier price cards */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {computedPrices.map((t) => (
              <div
                key={t.id}
                className={`relative rounded-2xl border p-4 sm:p-5 ${
                  t.popular
                    ? "border-amber-400/40 bg-amber-400/[0.04]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {t.popular && (
                  <div className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full bg-amber-400 text-zinc-900 text-[9px] font-semibold tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3" aria-hidden /> {copy.popular}
                  </div>
                )}
                <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">{t.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold">${t.finalPrice.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA")}</span>
                  <span className="text-xs text-zinc-400">{taxIncluded ? copy.perMonthTaxIncl : copy.perMonth}</span>
                </div>
                {t.hasDiscount && (
                  <div className="mt-1 text-[10px] text-emerald-400">
                    {engagement === "annual" && "-15%"}
                    {engagement === "biennial" && "-20%"}
                  </div>
                )}
                <p className="mt-3 text-xs text-zinc-400 leading-snug min-h-[40px]">{t.tagline[lang]}</p>
                <button
                  onClick={() => navigate(`${langPrefix}/book-call?tier=${t.id}`)}
                  className="mt-4 w-full px-3 py-2 rounded-lg text-xs sm:text-sm border border-white/15 hover:bg-white/[0.06] transition"
                >
                  {t.id === "agency" ? copy.chooseAgency : copy.chooseTier}
                </button>
              </div>
            ))}
          </div>
          {engagement === "biennial" && (
            <p className="mt-3 text-xs text-zinc-500 italic">{copy.engagementBiennialOnly}</p>
          )}
          <p className="mt-3 text-xs text-zinc-500">{copy.addonNote}</p>
        </section>

        {/* Sticky comparison grid */}
        <section className="px-2 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-xl sm:text-2xl font-bold">{copy.sectionDifferentiation}</h2>
            <button
              onClick={() => setDiffOnly((v) => !v)}
              className={`px-3 py-1.5 text-[10px] sm:text-xs rounded-full border transition ${
                diffOnly
                  ? "bg-cyan-400/10 border-cyan-400/40 text-cyan-200"
                  : "border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {diffOnly ? copy.diffToggleOn : copy.diffToggleOff}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-sm">
                <tr className="border-b border-white/10">
                  <th className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wider text-zinc-400 w-[34%]">
                    Feature
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t.id}
                      className={`text-center px-3 py-3 font-semibold text-xs uppercase tracking-wider ${
                        t.popular ? "text-amber-300" : "text-zinc-300"
                      }`}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) => (
                  <CategoryGroup key={cat.id} category={cat} lang={lang} />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Website construction grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">{copy.websiteSection}</h2>
          <p className="text-sm text-zinc-400 mb-6 max-w-3xl">{copy.websiteIntro}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Vitrine</div>
              <div className="text-2xl font-bold mb-1">{copy.websiteVitrinePrice}</div>
              <div className="text-sm text-zinc-300 mb-3">{copy.websiteVitrine}</div>
              <div className="text-[10px] uppercase tracking-wider text-emerald-400 mb-2">{copy.websiteVitrineEligible}</div>
              <WebsiteCancellationCalc buildCost={800} lang={lang} copy={copy} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1">PME</div>
              <div className="text-2xl font-bold mb-1">{copy.websitePmePrice}</div>
              <div className="text-sm text-zinc-300 mb-3">{copy.websitePme}</div>
              <div className="text-[10px] uppercase tracking-wider text-emerald-400 mb-2">{copy.websitePmeEligible}</div>
              <WebsiteCancellationCalc buildCost={1500} lang={lang} copy={copy} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1">Commerce</div>
              <div className="text-2xl font-bold mb-1">{copy.websiteCommercePrice}</div>
              <div className="text-sm text-zinc-300 mb-3">{copy.websiteCommerce}</div>
              <div className="text-[10px] uppercase tracking-wider text-amber-400 mb-2">{copy.websiteCommerceEligible}</div>
              <WebsiteCancellationCalc buildCost={3000} lang={lang} copy={copy} />
            </div>
          </div>

          <p className="mt-4 text-xs text-zinc-500 italic">{copy.websiteAgencyNote}</p>
          <p className="mt-2 text-xs text-zinc-500 italic">{copy.intlAddonNote}</p>
        </section>

        {/* 90-day guarantee */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-200 mb-3">{copy.guaranteeTitle}</h2>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-3">{copy.guaranteeBody}</p>
            <div className="text-xs text-emerald-300 mb-1">{copy.guaranteeEligible}</div>
            <div className="text-xs text-zinc-500">{copy.guaranteeNotEligible}</div>
          </div>
        </section>

        {/* Not included (honest disclosure) */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">{copy.notIncludedTitle}</h2>
            <ul className="space-y-2 text-sm text-zinc-300">
              {copy.notIncludedItems.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <X className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-1" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-zinc-500 italic">{copy.notIncludedNote}</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <Link
              to={`${langPrefix}/`}
              className="text-sm text-zinc-400 hover:text-white transition flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" aria-hidden /> {copy.backToLanding}
            </Link>
            <Link
              to={`${langPrefix}/book-call`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-400 text-zinc-900 font-semibold text-sm hover:bg-amber-300 transition"
            >
              {copy.bookCta} <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <LandingChatWidget />
    </div>
  );
}

function CategoryGroup({
  category,
  lang,
}: {
  category: typeof TIER_COMPARISON[number];
  lang: "en" | "fr";
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <tr className="bg-white/[0.02] border-b border-white/5">
        <td colSpan={5} className="px-3 py-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-2"
          >
            <span className={`transition ${open ? "rotate-90" : ""}`}>›</span>
            {category.label[lang]}
          </button>
        </td>
      </tr>
      {open &&
        category.rows.map((row, i) => (
          <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
            <td className="px-3 py-3 text-zinc-300 text-sm">{row.feature[lang]}</td>
            <td className="px-3 py-3 text-center"><CellRenderer cell={row.starter} lang={lang} /></td>
            <td className="px-3 py-3 text-center"><CellRenderer cell={row.core} lang={lang} /></td>
            <td className="px-3 py-3 text-center"><CellRenderer cell={row.growth} lang={lang} /></td>
            <td className="px-3 py-3 text-center"><CellRenderer cell={row.agency} lang={lang} /></td>
          </tr>
        ))}
    </>
  );
}
