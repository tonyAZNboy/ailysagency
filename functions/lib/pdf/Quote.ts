// Personalized quote PDF orchestrator.
//
// Phase E.1.9: prospect on /forfaits-complets builds their plan selection
// (tier + engagement + reviuzy_addon + website_size), clicks 'Download my
// personalized quote', this lib renders a 4-page PDF with their breakdown.
//
// Pages:
//   1. Cover (prospect name + tier + total monthly tax-incl)
//   2. Breakdown (tier base + engagement discount + addons + tax + total)
//   3. Construction site amortization (if website_size selected)
//   4. Signature line + 30-day validity + footer

import { PDFDocument } from 'pdf-lib';
import { Builder, embedStandardFonts } from './builder';
import { COLOR, FONT_SIZE, PAGE, SPACE } from './tokens';

export type QuoteLang = 'en' | 'fr';
export type QuoteTier = 'starter' | 'core' | 'growth' | 'agency';
export type QuoteEngagement = 'monthly' | 'annual' | 'biennial';
export type QuoteWebsiteSize = 'none' | 'vitrine' | 'pme' | 'commerce';

export interface QuoteRenderInput {
  prospectName: string;
  businessName: string;
  email: string;
  lang: QuoteLang;
  tier: QuoteTier;
  engagement: QuoteEngagement;
  reviuzyAddon: boolean;
  websiteSize: QuoteWebsiteSize;
  taxIncluded: boolean;
}

const TIER_PRICE_CAD: Record<QuoteTier, number> = {
  starter: 300,
  core: 600,
  growth: 1200,
  agency: 2500,
};

const TIER_NAME: Record<QuoteTier, string> = {
  starter: 'Starter',
  core: 'Core',
  growth: 'Growth',
  agency: 'Agency',
};

const ENGAGEMENT_DISCOUNT: Record<QuoteEngagement, number> = {
  monthly: 0,
  annual: 0.15,
  biennial: 0.20,
};

const WEBSITE_BUILD_COST_CAD: Record<QuoteWebsiteSize, number> = {
  none: 0,
  vitrine: 800,
  pme: 1500,
  commerce: 3000,
};

const REVIUZY_ADDON_CAD = 100; // bundled in Agency
const QUEBEC_TAX_RATE = 0.14975;

