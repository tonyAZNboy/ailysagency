import { Link, useLocation } from "react-router-dom";
import { APP_CONFIG } from "@/config/app";
import { useLang } from "@/i18n/LangContext";
import { FleurDeLys } from "@/components/brand/FleurDeLys";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const { t } = useLang();
  const isLandingPage =
    location.pathname === "/" || /^\/[a-z]{2}$/.test(location.pathname);

  const services = [
    { label: t.nav.features, href: "#services" },
    { label: t.nav.howItWorks, href: "#process" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.footer?.about ?? "About", href: "#about" },
    { label: "Industries", href: "/industries" },
  ];

  const company = [
    { label: t.nav.blog, href: "/blog" },
    { label: t.footerExt.helpCenter, href: "/help" },
    { label: t.footerExt.bookCall, href: "/book-call" },
    { label: t.footerExt.auditLink, href: "/audit" },
    { label: t.footerExt.gbpPulse, href: "/audit/gbp" },
    { label: t.footer?.contact ?? "Contact", href: `mailto:${APP_CONFIG.email}` },
  ];

  const legal = [
    { label: t.footer?.privacy ?? "Privacy", href: "/privacy" },
    { label: t.footer?.terms ?? "Terms", href: "/terms" },
    { label: t.footer?.cookies ?? "Cookies", href: "/cookies" },
  ];

  const handleProductLink = (href: string) => {
    if (isLandingPage) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <footer
      className="relative pt-20 pb-10 px-4 border-t border-border/40 overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      {/* Editorial filing-card top strip */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Big editorial wordmark + manifesto pull */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16 pb-12 border-b border-border/30">
          <div className="lg:col-span-7" itemScope itemType="https://schema.org/Organization">
            <div className="flex items-center gap-3 mb-6">
              <FleurDeLys size={36} fill="gradient" />
              <div>
                <div className="font-display text-3xl tracking-tight" itemProp="name">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Ai
                  </span>
                  <span className="text-foreground">Lys</span>
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 align-middle">
                    {t.footerExt.agencyBadge}
                  </span>
                </div>
              </div>
            </div>
            <p
              className="text-base text-muted-foreground leading-relaxed max-w-xl mb-5"
              itemProp="description"
            >
              {APP_CONFIG.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/60">
              <span>{t.footerExt.locationLine}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>{t.footerExt.bilingualLine}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <a
                href={`mailto:${APP_CONFIG.email}`}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {APP_CONFIG.email}
              </a>
            </div>
            <meta itemProp="url" content={APP_CONFIG.url} />
            <meta itemProp="email" content={APP_CONFIG.email} />
          </div>

          {/* Sister product cross-link */}
          <div className="lg:col-span-5 lg:col-start-9">
            <div className="ailys-section-no mb-4">
              <span>{t.footerExt.sisterProduct}</span>
            </div>
            <a
              href="https://www.reviuzy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-2xl mb-1.5">
                    Reviuzy
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 ml-2 align-middle">
                      {t.footerExt.reviuzyBadge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug max-w-xs">
                    {t.footerExt.reviuzyTagline}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </div>
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <FooterColumn label={t.footerExt.colServices}>
            {services.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleProductLink(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn label={t.footerExt.colCompany}>
            {company.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </FooterColumn>

          <FooterColumn label={t.footerExt.colLegal}>
            {legal.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn label={t.footerExt.colTrackedEngines}>
            <li className="text-sm text-muted-foreground">ChatGPT</li>
            <li className="text-sm text-muted-foreground">Perplexity</li>
            <li className="text-sm text-muted-foreground">Claude</li>
            <li className="text-sm text-muted-foreground">Gemini</li>
            <li className="text-sm text-muted-foreground">Google AIO</li>
            <li className="text-sm text-muted-foreground">Bing Copilot</li>
          </FooterColumn>
        </div>

        {/* Quebec gold thread */}
        <div className="ailys-gold-thread mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="font-mono text-xs text-muted-foreground/70 tracking-wide">
            © {currentYear} AiLys Agency. {t.footer?.copyright ?? "All rights reserved."}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            {t.footerExt.versionLine}
          </p>
        </div>
      </div>
      <div className="sr-only" aria-hidden="false">{t.footerExt.srSeo}</div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={`${label} navigation`}>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-4">
        {label}
      </h4>
      <ul className="space-y-2.5 list-none p-0 m-0">{children}</ul>
    </nav>
  );
}
