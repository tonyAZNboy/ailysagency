/**
 * Generate photorealistic hero / mid / end images for every AiLys blog post,
 * using Gemini 2.5 Flash Image (codename nano-banana). Mirrors the Truvizy
 * pattern at scripts/generate-blog-images.mjs.
 *
 * Setup (one time):
 *   npm install --save-dev sharp
 *   echo "VITE_GEMINI_API_KEY=AIza..." >> .env
 *
 * Run:
 *   node scripts/generate-blog-hero-images.mjs
 *
 * Optional flags:
 *   --start=N        Skip the first N posts (resume after a crash)
 *   --slug=<slug>    Generate only one post
 *   --variant=hero   Generate only one variant (hero | mid | end)
 *   --force          Overwrite existing files
 *
 * Output: public/blog-images/<slug>/{hero,mid,end}.webp
 *         (1280x720 WebP, quality 85, < 200 KB each)
 *
 * Pricing reference: Gemini 2.5 Flash Image is approx $0.039 per generated image.
 * 19 posts x 3 variants = 57 calls = approx $2.22.
 *
 * Hard rules followed:
 * - No text, watermark, or logo in any rendered image (prompts forbid them).
 * - Quebec / Canadian local-business setting where contextual.
 * - Photorealistic editorial photography style.
 * - No proprietary AI provider hint inside scenes (no "Anthropic" / "OpenAI" lettering).
 */

