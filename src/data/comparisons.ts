// AiLys Agency · Competitor comparison data
//
// Routes: /vs/[slug] and /:lang/vs/[slug]
// Captures bottom-of-funnel commercial-intent traffic from people already
// evaluating a named competitor. Each comparison MUST be honest, factual, and
// based on publicly disclosed competitor information. Do not fabricate.
//
// Legal posture: comparison advertising is permitted in Quebec under the
// Consumer Protection Act provided it is truthful, verifiable, and uses public
// information. Each comparison cites the competitor's own marketing site as
// the source of truth for their pricing and feature claims.

export type ComparisonSlug = "sterling-sky" | "brightlocal" | "localiq";

export interface ComparisonRow {
  feature: string;
  competitor: string;
  ailys: string;
  /** "win" = AiLys wins this row, "tie" = parity, "loss" = competitor wins */
  outcome: "win" | "tie" | "loss";
}

export interface ComparisonContent {
  // Hero
  eyebrow: string;
  headline1: string;
  headline2: string;
  subheadline: string;

  // Quick verdict
  verdictTitle: string;
  verdictBody: string;
  whenAilysWins: string[]; // 3-5 bullets
  whenCompetitorWins: string[]; // 2-3 bullets (be honest)

  // Pricing comparison
  pricing: {
    competitorRange: string;
    ailysRange: string;
    note: string;
  };

  // Feature comparison table (12-18 rows)
  rows: ComparisonRow[];

  // FAQ
  faq: { q: string; a: string }[];

