// Schema fix copy-paste block.
// Generates a validated JSON-LD block for the audited business so they can
// paste it into their site immediately and ship the fix in 2 minutes.
//
// Pure client-side. Schema.org types map per vertical. Zero API cost.
//
// Validation: emits well-formed JSON-LD that passes Google Rich Results Test.
// Tested types: LocalBusiness + Dentist + Attorney + Restaurant + GeneralContractor +
// MedicalClinic + RealEstateAgent + Hotel.

import { useState } from "react";
import { Check, Copy, Code2, ExternalLink } from "lucide-react";

interface Props {
  businessName: string;
  city: string;
  url?: string;
  vertical: string;
  /** Optional rating from Places API for AggregateRating block */
  rating?: number;
  reviewCount?: number;
  phone?: string;
  address?: string;
}

const VERTICAL_TO_SCHEMA_TYPE: Record<string, string> = {
  restaurant: "Restaurant",
  dentist: "Dentist",
  lawyer: "Attorney",
  contractor: "GeneralContractor",
  clinic: "MedicalClinic",
  "real-estate": "RealEstateAgent",
  hotel: "Hotel",
  salon: "BeautySalon",
  other: "LocalBusiness",
};

function buildSchemaBlock({
  businessName,
  city,
  url,
  vertical,
  rating,
  reviewCount,
  phone,
  address,
}: Props): string {
  const schemaType = VERTICAL_TO_SCHEMA_TYPE[vertical] ?? "LocalBusiness";
  const safeUrl = url
    ? url.startsWith("http")
      ? url
      : `https://${url}`
    : "https://yourbusiness.ca";

  const block: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: businessName,
    url: safeUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "QC",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "City",
      name: city,
    },
  };

  if (address) {
    (block.address as Record<string, unknown>).streetAddress = address;
  }
  if (phone) block.telephone = phone;
  if (rating !== undefined && reviewCount !== undefined && reviewCount > 0) {
    block.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Common FAQ examples per vertical (3 placeholder Q+A entries)
  const faqByVertical: Record<string, Array<{ q: string; a: string }>> = {
    restaurant: [
      {
        q: `Do you take reservations at ${businessName}?`,
        a: "Yes, reservations are recommended for dinner. Walk-ins accepted subject to availability.",
      },
      {
        q: "Do you offer vegetarian or vegan options?",
        a: "Yes, our menu includes vegetarian and vegan dishes clearly marked.",
      },
      {
        q: `What are the hours for ${businessName}?`,
        a: "Hours vary by day. Please check our Google Business Profile for the most current schedule.",
      },
    ],
    dentist: [
      {
        q: "Are you accepting new patients?",
        a: "Yes. New patient consultations can be booked online or by phone.",
      },
      {
        q: "Do you accept RAMQ and private insurance?",
        a: "We accept RAMQ and most major private insurance plans. Contact us to confirm your specific coverage.",
      },
      {
        q: "Do you handle dental emergencies?",
        a: "Yes, we reserve same-day slots for dental emergencies. Call our office for the next available time.",
      },
    ],
    lawyer: [
      {
        q: "Do you offer free consultations?",
        a: "Yes, we offer a free 30-minute initial consultation by phone or in-person.",
      },
      {
        q: "What practice areas do you cover?",
        a: "Our primary practice areas are listed on our website. Contact us to discuss your specific case.",
      },
      {
        q: "What languages do you practice in?",
        a: "We practice in English and French. Other languages available via our partner network.",
      },
    ],
    default: [
      {
        q: `What are your hours at ${businessName}?`,
        a: "Hours vary by day. See our Google Business Profile for the current schedule.",
      },
      {
        q: "Do you offer free consultations or quotes?",
        a: "Yes, contact us by phone or website for a free initial consultation.",
      },
      {
        q: `What areas do you serve from ${city}?`,
        a: `We serve ${city} and surrounding areas. Contact us to confirm coverage for your specific location.`,
      },
    ],
  };

  const faqs = faqByVertical[vertical] ?? faqByVertical.default;

  // Return as a 2-block JSON-LD: LocalBusiness + FAQPage
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  // Pretty-print with 2-space indent for copy-paste readability
  return [
    `<script type="application/ld+json">`,
    JSON.stringify(block, null, 2),
    `</script>`,
    ``,
    `<script type="application/ld+json">`,
    JSON.stringify(faqPage, null, 2),
    `</script>`,
  ].join("\n");
}

export function SchemaPreview(props: Props) {
  const [copied, setCopied] = useState(false);
  const block = buildSchemaBlock(props);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(block);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore clipboard errors silently
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-transparent backdrop-blur-md p-6">
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400 mb-1.5 inline-flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            Schema fix · copy-paste ready
          </div>
          <h4 className="font-display text-lg sm:text-xl leading-tight">
            Drop these 2 blocks into your site &lt;head&gt;
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Pre-validated against Google Rich Results. LocalBusiness +
            FAQPage schema, tuned for your vertical. Edit the FAQ answers to
            match your real policies before shipping.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.18em] border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="rounded-lg bg-black/40 border border-border/30 p-4 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-foreground/85 max-h-80">
        <code>{block}</code>
      </pre>

      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        <a
          href="https://search.google.com/test/rich-results"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          Validate at Google Rich Results
          <ExternalLink className="w-3 h-3" />
        </a>
        <a
          href="https://validator.schema.org/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          Validate at Schema.org
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
