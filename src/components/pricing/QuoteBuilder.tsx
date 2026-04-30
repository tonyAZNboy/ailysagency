// Phase E.2.2: personalized quote PDF builder UI (surface for E.1.9 endpoint).
//
// Inline form on /forfaits-complets letting prospect compose their selection
// (tier, engagement, reviuzy add-on, website size, name, email), then POST
// to /api/quote-pdf which returns a 5-min signed download URL plus emails
// the PDF to the prospect.

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, FileText, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import {
  TIERS,
  applyEngagement,
  applyTax,
  type EngagementMode,
  type TierMeta,
} from "@/data/tier-comparison";

type WebsiteSize = "none" | "vitrine" | "pme" | "commerce";

type QuoteState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; signedUrl: string; expiresAt: number }
  | { kind: "error"; message: string };

const COPY = {
  en: {
    eyebrow: "PERSONALIZED QUOTE",
    headline: "Build your quote, get the PDF in 5 seconds",
    description: "Pick your plan, engagement, and options. We email you a signed PDF quote you can share with your team. Valid 30 days.",
    name: "Your name",
    namePlaceholder: "Jean Dupont",
    business: "Business name",
    businessPlaceholder: "Cafe Olimpico",
    email: "Your email",
    emailPlaceholder: "you@business.com",
    plan: "Plan",
    engagement: "Engagement",
    engagementMonthly: "Monthly",
    engagementAnnual: "Annual (-15%)",
    engagementBiennial: "Biennial (-20%, Growth/Agency)",
    addon: "Reputation add-on (NFC + AI replies + contest engine)",
    addonBundled: "Bundled in Agency",
    websiteService: "Website service",
    websiteNone: "None (I keep my current site)",
    websiteVitrine: "Vitrine, 1-5 pages, $800",
    websitePme: "PME, 6-15 pages, $1500",
    websiteCommerce: "Commerce, 16-25 pages, $3000",
    websiteAgencyExcluded: "Website service not offered on Agency",
    taxIncluded: "Show prices with TPS+TVQ (14.975%)",
    submit: "Generate my quote PDF",
    submitting: "Generating...",
    successTitle: "Your quote is ready",
    successBody: "We emailed the link too. Both link and email expire in 5 minutes for security; refresh the form to regenerate.",
    download: "Download my quote PDF",
    estimatedTotal: "Estimated total monthly",
    perMonth: "/mo",
    perMonthTaxIncl: "/mo (tax incl)",
    rateLimited: "Too many requests. Try again in 15 minutes.",
    errorGeneric: "Could not generate quote. Try again or book a call.",
  },
  fr: {
    eyebrow: "DEVIS PERSONNALISE",
    headline: "Composez votre devis, recevez le PDF en 5 secondes",
    description: "Choisissez votre forfait, l'engagement et les options. Nous vous envoyons un devis PDF signe que vous pouvez partager avec votre equipe. Valide 30 jours.",
    name: "Votre nom",
    namePlaceholder: "Jean Dupont",
    business: "Nom d'entreprise",
    businessPlaceholder: "Cafe Olimpico",
    email: "Votre courriel",
    emailPlaceholder: "vous@entreprise.com",
    plan: "Forfait",
    engagement: "Engagement",
    engagementMonthly: "Mensuel",
    engagementAnnual: "Annuel (-15%)",
    engagementBiennial: "Biennal (-20%, Growth/Agency)",
    addon: "Module reputation (NFC + reponses IA + concours)",
    addonBundled: "Inclus dans Agency",
    websiteService: "Service web",
    websiteNone: "Aucun (je garde mon site actuel)",
    websiteVitrine: "Vitrine, 1-5 pages, 800 $",
    websitePme: "PME, 6-15 pages, 1500 $",
    websiteCommerce: "Commerce, 16-25 pages, 3000 $",
    websiteAgencyExcluded: "Service web non offert sur Agency",
    taxIncluded: "Afficher avec TPS+TVQ (14.975 %)",
    submit: "Generer mon devis PDF",
    submitting: "Generation...",
    successTitle: "Votre devis est pret",
    successBody: "Nous avons aussi envoye le lien par courriel. Le lien et le courriel expirent dans 5 minutes pour securite ; rafraichissez le formulaire pour regenerer.",
    download: "Telecharger mon devis PDF",
    estimatedTotal: "Total mensuel estime",
    perMonth: "/mois",
    perMonthTaxIncl: "/mois (tx incl)",
    rateLimited: "Trop de requetes. Reessayez dans 15 minutes.",
    errorGeneric: "Impossible de generer le devis. Reessayez ou reservez un appel.",
  },
};

