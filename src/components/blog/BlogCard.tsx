import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_META, type BlogPost } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  langPrefix?: string;
}

export function BlogCard({ post, className, langPrefix = "" }: BlogCardProps) {
  const meta = CATEGORY_META[post.category];
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      to={`${langPrefix}/blog/${post.slug}`}
      className={cn(
        "group block rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-md",
        "transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_8px_40px_-10px_rgba(34,211,238,0.25)]",
        className,
      )}
    >
      {/* Gradient header strip */}
      <div
        className={`h-32 w-full bg-gradient-to-br ${meta.tone} relative overflow-hidden`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4' /></svg>\")",
          }}
        />
        <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm">
          {meta.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
          <time dateTime={post.publishedAt} className="font-mono">
            {formattedDate}
          </time>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <span className="inline-flex items-center gap-1 font-mono">
            <Clock className="h-3 w-3" />
            {post.readingTimeMin} min
          </span>
        </div>
      </div>
    </Link>
  );
}
