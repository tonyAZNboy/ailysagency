import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';

interface Term {
  term: string;
  definition: string;
}

const GLOSSARY_EN: Term[] = [
  {
    term: 'AEO',
    definition:
      'Answer Engine Optimization. Shapes content so extractive answer engines (Google AI Overviews, Bing answer cards, voice assistants) surface your page as the cited answer.',
  },
  {
    term: 'GEO',
    definition:
      'Generative Engine Optimization. Shapes content so generative engines (ChatGPT, Perplexity, Claude) name and cite your brand inside their synthesized responses.',
  },
  {
    term: 'E-E-A-T',
    definition:
      'Experience, Expertise, Authoritativeness, Trust. Google\'s quality framework. AI engines weight these signals heavily for local and YMYL queries.',
  },
  {
    term: 'Share of Model',
    definition:
      'The percentage of buyer-intent prompts where an engine names your brand. The new map-pack ranking. Tracked per engine and benchmarked against three named competitors.',
  },
  {
    term: 'NAP consistency',
    definition:
      'Name, Address, Phone match across every directory and social profile. Mismatched NAP weakens entity confidence; AI engines drop low-confidence entities.',
  },
  {
    term: 'Citation freshness',
    definition:
      'How recently your top citations were updated. 40-60% of cited sources change month to month; stale citations lose rank without warning.',
  },
  {
    term: 'GBP',
    definition: 'Google Business Profile, the canonical local entity record. Drives the local pack and seeds AI Overviews answers.',
  },
  {
    term: 'Speakable schema',
    definition:
      'JSON-LD pointing to the parts of a page suitable for voice readback. Improves Siri/Google Assistant pickup for FAQ-style answers.',
  },
];

const GLOSSARY_FR: Term[] = [
  {
    term: 'AEO',
    definition:
      'Answer Engine Optimization. Façonne le contenu pour que les moteurs de réponses extractives (Google AI Overviews, cartes-réponses Bing, assistants vocaux) fassent ressortir ta page comme la réponse citée.',
  },
  {
    term: 'GEO',
    definition:
      'Generative Engine Optimization. Façonne le contenu pour que les moteurs génératifs (ChatGPT, Perplexity, Claude) nomment et citent ta marque dans leurs réponses synthétisées.',
  },
  {
    term: 'E-E-A-T',
    definition:
      'Expérience, Expertise, Autorité, Confiance. Le cadre qualité de Google. Les moteurs IA pondèrent fortement ces signaux pour les requêtes locales et YMYL.',
  },
  {
    term: 'Share of Model',
    definition:
      'Le pourcentage de requêtes à intention d\'achat où un moteur nomme ta marque. Le nouveau classement du carrousel local. Suivi par moteur et comparé à trois concurrents nommés.',
  },
  {
    term: 'Cohérence NAP',
    definition:
      'Nom, Adresse, Téléphone identiques sur chaque répertoire et profil social. Un NAP incohérent affaiblit la confiance d\'entité; les moteurs IA écartent les entités à faible confiance.',
  },
  {
    term: 'Fraîcheur des citations',
    definition:
      'À quel point tes citations principales ont été mises à jour récemment. 40 à 60 pour cent des sources citées changent d\'un mois à l\'autre; les citations périmées perdent leur rang sans avertissement.',
  },
  {
    term: 'GBP',
    definition: 'Google Business Profile, l\'enregistrement canonique de l\'entité locale. Alimente le carrousel local et amorce les réponses AI Overviews.',
  },
  {
    term: 'Schéma Speakable',
    definition:
      'JSON-LD pointant les parties d\'une page propices à une lecture vocale. Améliore la captation par Siri et Google Assistant pour les réponses de type FAQ.',
  },
];

export function drawGlossaryPage(b: Builder, req: AuditPdfRequest) {
  const isFr = req.lang === 'fr';
  const heading = isFr ? 'Glossaire, les termes derrière le score' : 'Glossary, the terms behind the score';
  const pageLabel = isFr ? 'Glossaire' : 'Glossary';
  const items = isFr ? GLOSSARY_FR : GLOSSARY_EN;

  b.cursorY = 80;
  b.drawHeading(heading, 'h1');

  for (const item of items) {
    b.ensureSpace(60, pageLabel, 8, 10);
    b.drawLine({
      text: item.term,
      size: FONT_SIZE.h3,
      font: b.fonts.bold,
      color: COLOR.brand,
    });
    b.drawWrapped({
      text: item.definition,
      size: FONT_SIZE.body,
      color: COLOR.inkSoft,
    });
    b.advance(SPACE.sm);
  }
}
