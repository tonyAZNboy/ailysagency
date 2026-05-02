# @ailys/design-system (in-tree, pre-extraction)

This directory is the **future home** of `@ailys/design-system`, a shared
design system intended to be consumed by both:

1. **`ailysagency`** (this repo) , the marketing site
2. **`ailys-client-sites`** (separate repo, not yet created) , portfolio
   samples + actual client websites delivered by the agency

## Current state (Phase A complete)

- `tokens/` , re-exports of color, typography, motion tokens
- `primitives/` , re-exports from `src/components/ui/` (shadcn/ui)
- `backgrounds/` , re-exports from `src/components/backgrounds/`
- `moods/` , 6 mood theme placeholders (premium-dark, clean-medical,
  chaleureux-artisan, tech-corporate, luxe-editorial, friendly-local)
  + vertical-default mapping
- `patterns/` , placeholder for extracted composed components

## What this directory is NOT (yet)

- Not yet an npm package
- Not yet consumed by external repos
- Not yet a hard boundary (existing imports from `src/components/ui/`
  still work via re-exports)

## Roadmap to extraction

See `docs/design-system-inventory.md` for full migration plan (Phases A,
B, C). This Phase A scaffold prepares the ground; Phases B and C extract
patterns and externalize as a true package.

## Why in-tree first

Following the "extreme long-term" principle from the architecture
discussion: prepare the structure now so the migration is mechanical
later. Zero breaking changes means we can ship incremental design
improvements through this directory while the old paths still work.

## Mood themes (per CLAUDE.md hard rule #11)

Each mood is a **palette + typography + background + motion personality**
applied to the vertical. Mood-vertical defaults are in `moods/vertical-defaults.ts`.

| Mood | Default for verticals |
|---|---|
| premium-dark | lawyers, real-estate-luxury |
| clean-medical | dentists, clinics |
| chaleureux-artisan | restaurants, contractors |
| tech-corporate | (B2B services) |
| luxe-editorial | hotels |
| friendly-local | nail-salons, sushi-counters |

## Bilingual + 16-locale safe

All design tokens are language-agnostic. Mood theme strings (if any
ship later) must follow CLAUDE.md hard rule #8: 16-locale parity, EN
canonical, FR-CA full coverage.
