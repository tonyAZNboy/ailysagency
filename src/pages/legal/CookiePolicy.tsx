import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/seo";
import { APP_CONFIG } from "@/config/app";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

/**
 * Cookie Policy for AiLys Agency.
 *
 * Aligned with the two-button consent flow ("Accept all" / "Necessary
 * only") shipped in CookieConsentBanner.tsx on 2026-04-27. Loi 25 + GDPR
 * symmetry: both buttons are visually equivalent, no dark patterns, the
 * default state is no tracking until consent is given.
 */

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      const stored = localStorage.getItem("theme");
      if (stored === "light") {
        document.documentElement.classList.remove("dark");
      } else if (stored === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", isDark);
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHead
        title="Cookie Policy"
        description="How AiLys Agency uses cookies and similar technologies on ailysagency.ca."
        canonicalUrl={`${APP_CONFIG.url}/cookies`}
        noindex={false}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 pt-28">
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: April 27, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Cookies Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. We also use comparable browser technologies (localStorage, sessionStorage). Both are covered by this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Our Two-Choice Consent Flow</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When you first visit ailysagency.ca you see a banner with two equally prominent buttons:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li><strong>Accept all:</strong> functional cookies, analytics cookies, and marketing pixels are loaded</li>
                <li><strong>Necessary only:</strong> only the cookies strictly required to make the site work are loaded; no analytics, no marketing pixels</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Both buttons have the same size, weight, and placement, per Loi 25 (Quebec) and GDPR Article 7 symmetry rules. There is no "Customize" panel because the binary choice is granular enough for the cookie categories we use; this page is the per-category breakdown for users who want one. You can change your decision at any time by clearing your site cookies in your browser, which makes the banner reappear.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Categories of Cookies We Use</h2>

              <h3 className="text-xl font-medium mb-3">3a. Necessary cookies (always on)</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Required for the site to work. Cannot be disabled.
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li><strong>Language preference</strong> (localStorage): remembers the language you picked (16 supported)</li>
                <li><strong>Theme preference</strong> (localStorage): remembers dark/light mode</li>
                <li><strong>Consent decision</strong> (localStorage): remembers what you chose so the banner does not reappear on every page</li>
                <li><strong>Cloudflare security</strong> (cookies): bot mitigation and rate limiting on the edge</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">3b. Analytics cookies (loaded only on "Accept all")</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Help us understand how the site is used so we can improve it. Aggregated, no per-user profiling.
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Page views, scroll depth, time on page, referrer, device type, browser</li>
                <li>Conversion events: AI Visibility Audit submitted, contact form submitted</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">3c. Marketing pixels (loaded only on "Accept all")</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Let us show relevant ads on third-party platforms and measure campaign performance.
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li><strong>Meta (Facebook and Instagram) Pixel:</strong> conversion tracking and retargeting</li>
                <li><strong>LinkedIn Insight Tag:</strong> conversion tracking and B2B retargeting</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not load Google Analytics, TikTok, X, or any other tracker not listed above. We never load marketing pixels until you have explicitly accepted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services That Set Cookies</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border/40 bg-card/30">
                  <p className="text-foreground font-medium">Cloudflare</p>
                  <p className="text-muted-foreground text-sm">DNS, CDN, and bot mitigation. Sets necessary cookies for security and routing.</p>
                </div>
                <div className="p-4 rounded-lg border border-border/40 bg-card/30">
                  <p className="text-foreground font-medium">Supabase</p>
                  <p className="text-muted-foreground text-sm">Authentication and database. Sets a session cookie when you log into a client portal.</p>
                </div>
                <div className="p-4 rounded-lg border border-border/40 bg-card/30">
                  <p className="text-foreground font-medium">Stripe</p>
                  <p className="text-muted-foreground text-sm">Payment processing. May set fraud-prevention cookies on checkout pages only.</p>
                </div>
                <div className="p-4 rounded-lg border border-border/40 bg-card/30">
                  <p className="text-foreground font-medium">Meta and LinkedIn</p>
                  <p className="text-muted-foreground text-sm">Marketing pixels. Only loaded after "Accept all". See their respective privacy and cookie pages for the full list of cookies they set.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. How to Manage Your Choice</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You can change your consent or delete cookies at any time:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Clear cookies for ailysagency.ca in your browser; the consent banner will reappear on your next visit</li>
                <li>Use your browser's privacy settings to block third-party cookies entirely</li>
                <li>Email <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a> to ask for a record of any consent decision we have logged</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Do Not Track</h2>
              <p className="text-muted-foreground leading-relaxed">
                Browser "Do Not Track" signals are not consistently interpreted across the web. We rely instead on the explicit two-button consent flow described in section 2. If your browser sends Global Privacy Control (GPC), we treat it as a request to default to "Necessary only" until you explicitly opt in.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We update this Cookie Policy when the technologies on the site change. Material changes are reflected in the "Last updated" date and, where required, by re-prompting your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about cookies or to exercise the privacy rights described in our <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>:
              </p>
              <div className="mt-3 p-4 rounded-lg border border-border/40 bg-card/30">
                <p className="text-foreground font-medium">AiLys Agency</p>
                <p className="text-muted-foreground text-sm">Montreal, Quebec, Canada</p>
                <p className="text-muted-foreground text-sm">
                  Email: <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a>
                </p>
              </div>
            </section>

            <p className="text-xs text-muted-foreground/60 pt-8 border-t border-border/30">
              © {currentYear} AiLys Agency. All rights reserved.
            </p>
          </div>
        </div>
        <Footer />
      </div>
      <LandingChatWidget />
    </>
  );
}
