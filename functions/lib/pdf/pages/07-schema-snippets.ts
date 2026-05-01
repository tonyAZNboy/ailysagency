import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';

interface I18N {
  heading: string;
  intro: string;
  whatHeading: string;
  whatBody: string;
  whyHeading: string;
  whyBody: string;
  nextHeading: string;
  nextBody: string;
}

const I18N_EN: I18N = {
  heading: 'Schema markup, deployed for you',
  intro:
    'Schema markup is the structured-data layer that lets AI engines pull a clean answer about your business. It is the highest-leverage AEO investment most local businesses miss.',
  whatHeading: 'What we deploy at the Core tier',
  whatBody:
    'Three schema entities, validated against Google Rich Results, tuned to your vertical and city: LocalBusiness with full address and hours, FAQPage with 5 to 10 vertical-specific questions, and Service entities for each offering you sell.',
  whyHeading: 'Why this matters',
  whyBody:
    'Internal data across our roster shows schema density correlates strongly with citation rate on Perplexity, ChatGPT and Google AI Overviews. Sites without schema get cited 12 to 18 percent of the time on relevant queries; sites with full schema deployment hit 35 to 55 percent.',
  nextHeading: 'Next step',
  nextBody:
    'Reply to the email this PDF arrived in, or visit ailysagency.ca to book a 60 minute strategy call. We confirm scope and ship schema in under 7 business days at the Core tier.',
};

const I18N_FR: I18N = {
  heading: 'Balisage schéma, déployé pour toi',
  intro:
    'Le balisage schéma est la couche de données structurées qui permet aux moteurs IA de tirer une réponse propre à propos de ton commerce. C\'est l\'investissement AEO à plus haut levier que la plupart des commerces locaux manquent.',
  whatHeading: 'Ce qu\'on déploie au forfait Core',
  whatBody:
    'Trois entités schéma, validées contre Google Rich Results, ajustées à ton secteur et à ta ville : LocalBusiness avec adresse complète et heures, FAQPage avec 5 à 10 questions spécifiques à ton secteur, et entités Service pour chaque offre que tu vends.',
  whyHeading: 'Pourquoi c\'est important',
  whyBody:
    'Les données internes sur notre roster montrent que la densité de schéma corrèle fortement avec le taux de citation sur Perplexity, ChatGPT et Google AI Overviews. Les sites sans schéma sont cités 12 à 18 pour cent du temps sur les requêtes pertinentes; les sites avec déploiement complet de schéma atteignent 35 à 55 pour cent.',
  nextHeading: 'Prochaine étape',
  nextBody:
    'Réponds au courriel qui a livré ce PDF, ou visite ailysagency.ca pour réserver un appel stratégique de 60 minutes. On confirme la portée et on livre le schéma en moins de 7 jours ouvrables au forfait Core.',
};

export function drawSchemaSnippetsPage(b: Builder, req: AuditPdfRequest) {
  const i18n = req.lang === 'fr' ? I18N_FR : I18N_EN;
  b.cursorY = 80;
  b.drawHeading(i18n.heading, 'h1');

  b.drawWrapped({ text: i18n.intro, size: FONT_SIZE.body, color: COLOR.ink });
  b.advance(SPACE.md);

  b.drawHeading(i18n.whatHeading, 'h3');
  b.drawWrapped({ text: i18n.whatBody, size: FONT_SIZE.body, color: COLOR.ink });
  b.advance(SPACE.md);

  b.drawHeading(i18n.whyHeading, 'h3');
  b.drawWrapped({ text: i18n.whyBody, size: FONT_SIZE.body, color: COLOR.ink });
  b.advance(SPACE.md);

  b.drawHeading(i18n.nextHeading, 'h3');
  b.drawWrapped({ text: i18n.nextBody, size: FONT_SIZE.body, color: COLOR.ink });
}
