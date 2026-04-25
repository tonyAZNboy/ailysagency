// JSON-LD Structured Data Generators for AI Search Engine Optimization
import { APP_CONFIG } from '@/config/app';

// Interfaces for different types of structured data
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
  name: APP_CONFIG.name,
  description: APP_CONFIG.description,
  url: APP_CONFIG.url,
  logo: {
    '@type': 'ImageObject',
    url: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
    width: 512,
    height: 512,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@reviuzy.com',
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'],
  },
  sameAs: [],
  knowsAbout: [
    'AI Review Growth',
    'NFC Review Campaigns',
    'Automated Contest Engine',
    'Google Business Profile Optimization',
    'Local SEO',
    'Review Campaign Automation',
    'Legal Contest Compliance',
    'Multi-Location Business Management',
  ],
});

export const generateWebApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${APP_CONFIG.url}/#webapp`,
  name: APP_CONFIG.name,
  description: 'AI-powered review growth and campaign engine. Launch NFC-powered review contests, automate winner draws, generate AI reviews & responses, and build a repeatable monthly growth engine for local businesses.',
  url: APP_CONFIG.url,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Review Growth & Campaign Engine',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  softwareVersion: '2.0',
  releaseNotes: 'New 3-tier pricing with Starter, Pro, and Max plans',
  inLanguage: ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi', 'tr', 'vi'],
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '39',
    highPrice: '139',
    priceCurrency: 'USD',
    offerCount: 3,
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter Plan',
        price: '39',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        description: '1 location, 1 campaign, 500 entries, 750 AI credits, NFC campaigns, AI review generation, manual winner draw',
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan',
        price: '69',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        description: 'Unlimited campaigns, automated winner draw, Google auto-posting, social calendar, legal T&C generator, 2,000 entries, 2,500 AI credits',
      },
      {
        '@type': 'Offer',
        name: 'Max Plan',
        price: '139',
        priceCurrency: 'USD',
        priceValidUntil: '2027-12-31',
        description: '3 locations included, 4,000 entries, 5,000 AI credits, priority AI queue, agency dashboard, advanced automation',
      },
    ],
  },
  featureList: [
    'NFC tap-to-enter review campaigns',
    'AI-powered review generation using Google Gemini',
    'Automated contest winner draw',
    'Legal T&C generator for 20+ countries',
    'Google Business Profile auto-posting',
    'Social media content calendar',
    'Multi-location campaign management',
    'Growth entry tracking with usage metering',
    'Winner announcement video generation',
    'AI review response suggestions',
    'Fake review detection (Domain Shield add-on)',
    'Domain Speed Boost add-on',
    'Engagement Suite add-on (loyalty, SMS, reminders)',
    '16-language support',
  ],
  screenshot: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
  creator: {
    '@type': 'Organization',
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
  },
  provider: {
    '@type': 'Organization',
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
  },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Local Businesses',
    geographicArea: {
      '@type': 'Country',
      name: 'Worldwide',
    },
  },
  potentialAction: {
    '@type': 'UseAction',
    target: `${APP_CONFIG.url}/auth/signup`,
    name: 'Start Free Trial',
  },
});

export const generateProductSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${APP_CONFIG.url}/#product`,
  name: `${APP_CONFIG.name} - AI Review Growth & Campaign Engine`,
  description: 'Complete AI-powered review growth infrastructure for local businesses. NFC campaigns, automated contests, AI review generation, legal compliance for 20+ countries.',
  brand: {
    '@type': 'Brand',
    name: APP_CONFIG.name,
  },
  category: 'Software > Business Software > Review Growth & Campaign Automation',
  image: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '39',
    highPrice: '139',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: APP_CONFIG.name,
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '500',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Sarah Johnson' },
      reviewBody: 'Reviuzy transformed our review game. We went from 3.8 to 4.7 stars in just 3 months. The NFC campaigns are a game-changer!',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      author: { '@type': 'Person', name: 'Michael Chen' },
      reviewBody: "The automated winner draw saves us hours. Customers love the contests and we've seen 3x more reviews.",
    },
  ],
});

export const generateServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${APP_CONFIG.url}/#service`,
  name: 'AI Review Growth & Campaign Engine',
  serviceType: 'Business Software',
  description: 'AI-powered review growth infrastructure with NFC campaigns, automated contests, AI review generation, and legal compliance for local businesses worldwide.',
  provider: {
    '@type': 'Organization',
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Worldwide',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Reviuzy Plans',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Starter Plan', description: '1 location, 1 campaign, 500 entries, 750 AI credits, NFC campaigns, AI reviews, manual draw' },
        price: '39',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Pro Plan', description: 'Unlimited campaigns, automated draw, Google auto-posting, social calendar, legal T&C, 2,000 entries' },
        price: '69',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Max Plan', description: '3 locations, 4,000 entries, 5,000 AI credits, priority AI, agency dashboard, advanced automation' },
        price: '139',
        priceCurrency: 'USD',
      },
    ],
  },
});

export const generateHowToSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${APP_CONFIG.url}/#howto`,
  name: 'How to Grow Google Reviews with NFC Campaigns',
  description: 'Launch your first AI-powered review campaign in 5 minutes using NFC tap-to-enter technology.',
  totalTime: 'PT5M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '39',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Create a Campaign',
      text: 'Set up an NFC tap-to-enter campaign with your prize, dates, and legal settings. Reviuzy generates compliant T&C for your jurisdiction automatically.',
      image: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Collect Entries via NFC',
      text: 'Customers tap your NFC card or scan a QR code. AI generates an SEO-optimized review while capturing their email for the contest.',
      image: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Generates & Responds',
      text: 'Every review gets a personalized AI response. Reviews are posted to Google Business Profile, boosting your local SEO.',
      image: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Draw Winners & Amplify',
      text: 'Draw winners with one click. Share announcement videos on social media. Repeat every month for compounding growth.',
      image: `${APP_CONFIG.url}${APP_CONFIG.logo}`,
    },
  ],
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
  name: APP_CONFIG.name,
  description: APP_CONFIG.description,
  publisher: {
    '@id': `${APP_CONFIG.url}/#organization`,
  },
  inLanguage: 'en-US',
});

export const generateLandingPageSchemaGraph = (faqData: FAQData) => ({
  '@context': 'https://schema.org',
  '@graph': [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
    generateWebApplicationSchema(),
    generateProductSchema(),
    generateServiceSchema(),
    generateHowToSchema(),
    generateFAQSchema(faqData),
  ],
});
