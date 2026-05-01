// Tier comparison data for /forfaits-complets page (Phase E.1.4).
//
// Strategy: bilingual EN+FR-CA strings inline rather than 100+ new i18n keys.
// Avoids translation queue explosion (CLAUDE.md hard rule #4 + #8). The 14
// secondary locales fall back to EN by passing lang='en' when not 'fr'.
//
// Categories are user-collapsible. Rows where all 4 tiers have identical
// values are filtered out by the "show only differences" toggle (E.1.7).

export type Lang = "en" | "fr";

export interface TierCell {
  /** Empty string = no value / dash. 'check' = checkmark icon. 'cross' = X icon. */
  value: { en: string; fr: string };
  highlight?: "win" | "neutral";
}

export interface TierRow {
  feature: { en: string; fr: string };
  starter: TierCell;
  core: TierCell;
  growth: TierCell;
  agency: TierCell;
}

export interface TierCategory {
  id: string;
  label: { en: string; fr: string };
  rows: TierRow[];
}

const yes = (en = "Yes", fr = "Oui"): TierCell => ({ value: { en, fr } });
const no = (): TierCell => ({ value: { en: "Not included", fr: "Non inclus" } });
const text = (en: string, fr: string): TierCell => ({ value: { en, fr } });

export const TIER_COMPARISON: TierCategory[] = [
  {
    id: "google-business",
    label: { en: "Google Business Profile", fr: "Fiche Google Business" },
    rows: [
      {
        feature: { en: "GBP posts per month (managed mode)", fr: "Publications GBP par mois (mode pilote auto)" },
        starter: text("4", "4"),
        core: text("6", "6"),
        growth: text("8", "8"),
        agency: text("12", "12"),
      },
      {
        feature: { en: "GBP posts per month (self-serve mode)", fr: "Publications GBP par mois (mode auto-gestion)" },
        starter: text("6", "6"),
        core: text("8", "8"),
        growth: text("10", "10"),
        agency: text("12", "12"),
      },
      {
        feature: { en: "GBP photos per month (managed)", fr: "Photos GBP par mois (mode pilote auto)" },
        starter: text("4", "4"),
        core: text("6", "6"),
        growth: text("8", "8"),
        agency: text("12 / domain", "12 / domaine"),
      },
      {
        feature: { en: "GBP Q&A monitoring + AI replies", fr: "Surveillance Q&R GBP + reponses IA" },
        starter: text("Weekly", "Hebdomadaire"),
        core: text("Twice per week", "Deux fois par semaine"),
        growth: text("Daily", "Quotidien"),
        agency: text("Daily, multi-location", "Quotidien, multi-emplacements"),
      },
    ],
  },
  {
    id: "citations",
    label: { en: "Citations and NAP", fr: "Citations et NAP" },
    rows: [
      {
        feature: { en: "Citations submitted per month (max per domain)", fr: "Citations soumises par mois (max par domaine)" },
        starter: text("2", "2"),
        core: text("4", "4"),
        growth: text("6", "6"),
        agency: text("8", "8"),
      },
      {
        feature: { en: "NAP consistency audit", fr: "Audit de coherence NAP" },
        starter: text("Quarterly", "Trimestriel"),
        core: text("Monthly", "Mensuel"),
        growth: text("Bi-weekly", "Aux deux semaines"),
        agency: text("Weekly", "Hebdomadaire"),
      },
      {
        feature: { en: "Wikidata Q-number creation", fr: "Creation Q-number Wikidata" },
        starter: no(),
        core: yes(),
        growth: yes(),
        agency: yes(),
      },
    ],
  },
  {
    id: "ai-visibility",
    label: { en: "AI Visibility", fr: "Visibilite IA" },
    rows: [
      {
        feature: { en: "AI Visibility probes frequency", fr: "Frequence des sondes Visibilite IA" },
        starter: text("Monthly", "Mensuel"),
        core: text("Weekly", "Hebdomadaire"),
        growth: text("Weekly", "Hebdomadaire"),
        agency: text("Daily", "Quotidien") },
      {
        feature: { en: "Engines tracked (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot)", fr: "Moteurs suivis (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot)" },
        starter: text("6", "6"),
        core: text("6", "6"),
        growth: text("6", "6"),
        agency: text("6", "6"),
      },
      {
        feature: { en: "Share of Model dashboard", fr: "Tableau Share of Model" },
        starter: yes(),
        core: yes(),
        growth: yes(),
        agency: yes(),
      },
      {
        feature: { en: "Sentiment analysis on AI mentions", fr: "Analyse de sentiment sur les mentions IA" },
        starter: no(),
        core: yes(),
        growth: yes(),
        agency: yes(),
      },
    ],
  },
  {
    id: "content",
    label: { en: "Content", fr: "Contenu" },
    rows: [
      {
        feature: { en: "Bilingual blog posts (unique topics, EN+FR)", fr: "Articles de blogue bilingues (sujets uniques, EN+FR)" },
        starter: text("2 / month", "2 / mois"),
        core: text("4 / month", "4 / mois"),
        growth: text("6 / month", "6 / mois"),
        agency: text("8 / month max per domain", "8 / mois max par domaine"),
      },
      {
        feature: { en: "AEO/GEO schema deployment", fr: "Deploiement schema AEO/GEO" },
        starter: text("LocalBusiness, FAQPage", "LocalBusiness, FAQPage"),
        core: text("+ Service, Review", "+ Service, Review"),
        growth: text("+ HowTo, Person", "+ HowTo, Person"),
        agency: text("All + custom JSON-LD", "Tout + JSON-LD personnalise"),
      },
    ],
  },
  {
    id: "reputation",
    label: { en: "Reputation and reviews", fr: "Reputation et avis" },
    rows: [
      {
        feature: { en: "AI Automation reputation suite", fr: "Suite reputation AiLys Automation" },
        starter: text("Add-on +$100/mo", "Module +100 $/mois"),
        core: text("Add-on +$100/mo", "Module +100 $/mois"),
        growth: text("Add-on +$100/mo", "Module +100 $/mois"),
        agency: yes("Bundled", "Inclus"),
      },
      {
        feature: { en: "NFC tap-to-review cards", fr: "Cartes NFC pour avis" },
        starter: text("Add-on", "Module"),
        core: text("Add-on", "Module"),
        growth: text("Add-on", "Module"),
        agency: yes("Shipped", "Expedie"),
      },
      {
        feature: { en: "Fake review detection", fr: "Detection des faux avis" },
        starter: no(),
        core: yes(),
        growth: yes(),
        agency: yes(),
      },
    ],
  },
  {
    id: "website",
    label: { en: "Website service eligibility", fr: "Eligibilite service web" },
    rows: [
      {
        feature: { en: "Vitrine site (1-5 pages, build $800)", fr: "Site Vitrine (1-5 pages, construction 800 $)" },
        starter: yes("Eligible", "Eligible"),
        core: yes("Eligible", "Eligible"),
        growth: yes("Eligible", "Eligible"),
        agency: text("Not offered", "Non offert"),
      },
      {
        feature: { en: "PME site (6-15 pages, build $1500)", fr: "Site PME (6-15 pages, construction 1500 $)" },
        starter: text("Not eligible", "Non eligible"),
        core: yes("Eligible", "Eligible"),
        growth: yes("Eligible", "Eligible"),
        agency: text("Not offered", "Non offert"),
      },
      {
        feature: { en: "Commerce site (16-25 pages, build $3000)", fr: "Site Commerce (16-25 pages, construction 3000 $)" },
        starter: text("Not eligible", "Non eligible"),
        core: text("Not eligible", "Non eligible"),
        growth: yes("Eligible", "Eligible"),
        agency: text("Not offered", "Non offert"),
      },
    ],
  },
  {
    id: "reporting",
    label: { en: "Reporting and admin", fr: "Rapports et administration" },
    rows: [
      {
        feature: { en: "Monthly visibility report (PDF)", fr: "Rapport mensuel de visibilite (PDF)" },
        starter: yes(),
        core: yes(),
        growth: yes(),
        agency: yes("White-label", "Marque blanche"),
      },
      {
        feature: { en: "Multi-location dashboard", fr: "Tableau multi-emplacements" },
        starter: no(),
        core: no(),
        growth: text("Up to 3", "Jusqu'a 3"),
        agency: text("Unlimited", "Illimite"),
      },
      {
        feature: { en: "API access", fr: "Acces API" },
        starter: no(),
        core: no(),
        growth: no(),
        agency: yes(),
      },
    ],
  },
  {
    id: "support",
    label: { en: "Support and strategy", fr: "Support et strategie" },
    rows: [
      {
        feature: { en: "Strategist hours per month", fr: "Heures de stratege par mois" },
        starter: text("~1 h", "~1 h"),
        core: text("~3 h", "~3 h"),
        growth: text("~6 h", "~6 h"),
        agency: text("12-15 h", "12-15 h"),
      },
      {
        feature: { en: "Slack support SLA (business hours)", fr: "SLA Slack (heures ouvrables)" },
        starter: text("Email only", "Courriel seulement"),
        core: text("48 h", "48 h"),
        growth: text("24 h", "24 h"),
        agency: text("Under 4 h", "Moins de 4 h"),
      },
      {
        feature: { en: "Quarterly executive deck", fr: "Presentation executive trimestrielle" },
        starter: no(),
        core: no(),
        growth: text("Email summary", "Resume par courriel"),
        agency: yes("In-person", "En personne"),
      },
      {
        feature: { en: "Domain Shield (DNS + WAF)", fr: "Domain Shield (DNS + WAF)" },
        starter: text("Add-on +$35", "Module +35 $"),
        core: text("Add-on +$35", "Module +35 $"),
        growth: text("Add-on +$35", "Module +35 $"),
        agency: yes("Bundled", "Inclus"),
      },
    ],
  },
  {
    id: "guarantees",
    label: { en: "Guarantees", fr: "Garanties" },
    rows: [
      {
        feature: { en: "30-day satisfaction guarantee", fr: "Garantie satisfaction 30 jours" },
        starter: yes(),
        core: yes(),
        growth: yes(),
        agency: yes(),
      },
      {
        feature: { en: "90-day measurable AI Visibility uplift", fr: "Hausse mesurable Visibilite IA en 90 jours" },
        starter: no(),
        core: yes("+15 pts or refund", "+15 pts ou remboursement"),
        growth: yes("+15 pts or refund", "+15 pts ou remboursement"),
        agency: yes("+15 pts or refund", "+15 pts ou remboursement"),
      },
      {
        feature: { en: "Month-to-month, no annual lock", fr: "Mois-a-mois, sans engagement annuel" },
        starter: yes(),
        core: yes(),
        growth: yes(),
        agency: yes(),
      },
    ],
  },
];

