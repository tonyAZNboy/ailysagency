# AiLys Design System — Inventory & Recyclability Audit

**Created:** 2026-05-02
**Purpose:** Inventory every reusable design asset in the AiLys repo before extracting them into a shared `@ailys/design-system` package consumable by both `ailysagency` (marketing site) and `ailys-client-sites` (portfolio + client site monorepo).

This is the **foundation** of the "AiLys Design System v1" workstream that converts the existing site code into a long-term, multi-product design system.

---

## TL;DR — Recyclability Score

| Category | Items | Reusable as-is | Needs adaptation | Missing |
|---|---|---|---|---|
| **Tokens** (colors, typo, spacing, motion) | 11 token sets | 11 / 11 (100%) | 0 | 6 mood theme variants |
| **Primitives** (shadcn/ui) | 49 components | 49 / 49 (100%) | 0 | none |
| **Patterns** (composed components) | 21 landing components | 14 / 21 (67%) | 7 (need mood-awareness) | StepperInteractive, ChatMockup, AnimatedCounter |
| **Backgrounds** | 1 (NetworkBackground) | 1 / 1 (100%, parametric) | 0 | 5 alt backgrounds (Mesh, Aurora, Grain, Topology, Liquid) |
| **Layouts** | 3 (Navbar, Footer, ChatWidget) | 3 / 3 (100%) | 0 | none |
| **Motion presets** | inline scattered | 0 / 0 | all | extract into 8 named presets |
| **Illustrations** | 0 (uses emoji + lucide) | n/a | n/a | 9 vertical illustrations needed |

**Bottom line:** ~70% of existing code is reusable as-is. Remaining 30% needs adaptation for mood-awareness or is missing entirely.

---

## 1. Design Tokens (100% reusable)

### Color palette (HSL-based, dark + light themes)

Source: `src/index.css` lines 12-52, `tailwind.config.ts` lines 21-78.

**Semantic tokens:**
- `background` / `foreground` (theme-aware)
- `card` / `card-foreground`
- `popover` / `popover-foreground`
- `primary` (217 91% 60% — bright blue)
- `secondary` (259 88% 66% — purple)
- `accent` (142 69% 46% — green)
- `destructive` (0 84% 60% — red)
- `muted` / `muted-foreground`
- `border` / `input` / `ring`

**SovranOS Liquid Glass accents** (already custom per-vertical-friendly):
- `authority-blue`
- `momentum-green`
- `risk-red`
- `opportunity-gold`

**Liquid Glass surface tokens:**
- `--lg-bg-color`, `--lg-bg-dark`
- `--lg-highlight`, `--lg-hover-glow`
- `--lg-blur` (blur 20px saturate 180%)
- `--lg-shadow`, `--lg-specular`
- `--lg-radius` (2rem), `--lg-radius-pill` (5rem)

### Typography

Source: `tailwind.config.ts` lines 79-85.

- **font-sans:** Albert Sans (system fallback)
- **font-serif / font-display:** Instrument Serif (Georgia fallback)
- **font-mono:** JetBrains Mono

### Border radius

- `--radius`: 1rem (default)
- `lg`: var(--radius)
- `md`: calc(var(--radius) - 2px)
- `sm`: calc(var(--radius) - 4px)

### Animations / keyframes

Source: `tailwind.config.ts` lines 87-180.

- accordion-down, accordion-up (radix)
- liquid-shimmer (200% bg position cycle)
- liquid-glow
- float, pulse, fade-in, slide-up (likely)

**Gap:** Need to extract scroll-triggered animations + per-vertical motion presets.

### Recommended extraction path

```
src/design-system/tokens/
├── colors.ts            ← exports HSL tuples + hex equivalents
├── typography.ts        ← font stacks + scale
├── spacing.ts           ← (currently uses Tailwind defaults, document)
├── motion.ts            ← keyframes + duration/easing presets
├── liquid-glass.ts      ← surface tokens
└── radii.ts             ← border-radius scale
```

---

## 2. Primitives — shadcn/ui (100% reusable, 49 components)

Source: `src/components/ui/`

**Form primitives:** Button, Input, Textarea, Checkbox, RadioGroup, Switch, Select, Label, Slider, Form, InputOTP, Calendar

**Layout primitives:** Card, Sheet, Dialog, AlertDialog, Drawer, Popover, HoverCard, Tooltip, Separator, AspectRatio, Resizable, ScrollArea, Tabs, Accordion, Collapsible, Sidebar

