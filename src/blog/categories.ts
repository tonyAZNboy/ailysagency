import type { CategoryInfo } from './types'

export const BLOG_CATEGORIES: CategoryInfo[] = [
  { id: 'ai-visibility', label: 'AI Visibility', description: 'How local businesses get cited inside ChatGPT, Perplexity, Claude, Gemini, Google AIO, and Bing Copilot answers.', color: 'cyan', icon: '🤖' },
  { id: 'gbp-google-maps', label: 'Google Business Profile', description: 'GBP optimization, posts, photos, Q and A, and attributes that move the local pack.', color: 'blue', icon: '📍' },
  { id: 'local-seo', label: 'Local SEO', description: 'NAP consistency, citations, Wikidata, schema, and the technical layer that AI engines actually read.', color: 'emerald', icon: '🗺️' },
  { id: 'aeo-geo-eeat', label: 'AEO, GEO, E-E-A-T', description: 'Answer Engine Optimization, Generative Engine Optimization, and Experience, Expertise, Authoritativeness, Trustworthiness signals.', color: 'purple', icon: '📚' },
  { id: 'voice-search', label: 'Voice Search', description: 'How Siri, Alexa, and Google Assistant pick a local business when a customer asks out loud.', color: 'amber', icon: '🎙️' },
  { id: 'industry-playbook', label: 'Industry Playbooks', description: 'Vertical-specific tactics for dentists, lawyers, restaurants, contractors, clinics, real estate, hotels.', color: 'magenta', icon: '🏷️' },
  { id: 'reputation-reviews', label: 'Reputation and Reviews', description: 'Review velocity, sentiment monitoring, and the Reviuzy automation add-on.', color: 'pink', icon: '⭐' },
  { id: 'analytics-attribution', label: 'Analytics and Attribution', description: 'AI Traffic tracking, UTM strategy, and tying LLM citations to actual bookings.', color: 'green', icon: '📊' },
  { id: 'ailys-product', label: 'AiLys', description: 'How AiLys works, methodology breakdowns, and honest comparisons.', color: 'cyan', icon: '⚡' },
  { id: 'competitor-comparisons', label: 'Competitor Comparisons', description: 'Honest side-by-side comparisons of AiLys against Quebec and Canadian agencies and platforms.', color: 'cyan', icon: '⚖️' },
]

export function getCategoryInfo(id: string): CategoryInfo | undefined {
  return BLOG_CATEGORIES.find(c => c.id === id)
}