const COPY: Record<QuoteLang, {
  pageTitle: string;
  preparedFor: string;
  validUntil: (date: string) => string;
  cover: { eyebrow: string; tier: string; monthlyTotal: string };
  breakdown: { heading: string; tierBase: string; engagementDiscount: (pct: number) => string; reviuzyAddon: string; subtotal: string; tax: string; total: string; perMonth: string; bundledFree: string };
  website: { heading: string; buildCost: string; amortMonths: string; amortMonthly: string; cancellationNote: string };
  footer: { signatureLabel: string; signatureLine: string; validityNote: string; questionsNote: string; copy: string };
  na: string;
  pageLabel: (n: number, total: number) => string;
}> = {
  en: {
    pageTitle: 'Personalized AiLys quote',
    preparedFor: 'Prepared for',
    validUntil: (d) => `Quote valid until ${d}`,
    cover: { eyebrow: 'PERSONALIZED QUOTE', tier: 'Your selected plan', monthlyTotal: 'Total monthly' },
    breakdown: { heading: '1. Pricing breakdown', tierBase: 'Plan base price', engagementDiscount: (p) => `Engagement discount (-${p}%)`, reviuzyAddon: 'AiLys Automation reputation add-on', subtotal: 'Subtotal', tax: 'TPS + TVQ (14.975%)', total: 'TOTAL', perMonth: '/month', bundledFree: 'Bundled (no charge)' },
    website: { heading: '2. Website construction (amortized 6 months)', buildCost: 'One-time build cost', amortMonths: 'Amortization period', amortMonthly: 'Monthly amortization', cancellationNote: 'If you cancel within 6 months, a recovery fee equal to build_cost x (6 - months_paid) / 6 applies. Zero fee from month 7+.' },
    footer: { signatureLabel: 'Signature', signatureLine: '____________________________', validityNote: 'This quote is valid for 30 days from the issue date. Pricing locked at signature; we do not raise rates mid-engagement.', questionsNote: 'Questions? Reply to your quote email or book a 15-min call at ailysagency.ca/book-call.', copy: 'AiLys Agency. ailysagency.ca. Confidential, prepared for the named recipient.' },
    na: 'N/A',
    pageLabel: (n, t) => `Quote, page ${n} of ${t}`,
  },
  fr: {
    pageTitle: 'Devis AiLys personnalise',
    preparedFor: 'Prepare pour',
    validUntil: (d) => `Devis valide jusqu'au ${d}`,
    cover: { eyebrow: 'DEVIS PERSONNALISE', tier: 'Votre forfait selectionne', monthlyTotal: 'Total mensuel' },
    breakdown: { heading: '1. Decomposition des prix', tierBase: 'Prix de base du forfait', engagementDiscount: (p) => `Remise d'engagement (-${p}%)`, reviuzyAddon: 'Module reputation AiLys Automation', subtotal: 'Sous-total', tax: 'TPS + TVQ (14,975 %)', total: 'TOTAL', perMonth: '/mois', bundledFree: 'Inclus (sans frais)' },
    website: { heading: '2. Construction de site web (amortie 6 mois)', buildCost: 'Cout de construction unique', amortMonths: 'Periode d\'amortissement', amortMonthly: 'Amortissement mensuel', cancellationNote: 'Si vous resiliez dans les 6 mois, des frais de recuperation = cout_construction x (6 - mois_payes) / 6 s\'appliquent. Aucun frais a partir du mois 7.' },
    footer: { signatureLabel: 'Signature', signatureLine: '____________________________', validityNote: 'Ce devis est valide 30 jours a partir de la date d\'emission. Prix verrouille a la signature ; nous n\'augmentons pas les tarifs en cours d\'engagement.', questionsNote: 'Questions ? Repondez a votre courriel de devis ou reservez un appel de 15 min sur ailysagency.ca/book-call.', copy: 'AiLys Agency. ailysagency.ca. Confidentiel, prepare pour le destinataire nomme.' },
    na: 'S.O.',
    pageLabel: (n, t) => `Devis, page ${n} sur ${t}`,
  },
};

export interface QuoteCalc {
  tierBase: number;
  engagementDiscount: number;
  reviuzyAddonCost: number; // 0 if bundled or absent
  subtotal: number;
  tax: number;
  total: number;
  websiteBuildCost: number;
  websiteMonthlyAmort: number;
}

export function computeQuote(input: QuoteRenderInput): QuoteCalc {
  const tierBase = TIER_PRICE_CAD[input.tier];
  // Biennial is now eligible across all 4 tiers (was previously growth+agency
  // only). See src/data/tier-comparison.ts ENGAGEMENT_OPTIONS for the
  // canonical eligibility list.
  const discountPct = ENGAGEMENT_DISCOUNT[input.engagement];
  const engagementDiscount = Math.round(tierBase * discountPct);
  const reviuzyAddonCost = input.reviuzyAddon && input.tier !== 'agency' ? REVIUZY_ADDON_CAD : 0;
  const subtotal = tierBase - engagementDiscount + reviuzyAddonCost;
  const tax = input.taxIncluded ? Math.round(subtotal * QUEBEC_TAX_RATE * 100) / 100 : 0;
  const total = Math.round((subtotal + tax) * 100) / 100;
  const websiteBuildCost = WEBSITE_BUILD_COST_CAD[input.websiteSize];
  const websiteMonthlyAmort = websiteBuildCost > 0 ? Math.round(websiteBuildCost / 6) : 0;
  return { tierBase, engagementDiscount, reviuzyAddonCost, subtotal, tax, total, websiteBuildCost, websiteMonthlyAmort };
}

