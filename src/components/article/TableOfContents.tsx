import { useEffect, useMemo, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Slugify text for anchor IDs. Same algorithm we use to inject IDs into rendered headings. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Parse markdown source for H2 and H3 headings.
 * Returns a TOC with stable slug IDs.
 */
export function parseHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)$/);
    const m3 = line.match(/^###\s+(.+)$/);
    if (m2) {
      const text = m2[1].trim();
      headings.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (m3) {
      const text = m3[1].trim();
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }
  return headings;
}

interface TableOfContentsProps {
  source: string;
  className?: string;
}

/**
 * Sticky sidebar table of contents. Highlights the current section as
 * the user scrolls. Smooth-scrolls to the section on click.
 */
export function TableOfContents({ source, className }: TableOfContentsProps) {
  const headings = useMemo(() => parseHeadings(source), [source]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    // Inject IDs into the rendered article headings (ReactMarkdown does not by default)
    const article = document.querySelector("article.prose");
    if (article) {
      const renderedHeadings = article.querySelectorAll("h2, h3");
      const allHeadingTexts = headings.map((h) => h.text);
      renderedHeadings.forEach((el) => {
        const text = el.textContent ?? "";
        const match = allHeadingTexts.find((t) => t === text);
        if (match && !el.id) el.id = slugifyHeading(match);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      className={`hidden xl:block ${className ?? ""}`}
      aria-label="Table of contents"
    >
      <div className="lg:sticky lg:top-28">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-4 h-4 text-primary" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
            On this page
          </span>
        </div>
        <ul className="space-y-1.5 text-sm border-l border-border/40 pl-4">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li
                key={h.id}
                className={h.level === 3 ? "pl-3" : ""}
                style={{
                  borderLeft: isActive
                    ? "2px solid hsl(var(--primary))"
                    : "2px solid transparent",
                  marginLeft: isActive ? "-17px" : "-17px",
                  paddingLeft: isActive ? "15px" : "15px",
                }}
              >
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(h.id);
                    if (el) {
                      window.scrollTo({
                        top: el.offsetTop - 100,
                        behavior: "smooth",
                      });
                      history.replaceState(null, "", `#${h.id}`);
                    }
                  }}
                  className={`block py-1 leading-snug transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  } ${h.level === 3 ? "text-xs" : ""}`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
