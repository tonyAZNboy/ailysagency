# Phase C.7 : Sub-phases

Total estimate: ~12h. Time-box ceiling: 24h.

## Cross-repo split

| Repo | Sub-phases | Hours |
|---|---|---|
| AiLys (this worktree) | C.7.AiLys.1 | 1.5h |
| Reviuzy | C.7.Rvz.1 to C.7.Rvz.4 | 10.5h |

---

## C.7.AiLys.1 : Help article + STATE handoff (~1.5h)

**Files:**
- `src/data/help-articles.ts` : 1 article slug `renewal-and-upsell-signals`
- `STATE.md`

**Content:**
- What triggers a renewal nudge (30 / 14 / 7 days before anniversary)
- What triggers an upsell signal (cap hits, plateau, etc.)
- Privacy + opt-out path
- How the strategist uses the signals

**Commit:** `docs(c7): help article renewal-and-upsell-signals + Reviuzy handoff`

---

## C.7.Rvz.1 : Migration + signal builder lib (~3h, Reviuzy)

**Files (Reviuzy):**
- `supabase/migrations/20260502000000_create_renewal_signals.sql`
- `supabase/migrations/20260502010000_add_upsell_emails_enabled_to_tenants.sql`
- `supabase/functions/_shared/renewalSignals.ts` (pure builder, vitest-covered)
- `src/test/lib/renewalSignals.test.ts` (24 cases)
- `src/test/rls/renewalSignals.isolation.test.ts` (8 cases)

**Schema:**
```sql
CREATE TABLE renewal_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  signal_type TEXT NOT NULL CHECK (signal_type IN (
    'renewal_30d','renewal_14d','renewal_7d',
    'upsell_citation_cap','upsell_photo_cap','upsell_visibility_plateau','upsell_dashboard_engagement'
  )),
  signal_strength NUMERIC(3,2) NOT NULL CHECK (signal_strength >= 0 AND signal_strength <= 1),
  suggested_tier TEXT,
  signal_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  email_sent_at TIMESTAMPTZ,
  actioned_at TIMESTAMPTZ,
  actioned_by UUID REFERENCES profiles(id),
  action_reason TEXT,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, signal_type, (generated_at::date))
);

ALTER TABLE tenants ADD COLUMN upsell_emails_enabled BOOLEAN NOT NULL DEFAULT false;
```

**Builder logic (pure functions, no I/O):**
```ts
buildRenewalSignal(input: { stripe_anniversary, today, status }): Signal | null
buildCitationCapSignal(input: { tenant_id, last_3mo_usage, tier }): Signal | null
buildPhotoCapSignal(input: { tenant_id, last_3mo_usage, tier }): Signal | null
buildVisibilityPlateauSignal(input: { tenant_id, last_90d_scores }): Signal | null
buildDashboardEngagementSignal(input: { tenant_id, last_30d_logins, tier }): Signal | null
```

**Commit:** `feat(c7): renewal_signals table + RLS + builder lib + 32 vitest`

---

## C.7.Rvz.2 : Edge fn `compute-renewal-signals` (~3h, Reviuzy)

**Files:**
- `supabase/functions/compute-renewal-signals/index.ts`
- `src/test/edge/computeRenewalSignals.test.ts` (16 cases)

**Behavior:**
1. Iterate active tenants
2. For each, call all builder functions
3. INSERT each non-null signal with ON CONFLICT skip
4. If signal_strength >= 0.6, insert strategist alert via existing alerts table
5. If signal_strength >= 0.8 AND upsell_emails_enabled, send Resend email (brand-aware) and set email_sent_at

**Commit:** `feat(c7): compute-renewal-signals edge fn + DRY_RUN`

---

## C.7.Rvz.3 : pg_cron + admin panel (~3h, Reviuzy)

**Files:**
- `supabase/migrations/20260502020000_schedule_renewal_signals.sql` (cron `0 6 * * *`)
- `src/pages/RenewalSignals.tsx`
- `src/hooks/useRenewalSignals.ts`
- Nav entry

**UI:**
- Filter by signal_type
- Last 50 signals, sortable
- Action button per row (mark actioned + reason)
- Stat cards: actioned this week, pending, conversion rate (signals to tier upgrades)

**Commit:** `feat(c7): pg_cron + admin renewal-signals panel`

---

## C.7.Rvz.4 : Email template + opt-in toggle (~1.5h, Reviuzy)

**Files:**
- `supabase/functions/_shared/emails/renewalNudge.tsx` (React Email)
- `supabase/functions/_shared/emails/upsellSuggestion.tsx`
- Settings page toggle for `upsell_emails_enabled`

**Commit:** `feat(c7): renewal + upsell email templates + opt-in toggle`

---

## Hand-off checklist

1. Read this file
2. Apply 3 migrations
3. Deploy edge fn
4. Set 2 env vars
5. Build admin UI
6. DRY_RUN test on 1 seed Growth tenant approaching renewal
7. Flip live, monitor for first week
