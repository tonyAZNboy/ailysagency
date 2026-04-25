import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '@/config/app';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'product' | 'local_business';
  image?: string;
  noindex?: boolean;
  structuredData?: object;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOHead = ({
  title,
  description,
  canonicalUrl,
  type = 'website',
  image,
  noindex = false,
  structuredData,
  keywords,
  author = APP_CONFIG.name,
  publishedTime,
  modifiedTime,
}: SEOHeadProps) => {
  const siteName = APP_CONFIG.name;
  const defaultImage = `${APP_CONFIG.url}${APP_CONFIG.logo}`;
  const fullTitle = `${title} | ${siteName}`;
  const fullImage = image?.startsWith('http') ? image : `${APP_CONFIG.url}${image || APP_CONFIG.logo}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} - ${title}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reviuzy" />
      <meta name="twitter:creator" content="@reviuzy" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={`${siteName} - ${title}`} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* AI Search Engine Optimization */}
      <meta name="ai-content-declaration" content="human-created" />
      <meta name="generator" content={`${siteName} - AI-Powered Review Management`} />
      <meta name="ai-summary" content={description} />
      {keywords && <meta name="ai-keywords" content={keywords.slice(0, 5).join(', ')} />}

      {/* Citation metadata for AI crawlers */}
      <meta name="citation_title" content={title} />
      <meta name="citation_author" content={author} />
      {publishedTime && <meta name="citation_publication_date" content={publishedTime.split('T')[0]} />}

      {/* Structured Data for AI Understanding */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
