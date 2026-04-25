import { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar, User, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts, CATEGORY_META } from "@/data/blog-posts";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";

export default function BlogPost() {
  const { slug, lang: urlLang } = useParams<{ slug: string; lang?: string }>();
  const { setLang } = useLang();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as SupportedLang)) {
      setLang(urlLang as SupportedLang);
    }
  }, [urlLang, setLang]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => root.removeAttribute("data-force-dark");
  }, []);

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  // 3 most recent other posts in the same category, then fill from latest
  const related = useMemo(() => {
    if (!post) return [];
    const now = Date.now();
    const others = blogPosts
      .filter(
        (p) => p.slug !== post.slug && new Date(p.publishedAt).getTime() <= now,
      )
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    const sameCat = others.filter((p) => p.category === post.category);
    const rest = others.filter((p) => p.category !== post.category);
    return [...sameCat, ...rest].slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-5xl mb-3">Post not found</h1>
            <p className="text-muted-foreground mb-6">
              That URL does not match any post in our journal.
            </p>
            <Button onClick={() => navigate("/blog")}>Back to Journal</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const meta = CATEGORY_META[post.category];
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>{post.title} · AiLys Agency Journal</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: { "@type": "Organization", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "AiLys Agency",
              logo: {
                "@type": "ImageObject",
                url: "https://www.ailysagency.ca/ailys-logo.svg",
              },
            },
            mainEntityOfPage: `https://www.ailysagency.ca/blog/${post.slug}`,
            keywords: post.tags.join(", "),
            articleSection: meta.label,
          })}
        </script>
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={20}
        mobileNodeCount={12}
        connectionDistance={140}
        mouseInfluenceRadius={180}
        mouseInfluenceStrength={0.12}
      />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <article className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Journal
            </Link>

            {/* Category strip */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-white bg-gradient-to-r ${meta.tone}`}
              >
                {meta.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                Field note
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-5">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-8 mb-10 border-b border-border/40 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.readingTimeMin} min read
              </span>
            </div>

            {/* Body */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/85 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-li:text-foreground/85">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border/40">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full border border-border/50 bg-card/30 text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA panel */}
            <div className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-md p-6 sm:p-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/90 mb-2">
                Want this kind of analysis for your business?
              </div>
              <h3 className="font-display text-2xl sm:text-3xl mb-3">
                Run the free AI Visibility Audit.
              </h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-prose">
                We pull your business through 6 AI search engines, score your
                AEO, GEO, and E-E-A-T signals, and send a 90-day plan within 24
                hours.
              </p>
              <Button
                onClick={() => navigate("/audit")}
                className="rounded-full font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  boxShadow: "0 0 24px -8px hsl(var(--primary) / 0.5)",
                }}
              >
                Run my AI Visibility Audit
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </article>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="max-w-7xl mx-auto mt-20">
              <div className="ailys-section-no mb-6">
                <span>More from the journal</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
