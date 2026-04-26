import { Twitter, Linkedin, Link2, Mail, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

/**
 * Social share buttons. Twitter, LinkedIn, copy link, email.
 * Honest no-Pinterest-no-FB-tracking version.
 */
export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mr-1">
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-xs hover:border-primary/40 hover:text-primary transition-colors"
      >
        <Twitter className="w-3.5 h-3.5" />
        Twitter
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-xs hover:border-primary/40 hover:text-primary transition-colors"
      >
        <Linkedin className="w-3.5 h-3.5" />
        LinkedIn
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-xs hover:border-primary/40 hover:text-primary transition-colors"
      >
        <Mail className="w-3.5 h-3.5" />
        Email
      </a>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-xs hover:border-primary/40 hover:text-primary transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Copied
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
