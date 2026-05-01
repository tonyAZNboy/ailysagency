import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';

interface TierLine {
  name: string;
  price: string;
  bullet: string;
}

const TIERS_EN: TierLine[] = [
  {
    name: 'Starter',
    price: '$300 CAD per month',
    bullet:
      'GBP foundations, 4 GBP posts per month, 2 citations per month, monthly AI Visibility report. For solo operators ready to defend their local map placement.',
  },
  {
    name: 'Core',
    price: '$600 CAD per month',
    bullet:
      'Everything in Starter, plus 4 high-DA citations per month, 6 GBP posts per month, weekly AI Visibility probes, NAP audit and remediation, schema deployment (FAQ, LocalBusiness, Service).',
  },
  {
    name: 'Growth',
    price: '$1,200 CAD per month',
    bullet:
      'Everything in Core, plus 6 citations per month, 8 GBP posts per month, Wikidata entity work, daily AI Visibility probes, monthly bilingual content piece, executive monthly briefing.',
  },
  {
    name: 'Agency',
    price: '$2,500 CAD per month',
    bullet:
      'Everything in Growth, plus 8 citations per month, 12 GBP posts per month, multi-location dashboard, white-label PDF reports, Slack SLA under 4h, dedicated senior strategist, quarterly in-person review. Reviuzy reputation add-on bundled.',
  },
];

const TIERS_FR: TierLine[] = [
  {
    name: 'Starter',
    price: '300 $ CAD par mois',
    bullet:
      'Bases GBP, 4 publications GBP par mois, 2 citations par mois, rapport AI Visibility mensuel. Pour les entrepreneurs solos qui veulent protéger leur place dans le carrousel local.',
  },
  {
    name: 'Core',
    price: '600 $ CAD par mois',
    bullet:
      'Tout ce qui est dans Starter, plus 4 citations à haut DA par mois, 6 publications GBP par mois, sondes AI Visibility hebdomadaires, audit et correction NAP, déploiement du schéma (FAQ, LocalBusiness, Service).',
  },
  {
    name: 'Growth',
    price: '1 200 $ CAD par mois',
    bullet:
      'Tout ce qui est dans Core, plus 6 citations par mois, 8 publications GBP par mois, travail d\'entité Wikidata, sondes AI Visibility quotidiennes, un contenu bilingue par mois, breffage exécutif mensuel.',
  },
  {
    name: 'Agency',
    price: '2 500 $ CAD par mois',
    bullet:
      'Tout ce qui est dans Growth, plus 8 citations par mois, 12 publications GBP par mois, tableau de bord multi-emplacements, rapports PDF marque blanche, SLA Slack en moins de 4h, stratège senior attitré, revue trimestrielle en personne. Module réputation Reviuzy inclus.',
  },
];

interface I18N {
  heading: string;
  intro: string;
  ctaTitle: string;
  ctaSub: string;
  tierLadder: string;
  fineprint: string;
  addonNote: string;
  pageLabel: string;
}

const I18N_EN: I18N = {
  heading: 'Next steps',
  intro:
    'Your audit is the first 30 minutes of the first month. The next 60 minutes is a strategy call to map the action plan to your team capacity. Bring this PDF; we will work through it page by page and decide what you ship in week one.',
  ctaTitle: 'Book the 60-minute strategy call',
  ctaSub: 'ailysagency.ca/book-call, no pitch, you keep the strategy doc.',
  tierLadder: 'If you decide to move',
  fineprint:
    'Every tier is month to month with a 30-day satisfaction guarantee. Cancel anytime. Founding-client pricing is locked for the duration of the contract.',
  addonNote:
    'Reviuzy reputation add-on (NFC tap-to-review + AI replies + contest engine) is +$100 CAD per month on Starter, Core and Growth, and is bundled at no charge in Agency.',
  pageLabel: 'Next steps',
};

const I18N_FR: I18N = {
  heading: 'Prochaines étapes',
  intro:
    'Ton audit, c\'est les 30 premières minutes du premier mois. Les 60 prochaines, c\'est un appel stratégique pour mapper le plan d\'action à la capacité de ton équipe. Apporte ce PDF; on va le parcourir page par page et décider ce que tu livres en semaine un.',
  ctaTitle: 'Réserve l\'appel stratégique de 60 minutes',
  ctaSub: 'ailysagency.ca/book-call, aucun pitch, le document de stratégie te reste.',
  tierLadder: 'Si tu décides d\'avancer',
  fineprint:
    'Chaque forfait est au mois, avec une garantie de satisfaction de 30 jours. Annulable en tout temps. Le tarif client fondateur est verrouillé pour la durée du contrat.',
  addonNote:
    'Le module réputation Reviuzy (NFC tap-to-review + réponses IA + moteur de concours) est offert à +100 $ CAD par mois sur Starter, Core et Growth, et est inclus sans frais dans Agency.',
  pageLabel: 'Prochaines étapes',
};

export function drawNextStepsPage(b: Builder, req: AuditPdfRequest) {
  const isFr = req.lang === 'fr';
  const i18n = isFr ? I18N_FR : I18N_EN;
  const tiers = isFr ? TIERS_FR : TIERS_EN;

  b.cursorY = 80;
  b.drawHeading(i18n.heading, 'h1');

  b.drawWrapped({
    text: i18n.intro,
    size: FONT_SIZE.body,
    color: COLOR.ink,
  });
  b.advance(SPACE.md);

  // Strong CTA card
  b.drawCard({
    x: 56,
    width: 500,
    height: 70,
    color: COLOR.brand,
  });
  b.drawLine({
    text: i18n.ctaTitle,
    size: FONT_SIZE.h2,
    font: b.fonts.bold,
    color: COLOR.bg,
    x: 76,
    advanceBy: FONT_SIZE.h2,
  });
  b.advance(SPACE.xs);
  b.drawLine({
    text: i18n.ctaSub,
    size: FONT_SIZE.body,
    font: b.fonts.regular,
    color: COLOR.bg,
    x: 76,
    advanceBy: FONT_SIZE.body,
  });
  b.advance(SPACE.lg + 20);

  // Tier ladder
  b.drawHeading(i18n.tierLadder, 'h2');
  for (const tier of tiers) {
    b.ensureSpace(60, i18n.pageLabel, 9, 10);
    b.drawLine({
      text: `${tier.name}, ${tier.price}`,
      size: FONT_SIZE.h3,
      font: b.fonts.bold,
      color: COLOR.brand,
    });
    b.drawWrapped({
      text: tier.bullet,
      size: FONT_SIZE.body,
      color: COLOR.inkSoft,
    });
    b.advance(SPACE.sm);
  }

  b.advance(SPACE.sm);
  b.drawWrapped({
    text: i18n.addonNote,
    size: FONT_SIZE.caption,
    color: COLOR.inkSoft,
  });
  b.advance(SPACE.sm);
  b.drawWrapped({
    text: i18n.fineprint,
    size: FONT_SIZE.caption,
    color: COLOR.inkMuted,
  });
}
