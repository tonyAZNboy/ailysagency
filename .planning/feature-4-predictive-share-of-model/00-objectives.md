# Feature 4: Predictive Share-of-Model (Reviuzy primary)

## Business goal

Move from descriptive to predictive: don't just measure citation share, predict where it's going. ML model trained on historical citation data + signal velocity outputs "ChatGPT will cite your brand within 14 days at 73% confidence if you maintain current cadence." Becomes the unique selling point no competitor can match.

## Hours saved + revenue uplift

- **Differentiation moat:** every other AI Visibility tool reports past data. Predictive moves AiLys from category participant to category leader.
- **Tier upgrade trigger:** Growth+ exclusive feature. Targets 10% of Core base to upgrade ($300 MRR each = ~$1.5k MRR).
- **Renewal lever:** counterfactual sandbox ("if you publish 4 GBP posts/wk instead of 2, probability rises to 0.78") gives strategist concrete ROI argument at renewal.
- **Strategist hours saved:** ~3h/mo per Growth+ client (no more manual trend extrapolation; the model does it).

## Who benefits

- **Client:** sees forward-looking forecast vs rear-view-mirror reporting
- **Strategist:** has data-grounded "do this to move the needle" recommendations
- **Operator:** AiLys becomes the only platform with predictive AI Visibility = pricing power

## Deliverable scope

**Reviuzy side (separate session):**
1. Migration: TimescaleDB extension OR partition `ai_citation_snapshots` weekly; add `ai_features_daily` materialized view; add `ai_predictions` table
2. Python pipeline (Modal Labs serverless): LightGBM regressor per engine (6 models: ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot); train weekly on 90d history
3. Model artifact storage: Supabase storage bucket with versioning; track MAE + AUC per version in audit table
4. Edge fn `score-prediction`: input `{ tenant_id, engine, horizon_days }`, output `{ probability, confidence_interval, top_5_drivers, counterfactuals }`
5. Batch nightly cron: scores all Growth+ tenants, writes to `ai_predictions`
6. Admin panel: model lineage view (training data hash, hyperparams, metric delta vs prev model)
7. Public client dashboard: time-series chart (actual citation share + 30d prediction band), per-engine breakdown, top-drivers card, counterfactual sandbox
8. Email weekly digest: "Your ChatGPT prediction this week: 67% (up from 54%). Top driver: schema completeness +12%."

**AiLys side:**
1. Help center articles EN+FR-CA: "How AiLys predicts your AI Visibility", "Reading the confidence interval", "Using counterfactuals to improve your score"
2. Per hard rule #10: articles MUST NOT name LightGBM/Modal/SHAP; refer to "the AiLys prediction engine"
3. Marketing landing: predictive moat positioning
4. Cross-repo proxy `prediction-stats-proxy`

## Cost estimate per invocation

- **Modal Labs compute:** ~$0.50/training run × 6 models × weekly = $12/wk = ~$50/mo
- **Inference:** edge fn ~5ms per call, free
- **Storage:** model artifacts ~5MB × 6 engines × 4 versions retained = 120MB, free
- **Total:** ~$50/mo flat at any scale (bounded by training cadence, not tenant count). Hard cap $200/mo via Modal env vars.
- **Anthropic:** zero (deterministic ML; no LLM in the prediction path)

## Why this dep (Section 10)

**Possible new deps:**
- LightGBM (Python, Modal-side only): NOT on Cloudflare runtime; Modal deploy is independent ✅
- Modal Labs SDK (Python): Modal-side only ✅
- TimescaleDB: Supabase Pro plan supports it; flag as "nice-to-have, partition table fallback if not available" ✅

**Net new deps on Cloudflare/Reviuzy runtime: ZERO.**
**New external service: Modal Labs (justified — no in-house ML compute alternative; serverless pay-per-run is right model).**

## ISO gates required

- [ ] Model lineage stored per training run: data hash, hyperparams, MAE + AUC, ship with eval notebook in PR
- [ ] DRY_RUN mode returns synthetic predictions for staging
- [ ] A/B test new models vs production for 7 days before promotion (champion/challenger)
- [ ] Inference rate-limit: max 50 calls/min/tenant
- [ ] Fallback: when model unavailable, edge fn returns baseline (last 7d average)
- [ ] Audit log on every inference call (tenant_id, engine, horizon, model_version)
- [ ] RLS test: tenant A cannot read tenant B `ai_predictions`
- [ ] Help articles live before UI surface
- [ ] Cost telemetry alarm at $150/mo Modal spend

## Time-box estimate

**5 sub-phases, ~7 sessions total** (model training + counterfactual sandbox UI are the two longest).

See `02-sub-phases.md` for breakdown.