import sharp from 'sharp'
import { mkdirSync, existsSync, writeFileSync, readFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(PROJECT_ROOT, 'public/blog-images')

const ENV_KEY =
  process.env.VITE_GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_AI_API_KEY ||
  (() => {
    try {
      return readFileSync(join(PROJECT_ROOT, '.env'), 'utf-8').match(/VITE_GEMINI_API_KEY=(.+)/)?.[1]?.trim()
    } catch {
      return null
    }
  })()

const MODEL = 'gemini-2.5-flash-image'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${ENV_KEY}`

const argv = process.argv.slice(2)
const START_IDX = parseInt(argv.find((a) => a.startsWith('--start='))?.split('=')[1] || '0')
const ONLY_SLUG = argv.find((a) => a.startsWith('--slug='))?.split('=')[1]
const ONLY_VARIANT = argv.find((a) => a.startsWith('--variant='))?.split('=')[1]
const FORCE = argv.includes('--force')

if (!ENV_KEY) {
  console.error('ERROR: Missing VITE_GEMINI_API_KEY (or GEMINI_API_KEY) env var or .env entry.')
  console.error('Get a key at https://aistudio.google.com/app/apikey')
  process.exit(1)
}

// ── Hand-curated prompts per post ───────────────────────────────────────────
// Each post gets 3 prompts: hero (wide), mid (detail), end (closing).
// All scenes are AiLys-relevant: Quebec local businesses, professional offices,
// search-engine workflows. No text, no logos, no UI screenshot text.

const POSTS = [
  // ── Industry Playbooks ──
  {
    slug: 'what-quebec-restaurants-ask-google-maps-2026',
    prompts: [
      'Cozy Quebec restaurant interior at dusk with warm pendant lighting, exposed brick wall, owner reviewing a tablet at the host stand, light snow visible through the front window, photorealistic editorial photography.',
      'Close-up of a smartphone held by a customer searching for nearby restaurants, screen out of focus, blurred Montreal Plateau street with cafe terraces in the background, golden hour, shallow depth of field.',
      'Restaurant owner standing at the entrance smiling, chalkboard menu beside them with no readable lettering, Old Quebec cobblestone street, soft afternoon light.',
    ],
  },
  {
    slug: 'medical-clinic-ai-visibility-guide',
    prompts: [
      'Modern medical clinic reception in Montreal with a calm receptionist behind a glass partition, soft daylight from large windows, plants on the counter, clean minimalist design, photorealistic.',
      'Doctor in a white coat reviewing a patient chart on a tablet inside a private exam room, indirect light, health-tech aesthetic, no readable text on screen.',
      'Wide-angle shot of a small clinic exterior with a discrete signage panel (no readable letters), tree-lined Quebec residential street, late afternoon sun.',
    ],
  },
  {
    slug: 'local-seo-for-montreal-dentists',
    prompts: [
      'Bright modern dental clinic operatory in Montreal with a dentist and hygienist preparing for a patient, large windows, ergonomic chair, instruments on a tray, photorealistic medical photography.',
      'Patient in the dental chair with the dentist explaining a treatment plan on a tablet, friendly atmosphere, soft daylight.',
      'Dental clinic exterior on a Montreal commercial street, modern brick facade, snow lining the sidewalk, evening soft glow from interior lights.',
    ],
  },
  {
    slug: 'restaurant-marketing-montreal-guide',
    prompts: [
      'Bistro chef plating a dish at the pass with the open kitchen visible behind, busy service, warm tungsten lighting, Montreal restaurant interior, photorealistic.',
      'Server delivering plates to a couple at a table near a window overlooking a snowy street, candle on the table, intimate dinner.',
      'Restaurant manager smiling at the front desk holding a tablet, neutral expression, hospitality industry editorial photography.',
    ],
  },

  // ── AI Visibility ──
  {
    slug: 'why-chatgpt-cites-your-competitor',
    prompts: [
      'Marketing strategist at a modern desk reviewing analytics on a large external monitor, indirect light, indoor plants, professional home office in Montreal, photorealistic.',
      'Close-up of fingers on a mechanical keyboard with a laptop screen visible but the displayed content abstracted to soft glowing rectangles, no readable text.',
      'Two professionals discussing strategy at a glass table with sticky notes and a printed chart with non-readable diagrams, conference room with city view.',
    ],
  },
  {
    slug: 'perplexity-citations-30-day-playbook',
    prompts: [
      'SEO specialist working at a triple-monitor setup in a clean modern office, warm afternoon light from a side window, professional but calm atmosphere, photorealistic.',
      'Hands writing notes in a leather notebook beside a laptop on a wooden desk, espresso cup, indoor plants, editorial photography.',
      'Co-working space in Montreal with a strategist explaining a workflow on a glass whiteboard with abstracted diagrams, no readable letters.',
    ],
  },
  {
    slug: 'bing-copilot-b2b-search-engine',
    prompts: [
      'B2B sales executive at a clean corporate office workstation, gray suit, monitors with abstract data visualization, downtown Montreal skyline through window, photorealistic.',
      'Two professionals shaking hands across a meeting room table, abstract slide visible on a large display behind them, editorial business photography.',
      'Modern office lobby with a receptionist and a visitor at the front desk, glass walls, wide-angle architecture shot, soft daylight.',
    ],
  },
  {
    slug: 'google-ai-overviews-citation-gap-2027',
    prompts: [
      'Marketing analyst with concentrated expression at a curved ultra-wide monitor displaying abstract bar charts (no readable text), modern dim home office with bias light, photorealistic.',
      'Top-down flatlay of a notebook, pen, smartphone, and coffee cup on a wooden desk, hands writing notes, editorial style.',
      'Wide office shot of a small marketing team gathered around a screen for a strategy review, abstract visuals, late afternoon light.',
    ],
  },
  {
    slug: 'share-of-model-metric-explained',
    prompts: [
      'Data analyst at a modern monitor showing an abstract dashboard with rings and bar segments, no readable text, professional studio-quality lighting, photorealistic editorial.',
      'Close-up of a hand pointing to a printed chart on a desk, abstract circular gauge graphics, no readable letters, wooden surface.',
      'Wide angle of a marketing team standing in front of a glass wall covered with abstract handwritten notes and arrows, no readable letters, brainstorming session.',
    ],
  },
  {
    slug: 'ai-visibility-audit-checklist-2026',
    prompts: [
      'Strategist reviewing a printed checklist on a desk beside a laptop, paper checkboxes visible but text abstracted, indoor plants, soft natural light, photorealistic.',
      'Close-up of a finger checking off boxes on a clipboard, no readable letters on the form, hands of a professional.',
      'Modern conference room with two people reviewing a printed audit folder together, table with mockups and printed pages, no readable text.',
    ],
  },

  // ── Voice Search ──
  {
    slug: 'voice-search-changed-for-dentists',
    prompts: [
      'Adult patient at home casually speaking to a smartphone held in their hand, smart speaker visible on a kitchen counter, soft morning light, photorealistic lifestyle photography.',
      'Close-up of a smartphone microphone icon glowing softly, hand holding the phone, blurred kitchen background, editorial detail shot.',
      'Dental hygienist explaining a treatment to a patient in a clinic, friendly clinical setting, no readable signage.',
    ],
  },
  {
    slug: 'siri-local-search-ranking-factors',
    prompts: [
      'Person walking on a Montreal sidewalk in winter coat speaking into a smartphone earpiece, snow flurries, blurred street with shopfronts, golden hour, photorealistic.',
      'Wrist with a smartwatch showing an abstract microphone icon, indoor cafe blurred in background, editorial detail shot.',
      'Hands holding a smartphone above a kitchen island with groceries, kitchen with subtle morning light.',
    ],
  },

  // ── AEO / GEO / E-E-A-T ──
  {
    slug: 'aeo-geo-eeat-explained-for-local-owners',
    prompts: [
      'Small business owner at a wooden desk in a workshop reviewing a printed strategy doc, hands turning pages, warm daylight, photorealistic editorial.',
      'Close-up of a fountain pen writing in a leather notebook, soft natural light, no readable text on page.',
      'Two professionals discussing a marketing plan with paper printouts on a kitchen table in a Quebec home, casual but focused atmosphere.',
    ],
  },
  {
    slug: 'answer-engine-optimization-pillar-guide',
    prompts: [
      'Marketing strategist at a tidy minimalist desk with a single large monitor showing an abstract knowledge graph with non-readable nodes, indirect window light, photorealistic.',
      'Hands assembling a stack of printed reference documents into a binder, no readable text, editorial detail shot.',
      'Wide-angle modern home office with a strategist standing at a wall-mounted whiteboard with abstract concept arrows, no readable letters.',
    ],
  },

  // ── Industry-tactical ──
  {
    slug: 'gbp-posts-strategy-weekly-cadence',
    prompts: [
      'Local business owner with a smartphone composing a post at the storefront window, warm shop interior, photorealistic editorial style.',
      'Top-down view of a smartphone, planner with checkboxes and dates (no readable letters), espresso, on a wooden desk, calm morning light.',
      'Boutique owner taking a photo of a product display with their smartphone, light streaming through the storefront glass, photorealistic.',
    ],
  },
  {
    slug: 'gbp-photo-upload-cheat-sheet',
    prompts: [
      'Restaurant owner photographing the dining room from the entrance with a smartphone, warm tungsten lights, empty before-service moment, photorealistic.',
      'Detail shot of a smartphone screen abstracted to a soft glowing photo grid, no readable letters, hand holding the phone.',
      'Hairdresser taking a smartphone photo of a styling chair in a clean salon, large mirror, studio-style natural light.',
    ],
  },
  {
    slug: 'nap-consistency-audit-quebec',
    prompts: [
      'Marketing analyst auditing printed business listing pages on a desk, marker in hand crossing out inconsistent entries with abstract checkmarks, no readable text, photorealistic.',
      'Close-up of a hand circling items on a printed spreadsheet with a red marker, abstracted columns, editorial detail.',
      'Quebec professional at a laptop in a modern home office with a city view, focused expression, late afternoon natural light.',
    ],
  },

  // ── AiLys product ──
  {
    slug: 'ailys-vs-traditional-seo-agency',
    prompts: [
      'Two professionals comparing approaches at a glass meeting table, papers and a tablet between them, Montreal high-rise office daylight, calm collaborative atmosphere, photorealistic.',
      'Split composition: left side a quiet single workstation with a laptop and plant, right side a busier traditional agency open-plan office, editorial style, no readable text.',
      'Local business owner shaking hands with a strategist outside a small Quebec storefront, professional friendly relationship, daylight.',
    ],
  },

  // ── Reputation / Reviews ──
  {
    slug: 'google-review-velocity-playbook',
    prompts: [
      'Customer holding a smartphone at a coffee shop counter while the barista prepares an order, friendly interaction, photorealistic editorial photography.',
      'Close-up of a smartphone with an abstract star rating UI (no readable letters), barista hand passing a takeaway cup.',
      'Small business owner reading a printed list of customer feedback at a wooden desk, evening warm lamp light.',
    ],
  },

  // ── Analytics / Attribution ──
  {
    slug: 'track-chatgpt-traffic-in-ga4',
    prompts: [
      'Marketing analyst at a desk with a large monitor showing abstract analytics charts (no readable letters), notebook open with handwritten arrows, modern home office, photorealistic.',
      'Close-up of a hand drawing a UTM funnel diagram on a paper notebook, ballpoint pen, no readable letters, soft daylight.',
      'Two analysts discussing a printed report at a standing desk, abstract data visualization on the page, modern collaborative space.',
    ],
  },

  // ── W5 posts (Feb 25 - Mar 19) ──
  {
    slug: 'wikidata-for-local-businesses',
    prompts: [
      'Researcher at a wooden desk with a desktop monitor showing an abstract knowledge graph of nodes and edges, plants on the desk, late afternoon natural light, photorealistic editorial.',
      'Hands sketching a concept map with circles and arrows in a paper notebook, no readable letters, soft window light.',
      'Wide-angle of a small modern office library with a person referencing a printed encyclopedia volume next to a laptop, calm scholarly atmosphere.',
    ],
  },
  {
    slug: 'generative-engine-optimization-2026',
    prompts: [
      'Strategist at a clean minimalist desk reviewing an abstract content brief on a tablet, side by side with a printed page, soft morning light, photorealistic.',
      'Close-up of a finger pointing at an abstract printed flowchart with arrows and rectangles, no readable letters, wooden surface.',
      'Modern collaborative space with three professionals around a glass wall covered in abstract handwritten notes, focused brainstorming.',
    ],
  },
  {
    slug: 'alexa-business-hours-fix',
    prompts: [
      'Hands holding a smartphone in a Quebec kitchen, smart speaker visible on the counter behind, morning light from a side window, photorealistic lifestyle photography.',
      'Close-up of a smart speaker on a clean kitchen counter, warm bokeh of the room behind, no readable lettering on the device.',
      'Customer at a small storefront in Montreal speaking into a smartwatch microphone while walking, soft afternoon light, editorial detail.',
    ],
  },
  {
    slug: 'law-firm-seo-quebec-playbook',
    prompts: [
      'Lawyer in a tailored suit in a wood-paneled Montreal law office, shelves of bound legal volumes, working at a leather chair, warm tungsten lighting, photorealistic.',
      'Close-up of hands signing a document on a polished desk, fountain pen, no readable text on the page, editorial detail.',
      'Two lawyers discussing strategy at a glass conference table with abstract diagrams on a printed page, downtown Quebec City view through the window.',
    ],
  },
  {
    slug: 'reviuzy-review-automation-guide',
    prompts: [
      'Customer tapping a smartphone against an NFC card stand on a coffee shop counter, friendly barista in the background, warm interior lighting, photorealistic.',
      'Close-up of a hand holding a smartphone over a small NFC card on a wooden table, soft daylight, editorial detail shot.',
      'Salon receptionist offering a small NFC card to a satisfied customer, modern hair salon interior, calm afternoon light.',
    ],
  },
  {
    slug: 'utm-strategy-multi-location-business',
    prompts: [
      'Marketing operations specialist with a curved monitor showing an abstract dashboard of bar segments, modern home office, indirect natural light, photorealistic.',
      'Close-up flatlay of a paper notebook with a hand-drawn diagram of arrows, smartphone, espresso, on a wooden desk.',
      'Wide angle of a small marketing team standing at a glass wall mapping a flow with sticky notes (no readable letters), focused planning session.',
    ],
  },
  {
    slug: 'ailys-pricing-tiers-explained-cad',
    prompts: [
      'Small business owner at a kitchen table reviewing a printed comparison chart (no readable text) with a tablet beside, calm Quebec home setting, soft morning light, photorealistic.',
      'Hands flipping through a small leather notebook with handwritten ladder of items, no readable letters, soft daylight.',
      'Friendly handshake between a strategist and a local business owner outside a small storefront, daylight.',
    ],
  },
  {
    slug: 'claude-search-citations-explained',
    prompts: [
      'Content writer at a triple-monitor setup in a quiet modern home office, indirect natural light, plants on the desk, photorealistic editorial photography.',
      'Hands writing structured notes in a leather notebook beside a laptop, espresso cup, wooden desk, no readable letters.',
      'Two professionals discussing an outline at a glass table with a printed sketch (abstract diagrams), conference room with city view.',
    ],
  },
  {
    slug: 'gbp-categories-best-primary-pick',
    prompts: [
      'Dentist at the front desk of a clean modern Quebec dental clinic checking a tablet, friendly receptionist beside, indirect daylight, photorealistic.',
      'Close-up of a finger pointing at an abstract printed list on a clipboard, no readable letters, wooden counter.',
      'Wide-angle exterior of a small dental clinic on a Montreal commercial street, modern brick facade, late afternoon light.',
    ],
  },
  {
    slug: 'apple-business-connect-canada-setup',
    prompts: [
      'Local business owner at a small wooden desk with a smartphone and a laptop side by side, focused expression, warm Canadian indoor lighting, photorealistic.',
      'Close-up of fingers holding an envelope addressed by hand (no readable text), morning daylight, editorial detail.',
      'Wide office with a person on a phone call confirming a verification, plants and a Canadian map print on the wall, afternoon light.',
    ],
  },
  {
    slug: 'eeat-signals-for-solo-professionals',
    prompts: [
      'Solo professional in a small but tasteful Montreal office, framed credentials on the wall, working at a desk with a notebook, warm morning light, photorealistic editorial.',
      'Close-up of a fountain pen signing a leather portfolio, no readable text, soft daylight.',
      'Wide angle of a tidy professional reception area, single chair, plant, framed certificates (abstract), calm welcoming atmosphere.',
    ],
  },
  {
    slug: 'restaurant-marketing-montreal-guide',
    prompts: [
      'Restaurant owner standing at the entrance of a freshly opened Montreal bistro, awning visible, snow on the sidewalk, warm interior glow, photorealistic editorial.',
      'Close-up of a chalkboard easel propped at a doorway with abstract handwritten lettering (no readable letters), passersby blurred.',
      'Wide-angle interior of a small Plateau restaurant before service, tables set, soft tungsten lighting, calm atmospheric photography.',
    ],
  },

  // ── W6 posts (Mar 21 - Apr 12) ──
  {
    slug: 'negative-review-response-templates',
    prompts: [
      'Local business owner at a wooden desk thoughtfully writing a reply on a laptop, soft afternoon light through a window, calm focused expression, photorealistic editorial.',
      'Close-up of a hand drafting a structured note in a leather notebook beside a smartphone, no readable letters, soft daylight.',
      'Cafe owner having a quiet supportive conversation with a customer at a sunny table, warm lighting, hospitality photography.',
    ],
  },
  {
    slug: 'call-tracking-google-maps-bookings',
    prompts: [
      'Receptionist at a modern Quebec clinic answering a desk phone with a CRM dashboard on a side monitor (no readable text), bright reception area, photorealistic.',
      'Close-up of a smartphone showing a dialer and call history with abstract entries, hand of a customer holding the device, editorial detail.',
      'Wide angle of a small office wall display with abstract bar chart of inbound calls and a calendar with dot markers, modern workspace.',
    ],
  },
  {
    slug: 'ailys-reviuzy-addon-deep-dive',
    prompts: [
      'Local business team gathered around a tablet at the front counter of a Montreal storefront, NFC review card visible on the counter, warm tungsten light, photorealistic editorial.',
      'Close-up of a customer tapping a smartphone against a small NFC stand on a wooden bistro table, soft daylight from a side window.',
      'Wide angle of a salon owner reviewing a printed monthly report (abstract layout, no readable text) at a tidy reception desk, late afternoon light.',
    ],
  },
  {
    slug: 'gemini-local-results-ranking',
    prompts: [
      'Local business owner at a clean modern desk reviewing an abstract analytics dashboard on a laptop with rings and bars (no readable letters), Quebec home office, indirect daylight, photorealistic.',
      'Hand placing a printed location-specific marketing brief next to a tablet on a wooden table, top-down editorial shot, soft daylight.',
      'Wide angle of a strategist standing at a glass wall with abstract location-pin icons and arrows in marker (no readable letters), focused planning.',
    ],
  },
  {
    slug: 'gbp-q-and-a-monitoring-playbook',
    prompts: [
      'Customer support specialist with a dual-monitor setup reviewing an abstract Q-and-A queue (no readable text), open notebook beside, modern home office, photorealistic.',
      'Close-up of a hand checking off items on a paper checklist, no readable letters, espresso cup in the corner of the wooden desk.',
      'Wide-angle of a strategist on a video call discussing approval workflow at a clean desk, plants and indirect daylight.',
    ],
  },
  {
    slug: 'yellow-pages-canada-citation-cleanup',
    prompts: [
      'Marketing analyst at a desk auditing a stack of printed business directory pages, marker in hand, abstract entries (no readable letters), Quebec home office, late afternoon, photorealistic.',
      'Close-up of a fountain pen striking through a row on a printed list (no readable letters), soft daylight, editorial detail.',
      'Wide angle of two professionals comparing printed audit reports at a glass meeting table, calm collaborative atmosphere.',
    ],
  },
  {
    slug: 'aeo-vs-seo-strategic-shift',
    prompts: [
      'Strategist at a tidy minimalist desk between two monitors, one showing abstract search-result snippets (no readable text), the other an abstract knowledge graph, photorealistic editorial.',
      'Close-up of a hand drawing a Venn diagram in a leather notebook with three overlapping circles (no readable letters), soft daylight.',
      'Wide angle of a small marketing team at a glass wall with abstract concept arrows and category labels (no readable letters).',
    ],
  },
  {
    slug: 'speakable-schema-voice-ranking',
    prompts: [
      'Local user speaking into a smart home speaker on a kitchen counter, soft morning light from a side window, photorealistic lifestyle photography.',
      'Close-up of a smartphone microphone glow and a smartwatch on a wrist, abstract waveform reflected on the device, editorial detail.',
      'Wide angle of a quiet living room with a smart speaker on a side table next to a steaming cup, calm atmospheric photography.',
    ],
  },
  {
    slug: 'contractor-service-area-gbp-strategy',
    prompts: [
      'Contractor in work clothes consulting a clipboard outside a residential renovation site in a Quebec suburb, branded service van in the background, late afternoon light, photorealistic editorial.',
      'Close-up of a hand circling abstract area outlines on a printed paper map (no readable letters), hard-hat resting on the table.',
      'Wide angle of a small contractor office with a wall-mounted map of greater Montreal (abstract pins, no readable letters), tidy workspace.',
    ],
  },
  {
    slug: 'private-feedback-funnel-google-rules',
    prompts: [
      'Customer at a coffee shop completing an abstract feedback form on a tablet handed by a smiling staff member, warm tungsten lighting, photorealistic editorial.',
      'Close-up of a hand holding a smartphone with an abstract star rating (no readable letters), barista hand passing a takeaway cup.',
      'Wide-angle interior of a clean retail store with a small countertop tablet stand for feedback, no readable text, calm afternoon.',
    ],
  },
  {
    slug: 'server-side-tagging-on-vercel-quebec',
    prompts: [
      'Developer with concentrated focus at a single ultra-wide monitor showing an abstract code editor and dashboard split-view (no readable letters), Quebec home office with bias light, photorealistic.',
      'Close-up of fingers on a mechanical keyboard, ambient blue glow, soft bokeh of a side monitor with abstract telemetry, editorial detail.',
      'Wide-angle of a tidy home office at night with a single monitor and a desk plant, calm atmospheric ambient lighting.',
    ],
  },
  {
    slug: 'ailys-bilingual-content-workflow',
    prompts: [
      'Bilingual content writer at a wooden desk with two paper notebooks (one with abstract English notes, one with abstract French notes, no readable letters), warm Quebec home office, photorealistic editorial.',
      'Close-up of a fountain pen writing alongside a printed page with abstract two-column layout, no readable letters.',
      'Wide angle of two writers collaborating at a coffee shop table in Old Quebec, sunlight through tall windows, casual friendly atmosphere.',
    ],
  },

  // ── W7 posts (Apr 14 - Apr 28) ──
  {
    slug: 'how-ai-engines-refresh-citations',
    prompts: [
      'Researcher at a triple-monitor setup reviewing an abstract timeline of citation events (no readable letters), modern home office with indirect natural light, photorealistic editorial.',
      'Close-up of a fountain pen drawing a refresh cycle diagram with arrows in a leather notebook, no readable letters, soft daylight.',
      'Wide angle of a small marketing team at a glass wall with abstract weekly cadence rectangles drawn in marker, focused planning.',
    ],
  },
  {
    slug: 'gbp-attributes-ultimate-guide',
    prompts: [
      'Local business owner at a smartphone setting attribute toggles in an abstract app interface (no readable letters), bright shop interior, photorealistic editorial.',
      'Close-up of fingers tapping abstract toggle switches on a smartphone screen, no readable text, soft daylight on a wooden counter.',
      'Wide angle of a small Quebec storefront entrance with an open sign and accessibility ramp visible, late afternoon natural light.',
    ],
  },
  {
    slug: 'local-schema-markup-cheat-sheet',
    prompts: [
      'Web developer at a dual-monitor setup with abstract structured data shapes overlaid on a website preview (no readable letters), modern home office, photorealistic.',
      'Close-up of a hand sketching nested rectangle hierarchy in a leather notebook with arrows, no readable letters, editorial detail.',
      'Wide-angle of a small dev team standing at a glass whiteboard with abstract schema diagrams in marker, focused brainstorming.',
    ],
  },
  {
    slug: 'author-bio-schema-rankings',
    prompts: [
      'Professional writer at a clean modern desk with framed credentials on the wall, working on a notebook beside a laptop, warm morning light, photorealistic editorial.',
      'Close-up of a fountain pen on a leather portfolio, signature line abstracted (no readable letters), soft daylight on a wooden surface.',
      'Wide angle of a tidy authors corner of a home office with bookshelf and a small desk lamp on, late afternoon glow.',
    ],
  },
  {
    slug: 'hotel-old-quebec-ai-search-strategy',
    prompts: [
      'Boutique hotel manager standing at the entrance of a stone heritage building in Old Quebec, snowy cobblestone street, warm lobby light spilling out, photorealistic editorial.',
      'Close-up of a hand placing a key on a dark wooden reception counter with a printed welcome card (abstract, no readable letters), warm tungsten lighting.',
      'Wide angle of a charming hotel suite with a window view of historic Quebec rooftops, calm atmospheric photography, soft daylight.',
    ],
  },
  {
    slug: 'bilingual-google-reviews-quebec',
    prompts: [
      'Customer at a Montreal cafe counter holding a smartphone with an abstract review prompt (no readable text), bilingual atmosphere with bilingual signage (no readable letters), warm interior, photorealistic.',
      'Close-up of a smartphone with abstract star rating UI, hand of a customer in a fall jacket, blurred autumn street outside.',
      'Wide-angle of a salon receptionist offering a small NFC review card to a satisfied customer, modern Quebec interior, calm afternoon.',
    ],
  },
  {
    slug: 'ga4-local-business-baseline-setup',
    prompts: [
      'Marketing analyst configuring an abstract analytics dashboard on a laptop at a clean desk with notebook open beside, indirect natural light, photorealistic editorial.',
      'Top-down flatlay of a paper checklist with handwritten boxes (no readable letters), smartphone, espresso, on a wooden desk.',
      'Wide angle of a small business owner at a counter reviewing a printed monthly summary report (abstract layout, no readable text).',
    ],
  },
  {
    slug: 'ailys-onboarding-walkthrough-cad',
    prompts: [
      'Strategist and local business owner shaking hands at a glass meeting table with a printed onboarding plan (abstract pages, no readable letters), Montreal high-rise office daylight, photorealistic editorial.',
      'Close-up of a fountain pen signing a contract on a leather portfolio, no readable text on the paper, soft daylight.',
      'Wide angle of a small Quebec storefront with the owner unlocking the door for the day, fresh morning light, hopeful atmosphere.',
    ],
  },

  // ── Competitor Comparisons (Quebec / Canada) ──
  {
    slug: 'ailys-vs-digitad-seo-quebec',
    prompts: [
      'Two Montreal marketing professionals in business casual at a glass meeting table comparing approaches, one with a laptop one with a printed strategy doc, modern Montreal office with city skyline view, daylight, photorealistic editorial.',
      'Top-down flatlay of two side-by-side notebooks on a wooden desk, one open with abstract bullet points and one with abstract diagrams, espresso cup, smartphone, no readable letters.',
      'Wide angle of a small Quebec local business storefront at golden hour, owner standing at the entrance smiling, calm Plateau Mont-Royal street, photorealistic.',
    ],
  },
  {
    slug: 'ailys-vs-bloom-agence-montreal',
    prompts: [
      'Performance marketing analyst at a triple-monitor setup with abstract paid media dashboards on the side screens (no readable text), modern Montreal office at night with bias light, photorealistic editorial.',
      'Close-up of a hand pointing to an abstract printed funnel diagram on a wooden desk with marker annotations, no readable letters, editorial detail.',
      'Wide angle of a Quebec ecommerce business owner at a packing table preparing online orders, warm daylight from windows, photorealistic.',
    ],
  },
  {
    slug: 'ailys-vs-major-tom-agence-canada',
    prompts: [
      'Strategist with a Canada wall map covered in abstract pin markers (no readable letters), modern downtown corporate office with floor-to-ceiling windows and Vancouver-style mountain skyline, late afternoon natural light, photorealistic editorial.',
      'Close-up of a hand placing a small marker on an abstract printed map of Canada with several city dots, no readable letters, editorial detail.',
      'Wide angle of a small Quebec local owner at a tidy desk with a single laptop, contrasting calm with corporate scale, soft morning light, photorealistic.',
    ],
  },
  {
    slug: 'ailys-vs-prostar-seo-canada',
    prompts: [
      'Four professionals around a table representing a multi-city team meeting (Quebec City, Montreal, Toronto, Calgary), modern bright conference room, glass walls, daylight, photorealistic editorial collaboration scene.',
      'Top-down flatlay of an abstract printed pricing comparison sheet with two columns (no readable letters), pen, smartphone, espresso, on a wooden desk.',
      'Wide angle of a clean modern Canadian agency office reception with a calm receptionist, glass entrance, late afternoon natural light, photorealistic.',
    ],
  },
  {
    slug: 'ailys-vs-bofu-marketing-quebec',
    prompts: [
      'Conversion optimization specialist at a clean modern desk with an abstract funnel-shaped chart on a curved monitor narrowing toward the bottom, no readable text, Quebec home office with indirect natural light, photorealistic editorial.',
      'Close-up of a hand sketching a funnel with three stages in a leather notebook, no readable letters, espresso cup beside, soft daylight.',
      'Wide angle of a small Laurentides-style Quebec town storefront with a smiling owner at a counter completing a sale on a tablet, warm interior lighting, photorealistic.',
    ],
  },
  {
    slug: 'ailys-vs-adviso-conseil-numerique',
    prompts: [
      'Senior strategy consultant in business attire presenting at a clean conference table with abstract frameworks printed on paper (no readable letters), prestigious Montreal high-rise office with city view, photorealistic editorial.',
      'Close-up of a hand drawing a strategic framework diagram with overlapping circles in a leather notebook, fountain pen, no readable letters, editorial detail.',
      'Wide angle of a tidy executive corner office with bookshelves, plants, single curved monitor on a clean desk with subtle skyline view, calm professional atmosphere, photorealistic.',
    ],
  },
  {
    slug: 'ailys-vs-rablab-creative-montreal',
    prompts: [
      'Creative director at a tilted drafting desk with abstract design mockups, sketchbook open with rough shapes (no readable letters), trendy Montreal Mile End creative agency loft with exposed brick and large windows, daylight, photorealistic editorial.',
      'Close-up of a designer hand sketching brand identity concepts with a fineliner pen on layout paper, abstract logo shapes, no readable letters, soft daylight.',
      'Wide angle of a cozy creative collaboration corner with two designers reviewing printed mockups pinned on a corkboard with abstract layouts, warm tungsten lighting, photorealistic.',
    ],
  },
  {
    slug: 'ailys-vs-wsi-canada-franchise',
    prompts: [
      'Single consultant in business casual at a tidy home office desk with a laptop and a printed methodology binder beside, photo of Toronto skyline as wall art, calm warm afternoon light, photorealistic editorial.',
      'Close-up flatlay of a leather business portfolio with an abstract methodology card and a pen, no readable letters, wooden desk surface, editorial detail.',
      'Wide angle of a small consultant office with two professionals shaking hands across a desk in a friendly client meeting, daylight, calm professional atmosphere, photorealistic.',
    ],
  },
]

console.log(`Loaded ${POSTS.length} hand-curated post prompt sets.`)

// ── Image generation core ───────────────────────────────────────────────────

const VARIANTS = ['hero', 'mid', 'end']
const RETRY_DELAY = 5000
const ASPECT_W = 1280
const ASPECT_H = 720

async function generateImage(promptCore, attempts = 3) {
  const fullPrompt = `Generate a photorealistic blog image (16:9 aspect ratio, ${ASPECT_W}x${ASPECT_H}). ${promptCore} The image should look like a professional editorial stock photo. No text, watermarks, or logos in the image.`

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
        }),
        signal: AbortSignal.timeout(120_000),
      })

      if (resp.status === 429) {
        const wait = RETRY_DELAY * (attempt + 2)
        console.warn(`    Rate-limited, waiting ${wait / 1000}s...`)
        await new Promise((r) => setTimeout(r, wait))
        continue
      }
      if (!resp.ok) {
        const body = await resp.text().catch(() => '')
        throw new Error(`HTTP ${resp.status}: ${body.slice(0, 200)}`)
      }

      const data = await resp.json()
      const candidate = data?.candidates?.[0]
      if (!candidate || candidate.finishReason === 'SAFETY') {
        console.warn(`    Safety block, retrying...`)
        await new Promise((r) => setTimeout(r, 2000))
        continue
      }
      const parts = candidate.content?.parts ?? []
      const imagePart = parts.find((p) => p.inlineData)
      if (!imagePart) {
        console.warn(`    No image in response, retrying...`)
        await new Promise((r) => setTimeout(r, 2000))
        continue
      }

      const buf = Buffer.from(imagePart.inlineData.data, 'base64')
      return await sharp(buf).resize(ASPECT_W, ASPECT_H, { fit: 'cover' }).webp({ quality: 85 }).toBuffer()
    } catch (e) {
      if (attempt === attempts - 1) throw e
      const wait = RETRY_DELAY * (attempt + 1)
      console.warn(`    ${e.message.slice(0, 100)}, retrying in ${wait / 1000}s...`)
      await new Promise((r) => setTimeout(r, wait))
    }
  }
  throw new Error('All retries exhausted')
}

async function processPost(post, index) {
  if (ONLY_SLUG && post.slug !== ONLY_SLUG) return
  const dir = join(OUT_DIR, post.slug)
  mkdirSync(dir, { recursive: true })

  console.log(`\n[${index + 1}/${POSTS.length}] ${post.slug}`)

  for (let i = 0; i < 3; i++) {
    const variant = VARIANTS[i]
    if (ONLY_VARIANT && variant !== ONLY_VARIANT) continue
    const outPath = join(dir, `${variant}.webp`)
    if (!FORCE && existsSync(outPath) && statSync(outPath).size > 5000) {
      console.log(`  skip ${variant}.webp (exists)`)
      continue
    }
    try {
      const buf = await generateImage(post.prompts[i])
      writeFileSync(outPath, buf)
      console.log(`  saved ${variant}.webp (${Math.round(buf.length / 1024)} KB)`)
    } catch (e) {
      console.error(`  FAILED ${variant}.webp: ${e.message.slice(0, 100)}`)
    }
    await new Promise((r) => setTimeout(r, 1500))
  }
  if (index < POSTS.length - 1) await new Promise((r) => setTimeout(r, 2000))
}

async function main() {
  console.log(`Generating ${POSTS.length * 3} blog images via Gemini ${MODEL}...`)
  mkdirSync(OUT_DIR, { recursive: true })
  for (let i = START_IDX; i < POSTS.length; i++) {
    await processPost(POSTS[i], i)
  }
  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
