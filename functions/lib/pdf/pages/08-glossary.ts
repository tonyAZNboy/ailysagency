import type { Builder } from '../builder';
import type { AuditPdfRequest } from '../../../../src/lib/pdfRequestSchema';
import { COLOR, FONT_SIZE, SPACE } from '../tokens';

interface Term {
  term: string;
  definition: string;
}

const GLOSSARY: Term[] = [
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

export function drawGlossaryPage(b: Builder, req: AuditPdfRequest) {
  void req;
  b.cursorY = 80;
  b.drawHeading('Glossary, the terms behind the score', 'h1');

  for (const item of GLOSSARY) {
    b.ensureSpace(60, 'Glossary', 8, 10);
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
