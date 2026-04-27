// JSON-LD structured data generators for AiLys Agency.
// AiLys is a Quebec-based LLM visibility / AI search reputation agency.
// Reviuzy is a separate software product that AiLys references and resells.
import { APP_CONFIG } from '@/config/app';

export interface LocalBusinessData {
  name: string;
  description?: string;
  address?: {
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  telephone?: string;
  url?: string;
  image?: string;
  priceRange?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export interface ReviewData {
  businessName: string;
  businessUrl?: string;
  reviewBody?: string;
  ratingValue: number;
  authorName?: string;
  datePublished?: string;
}

export interface SoftwareApplicationData {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

export interface FAQData {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

const SUPPORTED_LANG_CODES = [
  'en', 'fr', 'es', 'de', 'it', 'pt', 'nl', 'pl',
  'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'vi',
];

export const generateLocalBusinessSchema = (data: LocalBusinessData) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: data.name,
  description: data.description,
  address: data.address ? {
    '@type': 'PostalAddress',
    streetAddress: data.address.streetAddress,
    addressLocality: data.address.city,
    postalCode: data.address.postalCode,
    addressCountry: data.address.country,
  } : undefined,
  telephone: data.telephone,
  url: data.url,
  image: data.image,
  priceRange: data.priceRange,
  aggregateRating: data.aggregateRating ? {
    '@type': 'AggregateRating',
    ratingValue: data.aggregateRating.ratingValue,
    reviewCount: data.aggregateRating.reviewCount,
  } : undefined,
});

export const generateReviewSchema = (data: ReviewData) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'LocalBusiness',
    name: data.businessName,
    url: data.businessUrl,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: data.ratingValue,
    bestRating: 5,
    worstRating: 1,
  },
  reviewBody: data.reviewBody,
  author: data.authorName ? {
    '@type': 'Person',
    name: data.authorName,
  } : undefined,
  datePublished: data.datePublished,
});

export const generateSoftwareApplicationSchema = (data: SoftwareApplicationData) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: data.name,
  description: data.description,
  applicationCategory: data.applicationCategory,
  operatingSystem: data.operatingSystem || 'Web Browser',
  offers: data.offers ? {
    '@type': 'Offer',
    price: data.offers.price,
    priceCurrency: data.offers.priceCurrency,
  } : undefined,
  aggregateRating: data.aggregateRating ? {
    '@type': 'AggregateRating',
    ratingValue: data.aggregateRating.ratingValue,
    ratingCount: data.aggregateRating.ratingCount,
  } : undefined,
});

export const generateFAQSchema = (data: FAQData) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${APP_CONFIG.url}/#faq`,
  mainEntity: data.questions.map(q => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer,
    },
  })),
});

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${APP_CONFIG.url}/#organization`,
  name: APP_CONFIG.fullName,
  alternateName: APP_CONFIG.name,
  legalName: APP_CONFIG.fullName,
  description: APP_CONFIG.description,
  url: APP_CONFIG.url,
  logo: {
    '@type': 'ImageObject',
    url: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
    width: 512,
    height: 512,
  },
  email: APP_CONFIG.email,
  foundingLocation: {
    '@type': 'Place',
    name: APP_CONFIG.origin,
  },
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: APP_CONFIG.email,
    contactType: 'customer service',
    areaServed: ['CA', 'US', 'FR', 'Worldwide'],
    availableLanguage: ['English', 'French', 'Spanish', 'Mandarin', 'Russian', 'Arabic'],
  },
  sameAs: [],
  knowsAbout: [
    'Answer Engine Optimization',
    'Generative Engine Optimization',
    'E-E-A-T',
    'LLM visibility',
    'AI search optimization',
    'ChatGPT citations',
    'Perplexity citations',
    'Claude citations',
    'Google AI Overviews',
    'Bing Copilot citations',
    'Google Business Profile optimization',
    'Local SEO for AI search',
    'Structured data and schema markup',
    'Wikipedia and Wikidata entity work',
  ],
});

// AiLys is a professional service: an agency, not a SaaS product.
export const generateProfessionalServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${APP_CONFIG.url}/#professionalservice`,
  name: APP_CONFIG.fullName,
  description: APP_CONFIG.description,
  url: APP_CONFIG.url,
  image: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
  logo: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
  email: APP_CONFIG.email,
  priceRange: '$300 - $1,200 / month',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Quebec',
    addressCountry: 'CA',
  },
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  serviceType: [
    'Answer Engine Optimization',
    'Generative Engine Optimization',
    'E-E-A-T Authority Building',
    'Google Business Profile Management',
    'AI Search Reputation Audit',
  ],
  brand: {
    '@id': `${APP_CONFIG.url}/#organization`,
  },
});

