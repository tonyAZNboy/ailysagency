#!/usr/bin/env node
/**
 * One-shot script to insert the `partnerProgram` i18n block into all
 * 16 locale files (EN canonical + FR full + 14 EN-placeholder).
 *
 * F3.0 i18n step (Section 8 enforcement). Re-runnable: skips files
 * that already have the block.
 *
 * Insertion point: right before the final `};` closing the locale
 * object. Inserted after the `cofounders: {...}` block (last existing
 * block in canonical EN order).
 */
import { readFileSync, writeFileSync } from "node:fs";

const dir = "src/i18n/translations";

const EN = {
  eyebrow: "Partner Program",
  headline: "White-label AiLys for your agency clients",
  subheadline:
    "We open a private partner cohort for Quebec/Canadian agencies that want to deliver AI Visibility under their own brand. Apply once, talk with us, then onboard your clients.",
  applyCta: "Apply to the program",
  whoTitle: "Who this is for",
  who1:
    "Marketing or web agencies with at least 5 active local-business clients in Quebec, Ontario, or the Maritimes.",
  who2:
    "Agencies whose clients ask about ChatGPT, Perplexity, or Google AIO citations and want a structured answer.",
  who3:
    "Agencies that want a recurring service line with measurable scoring instead of one-off audits.",
  whatTitle: "What partners receive",
  what1: "White-label dashboard. Your logo, your colors, your domain, your email-from.",
  what2: "Per-client AI Visibility scoring + monthly Industry Reports.",
  what3: "Branded PDF deliverables ready to forward.",
  what4: "Revenue share on every active sub-client subscription.",
  what5: "Priority strategist support and quarterly partner office hours.",
  formTitle: "Apply now",
  formIntro:
    "We respond in five business days. Your details stay internal and are only used to evaluate the application.",
  formAgencyName: "Agency name",
  formAgencyNamePh: "Acme Marketing Inc.",
  formContactName: "Your name",
  formContactNamePh: "Full name",
  formContactEmail: "Work email",
  formContactEmailPh: "you@youragency.ca",
  formCity: "City",
  formCityPh: "Montreal, QC",
  formCurrentClients: "Active clients (approx)",
  formCurrentClientsPh: "8",
  formExpectedReferrals: "Expected referrals per year",
  formExpectedReferralsPh: "12",
  formPitch: "Brief pitch (optional)",
  formPitchPh: "Tell us in 2-3 sentences why you want to partner.",
  formSubmit: "Send application",
  formSubmitting: "Sending...",
  formSuccessTitle: "Application received",
  formSuccessBody:
    "We just emailed a confirmation. Expect a reply within five business days. You can email hello@ailysagency.ca to add anything we should know.",
  formErrorRateLimit: "Too many submissions. Please try again in a few minutes.",
  formErrorDisabled:
    "Applications are paused right now. Please email hello@ailysagency.ca and we will reach out when the cohort reopens.",
  formErrorNetwork: "Network error. Please try again or email hello@ailysagency.ca.",
  formErrorGeneric: "Something went wrong. Please try again or email hello@ailysagency.ca.",
  formErrorValidation: "Some fields need attention. Please review and resend.",
  faqTitle: "Frequently asked",
  faq1q: "Do I need a Stripe account before applying?",
  faq1a:
    "No. We discuss billing during the call. Most partners start month-to-month and add their own Stripe later.",
  faq2q: "Can I keep my own pricing?",
  faq2a:
    "Yes. You set the price your sub-clients pay. We invoice you for the partner seat fee plus the agreed revenue share.",
  faq3q: "Can my clients see AiLys branding anywhere?",
  faq3a:
    "Only on the legal footer of email receipts (a transparency requirement). Everywhere else, your brand replaces ours.",
  faq4q: "How long until I can onboard my first sub-client?",
  faq4a:
    "Usually within ten business days of your application. We schedule a 60-minute kickoff call, set up your brand, and walk you through onboarding.",
  faq5q: "What happens if I do not refer enough clients?",
  faq5a:
    "There is no minimum quota in the first 90 days. After that, the seat fee remains payable to keep your branded environment active.",
  legalNote:
    "We respond within five business days. Your information stays internal and is only used to evaluate the application. You will receive a confirmation email at the address you submit.",
  metaTitle: "Partner Program · White-label AiLys for your agency · AiLys",
  metaDescription:
    "AiLys Partner Program for Quebec and Canadian agencies. White-label AI Visibility services under your brand, with revenue share and priority strategist support.",
};

