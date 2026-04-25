import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts, CATEGORY_META, type BlogCategory, type BlogPost } from "@/data/blog-posts";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";

/** Apply current-language i18n overrides to a blog post (title, excerpt). Falls back to EN. */
function localizePost(post: BlogPost, lang: string): BlogPost {
  if (lang === "en" || !post.i18n?.[lang]) return post;
  const t = post.i18n[lang];
  return {
    ...post,
    title: t.title ?? post.title,
    excerpt: t.excerpt ?? post.excerpt,
    content: t.content ?? post.content,
  };
}

const POSTS_PER_PAGE = 12;

export default function Blog() {
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { lang, setLang } = useLang();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");
  const [page, setPage] = useState(1);

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

  // Auto-reveal posts as their publishedAt timestamp arrives, localized to current language
  const visiblePosts = useMemo(() => {
    const now = Date.now();
    return blogPosts
      .filter((p) => new Date(p.publishedAt).getTime() <= now)
      .map((p) => localizePost(p, lang))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  }, [lang]);

  const filtered = useMemo(() => {
    return visiblePosts.filter((post) => {
      if (activeCategory !== "all" && post.category !== activeCategory) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [visiblePosts, activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const categories: { id: "all" | BlogCategory; label: string }[] = [
    { id: "all", label: "All posts" },
    ...(Object.keys(CATEGORY_META) as BlogCategory[]).map((id) => ({
      id,
      label: CATEGORY_META[id].label,
    })),
  ];

  return (
    <>
      <Helmet>
        <title>Journal · AiLys Agency · LLM visibility, AEO, GEO, E-E-A-T</title>
        <meta
          name="description"
          content="What people are asking ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot, and voice assistants about local businesses. New posts every 3 days. By AiLys Agency, Quebec."
        />
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#22D3EE"
        lineColor="#A78BFA"
        nodeCount={28}
        mobileNodeCount={16}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.15}
      />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="pt-28 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <header className="mb-14 lg:mb-20 max-w-4xl">
              <div className="ailys-section-no mb-6">
                <span>Journal</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
                What people ask
                <br />
                <span className="italic bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  the search engines.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-prose">
                Field notes from inside the AI search shift. Voice assistants,
                Google Maps, Bing Copilot, ChatGPT, Perplexity, Claude, Gemini.
                A new post every 3 days, written for local business owners.
              </p>
            </header>

            <div className="mb-10 space-y-5">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search posts, tags, topics..."
                  className="pl-11 h-12 bg-card/40 border-border/50 backdrop-blur-md focus-visible:ring-primary/50"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCategory(c.id);
                      setPage(1);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] border transition-all ${
                      activeCategory === c.id
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card/30 border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {paged.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                {paged.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md p-12 text-center">
                <p className="font-display text-2xl italic text-muted-foreground mb-2">
                  Nothing here yet for that filter.
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Try another category or clear your search.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-full border border-border/50 disabled:opacity-30 hover:border-primary/40 transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-full border border-border/50 disabled:opacity-30 hover:border-primary/40 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}

            <div className="mt-20 max-w-2xl mx-auto text-center">
              <div className="ailys-gold-thread w-24 mx-auto mb-5" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">
                Cadence
              </p>
              <p className="text-base text-foreground/85">
                One new post every 3 days. Subscribe via the audit form to get
                them in your inbox.
              </p>
            </div>
          </div>
        </main>

        <Footer />
        <LandingChatWidget />
      </div>
    </>
  );
}