// AiLys service catalog: AEO, GEO, E-E-A-T, GBP, Audit.
export const generateServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${APP_CONFIG.url}/#service`,
  name: 'LLM Visibility and AI Search Optimization',
  serviceType: 'AI Search Reputation Management',
  description:
    'AEO, GEO and E-E-A-T services that get local businesses cited inside ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews and Bing Copilot.',
  provider: {
    '@id': `${APP_CONFIG.url}/#organization`,
  },
  areaServed: [
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AiLys Agency Plans',
    itemListElement: [
      {
        '@type': 'Offer',
        '@id': `${APP_CONFIG.url}/#plan-starter`,
        priceCurrency: 'USD',
        price: '300',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '300',
          priceCurrency: 'USD',
          unitText: 'MONTH',
          billingIncrement: 1,
        },
        eligibleDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'AiLys Starter',
          description:
            'Foundation AEO and schema work, Google Business Profile cleanup, monthly LLM citation report.',
        },
      },
      {
        '@type': 'Offer',
        '@id': `${APP_CONFIG.url}/#plan-core`,
        priceCurrency: 'USD',
        price: '600',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '600',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'AiLys Core',
          description:
            'AEO + GEO + E-E-A-T monthly retainer. Schema, content briefs, authority placements, GBP optimization, monthly LLM citation report.',
        },
      },
      {
        '@type': 'Offer',
        '@id': `${APP_CONFIG.url}/#plan-growth`,
        priceCurrency: 'USD',
        price: '1200',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '1200',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'AiLys Growth',
          description:
            'Full AEO, GEO, E-E-A-T program with Wikipedia and Wikidata work, digital PR, multi-location management, weekly reporting.',
        },
      },
      {
        '@type': 'Offer',
        '@id': `${APP_CONFIG.url}/#plan-autopilot`,
        priceCurrency: 'USD',
        price: '2500',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '2500',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'AiLys Agency',
          description:
            'Done-for-you AI search visibility for multi-location brands. Includes Reviuzy review growth platform.',
        },
      },
    ],
  },
});

// Reviuzy is referenced as a SoftwareApplication that AiLys recommends and resells.
export const generateReviuzyReferenceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://www.reviuzy.com/#software',
  name: 'Reviuzy',
  description:
    'Review growth platform recommended by AiLys Agency. NFC tap-to-review campaigns, AI review responses and Google Business Profile auto-posting for local businesses.',
  url: 'https://www.reviuzy.com',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '39',
    highPrice: '139',
    priceCurrency: 'USD',
    offerCount: 3,
    availability: 'https://schema.org/InStock',
  },
  isRelatedTo: {
    '@id': `${APP_CONFIG.url}/#organization`,
  },
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${APP_CONFIG.url}/#website`,
  url: APP_CONFIG.url,
  name: APP_CONFIG.fullName,
  alternateName: APP_CONFIG.name,
  description: APP_CONFIG.description,
  publisher: {
    '@id': `${APP_CONFIG.url}/#organization`,
  },
  inLanguage: SUPPORTED_LANG_CODES,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${APP_CONFIG.url}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

// Speakable surface for voice assistants and AI summarizers.
export const generateSpeakableSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${APP_CONFIG.url}/#webpage`,
  url: APP_CONFIG.url,
  name: APP_CONFIG.fullName,
  description: APP_CONFIG.description,
  isPartOf: { '@id': `${APP_CONFIG.url}/#website` },
  about: { '@id': `${APP_CONFIG.url}/#organization` },
  inLanguage: SUPPORTED_LANG_CODES,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.hero-eyebrow', '.hero-subheadline', '.faq-question', '.faq-answer'],
  },
});

// Kept for backwards compat. Both delegate to the AiLys service catalog now.
export const generateWebApplicationSchema = generateReviuzyReferenceSchema;
export const generateProductSchema = generateServiceSchema;
export const generateHowToSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${APP_CONFIG.url}/#howto`,
  name: 'How AiLys gets your business cited by AI search engines',
  description:
    'Four-step engagement: audit your AI search footprint, fix schema and entity signals, build authority, then monitor citations across ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews.',
  totalTime: 'P90D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Free AI visibility audit',
      text: 'We run a 90-second LLM citation audit against ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews and Bing Copilot. You see exactly which queries name you and which name a competitor.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fix the foundation',
      text: 'We deploy schema markup, structured Q and A surfaces, entity disambiguation and Google Business Profile cleanup so AI engines have a clean answer to pull.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Build authority',
      text: 'We place authoritative content, work Wikipedia and Wikidata where eligible, and earn forum and PR signals so LLMs name you in their answers.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Monitor and report',
      text: 'Monthly LLM citation report shows which queries cite you across each engine, with a 90 to 120 day citation lift target.',
    },
  ],
});

export const generateLandingPageSchemaGraph = (faqData: FAQData) => ({
  '@context': 'https://schema.org',
  '@graph': [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
    generateProfessionalServiceSchema(),
    generateServiceSchema(),
    generateReviuzyReferenceSchema(),
    generateSpeakableSchema(),
    generateHowToSchema(),
    generateFAQSchema(faqData),
  ],
});
