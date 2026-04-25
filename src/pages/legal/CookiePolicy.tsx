import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/seo";
import { APP_CONFIG } from "@/config/app";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function CookiePolicy() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      const stored = localStorage.getItem('theme');
      if (stored === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (stored === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', isDark);
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <SEOHead
        title="Cookie Policy"
        description="Understand how Reviuzy uses cookies and similar technologies to improve your experience on our platform."
        canonicalUrl={`${APP_CONFIG.url}/cookies`}
        noindex={false}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 pt-28">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: February 4, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work efficiently, provide information to website owners, and improve user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Reviuzy uses cookies and similar technologies (such as local storage) to operate our platform, remember your preferences, and analyze how our Service is used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium mb-3">Essential Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>User authentication and session management</li>
                <li>Security features and fraud prevention</li>
                <li>Load balancing and server routing</li>
                <li>Remembering items in your shopping cart (if applicable)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Duration:</strong> Session cookies (deleted when you close your browser) and persistent cookies (up to 1 year)
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">Preference Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These cookies remember your settings and preferences to provide a personalized experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Language and region preferences</li>
                <li>Theme settings (dark/light mode)</li>
                <li>Dashboard layout preferences</li>
                <li>Previously selected options</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Duration:</strong> Up to 1 year
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">Analytics Cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These cookies help us understand how visitors interact with our website:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Pages visited and time spent on each page</li>
                <li>Features used and interactions made</li>
                <li>Error reports and performance metrics</li>
                <li>Traffic sources and user demographics (anonymized)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Duration:</strong> Up to 2 years
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-foreground">Supabase</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Used for authentication and session management. Stores session tokens to keep you logged in.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-foreground">Stripe</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Used for payment processing. May set cookies for fraud prevention and secure transactions.
                  </p>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-foreground">Google</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Used for Google Business Profile integration and OAuth authentication. May set cookies when you connect your Google account.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Local Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                In addition to cookies, we use browser local storage to store:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>Your theme preference (dark/light mode)</li>
                <li>Temporary application state</li>
                <li>Cache data for improved performance</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Local storage data remains until you clear your browser data or our application removes it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. How to Manage Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can control and manage cookies through your browser settings. Here's how to do it in popular browsers:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-foreground">Google Chrome</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Settings → Privacy and security → Cookies and other site data
                  </p>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-foreground">Mozilla Firefox</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Settings → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-foreground">Safari</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-foreground">Microsoft Edge</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Settings → Cookies and site permissions → Manage and delete cookies and site data
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you choose to disable cookies, please be aware that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You may not be able to log in or use authenticated features</li>
                <li>Your preferences and settings may not be saved</li>
                <li>Some features may not function correctly</li>
                <li>You may see a degraded user experience</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Essential cookies cannot be disabled as they are required for the basic operation of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Do Not Track</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some browsers include a "Do Not Track" (DNT) feature that signals websites not to track user activity. We currently do not respond to DNT signals as there is no industry-standard interpretation. However, you can control tracking through the cookie management options described above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will post any updates on this page with a revised "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <p className="text-foreground font-medium">Reviuzy</p>
                <p className="text-muted-foreground">Email: support@reviuzy.com (Subject: Legal/Privacy)</p>
                <p className="text-muted-foreground">Website: www.reviuzy.com</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© {currentYear} {APP_CONFIG.name}. All rights reserved.</p>
          </div>
        </div>

        {/* Landing Chat Widget */}
        <LandingChatWidget />
        <Footer />
      </div>
    </>
  );
}
