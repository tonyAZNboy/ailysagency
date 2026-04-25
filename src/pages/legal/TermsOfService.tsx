import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/seo";
import { APP_CONFIG } from "@/config/app";
import { LandingChatWidget } from "@/components/landing/LandingChatWidget";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function TermsOfService() {
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
        title="Terms of Service"
        description="Read the terms and conditions for using Reviuzy's review management and social media automation platform."
        canonicalUrl={`${APP_CONFIG.url}/terms`}
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
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: February 4, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using Reviuzy ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Reviuzy is an AI-powered review management and social media automation platform designed for local businesses. Our Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>NFC and QR code review collection</li>
                <li>AI-generated review responses</li>
                <li>Google Business Profile integration</li>
                <li>Social media content scheduling and automation</li>
                <li>Domain speed optimization and protection</li>
                <li>Analytics and reporting tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Be at least 18 years of age</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payment</h2>
              
              <h3 className="text-xl font-medium mb-3">Free Trial</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer a 3-day free trial for new users. A valid credit card is required to start the trial. At the end of the trial period, you will be automatically charged for your selected plan unless you cancel before the trial ends. You may cancel at any time.
              </p>

              <h3 className="text-xl font-medium mb-3">Subscription Plans</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our subscription plans are billed monthly or annually. Prices are listed in USD and are subject to change with 30 days' notice. Current pricing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Starter Plan: $20/month (additional locations: $15/month each)</li>
                <li>Pro Plan: $35/month (additional locations: $20/month each)</li>
                <li>Additional domains: $5/month each</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">Payment Processing</h3>
              <p className="text-muted-foreground leading-relaxed">
                All payments are processed securely through Stripe. By providing payment information, you authorize us to charge the applicable fees. Subscriptions automatically renew unless cancelled before the renewal date.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">Refunds</h3>
              <p className="text-muted-foreground leading-relaxed">
                We do not offer refunds for partial subscription periods. If you cancel your subscription, you will retain access until the end of your current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the Service in compliance with all applicable laws</li>
                <li>Not use the Service for fraudulent or deceptive purposes</li>
                <li>Not generate fake reviews or manipulate review content dishonestly</li>
                <li>Respect the terms of connected third-party platforms (Google, social media)</li>
                <li>Not interfere with or disrupt the Service or servers</li>
                <li>Not attempt to gain unauthorized access to any part of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by Reviuzy and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of content you create or upload. By using the Service, you grant us a license to use, store, and process your content as necessary to provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use the Service to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malware, viruses, or harmful code</li>
                <li>Spam, harass, or abuse other users</li>
                <li>Collect user information without consent</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Engage in activities that could damage our reputation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Integrations</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service integrates with third-party platforms including Google Business Profile, social media networks, and payment processors. Your use of these integrations is subject to the respective platform's terms of service. We are not responsible for the actions, content, or policies of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. AI-Generated Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service uses AI to generate review responses and content suggestions. While we strive for accuracy and quality, AI-generated content may contain errors or inaccuracies. You are responsible for reviewing and approving all content before publication. We are not liable for any consequences arising from the use of AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, REVIUZY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, RESULTING FROM YOUR ACCESS TO OR USE OF THE SERVICE.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT DEFECTS WILL BE CORRECTED.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify and hold harmless Reviuzy and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Upon termination, your right to use the Service will cease immediately. Provisions that by their nature should survive termination will survive, including ownership, warranty disclaimers, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Reviuzy operates, without regard to conflict of law principles. Any disputes shall be resolved in the competent courts of that jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these Terms of Service, please contact us at:
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