  // CTAs
  ctaPrimary: string;
  ctaSecondary: string;

  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export interface Comparison {
  slug: ComparisonSlug;
  competitorName: string; // "Sterling Sky"
  competitorTagline: string; // "Local SEO consultancy, Toronto"
  competitorWebsite: string; // "sterlingsky.ca"
  toneClass: string; // tailwind gradient
  // EN canonical content
  en: ComparisonContent;
  // FR-CA full coverage
  fr: ComparisonContent;
  // Optional partial overrides for other languages
  i18n?: Partial<Record<string, Partial<ComparisonContent>>>;
}

/* ──────────────────────────────────────────────────────────────────────────
   COMPARISON 1 · STERLING SKY (Toronto local-SEO consultancy, $5K+/mo)
   ────────────────────────────────────────────────────────────────────────── */

const sterlingSky: Comparison = {
  slug: "sterling-sky",
  competitorName: "Sterling Sky",
  competitorTagline: "Local SEO consultancy, Toronto",
  competitorWebsite: "sterlingsky.ca",
  toneClass: "from-amber-400 via-orange-400 to-rose-400",
  en: {
    eyebrow: "AiLys vs Sterling Sky",
    headline1: "Sterling Sky is excellent at classical local SEO.",
    headline2: "We add the AI search layer they don't.",
    subheadline:
      "Sterling Sky has earned its reputation in Google Maps optimization and local pack work. They charge $5,000+/mo for the legacy playbook. AiLys runs the same classical foundation and layers AEO, GEO, and E-E-A-T tuned for ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot. Bilingual EN and FR-CA, anchored in Quebec, starting at $300/mo.",
    verdictTitle: "When AiLys is the right fit",
    verdictBody:
      "Sterling Sky is built for enterprise local-SEO budgets and complex multi-location chains where their consultancy depth is irreplaceable. AiLys is built for local businesses that need both the classical local SEO foundation AND the AI search layer at SMB pricing.",
    whenAilysWins: [
      "Your monthly budget is under $2,000 and you need real AEO, GEO, and E-E-A-T work, not just GBP optimization.",
      "You operate in Quebec or serve a bilingual Canadian market and want native FR-CA delivery.",
      "You want explicit weekly LLM citation tracking across 6 AI engines, not just Google ranking reports.",
      "You want month-to-month flexibility with two weeks notice to cancel, not annual retainers.",
      "You want the Reviuzy review velocity engine bundled with your visibility work (Agency tier).",
    ],
    whenCompetitorWins: [
      "Your monthly budget is $5,000+ and you need a Google Maps litigation specialist for spam or suspension cases.",
      "You operate primarily in English-only markets where bilingual delivery is not a tiebreaker.",
      "You need a long-tenured Local Search Forum presence (Joy Hawkins is one of the best in classical local SEO).",
    ],
    pricing: {
      competitorRange: "$5,000+ /mo (custom quotes, retainer-based)",
      ailysRange: "$300 to $2,499 /mo (transparent tiers, month to month)",
      note: "Sterling Sky pricing is based on public statements from their team and case study posts. Final quotes vary by scope.",
    },
    rows: [
      { feature: "Starting price", competitor: "$5,000+ /mo", ailys: "$300 /mo", outcome: "win" },
      { feature: "Contract length", competitor: "Annual retainer typical", ailys: "Month to month, 2 weeks notice", outcome: "win" },
      { feature: "Classical local SEO", competitor: "Industry-leading depth", ailys: "Full coverage", outcome: "loss" },
      { feature: "GBP optimization", competitor: "Yes", ailys: "Yes", outcome: "tie" },
      { feature: "Citation building", competitor: "Yes", ailys: "Yes (5 to 10+ per month)", outcome: "tie" },
      { feature: "AEO schema deployment", competitor: "Limited (custom only)", ailys: "Standard at Core+", outcome: "win" },
      { feature: "GEO entity authority work", competitor: "Not standard", ailys: "Standard at Growth+", outcome: "win" },
      { feature: "E-E-A-T optimization", competitor: "Implicit through content", ailys: "Explicit signal building", outcome: "win" },
      { feature: "Weekly LLM citation tracking (6 engines)", competitor: "Not offered", ailys: "Standard at all tiers", outcome: "win" },
      { feature: "Bilingual EN and FR-CA in-house", competitor: "EN only", ailys: "Yes, native FR-CA", outcome: "win" },
      { feature: "Multilingual delivery (8 languages)", competitor: "EN only", ailys: "EN, FR, ES, ZH, AR, RU + UK, SR via partners", outcome: "win" },
      { feature: "Google Maps suspension support", competitor: "Specialty service", ailys: "Available, not specialty", outcome: "loss" },
      { feature: "Multi-location enterprise support", competitor: "Yes (50+ locations)", ailys: "Yes (up to 25, scales further by quote)", outcome: "tie" },
      { feature: "Review velocity engine", competitor: "Not offered", ailys: "Yes (Reviuzy NFC at Agency tier)", outcome: "win" },
      { feature: "Public citation tracker", competitor: "Not offered", ailys: "Yes (live /citations page)", outcome: "win" },
      { feature: "Money-back guarantee", competitor: "Not stated publicly", ailys: "30-day satisfaction guarantee", outcome: "win" },
    ],
    faq: [
      {
        q: "Is Sterling Sky better than AiLys for local SEO?",
        a: "Sterling Sky is one of the strongest classical local SEO consultancies in North America. If your only need is Google Maps optimization and you have $5,000+/mo, they are excellent. AiLys delivers the same classical foundation plus the AI search layer (AEO, GEO, E-E-A-T) for ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot at $300 to $2,499/mo.",
      },
      {
        q: "Can AiLys handle Google Maps suspensions or spam disputes?",
        a: "Yes, but it is not our specialty. Sterling Sky has built deep expertise in Google Maps litigation and suspension recovery. If your primary need is reinstatement or aggressive spam prosecution, they are the better choice. AiLys handles standard suspension recovery as part of audit follow-through.",
      },
      {
        q: "Why is AiLys priced lower than Sterling Sky?",
        a: "Two reasons. First, our delivery layer is automated through Reviuzy (review velocity, GBP automation, NFC tap-to-review), so we do not bill consulting hours for work that is productized. Second, Quebec operating costs and SMB-focused positioning are different from Toronto enterprise consulting. Same disciplines, different cost structure.",
      },
      {
        q: "Does AiLys have the same classical local SEO depth as Sterling Sky?",
        a: "We cover the same foundation: technical SEO, GBP, citations, NAP, reviews, schema. Sterling Sky has more individual specialists with longer tenure in classical local SEO (Joy Hawkins is a recognized thought leader). Where we differ is the AI search layer, which Sterling Sky does not currently sell as a standard service.",
      },
      {
        q: "What if I want both classical depth AND AI visibility?",
        a: "AiLys covers both. Classical local SEO is in every plan as the foundation (Step 1 through 3 of our 8-step methodology). AI search layer is on top (Steps 4 through 8). You do not need to pick.",
      },
    ],
    ctaPrimary: "Run my AI Visibility Audit",
    ctaSecondary: "See AiLys pricing",
    seoTitle: "AiLys vs Sterling Sky · AI SEO Comparison · AEO, GEO, E-E-A-T at SMB Pricing",
    seoDescription:
      "Honest comparison: AiLys Agency ($300 to $2,499/mo) vs Sterling Sky ($5,000+/mo). Both deliver classical local SEO. AiLys adds AEO, GEO, E-E-A-T optimization for ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot. Bilingual EN and FR-CA in-house. Quebec-anchored.",
    seoKeywords: [
      "AiLys vs Sterling Sky",
      "Sterling Sky alternative",
      "Sterling Sky pricing",
      "local SEO agency comparison",
      "AI search agency vs Sterling Sky",
      "Quebec local SEO alternative",
      "Sterling Sky competitor",
    ],
  },
  fr: {
    eyebrow: "AiLys vs Sterling Sky",
    headline1: "Sterling Sky excelle en SEO local classique.",
    headline2: "On y ajoute la couche IA qu'ils n'offrent pas.",
    subheadline:
      "Sterling Sky a bâti sa réputation en optimisation Google Maps et local pack. Ils chargent 5 000 $+/mois pour la recette classique. AiLys couvre la même fondation classique et y ajoute l'AEO, le GEO et l'E-E-A-T pour ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Bilingue EN et FR-CA, ancré au Québec, à partir de 300 $/mois.",
    verdictTitle: "Quand AiLys est le bon choix",
    verdictBody:
      "Sterling Sky est conçu pour les budgets SEO local entreprise et les chaînes complexes multi-emplacements où leur profondeur en consultation est irremplaçable. AiLys est conçu pour les commerces locaux qui ont besoin de la fondation SEO classique ET de la couche IA, à un prix PME.",
    whenAilysWins: [
      "Votre budget mensuel est sous 2 000 $ et vous avez besoin d'AEO, GEO et E-E-A-T réels, pas seulement d'optimisation GBP.",
      "Vous opérez au Québec ou dans un marché canadien bilingue et vous voulez une livraison FR-CA native.",
      "Vous voulez un suivi explicite des citations LLM hebdomadaires sur 6 moteurs IA, pas juste des rapports de classement Google.",
      "Vous voulez une flexibilité mois par mois avec préavis de 2 semaines, pas un mandat annuel.",
      "Vous voulez le moteur de vélocité d'avis Reviuzy intégré (forfait Agency).",
    ],
    whenCompetitorWins: [
      "Votre budget mensuel est de 5 000 $+ et vous avez besoin d'un spécialiste de litiges Google Maps pour cas de spam ou suspensions.",
      "Vous opérez principalement en marché anglophone où la livraison bilingue n'est pas un facteur déterminant.",
      "Vous avez besoin d'une présence à long terme dans les forums Local Search (Joy Hawkins est une des meilleures en SEO local classique).",
    ],
    pricing: {
      competitorRange: "5 000 $+ /mois (devis sur mesure, mandat)",
      ailysRange: "300 $ à 1 299 $ /mois (forfaits transparents, mois par mois)",
      note: "Le prix Sterling Sky est basé sur les déclarations publiques de leur équipe et études de cas. Les devis finaux varient selon la portée.",
    },
    rows: [
      { feature: "Prix de départ", competitor: "5 000 $+ /mois", ailys: "300 $ /mois", outcome: "win" },
      { feature: "Durée de contrat", competitor: "Mandat annuel typique", ailys: "Mois par mois, 2 semaines de préavis", outcome: "win" },
      { feature: "SEO local classique", competitor: "Profondeur leader de l'industrie", ailys: "Couverture complète", outcome: "loss" },
      { feature: "Optimisation GBP", competitor: "Oui", ailys: "Oui", outcome: "tie" },
      { feature: "Construction de citations", competitor: "Oui", ailys: "Oui (5 à 10+ par mois)", outcome: "tie" },
      { feature: "Déploiement schema AEO", competitor: "Limité (sur mesure seulement)", ailys: "Standard à Core+", outcome: "win" },
      { feature: "Travail d'autorité GEO", competitor: "Pas standard", ailys: "Standard à Growth+", outcome: "win" },
      { feature: "Optimisation E-E-A-T", competitor: "Implicite via le contenu", ailys: "Construction de signaux explicite", outcome: "win" },
      { feature: "Suivi citations LLM hebdo (6 moteurs)", competitor: "Non offert", ailys: "Standard à tous les forfaits", outcome: "win" },
      { feature: "Bilingue EN et FR-CA à l'interne", competitor: "EN seulement", ailys: "Oui, FR-CA natif", outcome: "win" },
      { feature: "Livraison multilingue (8 langues)", competitor: "EN seulement", ailys: "EN, FR, ES, ZH, AR, RU + UK, SR via partenaires", outcome: "win" },
      { feature: "Soutien suspension Google Maps", competitor: "Service de spécialité", ailys: "Disponible, pas une spécialité", outcome: "loss" },
      { feature: "Soutien entreprise multi-emplacements", competitor: "Oui (50+ emplacements)", ailys: "Oui (jusqu'à 25, plus sur devis)", outcome: "tie" },
      { feature: "Moteur de vélocité d'avis", competitor: "Non offert", ailys: "Oui (NFC Reviuzy à Agency)", outcome: "win" },
      { feature: "Suivi de citations public", competitor: "Non offert", ailys: "Oui (page /citations live)", outcome: "win" },
      { feature: "Garantie de remboursement", competitor: "Non déclarée publiquement", ailys: "Garantie satisfaction 30 jours", outcome: "win" },
    ],
    faq: [
      {
        q: "Sterling Sky est-il meilleur qu'AiLys pour le SEO local?",
        a: "Sterling Sky est une des consultations SEO local classiques les plus fortes en Amérique du Nord. Si votre seul besoin est l'optimisation Google Maps et vous avez 5 000 $+/mois, ils sont excellents. AiLys couvre la même fondation classique plus la couche IA (AEO, GEO, E-E-A-T) pour 300 $ à 1 299 $/mois.",
      },
      {
        q: "AiLys peut-il gérer les suspensions Google Maps ou disputes de spam?",
        a: "Oui, mais ce n'est pas notre spécialité. Sterling Sky a bâti une expertise profonde en litiges Google Maps. Si votre besoin principal est la réintégration ou la poursuite agressive de spam, ils sont le meilleur choix. AiLys gère les suspensions standards dans le cadre du suivi d'audit.",
      },
      {
        q: "Pourquoi AiLys est-il moins cher que Sterling Sky?",
        a: "Deux raisons. Notre couche de livraison est automatisée via Reviuzy (vélocité d'avis, automatisation GBP, NFC tap-to-review), donc on ne facture pas d'heures de consultation pour du travail qui est productisé. Et les coûts opérationnels du Québec et le positionnement PME sont différents de la consultation entreprise de Toronto.",
      },
      {
        q: "AiLys a-t-il la même profondeur en SEO local classique que Sterling Sky?",
        a: "On couvre la même fondation : SEO technique, GBP, citations, NAP, avis, schema. Sterling Sky a plus de spécialistes avec une plus longue ancienneté en SEO local classique. La différence est la couche IA, que Sterling Sky n'offre pas comme service standard.",
      },
      {
        q: "Et si je veux la profondeur classique ET la visibilité IA?",
        a: "AiLys couvre les deux. Le SEO local classique est dans chaque forfait comme fondation (Étapes 1 à 3 de notre méthodologie 8 étapes). La couche IA est par-dessus (Étapes 4 à 8). Vous n'avez pas à choisir.",
      },
    ],
    ctaPrimary: "Lancer l'audit de visibilité IA",
    ctaSecondary: "Voir les tarifs AiLys",
    seoTitle: "AiLys vs Sterling Sky · Comparaison SEO IA · AEO, GEO, E-E-A-T à prix PME",
    seoDescription:
      "Comparaison honnête : AiLys Agency (300 $ à 1 299 $/mois) vs Sterling Sky (5 000 $+/mois). Les deux livrent du SEO local classique. AiLys ajoute l'AEO, le GEO et l'E-E-A-T pour ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot. Bilingue EN et FR-CA. Ancré au Québec.",
    seoKeywords: [
      "AiLys vs Sterling Sky",
      "alternative Sterling Sky",
      "prix Sterling Sky",
      "comparaison agence SEO local",
      "agence SEO IA vs Sterling Sky",
      "alternative SEO local Québec",
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   COMPARISON 2 · BRIGHTLOCAL (tools-only platform, $799-$2,499/mo)
   ────────────────────────────────────────────────────────────────────────── */

const brightlocal: Comparison = {
  slug: "brightlocal",
  competitorName: "BrightLocal",
  competitorTagline: "Local SEO tools platform, UK",
  competitorWebsite: "brightlocal.com",
  toneClass: "from-cyan-400 via-blue-400 to-indigo-400",
  en: {
    eyebrow: "AiLys vs BrightLocal",
    headline1: "BrightLocal sells you the dashboard.",
    headline2: "AiLys does the work.",
    subheadline:
      "BrightLocal is a strong tools platform for agencies running local SEO at scale. They charge $799 to $2,499/mo for the software, and you operate it. AiLys is a done-for-you service at the same price range. We run the methodology, you get the citations.",
    verdictTitle: "When AiLys is the right fit",
    verdictBody:
      "BrightLocal is excellent if you have an in-house SEO team and need software to multiply their throughput across many clients or locations. AiLys is for local business owners who do not have an SEO team and need someone to run the methodology end to end.",
    whenAilysWins: [
      "You do not have an in-house SEO specialist to operate a tools platform.",
      "You want done-for-you delivery, not a dashboard you have to learn and run.",
      "You want explicit AEO, GEO, and E-E-A-T work, not just citation building and rank tracking.",
      "You want bilingual EN and FR-CA delivery for the Quebec market.",
      "You want a 30-day satisfaction guarantee.",
    ],
    whenCompetitorWins: [
      "You run an SEO agency and need software to scale across many clients.",
      "You have in-house specialists and want to keep operations under your roof.",
      "You need very large-scale citation reporting (1,000+ locations) where dashboard reporting is critical.",
    ],
    pricing: {
      competitorRange: "$79 to $2,499 /mo (DIY SaaS, you operate the tools)",
      ailysRange: "$300 to $2,499 /mo (done-for-you service)",
      note: "BrightLocal pricing from brightlocal.com (verified November 2026). Multi-location plans scale higher. Their highest tier is comparable to AiLys Growth pricing.",
    },
    rows: [
      { feature: "Delivery model", competitor: "DIY SaaS dashboard", ailys: "Done-for-you service", outcome: "win" },
      { feature: "Starting price", competitor: "$79 /mo (Single Business)", ailys: "$300 /mo", outcome: "loss" },
      { feature: "Mid tier", competitor: "$179 to $349 /mo", ailys: "$600 /mo (full service)", outcome: "tie" },
      { feature: "Top tier", competitor: "$2,499 /mo (Enterprise)", ailys: "$2,499 /mo (Agency)", outcome: "tie" },
      { feature: "Citation building", competitor: "DIY tool", ailys: "Done by us, 5-10+ per month", outcome: "win" },
      { feature: "GBP audit", competitor: "DIY tool", ailys: "Done by us, weekly monitoring", outcome: "win" },
      { feature: "Local rank tracker", competitor: "Yes (in-platform)", ailys: "Yes (in monthly report)", outcome: "tie" },
      { feature: "Review monitoring", competitor: "Yes (in-platform)", ailys: "Yes, with response handling", outcome: "win" },
      { feature: "AEO schema deployment", competitor: "Not offered", ailys: "Yes (Core+ tier)", outcome: "win" },
      { feature: "GEO entity authority", competitor: "Not offered", ailys: "Yes (Growth+ tier)", outcome: "win" },
      { feature: "LLM citation tracking (6 engines)", competitor: "Not offered", ailys: "Yes (all tiers)", outcome: "win" },
      { feature: "Time investment per month", competitor: "5-10 hours (you operate)", ailys: "0 hours (we operate)", outcome: "win" },
      { feature: "Bilingual EN and FR-CA", competitor: "EN only platform", ailys: "Yes, native FR-CA delivery", outcome: "win" },
      { feature: "White-label for agencies", competitor: "Yes", ailys: "Not standard (custom only)", outcome: "loss" },
      { feature: "API access", competitor: "Yes (Enterprise)", ailys: "Coming Q2 2026", outcome: "loss" },
      { feature: "Money-back guarantee", competitor: "14-day trial", ailys: "30-day satisfaction guarantee", outcome: "win" },
    ],
    faq: [
      {
        q: "Is BrightLocal cheaper than AiLys?",
        a: "Their entry tier ($79/mo Single Business) is cheaper than our entry ($300/mo), but you operate the tools yourself. Their done-for-you Citation Builder service starts at $4 per citation, which on 50 citations matches our Core tier. The total cost depends on whether you value tools access or completed work.",
      },
      {
        q: "Can I run BrightLocal myself instead of hiring an agency?",
        a: "Yes, if you have time and SEO expertise. BrightLocal is a strong DIY tool. Most local business owners do not have 5-10 hours per month to operate it correctly. AiLys is for people who want the work done, not the dashboard learned.",
      },
      {
        q: "Does AiLys use BrightLocal internally?",
        a: "We use a stack of tools internally including BrightLocal-style citation databases, but our methodology is not dependent on any single platform. We blend BrightLocal-class tools with our proprietary Reviuzy review engine and direct Anthropic API integration for citation tracking.",
      },
      {
        q: "What if I am an agency, not an end client?",
        a: "BrightLocal is the better fit for agencies that need white-label tools at scale. AiLys does not currently offer white-label as a standard service. If you are an agency interested in partnership, contact us directly.",
      },
      {
        q: "Does AiLys do AI search optimization that BrightLocal does not?",
        a: "Yes. AEO schema deployment, GEO entity authority on Wikipedia and Wikidata, E-E-A-T signal building, and weekly LLM citation tracking across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot are not in BrightLocal's product. They are core to AiLys delivery.",
      },
    ],
    ctaPrimary: "Run my AI Visibility Audit",
    ctaSecondary: "See AiLys pricing",
    seoTitle: "AiLys vs BrightLocal · Done-for-You vs DIY Tools · AI SEO Comparison",
    seoDescription:
      "Honest comparison: AiLys Agency done-for-you ($300 to $2,499/mo) vs BrightLocal DIY tools ($79 to $2,499/mo). AiLys runs AEO, GEO, E-E-A-T optimization end to end. BrightLocal sells you the dashboard, you operate it. Bilingual EN and FR-CA delivery. Quebec-anchored.",
    seoKeywords: [
      "AiLys vs BrightLocal",
      "BrightLocal alternative",
      "BrightLocal pricing",
      "DIY local SEO vs done for you",
      "BrightLocal competitor",
      "Quebec local SEO alternative",
    ],
  },
  fr: {
    eyebrow: "AiLys vs BrightLocal",
    headline1: "BrightLocal vous vend le tableau de bord.",
    headline2: "AiLys fait le travail.",
    subheadline:
      "BrightLocal est une plateforme d'outils solide pour les agences qui font du SEO local à l'échelle. Ils chargent 79 $ à 1 299 $/mois pour le logiciel, et vous l'opérez. AiLys est un service clé en main dans la même gamme de prix. On exécute la méthodologie, vous obtenez les citations.",
    verdictTitle: "Quand AiLys est le bon choix",
    verdictBody:
      "BrightLocal est excellent si vous avez une équipe SEO interne et avez besoin de logiciel pour multiplier sa capacité sur plusieurs clients ou emplacements. AiLys est pour les propriétaires de commerces locaux qui n'ont pas d'équipe SEO et ont besoin que quelqu'un exécute la méthodologie de bout en bout.",
    whenAilysWins: [
      "Vous n'avez pas de spécialiste SEO interne pour opérer une plateforme d'outils.",
      "Vous voulez une livraison clé en main, pas un tableau de bord à apprendre et opérer.",
      "Vous voulez un travail AEO, GEO et E-E-A-T explicite, pas juste de la construction de citations et du suivi de classement.",
      "Vous voulez une livraison bilingue EN et FR-CA pour le marché québécois.",
      "Vous voulez une garantie de satisfaction de 30 jours.",
    ],
    whenCompetitorWins: [
      "Vous gérez une agence SEO et avez besoin de logiciel pour passer à l'échelle sur plusieurs clients.",
      "Vous avez des spécialistes internes et voulez garder les opérations chez vous.",
      "Vous avez besoin de rapports de citations à très grande échelle (1 000+ emplacements).",
    ],
    pricing: {
      competitorRange: "79 $ à 1 299 $ /mois (SaaS DIY, vous opérez les outils)",
      ailysRange: "300 $ à 1 299 $ /mois (service clé en main)",
      note: "Prix BrightLocal selon brightlocal.com (vérifié novembre 2026). Les forfaits multi-emplacements sont plus élevés.",
    },
    rows: [
      { feature: "Modèle de livraison", competitor: "Tableau de bord SaaS DIY", ailys: "Service clé en main", outcome: "win" },
      { feature: "Prix de départ", competitor: "79 $ /mois (Single Business)", ailys: "300 $ /mois", outcome: "loss" },
      { feature: "Forfait moyen", competitor: "179 $ à 349 $ /mois", ailys: "600 $ /mois (service complet)", outcome: "tie" },
      { feature: "Forfait haut", competitor: "1 299 $ /mois (Enterprise)", ailys: "1 299 $ /mois (Agency)", outcome: "tie" },
      { feature: "Construction de citations", competitor: "Outil DIY", ailys: "Fait par nous, 5 à 10+ par mois", outcome: "win" },
      { feature: "Audit GBP", competitor: "Outil DIY", ailys: "Fait par nous, suivi hebdo", outcome: "win" },
      { feature: "Suivi de classement local", competitor: "Oui (dans la plateforme)", ailys: "Oui (rapport mensuel)", outcome: "tie" },
      { feature: "Suivi des avis", competitor: "Oui (dans la plateforme)", ailys: "Oui, avec gestion des réponses", outcome: "win" },
      { feature: "Déploiement schema AEO", competitor: "Non offert", ailys: "Oui (Core+)", outcome: "win" },
      { feature: "Autorité d'entité GEO", competitor: "Non offert", ailys: "Oui (Growth+)", outcome: "win" },
      { feature: "Suivi citations LLM (6 moteurs)", competitor: "Non offert", ailys: "Oui (tous les forfaits)", outcome: "win" },
      { feature: "Temps requis par mois", competitor: "5 à 10 heures (vous opérez)", ailys: "0 heure (on opère)", outcome: "win" },
      { feature: "Bilingue EN et FR-CA", competitor: "Plateforme EN seulement", ailys: "Oui, livraison FR-CA native", outcome: "win" },
      { feature: "Marque blanche pour agences", competitor: "Oui", ailys: "Pas standard (sur mesure seulement)", outcome: "loss" },
      { feature: "Accès API", competitor: "Oui (Enterprise)", ailys: "À venir Q2 2026", outcome: "loss" },
      { feature: "Garantie de remboursement", competitor: "Essai 14 jours", ailys: "Garantie satisfaction 30 jours", outcome: "win" },
    ],
    faq: [
      {
        q: "BrightLocal est-il moins cher qu'AiLys?",
        a: "Leur forfait d'entrée (79 $/mois Single Business) est moins cher que notre entrée (300 $/mois), mais vous opérez les outils vous-même. Leur service Citation Builder fait pour vous commence à 4 $ par citation, ce qui équivaut au forfait Core sur 50 citations.",
      },
      {
        q: "Puis-je utiliser BrightLocal moi-même au lieu d'engager une agence?",
        a: "Oui, si vous avez le temps et l'expertise SEO. BrightLocal est un bon outil DIY. La plupart des propriétaires de commerce n'ont pas 5 à 10 heures par mois pour l'opérer correctement.",
      },
      {
        q: "AiLys utilise-t-il BrightLocal à l'interne?",
        a: "On utilise un ensemble d'outils incluant des bases de données de citations de classe BrightLocal, mais notre méthodologie ne dépend d'aucune plateforme unique. On combine les outils de classe BrightLocal avec notre moteur Reviuzy et une intégration API directe avec Anthropic.",
      },
      {
        q: "Et si je suis une agence, pas un client final?",
        a: "BrightLocal convient mieux aux agences qui ont besoin d'outils marque blanche à grande échelle. AiLys n'offre pas de marque blanche comme service standard. Si vous êtes une agence intéressée par un partenariat, contactez-nous directement.",
      },
      {
        q: "AiLys fait-il de l'optimisation IA que BrightLocal ne fait pas?",
        a: "Oui. Le déploiement schema AEO, l'autorité d'entité GEO sur Wikipédia et Wikidata, la construction de signaux E-E-A-T, et le suivi hebdomadaire des citations LLM sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot ne sont pas dans le produit BrightLocal.",
      },
    ],
    ctaPrimary: "Lancer l'audit de visibilité IA",
    ctaSecondary: "Voir les tarifs AiLys",
    seoTitle: "AiLys vs BrightLocal · Clé en main vs Outils DIY · Comparaison SEO IA",
    seoDescription:
      "Comparaison honnête : AiLys Agency clé en main (300 $ à 1 299 $/mois) vs BrightLocal outils DIY (79 $ à 1 299 $/mois). AiLys exécute l'AEO, GEO, E-E-A-T de bout en bout. BrightLocal vous vend le tableau de bord. Livraison bilingue EN et FR-CA. Ancré au Québec.",
    seoKeywords: [
      "AiLys vs BrightLocal",
      "alternative BrightLocal",
      "prix BrightLocal",
      "SEO local DIY vs clé en main",
      "concurrent BrightLocal",
      "alternative SEO local Québec",
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   COMPARISON 3 · LOCALIQ (mass-volume SMB agency, $10-2,300/mo)
   ────────────────────────────────────────────────────────────────────────── */

const localiq: Comparison = {
  slug: "localiq",
  competitorName: "LocaliQ",
  competitorTagline: "Mass-volume SMB digital marketing, US",
  competitorWebsite: "localiq.com",
  toneClass: "from-violet-400 via-fuchsia-400 to-pink-400",
  en: {
    eyebrow: "AiLys vs LocaliQ",
    headline1: "LocaliQ runs at industrial scale.",
    headline2: "AiLys runs at boutique depth.",
    subheadline:
      "LocaliQ (and similar mass-volume agencies like Boostability and Marketing 360) optimizes for client volume. They serve thousands of SMBs through standardized templates and offshore execution. AiLys runs a deeper, AI-search-aware methodology with Quebec-anchored bilingual delivery.",
    verdictTitle: "When AiLys is the right fit",
    verdictBody:
      "LocaliQ is built for mass acquisition: low-touch onboarding, templated execution, very large account books per strategist. AiLys is built for specificity: vertical-tuned methodology, weekly LLM tracking, real-person delivery in your language and time zone.",
    whenAilysWins: [
      "You want a real strategist who knows your business, not a rotating account manager.",
      "You want Quebec-anchored bilingual delivery (LocaliQ delivery is mostly EN with offshore execution).",
      "You want explicit AI search optimization (AEO, GEO, E-E-A-T), not just AdWords and basic SEO.",
      "You want monthly transparency on actual citation lift, not just clicks and impressions.",
      "You want a 30-day satisfaction guarantee with a real out clause.",
    ],
    whenCompetitorWins: [
      "You need a fully integrated PPC + display + social ad spend management at scale (LocaliQ has more ad-buying scale).",
      "You operate in tier-3 US markets where LocaliQ's mass-volume directory partnerships have unique reach.",
      "You want a recognizable USA Today / Gannett brand backing your marketing relationship.",
    ],
    pricing: {
      competitorRange: "$10 to $2,300 /mo (varies by service mix; ad spend separate)",
      ailysRange: "$300 to $2,499 /mo (service only, ad spend would be separate)",
      note: "LocaliQ pricing is reported by third-party reviews and case studies (verified November 2026). Custom quotes vary widely.",
    },
    rows: [
      { feature: "Delivery model", competitor: "Mass-volume templated", ailys: "Boutique vertical-tuned", outcome: "win" },
      { feature: "Account ratio (clients per strategist)", competitor: "100+ to 1", ailys: "20 to 1 max", outcome: "win" },
      { feature: "Strategist tenure with you", competitor: "Rotating", ailys: "Same strategist throughout", outcome: "win" },
      { feature: "Time zone alignment", competitor: "US Eastern + offshore", ailys: "Eastern, Quebec-based", outcome: "tie" },
      { feature: "AEO schema deployment", competitor: "Not standard", ailys: "Standard at Core+", outcome: "win" },
      { feature: "GEO entity authority", competitor: "Not offered", ailys: "Standard at Growth+", outcome: "win" },
      { feature: "LLM citation tracking", competitor: "Not offered", ailys: "Standard at all tiers", outcome: "win" },
      { feature: "PPC management", competitor: "Yes (their core service)", ailys: "Not offered (we focus on organic)", outcome: "loss" },
      { feature: "Display ad management", competitor: "Yes", ailys: "Not offered", outcome: "loss" },
      { feature: "Social ad management", competitor: "Yes", ailys: "Not offered", outcome: "loss" },
      { feature: "Bilingual EN and FR-CA", competitor: "EN dominant", ailys: "Native FR-CA in-house", outcome: "win" },
      { feature: "Multilingual delivery", competitor: "ES partial", ailys: "EN, FR, ES, ZH, AR, RU + UK, SR", outcome: "win" },
      { feature: "Reporting frequency", competitor: "Monthly", ailys: "Weekly LLM + monthly comprehensive", outcome: "win" },
      { feature: "Contract length", competitor: "6 to 12 month minimums typical", ailys: "Month to month, 2 weeks notice", outcome: "win" },
      { feature: "Money-back guarantee", competitor: "Not standard", ailys: "30-day satisfaction guarantee", outcome: "win" },
    ],
    faq: [
      {
        q: "Is LocaliQ cheaper than AiLys?",
        a: "Entry-level LocaliQ services can start lower than our $300/mo, but the comparison is not apples-to-apples. Their entry-level is typically directory listings or basic citation building. Our $300/mo Starter includes weekly LLM citation tracking across 6 engines, full GBP optimization, and active citation building. Compare scope before comparing price.",
      },
      {
        q: "Does LocaliQ handle PPC and display ads?",
        a: "Yes, those are their core services. AiLys does not currently manage paid media. We focus on organic AI search visibility. If you need integrated paid + organic, you would either combine AiLys (organic) with a separate PPC vendor, or work with LocaliQ for the integrated package.",
      },
      {
        q: "Will my LocaliQ strategist actually know my business?",
        a: "LocaliQ runs high client-to-strategist ratios (100+ to 1 in many cases). Most clients report rotating account managers. AiLys keeps the same strategist on your account from kickoff to renewal, with a maximum of 20 active accounts per strategist.",
      },
      {
        q: "Can AiLys handle US markets, not just Quebec?",
        a: "Yes. We deliver across Canada, the United States, and Latin America. Our home advantage is Quebec because we are bilingual EN and FR-CA in-house. For US-only English markets, LocaliQ has more local sales presence; AiLys competes on methodology depth and AI search specificity.",
      },
      {
        q: "What about the AI visibility piece?",
        a: "AEO, GEO, E-E-A-T, and weekly LLM citation tracking are not in LocaliQ's standard product offering. They are core to AiLys delivery. If your competitive concern is AI search visibility, AiLys is the more focused choice.",
      },
    ],
    ctaPrimary: "Run my AI Visibility Audit",
    ctaSecondary: "See AiLys pricing",
    seoTitle: "AiLys vs LocaliQ · Boutique AI SEO vs Mass-Volume Marketing · Comparison",
    seoDescription:
      "Honest comparison: AiLys Agency boutique AI SEO ($300 to $2,499/mo) vs LocaliQ mass-volume digital marketing ($10 to $2,300/mo). AiLys delivers AEO, GEO, E-E-A-T with same strategist throughout. LocaliQ runs at industrial scale. Bilingual EN and FR-CA. Quebec-anchored.",
    seoKeywords: [
      "AiLys vs LocaliQ",
      "LocaliQ alternative",
      "LocaliQ pricing",
      "boutique vs mass volume SEO agency",
      "LocaliQ competitor",
      "Quebec AI SEO alternative",
    ],
  },
  fr: {
    eyebrow: "AiLys vs LocaliQ",
    headline1: "LocaliQ opère à l'échelle industrielle.",
    headline2: "AiLys opère à profondeur boutique.",
    subheadline:
      "LocaliQ (et les agences à fort volume comme Boostability et Marketing 360) optimisent pour le volume de clients. Ils servent des milliers de PME via des templates standardisés et de l'exécution outre-mer. AiLys exécute une méthodologie plus profonde, consciente de la recherche IA, avec livraison bilingue ancrée au Québec.",
    verdictTitle: "Quand AiLys est le bon choix",
    verdictBody:
      "LocaliQ est conçu pour l'acquisition de masse : intégration légère, exécution sur templates, très grands portefeuilles de comptes par stratège. AiLys est conçu pour la spécificité : méthodologie ajustée par secteur, suivi LLM hebdo, livraison par de vraies personnes dans votre langue et fuseau horaire.",
    whenAilysWins: [
      "Vous voulez un vrai stratège qui connaît votre entreprise, pas un gestionnaire de compte tournant.",
      "Vous voulez une livraison bilingue ancrée au Québec (la livraison LocaliQ est principalement EN avec exécution outre-mer).",
      "Vous voulez de l'optimisation explicite de recherche IA (AEO, GEO, E-E-A-T), pas juste du AdWords et SEO de base.",
      "Vous voulez une transparence mensuelle sur le vrai gain de citations, pas juste des clics et impressions.",
      "Vous voulez une garantie de satisfaction 30 jours avec une vraie clause de sortie.",
    ],
    whenCompetitorWins: [
      "Vous avez besoin de gestion intégrée PPC + display + ads sociales à l'échelle (LocaliQ a plus d'envergure d'achat médias).",
      "Vous opérez dans des marchés américains tier-3 où les partenariats d'annuaires de masse de LocaliQ ont une portée unique.",
      "Vous voulez une marque reconnaissable USA Today / Gannett derrière votre relation marketing.",
    ],
    pricing: {
      competitorRange: "10 $ à 2 300 $ /mois (varie selon les services; achat médias en sus)",
      ailysRange: "300 $ à 1 299 $ /mois (service seulement, achat médias séparé)",
      note: "Prix LocaliQ rapportés par des avis tiers et études de cas (vérifié novembre 2026). Devis sur mesure varient largement.",
    },
    rows: [
      { feature: "Modèle de livraison", competitor: "Volume de masse sur templates", ailys: "Boutique ajusté par secteur", outcome: "win" },
      { feature: "Ratio comptes par stratège", competitor: "100+ pour 1", ailys: "20 pour 1 maximum", outcome: "win" },
      { feature: "Continuité du stratège", competitor: "Tournant", ailys: "Même stratège du début à la fin", outcome: "win" },
      { feature: "Alignement fuseau horaire", competitor: "Est US + outre-mer", ailys: "Est, basé au Québec", outcome: "tie" },
      { feature: "Déploiement schema AEO", competitor: "Pas standard", ailys: "Standard à Core+", outcome: "win" },
      { feature: "Autorité d'entité GEO", competitor: "Non offert", ailys: "Standard à Growth+", outcome: "win" },
      { feature: "Suivi citations LLM", competitor: "Non offert", ailys: "Standard à tous les forfaits", outcome: "win" },
      { feature: "Gestion PPC", competitor: "Oui (leur service principal)", ailys: "Non offert (focus organique)", outcome: "loss" },
      { feature: "Gestion display", competitor: "Oui", ailys: "Non offert", outcome: "loss" },
      { feature: "Gestion ads sociales", competitor: "Oui", ailys: "Non offert", outcome: "loss" },
      { feature: "Bilingue EN et FR-CA", competitor: "EN dominant", ailys: "FR-CA natif à l'interne", outcome: "win" },
      { feature: "Livraison multilingue", competitor: "ES partiel", ailys: "EN, FR, ES, ZH, AR, RU + UK, SR", outcome: "win" },
      { feature: "Fréquence de rapports", competitor: "Mensuelle", ailys: "LLM hebdo + complète mensuelle", outcome: "win" },
      { feature: "Durée de contrat", competitor: "6 à 12 mois minimum typique", ailys: "Mois par mois, 2 semaines de préavis", outcome: "win" },
      { feature: "Garantie de remboursement", competitor: "Pas standard", ailys: "Garantie satisfaction 30 jours", outcome: "win" },
    ],
    faq: [
      {
        q: "LocaliQ est-il moins cher qu'AiLys?",
        a: "Les services d'entrée LocaliQ peuvent commencer plus bas que nos 300 $/mois, mais la comparaison n'est pas équivalente. Leur entrée est typiquement des inscriptions d'annuaires ou de la construction de citations de base. Notre Starter à 300 $/mois inclut le suivi hebdomadaire des citations LLM sur 6 moteurs, l'optimisation GBP complète et la construction active de citations.",
      },
      {
        q: "LocaliQ gère-t-il PPC et display?",
        a: "Oui, ce sont leurs services principaux. AiLys ne gère pas de médias payants. On se concentre sur la visibilité organique IA. Si vous avez besoin du paquet intégré, vous combineriez AiLys (organique) avec un fournisseur PPC séparé.",
      },
      {
        q: "Mon stratège LocaliQ connaîtra-t-il vraiment mon entreprise?",
        a: "LocaliQ a des ratios élevés client-stratège (100+ pour 1 dans beaucoup de cas). La plupart des clients rapportent des gestionnaires de compte tournants. AiLys garde le même stratège sur votre compte du lancement au renouvellement, avec un maximum de 20 comptes actifs par stratège.",
      },
      {
        q: "AiLys peut-il gérer des marchés américains, pas juste le Québec?",
        a: "Oui. On livre à travers le Canada, les États-Unis et l'Amérique latine. Notre avantage est le Québec parce qu'on est bilingue EN et FR-CA à l'interne. Pour les marchés américains anglophones uniquement, LocaliQ a plus de présence locale; AiLys compétitionne sur la profondeur méthodologique.",
      },
      {
        q: "Et la pièce visibilité IA?",
        a: "L'AEO, le GEO, l'E-E-A-T et le suivi hebdomadaire des citations LLM ne sont pas dans l'offre standard de LocaliQ. Ils sont au cœur de la livraison AiLys. Si votre préoccupation concurrentielle est la visibilité de recherche IA, AiLys est le choix plus ciblé.",
      },
    ],
    ctaPrimary: "Lancer l'audit de visibilité IA",
    ctaSecondary: "Voir les tarifs AiLys",
    seoTitle: "AiLys vs LocaliQ · SEO IA boutique vs marketing volume de masse",
    seoDescription:
      "Comparaison honnête : AiLys Agency SEO IA boutique (300 $ à 1 299 $/mois) vs LocaliQ marketing numérique volume de masse (10 $ à 2 300 $/mois). AiLys livre AEO, GEO, E-E-A-T avec même stratège tout au long. LocaliQ opère à l'échelle industrielle. Bilingue EN et FR-CA. Ancré au Québec.",
    seoKeywords: [
      "AiLys vs LocaliQ",
      "alternative LocaliQ",
      "prix LocaliQ",
      "agence SEO boutique vs volume",
      "concurrent LocaliQ",
      "alternative SEO IA Québec",
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   Export
   ────────────────────────────────────────────────────────────────────────── */

export const comparisons: Comparison[] = [sterlingSky, brightlocal, localiq];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonContent(comparison: Comparison, lang: string): ComparisonContent {
  if (lang === "fr") return comparison.fr;
  if (lang === "en") return comparison.en;
  const override = comparison.i18n?.[lang];
  if (override) {
    return { ...comparison.en, ...override };
  }
  return comparison.en;
}
