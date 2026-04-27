import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/seo";
import { APP_CONFIG } from "@/config/app";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

/**
 * Privacy Policy for AiLys Agency.
 *
 * AiLys Agency is a Quebec-based AI search reputation consulting agency.
 * Personal data handling is governed by Loi 25 (Quebec), PIPEDA (Canada
 * federal), and where applicable GDPR (EU/UK) and CCPA (California).
 *
 * This policy covers: the marketing website (ailysagency.ca), the free
 * AI Visibility Audit, consulting engagements, and the optional Reviuzy
 * reputation system add-on (delivered through the sister product
 * Reviuzy SaaS, which has its own separate privacy policy).
 */

export default function PrivacyPolicy() {
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
        title="Privacy Policy"
        description="How AiLys Agency collects, uses, and protects your personal information under Loi 25, PIPEDA, GDPR, and CCPA."
        canonicalUrl={`${APP_CONFIG.url}/privacy`}
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
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: April 27, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                AiLys Agency ("AiLys", "we", "us", "our") is a Quebec-based consulting agency that helps local businesses and brands get cited inside answers from ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and Bing Copilot. This Privacy Policy explains how we collect, use, share, and protect personal information across the marketing website at <strong>ailysagency.ca</strong>, the free AI Visibility Audit, our consulting engagements, and the optional Reviuzy reputation system add-on. The Reviuzy SaaS platform itself is a separate product with its own privacy policy at reviuzy.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. What Data We Collect</h2>

              <h3 className="text-xl font-medium mb-3">From the website and the audit</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Business name, website URL, and business category that you submit to the AI Visibility Audit form</li>
                <li>Your name, email, and (optional) phone, when you contact us or apply to the Founding Clients program</li>
                <li>Technical data: IP address, user agent, referrer, pages viewed, language, and approximate location at the city level (from your IP)</li>
                <li>Cookie and consent data (see our <Link to="/cookies" className="text-primary underline">Cookie Policy</Link>)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">During a consulting engagement</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Business profile data (NAP: name, address, phone), hours, categories, photos, services list</li>
                <li>Access tokens or login credentials you grant us for Google Business Profile, your website CMS or hosting, and other connected accounts (stored encrypted, used only to perform the work)</li>
                <li>Schema, content drafts, citation submissions, and the reports we produce on your behalf</li>
                <li>Billing and tax information required to issue invoices and collect payment (processed by Stripe; we do not store full card numbers)</li>
                <li>Communications with our team (email threads, kickoff documents, Slack or chat history if you opt into a shared channel)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">From the Reviuzy add-on (optional)</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you activate the Reviuzy reputation system, the data flow is described in the Reviuzy SaaS privacy policy. Typical data includes: review platform tokens, review content, customer-facing reply drafts, and review-trend metrics. AiLys Agency receives only aggregated reporting; raw review data is held by Reviuzy SaaS under its own retention rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Why We Collect It (Legal Basis)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We process personal data on the following legal bases under Loi 25, PIPEDA, and GDPR Article 6:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li><strong>Performance of a contract:</strong> to deliver the consulting work you signed up for (audit, schema, citations, content, reporting)</li>
                <li><strong>Legitimate interest:</strong> to operate, secure, and improve the website; to send you transactional updates about an active engagement; to keep aggregated, anonymized benchmarks</li>
                <li><strong>Consent:</strong> for analytics cookies, marketing pixels (Meta, LinkedIn), email marketing newsletters, and any case study publication</li>
                <li><strong>Legal obligation:</strong> to keep tax records (Quebec/Canada accounting), to respond to lawful requests, and to comply with anti-fraud rules</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How We Use It</h2>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>To run the free AI Visibility Audit and email you the result</li>
                <li>To onboard you, perform the technical SEO, AEO schema, GEO entity, citation, and content work</li>
                <li>To operate the AiLys engine: generate schema drafts, content briefs, review reply drafts, and AI Visibility scoring (every AI-assisted output is reviewed by a human strategist before delivery)</li>
                <li>To produce monthly reporting (Share of Model, AI Visibility, AI Traffic, citation count) and dashboards</li>
                <li>To send invoices, collect payments, and meet our tax and accounting obligations</li>
                <li>To answer support questions and improve our methodology</li>
                <li>To run aggregated, anonymized benchmarks and (with your written consent) published case studies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Who We Share It With</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We share personal data only with vendors that are necessary to deliver the service. Each vendor is bound by a data processing agreement and is permitted to use the data only on our instructions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li><strong>Supabase</strong> (database, authentication, storage) for the AI Visibility Audit, the admin center, and engagement data</li>
                <li><strong>Cloudflare</strong> (DNS, CDN, Pages hosting) for the marketing website and edge functions</li>
                <li><strong>Stripe</strong> for payment processing</li>
                <li><strong>Anthropic</strong> (Claude API) and other AI engine vendors used by the AiLys engine for AI-assisted output generation</li>
                <li><strong>Google</strong> (Google Business Profile API, OAuth) when you grant us access to your business profile</li>
                <li><strong>Email and analytics</strong> tools (transactional email vendor, web analytics) where strictly needed</li>
                <li><strong>Meta and LinkedIn</strong> advertising pixels, only when you have consented to marketing cookies</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not sell personal data. We do not share customer lists with other agencies or with third parties for their own marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Where Data Lives</h2>
              <p className="text-muted-foreground leading-relaxed">
                Most data is stored in Canadian or US-region cloud infrastructure (Supabase, Cloudflare, Stripe). Some processors (Anthropic, Meta, LinkedIn, Google) may process data in the United States or other jurisdictions. We rely on standard contractual clauses, adequacy decisions, and processor security commitments for cross-border transfers, as required by Loi 25 section 17 and GDPR Chapter V.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. How Long We Keep It</h2>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li><strong>AI Visibility Audit submissions:</strong> 24 months, then deleted or anonymized</li>
                <li><strong>Active engagement data:</strong> for the lifetime of the engagement and 24 months after cancellation, so we can respond to disputes and reproduce historical reports</li>
                <li><strong>Connected account access tokens:</strong> revoked within 7 days of the engagement ending</li>
                <li><strong>Invoices and tax records:</strong> 7 years (Quebec and Canadian accounting requirement)</li>
                <li><strong>Aggregated, anonymized benchmarks:</strong> retained indefinitely, with no individual identifiability</li>
                <li><strong>Marketing consent records:</strong> 36 months, or until you withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Under Loi 25, PIPEDA, GDPR, and CCPA you have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
                <li>Access the personal data we hold about you and receive a copy</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your data when it is no longer needed for the purpose collected (the right to be forgotten)</li>
                <li>Withdraw consent for analytics, marketing, or any other consent-based processing at any time</li>
                <li>Object to processing based on legitimate interest</li>
                <li>Data portability: receive your data in a structured, machine-readable format</li>
                <li>Lodge a complaint with the Commission d'accès à l'information du Quebec, the Office of the Privacy Commissioner of Canada, or your local data protection authority</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, email us at <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a> with the subject "Privacy request". We respond within 30 days (Loi 25 statutory deadline).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We follow gov-grade security practices on every feature: row-level security on all multi-tenant tables, hashed (never raw) ingest tokens, sliding-window rate limits on every public endpoint, encrypted access tokens, audit logs on every privileged action, and an admin center where every action is logged and reversible. We follow the principle of least privilege and review access quarterly. No system is perfectly secure; if a breach affects your data, we notify you and the relevant authorities within the deadlines required by Loi 25 and PIPEDA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Children</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is built for businesses and is not directed at children under 14. We do not knowingly collect personal data from minors. If you believe a minor has submitted data, contact us and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We update this Privacy Policy when our service or the law changes. Material changes are communicated by email at least 30 days before they take effect, and we update the "Last updated" date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact and Privacy Officer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Loi 25 requires us to designate a person responsible for the protection of personal information. For any privacy question, request, or complaint:
              </p>
              <div className="mt-3 p-4 rounded-lg border border-border/40 bg-card/30">
                <p className="text-foreground font-medium">AiLys Agency, Privacy Officer</p>
                <p className="text-muted-foreground text-sm">Montreal, Quebec, Canada</p>
                <p className="text-muted-foreground text-sm">
                  Email: <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a> (subject: "Privacy")
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