**Navigation:** Breadcrumb, Pagination, NavigationMenu, Menubar, ContextMenu, DropdownMenu, Command

**Feedback:** Toast, Toaster, Sonner, Alert, Skeleton, Progress, Badge

**Data:** Table, Carousel, Avatar, Chart

**Misc:** Toggle, ToggleGroup

**Image:** OptimizedImage (custom — picture element with WebP + fallback + lazy)

### Recyclability verdict

**100% as-is.** shadcn/ui is the gold standard for React component primitives. No changes needed.

### Recommended extraction path

```
src/design-system/primitives/   ← rename src/components/ui/
```

Or keep at `src/components/ui/` and just re-export under `@ailys/design-system/primitives` when extracting to package.

---

## 3. Patterns — Composed Landing Components (67% reusable)

Source: `src/components/landing/`

### Reusable as-is (14)

| Component | Lines | Used by | Notes |
|---|---|---|---|
| **Navbar** | ~250 | All pages | Sticky, lang selector, search, mobile menu |
| **Footer** | ~200 | All pages | 4-col, social, lang switcher |
| **HeroSection** | ~400 | Index | Animated headline, CTAs, social proof |
| **HeroAuditCard** | ~150 | Index hero | Embedded mini-audit |
| **AboutSection** | ~150 | Index | About AiLys |
| **ServicesSection** | ~250 | Index | 4-card services grid |
| **ProcessSection** | ~200 | Index | 6-step process |
| **MethodologySection** | ~250 | Index | 8-step methodology |
| **WhyAiLysSection** | ~200 | Index | Benefits grid |
| **ResourcesSection** | ~150 | Index | Blog teaser |
| **FaqSection** | ~150 | Index | FAQ accordion |
| **AuditCtaSection** | ~120 | Index | CTA strip |
| **BookCallSection** | ~150 | Index | Calendar booking CTA |
| **NewsletterSignup** | ~150 | Footer | Email capture |

### Need adaptation (7)

| Component | Why | Adaptation needed |
|---|---|---|
| **PricingBuilderSection** | Hard-coded tiers | Make data-driven (already on Pricing page) |
| **PricingDriversSection** | Hard-coded copy | Externalize to data file |
| **FoundingClientsSection** | Time-limited offer | Already deprecating; remove |
| **ExitIntentModal** | Single-purpose | Generalize to ExitIntent + variants |
| **LandingChatWidget** | Hard-coded prompts | Already configurable via env |
| **LiveTicker** | Hard-coded events | Wire to real events |
| **LanguageSelector** | Embedded in Navbar | Extract for reuse on samples |

### Missing patterns to design

| Pattern | Why we need it |
|---|---|
| **StepperInteractive** | Replace static methodology lists with interactive scroll-progress stepper |
| **ChatMockup** | Visualize sampleCitations as mock ChatGPT/Perplexity chat UI |
| **AnimatedCounter** | Stats strip values count up from 0 on scroll-into-view |
| **VerticalIllustration** | SVG illustration component with per-vertical art |
| **PortfolioCard** | Sample site preview card (for /realisations page) |
| **MoodSwatchCard** | Visual swatch showing the 6 mood themes |
| **BeforeAfterReveal** | Score reveal (e.g. AI Visibility before/after) |

### Recommended extraction path

```
src/design-system/patterns/
├── Hero/
│   ├── HeroDefault.tsx
│   ├── HeroAuditEmbed.tsx
│   └── HeroVerticalIllustration.tsx  (new)
├── StatsStrip/
│   ├── StatsStripStatic.tsx
│   └── StatsStripAnimated.tsx        (new)
├── MethodologyStepper/
│   ├── MethodologyList.tsx           (current)
│   └── MethodologyStepperInteractive.tsx (new)
├── FAQ/
│   └── FAQAccordion.tsx
├── ChatMockup/
│   └── ChatCitationCard.tsx          (new)
├── CTA/
│   ├── CTAStrip.tsx
│   └── CTAGradient.tsx
└── Portfolio/
    ├── PortfolioCard.tsx             (new)
    └── PortfolioGrid.tsx             (new)
```

---

## 4. Backgrounds (1 exists, 5 missing)

### Existing

**NetworkBackground** (`src/components/backgrounds/NetworkBackground.tsx`):
- Animated nodes + lines
- Parametric: backgroundColor, nodeColor, lineColor, nodeCount, mobileNodeCount, connectionDistance, mouseInfluenceRadius, mouseInfluenceStrength
- Used on /audit, /audit/gbp, /audit/nap, /book-call, /agencies/partner-program