const REVIUZY_ADDON_CAD = 100;

// E.6: persistence so prospects who fill the form but bounce can return
// to their selection. localStorage is fine; no PII concern (email could
// be sensitive but the prospect typed it themselves, on their own device).
const STORAGE_KEY = "ailys_quote_builder_v1";
interface PersistedState {
  prospectName?: string;
  businessName?: string;
  email?: string;
  tier?: string;
  engagement?: string;
  reviuzyAddon?: boolean;
  websiteSize?: string;
  taxIncluded?: boolean;
}

function loadPersisted(): PersistedState {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function savePersisted(state: PersistedState) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export function QuoteBuilder() {
  const { lang: ctxLang } = useLang();
  const lang: "en" | "fr" = ctxLang === "fr" ? "fr" : "en";
  const copy = COPY[lang];

  const persisted = useMemo(() => loadPersisted(), []);

  const [prospectName, setProspectName] = useState(persisted.prospectName ?? "");
  const [businessName, setBusinessName] = useState(persisted.businessName ?? "");
  const [email, setEmail] = useState(persisted.email ?? "");
  const [tier, setTier] = useState<TierMeta["id"]>(
    (["starter", "core", "growth", "agency"] as const).includes(persisted.tier as TierMeta["id"])
      ? (persisted.tier as TierMeta["id"])
      : "core",
  );
  const [engagement, setEngagement] = useState<EngagementMode>(
    (["monthly", "annual", "biennial"] as const).includes(persisted.engagement as EngagementMode)
      ? (persisted.engagement as EngagementMode)
      : "monthly",
  );
  const [reviuzyAddon, setReviuzyAddon] = useState(persisted.reviuzyAddon ?? false);
  const [websiteSize, setWebsiteSize] = useState<WebsiteSize>(
    (["none", "vitrine", "pme", "commerce"] as const).includes(persisted.websiteSize as WebsiteSize)
      ? (persisted.websiteSize as WebsiteSize)
      : "none",
  );
  const [taxIncluded, setTaxIncluded] = useState(persisted.taxIncluded ?? false);

  useEffect(() => {
    savePersisted({ prospectName, businessName, email, tier, engagement, reviuzyAddon, websiteSize, taxIncluded });
  }, [prospectName, businessName, email, tier, engagement, reviuzyAddon, websiteSize, taxIncluded]);
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<QuoteState>({ kind: "idle" });

  // Auto-coerce ineligible combinations
  const effectiveEngagement: EngagementMode = useMemo(() => {
    if (engagement === "biennial" && (tier === "starter" || tier === "core")) return "monthly";
    return engagement;
  }, [engagement, tier]);

  const eligibleWebsiteSizes: WebsiteSize[] = useMemo(() => {
    if (tier === "agency") return ["none"];
    if (tier === "starter") return ["none", "vitrine"];
    if (tier === "core") return ["none", "vitrine", "pme"];
    return ["none", "vitrine", "pme", "commerce"]; // growth
  }, [tier]);

  const effectiveWebsiteSize: WebsiteSize = useMemo(() => {
    return eligibleWebsiteSizes.includes(websiteSize) ? websiteSize : "none";
  }, [websiteSize, eligibleWebsiteSizes]);

  const tierMeta = TIERS.find((t) => t.id === tier)!;
  const discounted = applyEngagement(tierMeta.monthlyPriceCAD, effectiveEngagement, tier);
  const addonCost = reviuzyAddon && tier !== "agency" ? REVIUZY_ADDON_CAD : 0;
  const subtotal = discounted + addonCost;
  const finalDisplay = applyTax(subtotal, taxIncluded);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prospectName.trim() || !businessName.trim() || !email.trim()) return;
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/quote-pdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          prospectName,
          businessName,
          email,
          lang,
          tier,
          engagement: effectiveEngagement,
          reviuzyAddon,
          websiteSize: effectiveWebsiteSize,
          taxIncluded,
          honeypot,
        }),
      });
      if (res.status === 429) {
        setState({ kind: "error", message: copy.rateLimited });
        return;
      }
      if (!res.ok) {
        setState({ kind: "error", message: copy.errorGeneric });
        return;
      }
      const data = (await res.json()) as { id: string; signedUrl: string; expiresAt: number };
      setState({ kind: "success", signedUrl: data.signedUrl, expiresAt: data.expiresAt });
    } catch {
      setState({ kind: "error", message: copy.errorGeneric });
    }
  };

  return (
    <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.04] via-orange-500/[0.02] to-transparent p-5 sm:p-7 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-amber-300" aria-hidden />
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-300">{copy.eyebrow}</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-2">{copy.headline}</h2>
      <p className="text-sm text-zinc-400 mb-5 max-w-xl">{copy.description}</p>

      {state.kind !== "success" && (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.name}</label>
              <input
                type="text"
                value={prospectName}
                onChange={(e) => setProspectName(e.target.value)}
                placeholder={copy.namePlaceholder}
                required
                maxLength={100}
                disabled={state.kind === "loading"}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.business}</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={copy.businessPlaceholder}
                required
                maxLength={200}
                disabled={state.kind === "loading"}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/50 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              required
              maxLength={254}
              disabled={state.kind === "loading"}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/50 text-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.plan}</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as TierMeta["id"])}
                disabled={state.kind === "loading"}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-400/50 text-sm"
              >
                {TIERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (${t.monthlyPriceCAD})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.engagement}</label>
              <select
                value={engagement}
                onChange={(e) => setEngagement(e.target.value as EngagementMode)}
                disabled={state.kind === "loading"}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-400/50 text-sm"
              >
                <option value="monthly">{copy.engagementMonthly}</option>
                <option value="annual">{copy.engagementAnnual}</option>
                <option value="biennial">{copy.engagementBiennial}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5">{copy.websiteService}</label>
            <select
              value={effectiveWebsiteSize}
              onChange={(e) => setWebsiteSize(e.target.value as WebsiteSize)}
              disabled={state.kind === "loading" || tier === "agency"}
              className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-400/50 text-sm"
            >
              <option value="none">{copy.websiteNone}</option>
              {eligibleWebsiteSizes.includes("vitrine") && <option value="vitrine">{copy.websiteVitrine}</option>}
              {eligibleWebsiteSizes.includes("pme") && <option value="pme">{copy.websitePme}</option>}
              {eligibleWebsiteSizes.includes("commerce") && <option value="commerce">{copy.websiteCommerce}</option>}
            </select>
            {tier === "agency" && <p className="mt-1 text-[10px] text-zinc-500 italic">{copy.websiteAgencyExcluded}</p>}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={reviuzyAddon}
              onChange={(e) => setReviuzyAddon(e.target.checked)}
              disabled={state.kind === "loading" || tier === "agency"}
              className="w-4 h-4 accent-amber-400"
            />
            <span className="text-sm text-zinc-300">
              {copy.addon} {tier === "agency" ? <span className="text-emerald-400 text-xs">({copy.addonBundled})</span> : <span className="text-zinc-500 text-xs">+$100/mo</span>}
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={taxIncluded}
              onChange={(e) => setTaxIncluded(e.target.checked)}
              disabled={state.kind === "loading"}
              className="w-4 h-4 accent-amber-400"
            />
            <span className="text-sm text-zinc-300">{copy.taxIncluded}</span>
          </label>

          {/* Honeypot */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
          />

          <div className="flex flex-col sm:flex-row gap-3 sm:items-end sm:justify-between pt-3 border-t border-white/5">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">{copy.estimatedTotal}</div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-200">
                ${finalDisplay.toLocaleString(lang === "fr" ? "fr-CA" : "en-CA")}
                <span className="text-xs text-zinc-500 ml-1">{taxIncluded ? copy.perMonthTaxIncl : copy.perMonth}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={state.kind === "loading" || !prospectName.trim() || !businessName.trim() || !email.trim()}
              className="px-5 py-3 rounded-full bg-amber-400 text-zinc-900 font-semibold text-sm hover:bg-amber-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
            >
              {state.kind === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  {copy.submitting}
                </>
              ) : (
                <>
                  {copy.submit} <ArrowRight className="w-4 h-4" aria-hidden />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {state.kind === "error" && (
        <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-sm text-rose-200">
          {state.message}
        </div>
      )}

      {state.kind === "success" && (
        <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/[0.04] p-5">
          <h3 className="text-lg font-semibold text-emerald-200 mb-2">{copy.successTitle}</h3>
          <p className="text-sm text-zinc-300 mb-4">{copy.successBody}</p>
          <a
            href={state.signedUrl}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-zinc-900 font-semibold text-sm hover:bg-emerald-300 transition"
          >
            {copy.download} <ArrowRight className="w-4 h-4" aria-hidden />
          </a>
        </div>
      )}
    </div>
  );
}
