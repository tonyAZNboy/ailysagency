import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Clock, BookOpen, ChevronLeft, ChevronRight, Search, X, Rocket, ChevronDown, ChevronUp, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { useBlogPosts, useBeginnerPosts, getCategoryDisplay, getCategoryColor } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";

const CATEGORIES = [
  { value: '', labelKey: 'allPosts' },
  { value: 'review-growth', labelKey: 'Review Growth' },
  { value: 'fake-review-detection', labelKey: 'Fake Reviews' },
  { value: 'ai-seo', labelKey: 'AI & SEO' },
  { value: 'reputation-management', labelKey: 'Reputation' },
  { value: 'social-media', labelKey: 'Social Media' },
  { value: 'business-growth', labelKey: 'Growth' },
  { value: 'seo-tips', labelKey: 'SEO Tips' },
];

const LANG_FULL_NAMES: Record<SupportedLang, string> = {
  en: 'en-US', es: 'es-ES', fr: 'fr-FR', zh: 'zh-CN', de: 'de-DE',
  ar: 'ar-SA', hi: 'hi-IN', it: 'it-IT', ja: 'ja-JP', ko: 'ko-KR',
  nl: 'nl-NL', pl: 'pl-PL', pt: 'pt-BR', ru: 'ru-RU', tr: 'tr-TR', vi: 'vi-VN',
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [readingTimeFilter, setReadingTimeFilter] = useState<'all' | 'quick' | 'medium' | 'long'>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [beginnerPathOpen, setBeginnerPathOpen] = useState(true);
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, t, setLang } = useLang();

  const isSearchActive = searchTerm.trim().length > 0;

  // Sync URL lang param with context
  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang) && urlLang !== lang) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, lang, setLang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, readingTimeFilter, selectedTag]);

  const { data, isLoading } = useBlogPosts({
    category: selectedCategory || undefined,
    limit: isSearchActive ? 1000 : 12,
    page: isSearchActive ? 1 : page,
    lang,
    sortOrder,
    fetchAll: isSearchActive,
  });

  const { data: beginnerPosts } = useBeginnerPosts(lang !== 'en' ? lang : undefined);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
    setSelectedTag(null);
  };

  // Client-side filtering
  const filteredPosts = useMemo(() => {
    let posts = data?.posts || [];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term)
      );
    }

    if (readingTimeFilter === 'quick') {
      posts = posts.filter(p => p.read_time_minutes < 5);
    } else if (readingTimeFilter === 'medium') {
      posts = posts.filter(p => p.read_time_minutes >= 5 && p.read_time_minutes <= 10);
    } else if (readingTimeFilter === 'long') {
      posts = posts.filter(p => p.read_time_minutes > 10);
    }

    if (selectedTag) {
      posts = posts.filter(p => p.tags?.includes(selectedTag));
    }

    return posts;
  }, [data?.posts, searchTerm, readingTimeFilter, selectedTag]);

  // Popular tags from loaded posts
  const popularTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    (data?.posts || []).forEach(post => {
      post.tags?.forEach(tag => {
        if (tag !== 'beginner') {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
      });
    });
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [data?.posts]);

  const blogUrl = lang === 'en' ? 'https://www.reviuzy.com/blog' : `https://www.reviuzy.com/${lang}/blog`;
  const canonicalUrl = blogUrl;

  const blogTitle = t.blog?.pageHeading || 'Insights for Local Business Success';
  const blogDesc = t.blog?.pageSubheadline || 'Actionable strategies for getting more reviews, protecting your reputation, and boosting your visibility in AI search engines.';
  const blogMetaTitle = t.seo?.blogTitle || 'Blog | Review Management Tips & Strategies | Reviuzy';
  const blogMetaDesc = t.seo?.blogDesc || 'Expert insights on getting more Google reviews, detecting fake reviews, AI search optimization, and growing your local business online presence.';

  const schemaGraph = [
    {
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#webpage`,
      name: blogMetaTitle,
      description: blogMetaDesc,
      url: canonicalUrl,
      inLanguage: LANG_FULL_NAMES[lang] || 'en-US',
      isPartOf: { '@id': 'https://www.reviuzy.com/#website' },
    },
    {
      '@type': 'Blog',
      '@id': `${canonicalUrl}#blog`,
      name: 'Reviuzy Blog',
      url: canonicalUrl,
      description: blogMetaDesc,
      publisher: { '@id': 'https://www.reviuzy.com/#organization' },
      inLanguage: LANG_FULL_NAMES[lang] || 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: lang === 'en' ? 'https://www.reviuzy.com' : `https://www.reviuzy.com/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: blogUrl },
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.reviuzy.com/#organization',
      name: 'Reviuzy',
      url: 'https://www.reviuzy.com',
      logo: { '@type': 'ImageObject', url: 'https://www.reviuzy.com/reviuzy-logo.png' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.reviuzy.com/#website',
      name: 'Reviuzy',
      url: 'https://www.reviuzy.com',
      publisher: { '@id': 'https://www.reviuzy.com/#organization' },
    },
  ];

  return (
    <>
      <Helmet>
        <title>{blogMetaTitle}</title>
        <meta name="description" content={blogMetaDesc} />
        <meta name="keywords" content="review management, Google reviews, local SEO, fake review detection, reputation management, AI search, AEO, GEO" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={blogMetaTitle} />
        <meta property="og:description" content={blogMetaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={LANG_FULL_NAMES[lang] || 'en_US'} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        {/* hreflang alternate links for all supported languages */}
        <link rel="alternate" hrefLang="x-default" href="https://www.reviuzy.com/blog" />
        <link rel="alternate" hrefLang="en" href="https://www.reviuzy.com/blog" />
        {SUPPORTED_LANGS.filter(l => l !== 'en').map(l => (
          <link key={l} rel="alternate" hrefLang={LANG_FULL_NAMES[l]} href={`https://www.reviuzy.com/${l}/blog`} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaGraph })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 px-4 border-b">
            <div className="max-w-6xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                <BookOpen className="h-3 w-3 mr-1" />
                Reviuzy Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {blogTitle.includes('Local Business') ? (
                  <>
                    {t.blog?.pageHeading?.split('Local Business')[0] || 'Insights for '}
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      Local Business
                    </span>
                    {t.blog?.pageHeading?.split('Local Business')[1] || ' Success'}
                  </>
                ) : (
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {blogTitle}
                  </span>
                )}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {blogDesc}
              </p>
            </div>
          </section>

          {/* Category Tabs - not sticky, smaller text for tablet */}
          <section className="py-3 md:py-4 px-4 border-b">
            <div className="max-w-6xl mx-auto">
              <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
                <TabsList className="flex flex-wrap gap-1 md:gap-1.5 h-auto bg-transparent justify-center">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger
                      key={cat.value}
                      value={cat.value}
                      className="text-[11px] md:text-xs py-1 px-2 md:py-1.5 md:px-2.5 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent"
                    >
                      {cat.value === '' ? (t.blog?.allPosts || 'All Posts') : cat.labelKey}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </section>

          {/* Search, Sort & Reading Time Filters */}
          <section className="py-4 px-4 border-b">
            <div className="max-w-6xl mx-auto space-y-3">
              {/* Row 1: Search + Sort */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t.blog?.searchPlaceholder || 'Search articles...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'newest' | 'oldest')}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t.blog?.sortNewest || 'Newest First'}</SelectItem>
                    <SelectItem value="oldest">{t.blog?.sortOldest || 'Oldest First'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 2: Reading time filter pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground shrink-0">{t.blog?.readingTime || 'Reading time'}:</span>
                {([
                  { key: 'all' as const, label: t.blog?.readingAll || 'All' },
                  { key: 'quick' as const, label: t.blog?.readingQuick || 'Quick (<5 min)' },
                  { key: 'medium' as const, label: t.blog?.readingMedium || 'Medium (5-10 min)' },
                  { key: 'long' as const, label: t.blog?.readingLong || 'Long (10+ min)' },
                ]).map(({ key, label }) => (
                  <Badge
                    key={key}
                    variant={readingTimeFilter === key ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      readingTimeFilter === key
                        ? 'hover:bg-primary/80 text-primary-foreground'
                        : 'hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setReadingTimeFilter(key)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Beginner's Path */}
          {beginnerPosts && beginnerPosts.length > 0 && !isSearchActive && (
            <section className="py-6 px-4 border-b bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
              <div className="max-w-6xl mx-auto">
                <Collapsible open={beginnerPathOpen} onOpenChange={setBeginnerPathOpen}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-semibold">
                        {t.blog?.beginnerPathTitle || 'Start Here: Your Learning Path'}
                      </h2>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {beginnerPathOpen
                          ? (t.blog?.collapse || 'Collapse')
                          : (t.blog?.expand || 'Expand')}
                        {beginnerPathOpen ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.blog?.beginnerPathDesc || 'New to review management? Follow these steps in order to build a strong foundation.'}
                  </p>
                  <CollapsibleContent>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                      {beginnerPosts.map((post, index) => (
                        <Link
                          key={post.id}
                          to={lang === 'en' ? `/blog/${post.slug}` : `/${lang}/blog/${post.slug}`}
                          className="flex-shrink-0 w-64 snap-start group"
                        >
                          <div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30 h-full">
                            <div className="relative aspect-video overflow-hidden bg-muted">
                              {post.featured_image_url ? (
                                <img
                                  src={post.featured_image_url}
                                  alt={post.featured_image_alt || post.title || ''}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                  <BookOpen className="h-8 w-8 text-primary/30" />
                                </div>
                              )}
                              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                                {index + 1}
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {post.read_time_minutes} {t.blog?.minRead || 'min read'}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </section>
          )}

          {/* Popular Tags */}
          {popularTags.length > 0 && !isSearchActive && (
            <section className="py-4 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground shrink-0">{t.blog?.popularTopics || 'Popular Topics'}:</span>
                  {popularTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? 'default' : 'secondary'}
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="text-xs text-muted-foreground hover:text-foreground underline ml-2"
                    >
                      {t.blog?.clearTag || 'Clear'}
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Blog Posts Grid */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Search results count */}
              {isSearchActive && !isLoading && (
                <p className="text-sm text-muted-foreground mb-6">
                  {filteredPosts.length} {t.blog?.resultsFound || 'results found'}
                  {searchTerm && ` "${searchTerm}"`}
                </p>
              )}

              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl border bg-card animate-pulse">
                      <div className="aspect-video bg-muted rounded-t-xl" />
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-muted rounded w-24" />
                        <div className="h-6 bg-muted rounded w-full" />
                        <div className="h-4 bg-muted rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                  {isSearchActive ? (
                    <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  ) : (
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  )}
                  <h2 className="text-xl font-semibold mb-2">
                    {isSearchActive
                      ? (t.blog?.noSearchResults || 'No articles found')
                      : (t.blog?.noPosts || 'No posts yet')}
                  </h2>
                  <p className="text-muted-foreground">
                    {isSearchActive
                      ? (t.blog?.noSearchResultsDesc || 'Try a different search term or clear the search.')
                      : selectedCategory
                        ? (t.blog?.noPostsCat || 'No posts in this category yet. Check back soon!')
                        : (t.blog?.noPostsGeneral || 'Blog posts are coming soon. Check back shortly!')}
                  </p>
                  {isSearchActive && (
                    <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                      {t.blog?.clearSearch || 'Clear Search'}
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                      >
                        <Link to={lang === 'en' ? `/blog/${post.slug}` : `/${lang}/blog/${post.slug}`} className="block">
                          {/* Featured Image */}
                          <div className="aspect-video relative overflow-hidden bg-muted">
                            {post.featured_image_url ? (
                              <img
                                src={post.featured_image_url}
                                alt={post.featured_image_alt || post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                <BookOpen className="h-12 w-12 text-primary/30" />
                              </div>
                            )}
                            <Badge
                              className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}
                              variant="outline"
                            >
                              {getCategoryDisplay(post.category)}
                            </Badge>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h2 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <time dateTime={post.published_at || ''}>
                                {post.published_at && format(new Date(post.published_at), 'MMM d, yyyy')}
                              </time>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.read_time_minutes} {t.blog?.minRead || 'min read'}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>

                  {/* Pagination - hidden when search is active */}
                  {!isSearchActive && data && data.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        {t.blog?.previous || 'Previous'}
                      </Button>
                      <span className="text-sm text-muted-foreground px-4">
                        {t.blog?.page || 'Page'} {page} {t.blog?.of || 'of'} {data.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                        disabled={page === data.totalPages}
                      >
                        {t.blog?.next || 'Next'}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
