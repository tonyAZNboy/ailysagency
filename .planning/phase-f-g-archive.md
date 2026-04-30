# Phase F + G archive (parked, future sessions)

**Status:** parked 2026-04-29 to focus on Phase E.1 completion. Resume when Phase E.1 + E.2 (Reviuzy custom domain) shipped.

## Phase F : Social Search Velocity (TikTok + Instagram + YouTube Shorts)

**Goal:** track and optimize client visibility across the 3 short-form video platforms that compete with Google for Gen Z + Millennial searches.

### Decisions in flight

- **Coverage:** TikTok + Instagram Reels + YouTube Shorts (3 platforms in one combo)
- **Pricing v1:** standalone add-on `Social Search Velocity` at +249 $/mo per domain (vs splitting into 2 separate add-ons; combo converts better)
- **Tier eligibility:** Core, Growth, Agency. Bundled by default in Agency tier.
- **Architecture:** hybrid (Apify TikTok scraper + Instagram Graph API + YouTube Data API)
- **Cost direct fleet 50 clients:** ~30 $/mo Apify + 0 $ IG + 0 $ YT + ~5h strategist/client = ~35-45 $ direct cost, marge ~80% on 249 $

### What probes track

- Top 10 client keywords per month per platform
- Share of platform vs 3 competitors
- Top hashtags performing + missing
- Engagement rate (per platform native metric)
- Geo discoverability (TikTok Near Me, IG Top Places, YT regional)

### Pre-requisites operator

- Facebook Business Verification (5-15 days)
- TikTok Content Posting API access (2-4 weeks)
- YouTube Data API project + OAuth consent screen (days)
- Apify business account + credit card (instant)

### Sub-phases (Phase F)

| Sub-phase | Effort | Note |
|---|---|---|
| F.1.1 Apify TikTok scraper integration + KV cache | 6-8h | |
| F.1.2 Instagram Graph API + OAuth flow | 8-10h | OAuth tokens encrypted, RLS |
| F.1.3 YouTube Data API + OAuth | 6-8h | Free quota |
| F.1.4 Endpoint /api/social-visibility-probe (3 platforms) | 5-6h | |
| F.1.5 Migration tenant_social_keywords + tenant_social_oauth_tokens + RLS | 3-4h | |
| F.1.6 Cron monthly social-monthly-probe | 2h | |
| F.1.7 UI dashboard cross-platform 3 cards | 10-12h | |
| F.1.8 Section dans monthly visibility PDF | 3-4h | Reuses Phase E.1.X infra |
| F.1.9 Admin panel Social Velocity toggle | 3-4h | |
| F.1.10 Help articles 5 (TT, IG, YT, OAuth setup, dashboard) | 3-4h | |

**Phase F total: ~50-62h**

## Phase G : AiLys Studio Pipeline (auto video production)

**Goal:** client films 30 sec on phone, system handles edit/captions/multi-platform/post automatically.

### Critical lesson from prior parallel Claude session (4h failure)

- **Anti-pattern:** TTS audio generation -> Whisper re-transcription -> manual fix
- **Bug source:** `narrated-video` skill uses `fix_captions.py` band-aid because Whisper re-transcribes generated TTS audio with drift + word errors
- **Right pattern:** FORCED ALIGNMENT, never re-transcription
  - ElevenLabs `text_to_speech.convert_with_timestamps` (character-level)
  - Edge TTS `WordBoundary` events (free, native)
  - WhisperX with align step (uses known text, not re-transcription)
- **Caption render:** `.ass` (Advanced SubStation Alpha) format with millisecond timing, single FFmpeg pass to avoid cumulative drift

### Decisions in flight

- **NO 100% AI-generated video** (algos detect, E-E-A-T tank, ToS violations). Client films real footage.
- **Pricing:** standalone +349 $/mo OR combo Velocity Pro +499 $/mo (Phase F + G bundle)
- **Realistic auto-pass rate:** 65-80% of videos automated, 20-35% need strategist QA
- **Marge realiste:** ~85% (vs naive 95%) accounting for 5-15 min strategist time per video
- **Voiceover IA optionnel:** +99 $/mo for camera-shy clients, with mandatory AI disclosure (Quebec Loi 25 + ARQ)

### Sub-phases (Phase G)

| Sub-phase | Effort | Note |
|---|---|---|
| G.0.1 Foundation: word-level transcription endpoint + forced alignment | 6-8h | **Must ship and verify on real client video before any other G.x work** |
| G.0.2 Refactor existing `narrated-video` skill to use forced alignment | 4-6h | Eliminate fix_captions.py |
| G.1.1 Client video upload UI | 12-16h | |
| G.1.2 Cloudflare Stream integration + R2 storage | 6-8h | Or external compute (Modal, Railway, Fargate) : Workers CPU limits |
| G.1.3 FFmpeg auto-edit pipeline | 16-20h | |
| G.1.4 Multi-platform reformatter (9:16 standard) | 6-8h | |
| G.1.5 Auto-caption + auto-translate + auto-hashtag | 8-10h | Forced alignment from G.0.1 |
| G.1.6 Thumbnail generation (3 options from real footage) | 4-6h | |
| G.1.7 TikTok Content Posting API integration | 8-10h | Inherits Phase F.1 OAuth |
| G.1.8 Instagram Reels auto-post | 6-8h | Inherits Phase F.1 OAuth |
| G.1.9 YouTube Shorts auto-post | 6-8h | Inherits Phase F.1 OAuth |
| G.1.10 Strategist QA dashboard | 8-10h | Critical for 20-35% manual cases |
| G.1.11 Performance scheduler (best-time-to-post) | 6-8h | |
| G.1.12 Help articles + AI disclosure compliance | 4h | Quebec ARQ + FTC critical |

**Phase G total: ~96-122h**

### Caption styles library (competitive moat)

- Classic SRT (white-on-black bottom)
- TikTok karaoke (1-2 mots highlight + color change)
- Bold pop (1 mot fullscreen + emoji)
- Native social (3-5 mots, position varies, animation)
- Premium subtle (faded background, professional)
- Auto-emoji-injection on keywords

### Quebec marketing angle

"Vous filmez en quebecois? Captions automatiques avec accents, expressions, anglicismes geres. 0 retouche."

Differentiator vs CapCut, Submagic (US-tools galerent avec quebecois).

## Sequencing recommendation

1. Finish Phase E.1 (current focus, paused on tier-comparison.ts page)
2. Phase E.2 (Reviuzy custom domain `app.ailysagency.ca`, 7-10h)
3. Phase F.1 (TikTok+IG+YT probes, 50-62h)
4. **Phase G.0.1 first** (forced-alignment foundation + verify on real video) before any G.1.x work
5. Phase G.1 (Studio Pipeline) after G.0.1 verified

## When to revisit

- After Phase E.1 ships (current branch lands)
- After Phase E.2 ships (Reviuzy custom domain)
- After Anthony has the FB Business Verification + TikTok Content Posting API + YouTube Data API approvals in hand
- After verification test on real client video confirms forced-alignment delta < 200ms per word

Until then: **parked, no work**. Reference this doc to resume.