const FR = {
  eyebrow: "Programme partenaire",
  headline: "Marque blanche AiLys pour les clients de votre agence",
  subheadline:
    "Nous ouvrons une cohorte partenaire privée pour les agences du Québec et du Canada qui veulent livrer la visibilité IA sous leur propre marque. Postulez une fois, discutons, puis intégrez vos clients.",
  applyCta: "Postuler au programme",
  whoTitle: "À qui s'adresse le programme",
  who1:
    "Agences marketing ou web ayant au moins 5 clients actifs en commerces locaux au Québec, en Ontario ou dans les Maritimes.",
  who2:
    "Agences dont les clients posent des questions sur les citations ChatGPT, Perplexity ou Google AIO et qui veulent une réponse structurée.",
  who3:
    "Agences qui veulent une ligne de service récurrente avec un score mesurable, pas un audit ponctuel.",
  whatTitle: "Ce que reçoivent les partenaires",
  what1: "Tableau de bord en marque blanche. Votre logo, vos couleurs, votre domaine, votre courriel d'envoi.",
  what2: "Score de visibilité IA par client + rapports sectoriels mensuels.",
  what3: "Livrables PDF aux couleurs de votre marque, prêts à transférer.",
  what4: "Partage de revenus sur chaque abonnement sous-client actif.",
  what5: "Soutien prioritaire d'un stratège et heures de bureau partenaires trimestrielles.",
  formTitle: "Postuler",
  formIntro:
    "Nous répondons en cinq jours ouvrables. Vos coordonnées restent internes et servent uniquement à évaluer la demande.",
  formAgencyName: "Nom de l'agence",
  formAgencyNamePh: "Acme Marketing Inc.",
  formContactName: "Votre nom",
  formContactNamePh: "Nom complet",
  formContactEmail: "Courriel professionnel",
  formContactEmailPh: "vous@votreagence.ca",
  formCity: "Ville",
  formCityPh: "Montréal, QC",
  formCurrentClients: "Clients actifs (approx)",
  formCurrentClientsPh: "8",
  formExpectedReferrals: "Références attendues par an",
  formExpectedReferralsPh: "12",
  formPitch: "Bref pitch (optionnel)",
  formPitchPh: "En 2 ou 3 phrases, dites-nous pourquoi vous voulez devenir partenaire.",
  formSubmit: "Envoyer la demande",
  formSubmitting: "Envoi en cours...",
  formSuccessTitle: "Demande reçue",
  formSuccessBody:
    "Nous venons d'envoyer une confirmation par courriel. Attendez-vous à une réponse dans les cinq jours ouvrables. Écrivez à hello@ailysagency.ca pour tout ajout.",
  formErrorRateLimit: "Trop de soumissions. Réessayez dans quelques minutes.",
  formErrorDisabled:
    "Les candidatures sont en pause. Écrivez à hello@ailysagency.ca et nous vous contacterons à la réouverture de la cohorte.",
  formErrorNetwork: "Erreur réseau. Réessayez ou écrivez à hello@ailysagency.ca.",
  formErrorGeneric: "Une erreur est survenue. Réessayez ou écrivez à hello@ailysagency.ca.",
  formErrorValidation: "Certains champs demandent votre attention. Vérifiez et renvoyez.",
  faqTitle: "Questions fréquentes",
  faq1q: "Dois-je avoir un compte Stripe avant de postuler?",
  faq1a:
    "Non. Nous discutons de la facturation lors de l'appel. La plupart des partenaires démarrent au mois et ajoutent leur propre Stripe plus tard.",
  faq2q: "Puis-je garder mes propres prix?",
  faq2a:
    "Oui. Vous fixez le prix que paient vos sous-clients. Nous vous facturons les frais de siège partenaire et le partage de revenus convenu.",
  faq3q: "Mes clients verront-ils la marque AiLys quelque part?",
  faq3a:
    "Seulement dans le pied de page légal des reçus courriel (une exigence de transparence). Partout ailleurs, votre marque remplace la nôtre.",
  faq4q: "Combien de temps avant de pouvoir intégrer mon premier sous-client?",
  faq4a:
    "Habituellement dans les dix jours ouvrables suivant la demande. Nous planifions un appel de démarrage de 60 minutes, configurons votre marque et vous guidons dans l'intégration.",
  faq5q: "Que se passe-t-il si je ne réfère pas assez de clients?",
  faq5a:
    "Aucun quota minimum dans les 90 premiers jours. Après cela, les frais de siège restent payables pour garder votre environnement actif.",
  legalNote:
    "Nous répondons dans les cinq jours ouvrables. Vos informations restent internes et servent uniquement à évaluer la demande. Vous recevrez un courriel de confirmation à l'adresse soumise.",
  metaTitle: "Programme partenaire · Marque blanche AiLys pour agences · AiLys",
  metaDescription:
    "Programme partenaire AiLys pour agences du Québec et du Canada. Services de visibilité IA en marque blanche avec partage de revenus et soutien prioritaire d'un stratège.",
};

function fmtBlock(obj, indent = 2) {
  const pad = " ".repeat(indent);
  const inner = " ".repeat(indent + 2);
  const lines = ["partnerProgram: {"];
  for (const [k, v] of Object.entries(obj)) {
    const esc = String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    lines.push(`${inner}${k}: "${esc}",`);
  }
  lines.push(`${pad}},`);
  return lines.map((l) => (l.startsWith("partnerProgram") ? `${pad}${l}` : l)).join("\n");
}

const SECONDARY = ["es", "zh", "ar", "ru", "de", "hi", "it", "ja", "ko", "nl", "pl", "pt", "tr", "vi"];

function applyToFile(loc, vals) {
  const path = `${dir}/${loc}.ts`;
  let src = readFileSync(path, "utf8");
  if (/\bpartnerProgram:\s*\{/.test(src)) {
    console.log(`${loc}: already present, skipping`);
    return;
  }
  // Insert before final `};` closing the object literal
  // Pattern: locate the last `};` at column 0
  const finalCloseRe = /\n};\s*\n([^\n]*\n)*$/;
  const m = src.match(finalCloseRe);
  if (!m) {
    console.error(`${loc}: could not find final }; — skipping`);
    return;
  }
  // Insert after the closing of the LAST nested block (cofounders) and before `};`
  // Strategy: find the final `};` and insert the new block immediately before it.
  const idx = src.lastIndexOf("\n};");
  if (idx < 0) {
    console.error(`${loc}: lastIndexOf '\\n};' failed, skipping`);
    return;
  }
  const block = "\n" + fmtBlock(vals, 2) + "\n";
  src = src.slice(0, idx) + block + src.slice(idx);
  writeFileSync(path, src, "utf8");
  console.log(`${loc}: inserted ${Object.keys(vals).length} keys`);
}

applyToFile("en", EN);
applyToFile("fr", FR);
for (const loc of SECONDARY) applyToFile(loc, EN);