export interface TierMeta {
  id: "starter" | "core" | "growth" | "agency";
  name: string;
  monthlyPriceCAD: number;
  popular?: boolean;
  tagline: { en: string; fr: string };
}

export const TIERS: TierMeta[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPriceCAD: 300,
    tagline: {
      en: "Local visibility floor for solo operators",
      fr: "Plancher de visibilite locale pour entrepreneurs solos",
    },
  },
  {
    id: "core",
    name: "Core",
    monthlyPriceCAD: 600,
    popular: true,
    tagline: {
      en: "Operational momentum for growing local businesses",
      fr: "Momentum operationnel pour PME locales en croissance",
    },
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPriceCAD: 1200,
    tagline: {
      en: "AI-search and multi-channel for serious operators",
      fr: "Recherche IA et multi-canal pour operateurs serieux",
    },
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPriceCAD: 2500,
    tagline: {
      en: "Multi-location, white-label, dedicated strategist",
      fr: "Multi-emplacements, marque blanche, stratege attitre",
    },
  },
];

export type EngagementMode = "monthly" | "annual" | "biennial";

export interface EngagementInfo {
  mode: EngagementMode;
  discountPct: number;
  /** Tiers eligible. Empty array = all 4 tiers. */
  eligibleTiers: Array<TierMeta["id"]>;
}

export const ENGAGEMENT_OPTIONS: Record<EngagementMode, EngagementInfo> = {
  monthly: { mode: "monthly", discountPct: 0, eligibleTiers: ["starter", "core", "growth", "agency"] },
  annual: { mode: "annual", discountPct: 15, eligibleTiers: ["starter", "core", "growth", "agency"] },
  biennial: { mode: "biennial", discountPct: 20, eligibleTiers: ["growth", "agency"] },
};

export const QUEBEC_TAX_RATE = 0.14975; // TPS 5% + TVQ 9.975%

export function applyEngagement(monthlyPriceCAD: number, mode: EngagementMode, tierId: TierMeta["id"]): number {
  const info = ENGAGEMENT_OPTIONS[mode];
  if (!info.eligibleTiers.includes(tierId)) return monthlyPriceCAD;
  return Math.round(monthlyPriceCAD * (1 - info.discountPct / 100));
}

export function applyTax(price: number, taxIncluded: boolean): number {
  return taxIncluded ? Math.round(price * (1 + QUEBEC_TAX_RATE) * 100) / 100 : price;
}