export async function renderQuotePdf(input: QuoteRenderInput): Promise<Uint8Array> {
  const copy = COPY[input.lang];
  const calc = computeQuote(input);
  const totalPagesHint = input.websiteSize !== 'none' ? 4 : 3;
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const doc = await PDFDocument.create();
  doc.setTitle(`${copy.pageTitle}, ${input.businessName}`);
  doc.setAuthor('AiLys Agency');
  doc.setSubject('Personalized AiLys plan quote');
  doc.setProducer('AiLys Agency PDF Pipeline');
  doc.setCreator('ailysagency.ca');
  doc.setCreationDate(new Date());
  doc.setModificationDate(new Date());

  const fonts = await embedStandardFonts(doc);
  const page1 = doc.addPage();
  const builder = new Builder(doc, page1, fonts);

  // ── Page 1: Cover ─────────────────────────────────────────────────────
  builder.page.drawRectangle({ x: 0, y: PAGE.height - 8, width: PAGE.width, height: 8, color: COLOR.accent });
  builder.cursorY = 130;
  builder.drawLine({ text: 'AiLys Agency', size: FONT_SIZE.h2, font: fonts.semibold, color: COLOR.brand, align: 'center', advanceBy: FONT_SIZE.h2 });
  builder.advance(SPACE.xs);
  builder.drawLine({ text: copy.cover.eyebrow, size: FONT_SIZE.caption, color: COLOR.inkMuted, align: 'center', advanceBy: FONT_SIZE.caption });
  builder.advance(SPACE.xl);
  builder.drawLine({ text: `${copy.preparedFor}: ${input.prospectName}`, size: FONT_SIZE.body, color: COLOR.inkSoft, align: 'center', advanceBy: FONT_SIZE.body });
  builder.drawLine({ text: input.businessName, size: FONT_SIZE.h1, font: fonts.bold, color: COLOR.ink, align: 'center', advanceBy: FONT_SIZE.h1 });
  builder.advance(SPACE.lg);
  builder.drawLine({ text: `${copy.cover.tier}: ${TIER_NAME[input.tier]}`, size: FONT_SIZE.h3, font: fonts.semibold, color: COLOR.brand, align: 'center', advanceBy: FONT_SIZE.h3 });
  builder.advance(SPACE.md);
  builder.drawLine({
    text: `${copy.cover.monthlyTotal}: $${calc.total.toLocaleString(input.lang === 'fr' ? 'fr-CA' : 'en-CA')}${copy.breakdown.perMonth}`,
    size: FONT_SIZE.h2, font: fonts.bold, color: COLOR.ink, align: 'center', advanceBy: FONT_SIZE.h2,
  });
  builder.advance(SPACE.xl);
  builder.drawLine({ text: copy.validUntil(validUntil), size: FONT_SIZE.caption, color: COLOR.inkMuted, align: 'center', advanceBy: FONT_SIZE.caption });

  // ── Page 2: Breakdown ─────────────────────────────────────────────────
  builder.newPage();
  builder.drawHeader(copy.pageLabel(2, totalPagesHint));
  builder.drawHeading(copy.breakdown.heading, 'h1');
  const fmt = (n: number) => `$${n.toLocaleString(input.lang === 'fr' ? 'fr-CA' : 'en-CA')}`;
  builder.drawLine({ text: `${copy.breakdown.tierBase} (${TIER_NAME[input.tier]}): ${fmt(calc.tierBase)}${copy.breakdown.perMonth}`, size: FONT_SIZE.body, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
  if (calc.engagementDiscount > 0) {
    const pct = Math.round((calc.engagementDiscount / calc.tierBase) * 100);
    builder.drawLine({ text: `${copy.breakdown.engagementDiscount(pct)}: -${fmt(calc.engagementDiscount)}${copy.breakdown.perMonth}`, size: FONT_SIZE.body, color: COLOR.inkSoft, advanceBy: FONT_SIZE.body + 4 });
  }
  if (input.reviuzyAddon) {
    if (input.tier === 'agency') {
      builder.drawLine({ text: `${copy.breakdown.reviuzyAddon}: ${copy.breakdown.bundledFree}`, size: FONT_SIZE.body, color: COLOR.inkSoft, advanceBy: FONT_SIZE.body + 4 });
    } else {
      builder.drawLine({ text: `${copy.breakdown.reviuzyAddon}: +${fmt(calc.reviuzyAddonCost)}${copy.breakdown.perMonth}`, size: FONT_SIZE.body, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
    }
  }
  builder.advance(SPACE.sm);
  builder.drawDivider();
  builder.advance(SPACE.sm);
  builder.drawLine({ text: `${copy.breakdown.subtotal}: ${fmt(calc.subtotal)}${copy.breakdown.perMonth}`, size: FONT_SIZE.body, font: fonts.semibold, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
  if (input.taxIncluded) {
    builder.drawLine({ text: `${copy.breakdown.tax}: ${fmt(calc.tax)}${copy.breakdown.perMonth}`, size: FONT_SIZE.body, color: COLOR.inkSoft, advanceBy: FONT_SIZE.body + 4 });
  }
  builder.advance(SPACE.sm);
  builder.drawLine({ text: `${copy.breakdown.total}: ${fmt(calc.total)}${copy.breakdown.perMonth}`, size: FONT_SIZE.h3, font: fonts.bold, color: COLOR.brand, advanceBy: FONT_SIZE.h3 });
  builder.drawFooter(2, totalPagesHint);

  // ── Page 3: Website (only if size selected) ───────────────────────────
  if (input.websiteSize !== 'none') {
    builder.newPage();
    builder.drawHeader(copy.pageLabel(3, totalPagesHint));
    builder.drawHeading(copy.website.heading, 'h1');
    builder.drawLine({ text: `${copy.website.buildCost}: ${fmt(calc.websiteBuildCost)}`, size: FONT_SIZE.body, font: fonts.semibold, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
    builder.drawLine({ text: `${copy.website.amortMonths}: 6`, size: FONT_SIZE.body, color: COLOR.inkSoft, advanceBy: FONT_SIZE.body + 4 });
    builder.drawLine({ text: `${copy.website.amortMonthly}: ${fmt(calc.websiteMonthlyAmort)}${copy.breakdown.perMonth} (months 1-6)`, size: FONT_SIZE.body, color: COLOR.ink, advanceBy: FONT_SIZE.body + 4 });
    builder.advance(SPACE.lg);
    builder.drawWrapped({ text: copy.website.cancellationNote, size: FONT_SIZE.caption, color: COLOR.inkMuted });
    builder.drawFooter(3, totalPagesHint);
  }

  // ── Final page: Signature + footer ────────────────────────────────────
  builder.newPage();
  const lastPage = totalPagesHint;
  builder.drawHeader(copy.pageLabel(lastPage, totalPagesHint));
  builder.advance(SPACE.lg);
  builder.drawLine({ text: copy.footer.signatureLabel, size: FONT_SIZE.caption, color: COLOR.inkMuted, advanceBy: FONT_SIZE.caption });
  builder.advance(SPACE.lg);
  builder.drawLine({ text: copy.footer.signatureLine, size: FONT_SIZE.body, color: COLOR.ink, advanceBy: FONT_SIZE.body + 8 });
  builder.advance(SPACE.lg);
  builder.drawWrapped({ text: copy.footer.validityNote, size: FONT_SIZE.caption, color: COLOR.inkMuted });
  builder.advance(SPACE.sm);
  builder.drawWrapped({ text: copy.footer.questionsNote, size: FONT_SIZE.caption, color: COLOR.inkMuted });
  builder.advance(SPACE.lg);
  builder.drawLine({ text: copy.footer.copy, size: FONT_SIZE.caption, color: COLOR.inkMuted, advanceBy: FONT_SIZE.caption });
  builder.drawFooter(lastPage, totalPagesHint);

  return doc.save();
}
