import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar, User, Share2, Twitter, Linkedin, Facebook, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { useBlogPost, useRelatedPosts, getCategoryDisplay, getCategoryColor } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";

const LANG_FULL_NAMES: Record<SupportedLang, string> = {
  en: 'en-US', es: 'es-ES', fr: 'fr-FR', zh: 'zh-CN', de: 'de-DE',
  ar: 'ar-SA', hi: 'hi-IN', it: 'it-IT', ja: 'ja-JP', ko: 'ko-KR',
  nl: 'nl-NL', pl: 'pl-PL', pt: 'pt-BR', ru: 'ru-RU', tr: 'tr-TR', vi: 'vi-VN',
};

export default function BlogPost() {
  const { slug, lang: urlLang } = useParams<{ slug: string; lang?: string }>();
  const { lang, t, setLang } = useLang();

  // Sync URL lang param with context
  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang) && urlLang !== lang) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, lang, setLang]);

  // Pass current lang to hook for translation fetching
  const { data: post, isLoading, error } = useBlogPost(slug || '', lang !== 'en' ? lang : undefined);
  const { data: relatedPosts } = useRelatedPosts(slug || '', post?.category || '', 3, lang !== 'en' ? lang : undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Force dark mode on blog pages (same as landing page)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-force-dark', 'true');
    root.classList.add('dark');
    return () => {
      root.removeAttribute('data-force-dark');
      const stored = localStorage.getItem('theme');
      if (stored === 'light') {
        root.classList.remove('dark');
      } else if (stored === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', isDark);
      }
    };
  }, []);

  const baseUrl = 'https://www.reviuzy.com';
  const enPostUrl = `${baseUrl}/blog/${slug}`;
  const canonicalUrl = lang === 'en' ? enPostUrl : `${baseUrl}/${lang}/blog/${slug}`;
  const shareText = post?.title || '';

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(canonicalUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  // Render markdown content with XSS sanitization
  const renderContent = (content: string) => {
    const html = content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">$1</a>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4">$1</blockquote>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br />');

    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['h2', 'h3', 'strong', 'em', 'li', 'p', 'br', 'ul', 'ol', 'a', 'blockquote'],
      ALLOWED_ATTR: ['class', 'href', 'target', 'rel']
    });
  };

  // Build per-language schema markup
  const buildLocalizedSchema = () => {
    if (!post) return null;
    const faqItems = (post.schema_markup as any)?.['@graph']?.find((n: any) => n['@type'] === 'FAQPage')?.mainEntity || [];
    const categoryDisplay = getCategoryDisplay(post.category);

    const schemaGraph: any[] = [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.meta_description || post.excerpt,
        image: post.featured_image_url,
        inLanguage: LANG_FULL_NAMES[lang] || 'en-US',
        author: {
          '@type': 'Organization',
          '@id': `${baseUrl}/#organization`,
          name: 'Reviuzy',
          url: baseUrl,
        },
        publisher: { '@type': 'Organization', '@id': `${baseUrl}/#organization` },
        datePublished: post.published_at,
        dateModified: post.updated_at || post.published_at,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        keywords: post.meta_keywords?.join(', '),
        articleSection: categoryDisplay,
        wordCount: post.content?.split(/\s+/).length || 0,
        isPartOf: {
          '@type': 'Blog',
          '@id': `${baseUrl}/blog#blog`,
          name: 'Reviuzy Blog',
          url: `${baseUrl}/blog`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: lang === 'en' ? baseUrl : `${baseUrl}/${lang}` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: lang === 'en' ? `${baseUrl}/blog` : `${baseUrl}/${lang}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Reviuzy',
        url: baseUrl,
        logo: { '@type': 'ImageObject', url: `${baseUrl}/reviuzy-logo.png` },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'Reviuzy',
        url: baseUrl,
        publisher: { '@id': `${baseUrl}/#organization` },
      },
    ];

    if (faqItems.length > 0) {
      schemaGraph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        inLanguage: LANG_FULL_NAMES[lang] || 'en-US',
        mainEntity: faqItems,
      });
    }

    return { '@context': 'https://schema.org', '@graph': schemaGraph };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="aspect-video bg-muted rounded-xl" />
              <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded" style={{ width: `${80 + Math.random() * 20}%` }} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t.blog?.postNotFound || 'Post Not Found'}</h1>
            <p className="text-muted-foreground mb-6">
              {t.blog?.postNotFoundDesc || "The blog post you're looking for doesn't exist or has been removed."}
            </p>
            <Button asChild>
              <Link to={lang === 'en' ? '/blog' : `/${lang}/blog`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.blog?.backToBlog || 'Back to Blog'}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const localizedSchema = buildLocalizedSchema();

  return (
    <>
      <Helmet>
        <title>{post.title} | Reviuzy Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        {post.meta_keywords && <meta name="keywords" content={post.meta_keywords.join(', ')} />}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="language" content={LANG_FULL_NAMES[lang] || 'en-US'} />

        {/* hreflang: English is default/canonical */}
        <link rel="alternate" hrefLang="x-default" href={enPostUrl} />
        <link rel="alternate" hrefLang="en" href={enPostUrl} />
        {SUPPORTED_LANGS.filter(l => l !== 'en').map(l => (
          <link key={l} rel="alternate" hrefLang={LANG_FULL_NAMES[l]} href={`${baseUrl}/${l}/blog/${slug}`} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={(LANG_FULL_NAMES[lang] || 'en-US').replace('-', '_')} />
        {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
        <meta property="article:published_time" content={post.published_at || ''} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={getCategoryDisplay(post.category)} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.meta_description || post.excerpt} />
        {post.featured_image_url && <meta name="twitter:image" content={post.featured_image_url} />}

        {/* AEO/GEO meta */}
        <meta name="ai-summary" content={post.meta_description || post.excerpt} />
        <meta name="citation_title" content={post.title} />
        {post.published_at && <meta name="citation_publication_date" content={post.published_at.split('T')[0]} />}

        {/* Localized structured data */}
        {localizedSchema && (
          <script type="application/ld+json">
            {JSON.stringify(localizedSchema)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20">
          <article className="max-w-4xl mx-auto px-4 py-12" itemScope itemType="https://schema.org/BlogPosting">
            {/* Floating Back Button */}
            <Link
              to={lang === 'en' ? '/blog' : `/${lang}/blog`}
              className="fixed top-24 left-4 z-40 inline-flex items-center gap-2 text-sm font-medium rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-all py-0 px-[8px] opacity-40">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{t.blog?.backToBlog || 'Back to Blog'}</span>
            </Link>

            {/* Header */}
            <header className="mb-8">
              <Badge
                className={`mb-4 ${getCategoryColor(post.category)}`}
                variant="outline">
                {getCategoryDisplay(post.category)}
              </Badge>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                itemProp="headline">
                {post.title}
              </h1>

              {(post.tldr || post.excerpt) && (
                <p className="text-sm text-muted-foreground mt-3 mb-4 block">
                  {post.tldr || post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5" itemProp="author" itemScope itemType="https://schema.org/Organization">
                  <User className="h-4 w-4" />
                  <span itemProp="name">{post.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.published_at || ''} itemProp="datePublished">
                    {post.published_at && format(new Date(post.published_at), 'MMMM d, yyyy')}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.read_time_minutes} {t.blog?.minRead || 'min read'}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            {post.featured_image_url && (
              <figure className="mb-10">
                <img
                  src={post.featured_image_url}
                  alt={post.featured_image_alt || post.title}
                  className="w-full rounded-xl object-cover aspect-video"
                  itemProp="image" />
              </figure>
            )}

            {/* Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${renderContent(post.content)}</p>` }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-xl mb-12">
              <Share2 className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{t.blog?.shareArticle || 'Share this article:'}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleShare('twitter')}>
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare('linkedin')}>
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare('facebook')}>
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator className="mb-12" />

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">{t.blog?.relatedArticles || 'Related Articles'}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={lang === 'en' ? `/blog/${related.slug}` : `/${lang}/blog/${related.slug}`}
                      className="group rounded-lg border bg-card overflow-hidden hover:border-primary/30 transition-colors">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        {related.featured_image_url ? (
                          <img
                            src={related.featured_image_url}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                            <BookOpen className="h-8 w-8 text-primary/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {related.read_time_minutes} {t.blog?.minRead || 'min read'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
