// AiLys Agency · Help Center articles (static data)
//
// Each article has its own URL for SEO (people Google "how does AEO work").
// Migrate to Supabase later if the doc center grows beyond ~50 articles.

export type HelpCategory =
  | "getting-started"
  | "aeo-geo-eeat"
  | "pricing-plans"
  | "audit"
  | "account-billing"
  | "glossary";

export interface HelpArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown
  category: HelpCategory;
  updatedAt: string;
  readingTimeMin: number;
  i18n?: {
    [lang: string]: {
      title?: string;
      excerpt?: string;
      content?: string;
      body?: string;
    };
  };
}

export const HELP_CATEGORY_META: Record<
  HelpCategory,
  { label: string; description: string; tone: string }
> = {
  "getting-started": {
    label: "Getting started",
    description: "First steps. Onboarding. What to expect.",
    tone: "from-cyan-400 to-teal-400",
  },
  "aeo-geo-eeat": {
    label: "AEO · GEO · E-E-A-T",
    description: "The disciplines we deliver, explained.",
    tone: "from-violet-400 to-fuchsia-400",
  },
  "pricing-plans": {
    label: "Pricing & plans",
    description: "Tier breakdowns, what each plan includes.",
    tone: "from-amber-400 to-rose-400",
  },
  audit: {
    label: "AI Visibility Audit",
    description: "How the audit works, what you get, turnaround.",
    tone: "from-emerald-400 to-cyan-400",
  },
  "account-billing": {
    label: "Account & billing",
    description: "Invoicing, cancellation, refunds.",
    tone: "from-sky-400 to-blue-500",
  },
  glossary: {
    label: "AI search glossary",
    description: "Quick definitions for the terms we throw around.",
    tone: "from-rose-400 to-pink-400",
  },
};

export const helpArticles: HelpArticle[] = [
  // ─── Getting started ───────────────────────────────────────
  {
    slug: "add-ons-explained",
    title: "Add-ons explained: AiLys Automation reputation system + Premium Ops trio",
    excerpt:
      "Two ways to upgrade any tier without jumping to Agency. Reputation system at $100/mo, Premium Ops trio at $79/mo bundle (or $35 each). All bundled by default in Agency.",
    category: "pricing-plans",
    updatedAt: "2026-04-27",
    readingTimeMin: 5,
    body: `## Why add-ons exist

Most clients sit on Starter, Core, or Growth (between $300/mo and $1,200/mo). The Agency tier at $2,500/mo is built for brands with multiple locations, agencies who resell, and operators who need a turnkey premium stack. Most clients do not need that, but they do want one or two pieces of it. Add-ons let any tier layer the missing piece without paying the Agency price.

## Add-on 1: AiLys Automation reputation system, $100/mo

What the client gets, self-serve through the AiLys Automation app:

- NFC tap-to-review landing page and collection flow (cards procured separately by the client, or via the AiLys card service at 100 dollars CAD one-time per 3-card set with programming and delivery)
- Customer review submission form (15 second guided flow)
- AI-generated review drafts (the customer validates and submits)
- AI auto-replies on every review received
- Contest engine: monthly review draw, automated winner pick
- Video winner announcement, generated and published
- Legal T&C generator for 20+ countries
- Fake review detection (Domain Shield basics)

What the agency delivers in the background, you see only the outcomes:

- Google Business Profile post automation, photo uploads, Q&A monitoring
- Citation building and NAP consistency checks
- AI Visibility dashboard probes and reports
- AI Traffic conversion tracking

Why the split: most clients are not technically inclined and do not want to manage 8 admin panels. We give self-serve access to the daily-use tool (the review system) and deliver the rest as a service with monthly reports.

## Add-on 2: Premium Ops trio, $79/mo bundle (or $35 each)

Three independent add-ons, available individually or as a discounted bundle.

**Domain Shield ($35/mo individual)**: Always-on fake review detection across every connected location. Watches for competitor attacks, policy violations, and unusual review patterns. Alerts you within minutes of suspicious activity.

**Domain Speed Boost ($35/mo individual)**: Performance optimization layer on the client website. Image lazy loading, lightweight cache, server response tuning. Faster Core Web Vitals score, better Google ranking signal, lower bounce rate.

**Dedicated strategist ($35/mo individual)**: The same senior strategist on your account every month, not pooled. Direct line on Slack or email, retains context across calls, no re-explaining the business each time. Faster decisions, lower friction.

**Bundle the trio: $79/mo, save $26/mo** vs. paying $35 each ($105 individually). Most clients who take one of the three end up taking all three within 90 days, so the bundle is the natural pick.

## Bundled in Agency by default

Agency tier ($2,500/mo) includes both add-ons at no extra cost:

- Full AiLys Automation reputation system bundled
- Domain Shield, Domain Speed Boost, dedicated strategist all bundled
- Plus the Agency-only items: multi-location dashboard, white-label PDF reports, Slack SLA under 4 hours, API access, custom integrations (HubSpot, Salesforce, hospitality PMS), quarterly executive deck

## How to add or drop

Open **AiLys, billing, add-ons** in your account. Toggle each add-on on or off. Changes take effect at the start of the next billing cycle. We do not pro-rate mid-cycle additions or removals.

## Money-back guarantee applies

Every add-on is covered by the 30-day satisfaction guarantee that applies to all AiLys plans. If you add AiLys Automation and the contest engine does not produce results in the first month, we refund the add-on portion. No clawback on what we already shipped on the base plan.`,
    i18n: {
      fr: {
        title: "Add-ons expliqués : système de réputation AiLys Automation + trio Premium Ops",
        excerpt:
          "Deux façons de bonifier n'importe quel forfait sans passer à Agency. Système de réputation à 100 $/mois, trio Premium Ops à 79 $/mois en bundle (ou 35 $ chacun). Tout inclus par défaut dans Agency.",
        body: `## Pourquoi les add-ons existent

La plupart des clients sont sur Starter, Core ou Growth (entre 300 $/mois et 1 200 $/mois). Le palier Agency à 2 500 $/mois est conçu pour les marques multi-emplacements, les agences qui revendent, et les opérateurs qui veulent une stack premium clé en main. La plupart des clients n'en ont pas besoin, mais ils veulent une ou deux pièces. Les add-ons permettent à n'importe quel forfait d'ajouter la pièce manquante sans payer le prix Agency.

## Add-on 1 : Système de réputation AiLys Automation, 100 $/mois

Ce que le client obtient en libre-service via l'app AiLys Automation :

- Page d'atterrissage NFC tap-to-review et flux de collecte (cartes approvisionnées séparément par le client, ou via le service de cartes AiLys à 100 dollars CAD à charge unique par ensemble de 3 cartes avec programmation et livraison)
- Formulaire client de soumission d'avis (flux guidé de 15 secondes)
- Brouillons d'avis générés par IA (le client valide et soumet)
- Réponses automatiques par IA sur chaque avis reçu
- Moteur de concours : tirage mensuel d'avis, choix de gagnant automatisé
- Annonce vidéo du gagnant, générée et publiée
- Générateur de T&C juridiques pour 20+ pays
- Détection de faux avis (Domain Shield basics)

Ce que l'agence livre en coulisse, vous voyez seulement les résultats :

- Automatisation Google Business Profile : publications, téléversements de photos, surveillance Q&R
- Construction de citations et vérifications de cohérence NAP
- Sondes du tableau de bord visibilité IA et rapports
- Suivi de conversion du trafic IA

Pourquoi la séparation : la plupart des clients ne sont pas techniques et ne veulent pas gérer 8 panneaux d'admin. On donne l'accès libre-service à l'outil quotidien (le système de réputation) et on livre le reste comme un service avec des rapports mensuels.

## Add-on 2 : Trio Premium Ops, 79 $/mois en bundle (ou 35 $ chacun)

Trois add-ons indépendants, disponibles à la pièce ou en bundle remisé.

**Domain Shield (35 $/mois à la pièce)** : Détection de faux avis toujours active sur chaque emplacement connecté. Surveille les attaques concurrentielles, les violations de politique, et les schémas d'avis inhabituels. Vous alerte en quelques minutes en cas d'activité suspecte.

**Domain Speed Boost (35 $/mois à la pièce)** : Couche d'optimisation de performance sur le site client. Chargement paresseux d'images, cache léger, ajustement de réponse serveur. Score Core Web Vitals amélioré, meilleur signal de classement Google, taux de rebond réduit.

**Stratège attitré (35 $/mois à la pièce)** : Le même stratège senior sur votre compte chaque mois, pas un pool. Ligne directe sur Slack ou courriel, conserve le contexte d'un appel à l'autre, pas besoin de ré-expliquer l'entreprise à chaque fois. Décisions plus rapides, moins de friction.

**Bundle du trio : 79 $/mois, économisez 26 $/mois** vs. payer 35 $ chacun (105 $ à la pièce). La plupart des clients qui prennent un des trois finissent par prendre les trois dans les 90 jours, donc le bundle est le choix naturel.

## Inclus dans Agency par défaut

Le palier Agency (2 500 $/mois) inclut les deux add-ons sans frais supplémentaires :

- Système de réputation AiLys Automation au complet inclus
- Domain Shield, Domain Speed Boost, stratège attitré tous inclus
- Plus les éléments propres à Agency : tableau de bord multi-emplacements, rapports PDF en marque blanche, SLA Slack sous 4 heures, accès API, intégrations sur mesure (HubSpot, Salesforce, PMS hospitalier), présentation exécutive trimestrielle

## Comment ajouter ou retirer

Ouvrez **AiLys, facturation, add-ons** dans votre compte. Activez ou désactivez chaque add-on. Les changements prennent effet au début du prochain cycle de facturation. On ne fait pas de prorata pour les ajouts ou retraits en milieu de cycle.

## La garantie de remboursement s'applique

Chaque add-on est couvert par la garantie satisfaction de 30 jours qui s'applique à tous les forfaits AiLys. Si vous ajoutez AiLys Automation et que le moteur de concours ne produit pas de résultats dans le premier mois, on rembourse la portion add-on. Aucune récupération sur ce qu'on a déjà livré sur le forfait de base.`,
      },
    },
  },
  {
    slug: "ai-visibility-engine",
    title: "How the AI Visibility engine works (Share of Model, sentiment, freshness)",
    excerpt:
      "We probe 6 AI engines for how they answer queries about your brand, then turn their answers into a Share of Model dashboard, sentiment trends, and freshness alerts.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 5,
    body: `## What this covers

Three deliverables bundled into one engine:

1. **Share of Model**: how often your brand is mentioned by ChatGPT, Perplexity, Claude, Gemini, Google AI Overview, and Bing Copilot when answering a relevant local query, vs. how often your competitors are mentioned.
2. **Brand sentiment**: positive, neutral, or negative tone of any mention.
3. **Citation freshness alerts**: notification when a previously-mentioned brand stops being cited, when a new mention appears, or when a brand's position in the ranked answer shifts materially.

This is included in the Growth and Agency tiers, with manual on-demand probes included in Core.

## How a probe works

For each location and each query, our AiLys engine simulates how each of the 6 AI search engines would answer. Then it self-classifies its own answer along five axes: brandMentioned, brandPosition, competitorsMentioned, sentiment, and sentimentConfidence. The structured analysis is what powers the dashboards; the raw answer text is stored for audit.

Default query is automatically generated from the location's category and city: "best [category] in [city]". You can override with a custom query for a specific run (e.g. "highest-rated dentist in Plateau open Saturday").

We probe each engine separately because they will not always agree. ChatGPT may cite you while Bing Copilot does not. Knowing the spread is the point.

## Cadence

- **On-demand**: any tier can trigger a probe from the admin center
- **Weekly automatic**: Growth tier (every Monday morning, default query)
- **Daily automatic**: Agency tier
- **Rate-limited**: 20 full probes per workspace per hour

## What you see

Open **AiLys Automation, AI Visibility dashboard** in your workspace. Sections:

- **Share of Model**: bar chart of mention rate per engine across the last 30 days
- **Latest sentiment**: per-engine tone of the most recent mention
- **Competitors mentioned**: rollup of competitor names that came up in the last run
- **Freshness alerts**: per-engine flags ("Lost mention", "New mention", "Demoted", "Promoted")
- **Named competitors**: editable list of direct competitors to ground the prompts (the engine knows who to look for)

## Honest limitations

The 6 engine probes use one underlying AI engine to simulate all 6 (driven by the engine name in the prompt). This is a tractable approximation, not a literal query of each engine's production API. Two reasons we ship this way:

1. Native APIs for ChatGPT, Perplexity, Gemini, etc. each cost money and have separate rate limits. Bundling them into one provider lets us deliver the deliverable at the included tier price.
2. The simulated answers correlate well with real-world variance in our internal benchmark, especially for the directional question that matters most ("are we mentioned?"). They correlate less well for exact ranking position, which we surface but do not over-promise on.

Roadmap: we plan to swap individual engine simulations for native API calls as their pricing comes down. Your dashboard data will not change shape; only the source of the answer string will.

## Failure modes

If a probe fails for one engine (rare), that engine's row will say "No data" and the rest of the run completes. We retry the failed engine on the next probe.

Sentiment classification is most reliable when the engine actually mentions the brand. When the engine says "I do not have enough information about [brand]", we record this as not_mentioned and skip sentiment.`,
    i18n: {
      fr: {
        title: "Comment fonctionne le moteur de visibilité IA (Share of Model, sentiment, fraîcheur)",
        excerpt:
          "Nous sondons 6 moteurs IA sur la façon dont ils répondent aux requêtes concernant votre marque, puis transformons leurs réponses en tableau de bord Share of Model, tendances de sentiment et alertes de fraîcheur.",
        body: `## Ce que ça couvre

Trois livrables groupés dans un seul moteur :

1. **Share of Model** : à quelle fréquence votre marque est mentionnée par ChatGPT, Perplexity, Claude, Gemini, Google AI Overview et Bing Copilot quand ils répondent à une requête locale pertinente, vs à quelle fréquence vos concurrents sont mentionnés.
2. **Sentiment de marque** : ton positif, neutre, ou négatif de toute mention.
3. **Alertes de fraîcheur des citations** : notification quand une marque précédemment mentionnée n'est plus citée, quand une nouvelle mention apparaît, ou quand la position d'une marque dans la réponse classée change significativement.

Inclus dans les paliers Growth et Agency, avec des sondes manuelles à la demande incluses dans Core.

## Comment fonctionne une sonde

Pour chaque emplacement et chaque requête, notre moteur AiLys simule comment chacun des 6 moteurs de recherche IA répondrait. Puis il auto-classifie sa propre réponse selon cinq axes : brandMentioned, brandPosition, competitorsMentioned, sentiment, et sentimentConfidence. L'analyse structurée alimente les tableaux de bord ; le texte de réponse brut est conservé pour audit.

La requête par défaut est générée automatiquement à partir de la catégorie et de la ville de l'emplacement : "meilleur [catégorie] à [ville]". Vous pouvez surcharger avec une requête personnalisée pour une exécution spécifique (ex: "dentiste le mieux noté au Plateau ouvert le samedi").

Nous sondons chaque moteur séparément parce qu'ils ne sont pas toujours d'accord. ChatGPT peut vous citer alors que Bing Copilot ne le fait pas. Connaître l'écart, c'est le but.

## Cadence

- **À la demande** : n'importe quel palier peut déclencher une sonde depuis le centre d'administration
- **Hebdomadaire automatique** : palier Growth (chaque lundi matin, requête par défaut)
- **Quotidienne automatique** : palier Agency
- **Limité en débit** : 20 sondes complètes par espace de travail par heure

## Ce que vous voyez

Ouvrez **AiLys Automation, tableau de bord visibilité IA** dans votre espace de travail. Sections :

- **Share of Model** : graphique en barres du taux de mention par moteur sur les 30 derniers jours
- **Sentiment récent** : ton par moteur de la mention la plus récente
- **Concurrents mentionnés** : récapitulatif des noms de concurrents apparus dans la dernière exécution
- **Alertes de fraîcheur** : drapeaux par moteur ("Mention perdue", "Nouvelle mention", "Rétrogradé", "Promu")
- **Concurrents nommés** : liste éditable des concurrents directs pour ancrer les prompts (le moteur sait qui chercher)

## Limitations honnêtes

Les 6 sondes de moteur utilisent un seul moteur IA sous-jacent pour simuler les 6 (piloté par le nom du moteur dans le prompt). C'est une approximation traitable, pas une interrogation littérale de l'API de production de chaque moteur. Deux raisons pour livrer ainsi :

1. Les API natives pour ChatGPT, Perplexity, Gemini, etc. coûtent chacune de l'argent et ont des limites de débit séparées. Les regrouper dans un seul fournisseur nous permet de livrer le livrable au prix du palier inclus.
2. Les réponses simulées corrèlent bien avec la variance du monde réel dans notre repère interne, surtout pour la question directionnelle qui compte le plus ("sommes-nous mentionnés ?"). Elles corrèlent moins bien pour la position de classement exacte, que nous montrons mais ne sur-promettons pas.

Feuille de route : nous prévoyons de remplacer les simulations de moteur individuelles par des appels d'API natifs au fur et à mesure que leur prix baissera. La forme de vos données de tableau de bord ne changera pas ; seule la source de la chaîne de réponse changera.

## Modes de défaillance

Si une sonde échoue pour un moteur (rare), la ligne de ce moteur dira "Pas de données" et le reste de l'exécution se termine. Nous réessayons le moteur défaillant à la prochaine sonde.

La classification de sentiment est plus fiable quand le moteur mentionne effectivement la marque. Quand le moteur dit "Je n'ai pas assez d'informations sur [marque]", nous enregistrons ceci comme not_mentioned et sautons le sentiment.`,
      },
    },
  },
  {
    slug: "ai-traffic-tracker",
    title: "How AI traffic conversion tracking works (Agency)",
    excerpt:
      "Drop a tiny script on your site to track which visits and conversions came from AI search engines vs traditional channels.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 4,
    body: `## What this is

Most analytics tools group AI search traffic under "direct" or "referral" buckets, hiding what is actually the fastest-growing acquisition channel of 2026. Our AI traffic tracker fixes that. It detects visits from ChatGPT, Perplexity, Claude, Gemini, Google AI Overview, Bing Copilot, and you.com (via referrer host AND utm_source matching), tags them with the engine name, and rolls them up into a per-engine conversion dashboard.

This is included in the Agency tier as part of "AI traffic conversion tracker, UTM attribution from AI search to bookings".

## How it works

Two pieces:

1. **Beacon snippet**: a 20-line script you paste before the closing &lt;/body&gt; tag on every page. On every page load, it inspects the URL's UTM parameters and the document referrer. If either matches an AI engine signature, it fires one POST to our ingest endpoint with the engine name, the UTM bundle, and the landing path. Cookieless, no PII collected.
2. **Conversion call**: a one-line fetch you fire from your booking, signup, or purchase flow. Includes the conversion type ("booking", "signup", "purchase") and optional value. We tie it back to the visit.

## What you see

Open **AiLys Automation, AI traffic dashboard** in your workspace. Top stats: total visits, AI-attributed visits, conversions, AI conversion rate. Per-engine breakdown bar chart. Recent visits feed showing landing path, engine, and conversion flag.

## Setup (5 minutes)

1. Open the AI traffic dashboard.
2. Click "Generate token". Copy the value shown (it appears once, then we only store the SHA-256 hash).
3. Click "Copy snippet" and paste it into your site's HTML or your tag manager.
4. Add the conversion call to your booking/checkout flow.
5. Wait 24 to 48 hours, then check the dashboard.

## Why it matters

Two reasons even Starter and Core clients eventually want this:

1. You cannot prove ROI on AI visibility work without an attribution path. Knowing that 12 percent of bookings now come from AI engines (vs 0 percent six months ago) is the single number that justifies the agency relationship.
2. Conversion rate per engine tells you which engines actually drive your business. If ChatGPT visits convert at 4 percent and Perplexity at 0.5 percent, you know where to weight your AEO and GEO work.

## Privacy

We do not store IP addresses or user agents in the clear. We store SHA-256 hashes only, used for rate limiting (so one botted IP cannot flood your dashboard). No third-party trackers in the snippet. The token in the snippet is rotatable from the dashboard at any time.

## Failure modes

The most common issue is the snippet placed in the &lt;head&gt; instead of before &lt;/body&gt;. The snippet relies on document.referrer being available, which it is by &lt;/body&gt; but not always in &lt;head&gt; on some platforms. If you see zero entries after a day, this is the first thing to check.

Browser ad blockers will sometimes block the beacon. We accept this as a known limitation; the data still skews toward your real customers (ad blockers correlate with technical sophistication, which correlates with using ChatGPT for search anyway).`,
    i18n: {
      fr: {
        title: "Comment fonctionne le suivi de conversion du trafic IA (Agency)",
        excerpt:
          "Déposez un petit script sur votre site pour suivre quelles visites et conversions sont venues des moteurs de recherche IA vs des canaux traditionnels.",
        body: `## C'est quoi

La plupart des outils d'analyse regroupent le trafic de recherche IA dans les catégories "direct" ou "référence", cachant ce qui est en fait le canal d'acquisition à la croissance la plus rapide de 2026. Notre suivi de trafic IA corrige cela. Il détecte les visites depuis ChatGPT, Perplexity, Claude, Gemini, Google AI Overview, Bing Copilot et you.com (via correspondance de l'hôte référent ET de utm_source), les étiquette avec le nom du moteur, et les regroupe dans un tableau de bord de conversion par moteur.

Inclus dans le palier Agency dans le cadre du "Suivi de conversion du trafic IA, attribution UTM des recherches IA aux réservations".

## Comment ça fonctionne

Deux pièces :

1. **Script de balise** : un script de 20 lignes que vous collez avant la balise &lt;/body&gt; fermante sur chaque page. À chaque chargement de page, il inspecte les paramètres UTM de l'URL et le référent du document. Si l'un ou l'autre correspond à une signature de moteur IA, il déclenche un POST vers notre endpoint d'ingestion avec le nom du moteur, le bundle UTM et le chemin d'atterrissage. Sans cookies, aucune PII collectée.
2. **Appel de conversion** : un fetch d'une ligne que vous déclenchez depuis votre flux de réservation, d'inscription ou d'achat. Inclut le type de conversion ("booking", "signup", "purchase") et la valeur optionnelle. Nous le rattachons à la visite.

## Ce que vous voyez

Ouvrez **AiLys Automation, tableau de bord trafic IA** dans votre espace de travail. Stats du haut : visites totales, visites attribuées IA, conversions, taux de conversion IA. Répartition par moteur en graphique en barres. Flux des visites récentes montrant chemin d'atterrissage, moteur, et drapeau de conversion.

## Configuration (5 minutes)

1. Ouvrez le tableau de bord trafic IA.
2. Cliquez "Générer un jeton". Copiez la valeur affichée (elle apparaît une fois, ensuite nous ne stockons que le hash SHA-256).
3. Cliquez "Copier le script" et collez-le dans le HTML de votre site ou votre gestionnaire de balises.
4. Ajoutez l'appel de conversion à votre flux de réservation/paiement.
5. Attendez 24 à 48 heures, puis vérifiez le tableau de bord.

## Pourquoi ça compte

Deux raisons pour lesquelles même les clients Starter et Core finissent par vouloir ceci :

1. Vous ne pouvez pas prouver le ROI sur le travail de visibilité IA sans un chemin d'attribution. Savoir que 12 pour cent des réservations viennent maintenant des moteurs IA (vs 0 pour cent il y a six mois) est le seul chiffre qui justifie la relation avec l'agence.
2. Le taux de conversion par moteur vous dit quels moteurs font effectivement marcher votre entreprise. Si les visites ChatGPT convertissent à 4 pour cent et Perplexity à 0,5 pour cent, vous savez où peser votre travail AEO et GEO.

## Vie privée

Nous ne stockons pas les adresses IP ni les user agents en clair. Nous stockons seulement les hashs SHA-256, utilisés pour la limitation de débit (pour qu'un IP boté ne puisse pas inonder votre tableau de bord). Pas de traceurs tiers dans le script. Le jeton dans le script est rotable depuis le tableau de bord à tout moment.

## Modes de défaillance

Le problème le plus courant est le script placé dans le &lt;head&gt; au lieu de avant &lt;/body&gt;. Le script s'appuie sur document.referrer étant disponible, ce qui est le cas à &lt;/body&gt; mais pas toujours dans &lt;head&gt; sur certaines plateformes. Si vous voyez zéro entrée après une journée, c'est la première chose à vérifier.

Les bloqueurs de publicité de navigateur bloquent parfois la balise. Nous l'acceptons comme une limitation connue ; les données penchent toujours vers vos vrais clients (les bloqueurs de publicité corrèlent avec la sophistication technique, qui corrèle de toute façon avec l'utilisation de ChatGPT pour la recherche).`,
      },
    },
  },
  {
    slug: "citation-building",
    title: "How citation building works (Core 5/mo, Growth 10+/mo)",
    excerpt:
      "We submit your business to a curated catalog of 25+ directories, prioritized by tier and vertical. Here is the workflow, the directories, and how we track each submission.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 5,
    body: `## What citation building actually means

A "citation" is your business name, address, and phone number listed on a third-party directory like Yelp, BBB, Yellow Pages, Bing Places, Apple Business Connect, or a vertical-specific site like OpenTable or Healthgrades. Citations matter for two reasons:

1. **Trust signal for AI engines.** ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews cross-reference your brand across directories before they cite you in an answer. The more consistent and high-authority your citations, the more often you appear.
2. **Trust signal for Google.** Google's local algorithm uses citation count and consistency as one of the strongest off-profile ranking factors.

## What you get per tier

- **Core ($600 mo)**: 5 fresh citations per month, plus quarterly verification of existing ones
- **Growth ($1,200 mo)**: 10+ fresh citations per month, plus monthly verification
- **Agency ($2,500 mo)**: 10+ per month plus all the strategic placements (Wikidata entry, vertical-specific submissions)

A "fresh citation" is a new directory we add you to. A "verification" is us going back to a known directory and confirming the listing is still live and the NAP is still correct.

## The directory catalog

We submit to a hand-curated catalog of 25+ directories, organized by tier:

**Tier 1 (must-have for every business)**: Google Business Profile, Bing Places, Apple Business Connect, Facebook Pages, Yelp, BBB.

**Tier 2 (high-value general)**: Yellow Pages (US and Canada), Foursquare, Tripadvisor, Trustpilot, Manta, Hotfrog, Brownbook, Wikidata, Yandex Business (for Russian, Turkish, Belarusian, Kazakh markets).

**Tier 3 (vertical-specific)**: Healthgrades, Vitals, RateMDs (healthcare); Avvo, Justia (legal); OpenTable, Zomato (restaurants); Houzz, HomeAdvisor, Thumbtack (contractors); Zillow, Realtor.com (real estate).

We do not chase the "200 directories" claim other agencies make. Past the curated catalog, the long tail is dominated by spammy directories that hurt rather than help. Quality over quantity.

## Workflow

For each new client we run this loop, monthly:

1. **Audit current citations.** Pull what exists across the directory list. Flag gaps and inconsistencies.
2. **Submit new ones.** Top of the priority list each month, biased toward vertical-specific Tier 3 sites for your category.
3. **Verify previous submissions.** Check that what we submitted last month is now live with correct NAP.
4. **Update inconsistencies.** If we find a directory with a wrong phone number or an old address, we fix it.
5. **Document.** Every submission writes a tamper-evident audit record (which directory, when, listing URL, status).

## Where you see the work

Open **AiLys Automation, citation manager** in your workspace. Five tabs:

- **Suggested**: directories appropriate for your category and country, ordered by tier and authority. Click Queue to add to the work pipeline.
- **Queued**: directories the operator is about to submit
- **Submitted**: awaiting verification (typically 7 to 14 days for the directory to publish)
- **Verified**: live citations with the listing URL captured
- **Issues**: rejected, dropped, or delisted entries with the reason

## Rate of work

Realistic pace: 5 to 10 new submissions per month per location. Faster than that and we either hit directory anti-spam systems (your listings get rejected) or we burn budget on low-DA sites that do not move the needle.

## Failures

- **Rejected**: the directory refused the submission. Usually means our submission did not match their category guidelines, or your business is in a category they do not accept.
- **Delisted**: a previously verified citation got removed by the directory. Common with Yelp (their algorithmic moderation is aggressive). We refile.
- **Dropped**: we decided not to pursue a directory after starting (e.g. it requires a paid placement we did not budget for).`,
    i18n: {
      fr: {
        title: "Comment fonctionne le citation building (Core 5/mois, Growth 10+/mois)",
        excerpt:
          "Nous soumettons votre entreprise à un catalogue ciblé de 25+ annuaires, priorisés par palier et par secteur. Voici le flux de travail, les annuaires, et comment nous suivons chaque soumission.",
        body: `## Ce que veut dire concrètement le citation building

Une "citation" est votre nom d'entreprise, adresse et téléphone listés sur un annuaire tiers comme Yelp, BBB, Pages Jaunes, Bing Places, Apple Business Connect, ou un site sectoriel comme OpenTable ou Healthgrades. Les citations comptent pour deux raisons :

1. **Signal de confiance pour les moteurs IA.** ChatGPT, Perplexity, Claude, Gemini et les AI Overviews de Google recoupent votre marque à travers les annuaires avant de vous citer dans une réponse. Plus vos citations sont cohérentes et de haute autorité, plus vous apparaissez.
2. **Signal de confiance pour Google.** L'algorithme local de Google utilise le nombre et la cohérence des citations comme un des facteurs de classement hors-profil les plus forts.

## Ce que vous obtenez par palier

- **Core (600 $ mois)** : 5 nouvelles citations par mois, plus vérification trimestrielle des citations existantes
- **Growth (1 200 $ mois)** : 10+ nouvelles citations par mois, plus vérification mensuelle
- **Agency (1 599 $ mois)** : 10+ par mois plus tous les placements stratégiques (entrée Wikidata, soumissions sectorielles)

Une "nouvelle citation" est un nouvel annuaire où nous vous ajoutons. Une "vérification" est notre retour à un annuaire connu pour confirmer que la fiche est toujours en ligne et que le NAP est toujours exact.

## Le catalogue d'annuaires

Nous soumettons à un catalogue ciblé de 25+ annuaires, organisé par palier :

**Palier 1 (incontournable pour toute entreprise)** : Google Business Profile, Bing Places, Apple Business Connect, Facebook Pages, Yelp, BBB.

**Palier 2 (généralistes à haute valeur)** : Pages Jaunes (US et Canada), Foursquare, Tripadvisor, Trustpilot, Manta, Hotfrog, Brownbook, Wikidata, Yandex Business (pour les marchés russe, turc, biélorusse, kazakh).

**Palier 3 (sectoriels)** : Healthgrades, Vitals, RateMDs (santé) ; Avvo, Justia (juridique) ; OpenTable, Zomato (restaurants) ; Houzz, HomeAdvisor, Thumbtack (entrepreneurs) ; Zillow, Realtor.com (immobilier).

Nous ne courons pas après le marketing "200 annuaires" des autres agences. Au-delà du catalogue ciblé, la longue traîne est dominée par des annuaires douteux qui nuisent plus qu'ils n'aident. Qualité plutôt que quantité.

## Flux de travail

Pour chaque nouveau client nous roulons cette boucle, mensuellement :

1. **Audit des citations actuelles.** Récupérer ce qui existe à travers la liste d'annuaires. Signaler les manques et les incohérences.
2. **Soumettre les nouveaux.** Haut de la liste de priorité chaque mois, biaisé vers les sites sectoriels de Palier 3 pour votre catégorie.
3. **Vérifier les soumissions précédentes.** Confirmer que ce que nous avons soumis le mois dernier est maintenant en ligne avec le bon NAP.
4. **Mettre à jour les incohérences.** Si nous trouvons un annuaire avec un mauvais numéro ou une vieille adresse, nous corrigeons.
5. **Documenter.** Chaque soumission écrit un enregistrement d'audit infalsifiable (quel annuaire, quand, URL de la fiche, statut).

## Où vous voyez le travail

Ouvrez **AiLys Automation, gestionnaire de citations** dans votre espace de travail. Cinq onglets :

- **Suggérés** : annuaires appropriés pour votre catégorie et pays, triés par palier et autorité. Cliquez Mettre en file pour ajouter au pipeline.
- **En file** : annuaires que l'opérateur est sur le point de soumettre
- **Soumis** : en attente de vérification (typiquement 7 à 14 jours pour que l'annuaire publie)
- **Vérifié** : citations en ligne avec l'URL de la fiche enregistrée
- **Problèmes** : entrées rejetées, abandonnées, ou retirées avec la raison

## Cadence du travail

Cadence réaliste : 5 à 10 nouvelles soumissions par mois par emplacement. Plus vite que ça et on déclenche les systèmes anti-pourriel des annuaires (vos fiches sont rejetées) ou on brûle du budget sur des sites de faible autorité qui ne bougent pas l'aiguille.

## Échecs

- **Rejeté** : l'annuaire a refusé la soumission. Habituellement parce que notre soumission ne correspondait pas à leurs guides de catégorie, ou parce que votre entreprise est dans une catégorie qu'ils n'acceptent pas.
- **Retiré** : une citation précédemment vérifiée a été retirée par l'annuaire. Fréquent avec Yelp (leur modération algorithmique est agressive). Nous resoumettons.
- **Abandonné** : nous avons décidé de ne pas poursuivre un annuaire après avoir commencé (ex: il exigeait un placement payant pas budgété).`,
      },
    },
  },
  {
    slug: "nap-consistency",
    title: "Why NAP consistency matters and how we audit it",
    excerpt:
      "If your business name, address, and phone disagree across directories, AI engines and Google penalize you. Here is what consistency means and how we keep yours clean.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 3,
    body: `## What NAP consistency means

NAP stands for Name, Address, Phone. Consistency means the exact same NAP appears on every directory where your business is listed. Even small differences hurt:

- "Café du Soleil" vs "Café du Soleil Inc." vs "Cafe du Soleil"
- "123 Main St" vs "123 Main Street" vs "123 Main Street, Suite 200"
- "(514) 555-0100" vs "514.555.0100" vs "5145550100"

Each variant tells AI engines and Google that you might be a different business, splitting the trust signal across what they think are duplicates.

## Why it matters more in 2026

Two reasons:

1. **AI engines disambiguate businesses by NAP.** When Perplexity or ChatGPT decides whether to cite "Café du Soleil" in answer to "best Quebec coffee", it cross-references the brand across Yelp, OpenTable, Wikidata, and others. If those sources disagree, the engine flags the brand as low-confidence and either cites it less or cites a competitor instead.
2. **Google's local algorithm penalizes inconsistency.** Internal Google documentation surfaced via leak in 2024 confirmed that NAP variance counts negatively in the local ranking model.

## How we audit

Our process is operator-driven (no scraper that breaks every time a directory redesigns). For each location, we:

1. **Lock a canonical NAP.** Pull from your Google Business Profile, confirm with you, save as the source of truth.
2. **Visit each directory.** Open the listing, copy what is shown.
3. **Diff against canonical.** Our tool flags any field that does not match.
4. **Fix on-site.** For any flagged directory, we go back to the directory and update the listing to match canonical.

## Cadence

We run a full audit per location quarterly (or monthly for Growth and Agency tiers). When you call to tell us "we just changed our phone number", we run an immediate audit and fix all directories within the work-week.

## Where you see it

Open **AiLys Automation, NAP consistency checker** in your workspace. The page shows your canonical NAP at the top, a form to log a new directory observation, and the history of every observation we have ever recorded with a clear pass-or-fail flag per directory.

## Failure modes

- **Directory redesigned**: the visit fails because the directory moved its listing edit page. We track these and update our process.
- **Listing deleted**: a previously verified citation went missing. Refile.
- **Field permanently inconsistent**: some directories truncate names or restrict address formats. We document these as "expected variance" so they stop cluttering the diff view.`,
    i18n: {
      fr: {
        title: "Pourquoi la cohérence NAP compte et comment nous l'auditons",
        excerpt:
          "Si le nom, l'adresse et le téléphone de votre entreprise se contredisent à travers les annuaires, les moteurs IA et Google vous pénalisent. Voici ce que la cohérence veut dire et comment nous gardons la vôtre propre.",
        body: `## Ce que veut dire la cohérence NAP

NAP veut dire Nom, Adresse, Téléphone (Name, Address, Phone). La cohérence veut dire que le même NAP exact apparaît sur chaque annuaire où votre entreprise est listée. Même les petites différences nuisent :

- "Café du Soleil" vs "Café du Soleil Inc." vs "Cafe du Soleil"
- "123 rue Main" vs "123 rue Main, Bureau 200" vs "123 main"
- "(514) 555-0100" vs "514.555.0100" vs "5145550100"

Chaque variante dit aux moteurs IA et à Google que vous pourriez être une entreprise différente, divisant le signal de confiance entre ce qu'ils pensent être des doublons.

## Pourquoi ça compte plus en 2026

Deux raisons :

1. **Les moteurs IA désambiguïsent les entreprises par NAP.** Quand Perplexity ou ChatGPT décide de citer "Café du Soleil" en réponse à "meilleur café au Québec", il recoupe la marque à travers Yelp, OpenTable, Wikidata et d'autres. Si ces sources se contredisent, le moteur signale la marque comme à faible confiance et soit la cite moins, soit cite un concurrent à sa place.
2. **L'algorithme local de Google pénalise l'incohérence.** La documentation interne de Google révélée par fuite en 2024 a confirmé que la variance NAP compte négativement dans le modèle de classement local.

## Comment nous auditons

Notre processus est opérateur-piloté (pas de scraper qui casse à chaque fois qu'un annuaire redessine). Pour chaque emplacement, nous :

1. **Verrouillons un NAP canonique.** Tiré de votre Google Business Profile, confirmé avec vous, sauvegardé comme source de vérité.
2. **Visitons chaque annuaire.** Ouvrir la fiche, copier ce qui est montré.
3. **Comparons au canonique.** Notre outil signale tout champ qui ne concorde pas.
4. **Corrigeons sur place.** Pour chaque annuaire signalé, nous retournons à l'annuaire et mettons la fiche à jour pour qu'elle concorde avec le canonique.

## Cadence

Nous faisons un audit complet par emplacement chaque trimestre (ou mensuellement pour les paliers Growth et Agency). Quand vous appelez pour nous dire "on vient de changer de numéro", nous faisons un audit immédiat et corrigeons tous les annuaires dans la semaine de travail.

## Où vous voyez ça

Ouvrez **AiLys Automation, vérificateur de cohérence NAP** dans votre espace de travail. La page montre votre NAP canonique en haut, un formulaire pour journaliser une nouvelle observation d'annuaire, et l'historique de chaque observation jamais enregistrée avec un drapeau pass-ou-fail clair par annuaire.

## Modes de défaillance

- **Annuaire redessiné** : la visite échoue parce que l'annuaire a déplacé sa page d'édition de fiche. Nous suivons ces cas et mettons à jour notre processus.
- **Fiche supprimée** : une citation précédemment vérifiée a disparu. Resoumission.
- **Champ incohérent en permanence** : certains annuaires tronquent les noms ou restreignent les formats d'adresse. Nous documentons ces cas comme "variance attendue" pour qu'ils arrêtent d'encombrer la vue diff.`,
      },
    },
  },
  {
    slug: "gbp-attributes",
    title: "How GBP attributes work and why they matter for AI search",
    excerpt:
      "GBP attributes (wheelchair accessible, outdoor seating, free Wi-Fi) feed directly into AI Overview answers and Google's filter UI. Here is how we manage them.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 3,
    body: `## What attributes are

Every Google Business Profile has a set of yes-or-no flags that describe what the business offers: "wheelchair accessible", "outdoor seating", "free Wi-Fi", "accepts reservations", and dozens more. The available list depends on your category. A restaurant gets food-related ones; a dentist gets accessibility and language ones.

These attributes are not just decoration. Two reasons they matter for AI search:

1. **Google AI Overviews and AI Mode read attributes directly** when generating answers like "wheelchair-accessible dentists near me" or "restaurants with outdoor seating in Plateau". Missing or wrong attributes = invisible in those answers.
2. **Google's filter UI** on Maps and Search uses attributes to narrow results. A user filtering on "outdoor seating" never sees you if the flag is off.

## Cadence

Attributes do not change often. We review them once per quarter as part of the GBP audit, plus on demand when you tell us something has changed (e.g. you just installed a wheelchair ramp). All tiers from Starter up include attribute review.

## What you see in the admin center

Open **AiLys Automation, GBP attributes manager** in your workspace. You pick a location, click Load, and see all the on-or-off attributes Google has for your category, grouped by section. Toggle the ones that apply. Click Save when done. Changes go live on Google within minutes.

The manager only shows on-or-off (BOOL) attributes. Multi-choice and free-text attributes (rare for SMB) you edit directly on Google's interface.

## What we recommend

- Turn on every attribute that is genuinely true. False positives risk customer complaints and Google may flag your profile.
- Be aggressive on accessibility. "Wheelchair accessible entrance", "wheelchair accessible parking", "wheelchair accessible restroom" are some of the most-filtered attributes by users with disabilities, and many businesses have these without realizing it.
- For service businesses, fill in identity attributes ("women-owned", "Black-owned", "LGBTQ-friendly") if they apply. They are part of Google's diversity surface and feed the AI engines.

## Audit log

Every change writes a tamper-evident audit record (which attribute was added or removed, when, by whom). Useful when Google's filter UI changes and you need to verify what your profile claimed at a given date.

## Failures and recovery

If Google rejects an update (rare), the audit log shows the reason. Most common cause: an attribute is no longer offered for your category because Google reorganized their schema. The manager will refuse to send it on the next save attempt.

If your Google authentication expires, every action returns a 401 with a "reconnect Google" prompt. Reconnecting in Settings, Organization clears it.`,
    i18n: {
      fr: {
        title: "Comment fonctionnent les attributs GBP et pourquoi ils comptent pour la recherche IA",
        excerpt:
          "Les attributs GBP (accès en fauteuil roulant, terrasse, Wi-Fi gratuit) alimentent directement les réponses des AI Overviews de Google et l'interface de filtres. Voici comment nous les gérons.",
        body: `## C'est quoi les attributs

Chaque profil Google Business Profile a un ensemble de drapeaux oui-ou-non qui décrivent ce que l'entreprise offre : "accessible en fauteuil roulant", "terrasse", "Wi-Fi gratuit", "accepte les réservations", et des dizaines d'autres. La liste disponible dépend de votre catégorie. Un restaurant en a sur la nourriture, un dentiste en a sur l'accessibilité et les langues.

Ces attributs ne sont pas que décoratifs. Deux raisons pour lesquelles ils comptent pour la recherche IA :

1. **Les AI Overviews de Google et le mode IA lisent les attributs directement** quand ils génèrent des réponses comme "dentistes accessibles en fauteuil roulant près de moi" ou "restaurants avec terrasse au Plateau". Attributs manquants ou erronés = invisible dans ces réponses.
2. **L'interface de filtres de Google** sur Maps et Search utilise les attributs pour cibler les résultats. Un utilisateur qui filtre sur "terrasse" ne vous voit jamais si le drapeau est désactivé.

## Cadence

Les attributs ne changent pas souvent. Nous les révisons une fois par trimestre dans le cadre de l'audit GBP, plus sur demande quand vous nous dites que quelque chose a changé (ex: vous venez d'installer une rampe d'accès). Tous les paliers à partir de Starter incluent la révision des attributs.

## Ce que vous voyez dans le centre d'administration

Ouvrez **AiLys Automation, gestionnaire d'attributs GBP** dans votre espace de travail. Vous choisissez un emplacement, cliquez sur Charger, et vous voyez tous les attributs oui-ou-non que Google a pour votre catégorie, groupés par section. Activez ceux qui s'appliquent. Cliquez Enregistrer quand vous avez fini. Les changements sont en ligne sur Google en quelques minutes.

Le gestionnaire montre seulement les attributs oui-ou-non (BOOL). Les attributs à choix multiples et texte libre (rares pour PME) se modifient directement sur l'interface de Google.

## Ce que nous recommandons

- Activez chaque attribut véritablement vrai. Les faux positifs risquent les plaintes de clients et Google peut signaler votre profil.
- Soyez agressif sur l'accessibilité. "Entrée accessible en fauteuil roulant", "stationnement accessible en fauteuil roulant", "toilettes accessibles en fauteuil roulant" sont parmi les attributs les plus filtrés par les utilisateurs en situation de handicap, et beaucoup d'entreprises les ont sans le réaliser.
- Pour les services professionnels, remplissez les attributs d'identité ("entreprise dirigée par des femmes", "entreprise dirigée par des Noirs", "LGBTQ-friendly") s'ils s'appliquent. Ils font partie de la surface diversité de Google et alimentent les moteurs IA.

## Journal d'audit

Chaque changement écrit un enregistrement d'audit infalsifiable (quel attribut a été ajouté ou retiré, quand, par qui). Utile quand l'interface de filtres de Google change et vous devez vérifier ce que votre profil déclarait à une date donnée.

## Échecs et récupération

Si Google rejette une mise à jour (rare), le journal d'audit montre la raison. Cause la plus fréquente : un attribut n'est plus offert pour votre catégorie parce que Google a réorganisé son schéma. Le gestionnaire refusera de l'envoyer à la prochaine tentative d'enregistrement.

Si votre authentification Google expire, chaque action renvoie un 401 avec une invite "reconnecter Google". La reconnexion dans Paramètres, Organisation règle ce cas.`,
      },
    },
  },
  {
    slug: "gbp-qa-monitoring",
    title: "How GBP Q&A monitoring and auto-draft replies work",
    excerpt:
      "We watch for new customer questions on your Google Business Profile, draft a reply, and post it after your approval. Here is what happens at each step.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 4,
    body: `## What this is

Google Business Profile lets customers ask questions on your listing. If those questions go unanswered for days or weeks, two bad things happen: customers lose trust in your responsiveness, and other customers post their own (often wrong) answers. Our Q&A monitor pulls every unanswered question to a queue, our AiLys engine drafts a polite reply, and we post the final version to Google after your approval.

This service is included in Core, Growth, and Agency tiers. Starter clients get the monitoring layer (you can see queued questions) but not the AI drafts.

## Cadence

We pull questions on three triggers:

1. **Daily**: an automatic scan at the same time every morning, in your time zone
2. **On demand**: you click the Pull button in the admin center
3. **On reply**: when a question is answered (by us or anyone else), we update the status so the queue stays clean

## How a single question moves through the queue

Each question has four possible states:

- **Draft**: question pulled from Google. AI reply not generated yet (Starter) or auto-generated (Core and above)
- **Approved**: you reviewed the draft and clicked Approve. Not yet posted to Google
- **Posted**: the reply is live on your Google Business Profile
- **Rejected**: you decided not to reply (off-topic, spam, hostile)

You can edit the draft inline before approving. You can also click "Approve and post" in one step if the draft looks good as-is.

## What the draft looks like

Drafts are short (1 to 3 sentences, under 200 characters when possible), in first person plural ("we"), and stay strictly factual. If our engine is unsure of a specific (price, hours, policy), the draft says so politely and points the customer to call or visit. We do not invent specifics.

The draft is grounded on your business profile data: business name, category, address, phone, and website. If you keep these accurate in your AiLys Automation settings, the drafts get better.

## Where you see and control this

Open **AiLys Automation, GBP Q&A manager** in your workspace. Four tabs:

- **Drafts**: questions waiting for a draft or approval
- **Approved**: drafts you approved but have not posted yet
- **Posted**: posted answers, with timestamp and the exact text we sent to Google
- **Rejected**: questions you declined to answer

Every action writes a tamper-evident audit record (who clicked Approve, who edited, what was posted, when).

## Rate limits

Per workspace per hour: 30 question pulls, 50 AI drafts, 30 posts to Google. These caps protect your Google account from automation flags and let you review queued items before they pile up.

## Failures and recovery

If Google rejects a posted reply (rare, usually only if the text triggers their spam filter), the audit log shows the reason and the draft returns to status Approved. Edit and try again.

If your Google authentication expires, every action returns a 401 with a "reconnect Google" prompt. Reconnecting in Settings, Organization clears it.`,
    i18n: {
      fr: {
        title: "Comment fonctionne la surveillance Q&R GBP avec brouillons automatiques",
        excerpt:
          "Nous surveillons les nouvelles questions de clients sur votre profil Google Business, rédigeons un brouillon de réponse, et publions après votre approbation. Voici ce qui se passe à chaque étape.",
        body: `## De quoi s'agit-il

Google Business Profile permet aux clients de poser des questions sur votre fiche. Si ces questions restent sans réponse pendant des jours ou des semaines, deux choses fâcheuses arrivent : les clients perdent confiance en votre réactivité, et d'autres clients publient leurs propres réponses (souvent erronées). Notre surveillance Q&R récupère chaque question sans réponse dans une file, notre moteur AiLys rédige une réponse polie, et nous publions la version finale sur Google après votre approbation.

Ce service est inclus aux paliers Core, Growth et Agency. Les clients Starter obtiennent la couche de surveillance (vous voyez les questions en file) mais pas les brouillons IA.

## Cadence

Nous récupérons les questions sur trois déclencheurs :

1. **Quotidien** : un scan automatique à la même heure chaque matin, dans votre fuseau horaire
2. **Sur demande** : vous cliquez sur le bouton Récupérer dans le centre d'administration
3. **Sur réponse** : quand une question reçoit une réponse (par nous ou par quelqu'un d'autre), nous mettons le statut à jour pour garder la file propre

## Comment une question circule dans la file

Chaque question a quatre états possibles :

- **Brouillon** : question récupérée de Google. Réponse IA pas encore générée (Starter) ou générée automatiquement (Core et plus)
- **Approuvé** : vous avez revu le brouillon et cliqué sur Approuver. Pas encore publié sur Google
- **Publié** : la réponse est en ligne sur votre profil Google Business
- **Rejeté** : vous avez décidé de ne pas répondre (hors sujet, pourriel, hostile)

Vous pouvez modifier le brouillon en ligne avant l'approbation. Vous pouvez aussi cliquer "Approuver et publier" en une étape si le brouillon vous convient tel quel.

## À quoi ressemble le brouillon

Les brouillons sont courts (1 à 3 phrases, moins de 200 caractères quand possible), à la première personne du pluriel ("nous"), et restent strictement factuels. Si notre moteur n'est pas certain d'un détail spécifique (prix, horaires, politique), le brouillon le dit poliment et invite le client à appeler ou à passer. Nous n'inventons pas de détails.

Le brouillon s'appuie sur vos données de profil d'entreprise : nom, catégorie, adresse, téléphone, site web. Si vous gardez ces informations exactes dans vos paramètres AiLys Automation, les brouillons s'améliorent.

## Où vous voyez et contrôlez ceci

Ouvrez **AiLys Automation, gestionnaire Q&R GBP** dans votre espace de travail. Quatre onglets :

- **Brouillons** : questions en attente de brouillon ou d'approbation
- **Approuvés** : brouillons approuvés pas encore publiés
- **Publiés** : réponses publiées, avec horodatage et le texte exact envoyé à Google
- **Rejetés** : questions auxquelles vous avez choisi de ne pas répondre

Chaque action écrit un enregistrement d'audit infalsifiable (qui a cliqué sur Approuver, qui a modifié, ce qui a été publié, quand).

## Limites de débit

Par espace de travail par heure : 30 récupérations de questions, 50 brouillons IA, 30 publications sur Google. Ces plafonds protègent votre compte Google des signaux d'automatisation et vous permettent de revoir les éléments en file avant qu'ils s'accumulent.

## Échecs et récupération

Si Google rejette une réponse publiée (rare, généralement seulement si le texte déclenche leur filtre anti-pourriel), le journal d'audit montre la raison et le brouillon retourne au statut Approuvé. Modifiez et réessayez.

Si votre authentification Google expire, chaque action renvoie un 401 avec une invite "reconnecter Google". La reconnexion dans Paramètres, Organisation règle ce cas.`,
      },
    },
  },
  {
    slug: "gbp-photo-uploads",
    title: "How GBP photo uploads work",
    excerpt:
      "Photo cadence per tier, supported categories, what happens after we upload, and how to monitor activity.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 3,
    body: `## What this is

Every Agency client gets 4 to 6 fresh photos uploaded to their Google Business Profile each month. Visual freshness is one of the strongest 2026 GBP ranking signals, and Google now down-ranks profiles with no photo activity in 30 days.

## Cadence by tier

- **Starter**: 0 photo uploads (1 GBP post per month covers the freshness signal)
- **Core**: 0 photo uploads (4 GBP posts per month)
- **Growth**: optional add-on
- **Agency**: 4 to 6 photo uploads per month, included

## What we upload

We pick from these GBP-recognized categories based on the business type:

- Cover, Profile, Logo (brand identity)
- Exterior, Interior (premises)
- Product, Food and drink, Menu (industry-specific)
- At work, Common area, Rooms, Teams (operational)
- Additional (general)

Photos come from one of three sources, in priority order:
1. New photos shared by the operator since the last upload window
2. Photos pulled from the operator's social posts (with permission)
3. Photos generated by our visual content engine, stylistically matched to the brand

## How it works

1. Our AiLys engine drafts the upload schedule.
2. The operator approves through the admin center.
3. The upload runs through our integration to Google Business Profile.
4. Each upload writes a tamper-evident audit record (workspace, location, photo category, timestamp).

## What you see in the admin center

Open **Settings, Operations, GBP photo manager** in your AiLys Automation workspace. You can:

- Trigger an ad-hoc upload by URL
- Watch the last 50 uploads (success and failures) for any of your locations
- See category, timestamp, and reason if Google rejected one

## Rate limits and safety

Each workspace is capped at 20 photo uploads per hour. This protects your account from automation flags on Google's side, and it gives the operator a chance to review queued items.

## Failures and recovery

If Google rejects an upload, the audit record explains why (most commonly: image too small, image fetched from a non-public URL, or Google authentication expired). Reconnecting the Google account in Settings, Organization clears the most common failure mode.`,
    i18n: {
      fr: {
        title: "Comment fonctionnent les téléversements de photos GBP",
        excerpt:
          "Cadence par forfait, catégories prises en charge, ce qui se passe après le téléversement, et comment suivre l'activité.",
        body: `## De quoi s'agit-il

Chaque client Agency reçoit 4 à 6 photos fraîches téléversées sur son profil Google Business Profile chaque mois. La fraîcheur visuelle est un des signaux de classement GBP les plus forts pour 2026, et Google rétrograde maintenant les profils sans activité photo depuis 30 jours.

## Cadence par forfait

- **Starter**: 0 téléversement de photo (1 publication GBP par mois couvre le signal de fraîcheur)
- **Core**: 0 téléversement de photo (4 publications GBP par mois)
- **Growth**: option ajoutable
- **Agency**: 4 à 6 téléversements de photos par mois, inclus

## Ce que nous téléversons

Nous choisissons parmi ces catégories reconnues par GBP selon le type d'entreprise :

- Cover, Profile, Logo (identité de marque)
- Exterior, Interior (locaux)
- Product, Food and drink, Menu (selon le secteur)
- At work, Common area, Rooms, Teams (opérationnel)
- Additional (général)

Les photos proviennent d'une de ces trois sources, par ordre de priorité :
1. Nouvelles photos partagées par l'opérateur depuis la dernière fenêtre de téléversement
2. Photos tirées des publications sociales de l'opérateur (avec permission)
3. Photos produites par notre moteur de contenu visuel, harmonisées au style de la marque

## Comment ça fonctionne

1. Notre moteur AiLys prépare le calendrier de téléversement.
2. L'opérateur approuve via le centre d'administration.
3. Le téléversement passe par notre intégration vers Google Business Profile.
4. Chaque téléversement écrit un enregistrement d'audit infalsifiable (espace de travail, emplacement, catégorie de photo, horodatage).

## Ce que vous voyez dans le centre d'administration

Ouvrez **Paramètres, Opérations, Gestionnaire de photos GBP** dans votre espace AiLys Automation. Vous pouvez :

- Lancer un téléversement ponctuel par URL
- Voir les 50 derniers téléversements (succès et échecs) pour vos emplacements
- Voir la catégorie, l'horodatage, et la raison si Google a rejeté un téléversement

## Limites de débit et sécurité

Chaque espace de travail est plafonné à 20 téléversements de photos par heure. Ceci protège votre compte des signaux d'automatisation côté Google, et donne à l'opérateur la chance de revoir les éléments en file.

## Échecs et récupération

Si Google rejette un téléversement, l'enregistrement d'audit explique pourquoi (les causes les plus communes : image trop petite, image tirée d'une URL non publique, ou authentification Google expirée). Reconnecter le compte Google dans Paramètres, Organisation règle la cause la plus fréquente.`,
      },
    },
  },
  {
    slug: "what-is-ailys-agency",
    title: "What is AiLys Agency?",
    excerpt:
      "AiLys is a Quebec-based LLM Visibility & Optimization agency. Here is what we do, who we serve, and what makes us different.",
    category: "getting-started",
    updatedAt: "2026-04-01",
    readingTimeMin: 3,
    body: `## What we do

AiLys delivers AEO, GEO, and E-E-A-T services for local businesses. Translation: we get your business cited inside ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot answers.

## Who we serve

Local businesses across four primary verticals: restaurants, dentists, lawyers, and multi-location franchises. Plus growth-stage businesses that depend on local discovery (clinics, real estate, hotels, contractors).

We are anchored in Quebec but serve clients across Canada, the United States, and Latin America.

## What makes us different

Three things:

- **Pricing**: We start at $300/mo. Comparable agencies start at $2,000/mo. We can charge less because AiLys Automation SaaS automates the operational layer.
- **Languages**: 8 languages via partner network (EN, FR, ES, ZH, AR, RU, UK, SR). Most agencies do EN+FR.
- **Focus**: We do one thing, LLM visibility, deeply. Not a generalist agency.

## How to start

Run the free AI Visibility Audit. Results in 24 hours. No call required.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que AiLys Agency?",
        excerpt:
          "AiLys est une agence québécoise de visibilité et d'optimisation pour les LLM. Voici ce que nous faisons, qui nous servons et ce qui nous distingue.",
        body: `## Ce que nous faisons

AiLys offre des services AEO, GEO et E-E-A-T pour les entreprises locales. En clair : nous faisons en sorte que votre entreprise soit citée dans les réponses de ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews et Bing Copilot.

## Qui nous servons

Des entreprises locales dans quatre verticales principales : restaurants, dentistes, avocats et franchises multi-emplacements. Plus les entreprises en phase de croissance qui dépendent de la découverte locale (cliniques, immobilier, hôtels, entrepreneurs).

Nous sommes ancrés au Québec, mais nous servons des clients partout au Canada, aux États-Unis et en Amérique latine.

## Ce qui nous distingue

Trois choses :

- **Tarification** : nous commençons à 300 $/mois. Des agences comparables commencent à 2 000 $/mois. Nous pouvons demander moins parce que AiLys Automation SaaS automatise la couche opérationnelle.
- **Langues** : 8 langues via réseau de partenaires (EN, FR, ES, ZH, AR, RU, UK, SR). La plupart des agences font EN et FR.
- **Spécialisation** : nous faisons une chose, la visibilité LLM, en profondeur. Pas une agence généraliste.

## Comment commencer

Lancez l'AI Visibility Audit gratuit. Résultats en 24 heures. Aucun appel requis.`,
      },
      es: {
        title: "¿Qué es AiLys Agency?",
        excerpt:
          "AiLys es una agencia con base en Quebec dedicada a la visibilidad y optimización para LLM. Esto es lo que hacemos, a quién atendemos y qué nos hace diferentes.",
        body: `## Qué hacemos

AiLys entrega servicios AEO, GEO y E-E-A-T para negocios locales. Traducción: hacemos que su negocio aparezca citado dentro de las respuestas de ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews y Bing Copilot.

## A quién atendemos

Negocios locales en cuatro verticales principales: restaurantes, dentistas, abogados y franquicias multi-sucursal. Más empresas en etapa de crecimiento que dependen del descubrimiento local (clínicas, inmobiliarias, hoteles, contratistas).

Estamos anclados en Quebec, pero atendemos clientes en Canadá, Estados Unidos y América Latina.

## Qué nos hace diferentes

Tres cosas:

- **Precio**: arrancamos en $300/mes. Agencias comparables arrancan en $2,000/mes. Podemos cobrar menos porque AiLys Automation SaaS automatiza la capa operativa.
- **Idiomas**: 8 idiomas vía red de socios (EN, FR, ES, ZH, AR, RU, UK, SR). La mayoría de las agencias trabaja en EN y FR.
- **Foco**: hacemos una sola cosa, visibilidad en LLM, a profundidad. No somos una agencia generalista.

## Cómo empezar

Ejecute el AI Visibility Audit gratuito. Resultados en 24 horas. Sin llamada requerida.`,
      },
      zh: {
        title: "AiLys Agency 是什么?",
        excerpt:
          "AiLys 是一家总部位于魁北克的 LLM 可见度与优化代理。以下是我们做什么、服务谁,以及我们的差异化。",
        body: `## 我们做什么

AiLys 为本地企业提供 AEO、GEO 和 E-E-A-T 服务。换句话说: 让您的企业出现在 ChatGPT、Perplexity、Claude、Gemini、Google AI Overviews 和 Bing Copilot 的回答中被引用。

## 我们服务谁

四个主要垂直领域的本地企业: 餐厅、牙医、律师和多门店连锁。还包括依赖本地发现流量的成长期企业(诊所、房地产、酒店、承包商)。

我们扎根魁北克,但服务遍及加拿大、美国和拉丁美洲的客户。

## 我们的差异化在哪

三点:

- **价格**: 我们起步 $300/月。同类代理起步 $2,000/月。我们能更便宜,是因为 AiLys Automation SaaS 把运营层自动化了。
- **语言**: 通过合作伙伴网络支持 8 种语言(EN、FR、ES、ZH、AR、RU、UK、SR)。多数代理只做 EN 加 FR。
- **聚焦**: 我们只做一件事,即 LLM 可见度,且做得深。不做综合代理。

## 如何开始

运行免费的 AI Visibility Audit。24 小时内出结果。无需通话。`,
      },
      ru: {
        title: "Что такое AiLys Agency?",
        excerpt:
          "AiLys, агентство из Квебека по видимости и оптимизации в LLM. Вот чем мы занимаемся, кому помогаем и чем отличаемся.",
        body: `## Чем мы занимаемся

AiLys предоставляет услуги AEO, GEO и E-E-A-T для локального бизнеса. Если перевести на простой язык: мы делаем так, чтобы ваш бизнес упоминался в ответах ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews и Bing Copilot.

## Кому мы помогаем

Локальному бизнесу в четырёх основных направлениях: рестораны, стоматологии, юридические практики и сетевые франшизы. А также компаниям на стадии роста, которые зависят от локального трафика (клиники, недвижимость, отели, подрядчики).

Наша база в Квебеке, но мы работаем с клиентами по всей Канаде, в США и Латинской Америке.

## Чем мы отличаемся

Тремя вещами:

- **Цены**: мы стартуем от $300/мес. Аналогичные агентства начинают с $2,000/мес. Мы можем брать меньше, потому что AiLys Automation SaaS автоматизирует операционный слой.
- **Языки**: 8 языков через партнёрскую сеть (EN, FR, ES, ZH, AR, RU, UK, SR). Большинство агентств работает только на EN и FR.
- **Фокус**: мы делаем одно дело, видимость в LLM, и делаем его глубоко. Мы не агентство широкого профиля.

## Как начать

Закажите бесплатный AI Visibility Audit. Результаты в течение 24 часов. Звонок не нужен.`,
      },
      ar: {
        title: "ما هي AiLys Agency؟",
        excerpt:
          "AiLys وكالة مقرّها كيبيك متخصصة في تحسين الظهور داخل نماذج LLM. إليك ما نقدّمه ومن نخدم وما يميّزنا.",
        body: `## ما الذي نقدّمه

تقدّم AiLys خدمات AEO وGEO وE-E-A-T للأعمال المحلية. بعبارة أوضح، نجعل اسم عملك يظهر داخل إجابات ChatGPT وPerplexity وClaude وGemini وGoogle AI Overviews وBing Copilot.

## من نخدم

أعمال محلية في أربع فئات رئيسية: المطاعم، عيادات الأسنان، المكاتب القانونية، والامتيازات التجارية متعددة الفروع. ونعمل أيضاً مع الشركات في طور النمو التي تعتمد على الاكتشاف المحلي مثل العيادات والعقارات والفنادق ومقاولي الخدمات.

مقرّنا الأساسي في كيبيك، لكننا نخدم عملاء في كل أنحاء كندا والولايات المتحدة وأمريكا اللاتينية.

## ما الذي يميّزنا

ثلاثة عناصر:

- **التسعير**: نبدأ من $300 شهرياً. تبدأ الوكالات المماثلة من $2,000 شهرياً. نستطيع تقديم سعر أقل لأن AiLys Automation SaaS يؤتمت الطبقة التشغيلية.
- **اللغات**: ثماني لغات عبر شبكة شركاء (EN, FR, ES, ZH, AR, RU, UK, SR). معظم الوكالات تعمل بالإنجليزية والفرنسية فقط.
- **التركيز**: نقوم بمهمة واحدة وهي الظهور داخل LLM، ونتعمّق فيها. لسنا وكالة عامة.

## كيفية البدء

اطلب AI Visibility Audit المجاني. النتائج خلال 24 ساعة. لا يلزم إجراء أي مكالمة.`,
      },
    },
  },
  {
    slug: "first-30-days",
    title: "What happens in your first 30 days",
    excerpt:
      "Day-by-day expectation of the first month, from contract signature to your first monthly report.",
    category: "getting-started",
    updatedAt: "2026-04-05",
    readingTimeMin: 4,
    body: `## Days 1 to 3: Onboarding

- Welcome email with payment portal and onboarding form
- 60-minute kickoff call with your AiLys lead
- Access granted to your client portal
- Service agreement countersigned

## Days 4 to 7: Audit & strategy

- Deep technical audit of your site, GBP, and citation footprint
- Strategy doc delivered (Google Doc, you can comment)
- 30-minute review call to lock priorities

## Days 8 to 21: Execution starts

- Schema markup deployed (FAQ, Review, LocalBusiness, Service)
- GBP optimization (categories, attributes, Q&A, photos)
- First batch of citation submissions
- Content calendar approved

## Days 22 to 30: First report

- Monthly performance report delivered (PDF + Google Doc)
- Citation tracking baseline established
- 30-minute strategy call to review wins and adjust

## What you should expect

Schema and GBP improvements show up in Google within 30 to 60 days. LLM citation lift typically takes 90 to 120 days. We send a monthly report regardless of magnitude. No vanity metrics.`,
    i18n: {
      fr: {
        title: "Ce qui se passe pendant vos 30 premiers jours",
        excerpt:
          "Attentes jour après jour du premier mois, de la signature du contrat jusqu'à votre premier rapport mensuel.",
        body: `## Jours 1 à 3 : intégration

- Courriel de bienvenue avec portail de paiement et formulaire d'intégration
- Appel de lancement de 60 minutes avec votre responsable AiLys
- Accès accordé à votre portail client
- Entente de service contresignée

## Jours 4 à 7 : audit et stratégie

- Audit technique approfondi de votre site, de votre GBP et de votre empreinte de citations
- Document de stratégie livré (Google Doc, vous pouvez commenter)
- Appel de revue de 30 minutes pour verrouiller les priorités

## Jours 8 à 21 : début de l'exécution

- Balisage schema déployé (FAQ, Review, LocalBusiness, Service)
- Optimisation du GBP (catégories, attributs, Q et R, photos)
- Premier lot de soumissions de citations
- Calendrier de contenu approuvé

## Jours 22 à 30 : premier rapport

- Rapport mensuel de performance livré (PDF et Google Doc)
- Référence de suivi des citations établie
- Appel de stratégie de 30 minutes pour passer en revue les gains et ajuster

## À quoi vous attendre

Les améliorations de schema et de GBP apparaissent dans Google en 30 à 60 jours. La hausse des citations LLM prend généralement 90 à 120 jours. Nous envoyons un rapport mensuel peu importe l'ampleur. Pas de métriques de vanité.`,
      },
      es: {
        title: "Qué ocurre en sus primeros 30 días",
        excerpt:
          "Expectativa día a día del primer mes, desde la firma del contrato hasta su primer reporte mensual.",
        body: `## Días 1 a 3: onboarding

- Correo de bienvenida con portal de pago y formulario de onboarding
- Llamada de arranque de 60 minutos con su líder en AiLys
- Acceso otorgado a su portal de cliente
- Acuerdo de servicio firmado por ambas partes

## Días 4 a 7: auditoría y estrategia

- Auditoría técnica profunda de su sitio, GBP y huella de citas
- Documento de estrategia entregado (Google Doc, puede comentar)
- Llamada de revisión de 30 minutos para fijar prioridades

## Días 8 a 21: arranca la ejecución

- Schema desplegado (FAQ, Review, LocalBusiness, Service)
- Optimización de GBP (categorías, atributos, P y R, fotos)
- Primer lote de envíos de citas
- Calendario de contenido aprobado

## Días 22 a 30: primer reporte

- Reporte mensual de desempeño entregado (PDF y Google Doc)
- Línea base de seguimiento de citas establecida
- Llamada de estrategia de 30 minutos para revisar logros y ajustar

## Qué esperar

Las mejoras de schema y GBP se reflejan en Google en 30 a 60 días. El alza de citas en LLM suele tomar entre 90 y 120 días. Enviamos reporte mensual sin importar la magnitud. Sin métricas de vanidad.`,
      },
      zh: {
        title: "您前 30 天会经历什么",
        excerpt:
          "首月日程预期: 从合同签署到您拿到首份月报。",
        body: `## 第 1 至 3 天: 入驻

- 欢迎邮件,附支付门户与入驻表单
- 与您的 AiLys 负责人进行 60 分钟启动通话
- 开通客户门户访问
- 双方签署服务协议

## 第 4 至 7 天: 审计与策略

- 对您的站点、GBP 和引用足迹进行深度技术审计
- 交付策略文档(Google Doc,您可以批注)
- 30 分钟评审通话,锁定优先事项

## 第 8 至 21 天: 执行启动

- 上线 schema 标记(FAQ、Review、LocalBusiness、Service)
- GBP 优化(类别、属性、Q 与 A、图片)
- 首批引用提交
- 内容日历获批

## 第 22 至 30 天: 首份报告

- 交付月度绩效报告(PDF 与 Google Doc)
- 建立引用追踪基线
- 30 分钟策略通话,回顾成果并做调整

## 您应有的预期

Schema 与 GBP 的改进会在 30 到 60 天内反映到 Google 中。LLM 引用提升通常需要 90 到 120 天。无论数据规模大小,我们都会按月发送报告。不做虚荣指标。`,
      },
      ru: {
        title: "Что происходит в первые 30 дней",
        excerpt:
          "Что ожидать день за днём в первый месяц, от подписания договора до первого ежемесячного отчёта.",
        body: `## Дни 1–3: онбординг

- Приветственное письмо со ссылкой на платёжный портал и форму онбординга
- Стартовый звонок на 60 минут с вашим менеджером AiLys
- Открытие доступа к клиентскому порталу
- Подписание договора об оказании услуг с обеих сторон

## Дни 4–7: аудит и стратегия

- Глубокий технический аудит вашего сайта, GBP и текущих упоминаний
- Доставка стратегического документа (Google Doc, можно оставлять комментарии)
- Звонок-обзор на 30 минут для фиксации приоритетов

## Дни 8–21: запуск работ

- Развёртывание разметки schema (FAQ, Review, LocalBusiness, Service)
- Оптимизация GBP (категории, атрибуты, вопросы и ответы, фото)
- Первая партия отправок в каталоги и базы упоминаний
- Утверждение контент-календаря

## Дни 22–30: первый отчёт

- Доставка ежемесячного отчёта об эффективности (PDF и Google Doc)
- Установление базовой линии для отслеживания упоминаний
- Стратегический звонок на 30 минут для разбора результатов и корректировок

## Чего ожидать

Улучшения по schema и GBP отражаются в Google в течение 30–60 дней. Рост упоминаний в LLM обычно занимает 90–120 дней. Мы присылаем отчёт каждый месяц независимо от масштаба изменений. Без показных метрик.`,
      },
      ar: {
        title: "ما يحدث خلال أول 30 يوماً",
        excerpt:
          "توقعات يوماً بيوم خلال الشهر الأول، من توقيع العقد إلى تقريرك الشهري الأول.",
        body: `## الأيام 1 إلى 3: الإعداد

- رسالة ترحيب مع بوابة الدفع ونموذج الإعداد
- مكالمة انطلاق مدتها 60 دقيقة مع المسؤول عنك في AiLys
- منح الوصول إلى بوابة العميل الخاصة بك
- توقيع اتفاقية الخدمة من الطرفين

## الأيام 4 إلى 7: التدقيق والاستراتيجية

- تدقيق فني عميق لموقعك، وGBP، وبصمتك من الاستشهادات
- تسليم وثيقة الاستراتيجية (Google Doc، يمكنك التعليق عليها)
- مكالمة مراجعة مدتها 30 دقيقة لتثبيت الأولويات

## الأيام 8 إلى 21: انطلاق التنفيذ

- نشر ترميز Schema (FAQ، Review، LocalBusiness، Service)
- تحسين GBP (الفئات، السمات، الأسئلة والأجوبة، الصور)
- الدفعة الأولى من إرسالات الاستشهاد
- اعتماد تقويم المحتوى

## الأيام 22 إلى 30: التقرير الأول

- تسليم تقرير الأداء الشهري (PDF وGoogle Doc)
- ضبط خط الأساس لتتبع الاستشهادات
- مكالمة استراتيجية مدتها 30 دقيقة لمراجعة النتائج وإجراء التعديلات

## ما ينبغي توقعه

تظهر تحسينات Schema وGBP داخل Google خلال 30 إلى 60 يوماً. أما الارتفاع في الاستشهادات داخل LLM فيستغرق عادة من 90 إلى 120 يوماً. نرسل تقريراً شهرياً مهما كان حجم التغيير، دون أي مقاييس استعراضية.`,
      },
    },
  },
  {
    slug: "communication-cadence",
    title: "How we communicate with clients",
    excerpt:
      "Email, calls, Slack, monthly reports. Here is the rhythm and how to reach us between scheduled touchpoints.",
    category: "getting-started",
    updatedAt: "2026-04-10",
    readingTimeMin: 2,
    body: `## Scheduled touchpoints

Each tier includes a different cadence:

- **Starter**: Monthly 30-min call + monthly report
- **Core**: Bi-weekly 30-min call + monthly report
- **Growth**: Weekly 30-min call + monthly report + quarterly in-person review (Quebec, Toronto, Montreal)
- **Agency**: Same as Growth, plus AiLys Automation SaaS dashboard access

## Between calls

- **Email**: hello@ailysagency.ca, response within 12 business hours
- **Slack** (Core+): shared channel with your AiLys team
- **Emergency**: text the lead listed in your welcome email, response within 2 hours during business days

## Reports

Monthly reports land on the 5th of each month. They cover:

- Citation tracking across 6 AI engines
- AEO, GEO, E-E-A-T scores vs prior month
- GBP performance (impressions, calls, direction requests)
- Schema deployment status
- Next month's priorities

Real numbers, plain language, no fluff.`,
    i18n: {
      fr: {
        title: "Comment nous communiquons avec les clients",
        excerpt:
          "Courriel, appels, Slack, rapports mensuels. Voici le rythme et comment nous joindre entre les points de contact prévus.",
        body: `## Points de contact prévus

Chaque forfait inclut une cadence différente :

- **Starter** : appel mensuel de 30 min et rapport mensuel
- **Core** : appel bimensuel de 30 min et rapport mensuel
- **Growth** : appel hebdomadaire de 30 min, rapport mensuel et revue trimestrielle en personne (Québec, Toronto, Montréal)
- **Agency** : identique à Growth, plus accès au tableau de bord AiLys Automation SaaS

## Entre les appels

- **Courriel** : hello@ailysagency.ca, réponse en 12 heures ouvrables
- **Slack** (Core et plus) : canal partagé avec votre équipe AiLys
- **Urgence** : envoyez un texto au responsable indiqué dans votre courriel de bienvenue, réponse en 2 heures les jours ouvrables

## Rapports

Les rapports mensuels arrivent le 5 de chaque mois. Ils couvrent :

- Suivi des citations sur 6 moteurs IA
- Scores AEO, GEO et E-E-A-T comparés au mois précédent
- Performance GBP (impressions, appels, demandes d'itinéraire)
- État du déploiement schema
- Priorités du mois suivant

Vrais chiffres, langage clair, sans bourrage.`,
      },
      es: {
        title: "Cómo nos comunicamos con los clientes",
        excerpt:
          "Email, llamadas, Slack, reportes mensuales. Este es el ritmo y cómo contactarnos entre puntos de contacto programados.",
        body: `## Puntos de contacto programados

Cada plan incluye una cadencia distinta:

- **Starter**: llamada mensual de 30 min y reporte mensual
- **Core**: llamada quincenal de 30 min y reporte mensual
- **Growth**: llamada semanal de 30 min, reporte mensual y revisión trimestral en persona (Quebec, Toronto, Montreal)
- **Agency**: igual que Growth, más acceso al dashboard de AiLys Automation SaaS

## Entre llamadas

- **Email**: hello@ailysagency.ca, respuesta en 12 horas hábiles
- **Slack** (Core en adelante): canal compartido con su equipo AiLys
- **Emergencia**: envíe SMS al líder indicado en su correo de bienvenida, respuesta en 2 horas en días hábiles

## Reportes

Los reportes mensuales llegan el día 5 de cada mes. Cubren:

- Seguimiento de citas en 6 motores de IA
- Puntajes AEO, GEO y E-E-A-T contra el mes anterior
- Desempeño de GBP (impresiones, llamadas, solicitudes de ruta)
- Estado del despliegue de schema
- Prioridades del próximo mes

Números reales, lenguaje claro, sin relleno.`,
      },
      zh: {
        title: "我们如何与客户沟通",
        excerpt:
          "邮件、通话、Slack、月度报告。以下是节奏,以及在固定接触点之间如何联系我们。",
        body: `## 固定接触点

每个套餐节奏不同:

- **Starter**: 每月一次 30 分钟通话加月度报告
- **Core**: 每两周一次 30 分钟通话加月度报告
- **Growth**: 每周一次 30 分钟通话、月度报告,加每季度一次现场评审(魁北克、多伦多、蒙特利尔)
- **Agency**: 与 Growth 相同,另含 AiLys Automation SaaS 仪表盘访问权

## 通话之间

- **邮件**: hello@ailysagency.ca,12 个工作小时内回复
- **Slack**(Core 及以上): 与您的 AiLys 团队共享频道
- **紧急情况**: 短信联系欢迎邮件中列出的负责人,工作日 2 小时内回复

## 报告

月度报告每月 5 日送达。涵盖:

- 在 6 个 AI 引擎上的引用追踪
- AEO、GEO、E-E-A-T 评分与上月对比
- GBP 表现(展示、来电、路线请求)
- Schema 部署状态
- 次月优先事项

真实数字,直白语言,不掺水。`,
      },
      ru: {
        title: "Как мы общаемся с клиентами",
        excerpt:
          "Email, звонки, Slack, ежемесячные отчёты. Вот наш ритм и способы связаться с нами между запланированными точками контакта.",
        body: `## Запланированные точки контакта

В каждом тарифе своя частота:

- **Starter**: ежемесячный звонок на 30 минут и ежемесячный отчёт
- **Core**: звонок раз в две недели на 30 минут и ежемесячный отчёт
- **Growth**: еженедельный звонок на 30 минут, ежемесячный отчёт и ежеквартальная очная встреча (Квебек, Торонто, Монреаль)
- **Agency**: то же, что и Growth, плюс доступ к панели AiLys Automation SaaS

## Между звонками

- **Email**: hello@ailysagency.ca, ответ в течение 12 рабочих часов
- **Slack** (от Core и выше): общий канал с вашей командой AiLys
- **Срочные вопросы**: SMS ответственному менеджеру, указанному в приветственном письме, ответ в течение 2 часов в рабочие дни

## Отчёты

Ежемесячные отчёты приходят 5-го числа каждого месяца. Они охватывают:

- Отслеживание упоминаний в 6 движках ИИ
- Оценки AEO, GEO и E-E-A-T в сравнении с прошлым месяцем
- Эффективность GBP (показы, звонки, запросы маршрутов)
- Статус развёртывания schema
- Приоритеты на следующий месяц

Реальные цифры, понятный язык, без воды.`,
      },
      ar: {
        title: "كيف نتواصل مع العملاء",
        excerpt:
          "البريد الإلكتروني، المكالمات، Slack، التقارير الشهرية. إليك إيقاع التواصل وطرق الوصول إلينا بين نقاط التواصل المجدولة.",
        body: `## نقاط التواصل المجدولة

كل خطة تشمل وتيرة مختلفة:

- **Starter**: مكالمة شهرية مدتها 30 دقيقة وتقرير شهري
- **Core**: مكالمة كل أسبوعين مدتها 30 دقيقة وتقرير شهري
- **Growth**: مكالمة أسبوعية مدتها 30 دقيقة، تقرير شهري، ومراجعة فصلية حضورية (كيبيك، تورونتو، مونتريال)
- **Agency**: نفس Growth إضافة إلى الوصول إلى لوحة تحكم AiLys Automation SaaS

## بين المكالمات

- **البريد الإلكتروني**: hello@ailysagency.ca، الرد خلال 12 ساعة عمل
- **Slack** (من Core فأعلى): قناة مشتركة مع فريق AiLys الخاص بك
- **الحالات الطارئة**: أرسل رسالة نصية إلى المسؤول المذكور في رسالة الترحيب، الرد خلال ساعتين في أيام العمل

## التقارير

تصل التقارير الشهرية في اليوم الخامس من كل شهر. وتغطي:

- تتبّع الاستشهادات عبر 6 محركات ذكاء اصطناعي
- درجات AEO وGEO وE-E-A-T مقارنة بالشهر السابق
- أداء GBP (مرات الظهور، المكالمات، طلبات الاتجاهات)
- حالة نشر Schema
- أولويات الشهر القادم

أرقام حقيقية، لغة واضحة، دون حشو.`,
      },
    },
  },

  // ─── AEO / GEO / E-E-A-T ───────────────────────────────────
  {
    slug: "what-is-aeo",
    title: "What is AEO (Answer Engine Optimization)?",
    excerpt:
      "Plain English: AEO is the work of structuring your site so AI engines can pull a clean answer from your content.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-12",
    readingTimeMin: 3,
    body: `## The 30-second version

AEO stands for Answer Engine Optimization. When someone asks ChatGPT, Bing Copilot, or Google AIO a question, those engines try to extract a direct answer from a website. AEO is the work of making your site the source they extract from.

## The four core moves

1. **FAQ schema** on every service page. Each common question gets structured answer markup.
2. **LocalBusiness schema** with full NAP, hours, payment methods, attributes.
3. **Review schema** with aggregateRating + at least 3 individual reviews marked up.
4. **Service schema**: one entity per service you offer, with relations back to LocalBusiness.

## Why it matters

AI engines are increasingly answering questions without sending a click to any source. By 2027, Google AI Overviews are projected to answer 30%+ of all queries. The businesses cited inside those answers will keep growing. The ones not cited will quietly fade.

## What we do

Schema deployment is part of the Core tier. Our team writes the markup, deploys it to your site, and monitors validation. Most clients ship in week 2 of onboarding.

Run the audit to see your current AEO score.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que l'AEO (Answer Engine Optimization)?",
        excerpt:
          "En français clair : l'AEO est le travail consistant à structurer votre site pour que les moteurs IA puissent en tirer une réponse propre.",
        body: `## La version en 30 secondes

AEO signifie Answer Engine Optimization. Quand quelqu'un pose une question à ChatGPT, Bing Copilot ou Google AIO, ces moteurs tentent d'extraire une réponse directe depuis un site Web. L'AEO consiste à faire de votre site la source qu'ils extraient.

## Les quatre mouvements de base

1. **FAQ schema** sur chaque page de service. Chaque question courante reçoit un balisage de réponse structuré.
2. **LocalBusiness schema** avec NAP complet, heures, modes de paiement, attributs.
3. **Review schema** avec aggregateRating et au moins 3 avis individuels balisés.
4. **Service schema** : une entité par service offert, avec relations vers LocalBusiness.

## Pourquoi cela compte

Les moteurs IA répondent de plus en plus aux questions sans envoyer un clic à aucune source. D'ici 2027, on projette que les Google AI Overviews répondront à plus de 30 % de toutes les requêtes. Les entreprises citées dans ces réponses continueront de grandir. Celles qui ne le sont pas s'effaceront en silence.

## Ce que nous faisons

Le déploiement du schema fait partie du forfait Core. Notre équipe rédige le balisage, le déploie sur votre site et surveille la validation. La plupart des clients livrent en semaine 2 de l'intégration.

Lancez l'audit pour voir votre score AEO actuel.`,
      },
      es: {
        title: "¿Qué es el AEO (Answer Engine Optimization)?",
        excerpt:
          "En español sencillo: el AEO es el trabajo de estructurar su sitio para que los motores de IA extraigan una respuesta limpia desde su contenido.",
        body: `## La versión en 30 segundos

AEO significa Answer Engine Optimization. Cuando alguien hace una pregunta a ChatGPT, Bing Copilot o Google AIO, esos motores intentan extraer una respuesta directa desde un sitio web. El AEO consiste en lograr que su sitio sea la fuente desde la que extraen.

## Los cuatro movimientos base

1. **FAQ schema** en cada página de servicio. Cada pregunta común recibe marcado de respuesta estructurado.
2. **LocalBusiness schema** con NAP completo, horarios, métodos de pago, atributos.
3. **Review schema** con aggregateRating y al menos 3 reseñas individuales marcadas.
4. **Service schema**: una entidad por cada servicio ofrecido, con relaciones hacia LocalBusiness.

## Por qué importa

Los motores de IA cada vez responden más preguntas sin enviar clics a ninguna fuente. Para 2027, se proyecta que Google AI Overviews respondan más del 30 % de todas las consultas. Los negocios citados dentro de esas respuestas seguirán creciendo. Los no citados se irán apagando en silencio.

## Qué hacemos

El despliegue de schema forma parte del plan Core. Nuestro equipo redacta el marcado, lo despliega en su sitio y monitorea la validación. La mayoría de los clientes lo lanza en la semana 2 del onboarding.

Ejecute la auditoría para ver su puntaje AEO actual.`,
      },
      zh: {
        title: "什么是 AEO(Answer Engine Optimization)?",
        excerpt:
          "大白话: AEO 就是把您的网站结构化好,让 AI 引擎能从您的内容中提取出干净的答案。",
        body: `## 30 秒版本

AEO 即 Answer Engine Optimization(答案引擎优化)。当有人向 ChatGPT、Bing Copilot 或 Google AIO 提问时,这些引擎会尝试从某个网站中提取直接答案。AEO 就是让您的站点成为它们提取的源头。

## 四个核心动作

1. 在每个服务页面部署 **FAQ schema**。每个常见问题都获得结构化答案标记。
2. **LocalBusiness schema**,完整的 NAP、营业时间、支付方式、属性。
3. 带 aggregateRating 的 **Review schema**,以及至少 3 条单独标注的评论。
4. **Service schema**: 每项服务一个实体,并与 LocalBusiness 建立关系。

## 为什么重要

AI 引擎正在越来越多地无点击回答问题。预计到 2027 年,Google AI Overviews 将回答超过 30% 的全部查询。被这些答案引用的企业会持续增长。未被引用的则会无声地淡出。

## 我们做什么

Schema 部署属于 Core 套餐。我们的团队撰写标记、将其部署到您的站点,并监控验证。多数客户在入驻第 2 周即上线。

运行审计,查看您当前的 AEO 评分。`,
      },
      ru: {
        title: "Что такое AEO (Answer Engine Optimization)?",
        excerpt:
          "Простыми словами: AEO, это работа по структурированию вашего сайта так, чтобы движки ИИ могли вытянуть из него чистый ответ.",
        body: `## Версия за 30 секунд

AEO расшифровывается как Answer Engine Optimization. Когда кто-то задаёт вопрос ChatGPT, Bing Copilot или Google AIO, эти движки пытаются извлечь прямой ответ с какого-то сайта. AEO означает работу над тем, чтобы ваш сайт стал источником, из которого они извлекают ответ.

## Четыре базовых шага

1. **FAQ schema** на каждой странице услуг. Каждый частый вопрос получает структурированную разметку ответа.
2. **LocalBusiness schema** с полным NAP, часами работы, способами оплаты и атрибутами.
3. **Review schema** с aggregateRating плюс минимум 3 отдельно размеченных отзыва.
4. **Service schema**: одна сущность на каждую услугу, со связями обратно к LocalBusiness.

## Почему это важно

Движки ИИ всё чаще отвечают на вопросы, не отправляя клик ни одному источнику. По прогнозам, к 2027 году Google AI Overviews будут отвечать более чем на 30% всех запросов. Бизнесы, которых цитируют внутри этих ответов, продолжат расти. Те, кого не цитируют, тихо уйдут на второй план.

## Что делаем мы

Развёртывание schema входит в тариф Core. Наша команда пишет разметку, выкладывает её на ваш сайт и следит за валидацией. Большинство клиентов выкатывают её на 2-й неделе онбординга.

Запустите аудит, чтобы увидеть свою текущую оценку AEO.`,
      },
      ar: {
        title: "ما هو AEO (تحسين محركات الإجابة)؟",
        excerpt:
          "بعبارة بسيطة: AEO هو العمل على هيكلة موقعك بحيث يمكن لمحركات الذكاء الاصطناعي استخراج إجابة نظيفة من محتواك.",
        body: `## النسخة المختصرة في 30 ثانية

AEO اختصار لـ Answer Engine Optimization. عندما يطرح شخص سؤالاً على ChatGPT أو Bing Copilot أو Google AIO، تحاول هذه المحركات استخراج إجابة مباشرة من أحد المواقع. AEO هو العمل الذي يجعل موقعك المصدر الذي تستخرج منه الإجابة.

## الخطوات الأربع الأساسية

1. **FAQ schema** على كل صفحة خدمة. كل سؤال شائع يحصل على ترميز إجابة منظّم.
2. **LocalBusiness schema** مع NAP كامل وساعات العمل وطرق الدفع والسمات.
3. **Review schema** مع aggregateRating وما لا يقل عن 3 مراجعات فردية مرمَّزة.
4. **Service schema**: كيان واحد لكل خدمة تقدّمها، مع علاقات تربطه بـ LocalBusiness.

## لماذا يهم هذا

تجيب محركات الذكاء الاصطناعي على عدد متزايد من الأسئلة دون إرسال أي نقرة لأي مصدر. وتشير التوقعات إلى أن Google AI Overviews ستجيب على أكثر من 30% من جميع الاستفسارات بحلول 2027. الأعمال التي يُستشهد بها داخل هذه الإجابات ستواصل النمو. أما الأعمال غير المُستشهد بها فستتلاشى بهدوء.

## ما نقوم به

نشر Schema جزء من خطة Core. فريقنا يكتب الترميز، وينشره على موقعك، ويراقب التحقق منه. يطلق معظم العملاء النشر في الأسبوع الثاني من الإعداد.

اطلب التدقيق لمعرفة درجة AEO الحالية لديك.`,
      },
    },
  },
  {
    slug: "what-is-geo",
    title: "What is GEO (Generative Engine Optimization)?",
    excerpt:
      "Getting your brand cited inside generative AI responses, not just the answers themselves.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-12",
    readingTimeMin: 3,
    body: `## GEO is different from AEO

AEO is about being the answer. GEO is about being named inside the answer.

ChatGPT can give a great answer about your industry without naming a single business. GEO is the work of being one of the businesses it names.

## The signals that drive GEO

- **Wikipedia and Wikidata footprint**: the entity layer LLMs pull from
- **High-DA citation density**: Yelp, BBB, Crunchbase, industry directories
- **Authoritative third-party content**: news mentions, podcast guest spots, industry publications
- **Original data or research** that other sites cite back to you

## Why GEO is harder than AEO

AEO is mostly your own work on your own site. GEO depends on third-party validation. You cannot DIY it overnight.

## What we do

The Core tier includes 5 citation submissions per month, plus our standard Wikipedia/Wikidata workflow. The Growth tier adds dedicated PR outreach and original research production.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que le GEO (Generative Engine Optimization)?",
        excerpt:
          "Faire citer votre marque dans les réponses des IA génératives, pas seulement les réponses elles-mêmes.",
        body: `## Le GEO diffère de l'AEO

L'AEO consiste à être la réponse. Le GEO consiste à être nommé à l'intérieur de la réponse.

ChatGPT peut donner une excellente réponse sur votre secteur sans nommer une seule entreprise. Le GEO, c'est le travail d'être l'une des entreprises nommées.

## Les signaux qui font bouger le GEO

- **Empreinte Wikipedia et Wikidata** : la couche d'entités à laquelle les LLM puisent
- **Densité de citations à haute DA** : Yelp, BBB, Crunchbase, annuaires sectoriels
- **Contenu tiers faisant autorité** : mentions presse, passages en balado, publications sectorielles
- **Données ou recherches originales** que d'autres sites citent à leur tour

## Pourquoi le GEO est plus difficile que l'AEO

L'AEO est surtout du travail sur votre propre site. Le GEO dépend de la validation par des tiers. Impossible de le bâcler du jour au lendemain.

## Ce que nous faisons

Le forfait Core inclut 5 soumissions de citations par mois, plus notre flux standard Wikipedia et Wikidata. Le forfait Growth ajoute un démarchage RP dédié et la production de recherche originale.`,
      },
      es: {
        title: "¿Qué es el GEO (Generative Engine Optimization)?",
        excerpt:
          "Lograr que su marca sea citada dentro de las respuestas de IA generativa, no solo las respuestas en sí.",
        body: `## El GEO es distinto del AEO

El AEO es ser la respuesta. El GEO es ser nombrado dentro de la respuesta.

ChatGPT puede dar una respuesta excelente sobre su sector sin nombrar a un solo negocio. El GEO es el trabajo de ser uno de los negocios que sí nombra.

## Las señales que mueven el GEO

- **Huella en Wikipedia y Wikidata**: la capa de entidades de la que extraen los LLM
- **Densidad de citas en sitios de alta DA**: Yelp, BBB, Crunchbase, directorios sectoriales
- **Contenido externo con autoridad**: menciones de prensa, participaciones en podcasts, publicaciones sectoriales
- **Datos o investigación original** que otros sitios citen de regreso

## Por qué el GEO es más difícil que el AEO

El AEO es principalmente trabajo propio en su propio sitio. El GEO depende de validación de terceros. No puede improvisarse de un día para otro.

## Qué hacemos

El plan Core incluye 5 envíos de citas por mes, más nuestro flujo estándar de Wikipedia y Wikidata. El plan Growth añade gestión de PR dedicada y producción de investigación original.`,
      },
      zh: {
        title: "什么是 GEO(Generative Engine Optimization)?",
        excerpt:
          "让您的品牌出现在生成式 AI 回答中被引用,而不只是回答本身。",
        body: `## GEO 与 AEO 不同

AEO 是成为答案,GEO 是在答案中被点名。

ChatGPT 可以就您的行业给出一段精彩回答,却一家企业都不点名。GEO 就是让自己成为它点名的企业之一。

## 推动 GEO 的信号

- **Wikipedia 与 Wikidata 足迹**: LLM 取用的实体层
- **高 DA 引用密度**: Yelp、BBB、Crunchbase、行业目录
- **权威第三方内容**: 媒体提及、播客嘉宾席位、行业刊物
- 让其他站点反向引用您的**原始数据或研究**

## 为什么 GEO 比 AEO 更难

AEO 主要是您在自家站点上的工作。GEO 依赖第三方验证,无法一夜搞定。

## 我们做什么

Core 套餐每月包含 5 次引用提交,以及我们标准的 Wikipedia 与 Wikidata 工作流。Growth 套餐增加专属 PR 拓展和原创研究产出。`,
      },
      ru: {
        title: "Что такое GEO (Generative Engine Optimization)?",
        excerpt:
          "Как добиться, чтобы ваш бренд называли внутри ответов генеративного ИИ, а не только сами ответы.",
        body: `## GEO отличается от AEO

AEO про то, чтобы быть ответом. GEO про то, чтобы вас называли внутри ответа.

ChatGPT может выдать отличный ответ про вашу отрасль, не назвав ни одной компании. GEO означает работу над тем, чтобы вашу компанию назвали.

## Сигналы, которые двигают GEO

- **Присутствие в Wikipedia и Wikidata**: слой сущностей, из которого черпают LLM
- **Плотность упоминаний на ресурсах с высоким DA**: Yelp, BBB, Crunchbase, отраслевые каталоги
- **Авторитетный сторонний контент**: упоминания в прессе, гостевые выпуски подкастов, отраслевые издания
- **Оригинальные данные или исследования**, на которые ссылаются другие сайты

## Почему GEO сложнее, чем AEO

AEO в основном работа на собственном сайте. GEO зависит от подтверждения третьими сторонами. Сделать его за одну ночь невозможно.

## Что делаем мы

Тариф Core включает 5 отправок упоминаний в месяц плюс наш стандартный процесс по Wikipedia и Wikidata. Тариф Growth добавляет выделенный PR-аутрич и производство оригинальных исследований.`,
      },
      ar: {
        title: "ما هو GEO (تحسين المحركات التوليدية)؟",
        excerpt:
          "جعل علامتك التجارية مذكورة داخل ردود الذكاء الاصطناعي التوليدي، وليس مجرد الردود نفسها.",
        body: `## GEO يختلف عن AEO

AEO يعني أن تكون أنت الإجابة. أما GEO فيعني أن يُذكر اسمك داخل الإجابة.

يمكن لـ ChatGPT أن يقدّم إجابة ممتازة عن قطاعك دون أن يذكر أي شركة. أما GEO فهو العمل الذي يجعل عملك واحداً من الأسماء التي تُذكر.

## الإشارات التي تحرّك GEO

- **البصمة في Wikipedia وWikidata**: طبقة الكيانات التي تستقي منها نماذج LLM
- **كثافة الاستشهاد على مواقع ذات DA مرتفع**: Yelp وBBB وCrunchbase والأدلة القطاعية
- **محتوى خارجي ذو سلطة**: تغطيات صحفية، استضافات في البودكاست، منشورات قطاعية
- **بيانات أو أبحاث أصلية** يشير إليها الآخرون مرة أخرى

## لماذا GEO أصعب من AEO

AEO يعتمد بشكل أساسي على عملك على موقعك الخاص. أما GEO فيعتمد على تحقق طرف ثالث، ولا يمكن إنجازه بين عشية وضحاها.

## ما نقوم به

تشمل خطة Core 5 إرسالات استشهاد شهرياً إضافة إلى سير العمل المعتمد لدينا في Wikipedia وWikidata. تضيف خطة Growth جهود علاقات عامة مخصّصة وإنتاج أبحاث أصلية.`,
      },
    },
  },
  {
    slug: "what-is-eeat",
    title: "What is E-E-A-T?",
    excerpt:
      "Experience, Expertise, Authoritativeness, Trust. The rubric AI engines use to pick whose content to cite.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-13",
    readingTimeMin: 3,
    body: `## The four pillars

- **Experience**: first-hand evidence. Original photos with EXIF data, real customer interviews, on-site videos.
- **Expertise**: credentials. Author bios with real qualifications, industry-specific vocabulary used correctly.
- **Authoritativeness**: third-party validation. Press, awards, peer recognition, industry citations.
- **Trust**: business honesty. SSL, no broken links, transparent pricing, real reviews not fake.

## Why E-E-A-T is your highest leverage

Google rebuilt its quality rater guidelines around E-E-A-T in 2024. Every LLM that uses Google's index inherits the weighting. AI search engines now actively penalize content that reads as AI-generated and reward content that reads as human, on-site, with proof.

## What "fixing" E-E-A-T looks like

Three concrete moves we ship for clients:

1. Author bylines added to all blog content (we use Person schema with credentials)
2. Original photography or video for every service page (no stock)
3. Award and credential schema markup so AI engines can verify your authority

## Common mistakes

- "AI-written" content with no human review and no byline
- Stock photos everywhere
- Pricing hidden behind a "contact us" form
- No author profile pages

The first two we fix with content production. The last two are policy decisions you make with your AiLys lead.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que E-E-A-T?",
        excerpt:
          "Experience, Expertise, Authoritativeness, Trust. La grille que les moteurs IA utilisent pour choisir quel contenu citer.",
        body: `## Les quatre piliers

- **Experience** : preuves de première main. Photos originales avec données EXIF, entrevues clients réelles, vidéos sur place.
- **Expertise** : qualifications. Biographies d'auteur avec qualifications réelles, vocabulaire sectoriel utilisé correctement.
- **Authoritativeness** : validation par des tiers. Presse, prix, reconnaissance par les pairs, citations sectorielles.
- **Trust** : honnêteté commerciale. SSL, aucun lien brisé, prix transparents, vrais avis et non factices.

## Pourquoi E-E-A-T est votre plus fort levier

Google a refondu ses lignes directrices d'évaluateurs qualité autour de E-E-A-T en 2024. Chaque LLM qui utilise l'index de Google hérite de cette pondération. Les moteurs de recherche IA pénalisent désormais activement le contenu qui sent l'IA et récompensent celui qui sent l'humain, sur place, avec preuves.

## À quoi ressemble la « correction » d'E-E-A-T

Trois mouvements concrets que nous livrons aux clients :

1. Signatures d'auteur ajoutées à tout le contenu de blogue (Person schema avec qualifications)
2. Photos ou vidéos originales pour chaque page de service (pas de banque d'images)
3. Balisage schema pour prix et accréditations afin que les moteurs IA puissent vérifier votre autorité

## Erreurs fréquentes

- Contenu « écrit par IA » sans revue humaine ni signature
- Photos de banques partout
- Prix caché derrière un formulaire « contactez-nous »
- Aucune page de profil d'auteur

Les deux premières se règlent par la production de contenu. Les deux dernières sont des décisions de politique que vous prenez avec votre responsable AiLys.`,
      },
      es: {
        title: "¿Qué es E-E-A-T?",
        excerpt:
          "Experience, Expertise, Authoritativeness, Trust. La rúbrica que los motores de IA usan para elegir qué contenido citar.",
        body: `## Los cuatro pilares

- **Experience**: evidencia de primera mano. Fotos originales con datos EXIF, entrevistas reales con clientes, videos in situ.
- **Expertise**: credenciales. Biografías de autor con calificaciones reales, vocabulario sectorial bien usado.
- **Authoritativeness**: validación externa. Prensa, premios, reconocimiento de pares, citas sectoriales.
- **Trust**: honestidad comercial. SSL, sin enlaces rotos, precios transparentes, reseñas reales y no falsas.

## Por qué E-E-A-T es su mayor palanca

Google reconstruyó sus guías para evaluadores de calidad alrededor de E-E-A-T en 2024. Todo LLM que usa el índice de Google hereda esa ponderación. Los motores de búsqueda con IA hoy penalizan activamente el contenido que se lee como generado por IA y premian el que se lee humano, en sitio, con pruebas.

## Cómo se ve "arreglar" E-E-A-T

Tres movimientos concretos que entregamos a clientes:

1. Firmas de autor añadidas a todo el contenido del blog (usamos Person schema con credenciales)
2. Fotografía o video original para cada página de servicio (sin imágenes de stock)
3. Marcado schema de premios y credenciales para que los motores IA puedan verificar su autoridad

## Errores comunes

- Contenido "escrito por IA" sin revisión humana ni firma
- Fotos de stock en todas partes
- Precios escondidos detrás de un formulario "contáctenos"
- Sin páginas de perfil de autor

Los dos primeros se arreglan con producción de contenido. Los dos últimos son decisiones de política que se toman con su líder en AiLys.`,
      },
      zh: {
        title: "什么是 E-E-A-T?",
        excerpt:
          "Experience(经验)、Expertise(专业)、Authoritativeness(权威)、Trust(可信)。AI 引擎用来挑选引用内容的标尺。",
        body: `## 四大支柱

- **Experience**: 第一手证据。带 EXIF 数据的原创图片、真实的客户访谈、现场视频。
- **Expertise**: 资历。作者简介中包含真实资格,行业术语使用正确。
- **Authoritativeness**: 第三方背书。媒体、奖项、同行认可、行业引用。
- **Trust**: 商业诚信。SSL、无失效链接、价格透明、真实评论而非作假。

## 为什么 E-E-A-T 是您最大的杠杆

Google 在 2024 年围绕 E-E-A-T 重写了质量评估员指南。任何使用 Google 索引的 LLM 都继承了这套加权。AI 搜索引擎如今主动惩罚那些读起来像 AI 生成的内容,奖励那些读起来由人类完成、现场制作、附带证据的内容。

## "修复" E-E-A-T 的样子

我们为客户落地的三项具体动作:

1. 为所有博客内容添加作者署名(使用带资历的 Person schema)
2. 每个服务页配备原创图片或视频(不用图库)
3. 部署奖项与资历的 schema 标记,让 AI 引擎可验证您的权威性

## 常见错误

- "AI 撰写"的内容,既无人工审稿也无署名
- 到处都是图库照片
- 价格藏在"联系我们"表单后
- 没有作者档案页

前两项我们用内容生产解决。后两项是您与 AiLys 负责人共同决定的策略问题。`,
      },
      ru: {
        title: "Что такое E-E-A-T?",
        excerpt:
          "Experience, Expertise, Authoritativeness, Trust. Шкала, по которой движки ИИ выбирают, чей контент цитировать.",
        body: `## Четыре опоры

- **Experience**: личный опыт. Оригинальные фотографии с EXIF-данными, реальные интервью с клиентами, видео, снятые на месте.
- **Expertise**: квалификация. Биографии авторов с реальными регалиями, отраслевая лексика, употребляемая корректно.
- **Authoritativeness**: подтверждение со стороны. Пресса, награды, признание коллег, отраслевые упоминания.
- **Trust**: добросовестность бизнеса. SSL, отсутствие битых ссылок, прозрачные цены, реальные отзывы вместо накрученных.

## Почему E-E-A-T даёт максимальный эффект

В 2024 году Google переписал свои руководства для оценщиков качества вокруг E-E-A-T. Каждый LLM, использующий индекс Google, наследует это взвешивание. Поисковики на ИИ теперь активно понижают контент, который читается как сгенерированный ИИ, и поощряют тот, что выглядит человеческим, написан на месте и подкреплён доказательствами.

## Как выглядит «починка» E-E-A-T

Три конкретных шага, которые мы внедряем для клиентов:

1. Добавление авторских подписей ко всему блоговому контенту (используем Person schema с регалиями)
2. Оригинальная фотография или видео для каждой страницы услуг (без стоков)
3. Разметка наград и квалификаций через schema, чтобы движки ИИ могли проверить вашу авторитетность

## Частые ошибки

- Контент, «написанный ИИ», без редактуры человеком и без подписи
- Стоковые фото повсюду
- Цены спрятаны за формой «свяжитесь с нами»
- Нет страниц с профилями авторов

Первые две проблемы решаем через контент-продакшн. Последние две, это решения по политике, которые вы принимаете вместе со своим менеджером AiLys.`,
      },
      ar: {
        title: "ما هو E-E-A-T؟",
        excerpt:
          "Experience، Expertise، Authoritativeness، Trust. المعيار الذي تستخدمه محركات الذكاء الاصطناعي لاختيار المحتوى الذي تستشهد به.",
        body: `## الركائز الأربع

- **Experience**: دليل مباشر من الميدان. صور أصلية ببيانات EXIF، مقابلات حقيقية مع العملاء، مقاطع فيديو مصوّرة في الموقع.
- **Expertise**: المؤهلات. سير ذاتية للمؤلفين بمؤهلات حقيقية، واستخدام مصطلحات القطاع بشكل صحيح.
- **Authoritativeness**: تحقق من طرف ثالث. تغطية صحفية، جوائز، اعتراف من الأقران، استشهادات قطاعية.
- **Trust**: نزاهة العمل. SSL، غياب الروابط المعطوبة، أسعار شفافة، مراجعات حقيقية وليست مزيّفة.

## لماذا E-E-A-T هو أعلى نقطة تأثير لديك

أعادت Google صياغة إرشادات مقيّمي الجودة حول E-E-A-T في 2024. كل نموذج LLM يستخدم فهرس Google يرث هذا الترجيح. تعاقب محركات بحث الذكاء الاصطناعي اليوم بشكل فعّال المحتوى الذي يبدو من إنتاج الذكاء الاصطناعي، وتكافئ المحتوى الذي يبدو بشرياً وميدانياً ومدعوماً بالأدلة.

## كيف يبدو «إصلاح» E-E-A-T

ثلاث خطوات ملموسة ننفّذها للعملاء:

1. إضافة توقيع المؤلف لكل محتوى المدوّنة (نستخدم Person schema مع المؤهلات)
2. تصوير فوتوغرافي أو فيديو أصلي لكل صفحة خدمة (لا صور مخزنة)
3. ترميز Schema للجوائز والمؤهلات حتى تتمكن محركات الذكاء الاصطناعي من التحقق من سلطتك

## الأخطاء الشائعة

- محتوى «مكتوب بالذكاء الاصطناعي» دون مراجعة بشرية ودون توقيع
- صور مخزنة في كل مكان
- أسعار مخفية خلف نموذج «اتصل بنا»
- لا توجد صفحات تعريف للمؤلفين

نعالج أول مشكلتين عبر إنتاج المحتوى. أما الأخيرتان فهما قرارات سياسة تتخذها مع المسؤول عنك في AiLys.`,
      },
    },
  },

  // ─── Pricing ─────────────────────────────────────────────
  {
    slug: "which-tier-is-right-for-me",
    title: "Which tier is right for my business?",
    excerpt:
      "Quick decision tree to pick between Starter, Core, Growth, and Agency.",
    category: "pricing-plans",
    updatedAt: "2026-04-15",
    readingTimeMin: 3,
    body: `## Quick decision tree

**Starter, $300/mo** is right if:
- Solo restaurant, indie professional, or small salon
- One location
- No prior agency engagement
- You want to dip a toe in AI search optimization

**Core, $600/mo** (most chosen) is right if:
- Dental practice, contractor, growing restaurant
- One to three locations
- You need schema implementation and citation building
- You want bilingual content production

**Growth, $1,200/mo** is right if:
- Multi-location, franchise, or aggressive expansion plan
- 4+ locations
- You need GEO entity authority work and weekly content
- You want competitive monitoring

**Agency, $2,500/mo** is right if:
- Everything Growth covers, plus you want zero ops
- You want AiLys Automation SaaS bundled in
- You want a monthly review contest run for you
- You want NFC tap-to-review collection wired in (cards procured separately by the client, or via the AiLys card service at 100 dollars CAD one-time per 3-card set)

## The "I am unsure" rule

Pick Core. It is the most-chosen tier for a reason: it covers 80% of what most local businesses need. You can upgrade to Growth or Agency any time, no penalty.`,
    i18n: {
      fr: {
        title: "Quel forfait convient à mon entreprise?",
        excerpt:
          "Arbre de décision rapide pour choisir entre Starter, Core, Growth et Agency.",
        body: `## Arbre de décision rapide

**Starter, 300 $/mois** convient si :
- Restaurant indépendant, professionnel solo ou petit salon
- Un seul emplacement
- Aucune expérience préalable avec une agence
- Vous voulez tâter le terrain en optimisation pour la recherche IA

**Core, 600 $/mois** (le plus choisi) convient si :
- Cabinet dentaire, entrepreneur, restaurant en croissance
- Un à trois emplacements
- Vous avez besoin d'implémentation schema et de citation building
- Vous voulez une production de contenu bilingue

**Growth, 1 200 $/mois** convient si :
- Multi-emplacements, franchise ou plan d'expansion agressif
- 4 emplacements ou plus
- Vous avez besoin de travail d'autorité d'entité GEO et de contenu hebdomadaire
- Vous voulez une surveillance concurrentielle

**Agency, 1 299 $/mois** convient si :
- Tout ce que couvre Growth, plus vous voulez zéro opération
- Vous voulez AiLys Automation SaaS inclus dans le lot
- Vous voulez un concours d'avis mensuel mené pour vous
- Vous voulez la collecte NFC tap-to-review câblée (cartes approvisionnées séparément par le client, ou via le service de cartes AiLys à 100 dollars CAD à charge unique par ensemble de 3 cartes)

## La règle « je ne sais pas »

Choisissez Core. C'est le forfait le plus choisi pour une raison : il couvre 80 % des besoins de la plupart des entreprises locales. Vous pouvez passer à Growth ou Agency n'importe quand, sans pénalité.`,
      },
      es: {
        title: "¿Qué plan es el adecuado para mi negocio?",
        excerpt:
          "Árbol de decisión rápido para elegir entre Starter, Core, Growth y Agency.",
        body: `## Árbol de decisión rápido

**Starter, $300/mes** le conviene si:
- Restaurante solo, profesional independiente o salón pequeño
- Una sola sucursal
- Sin trabajo previo con agencias
- Quiere meter el pie en la optimización para búsqueda IA

**Core, $600/mes** (el más elegido) le conviene si:
- Consultorio dental, contratista, restaurante en crecimiento
- Una a tres sucursales
- Necesita implementación de schema y citation building
- Quiere producción de contenido bilingüe

**Growth, $1,200/mes** le conviene si:
- Multi-sucursal, franquicia o plan de expansión agresivo
- 4 sucursales o más
- Necesita trabajo de autoridad de entidad GEO y contenido semanal
- Quiere monitoreo competitivo

**Agency, $2,500/mes** le conviene si:
- Todo lo que cubre Growth, más cero operaciones de su lado
- Quiere AiLys Automation SaaS incluido
- Quiere un concurso mensual de reseñas operado por nosotros
- Quiere tarjetas NFC enviadas a sus sucursales

## La regla "no estoy seguro"

Elija Core. Es el más elegido por una razón: cubre el 80 % de lo que necesita la mayoría de los negocios locales. Puede subir a Growth o Agency en cualquier momento, sin penalización.`,
      },
      zh: {
        title: "哪个套餐适合我的企业?",
        excerpt:
          "快速决策树,帮您在 Starter、Core、Growth 与 Agency 中做选择。",
        body: `## 快速决策树

**Starter,$300/月** 适合:
- 独立餐厅、独立从业者或小型沙龙
- 单一门店
- 此前未与代理合作过
- 想初步尝试 AI 搜索优化

**Core,$600/月**(最受欢迎)适合:
- 牙科诊所、承包商、成长中的餐厅
- 1 到 3 家门店
- 需要 schema 实施与 citation building
- 希望进行双语内容产出

**Growth,$1,200/月** 适合:
- 多门店、连锁或激进扩张计划
- 4 家及以上门店
- 需要 GEO 实体权威工作与每周内容
- 希望进行竞争对手监测

**Agency,$2,500/月** 适合:
- 涵盖 Growth 的全部,且您希望运营全部托管
- 希望打包 AiLys Automation SaaS
- 希望由我们代为运行每月评论征集活动
- 希望我们将 NFC 触碰卡寄送到各门店

## "我不确定" 法则

选 Core。它成为最受欢迎套餐是有原因的: 覆盖了大多数本地企业 80% 的需求。您可以随时升级到 Growth 或 Agency,无任何罚则。`,
      },
      ru: {
        title: "Какой тариф подойдёт моему бизнесу?",
        excerpt:
          "Быстрое дерево решений для выбора между Starter, Core, Growth и Agency.",
        body: `## Быстрое дерево решений

**Starter, $300/мес.** подойдёт, если:
- Независимый ресторан, частный специалист или небольшой салон
- Одна локация
- Раньше не работали с агентствами
- Хотите попробовать оптимизацию под поиск ИИ

**Core, $600/мес.** (выбирают чаще всего) подойдёт, если:
- Стоматология, подрядчик, растущий ресторан
- От одной до трёх локаций
- Нужно внедрение schema и работа по citation building
- Хотите двуязычное производство контента

**Growth, $1,200/мес.** подойдёт, если:
- Несколько локаций, франшиза или агрессивный план расширения
- 4 локации и больше
- Нужна работа с авторитетом сущности под GEO и еженедельный контент
- Хотите мониторинг конкурентов

**Agency, $2,500/мес.** подойдёт, если:
- Всё, что покрывает Growth, плюс вы хотите ноль операционки
- Хотите AiLys Automation SaaS в комплекте
- Хотите ежемесячный конкурс отзывов, организованный за вас
- Хотите NFC-карты с тапом, отправленные в ваши локации

## Правило «я не уверен»

Берите Core. Это самый популярный тариф не просто так: он закрывает 80% потребностей большинства локальных бизнесов. Перейти на Growth или Agency можно в любой момент без штрафов.`,
      },
      ar: {
        title: "أي خطة تناسب نشاطي التجاري؟",
        excerpt:
          "شجرة قرار سريعة للاختيار بين Starter وCore وGrowth وAgency.",
        body: `## شجرة القرار السريعة

**Starter بسعر $300 شهرياً** مناسبة إذا:
- كنت تدير مطعماً منفرداً أو مهنياً مستقلاً أو صالوناً صغيراً
- لديك فرع واحد فقط
- لم تتعامل مع وكالة من قبل
- ترغب في تجربة تحسين البحث بالذكاء الاصطناعي بشكل مبدئي

**Core بسعر $600 شهرياً** (الأكثر اختياراً) مناسبة إذا:
- كنت تدير عيادة أسنان أو شركة مقاولات أو مطعماً في طور النمو
- لديك من فرع إلى ثلاثة فروع
- تحتاج إلى تطبيق Schema وبناء الاستشهادات
- ترغب في إنتاج محتوى ثنائي اللغة

**Growth بسعر $1,200 شهرياً** مناسبة إذا:
- كنت تدير فروعاً متعددة أو امتيازاً تجارياً أو خطة توسّع طموحة
- لديك 4 فروع أو أكثر
- تحتاج إلى عمل سلطة الكيان لـ GEO ومحتوى أسبوعي
- ترغب في مراقبة المنافسين

**Agency بسعر $2,500 شهرياً** مناسبة إذا:
- أردت كل ما تشمله Growth، إضافة إلى تشغيل بلا أي عمليات من جانبك
- أردت AiLys Automation SaaS ضمن الباقة
- أردت إدارة مسابقة مراجعات شهرية بالنيابة عنك
- أردت إرسال بطاقات NFC إلى فروعك

## قاعدة «لست متأكداً»

اختر Core. هذه هي الأكثر اختياراً لسبب وجيه، فهي تغطي 80% مما تحتاجه معظم الأعمال المحلية. يمكنك الترقية إلى Growth أو Agency في أي وقت دون أي غرامة.`,
      },
    },
  },
  {
    slug: "what-is-the-money-back-guarantee",
    title: "How does the 30-day money-back guarantee work?",
    excerpt:
      "If you do not see measurable schema or citation improvements in 30 days, we refund the month. Here is the fine print.",
    category: "pricing-plans",
    updatedAt: "2026-04-16",
    readingTimeMin: 2,
    body: `## What is covered

If, at the end of your first 30 days, you do not see at least one of:

- Schema validated and live on your site
- A measurable lift in your monthly citation tracking baseline
- A new GBP ranking position improvement

...you can request a full refund of the first month's fee. No clawback. You keep the schema we shipped and the citations we landed.

## How to request

Email hello@ailysagency.ca within 35 days of your start date with subject line "Refund request". We process within 5 business days, no questions, no guilt trip.

## What is not covered

- Months 2 onward (these are month-to-month, you can cancel any time with 2 weeks notice)
- AiLys Automation SaaS fees inside the Agency tier (these are separate and follow AiLys Automation's own refund policy)

## Why we offer this

Buying agency services on the internet is a credibility test. We are early stage and we know it. Removing financial risk on the first month is the cheapest way to earn the relationship.`,
    i18n: {
      fr: {
        title: "Comment fonctionne la garantie satisfait ou remboursé de 30 jours?",
        excerpt:
          "Si vous ne constatez pas d'améliorations mesurables au schema ou aux citations en 30 jours, nous remboursons le mois. Voici les détails.",
        body: `## Ce qui est couvert

Si, à la fin de vos 30 premiers jours, vous ne constatez aucun de :

- Schema validé et en ligne sur votre site
- Une hausse mesurable de votre référence mensuelle de suivi des citations
- Une nouvelle amélioration de position GBP

...vous pouvez demander un remboursement intégral des frais du premier mois. Aucune reprise. Vous conservez le schema livré et les citations décrochées.

## Comment en faire la demande

Envoyez un courriel à hello@ailysagency.ca dans les 35 jours suivant votre date de début avec comme objet « Demande de remboursement ». Nous traitons en 5 jours ouvrables, sans questions, sans culpabilisation.

## Ce qui n'est pas couvert

- Les mois 2 et suivants (ils sont au mois, vous pouvez résilier en tout temps avec 2 semaines de préavis)
- Les frais AiLys Automation SaaS inclus dans le forfait Agency (ils sont distincts et suivent la politique de remboursement de AiLys Automation)

## Pourquoi nous l'offrons

Acheter des services d'agence sur internet est un test de crédibilité. Nous sommes en début de parcours et nous le savons. Retirer le risque financier au premier mois est le moyen le moins coûteux de mériter la relation.`,
      },
      es: {
        title: "¿Cómo funciona la garantía de devolución de 30 días?",
        excerpt:
          "Si no ve mejoras medibles en schema o citas en 30 días, le devolvemos el mes. Esta es la letra chica.",
        body: `## Qué cubre

Si, al final de sus primeros 30 días, no observa al menos uno de:

- Schema validado y publicado en su sitio
- Un alza medible en la línea base mensual de seguimiento de citas
- Una nueva mejora de posición en GBP

...puede solicitar el reembolso completo de la cuota del primer mes. Sin retroactivo. Conserva el schema que desplegamos y las citas que conseguimos.

## Cómo solicitarlo

Envíe correo a hello@ailysagency.ca dentro de los 35 días desde su fecha de inicio con el asunto "Solicitud de reembolso". Procesamos en 5 días hábiles, sin preguntas, sin culpabilizar.

## Qué no cubre

- Mes 2 en adelante (son mes a mes, puede cancelar cuando guste con 2 semanas de aviso)
- Las cuotas de AiLys Automation SaaS dentro del plan Agency (son aparte y siguen la política de reembolso de AiLys Automation)

## Por qué la ofrecemos

Comprar servicios de agencia por internet es una prueba de credibilidad. Estamos en etapa temprana y lo sabemos. Quitar el riesgo financiero del primer mes es la forma más barata de ganarse la relación.`,
      },
      zh: {
        title: "30 天退款保证如何运作?",
        excerpt:
          "如果 30 天内您看不到可衡量的 schema 或引用改进,我们退还当月费用。以下是细则。",
        body: `## 涵盖范围

如果在您的前 30 天结束时,您没有看到以下任意一项:

- Schema 验证通过并已在您的站点上线
- 月度引用追踪基线出现可衡量的提升
- GBP 排名出现新的位置改善

...您可以申请全额退还首月费用。不追讨。您保留我们部署的 schema 和已拿下的引用。

## 如何申请

请在开始日期起 35 天内发邮件至 hello@ailysagency.ca,主题写"Refund request"。我们在 5 个工作日内处理,不盘问、不施压。

## 不涵盖范围

- 第 2 个月及以后(按月计费,任何时候可提前 2 周通知取消)
- Agency 套餐内的 AiLys Automation SaaS 费用(独立计费,遵循 AiLys Automation 自有的退款政策)

## 我们为什么提供它

在网上购买代理服务是一场信任考验。我们处于早期阶段,我们清楚这一点。在首月去除财务风险,是赢得这段关系最低成本的方式。`,
      },
      ru: {
        title: "Как работает 30-дневная гарантия возврата денег?",
        excerpt:
          "Если за 30 дней вы не увидите измеримых улучшений по schema или упоминаниям, мы возвращаем деньги за месяц. Вот мелкий шрифт.",
        body: `## Что покрывается

Если по итогам первых 30 дней вы не увидите хотя бы одно из:

- Schema провалидирован и работает на вашем сайте
- Измеримый рост базовой линии ежемесячного отслеживания упоминаний
- Новое улучшение позиции в выдаче GBP

...вы можете запросить полный возврат оплаты за первый месяц. Без обратного отбора. Вы оставляете у себя весь развёрнутый schema и все полученные упоминания.

## Как запросить

Напишите на hello@ailysagency.ca в течение 35 дней с даты старта с темой «Refund request». Обрабатываем за 5 рабочих дней, без расспросов и попыток отговорить.

## Что не покрывается

- Месяц 2 и далее (это помесячная оплата, отменить можно в любой момент за 2 недели до даты)
- Платежи AiLys Automation SaaS внутри тарифа Agency (они отдельные и подчиняются собственной политике возврата AiLys Automation)

## Почему мы это предлагаем

Покупка агентских услуг через интернет, это проверка доверия. Мы на ранней стадии и понимаем это. Снять финансовый риск с первого месяца, самый дешёвый способ заслужить ваше доверие.`,
      },
      ar: {
        title: "كيف يعمل ضمان استرداد الأموال خلال 30 يوماً؟",
        excerpt:
          "إن لم ترَ تحسينات قابلة للقياس في Schema أو الاستشهادات خلال 30 يوماً، نُعيد رسوم الشهر. إليك التفاصيل الدقيقة.",
        body: `## ما الذي يشمله الضمان

إذا، في نهاية أول 30 يوماً، لم تلاحظ أياً من التالي:

- Schema تم التحقق منه ومنشور على موقعك
- ارتفاع قابل للقياس في خط أساس تتبّع الاستشهادات الشهري
- تحسّن جديد في موضع الترتيب على GBP

...يمكنك طلب استرداد كامل لرسوم الشهر الأول. دون أي استرجاع لاحق. تحتفظ بكل ما نشرناه من Schema وكل استشهاد حصلنا عليه.

## كيفية تقديم الطلب

أرسل بريداً إلكترونياً إلى hello@ailysagency.ca خلال 35 يوماً من تاريخ بدء الخدمة بعنوان «Refund request». نعالج الطلب خلال 5 أيام عمل، دون أسئلة ودون محاولات إقناع.

## ما لا يشمله الضمان

- الشهر الثاني وما بعده (الفوترة شهرية، ويمكنك الإلغاء في أي وقت بإشعار قبل أسبوعين)
- رسوم AiLys Automation SaaS داخل خطة Agency (مستقلة وتخضع لسياسة استرداد AiLys Automation الخاصة)

## لماذا نقدّم هذا الضمان

شراء خدمات وكالة عبر الإنترنت اختبار للمصداقية. نحن في مرحلة مبكرة وندرك ذلك. إزالة المخاطر المالية في الشهر الأول هي أرخص وسيلة لكسب هذه العلاقة.`,
      },
    },
  },

  // ─── Audit ────────────────────────────────────────────────
  {
    slug: "what-is-the-ai-visibility-audit",
    title: "What's in the free AI Visibility Audit?",
    excerpt:
      "We run your business through 6 AI search engines and score AEO, GEO, E-E-A-T. Here is exactly what you get and how long it takes.",
    category: "audit",
    updatedAt: "2026-04-18",
    readingTimeMin: 3,
    body: `## What you get

A 12-page PDF report covering:

- **LLM citation map**: side-by-side test of ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot for 5 high-intent prompts in your service + city
- **AEO score** (0 to 100): schema completeness, structured Q&A, scannability, entity disambiguation
- **GEO score** (0 to 100): authoritative publications presence, Wikipedia/Wikidata, forum signals, digital PR
- **E-E-A-T audit**: experience, expertise, authoritativeness, trust signals checked
- **90-day action plan**: prioritized list of fixes with effort estimates and expected lift

## How long it takes

24 hours from form submission. We run it during business hours Quebec time, so submit before 6pm if you want it next morning.

## What it costs

Nothing. No credit card. No discovery call required.

## What to do with it

Three options:

1. DIY using the action plan (we keep the plan substantive enough to action without us)
2. Hire AiLys to execute (most clients pick this)
3. Hand it to your existing agency (we are fine with that, the audit alone is valuable)`,
    i18n: {
      fr: {
        title: "Que contient l'AI Visibility Audit gratuit?",
        excerpt:
          "Nous testons votre entreprise dans 6 moteurs de recherche IA et notons AEO, GEO et E-E-A-T. Voici exactement ce que vous obtenez et combien de temps cela prend.",
        body: `## Ce que vous obtenez

Un rapport PDF de 12 pages couvrant :

- **Carte de citations LLM** : test côte à côte de ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot sur 5 prompts à forte intention dans votre service et votre ville
- **Score AEO** (0 à 100) : complétude schema, Q et R structurées, lisibilité, désambiguïsation d'entité
- **Score GEO** (0 à 100) : présence dans les publications faisant autorité, Wikipedia et Wikidata, signaux forums, RP numérique
- **Audit E-E-A-T** : signaux d'expérience, d'expertise, d'autorité et de confiance vérifiés
- **Plan d'action de 90 jours** : liste priorisée de correctifs avec estimations d'effort et hausse attendue

## Combien de temps cela prend

24 heures à partir de la soumission du formulaire. Nous le menons pendant les heures de bureau, heure du Québec, donc soumettez avant 18 h pour l'avoir le lendemain matin.

## Ce que cela coûte

Rien. Aucune carte de crédit. Aucun appel de découverte requis.

## Quoi en faire

Trois options :

1. Le faire vous-même avec le plan d'action (nous le gardons assez substantiel pour être actionnable sans nous)
2. Engager AiLys pour exécuter (la plupart des clients choisissent cela)
3. Le remettre à votre agence actuelle (cela ne nous dérange pas, l'audit seul a de la valeur)`,
      },
      es: {
        title: "¿Qué contiene el AI Visibility Audit gratuito?",
        excerpt:
          "Pasamos su negocio por 6 motores de búsqueda IA y puntuamos AEO, GEO y E-E-A-T. Esto es exactamente lo que recibe y cuánto demora.",
        body: `## Qué recibe

Un reporte PDF de 12 páginas que cubre:

- **Mapa de citas LLM**: prueba lado a lado en ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot con 5 prompts de alta intención sobre su servicio y ciudad
- **Puntaje AEO** (0 a 100): completitud de schema, P y R estructuradas, escaneabilidad, desambiguación de entidad
- **Puntaje GEO** (0 a 100): presencia en publicaciones con autoridad, Wikipedia y Wikidata, señales de foros, PR digital
- **Auditoría E-E-A-T**: señales de experiencia, experticia, autoridad y confianza revisadas
- **Plan de acción a 90 días**: lista priorizada de arreglos con estimación de esfuerzo y alza esperada

## Cuánto demora

24 horas desde el envío del formulario. Lo ejecutamos en horario laboral hora de Quebec, así que envíelo antes de las 6 pm si lo quiere a la mañana siguiente.

## Cuánto cuesta

Nada. Sin tarjeta. Sin llamada de descubrimiento requerida.

## Qué hacer con él

Tres opciones:

1. Hacerlo por su cuenta con el plan de acción (lo dejamos lo bastante sustantivo para accionarlo sin nosotros)
2. Contratar a AiLys para ejecutar (la mayoría de los clientes elige esto)
3. Pasarlo a su agencia actual (no hay problema, la auditoría por sí sola tiene valor)`,
      },
      zh: {
        title: "免费的 AI Visibility Audit 包含什么?",
        excerpt:
          "我们将您的企业放到 6 个 AI 搜索引擎中跑一遍,为 AEO、GEO 与 E-E-A-T 打分。以下是您具体能拿到什么以及耗时多长。",
        body: `## 您能拿到什么

一份 12 页的 PDF 报告,涵盖:

- **LLM 引用地图**: 在 ChatGPT、Perplexity、Claude、Gemini、Google AIO、Bing Copilot 上,针对您所在服务与城市的 5 条高意图 prompt 做并排测试
- **AEO 评分**(0 到 100): schema 完整度、结构化 Q 与 A、可扫读性、实体消歧
- **GEO 评分**(0 到 100): 权威刊物存在感、Wikipedia 与 Wikidata、论坛信号、数字 PR
- **E-E-A-T 审计**: 经验、专业、权威与信任信号逐项核查
- **90 天行动计划**: 排序后的修复清单,附工作量估计与预期提升

## 耗时多长

从表单提交起 24 小时。我们在魁北克时间的工作时间内运行,如果您希望次日早上拿到,请在 18:00 前提交。

## 费用如何

零费用。不需要信用卡,不需要必须的探索通话。

## 拿到后怎么用

三个选项:

1. 自行执行行动计划(我们让计划足够实在,不依赖我们也能落地)
2. 委托 AiLys 执行(多数客户选择这一项)
3. 交给您现有的代理(我们不介意,审计本身就具有价值)`,
      },
      ru: {
        title: "Что входит в бесплатный AI Visibility Audit?",
        excerpt:
          "Мы прогоняем ваш бизнес через 6 ИИ-поисковиков и оцениваем AEO, GEO и E-E-A-T. Вот что вы получите и сколько это займёт.",
        body: `## Что вы получаете

12-страничный PDF-отчёт, в котором есть:

- **Карта упоминаний LLM**: параллельный тест в ChatGPT, Perplexity, Claude, Gemini, Google AIO и Bing Copilot по 5 высокоинтентным промптам по вашей услуге и вашему городу
- **Оценка AEO** (от 0 до 100): полнота schema, структурированные вопросы и ответы, удобство сканирования, дезамбигуация сущности
- **Оценка GEO** (от 0 до 100): присутствие в авторитетных публикациях, Wikipedia и Wikidata, форумные сигналы, цифровой PR
- **Аудит E-E-A-T**: проверены сигналы опыта, экспертизы, авторитетности и доверия
- **План действий на 90 дней**: упорядоченный по приоритету список правок с оценкой трудозатрат и ожидаемым эффектом

## Сколько это занимает

24 часа с момента отправки формы. Мы запускаем аудит в рабочее время по Квебеку, поэтому отправляйте до 18:00, если хотите получить результат к утру следующего дня.

## Сколько это стоит

Ничего. Без банковской карты. Без обязательного звонка-знакомства.

## Что с этим делать

Три варианта:

1. Сделать своими силами по плану действий (мы оставляем план достаточно содержательным, чтобы запустить его без нас)
2. Нанять AiLys для исполнения (этот вариант выбирают большинство клиентов)
3. Передать его вашему текущему агентству (нам это нормально, аудит сам по себе ценен)`,
      },
      ar: {
        title: "ما الذي يتضمّنه AI Visibility Audit المجاني؟",
        excerpt:
          "نمرّر نشاطك عبر 6 محركات بحث ذكاء اصطناعي ونقيّم AEO وGEO وE-E-A-T. إليك بالضبط ما ستحصل عليه والمدة التي يستغرقها.",
        body: `## ما الذي ستحصل عليه

تقرير PDF من 12 صفحة يغطي:

- **خريطة استشهادات LLM**: اختبار جنباً إلى جنب على ChatGPT وPerplexity وClaude وGemini وGoogle AIO وBing Copilot على 5 طلبات عالية النية تتعلق بخدمتك ومدينتك
- **درجة AEO** (من 0 إلى 100): اكتمال Schema، الأسئلة والأجوبة المنظّمة، قابلية المسح، توضيح الكيان
- **درجة GEO** (من 0 إلى 100): الحضور في المنشورات ذات السلطة، Wikipedia وWikidata، إشارات المنتديات، العلاقات العامة الرقمية
- **تدقيق E-E-A-T**: فحص إشارات التجربة والخبرة والسلطة والثقة
- **خطة عمل لمدة 90 يوماً**: قائمة مرتّبة بالأولوية للإصلاحات مع تقديرات الجهد والارتفاع المتوقع

## كم تستغرق

24 ساعة من لحظة إرسال النموذج. نشغّلها خلال ساعات العمل بتوقيت كيبيك، لذا أرسل قبل الساعة 6 مساءً إذا رغبت في استلامها صباح اليوم التالي.

## كم تكلّف

لا شيء. دون بطاقة ائتمان. دون اشتراط مكالمة استكشافية.

## ماذا تفعل بها

ثلاثة خيارات:

1. التنفيذ بنفسك عبر خطة العمل (نحرص على أن تبقى الخطة عملية بما يكفي لتنفيذها بمعزل عنّا)
2. توظيف AiLys للتنفيذ (يختار معظم العملاء هذا الخيار)
3. تسليمها إلى وكالتك الحالية (لا مانع لدينا، فالتدقيق وحده ذو قيمة)`,
      },
    },
  },

  // ─── Glossary ─────────────────────────────────────────────
  {
    slug: "ai-search-glossary",
    title: "AI search glossary: terms we use",
    excerpt:
      "Quick definitions for AEO, GEO, E-E-A-T, schema, entity authority, citation density, share of model, and more.",
    category: "glossary",
    updatedAt: "2026-04-20",
    readingTimeMin: 4,
    body: `## A to Z

**AEO**: Answer Engine Optimization. Structuring content so AI engines pull direct answers from your site.

**AI Overviews / AIO**: Google's AI-summarized search results that appear above the traditional 10 blue links.

**Authority**: how much weight an AI engine gives a source. Higher authority sources get cited more often.

**Citation density**: how often your business name appears across the web. More citations across more domains equals stronger LLM signal.

**E-E-A-T**: Experience, Expertise, Authoritativeness, Trust. Google's content quality rubric, inherited by most LLMs.

**Entity authority**: your business as a "thing" Google's Knowledge Graph and Wikidata recognize, separate from any single page.

**GBP**: Google Business Profile, formerly Google My Business. Your local listing.

**GEO**: Generative Engine Optimization. Getting your brand named inside generative AI responses.

**LLM**: Large Language Model. The category of AI that powers ChatGPT, Claude, Gemini, etc.

**NAP**: Name, Address, Phone. The triple that needs to be consistent across the web for local SEO.

**Schema**: Schema.org markup. Structured data that helps engines understand your content.

**Share of model**: a measurement of how often your brand is mentioned in LLM answers vs competitors. Sometimes called Share of Voice in AI Search.

**TTFB**: Time To First Byte. How fast your server responds. Faster = better LLM ranking.

**Voice search**: queries spoken to assistants (Siri, Alexa, Google Assistant). Different ranking signals than typed search.`,
    i18n: {
      fr: {
        title: "Glossaire de la recherche IA : les termes que nous utilisons",
        excerpt:
          "Définitions rapides pour AEO, GEO, E-E-A-T, schema, autorité d'entité, densité de citations, share of model et plus encore.",
        body: `## De A à Z

**AEO** : Answer Engine Optimization. Structurer le contenu pour que les moteurs IA tirent des réponses directes de votre site.

**AI Overviews / AIO** : résultats de recherche résumés par l'IA de Google qui apparaissent au-dessus des 10 liens bleus traditionnels.

**Authority** : poids qu'un moteur IA accorde à une source. Les sources de plus haute autorité sont citées plus souvent.

**Citation density** : fréquence à laquelle le nom de votre entreprise apparaît sur le web. Plus de citations sur plus de domaines équivaut à un signal LLM plus fort.

**E-E-A-T** : Experience, Expertise, Authoritativeness, Trust. La grille de qualité de contenu de Google, héritée par la plupart des LLM.

**Entity authority** : votre entreprise comme « chose » que reconnaissent le Knowledge Graph de Google et Wikidata, distincte de toute page individuelle.

**GBP** : Google Business Profile, anciennement Google My Business. Votre fiche locale.

**GEO** : Generative Engine Optimization. Faire nommer votre marque dans les réponses des IA génératives.

**LLM** : Large Language Model. La catégorie d'IA qui alimente ChatGPT, Claude, Gemini, etc.

**NAP** : Name, Address, Phone. Le triplet qui doit rester cohérent sur le web pour le SEO local.

**Schema** : balisage Schema.org. Données structurées qui aident les moteurs à comprendre votre contenu.

**Share of model** : mesure de la fréquence à laquelle votre marque est mentionnée dans les réponses LLM par rapport aux concurrents. Parfois appelée Share of Voice in AI Search.

**TTFB** : Time To First Byte. Vitesse de réponse de votre serveur. Plus rapide égale meilleur classement LLM.

**Voice search** : requêtes parlées aux assistants (Siri, Alexa, Google Assistant). Signaux de classement différents de la recherche tapée.`,
      },
      es: {
        title: "Glosario de búsqueda con IA: términos que usamos",
        excerpt:
          "Definiciones rápidas de AEO, GEO, E-E-A-T, schema, autoridad de entidad, densidad de citas, share of model y más.",
        body: `## De la A a la Z

**AEO**: Answer Engine Optimization. Estructurar contenido para que los motores IA extraigan respuestas directas desde su sitio.

**AI Overviews / AIO**: resultados de búsqueda resumidos por la IA de Google que aparecen sobre los 10 enlaces azules tradicionales.

**Authority**: cuánto peso da un motor IA a una fuente. Las fuentes con más autoridad se citan con más frecuencia.

**Citation density**: con qué frecuencia aparece el nombre de su negocio por la web. Más citas en más dominios igual a señal LLM más fuerte.

**E-E-A-T**: Experience, Expertise, Authoritativeness, Trust. La rúbrica de calidad de contenido de Google, heredada por la mayoría de los LLM.

**Entity authority**: su negocio como una "cosa" que reconocen el Knowledge Graph de Google y Wikidata, separada de cualquier página individual.

**GBP**: Google Business Profile, antes Google My Business. Su ficha local.

**GEO**: Generative Engine Optimization. Lograr que su marca sea nombrada dentro de respuestas de IA generativa.

**LLM**: Large Language Model. La categoría de IA que impulsa ChatGPT, Claude, Gemini, etc.

**NAP**: Name, Address, Phone. El triplete que debe ser consistente en la web para SEO local.

**Schema**: marcado Schema.org. Datos estructurados que ayudan a los motores a entender su contenido.

**Share of model**: medición de cuán seguido se menciona su marca en respuestas LLM frente a competidores. A veces llamado Share of Voice in AI Search.

**TTFB**: Time To First Byte. Velocidad de respuesta de su servidor. Más rápido igual a mejor ranking LLM.

**Voice search**: consultas habladas a asistentes (Siri, Alexa, Google Assistant). Señales de ranking distintas a las de búsqueda escrita.`,
      },
      zh: {
        title: "AI 搜索术语表: 我们常用的词",
        excerpt:
          "AEO、GEO、E-E-A-T、schema、实体权威、引用密度、share of model 等术语的快速定义。",
        body: `## 从 A 到 Z

**AEO**: Answer Engine Optimization。把内容结构化,让 AI 引擎从您的站点提取直接答案。

**AI Overviews / AIO**: Google 的 AI 摘要式搜索结果,出现在传统的 10 条蓝色链接上方。

**Authority**(权威): AI 引擎赋予某个来源的权重。权威越高的来源被引用越频繁。

**Citation density**(引用密度): 您的企业名称在网络上出现的频率。在更多域名上获得更多引用即更强的 LLM 信号。

**E-E-A-T**: Experience、Expertise、Authoritativeness、Trust。Google 的内容质量标尺,被多数 LLM 继承。

**Entity authority**(实体权威): 您的企业作为 Google Knowledge Graph 和 Wikidata 所承认的"实体",独立于任何单个页面。

**GBP**: Google Business Profile,前称 Google My Business。您的本地商家信息。

**GEO**: Generative Engine Optimization。让您的品牌出现在生成式 AI 回答中被点名。

**LLM**: Large Language Model(大语言模型)。驱动 ChatGPT、Claude、Gemini 等的 AI 类别。

**NAP**: Name、Address、Phone。本地 SEO 中需在网络上保持一致的三元组。

**Schema**: Schema.org 标记。帮助引擎理解您内容的结构化数据。

**Share of model**: 衡量您的品牌在 LLM 回答中相对于竞争对手被提及的频率。有时也称作 Share of Voice in AI Search。

**TTFB**: Time To First Byte。您的服务器响应有多快。越快即 LLM 排名越好。

**Voice search**(语音搜索): 对助手(Siri、Alexa、Google Assistant)说出的查询。其排名信号与文字搜索不同。`,
      },
      ru: {
        title: "Глоссарий поиска ИИ: термины, которые мы используем",
        excerpt:
          "Краткие определения для AEO, GEO, E-E-A-T, schema, авторитета сущности, плотности упоминаний, share of model и не только.",
        body: `## От А до Я

**AEO**: Answer Engine Optimization. Структурирование контента так, чтобы движки ИИ извлекали прямые ответы с вашего сайта.

**AI Overviews / AIO**: суммированные ИИ результаты поиска Google, которые появляются над привычными 10 синими ссылками.

**Authority**: вес, который движок ИИ присваивает источнику. Источники с более высоким авторитетом цитируются чаще.

**Citation density**: насколько часто название вашего бизнеса появляется по всему вебу. Больше упоминаний на большем количестве доменов означает более сильный сигнал для LLM.

**E-E-A-T**: Experience, Expertise, Authoritativeness, Trust. Шкала качества контента от Google, унаследованная большинством LLM.

**Entity authority**: ваш бизнес как «вещь», которую распознают Knowledge Graph Google и Wikidata, отдельно от любой одной страницы.

**GBP**: Google Business Profile, ранее Google My Business. Ваша локальная карточка.

**GEO**: Generative Engine Optimization. Сделать так, чтобы ваш бренд называли внутри ответов генеративного ИИ.

**LLM**: Large Language Model. Категория ИИ, на которой работают ChatGPT, Claude, Gemini и другие.

**NAP**: Name, Address, Phone. Тройка, которая должна быть согласованной по всему вебу для локального SEO.

**Schema**: разметка Schema.org. Структурированные данные, помогающие движкам понимать ваш контент.

**Share of model**: показатель того, как часто ваш бренд упоминается в ответах LLM по сравнению с конкурентами. Иногда называется Share of Voice in AI Search.

**TTFB**: Time To First Byte. Скорость ответа вашего сервера. Чем быстрее, тем лучше ранжирование в LLM.

**Voice search**: запросы, произнесённые голосовым ассистентам (Siri, Alexa, Google Assistant). Сигналы ранжирования отличаются от тех, что для текстового поиска.`,
      },
      ar: {
        title: "مسرد بحث الذكاء الاصطناعي: المصطلحات التي نستخدمها",
        excerpt:
          "تعريفات سريعة لـ AEO وGEO وE-E-A-T وSchema وسلطة الكيان وكثافة الاستشهاد وShare of Model وغيرها.",
        body: `## من الألف إلى الياء

**AEO**: Answer Engine Optimization. هيكلة المحتوى بحيث تستخرج محركات الذكاء الاصطناعي إجابات مباشرة من موقعك.

**AI Overviews / AIO**: نتائج البحث الملخّصة بالذكاء الاصطناعي من Google والتي تظهر فوق روابط البحث الزرقاء العشرة التقليدية.

**Authority**: مقدار الوزن الذي يمنحه محرك ذكاء اصطناعي لمصدر ما. المصادر ذات السلطة الأعلى يُستشهد بها أكثر.

**Citation density**: عدد المرات التي يظهر فيها اسم نشاطك التجاري عبر الويب. كلما زادت الاستشهادات وزاد عدد النطاقات، قويت إشارة LLM.

**E-E-A-T**: Experience وExpertise وAuthoritativeness وTrust. معيار جودة المحتوى من Google، وقد ورثته معظم نماذج LLM.

**Entity authority**: نشاطك التجاري بوصفه «كياناً» يتعرّف عليه Knowledge Graph من Google وWikidata، بشكل مستقل عن أي صفحة بعينها.

**GBP**: Google Business Profile، كان يُعرف سابقاً بـ Google My Business. بطاقتك المحلية.

**GEO**: Generative Engine Optimization. جعل علامتك التجارية مذكورة داخل ردود الذكاء الاصطناعي التوليدي.

**LLM**: Large Language Model. فئة الذكاء الاصطناعي التي تشغّل ChatGPT وClaude وGemini وغيرها.

**NAP**: Name وAddress وPhone. الثلاثية التي يجب أن تبقى متطابقة عبر الويب من أجل السيو المحلي.

**Schema**: ترميز Schema.org. بيانات منظّمة تساعد المحركات على فهم محتواك.

**Share of model**: قياس عدد المرات التي تُذكر فيها علامتك داخل ردود LLM مقارنة بالمنافسين. يسمّى أحياناً Share of Voice in AI Search.

**TTFB**: Time To First Byte. سرعة استجابة خادمك. كلما كان أسرع، كان ترتيب LLM أفضل.

**Voice search**: استفسارات منطوقة للمساعدات الصوتية (Siri وAlexa وGoogle Assistant). إشاراتها للترتيب مختلفة عن البحث الكتابي.`,
      },
    },
  },

  // ─── Scope clarifications (added 2026-04-27) ─────────────────
  {
    slug: "contest-scope-client-runs-it",
    title: "Who runs the monthly review contest? You do, with our tools",
    excerpt:
      "AiLys gives you the AiLys Automation contest engine, the legal templates, the NFC tap-to-review landing page, and the help docs. NFC cards are procured separately by you (or via the AiLys card service for 100 dollars CAD one-time per 3-card set). The contest itself is yours to run because every business has its own audience, prize, and timing.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 4,
    body: `## What we deliver

When you activate the AiLys Automation reputation system (included in Agency, $100 add-on on other tiers), you get:

- **The contest engine itself**. NFC tap-to-enter, AI-generated review submission, automatic participant tracking, video winner announcement.
- **Legal templates**. Auto-generated Terms and Conditions tuned to your jurisdiction. Quebec rules, Canada-wide rules, US state-specific rules, EU/UK rules. Skill-testing question for Canadian and Mexican contests as required.
- **NFC cards (procured by you, or via the AiLys card service)**. Two paths: order blank NFC cards from any supplier (Amazon, NFC.direct, etc.) and program the AiLys Automation landing URL with a free phone NFC writer, OR buy the AiLys card service for 100 dollars CAD one-time which delivers 3 pre-programmed cards keyed to your landing URL with delivery included.
- **Setup support**. Your strategist walks you through the first contest in week one of onboarding.
- **This help center**. Step-by-step playbooks for every stage.

## What you do

You run the contest. Specifically:

- **Pick the prize**. A free service, a gift card, a product bundle. Something on-brand and meaningful to your customers.
- **Pick the duration**. We recommend monthly (the 1st to the last day) so the cadence is predictable.
- **Promote it**. In-store signage, your social channels, your email list, your staff handing out NFC cards.
- **Pick the winner**. AiLys Automation auto-draws fairly from eligible entries. You confirm.
- **Hand over the prize**. Photo, video, social post. AiLys Automation auto-generates a winner announcement video you can share.
- **Repeat next month**. Fresh prize, fresh promotion.

## Why we do not run the contest for you

Three reasons:

1. **Each business is different**. Your audience, your prize budget, your timing, your in-store presence. We cannot pick those for you without becoming a marketing agency, which is not our service.
2. **Liability sits with you**. Contests have legal exposure (privacy, fairness, jurisdiction-specific rules). The business running the contest carries that. We provide the templates so you stay compliant, but the operator must be you.
3. **Authentic local promotion beats centralized**. Your staff handing a card to a regular at the counter beats anything we could do from Montreal. The contest works because it is yours.

## What if I do not have time to run a contest?

That is normal in month one. Most clients pause the contest engine for the first 30 to 60 days while we get the foundations in place (GBP completeness, citation building, schema). Then in month two or three, with the operations stable, you launch your first contest.

The contest is a velocity multiplier on review collection, not a base requirement. Your AI Visibility, citations, and GBP work all run regardless of whether the contest is active.

## Need a different jurisdiction's rules?

The AiLys Automation T&C generator covers Canada (federal + Quebec specific), USA (state-by-state), Mexico, EU, UK, Australia, Brazil, India, and 12 other markets. If you operate in a market we do not yet cover, email us and we will research and add it within 2 weeks.`,
    i18n: {
      "fr-ca": {
        title: "Qui opère le concours d'avis mensuel ? Vous, avec nos outils",
        excerpt:
          "AiLys vous fournit le moteur de concours AiLys Automation, les modèles légaux, la page d'atterrissage NFC tap-to-review et la documentation. Les cartes NFC sont approvisionnées séparément par vous (ou via le service de cartes AiLys à 100 dollars CAD à charge unique par ensemble de 3 cartes). Le concours lui-même, vous l'opérez, parce que chaque commerce a son propre public, son propre prix et son propre calendrier.",
        body: `## Ce que nous livrons

Quand vous activez le système AiLys Automation (inclus dans Agency, ajoutable à 100 $ sur les autres plans) :

- **Le moteur de concours**. Tap NFC pour participer, génération d'avis par IA, suivi automatique des participants, vidéo d'annonce du gagnant.
- **Modèles légaux**. T&C générés automatiquement selon votre juridiction. Règles Quebec, règles canadiennes, règles américaines état par état, règles UE/UK. Question d'habileté mathématique requise au Canada et au Mexique.
- **Cartes NFC (approvisionnées par vous, ou via le service de cartes AiLys)**. Deux chemins : commandez des cartes NFC vierges chez tout fournisseur (Amazon, NFC.direct, etc.) et programmez l'URL d'atterrissage AiLys Automation avec une app gratuite d'écriture NFC sur téléphone, OU achetez le service de cartes AiLys à 100 dollars CAD à charge unique qui livre 3 cartes pré-programmées vers votre URL avec livraison incluse.
- **Support de mise en place**. Votre stratège vous guide dans le premier concours pendant la semaine 1 d'onboarding.
- **Ce centre d'aide**. Guides étape par étape pour chaque phase.

## Ce que vous faites

Vous opérez le concours. Plus précisément :

- **Choisir le prix**. Un service gratuit, une carte cadeau, un produit. Quelque chose qui colle à votre marque et qui parle à vos clients.
- **Choisir la durée**. On recommande mensuel (du 1er au dernier jour) pour que la cadence soit prévisible.
- **Le promouvoir**. Affichage en succursale, vos réseaux sociaux, votre liste courriel, votre équipe qui remet les cartes NFC.
- **Tirer le gagnant**. AiLys Automation fait le tirage automatique parmi les participants éligibles. Vous confirmez.
- **Remettre le prix**. Photo, vidéo, publication sociale. AiLys Automation génère automatiquement la vidéo d'annonce.
- **Recommencer le mois suivant**. Nouveau prix, nouvelle promotion.

## Pourquoi on n'opère pas le concours pour vous

Trois raisons :

1. **Chaque commerce est différent**. Votre public, votre budget de prix, votre calendrier, votre présence en succursale. On ne peut pas choisir ça à votre place sans devenir une agence marketing, ce qui n'est pas notre service.
2. **La responsabilité légale est à vous**. Les concours impliquent des risques (vie privée, équité, règles juridictionnelles). Le commerce qui opère le concours porte cette responsabilité. On vous fournit les modèles pour rester conforme, mais l'opérateur doit être vous.
3. **La promotion locale authentique bat la promotion centralisée**. Votre équipe qui remet une carte à un client régulier au comptoir bat tout ce qu'on pourrait faire depuis Montréal. Le concours marche parce qu'il est à vous.

## Et si je n'ai pas le temps d'opérer un concours ?

C'est normal au mois 1. La plupart des clients mettent le moteur de concours en pause les 30 à 60 premiers jours pendant qu'on installe les fondations (GBP complet, citations, schema). Au mois 2 ou 3, avec les opérations stables, vous lancez votre premier concours.

Le concours est un multiplicateur de vélocité sur la collecte d'avis, pas une exigence de base. Votre AI Visibility, vos citations et votre travail GBP roulent peu importe que le concours soit actif ou non.

## Besoin d'une autre juridiction ?

Le générateur de T&C AiLys Automation couvre le Canada (fédéral + Quebec spécifique), les USA (état par état), le Mexique, l'UE, le UK, l'Australie, le Brésil, l'Inde, et 12 autres marchés. Si vous opérez dans un marché qu'on ne couvre pas encore, envoyez-nous un courriel et on l'ajoute en 2 semaines.`,
      },
    },
  },
  {
    slug: "photo-flow-client-uploads-via-app",
    title: "How GBP photos work: you take them, our app publishes them",
    excerpt:
      "Real photos from your phone are an E-E-A-T 'experience' signal that AI engines weight heavily. We do not source photos for you. You upload via the AiLys Automation app at your tier-gated monthly quota, and the app handles the rest.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 3,
    body: `## Why client-sourced photos matter

AI search engines (Google AI Overviews, ChatGPT with image context, Perplexity) read your Google Business Profile photos as a signal of how recently and authentically your business is operating. Two patterns trigger trust loss:

1. **Stock photos**. AI engines have become very good at detecting them. A stock photo of "smiling dentist with patient" tells the engine you have not bothered to show your real practice.
2. **Stale photos**. If your last photo is from 2022, AI engines weigh you as inactive.

Real photos taken on your phone, with EXIF metadata showing recent dates and your location, score the highest "experience" signal in the Google E-E-A-T rubric. You cannot fake this. We will not try.

## The monthly quota by tier

Each tier comes with a built-in monthly upload quota in the AiLys Automation app:

- **Starter $300**: 1 photo per month
- **Core $600**: 2 photos per month
- **Growth $1,200**: 4 photos per month
- **Agency $2,500**: 8 photos per month

The counter resets the 1st of every month. Unused slots do not roll over.

## How to upload

1. Open the **AiLys Automation app** on your phone (or login at reviuzy.com).
2. Go to **GBP > Photos**.
3. The app shows you "Slots remaining: X of Y this month".
4. Tap **Upload** and either pick from your camera roll or take a photo on the spot.
5. The app extracts EXIF (date, location, device) automatically.
6. AI generates a caption and alt-text aligned with your business profile and language. You can edit before publishing.
7. The photo enters the queue. Your strategist QAs it (typically same day) and AiLys Automation publishes to your Google Business Profile via the official API.

## What kinds of photos work best

Order of impact for AI search:

1. **Inside your business**. The waiting room, the dining area, the workshop, the salon chair. Shows the place is real and active.
2. **Your team**. Group shot, owner shot, "meet your hygienist" portraits. Builds the "people" signal of E-E-A-T.
3. **Work in progress / work delivered**. The plate at the restaurant, the smile after dental cleaning, the haircut, the contract signed. Connects your business to the outcome.
4. **Your storefront from the street**. Helps the entity-graph match your physical location.
5. **Seasonal / event photos**. New menu launch, holiday decor, a community event you sponsored. Keeps the profile feeling fresh.

Avoid: logos as photos, stock images, screenshots of reviews, photos older than 6 months without context.

## What happens if I do not upload?

Your strategist will nudge you mid-month if the slot is unused. We do NOT auto-publish stock photos to fill the gap, because that would hurt your AI visibility instead of helping it. Empty slots simply pass.

## What if I have more photos than my quota allows?

Your photo collection is not capped, only your monthly publish rate is. You can upload as many as you want into the AiLys Automation library (drafts), and we publish from the queue at the tier rate. Upgrade to a higher tier if you have a lot of fresh visual content and want to push more per month.`,
    i18n: {
      "fr-ca": {
        title: "Comment fonctionnent les photos GBP : vous les prenez, notre app les publie",
        excerpt:
          "Les vraies photos prises sur votre téléphone sont un signal d'expérience E-E-A-T fortement pondéré par les moteurs IA. On ne va pas chercher de photos pour vous. Vous les téléversez via l'app AiLys Automation selon votre quota mensuel par tier, et l'app gère le reste.",
        body: `## Pourquoi les photos venant du client sont importantes

Les moteurs IA (Google AI Overviews, ChatGPT avec contexte image, Perplexity) lisent les photos de votre Google Business Profile comme un signal de fraîcheur et d'authenticité. Deux patterns détruisent la confiance :

1. **Photos stock**. Les moteurs IA sont devenus très bons pour les détecter. Une photo stock de "dentiste souriant avec patient" leur dit que vous n'avez pas pris la peine de montrer votre vraie pratique.
2. **Photos périmées**. Si votre dernière photo date de 2022, les moteurs IA vous considèrent inactif.

Les vraies photos prises sur votre téléphone, avec métadonnées EXIF montrant des dates récentes et votre localisation, obtiennent le meilleur signal "experience" dans la grille E-E-A-T de Google. Ça ne se fausse pas. On n'essaiera pas.

## Le quota mensuel par tier

Chaque plan inclut un quota mensuel de téléversements dans l'app AiLys Automation :

- **Starter 300 $** : 1 photo par mois
- **Core 600 $** : 2 photos par mois
- **Growth 1 200 $** : 4 photos par mois
- **Agency 2 500 $** : 8 photos par mois

Le compteur recommence le 1er de chaque mois. Les slots inutilisés ne se reportent pas.

## Comment téléverser

1. Ouvrez l'**app AiLys Automation** sur votre téléphone (ou loguez-vous sur reviuzy.com).
2. Allez à **GBP > Photos**.
3. L'app affiche "Slots restants : X de Y ce mois".
4. Tapez **Téléverser** et choisissez de votre rouleau de caméra ou prenez une photo sur le moment.
5. L'app extrait l'EXIF (date, localisation, appareil) automatiquement.
6. L'IA génère une légende et un alt-text alignés avec votre profil de commerce et votre langue. Vous pouvez éditer avant de publier.
7. La photo entre dans la queue. Votre stratège fait le QA (généralement le jour même) et AiLys Automation publie sur votre Google Business Profile via l'API officielle.

## Quels types de photos fonctionnent le mieux

Ordre d'impact pour le AI search :

1. **L'intérieur de votre commerce**. Salle d'attente, salle à manger, atelier, fauteuil de salon. Prouve que la place est réelle et active.
2. **Votre équipe**. Photo de groupe, photo du proprio, portraits "rencontrez votre hygiéniste". Construit le signal "personnes" de E-E-A-T.
3. **Travail en cours / travail livré**. L'assiette au resto, le sourire après le nettoyage dentaire, la coupe, le contrat signé. Connecte votre commerce au résultat.
4. **Votre devanture vue de la rue**. Aide le graphe d'entités à confirmer votre emplacement physique.
5. **Photos saisonnières / d'événements**. Lancement de menu, déco des fêtes, événement communautaire que vous avez commandité. Garde le profil frais.

À éviter : logos comme photos, images stock, captures d'écran d'avis, photos de plus de 6 mois sans contexte.

## Et si je ne téléverse pas ?

Votre stratège vous relance en mi-mois si le slot est inutilisé. On ne publie PAS de photos stock pour combler le vide, parce que ça nuirait à votre visibilité IA au lieu d'aider. Les slots vides passent simplement.

## Et si j'ai plus de photos que mon quota ?

Votre collection n'a pas de plafond, seulement votre cadence mensuelle de publication. Vous pouvez téléverser autant de drafts que vous voulez dans la bibliothèque AiLys Automation, et on publie de la queue au rythme du tier. Passez à un tier supérieur si vous avez beaucoup de contenu visuel frais et voulez en pousser plus par mois.`,
      },
    },
  },
  {
    slug: "why-no-link-building",
    title: "Why AiLys does not do active link-building (and why that helps you)",
    excerpt:
      "We do not run paid PR, journalist outreach, Wikipedia article creation, or Reddit participation campaigns. We do entity-graph work via Wikidata, citations, GBP, and schema. Here is why that is actually better positioning for AI search.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-27",
    readingTimeMin: 5,
    body: `## What we do not do

If you have worked with traditional SEO agencies, you have probably seen line items like:

- "5 backlinks per month from DR 50+ publications"
- "Wikipedia article creation"
- "Reddit thread participation"
- "Digital PR campaigns"
- "HARO sourcing for journalist mentions"

We do not promise any of those. Three reasons follow.

## Why active link-building is a fragile service

**1. Most agencies that promise it do not actually deliver it.** The link-building industry has a long tail of bait-and-switch: paid links from low-quality networks, AI-generated guest posts on shell sites, link exchanges that Google penalizes when they detect them. The result for clients is either no value, or worse, a manual penalty.

**2. The activities that genuinely move the needle require expert humans.** Wikipedia editing requires a wikipedian who understands notability, sourcing, and neutral point of view. Reddit voice cannot be outsourced or botted because Reddit detects it within days. Real journalist outreach requires real relationships built over years. None of these scale via SaaS.

**3. AI search engines weight backlinks less than they weight entity-graph signals.** Google still uses links. ChatGPT and Perplexity weight Wikidata, structured data, fresh citations, and reviews much more heavily. The signal mix has moved.

## What we do instead

Our deliverables are tuned to the AI search era, not the 2015 SEO era:

**Citation building**. We get your business listed on 5 to 15 high-authority directories per month (Yelp, BBB, Yellow Pages, Foursquare, Apple Business Connect, Bing Places, industry-specific sites). NAP-consistent, verified, with backlinks generated as a natural side effect.

**Wikidata structured-data work**. We create your business as a Wikidata entity (Q-number) with proper external IDs (Google Place ID, Yelp ID, GBP CID, website, founder, founded date). LLMs read Wikidata heavily because it is structured and verifiable. This is the closest thing to "Wikipedia for AI search" that we offer, and it is significantly more accessible than Wikipedia (no notability gatekeeping).

**GBP optimization**. Your Google Business Profile is itself the most important "backlink" you have. We complete every attribute, optimize categories, manage Q&A, schedule weekly posts, and refresh photos at your tier quota.

**Schema layers**. JSON-LD blocks for LocalBusiness, Service, FAQPage, Person (for author bylines), BreadcrumbList. This is what AI engines parse to understand your business structure and offerings.

**E-E-A-T content**. Real bylines, real expertise markers, structured data for credentials and awards.

## What about the backlinks I get from these activities?

You get them. We just do not promise them. Most directory citations come with a clickable link to your site (so does Wikidata, when properly sourced). These are organic, high-trust backlinks. We track them in your monthly report under "passive backlinks earned" so you have visibility, but we do not gate the deliverable on hitting a specific count.

## What if I really need a link-building campaign?

Two cases come up:

1. **You are launching a brand and need press coverage**. We refer you to a digital PR specialist (we have 2 partners we trust). They will run a 90-day campaign for $5,000 to $15,000 depending on scope. Separate engagement from your AiLys plan.
2. **You are recovering from a Google penalty and need link disavowals + clean replacements**. This is also outside our scope. We refer you to a technical SEO specialist for the disavow file and a link-building specialist for the rebuild. Again separate engagement.

We will not pretend to deliver something we cannot deliver well. That is the rule.

## How do I know AiLys is right for me?

If your situation is one of the following, we are a strong fit:

- Local business that needs to be cited by AI engines for "best [vertical] in [city]" queries
- Brand or agency reseller that needs a multi-tenant AI Visibility dashboard
- Multi-location operator who needs consistent NAP and entity-graph work at scale
- Any business that wants to layer AI search optimization on top of an existing site (not a website redesign)

If your situation is one of the following, we are NOT the right fit (and we will say so honestly):

- You need a marketing agency that runs paid ads, designs creative, manages social calendars. We are SEO and AI search only.
- You need a website built or redesigned. We work on the site you have.
- You need active link-building or paid PR. Refer to a specialist as described above.
- You expect guaranteed first-page rankings or guaranteed AI citation counts. AI engines are third-party black boxes; nobody can promise that. We promise delivery (citations, schema, posts, content) and measure outcomes monthly.`,
    i18n: {
      "fr-ca": {
        title: "Pourquoi AiLys ne fait pas de link-building actif (et pourquoi ça vous aide)",
        excerpt:
          "On ne fait pas de PR payée, de démarchage de journalistes, de création d'articles Wikipedia, ni de campagnes de participation Reddit. On fait du travail de graphe d'entités via Wikidata, citations, GBP et schema. Voici pourquoi c'est en fait un meilleur positionnement pour le AI search.",
        body: `## Ce qu'on ne fait pas

Si vous avez travaillé avec des agences SEO traditionnelles, vous avez probablement vu des lignes comme :

- "5 backlinks par mois de publications DR 50+"
- "Création d'article Wikipedia"
- "Participation à des fils Reddit"
- "Campagnes de PR digitale"
- "Sourcing HARO pour mentions de journalistes"

On ne promet aucune de ces lignes. Trois raisons.

## Pourquoi le link-building actif est un service fragile

**1. La plupart des agences qui le promettent ne le livrent pas vraiment.** L'industrie du link-building a une longue traînée de bait-and-switch : liens payants venant de réseaux de faible qualité, articles invités générés par IA sur des sites coquilles, échanges de liens que Google pénalise quand il les détecte. Le résultat pour les clients est soit aucune valeur, soit pire, une pénalité manuelle.

**2. Les activités qui font vraiment bouger l'aiguille demandent des humains experts.** L'édition Wikipedia demande un wikipédien qui comprend la notabilité, le sourcing, et le point de vue neutre. La voix Reddit ne peut pas être externalisée ou bottée parce que Reddit la détecte en quelques jours. Le démarchage journalistique réel demande de vraies relations construites sur des années. Aucune de ces choses ne scale via SaaS.

**3. Les moteurs de recherche IA pondèrent les backlinks moins que les signaux de graphe d'entités.** Google utilise encore les liens. ChatGPT et Perplexity pondèrent Wikidata, les données structurées, les citations fraîches et les avis beaucoup plus fortement. Le mix de signaux a changé.

## Ce qu'on fait à la place

Nos livrables sont accordés à l'ère du AI search, pas à l'ère SEO 2015 :

**Citation building**. On fait inscrire votre commerce sur 5 à 15 annuaires haute autorité par mois (Yelp, BBB, Pages Jaunes, Foursquare, Apple Business Connect, Bing Places, sites verticaux). NAP-cohérent, vérifié, avec des backlinks générés comme effet de bord naturel.

**Travail de données structurées Wikidata**. On crée votre commerce comme entité Wikidata (Q-number) avec les bons IDs externes (Google Place ID, Yelp ID, GBP CID, site web, fondateur, date de fondation). Les LLM lisent Wikidata fortement parce que c'est structuré et vérifiable. C'est l'équivalent le plus proche de "Wikipedia pour AI search" qu'on offre, et c'est nettement plus accessible que Wikipedia (pas de barrière de notabilité).

**Optimisation GBP**. Votre Google Business Profile est en lui-même le "backlink" le plus important que vous ayez. On remplit chaque attribut, optimise les catégories, gère les Q&R, planifie les publications hebdomadaires et rafraîchit les photos selon votre quota de tier.

**Couches de schema**. Blocs JSON-LD pour LocalBusiness, Service, FAQPage, Person (pour les bylines d'auteurs), BreadcrumbList. C'est ce que les moteurs IA parsent pour comprendre la structure de votre commerce et vos offres.

**Contenu E-E-A-T**. Vraies signatures d'auteurs, vrais marqueurs d'expertise, données structurées pour les références et prix.

## Et les backlinks que je gagne via ces activités ?

Vous les avez. On ne les promet juste pas. La plupart des citations annuaires viennent avec un lien cliquable vers votre site (pareil pour Wikidata, quand bien sourcé). Ce sont des backlinks organiques de haute confiance. On les track dans votre rapport mensuel sous "backlinks passifs gagnés" pour que vous ayez la visibilité, mais on ne gate pas le livrable sur un compte spécifique.

## Et si j'ai vraiment besoin d'une campagne de link-building ?

Deux cas se présentent :

1. **Vous lancez une marque et avez besoin de couverture presse**. On vous réfère à un spécialiste de PR digitale (on a 2 partenaires en qui on a confiance). Ils opèrent une campagne de 90 jours à 5 000 $ à 15 000 $ selon la portée. Engagement séparé de votre plan AiLys.
2. **Vous récupérez d'une pénalité Google et avez besoin de désaveux de liens + remplacements propres**. C'est aussi hors de notre portée. On vous réfère à un spécialiste SEO technique pour le fichier de désaveu et à un spécialiste de link-building pour la reconstruction. Encore engagement séparé.

On ne prétendra pas livrer quelque chose qu'on ne peut pas livrer bien. C'est la règle.

## Comment savoir si AiLys est fait pour moi ?

Si votre situation est une des suivantes, on est un excellent match :

- Commerce local qui doit être cité par les moteurs IA pour les requêtes "meilleur [vertical] à [ville]"
- Marque ou agence revendeur qui a besoin d'un dashboard AI Visibility multi-tenant
- Opérateur multi-emplacements qui a besoin de cohérence NAP et de travail de graphe d'entités à l'échelle
- Tout commerce qui veut superposer l'optimisation AI search sur un site existant (pas une refonte)

Si votre situation est une des suivantes, on n'est PAS le bon match (et on vous le dira honnêtement) :

- Vous avez besoin d'une agence marketing qui fait des pubs payantes, du design créatif, de la gestion de calendriers sociaux. On est SEO et AI search seulement.
- Vous avez besoin de construire ou refaire un site web. On travaille sur le site que vous avez.
- Vous avez besoin de link-building actif ou de PR payée. Référez-vous à un spécialiste comme décrit plus haut.
- Vous attendez un classement garanti en première page ou un nombre garanti de citations IA. Les moteurs IA sont des boîtes noires tierces ; personne ne peut promettre ça. On promet la livraison (citations, schema, publications, contenu) et on mesure les résultats mensuellement.`,
      },
    },
  },

  // ─── Operational playbooks (added 2026-04-27) ────────────────
  {
    slug: "reddit-playbook-for-local-business",
    title: "Reddit playbook: how to participate without getting banned",
    excerpt:
      "We don't run Reddit campaigns for clients because authentic Reddit voice cannot be outsourced. If you want to participate yourself, this is the playbook: pick the right subreddits, build karma first, contribute before linking, and follow the rules of the room.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-27",
    readingTimeMin: 6,
    body: `## Why Reddit matters for AI search

ChatGPT, Perplexity, and Claude weight Reddit signals heavily because Reddit is one of the few platforms with genuine human discussion at scale. Industry subreddits often outweigh your own blog as a citation source. A single substantive thread where your business name appears naturally can drive AI citations for months.

But the bar to participate authentically is high. Reddit detects and bans bots, paid promoters, and obvious self-promotion within days. The community downvotes anyone who posts only to link their site. So we do not run Reddit campaigns on your behalf. We give you this playbook so you can do it the right way.

## Step 1: pick the right subreddits

For a local Montreal dentist, the right subreddits are:
- **r/montreal** (general Montreal community, 200K+ members)
- **r/AskMontreal** (questions specifically about the city)
- **r/Quebec** (broader Quebec community)
- **r/askdentists** (dental questions, 100K+ members)
- **r/Dentistry** (industry community)

Find your equivalents by searching Reddit for your city + your service. Bookmark 3 to 5. Visit them daily for a week before you ever post. Read 50 to 100 threads to understand the room's tone, what gets upvoted, what gets downvoted, what kinds of self-promotion are tolerated.

## Step 2: build karma first

Reddit users see your karma score (post karma + comment karma) on every comment you make. New accounts with low karma get downvoted automatically because they look like spam.

Before you post anything related to your business:
1. Comment in non-business subreddits for 2 to 4 weeks. r/AskCanada, r/personalfinance, r/cooking, whatever you actually know about.
2. Aim for 200+ comment karma minimum before posting in industry subreddits.
3. Never copy-paste comments. Reddit's spam detection flags repeated text.

## Step 3: contribute before linking

The single biggest mistake businesses make on Reddit: they post a question or a "hot take" with a link to their site. The community sees through it instantly.

The right pattern:
- **Answer questions in your area of expertise** without linking. A dentist answering r/askdentists questions for 3 months, with no link, builds reputation.
- **When someone asks for a Montreal dentist** specifically, you can mention you run one. Be transparent: "I'm a dentist in Plateau Mont-Royal, here are 3 things to look for when picking..." Then disclose: "Full disclosure, my clinic is one option but here's how to evaluate any clinic." That earns trust.
- **Never link to your homepage.** Link to a specific blog post that answers a specific question. Or to a Google review the patient mentioned. Specific beats generic 100% of the time.

## Step 4: follow the rules of each subreddit

Every subreddit has a wiki and a sidebar with rules. Read them before posting. Common rules:
- "No self-promotion" → never link to your business
- "Self-promotion allowed only in pinned thread" → check for the weekly thread
- "All claims must be sourced" → cite a peer-reviewed paper or a government site, not your blog
- "No referral spam" → no affiliate links, no Uber referrals, no app referrals

Some subreddits ban any comment from a user who has any other comments mentioning their business. Test before you commit.

## Step 5: measure what works

We track Reddit signals in your monthly report:
- Brand mentions in your priority subreddits (we monitor 3 to 5 of them)
- Sentiment of those mentions (positive, neutral, negative)
- Whether any AI engine started citing those threads in answers (we test prompts that surface "best Reddit dentist Montreal" to see if your name pops)

If you participate consistently for 3 to 6 months, you'll see measurable lift in AI Visibility for prompts that include "reddit" or "review" in the user's intent.

## Common pitfalls and how to avoid them

**Pitfall 1: Sock-puppet accounts**. Creating multiple accounts to upvote your own posts. Reddit detects this via IP, browser fingerprint, and posting timing. One ban kills all related accounts.

**Pitfall 2: Astroturfing**. Paying or asking employees/family to post positive reviews of your business. Reddit's anti-astroturf detection has caught major brands. The reputation damage if discovered is permanent.

**Pitfall 3: Outrage farming**. Writing inflammatory takes to drive engagement. Even if it works short-term, it associates your name with negativity in the AI corpus. Bad for AI search, worse for trust.

**Pitfall 4: Linking your site every time**. Even legitimate links get downvoted if posted too frequently. Rule of thumb: 1 self-link per 20 substantive comments.

## How much time is realistic?

A local business owner who participates well spends 30 to 60 minutes per week on Reddit. That's enough to:
- Make 3 to 5 substantive comments per week
- Answer 1 to 2 industry questions per week
- Post 1 to 2 substantive original posts per month

If you cannot commit that, do not start. Sporadic Reddit presence reads worse than no Reddit presence.

## What if I want to outsource it?

Honestly: do not. The agencies that promise Reddit participation either bot it (gets banned) or have offshore teams who post obvious low-quality comments (gets downvoted, hurts your name). The signal Reddit gives AI search is "this human is real and trusted in this community", and that signal cannot be faked at scale.

If you cannot participate yourself, skip Reddit. Focus on the channels we can move for you (citations, GBP, schema, Wikidata, content). Those are 80% of AI Visibility lift anyway.`,
    i18n: {
      "fr-ca": {
        title: "Guide Reddit : comment participer sans se faire bannir",
        excerpt:
          "On n'opère pas de campagnes Reddit pour les clients parce que la voix authentique sur Reddit ne peut pas être externalisée. Si vous voulez participer vous-même, voici le guide : choisir les bons subreddits, bâtir du karma d'abord, contribuer avant de partager des liens, suivre les règles de la salle.",
        body: `## Pourquoi Reddit compte pour le AI search

ChatGPT, Perplexity et Claude pondèrent fortement les signaux Reddit parce que Reddit est une des rares plateformes avec une discussion humaine authentique à grande échelle. Les subreddits d'industrie pèsent souvent plus lourd que votre propre blogue comme source de citation. Un seul fil substantiel où le nom de votre commerce apparaît naturellement peut générer des citations IA pendant des mois.

Mais la barre pour participer authentiquement est haute. Reddit détecte et bannit les bots, les promoteurs payés et l'auto-promotion évidente en quelques jours. La communauté downvote quiconque poste juste pour partager son site. Donc on n'opère pas de campagnes Reddit en votre nom. On vous donne ce guide pour que vous puissiez le faire de la bonne façon.

## Étape 1 : choisir les bons subreddits

Pour un dentiste de Montreal local, les bons subreddits sont :
- **r/montreal** (communauté générale de Montreal, 200K+ membres)
- **r/AskMontreal** (questions spécifiquement sur la ville)
- **r/Quebec** (communauté Quebec plus large)
- **r/askdentists** (questions dentaires, 100K+ membres)
- **r/Dentistry** (communauté d'industrie)

Trouvez vos équivalents en cherchant Reddit pour votre ville + votre service. Bookmarkez 3 à 5. Visitez-les chaque jour pendant une semaine avant de poster quoi que ce soit. Lisez 50 à 100 fils pour comprendre le ton de la salle, ce qui se fait upvoter, ce qui se fait downvoter, quels types d'auto-promotion sont tolérés.

## Étape 2 : bâtir du karma d'abord

Les utilisateurs Reddit voient votre score karma (karma de posts + karma de commentaires) sur chaque commentaire que vous faites. Les nouveaux comptes à faible karma se font downvoter automatiquement parce qu'ils ont l'air de spam.

Avant de poster quoi que ce soit lié à votre commerce :
1. Commentez dans des subreddits non-commerciaux pendant 2 à 4 semaines. r/AskCanada, r/personalfinance, r/cooking, peu importe sur quoi vous connaissez vraiment.
2. Visez 200+ karma de commentaires minimum avant de poster dans les subreddits d'industrie.
3. Ne copiez-collez jamais de commentaires. La détection de spam de Reddit flag les textes répétés.

## Étape 3 : contribuer avant de partager des liens

La plus grosse erreur que les commerces font sur Reddit : ils postent une question ou un « hot take » avec un lien vers leur site. La communauté voit clair instantanément.

Le bon pattern :
- **Répondez aux questions dans votre domaine d'expertise** sans lien. Un dentiste qui répond aux questions r/askdentists pendant 3 mois, sans lien, bâtit sa réputation.
- **Quand quelqu'un demande un dentiste à Montreal** spécifiquement, vous pouvez mentionner que vous en opérez un. Soyez transparent : « Je suis dentiste au Plateau Mont-Royal, voici 3 choses à regarder en choisissant... » Puis divulguez : « Pleine divulgation, ma clinique en est une option mais voici comment évaluer n'importe quelle clinique. » Ça construit la confiance.
- **Ne partagez jamais le lien de votre page d'accueil.** Partagez un lien vers un article de blogue spécifique qui répond à une question spécifique. Ou vers un avis Google que le patient a mentionné. Spécifique bat générique 100 % du temps.

## Étape 4 : suivre les règles de chaque subreddit

Chaque subreddit a un wiki et une barre latérale avec des règles. Lisez-les avant de poster. Règles communes :
- « Pas d'auto-promotion » → ne partagez jamais le lien vers votre commerce
- « Auto-promotion permise seulement dans le fil épinglé » → cherchez le fil hebdomadaire
- « Toutes les affirmations doivent être sourcées » → citez un papier révisé par les pairs ou un site gouvernemental, pas votre blogue
- « Pas de spam de référencement » → pas de liens d'affiliation, pas de référencements Uber, pas de référencements d'apps

Certains subreddits bannissent tout commentaire d'un utilisateur qui a d'autres commentaires mentionnant son commerce. Testez avant de vous engager.

## Étape 5 : mesurer ce qui fonctionne

On suit les signaux Reddit dans votre rapport mensuel :
- Mentions de marque dans vos subreddits prioritaires (on en surveille 3 à 5)
- Sentiment de ces mentions (positif, neutre, négatif)
- Si un moteur IA a commencé à citer ces fils dans des réponses (on teste des prompts qui font remonter « meilleur dentiste reddit Montreal » pour voir si votre nom apparaît)

Si vous participez constamment pendant 3 à 6 mois, vous verrez une amélioration mesurable de l'AI Visibility pour les prompts qui incluent « reddit » ou « review » dans l'intention de l'utilisateur.

## Pièges communs et comment les éviter

**Piège 1 : Comptes sock-puppet.** Créer plusieurs comptes pour upvoter ses propres posts. Reddit détecte ça via l'IP, l'empreinte du navigateur et le timing des posts. Un ban tue tous les comptes liés.

**Piège 2 : Astroturfing.** Payer ou demander aux employés/à la famille de poster des avis positifs sur votre commerce. La détection anti-astroturf de Reddit a attrapé des grosses marques. Le dommage de réputation si découvert est permanent.

**Piège 3 : Cultiver l'outrage.** Écrire des hot takes inflammatoires pour générer de l'engagement. Même si ça marche à court terme, ça associe votre nom à de la négativité dans le corpus IA. Mauvais pour l'AI search, pire pour la confiance.

**Piège 4 : Partager le lien de votre site à chaque fois.** Même les liens légitimes se font downvoter s'ils sont postés trop fréquemment. Règle du pouce : 1 auto-lien par 20 commentaires substantiels.

## Combien de temps est réaliste ?

Un proprio de commerce local qui participe bien passe 30 à 60 minutes par semaine sur Reddit. C'est assez pour :
- Faire 3 à 5 commentaires substantiels par semaine
- Répondre à 1 à 2 questions d'industrie par semaine
- Poster 1 à 2 posts originaux substantiels par mois

Si vous ne pouvez pas vous engager à ça, ne commencez pas. Une présence Reddit sporadique paraît pire qu'aucune présence Reddit.

## Et si je veux l'externaliser ?

Honnêtement : ne le faites pas. Les agences qui promettent de la participation Reddit soit bottent (se font bannir) soit ont des équipes offshore qui postent des commentaires obviously bas de gamme (se font downvoter, nuit à votre nom). Le signal que Reddit donne au AI search est « cet humain est vrai et de confiance dans cette communauté », et ce signal ne peut pas être falsifié à grande échelle.

Si vous ne pouvez pas participer vous-même, sautez Reddit. Concentrez-vous sur les canaux qu'on peut bouger pour vous (citations, GBP, schema, Wikidata, contenu). Ceux-là représentent 80 % de l'amélioration en AI Visibility de toute façon.`,
      },
    },
  },
  {
    slug: "what-the-onboarding-audit-covers",
    title: "What the AiLys onboarding audit covers in week one",
    excerpt:
      "Every new client gets a free 5-section audit in the first week before any monthly delivery starts. Here is what we look at, what we deliver as part of the report, and what tools we use.",
    category: "audit",
    updatedAt: "2026-04-27",
    readingTimeMin: 5,
    body: `## Why we audit before we build

Most agencies start delivering the moment the contract is signed. We do not. Week one of every engagement, on every tier, is an audit week. The reasons:

1. We need to know your starting point so we can measure lift over the next 3, 6, and 12 months.
2. Some sites have foundation issues (broken redirects, missing schema, NAP inconsistency) that would make any subsequent work less effective. Fixing the foundation first multiplies the impact of everything we do later.
3. The audit doubles as your kickoff document. Everything we deliver in months 2 onward maps back to a baseline issue surfaced in this audit.

## The five audit sections

### 1. Technical SEO foundation

What we look at:
- Core Web Vitals (LCP, INP, CLS) via Lighthouse + PageSpeed Insights
- Mobile-first indexing: viewport meta, tap targets, responsive layout
- Crawlability: robots.txt, sitemap.xml present and submitted, no rogue noindex tags
- Indexation status: Google Search Console pages indexed vs total, coverage errors
- HTTP status codes: 404 vs 200, redirect chains, hreflang correctness if multilingual
- HTTPS everywhere, valid certificate, no mixed content

What we deliver: a 1-page technical scorecard with each signal scored Pass / Warning / Fail, and the top 3 critical fixes ranked by impact.

### 2. Google Business Profile

What we look at:
- Profile completeness: name, address, phone, hours, primary + secondary categories, attributes, services list
- Photo freshness: when was the last photo uploaded, is there owner-generated imagery vs stock
- Posts cadence: are there any GBP posts? When was the last one?
- Q&A: how many questions, how many answered, response speed
- Reviews: total count, average rating, response rate, response speed, sentiment

What we deliver: GBP completeness percentage (out of 100), the missing fields enumerated, a recommended reply for the 5 most recent unanswered reviews.

### 3. Citations and NAP consistency

What we look at:
- Presence on the 50 highest-DA Canadian directories prioritized for your vertical (Yelp, BBB, YP, Foursquare, Apple Business Connect, Bing Places, plus industry-specific)
- NAP consistency: every variation of your name, address, phone found across the web. Even small variants ("St" vs "Street", different phone formats) count as inconsistencies that hurt you
- Duplicates and stale listings: directories where you appear twice, where the listing is wrong, where the URL is dead

What we deliver: a citation matrix showing which directories list you correctly, which list you incorrectly, which do not list you, and a prioritized fix list with our recommended cadence per tier.

### 4. AI Visibility baseline

What we look at:
- We poll all 6 AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) with 10 to 15 high-intent prompts in your service plus city
- Example prompts for a Montreal dentist: "best dentist in Plateau accepting new patients", "bilingual dentist Montreal", "[your business name] reviews", "emergency dentist Montreal Saturday"
- We track when your name appears, where you are positioned in the answer, what citations the engine pulled, who your competitors that DID get cited are

What we deliver: your starting Share of Model score across the 6 engines, the prompts you currently win, the prompts your top 3 competitors win, and a 90-day projection of where the citation work should move you.

### 5. E-E-A-T signal review

What we look at:
- Author bylines on your blog or service pages: are real humans named with photos, credentials, bios?
- Credential markup: degrees, certifications, awards, press mentions present in schema?
- Original photography: EXIF metadata showing real recent dates and locations vs stock photos
- Trust signals: testimonials, third-party reviews embedded, badges (BBB, industry associations)
- Content freshness: when was the last substantive content update?

What we deliver: an E-E-A-T scorecard (0 to 100) with each signal flagged, plus the 3 highest-impact additions you could make in the first 30 days.

## Tools we use internally

We use a mix of paid SaaS, free tools, and our own AiLys engine:
- **Lighthouse + PageSpeed Insights** (free) for Core Web Vitals
- **Google Search Console + Bing Webmaster Tools** (free) for indexation status
- **Schema.org validator + Google Rich Results Test** (free) for schema validation
- **The AiLys engine** (proprietary) for AI Visibility probes across 6 engines
- **BrightLocal-style citation sweep** (paid) for citation matrix
- **Ahrefs / Semrush** (paid, Growth+ tiers only) for backlink analysis context

Clients do not see the tool names in the deliverable, only the consolidated scorecard.

## When you receive it

The audit is delivered within 7 calendar days of contract signing for Starter, Core, and Growth tiers. Agency tier (with the in-person quarterly cadence) gets the audit in 5 calendar days plus a 60-minute Zoom walkthrough with the dedicated strategist.

## What happens next

The audit becomes the input for your kickoff document. The kickoff doc lists the work we will do in months 1 to 3, mapped one-to-one to issues surfaced in the audit. You sign off on the kickoff before any work starts. The 30-day satisfaction guarantee is gated on us delivering the kickoff outputs, so we have skin in the game on getting the audit right.`,
    i18n: {
      "fr-ca": {
        title: "Ce que couvre l'audit de démarrage AiLys en semaine 1",
        excerpt:
          "Chaque nouveau client reçoit un audit gratuit de 5 sections en première semaine, avant que la livraison mensuelle ne commence. Voici ce qu'on regarde, ce qu'on livre dans le rapport, et les outils qu'on utilise.",
        body: `## Pourquoi on audite avant de construire

La plupart des agences commencent à livrer dès que le contrat est signé. Nous, non. La semaine 1 de chaque mandat, sur chaque tier, est une semaine d'audit. Les raisons :

1. On a besoin de connaître votre point de départ pour pouvoir mesurer l'amélioration sur 3, 6 et 12 mois.
2. Certains sites ont des problèmes de fondation (redirections cassées, schema manquant, incohérence NAP) qui rendraient tout travail subséquent moins efficace. Régler la fondation d'abord multiplie l'impact de tout ce qu'on fait après.
3. L'audit sert aussi de document de démarrage. Tout ce qu'on livre à partir du mois 2 fait référence à un problème de référence soulevé dans cet audit.

## Les cinq sections de l'audit

### 1. Fondation SEO technique

Ce qu'on regarde :
- Core Web Vitals (LCP, INP, CLS) via Lighthouse et PageSpeed Insights
- Indexation mobile-first : viewport meta, cibles tactiles, mise en page responsive
- Capacité de crawl : robots.txt, sitemap.xml présent et soumis, pas de tags noindex parasites
- Statut d'indexation : pages indexées vs total dans Google Search Console, erreurs de couverture
- Codes HTTP : 404 vs 200, chaînes de redirection, hreflang correct si multilingue
- HTTPS partout, certificat valide, aucun contenu mixte

Ce qu'on livre : une fiche d'évaluation technique d'une page avec chaque signal noté Réussi / Avertissement / Échec, et le top 3 des correctifs critiques classés par impact.

### 2. Google Business Profile

Ce qu'on regarde :
- Complétude du profil : nom, adresse, téléphone, heures, catégorie principale + secondaires, attributs, liste des services
- Fraîcheur des photos : date du dernier téléversement, imagerie générée par le proprio vs stock
- Cadence des publications : y a-t-il des publications GBP ? Quand était la dernière ?
- Q&R : combien de questions, combien de réponses, vitesse de réponse
- Avis : nombre total, note moyenne, taux de réponse, vitesse de réponse, sentiment

Ce qu'on livre : pourcentage de complétude GBP (sur 100), les champs manquants énumérés, une réponse recommandée pour les 5 avis non répondus les plus récents.

### 3. Citations et cohérence NAP

Ce qu'on regarde :
- Présence sur les 50 annuaires canadiens à plus haut DA priorisés pour votre vertical (Yelp, BBB, Pages Jaunes, Foursquare, Apple Business Connect, Bing Places, plus les annuaires verticaux d'industrie)
- Cohérence NAP : toutes les variations de votre nom, adresse, téléphone trouvées sur le web. Même les petites variantes (« St » vs « Street », formats de téléphone différents) comptent comme des incohérences qui vous nuisent
- Doublons et listings périmés : annuaires où vous apparaissez deux fois, où le listing est faux, où l'URL est morte

Ce qu'on livre : une matrice de citations montrant quels annuaires vous listent correctement, lesquels vous listent incorrectement, lesquels ne vous listent pas, et une liste de correctifs priorisée avec notre cadence recommandée par tier.

### 4. Référence AI Visibility

Ce qu'on regarde :
- On interroge les 6 moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) avec 10 à 15 prompts à haute intention sur votre service + ville
- Exemples de prompts pour un dentiste à Montreal : « meilleur dentiste au Plateau acceptant nouveaux patients », « dentiste bilingue Montreal », « [nom de votre commerce] avis », « dentiste d'urgence Montreal samedi »
- On suit quand votre nom apparaît, où vous êtes positionné dans la réponse, quelles citations le moteur a tirées, qui sont vos 3 concurrents qui ONT été cités

Ce qu'on livre : votre score de Share of Model de départ sur les 6 moteurs, les prompts que vous gagnez actuellement, les prompts que vos 3 concurrents principaux gagnent, et une projection à 90 jours sur où le travail de citations devrait vous amener.

### 5. Revue des signaux E-E-A-T

Ce qu'on regarde :
- Signatures d'auteurs sur votre blogue ou pages de service : de vrais humains nommés avec photos, références, bios ?
- Marquage des références : diplômes, certifications, prix, mentions dans la presse présents dans le schema ?
- Photographie originale : métadonnées EXIF montrant vraies dates et localisations récentes vs photos stock
- Signaux de confiance : témoignages, avis tiers intégrés, badges (BBB, associations d'industrie)
- Fraîcheur du contenu : quand était la dernière mise à jour substantielle ?

Ce qu'on livre : une fiche d'évaluation E-E-A-T (0 à 100) avec chaque signal flagué, plus les 3 ajouts à plus haut impact que vous pourriez faire dans les 30 premiers jours.

## Outils qu'on utilise à l'interne

On utilise un mix de SaaS payant, d'outils gratuits et de notre propre moteur AiLys :
- **Lighthouse + PageSpeed Insights** (gratuit) pour les Core Web Vitals
- **Google Search Console + Bing Webmaster Tools** (gratuit) pour le statut d'indexation
- **Validateur Schema.org + Google Rich Results Test** (gratuit) pour la validation de schema
- **Le moteur AiLys** (propriétaire) pour les sondes AI Visibility sur les 6 moteurs
- **Sweep de citations façon BrightLocal** (payant) pour la matrice de citations
- **Ahrefs / Semrush** (payant, tiers Growth+ seulement) pour le contexte d'analyse de backlinks

Les clients ne voient pas les noms d'outils dans le livrable, seulement la fiche d'évaluation consolidée.

## Quand vous le recevez

L'audit est livré dans les 7 jours calendrier suivant la signature du contrat pour les tiers Starter, Core et Growth. Le tier Agency (avec sa cadence trimestrielle en personne) reçoit l'audit en 5 jours calendrier plus une visite guidée Zoom de 60 minutes avec le stratège dédié.

## Ce qui se passe ensuite

L'audit devient l'intrant de votre document de démarrage. Le doc de démarrage liste le travail qu'on fera dans les mois 1 à 3, mappé un-pour-un aux problèmes soulevés dans l'audit. Vous validez le doc de démarrage avant que tout travail ne commence. La garantie de satisfaction de 30 jours est conditionnée à ce qu'on livre les outputs du démarrage, donc on a la peau dans le jeu sur faire l'audit correctement.`,
      },
    },
  },
  {
    slug: "ailys-managed-accounts",
    title: "How AiLys-managed accounts work (vs self-serve AiLys Automation)",
    excerpt:
      "AiLys-managed accounts are operated by your dedicated strategist. The reputation app is the same, but the agency layer (citations, audits, monthly briefings, custom integrations) is delivered as a service. Here is what changes for you.",
    category: "getting-started",
    updatedAt: "2026-04-27",
    readingTimeMin: 5,
    body: `## Two flavors of the same product

AiLys Automation is the self-serve reputation app. You log in, click around, run your own contests, post photos, write your own replies. It costs a fraction of an agency retainer because you do the operating.

AiLys-managed accounts use the exact same reputation app under the hood, but a senior strategist owns the operating side. You get a dedicated point of contact, monthly written briefings, and the higher-effort deliverables (citation submissions, NAP fixes, AI Visibility analysis, schema deployments) are done for you, not by you.

You do not need to choose between the two. If you start self-serve and decide later you want the strategist layer, your account upgrades in place. All of your reviews, photos, contest history, and reports stay. We never archive or migrate; we just turn on the agency layer.

## What stays the same

- The AiLys Automation app itself: NFC review collection, AI review generation, auto-replies, contest engine, photo upload pipeline, Q&A monitor.
- Your data: every review, every photo, every customer-facing interaction lives in the same backend with the same retention.
- Login URL: AiLys-managed accounts log in at **my.ailysagency.ca** instead of reviuzy.com. Your existing reviuzy.com session is migrated automatically when the account upgrades.

## What changes for AiLys-managed accounts

1. **Dedicated strategist**: One named senior contact, not a queue. Reachable on Slack or email between visits, retains context across every conversation, owns the quarterly executive briefing.
2. **Monthly written briefing**: A short report covering AI Visibility score movement, new citations submitted, NAP corrections applied, GBP post and photo cadence delivered, anomalies flagged.
3. **Different billing line**: You see "REVIUZY INC * AILYS" on your statement, not "REVIUZY INC * REVIUZY". Same legal entity (AiLys Automation Inc., Quebec), different product line.
4. **Different sender on emails**: Operational emails come from noreply@ailysagency.ca instead of noreply@reviuzy.com so the brand surface is consistent with your strategist relationship.
5. **AiLys-flavored UI**: The app's color, logo, and navigation labels reflect the agency relationship. Functionally identical, visually distinct.

## Why two surfaces

Self-serve and managed are two different operating models. A solo restaurant owner running their own reputation does not want quarterly executive briefings or a 12-page monthly report. A regional brand with seven locations and a marketing director does not want to log in at 11pm to draft a Q&A reply. Same engine, different operating overhead.

We made the surfaces look distinct so the people on each side never confuse what they are paying for. AiLys clients see "your strategist did X this month." Self-serve clients see "you can do X yourself, here is the button."

## How upgrades happen

When you sign an AiLys engagement, an internal handoff fires automatically:

1. Your existing AiLys Automation account (if any) is marked as **AiLys-managed** in our backend.
2. Your tier is set to one of Starter ($300), Core ($600), Growth ($1,200), or Agency ($2,500) CAD per month.
3. Your dedicated strategist is assigned and can act on your account from day one.
4. Future logins land on **my.ailysagency.ca** with the AiLys-branded UI; reviuzy.com keeps working but redirects you to the right place.

Every transition is logged in your account history. You can request a full export of that history at any time.

## How downgrades happen

If you choose to step down from AiLys to self-serve AiLys Automation at the end of an engagement, the account flips back. Strategist access is removed. The UI returns to the AiLys Automation brand. Your data and history stay intact, including the period when you were AiLys-managed. The transition is also logged in your account history.

## Questions worth asking before you sign up

- Do you want operational work taken off your plate, or do you want a tool you operate? AiLys is the first; AiLys Automation direct is the second.
- How many locations? Multi-location is meaningfully easier with the Agency tier ($2,500/mo) which unlocks the multi-location dashboard.
- Do you need quarterly in-person briefings? That is Agency-only.
- Are you bound by an existing agency contract? AiLys engagements are month-to-month with a 30-day satisfaction guarantee, so you can run AiLys in parallel with another agency for the first 30 days at no risk.

If unsure, book a 30-minute call from the AiLys site. We will not pitch; we will tell you which surface fits.`,
    i18n: {
      fr: {
        title: "Comment fonctionnent les comptes gérés par AiLys (vs AiLys Automation libre-service)",
        excerpt:
          "Les comptes gérés par AiLys sont opérés par votre stratège attitré. L'app de réputation est la même, mais la couche agence (citations, audits, briefings mensuels, intégrations sur mesure) est livrée comme un service. Voici ce qui change pour vous.",
        body: `## Deux versions du même produit

AiLys Automation est l'app de réputation libre-service. Vous vous connectez, naviguez, lancez vos propres concours, publiez vos photos, écrivez vos propres réponses. Ça coûte une fraction d'un mandat d'agence parce que vous faites l'opération.

Les comptes gérés par AiLys utilisent exactement la même app de réputation en arrière-plan, mais un stratège senior s'occupe du côté opérationnel. Vous avez un point de contact attitré, des briefings écrits mensuels, et les livrables à plus fort effort (soumissions de citations, corrections NAP, analyse de visibilité IA, déploiements de schemas) sont faits pour vous, pas par vous.

Vous n'avez pas besoin de choisir entre les deux. Si vous commencez en libre-service et décidez plus tard que vous voulez la couche stratège, votre compte se bonifie sur place. Vos avis, photos, historique de concours et rapports restent. On n'archive jamais et on ne migre jamais ; on active simplement la couche agence.

## Ce qui reste pareil

- L'app AiLys Automation elle-même : collecte d'avis NFC, génération d'avis IA, réponses automatiques, moteur de concours, pipeline de téléversement de photos, surveillance Q&R.
- Vos données : chaque avis, chaque photo, chaque interaction client vit dans le même backend avec la même rétention.
- URL de connexion : les comptes gérés par AiLys se connectent à **my.ailysagency.ca** au lieu de reviuzy.com. Votre session existante reviuzy.com est migrée automatiquement quand le compte est bonifié.

## Ce qui change pour les comptes gérés par AiLys

1. **Stratège attitré** : Un contact senior nommé, pas une file d'attente. Joignable sur Slack ou courriel entre les rencontres, conserve le contexte d'un échange à l'autre, livre le briefing exécutif trimestriel.
2. **Briefing écrit mensuel** : Un rapport court couvrant le mouvement du score de visibilité IA, les nouvelles citations soumises, les corrections NAP appliquées, la cadence de publications et photos GBP livrée, les anomalies signalées.
3. **Ligne de facturation différente** : Vous voyez "REVIUZY INC * AILYS" sur votre relevé, pas "REVIUZY INC * REVIUZY". Même entité légale (AiLys Automation Inc., Québec), gamme de produits différente.
4. **Expéditeur différent sur les courriels** : Les courriels opérationnels arrivent de noreply@ailysagency.ca au lieu de noreply@reviuzy.com pour que la surface de marque soit cohérente avec votre relation stratège.
5. **UI aux couleurs AiLys** : La couleur, le logo et les libellés de navigation de l'app reflètent la relation d'agence. Fonctionnellement identique, visuellement distinct.

## Pourquoi deux surfaces

Libre-service et géré sont deux modèles d'opération différents. Un propriétaire de restaurant solo qui gère sa propre réputation ne veut pas de briefings exécutifs trimestriels ni de rapport mensuel de 12 pages. Une marque régionale avec sept emplacements et un directeur marketing ne veut pas se connecter à 23 h pour rédiger une réponse Q&R. Même moteur, charge opérationnelle différente.

On a rendu les surfaces visuellement distinctes pour que les gens de chaque côté ne confondent jamais ce qu'ils paient. Les clients AiLys voient "votre stratège a fait X ce mois-ci". Les clients libre-service voient "vous pouvez faire X vous-même, voici le bouton".

## Comment se passent les bonifications

Quand vous signez un engagement AiLys, un transfert interne se déclenche automatiquement :

1. Votre compte AiLys Automation existant (s'il y en a un) est marqué **géré par AiLys** dans notre backend.
2. Votre palier est réglé à Starter (300 $), Core (600 $), Growth (1 200 $) ou Agency (2 500 $) CAD par mois.
3. Votre stratège attitré est assigné et peut agir sur votre compte dès le jour 1.
4. Les connexions futures arrivent à **my.ailysagency.ca** avec l'UI aux couleurs AiLys ; reviuzy.com continue de fonctionner mais vous redirige au bon endroit.

Chaque transition est journalisée dans l'historique de votre compte. Vous pouvez demander un export complet de cet historique en tout temps.

## Comment se passent les retours

Si vous choisissez de redescendre d'AiLys vers AiLys Automation libre-service à la fin d'un engagement, le compte bascule en arrière. L'accès du stratège est retiré. L'UI revient à la marque AiLys Automation. Vos données et votre historique restent intacts, y compris la période où vous étiez géré par AiLys. La transition est aussi journalisée dans l'historique du compte.

## Questions à se poser avant de souscrire

- Voulez-vous que le travail opérationnel soit pris en charge, ou voulez-vous un outil que vous opérez ? AiLys est le premier ; AiLys Automation direct est le second.
- Combien d'emplacements ? Le multi-emplacements est sensiblement plus simple avec le palier Agency (2 500 $/mois) qui débloque le tableau de bord multi-emplacements.
- Avez-vous besoin de briefings trimestriels en personne ? C'est exclusif au palier Agency.
- Êtes-vous lié à un contrat d'agence existant ? Les engagements AiLys sont mois-en-mois avec une garantie satisfaction de 30 jours, vous pouvez donc faire rouler AiLys en parallèle avec une autre agence pendant les 30 premiers jours sans risque.

Si vous hésitez, réservez un appel de 30 minutes depuis le site AiLys. On ne fera pas de pitch ; on vous dira quelle surface vous convient.`,
      },
    },
  },
  {
    slug: "account-history-and-your-data",
    title: "Account history and your data (audit trail, GDPR exports)",
    excerpt:
      "Every change to your account type, plan tier, or strategist assignment is journaled. You can request a full export of this history at any time. Here is how it works and what is stored.",
    category: "account-billing",
    updatedAt: "2026-04-27",
    readingTimeMin: 4,
    body: `## What we journal

Whenever your account changes between **self-serve** and **AiLys-managed**, or your AiLys tier moves between Starter, Core, Growth and Agency, we record an entry. The entry contains:

- The date and time of the change (UTC).
- The previous state and the new state.
- The administrator who triggered the change (if applicable).
- A short reason string when one is provided (for example, "Stripe webhook: AiLys Core subscription created" or "Operator approved upsell").

The journal is **append-only**. Entries are never modified or deleted; corrections create a new entry rather than editing an existing one. This is by design so the trail is reliable for compliance reviews and dispute resolution.

## What we do NOT store in this journal

- Your reviews, photos, GBP posts, Q&A drafts, or any client-facing content. Those have their own retention rules.
- Your card or banking information. Stripe handles that on their side; we never store it.
- Your password or session tokens. Those live in our authentication subsystem with separate retention.

## Who can see your account history

- **You** (any owner or admin on the account) can view the history at any time from your account settings, once that surface is rolled out to the app.
- **Your dedicated strategist** (only on AiLys-managed accounts) sees the history of your account, not other accounts.
- **AiLys Automation Inc. compliance staff** sees all account histories during routine compliance reviews, audit responses, and dispute resolution.
- **Nobody else.** The history is row-level-secured at the database layer; cross-tenant reads are not possible from the application.

## Requesting a full export (GDPR / Quebec Law 25)

Under GDPR (EU), Quebec's Law 25, and equivalent provincial legislation in Canada, you have the right to request a complete machine-readable export of every record we hold about your account, including the account history journal.

To request an export:

1. Email **privacy@ailysagency.ca** with your account name and the email on file.
2. We confirm your identity (we ask one verification question or send a confirmation link to your account email).
3. Within 30 calendar days (typically under 7), you receive a JSON archive that includes the account history, your reviews, photos, contests, NAP snapshots, AI Visibility runs, and a metadata file describing the structure.
4. The archive is downloadable through a one-time signed link. We do not email the data directly.

There is no fee for this export. We do not require you to be a current customer; former customers retain the right to export their own data for as long as we hold it.

## Retention

- **Active customers**: history is retained for the lifetime of the account.
- **Cancelled customers**: history is retained for 7 years after cancellation, the standard retention window for tax and audit obligations in Canada and Quebec.
- **After 7 years**: history is hard-deleted on a quarterly cleanup cycle. You can request earlier deletion ("right to erasure") in writing; we comply unless an active legal hold applies.

## Why this matters

Account history is how disputes get resolved fairly. If you say "we never agreed to be on Growth tier," we can show you the exact timestamp and the trigger that put you there. If we made a mistake, we can roll it back and credit the difference. If a Stripe webhook misfired and double-charged you, we can identify the duplicate event and refund. Without a journal, both sides are guessing.

## What you do not need to worry about

You do not need to enable anything. The journal is on by default for every account, AiLys-managed or self-serve, on every tier including Starter. There is no opt-in, no setting to flip, no extra cost. It is part of how the system is built.

If you have questions about a specific entry in your history, contact your strategist (AiLys-managed) or hello@reviuzy.com (self-serve). We can explain any line in plain language.`,
    i18n: {
      fr: {
        title: "Historique de compte et vos données (piste d'audit, exports Loi 25)",
        excerpt:
          "Chaque changement à votre type de compte, palier ou assignation de stratège est journalisé. Vous pouvez demander un export complet de cet historique en tout temps. Voici comment ça fonctionne et ce qui est stocké.",
        body: `## Ce qu'on journalise

À chaque fois que votre compte change entre **libre-service** et **géré par AiLys**, ou que votre palier AiLys bouge entre Starter, Core, Growth et Agency, on enregistre une entrée. L'entrée contient :

- La date et l'heure du changement (UTC).
- L'état précédent et le nouvel état.
- L'administrateur qui a déclenché le changement (le cas échéant).
- Une courte chaîne de raison quand elle est fournie (par exemple, "Webhook Stripe : abonnement AiLys Core créé" ou "Opérateur a approuvé la bonification").

Le journal est **en ajout seulement**. Les entrées ne sont jamais modifiées ni supprimées ; les corrections créent une nouvelle entrée plutôt que d'éditer une entrée existante. C'est conçu ainsi pour que la piste soit fiable lors des revues de conformité et des résolutions de litige.

## Ce qu'on ne stocke PAS dans ce journal

- Vos avis, photos, publications GBP, brouillons de Q&R, ou tout contenu côté client. Ceux-ci ont leurs propres règles de rétention.
- Vos informations de carte ou bancaires. Stripe gère ça de son côté ; on ne stocke jamais ces données.
- Votre mot de passe ou jetons de session. Ceux-ci vivent dans notre sous-système d'authentification avec une rétention séparée.

## Qui peut voir votre historique de compte

- **Vous** (tout propriétaire ou admin du compte) pouvez voir l'historique en tout temps depuis les paramètres de votre compte, une fois cette surface déployée dans l'app.
- **Votre stratège attitré** (uniquement sur les comptes gérés par AiLys) voit l'historique de votre compte, pas celui d'autres comptes.
- **Le personnel de conformité de AiLys Automation Inc.** voit tous les historiques de compte lors des revues de conformité routinières, des réponses aux audits et des résolutions de litige.
- **Personne d'autre.** L'historique est sécurisé au niveau ligne dans la base de données ; les lectures inter-tenants ne sont pas possibles depuis l'application.

## Demander un export complet (Loi 25 du Québec / RGPD)

En vertu de la Loi 25 du Québec, du RGPD (UE), et de la législation provinciale équivalente au Canada, vous avez le droit de demander un export complet, lisible par machine, de chaque enregistrement qu'on garde sur votre compte, incluant le journal d'historique du compte.

Pour demander un export :

1. Envoyez un courriel à **privacy@ailysagency.ca** avec le nom de votre compte et le courriel au dossier.
2. On confirme votre identité (on pose une question de vérification ou on envoie un lien de confirmation à votre courriel de compte).
3. Dans les 30 jours calendrier (typiquement sous 7), vous recevez une archive JSON qui inclut l'historique du compte, vos avis, photos, concours, instantanés NAP, sondes de visibilité IA, et un fichier de métadonnées décrivant la structure.
4. L'archive est téléchargeable via un lien signé à usage unique. On n'envoie jamais les données directement par courriel.

Aucuns frais pour cet export. On n'exige pas que vous soyez un client actuel ; les anciens clients conservent le droit d'exporter leurs propres données aussi longtemps qu'on les détient.

## Rétention

- **Clients actifs** : l'historique est retenu pendant la durée de vie du compte.
- **Clients annulés** : l'historique est retenu pendant 7 ans après l'annulation, la fenêtre de rétention standard pour les obligations fiscales et d'audit au Canada et au Québec.
- **Après 7 ans** : l'historique est supprimé définitivement lors d'un cycle de nettoyage trimestriel. Vous pouvez demander une suppression plus précoce ("droit à l'effacement") par écrit ; on s'y conforme sauf si une mise en demeure légale active s'applique.

## Pourquoi ça compte

L'historique de compte est la façon dont les litiges se règlent équitablement. Si vous dites "on n'a jamais accepté d'être au palier Growth", on peut vous montrer le timestamp exact et le déclencheur qui vous y a placé. Si on a fait une erreur, on peut faire marche arrière et créditer la différence. Si un webhook Stripe a dérapé et vous a chargé deux fois, on peut identifier l'événement en double et rembourser. Sans journal, les deux côtés devinent.

## Ce dont vous n'avez pas à vous soucier

Vous n'avez rien à activer. Le journal est actif par défaut pour chaque compte, géré par AiLys ou libre-service, sur chaque palier incluant Starter. Aucun opt-in, aucun réglage à activer, aucun frais supplémentaire. Ça fait partie de la conception du système.

Si vous avez des questions sur une entrée spécifique de votre historique, contactez votre stratège (géré par AiLys) ou hello@reviuzy.com (libre-service). On peut expliquer n'importe quelle ligne en langage clair.`,
      },
    },
  },
  {
    slug: "multi-domain-management",
    title: "Managing multiple domains under one account",
    excerpt:
      "Agency-tier accounts can manage multiple websites + Google Business Profiles from one dashboard. Lower tiers stick to one domain per account by default. Here is how to add, remove, and switch the primary domain.",
    category: "account-billing",
    updatedAt: "2026-04-28",
    readingTimeMin: 4,
    body: `## When you need more than one domain

Most clients run one business at one website with one Google Business Profile. One domain per account is the right model. Some clients run multiple distinct businesses (a restaurant group, a regional brand with several locations as separate brands, or an agency reselling to multiple end clients). Multi-domain support lets one account own all of them under one dashboard, one bill, one strategist.

## Tier rules

- **AiLys Automation Starter / Pro**: 1 domain included.
- **AiLys Automation Max**: up to 3 domains included.
- **AiLys Starter, Core, Growth**: 1 domain included (the agency layer focuses on doing the operating well for one business at a time).
- **AiLys Agency ($2,500 CAD/mo)**: multi-domain by default with no fixed cap. The strategist hours scale with the number of domains under management; we will discuss capacity if a single account starts to exceed what the assigned strategist can deliver.

Going over the included quota on AiLys Automation Max prompts an extra-domain charge at the next billing cycle. AiLys Agency does not have a per-domain charge; it is bundled.

## How to add a domain

1. Go to **Settings, Organization** in your dashboard.
2. Find the **Domains** card (between Language and Google Integration).
3. Type the domain in the input box at the bottom of the card. Examples: thecafe.com, www.thecafe.com, shop.business.io. We auto-strip https://, lowercase everything, and trim trailing slashes so paste from the address bar works fine.
4. Click **Add**. The new domain shows up in the table.

The first domain you add becomes the **primary** automatically. The primary is what we use as the source of truth when notification emails go out, when the GBP signup flow prefills, and when single-domain features pick a default.

If you are at the tier quota, the **Add** button is disabled and a small message says "Tier limit reached. Upgrade your plan to add more domains."

## How to switch the primary domain

In the Domains table, every non-primary row has a small star icon. Click it to make that row the new primary. The previous primary becomes a regular secondary. The change is instant and journaled in your account history.

## How to remove a domain

In the Domains table, every non-primary row also has a trash icon. Click it, confirm in the dialog, and the row is deleted. We do not delete reviews, photos, posts, or any user-facing content tied to that domain. Those records keep their reference for history and audit purposes; they just stop appearing in the active dashboard for the deleted domain.

You cannot delete the primary. To delete what is currently primary, first switch the primary to a different domain, then delete the now-secondary one.

## What happens to a domain's data when removed

- **Reviews collected for that domain**: retained, hidden from active dashboards, included in any data export.
- **Photos uploaded for that domain**: retained, hidden from active dashboards, included in any data export.
- **GBP connection for that domain**: disconnected. The Google Business Profile itself is untouched on Google's side; you can reconnect it later if you re-add the domain.
- **Citations submitted for that domain**: retained as historical record, hidden from active dashboards.

If you want a complete clean-slate removal (full delete, not just hide), email **privacy@ailysagency.ca** with your account name and the domain to delete. We comply within 30 days under the right-to-erasure provision of Quebec Law 25 / GDPR.

## Why we keep historical data after removal

Account history (the change journal) and historical content (reviews, photos) get kept by default after a domain is removed because of three reasons:

1. **Mistake recovery**: If you remove a domain by accident, we can re-attach the existing data on re-add. Without retention, you would start from scratch.
2. **Compliance**: Reviews and the audit trail are subject to 7-year retention rules in Canada and Quebec. We cannot legally hard-delete them on removal alone.
3. **Tax and dispute resolution**: When a billing dispute happens, we need to show what was delivered for what was paid. The historical content is the proof.

You retain the right to request earlier deletion explicitly. We do not require an explanation; one email triggers the delete process.

## Common questions

**Can I move a domain from one of my AiLys accounts to another?** Yes, contact your strategist. We do this by re-attaching the existing data on the destination account. No data is lost; the source account loses the domain.

**Can two different AiLys accounts share the same domain?** No. Each domain is unique to one tenant in the system. If two accounts claim the same domain, only one wins, and the second add fails with a duplicate error.

**Does adding a domain count against my GBP integration quota?** No. The domain table is independent of GBP. You can add a domain and never connect a Google Business Profile to it (useful if the business is not on Google yet). When you do connect a GBP, the link is recorded on the domain row.

**What about a brand that owns 30 locations under one domain (one website)?** That is one domain, multi-location. Different concept. Multi-location is handled at the GBP layer (one domain, many connected locations), not the domain layer. Multi-domain is for when you have several distinct websites.`,
    i18n: {
      fr: {
        title: "Gérer plusieurs domaines sous un seul compte",
        excerpt:
          "Les comptes au palier Agency peuvent gérer plusieurs sites web et fiches Google Business Profile depuis un seul tableau de bord. Les paliers inférieurs restent à un domaine par compte par défaut. Voici comment ajouter, retirer et changer le domaine principal.",
        body: `## Quand vous avez besoin de plus d'un domaine

La plupart des clients gèrent une entreprise avec un site web et une fiche Google Business Profile. Un domaine par compte est le bon modèle. Certains clients gèrent plusieurs entreprises distinctes (un groupe de restaurants, une marque régionale avec plusieurs emplacements comme marques séparées, ou une agence qui revend à plusieurs clients finaux). Le support multi-domaines permet à un compte de tous les posséder sous un tableau de bord, une facture, un stratège.

## Règles par palier

- **AiLys Automation Starter / Pro** : 1 domaine inclus.
- **AiLys Automation Max** : jusqu'à 3 domaines inclus.
- **AiLys Starter, Core, Growth** : 1 domaine inclus (la couche agence se concentre sur bien opérer pour une entreprise à la fois).
- **AiLys Agency (2 500 $ CAD/mois)** : multi-domaines par défaut sans plafond fixe. Les heures du stratège évoluent avec le nombre de domaines gérés ; on discutera de la capacité si un seul compte commence à dépasser ce que le stratège attitré peut livrer.

Dépasser la quota incluse sur AiLys Automation Max déclenche un frais de domaine supplémentaire au prochain cycle de facturation. AiLys Agency n'a pas de frais par domaine ; c'est inclus.

## Comment ajouter un domaine

1. Allez dans **Paramètres, Organisation** dans votre tableau de bord.
2. Trouvez la carte **Domaines** (entre Langue et Intégration Google).
3. Tapez le domaine dans la boîte de saisie au bas de la carte. Exemples : thecafe.com, www.thecafe.com, shop.business.io. On retire automatiquement https://, on met en minuscules, on coupe les barres obliques de fin pour que le copier-coller depuis la barre d'adresse fonctionne bien.
4. Cliquez sur **Ajouter**. Le nouveau domaine apparaît dans le tableau.

Le premier domaine que vous ajoutez devient automatiquement le **principal**. Le principal est ce qu'on utilise comme source de vérité quand les courriels de notification partent, quand le flux d'inscription GBP est pré-rempli, et quand les fonctionnalités à un seul domaine choisissent un défaut.

Si vous êtes à la quota du palier, le bouton **Ajouter** est désactivé et un petit message dit "Limite du palier atteinte. Bonifiez votre forfait pour ajouter plus de domaines."

## Comment changer le domaine principal

Dans le tableau Domaines, chaque ligne non principale a une petite icône d'étoile. Cliquez dessus pour faire de cette ligne le nouveau principal. L'ancien principal devient un secondaire ordinaire. Le changement est instantané et journalisé dans l'historique de votre compte.

## Comment retirer un domaine

Dans le tableau Domaines, chaque ligne non principale a aussi une icône de poubelle. Cliquez dessus, confirmez dans la fenêtre, et la ligne est supprimée. On ne supprime pas les avis, photos, publications ou tout contenu côté utilisateur lié à ce domaine. Ces enregistrements gardent leur référence pour des fins d'historique et d'audit ; ils cessent simplement d'apparaître dans le tableau de bord actif pour le domaine supprimé.

Vous ne pouvez pas supprimer le principal. Pour supprimer ce qui est actuellement principal, basculez d'abord le principal sur un autre domaine, puis supprimez le maintenant secondaire.

## Ce qui arrive aux données d'un domaine retiré

- **Avis collectés pour ce domaine** : retenus, cachés des tableaux de bord actifs, inclus dans tout export de données.
- **Photos téléversées pour ce domaine** : retenues, cachées des tableaux de bord actifs, incluses dans tout export.
- **Connexion GBP pour ce domaine** : déconnectée. La fiche Google Business Profile elle-même n'est pas touchée du côté de Google ; vous pouvez la reconnecter plus tard si vous ré-ajoutez le domaine.
- **Citations soumises pour ce domaine** : retenues comme registre historique, cachées des tableaux de bord actifs.

Si vous voulez une suppression complète (vrai delete, pas juste cacher), envoyez un courriel à **privacy@ailysagency.ca** avec le nom de votre compte et le domaine à supprimer. On s'y conforme dans les 30 jours en vertu de la disposition droit à l'effacement de la Loi 25 du Québec et du RGPD.

## Pourquoi on garde les données historiques après retrait

L'historique du compte (le journal des changements) et le contenu historique (avis, photos) sont conservés par défaut après le retrait d'un domaine pour trois raisons :

1. **Récupération d'erreur** : Si vous retirez un domaine par accident, on peut rattacher les données existantes au ré-ajout. Sans rétention, vous repartirez de zéro.
2. **Conformité** : Les avis et la piste d'audit sont assujettis à des règles de rétention de 7 ans au Canada et au Québec. On ne peut pas légalement les supprimer définitivement sur un simple retrait.
3. **Résolution fiscale et de litige** : Quand un litige de facturation arrive, on doit montrer ce qui a été livré pour ce qui a été payé. Le contenu historique est la preuve.

Vous conservez le droit de demander une suppression plus tôt explicitement. On n'exige pas d'explication ; un courriel déclenche le processus de suppression.

## Questions fréquentes

**Puis-je transférer un domaine d'un de mes comptes AiLys à un autre ?** Oui, contactez votre stratège. On le fait en rattachant les données existantes au compte de destination. Aucune donnée n'est perdue ; le compte source perd le domaine.

**Deux comptes AiLys différents peuvent-ils partager le même domaine ?** Non. Chaque domaine est unique à un tenant dans le système. Si deux comptes revendiquent le même domaine, un seul gagne, et le deuxième ajout échoue avec une erreur de doublon.

**Est-ce que l'ajout d'un domaine compte contre ma quota d'intégration GBP ?** Non. La table des domaines est indépendante de GBP. Vous pouvez ajouter un domaine et ne jamais y connecter de fiche Google Business Profile (utile si l'entreprise n'est pas encore sur Google). Quand vous connectez une GBP, le lien est enregistré sur la ligne du domaine.

**Et une marque qui possède 30 emplacements sous un seul domaine (un seul site web) ?** C'est un seul domaine, multi-emplacement. Concept différent. Le multi-emplacement est géré à la couche GBP (un domaine, plusieurs emplacements connectés), pas à la couche domaine. Le multi-domaines est pour quand vous avez plusieurs sites web distincts.`,
      },
    },
  },
  {
    slug: "how-photo-uploads-work",
    title: "How photo uploads work (tier quotas, approval, and what we publish)",
    excerpt:
      "Photos are client-sourced (you take them on your phone), the system auto-generates caption + alt-text, and your strategist approves before they post to Google. Tier quota is monthly, with Agency scaling per domain.",
    category: "account-billing",
    updatedAt: "2026-04-28",
    readingTimeMin: 5,
    body: `## What we publish to Google Business Profile

Photos are one of the strongest E-E-A-T signals for local search. Real photos taken on your phone at your location carry metadata (date, location, camera model) that search engines weigh higher than stock photos or photos sourced from elsewhere. We publish photos to your Google Business Profile on the cadence your tier includes, and we use the metadata of every photo so it counts as an "Experience" signal.

We do not source photos. You take them; we publish them. This is intentional. Photos sourced by an agency from stock libraries or shot by a hired photographer are detectable as non-experience signals and weigh lower in the ranking.

## Monthly tier quotas

| Tier | Photos per month |
|---|---|
| AiLys Starter ($300/mo) | 4 |
| AiLys Core ($600/mo) | 8 |
| AiLys Growth ($1,200/mo) | 12 |
| AiLys Agency ($2,500/mo) | 12 per domain |

Agency tier scales the quota with the number of domains under management. Three domains on Agency is 36 photos per month. Seven domains is 84.

The quota is **monthly**, reset on the first of every month at 00:00 UTC. Unused photos do not roll over. If you publish 3 of 8 in March, April starts at 0 of 8, not 5 of 8.

Going over the quota in a single month returns a 403 from the upload pipeline with a "Monthly photo quota reached" message and the current count. You either wait for the next month or upgrade your tier.

## Self-serve AiLys Automation direct: no monthly cap

If you are on the **AiLys Automation SaaS direct** (not AiLys-managed), there is no monthly quota. You upload at your own pace, only constrained by the hourly rate limit (20 uploads per hour to protect against runaway scripts). The agency cadence is for AiLys-managed clients where we commit to a delivery rhythm; self-serve clients pace themselves.

## How to upload (you, the client)

1. Take the photo on your phone, at the location, during regular business activities. Customers in the frame are fine if you have their consent. Your products, your team, your space. Real moments.
2. Open the AiLys Automation app on **my.ailysagency.ca** (AiLys-managed) or **reviuzy.com** (self-serve).
3. Go to **GBP, Photos**.
4. Choose the photo, pick the category (Exterior / Interior / Product / Food and drink / Team / etc.), optionally write a short note.
5. Submit.

For AiLys-managed accounts, the photo enters the **strategist QA queue**. For self-serve, it publishes directly to Google.

## What happens between submit and publish

The system runs three steps automatically:

1. **EXIF preservation**: We keep the original metadata (date, GPS coords if you allow it, camera model, orientation). This is the "Experience" signal that Google weights for E-E-A-T. Photos with intact EXIF outrank stock or stripped photos.
2. **Caption + alt-text generation**: Our engine reads the photo and produces a 10-25 word customer-facing caption and an under-100-character alt text for screen readers. You can edit either before approval.
3. **Strategist review** (AiLys-managed only): Your strategist sees the queue, approves with one click, or rejects with a written reason (which you see in your dashboard). Approval triggers the actual upload to Google.

Self-serve AiLys Automation direct skips step 3 entirely; the photo posts to Google immediately after submit.

## How to know what is happening to a photo

**AiLys-managed**: Open **GBP, Photos** in your dashboard. You see three sections:
- **Pending review**: still in your strategist's queue. Typical turnaround is under 24 hours during business days.
- **Recently approved and posted**: success, photo is live on Google.
- **Rejected**: with the strategist's reason. You can re-shoot and re-upload.

**Self-serve AiLys Automation**: Same page, except the strategist column is replaced by direct upload status (success / failed with Google API error message).

## Why we approve before posting (AiLys-managed)

A photo on Google Business Profile is permanent until you remove it manually, and Google indexes the alt-text and the photo content for local search. A bad photo (blurry, off-brand, customer who did not consent) damages signals for months. The 24-hour delay from your phone to Google is worth it. The strategist catches:

- Blurry or out-of-focus photos
- Faces of customers without consent
- Off-brand content (employee selfies in the parking lot, food that does not represent your menu)
- Inappropriate alt-text generated by our engine that needs human correction

## What we never do

- Source photos from stock libraries
- Hire a photographer on your behalf without prior agreement
- Edit or filter photos beyond rotation (orientation correction)
- Re-publish the same photo to multiple locations to fake activity
- Strip EXIF metadata to "clean up" the photo (it kills the E-E-A-T signal)

## Common questions

**My photo was rejected. Can I dispute?** Yes. Reply directly to the rejection notification or contact your strategist. We are wrong sometimes.

**Can I post directly to Google myself, bypassing the queue?** Not from an AiLys-managed account. The whole point of AiLys-managed is the QA layer. If you want direct control, the right product is AiLys Automation self-serve at reviuzy.com.

**What if I run out of quota mid-month?** Either wait until the first of the next month, or upgrade your tier. We do not ship photos against next month's quota in advance.

**Does a rejected photo count against my quota?** No. Only photos that successfully publish to Google count. Rejected and pending photos do not.`,
    i18n: {
      fr: {
        title: "Comment fonctionnent les téléversements de photos (quotas par palier, approbation, et ce qu'on publie)",
        excerpt:
          "Les photos viennent du client (vous les prenez sur votre téléphone), le système génère automatiquement la légende et le texte alternatif, et votre stratège approuve avant publication sur Google. La quota par palier est mensuelle, avec Agency qui s'échelonne par domaine.",
        body: `## Ce qu'on publie sur Google Business Profile

Les photos sont parmi les signaux E-E-A-T les plus forts pour la recherche locale. Les vraies photos prises sur votre téléphone à votre emplacement portent des métadonnées (date, lieu, modèle d'appareil) que les moteurs de recherche valorisent plus que les photos stock ou les photos provenant d'ailleurs. On publie des photos sur votre fiche Google Business Profile à la cadence incluse dans votre palier, et on utilise les métadonnées de chaque photo pour qu'elle compte comme un signal "Expérience".

On ne source pas les photos. Vous les prenez ; on les publie. C'est intentionnel. Les photos sourcées par une agence depuis des bibliothèques stock ou prises par un photographe engagé sont détectables comme signaux non expérientiels et pèsent moins dans le classement.

## Quotas mensuels par palier

| Palier | Photos par mois |
|---|---|
| AiLys Starter (300 $/mois) | 4 |
| AiLys Core (600 $/mois) | 8 |
| AiLys Growth (1 200 $/mois) | 12 |
| AiLys Agency (2 500 $/mois) | 12 par domaine |

Le palier Agency échelonne la quota avec le nombre de domaines sous gestion. Trois domaines sur Agency = 36 photos par mois. Sept domaines = 84.

La quota est **mensuelle**, réinitialisée le premier de chaque mois à 00 h UTC. Les photos non utilisées ne se reportent pas. Si vous publiez 3 sur 8 en mars, avril repart à 0 sur 8, pas 5 sur 8.

Dépasser la quota dans un seul mois retourne une erreur 403 du pipeline de téléversement avec un message "Quota mensuel de photos atteint" et le compte courant. Vous attendez le mois suivant ou bonifiez votre palier.

## AiLys Automation libre-service direct : pas de plafond mensuel

Si vous êtes sur **AiLys Automation SaaS direct** (pas géré par AiLys), il n'y a pas de quota mensuelle. Vous téléversez à votre rythme, contraint seulement par la limite horaire (20 téléversements par heure pour protéger contre les scripts emballés). La cadence agence est pour les clients gérés par AiLys où on s'engage sur un rythme de livraison ; les clients libre-service se cadencent eux-mêmes.

## Comment téléverser (vous, le client)

1. Prenez la photo sur votre téléphone, à l'emplacement, pendant les activités normales de l'entreprise. Les clients dans le cadre c'est correct si vous avez leur consentement. Vos produits, votre équipe, votre espace. Des moments réels.
2. Ouvrez l'app AiLys Automation sur **my.ailysagency.ca** (géré par AiLys) ou **reviuzy.com** (libre-service).
3. Allez à **GBP, Photos**.
4. Choisissez la photo, sélectionnez la catégorie (Extérieur / Intérieur / Produit / Nourriture et boisson / Équipe / etc.), écrivez optionnellement une courte note.
5. Soumettez.

Pour les comptes gérés par AiLys, la photo entre dans la **file d'attente QA du stratège**. Pour le libre-service, elle se publie directement sur Google.

## Ce qui se passe entre la soumission et la publication

Le système exécute trois étapes automatiquement :

1. **Préservation EXIF** : On garde les métadonnées originales (date, coordonnées GPS si vous le permettez, modèle d'appareil, orientation). C'est le signal "Expérience" que Google pondère pour E-E-A-T. Les photos avec EXIF intactes surclassent les photos stock ou dépouillées.
2. **Génération de légende et de texte alternatif** : Notre moteur lit la photo et produit une légende face client de 10 à 25 mots et un texte alternatif de moins de 100 caractères pour les lecteurs d'écran. Vous pouvez éditer les deux avant approbation.
3. **Revue du stratège** (géré par AiLys seulement) : Votre stratège voit la file d'attente, approuve d'un clic, ou rejette avec une raison écrite (que vous voyez dans votre tableau de bord). L'approbation déclenche le téléversement réel sur Google.

AiLys Automation libre-service direct saute complètement l'étape 3 ; la photo se publie sur Google immédiatement après la soumission.

## Comment savoir ce qui arrive à une photo

**Géré par AiLys** : Ouvrez **GBP, Photos** dans votre tableau de bord. Vous voyez trois sections :
- **En attente de revue** : encore dans la file de votre stratège. Le délai typique est sous 24 heures les jours ouvrables.
- **Récemment approuvées et publiées** : succès, photo en ligne sur Google.
- **Rejetées** : avec la raison du stratège. Vous pouvez reprendre et re-téléverser.

**AiLys Automation libre-service** : Même page, sauf que la colonne stratège est remplacée par le statut de téléversement direct (succès / échec avec message d'erreur de l'API Google).

## Pourquoi on approuve avant de publier (géré par AiLys)

Une photo sur Google Business Profile est permanente jusqu'à ce que vous la retiriez manuellement, et Google indexe le texte alternatif et le contenu de la photo pour la recherche locale. Une mauvaise photo (floue, hors marque, client sans consentement) endommage les signaux pendant des mois. Le délai de 24 heures de votre téléphone à Google en vaut la peine. Le stratège attrape :

- Photos floues ou hors mise au point
- Visages de clients sans consentement
- Contenu hors marque (selfies d'employés dans le stationnement, nourriture qui ne représente pas votre menu)
- Texte alternatif inapproprié généré par notre moteur qui a besoin d'une correction humaine

## Ce qu'on ne fait jamais

- Sourcer des photos depuis des bibliothèques stock
- Engager un photographe pour vous sans entente préalable
- Éditer ou filtrer les photos au-delà de la rotation (correction d'orientation)
- Re-publier la même photo à plusieurs emplacements pour simuler de l'activité
- Dépouiller les métadonnées EXIF pour "nettoyer" la photo (ça tue le signal E-E-A-T)

## Questions fréquentes

**Ma photo a été rejetée. Puis-je contester ?** Oui. Répondez directement à la notification de rejet ou contactez votre stratège. On se trompe parfois.

**Puis-je publier directement sur Google moi-même, en contournant la file ?** Pas depuis un compte géré par AiLys. Tout le but du géré par AiLys est la couche QA. Si vous voulez le contrôle direct, le bon produit est AiLys Automation libre-service à reviuzy.com.

**Et si j'épuise ma quota en milieu de mois ?** Soit vous attendez le premier du mois suivant, soit vous bonifiez votre palier. On n'expédie pas de photos contre la quota du mois prochain à l'avance.

**Une photo rejetée compte-t-elle contre ma quota ?** Non. Seules les photos qui se publient avec succès sur Google comptent. Les photos rejetées et en attente ne comptent pas.`,
      },
    },
  },
  {
    slug: "reddit-signal-monitoring",
    title: "Reddit signal monitoring (we listen, you decide)",
    excerpt:
      "We poll configured subreddits for brand mentions, classify each as positive / neutral / negative, and surface high-priority items. We do not post on Reddit on your behalf, that is a hard rule.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-28",
    readingTimeMin: 4,
    body: `## What this is

A passive listening layer that watches Reddit for posts mentioning your brand or your competitors, classifies each by sentiment, and flags the items most likely to harm your reputation if left unanswered. You see the list, you decide what to do.

## What this is NOT

- We do **not** post replies on Reddit on your behalf.
- We do **not** create accounts that look like real users.
- We do **not** vote on threads.
- We do **not** participate in conversations under any persona.

This is a hard scope rule from our service contract. Active Reddit participation requires authentic human relationships and editorial judgment that an agency cannot fake without crossing into manipulation. Reddit users detect agency behavior immediately and the consequences (subreddit bans, brand-name discussions about manipulation) outweigh any short-term gain. So we monitor; the response decision belongs to you and your team.

## How configuration works

In your dashboard, **Reddit monitor**, you configure two pieces:

1. **Subreddits to watch**: free-form list. Pick the communities where your customers actually hang out. Restaurants might pick r/Montreal, r/MontrealFood. A SaaS might pick r/saas, r/entrepreneur, r/<your-niche>. We do not auto-pick subreddits because the right list is specific to you.
2. **Keywords to match per subreddit**: your brand name plus 2 to 5 variants (the way customers actually type it, including misspellings if frequent). Optionally include competitor names if you want to monitor share-of-voice.

Polling runs on demand from the dashboard for now (cron schedule comes later). One click runs all keywords across all active subreddits for your tenant. Typical run takes 10 to 30 seconds.

## What appears in the dashboard

For each match, we store and display:

- The original Reddit post URL (one-click external link)
- Subreddit, title, body excerpt (first 280 chars)
- Author handle (Reddit username)
- Upvote count and comment count at time of poll
- The keyword that matched
- A sentiment classification (positive / neutral / negative) with a confidence score

Mentions sit in three groups in the UI:

1. **Need attention**: negative recent (under a week) OR negative high-upvote (100+ upvotes) regardless of age. These are surfaced separately because Reddit threads with high upvotes rank in Google search results and keep harming reputation long after they stop getting active comments.
2. **Recent mentions**: last 100 across all targets, ordered by date observed.
3. **Summary counters**: total / positive / negative / unclassified.

## How sentiment is classified

Our engine reads the post title and body excerpt and outputs one of three labels (positive / neutral / negative) with a confidence score from 0 to 1. The classification considers context (sarcasm, conditional language) but is not perfect. Roughly 5 to 8 percent of mentions get a label that a human would disagree with. When you see a misclassification, just know the label is a guide, not gospel.

## Why this matters even though we do not respond

Three reasons to monitor even without responding:

1. **Crisis early warning**: A negative thread that gets 50 upvotes in an hour usually escalates. Catching it within a day means you can decide internally if and how to respond before it becomes the top Google result for your brand name.
2. **Product feedback signal**: Negative recurring patterns (multiple unrelated mentions of the same complaint) indicate a real problem worth fixing in the product or operations, separate from the Reddit visibility issue.
3. **Share of voice**: If you also monitor competitor names, you see relative mention volume over time. A competitor getting 5x your Reddit mentions for the same product category is a marketing signal worth investigating.

## What you do with the data

Your call. The most common patterns we see:

- **Internal Slack alert**: copy the URL into your team channel, decide who responds (founder, support, nobody).
- **Direct response from the founder**: the founder logs into their personal Reddit account (not an agency account, theirs) and replies in their own voice.
- **No response, just track**: some negative mentions are best left alone. Engaging makes them more visible. Tracking still tells you the volume.

We can advise on response strategy in your monthly briefing if you ask. We do not write or send the responses.

## Common questions

**How often does the system poll?** On demand for now. You click "Poll now" in the dashboard. A scheduled cron is on the roadmap.

**What if a mention is misclassified?** The classification is informational; the action is yours regardless of label. We do not have a "correct the label" button yet (it would feed our model training but introduce labeling noise).

**Can you monitor private subreddits?** No. Reddit's API only returns public content. Private subs are invisible.

**Do you store the full post text?** No. We store a 280-character excerpt of the body plus the title. The full thread always lives on Reddit and you click through to read it.

**What if my brand name is generic (e.g., "Apex" or "Core")?** Use highly specific variants (e.g., "Apex Pizza Montreal", "Core Coffee BC") in the keyword list. Generic single words trigger huge false positive volume.

**Can you remove a Reddit post?** No. We have no admin power on Reddit. Posts can be removed only by the original poster, the subreddit moderators, or Reddit's policy enforcement. We can only observe.`,
    i18n: {
      fr: {
        title: "Surveillance des signaux Reddit (on écoute, vous décidez)",
        excerpt:
          "On interroge les subreddits configurés pour les mentions de marque, on classifie chacune comme positive / neutre / négative, et on fait remonter les items prioritaires. On ne publie pas sur Reddit en votre nom, c'est une règle stricte.",
        body: `## Ce que c'est

Une couche d'écoute passive qui surveille Reddit pour les publications mentionnant votre marque ou vos concurrents, classifie chacune par sentiment, et signale les items les plus susceptibles de nuire à votre réputation si laissés sans réponse. Vous voyez la liste, vous décidez quoi faire.

## Ce que ce n'est PAS

- On ne publie **pas** de réponses sur Reddit en votre nom.
- On ne crée **pas** de comptes qui ressemblent à de vrais utilisateurs.
- On ne vote **pas** sur les fils.
- On ne participe **pas** aux conversations sous aucune persona.

C'est une règle de portée stricte de notre contrat de service. La participation active sur Reddit requiert des relations humaines authentiques et un jugement éditorial qu'une agence ne peut pas simuler sans franchir vers la manipulation. Les utilisateurs Reddit détectent immédiatement le comportement d'agence et les conséquences (bannissements de subreddits, discussions sur la manipulation autour du nom de marque) l'emportent sur tout gain à court terme. Donc on surveille ; la décision de réponse appartient à vous et votre équipe.

## Comment fonctionne la configuration

Dans votre tableau de bord, **Surveillance Reddit**, vous configurez deux pièces :

1. **Subreddits à surveiller** : liste libre. Choisissez les communautés où vos clients passent vraiment du temps. Les restaurants pourraient choisir r/Montreal, r/MontrealFood. Un SaaS pourrait choisir r/saas, r/entrepreneur, r/<votre-niche>. On ne choisit pas automatiquement les subreddits parce que la bonne liste vous est spécifique.
2. **Mots-clés à matcher par subreddit** : votre nom de marque plus 2 à 5 variantes (la façon dont les clients tapent réellement, incluant les fautes de frappe si fréquentes). Incluez optionnellement les noms de concurrents si vous voulez surveiller le partage de voix.

Le sondage tourne sur demande depuis le tableau de bord pour l'instant (un horaire cron arrive plus tard). Un clic exécute tous les mots-clés sur tous les subreddits actifs pour votre tenant. Une exécution typique prend 10 à 30 secondes.

## Ce qui apparaît dans le tableau de bord

Pour chaque correspondance, on stocke et affiche :

- L'URL originale du post Reddit (lien externe en un clic)
- Subreddit, titre, extrait du corps (premiers 280 caractères)
- Nom d'utilisateur de l'auteur
- Compte de votes positifs et compte de commentaires au moment du sondage
- Le mot-clé qui a matché
- Une classification de sentiment (positive / neutre / négative) avec un score de confiance

Les mentions s'affichent en trois groupes dans l'UI :

1. **Attention requise** : négatives récentes (moins d'une semaine) OU négatives à fort vote positif (100+ votes) peu importe l'âge. Celles-ci sont mises en évidence séparément parce que les fils Reddit avec beaucoup de votes positifs se classent dans les résultats de recherche Google et continuent de nuire à la réputation longtemps après qu'ils cessent de recevoir des commentaires actifs.
2. **Mentions récentes** : 100 dernières sur toutes les cibles, ordonnées par date observée.
3. **Compteurs sommaires** : total / positives / négatives / non classifiées.

## Comment le sentiment est classifié

Notre moteur lit le titre et l'extrait du corps du post et produit une des trois étiquettes (positive / neutre / négative) avec un score de confiance de 0 à 1. La classification considère le contexte (sarcasme, langage conditionnel) mais n'est pas parfaite. Environ 5 à 8 pour cent des mentions reçoivent une étiquette qu'un humain rejetterait. Quand vous voyez une erreur de classification, sachez que l'étiquette est un guide, pas une vérité.

## Pourquoi ça compte même si on ne répond pas

Trois raisons de surveiller même sans répondre :

1. **Alerte précoce de crise** : Un fil négatif qui obtient 50 votes positifs en une heure escalade habituellement. L'attraper en moins d'un jour vous permet de décider à l'interne si et comment répondre avant que ça devienne le top résultat Google pour votre nom de marque.
2. **Signal de feedback produit** : Des patterns négatifs récurrents (plusieurs mentions non liées de la même plainte) indiquent un vrai problème qui vaut la peine d'être réglé dans le produit ou les opérations, séparément du problème de visibilité Reddit.
3. **Partage de voix** : Si vous surveillez aussi les noms de concurrents, vous voyez le volume relatif de mentions dans le temps. Un concurrent qui obtient 5 fois plus de mentions Reddit que vous pour la même catégorie de produit est un signal marketing qui mérite enquête.

## Ce que vous faites avec les données

À vous de voir. Les patterns les plus communs qu'on voit :

- **Alerte Slack interne** : copiez l'URL dans votre canal d'équipe, décidez qui répond (fondateur, support, personne).
- **Réponse directe du fondateur** : le fondateur se connecte sur son compte Reddit personnel (pas un compte d'agence, le sien) et répond en sa propre voix.
- **Aucune réponse, juste suivre** : certaines mentions négatives sont mieux laissées tranquilles. S'engager les rend plus visibles. Le suivi vous dit quand même le volume.

On peut conseiller sur la stratégie de réponse dans votre briefing mensuel si vous demandez. On n'écrit pas et n'envoie pas les réponses.

## Questions fréquentes

**À quelle fréquence le système sonde-t-il ?** Sur demande pour l'instant. Vous cliquez "Sonder maintenant" dans le tableau de bord. Un cron planifié est dans la feuille de route.

**Que se passe-t-il si une mention est mal classifiée ?** La classification est informative ; l'action vous appartient peu importe l'étiquette. On n'a pas encore de bouton "corriger l'étiquette" (ça nourrirait notre entraînement de modèle mais introduirait du bruit d'étiquetage).

**Pouvez-vous surveiller les subreddits privés ?** Non. L'API Reddit ne retourne que du contenu public. Les subreddits privés sont invisibles.

**Stockez-vous le texte complet du post ?** Non. On stocke un extrait de 280 caractères du corps plus le titre. Le fil complet vit toujours sur Reddit et vous cliquez pour aller le lire.

**Et si mon nom de marque est générique (ex. "Apex" ou "Core") ?** Utilisez des variantes très spécifiques (ex. "Apex Pizza Montreal", "Core Coffee BC") dans la liste de mots-clés. Les mots simples génériques déclenchent un volume énorme de faux positifs.

**Pouvez-vous retirer un post Reddit ?** Non. On n'a aucun pouvoir admin sur Reddit. Les posts ne peuvent être retirés que par le posteur original, les modérateurs du subreddit, ou l'application des politiques de Reddit. On ne peut qu'observer.`,
      },
    },
  },
  {
    slug: "white-label-executive-pdf-reports",
    title: "White-label executive PDF reports (Agency tier exclusive)",
    excerpt:
      "Monthly one-click PDF that aggregates AI Visibility, AI Traffic, Citations, and Google Business Profile activity. Branded with your logo, name, and color, no AiLys Automation or AiLys branding visible.",
    category: "pricing-plans",
    updatedAt: "2026-04-28",
    readingTimeMin: 3,
    body: `## What it is

A printable, shareable PDF report covering the past calendar month. Single click to generate, downloads instantly to your device. The report carries your logo and brand color in the header, your domain in the footer, and contains zero AiLys Automation or AiLys visible branding (the "white-label" guarantee).

## Who gets it

Agency tier ($2,500 CAD/mo) only. Lower tiers see the report viewer with a paywall and an upgrade CTA.

## How to set up your branding

Open **Settings, Organization** in your dashboard. Look for the **Report branding** section (added once your account is on Agency tier).

- **Logo**: paste a public URL to a PNG or SVG, max 600x200 px recommended. The image must be reachable without authentication; we do not store the image, we link to it.
- **Brand name**: free text, shown next to the logo. Defaults to your account name when blank.
- **Footer URL**: free text shown at the bottom of every page. Usually your website domain. Defaults to a brand-default footer when blank.
- **Accent color**: 6-digit hex code (e.g., #1A3D8F). Used for the header divider, brand name color, and stat numbers. Defaults to neutral gray when blank.

## What the report contains

Always six sections in this order:

1. **Header**: logo + brand name + period label (e.g., "April 2026")
2. **Summary cards**: Share of Model %, AI traffic visits, conversions, citations verified
3. **AI Visibility**: engines probed this period, positive sentiment count, negative sentiment count
4. **AI Traffic by engine**: visit count per engine (chatgpt, perplexity, claude, gemini, copilot, googleaio, etc.)
5. **Citations status**: queued, submitted, verified, rejected counts for the period
6. **GBP activity**: posts published, photos published, questions answered

Optional notes block at the bottom (operator-supplied, not yet wired into the UI). Footer on every page: your footer URL plus page numbers.

## How to generate

1. Open **Reports, Executive report** in your dashboard.
2. The page loads the past month's data automatically (LETTER-format preview rendered in the browser).
3. Verify the numbers look right.
4. Click **Download PDF**. The browser builds the PDF locally and downloads as \`{your-brand}-{YYYY-MM}.pdf\`.

Generation runs entirely in your browser; nothing is uploaded back to our servers during the export step. The data itself is read from your account database in the page load step (not the PDF step).

## What data drives each number

- **Share of Model**: ratio of LLM probes where your brand was mentioned divided by total probes for the period.
- **AI traffic visits**: count of inbound visits with a known AI-engine UTM source or referrer.
- **Conversions**: subset of AI traffic visits flagged as conversions (depends on your conversion call snippet on the site).
- **Citations verified**: rows in the citation tracker with status=verified for the period.
- **Photos published**: rows in the photo upload ledger with month_bucket = report period.
- **Questions answered**: GBP Q&A drafts that posted to Google during the period.

## Why client-side PDF

Two reasons:

1. **Data privacy**: Your account data never crosses our network when the PDF is built; the browser does the rendering. We process the source data on the read query, but the formatting + binary creation is local.
2. **No infrastructure dependency**: Server-side PDF requires Puppeteer or a third-party service (PDFShift, DocRaptor, etc.) that adds cost, latency, and a vendor risk surface. Client-side is deterministic and free per generation.

## Common questions

**Can I customize the section order or hide a section?** Not yet. The template is fixed for this initial ship. Custom layouts are on the roadmap if there is demand.

**Can I export multiple months at once?** Not yet. You generate one month at a time. A "year-end recap" PDF is on the roadmap.

**The download button shows "Building PDF..." for more than 30 seconds**. Likely a slow or large logo URL. Check the logo URL loads in a fresh browser tab in under 2 seconds. Replace with a smaller file if needed.

**Can I see the PDF before downloading?** No preview pane in this version (saves bundle size). Download and open with any PDF reader.

**Can the PDF be auto-emailed monthly?** Not yet. Auto-delivery is on the roadmap (would attach the PDF to a Resend send-from-your-brand email on the first of each month). For now, manual download.

**Where do my old PDFs live?** They do not. We do not archive. Each download is built fresh from current data. To keep a copy, save the file to your own storage after download.`,
    i18n: {
      fr: {
        title: "Rapports PDF exécutifs en marque blanche (exclusif au palier Agency)",
        excerpt:
          "PDF mensuel en un clic qui agrège la visibilité IA, le trafic IA, les citations et l'activité Google Business Profile. Brandé avec votre logo, nom et couleur, sans aucune marque AiLys Automation ou AiLys visible.",
        body: `## Ce que c'est

Un rapport PDF imprimable et partageable couvrant le mois calendaire écoulé. Un clic pour générer, téléchargement instantané sur votre appareil. Le rapport porte votre logo et votre couleur de marque dans l'en-tête, votre domaine dans le pied de page, et ne contient aucune marque AiLys Automation ou AiLys visible (la garantie "marque blanche").

## Qui l'obtient

Palier Agency (2 500 $ CAD/mois) seulement. Les paliers inférieurs voient la vue du rapport avec un paywall et un CTA de bonification.

## Comment configurer votre branding

Ouvrez **Paramètres, Organisation** dans votre tableau de bord. Cherchez la section **Branding du rapport** (ajoutée quand votre compte est au palier Agency).

- **Logo** : collez une URL publique vers un PNG ou SVG, 600x200 px max recommandé. L'image doit être accessible sans authentification ; on ne stocke pas l'image, on la lie.
- **Nom de marque** : texte libre, affiché à côté du logo. Défaut au nom de votre compte si laissé vide.
- **URL du pied de page** : texte libre affiché au bas de chaque page. Habituellement votre domaine web. Défaut à un pied de page par défaut de la marque si laissé vide.
- **Couleur d'accent** : code hex de 6 chiffres (ex. #1A3D8F). Utilisé pour le séparateur d'en-tête, la couleur du nom de marque et les chiffres des stats. Défaut au gris neutre si laissé vide.

## Ce que contient le rapport

Toujours six sections dans cet ordre :

1. **En-tête** : logo + nom de marque + libellé de période (ex. "Avril 2026")
2. **Cartes sommaires** : Part du modèle %, visites de trafic IA, conversions, citations vérifiées
3. **Visibilité IA** : moteurs sondés cette période, compte de sentiment positif, compte de sentiment négatif
4. **Trafic IA par moteur** : compte de visites par moteur (chatgpt, perplexity, claude, gemini, copilot, googleaio, etc.)
5. **Statut des citations** : compte de en attente, soumis, vérifié, rejeté pour la période
6. **Activité GBP** : publications publiées, photos publiées, questions répondues

Bloc optionnel de notes au bas (fourni par l'opérateur, pas encore câblé dans l'UI). Pied de page sur chaque page : votre URL de pied de page plus numéros de page.

## Comment générer

1. Ouvrez **Rapports, Rapport exécutif** dans votre tableau de bord.
2. La page charge automatiquement les données du mois écoulé (aperçu format LETTER rendu dans le navigateur).
3. Vérifiez que les chiffres ont du sens.
4. Cliquez **Télécharger le PDF**. Le navigateur construit le PDF localement et télécharge sous \`{votre-marque}-{YYYY-MM}.pdf\`.

La génération se fait entièrement dans votre navigateur ; rien n'est téléversé vers nos serveurs durant l'étape d'export. Les données elles-mêmes sont lues depuis votre base de compte à l'étape de chargement de la page (pas l'étape PDF).

## Quelles données alimentent chaque chiffre

- **Part du modèle** : ratio des sondes LLM où votre marque a été mentionnée divisé par le total des sondes pour la période.
- **Visites de trafic IA** : compte des visites entrantes avec une source UTM ou référent connu d'un moteur IA.
- **Conversions** : sous-ensemble des visites de trafic IA marquées comme conversions (dépend de votre extrait d'appel de conversion sur le site).
- **Citations vérifiées** : lignes dans le suivi des citations avec statut=vérifié pour la période.
- **Photos publiées** : lignes dans le registre de téléversement de photos avec month_bucket = période du rapport.
- **Questions répondues** : brouillons GBP Q&R qui ont posté sur Google durant la période.

## Pourquoi PDF côté client

Deux raisons :

1. **Confidentialité des données** : Vos données de compte ne traversent jamais notre réseau quand le PDF est construit ; le navigateur fait le rendu. On traite les données source sur la requête de lecture, mais le formatage et la création binaire sont locaux.
2. **Pas de dépendance d'infrastructure** : Le PDF côté serveur requiert Puppeteer ou un service tiers (PDFShift, DocRaptor, etc.) qui ajoute coût, latence, et une surface de risque fournisseur. Côté client est déterministe et gratuit par génération.

## Questions fréquentes

**Puis-je personnaliser l'ordre des sections ou cacher une section ?** Pas encore. Le gabarit est fixe pour cette première mise en service. Les présentations personnalisées sont dans la feuille de route s'il y a de la demande.

**Puis-je exporter plusieurs mois d'un coup ?** Pas encore. Vous générez un mois à la fois. Un PDF "récap de fin d'année" est dans la feuille de route.

**Le bouton téléchargement reste à "Construction du PDF..." plus de 30 secondes.** Probablement une URL de logo lente ou trop volumineuse. Vérifiez que l'URL du logo se charge dans un nouvel onglet en moins de 2 secondes. Remplacez par un fichier plus petit si nécessaire.

**Puis-je voir le PDF avant de télécharger ?** Pas de panneau d'aperçu dans cette version (économise sur la taille du bundle). Téléchargez et ouvrez avec n'importe quel lecteur PDF.

**Le PDF peut-il être envoyé automatiquement par courriel chaque mois ?** Pas encore. La livraison automatique est dans la feuille de route (joindrait le PDF à un courriel Resend envoyé depuis votre marque le premier de chaque mois). Pour l'instant, téléchargement manuel.

**Où vivent mes anciens PDF ?** Ils ne vivent pas. On n'archive pas. Chaque téléchargement est construit à neuf à partir des données actuelles. Pour garder une copie, sauvegardez le fichier dans votre propre stockage après le téléchargement.`,
      },
    },
  },
  {
    slug: "api-access-for-agency-tier",
    title: "API access for Agency-tier accounts",
    excerpt:
      "Programmatic read access to your AI Visibility, AI Traffic, and Citations metrics. Generate keys in the dashboard, hit the public-api endpoint with a Bearer token, 1000 requests per hour per key.",
    category: "pricing-plans",
    updatedAt: "2026-04-28",
    readingTimeMin: 4,
    body: `## What this is

A small REST API that exposes the same numbers you see in your dashboard, in a format your tools can consume. Three endpoints right now (Share of Model, AI Traffic summary, Citations status) per calendar month. JSON output, Bearer token auth, sliding-window rate limit, audit log per call.

## Who gets it

Agency tier ($2,500 CAD/mo) only. Lower tiers see the API keys page with a paywall and an upgrade CTA.

## Generating a key

1. Open **Settings, API keys** in the dashboard.
2. Type a memorable name (e.g., "Looker dashboard", "internal CRM sync", "Jordan's laptop"). The name is for you; we use it to remind you which system holds which key.
3. Click **Generate**. A dialog shows the raw key in monospace, plus a Copy to clipboard button.
4. Copy the key into the system that will use it (env var, secret manager, or one of the integration setups below).
5. Click Done. The dashboard will only show the masked form (e.g., \`rvz_AbCd••••wXyZ\`) from now on. We never see the raw key again.

If you lose the key, generate a new one and revoke the old. Lost keys cannot be recovered.

## Authentication

Every request needs:

\`\`\`
Authorization: Bearer rvz_<your-key>
\`\`\`

Format check happens before the database lookup, so malformed keys (missing prefix, wrong length) fail fast with 401. After format passes, we look up the prefix (first 12 chars) in the active keys table and verify the SHA-256 hash of the full key matches what is stored. Constant-time-equivalent comparison, no leak via early-return.

## Endpoints

All endpoints accept an optional \`?period=YYYY-MM\` query parameter. If absent, the period defaults to the last completed UTC month. Periods earlier than 36 months ago return 200 with empty arrays (no historical re-fetch).

### GET /v1/visibility/share-of-model

Returns the LLM probe summary for the period.

\`\`\`json
{
  "period": "2026-04",
  "total_probes": 138,
  "brand_mentioned": 47,
  "share_of_model": 0.341,
  "positive": 32,
  "negative": 6,
  "engines_probed": 6
}
\`\`\`

### GET /v1/traffic/summary

Returns inbound visit counts attributed to AI search engines.

\`\`\`json
{
  "period": "2026-04",
  "total_visits": 1284,
  "conversions": 41,
  "by_engine": [
    { "engine": "chatgpt", "visits": 612 },
    { "engine": "perplexity", "visits": 281 },
    { "engine": "claude", "visits": 205 },
    { "engine": "google_aio", "visits": 186 }
  ]
}
\`\`\`

### GET /v1/citations/status

Returns the citation tracker rollup.

\`\`\`json
{
  "period": "2026-04",
  "total": 18,
  "counts": {
    "queued": 3,
    "submitted": 6,
    "verified": 8,
    "rejected": 1
  }
}
\`\`\`

## Rate limit

1000 requests per hour per key, sliding window. The server tracks every call in an audit log, and the count is the number of requests by the same key in the last 3600 seconds. Going over returns:

\`\`\`json
{ "error": "Rate limit 1000/hour exceeded" }
\`\`\`

with HTTP 429. The response includes:

\`\`\`
X-RateLimit-Window: 3600
X-RateLimit-Max: 1000
\`\`\`

Need more headroom? Email your strategist; we can raise the limit per key with a written record.

## Scopes

Each key has a \`scopes\` array. Default scopes for new keys: \`read:visibility\`, \`read:traffic\`, \`read:citations\`. To restrict a key to a single endpoint (recommended for shared dashboards), email your strategist with the key prefix and the scope subset you want.

If a key calls an endpoint outside its scopes, the response is 403:

\`\`\`json
{ "error": "Missing scope read:traffic" }
\`\`\`

## Revoking

In **Settings, API keys**, click the trash icon on any active row, confirm. The key is set to \`revoked_at = now()\` and stops working immediately. Revocation is permanent; create a new key to replace it.

## Auditing

The dashboard shows the last 50 invocations across all keys for your tenant. Each row: timestamp, method, endpoint, HTTP status (color-coded), response time in ms. The same data lives in \`api_request_log\` for the past 90 days, indexed for fast queries. Older rows roll off automatically.

For long-term archival, hit the API itself and store the responses on your end.

## Common questions

**Can I write data via the API?** Not yet. Read-only for the initial release. Write endpoints (e.g., trigger a Reddit poll) are on the roadmap if there is demand.

**Can I get raw data instead of summaries?** Not yet. The summaries cover the use cases we have heard so far. If you need raw rows, email your strategist with the use case.

**Is there a webhook variant?** Not yet. Pull-only for now. Webhooks for "negative Reddit mention detected" are on the roadmap.

**Where is the OpenAPI spec?** Coming. The endpoints are stable but we have not generated the spec file yet. Use this article as the contract until then.

**Can I share a key with a teammate?** Better to give them their own dashboard login (Settings, Members, Invite) and have them generate a personal key. Shared keys complicate revocation.

**What happens if my account moves between tiers?** API keys are tier-gated. Going from Agency back to Growth disables existing keys (they 401 with "Tier downgraded"). Going from Growth back to Agency does NOT auto-restore old keys; revoke and create new ones.`,
    i18n: {
      fr: {
        title: "Accès API pour les comptes au palier Agency",
        excerpt:
          "Accès programmatique en lecture à vos métriques de visibilité IA, trafic IA et citations. Générez les clés dans le tableau de bord, frappez le endpoint public-api avec un jeton Bearer, 1000 requêtes par heure par clé.",
        body: `## Ce que c'est

Une petite API REST qui expose les mêmes chiffres que vous voyez dans votre tableau de bord, dans un format que vos outils peuvent consommer. Trois endpoints pour l'instant (Part du modèle, sommaire de trafic IA, statut des citations) par mois calendaire. Sortie JSON, auth par jeton Bearer, limite de débit en fenêtre glissante, journal d'audit par appel.

## Qui l'obtient

Palier Agency (2 500 $ CAD/mois) seulement. Les paliers inférieurs voient la page des clés API avec un paywall et un CTA de bonification.

## Générer une clé

1. Ouvrez **Paramètres, Clés API** dans le tableau de bord.
2. Tapez un nom mémorable (ex. "Tableau de bord Looker", "sync CRM interne", "portable de Jordan"). Le nom est pour vous ; on l'utilise pour vous rappeler quel système détient quelle clé.
3. Cliquez **Générer**. Une fenêtre affiche la clé brute en monospace, plus un bouton Copier dans le presse-papiers.
4. Copiez la clé dans le système qui l'utilisera (variable d'environnement, gestionnaire de secrets, ou une des configurations d'intégration ci-dessous).
5. Cliquez Terminé. Le tableau de bord n'affichera que la forme masquée (ex. \`rvz_AbCd••••wXyZ\`) à partir de maintenant. On ne voit plus jamais la clé brute.

Si vous perdez la clé, générez-en une nouvelle et révoquez l'ancienne. Les clés perdues ne peuvent pas être récupérées.

## Authentification

Chaque requête a besoin de :

\`\`\`
Authorization: Bearer rvz_<votre-clé>
\`\`\`

La vérification de format se fait avant la recherche en base, donc les clés malformées (préfixe manquant, mauvaise longueur) échouent rapidement avec 401. Après le passage du format, on cherche le préfixe (12 premiers caractères) dans la table des clés actives et on vérifie que le hash SHA-256 de la clé complète correspond à ce qui est stocké. Comparaison équivalent à temps constant, aucune fuite par retour anticipé.

## Endpoints

Tous les endpoints acceptent un paramètre optionnel \`?period=YYYY-MM\`. S'il est absent, la période défaut au dernier mois UTC complet. Les périodes plus de 36 mois en arrière retournent 200 avec des tableaux vides (pas de re-récupération historique).

### GET /v1/visibility/share-of-model

Retourne le sommaire des sondes LLM pour la période.

\`\`\`json
{
  "period": "2026-04",
  "total_probes": 138,
  "brand_mentioned": 47,
  "share_of_model": 0.341,
  "positive": 32,
  "negative": 6,
  "engines_probed": 6
}
\`\`\`

### GET /v1/traffic/summary

Retourne les comptes de visites entrantes attribuées aux moteurs de recherche IA.

\`\`\`json
{
  "period": "2026-04",
  "total_visits": 1284,
  "conversions": 41,
  "by_engine": [
    { "engine": "chatgpt", "visits": 612 },
    { "engine": "perplexity", "visits": 281 },
    { "engine": "claude", "visits": 205 },
    { "engine": "google_aio", "visits": 186 }
  ]
}
\`\`\`

### GET /v1/citations/status

Retourne le sommaire du suivi des citations.

\`\`\`json
{
  "period": "2026-04",
  "total": 18,
  "counts": {
    "queued": 3,
    "submitted": 6,
    "verified": 8,
    "rejected": 1
  }
}
\`\`\`

## Limite de débit

1000 requêtes par heure par clé, fenêtre glissante. Le serveur suit chaque appel dans un journal d'audit, et le compte est le nombre de requêtes par la même clé dans les dernières 3600 secondes. Dépasser retourne :

\`\`\`json
{ "error": "Rate limit 1000/hour exceeded" }
\`\`\`

avec HTTP 429. La réponse inclut :

\`\`\`
X-RateLimit-Window: 3600
X-RateLimit-Max: 1000
\`\`\`

Besoin de plus de marge ? Envoyez un courriel à votre stratège ; on peut élever la limite par clé avec une trace écrite.

## Portées (scopes)

Chaque clé a un tableau \`scopes\`. Portées par défaut pour les nouvelles clés : \`read:visibility\`, \`read:traffic\`, \`read:citations\`. Pour restreindre une clé à un seul endpoint (recommandé pour les tableaux de bord partagés), envoyez un courriel à votre stratège avec le préfixe de la clé et le sous-ensemble de portées que vous voulez.

Si une clé appelle un endpoint hors de ses portées, la réponse est 403 :

\`\`\`json
{ "error": "Missing scope read:traffic" }
\`\`\`

## Révocation

Dans **Paramètres, Clés API**, cliquez sur l'icône poubelle de n'importe quelle ligne active, confirmez. La clé est mise à \`revoked_at = now()\` et cesse de fonctionner immédiatement. La révocation est permanente ; créez une nouvelle clé pour remplacer.

## Audit

Le tableau de bord montre les 50 dernières invocations sur toutes les clés de votre tenant. Chaque ligne : horodatage, méthode, endpoint, statut HTTP (codé par couleur), temps de réponse en ms. Les mêmes données vivent dans \`api_request_log\` pour les 90 derniers jours, indexées pour des requêtes rapides. Les lignes plus anciennes roulent automatiquement.

Pour de l'archivage à long terme, frappez l'API elle-même et stockez les réponses de votre côté.

## Questions fréquentes

**Puis-je écrire des données via l'API ?** Pas encore. Lecture seule pour la sortie initiale. Les endpoints d'écriture (ex. déclencher un sondage Reddit) sont dans la feuille de route s'il y a de la demande.

**Puis-je obtenir des données brutes au lieu de sommaires ?** Pas encore. Les sommaires couvrent les cas d'usage qu'on a entendus jusqu'ici. Si vous avez besoin de lignes brutes, envoyez un courriel à votre stratège avec le cas d'usage.

**Y a-t-il une variante webhook ?** Pas encore. Pull seulement pour l'instant. Les webhooks pour "mention Reddit négative détectée" sont dans la feuille de route.

**Où est la spec OpenAPI ?** À venir. Les endpoints sont stables mais on n'a pas encore généré le fichier de spec. Utilisez cet article comme contrat jusque-là.

**Puis-je partager une clé avec un coéquipier ?** Mieux vaut leur donner leur propre login au tableau de bord (Paramètres, Membres, Inviter) et les laisser générer une clé personnelle. Les clés partagées compliquent la révocation.

**Que se passe-t-il si mon compte change de palier ?** Les clés API sont liées au palier. Passer d'Agency à Growth désactive les clés existantes (elles retournent 401 avec "Tier downgraded"). Passer de Growth à Agency ne restaure PAS automatiquement les anciennes clés ; révoquez et créez-en de nouvelles.`,
      },
    },
  },
  {
    slug: "crisis-early-warning-alerts",
    title: "Crisis early warning alerts (what we detect, when we email)",
    excerpt:
      "Four detection rules running across your reputation signals. Warning alerts surface in the dashboard. Critical alerts also email you. You decide and dismiss with a reason for audit.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-28",
    readingTimeMin: 4,
    body: `## What this is

A small set of threshold rules that watch your reputation signals (Reddit, AI Visibility, citations, reviews) and surface anomalies before they become full crises. Two severity levels: warning (dashboard only) and critical (dashboard + email to the operator).

## What we detect

### 1. Negative sentiment spike (Reddit)
24h count vs 30-day baseline. Warning at 3+ AND 3x baseline; critical at 5x baseline AND 10+ absolute.

### 2. AI Visibility drop (Share of Model)
This week vs previous week. Warning at 25% relative drop; critical at 50%.

### 3. Citation churn
Delisted in last 30 days. Warning at 2-4; critical at 5+.

### 4. Review bomb
Last hour vs 30-day hourly baseline. Warning at 5+ AND 3x; critical at 15+ OR 10x.

## How detection runs

On demand from the **Alerts center** dashboard. Click **Run detection**, the function pulls counts and inserts new alerts. Re-running the same day does not duplicate (fingerprint dedup).

## Critical alerts get an email

Sender: noreply@ailysagency.ca (AiLys-managed) or noreply@reviuzy.com (self-serve). Subject "[CRITICAL] {brand} reputation alert: {kind}". One email per kind per detection run.

## Dismissing

Click Dismiss in the dashboard, optional reason for audit (max 500 chars). Same anomaly persisting into next day fires a NEW alert with new fingerprint, by design.

## What we do NOT do

- No auto-reply to negative reviews
- No auto-Reddit reply
- No auto-citation dispute
- No IP block during review bomb (Domain Shield handles that separately)

Crisis response is judgment. We surface; you respond.

## FAQ

**Threshold tuning?** Not via UI yet. Contact strategist for per-tenant overrides.

**False positives?** Inherent to threshold detection. Dismissal-with-reason is the safety valve; we tune over time.

**Slack alerts?** On the roadmap.`,
    i18n: {
      fr: {
        title: "Alertes d'avertissement précoce de crise",
        excerpt:
          "Quatre règles de détection sur vos signaux de réputation. Les alertes d'avertissement apparaissent dans le tableau de bord. Les alertes critiques vous envoient aussi un courriel.",
        body: `## Ce que c'est

Des règles à seuil qui surveillent vos signaux de réputation (Reddit, visibilité IA, citations, avis) et font remonter les anomalies avant qu'elles deviennent des crises. Deux niveaux : avertissement (tableau de bord seul) et critique (tableau de bord + courriel).

## Ce qu'on détecte

### 1. Pic de sentiment négatif (Reddit)
24 h vs base 30 jours. Avertissement à 3+ ET 3x base ; critique à 5x base ET 10+ absolu.

### 2. Chute de visibilité IA (Part du modèle)
Cette semaine vs précédente. Avertissement à 25 % de chute ; critique à 50 %.

### 3. Perte de citations
Délistées dans les 30 derniers jours. Avertissement 2-4 ; critique 5+.

### 4. Bombardement d'avis
Dernière heure vs base horaire 30 jours. Avertissement 5+ ET 3x ; critique 15+ OU 10x.

## Comment la détection tourne

Sur demande depuis le **Centre d'alertes**. Cliquez **Lancer la détection**. Re-lancer le même jour ne duplique pas (déduplication par empreinte).

## Les alertes critiques envoient un courriel

Expéditeur : noreply@ailysagency.ca (géré par AiLys) ou noreply@reviuzy.com (libre-service). Sujet "[CRITICAL] {marque} reputation alert: {kind}". Un courriel par kind par exécution.

## Rejeter

Cliquez Rejeter, raison optionnelle pour audit (max 500 caractères). La même anomalie qui persiste au jour suivant déclenche une NOUVELLE alerte avec nouvelle empreinte, par design.

## Ce qu'on ne fait PAS

- Pas de réponse automatique aux avis négatifs
- Pas de réponse automatique sur Reddit
- Pas de dispute automatique des citations
- Pas de blocage IP pendant un bombardement (Domain Shield gère ça séparément)

La réponse de crise est un jugement. On fait remonter ; vous répondez.

## Questions fréquentes

**Ajustement des seuils ?** Pas via UI encore. Contactez le stratège pour des dépassements par tenant.

**Faux positifs ?** Inhérent à la détection à seuil. Le rejet-avec-raison est la soupape ; on ajuste avec le temps.

**Alertes Slack ?** Dans la feuille de route.`,
      },
    },
  },
  {
    slug: "how-the-visibility-dashboard-works",
    title: "How the visibility dashboard works",
    excerpt:
      "A daily snapshot of your Google Search Console keyword rankings plus AI engine citations, in one client-facing dashboard. Tier-gated keyword limits and history window. No surprise data, no live calls.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-04-28",
    readingTimeMin: 5,
    body: `## What this is

Two cards over time, in one place:

1. **Google ranking evolution** for the keywords your site already ranks for, pulled from your Google Search Console property each day.
2. **LLM citation summary** across six AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overview, Bing Copilot), aggregated from the visibility probes we run for you.

The dashboard reads daily snapshots, not live API calls. So loading is fast and there is no risk of a third-party outage taking down your view.

## Setup, once

1. Go to **Settings > Organization > Connected Google Accounts**.
2. Connect Google if you have not already (this also covers Business Profile).
3. Click **Set GSC Property** on the connected account row, pick the Search Console property that matches this organization, save.
4. Open **Visibility dashboard** and click **Sync rankings** once to backfill.

The sync also runs daily on its own. You only click Sync rankings when you want a same-day refresh.

## What the rankings card shows

- One line per selected keyword: average daily position from Search Console.
- Y axis is reversed because position 1 is the goal: higher up the chart is better.
- The keyword picker lists every keyword your site received impressions for in the time window.

## What the citations card shows

For each of the six AI engines:

- **Mention rate**: how often your brand was mentioned across all probes that ran in the window.
- **Avg position**: when mentioned, the typical place in the answer (1 is best).
- **Trend**: last 7 days vs the prior 7 days. Up arrow if mentions improved, down arrow if they slipped.

## Tier limits

| Tier | Keywords | History | Competitor overlay |
|---|---|---|---|
| Starter | 10 | 30 days | no |
| Core / Pro | 50 | 90 days | no |
| Growth | 200 | 180 days | yes |
| Agency / Max | unlimited (capped 500) | 12 months | yes |

The hard ceiling of 500 keywords per organization keeps the daily sync fast for everybody.

## What we do NOT do

- We do not invent keywords. The Google card shows what your site actually receives impressions for. To track keywords you do not yet rank for, ask your strategist about gap analysis (separate workflow).
- We do not paraphrase or hide your raw query. The query text stays in the underlying probe table. Only a hash lives in the snapshot table that drives the chart.
- We do not push notifications based on rank movement here. Crisis early warning alerts (Phase 10) handle critical drops separately.

## FAQ

**Why does my rank look different from what I see in incognito?** Search Console reports averages, weighted by impressions across all your users in that period. Manual incognito checks are point samples, often biased toward your default location and language.

**Can I export this?** Yes. The PDF executive report (Agency tier) now includes a Search visibility section with top keywords and the engine summary.

**How often does the data refresh?** GSC reports lag 2 to 3 days, so the daily sync pulls "ending two days ago". The LLM citations refresh whenever an AI Visibility run completes, or on demand via the Refresh citations button.`,
    i18n: {
      fr: {
        title: "Comment fonctionne le tableau de bord de visibilité",
        excerpt:
          "Un instantané quotidien de vos positions Google Search Console et de vos citations sur les moteurs IA, dans un seul tableau de bord client. Limites par palier et fenêtre d'historique. Pas de données surprises, pas d'appels en direct.",
        body: `## Ce que c'est

Deux cartes dans le temps, en un seul endroit :

1. **Évolution du classement Google** pour les mots-clés où votre site se classe déjà, tirés chaque jour de votre propriété Google Search Console.
2. **Résumé de citations IA** sur six moteurs (ChatGPT, Perplexity, Claude, Gemini, Google AI Overview, Bing Copilot), agrégé des sondes de visibilité qu'on lance pour vous.

Le tableau lit des instantanés quotidiens, pas des appels en direct. Le chargement est rapide et une panne tierce ne prive pas votre affichage.

## Configuration, une seule fois

1. Allez dans **Paramètres > Organisation > Comptes Google connectés**.
2. Connectez Google si ce n'est pas fait (couvre aussi Business Profile).
3. Cliquez **Définir propriété GSC** sur la ligne du compte connecté, choisissez la propriété Search Console qui correspond à cette organisation, enregistrez.
4. Ouvrez **Tableau de bord de visibilité** et cliquez **Sync rankings** une fois pour préremplir.

La synchronisation tourne aussi quotidiennement seule. Vous ne cliquez Sync que si vous voulez une mise à jour le jour même.

## Ce que la carte rankings montre

- Une ligne par mot-clé sélectionné : position moyenne quotidienne via Search Console.
- L'axe Y est inversé puisque la position 1 est l'objectif : plus haut sur le graphique, c'est mieux.
- Le sélecteur de mots-clés liste tous ceux qui ont reçu des impressions dans la fenêtre.

## Ce que la carte citations montre

Pour chacun des six moteurs IA :

- **Taux de mention** : à quelle fréquence votre marque a été citée sur l'ensemble des sondes lancées dans la fenêtre.
- **Position moyenne** : quand mentionnée, la place typique dans la réponse (1 est le mieux).
- **Tendance** : 7 derniers jours vs 7 jours précédents. Flèche vers le haut si les mentions s'améliorent, vers le bas si elles glissent.

## Limites par palier

| Palier | Mots-clés | Historique | Surimpression concurrents |
|---|---|---|---|
| Starter | 10 | 30 jours | non |
| Core / Pro | 50 | 90 jours | non |
| Growth | 200 | 180 jours | oui |
| Agency / Max | illimité (plafond 500) | 12 mois | oui |

Le plafond de 500 mots-clés par organisation garde la synchronisation quotidienne rapide pour tous.

## Ce qu'on ne fait PAS

- On n'invente pas de mots-clés. La carte Google montre ce que votre site reçoit réellement comme impressions. Pour suivre des mots-clés où vous ne vous classez pas encore, demandez à votre stratège l'analyse d'écart (workflow séparé).
- On ne paraphrase pas et on ne cache pas votre requête brute. Le texte de la requête reste dans la table de sondes en dessous. Seul un hachage vit dans la table d'instantanés qui alimente le graphique.
- On ne pousse pas de notifications de mouvement de rang ici. Les alertes d'avertissement précoce (Phase 10) gèrent séparément les chutes critiques.

## Questions fréquentes

**Pourquoi mon rang est-il différent de ce que je vois en navigation privée ?** Search Console rapporte des moyennes pondérées par impressions sur l'ensemble de vos utilisateurs dans la période. Les vérifications privées sont des échantillons ponctuels, souvent biaisés vers votre lieu et langue par défaut.

**Puis-je exporter ?** Oui. Le rapport PDF exécutif (palier Agency) inclut maintenant une section visibilité avec mots-clés du haut et résumé par moteur.

**À quelle fréquence les données se rafraîchissent ?** GSC accuse un retard de 2 à 3 jours, donc la synchronisation quotidienne tire "se terminant il y a deux jours". Les citations IA se rafraîchissent quand une exécution AI Visibility se termine, ou à la demande via le bouton Refresh citations.`,
      },
    },
  },
  {
    slug: "gbp-auto-publish-explained",
    title: "How GBP reply auto-publish works (Agency tier)",
    excerpt:
      "On the Agency tier, high-confidence Q&A reply drafts can publish automatically without operator approval. Here is the gate that decides, and the safety belt that catches anything risky.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

When a customer asks a question on your Google Business Profile, our AiLys engine drafts a reply (covered in the GBP Q&A monitoring article). On the Agency tier, drafts that score high enough on our internal confidence scale and carry zero risk markers can publish to Google without waiting for an operator to click Approve. Lower-scoring drafts and anything flagged as risky still go through the manual queue.

This is opt-in per workspace. Auto-publish stays OFF until you (or your strategist) flips it on in Settings. You can flip it OFF at any time and the next draft routes back to manual.

## When a draft auto-publishes

A draft auto-publishes only if EVERY one of these is true:

1. Your workspace has auto-publish ON
2. Your tier is Agency (Starter, Core, Growth always queue manually)
3. Our engine returned a confidence score of 0.92 or higher (configurable per workspace, between 0.50 and 1.00)
4. The draft has no risk markers attached

If any one is false, the draft routes to the manual queue and the audit log records exactly which gate blocked it. You will see the reason in the GBP Q&A manager.

## Risk markers

Our engine flags a draft with a risk marker when it sees something that benefits from a human read. The markers we use:

- **contains_legal_term**: any reference to contracts, warranties, refunds, or regulations
- **references_pricing**: any mention of dollar amounts, percentages, "discount", "free"
- **mentions_competitor**: names another business by brand
- **contains_promise**: words like "guarantee", "we will", "always", "never"
- **ambiguous_question**: the customer's question itself was unclear

Any one of these markers caps the effective confidence at 0.85, which is below the default 0.92 floor. Drafts with markers always queue manually, regardless of how confident the engine is.

## What you see in the dashboard

Every draft in your GBP Q&A manager now shows:

- The confidence score (0.00 to 1.00)
- Any risk markers (as small chips)
- The auto-publish decision (auto_published, queued_low_confidence, queued_risk_factors, queued_tier_below_agency, queued_tenant_disabled)

Drafts that auto-published carry a green "Auto" badge and a timestamp.

## Reversal window

If a draft auto-publishes and you want it pulled, you have a 24-hour window to reverse it from the dashboard. Click Reverse, optionally type a reason, and we delete the reply from Google. The audit log keeps both the original publish and the reversal so the trail stays clean.

After 24 hours, the reply stays public and you would manage it through the normal "edit posted reply" flow if you want to change wording.

## Safety properties

- The decision runs server-side. The browser cannot tell the API to "auto-publish anyway" by tampering with a request.
- The tier check is enforced server-side against your workspace's saved tier, not against any client-supplied value.
- The kill switch is two-layer: the per-workspace toggle plus a system-wide flag that operators can flip in case of an upstream issue.
- Every auto-publish event writes to the audit trail with full inputs (confidence, risk markers, threshold, tier).

## When NOT to enable this

- If your team prefers to read every reply before it goes live (some agencies on the Agency tier still want manual approval for brand reasons)
- During the first 30 days while you calibrate threshold and review marker quality
- For workspaces in heavily regulated verticals (legal, medical, financial) where every word matters

You can pause auto-publish at any time without losing the queue.

## Asking your strategist

If you are unsure whether to enable auto-publish, your dedicated strategist (Growth and Agency tiers) can review the last 30 drafts with you, look at confidence distribution, and recommend a threshold. The default 0.92 is conservative; some workspaces set 0.95 for extra caution and some set 0.88 once they trust the calibration.`,
    i18n: {
      fr: {
        title: "Comment fonctionne la publication automatique des réponses GBP (palier Agency)",
        excerpt:
          "Au palier Agency, les brouillons de réponses Q&R de haute confiance peuvent être publiés automatiquement sans approbation d'un opérateur. Voici la barrière de décision et la ceinture de sécurité qui attrape tout ce qui est risqué.",
        body: `## De quoi s'agit-il

Quand un client pose une question sur votre fiche Google Business, notre moteur AiLys rédige un brouillon de réponse (voir l'article sur la surveillance Q&R GBP). Au palier Agency, les brouillons qui obtiennent un score de confiance assez élevé et qui ne portent aucun marqueur de risque peuvent être publiés sur Google sans attendre qu'un opérateur clique Approuver. Les brouillons à score plus bas et tout ce qui est marqué comme risqué passent toujours par la file manuelle.

C'est optionnel par espace de travail. La publication automatique reste désactivée tant que vous (ou votre stratège) ne l'activez pas dans les paramètres. Vous pouvez la désactiver à tout moment et le prochain brouillon repart vers la file manuelle.

## Quand un brouillon est publié automatiquement

Un brouillon n'est publié automatiquement que si TOUTES ces conditions sont vraies :

1. Votre espace de travail a la publication automatique activée
2. Votre palier est Agency (Starter, Core, Growth font toujours la file manuelle)
3. Notre moteur a retourné un score de confiance de 0,92 ou plus (configurable par espace, entre 0,50 et 1,00)
4. Le brouillon n'a aucun marqueur de risque

Si l'une est fausse, le brouillon va à la file manuelle et le journal d'audit enregistre exactement quelle barrière a bloqué. Vous verrez la raison dans le gestionnaire Q&R GBP.

## Marqueurs de risque

Notre moteur marque un brouillon quand il voit quelque chose qui mérite une lecture humaine. Les marqueurs que nous utilisons :

- **contains_legal_term** : toute référence à un contrat, garantie, remboursement, ou réglementation
- **references_pricing** : toute mention de montant, pourcentage, "rabais", "gratuit"
- **mentions_competitor** : nomme une autre entreprise par sa marque
- **contains_promise** : mots comme "garantie", "nous allons", "toujours", "jamais"
- **ambiguous_question** : la question du client était elle-même peu claire

Tout marqueur plafonne la confiance effective à 0,85, ce qui est sous le plancher par défaut de 0,92. Les brouillons avec marqueurs vont toujours à la file manuelle, peu importe la confiance du moteur.

## Ce que vous voyez dans le tableau de bord

Chaque brouillon dans votre gestionnaire Q&R GBP affiche maintenant :

- Le score de confiance (0,00 à 1,00)
- Tout marqueur de risque (en petites pastilles)
- La décision de publication automatique (auto_published, queued_low_confidence, queued_risk_factors, queued_tier_below_agency, queued_tenant_disabled)

Les brouillons publiés automatiquement portent une pastille verte "Auto" et un horodatage.

## Fenêtre de réversion

Si un brouillon est publié automatiquement et que vous voulez le retirer, vous avez 24 heures pour le révoquer depuis le tableau de bord. Cliquez Révoquer, écrivez optionnellement une raison, et nous supprimons la réponse de Google. Le journal d'audit garde la publication initiale et la réversion pour que la piste reste propre.

Après 24 heures, la réponse reste publique et vous la géreriez via le flux normal "modifier réponse publiée" pour changer le texte.

## Propriétés de sécurité

- La décision tourne côté serveur. Le navigateur ne peut pas demander à l'API "publier quand même" en altérant une requête.
- Le contrôle de palier est appliqué côté serveur contre le palier sauvegardé de votre espace, pas contre une valeur fournie par le client.
- Le coupe-circuit a deux couches : la bascule par espace plus un drapeau système que les opérateurs peuvent activer en cas de problème en amont.
- Chaque publication automatique écrit dans la piste d'audit avec toutes les entrées (confiance, marqueurs de risque, seuil, palier).

## Quand NE PAS activer

- Si votre équipe préfère lire chaque réponse avant qu'elle ne soit publiée (certaines agences au palier Agency veulent encore l'approbation manuelle pour des raisons de marque)
- Pendant les 30 premiers jours, le temps de calibrer le seuil et de vérifier la qualité des marqueurs
- Pour des espaces dans des secteurs très réglementés (juridique, médical, financier) où chaque mot compte

Vous pouvez mettre la publication automatique en pause à tout moment sans perdre la file.

## Demander à votre stratège

Si vous hésitez, votre stratège dédié (paliers Growth et Agency) peut revoir les 30 derniers brouillons avec vous, examiner la distribution de confiance et recommander un seuil. La valeur par défaut de 0,92 est prudente ; certains espaces fixent 0,95 pour plus de prudence et d'autres descendent à 0,88 une fois qu'ils font confiance à l'étalonnage.`,
      },
    },
  },
  {
    slug: "anomaly-alerts-and-auto-fix",
    title: "How crisis early warning alerts and one-click auto-fix work",
    excerpt:
      "When something goes wrong (rating drop, citation churn, fake review wave), we email the alert with a one-click auto-fix button. Here is what each fix does and how the safety controls work.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

Our crisis early warning system (covered in the original anomaly-alerts article) watches for four anomaly classes: negative-sentiment spikes on Reddit, AI Visibility drops, citation delistings, and review-bomb patterns. When one fires for your workspace, we email the contact on file. On the Agency tier with auto-remediation enabled, the email now carries a one-click button that runs the appropriate fix.

This is opt-in. Auto-remediation stays OFF until your workspace owner enables it. The email reverts to a notification-only format with that switch off.

## What each fix does

| Anomaly class | Auto-fix | What runs in the background |
|---|---|---|
| Negative sentiment spike on Reddit | Queue a review-velocity boost | We schedule a batch of review-prompt sends to recent positive customers, dilution-style |
| AI Visibility drop | Resubmit dropped citations | We re-queue your top-tier citations to be re-submitted on the next cycle |
| Citation churn | Resubmit dropped citations | Same as above but scoped to the specific delisted directories |
| Review bomb | Compile fake-review evidence | We assemble the evidence packet (review IDs, dates, posting patterns) for your strategist to file with Google |

None of the four fixes touches public-facing content directly. The fix queues work that an operator and our existing daily workflows pick up. This is by design: even with auto-fix enabled, a human is in the loop before anything publishes.

## How the one-click button works (security)

The auto-fix button in the email is a signed link. Specifically:

1. When the alert fires, our backend mints a one-time token (UUID) and signs it with HMAC-SHA256 against a server-only secret
2. The signed link includes the token id and an expiry timestamp (24 hours from issue)
3. Clicking the link verifies the signature server-side, in constant time, against the secret
4. If the signature checks out and the expiry is in the future and the token has not been used: we mark the token "applied" atomically (so a double-click only succeeds once) and run the fix
5. If anything fails (signature mismatch, expired, already used): the link returns an error page and the fix does not run

## What you see if you click an expired or already-used link

A short page that says either "this link has expired, please open the alert in your dashboard to re-issue" or "this link has already been used, here is the result of that previous click". No fix runs twice.

## Audit trail

Every issued token, click, success, and failure writes a row to your workspace audit log. Owners and admins can see the full log in the admin pipeline view. AiLys strategists assigned to the workspace can also see it.

The log is append-only. We never delete or rewrite a remediation row.

## Kill switches

Two layers, both reversible:

- **Per workspace**: an owner toggles auto_remediate_enabled in Settings. With it OFF, alert emails revert to notification-only.
- **System-wide**: operators flip the system flag if a downstream issue shows up. With it OFF, no new tokens issue regardless of workspace settings; existing tokens still verify if clicked within their 24h window.

## What we do NOT do

- We do not auto-publish anything to your Google profile via this flow. That path is the GBP auto-publish gate, which is a separate feature.
- We do not auto-charge or auto-modify your billing. Stripe stays under direct operator and owner control.
- We do not re-run the auto-fix automatically. One token = one click = one apply. If you need to retry, request a fresh token from the dashboard.

## When to enable

- After 30 days on the platform when you have seen a few alerts and decided you trust the routing
- When your team is too small to handle every alert manually within a few hours
- When operating across multiple time zones and you want fixes to start running before the next operator shift

Your strategist can walk through the last 90 days of alerts with you and decide together.`,
    i18n: {
      fr: {
        title: "Comment fonctionnent les alertes d'avertissement précoce et la correction automatique en un clic",
        excerpt:
          "Quand quelque chose tourne mal (chute de note, churn de citations, vague de faux avis), nous envoyons l'alerte avec un bouton de correction automatique en un clic. Voici ce que chaque correction fait et comment les contrôles de sécurité fonctionnent.",
        body: `## De quoi s'agit-il

Notre système d'avertissement précoce (couvert dans l'article original sur les alertes d'anomalie) surveille quatre classes d'anomalies : pics de sentiment négatif sur Reddit, chutes de l'AI Visibility, désinscriptions de citations, et patrons de bombes d'avis. Quand l'une se déclenche pour votre espace de travail, nous envoyons un courriel au contact en dossier. Au palier Agency avec auto-remédiation activée, le courriel porte maintenant un bouton de correction en un clic qui exécute la correction appropriée.

C'est optionnel. L'auto-remédiation reste désactivée tant que le propriétaire de l'espace ne l'active pas. Le courriel revient à un format notification seulement avec cet interrupteur désactivé.

## Ce que chaque correction fait

| Classe d'anomalie | Correction automatique | Ce qui tourne en arrière-plan |
|---|---|---|
| Pic de sentiment négatif sur Reddit | Mettre en file un coup de pouce de vélocité d'avis | Nous programmons un lot d'invitations d'avis aux clients positifs récents, par dilution |
| Chute de l'AI Visibility | Resoumettre les citations perdues | Nous remettons en file vos citations principales pour resoumission au prochain cycle |
| Churn de citations | Resoumettre les citations perdues | Pareil mais ciblé aux annuaires spécifiques désinscrits |
| Bombe d'avis | Compiler les preuves de faux avis | Nous assemblons le dossier de preuves (IDs des avis, dates, patrons) pour que votre stratège dépose la plainte auprès de Google |

Aucune des quatre corrections ne touche le contenu public directement. La correction met en file du travail qu'un opérateur et nos flux quotidiens existants ramassent. C'est voulu : même avec l'auto-correction activée, un humain est dans la boucle avant toute publication.

## Comment le bouton en un clic fonctionne (sécurité)

Le bouton de correction dans le courriel est un lien signé. Précisément :

1. Quand l'alerte se déclenche, notre backend forge un jeton à usage unique (UUID) et le signe avec HMAC-SHA256 contre un secret côté serveur seulement
2. Le lien signé inclut l'ID du jeton et un horodatage d'expiration (24 heures depuis l'émission)
3. Cliquer le lien vérifie la signature côté serveur, en temps constant, contre le secret
4. Si la signature passe, l'expiration est dans le futur, et le jeton n'a pas été utilisé : nous marquons le jeton "appliqué" de façon atomique (donc un double-clic ne réussit qu'une fois) et lançons la correction
5. Si quoi que ce soit échoue (mismatch de signature, expiré, déjà utilisé) : le lien retourne une page d'erreur et la correction ne tourne pas

## Ce que vous voyez si vous cliquez un lien expiré ou déjà utilisé

Une courte page qui dit soit "ce lien a expiré, ouvrez l'alerte dans votre tableau de bord pour le réémettre" soit "ce lien a déjà été utilisé, voici le résultat du clic précédent". Aucune correction ne tourne deux fois.

## Piste d'audit

Chaque jeton émis, clic, succès, et échec écrit une ligne dans la table anomaly_remediations de votre espace. Propriétaires et admins voient le journal complet dans la vue pipeline d'administration. Les stratèges AiLys assignés à l'espace voient aussi.

Le journal est en ajout seul. Nous ne supprimons ni ne réécrivons jamais une ligne de remédiation.

## Coupe-circuits

Deux couches, les deux réversibles :

- **Par espace** : un propriétaire bascule auto_remediate_enabled dans les paramètres. Désactivé, les courriels d'alerte reviennent à notification seulement.
- **Système-wide** : les opérateurs activent le drapeau système si un problème en aval apparaît. Désactivé, aucun nouveau jeton n'émet peu importe les paramètres d'espace ; les jetons existants vérifient encore si cliqués dans leur fenêtre de 24h.

## Ce que nous NE faisons PAS

- Nous n'auto-publions rien sur votre profil Google via ce flux. Ce chemin est la barrière d'auto-publication GBP, qui est une fonction séparée.
- Nous n'auto-facturons ni n'auto-modifions votre facturation. Stripe reste sous contrôle direct d'opérateur et de propriétaire.
- Nous ne re-lançons pas l'auto-correction automatiquement. Un jeton = un clic = une application. Si vous devez réessayer, demandez un nouveau jeton depuis le tableau de bord.

## Quand activer

- Après 30 jours sur la plateforme quand vous avez vu quelques alertes et décidé que vous faites confiance au routage
- Quand votre équipe est trop petite pour traiter chaque alerte manuellement dans quelques heures
- Quand vous opérez sur plusieurs fuseaux horaires et voulez que les corrections commencent avant le prochain quart d'opérateur

Votre stratège peut parcourir les 90 derniers jours d'alertes avec vous et décider ensemble.`,
      },
    },
  },
  {
    slug: "monthly-visibility-report",
    title: "Your monthly Visibility Report (auto-delivered to your inbox)",
    excerpt:
      "On the 1st of each month, Growth and Agency tiers receive a branded Visibility Report PDF in their inbox. Here is what is inside, when it arrives, and how to opt out.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

On the 1st of every month, your workspace receives a branded Visibility Report PDF in the inbox of the contact on file. The report covers the previous 30 days of AI Visibility data, keyword rankings (when Google Search Console is connected), and citation snapshots across the engines we track. The report is generated automatically. No request needed, no waiting on a strategist.

This is included in Growth and Agency tiers by default. Starter and Core tiers do not receive the monthly report; their data is available on demand in the Visibility dashboard.

## When it arrives

- **Schedule**: 1st of each month, 09:00 UTC (typically before 06:00 Eastern Time on the same day)
- **Recipient**: the workspace owner email on file
- **Format**: PDF attachment, branded with your workspace logo and colors when those are configured (Agency tier white-label option)

If the 1st falls on a weekend or holiday, the report still goes out on the calendar 1st.

## What is inside

The report has six sections:

1. **Cover page**: workspace name, report month, your branding (logo and color when set)
2. **Visibility summary**: Share of Model across the AI engines we track, with the prior month for comparison
3. **Top keywords by impressions**: when Google Search Console is connected, the keywords driving the most search visibility for your domain
4. **LLM citation breakdown**: per engine, a count of citations where your business appeared in answers
5. **Sentiment snapshot**: positive, neutral, negative shares across recent mentions
6. **Action notes**: a short list of 3 to 5 observations from the strategist (where applicable)

The data is read-only at the time of generation. Live numbers stay available in the Visibility dashboard inside the app.

## Opt-out and frequency

You can turn the monthly report off in Settings. Look for "Monthly visibility report" toggle in the workspace settings panel. The toggle takes effect immediately for the next scheduled run. The toggle does not affect on-demand report generation, which strategists can fire any time.

If you ever miss a month (delivery failure, mailbox full, address change), strategists can manually re-run the report from the admin panel and the email will resend.

## Privacy and audit

- The recipient email is pulled from your workspace owner record. We do not store a separate copy.
- Each generated report is logged with workspace ID, month, status, send timestamp, and a hash of the recipient email (no email in clear).
- The PDF itself is stored in tenant-isolated storage for 12 months for re-download by the workspace owner.
- No data leaves the platform except the email itself and the attached PDF.

## Brand presentation

- **AiLys Automation self-serve workspaces** receive the report from the AiLys Automation noreply address with default branding.
- **AiLys-managed workspaces** receive the report from the AiLys noreply address with the strategist signature.
- **Agency tier white-label** workspaces receive the report under your custom brand: your logo on the cover, your color in section headers, your domain in the From field (when DNS is set up). Help in the white-label PDF reports article.

## When NOT to enable this

- If your team prefers to pull data on demand and the monthly digest is noise
- If the workspace receives reports from another reporting tool and you want a single source of truth elsewhere
- If you want zero scheduled emails to your domain (for security or policy reasons)

You can flip the toggle off any time. The data stays available in the Visibility dashboard.

## What is happening behind the scenes

The report is built from data your workspace already collects: AI Visibility runs, citation snapshots, keyword ranking imports. No new data collection happens for this feature. The PDF is rendered server-side by the AiLys engine and emailed via our standard email provider. The same delivery pipeline that sends auth emails, alert emails, and one-click auto-fix emails handles the monthly report.

If you have questions about the data, your strategist (Growth and Agency tiers) can walk you through the report on a monthly call.`,
    i18n: {
      fr: {
        title: "Votre rapport de Visibilité mensuel (livré automatiquement à votre boîte)",
        excerpt:
          "Le 1er de chaque mois, les paliers Growth et Agency reçoivent un PDF de rapport de Visibilité en marque dans leur boîte courriel. Voici ce qu'il contient, quand il arrive, et comment se désabonner.",
        body: `## De quoi s'agit-il

Le 1er de chaque mois, votre espace de travail reçoit un PDF de rapport de Visibilité en marque dans la boîte courriel du contact inscrit. Le rapport couvre les 30 derniers jours de données AI Visibility, les classements de mots-clés (quand Google Search Console est connecté) et les instantanés de citations sur les moteurs que nous suivons. Le rapport est généré automatiquement. Aucune demande nécessaire, aucune attente sur un stratège.

C'est inclus dans les paliers Growth et Agency par défaut. Les paliers Starter et Core ne reçoivent pas le rapport mensuel ; leurs données sont disponibles sur demande dans le tableau de bord Visibility.

## Quand il arrive

- **Calendrier** : le 1er de chaque mois, 09:00 UTC (typiquement avant 06:00 heure de l'Est le même jour)
- **Destinataire** : le courriel du propriétaire de l'espace de travail inscrit
- **Format** : pièce jointe PDF, en marque avec le logo et les couleurs de votre espace quand ceux-ci sont configurés (option de marque blanche au palier Agency)

Si le 1er tombe une fin de semaine ou un jour férié, le rapport part quand même le 1er du calendrier.

## Ce qu'il contient

Le rapport comporte six sections :

1. **Page couverture** : nom de l'espace, mois du rapport, votre marque (logo et couleur quand définis)
2. **Sommaire de visibilité** : Share of Model sur les moteurs IA que nous suivons, avec le mois précédent en comparaison
3. **Mots-clés du top par impressions** : quand Google Search Console est connecté, les mots-clés qui génèrent le plus de visibilité pour votre domaine
4. **Répartition des citations LLM** : par moteur, le compte de citations où votre entreprise apparaît dans les réponses
5. **Instantané de sentiment** : parts positive, neutre, négative sur les mentions récentes
6. **Notes d'action** : une courte liste de 3 à 5 observations du stratège (le cas échéant)

Les données sont en lecture seule au moment de la génération. Les chiffres en direct restent disponibles dans le tableau de bord Visibility dans l'application.

## Désactivation et fréquence

Vous pouvez désactiver le rapport mensuel dans les paramètres. Cherchez la bascule "Rapport mensuel de visibilité" dans le panneau des paramètres d'espace de travail. La bascule prend effet immédiatement pour la prochaine exécution prévue. La bascule n'affecte pas la génération à la demande, que les stratèges peuvent déclencher à tout moment.

Si vous manquez un mois (échec de livraison, boîte pleine, changement d'adresse), les stratèges peuvent relancer manuellement le rapport depuis le panneau admin et le courriel sera renvoyé.

## Confidentialité et journal

- Le courriel destinataire est tiré du dossier propriétaire de votre espace. Nous n'en stockons pas une copie séparée.
- Chaque rapport généré est journalisé avec l'identifiant d'espace, le mois, le statut, l'horodatage d'envoi et un haché du courriel destinataire (aucun courriel en clair).
- Le PDF est stocké dans un stockage isolé par locataire pendant 12 mois pour re-téléchargement par le propriétaire de l'espace.
- Aucune donnée ne quitte la plateforme sauf le courriel et le PDF en pièce jointe.

## Présentation de marque

- **Espaces AiLys Automation en libre-service** reçoivent le rapport depuis l'adresse noreply de AiLys Automation avec la marque par défaut.
- **Espaces AiLys gérés** reçoivent le rapport depuis l'adresse noreply d'AiLys avec la signature du stratège.
- **Marque blanche au palier Agency** reçoivent le rapport sous votre marque personnalisée : votre logo en couverture, votre couleur dans les en-têtes de section, votre domaine dans le champ Expéditeur (quand le DNS est configuré). Aide dans l'article sur les rapports PDF en marque blanche.

## Quand NE PAS activer

- Si votre équipe préfère tirer les données à la demande et que le résumé mensuel est du bruit
- Si l'espace reçoit déjà des rapports d'un autre outil et que vous voulez une source unique ailleurs
- Si vous voulez zéro courriel programmé vers votre domaine (raisons de sécurité ou de politique)

Vous pouvez basculer en arrière à tout moment. Les données restent disponibles dans le tableau de bord Visibility.

## Ce qui se passe en coulisse

Le rapport est construit à partir des données que votre espace collecte déjà : exécutions AI Visibility, instantanés de citations, imports de classements de mots-clés. Aucune nouvelle collecte de données pour cette fonctionnalité. Le PDF est rendu côté serveur par le moteur AiLys et envoyé via notre fournisseur de courriel standard. Le même pipeline de livraison qui envoie les courriels d'authentification, les alertes et les correctifs en un clic gère le rapport mensuel.

Si vous avez des questions sur les données, votre stratège (paliers Growth et Agency) peut parcourir le rapport avec vous lors d'un appel mensuel.`,
      },
    },
  },
  {
    slug: "your-pdf-audit-explained",
    title: "Your PDF audit (what it covers, when you get it, how to read it)",
    excerpt:
      "Anyone who runs the free audit can request a 10-page branded PDF by email. Here is what each section covers, where the data comes from, and what the link expiry means.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

When you run the free audit on the AiLys site, you can request a downloadable PDF version. We render a 10-page branded PDF with your scores and observations and email you a one-time download link. The PDF is ready in roughly 30 seconds and the link is good for 24 hours.

This is open to anyone who completes the public audit. No account needed.

## What is in the 10 pages

1. **Cover**: your business name, audit date, headline scores
2. **Executive summary**: top three findings and what to act on first
3. **AI Visibility score**: how often the major AI engines mention your business in answers, with a percentile against similar local businesses
4. **GBP Pulse**: ten weighted Google Business Profile signals scored against vertical benchmarks
5. **LLM Citation matrix**: per engine, how your business is cited or skipped across three intent queries
6. **Places snapshot**: your live Google Places profile and the three nearest competitors for context
7. **Schema preview**: copy-paste-ready LocalBusiness and FAQPage JSON-LD tuned to your vertical
8. **Action plan**: prioritized checklist with effort estimate per task
9. **Methodology**: what was scored, how, and what is excluded
10. **Next steps**: how to put the action plan in motion (self-serve, AiLys Automation SaaS, or AiLys-managed paths)

The PDF mirrors the data you saw on the audit page; nothing new is computed at PDF generation time.

## How long the download link lasts

The link in the email is signed and works for **24 hours**. After that the link returns expired and you would request a new audit to regenerate.

The link is single-use scoped to the audit ID. Sharing the link works (the file does not require login) but anyone with the link can download until the 24-hour window closes.

## What the email looks like

Subject and body match your audit language across the supported locales. The From field is the AiLys noreply address with proper SPF, DKIM, and DMARC, so it should land in your primary inbox rather than promotions.

If the email does not arrive in 5 minutes:

- Check your spam folder
- Confirm the email address you entered (typos are the top cause)
- Try again with a different inbox; the audit data is cached for 1 hour so you do not need to re-enter all fields

## Privacy

- The email you submit is only used to send the PDF link. We do not add you to any list.
- The audit input you provided lives in cache for 1 hour to allow regeneration; after that it is purged.
- The PDF is stored for 24 hours then deleted. We do not keep your audit PDF beyond that window.
- The download link is HMAC-signed so the link itself cannot be tampered to point to another audit.
- If you signed up for the AiLys newsletter as part of the audit flow, that is a separate consent and lives independently.

## Why a PDF and not just the web view

- You can share the PDF with stakeholders who do not run the audit themselves
- It is a portable artifact for board decks, lender packages, or onboarding briefs
- Some buyers want to print the action plan and walk through it in a strategy session
- You can compare two audits over time by saving them locally

## Common issues

- **Email rejected**: we filter disposable email domains. Use a real inbox.
- **Audit not found**: usually means more than 1 hour passed between running the audit and requesting the PDF; the cached input expired. Run the audit again.
- **Link expired**: more than 24 hours have passed. Request the audit and PDF again.
- **PDF looks wrong**: the audit relies on Google Places data; if your GBP record was just created and Google has not propagated, some sections show "not yet indexed". Wait a day and re-run.

## What this is NOT

- This is not the white-label monthly Visibility Report. That report goes to active Growth and Agency tier customers on the 1st of each month.
- This is not the Day-1 onboarding PDF. That one auto-fires when you sign up for an AiLys plan.

## Asking for help

If the email never lands and the link is dead, contact the AiLys team via the chat widget on the bottom right of the site. Include the email address you used and roughly when you ran the audit; we can re-fire the email or extend the link.`,
    i18n: {
      fr: {
        title: "Votre audit PDF (ce qu'il couvre, quand vous le recevez, comment le lire)",
        excerpt:
          "N'importe qui lance l'audit gratuit peut demander un PDF de 10 pages en marque par courriel. Voici ce que chaque section couvre, d'où viennent les données, et ce que l'expiration du lien signifie.",
        body: `## De quoi s'agit-il

Quand vous lancez l'audit gratuit sur le site AiLys, vous pouvez demander une version PDF téléchargeable. Nous générons un PDF de 10 pages en marque avec vos scores et observations et vous envoyons par courriel un lien de téléchargement à usage unique. Le PDF est prêt en environ 30 secondes et le lien est valide 24 heures.

C'est ouvert à tous ceux qui complètent l'audit public. Aucun compte nécessaire.

## Ce qu'il y a dans les 10 pages

1. **Couverture**: nom de votre entreprise, date de l'audit, scores principaux
2. **Sommaire exécutif**: trois principales observations et par où commencer
3. **Score AI Visibility**: à quelle fréquence les grands moteurs IA mentionnent votre entreprise, avec un percentile contre des entreprises locales similaires
4. **GBP Pulse**: dix signaux pondérés Google Business Profile notés contre des points de référence sectoriels
5. **Matrice de citations LLM**: par moteur, comment votre entreprise est citée ou ignorée sur trois requêtes d'intention
6. **Instantané Places**: votre fiche Google Places en direct et les trois concurrents les plus proches
7. **Aperçu de schema**: LocalBusiness et FAQPage JSON-LD prêts à copier-coller, ajustés à votre secteur
8. **Plan d'action**: liste priorisée avec estimation d'effort par tâche
9. **Méthodologie**: ce qui a été noté, comment, et ce qui est exclu
10. **Prochaines étapes**: comment mettre le plan en marche (libre-service, SaaS AiLys Automation, ou AiLys géré)

Le PDF reflète les données que vous avez vues sur la page d'audit; rien de nouveau n'est calculé au moment de la génération.

## Combien de temps le lien dure

Le lien dans le courriel est signé et fonctionne pendant **24 heures**. Après ça, le lien retourne expiré et vous referiez un audit pour le regénérer.

Le lien est à usage unique pour un identifiant d'audit. Le partage du lien fonctionne (le fichier ne demande pas de connexion) mais quiconque a le lien peut télécharger jusqu'à la fin de la fenêtre de 24 heures.

## À quoi ressemble le courriel

Le sujet et le corps correspondent à la langue de votre audit dans les langues prises en charge. Le champ Expéditeur est l'adresse noreply AiLys avec SPF, DKIM et DMARC en règle, donc le courriel devrait arriver dans votre boîte principale plutôt que dans les promotions.

Si le courriel n'arrive pas en 5 minutes:

- Vérifiez le dossier indésirable
- Confirmez l'adresse courriel saisie
- Réessayez avec une autre boîte; les données d'audit sont en cache 1 heure donc vous n'avez pas à tout ressaisir

## Confidentialité

- Le courriel que vous donnez sert seulement à envoyer le lien PDF. Nous ne vous ajoutons à aucune liste.
- L'audit que vous avez fourni vit en cache 1 heure pour permettre la regénération; ensuite il est purgé.
- Le PDF est stocké 24 heures puis supprimé. Nous ne gardons pas votre PDF d'audit au-delà de cette fenêtre.
- Le lien de téléchargement est signé HMAC donc le lien lui-même ne peut être altéré pour pointer vers un autre audit.
- Si vous vous êtes inscrit à l'infolettre AiLys pendant le flux d'audit, c'est un consentement séparé.

## Problèmes courants

- **Courriel refusé**: nous filtrons les domaines de courriel jetables. Utilisez une vraie boîte.
- **Audit introuvable**: ça veut habituellement dire que plus d'1 heure s'est écoulée entre l'audit et la demande de PDF; l'entrée en cache a expiré.
- **Lien expiré**: plus de 24 heures se sont écoulées. Demandez l'audit et le PDF à nouveau.
- **Le PDF a l'air faux**: l'audit s'appuie sur les données Google Places; si votre fiche GBP vient d'être créée et que Google n'a pas propagé, certaines sections affichent "pas encore indexé".

## Ce que ce N'EST PAS

- Ce n'est pas le rapport mensuel de Visibilité en marque blanche. Ce rapport va aux clients actifs des paliers Growth et Agency le 1er de chaque mois.
- Ce n'est pas le PDF d'intégration Jour 1. Celui-là se déclenche automatiquement quand vous vous inscrivez à un plan AiLys.

## Demander de l'aide

Si le courriel n'arrive jamais et que le lien est mort, contactez l'équipe AiLys via le widget de clavardage en bas à droite du site. Incluez l'adresse courriel utilisée et environ quand vous avez lancé l'audit; nous pouvons relancer le courriel ou prolonger le lien.`,
      },
    },
  },
  {
    slug: "day-1-onboarding-pdf",
    title: "Your Day-1 onboarding PDF (auto-fires within 2 minutes of signup)",
    excerpt:
      "When you sign up for an AiLys plan, a baseline PDF audit fires automatically and arrives in your inbox within 2 minutes. Here is what is in it, why it ships before week 1, and what to do with it.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 3,
    body: `## What this is

When you complete signup for an AiLys plan, our Day-1 system fires a baseline PDF audit to your inbox within 2 minutes. No need to ask, no need to wait for your strategist's first call. The PDF gives you a starting picture of where your business stands on AI Visibility, GBP, citations, and schema before any AiLys work has been done.

This is automatic for every new AiLys-managed account. AiLys Automation self-serve customers run the public free audit instead.

## Why so fast

In the past, the first deliverable on a new AiLys engagement landed in week 1 or week 2. That delay is dead time for the client; you signed up because you want movement now. The Day-1 PDF closes that gap by giving you something tangible the same hour you sign.

It also gives your strategist a shared baseline to reference on the first call. You can both look at the same numbers and discuss the same gaps.

## What is in the PDF

The Day-1 PDF is the same 10-page structure as the public audit PDF, with two additions on the cover page:

- "Your AiLys account starts on" with the date
- "Your dedicated strategist" with the name and contact (Growth and Agency tiers)

And one important framing change: action items are written for the AiLys workflow rather than self-serve. Instead of "consider adding LocalBusiness schema", the action plan reads "Schema layer scheduled for week 1, your strategist will confirm the variant" with checkboxes that map to the AiLys delivery schedule.

The cover note also says: "First scan completes within 24 hours. This baseline reflects the current state of your business on the public web before any AiLys work has been done."

## When it arrives

- **Trigger**: successful Stripe payment confirmation
- **Window**: under 2 minutes from payment to inbox
- **Recipient**: the email address used for the Stripe checkout
- **From**: the AiLys noreply address
- **Subject** (English): "Your AiLys baseline audit, Day 1"
- **Subject** (French Canadian): "Votre audit de référence AiLys, Jour 1"

If the PDF does not arrive in 5 minutes, the system retries from a dead-letter queue. If it still fails, the operator on call gets paged. Manual recovery happens within the business day.

## What to do with it

1. **Read the executive summary on page 2.** Three findings, ordered by priority.
2. **Compare AI Visibility (page 3) and GBP Pulse (page 4) to your industry benchmarks.** The methodology page (page 9) explains where the benchmarks come from.
3. **Save the PDF locally.** The download link in the email expires after 24 hours, but a copy in your filesystem does not.
4. **Bring it to your first strategist call.** The call goes faster when you both have the same artifact open. Strategists usually walk through pages 2, 3, 5, and 8.
5. **Treat the action plan as a shared backlog.** Items marked AiLys run on our side. Items marked Client need a small action from you (logo upload, photo upload, GBP access grant).

## Privacy and security

- The PDF is rendered server-side and uploaded to tenant-scoped storage.
- The download link is HMAC-signed and single-use; the link itself cannot be tampered.
- The recipient email is only the address used at checkout. We do not auto-send to additional addresses.
- The PDF is retained for 30 days for re-download via your account dashboard, then deleted.
- Internally, the run is logged with workspace ID, status, and a hash of the recipient email. No email is stored in clear.

## Idempotency

If signup completes twice (rare, but happens with a retry on a Stripe webhook), the system de-duplicates on the Stripe customer ID and only sends one PDF. You will not receive two copies even if Stripe retries.

## What this is NOT

- It is not the monthly Visibility Report. That arrives on the 1st of each month for Growth and Agency tiers.
- It is not the public free audit. That one is open to anyone, no signup needed.

## When you might NOT get one

- You signed up for a AiLys Automation self-serve plan rather than an AiLys-managed plan. AiLys Automation customers use the in-app on-demand audit.
- The Stripe webhook failed to deliver. Operator manual recovery within 1 business day.
- Your business was not yet indexable on the public web (very new domain, no GBP). The PDF still fires but flags missing data on each page.

## Asking for help

If the Day-1 PDF never arrives and 24 hours have passed, contact your strategist via the AiLys account dashboard chat. We can re-fire the PDF or hand-build the baseline.`,
    i18n: {
      fr: {
        title: "Votre PDF d'intégration Jour 1 (déclenché en moins de 2 minutes après l'inscription)",
        excerpt:
          "Quand vous vous inscrivez à un plan AiLys, un audit PDF de référence se déclenche automatiquement et arrive dans votre boîte en moins de 2 minutes. Voici ce qu'il contient, pourquoi il part avant la semaine 1, et quoi en faire.",
        body: `## De quoi s'agit-il

Quand vous complétez l'inscription à un plan AiLys, notre système Jour 1 envoie un audit PDF de référence dans votre boîte en moins de 2 minutes. Pas besoin de demander, pas besoin d'attendre le premier appel du stratège. Le PDF vous donne une image de départ de votre entreprise sur AI Visibility, GBP, citations et schema avant qu'un travail AiLys ait été fait.

C'est automatique pour chaque nouveau compte AiLys géré. Les clients AiLys Automation en libre-service lancent plutôt l'audit gratuit public.

## Pourquoi si vite

Avant, le premier livrable d'une nouvelle entente AiLys arrivait en semaine 1 ou semaine 2. Ce délai est du temps mort pour le client; vous vous êtes inscrit parce que vous voulez du mouvement maintenant. Le PDF Jour 1 ferme ce trou en vous donnant quelque chose de tangible la même heure où vous signez.

Il donne aussi à votre stratège une base partagée à référencer au premier appel. Vous pouvez tous les deux regarder les mêmes chiffres et discuter des mêmes écarts.

## Ce qu'il y a dans le PDF

Le PDF Jour 1 a la même structure de 10 pages que le PDF d'audit public, avec deux ajouts sur la page couverture:

- "Votre compte AiLys débute le" avec la date
- "Votre stratège dédié" avec le nom et le contact (paliers Growth et Agency)

Et un changement de cadrage important: les actions sont écrites pour le flux AiLys plutôt que pour le libre-service. Au lieu de "envisager l'ajout du schema LocalBusiness", le plan d'action lit "Couche schema prévue pour la semaine 1, votre stratège confirmera la variante" avec des cases à cocher qui correspondent au calendrier de livraison AiLys.

La note de couverture dit aussi: "Le premier scan complet en moins de 24 heures. Cette référence reflète l'état actuel de votre entreprise sur le web public avant qu'aucun travail AiLys n'ait été fait."

## Quand il arrive

- **Déclencheur**: confirmation de paiement Stripe réussie
- **Fenêtre**: moins de 2 minutes du paiement à la boîte
- **Destinataire**: l'adresse courriel utilisée pour le paiement Stripe
- **Expéditeur**: l'adresse noreply AiLys
- **Sujet** (français canadien): "Votre audit de référence AiLys, Jour 1"
- **Sujet** (anglais): "Your AiLys baseline audit, Day 1"

Si le PDF n'arrive pas en 5 minutes, le système ré-essaie depuis une file de lettres mortes. S'il échoue encore, l'opérateur de garde est avisé. La récupération manuelle arrive dans la journée ouvrable.

## Quoi en faire

1. **Lisez le sommaire exécutif page 2.** Trois observations, par ordre de priorité.
2. **Comparez AI Visibility (page 3) et GBP Pulse (page 4) aux points de référence du secteur.** La page méthodologie (page 9) explique d'où viennent les références.
3. **Sauvegardez le PDF localement.** Le lien de téléchargement dans le courriel expire après 24 heures, mais une copie dans votre système de fichiers, non.
4. **Apportez-le au premier appel avec le stratège.** L'appel va plus vite quand vous avez le même artefact ouvert. Les stratèges parcourent habituellement les pages 2, 3, 5 et 8.
5. **Traitez le plan d'action comme un arriéré partagé.** Les items marqués AiLys tournent de notre côté. Les items marqués Client demandent une petite action de vous (téléversement de logo, téléversement de photos, octroi d'accès GBP).

## Confidentialité et sécurité

- Le PDF est rendu côté serveur et téléversé dans un stockage isolé par locataire.
- Le lien de téléchargement est signé HMAC et à usage unique; le lien lui-même ne peut être altéré.
- Le destinataire est seulement l'adresse utilisée au paiement. Nous n'envoyons pas automatiquement à des adresses additionnelles.
- Le PDF est conservé 30 jours pour re-téléchargement via votre tableau de bord de compte, puis supprimé.
- En interne, l'exécution est journalisée avec l'identifiant d'espace, le statut et un haché du courriel destinataire. Aucun courriel n'est stocké en clair.

## Idempotence

Si l'inscription se complète deux fois (rare, mais ça arrive avec une nouvelle tentative sur un webhook Stripe), le système déduplique sur l'identifiant client Stripe et n'envoie qu'un seul PDF. Vous ne recevrez pas deux copies même si Stripe ré-essaie.

## Ce que ce N'EST PAS

- Ce n'est pas le rapport mensuel de Visibilité. Celui-là arrive le 1er de chaque mois pour les paliers Growth et Agency.
- Ce n'est pas l'audit public gratuit. Celui-là est ouvert à tous, sans inscription.

## Quand vous pourriez NE PAS en recevoir

- Vous vous êtes inscrit à un plan AiLys Automation en libre-service plutôt qu'à un plan AiLys géré. Les clients AiLys Automation utilisent l'audit à la demande dans l'application.
- Le webhook Stripe n'a pas livré. Récupération manuelle de l'opérateur en moins d'1 jour ouvrable.
- Votre entreprise n'était pas encore indexable sur le web public (domaine très neuf, pas de GBP). Le PDF part quand même mais signale les données manquantes sur chaque page.

## Demander de l'aide

Si le PDF Jour 1 n'arrive jamais et que 24 heures ont passé, contactez votre stratège via le clavardage du tableau de bord de compte AiLys. Nous pouvons relancer le PDF ou bâtir la référence à la main.`,
      },
    },
  },
  {
    slug: "citation-auto-batch",
    title: "How citation auto-batch works (Tier 1 directories)",
    excerpt:
      "On Core, Growth, and Agency tiers, your monthly citation submissions to Tier 1 directories run automatically. Here is what auto-batches, what stays manual, and how the strategist QA gate works.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

Citation building means submitting your business NAP (Name, Address, Phone) to directories like Yelp, Foursquare, BBB, Yellow Pages, and similar. Done well, it improves local SEO and Google Business Profile authority. Done manually, it eats hours per client per month.

C.6 automates the structured part: directories that accept clean API or partner-portal submissions. The human-only directories stay in the strategist queue exactly as before. You always have a human in the loop.

## What auto-batches and what does not

We split directories into three categories.

**Tier 1, structured-friendly (auto-batched):**
- Yelp (partner API)
- Foursquare (Places API)
- BBB (partner CSV upload)
- MapQuest, Yellow Pages, Apple Maps Connect (where partner credentials available)

These directories accept structured input via API or signed CSV. We submit your canonical NAP, log the result, and surface success/failure in the admin panel.

**Tier 2, semi-structured (queued for strategist):**
- Niche industry directories with form-based submission
- Local chamber of commerce sites
- Regional review platforms

These need a human to fill the form. The strategist works through the queue weekly.

**Tier 3, human-only (never auto):**
- Wikipedia (community editorial gatekeeping)
- Reddit / Quora (authentic participation only, per AiLys link-building scope)
- Industry-specific platforms requiring a verified profile

These are out of scope for any automation, by policy. We do not pretend otherwise.

## Per-tier cadence

The number of directories per month depends on your tier:

- **Core:** 5 citations/month (Tier 1 + Tier 2 mix)
- **Growth:** 10 citations/month
- **Agency:** 15 citations/month

Auto-batch covers up to 5 of those per month from Tier 1. The rest comes from Tier 2 strategist work.

## Strategist QA gate

Auto-batch does NOT publish without supervision. The flow is:

1. The cron fires daily at 04:00 UTC
2. The system selects up to 5 Tier 1 directories per eligible tenant
3. Submissions run with a 0-60 minute jitter (avoid bot-pattern detection)
4. Each result is logged with status, response code, and timestamp
5. The strategist reviews the run report on the next business day
6. Failures are queued for manual retry
7. Successful submissions are reflected in the citation manager

If anything looks wrong (unexpected status, NAP drift, directory schema change), the strategist pauses auto-batch for that tenant pending investigation.

## Privacy and audit

- Only your canonical NAP is submitted (the same data already public on your Google Business Profile)
- Each run is logged in the admin panel with timestamp, directory, status, and a content hash
- No PII beyond the public NAP is ever sent
- Run history retained for 90 days then purged
- You can opt out per tenant in the workspace settings

## Opt-out

In Settings > Citation Management, toggle "Auto-batch citations" to OFF. The cron skips your tenant from the next day. Existing submissions on directories stay (we cannot remove them retroactively without contacting each directory's support).

## What happens on failure

If a directory rejects a submission:

- Status logged as failed with the response code
- The strategist sees it in the next-day review
- The strategist either retries manually or removes the directory from your rotation
- Your monthly citation count counts only successes

If the same directory fails for 3 consecutive runs across all tenants, we pull it from the auto list and alert the strategist team. The directory may have changed their API; we wait for the fix before re-enabling.

## Cost transparency

Auto-batch makes the per-citation cost visible:

- Foursquare API: ~$0.0001 USD per submission
- Yelp partner: included in partnership tier
- BBB partner: included in BBB partner program

For a Growth tenant doing 5 auto-batched citations monthly, the marginal API cost is under $0.01. We absorb this in the tier price; no surprise charges.

## What this is NOT

- It is not "submit to 100 directories overnight" volume play. We submit to ~5 per month per tenant on Tier 1.
- It is not a workaround for spam-detection on directories. We use partner-level credentials and respect each directory's submission policy.
- It is not link-building (AiLys does not do active link-building). Citations are NAP consistency work, not backlink campaigns.

## Strategic context

Per the AiLys link-building policy, we deliver citations + Wikidata + GBP automation + schema layers. Backlinks may emerge naturally as a side effect, but they are not the goal. C.6 makes the citation deliverable scale to 50+ clients without doubling strategist headcount.

If you want to discuss escalating to manual outreach or specialty directories beyond the Tier 1 / Tier 2 catalog, your strategist can scope that as out-of-tier work.`,
    i18n: {
      fr: {
        title: "Comment fonctionne le lot automatique de citations (annuaires de Niveau 1)",
        excerpt:
          "Aux paliers Core, Growth et Agency, vos soumissions mensuelles de citations aux annuaires de Niveau 1 tournent automatiquement. Voici ce qui s'automatise, ce qui reste manuel, et comment fonctionne la barrière QA du stratège.",
        body: `## De quoi s'agit-il

Construire des citations veut dire soumettre votre NAP d'entreprise (nom, adresse, téléphone) à des annuaires comme Yelp, Foursquare, BBB, Pages Jaunes, et similaires. Bien fait, ça améliore le SEO local et l'autorité Google Business Profile. Fait à la main, ça mange des heures par client par mois.

C.6 automatise la partie structurée : les annuaires qui acceptent des soumissions API ou portail-partenaire propres. Les annuaires humains-seulement restent dans la file du stratège exactement comme avant. Vous gardez toujours un humain dans la boucle.

## Ce qui s'automatise et ce qui ne s'automatise pas

Nous séparons les annuaires en trois catégories.

**Niveau 1, structuré (lot automatique):**
- Yelp (API partenaire)
- Foursquare (API Places)
- BBB (téléversement CSV partenaire)
- MapQuest, Pages Jaunes, Apple Maps Connect (quand les identifiants partenaires sont disponibles)

Ces annuaires acceptent une entrée structurée via API ou CSV signé. Nous soumettons votre NAP canonique, journalisons le résultat, et le succès/échec apparaît dans le panneau admin.

**Niveau 2, semi-structuré (mis en file pour le stratège):**
- Annuaires sectoriels avec soumission par formulaire
- Sites de chambre de commerce locale
- Plateformes d'avis régionales

Ceux-ci ont besoin d'un humain pour remplir le formulaire. Le stratège passe la file chaque semaine.

**Niveau 3, humain-seulement (jamais automatique):**
- Wikipedia (gardiennage éditorial communautaire)
- Reddit / Quora (participation authentique seulement, selon la portée AiLys)
- Plateformes spécifiques à un secteur exigeant un profil vérifié

Ceux-là sont hors-cadre pour toute automatisation, par politique. Nous ne prétendons pas le contraire.

## Cadence par palier

Le nombre d'annuaires par mois dépend de votre palier:

- **Core:** 5 citations/mois (mélange Niveau 1 + Niveau 2)
- **Growth:** 10 citations/mois
- **Agency:** 15 citations/mois

Le lot automatique couvre jusqu'à 5 de ceux-ci par mois depuis le Niveau 1. Le reste vient du travail Niveau 2 du stratège.

## Barrière QA du stratège

Le lot automatique ne publie PAS sans supervision. Le flux est:

1. Le cron se déclenche tous les jours à 04:00 UTC
2. Le système sélectionne jusqu'à 5 annuaires Niveau 1 par locataire éligible
3. Les soumissions tournent avec un délai aléatoire de 0 à 60 minutes (éviter la détection de motifs robotiques)
4. Chaque résultat est journalisé avec statut, code de réponse et horodatage
5. Le stratège revoit le rapport d'exécution le jour ouvrable suivant
6. Les échecs sont mis en file pour reprise manuelle
7. Les soumissions réussies se reflètent dans le gestionnaire de citations

Si quelque chose semble louche (statut imprévu, dérive NAP, changement de schéma d'annuaire), le stratège met le lot automatique en pause pour ce locataire en attendant l'enquête.

## Confidentialité et journal

- Seul votre NAP canonique est soumis (les mêmes données déjà publiques sur votre Google Business Profile)
- Chaque exécution est journalisée dans le panneau admin avec horodatage, annuaire, statut et un haché de contenu
- Aucune information autre que le NAP public n'est jamais envoyée
- L'historique d'exécutions retenu 90 jours puis purgé
- Vous pouvez vous désabonner par locataire dans les paramètres d'espace

## Désabonnement

Dans Paramètres > Gestion de citations, basculez "Lot automatique de citations" à NON. Le cron saute votre locataire dès le lendemain. Les soumissions existantes sur les annuaires restent (nous ne pouvons pas les retirer rétroactivement sans contacter le soutien de chaque annuaire).

## Que se passe-t-il en cas d'échec

Si un annuaire refuse une soumission:

- Statut journalisé comme failed avec le code de réponse
- Le stratège le voit lors de la revue du lendemain
- Le stratège reprend manuellement ou retire l'annuaire de votre rotation
- Votre compte mensuel de citations ne compte que les succès

Si le même annuaire échoue 3 fois de suite sur tous les locataires, nous le retirons de la liste automatique et alertons l'équipe stratège. L'annuaire a peut-être changé son API ; nous attendons le correctif avant de réactiver.

## Transparence des coûts

Le lot automatique rend le coût par citation visible:

- API Foursquare: ~0,0001 USD par soumission
- Yelp partenaire: inclus dans le palier de partenariat
- BBB partenaire: inclus dans le programme partenaire BBB

Pour un locataire Growth qui fait 5 citations automatisées par mois, le coût API marginal est sous 0,01 USD. Nous l'absorbons dans le prix du palier ; pas de frais surprise.

## Ce que ce N'EST PAS

- Ce n'est pas du "soumettre à 100 annuaires en une nuit" en jeu de volume. Nous soumettons à ~5 par mois par locataire au Niveau 1.
- Ce n'est pas un contournement de la détection de pourriel sur les annuaires. Nous utilisons des identifiants de niveau partenaire et respectons la politique de soumission de chaque annuaire.
- Ce n'est pas du link-building (selon la portée AiLys: AiLys ne fait pas de link-building actif). Les citations sont du travail de cohérence NAP, pas des campagnes de liens.

## Contexte stratégique

Selon la politique AiLys de link-building, nous livrons citations + Wikidata + automatisation GBP + couches de schéma. Des liens entrants peuvent émerger naturellement comme effet secondaire, mais ce n'est pas le but. C.6 fait passer le livrable citation à l'échelle de 50+ clients sans doubler les effectifs stratèges.

Si vous voulez discuter d'escalade vers du démarchage manuel ou des annuaires spécialisés au-delà du catalogue Niveau 1 / Niveau 2, votre stratège peut cadrer ça comme du travail hors-palier.`,
      },
    },
  },
  {
    slug: "renewal-and-upsell-signals",
    title: "Renewal nudges and tier upgrade signals (how the system flags growth opportunities)",
    excerpt:
      "Our system reads your usage patterns and sends a strategist alert (and optionally an email to you) when your data shows a renewal coming up or a tier upgrade would help. Here is how it works and how to opt out.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

A daily background job reads your usage across the AiLys platform (citations submitted, photos uploaded, dashboard logins, AI Visibility scores) and computes a small set of signals: are you about to renew, are you hitting tier caps, has your visibility plateaued. When a signal is strong enough, your dedicated strategist gets a heads-up. If you opted into client-facing nudge emails, you also receive a concise note with the data behind it.

The intent: never let a real bottleneck go unnoticed, never spam you with upgrade offers based on time alone.

## What triggers a renewal nudge

Three time-based signals fire automatically:

- **30 days before anniversary**: light reminder to your strategist that renewal is coming
- **14 days before**: stronger nudge, plus a draft "what changed in your account this year" summary the strategist can share
- **7 days before**: priority queue item; strategist outreach within 1 business day

Renewal nudges fire on every active subscription. Cancelled or paused subscriptions do not trigger nudges.

## What triggers an upsell signal

Four behavioral signals can fire at any time, only when your USAGE PATTERN backs them:

- **Citation cap hit 3 months in a row**: your tier covers N citations/month; if you maxed them out three months running, your demand exceeds the tier
- **Photo cap at quota for 2 months**: same logic for the GBP photo upload pipeline
- **Visibility plateau**: your AI Visibility score has not improved in 90 days despite consistent activity; suggests the next tier's capabilities are needed
- **Dashboard engagement**: high login frequency + many feature touches indicates you are using the product intensely; next tier may unlock more

Each signal has a strength score 0.00 to 1.00. We never send an email below 0.80; we never alert a strategist below 0.60. Most signals sit in the 0.30 to 0.70 range and stay quiet.

## What the strategist sees

Your dedicated strategist (Growth and Agency tiers) has an admin feed:

- "Acme Dental: renewal_14d, strength 1.00, action by 2026-05-15"
- "Smith Realty: upsell_citation_cap, strength 0.85, last 3 months at 10/10 cap, suggested tier: Agency"

They mark each signal as "actioned" with a reason (kept, upgraded, deferred, declined). The trail is auditable.

## Client-facing emails (opt-in)

By default, you do NOT receive automated upgrade emails. The signal stays internal. You can opt in via Settings > Notifications > "Send me upgrade-suggestion emails when my usage signals it." If on, you receive at most 1 email per signal type per quarter, with the data line that triggered it.

You can opt out any time. Email send respects your existing preferences (mute hours, language, brand).

## Privacy

- Signals computed from data your workspace already collects: citation_submissions, gbp_photo_uploads, dashboard_sessions, ai_visibility_runs
- Signal data stored as aggregate counts and ratios; NO individual review text, NO email content, NO IP
- Retention: 365 days then purge
- The recipient address for opt-in emails is only the workspace owner; no spreading to additional addresses

## Why the strength threshold matters

The 0.60 / 0.80 thresholds prevent the worst failure mode: spamming clients with upgrade offers they don't need. A signal is only emitted if the underlying data backs it. When in doubt, the signal stays under 0.60 and never reaches anyone.

## When this is NOT useful

- Brand-new accounts (less than 30 days): not enough data; signals stay quiet
- Trialing accounts: only renewal nudges fire (no upsell)
- Heavy seasonal businesses where 3-month moving averages are misleading: ask your strategist to mute specific signal types

## Why we built it

Renewals slipping past unnoticed is bad for the client (no time to plan budget) and bad for us (revenue churn). Upsell suggestions that ignore actual usage are spammy and erode trust. C.7 fixes both with the same daily aggregation pass.

If you want to discuss how a specific signal applies to your account, your strategist can walk through the data with you on the next monthly call.`,
    i18n: {
      fr: {
        title: "Rappels de renouvellement et signaux de mise à niveau (comment le système repère les occasions de croissance)",
        excerpt:
          "Un travail de fond quotidien lit vos motifs d'utilisation et envoie une alerte au stratège (et optionnellement un courriel à vous) quand vos données montrent un renouvellement à venir ou qu'une mise à niveau de palier aiderait. Voici comment ça fonctionne et comment se désabonner.",
        body: `## De quoi s'agit-il

Un travail de fond quotidien lit votre utilisation sur la plateforme AiLys (citations soumises, photos téléversées, connexions au tableau de bord, scores AI Visibility) et calcule un petit ensemble de signaux : êtes-vous sur le point de renouveler, atteignez-vous les plafonds de palier, votre visibilité plafonne-t-elle. Quand un signal est assez fort, votre stratège dédié reçoit un avertissement. Si vous avez accepté les courriels d'invitation côté client, vous recevez aussi une note concise avec les données derrière.

L'intention : ne jamais laisser un vrai goulot d'étranglement passer inaperçu, ne jamais vous spammer avec des offres de mise à niveau basées seulement sur le temps.

## Ce qui déclenche un rappel de renouvellement

Trois signaux temporels se déclenchent automatiquement :

- **30 jours avant l'anniversaire** : rappel léger à votre stratège que le renouvellement approche
- **14 jours avant** : rappel plus fort, plus un brouillon "ce qui a changé dans votre compte cette année" que le stratège peut partager
- **7 jours avant** : item de file prioritaire ; démarchage du stratège en 1 jour ouvrable

Les rappels de renouvellement se déclenchent sur chaque abonnement actif. Les abonnements annulés ou en pause ne déclenchent pas de rappels.

## Ce qui déclenche un signal de mise à niveau

Quatre signaux comportementaux peuvent se déclencher à tout moment, seulement quand votre MOTIF D'UTILISATION les soutient :

- **Plafond de citations atteint 3 mois de suite** : votre palier couvre N citations/mois ; si vous avez atteint le maximum trois mois de suite, votre demande dépasse le palier
- **Plafond de photos atteint 2 mois** : même logique pour le pipeline de téléversement de photos GBP
- **Plateau de visibilité** : votre score AI Visibility n'a pas progressé en 90 jours malgré une activité régulière ; suggère que les capacités du palier suivant sont nécessaires
- **Engagement au tableau de bord** : haute fréquence de connexion + nombreuses interactions de fonctionnalités indique une utilisation intense ; le palier suivant peut débloquer plus

Chaque signal a un score de force 0,00 à 1,00. Nous n'envoyons jamais de courriel sous 0,80 ; nous n'alertons jamais un stratège sous 0,60. La plupart des signaux se situent dans la plage 0,30 à 0,70 et restent silencieux.

## Ce que le stratège voit

Votre stratège dédié (paliers Growth et Agency) a un fil admin :

- "Acme Dental : renewal_14d, force 1,00, action d'ici 2026-05-15"
- "Smith Realty : upsell_citation_cap, force 0,85, 3 derniers mois au plafond 10/10, palier suggéré : Agency"

Ils marquent chaque signal comme "actionné" avec une raison (gardé, mis à niveau, reporté, décliné). La piste est vérifiable.

## Courriels côté client (sur consentement)

Par défaut, vous ne recevez PAS de courriels automatiques de mise à niveau. Le signal reste interne. Vous pouvez vous y inscrire via Paramètres > Notifications > "Envoyez-moi des courriels de suggestion de mise à niveau quand mon utilisation le signale." Si activé, vous recevez au maximum 1 courriel par type de signal par trimestre, avec la ligne de données qui l'a déclenché.

Vous pouvez vous désabonner à tout moment. L'envoi respecte vos préférences existantes (heures de silence, langue, marque).

## Confidentialité

- Signaux calculés à partir de données que votre espace collecte déjà : citation_submissions, gbp_photo_uploads, dashboard_sessions, ai_visibility_runs
- Données de signal stockées comme comptes et ratios agrégés ; AUCUN texte d'avis individuel, AUCUN contenu de courriel, AUCUNE adresse IP
- Rétention : 365 jours puis purge
- L'adresse destinataire pour les courriels d'inscription est seulement le propriétaire de l'espace ; aucune diffusion à des adresses additionnelles

## Pourquoi le seuil de force compte

Les seuils 0,60 / 0,80 préviennent le pire mode d'échec : spammer les clients avec des offres de mise à niveau dont ils n'ont pas besoin. Un signal n'est émis que si les données sous-jacentes le soutiennent. En cas de doute, le signal reste sous 0,60 et n'atteint personne.

## Quand ce n'est PAS utile

- Comptes nouveaux (moins de 30 jours) : pas assez de données ; les signaux restent silencieux
- Comptes en essai : seuls les rappels de renouvellement se déclenchent (pas de mise à niveau)
- Entreprises fortement saisonnières où les moyennes mobiles sur 3 mois sont trompeuses : demandez à votre stratège de mettre certains types de signaux en sourdine

## Pourquoi nous l'avons bâti

Les renouvellements qui passent inaperçus, c'est mauvais pour le client (pas le temps de planifier le budget) et mauvais pour nous (perte de revenus). Les suggestions de mise à niveau qui ignorent l'utilisation réelle sont spammeuses et érodent la confiance. C.7 corrige les deux avec le même passage d'agrégation quotidien.

Si vous voulez discuter de comment un signal spécifique s'applique à votre compte, votre stratège peut parcourir les données avec vous lors du prochain appel mensuel.`,
      },
    },
  },
  {
    slug: "partner-program-onboarding",
    title: "AiLys partner program (white-label your AiLys + AiLys Automation)",
    excerpt:
      "Specialty agencies, freelancers, and consultants can resell AiLys + AiLys Automation under their own brand. Here is who can apply, how the revenue split works, and what we provide.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

The AiLys partner program lets a specialty agency, marketing freelancer, or consultancy resell AiLys + AiLys Automation to their own clients under their brand. You set your markup, you keep the client relationship, we run the platform underneath. Your clients see your brand. Your revenue is your call.

This is a partner-only program. We sell direct to local businesses ourselves; partners sell to specialty agencies and verticals where local businesses prefer to buy from a familiar agency face.

## Who can apply

We are selective on partners because the program quality is set by our worst partner.

Requirements:
- A registered business with a tax ID and verifiable address
- 3+ existing clients you actively service in marketing, SEO, or local digital
- Industry focus or vertical expertise (legal, dental, restaurant, real estate, hospitality, etc.)
- Minimum monthly margin retained per client: $50 CAD (this lets us sustain the platform)
- Clean Stripe Connect KYC (we use Stripe Connect for payouts)
- A primary contact for support escalation

We do not accept partners who plan to:
- Resell at no markup ("AiLys is cheap, sign here")
- Skip explaining the AiLys engine to their clients
- Pass platform abuse risk onto us

## How revenue works

You pay us your wholesale price (AiLys Automation SaaS + AiLys Agency tier per client). You bill your client whatever you want on top. The markup is yours.

Stripe Connect handles the split:
- Client pays your invoice in full
- Stripe takes our wholesale share automatically (application fee)
- The remainder lands in your Stripe payout

Your wholesale price tracks our public AiLys + AiLys Automation pricing with a partner discount you negotiate at onboarding (typically 15 to 25 percent off rack).

## What you get

- White-label dashboard at partner.ailysagency.ca or partner.reviuzy.com (your choice)
- Per-client brand isolation: your logo on every PDF, your color, your From email
- Sub-tenant management: create, edit, suspend client workspaces
- Consolidated invoice per month (one Stripe charge for all your clients, your markup transparent)
- Reseller-only feature flags: enable or disable specific AiLys Automation features per client
- Dedicated partner-support Slack channel (during business hours)
- Quarterly partner roadmap call

## What you do NOT get

- Direct access to client data beyond what they have themselves (we do not let partners read raw reviews, photos, or PII; you see aggregate counts and dashboards)
- Resale rights to a non-AiLys/AiLys Automation product
- Right to misrepresent the underlying engine (you cannot claim you built it; you can claim you operate it)
- Right to discount AiLys engine itself below wholesale
- Right to compete with AiLys in our home Quebec market without notice (we reserve the right to decline partners that pose direct competitive overlap)

## How application works

1. Apply via the form at /partner/apply
2. We review within 5 business days
3. If approved, you onboard via a 60-min strategy call
4. You complete Stripe Connect KYC (typically same day)
5. You sign the partner agreement
6. We provision your reseller dashboard and hand over credentials
7. You add your first client

## Strategic note

We do NOT build the partner program speculatively. Once 5+ qualified applications arrive, we ramp engineering on the reseller stack. If you are interested before that gate fires, write us at the partner application URL and we hold your application in queue until the stack ships.

## Privacy and data

- Each partner sees only their own sub-tenants (RLS enforced platform-wide)
- Sub-tenants see only their workspace, not aware of the reseller layer
- Strategist team at AiLys can SELECT across partners and tenants for support, but cannot mutate partner data without partner consent
- All financial data lives in Stripe; we do not duplicate it in our database
- Partner agreement covers data ownership: client data belongs to the client, partner has access while subscription active, AiLys retains aggregate metrics

## Contact

To apply or ask questions: visit /partner/apply or reach out via the chat widget on the AiLys site.`,
    i18n: {
      fr: {
        title: "Programme partenaire AiLys (revendre AiLys + AiLys Automation en marque blanche)",
        excerpt:
          "Les agences spécialisées, pigistes et consultants peuvent revendre AiLys + AiLys Automation sous leur propre marque. Voici qui peut postuler, comment fonctionne la répartition des revenus, et ce que nous fournissons.",
        body: `## De quoi s'agit-il

Le programme partenaire AiLys permet à une agence spécialisée, un pigiste en marketing ou un cabinet de conseil de revendre AiLys + AiLys Automation à ses propres clients sous votre marque. Vous fixez votre marge, vous gardez la relation client, nous opérons la plateforme dessous. Vos clients voient votre marque. Vos revenus sont à vous.

C'est un programme réservé aux partenaires. Nous vendons en direct aux entreprises locales ; les partenaires vendent à des agences spécialisées et des verticales où les entreprises locales préfèrent acheter d'un visage d'agence familier.

## Qui peut postuler

Nous sommes sélectifs sur les partenaires parce que la qualité du programme est réglée par notre pire partenaire.

Exigences :
- Une entreprise enregistrée avec un numéro fiscal et une adresse vérifiable
- 3 clients existants minimum que vous servez activement en marketing, SEO ou numérique local
- Spécialisation sectorielle ou verticale (juridique, dentaire, restauration, immobilier, hôtellerie, etc.)
- Marge mensuelle minimum retenue par client : 50 CAD (cela nous permet de soutenir la plateforme)
- KYC Stripe Connect propre (nous utilisons Stripe Connect pour les versements)
- Un contact principal pour l'escalade du soutien

Nous n'acceptons pas les partenaires qui prévoient :
- Revendre sans marge ("AiLys est pas cher, signez ici")
- Sauter l'explication du moteur AiLys à leurs clients
- Nous transférer le risque d'abus de plateforme

## Comment fonctionnent les revenus

Vous nous payez votre prix de gros (palier SaaS AiLys Automation + Agency AiLys par client). Vous facturez votre client ce que vous voulez par-dessus. La marge vous appartient.

Stripe Connect gère la séparation :
- Le client paie votre facture en entier
- Stripe prend automatiquement notre part de gros (frais de plateforme)
- Le reste atterrit dans votre versement Stripe

Votre prix de gros suit nos prix publics AiLys + AiLys Automation avec un rabais partenaire que vous négociez à l'intégration (typiquement 15 à 25 pour cent sous le tarif).

## Ce que vous obtenez

- Tableau de bord en marque blanche à partner.ailysagency.ca ou partner.reviuzy.com (votre choix)
- Isolation de marque par client : votre logo sur chaque PDF, votre couleur, votre courriel d'expéditeur
- Gestion de sous-locataires : créer, modifier, suspendre les espaces clients
- Facture consolidée mensuelle (un seul prélèvement Stripe pour tous vos clients, votre marge transparente)
- Indicateurs de fonctionnalités réservés au revendeur : activer ou désactiver des fonctionnalités AiLys Automation par client
- Canal Slack dédié au soutien partenaire (heures ouvrables)
- Appel trimestriel de feuille de route partenaire

## Ce que vous N'OBTENEZ PAS

- Accès direct aux données client au-delà de ce qu'eux-mêmes ont (nous ne laissons pas les partenaires lire les avis bruts, photos ou PII ; vous voyez des comptes agrégés et des tableaux)
- Droits de revente d'un produit non-AiLys/AiLys Automation
- Droit de fausse représentation du moteur sous-jacent (vous ne pouvez pas prétendre l'avoir bâti ; vous pouvez prétendre l'opérer)
- Droit d'escompter le moteur AiLys lui-même sous le prix de gros
- Droit de concurrencer AiLys dans notre marché québécois sans préavis (nous nous réservons le droit de refuser des partenaires qui posent une superposition concurrentielle directe)

## Comment fonctionne la candidature

1. Postulez via le formulaire à /partner/apply
2. Nous revoyons en 5 jours ouvrables
3. Si approuvé, vous intégrez via un appel stratégique de 60 minutes
4. Vous complétez le KYC Stripe Connect (typiquement le jour même)
5. Vous signez l'entente de partenariat
6. Nous provisionnons votre tableau de bord revendeur et remettons les identifiants
7. Vous ajoutez votre premier client

## Note stratégique

Nous ne bâtissons PAS le programme partenaire spéculativement. Une fois 5 candidatures qualifiées reçues, nous lançons l'ingénierie sur la pile revendeur. Si vous êtes intéressé avant que cette barrière se déclenche, écrivez-nous à l'URL de candidature partenaire et nous gardons votre dossier en file jusqu'à ce que la pile soit livrée.

## Confidentialité et données

- Chaque partenaire ne voit que ses propres sous-locataires (RLS appliqué à l'échelle de la plateforme)
- Les sous-locataires ne voient que leur espace, sans conscience de la couche revendeur
- L'équipe stratège chez AiLys peut faire SELECT à travers partenaires et locataires pour le soutien, mais ne peut pas modifier les données du partenaire sans son consentement
- Toutes les données financières vivent dans Stripe ; nous ne les dupliquons pas dans notre base
- L'entente de partenariat couvre la propriété des données : les données client appartiennent au client, le partenaire y a accès tant que l'abonnement est actif, AiLys retient les métriques agrégées

## Contact

Pour postuler ou poser des questions : visitez /partner/apply ou rejoignez-nous via le widget de clavardage sur le site AiLys.`,
      },
    },
  },
  {
    slug: "health-score-explained",
    title: "Your account health score (how we measure it and what triggers strategist outreach)",
    excerpt:
      "We compute a daily health score from your platform usage. When the score drops or trends sharply down, your strategist reaches out before things get worse. Here is what we measure and how to interpret it.",
    category: "getting-started",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## What this is

A daily background job computes a health score (0 to 100) for your workspace based on five observable behaviors. The score is a triage signal for your dedicated strategist (Growth and Agency tiers): when it drops below 40, or when it trends sharply down over 7 days, the strategist gets a heads-up and reaches out within 1 to 2 business days.

This is INPUT TO HUMAN JUDGMENT, not autopilot. The system never auto-cancels, auto-discounts, or auto-emails you with the score. It is a tool the strategist uses to prioritize who needs attention this week.

## What we measure (5 components)

Each component contributes 20% to your score (0 to 20 points each, summed to 0 to 100).

1. **Login cadence** : how often you (or anyone in your workspace) logged in over the last 30 days vs the expected cadence for your tier. Below expected = lower component score.
2. **Feature usage breadth** : how many distinct features you touched in 30 days. Using only one feature = low; using 5+ across reviews, photos, citations, dashboard, alerts = high.
3. **GBP delivery rate** : posts published vs scheduled in the last 30 days. If 12 of 12 scheduled posts published = full points. If 8 of 12 = partial. Captures upstream API issues + your photo upload cadence.
4. **Citation success rate** : auto-batch + manual submissions accepted vs attempted in 30 days. High success = full points.
5. **Negative signal density** : anomaly alerts triggered in 30 days, inverted (more alerts = lower score). Captures crisis-mode periods.

The score is the sum, capped 0 to 100.

## What triggers strategist outreach

Two thresholds:

- **Score below 40** : strategist sees an alert in their daily admin feed, reaches out within 1 to 2 business days
- **Trend below -10 over 7 days** : sharp decline triggers same alert even if score is still above 40 (catches "previously healthy account in trouble" pattern)

Most accounts sit between 60 and 90 most of the time. A score in the 40s is yellow. Below 40 is red. Above 80 is green.

## Why a score and not just raw alerts

Alerts catch acute problems (review bomb, citation churn). The score catches slow drift: a Growth client who logs in less and less, posts fewer photos each month, replies to fewer reviews. No single anomaly fires, but the trend is clear. Without a score, that drift goes unnoticed until cancellation.

## Privacy

- Score components stored as ratios + counts only
- No review text, no email content, no IP in the score data
- Score history retained 365 days then purged
- You can request that your strategist disable scoring for your workspace; default is ON for Growth and Agency tiers, OFF for Starter and Core (we do not have enough data to score Starter accurately)
- Scores never sent to your clients or third parties

## What you can do with it

- Ask your strategist for your current score during the monthly call
- Request the per-component breakdown to understand which area is dragging
- Use it as a self-diagnostic: low feature usage breadth means you might benefit from training on more features

## What this is NOT

- It is not a decision rule. It is a signal that informs strategist prioritization.
- It is not a payment gate. We never block features based on score.
- It is not communicated to your clients or your team without your consent.
- It is not a churn predictor with high precision; treat it as a weak signal that buys the strategist 30-60 days of warning, not a probability forecast.

## How we tune the formula

The scoring weights start at 20% each. Quarterly we review precision and recall:
- How many low-score accounts actually churned in the next 90 days?
- How many high-score accounts churned anyway (false negatives)?
- Are component weights balanced or should one (e.g., login cadence) carry more weight?

Adjustments bump the formula version. Old scores remain comparable within their version; the admin chart filters by version to avoid mixed-version trend lines.

## Asking questions

The score is meant to be transparent. Ask your strategist on the next monthly call to walk through your current score and components, and flag any data point that surprises you. The score serves you when you understand it.`,
      i18n: {
        fr: {
          title: "Le score de santé de votre compte (comment nous le mesurons et ce qui déclenche le démarchage du stratège)",
          excerpt:
            "Nous calculons un score de santé quotidien à partir de votre utilisation de la plateforme. Quand le score chute ou tend fortement à la baisse, votre stratège vous démarche avant que les choses empirent. Voici ce que nous mesurons et comment l'interpréter.",
          body: `## De quoi s'agit-il

Un travail de fond quotidien calcule un score de santé (0 à 100) pour votre espace de travail à partir de cinq comportements observables. Le score est un signal de triage pour votre stratège dédié (paliers Growth et Agency) : quand il tombe sous 40, ou quand il tend fortement à la baisse sur 7 jours, le stratège reçoit un avertissement et vous démarche en 1 à 2 jours ouvrables.

C'est UNE ENTRÉE POUR LE JUGEMENT HUMAIN, pas du pilote automatique. Le système n'annule jamais, ne rabaisse jamais, n'envoie jamais de courriel automatique avec le score. C'est un outil que le stratège utilise pour prioriser qui a besoin d'attention cette semaine.

## Ce que nous mesurons (5 composantes)

Chaque composante contribue 20% à votre score (0 à 20 points chaque, sommés à 0 à 100).

1. **Cadence de connexion** : à quelle fréquence vous (ou n'importe qui dans votre espace) vous êtes connecté sur les 30 derniers jours vs la cadence attendue pour votre palier. Sous l'attendu = composante plus basse.
2. **Étendue d'utilisation des fonctionnalités** : combien de fonctionnalités distinctes vous avez touchées en 30 jours. Une seule fonctionnalité utilisée = bas ; 5+ entre avis, photos, citations, tableau, alertes = haut.
3. **Taux de livraison GBP** : publications publiées vs planifiées sur les 30 derniers jours. Si 12 de 12 publiées = points pleins. Si 8 de 12 = partiel. Capture les soucis API en amont + votre cadence de téléversement de photos.
4. **Taux de succès des citations** : soumissions auto-batch + manuelles acceptées vs tentées en 30 jours. Haut succès = points pleins.
5. **Densité de signaux négatifs** : alertes d'anomalie déclenchées en 30 jours, inversées (plus d'alertes = score plus bas). Capture les périodes de crise.

Le score est la somme, plafonnée 0 à 100.

## Ce qui déclenche le démarchage du stratège

Deux seuils :

- **Score sous 40** : le stratège voit une alerte dans son fil admin quotidien, démarche en 1 à 2 jours ouvrables
- **Tendance sous -10 sur 7 jours** : déclin marqué déclenche la même alerte même si le score est toujours au-dessus de 40 (capture le motif "compte précédemment sain en difficulté")

La plupart des comptes se situent entre 60 et 90 la plupart du temps. Un score dans les 40 est jaune. Sous 40 est rouge. Au-dessus de 80 est vert.

## Pourquoi un score et pas juste des alertes brutes

Les alertes attrapent les problèmes aigus (vague d'avis, perte de citations). Le score attrape la dérive lente : un client Growth qui se connecte de moins en moins, publie moins de photos chaque mois, répond à moins d'avis. Aucune anomalie unique ne se déclenche, mais la tendance est claire. Sans score, cette dérive passe inaperçue jusqu'à l'annulation.

## Confidentialité

- Composantes du score stockées comme ratios + comptes seulement
- Aucun texte d'avis, aucun contenu de courriel, aucune adresse IP dans les données du score
- Historique du score retenu 365 jours puis purgé
- Vous pouvez demander que votre stratège désactive le scoring pour votre espace ; par défaut activé pour Growth et Agency, désactivé pour Starter et Core (nous n'avons pas assez de données pour scorer Starter avec précision)
- Les scores ne sont jamais envoyés à vos clients ou à des tiers

## Ce que vous pouvez en faire

- Demandez à votre stratège votre score actuel lors de l'appel mensuel
- Demandez la ventilation par composante pour comprendre quelle zone tire vers le bas
- Utilisez-le comme auto-diagnostic : étendue d'utilisation faible veut dire que vous pourriez bénéficier de formation sur plus de fonctionnalités

## Ce que ce N'EST PAS

- Ce n'est pas une règle de décision. C'est un signal qui informe la priorisation du stratège.
- Ce n'est pas une barrière de paiement. Nous ne bloquons jamais de fonctionnalités basées sur le score.
- Ce n'est pas communiqué à vos clients ou à votre équipe sans votre consentement.
- Ce n'est pas un prédicteur de désabonnement à haute précision ; traitez-le comme un signal faible qui achète au stratège 30 à 60 jours de préavis, pas une prévision de probabilité.

## Comment nous ajustons la formule

Les pondérations du scoring commencent à 20% chacune. Trimestriellement nous revoyons précision et rappel :
- Combien de comptes à score bas se sont effectivement désabonnés dans les 90 jours suivants ?
- Combien de comptes à score haut se sont quand même désabonnés (faux négatifs) ?
- Les pondérations sont-elles équilibrées ou une (ex. cadence de connexion) devrait porter plus de poids ?

Les ajustements montent la version de la formule. Les anciens scores restent comparables au sein de leur version ; le tableau admin filtre par version pour éviter les lignes de tendance à versions mêlées.

## Poser des questions

Le score est conçu pour être transparent. Demandez à votre stratège lors du prochain appel mensuel de parcourir votre score actuel et ses composantes, et signalez tout point de donnée qui vous surprend. Le score vous sert quand vous le comprenez.`,
        },
      },
  },

  // ─── Phase E.1.10 articles (added 2026-04-29) ──────────────────────
  {
    slug: "90-day-uplift-guarantee",
    title: "How our 90-day measurable visibility uplift guarantee works",
    excerpt:
      "On Core, Growth, and Agency plans, your Share of Model score must rise by 15+ points within 90 days from onboarding. If it doesn't, we refund 100% of the last 3 months billed. Here is how we measure it and what counts.",
    category: "pricing-plans",
    updatedAt: "2026-04-29",
    readingTimeMin: 6,
    body: `## The promise in one sentence

If your Share of Model score does not rise by at least 15 points within 90 days from onboarding on Core, Growth, or Agency, we refund 100% of the last 3 months you paid us.

## What is Share of Model

Share of Model is a 0-100 score that measures how often your business is mentioned, cited, or recommended by AI search engines when prospects ask questions in your industry and region. We probe weekly across 6 engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) using a curated set of queries tailored to your business, city, and vertical. The score is the average mention rate across the six engines.

## How we measure baseline

In your first 7 days we run an intensive baseline probe: 50 to 80 queries per engine, repeated to smooth volatility. The result is your day-7 baseline score. This is what we measure against on day 90.

## Why 15 points and not more

15 points is the threshold where the change is statistically meaningful, not noise. A typical client starts between 10 and 30 points; rising to 25-45 reflects real progress (more citations, more mentions, more authority signals picked up by the engines). Promising 30 or 50 points would be over-promising for some verticals (highly competitive markets like Toronto real estate or US dental) where ceiling effects exist.

## What counts toward the uplift

Anything that legitimately boosts your authority, citations, and mentions:
- New citations on directory sites (Yelp, BBB, Pages Jaunes, Wikidata, etc.)
- New blog content on your site (covered by your plan)
- New GBP posts and photos
- Schema deployment improvements
- Reputation gains (more reviews, better sentiment)
- Wikipedia or Wikidata structured data updates we make
- Any other signal our delivery layer touches

## What does NOT count

- Ad spend results (we measure organic visibility only)
- Direct traffic from your existing customers (returning visitors are not new mentions)
- Local newspaper press mentions you secure on your own (we do not control these)

## Why Starter is not eligible

Starter probes are monthly only, not weekly. The signal is too sparse to draw a meaningful 90-day delta. Starter clients still receive monthly visibility reports but the guarantee starts at Core.

## How the refund works

If on day 90 your score has not risen by 15 points or more (compared to day-7 baseline):
1. We notify you in writing within 7 days of the 90-day mark.
2. We process a refund equal to your last 3 months billed (regardless of which plan you were on).
3. The refund is sent via Stripe to the payment method on file within 14 days.
4. You keep all the work delivered: blog posts, citations, schema, your site, your data exports.
5. Your subscription remains active unless you choose to cancel.

## What if you upgrade or downgrade mid-cycle

If you switch plans (Core to Growth, etc.) within the 90-day window, the guarantee continues at the new plan tier. The refund amount is calculated using the actual amounts billed across those months. If you downgrade to Starter mid-cycle, the guarantee ends because Starter is not eligible.

## What we have seen in practice

We have triggered the refund on less than 3% of Core+ clients. The two most common scenarios where we trigger it:

1. Highly competitive markets (eg. Toronto luxury real estate) where the established players have years of head start.
2. Verticals with niche AI-search query volume (eg. specialized B2B services that prospects do not search via AI yet).

In both cases we typically also recommend pausing or rethinking strategy rather than continuing without progress. The refund is a forcing function on us, not a way for clients to game the system.

## How to verify your score

You can see your current Share of Model score live in your AiLys dashboard. The scoring breakdown shows which engines are pulling the score up or down, which queries you appear on, and which competitors are outranking you. Your monthly visibility report PDF includes the same data with strategist commentary.`,
    i18n: {
      fr: {
        title: "Comment fonctionne notre garantie de hausse de visibilite mesurable a 90 jours",
        excerpt:
          "Sur les forfaits Core, Growth et Agency, votre score Share of Model doit augmenter de 15+ points dans les 90 jours suivant votre integration. Sinon, nous remboursons 100 % des 3 derniers mois factures. Voici comment nous mesurons et ce qui compte.",
        body: `## La promesse en une phrase

Si votre score Share of Model n'augmente pas d'au moins 15 points dans les 90 jours suivant votre integration sur Core, Growth ou Agency, nous remboursons 100 % des 3 derniers mois factures.

## Qu'est-ce que Share of Model

Share of Model est un score de 0 a 100 qui mesure la frequence a laquelle votre entreprise est mentionnee, citee ou recommandee par les moteurs de recherche IA quand les prospects posent des questions dans votre secteur et region. Nous sondons chaque semaine sur 6 moteurs (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) avec une serie de requetes adaptees a votre entreprise, ville et secteur. Le score est le taux moyen de mention sur les six moteurs.

## Comment nous mesurons la reference

Pendant vos 7 premiers jours nous executons un sondage intensif de reference : 50 a 80 requetes par moteur, repetees pour lisser la volatilite. Le resultat est votre score de reference jour 7. C'est ce que nous comparons au jour 90.

## Pourquoi 15 points et pas plus

15 points est le seuil ou le changement est statistiquement significatif, pas du bruit. Un client typique demarre entre 10 et 30 points ; monter a 25-45 reflete un vrai progres (plus de citations, plus de mentions, plus de signaux d'autorite repris par les moteurs). Promettre 30 ou 50 points serait sur-prometteur dans certains secteurs (marches tres concurrentiels comme l'immobilier Toronto ou le dentaire US) ou des effets de plafond existent.

## Ce qui compte pour la hausse

Tout ce qui booste legitimement votre autorite, citations et mentions :
- Nouvelles citations sur sites annuaires (Yelp, BBB, Pages Jaunes, Wikidata, etc.)
- Nouveau contenu blogue sur votre site (couvert par votre forfait)
- Nouvelles publications et photos GBP
- Ameliorations du deploiement de schema
- Gains de reputation (plus d'avis, meilleur sentiment)
- Mises a jour Wikipedia ou Wikidata structurees que nous effectuons
- Tout autre signal touche par notre couche de livraison

## Ce qui ne compte PAS

- Resultats des depenses publicitaires (nous mesurons la visibilite organique seulement)
- Trafic direct de vos clients existants (les visiteurs qui reviennent ne sont pas de nouvelles mentions)
- Mentions presse locales que vous obtenez par vos propres moyens (nous ne controlons pas cela)

## Pourquoi Starter n'est pas eligible

Les sondes Starter sont mensuelles seulement, pas hebdomadaires. Le signal est trop epars pour tirer un delta 90 jours significatif. Les clients Starter recoivent quand meme les rapports mensuels de visibilite mais la garantie demarre a Core.

## Comment fonctionne le remboursement

Si au jour 90 votre score n'a pas augmente d'au moins 15 points (par rapport a la reference jour 7) :
1. Nous vous notifions par ecrit dans les 7 jours suivant la marque des 90 jours.
2. Nous traitons un remboursement egal a vos 3 derniers mois factures (peu importe le forfait sur lequel vous etiez).
3. Le remboursement est envoye via Stripe au mode de paiement enregistre dans les 14 jours.
4. Vous conservez tout le travail livre : articles de blogue, citations, schema, votre site, vos exports de donnees.
5. Votre abonnement reste actif sauf si vous choisissez d'annuler.

## Si vous montez ou descendez de forfait en cours

Si vous changez de forfait (Core a Growth, etc.) dans les 90 jours, la garantie continue au nouveau tier. Le montant du remboursement est calcule selon les montants reellement factures sur ces mois. Si vous descendez vers Starter en cours, la garantie se termine car Starter n'est pas eligible.

## Ce qu'on a vu en pratique

Nous avons declenche le remboursement chez moins de 3 % des clients Core+. Les deux scenarios les plus courants ou nous le declenchons :

1. Marches tres concurrentiels (ex. immobilier de luxe Toronto) ou les acteurs etablis ont des annees d'avance.
2. Secteurs avec un volume de requetes IA-search niche (ex. services B2B specialises ou les prospects ne cherchent pas via IA encore).

Dans les deux cas nous recommandons typiquement aussi une pause ou une refonte de strategie plutot que continuer sans progres. Le remboursement est une force motrice sur nous, pas une facon pour les clients de tricher.

## Comment verifier votre score

Vous pouvez voir votre score Share of Model actuel en direct dans votre tableau de bord AiLys. La decomposition du score montre quels moteurs tirent le score vers le haut ou vers le bas, sur quelles requetes vous apparaissez et quels concurrents vous depassent. Votre rapport PDF mensuel de visibilite inclut les memes donnees avec commentaires du stratege.`,
      },
    },
  },
  {
    slug: "website-construction-fees-and-cancellation",
    title: "Website construction fees and cancellation",
    excerpt:
      "If we build your site, the build cost is amortized over 6 months on top of your monthly plan. Cancel within 6 months and a recovery fee applies, calculated linearly. After month 6, no fee applies on the build cost.",
    category: "pricing-plans",
    updatedAt: "2026-04-29",
    readingTimeMin: 5,
    body: `## When this applies

This article applies only when AiLys builds your website. If you bring your own existing site, no construction fee applies. We do not charge a construction fee for citations, schema deployment, or blog content; those are part of your monthly plan.

## The 3 build sizes

| Site type | Pages | Build cost | Tier eligibility |
|---|---|---|---|
| Vitrine | 1 to 5 pages | $800 | Starter, Core, Growth |
| PME | 6 to 15 pages | $1,500 | Core, Growth |
| Commerce | 16 to 25 pages | $3,000 | Growth only |

Larger commerce sites (26+ pages or with custom integrations) are quoted individually starting from $3,000. Agency tier clients typically have their own dev team or creative agency, so we do not offer construction service on Agency.

## How the construction cost is paid

The construction cost is amortized over 6 months on top of your monthly plan. There is no large up-front payment. For a Vitrine on Core ($600/mo plan), the math is:
- Month 1 to 6: $600/mo plan + $133/mo amortization (build $800 / 6) = $733/mo
- Month 7 onwards: $600/mo plan only (build is fully amortized)

You see two line items on your invoice: the plan and the amortized build slice.

## Cancellation recovery fee

If you cancel before the 6 months are up, a recovery fee applies, calculated linearly:

> recovery fee = build cost x (6 - months paid) / 6

Examples for a Vitrine ($800 build):
- Cancel after month 1: fee = $800 x 5 / 6 = $667
- Cancel after month 2: fee = $800 x 4 / 6 = $533
- Cancel after month 3: fee = $800 x 3 / 6 = $400
- Cancel after month 4: fee = $800 x 2 / 6 = $267
- Cancel after month 5: fee = $800 x 1 / 6 = $133
- Cancel after month 6 or later: fee = $0

## Why 6 months and linear

6 months is the standard amortization window in Quebec web agencies. Long enough to cover our delivery cost, short enough to not feel like a hostage situation. Linear means the longer you stay, the less you owe; this is more equitable than a flat fee that punishes early cancellation as much as late cancellation.

## You keep the site

The website is yours from day one of payment. The recovery fee covers our build labor that has not been recouped through monthly amortization, not the rights to the site. After cancellation:
- The site continues to function on the hosting we set up (Cloudflare Pages, free tier).
- DNS records remain pointing to your domain.
- You get the codebase exported as a zip and a 30-day window to migrate the hosting elsewhere if you prefer.
- All your content, photos, and analytics belong to you.

## What if I want to upgrade my site mid-amortization

You move from Vitrine to PME (for example). Differential build cost is calculated: $1,500 - $800 = $700. That $700 starts a new 6-month amortization window. Your existing $800 amortization continues on its original schedule. Your tier may need to upgrade too (PME requires Core or higher).

## What if my plan downgrades

If you downgrade your monthly plan and the new tier is not eligible for your current site size (eg. you had Vitrine on Core and downgrade to Starter, which is still eligible; or you had PME on Core and try to downgrade to Starter which is not eligible for PME), we keep your site live but flag the tier mismatch. You either:
1. Upgrade back within 30 days.
2. Migrate to a smaller site size with us (and pay the differential builder fee, refunded if smaller).
3. Cancel the website service entirely (recovery fee applies if within 6 months).

## 30-day satisfaction guarantee

The 30-day satisfaction guarantee on all AiLys plans applies to construction too. If within 30 days the delivered site does not match the agreed scope (visible in your signed scope document), we refund the build amortization paid to date (the plan portion is also refunded under the standard guarantee). Beyond day 30, satisfaction with the site itself is governed by our scope-signed agreement.

## Hosting and domain

Hosting is included free for as long as you are an AiLys client. Domain registration is your responsibility (we recommend Namecheap or Cloudflare Registrar; we do not register domains on your behalf for ownership clarity).

## Honest disclosure

This is a construction fee model, not a leasing or financing model. You own the site. The recovery fee exists because we deliver labor on day 1-30 and bill it across 6 months. If you walk before we recoup, we ask you to pay the unamortized portion. We believe this is the most equitable arrangement for a small agency and small business client. If you find it unfair, please tell us; we are open to revising the structure.`,
    i18n: {
      fr: {
        title: "Frais de construction de site web et resiliation",
        excerpt:
          "Si nous construisons votre site, le cout de construction est amorti sur 6 mois en plus de votre forfait mensuel. Si vous resiliez avant 6 mois, des frais de recuperation s'appliquent, calcules de facon lineaire. Apres le mois 6, aucun frais ne s'applique sur le cout de construction.",
        body: `## Quand ceci s'applique

Cet article s'applique uniquement quand AiLys construit votre site. Si vous apportez votre site existant, aucun frais de construction ne s'applique. Nous ne facturons pas de frais de construction pour les citations, le deploiement de schema ou le contenu blogue ; ceux-ci font partie de votre forfait mensuel.

## Les 3 tailles de site

| Type de site | Pages | Cout de construction | Eligibilite tier |
|---|---|---|---|
| Vitrine | 1 a 5 pages | 800 $ | Starter, Core, Growth |
| PME | 6 a 15 pages | 1 500 $ | Core, Growth |
| Commerce | 16 a 25 pages | 3 000 $ | Growth uniquement |

Les sites Commerce plus grands (26+ pages ou avec integrations custom) sont devises individuellement a partir de 3 000 $. Les clients Agency ont generalement leur propre equipe dev ou agence creative, donc nous n'offrons pas le service de construction sur Agency.

## Comment le cout de construction est paye

Le cout de construction est amorti sur 6 mois en plus de votre forfait mensuel. Aucun gros paiement a l'avance. Pour une Vitrine sur Core (forfait 600 $/mois), le calcul est :
- Mois 1 a 6 : 600 $/mois forfait + 133 $/mois amortissement (800 $ construction / 6) = 733 $/mois
- Mois 7 et plus : 600 $/mois forfait seulement (la construction est entierement amortie)

Vous voyez deux postes sur votre facture : le forfait et la tranche d'amortissement de la construction.

## Frais de recuperation a la resiliation

Si vous resiliez avant que les 6 mois soient ecoules, des frais de recuperation s'appliquent, calcules de facon lineaire :

> frais de recuperation = cout construction x (6 - mois payes) / 6

Exemples pour une Vitrine (construction 800 $) :
- Resiliation apres mois 1 : frais = 800 $ x 5 / 6 = 667 $
- Resiliation apres mois 2 : frais = 800 $ x 4 / 6 = 533 $
- Resiliation apres mois 3 : frais = 800 $ x 3 / 6 = 400 $
- Resiliation apres mois 4 : frais = 800 $ x 2 / 6 = 267 $
- Resiliation apres mois 5 : frais = 800 $ x 1 / 6 = 133 $
- Resiliation apres mois 6 ou plus tard : frais = 0 $

## Pourquoi 6 mois et lineaire

6 mois est la fenetre d'amortissement standard chez les agences web au Quebec. Assez long pour couvrir notre cout de livraison, assez court pour ne pas avoir l'air d'une situation d'otage. Lineaire signifie que plus vous restez longtemps, moins vous devez ; c'est plus equitable qu'un forfait fixe qui punit autant la resiliation precoce que tardive.

## Vous gardez le site

Le site web vous appartient des le premier jour de paiement. Les frais de recuperation couvrent le travail de construction non recoupe par l'amortissement mensuel, pas les droits sur le site. Apres resiliation :
- Le site continue de fonctionner sur l'hebergement que nous avons mis en place (Cloudflare Pages, niveau gratuit).
- Les enregistrements DNS continuent de pointer vers votre domaine.
- Vous recevez le code source exporte en zip et une fenetre de 30 jours pour migrer l'hebergement ailleurs si vous preferez.
- Tout votre contenu, photos et analytiques vous appartiennent.

## Si je veux agrandir mon site en cours d'amortissement

Vous passez de Vitrine a PME (par exemple). Le cout de construction differentiel est calcule : 1 500 $ - 800 $ = 700 $. Ce 700 $ demarre une nouvelle fenetre d'amortissement de 6 mois. Votre amortissement existant de 800 $ continue selon son calendrier d'origine. Votre tier peut avoir besoin d'une mise a niveau aussi (PME requiert Core ou plus).

## Si mon forfait baisse

Si vous descendez votre forfait mensuel et que le nouveau tier n'est pas eligible pour votre taille de site actuelle (ex. vous aviez Vitrine sur Core et vous descendez a Starter, qui reste eligible ; ou vous aviez PME sur Core et essayez de descendre a Starter qui n'est pas eligible pour PME), nous gardons votre site en ligne mais signalons l'inadequation tier. Vous :
1. Remontez votre forfait dans les 30 jours.
2. Migrez vers une taille de site plus petite avec nous (et payez la difference de construction, remboursee si plus petite).
3. Resiliez le service de site web entierement (les frais de recuperation s'appliquent si dans les 6 mois).

## Garantie satisfaction 30 jours

La garantie satisfaction 30 jours sur tous les forfaits AiLys s'applique aussi a la construction. Si dans les 30 jours le site livre ne correspond pas a la portee convenue (visible dans votre document de portee signe), nous remboursons l'amortissement de construction paye a ce jour (la portion forfait est aussi remboursee selon la garantie standard). Au-dela du jour 30, la satisfaction concernant le site lui-meme est regie par notre entente signee.

## Hebergement et domaine

L'hebergement est inclus gratuitement tant que vous etes client AiLys. L'enregistrement de domaine est votre responsabilite (nous recommandons Namecheap ou Cloudflare Registrar ; nous n'enregistrons pas de domaine en votre nom pour clarte de propriete).

## Divulgation honnete

Ceci est un modele de frais de construction, pas un modele de location ou de financement. Vous etes proprietaire du site. Les frais de recuperation existent parce que nous livrons du travail aux jours 1-30 et le facturons sur 6 mois. Si vous partez avant que nous recoupions, nous demandons que vous payiez la portion non amortie. Nous croyons que c'est l'arrangement le plus equitable pour une petite agence et un petit client commercial. Si vous le trouvez injuste, dites-le-nous ; nous sommes ouverts a reviser la structure.`,
      },
    },
  },
  {
    slug: "engagement-discounts-annual-biennial",
    title: "Engagement discounts: annual 15% and biennial 20%",
    excerpt:
      "Pay annually upfront and save 15% on any plan. Pay biennially (24 months) upfront and save 20% on Growth or Agency. Here is how it works, who is eligible, and what happens if you cancel mid-engagement.",
    category: "pricing-plans",
    updatedAt: "2026-04-29",
    readingTimeMin: 4,
    body: `## The discount tiers

| Engagement | Discount | Eligible plans |
|---|---|---|
| Monthly | 0% | All plans |
| Annual prepay (12 months) | 15% | All plans (Starter, Core, Growth, Agency) |
| Biennial prepay (24 months) | 20% | Growth, Agency only |

## Why annual is 15% and not more

15% is roughly 2 months free per year. It is the industry-standard discount that aligns incentives: clients save real money, we get cash flow predictability, neither side feels exploited. Pushing to 20% on annual would erode our margin to a point where we could not maintain delivery quality if our delivery costs (Anthropic API, GBP API, R2 storage) rose.

## Why biennial is only on Growth and Agency

Two reasons:
1. Biennial commitment requires a confident long-term fit. Starter and Core clients are typically still validating product-market fit themselves; locking them in for 24 months is not in their interest.
2. Biennial accounting carries small-business prepay risk. If our costs rise materially over 24 months, we still owe 24 months of service at the locked-in price. Limiting biennial to Growth and Agency contains that risk.

## Calculation examples

For Core ($600/mo):
- Monthly billing: $600 x 12 = $7,200/year
- Annual prepay (-15%): $6,120/year (you save $1,080, ~2 months free)

For Growth ($1,200/mo):
- Monthly billing: $1,200 x 12 = $14,400/year
- Annual prepay (-15%): $12,240/year (save $2,160)
- Biennial prepay (-20%): $14,400 x 2 x 0.80 = $23,040 for 2 years (save $5,760, ~5 months free over 24 months)

## What you get on engagement plans

The same delivery as monthly. Same service level, same support SLA, same number of GBP posts, same number of citations, same probes. The only differences:
- Lower effective monthly cost
- Single annual or biennial invoice (easier accounting for SMBs)
- Locked-in price for the engagement duration (we do not raise your monthly cost mid-engagement)

## What happens if you cancel mid-engagement

If you cancel within an engagement period:
- You forfeit the discount; we recompute the months you used at the standard monthly rate.
- The difference (what you would have paid monthly minus what you actually paid) is invoiced as a final settlement.

Example: You signed annual on Core ($6,120 for 12 months) and cancel at month 4.
- You paid: $6,120 (the full annual upfront).
- You used: 4 months at standard $600/mo = $2,400.
- The difference: $3,720 owed back to you. We refund $3,720 via Stripe.

Some agencies refuse to refund. We refund the proportional unused portion at standard monthly rate. You forfeit the discount benefit but you do not lose all the prepaid amount.

## What happens if your build runs into the engagement period

If you have a website build amortization in addition to your plan, the build amortization is independent of the engagement discount. The plan discount applies only to the monthly plan portion. Construction amortization continues on its 6-month schedule at full price.

## Switching plans mid-engagement

You can upgrade mid-engagement (Core to Growth). The discount continues at the new tier price level. Differential is invoiced.

You can downgrade mid-engagement only to a smaller plan, with the engagement discount continuing. If you downgrade out of Growth and you were on biennial (Growth or Agency only), you switch to annual at -15% on the lower plan.

## Why you might pick monthly over annual

- You are testing AiLys and not sure yet (use the 30-day satisfaction guarantee instead).
- You prefer to stay flexible without prepay accounting on your books.
- Your cash flow is tight and a single annual upfront is hard to absorb.

In any case, you can always switch from monthly to annual or biennial at any time; the discount applies to the new period.

## Tax handling

All quoted prices are before TPS+TVQ (14.975% for Quebec clients). The toggle on /forfaits-complets shows tax-inclusive pricing if you prefer. Engagement discounts apply to the pre-tax price; tax is then computed on the discounted base.`,
    i18n: {
      fr: {
        title: "Remises d'engagement : annuel 15 % et biennal 20 %",
        excerpt:
          "Payez annuellement a l'avance et economisez 15 % sur n'importe quel forfait. Payez biennalement (24 mois) a l'avance et economisez 20 % sur Growth ou Agency. Voici comment ca fonctionne, qui est eligible et ce qui se passe si vous resiliez en cours d'engagement.",
        body: `## Les paliers de remise

| Engagement | Remise | Forfaits eligibles |
|---|---|---|
| Mensuel | 0 % | Tous les forfaits |
| Annuel prepaye (12 mois) | 15 % | Tous (Starter, Core, Growth, Agency) |
| Biennal prepaye (24 mois) | 20 % | Growth, Agency uniquement |

## Pourquoi annuel a 15 % et pas plus

15 % equivaut a environ 2 mois gratuits par annee. C'est la remise standard de l'industrie qui aligne les incitations : les clients economisent reellement, nous obtenons une previsibilite de tresorerie, aucune partie ne se sent exploitee. Pousser a 20 % sur l'annuel eroderait notre marge a un point ou nous ne pourrions pas maintenir la qualite de livraison si nos couts de livraison (API Anthropic, API GBP, stockage R2) augmentaient.

## Pourquoi biennal seulement sur Growth et Agency

Deux raisons :
1. L'engagement biennal requiert une confiance dans un fit long-terme. Les clients Starter et Core valident generalement encore leur propre product-market fit ; les verrouiller 24 mois n'est pas dans leur interet.
2. La comptabilite biennale comporte un risque de prepaiement pour une petite entreprise. Si nos couts montent significativement sur 24 mois, nous devons quand meme livrer 24 mois au prix verrouille. Limiter biennal a Growth et Agency contient ce risque.

## Exemples de calcul

Pour Core (600 $/mois) :
- Facturation mensuelle : 600 $ x 12 = 7 200 $/an
- Annuel prepaye (-15 %) : 6 120 $/an (vous economisez 1 080 $, environ 2 mois gratuits)

Pour Growth (1 200 $/mois) :
- Facturation mensuelle : 1 200 $ x 12 = 14 400 $/an
- Annuel prepaye (-15 %) : 12 240 $/an (economie 2 160 $)
- Biennal prepaye (-20 %) : 1 200 $ x 24 x 0,80 = 23 040 $ pour 2 ans (economie 5 760 $, environ 5 mois gratuits sur 24 mois)

## Ce que vous obtenez sur les forfaits d'engagement

La meme livraison qu'au mensuel. Meme niveau de service, meme SLA de support, meme nombre de publications GBP, meme nombre de citations, memes sondes. Les seules differences :
- Cout mensuel effectif plus bas
- Facture annuelle ou biennale unique (comptabilite plus simple pour PME)
- Prix verrouille pour la duree de l'engagement (nous n'augmentons pas votre cout mensuel en cours d'engagement)

## Que se passe-t-il si vous resiliez en cours d'engagement

Si vous resiliez dans une periode d'engagement :
- Vous perdez la remise ; nous recalculons les mois utilises au tarif mensuel standard.
- La difference (ce que vous auriez paye au mensuel moins ce que vous avez reellement paye) est facturee comme reglement final.

Exemple : vous avez signe annuel sur Core (6 120 $ pour 12 mois) et resiliez au mois 4.
- Paye : 6 120 $ (l'annuel complet a l'avance).
- Utilise : 4 mois au tarif standard de 600 $/mois = 2 400 $.
- La difference : 3 720 $ vous est due. Nous remboursons 3 720 $ via Stripe.

Certaines agences refusent de rembourser. Nous remboursons la portion proportionnelle non utilisee au tarif mensuel standard. Vous perdez l'avantage de la remise mais vous ne perdez pas tout le montant prepaye.

## Ce qui se passe si votre construction tombe dans la periode d'engagement

Si vous avez un amortissement de construction de site en plus de votre forfait, l'amortissement de la construction est independant de la remise d'engagement. La remise du forfait s'applique uniquement a la portion forfait mensuel. L'amortissement de la construction continue selon son calendrier de 6 mois au prix plein.

## Changement de forfait en cours d'engagement

Vous pouvez monter en cours d'engagement (Core a Growth). La remise continue au nouveau niveau de prix tier. La difference est facturee.

Vous pouvez descendre en cours d'engagement uniquement vers un forfait plus petit, avec la remise d'engagement qui continue. Si vous descendez hors de Growth et que vous etiez sur biennal (Growth ou Agency uniquement), vous passez a annuel a -15 % sur le forfait inferieur.

## Pourquoi vous pourriez choisir mensuel plutot qu'annuel

- Vous testez AiLys et n'etes pas encore sur (utilisez la garantie satisfaction de 30 jours a la place).
- Vous preferez rester flexible sans comptabilite de prepaiement dans vos livres.
- Votre tresorerie est tendue et un seul prepaiement annuel est difficile a absorber.

Dans tous les cas, vous pouvez toujours passer de mensuel a annuel ou biennal a tout moment ; la remise s'applique a la nouvelle periode.

## Gestion des taxes

Tous les prix indiques sont avant TPS+TVQ (14,975 % pour les clients quebecois). Le toggle sur /forfaits-complets affiche les prix toutes taxes comprises si vous preferez. Les remises d'engagement s'appliquent au prix avant taxes ; la taxe est ensuite calculee sur la base remise.`,
      },
    },
  },

  // ─── Phase E.10 articles (added 2026-04-30) ──────────────────────
  {
    slug: "instant-ai-visibility-audit-explained",
    title: "How our instant AI Visibility audit works (and what to do with the score)",
    excerpt:
      "Type your business name and URL on /forfaits-complets, get a Share-of-Model score (0-100) plus 3 missing-points bullets in 8-12 seconds. Here is what the score means, how it is computed, and what to do with each band.",
    category: "audit",
    updatedAt: "2026-04-30",
    readingTimeMin: 5,
    body: `## What you get in 12 seconds

Type 2 inputs (business name + your URL), click submit, and the form returns:
- A Share-of-Model score from 0 to 100
- 3 short bullets identifying what is most likely missing or weak
- A button to book a free 15-minute strategy call if you want a deeper analysis

The form does not require your email. We do not run scans on your URL behind the scenes either; the score is inferred from the brand signals our engine can reason about based on the business name and URL alone.

## What the score means

The score is a relative indicator, not a perfect measure:

| Band | Score | Meaning |
|---|---|---|
| Critical | 0 to 29 | Your brand is mostly invisible to AI search engines. Citations rare, schema absent, GBP signals missing. Most local businesses without active AI visibility work sit here. |
| Weak | 30 to 49 | Some signals present (a Google Business Profile, basic site, scattered reviews) but the AI engines have insufficient confidence to cite you in answers. |
| Developing | 50 to 69 | Foundations are in place. With 60-90 days of focused work (citations, schema, content), you can move into Strong. |
| Strong | 70 to 89 | Your brand is regularly cited by at least 3 of the 6 AI engines for relevant local queries. |
| Leader | 90 to 100 | Reserved for established brands with cross-engine consistency, deep entity authority, and active content velocity. Rare. |

## How the score is computed

We do not browse your site at audit time (that would take minutes, not seconds, and would be unfair to your server). Instead, our engine reasons about typical signals associated with the business name and URL:
- Brand notability (does the name appear in our model's training data?)
- URL pattern (does the domain look established, vertical-specific, multi-location?)
- Geographic context (Quebec, Canada, US)
- Vertical inference (the business name often hints at the industry)

A full audit, by contrast, runs 50 to 80 actual queries across 6 AI engines, parses the responses, and counts your appearances. That is what the free /audit page does, and what the 90-day uplift guarantee is measured against.

## What to do with each band

**Critical (0-29):** start with the Starter plan or directly with the Founding Clients program. Foundational schema deployment + GBP cleanup + 5 citations per month will move the needle within 60 days.

**Weak (30-49):** Core plan is the right fit. The bilingual blog content, AEO schema deployment, and citation cadence push you into Developing within the 90-day window.

**Developing (50-69):** Growth plan if you can. Weekly AI Visibility probes give you the feedback loop to catch gains in real time. GEO entity authority work (Wikidata) accelerates progress.

**Strong (70-89):** congratulations, your fundamentals are solid. Agency tier helps if you have multiple locations or if you want to maintain dominance across cycles.

**Leader (90-100):** you do not need us for the basics. We can still help with multi-location coordination, white-label client reports if you are an agency, or specific vertical optimizations.

## Limits of the instant audit

This is a quick directional reading, not a definitive measurement:
- Verticals with sparse AI training data (very niche B2B services) score lower than they "should" because the model has limited context.
- Highly common business names (5 dental offices called Cabinet Dentaire Centre-Ville in Quebec) get scored as the most prominent variant.
- Brand-new businesses (less than 6 months online) often score 0-15 regardless of quality, because there is no track record to reason about yet.

For a precise measurement, run the free /audit page. It gives a real Share of Model based on actual queries.

## Privacy

The instant audit form does not require email. We hash your IP address for rate limiting (5 audits per IP per 15 minutes) and we cache results 24 hours to avoid charging you twice for the same input. After 24 hours the cache entry is auto-evicted. No personal information is stored in clear text in any log.`,
    i18n: {
      fr: {
        title: "Comment fonctionne notre audit instantane AI Visibility (et quoi faire avec le score)",
        excerpt:
          "Inscrivez le nom de votre entreprise et votre URL sur /forfaits-complets, obtenez un score Share of Model (0-100) plus 3 puces de points manquants en 8-12 secondes. Voici ce que le score signifie, comment il est calcule et quoi faire pour chaque bande.",
        body: `## Ce que vous obtenez en 12 secondes

Inscrivez 2 entrees (nom d'entreprise + votre URL), cliquez soumettre, et le formulaire retourne :
- Un score Share of Model de 0 a 100
- 3 puces courtes identifiant ce qui manque ou faiblit le plus probablement
- Un bouton pour reserver un appel strategique gratuit de 15 min si vous voulez une analyse plus profonde

Le formulaire ne demande pas votre courriel. Nous ne scannons pas non plus votre URL en arriere-plan ; le score est deduit des signaux de marque que notre moteur peut raisonner a partir du nom d'entreprise et de l'URL seuls.

## Ce que le score signifie

Le score est un indicateur relatif, pas une mesure parfaite :

| Bande | Score | Signification |
|---|---|---|
| Critique | 0 a 29 | Votre marque est principalement invisible pour les moteurs IA. Citations rares, schema absent, signaux GBP manquants. La plupart des PME locales sans travail actif de visibilite IA sont ici. |
| Faible | 30 a 49 | Certains signaux presents (fiche Google Business, site basique, avis disperses) mais les moteurs IA ont une confiance insuffisante pour vous citer dans les reponses. |
| En developpement | 50 a 69 | Les fondations sont en place. Avec 60-90 jours de travail cible (citations, schema, contenu), vous pouvez passer en Fort. |
| Fort | 70 a 89 | Votre marque est regulierement citee par au moins 3 des 6 moteurs IA pour les requetes locales pertinentes. |
| Leader | 90 a 100 | Reserve aux marques etablies avec coherence cross-moteur, autorite d'entite profonde et velocite de contenu active. Rare. |

## Comment le score est calcule

Nous ne navigons pas votre site au moment de l'audit (ca prendrait des minutes, pas secondes, et serait injuste pour votre serveur). Plutot, notre moteur raisonne sur les signaux typiques associes au nom d'entreprise et a l'URL :
- Notoriete de marque (le nom apparait-il dans les donnees d'entrainement de notre modele ?)
- Modele d'URL (le domaine semble-t-il etabli, sectoriel, multi-emplacements ?)
- Contexte geographique (Quebec, Canada, US)
- Inference de secteur (le nom d'entreprise indique souvent l'industrie)

Un audit complet, en revanche, execute 50 a 80 vraies requetes sur 6 moteurs IA, analyse les reponses et compte vos apparitions. C'est ce que fait la page /audit gratuite, et c'est contre quoi la garantie de hausse a 90 jours est mesuree.

## Quoi faire avec chaque bande

**Critique (0-29) :** demarrez avec Starter ou directement avec le programme Founding Clients. Deploiement de schema fondationnel + nettoyage GBP + 5 citations par mois feront bouger l'aiguille en 60 jours.

**Faible (30-49) :** Core est le bon fit. Le contenu blogue bilingue, le deploiement de schema AEO et la cadence de citations vous pousseront en En developpement dans la fenetre de 90 jours.

**En developpement (50-69) :** Growth si possible. Les sondes hebdomadaires AI Visibility donnent la boucle de retroaction pour attraper les gains en temps reel. Le travail d'autorite d'entite GEO (Wikidata) accelere le progres.

**Fort (70-89) :** felicitations, vos fondamentaux sont solides. Le tier Agency aide si vous avez plusieurs emplacements ou voulez maintenir la dominance entre cycles.

**Leader (90-100) :** vous n'avez pas besoin de nous pour les bases. Nous pouvons encore aider avec la coordination multi-emplacements, les rapports client en marque blanche si vous etes une agence, ou des optimisations sectorielles specifiques.

## Limites de l'audit instantane

C'est une lecture directionnelle rapide, pas une mesure definitive :
- Les secteurs avec donnees d'entrainement IA epars (services B2B tres niches) ont un score plus bas qu'ils ne "devraient" parce que le modele a peu de contexte.
- Les noms d'entreprise tres communs (5 cabinets dentaires Centre-Ville au Quebec) sont scores comme la variante la plus en vue.
- Les entreprises tres recentes (moins de 6 mois en ligne) scorent souvent 0-15 peu importe la qualite, parce qu'il n'y a pas d'historique sur lequel raisonner.

Pour une mesure precise, executez la page /audit gratuite. Elle donne un vrai Share of Model base sur des requetes reelles.

## Vie privee

Le formulaire d'audit instantane ne demande pas de courriel. Nous hashons votre adresse IP pour la limitation de debit (5 audits par IP par 15 minutes) et mettons en cache les resultats 24 heures pour eviter de vous facturer deux fois la meme entree. Apres 24 heures l'entree de cache est auto-eliminee. Aucune information personnelle n'est stockee en clair dans aucun journal.`,
      },
    },
  },
  {
    slug: "roi-projection-explained",
    title: "How our ROI projection works (and why we show 3 scenarios)",
    excerpt:
      "Type your average ticket size and current monthly clients on /forfaits-complets. We project conservative, likely, and aggressive uplift across the 4 plans. Here is the math, the data behind the bands, and how to read the output honestly.",
    category: "audit",
    updatedAt: "2026-04-30",
    readingTimeMin: 4,
    body: `## What it does

Two inputs:
- Average ticket size in CAD (your typical client transaction)
- Current monthly clients (how many clients you already get per month)

Output: a 4-row table showing 3 uplift scenarios per plan:
- Conservative: 15% extra clients
- Likely: 25% extra clients (highlighted in green)
- Aggressive: 40% extra clients

For each scenario, you see extra revenue per month, net after the plan cost, and the ROI multiple.

## The 15/25/40% bands

These bands come from observed AI Visibility lift across existing AiLys clients at the 90-day mark, not from marketing imagination:
- The bottom of the distribution (small markets, late-stage verticals) lands around +12 to +18% client uplift
- The middle of the distribution (typical Quebec local business in a normal market) lands around +20 to +30%
- The top of the distribution (greenfield markets, well-positioned brand, active reviews) reaches +35 to +45%

We round to 15/25/40 for round-number readability.

## What is and is not included

The projection counts only **new organic clients** acquired through AI search visibility. It does not count:
- Repeat business from your existing customer base
- Direct traffic (people who type your URL directly)
- Paid ad results (we do not manage ads)
- Word of mouth referrals (impossible to attribute)

If your business already has strong AI search visibility (Share of Model above 70), the projection is overly optimistic. The bands assume you start from a position where the work has room to move the needle.

## Why we show 3 scenarios instead of one

Two reasons:
1. **Honesty.** The likely scenario gives you a realistic planning number. The conservative scenario tells you the floor; the aggressive scenario tells you the ceiling. A single number would hide the variance you should account for.
2. **Decision quality.** If the conservative ROI is positive, the plan is a low-risk bet. If only the aggressive ROI is positive, you are betting on perfect execution and you should de-risk further first.

## What it does NOT replace

The ROI projection is a planning aid, not a contract. The actual contract is:
- The 30-day satisfaction guarantee (refund month 1 if delivery does not match the kickoff doc)
- The 90-day measurable uplift refund (Core+, refund last 3 months if Share of Model does not rise +15 points)

Those are the hard guarantees. The ROI calculator is the soft sketch that helps you decide whether the plan is worth trying.

## How to read it cleanly

1. Skip the conservative number if you are confident in your vertical. Skip the aggressive number if you are skeptical of your market.
2. Compare the **Likely** ROI multiple across plans. If Core gives you a 3x ROI and Growth gives you a 2.8x, Core has better leverage on your money even though Growth has higher absolute revenue.
3. Net is more important than ROI multiple in absolute terms. A 5x ROI on a tiny base may be worse cash flow than a 2x ROI on a large base.
4. Run the calculator twice with conservative and optimistic ticket sizes (your worst client vs your average client) to see the range.

## Verticals where the bands hold up well

- Restaurants, dentists, beauty salons in markets between 10K and 500K population
- Service contractors (plumbers, electricians, HVAC) with 5+ years of operation
- Real estate agents in mid-density markets (Quebec City, Sherbrooke, Trois-Rivieres)

## Verticals where the bands underestimate

- Niche B2B with 50 to 200 ideal clients in the world (because volume is low, the percentage view distorts)
- Wedding venues, event spaces (high ticket, low volume; +15% means 1 extra wedding per month, often a $3,000-15,000 swing)

## Verticals where the bands may overestimate

- Hyper-saturated markets (Toronto luxury real estate, Vancouver tech consultants) where the established players have years of head start
- Recently launched businesses (less than 12 months) where compounding has not started yet`,
    i18n: {
      fr: {
        title: "Comment fonctionne notre projection de ROI (et pourquoi nous montrons 3 scenarios)",
        excerpt:
          "Indiquez votre panier moyen et vos clients mensuels actuels sur /forfaits-complets. Nous projetons une hausse prudente, probable et agressive sur les 4 forfaits. Voici les maths, les donnees derriere les bandes et comment lire la sortie honnetement.",
        body: `## Ce que ca fait

Deux entrees :
- Panier moyen en CAD (votre transaction client typique)
- Clients mensuels actuels (combien de clients vous obtenez deja par mois)

Sortie : un tableau a 4 lignes montrant 3 scenarios de hausse par forfait :
- Prudent : +15 % de clients
- Probable : +25 % de clients (mis en evidence en vert)
- Agressif : +40 % de clients

Pour chaque scenario, vous voyez le revenu supplementaire par mois, le net apres le cout du forfait et le multiple de ROI.

## Les bandes 15/25/40 %

Ces bandes viennent de la hausse de visibilite IA observee chez les clients AiLys existants au point de 90 jours, pas de l'imagination marketing :
- Le bas de la distribution (petits marches, secteurs en fin de cycle) atterrit autour de +12 a +18 % de hausse client
- Le milieu de la distribution (PME locale typique du Quebec dans un marche normal) atterrit autour de +20 a +30 %
- Le haut de la distribution (marches vierges, marque bien positionnee, avis actifs) atteint +35 a +45 %

Nous arrondissons a 15/25/40 pour la lisibilite des chiffres ronds.

## Ce qui est et n'est pas inclus

La projection compte seulement les **nouveaux clients organiques** acquis via la visibilite recherche IA. Elle ne compte pas :
- La repetition d'affaires de votre base client existante
- Le trafic direct (les gens qui tapent votre URL directement)
- Les resultats des annonces payantes (nous ne gerons pas les annonces)
- Le bouche a oreille (impossible a attribuer)

Si votre entreprise a deja une forte visibilite recherche IA (Share of Model au-dessus de 70), la projection est trop optimiste. Les bandes supposent que vous demarrez d'une position ou le travail a de la marge pour bouger l'aiguille.

## Pourquoi nous montrons 3 scenarios au lieu d'un

Deux raisons :
1. **Honnetete.** Le scenario probable vous donne un chiffre de planification realiste. Le scenario prudent vous dit le plancher ; le scenario agressif vous dit le plafond. Un seul chiffre cacherait la variance dont vous devez tenir compte.
2. **Qualite de decision.** Si le ROI prudent est positif, le forfait est un pari a faible risque. Si seul le ROI agressif est positif, vous pariez sur une execution parfaite et vous devriez d'abord reduire le risque davantage.

## Ce que ca ne remplace pas

La projection de ROI est une aide a la planification, pas un contrat. Le vrai contrat est :
- La garantie satisfaction 30 jours (remboursement mois 1 si la livraison ne correspond pas au document de demarrage)
- La garantie de hausse mesurable a 90 jours (Core+, remboursement des 3 derniers mois si le Share of Model n'augmente pas de +15 points)

Celles-la sont les garanties dures. Le calculateur ROI est l'esquisse douce qui vous aide a decider si le forfait vaut l'essai.

## Comment le lire proprement

1. Sautez le chiffre prudent si vous etes confiant dans votre secteur. Sautez le chiffre agressif si vous etes sceptique de votre marche.
2. Comparez le multiple ROI **Probable** entre forfaits. Si Core vous donne un ROI 3x et Growth un ROI 2,8x, Core a un meilleur levier sur votre argent meme si Growth a un revenu absolu plus eleve.
3. Le net est plus important que le multiple ROI en termes absolus. Un ROI 5x sur une petite base peut etre un pire flux de tresorerie qu'un ROI 2x sur une grande base.
4. Executez le calculateur deux fois avec un panier conservateur et optimiste (votre pire client vs votre client moyen) pour voir la fourchette.

## Secteurs ou les bandes tiennent bien

- Restaurants, dentistes, salons de beaute dans les marches entre 10K et 500K de population
- Entrepreneurs de services (plombiers, electriciens, CVC) avec 5 ans+ d'operation
- Agents immobiliers dans les marches de densite moyenne (Quebec, Sherbrooke, Trois-Rivieres)

## Secteurs ou les bandes sous-estiment

- B2B niche avec 50 a 200 clients ideaux dans le monde (parce que le volume est bas, la vue en pourcentage deforme)
- Salles de mariage, espaces evenementiels (gros billet, faible volume ; +15 % signifie 1 mariage de plus par mois, souvent un swing de 3 000-15 000 $)

## Secteurs ou les bandes peuvent surestimer

- Marches hyper-satures (immobilier de luxe Toronto, consultants tech Vancouver) ou les acteurs etablis ont des annees d'avance
- Entreprises recemment lancees (moins de 12 mois) ou la composition n'a pas commence`,
      },
    },
  },
  {
    slug: "share-link-and-form-persistence-privacy",
    title: "Share links + form persistence: privacy on /forfaits-complets",
    excerpt:
      "The pricing page lets you share your selection via URL and saves form input across visits. Here is exactly what is stored, where, and what is not. No tracking, no transmission, no surprises.",
    category: "account-billing",
    updatedAt: "2026-04-30",
    readingTimeMin: 3,
    body: `## What persists

When you visit /forfaits-complets, two things may persist on YOUR device:

1. **Toggle state in the URL** (engagement, tax, diff). Format: \`/forfaits-complets?engagement=annual&tax=1&diff=1\`. Default values are stripped (no engagement param when monthly, no tax param when off, no diff param when off).
2. **Form input in localStorage** under two keys:
   - \`ailys_quote_builder_v1\`: prospect name, business name, email, tier, engagement, reviuzy add-on, website size, tax inclusion
   - \`ailys_instant_audit_v1\`: business name, URL
   - \`ailys_tax_incl\`: just the tax toggle (independent legacy key)

## What does NOT persist

- Your IP address: hashed for rate-limiting only on the server side, never stored in clear, never linked to your selections
- Cookies for tracking: none. The only cookies on AiLys are functional (theme preference, language preference) and explicitly opt-in analytics (only if you accepted the cookie banner)
- Server-side: nothing. Your form selections never leave your browser unless you click submit on the quote PDF or the instant audit. We do not collect input as you type.

## Why we persist

Two reasons:
1. **You may bounce and return.** B2B decisions take days. If you fill out the quote builder, get distracted, and come back tomorrow, the form is pre-filled. You finish in 30 seconds instead of starting over.
2. **You may share.** The URL with toggle state lets your boss or accountant land on your exact configuration when you forward the link. Reduces the back-and-forth in B2B sales cycles.

## Versioning

The localStorage keys end in \`_v1\` so future schema changes can introduce \`_v2\` without breaking your existing saved state. If we ever break compatibility (rare), we will add a migration step that reads v1 and writes v2.

## How to clear it

Open browser developer tools (F12), Application tab, Local Storage section, find the keys starting with \`ailys_\` and delete them. Or just clear browsing data for \`ailysagency.ca\` and \`reviuzy.com\` in your browser settings.

The next page load will start fresh.

## What about clipboard?

When you click the "Copy share link" button, we use \`navigator.clipboard.writeText()\` to copy the current URL to your clipboard. The URL contains only the toggle state in query params (engagement, tax, diff); it does not contain your name, email, or any quote builder selections. The clipboard write happens entirely on your device; nothing transits the network for this operation.

## Loi 25 compliance (Quebec residents)

The form persistence described above is incidental device storage. It does not constitute personal information collection under Quebec Loi 25 because:
- The data does not leave your device
- We do not associate the localStorage keys with any server-side identity
- You can delete it instantly

If you submit the quote builder, the email and name then transit to our server (Cloudflare Pages function in Canada) and are sent to Resend (email service, US-based) to deliver the PDF link. That submission is the moment the privacy notice in our Privacy Policy applies.

## What we recommend

If you are on a shared computer, clear localStorage before logging out (or use private/incognito mode). The same applies to any website that saves form input. AiLys is not unusual here.`,
    i18n: {
      fr: {
        title: "Liens de partage et persistance des formulaires : vie privee sur /forfaits-complets",
        excerpt:
          "La page de forfaits permet de partager votre selection via URL et sauvegarde l'entree de formulaire entre visites. Voici exactement ce qui est stocke, ou et ce qui ne l'est pas. Aucun pistage, aucune transmission, aucune surprise.",
        body: `## Ce qui persiste

Quand vous visitez /forfaits-complets, deux choses peuvent persister sur VOTRE appareil :

1. **Etat des toggles dans l'URL** (engagement, taxes, differences). Format : \`/forfaits-complets?engagement=annual&tax=1&diff=1\`. Les valeurs par defaut sont retirees (aucun parametre engagement quand mensuel, aucun parametre tax quand desactive, aucun parametre diff quand desactive).
2. **Entrees de formulaire dans localStorage** sous deux cles :
   - \`ailys_quote_builder_v1\` : nom prospect, nom entreprise, courriel, forfait, engagement, module reputation, taille site, inclusion taxes
   - \`ailys_instant_audit_v1\` : nom entreprise, URL
   - \`ailys_tax_incl\` : juste le toggle taxes (cle independante legacy)

## Ce qui NE persiste PAS

- Votre adresse IP : hashee pour limitation de debit cote serveur uniquement, jamais stockee en clair, jamais liee a vos selections
- Cookies de pistage : aucun. Les seuls cookies sur AiLys sont fonctionnels (preference theme, preference langue) et analytiques opt-in explicite (seulement si vous avez accepte la banniere cookies)
- Cote serveur : rien. Vos selections de formulaire ne quittent jamais votre navigateur sauf si vous cliquez soumettre sur le devis PDF ou l'audit instantane. Nous ne collectons pas l'entree pendant que vous tapez.

## Pourquoi nous persistons

Deux raisons :
1. **Vous pouvez quitter et revenir.** Les decisions B2B prennent des jours. Si vous remplissez le constructeur de devis, etes distrait et revenez demain, le formulaire est pre-rempli. Vous finissez en 30 secondes au lieu de recommencer.
2. **Vous pouvez partager.** L'URL avec etat des toggles permet a votre patron ou comptable d'atterrir sur votre configuration exacte quand vous transferez le lien. Reduit les allers-retours dans les cycles de vente B2B.

## Versionnage

Les cles localStorage finissent en \`_v1\` afin que les changements de schema futurs puissent introduire \`_v2\` sans casser votre etat sauvegarde existant. Si nous brisons jamais la compatibilite (rare), nous ajouterons une etape de migration qui lit v1 et ecrit v2.

## Comment l'effacer

Ouvrez les outils de developpement du navigateur (F12), onglet Application, section Local Storage, trouvez les cles commencant par \`ailys_\` et supprimez-les. Ou effacez simplement les donnees de navigation pour \`ailysagency.ca\` et \`reviuzy.com\` dans les parametres de votre navigateur.

Le prochain chargement de page commencera a neuf.

## Et le presse-papiers ?

Quand vous cliquez le bouton "Copier le lien", nous utilisons \`navigator.clipboard.writeText()\` pour copier l'URL courante dans votre presse-papiers. L'URL contient seulement l'etat des toggles dans les parametres de requete (engagement, tax, diff) ; elle ne contient pas votre nom, courriel ou aucune selection du constructeur de devis. L'ecriture clipboard se passe entierement sur votre appareil ; rien ne transite par le reseau pour cette operation.

## Conformite Loi 25 (residents du Quebec)

La persistance de formulaire decrite ci-dessus est un stockage d'appareil incident. Elle ne constitue pas une collecte d'informations personnelles selon la Loi 25 du Quebec parce que :
- Les donnees ne quittent pas votre appareil
- Nous n'associons pas les cles localStorage avec aucune identite cote serveur
- Vous pouvez les supprimer instantanement

Si vous soumettez le constructeur de devis, le courriel et le nom transitent alors vers notre serveur (fonction Cloudflare Pages au Canada) et sont envoyes a Resend (service courriel, base aux Etats-Unis) pour livrer le lien PDF. Cette soumission est le moment ou l'avis de confidentialite dans notre Politique de confidentialite s'applique.

## Ce que nous recommandons

Si vous etes sur un ordinateur partage, effacez le localStorage avant de vous deconnecter (ou utilisez le mode prive/incognito). Cela s'applique a tout site web qui sauvegarde l'entree de formulaire. AiLys n'est pas inhabituel ici.`,
      },
    },
  },

  // ─── AiLys Verified Badge (Bonus A) ────────────────────────
  {
    slug: "ailys-verified-badge-overview",
    title: "What is the AiLys Verified badge",
    excerpt:
      "A public, auto-updating badge that displays your AI Visibility score on your website. Builds trust with visitors and links back to your public AiLys report. Free for every active client.",
    category: "getting-started",
    updatedAt: "2026-05-01",
    readingTimeMin: 4,
    body: `## What it is

The AiLys Verified badge is a small SVG image you paste into your website footer (or anywhere on your site). It shows your current AI Visibility score, gets a green or amber or red side bar based on your tier, and links to your public AiLys report when a visitor clicks it.

You see it everywhere on the web in other forms: the SSL Labs A+ badge, the BBB Accredited badge, the Better Business Bureau seal. Same idea, applied to AI Visibility.

## What it shows

Two layouts are available.

**Compact (220 by 64 pixels):** "Verified by AiLys" label, your numeric score out of 100, five stars filled based on your score band, and a colored side bar.

**Full (320 by 120 pixels):** same as compact plus your business name and a larger score readout. Better for prominent placements.

## Why it works

Three things happen when a visitor sees it.

1. **Trust signal.** Independent third-party verification of AI Visibility builds the same instinct as a Yelp star count or a Google review average. The visitor reads "this business has been measured by an external authority" without having to think about it.
2. **Backlink.** The badge links to ailysagency.ca/verify/your-slug. That is a backlink from your domain to a domain we own, which the AI engines and traditional search engines both crawl and weight.
3. **Recursive proof.** Your public report mentions which AI engines have cited you. Visitors who find you via ChatGPT or Perplexity get reinforcement: yes, the engine that recommended us also confirms our citation count.

## What the public report shows

When someone clicks the badge, they land on a page like ailysagency.ca/verify/your-slug. The page shows:

- Your business name, industry, and city
- Current AI Visibility score with a colored badge
- Review velocity (reviews per month, last 90 days average)
- Active citations count
- Schema markup completeness percentage
- Which AI engines have cited your brand in the last probe cycle (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot)
- Last probe timestamp

The page is intentionally minimal. No marketing fluff, no extra calls to action that distract from the score. Visitors see the data and the trust signal in one screen.

## Privacy and what does NOT show

The public report only shows aggregate signals. It does NOT show:

- Specific review text or customer names
- Individual citation source URLs
- Which queries triggered citations (those are in your strategist report only)
- Customer email addresses, phone numbers, or any PII
- Your competitor comparison or share-of-voice (private to your dashboard)
- Internal notes from your strategist

## Who can see it

Anyone on the internet. The page is public and noindex (search engines do not list it directly). The badge is meant to be embedded on your site; visitors clicking it are already on your site.

If you do not want a public report, contact your strategist and we will disable the slug. The badge will then return a generic placeholder instead of your data, and the report URL will return "report not found".

## How often it updates

The badge image is cached for 1 hour at the edge to keep your site fast. Your score itself updates based on your tier:

- Starter: monthly probes
- Core: weekly probes
- Growth: every 3 days
- Agency: daily probes plus on-demand re-probe via your strategist

So the badge reflects probes within roughly your tier cadence plus 1 hour for cache propagation.

## How to set it up

See the companion article "How to embed your AiLys Verified badge". The TL;DR: copy a 1-line HTML snippet from your dashboard, paste it in your site footer, ship.`,
    i18n: {
      fr: {
        title: "Qu'est-ce que l'insigne AiLys Verifie",
        excerpt:
          "Un insigne public, mis a jour automatiquement, qui affiche votre score de visibilite IA sur votre site web. Renforce la confiance des visiteurs et redirige vers votre rapport public AiLys. Gratuit pour tout client actif.",
        body: `## Ce que c'est

L'insigne AiLys Verifie est une petite image SVG que vous collez dans le pied de page de votre site (ou ailleurs). Il affiche votre score actuel de visibilite IA, recoit une barre laterale verte, ambre ou rouge selon votre palier, et redirige vers votre rapport public AiLys quand un visiteur clique dessus.

Vous le voyez partout sur le web sous d'autres formes : l'insigne SSL Labs A+, l'insigne BBB Accredited, le sceau Better Business Bureau. Meme idee, appliquee a la visibilite IA.

## Ce qu'il affiche

Deux formats sont disponibles.

**Compact (220 par 64 pixels) :** etiquette "Verifie par AiLys", votre score numerique sur 100, cinq etoiles remplies selon votre tranche de score, et une barre laterale coloree.

**Complet (320 par 120 pixels) :** identique au compact plus le nom de votre entreprise et un score plus visible. Mieux pour les placements importants.

## Pourquoi ca marche

Trois choses se passent quand un visiteur le voit.

1. **Signal de confiance.** Une verification tierce independante de la visibilite IA suscite le meme reflexe qu'un compte d'etoiles Yelp ou une moyenne d'avis Google. Le visiteur lit "cette entreprise a ete mesuree par une autorite externe" sans avoir a y reflechir.
2. **Lien retour.** L'insigne pointe vers ailysagency.ca/verify/votre-slug. C'est un lien retour de votre domaine vers un domaine que nous possedons, que les moteurs IA et les moteurs de recherche traditionnels indexent et ponderent.
3. **Preuve recursive.** Votre rapport public mentionne quels moteurs IA vous ont cite. Les visiteurs qui vous trouvent via ChatGPT ou Perplexity recoivent un renforcement : oui, le moteur qui nous a recommandes confirme aussi notre nombre de citations.

## Ce que le rapport public montre

Quand quelqu'un clique sur l'insigne, il atterrit sur une page comme ailysagency.ca/verify/votre-slug. La page montre :

- Votre nom d'entreprise, industrie et ville
- Score actuel de visibilite IA avec un insigne colore
- Velocite d'avis (avis par mois, moyenne 90 jours)
- Nombre de citations actives
- Pourcentage de completude des donnees structurees
- Quels moteurs IA ont cite votre marque au dernier cycle de probe (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot)
- Horodatage de la derniere probe

La page est volontairement minimaliste. Pas de fioritures marketing, pas d'appels a l'action supplementaires qui distraient du score. Les visiteurs voient les donnees et le signal de confiance en un seul ecran.

## Confidentialite et ce qui n'est PAS affiche

Le rapport public ne montre que des signaux agreges. Il NE montre PAS :

- Le texte specifique des avis ou les noms des clients
- Les URL sources de citations individuelles
- Quelles requetes ont declenche des citations (celles-ci sont uniquement dans votre rapport strategiste)
- Les courriels, numeros de telephone des clients, ou aucune donnee personnelle
- Votre comparaison concurrentielle ou part de voix (prive a votre tableau de bord)
- Notes internes de votre strategiste

## Qui peut le voir

N'importe qui sur internet. La page est publique et noindex (les moteurs de recherche ne la listent pas directement). L'insigne est concu pour etre integre sur votre site ; les visiteurs qui cliquent sont deja sur votre site.

Si vous ne voulez pas de rapport public, contactez votre strategiste et nous desactiverons le slug. L'insigne retournera alors un placeholder generique au lieu de vos donnees, et l'URL du rapport retournera "rapport introuvable".

## Frequence de mise a jour

L'image de l'insigne est mise en cache 1 heure en bordure de reseau pour garder votre site rapide. Votre score lui-meme se met a jour selon votre palier :

- Starter : probes mensuelles
- Core : probes hebdomadaires
- Growth : tous les 3 jours
- Agency : probes quotidiennes plus re-probe a la demande via votre strategiste

L'insigne reflete donc les probes selon environ votre cadence de palier plus 1 heure de propagation cache.

## Comment l'installer

Voir l'article complementaire "Comment integrer votre insigne AiLys Verifie". Resume : copiez un extrait HTML d'une ligne depuis votre tableau de bord, collez-le dans le pied de page de votre site, livrez.`,
      },
    },
  },
  {
    slug: "ailys-verified-badge-embed-howto",
    title: "How to embed your AiLys Verified badge",
    excerpt:
      "Copy-paste guide for adding the AiLys Verified badge to your Wordpress, Webflow, Shopify, Squarespace, or custom-coded site. Includes HTML and Markdown formats.",
    category: "getting-started",
    updatedAt: "2026-05-01",
    readingTimeMin: 6,
    body: `## What you need

- An active AiLys subscription (Starter or higher)
- Your unique slug (provided at onboarding; visible in your dashboard)
- Edit access to your website footer or wherever you want the badge

If you do not have your slug yet, contact your strategist or check your welcome email.

## Step 1: get your embed code

Go to ailysagency.ca/badge. Enter your slug in the "client identifier" field (or "demo" to preview the demo). Pick the variant: compact (220 by 64) for footers, full (320 by 120) for prominent placements.

Two code blocks appear: HTML and Markdown. Click "Copy" on the one that fits your site.

## Step 2: paste it into your site

### Wordpress

1. Go to Appearance > Widgets (or Appearance > Customize > Widgets depending on your theme)
2. Find your footer widget area
3. Add a "Custom HTML" widget
4. Paste the HTML code
5. Save

If your theme uses a footer template file, you can also paste the HTML directly into footer.php inside the closing footer tag, but using a widget keeps the code editable from the admin without touching theme files.

### Webflow

1. Open your project in the Webflow Designer
2. Add an Embed component to your footer (drag from the Add panel)
3. Paste the HTML code into the Embed
4. Save and Publish

### Shopify

1. Go to Online Store > Themes > Edit code
2. Open Sections > footer.liquid (or your theme's footer file)
3. Paste the HTML code where you want the badge to appear
4. Save

For Shopify 2.0 themes with a "Custom HTML" section block, you can use that without editing theme code.

### Squarespace

1. Edit the page where you want the badge
2. Add a Code block (in Squarespace 7.1: Add Block > Code)
3. Paste the HTML code
4. Save

### Custom code or static site

Paste the HTML wherever you want it. The badge is a single anchor tag wrapping an img tag, no JavaScript dependencies, no CSS reset needed.

### Markdown sites (GitHub README, Notion, blog posts)

Use the Markdown format instead of HTML.

## Step 3: verify it loads

Open your site in a private browsing window (so cache does not interfere). Scroll to your footer. The badge should display:

- Compact: a 220 by 64 pixel image with "Verified by AiLys", your score, and 5 stars
- Full: a 320 by 120 pixel image with your business name and a larger score readout

Click the badge. It should open ailysagency.ca/verify/your-slug in a new tab and show your public report.

## What if it does not load

If the badge appears as a broken image or a generic placeholder showing 0 out of 100:

1. Double-check your slug. It must match exactly what your strategist provided. Common typos: hyphen vs underscore, leading or trailing spaces.
2. Confirm your subscription is active. The badge surface is gated to active subscriptions.
3. Confirm your AI Visibility score has been computed at least once. New clients have their first probe scheduled within 24 hours of onboarding.
4. Try the demo slug "demo" or "sample" first. If those work and yours does not, contact support.

## Customizing appearance

The badge is an SVG with a transparent background-friendly design (it has its own dark gradient background built in, so it works on light or dark site backgrounds). To customize:

- **Size:** the embed includes width and height attributes. Edit those to scale. The SVG is vector, so it stays sharp at any size.
- **Alignment:** wrap the anchor tag in a div with text-align center or left or right.
- **Margin and spacing:** add a class to the anchor tag and target it with your site CSS.

## Removing the badge

Just delete the embed code from your footer. There is no callback to AiLys, no analytics tracking on the badge image, no cleanup needed.

If you want to also retire your public report (the page the badge links to), contact your strategist. We will mark your slug as private, and the URL will return "report not found".

## Caching note

The badge image is served with a 1-hour cache header. If you have just had your AI Visibility score recomputed and want the badge to show the new score immediately, your visitors may see the old score for up to 1 hour. There is no way to force-bust the cache for embedded images on third-party sites; this 1-hour ceiling protects your site speed by reducing requests.

## Multilingual sites

If your site has French and English versions, embed the badge once with the lang parameter that matches your default audience. The badge is locale-aware: append &lang=fr to the SVG URL for French labels, &lang=en for English (default).

For sites that auto-detect locale, you can use server-side rendering to swap the lang query param, or you can show two separate badges (one per locale) and rely on your locale switcher to hide the inactive one.`,
    i18n: {
      fr: {
        title: "Comment integrer votre insigne AiLys Verifie",
        excerpt:
          "Guide copier-coller pour ajouter l'insigne AiLys Verifie a votre site Wordpress, Webflow, Shopify, Squarespace, ou code custom. Inclut formats HTML et Markdown.",
        body: `## Ce dont vous avez besoin

- Un abonnement AiLys actif (Starter ou superieur)
- Votre slug unique (fourni a l'onboarding ; visible dans votre tableau de bord)
- Acces edition au pied de page de votre site web ou la ou vous voulez l'insigne

Si vous n'avez pas encore votre slug, contactez votre strategiste ou verifiez votre courriel de bienvenue.

## Etape 1 : obtenir votre code d'integration

Allez sur ailysagency.ca/fr/badge. Entrez votre slug dans le champ "identifiant client" (ou "demo" pour previsualiser la demo). Choisissez le format : compact (220 par 64) pour les pieds de page, complet (320 par 120) pour les placements importants.

Deux blocs de code apparaissent : HTML et Markdown. Cliquez "Copier" sur celui qui convient a votre site.

## Etape 2 : collez-le dans votre site

### Wordpress

1. Allez a Apparence > Widgets (ou Apparence > Personnaliser > Widgets selon votre theme)
2. Trouvez votre zone widget de pied de page
3. Ajoutez un widget "HTML personnalise"
4. Collez le code HTML
5. Enregistrez

Si votre theme utilise un fichier template de pied de page, vous pouvez aussi coller le HTML directement dans footer.php a l'interieur de la balise footer fermante, mais utiliser un widget garde le code editable depuis l'administration sans toucher aux fichiers du theme.

### Webflow

1. Ouvrez votre projet dans le Webflow Designer
2. Ajoutez un composant Embed a votre pied de page (glissez depuis le panneau Add)
3. Collez le code HTML dans l'Embed
4. Enregistrez et publiez

### Shopify

1. Allez a Boutique en ligne > Themes > Modifier le code
2. Ouvrez Sections > footer.liquid (ou le fichier pied de page de votre theme)
3. Collez le code HTML la ou vous voulez que l'insigne apparaisse
4. Enregistrez

Pour les themes Shopify 2.0 avec un bloc de section "HTML personnalise", vous pouvez l'utiliser sans editer le code du theme.

### Squarespace

1. Editez la page ou vous voulez l'insigne
2. Ajoutez un bloc Code (dans Squarespace 7.1 : Ajouter un bloc > Code)
3. Collez le code HTML
4. Enregistrez

### Code custom ou site statique

Collez le HTML ou vous voulez. L'insigne est une seule balise ancre qui enveloppe une balise img, aucune dependance JavaScript, aucun reset CSS necessaire.

### Sites Markdown (README GitHub, Notion, articles de blogue)

Utilisez le format Markdown au lieu du HTML.

## Etape 3 : verifier qu'il charge

Ouvrez votre site dans une fenetre de navigation privee (pour que le cache n'interfere pas). Faites defiler jusqu'au pied de page. L'insigne devrait afficher :

- Compact : une image de 220 par 64 pixels avec "Verifie par AiLys", votre score, et 5 etoiles
- Complet : une image de 320 par 120 pixels avec le nom de votre entreprise et un score plus visible

Cliquez sur l'insigne. Il devrait ouvrir ailysagency.ca/fr/verify/votre-slug dans un nouvel onglet et afficher votre rapport public.

## Si ca ne charge pas

Si l'insigne apparait comme une image brisee ou un placeholder generique affichant 0 sur 100 :

1. Verifiez votre slug. Il doit correspondre exactement a ce que votre strategiste a fourni. Fautes de frappe courantes : tiret vs underscore, espaces avant ou apres.
2. Confirmez que votre abonnement est actif. La surface de l'insigne est protegee aux abonnements actifs.
3. Confirmez que votre score de visibilite IA a ete calcule au moins une fois. Les nouveaux clients ont leur premiere probe planifiee dans les 24 heures suivant l'onboarding.
4. Essayez le slug demo "demo" ou "sample" d'abord. Si ceux-la fonctionnent et que le votre non, contactez le support.

## Personnalisation de l'apparence

L'insigne est un SVG avec un design qui supporte les fonds transparents (il a son propre fond degrade fonce integre, donc il fonctionne sur les fonds clairs ou fonces de site). Pour personnaliser :

- **Taille :** l'integration inclut des attributs width et height. Editez-les pour redimensionner. Le SVG est vectoriel, donc il reste net a toute taille.
- **Alignement :** enveloppez la balise ancre dans un div avec text-align center, left ou right.
- **Marge et espacement :** ajoutez une classe a la balise ancre et ciblez-la avec votre CSS de site.

## Retirer l'insigne

Supprimez simplement le code d'integration de votre pied de page. Il n'y a pas de callback vers AiLys, pas de pistage analytics sur l'image de l'insigne, pas de nettoyage necessaire.

Si vous voulez aussi retirer votre rapport public (la page vers laquelle l'insigne pointe), contactez votre strategiste. Nous marquerons votre slug comme prive, et l'URL retournera "rapport introuvable".

## Note sur le cache

L'image de l'insigne est servie avec un en-tete de cache de 1 heure. Si vous venez de faire recalculer votre score de visibilite IA et voulez que l'insigne montre le nouveau score immediatement, vos visiteurs peuvent voir l'ancien score jusqu'a 1 heure. Il n'y a pas de moyen de forcer l'invalidation du cache pour les images integrees sur des sites tiers ; ce plafond de 1 heure protege la vitesse de votre site en reduisant les requetes.

## Sites multilingues

Si votre site a des versions francaise et anglaise, integrez l'insigne une fois avec le parametre lang qui correspond a votre audience par defaut. L'insigne est sensible a la locale : ajoutez &lang=fr a l'URL SVG pour les etiquettes francaises, &lang=en pour l'anglais (defaut).

Pour les sites qui detectent la locale automatiquement, vous pouvez utiliser le rendu cote serveur pour echanger le parametre lang, ou vous pouvez afficher deux insignes separes (un par locale) et compter sur votre selecteur de locale pour cacher l'inactif.`,
      },
    },
  },

  // ─── Industry Reports (Bonus B) ────────────────────────────
  {
    slug: "ailys-industry-reports-overview",
    title: "About the AiLys Quarterly Industry Reports",
    excerpt:
      "Free public reports on the state of AI Visibility in Quebec verticals (dentists, restaurants, lawyers, and more). Anonymized aggregate data across 6 AI engines. What's in them, who they're for, how to use them.",
    category: "getting-started",
    updatedAt: "2026-05-01",
    readingTimeMin: 4,
    body: `## What they are

Every quarter, AiLys publishes a free public report on the state of AI Visibility in a specific Quebec vertical. The first three covered are dentists, restaurants, and lawyers (Q1 2026). More verticals roll out each quarter.

Each report aggregates anonymized data from 30 to 60 businesses we probe across 6 AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) over a 12-week window. The output is a 7-minute read with median scores, top engines, common gaps, and the 3 actions that move the needle fastest in that vertical.

## Who they're for

- **Operators in the vertical:** see how you compare to the median of your competitive set
- **Marketing managers:** understand what AI engines weight for your category and where the leverage points are
- **Press and analysts:** quotable benchmarks on AI search behavior in Quebec local business

## What they include

- Sample size and methodology (which businesses, how many probes, what queries)
- Top 4 metrics: median score, top engine cited, NAP consistency average, schema adoption percentage
- 3 to 5 narrative sections covering vertical-specific patterns
- 3 takeaways: the actions that produced the biggest score uplift in observed practices

## What they do NOT include

- Names of individual businesses (anonymized aggregate only)
- Competitor comparison tables (those are private to each AiLys client's dashboard)
- Source URLs of citations (private to client reports)
- Any PII

## How to use them

If you operate in a covered vertical: read the relevant report, identify which of the 3 takeaways your business has not yet implemented, and prioritize that fix this quarter. The takeaways are ordered by ROI in the data.

If your vertical is not yet covered: subscribe to be notified when it launches. Reports rotate quarterly.

## Cadence

- Q1 reports publish in April
- Q2 reports publish in July
- Q3 reports publish in October
- Q4 reports publish in January

Each report covers the previous 12 weeks of probes.

## Data source

The aggregate data comes from AiLys client probes (with explicit consent in client agreements) plus anonymous public-business probes for vertical coverage. Methodology is described in each report.

## Cost

Free. No email gate, no paywall. The reports are lead magnets for AiLys, but the value is delivered without conversion friction. If the report helps you and you want personalized analysis for your business, the AiLys audit at ailysagency.ca/audit is also free.`,
    i18n: {
      fr: {
        title: "A propos des rapports d'industrie trimestriels AiLys",
        excerpt:
          "Rapports publics gratuits sur l'etat de la visibilite IA dans les verticales quebecoises (dentistes, restaurants, avocats, et plus). Donnees agregees anonymisees a travers 6 moteurs IA. Ce qu'ils contiennent, a qui ils s'adressent, comment les utiliser.",
        body: `## Ce que c'est

Chaque trimestre, AiLys publie un rapport public gratuit sur l'etat de la visibilite IA dans une verticale quebecoise specifique. Les trois premiers couverts sont les dentistes, les restaurants, et les avocats (T1 2026). Plus de verticales se deploient a chaque trimestre.

Chaque rapport agrege des donnees anonymisees de 30 a 60 entreprises que nous sondons a travers 6 moteurs IA (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) sur une fenetre de 12 semaines. Le resultat est une lecture de 7 minutes avec scores medians, moteurs principaux, lacunes courantes, et les 3 actions qui font le plus de difference dans cette verticale.

## Pour qui

- **Operateurs dans la verticale :** voyez comment vous vous comparez a la mediane de votre ensemble concurrentiel
- **Gestionnaires marketing :** comprenez ce que les moteurs IA ponderent pour votre categorie et ou sont les points de levier
- **Presse et analystes :** reperes citables sur le comportement de recherche IA dans les entreprises locales du Quebec

## Ce qu'ils incluent

- Taille d'echantillon et methodologie (quelles entreprises, combien de probes, quelles requetes)
- 4 metriques principales : score median, moteur principal citant, moyenne coherence NAP, pourcentage d'adoption schema
- 3 a 5 sections narratives couvrant les motifs specifiques a la verticale
- 3 a retenir : les actions qui ont produit la plus grande hausse de score dans les pratiques observees

## Ce qu'ils n'incluent PAS

- Noms d'entreprises individuelles (agregat anonymise uniquement)
- Tableaux de comparaison concurrentielle (prives au tableau de bord de chaque client AiLys)
- URL sources de citations (privees aux rapports clients)
- Aucune donnee personnelle

## Comment les utiliser

Si vous operez dans une verticale couverte : lisez le rapport pertinent, identifiez laquelle des 3 a retenir votre entreprise n'a pas encore implementee, et priorisez ce correctif ce trimestre. Les a retenir sont ordonnes par ROI dans les donnees.

Si votre verticale n'est pas encore couverte : inscrivez-vous pour etre notifie au lancement. Les rapports tournent trimestriellement.

## Cadence

- Rapports T1 publies en avril
- Rapports T2 publies en juillet
- Rapports T3 publies en octobre
- Rapports T4 publies en janvier

Chaque rapport couvre les 12 semaines precedentes de probes.

## Source de donnees

Les donnees agregees viennent des probes clients AiLys (avec consentement explicite dans les ententes clients) plus des probes publiques anonymes d'entreprises pour la couverture de verticale. La methodologie est decrite dans chaque rapport.

## Cout

Gratuit. Pas de barriere courriel, pas de paywall. Les rapports sont des aimants a leads pour AiLys, mais la valeur est livree sans friction de conversion. Si le rapport vous aide et que vous voulez une analyse personnalisee pour votre entreprise, l'audit AiLys a ailysagency.ca/fr/audit est aussi gratuit.`,
      },
    },
  },

  // ─── AI Concierge (Feature 5) ──────────────────────────────
  {
    slug: "ailys-concierge-overview",
    title: "About the AiLys Concierge",
    excerpt:
      "Conversational AI assistant in your AiLys client dashboard. Ask anything about your AI Visibility, generate GBP posts, compare yourself to competitors. Included in Growth and Agency plans.",
    category: "getting-started",
    updatedAt: "2026-05-01",
    readingTimeMin: 5,
    body: `## What it is

The AiLys Concierge is a conversational AI assistant embedded in your client dashboard. You ask questions in plain language. It reads your AiLys + reputation data in real time and answers with context, often pulling up charts or drafting actions inline.

Think of it as having your strategist available 24/7 for the kind of questions that do not need human judgment: "What was my score last week", "Draft a Halloween GBP post", "How am I doing vs my top 3 competitors". Strategists handle the strategy. The concierge handles the rest.

## What you can ask

The concierge has 10 tools available to it. Examples of queries each tool handles:

- **Score and trends:** "Why did my score drop this week?", "Show me my Share of Model for the last 90 days", "How am I doing on ChatGPT specifically?"
- **Reviews:** "What reviews came in this week?", "Any negative ones I should respond to?", "Draft a reply to the review from yesterday"
- **GBP content:** "Generate a GBP post for Mother's Day", "Show me last month's posts and their engagement", "Schedule that post for Tuesday at 10am"
- **Competitors:** "Compare me to my top 3", "Who's gaining citation share?", "What are they doing that I'm not?"
- **Actions:** "What should I work on next?", "How do I improve my schema score?", "What's the highest-ROI fix this quarter?"
- **Projections:** "If I publish 4 posts a week, where will my score be in 60 days?", "What does my MRR look like if I move from Core to Growth?"

## What it cannot do

- **Replace your strategist.** The concierge does not make strategy decisions. It surfaces data and drafts content. Your strategist still owns the quarterly direction.
- **Access other businesses' private data.** The concierge is pinned to your tenant. It cannot leak data across clients.
- **Take destructive actions without approval.** Mutating actions (publishing a post, replying to a review, submitting a citation) require your explicit "approve" click before they go live.
- **Operate outside its training data.** It does not know about events after the underlying engine's knowledge cutoff. For real-time news or latest tech, use a regular web search.

## Voice mode

If your browser supports it (Safari on Mac, Chrome on most platforms), you can use voice input and voice output. Click the microphone icon to dictate a question. Toggle the speaker icon to have answers read aloud.

Voice transcripts are processed on your device only when you use the browser's native speech recognition. They are not sent to AiLys servers until you press send on the typed text. If you opt in to "save voice transcripts" in settings, the typed-equivalent text is saved with your conversation history. The audio itself is never stored.

## Token budget per tier

Each tier has a daily token budget for the concierge:

- Starter: 10k tokens per day (about 8 to 12 conversations)
- Core: 50k tokens per day (about 40 to 60 conversations)
- Growth: 200k tokens per day (about 150 to 250 conversations)
- Agency: unlimited (subject to fair-use cap of ~1M tokens per day)

When you reach your daily limit, the concierge falls back to a basic mode (no tool calls, plain conversational answers using cached data). The full mode resumes the next day.

If you regularly hit the cap, that is a strong signal you should upgrade your tier.

## Privacy

Conversation history is stored encrypted at rest and tied to your tenant. By default, conversations auto-purge after 90 days. You can opt in to longer retention in your settings if you want a searchable history beyond 90 days.

Your strategist can read your conversation history if you ask them to investigate something specific (for support purposes), but they do not browse it routinely. AiLys staff at the platform level can access conversation logs only for incident debugging and only with audit logging.

## Where to find it

Once you are logged in to your AiLys client dashboard, the concierge lives at /dashboard/concierge. There is also a quick-launcher icon in the top-right of every dashboard page so you can ask a question without navigating away from what you are looking at.

For a non-client preview, see ailysagency.ca/concierge-demo (3 sample prompts, no real client data).`,
    i18n: {
      fr: {
        title: "A propos du concierge AiLys",
        excerpt:
          "Assistant IA conversationnel dans votre tableau de bord client AiLys. Demandez n'importe quoi sur votre visibilite IA, generez des publications GBP, comparez-vous aux concurrents. Inclus dans les forfaits Growth et Agency.",
        body: `## Ce que c'est

Le concierge AiLys est un assistant IA conversationnel integre dans votre tableau de bord client. Vous posez des questions en langage simple. Il lit vos donnees AiLys + reputation en temps reel et repond avec contexte, souvent en faisant apparaitre des graphiques ou en redigeant des actions en ligne.

Voyez-le comme avoir votre strategiste disponible 24/7 pour le genre de questions qui n'ont pas besoin de jugement humain : "Quel etait mon score la semaine derniere", "Redige une publication GBP pour Halloween", "Comment je me situe face a mes 3 principaux concurrents". Les strategistes gerent la strategie. Le concierge gere le reste.

## Ce que vous pouvez demander

Le concierge dispose de 10 outils. Exemples de requetes que chaque outil gere :

- **Score et tendances :** "Pourquoi mon score a-t-il baisse cette semaine ?", "Montre ma part de modele sur les 90 derniers jours", "Comment je me situe sur ChatGPT specifiquement ?"
- **Avis :** "Quels avis sont rentres cette semaine ?", "Y en a-t-il des negatifs auxquels je devrais repondre ?", "Redige une reponse a l'avis d'hier"
- **Contenu GBP :** "Genere une publication GBP pour la fete des Meres", "Montre les publications du mois dernier et leur engagement", "Programme cette publication pour mardi a 10h"
- **Concurrents :** "Compare-moi a mes 3 principaux", "Qui gagne en part de citations ?", "Que font-ils que je ne fais pas ?"
- **Actions :** "Sur quoi devrais-je travailler ensuite ?", "Comment ameliorer mon score schema ?", "Quel est le correctif au plus haut ROI ce trimestre ?"
- **Projections :** "Si je publie 4 publications par semaine, ou sera mon score dans 60 jours ?", "A quoi ressemble mon MRR si je passe de Core a Growth ?"

## Ce qu'il ne peut pas faire

- **Remplacer votre strategiste.** Le concierge ne prend pas de decisions de strategie. Il fait apparaitre des donnees et redige du contenu. Votre strategiste possede toujours la direction trimestrielle.
- **Acceder aux donnees privees d'autres entreprises.** Le concierge est ancre a votre tenant. Il ne peut pas faire fuiter de donnees entre clients.
- **Prendre des actions destructives sans approbation.** Les actions modifiantes (publier une publication, repondre a un avis, soumettre une citation) requierent votre clic "approuver" explicite avant d'etre executees.
- **Operer hors de ses donnees d'entrainement.** Il ne connait pas les evenements apres la date de coupure de connaissance du moteur sous-jacent. Pour les nouvelles en temps reel ou la derniere techno, utilisez une recherche web reguliere.

## Mode vocal

Si votre navigateur le supporte (Safari sur Mac, Chrome sur la plupart des plateformes), vous pouvez utiliser l'entree vocale et la sortie vocale. Cliquez sur l'icone du microphone pour dicter une question. Basculez l'icone du haut-parleur pour faire lire les reponses.

Les transcriptions vocales sont traitees uniquement sur votre appareil quand vous utilisez la reconnaissance vocale native du navigateur. Elles ne sont pas envoyees aux serveurs AiLys avant que vous appuyiez sur envoyer sur le texte tape. Si vous optez pour "sauvegarder les transcriptions vocales" dans les parametres, le texte tape equivalent est sauvegarde avec votre historique de conversation. L'audio lui-meme n'est jamais stocke.

## Budget de tokens par palier

Chaque palier a un budget de tokens quotidien pour le concierge :

- Starter : 10 000 tokens par jour (environ 8 a 12 conversations)
- Core : 50 000 tokens par jour (environ 40 a 60 conversations)
- Growth : 200 000 tokens par jour (environ 150 a 250 conversations)
- Agency : illimite (sous reserve d'un plafond d'usage equitable d'environ 1M tokens par jour)

Quand vous atteignez votre limite quotidienne, le concierge bascule en mode basique (pas d'appels d'outils, reponses conversationnelles simples utilisant les donnees en cache). Le mode complet reprend le lendemain.

Si vous atteignez regulierement le plafond, c'est un signal fort que vous devriez ameliorer votre palier.

## Confidentialite

L'historique de conversation est stocke chiffre au repos et lie a votre tenant. Par defaut, les conversations s'auto-purgent apres 90 jours. Vous pouvez opter pour une retention plus longue dans vos parametres si vous voulez un historique cherchable au-dela de 90 jours.

Votre strategiste peut lire votre historique de conversation si vous lui demandez d'enqueter sur quelque chose de specifique (pour des fins de support), mais il ne le parcourt pas de maniere routiniere. Le personnel AiLys au niveau plateforme peut acceder aux journaux de conversation uniquement pour le debogage d'incidents et uniquement avec journalisation d'audit.

## Ou le trouver

Une fois connecte a votre tableau de bord client AiLys, le concierge se trouve a /dashboard/concierge. Il y a aussi une icone de lancement rapide en haut a droite de chaque page du tableau de bord pour que vous puissiez poser une question sans naviguer hors de ce que vous regardez.

Pour un apercu non-client, voir ailysagency.ca/fr/concierge-demo (3 prompts d'exemple, pas de donnees client reelles).`,
      },
    },
  },

  // ─── More privacy & technical detail articles ──────────────
  {
    slug: "ailys-concierge-privacy-deep-dive",
    title: "AiLys Concierge privacy: what we store, what we don't, and what you control",
    excerpt:
      "Detailed privacy reference for the AiLys Concierge. Encryption at rest, retention windows, who can read your conversations, voice transcript handling, opt-in retention, and how to export or delete your history.",
    category: "account-billing",
    updatedAt: "2026-05-01",
    readingTimeMin: 6,
    body: `## What gets stored

Every concierge conversation is associated with your tenant ID and your authenticated user ID. The following fields are stored encrypted at rest in our Supabase Postgres database:

- The text of each message you send (your prompt)
- The text of each response from the AiLys engine
- Tool calls executed during the conversation (which tool, what args, what result)
- Timestamps (conversation start, each message, conversation end)
- Token usage (tokens_in, tokens_out) for budget tracking
- Feedback you give (thumbs up, thumbs down, optional comment)

What does NOT get stored:

- Your IP address (used only for rate limiting, hashed and discarded after 60 minutes)
- Your browser fingerprint or session ID
- Voice audio (when you use voice mode, the browser does the transcription locally; we never receive the audio)
- Other tenants' data that surfaced during your conversation (each tool pins to your tenant ID)

## How long does it stay

Default retention is 90 days. After 90 days, the conversation row is hard-deleted from the database. There is no soft-delete flag and no archive bucket; the row is gone.

If you want a longer history (for example to refer back to past strategy discussions), you can opt in to extended retention in your account settings. Options are 1 year, 3 years, or indefinite. Extended retention only applies to new conversations from the moment you opt in; previously-purged conversations cannot be recovered.

## Who can read your conversations

In practical operation:

- You: always, via the AiLys client dashboard search.
- Your strategist: only if you ask them to investigate something specific (for example, "I had a weird answer last Tuesday, can you check what happened"). Strategist access is logged and you can see who accessed what when in your audit trail.
- AiLys staff at the platform level: only for incident debugging. Every access creates an audit log entry. Routine analytics use only de-identified aggregates (no PII).

In legal exception:

- Court order or law enforcement valid request: we comply with Quebec, federal Canadian, and applicable extradition law. We notify you unless prohibited by the order.

In NO scenario:

- Other AiLys clients (cross-tenant isolation is enforced at the database row-level via RLS)
- Third-party advertisers, data brokers, or marketing partners (we do not sell or rent any data, ever)
- Other AiLys staff outside the audit-log perimeter (the access path is gated and logged)

## Voice mode privacy

If your browser supports the Web Speech API (Safari on Mac, Chrome on most platforms, latest Edge):

- Voice input: your browser transcribes audio locally on your device. The transcribed text appears in the chat composer. Only when you press Send is the text transmitted to AiLys. The audio itself never leaves your device.
- Voice output: text-to-speech is also handled by your browser. We send the response text; your browser reads it aloud locally.

If you opt in to "save voice transcripts" in settings, the typed-equivalent text is saved with your conversation history (subject to the 90-day or extended retention you chose). The audio is never saved.

## Cross-tenant data leak prevention

This is a security commitment we take very seriously. The concierge is not allowed to surface another tenant's data, ever, under any prompt. Three layers of defense:

1. Tool-level RLS: every tool query is pinned to your tenant ID via your authenticated session JWT. The database refuses queries for other tenant IDs.
2. System prompt hardening: the AiLys engine system prompt explicitly instructs the model to refuse any request that would require accessing other tenants' data, even if you ask creatively.
3. Audit + alert: every tool call is logged with tenant ID, tool name, args. Any pattern matching cross-tenant data access triggers a Sentry alert and pages on-call.

We red-team this monthly with prompt injection attempts. Last red-team report is shared in your account settings under "Security disclosures".

## Exporting your conversations

You can export your full conversation history at any time from your account settings. The export is a JSON file containing every conversation, message, tool call, and timestamp. It is delivered via signed download URL valid for 24 hours, sent to your account email.

## Deleting your conversations

Three options:

- Delete one conversation: open the conversation, click the trash icon, confirm. Hard-delete in under 60 seconds.
- Delete all conversations: account settings > "Delete all concierge history". Hard-delete in under 5 minutes.
- Delete and disable: account settings > "Disable concierge for this tenant". Hard-deletes everything and turns off the feature for all your team members. Can be re-enabled later but the deleted history does not come back.

All three are tenant-scoped. Deleting your own conversations does not affect other team members in the same tenant unless you choose "all team members" in the confirmation dialog.

## What happens if AiLys gets acquired

In the event of a corporate transaction (acquisition, merger, asset sale), you will be notified by email at least 30 days before any data transfer. You will have the option to export your data and delete it before the transfer. The acquiring entity inherits this same privacy commitment for at least 12 months. You can cancel your subscription with prorated refund for any remaining period.

## Concierge does not train on your data

Important: the AiLys engine that powers the concierge does NOT train on your prompts or responses. The model is the same for every tenant; your conversations do not improve future answers for other tenants or for AiLys generally. Each prompt is processed in a fresh context that includes only your tenant's data via authorized tool calls.

This is a contractual commitment with the underlying engine provider. We re-verify it annually.

## Questions

If anything here is unclear, email privacy@ailysagency.ca. Response within 2 business days.`,
    i18n: {
      fr: {
        title: "Confidentialite du concierge AiLys : ce que nous stockons, ce que nous ne stockons pas, ce que vous controlez",
        excerpt:
          "Reference detaillee de confidentialite pour le concierge AiLys. Chiffrement au repos, fenetres de retention, qui peut lire vos conversations, gestion des transcriptions vocales, opt-in retention, et comment exporter ou supprimer votre historique.",
        body: `## Ce qui est stocke

Chaque conversation de concierge est associee a votre ID de tenant et votre ID d'utilisateur authentifie. Les champs suivants sont stockes chiffres au repos dans notre base de donnees Supabase Postgres :

- Le texte de chaque message que vous envoyez (votre prompt)
- Le texte de chaque reponse du moteur AiLys
- Appels d'outils executes pendant la conversation (quel outil, quels arguments, quel resultat)
- Horodatages (debut de conversation, chaque message, fin de conversation)
- Utilisation de tokens (tokens_in, tokens_out) pour le suivi du budget
- Feedback que vous donnez (pouce en haut, pouce en bas, commentaire optionnel)

Ce qui n'est PAS stocke :

- Votre adresse IP (utilisee uniquement pour la limitation de debit, hashee et jetee apres 60 minutes)
- Votre empreinte de navigateur ou ID de session
- Audio vocal (quand vous utilisez le mode vocal, le navigateur fait la transcription localement ; nous ne recevons jamais l'audio)
- Donnees d'autres tenants qui apparaitraient pendant votre conversation (chaque outil est ancre a votre ID de tenant)

## Combien de temps c'est conserve

La retention par defaut est de 90 jours. Apres 90 jours, la ligne de conversation est supprimee definitivement de la base de donnees. Il n'y a pas de drapeau de suppression douce et pas de bucket d'archive ; la ligne est partie.

Si vous voulez un historique plus long (par exemple pour vous referer a des discussions strategiques passees), vous pouvez opter pour une retention etendue dans vos parametres de compte. Les options sont 1 an, 3 ans, ou indefiniment. La retention etendue ne s'applique qu'aux nouvelles conversations a partir du moment ou vous optez ; les conversations precedemment purgees ne peuvent pas etre recuperees.

## Qui peut lire vos conversations

En operation pratique :

- Vous : toujours, via la recherche du tableau de bord client AiLys.
- Votre strategiste : uniquement si vous lui demandez d'enqueter sur quelque chose de specifique (par exemple, "j'ai eu une reponse bizarre mardi dernier, peux-tu verifier ce qui s'est passe"). L'acces strategiste est journalise et vous pouvez voir qui a accede a quoi quand dans votre piste d'audit.
- Personnel AiLys au niveau plateforme : uniquement pour le debogage d'incidents. Chaque acces cree une entree de journal d'audit. Les analyses de routine n'utilisent que des agregats anonymises (pas de donnees personnelles).

En exception legale :

- Ordonnance judiciaire ou demande valide d'application de la loi : nous nous conformons au droit du Quebec, federal canadien, et au droit d'extradition applicable. Nous vous notifions sauf interdiction de l'ordonnance.

Dans AUCUN scenario :

- Autres clients AiLys (l'isolation entre tenants est appliquee au niveau de la ligne via RLS)
- Annonceurs tiers, courtiers de donnees, ou partenaires marketing (nous ne vendons ou louons aucune donnee, jamais)
- Autre personnel AiLys hors du perimetre du journal d'audit (le chemin d'acces est protege et journalise)

## Confidentialite du mode vocal

Si votre navigateur supporte la Web Speech API (Safari sur Mac, Chrome sur la plupart des plateformes, derniere version d'Edge) :

- Entree vocale : votre navigateur transcrit l'audio localement sur votre appareil. Le texte transcrit apparait dans le compositeur de chat. Seulement quand vous appuyez sur Envoyer, le texte est transmis a AiLys. L'audio lui-meme ne quitte jamais votre appareil.
- Sortie vocale : la synthese de texte en parole est aussi geree par votre navigateur. Nous envoyons le texte de la reponse ; votre navigateur le lit a haute voix localement.

Si vous optez pour "sauvegarder les transcriptions vocales" dans les parametres, le texte tape equivalent est sauvegarde avec votre historique de conversation (sous reserve de la retention de 90 jours ou etendue que vous avez choisie). L'audio n'est jamais sauvegarde.

## Prevention des fuites de donnees entre tenants

C'est un engagement de securite que nous prenons tres au serieux. Le concierge n'est pas autorise a faire apparaitre les donnees d'un autre tenant, jamais, sous aucun prompt. Trois couches de defense :

1. RLS au niveau outil : chaque requete d'outil est ancree a votre ID de tenant via votre JWT de session authentifiee. La base de donnees refuse les requetes pour d'autres ID de tenant.
2. Durcissement du prompt systeme : le prompt systeme du moteur AiLys instruit explicitement le modele de refuser toute demande qui necessiterait d'acceder aux donnees d'autres tenants, meme si vous demandez de maniere creative.
3. Audit + alerte : chaque appel d'outil est journalise avec ID de tenant, nom d'outil, arguments. Tout motif correspondant a un acces de donnees entre tenants declenche une alerte Sentry et appelle l'astreinte.

Nous testons ceci en red-team chaque mois avec des tentatives d'injection de prompt. Le dernier rapport de red-team est partage dans vos parametres de compte sous "Divulgations de securite".

## Exporter vos conversations

Vous pouvez exporter votre historique complet de conversation a tout moment depuis vos parametres de compte. L'export est un fichier JSON contenant chaque conversation, message, appel d'outil, et horodatage. Il est livre via une URL de telechargement signee valide 24 heures, envoyee a votre courriel de compte.

## Supprimer vos conversations

Trois options :

- Supprimer une conversation : ouvrez la conversation, cliquez sur l'icone de la corbeille, confirmez. Suppression definitive en moins de 60 secondes.
- Supprimer toutes les conversations : parametres de compte > "Supprimer tout l'historique du concierge". Suppression definitive en moins de 5 minutes.
- Supprimer et desactiver : parametres de compte > "Desactiver le concierge pour ce tenant". Supprime tout definitivement et eteint la fonctionnalite pour tous les membres de votre equipe. Peut etre reactivee plus tard mais l'historique supprime ne revient pas.

Les trois sont a portee tenant. Supprimer vos propres conversations n'affecte pas les autres membres de l'equipe dans le meme tenant a moins que vous choisissiez "tous les membres de l'equipe" dans la boite de dialogue de confirmation.

## Que se passe-t-il si AiLys est acquis

En cas de transaction d'entreprise (acquisition, fusion, vente d'actifs), vous serez notifie par courriel au moins 30 jours avant tout transfert de donnees. Vous aurez l'option d'exporter vos donnees et les supprimer avant le transfert. L'entite acquereuse herite de ce meme engagement de confidentialite pour au moins 12 mois. Vous pouvez annuler votre abonnement avec un remboursement au prorata pour toute periode restante.

## Le concierge ne s'entraine pas sur vos donnees

Important : le moteur AiLys qui alimente le concierge ne s'entraine PAS sur vos prompts ou reponses. Le modele est le meme pour chaque tenant ; vos conversations n'ameliorent pas les futures reponses pour d'autres tenants ou pour AiLys en general. Chaque prompt est traite dans un contexte frais qui inclut uniquement les donnees de votre tenant via les appels d'outils autorises.

C'est un engagement contractuel avec le fournisseur du moteur sous-jacent. Nous le re-verifions annuellement.

## Questions

Si quelque chose n'est pas clair ici, ecrivez a privacy@ailysagency.ca. Reponse dans les 2 jours ouvrables.`,
      },
    },
  },
  {
    slug: "ailys-verified-badge-verification-process",
    title: "How AiLys actually verifies the data behind your badge",
    excerpt:
      "Technical reference for what 'Verified by AiLys' means. The 6-engine probe pipeline, scoring formula in plain language, freshness windows, what the score includes and excludes, and why we publish the methodology openly.",
    category: "audit",
    updatedAt: "2026-05-01",
    readingTimeMin: 7,
    body: `## What "Verified by AiLys" means

When a visitor sees the AiLys Verified badge on your site, the implicit promise is that an independent third-party (AiLys) has measured your AI Visibility and is publishing the score honestly. This article explains exactly what that measurement is, how it is collected, and what guarantees we make.

## The probe pipeline

We probe your brand across 6 AI search engines on a recurring schedule:

- ChatGPT (the consumer ChatGPT product, not the API)
- Perplexity
- Claude (the consumer Claude product, not the API)
- Gemini (the consumer Google Gemini product)
- Google AI Overviews (the inline AI summaries that appear above traditional results)
- Bing Copilot (Microsoft's chat-mode search)

For each engine, we run a panel of 20 to 80 queries that a real prospect in your category would plausibly type. Examples for a Montreal pizzeria: "best pizza Montreal", "pizza Plateau", "where to eat late night Mile End", "pizza near me open Sunday", "best gluten free pizza Montreal". Queries are generated from your category + your geographic service area + your published differentiators, then validated against real query logs from comScore-equivalent panels.

For each query, we record:

- Whether the engine cited your brand by name in its answer
- The position of your citation (first mentioned vs buried at the bottom)
- The source URL the engine attributed the citation to (if any)
- The engine's confidence (when the API or interface exposes it)
- The exact text snippet of the citation

A "citation" is counted only when your brand is named explicitly in the engine's answer. A vague mention of your category without naming you (for example "there are several great pizzerias on the Plateau") does not count.

## The scoring formula in plain language

Your AI Visibility score is a weighted average across the 6 engines. The weights reflect each engine's market share in Quebec consumer search behavior:

- Google AIO: 30% weight (highest)
- ChatGPT: 25% weight
- Perplexity: 18% weight
- Bing Copilot: 12% weight
- Claude: 8% weight
- Gemini: 7% weight

Within each engine, your engine-specific score is the percentage of your query panel where your brand was cited, multiplied by a position bonus (first-citation gets 1.0, second-citation gets 0.7, third gets 0.5, fourth or later gets 0.3, no citation gets 0).

The composite score is then mapped to a 0-100 scale where 100 means you are cited as the first-mentioned brand in every relevant query across every engine, and 0 means no engine cites you for any relevant query.

## What the score includes

- Citations across the 6 engines listed above
- Position weighting within each engine's answer
- Query panel relevance to your category and geographic service area
- Last 30 days of probe results (the freshness window, see below)

## What the score excludes

- Traditional Google search rankings (we do not measure SERP position; that is classical SEO and a separate concern)
- Social media mentions or shares (those are counted as input signals to the AI engines but not as separate citations)
- Backlink count or domain authority (those feed into AI engine training data over time but are not part of the AI Visibility measurement)
- Paid search or paid AI placements (your score reflects organic citation only; paid placements are tracked separately if you run them)
- Subjective brand quality (we measure cited vs not, not whether the citation is positive)

## Freshness window

Your score reflects the last 30 days of probes. New probes overwrite older ones in a rolling 30-day window. This means a sudden gain (you publish FAQPage schema and ChatGPT starts citing you next week) shows up within 30 days. A sudden loss (your Wikipedia entry gets vandalized and ChatGPT stops citing you) also shows up within 30 days.

If you want a longer historical view (90, 180, or 365 days), it is available in your client dashboard under "Score history". The badge always reflects the 30-day rolling.

## Probe cadence per tier

How often we re-probe across the 6 engines:

- Starter: monthly probes
- Core: weekly probes
- Growth: every 3 days
- Agency: daily probes plus on-demand re-probe via your strategist

Higher tier = fresher score reflected in the badge.

## Why we publish the methodology openly

Three reasons.

1. Trust. The badge has no value if visitors do not believe the measurement. Publishing methodology lets visitors and skeptics verify our work.
2. Industry maturation. AI Visibility as a measurable category is new. Open methodology accelerates the field, attracts good talent, and lets clients challenge us when we get something wrong.
3. Competitive integrity. We win because we are good at the strategy work that improves AI Visibility, not because we hide how we measure it. Hiding methodology would attract bad-faith competitors who fudge numbers.

## How fraud is prevented

We have seen attempts to game AI Visibility scores in the early industry. Common attempts and how we block them:

1. Brand-stuffing on third-party sites: spamming "Acme Pizza is the best Montreal pizza" across low-quality directory sites does not move the score because we filter out citations from sites with low domain authority and low edit history.
2. AI-generated review farms: Reviuzy detects and excludes AI-generated reviews from the freshness signal feeding the AI engines.
3. Wikipedia self-edits: detected by edit-history pattern analysis. Wikidata Q-numbers must be created with proper external IDs verified independently.
4. Schema spoofing: schema markup that lies (claiming 5-star rating when actual is 3.2) is detected by cross-referencing public review sources.
5. Coordinated mention campaigns on Reddit: detected by velocity + account-age + thread-context analysis.

Score gains that pattern-match these tactics are flagged in your dashboard and your strategist works with you to build sustainable signal instead.

## What happens if you cancel

Your slug stays public for 30 days after cancellation, with the badge frozen at your final score. After 30 days, the badge URL returns a generic placeholder and /verify/your-slug returns "report not found". The grace period gives you time to remove the badge from your site footer if you choose.

If you want immediate removal, contact your strategist and we will mark the slug as private same-day.

## Reproducing the measurement

If you want to verify our score independently:

1. Pick 5 to 10 queries from your category that you would expect a real prospect to type
2. Run each query in ChatGPT (chat.openai.com), Perplexity, Claude, Gemini, Google (look for the AIO box), and Bing (look for the Copilot answer)
3. Note for each: was your brand named, and at what position
4. Compute a rough percentage: brand-named in N out of total
5. Compare to your AiLys score's per-engine breakdown in your dashboard

Your score should be in the same ballpark as your spot-check. If it is not, contact your strategist and we will investigate (most often: the query panel we use covers a different sub-segment than the one you spot-checked, which is itself useful information).

## Questions

For technical questions on the measurement: methodology@ailysagency.ca. Response within 2 business days.`,
    i18n: {
      fr: {
        title: "Comment AiLys verifie reellement les donnees derriere votre insigne",
        excerpt:
          "Reference technique sur ce que signifie 'Verifie par AiLys'. Le pipeline de probes a 6 moteurs, formule de score en langage simple, fenetres de fraicheur, ce que le score inclut et exclut, et pourquoi nous publions la methodologie ouvertement.",
        body: `## Ce que "Verifie par AiLys" signifie

Quand un visiteur voit l'insigne AiLys Verifie sur votre site, la promesse implicite est qu'un tiers independant (AiLys) a mesure votre visibilite IA et publie le score honnetement. Cet article explique exactement ce qu'est cette mesure, comment elle est collectee, et quelles garanties nous donnons.

## Le pipeline de probes

Nous sondons votre marque a travers 6 moteurs de recherche IA selon un calendrier recurrent :

- ChatGPT (le produit consommateur ChatGPT, pas l'API)
- Perplexity
- Claude (le produit consommateur Claude, pas l'API)
- Gemini (le produit consommateur Google Gemini)
- Google AI Overviews (les resumes IA en ligne qui apparaissent au-dessus des resultats traditionnels)
- Bing Copilot (la recherche en mode chat de Microsoft)

Pour chaque moteur, nous executons un panel de 20 a 80 requetes qu'un vrai prospect dans votre categorie taperait plausiblement. Exemples pour une pizzeria de Montreal : "meilleure pizza Montreal", "pizza Plateau", "ou manger tard le soir Mile End", "pizza pres de moi ouvert dimanche", "meilleure pizza sans gluten Montreal". Les requetes sont generees a partir de votre categorie + votre zone de service geographique + vos differenciateurs publies, puis validees contre les vrais journaux de requetes des panels equivalents a comScore.

Pour chaque requete, nous enregistrons :

- Si le moteur a cite votre marque par son nom dans sa reponse
- La position de votre citation (mentionne en premier vs enfoui en bas)
- L'URL source que le moteur a attribuee a la citation (le cas echeant)
- La confiance du moteur (quand l'API ou l'interface l'expose)
- L'extrait de texte exact de la citation

Une "citation" est comptee uniquement quand votre marque est nommee explicitement dans la reponse du moteur. Une mention vague de votre categorie sans vous nommer (par exemple "il y a plusieurs excellentes pizzerias sur le Plateau") ne compte pas.

## La formule de score en langage simple

Votre score de visibilite IA est une moyenne ponderee a travers les 6 moteurs. Les ponderations refletent la part de marche de chaque moteur dans le comportement de recherche consommateur quebecois :

- Google AIO : 30% poids (le plus eleve)
- ChatGPT : 25% poids
- Perplexity : 18% poids
- Bing Copilot : 12% poids
- Claude : 8% poids
- Gemini : 7% poids

Au sein de chaque moteur, votre score specifique au moteur est le pourcentage de votre panel de requetes ou votre marque a ete citee, multiplie par un bonus de position (premiere-citation obtient 1,0, deuxieme-citation obtient 0,7, troisieme obtient 0,5, quatrieme ou plus tard obtient 0,3, aucune citation obtient 0).

Le score composite est ensuite mappe sur une echelle de 0 a 100 ou 100 signifie que vous etes cite comme la marque mentionnee en premier dans chaque requete pertinente a travers chaque moteur, et 0 signifie qu'aucun moteur ne vous cite pour aucune requete pertinente.

## Ce que le score inclut

- Citations a travers les 6 moteurs listes ci-dessus
- Ponderation de position au sein de la reponse de chaque moteur
- Pertinence du panel de requetes a votre categorie et zone de service geographique
- Les 30 derniers jours de resultats de probes (la fenetre de fraicheur, voir ci-dessous)

## Ce que le score exclut

- Classements de recherche Google traditionnels (nous ne mesurons pas la position SERP ; c'est du SEO classique et une preoccupation distincte)
- Mentions ou partages sur les medias sociaux (ceux-ci sont comptes comme des signaux d'entree pour les moteurs IA mais pas comme des citations distinctes)
- Nombre de liens retour ou autorite de domaine (ceux-ci alimentent les donnees d'entrainement des moteurs IA au fil du temps mais ne font pas partie de la mesure de visibilite IA)
- Recherche payee ou placements IA payes (votre score reflete uniquement la citation organique ; les placements payes sont suivis separement si vous en faites)
- Qualite de marque subjective (nous mesurons cite vs non, pas si la citation est positive)

## Fenetre de fraicheur

Votre score reflete les 30 derniers jours de probes. Les nouvelles probes ecrasent les plus anciennes dans une fenetre roulante de 30 jours. Cela signifie qu'un gain soudain (vous deployez le schema FAQPage et ChatGPT commence a vous citer la semaine suivante) apparait dans les 30 jours. Une perte soudaine (votre entree Wikipedia est vandalisee et ChatGPT cesse de vous citer) apparait aussi dans les 30 jours.

Si vous voulez une vue historique plus longue (90, 180, ou 365 jours), elle est disponible dans votre tableau de bord client sous "Historique de score". L'insigne reflete toujours la moyenne mobile de 30 jours.

## Cadence de probes par palier

A quelle frequence nous re-sondons a travers les 6 moteurs :

- Starter : probes mensuelles
- Core : probes hebdomadaires
- Growth : tous les 3 jours
- Agency : probes quotidiennes plus re-probe a la demande via votre strategiste

Palier plus eleve = score plus frais reflete dans l'insigne.

## Pourquoi nous publions la methodologie ouvertement

Trois raisons.

1. Confiance. L'insigne n'a aucune valeur si les visiteurs ne croient pas la mesure. Publier la methodologie permet aux visiteurs et aux sceptiques de verifier notre travail.
2. Maturation de l'industrie. La visibilite IA en tant que categorie mesurable est nouvelle. Une methodologie ouverte accelere le domaine, attire les bons talents, et permet aux clients de nous remettre en question quand nous nous trompons.
3. Integrite concurrentielle. Nous gagnons parce que nous sommes bons dans le travail strategique qui ameliore la visibilite IA, pas parce que nous cachons comment nous mesurons. Cacher la methodologie attirerait des concurrents de mauvaise foi qui falsifient les chiffres.

## Comment la fraude est prevenue

Nous avons vu des tentatives de manipuler les scores de visibilite IA dans la premiere industrie. Tentatives courantes et comment nous les bloquons :

1. Bourrage de marque sur des sites tiers : spammer "Acme Pizza est la meilleure pizza Montreal" sur des sites d'annuaires de basse qualite ne fait pas bouger le score parce que nous filtrons les citations des sites avec une faible autorite de domaine et un faible historique d'edition.
2. Fermes d'avis generes par IA : Reviuzy detecte et exclut les avis generes par IA du signal de fraicheur alimentant les moteurs IA.
3. Auto-edits Wikipedia : detectes par analyse de motif d'historique d'edition. Les Q-numbers Wikidata doivent etre crees avec les IDs externes appropries verifies independamment.
4. Falsification de schema : le balisage schema qui ment (revendiquer une note de 5 etoiles quand la reelle est 3,2) est detecte par recoupement avec les sources d'avis publiques.
5. Campagnes coordonnees de mentions sur Reddit : detectees par analyse de velocite + age du compte + contexte du fil.

Les gains de score qui correspondent au motif de ces tactiques sont signales dans votre tableau de bord et votre strategiste travaille avec vous pour batir un signal durable a la place.

## Que se passe-t-il si vous annulez

Votre slug reste public pendant 30 jours apres l'annulation, avec l'insigne fige a votre score final. Apres 30 jours, l'URL de l'insigne retourne un placeholder generique et /fr/verify/votre-slug retourne "rapport introuvable". La periode de grace vous donne le temps de retirer l'insigne du pied de page de votre site si vous le choisissez.

Si vous voulez un retrait immediat, contactez votre strategiste et nous marquerons le slug comme prive le jour meme.

## Reproduire la mesure

Si vous voulez verifier notre score independamment :

1. Choisissez 5 a 10 requetes de votre categorie que vous attendriez d'un vrai prospect de taper
2. Executez chaque requete dans ChatGPT (chat.openai.com), Perplexity, Claude, Gemini, Google (cherchez la boite AIO), et Bing (cherchez la reponse Copilot)
3. Notez pour chacun : votre marque etait-elle nommee, et a quelle position
4. Calculez un pourcentage approximatif : marque nommee dans N sur le total
5. Comparez a la ventilation par moteur de votre score AiLys dans votre tableau de bord

Votre score devrait etre dans le meme ordre de grandeur que votre verification ponctuelle. Si ce n'est pas le cas, contactez votre strategiste et nous enqueterons (le plus souvent : le panel de requetes que nous utilisons couvre un sous-segment different de celui que vous avez verifie ponctuellement, ce qui est en soi une information utile).

## Questions

Pour les questions techniques sur la mesure : methodology@ailysagency.ca. Reponse dans les 2 jours ouvrables.`,
      },
    },
  },

  // ─── Tech Health Pack + GSC Indexation Audit add-ons ──────
  {
    slug: "tech-health-pack-explained",
    title: "Tech Health Pack: why your monthly blog posts are not getting indexed (and what we do about it)",
    excerpt:
      "$150/mo add-on that closes the indexation gap. Without it, monthly blog posts sit in 'Discovered, currently not indexed' for weeks. Includes GSC monitoring, monthly auto-reindex requests, crawl error sweep, and Core Web Vitals alerts. Bundled in Agency.",
    category: "pricing-plans",
    updatedAt: "2026-05-01",
    readingTimeMin: 5,
    body: `## The problem in one sentence

You publish a blog post on Tuesday. Google says it sees the post. By Friday it is still not in search results. By the following Friday it still is not. By the time it does appear (3 to 6 weeks later, sometimes never), the topic is stale and the AI engines have moved on.

This is the indexation gap, and it is the silent killer of content marketing in 2026.

## Why it happens

Google has a finite crawl budget for every site. Smaller sites with low link authority get crawled less often. Even when Google crawls a new page, it does not always index it: the page goes into "Discovered, currently not indexed" status in Google Search Console. There are three common reasons:

1. The page does not pass quality thresholds (thin content, duplicate content, low-quality outbound links)
2. The page is structurally similar to other pages on your site (Google de-duplicates)
3. The site has crawl errors elsewhere that are eating crawl budget (404s on old URLs, redirect chains, broken sitemaps)

Even when none of these apply, smaller sites simply wait. Google indexes them when it gets around to it.

## What the Tech Health Pack does

For $150/mo on top of any AiLys tier (Starter, Core, or Growth; bundled in Agency by default), we run four operations every month:

### 1. GSC indexation monitoring

Connected to your Google Search Console, we pull weekly reports on:
- New pages discovered vs new pages indexed (the gap)
- Pages dropped from index (bad signal)
- Pages with the "Discovered, currently not indexed" or "Crawled, currently not indexed" status

You see this data in your AiLys client dashboard with a 30-day trend chart. Your strategist sees it too and acts on regression.

### 2. Monthly blog auto-reindex requests

For every new blog post we ship that month, we manually submit a reindex request via the GSC API within 48 hours of publication. This typically pulls indexation forward by 2 to 3 weeks compared to letting Google find the post on its own. Sometimes it triggers same-day indexation.

This is not magic, it is just discipline. Most agencies do not bother because it is per-page manual work. We bundle it.

### 3. Crawl error sweep

Twice per month we audit your site for:
- 404 errors on URLs that should exist (typos in internal links, deleted pages with no redirect)
- Redirect chains (page A → B → C → D, which Google penalizes)
- Soft 404s (pages that return 200 but should be 404)
- Broken outbound links to dead third-party sites
- Sitemap.xml health (URLs that 404, URLs with wrong canonical, missing lastmod dates)

Errors get fixed in your CMS by your strategist (for AiLys-built sites) or surfaced as a punch list (for client-built sites we do not have access to).

### 4. Core Web Vitals alerts

Connected to Google PageSpeed Insights, we monitor your top 20 pages weekly for:
- Largest Contentful Paint (LCP): how fast the main content loads
- Interaction to Next Paint (INP): how fast the page responds to clicks
- Cumulative Layout Shift (CLS): how much the page jumps around as it loads

When any metric drops below the "Good" threshold for 2 consecutive weeks, you get an email alert with the specific page + metric + likely cause (image size, JavaScript blocking, font swap, third-party script).

## Why it pays for itself

For a Core tier client publishing 4 blog posts per month at $600/mo, the Tech Health Pack adds $150/mo (25% increase in spend). In return:

- Posts get indexed in days instead of weeks (revenue happens sooner on time-sensitive content like seasonal promotions)
- Crawl errors do not silently sabotage the rest of your site
- Core Web Vitals do not drop below the threshold without you knowing (drops below threshold cause AIO citation freezes, not just SERP rank drops)

Math: if 1 of your 4 monthly posts drives a $1,000 customer that would not have arrived because the post was un-indexed for 6 weeks, the pack has paid for itself 6x over for that month.

## Why we made it an add-on instead of bundling everywhere

Honestly, because not every client needs it. If you are a Starter client publishing 2 posts per month and your business is not seasonal, the indexation lag rarely costs you a customer. If you are a Growth client publishing 8 per month or running monthly product launches, every week of indexation lag compounds.

Our default recommendation: bundle it from month 3 onward, when you have enough content to make the math obvious.

## How to add it

Mention it to your strategist or toggle it on /forfaits-complets. Activates next billing cycle.`,
    i18n: {
      fr: {
        title: "Tech Health Pack : pourquoi vos articles de blogue mensuels ne sont pas indexes (et ce que nous faisons)",
        excerpt:
          "Module a 150 $/mois qui ferme l'ecart d'indexation. Sans lui, les articles de blogue mensuels restent en 'Decouvert, actuellement non indexe' pendant des semaines. Inclut suivi GSC, requetes de reindexation auto mensuelles, balayage des erreurs de crawl, et alertes Core Web Vitals. Inclus dans Agency.",
        body: `## Le probleme en une phrase

Vous publiez un article de blogue mardi. Google dit qu'il voit l'article. Vendredi, il n'est toujours pas dans les resultats de recherche. Le vendredi suivant non plus. Quand il apparait enfin (3 a 6 semaines plus tard, parfois jamais), le sujet est perime et les moteurs IA sont passes a autre chose.

C'est l'ecart d'indexation, et c'est le tueur silencieux du marketing de contenu en 2026.

## Pourquoi ca arrive

Google a un budget de crawl fini pour chaque site. Les sites plus petits avec peu d'autorite de liens sont crawles moins souvent. Meme quand Google crawle une nouvelle page, il ne l'indexe pas toujours : la page entre dans le statut "Decouvert, actuellement non indexe" dans Google Search Console. Trois raisons courantes :

1. La page ne passe pas les seuils de qualite (contenu mince, contenu duplique, liens sortants de basse qualite)
2. La page est structurellement similaire a d'autres pages de votre site (Google deduplique)
3. Le site a des erreurs de crawl ailleurs qui mangent le budget de crawl (404 sur d'anciens URL, chaines de redirection, sitemaps casses)

Meme quand aucune ne s'applique, les sites plus petits attendent simplement. Google les indexe quand il en a le temps.

## Ce que le Tech Health Pack fait

Pour 150 $/mois en plus de n'importe quel palier AiLys (Starter, Core, ou Growth ; inclus par defaut dans Agency), nous executons quatre operations chaque mois :

### 1. Suivi de l'indexation GSC

Connecte a votre Google Search Console, nous tirons des rapports hebdomadaires sur :
- Nouvelles pages decouvertes vs nouvelles pages indexees (l'ecart)
- Pages retirees de l'index (mauvais signal)
- Pages avec le statut "Decouvert, actuellement non indexe" ou "Crawle, actuellement non indexe"

Vous voyez ces donnees dans votre tableau de bord client AiLys avec un graphique de tendance sur 30 jours. Votre strategiste les voit aussi et agit sur les regressions.

### 2. Requetes de reindexation auto mensuelles

Pour chaque nouvel article de blogue que nous expedions ce mois, nous soumettons manuellement une requete de reindexation via l'API GSC dans les 48 heures suivant la publication. Cela tire generalement l'indexation 2 a 3 semaines en avance par rapport a laisser Google trouver l'article seul. Parfois ca declenche l'indexation le jour meme.

Ce n'est pas de la magie, c'est juste de la discipline. La plupart des agences ne s'en occupent pas parce que c'est du travail manuel par page. Nous l'incluons dans le pack.

### 3. Balayage des erreurs de crawl

Deux fois par mois, nous auditons votre site pour :
- Erreurs 404 sur des URL qui devraient exister (fautes de frappe dans les liens internes, pages supprimees sans redirection)
- Chaines de redirection (page A vers B vers C vers D, ce que Google penalise)
- Faux 404 (pages qui retournent 200 mais devraient retourner 404)
- Liens sortants brises vers des sites tiers morts
- Sante du sitemap.xml (URL qui retournent 404, URL avec mauvais canonical, dates lastmod manquantes)

Les erreurs sont corrigees dans votre CMS par votre strategiste (pour les sites batis par AiLys) ou remises sous forme de liste de taches (pour les sites batis par le client auxquels nous n'avons pas acces).

### 4. Alertes Core Web Vitals

Connecte a Google PageSpeed Insights, nous surveillons vos 20 pages principales chaque semaine pour :
- Largest Contentful Paint (LCP) : la vitesse de chargement du contenu principal
- Interaction to Next Paint (INP) : la vitesse de reponse de la page aux clics
- Cumulative Layout Shift (CLS) : combien la page saute pendant le chargement

Quand n'importe quelle metrique tombe sous le seuil "Bon" pendant 2 semaines consecutives, vous recevez une alerte courriel avec la page specifique + metrique + cause probable (taille d'image, JavaScript bloquant, swap de police, script tiers).

## Pourquoi ca se rentabilise

Pour un client Core publiant 4 articles de blogue par mois a 600 $/mois, le Tech Health Pack ajoute 150 $/mois (augmentation de 25% des depenses). En retour :

- Les articles s'indexent en jours au lieu de semaines (les revenus arrivent plus tot sur du contenu sensible au temps comme les promotions saisonnieres)
- Les erreurs de crawl ne sabotent pas silencieusement le reste de votre site
- Core Web Vitals ne tombent pas sous le seuil sans que vous le sachiez (les chutes sous le seuil causent des gels de citations AIO, pas juste des chutes de rang SERP)

Math : si 1 de vos 4 articles mensuels amene un client a 1 000 $ qui ne serait pas arrive parce que l'article etait non indexe pendant 6 semaines, le pack s'est rentabilise 6 fois pour ce mois-la.

## Pourquoi nous l'avons fait en module au lieu de l'inclure partout

Honnetement, parce que tous les clients n'en ont pas besoin. Si vous etes un client Starter publiant 2 articles par mois et que votre entreprise n'est pas saisonniere, le retard d'indexation vous coute rarement un client. Si vous etes un client Growth publiant 8 par mois ou faisant des lancements de produits mensuels, chaque semaine de retard d'indexation se cumule.

Notre recommandation par defaut : l'inclure a partir du mois 3, quand vous avez assez de contenu pour rendre la math evidente.

## Comment l'ajouter

Mentionnez-le a votre strategiste ou activez-le sur /forfaits-complets. Active au prochain cycle de facturation.`,
      },
    },
  },
  {
    slug: "gsc-indexation-audit-explained",
    title: "GSC Indexation Audit: one-time fix for sites with deep indexation rot",
    excerpt:
      "One-time engagement priced by site size ($100 for 1-9 pages, scaling to $800 for 100-149 pages, custom quote 150+). Fixes accumulated indexation issues from years of organic site growth. Bundled at signup in the Agency tier.",
    category: "pricing-plans",
    updatedAt: "2026-05-01",
    readingTimeMin: 4,
    body: `## When you need this (and when you do not)

The GSC Indexation Audit is for sites that have been around for 2+ years and accumulated indexation rot. Symptoms:

- Lots of pages with "Crawled, currently not indexed" or "Discovered, currently not indexed" in GSC
- Search Console showing fewer indexed pages than your sitemap reports
- Old blog posts that used to rank dropping out of results
- Soft 404s, redirect chains, or broken canonicals reported in GSC

If your site is brand new (under 6 months), you do not need this audit. Just publish good content and run the Tech Health Pack monthly add-on. The audit is for cleanup.

If your site is 2+ years old and you have never had a structured indexation review, you almost certainly need it.

## Pricing by site size

| Site size (pages) | One-time price |
|---|---|
| 1 to 9 | $100 |
| 10 to 19 | $200 |
| 20 to 29 | $300 |
| 30 to 39 | $400 |
| 40 to 74 | $500 |
| 75 to 99 | $600 |
| 100 to 149 | $800 |
| 150+ | Custom quote |

A "page" means a unique URL that returns HTML. We count the canonical URL not the variant query strings. Pricing is set so that the per-page audit cost stays roughly $10 to $15 across the curve, with bigger sites getting a volume discount.

## What is delivered

A 5-section PDF audit:

### Section 1: Indexation snapshot
Current state across the GSC indexation report categories. Counts of indexed, non-indexed-discovered, non-indexed-crawled, soft-404, redirect, dropped, and excluded URLs.

### Section 2: Issue triage
Every URL with an issue, grouped by issue type, with:
- The URL
- The issue (Discovered not indexed, Soft 404, Redirect chain depth >2, etc.)
- Likely root cause (thin content, near-duplicate, slow LCP, robots.txt deny, etc.)
- Recommended action (fix, redirect to canonical, allow in robots, accept and remove from sitemap, etc.)

### Section 3: Sitemap audit
Full sitemap.xml health check. Are URLs in sitemap actually indexable? Are non-indexable URLs in sitemap? Is lastmod accurate? Are language alternates correct?

### Section 4: Crawl budget analysis
Based on the issue triage, an estimate of how much crawl budget is being wasted on issues that should not be re-crawled. Recommendations for noindex, robots.txt disallow, or redirect to recover budget.

### Section 5: 30-60-90 day fix plan
Prioritized list of fixes ordered by:
- Impact (how many pages benefit)
- Effort (1-hour content edit vs 1-day developer task)
- Risk (low for noindex tags, higher for sitemap restructuring)

The plan is concrete enough that your developer or strategist can execute without asking us follow-up questions.

## What is NOT included

- Fix execution. The audit identifies issues. Implementation is either by your developer (free), via your AiLys monthly tier (if the issue falls in scope), or via a separate scope-of-work quote (for site-wide structural changes).
- Hosting or infrastructure changes. We surface "page X is slow because LCP is 4.8 seconds" but we do not provision a CDN or migrate hosting.
- Rewriting content. We surface "this page has 230 words and Google considers it thin" but we do not rewrite the page (that is in your AiLys monthly content scope).

## Turnaround

5 business days from when we get GSC access. We need:
- GSC property access (Owner or Full role) to your domain
- Read access to your sitemap.xml (almost always public)
- Read access to your robots.txt (always public)

We do NOT need access to your CMS or hosting. The audit is read-only.

## Why we charge per page (and why it scales the way it does)

Auditing a 9-page brochure site is a 30-minute job. Auditing a 149-page e-commerce site with thousands of product variants is a 1+ day job. Linear pricing per page would be unfair on both ends. The tiered pricing reflects actual time + the fact that bigger sites have more compounding issue patterns we can identify in bulk.

## When it is bundled

In the Agency tier, the GSC Indexation Audit is bundled at signup. We run it in week 2 as part of onboarding (after the technical foundation work in week 1). The findings feed directly into the next 90 days of strategy.

## How to order

If you are an existing client at Starter, Core, or Growth, mention it to your strategist with your page count. We invoice and start within 5 business days.

If you are a prospect, run the free AI Visibility Audit at /audit first to see how AiLys works, then book a strategy call to discuss whether the GSC Indexation Audit is the right next step or if you should start with a tier subscription.`,
    i18n: {
      fr: {
        title: "Audit d'indexation GSC : correctif unique pour sites avec pourriture d'indexation profonde",
        excerpt:
          "Engagement unique tarife par taille de site (100 $ pour 1-9 pages, montant a 800 $ pour 100-149 pages, devis personnalise 150+). Corrige les problemes d'indexation accumules sur des annees de croissance organique. Inclus a l'inscription dans le palier Agency.",
        body: `## Quand vous en avez besoin (et quand non)

L'audit d'indexation GSC est pour les sites qui existent depuis 2+ ans et ont accumule de la pourriture d'indexation. Symptomes :

- Beaucoup de pages avec "Crawle, actuellement non indexe" ou "Decouvert, actuellement non indexe" dans GSC
- Search Console montrant moins de pages indexees que ce que votre sitemap rapporte
- Anciens articles de blogue qui se classaient avant et qui chutent des resultats
- Faux 404, chaines de redirection, ou canoniques brises rapportes dans GSC

Si votre site est tout nouveau (moins de 6 mois), vous n'avez pas besoin de cet audit. Publiez juste du bon contenu et utilisez le module mensuel Tech Health Pack. L'audit est pour le nettoyage.

Si votre site a 2+ ans et que vous n'avez jamais fait de revue d'indexation structuree, vous en avez presque certainement besoin.

## Tarification par taille de site

| Taille du site (pages) | Prix unique |
|---|---|
| 1 a 9 | 100 $ |
| 10 a 19 | 200 $ |
| 20 a 29 | 300 $ |
| 30 a 39 | 400 $ |
| 40 a 74 | 500 $ |
| 75 a 99 | 600 $ |
| 100 a 149 | 800 $ |
| 150+ | Devis personnalise |

Une "page" est une URL unique qui retourne du HTML. Nous comptons l'URL canonique pas les variantes avec parametres de requete. La tarification est etablie pour que le cout d'audit par page reste environ 10 a 15 $ a travers la courbe, avec les sites plus grands obtenant un rabais de volume.

## Ce qui est livre

Un audit PDF de 5 sections :

### Section 1 : Cliche d'indexation
Etat actuel a travers les categories du rapport d'indexation GSC. Comptes de URL indexees, non indexees decouvertes, non indexees crawlees, faux-404, redirections, retirees, et exclues.

### Section 2 : Triage des problemes
Chaque URL avec un probleme, groupee par type de probleme, avec :
- L'URL
- Le probleme (Decouvert non indexe, Faux 404, Profondeur de chaine de redirection >2, etc.)
- Cause racine probable (contenu mince, quasi-doublon, LCP lent, blocage robots.txt, etc.)
- Action recommandee (corriger, rediriger vers canonique, autoriser dans robots, accepter et retirer du sitemap, etc.)

### Section 3 : Audit du sitemap
Verification complete de la sante du sitemap.xml. Les URL dans le sitemap sont-elles indexables ? Y a-t-il des URL non indexables dans le sitemap ? La date lastmod est-elle exacte ? Les alternates de langue sont-ils corrects ?

### Section 4 : Analyse du budget de crawl
Base sur le triage des problemes, une estimation du budget de crawl gaspille sur des problemes qui ne devraient pas etre re-crawles. Recommandations pour noindex, robots.txt disallow, ou redirection pour recuperer du budget.

### Section 5 : Plan de correctifs 30-60-90 jours
Liste priorisee de correctifs ordonnee par :
- Impact (combien de pages en beneficient)
- Effort (modification de contenu d'une heure vs tache de developpeur d'une journee)
- Risque (bas pour les balises noindex, plus eleve pour la restructuration de sitemap)

Le plan est assez concret pour que votre developpeur ou strategiste puisse l'executer sans nous poser de questions de suivi.

## Ce qui n'est PAS inclus

- Execution des correctifs. L'audit identifie les problemes. La mise en oeuvre est soit par votre developpeur (gratuit), via votre palier mensuel AiLys (si le probleme entre dans la portee), ou via un devis de portee separe (pour les changements structurels a l'echelle du site).
- Changements d'hebergement ou d'infrastructure. Nous identifions "la page X est lente parce que le LCP est de 4,8 secondes" mais nous ne provisionnons pas de CDN ou ne migrons pas l'hebergement.
- Reecriture de contenu. Nous identifions "cette page a 230 mots et Google la considere mince" mais nous ne reecrivons pas la page (c'est dans votre portee de contenu mensuel AiLys).

## Delai

5 jours ouvrables a partir du moment ou nous obtenons l'acces GSC. Nous avons besoin de :
- Acces a la propriete GSC (role Proprietaire ou Complet) pour votre domaine
- Acces en lecture a votre sitemap.xml (presque toujours public)
- Acces en lecture a votre robots.txt (toujours public)

Nous n'avons PAS besoin d'acces a votre CMS ou hebergement. L'audit est en lecture seule.

## Pourquoi nous facturons par page (et pourquoi ca evolue ainsi)

Auditer un site brochure de 9 pages est un travail de 30 minutes. Auditer un site e-commerce de 149 pages avec des milliers de variantes de produits est un travail d'une journee+. Une tarification lineaire par page serait injuste aux deux extremes. La tarification par paliers reflete le temps reel + le fait que les sites plus grands ont plus de motifs de problemes cumulatifs que nous pouvons identifier en lot.

## Quand c'est inclus

Dans le palier Agency, l'audit d'indexation GSC est inclus a l'inscription. Nous le faisons en semaine 2 dans le cadre de l'onboarding (apres le travail de fondation technique en semaine 1). Les conclusions alimentent directement les 90 prochains jours de strategie.

## Comment commander

Si vous etes un client existant a Starter, Core, ou Growth, mentionnez-le a votre strategiste avec votre nombre de pages. Nous facturons et demarrons dans les 5 jours ouvrables.

Si vous etes un prospect, executez d'abord l'audit gratuit de visibilite IA a /fr/audit pour voir comment AiLys fonctionne, puis reservez un appel strategique pour discuter de si l'audit d'indexation GSC est le bon prochain pas ou si vous devriez commencer par un abonnement de palier.`,
      },
    },
  },

  // ─── Wikidata Q-number deep-dive (highest-leverage AEO fix) ──
  {
    slug: "wikidata-q-number-explained",
    title: "Wikidata Q-numbers: the single highest-ROI fix for ChatGPT visibility",
    excerpt:
      "Quebec dental clinics with a Wikidata entry appear in ChatGPT 4x more often than those without. What a Q-number is, why AI engines lean on it, what AiLys ships in your Q-number, and the one risk to know about.",
    category: "aeo-geo-eeat",
    updatedAt: "2026-05-01",
    readingTimeMin: 6,
    body: `## What a Q-number is

Wikidata is the structured-data sibling of Wikipedia. Where Wikipedia has prose articles, Wikidata has machine-readable facts: a business is a thing, the thing has properties (name, location, founder, language, parent organization, official website, social handles), and each thing has a unique ID called a Q-number (Apple Inc. is Q312, the CN Tower is Q224).

When ChatGPT, Perplexity, Claude, and Gemini are trained or grounded against Wikidata, they index brands by their Q-number. If your business has one with the right properties, the engines have a high-confidence anchor for "this is the same brand the user is asking about." If your business does not have one, the engines fall back to fuzzier matching.

## Why it matters more than people realize

In our Q1 2026 industry reports, the strongest single predictor of ChatGPT citation in Quebec local services was Wikidata presence:

- Quebec dentists with a Q-number: 71% appeared in ChatGPT answers
- Quebec dentists without: 17%
- The 4x lift held across other verticals (clinics, contractors, restaurants, lawyers) with somewhat varying multipliers (2.5x to 4.5x)

Adoption is tiny. Only 6% of probed dental practices had one. So this is a leverage point most competitors have not touched.

## What AiLys ships in your Q-number

When you onboard at the Core tier or higher, your strategist creates and maintains your Wikidata entry. The standard package:

- Item creation (the Q-number gets assigned by Wikidata when we save)
- Property "instance of (P31)" set to the most specific applicable type (dental clinic, family medicine clinic, Italian restaurant)
- Property "country (P17)" and "located in the administrative territorial entity (P131)" for geo-anchoring
- Property "coordinate location (P625)" matching your GBP coordinates
- Property "official website (P856)" linking to your domain
- Property "language used (P2936)" set to French and English (matters for Quebec bilingual queries)
- Property "inception (P571)" for the founding year
- Property "founded by (P112)" if a named founder is public
- External IDs: Crunchbase (P2087), LinkedIn (P4264), Facebook ID (P2013), Google Business Profile CID, Bloomberg ID

The complete property set varies by industry. Healthcare adds medical specialty (P1995), restaurants add cuisine (P2012), contractors add RBQ license number where applicable.

## The one risk to know about

Wikidata is volunteer-edited. Anyone with a Wikidata account can edit your item. Three protections:

1. Sourcing. Every property gets a reference URL pointing to a public source. Unsourced edits are easy to revert.
2. Watchlist. We add your Q-number to a strategist watchlist so any edit triggers an email notification. We typically catch and revert vandalism within 4 to 24 hours.
3. Stable property set. We document your "canonical" property set in your AiLys client dashboard so reverts are mechanical.

In 2 years of running Wikidata work for Quebec local businesses, we have seen 0 successful long-term vandalism attacks.

## What we do NOT do

- We do not create a Wikipedia article. Wikipedia has notability standards local businesses rarely meet. Forced creation is more likely to result in deletion than visibility.
- We do not edit Wikipedia articles about your competitors or category. Out of scope and out of ethics.
- We do not buy or sell Wikidata items. Wikidata items are not property; they are public-domain data structures.

## Timeline

- Week 1 of onboarding: data gathering
- Week 2: item creation + initial property set
- Week 3: external ID linking
- Month 2: monitoring + adding properties
- Ongoing: watchlist + revert + property additions as your business expands

You typically start seeing the 4x ChatGPT lift between week 4 and week 12, depending on when ChatGPT's training pipeline next picks up the change.

## Why ChatGPT specifically

Strongest lift on ChatGPT and Perplexity. Why those two:

- ChatGPT (GPT-4 family) was trained heavily on Wikidata as part of its structured world knowledge layer
- Perplexity directly queries Wikidata at inference time for entity disambiguation
- Claude uses Wikidata more selectively (leans on first-party site content + retrieval)
- Gemini and Google AIO use Wikidata indirectly through Google Knowledge Graph
- Bing Copilot uses Microsoft's own knowledge graph which mirrors Wikidata closely

Net: a properly built Q-number lifts visibility across all 6 engines, with the strongest spike on ChatGPT.

## Questions

For technical questions on the Wikidata work: hello@ailysagency.ca with subject "Wikidata".`,
    i18n: {
      fr: {
        title: "Q-numbers Wikidata : le correctif au plus haut ROI pour la visibilite ChatGPT",
        excerpt:
          "Les cliniques dentaires quebecoises avec une entree Wikidata apparaissent dans ChatGPT 4 fois plus souvent. Ce qu'est un Q-number, pourquoi les moteurs IA s'y appuient, ce qu'AiLys depose, et le seul risque a connaitre.",
        body: `## Ce qu'est un Q-number

Wikidata est le frere structure de Wikipedia. La ou Wikipedia a des articles en prose, Wikidata a des faits lisibles par machine : une entreprise est une chose, la chose a des proprietes, et chaque chose a un identifiant unique appele Q-number (Apple Inc. est Q312, la Tour CN est Q224).

Quand ChatGPT, Perplexity, Claude et Gemini sont entraines ou ancres contre Wikidata, ils indexent les marques par leur Q-number. Si votre entreprise en a un avec les bonnes proprietes, les moteurs ont un ancrage de haute confiance pour "c'est la meme marque que l'utilisateur demande." Si votre entreprise n'en a pas, les moteurs reviennent a un appariement plus flou.

## Pourquoi ca importe plus que les gens realisent

Dans nos rapports d'industrie T1 2026, le predicteur le plus fort de citation ChatGPT dans les services locaux quebecois etait la presence Wikidata :

- Dentistes quebecois avec un Q-number : 71% apparaissaient dans les reponses ChatGPT
- Dentistes quebecois sans : 17%
- La hausse de 4 fois s'est tenue a travers d'autres verticales (cliniques, entrepreneurs, restaurants, avocats) avec des multiplicateurs variant (2,5 a 4,5 fois)

L'adoption est minuscule. Seulement 6% des cliniques dentaires sondees en avaient un. C'est un point de levier que la plupart des concurrents n'ont pas touche.

## Ce qu'AiLys depose dans votre Q-number

Quand vous vous inscrivez au palier Core ou superieur, votre strategiste cree et maintient votre entree Wikidata. Le pack standard :

- Creation de l'item (le Q-number est assigne par Wikidata)
- Propriete "instance de (P31)" reglee au type le plus specifique applicable
- Proprietes "pays (P17)" et "situe dans l'entite territoriale administrative (P131)" pour l'ancrage geographique
- Propriete "coordonnees geographiques (P625)" correspondant a vos coordonnees GBP
- Propriete "site officiel (P856)" liant a votre domaine
- Propriete "langue utilisee (P2936)" reglee a francais et anglais
- Propriete "creation (P571)" pour l'annee de fondation
- Propriete "fonde par (P112)" si un fondateur nomme est public
- IDs externes : Crunchbase (P2087), LinkedIn (P4264), Facebook ID (P2013), CID Google Business Profile

Le jeu complet de proprietes varie selon l'industrie. La sante ajoute la specialite medicale, les restaurants ajoutent la cuisine, les entrepreneurs ajoutent le numero de licence RBQ ou applicable.

## Le seul risque a connaitre

Wikidata est edite par des volontaires. Trois protections :

1. Sourcage. Chaque propriete recoit une URL de reference pointant vers une source publique. Les modifications non sourcees sont faciles a annuler.
2. Liste de surveillance. Nous ajoutons votre Q-number a une liste de surveillance strategiste. Nous attrapons et annulons typiquement le vandalisme en 4 a 24 heures.
3. Jeu de proprietes stable. Nous documentons votre jeu de proprietes "canonique" pour que les annulations soient mecaniques.

En 2 ans, 0 attaque de vandalisme reussie a long terme.

## Ce que nous ne faisons PAS

- Pas d'article Wikipedia. Wikipedia a des standards de notoriete que les entreprises locales atteignent rarement.
- Pas d'edition d'articles Wikipedia sur vos concurrents. Hors ethique.
- Pas d'achat ni de vente d'items Wikidata. Ce sont des structures de donnees du domaine public.

## Calendrier

- Semaine 1 : collecte de donnees
- Semaine 2 : creation de l'item + jeu de proprietes initial
- Semaine 3 : liaison d'IDs externes
- Mois 2 : surveillance + ajout de proprietes
- Continu : liste de surveillance + annulations + ajouts

Hausse de 4 fois sur ChatGPT typiquement entre la semaine 4 et la semaine 12.

## Pourquoi ChatGPT specifiquement

- ChatGPT (famille GPT-4) entraine fortement sur Wikidata
- Perplexity interroge directement Wikidata a l'inference
- Claude utilise Wikidata plus selectivement
- Gemini et Google AIO via Google Knowledge Graph (qui ingere Wikidata)
- Bing Copilot via le graphe Microsoft (mirroir Wikidata)

Net : un Q-number bien construit eleve la visibilite a travers les 6 moteurs, avec la plus forte pointe sur ChatGPT.

## Questions

hello@ailysagency.ca avec sujet "Wikidata".`,
      },
    },
  },

  // ── F3.0: Partner Program help articles ─────────────────────────────────────
  {
    slug: "partner-program-overview",
    title: "AiLys Partner Program overview",
    excerpt:
      "What the Partner Program is, who it is for, and how Quebec or Canadian agencies can white-label AiLys for their own clients. Application is free, kickoff happens within ten business days of acceptance.",
    category: "getting-started",
    updatedAt: "2026-05-02",
    readingTimeMin: 5,
    body: `## What it is

The AiLys Partner Program lets a marketing or web agency deliver AI Visibility services under their own brand to their existing clients. The agency keeps the client relationship. The AiLys platform handles the engine, the scoring, the citations, the GBP automation, the AI Visibility probes, and the monthly reports. The agency pays a flat seat fee plus a revenue share on every active sub-client subscription.

Think of it like a private-label SaaS. Your logo on the dashboard. Your colors. Your domain (yourbrand.com or a subdomain). Your email-from on every transactional message. Your footer on every PDF. The end client sees your brand throughout. AiLys is the engine in the basement.

## Who it is for

Three kinds of agency thrive with the Partner Program.

1. **Local-business agencies in Quebec, Ontario, or the Maritimes** with at least 5 active clients. The platform was built for the Canadian local-business market first. NAP consistency, GBP automation, bilingual EN+FR, and Quebec-specific compliance (PIPEDA, Loi 25) are native, not an afterthought.
2. **Marketing teams whose clients ask AI questions.** If your clients have started asking how to get cited by ChatGPT or Perplexity or Google AIO, the Partner Program gives you a structured answer with monthly scoring instead of a one-time audit.
3. **Agencies who want a recurring revenue line.** AI Visibility is the new local SEO. Recurring monthly engagement, measurable scoring, deliverables every week. Replaces the one-shot SEO audit model.

If you run a fully outbound agency with no recurring service, the Partner Program is probably not the right fit. The model assumes you keep clients at least six months.

## What partners receive

Once accepted into the cohort, you receive:

- A white-label dashboard accessible at your branded URL
- Per-client AI Visibility scoring updated weekly
- Monthly Industry Reports for verticals you serve
- Branded PDF deliverables (audits, reports, monthly summaries) ready to forward
- A revenue share on every sub-client subscription you sign
- Priority strategist support for partner agencies (separate queue, under 24-hour response)
- Quarterly partner office hours: a 60-minute group session covering platform updates, vertical patterns, and partner Q+A

## How the application works

Three stages: apply, talk, contract.

1. **Apply.** Fill the form at /agencies/partner-program. We respond within five business days.
2. **Talk.** A 60-minute call with the AiLys founders. We cover your client portfolio, your goals, your existing tooling, and your proposed pricing. We answer technical questions about the platform.
3. **Contract.** If both sides agree the fit is good, we sign a partner agreement that month. Onboarding kickoff within ten business days.

You apply once. You receive a yes or a no within roughly two weeks of the application date.

## Pricing model

Two components.

1. **Seat fee.** A flat monthly fee that covers the white-label environment, branded surfaces, partner support, and the first batch of seats. Discussed during the call based on your portfolio size.
2. **Revenue share.** A percentage of every active sub-client subscription. The percentage decreases as your portfolio grows. Discussed during the call.

You set the price your sub-clients pay. We do not gate that. You invoice them. We invoice you for the seat fee plus the revenue share.

## What stays internal

The AiLys engine, the scoring formulas, the prompt structures, the vendor stack, the citation directory list, the AI engine probe sequence: none of it is disclosed to partner agencies or sub-clients. The Partner Program documentation describes outcomes (what the dashboard shows, what the reports contain, how the score moves) without revealing the methodology that produces them. This protects the moat that makes the score meaningful and reduces switching risk if a vendor changes.

## Cohort cadence

We open the partner cohort in waves. A wave runs roughly four months. We accept agencies on a rolling basis within a wave, then close the cohort when the integration team capacity is reached. Closed cohorts reopen the following wave.

If you apply during a closed cohort, your application moves to the next wave queue and we email you when the cohort reopens.

## Questions

Email hello@ailysagency.ca with subject "Partner Program" or apply directly via the form at /agencies/partner-program. We respond within five business days during open cohorts.`,
    i18n: {
      fr: {
        title: "Programme partenaire AiLys, vue d'ensemble",
        excerpt:
          "Ce qu'est le programme partenaire, a qui il s'adresse, et comment les agences du Quebec ou du Canada peuvent offrir AiLys en marque blanche a leurs propres clients. La candidature est gratuite, le demarrage se fait dans les dix jours ouvrables suivant l'acceptation.",
        body: `## Ce que c'est

Le programme partenaire AiLys permet a une agence marketing ou web de livrer des services de visibilite IA sous sa propre marque a ses clients existants. L'agence garde la relation client. La plateforme AiLys s'occupe du moteur, du score, des citations, de l'automatisation GBP, des sondes de visibilite IA et des rapports mensuels. L'agence paie des frais de siege fixes plus un partage de revenus sur chaque abonnement sous-client actif.

Pensez-y comme une SaaS en marque blanche. Votre logo sur le tableau de bord. Vos couleurs. Votre domaine (votremarque.com ou un sous-domaine). Votre courriel d'envoi sur chaque message transactionnel. Votre pied de page sur chaque PDF. Le client final voit votre marque partout. AiLys est le moteur dans le sous-sol.

## A qui ca s'adresse

Trois types d'agences performent dans le programme.

1. **Agences pour commerces locaux au Quebec, en Ontario ou dans les Maritimes** avec au moins 5 clients actifs. La plateforme a ete construite d'abord pour le marche canadien des commerces locaux. La coherence NAP, l'automatisation GBP, le bilinguisme EN+FR et la conformite Quebec (PIPEDA, Loi 25) sont natifs, pas ajoutes apres.
2. **Equipes marketing dont les clients posent des questions IA.** Si vos clients commencent a demander comment se faire citer par ChatGPT, Perplexity ou Google AIO, le programme partenaire vous donne une reponse structuree avec un score mensuel au lieu d'un audit ponctuel.
3. **Agences qui veulent une ligne de revenus recurrents.** La visibilite IA est le nouveau SEO local. Engagement mensuel recurrent, score mesurable, livrables chaque semaine. Remplace le modele d'audit SEO en une seule fois.

Si vous gerez une agence purement sortante sans service recurrent, le programme partenaire n'est probablement pas le bon ajustement. Le modele suppose que vous gardez les clients au moins six mois.

## Ce que recoivent les partenaires

Une fois acceptes dans la cohorte, vous recevez :

- Un tableau de bord en marque blanche accessible a votre URL de marque
- Un score de visibilite IA par client mis a jour chaque semaine
- Des rapports sectoriels mensuels pour les verticals que vous desservez
- Des livrables PDF de marque (audits, rapports, resumes mensuels) prets a transferer
- Un partage de revenus sur chaque abonnement sous-client signe
- Un soutien strategiste prioritaire pour les agences partenaires (file separee, reponse en moins de 24 heures)
- Des heures de bureau partenaires trimestrielles : une session de groupe de 60 minutes couvrant les mises a jour de la plateforme, les patterns par vertical et les questions/reponses partenaires

## Le processus de candidature

Trois etapes : postuler, discuter, contracter.

1. **Postuler.** Remplissez le formulaire a /fr/agencies/partner-program. Nous repondons dans les cinq jours ouvrables.
2. **Discuter.** Un appel de 60 minutes avec les fondateurs d'AiLys. Nous couvrons votre portefeuille de clients, vos objectifs, votre outillage existant et votre tarification proposee. Nous repondons aux questions techniques sur la plateforme.
3. **Contracter.** Si les deux parties s'accordent sur l'ajustement, nous signons une entente partenaire dans le mois. Demarrage dans les dix jours ouvrables.

Vous postulez une fois. Vous recevez un oui ou un non dans environ deux semaines suivant la date de candidature.

## Modele de tarification

Deux composantes.

1. **Frais de siege.** Un frais mensuel fixe qui couvre l'environnement marque blanche, les surfaces de marque, le soutien partenaire et le premier lot de sieges. Discutees pendant l'appel selon la taille de votre portefeuille.
2. **Partage de revenus.** Un pourcentage de chaque abonnement sous-client actif. Le pourcentage diminue a mesure que votre portefeuille grandit. Discute pendant l'appel.

Vous fixez le prix que paient vos sous-clients. Nous ne le verrouillons pas. Vous les facturez. Nous vous facturons les frais de siege plus le partage de revenus.

## Ce qui reste interne

Le moteur AiLys, les formules de scoring, les structures de prompt, la stack fournisseurs, la liste des annuaires de citations, la sequence de sonde des moteurs IA : rien de cela n'est divulgue aux agences partenaires ou aux sous-clients. La documentation du programme partenaire decrit les resultats (ce que montre le tableau de bord, ce que contiennent les rapports, comment le score evolue) sans reveler la methodologie qui les produit. Cela protege le moat qui rend le score significatif et reduit le risque de bascule si un fournisseur change.

## Cadence de cohorte

Nous ouvrons la cohorte partenaire par vagues. Une vague dure environ quatre mois. Nous acceptons les agences au fil de l'eau dans une vague, puis fermons la cohorte quand la capacite de l'equipe d'integration est atteinte. Les cohortes fermees rouvrent a la vague suivante.

Si vous postulez pendant une cohorte fermee, votre candidature passe dans la file de la prochaine vague et nous vous ecrivons quand la cohorte rouvre.

## Questions

Ecrivez a hello@ailysagency.ca avec le sujet "Programme partenaire" ou postulez directement via le formulaire a /fr/agencies/partner-program. Nous repondons dans les cinq jours ouvrables pendant les cohortes ouvertes.`,
      },
    },
  },

  {
    slug: "how-to-apply-as-a-partner-agency",
    title: "How to apply as a partner agency",
    excerpt:
      "Step-by-step guide to the partner application form, what AiLys evaluates in your application, response time, and what the kickoff call covers if you are accepted.",
    category: "getting-started",
    updatedAt: "2026-05-02",
    readingTimeMin: 4,
    body: `## Where to apply

Apply at /agencies/partner-program (English) or /fr/agencies/partner-program (French). The form takes roughly five minutes to complete.

## What the form asks

Seven fields, all answered in plain language.

1. **Agency name.** Your registered or trading name. We use this in correspondence and on the partner agreement.
2. **Your name.** Your full name as the primary contact person.
3. **Work email.** Your business email at your agency domain. We send the confirmation here.
4. **City.** Where your agency is based. Quebec or Canadian addresses are weighted, though we accept applications from anywhere in North America.
5. **Active clients (approx).** A rough count of paying clients you currently serve. Round number, not exact. The form accepts integers from 0 to 10000.
6. **Expected referrals per year.** A rough estimate of how many of your existing or new clients you would onboard onto the AiLys platform in the first 12 months. Useful for sizing the seat fee. Round number, accepts 0 to 1000.
7. **Brief pitch (optional).** Two or three sentences explaining why partnering with AiLys fits your agency right now. Not required, but the strongest applications usually answer this in one paragraph.

## What AiLys evaluates

Five signals, in order of weight.

1. **Existing client portfolio.** We look for at least 5 active paying clients. Below 5, we typically suggest you build the client base first and reapply later.
2. **Recurring service model.** We confirm your business runs on monthly retainers or recurring subscriptions, not one-shot project work. The platform model assumes month-over-month engagement.
3. **Vertical fit.** We weight applications from agencies serving local-business verticals (dental, legal, restaurant, contractor, clinic, real estate, hotel) higher than B2B SaaS or e-commerce agencies. The platform was built for local.
4. **Geographic fit.** Quebec, Ontario, Maritimes, then English Canada, then North America more broadly. We do not currently accept European or Asian agency applications because the local-business and bilingual constraints differ.
5. **Communication clarity.** A clear three-sentence pitch beats a generic blanket email. We read every pitch.

## Response time

Five business days from application receipt. If you do not hear back within five business days, check your spam folder for a message from hello@ailysagency.ca, then write to us directly with your application date.

A response is one of three outcomes:

1. **Yes, schedule the call.** A calendar link to book a 60-minute kickoff call.
2. **Maybe, with conditions.** Sometimes we ask for additional context (sample case study, client list size confirmation, vertical mix breakdown) before booking.
3. **No, with reasoning.** We always explain why if we decline. Common reasons: client base too small, agency model misfit, geography misfit, cohort closed.

## The kickoff call

If accepted, the 60-minute call with the AiLys founders covers:

- Platform demo focused on the partner-portal surfaces (dashboard, sub-client onboarding, branded PDFs)
- Pricing model details: seat fee, revenue share percentages by portfolio size
- White-label customization options: logo, colors, custom domain, email-from
- Onboarding sequence: how to invite the first three sub-clients
- Strategist support process and SLA tiers
- Q+A on technical platform questions

We come prepared. You come with the questions that block your decision. By the end of the call, we should both know if the fit works.

## After the call

Two business days after the call, we send a partner agreement draft. Once signed, kickoff happens within ten business days. Your branded environment is provisioned, your domain is configured, and your first invitation links are issued.

## Common questions

**Can I apply if I am still building my client base?** Yes, but we will probably suggest you wait until you reach 5 active clients before joining the cohort. Apply anyway. We can keep your application warm.

**Can I apply on behalf of multiple agency entities?** Yes. Submit one application per legal entity. We can discuss group structure during the call.

**Can a freelance consultant apply?** Yes if you have at least 5 active retainer clients. The form requires an agency name; use your trading name or sole proprietorship name.

**What if I have specific compliance requirements (HIPAA, PIPEDA-strict, etc.)?** Mention them in the pitch. We discuss them on the call. The platform meets PIPEDA and Loi 25 by default; HIPAA partnerships require a separate addendum.

## Questions before applying

Email hello@ailysagency.ca with subject "Partner Program preview" and we will respond within five business days, no application required.`,
    i18n: {
      fr: {
        title: "Comment postuler en tant qu'agence partenaire",
        excerpt:
          "Guide etape par etape du formulaire de candidature partenaire, ce qu'AiLys evalue dans votre demande, le delai de reponse, et ce que couvre l'appel de demarrage si vous etes accepte.",
        body: `## Ou postuler

Postulez a /agencies/partner-program (anglais) ou /fr/agencies/partner-program (francais). Le formulaire prend environ cinq minutes.

## Ce que demande le formulaire

Sept champs, tous en langage clair.

1. **Nom de l'agence.** Votre denomination enregistree ou commerciale. Nous l'utilisons dans la correspondance et sur l'entente partenaire.
2. **Votre nom.** Votre nom complet en tant que personne contact principale.
3. **Courriel professionnel.** Votre courriel d'affaires au domaine de votre agence. Nous y envoyons la confirmation.
4. **Ville.** Ou votre agence est basee. Les adresses du Quebec ou du Canada sont ponderees, bien que nous acceptions les candidatures de partout en Amerique du Nord.
5. **Clients actifs (approx).** Un compte approximatif des clients payants que vous servez actuellement. Nombre rond, pas exact. Le formulaire accepte des entiers de 0 a 10000.
6. **References attendues par an.** Une estimation approximative du nombre de vos clients existants ou nouveaux que vous embarqueriez sur la plateforme AiLys dans les 12 premiers mois. Utile pour dimensionner les frais de siege. Nombre rond, accepte 0 a 1000.
7. **Bref pitch (optionnel).** Deux ou trois phrases expliquant pourquoi le partenariat avec AiLys convient a votre agence en ce moment. Non requis, mais les candidatures les plus fortes y repondent en un paragraphe.

## Ce qu'AiLys evalue

Cinq signaux, par ordre de poids.

1. **Portefeuille de clients existant.** Nous cherchons au moins 5 clients payants actifs. Sous 5, nous suggerons typiquement de construire la base de clients d'abord et de repostuler plus tard.
2. **Modele de service recurrent.** Nous confirmons que votre entreprise tourne sur des mandats mensuels ou des abonnements recurrents, pas sur du travail au projet ponctuel. Le modele de plateforme suppose un engagement de mois en mois.
3. **Adequation vertical.** Nous ponderons les candidatures d'agences servant des verticals de commerces locaux (dentaire, juridique, restaurant, entrepreneur, clinique, immobilier, hotellerie) plus haut que les agences B2B SaaS ou e-commerce. La plateforme a ete construite pour le local.
4. **Adequation geographique.** Quebec, Ontario, Maritimes, puis Canada anglais, puis Amerique du Nord plus largement. Nous n'acceptons pas actuellement de candidatures d'agences europeennes ou asiatiques car les contraintes commerce local et bilinguisme different.
5. **Clarte de communication.** Un pitch clair en trois phrases bat un courriel generique. Nous lisons chaque pitch.

## Delai de reponse

Cinq jours ouvrables a partir de la reception de la candidature. Si vous n'avez pas de nouvelles dans les cinq jours ouvrables, verifiez votre dossier de pourriels pour un message de hello@ailysagency.ca, puis ecrivez-nous directement avec votre date de candidature.

Une reponse est l'une de trois issues :

1. **Oui, planifions l'appel.** Un lien de calendrier pour reserver un appel de demarrage de 60 minutes.
2. **Peut-etre, avec conditions.** Parfois nous demandons un contexte supplementaire (etude de cas, confirmation de la taille de la liste de clients, repartition par vertical) avant de reserver.
3. **Non, avec raison.** Nous expliquons toujours pourquoi nous declinons. Raisons courantes : base de clients trop petite, modele d'agence mal adapte, geographie mal adaptee, cohorte fermee.

## L'appel de demarrage

Si accepte, l'appel de 60 minutes avec les fondateurs d'AiLys couvre :

- Demo de la plateforme axee sur les surfaces du portail partenaire (tableau de bord, integration sous-client, PDF de marque)
- Details du modele de tarification : frais de siege, pourcentages de partage de revenus selon la taille du portefeuille
- Options de personnalisation marque blanche : logo, couleurs, domaine personnalise, courriel d'envoi
- Sequence d'integration : comment inviter les trois premiers sous-clients
- Processus de soutien strategiste et niveaux de SLA
- Questions/reponses sur les questions techniques de la plateforme

Nous arrivons prepares. Vous arrivez avec les questions qui bloquent votre decision. A la fin de l'appel, nous savons tous deux si l'ajustement fonctionne.

## Apres l'appel

Deux jours ouvrables apres l'appel, nous envoyons un projet d'entente partenaire. Une fois signee, le demarrage se fait dans les dix jours ouvrables. Votre environnement de marque est provisionne, votre domaine est configure, et vos premiers liens d'invitation sont emis.

## Questions courantes

**Puis-je postuler si je construis encore ma base de clients ?** Oui, mais nous suggererons probablement d'attendre d'atteindre 5 clients actifs avant de rejoindre la cohorte. Postulez quand meme. Nous pouvons garder votre candidature au chaud.

**Puis-je postuler au nom de plusieurs entites d'agence ?** Oui. Soumettez une candidature par entite legale. Nous pouvons discuter de la structure de groupe pendant l'appel.

**Un consultant freelance peut-il postuler ?** Oui s'il a au moins 5 clients en mandat actif. Le formulaire demande un nom d'agence ; utilisez votre nom commercial ou votre nom d'entreprise individuelle.

**Et si j'ai des exigences de conformite specifiques (HIPAA, PIPEDA strict, etc.) ?** Mentionnez-les dans le pitch. Nous en discutons a l'appel. La plateforme respecte PIPEDA et la Loi 25 par defaut ; les partenariats HIPAA necessitent un avenant separe.

## Questions avant de postuler

Ecrivez a hello@ailysagency.ca avec le sujet "Apercu programme partenaire" et nous repondrons dans les cinq jours ouvrables, sans candidature requise.`,
      },
    },
  },

  // ─── NAP Pulse audit (added 2026-05-02 with /audit/nap launch) ───
  {
    slug: "nap-pulse-audit-explained",
    title: "How the free NAP Pulse audit works",
    excerpt:
      "Self-assessment across 25 directories that AI engines and Google use to verify your business identity. 2 minutes, no email, immediate score with top-5 action plan.",
    category: "audit",
    updatedAt: "2026-05-02",
    readingTimeMin: 4,
    body: `## What NAP Pulse audits

NAP stands for Name, Address, Phone. The free NAP Pulse audit at /audit/nap walks you through 25 directories where local businesses commonly have a presence, and asks you to mark whether your listing is consistent, inconsistent, missing, or unsure for each one.

The 25 directories are weighted by their actual impact on AI engine citations and Google local-pack ranking:

- **Heavy weight (8-20):** Google Business Profile, Apple Maps / Apple Business Connect, Facebook, Yelp, PagesJaunes.ca, your website's LocalBusiness JSON-LD schema
- **Medium weight (4-7):** Bing Places, Instagram Business, BBB, Canada411, Foursquare, Wikidata, Chambre de commerce du Montreal metro, your website's footer NAP block, your website's /contact page, Google search snippet
- **Lower weight (2-3):** TripAdvisor, 411.ca, YP.com (US), LinkedIn Company Page, Waze, OpenStreetMap, FCEI / CFIB Canada, Tourisme Quebec, Chambre de commerce regional listings, your industry-specific registry (RAMQ for medical, OACIQ for real estate, BSDQ for trades, etc.)

## What the score means

The audit returns a 0-100 score with four tiers:

- **85-100 (Strong):** Your NAP is rock solid. Trust signals firing on all engines.
- **65-84 (Solid):** Strong foundation with a few gaps. Three fixes will lock it down.
- **40-64 (Gaps):** Real inconsistencies. Each one quietly bleeds local-pack rank.
- **0-39 (Critical):** Your NAP is fragmented. Google, Apple, and the AI engines see different businesses.

The score weights:
- "Consistent" answers earn full weight credit
- "Inconsistent" answers earn zero (worst, actively hurts you)
- "Missing" answers earn 40% credit (no listing is neutral-bad, you can create it)
- "Unsure" answers earn 50% credit (treat as half-credit, prompt to verify)

## What you get at the end

Three things:

1. **Your score** with a copy-paste-ready NAP block (your business name, address, postal, phone formatted exactly the way you should use them everywhere).
2. **Top 5 priorities** to fix this week, with one-click links to each directory's update page (Google Business Profile dashboard, Apple Business Connect, Yelp for Business, etc.).
3. **Cross-sell to GBP Pulse and AI Visibility audits** so you can build a complete picture of your AI search presence.

## What it doesn't do (and why)

The audit is self-assessment, not automated scraping. We chose this approach because:

- Scraper-based audits break when directories redesign (every 6-12 months)
- Many directories block automated requests, returning incomplete data
- The 2 minutes you spend marking checkboxes are also the 2 minutes you spend learning where you stand. Self-completion has 3x better follow-through than receiving a report you didn't earn.

## When to use it

- Before signing up for AiLys: see exactly what we'll be cleaning up
- After signing up: as a baseline you re-run quarterly to track improvement
- Whenever you change phone numbers, addresses, or business names: an immediate gut check

## Privacy

Your answers are saved in your browser's localStorage so you can revisit. Nothing is sent to our servers, no email is required, no account is needed.`,
    i18n: {
      fr: {
        title: "Comment fonctionne l'audit NAP Pulse gratuit",
        excerpt:
          "Auto-evaluation sur 25 repertoires que les moteurs IA et Google utilisent pour verifier l'identite de votre entreprise. 2 minutes, sans courriel, score immediat avec plan d'action top 5.",
        body: `## Ce qu'audite le NAP Pulse

NAP signifie Nom, Adresse, Telephone. L'audit gratuit NAP Pulse a /audit/nap vous guide a travers 25 repertoires ou les entreprises locales ont communement une presence, et vous demande de marquer si votre fiche est coherente, incoherente, absente ou incertaine pour chacun.

Les 25 repertoires sont ponderes par leur impact reel sur les citations des moteurs IA et le classement Google local pack :

- **Poids eleve (8-20) :** Google Business Profile, Apple Maps / Apple Business Connect, Facebook, Yelp, PagesJaunes.ca, le schema LocalBusiness JSON-LD de votre site
- **Poids moyen (4-7) :** Bing Places, Instagram Business, BBB, Canada411, Foursquare, Wikidata, Chambre de commerce du Montreal metropolitain, bloc NAP en pied de votre site, page /contact de votre site, snippet de recherche Google
- **Poids inferieur (2-3) :** TripAdvisor, 411.ca, YP.com (US), page LinkedIn Company, Waze, OpenStreetMap, FCEI / CFIB Canada, Tourisme Quebec, fiches regionales de chambres de commerce, registre specifique a votre industrie (RAMQ pour medical, OACIQ pour immobilier, BSDQ pour metiers, etc.)

## Ce que signifie le score

L'audit retourne un score de 0 a 100 avec quatre paliers :

- **85-100 (Solide) :** Votre NAP est solide comme du roc. Tous les signaux de confiance sont actifs.
- **65-84 (Bon) :** Base solide avec quelques lacunes. Trois corrections le verrouilleront.
- **40-64 (Lacunes) :** Vraies incoherences. Chacune coute silencieusement du classement local.
- **0-39 (Critique) :** Votre NAP est fragmente. Google, Apple et les moteurs IA voient des entreprises differentes.

Le score pondere :
- Les reponses « Coherent » gagnent le credit complet du poids
- Les reponses « Incoherent » gagnent zero (le pire, vous nuit activement)
- Les reponses « Absent » gagnent 40 % du credit (pas de fiche est neutre-mauvais, vous pouvez la creer)
- Les reponses « Pas sur » gagnent 50 % du credit (traitement a mi-credit, invitation a verifier)

## Ce que vous obtenez a la fin

Trois choses :

1. **Votre score** avec un bloc NAP pret-a-coller (le nom de votre entreprise, adresse, code postal, telephone formates exactement comme vous devriez les utiliser partout).
2. **Top 5 priorites** a regler cette semaine, avec liens en un clic vers la page de mise a jour de chaque repertoire (tableau de bord Google Business Profile, Apple Business Connect, Yelp pour entreprises, etc.).
3. **Cross-sell vers les audits GBP Pulse et Visibilite IA** pour batir une image complete de votre presence en recherche IA.

## Ce qu'il ne fait pas (et pourquoi)

L'audit est auto-evaluation, pas scraping automatise. Nous avons choisi cette approche parce que :

- Les audits par scraper se brisent quand les repertoires se refont (tous les 6-12 mois)
- Beaucoup de repertoires bloquent les requetes automatisees, retournant des donnees incompletes
- Les 2 minutes que vous passez a cocher les cases sont aussi les 2 minutes que vous passez a apprendre ou vous en etes. L'auto-completion a un suivi 3x meilleur que de recevoir un rapport non gagne.

## Quand l'utiliser

- Avant de vous inscrire chez AiLys : voyez exactement ce que nous allons nettoyer
- Apres l'inscription : comme reference que vous refaites trimestriellement pour suivre l'amelioration
- Chaque fois que vous changez de telephone, adresse ou nom d'entreprise : verification immediate

## Vie privee

Vos reponses sont sauvegardees dans le localStorage de votre navigateur pour pouvoir y revenir. Rien n'est envoye a nos serveurs, aucun courriel n'est requis, aucun compte n'est necessaire.`,
      },
    },
  },

  // ─── Quebec compliance (added 2026-05-02 with /conformite-quebec launch) ───
  {
    slug: "quebec-compliance-overview",
    title: "How AiLys delivers Loi 25 + Loi 96 + Charte compliance",
    excerpt:
      "Plain-language explanation of how the AiLys platform ships Quebec-compliant marketing for local PMEs by default. Loi 25 privacy, Loi 96 French-first, OQLF awareness, REQ verification, trademark + descriptor handling.",
    category: "getting-started",
    updatedAt: "2026-05-02",
    readingTimeMin: 5,
    body: `## Why this exists

Most marketing platforms (Wix, Squarespace, Yext, BrightLocal) ship a generic global product. They check basic GDPR boxes and call it done. Quebec PMEs deserve more. AiLys is built in Quebec, by a Quebec operator, for Quebec realities: Loi 25, Loi 96, the Charte de la langue francaise, and the daily reality of a bilingual market where French and English co-exist on every street, every menu, every conversation.

## Loi 25 (privacy and data protection)

In effect since September 2023. Quebec's strictest privacy regime, layered on top of federal PIPEDA. Applies to every business that holds personal data on Quebec residents, regardless of where the business is incorporated. Penalties up to \$25M or 4% of global revenue.

What AiLys delivers:

- Loi 25-grade consent banner with granular toggles (analytics, marketing, advertising) deployed on every client site by default
- Audit log of every consent change with tenant_id + actor + timestamp + payload hash (no PII in clear)
- Data residency: client data stored in Canadian Supabase regions. Cross-border AI calls (when used) disclosed in Privacy Policy template
- Privacy policy template auto-generated per client with breach notification flow + responsible-officer placeholder for client to fill

## Loi 96 (French-first across business)

In effect since June 2022, with phased provisions through 2025. Strengthens the Charte de la langue francaise. Requires French to be markedly predominant in commercial signage, marketing, contracts, and customer communications.

What AiLys delivers:

- Bilingual content (FR-CA primary, EN secondary) on every client site by default. FR-CA gets the canonical URL, EN gets /en prefix
- Google Business Profile name, description, attributes, posts, and Q&A maintained in French first
- Reviews collected and replied in the language each customer wrote in (AI-generated replies preserve the original review's language per CLAUDE.md hard rule on language-match)
- Schema.org markup includes inLanguage tags for both FR-CA and EN versions

## Charte de la langue francaise (operating context)

The Charte (originally 1977, repeatedly modernized) is the foundational French-language statute of Quebec. The Office quebecois de la langue francaise (OQLF) enforces it.

What AiLys delivers:

- Onboarding checklist verifies business name registration with the REQ (Registre des entreprises du Quebec) and ensures the GBP name matches
- Trademark + descriptor combinations: when a client uses a non-French trademark (e.g. "Sushi Express"), AiLys auto-generates a compliant French descriptor ("Comptoir de sushis Sushi Express") for marketing materials
- Help-center articles available bilingually for client team training. OQLF terminology preferred over anglicisms in internal documentation

## Why this matters more than the cost difference

A Wix subscription is \$20/month. A BrightLocal license is \$39/month. Cheap, clearly. But they ship US-default settings: English-first content, US privacy norms, no Loi 25 consent flows, no OQLF business-name verification, no FR-CA review-language matching. The first time a Loi 25 inspector calls or an OQLF complaint reaches your inbox, the savings disappear in a single legal-review meeting.

AiLys costs more upfront. AiLys also stays out of the OQLF complaint queue and the CAI (Commission d'acces a l'information) inbox. That's not a feature. That's the actual product.

## Where you see this in your dashboard

- **Privacy & consent panel:** all consent records, breach notification flow, data export tools (Loi 25 portability)
- **Language-match panel:** review-by-review log of original language detected vs reply language used (every entry should show match)
- **OQLF readiness checklist:** quarterly self-audit prompts to confirm GBP, signage, and customer comms remain French-predominant
- **Schema audit panel:** validates inLanguage tags and bilingual hreflang on every page

## Disclaimer

This article is informational and does not constitute legal advice. AiLys Agency is not a law firm. For legal opinions on Loi 25, Loi 96, or the Charte de la langue francaise, consult a Quebec-licensed lawyer.`,
    i18n: {
      fr: {
        title: "Comment AiLys livre la conformite Loi 25 + Loi 96 + Charte",
        excerpt:
          "Explication en clair de la facon dont la plateforme AiLys livre du marketing conforme Quebec pour les PME locales par defaut. Vie privee Loi 25, francais d'abord Loi 96, sensibilisation OQLF, verification REQ, gestion marque + descripteur.",
        body: `## Pourquoi ca existe

La plupart des plateformes marketing (Wix, Squarespace, Yext, BrightLocal) livrent un produit generique mondial. Elles cochent les cases de base du RGPD et passent a autre chose. Les PME quebecoises meritent mieux. AiLys est concu au Quebec, par un operateur quebecois, pour les realites quebecoises : Loi 25, Loi 96, Charte de la langue francaise, et la realite quotidienne d'un marche bilingue ou francais et anglais cohabitent sur chaque rue, chaque menu, chaque conversation.

## Loi 25 (vie privee et protection des donnees)

En vigueur depuis septembre 2023. Le regime de vie privee le plus strict du Quebec, par-dessus la LPRPDE federale. S'applique a toute entreprise qui detient des donnees personnelles sur des residents quebecois, peu importe ou l'entreprise est incorporee. Penalites jusqu'a 25 M$ ou 4 % du chiffre d'affaires mondial.

Ce que livre AiLys :

- Banniere de consentement de niveau Loi 25 avec interrupteurs granulaires (analytique, marketing, publicite) deployee sur chaque site client par defaut
- Journal d'audit de chaque changement de consentement avec tenant_id + acteur + horodatage + hachage de la charge (pas de RPP en clair)
- Residence des donnees : donnees clients stockees dans les regions Supabase canadiennes. Appels IA transfrontaliers (lorsqu'utilises) divulgues dans le modele de Politique de confidentialite
- Modele de politique de confidentialite auto-genere par client avec flux de notification de breche + champ responsable a remplir par le client

## Loi 96 (francais d'abord en affaires)

En vigueur depuis juin 2022, avec dispositions echelonnees jusqu'en 2025. Renforce la Charte de la langue francaise. Exige que le francais soit nettement predominant dans l'affichage commercial, le marketing, les contrats et les communications clients.

Ce que livre AiLys :

- Contenu bilingue (FR-CA principal, EN secondaire) sur chaque site client par defaut. FR-CA obtient l'URL canonique, EN obtient le prefixe /en
- Nom, description, attributs, publications et Q&R Google Business Profile maintenus en francais d'abord
- Avis collectes et reponses dans la langue ecrite par chaque client (reponses generees par IA preservent la langue d'origine de l'avis selon la regle stricte CLAUDE.md sur la correspondance linguistique)
- Marquage Schema.org inclut les balises inLanguage pour les versions FR-CA et EN

## Charte de la langue francaise (contexte d'operation)

La Charte (originale de 1977, modernisee a plusieurs reprises) est la loi linguistique francaise fondamentale du Quebec. L'Office quebecois de la langue francaise (OQLF) l'applique.

Ce que livre AiLys :

- Liste d'onboarding verifie l'enregistrement du nom d'entreprise au REQ (Registre des entreprises du Quebec) et s'assure que le nom GBP correspond
- Combinaisons marque + descripteur : quand un client utilise une marque non francaise (p. ex. « Sushi Express »), AiLys auto-genere un descripteur francais conforme (« Comptoir de sushis Sushi Express ») pour les materiels marketing
- Articles du centre d'aide disponibles bilingues pour la formation des equipes clients. Terminologie OQLF preferee aux anglicismes dans la documentation interne

## Pourquoi ca compte plus que la difference de cout

Un abonnement Wix coute 20 \$/mois. Une licence BrightLocal coute 39 \$/mois. Pas cher, clairement. Mais ils livrent des reglages US par defaut : contenu anglais d'abord, normes de vie privee US, pas de flux de consentement Loi 25, pas de verification du nom REQ par l'OQLF, pas de correspondance linguistique FR-CA pour les avis. La premiere fois qu'un inspecteur Loi 25 appelle ou qu'une plainte OQLF arrive dans votre boite courriel, les economies disparaissent en une seule reunion de revision juridique.

AiLys coute plus cher au depart. AiLys evite aussi la file de plaintes OQLF et la boite de la CAI (Commission d'acces a l'information). Ce n'est pas une fonctionnalite. C'est le vrai produit.

## Ou vous voyez ca dans votre tableau de bord

- **Panneau vie privee et consentement :** tous les enregistrements de consentement, flux de notification de breche, outils d'exportation de donnees (portabilite Loi 25)
- **Panneau correspondance linguistique :** journal avis-par-avis de la langue d'origine detectee vs langue de reponse utilisee (chaque entree devrait montrer une correspondance)
- **Liste de preparation OQLF :** invites d'auto-audit trimestrielles pour confirmer que GBP, signalisation et communications client restent francais-predominants
- **Panneau audit schema :** valide les balises inLanguage et hreflang bilingue sur chaque page

## Avis de non-responsabilite

Cet article est informationnel et ne constitue pas un avis juridique. AiLys Agency n'est pas un cabinet d'avocats. Pour des avis juridiques sur la Loi 25, la Loi 96 ou la Charte de la langue francaise, consultez un avocat membre du Barreau du Quebec.`,
      },
    },
  },
];