### Recommended additions (per mood)

| Background | Mood it supports |
|---|---|
| **NetworkBackground** | Premium-Dark, Tech-Corporate (current) |
| **MeshGradientBackground** | Clean-Medical, Friendly-Local |
| **AuroraBackground** | Luxe-Editorial |
| **GrainTextureBackground** | Chaleureux-Artisan |
| **TopologyBackground** | Tech-Corporate alt |
| **LiquidBlobBackground** | Friendly-Local alt |

### Recommended extraction path

```
src/design-system/backgrounds/
├── NetworkBackground.tsx       (existing)
├── MeshGradientBackground.tsx  (new)
├── AuroraBackground.tsx        (new)
├── GrainTextureBackground.tsx  (new)
├── TopologyBackground.tsx      (new)
└── LiquidBlobBackground.tsx    (new)
```

---

## 5. Mood Themes (NEW — to design via Frontend-Design-Skill)

Each mood = **palette override + typography pairing + background choice + motion preset**.

| Mood ID | Palette direction | Typography | Background | Best for verticals |
|---|---|---|---|---|
| **premium-dark** | Black/charcoal + gold accent | Instrument Serif + Albert Sans | NetworkBackground | Lawyers, real-estate luxury, dental specialists |
| **clean-medical** | White/cyan + green accent | Albert Sans + JetBrains Mono | MeshGradientBackground | Clinics, dentists, healthcare |
| **chaleureux-artisan** | Cream/terracotta + warm wood | Serif display + sans body | GrainTextureBackground | Restaurants, contractors, hospitality |
| **tech-corporate** | Navy/electric blue + lime | Inter + JetBrains Mono | TopologyBackground | B2B services, consultants, accountants |
| **luxe-editorial** | Ivory/burgundy + gold leaf | Editorial serif + lite sans | AuroraBackground | Hotels, spas, premium real-estate |
| **friendly-local** | Pastel sky + coral + sun yellow | Rounded sans + handwritten accent | LiquidBlobBackground | Nail salons, sushi counters, cafes |

### Mood-vertical default mapping

```ts
// src/design-system/moods/vertical-defaults.ts
export const VERTICAL_DEFAULT_MOOD: Record<IndustrySlug, MoodId> = {
  dentists: "clean-medical",
  lawyers: "premium-dark",
  restaurants: "chaleureux-artisan",
  contractors: "chaleureux-artisan",
  clinics: "clean-medical",
  "real-estate": "luxe-editorial",
  hotels: "luxe-editorial",
  "nail-salons": "friendly-local",
  "sushi-counters": "friendly-local",
};
```

### Recommended path

```
src/design-system/moods/
├── premium-dark.ts
├── clean-medical.ts
├── chaleureux-artisan.ts
├── tech-corporate.ts
├── luxe-editorial.ts
├── friendly-local.ts
├── vertical-defaults.ts
└── index.ts                ← exports MoodId type + all moods
```

---

## 6. Motion presets (extract scattered Framer/CSS animations)

Currently:
- Tailwind keyframes in tailwind.config.ts (animation utilities)
- Inline transitions on Button hovers
- accordion-down/up via Radix

Missing structure:
- **Named presets** (e.g. `enterFade`, `enterRise`, `enterStagger`, `scrollProgress`, `tap`, `success`)
- **Per-mood motion personality** (premium-dark = slow + elegant, friendly-local = bouncy + playful)

### Recommended path

```
src/design-system/motion/
├── presets.ts              ← Named animation presets (Framer Motion variants)
├── easings.ts              ← Cubic-bezier curves
└── per-mood.ts             ← Mood overrides
```

If we don't add Framer Motion, we use Tailwind's `animate-*` utilities + custom keyframes.

**Decision needed:** Adopt Framer Motion (~50KB) or stay Tailwind-only? Recommend **Framer Motion** for the long-term portfolio quality (worth the bytes).

---

## 7. Illustrations (NEW — 9 vertical-specific SVGs needed)

| Vertical | Illustration concept |
|---|---|
| Dentists | Tooth + stethoscope abstract, cool blues |
| Lawyers | Scales of justice + skyline, dark gold |
| Restaurants | Plated dish + steam abstract, warm |
| Contractors | Hammer + blueprint geometric, ochre |
| Clinics | Cross + heartbeat line, soft mint |
| Real-estate | House silhouette + key, navy + cream |
| Hotels | Boutique facade + sun, indigo + ivory |
| Nail-salons | Hand silhouette + abstract polish drops, coral + pink |
| Sushi-counters | Maki cross-section + chopsticks, terracotta + black |

