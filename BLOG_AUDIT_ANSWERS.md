# Blog audit answers (Phase E.18 follow-up)

**Operator answers received 2026-04-30** to the 10 validation questions in STATE.md (top section: "NEXT SESSION PICKUP — blog content audit (Phase E.18)").

The next Claude session should:
1. Read `STATE.md` top section for the 10 questions
2. Read this file for the answers
3. Apply targeted edits to the 4 blog post files:
   - `src/blog/posts/ailys-product/ailys-reviuzy-addon-deep-dive.tsx`
   - `src/blog/posts/ailys-product/ailys-reviuzy-addon-deep-dive.fr.tsx`
   - `src/blog/posts/reputation-reviews/reviuzy-review-automation-guide.tsx`
   - `src/blog/posts/reputation-reviews/reviuzy-review-automation-guide.fr.tsx`
4. Open PR titled "Phase E.18: blog content audit fixes per operator validation"

---

## Answers

### Q1: Standalone consumer app on App Store/Google Play with free tier

**NO.** Leftover marketing pre-AiLys. There is no public consumer-facing standalone app. Remove all references to "App Store / Google Play standalone app" and "free version with manual review collection only" from blog content.

### Q2: $20/mo standalone subscription

**NO.** Not offered. The only path is the $100/mo add-on (or bundled in Agency tier). Remove the "$20/mo" mention entirely; replace any "subscription starts at $20/mo" with the actual add-on path.

### Q3: Video winner picker

**YES.** The contest engine generates a winner-announcement video. This claim stays.

### Q4: 20+ country legal terms generator

**YES, exactly 20.** Replace "20+ countries" with "20 countries" if the blog says "20+". The exact count is 20.

### Q5: NFC stickers ship in welcome kit

**NO, not free in welcome kit.** Clients buy and program their own NFC cards. AiLys offers a service for $100 one-time (3 cards with programming included) if they want it done for them. Update blog content to reflect:

- Default model: client purchases + programs NFC cards themselves
- Optional service: $100 one-time, 3 cards with programming included
- Remove "shipped in welcome kit" framing entirely

### Q6: 60-70% NFC tap → posted review conversion rate

**ESTIMATE, not verified data.** Soften to industry-typical range. Replace "60-70%" with "industry-typical 40-70%" or similar hedged language to avoid overpromising specific figures without solid measured data.

### Q7: Agency tier features bundle (multi-loc dashboard, white-label, dedicated strategist, weekly reporting)

**YES bundled, but with caveats:**
- Multi-location dashboard: yes
- White-label: yes
- Dedicated strategist: yes BUT no calls or interviews on Starter/Core
- Weekly reporting: only on Growth and Agency at 1x/month cadence (NOT weekly)

Update blog content to reflect: Starter and Core get reporting/strategist support via async/email only (no calls); Growth and Agency get 1 monthly strategist call/interview (NOT weekly reporting).

### Q8: Agency contests cadence (1/2/4 per month per business)

**YES, slightly different mapping:**
- Starter: 2 contests/month
- Core: 4 contests/month
- Growth: per domain (count not specified, assumed equal to or higher than Core)
- Agency: per domain (same)

Update blog: starter=2, core=4, growth and agency are per-domain (multi-location aware). Confirm exact growth/agency cadence with operator if not 4 or higher per domain.

### Q9: Fake review detection — live or roadmap?

**Operator unsure. NEEDS DEEP AUDIT to confirm.**

The next session should:
1. Search the Reviuzy codebase + AiLys codebase for any "fake review", "spam detection", "review moderation" code
2. Check Supabase functions and edge functions for relevant capability
3. Check if the feature is exposed via UI in any admin panel or client app
4. Report findings with file paths and code excerpts before changing blog content
5. If live: blog claim stays. If roadmap: replace with "coming soon" or remove from current feature list.

### Q10: GBP attribute manager — live or roadmap?

**Operator believes live but uncertain. NEEDS DEEP AUDIT to confirm.**

The next session should:
1. Search Reviuzy + AiLys codebase for "gbp attribute", "google business profile attribute", "attribute manager" code paths
2. Check if it's wired into the client dashboard or strategist admin UI
3. Check Supabase edge functions for GBP attribute API calls
4. Report findings with file paths and code excerpts before changing blog content
5. If live: blog claim stays. If roadmap: replace appropriately.

---

## Cross-repo deep audit instructions for Q9 and Q10

The deep audit must check **both repos**:

### AiLys repo (this repo, `tonyAZNboy/ailysagency`)
- `functions/api/` — all Cloudflare Pages Functions
- `src/components/` — admin and client components
- `src/integrations/` — third-party integrations

### Reviuzy repo (parallel session repo, `tonyAZNboy/reviuzy`)
- `supabase/functions/` — Supabase Edge Functions
- `src/components/admin/` — strategist admin UI
- `src/pages/admin/` — admin pages
- `supabase/migrations/` — database schema for relevant tables

If next session does not have direct file access to Reviuzy repo, request operator to clone it locally first or use `gh api` to inspect specific paths.

## Recommended PR strategy

Single PR covering Q1+Q2+Q4+Q5+Q6+Q7+Q8 changes (operator-confirmed). Q3 needs no change. Q9 and Q10 are blocking on deep audit results — split into a follow-up PR after audit findings are documented.

---

## Pricing reminder for context

Per CLAUDE.md (current as of v0.8.3):
- Starter: $300/mo CAD
- Core: $600/mo CAD
- Growth: $1,200/mo CAD
- Agency: $2,500/mo CAD
- AiLys Automation reputation add-on: $100/mo (bundled in Agency)

Effective pricing with add-on:
- Starter+addon: $400/mo
- Core+addon: $700/mo
- Growth+addon: $1,300/mo
- Agency: $2,500/mo (addon included)

Make sure blog content reflects these numbers. Earlier session already corrected stale prices (799→600, 1499→1200, 2500→2499) but verify nothing else is stale during the Q9/Q10 audit pass.
