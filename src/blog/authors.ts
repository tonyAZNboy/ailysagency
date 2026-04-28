import type { BlogAuthor } from './types'

export const AUTHORS = {
  research: {
    name: 'AiLys Research',
    role: 'AI Search Research Team',
    avatarInitials: 'AR',
    bio: 'The AiLys Research Team analyzes thousands of LLM citations weekly across ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot to map how local businesses surface inside AI answers.',
  } satisfies BlogAuthor,

  strategy: {
    name: 'AiLys Strategy',
    role: 'Local SEO Strategists',
    avatarInitials: 'AS',
    bio: 'The AiLys Strategy team has shipped GBP optimization and citation-building work for hundreds of local businesses across Quebec, turning local signals into measurable map pack and AI visibility gains.',
  } satisfies BlogAuthor,

  product: {
    name: 'AiLys Team',
    role: 'Product and Engineering',
    avatarInitials: 'AT',
    bio: 'The team building the AiLys engine and the Reviuzy SaaS, shipping the tooling that powers AI visibility audits, citation workflows, and reputation automation for local operators.',
  } satisfies BlogAuthor,
}
