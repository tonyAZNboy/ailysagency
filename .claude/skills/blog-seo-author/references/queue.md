# AiLys Blog Cadence Queue

The standing cadence is one post every two days. The 7 migrated entries are absorbed from `src/data/blog-posts.ts` with their original `publishedAt` dates. The 44 new entries run from 2026-02-01 through 2026-04-28, every other day, status `pending`.

When picking the next post, take the next `pending` row whose `publishedDate` is within 48 hours, author per the 10/10 gate in `seo-checklist.md`, then flip status to `published`.

| # | publishedDate | slug | category | primaryKeyword | longTailQ | status |
|---|---|---|---|---|---|---|
| M1 | 2026-02-04 | what-quebec-restaurants-ask-google-maps-2026 | industry-playbook | quebec restaurants google maps | What do Quebec restaurants ask Google Maps the most? | migrated |
| M2 | 2026-02-17 | why-chatgpt-cites-your-competitor | ai-visibility | chatgpt cites competitor | Why does ChatGPT cite my competitor and not me? | migrated |
| M3 | 2026-03-01 | voice-search-changed-for-dentists | voice-search | voice search dentists | How has voice search changed for dental clinics? | migrated |
| M4 | 2026-03-14 | perplexity-citations-30-day-playbook | ai-visibility | perplexity citations playbook | How do I earn Perplexity citations in 30 days? | migrated |
| M5 | 2026-03-27 | bing-copilot-b2b-search-engine | ai-visibility | bing copilot b2b | Is Bing Copilot the new B2B search engine? | migrated |
| M6 | 2026-04-09 | aeo-geo-eeat-explained-for-local-owners | aeo-geo-eeat | aeo geo eeat | What do AEO, GEO, and E-E-A-T mean for a local owner? | migrated |
| M7 | 2026-04-28 | google-ai-overviews-citation-gap-2027 | ai-visibility | google ai overviews citation gap | Why is there a citation gap in Google AI Overviews? | migrated |
| 1 | 2026-02-01 | ai-visibility-audit-checklist-2026 | ai-visibility | ai visibility audit | How do I run a full AI Visibility audit on my business? | pending |
| 2 | 2026-02-03 | gbp-photo-upload-cheat-sheet | gbp-google-maps | gbp photo upload | How often should I add new photos to my Google Business Profile? | pending |
| 3 | 2026-02-05 | nap-consistency-audit-quebec | local-seo | nap consistency audit | How do I fix inconsistent NAP across 50 directories? | pending |
| 4 | 2026-02-07 | answer-engine-optimization-pillar-guide | aeo-geo-eeat | answer engine optimization | What is answer engine optimization and how do I start? | pending |
| 5 | 2026-02-09 | siri-local-search-ranking-factors | voice-search | siri local business search | How does Siri pick which dentist to recommend nearby? | pending |
| 6 | 2026-02-11 | local-seo-for-montreal-dentists | industry-playbook | local seo for dentists | What is the best local seo strategy for a Montreal dental clinic? | pending |
| 7 | 2026-02-13 | google-review-velocity-playbook | reputation-reviews | google review velocity | How many Google reviews do I need to rank in the local pack? | pending |
| 8 | 2026-02-15 | track-chatgpt-traffic-in-ga4 | analytics-attribution | chatgpt traffic in google analytics | How do I see traffic from ChatGPT in Google Analytics 4? | pending |
| 9 | 2026-02-17 | medical-clinic-ai-visibility-guide | industry-playbook | medical clinic local seo | How do medical clinics earn AI engine citations? | pending |
| 10 | 2026-02-19 | ailys-vs-traditional-seo-agency | ailys-product | ailys vs competitors | How does AiLys compare to a traditional SEO agency in Quebec? | pending |
| 11 | 2026-02-21 | share-of-model-metric-explained | ai-visibility | share of model | What is share of model and how do I measure it? | pending |
| 12 | 2026-02-23 | gbp-posts-strategy-weekly-cadence | gbp-google-maps | gbp posts strategy | How often should I post to my Google Business Profile? | pending |
| 13 | 2026-02-25 | wikidata-for-local-businesses | local-seo | wikidata local business | Is Wikidata worth the effort for a single-location business? | pending |
| 14 | 2026-02-27 | generative-engine-optimization-2026 | aeo-geo-eeat | generative engine optimization | How do I optimize content for generative engines in 2026? | pending |
| 15 | 2026-03-01 | alexa-business-hours-fix | voice-search | alexa business listings | Why does Alexa get my business hours wrong? | pending |
| 16 | 2026-03-03 | law-firm-seo-quebec-playbook | industry-playbook | law firm seo quebec | How do family law firms in Quebec rank in AI Overviews? | pending |
| 17 | 2026-03-05 | reviuzy-review-automation-guide | reputation-reviews | reviuzy review platform | How does the AiLys Reviuzy add-on tie into review velocity? | pending |
| 18 | 2026-03-07 | utm-strategy-multi-location-business | analytics-attribution | utm strategy local business | What UTM convention works best for a multi-location business? | pending |
| 19 | 2026-03-09 | ailys-pricing-tiers-explained-cad | ailys-product | ailys agency pricing | What is included in the AiLys $300 starter tier? | pending |
| 20 | 2026-03-11 | claude-search-citations-explained | ai-visibility | claude search citations | How do I earn citations inside Claude search results? | pending |
| 21 | 2026-03-13 | gbp-categories-best-primary-pick | gbp-google-maps | google business profile categories | What is the best primary category for a Montreal dentist on GBP? | pending |
| 22 | 2026-03-15 | apple-business-connect-canada-setup | local-seo | apple business connect canada | How do I remove a duplicate Apple Business Connect listing? | pending |
| 23 | 2026-03-17 | eeat-signals-for-solo-professionals | aeo-geo-eeat | e-e-a-t signals local business | How do I prove E-E-A-T as a solo professional? | pending |
| 24 | 2026-03-19 | restaurant-marketing-montreal-guide | industry-playbook | restaurant marketing montreal | Why is my restaurant invisible on Google Maps after moving? | pending |
| 25 | 2026-03-21 | negative-review-response-templates | reputation-reviews | review response service | How fast should I respond to a negative review on Google? | pending |
| 26 | 2026-03-23 | call-tracking-google-maps-bookings | analytics-attribution | conversion tracking google maps | Can I track phone calls that started from a Google Maps listing? | pending |
| 27 | 2026-03-25 | ailys-reviuzy-addon-deep-dive | ailys-product | ailys reviuzy add on | What does the AiLys Reviuzy add-on cost and include? | pending |
| 28 | 2026-03-27 | gemini-local-results-ranking | ai-visibility | gemini local results | How do I get my business into Gemini local results? | pending |
| 29 | 2026-03-29 | gbp-q-and-a-monitoring-playbook | gbp-google-maps | gbp q and a best practices | How do I monitor and answer Q and A on my GBP? | pending |
| 30 | 2026-03-31 | yellow-pages-canada-citation-cleanup | local-seo | yellow pages canada citation | Should a Quebec restaurant list on both Yelp and Yellow Pages? | pending |
| 31 | 2026-04-02 | aeo-vs-seo-strategic-shift | aeo-geo-eeat | aeo vs seo comparison | What is the difference between AEO, GEO, and traditional SEO? | pending |
| 32 | 2026-04-04 | speakable-schema-voice-ranking | voice-search | speakable schema markup | Does speakable schema actually help voice ranking? | pending |
| 33 | 2026-04-06 | contractor-service-area-gbp-strategy | industry-playbook | contractor lead generation | Do contractors need a separate GBP for each service area? | pending |
| 34 | 2026-04-08 | private-feedback-funnel-google-rules | reputation-reviews | private feedback before public review | Do private feedback funnels violate Google review guidelines? | pending |
| 35 | 2026-04-10 | server-side-tagging-on-vercel-quebec | analytics-attribution | server side tagging quebec | What is the cheapest way to do server-side tagging on Vercel? | pending |
| 36 | 2026-04-12 | ailys-bilingual-content-workflow | ailys-product | ailys bilingual support | Does AiLys handle French-Canadian content as well as English? | pending |
| 37 | 2026-04-14 | how-ai-engines-refresh-citations | ai-visibility | ai overviews citations | How often do AI engines refresh their citations? | pending |
| 38 | 2026-04-16 | gbp-attributes-ultimate-guide | gbp-google-maps | how to add attributes to gbp | How do I add bilingual attributes to my Quebec GBP? | pending |
| 39 | 2026-04-18 | local-schema-markup-cheat-sheet | local-seo | local schema markup | What schema type should a law firm use locally? | pending |
| 40 | 2026-04-20 | author-bio-schema-rankings | aeo-geo-eeat | author bio schema | Does an author bio with credentials actually move rankings? | pending |
| 41 | 2026-04-22 | hotel-old-quebec-ai-search-strategy | industry-playbook | hotel local seo strategy | How do hotels in Old Quebec compete with booking sites in AI search? | pending |
| 42 | 2026-04-24 | bilingual-google-reviews-quebec | reputation-reviews | how to ask for google reviews | How do I get bilingual EN and FR reviews from the same customers? | pending |
| 43 | 2026-04-26 | ga4-local-business-baseline-setup | analytics-attribution | ga4 local business setup | How do I set up GA4 for a single-location Quebec business? | pending |
| 44 | 2026-04-28 | ailys-onboarding-walkthrough-cad | ailys-product | ailys onboarding process | What does the AiLys onboarding process look like week by week? | pending |