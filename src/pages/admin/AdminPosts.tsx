import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Database, Loader2 } from "lucide-react";
import { BLOG_POSTS as blogPosts } from "@/blog/registry";

interface PostStat {
  slug: string;
  views: number;
  reads: number;
}

export default function AdminPosts() {
  const [stats, setStats] = useState<PostStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error: dbError } = await supabase
          .from("blog_post_events")
          .select("slug, event")
          .limit(5000);
        if (!mounted) return;
        if (dbError) {
          setError(dbError.message);
        } else {
          const counts = new Map<string, { views: number; reads: number }>();
          for (const row of data ?? []) {
            const r = row as { slug: string; event: string };
            const cur = counts.get(r.slug) ?? { views: 0, reads: 0 };
            if (r.event === "view") cur.views++;
            if (r.event === "read_complete") cur.reads++;
            counts.set(r.slug, cur);
          }
          setStats(
            blogPosts.map((p) => ({
              slug: p.slug,
              views: counts.get(p.slug)?.views ?? 0,
              reads: counts.get(p.slug)?.reads ?? 0,
            })),
          );
        }
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        setError(String(err));
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <header className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
          Admin / posts
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-2">
          Blog post performance
        </h1>
        <p className="text-sm text-muted-foreground">
          Views and read-completion events per post. Track which topics resonate.
        </p>
      </header>

      {loading ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading post stats...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.05] p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">
              blog_post_events table not found
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Apply migration 0001 to provision the events table. Until then, the
            blog index lists below show 0 events but the post list itself is correct.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md overflow-hidden">
          {stats.length === 0 ? (
            <div className="p-10 text-center">
              <Database className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
              <p className="font-display text-2xl italic text-muted-foreground">
                No posts in the registry yet.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card/40">
                  <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">Post</th>
                  <th className="text-right px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">Views</th>
                  <th className="text-right px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">Reads</th>
                  <th className="text-right px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">Read-rate</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => {
                  const post = blogPosts.find((p) => p.slug === s.slug);
                  if (!post) return null;
                  const readRate = s.views > 0 ? (s.reads / s.views) * 100 : 0;
                  return (
                    <tr key={s.slug} className="border-t border-border/30 hover:bg-card/30 transition-colors">
                      <td className="px-4 py-3">
                        <a
                          href={`/blog/${s.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {post.title}
                        </a>
                        <div className="text-xs text-muted-foreground/60 mt-0.5">
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums">{s.views}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums">{s.reads}</td>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-muted-foreground">
                        {readRate.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