**Source options:**
- Custom commission (best, $200-500 per illustration)
- Midjourney/Ideogram + cleanup in SVG editor (mid, $20-50/illustration in time)
- unDraw + customize colors (free, lower quality)

**Recommended path:**

```
src/design-system/illustrations/
├── verticals/
│   ├── dentists.svg
│   ├── lawyers.svg
│   ├── restaurants.svg
│   ├── contractors.svg
│   ├── clinics.svg
│   ├── real-estate.svg
│   ├── hotels.svg
│   ├── nail-salons.svg
│   └── sushi-counters.svg
└── decorative/
    ├── dot-pattern.svg
    ├── grid-pattern.svg
    └── wave-divider.svg
```

---

## 8. Pages already using these patterns (proof of recyclability)

| Page | Patterns used | Reusable for samples |
|---|---|---|
| Index | Hero, Stats, Services, Process, Methodology, Why, Resources, FAQ, AuditCTA, BookCall | ✅ All |
| Industries.tsx | StatsStrip, MethodologyList, FAQ, CTA | ✅ All |
| Industry.tsx | Hero, StatsStrip, PainPoints, MethodologyList, ChatMockup (none yet), FAQ, CTA | ✅ With upgrades |
| AuditAIVisibility | Hero, AutoAuditEngine, Footer | Partial |
| AuditGbpPulse | Hero, GbpPulseEngine, Footer | Partial |
| AuditNapPulse | Hero, NapPulseEngine, CrossSell cards, Footer | Partial |
| PartnerProgram | Hero, FAQ, ApplicationForm | ✅ |
| Comparison | Hero, ComparisonTable, FAQ | ✅ |
| Help, HelpArticle | Article typography, sidebar | ✅ |

---

## 9. Migration plan (3-phase, non-breaking)

### Phase A — In-place organization (no breaking changes)
1. Create `src/design-system/` directory structure
2. Move `src/components/ui/` → `src/design-system/primitives/` with re-exports
3. Move `src/components/backgrounds/` → `src/design-system/backgrounds/`
4. Extract mood theme files (placeholders for now)
5. Update import aliases

### Phase B — Pattern extraction
1. Extract patterns from `src/components/landing/` into `src/design-system/patterns/`
2. Make them mood-aware via context provider
3. Refactor Industry.tsx to consume mood-by-vertical

### Phase C — Externalize as package
1. Initialize pnpm workspace
2. Move `src/design-system/` → `packages/design-system/`
3. Publish as `@ailys/design-system` (private npm registry or GitHub Packages)
4. Convert ailysagency to consume the package
5. Scaffold `ailys-client-sites/` repo with same dependency

**Phases A and B can ship in this session. Phase C is a separate workstream (1-2 sessions).**

---

## 10. Decisions needed before Phase A starts

1. **Framer Motion vs Tailwind animations only?** → Recommend Framer Motion
2. **Mood themes via CSS variables or Tailwind utilities?** → Recommend CSS variables (already infrastructure exists)
3. **Illustration sourcing strategy?** → Recommend Midjourney + SVG cleanup (fast + cheap + acceptable quality)
4. **Migration path for existing imports?** → Recommend re-exports from old paths (zero breaking changes)
5. **Where does mood-vertical mapping live?** → Recommend `src/design-system/moods/vertical-defaults.ts` (this file already drafted above)

---

## 11. Estimated effort breakdown

| Task | Effort | Session |
|---|---|---|
| Phase A scaffold (this doc + dir structure + re-exports) | 3-4h | This session |
| Frontend-Design-Skill mood proposal | 1-2h | This session (start) |
| 6 mood theme files (CSS vars + Tailwind tokens) | 4-6h | Next session |
| StepperInteractive + ChatMockup + AnimatedCounter components | 6-8h | Next session |
| Industry.tsx refactor for mood-by-vertical | 4-6h | Session 3 |
| 9 illustrations (Midjourney + cleanup) | 2-3 days | Async, parallel |
| 5 alt backgrounds | 1 day | Session 3 |
| ailys-client-sites repo + first sample | 2-3 days | Session 4-5 |

**Total to v1 portfolio:** ~10-15 days of concentrated work, but modular so we can ship incremental wins every 2-3 days.

---

**Status:** Phase A scaffolding starts immediately after this doc is committed.
