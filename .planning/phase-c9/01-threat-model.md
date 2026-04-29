# Phase C.9 : Threat Model

## Attack surface

| Surface | Owner |
|---|---|
| `compute-health-score` edge fn | Reviuzy, daily cron |
| `tenant_health_scores` table | Reviuzy, RLS |
| Admin trend chart | Reviuzy, strategist+ |
| Alert insertion when score drops | Reviuzy, reuses Phase 10 alerts table |

## Secrets

| Secret | Notes |
|---|---|
| `HEALTH_SCORE_ENABLED` | Kill switch |
| `HEALTH_SCORE_DRY_RUN` | Default false in prod |

No new external API calls; no new secrets.

## RLS impact

`tenant_health_scores`: members SELECT own (so a client can see their own score if exposed), strategist+ SELECT all, service_role full.

## Vectors

1. **Score gaming**: client artificially inflates dashboard logins to mask real disengagement. Mitigation: components weighted by behavioral signals that are harder to fake (citation acceptance, photo upload quality, NPS proxy).
2. **PII leak in components**: `components` JSONB. Mitigation: store ratios + counts only; no review text, no email, no IP.
3. **False-negative**: client churns despite good score. Mitigation: track precision/recall over 90 days; tune thresholds quarterly.
4. **False-positive**: strategist reaches out, client wasn't actually at risk. Mitigation: strategist judgment is the gate; training emphasizes context > raw score.
5. **Cross-tenant leakage**: tenant A's score visible to tenant B. Mitigation: RLS scoped to own tenant_id.
6. **Score drift**: scoring formula changes over time, breaking historical comparison. Mitigation: store `formula_version` per row; admin chart filters by version.
7. **Alert spam**: every small score dip triggers alert. Mitigation: alert only on threshold cross OR trend < -10 over 7d (not every daily change).
8. **Component subscription drift**: a component table renames or disappears, score breaks. Mitigation: builder lib handles missing tables gracefully (component contributes 0, others reweight).
9. **Strategist abuse**: strategist marks all alerts "no action" to clear inbox. Mitigation: action log retains forever; quarterly review.
10. **Pricing-tier influence**: high-tier clients always score higher because they have more features in use. Mitigation: score normalized per tier; absolute score not comparable across tiers.

## Fail-closed

- `HEALTH_SCORE_ENABLED=false` (or unset) : feature off
- `HEALTH_SCORE_DRY_RUN=true` : score computed and logged, no alert insertion
- Source data missing : component contributes 0 with a "data_unavailable" flag
