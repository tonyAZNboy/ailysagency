# Feature 4 sub-phase breakdown

## F4.1 — Time-series store + feature engineering

**Repo:** Reviuzy
**Time-box:** 1 session (~5h)

- Migration: enable TimescaleDB extension OR create weekly-partitioned `ai_citation_snapshots` (tenant_id, engine, query, cited bool, citation_rank int, source_excerpt text, captured_at)
- Migration: `ai_features_daily` materialized view computing rolling-window aggregates (review_velocity_7d/30d, citation_count_active, schema_completeness_pct, content_cadence_30d, gbp_post_cadence_30d, photo_cadence_30d, nap_consistency_pct, competitor_share_delta_30d)
- Refresh job: nightly cron refreshes the materialized view
- Smoke `smoke-feature-store.mjs` (8 cases: data freshness, partition rotation, RLS, computation correctness on synthetic data)

## F4.2 — Modal Labs Python training pipeline

**Repo:** Reviuzy (Python in `ml/` subfolder)
**Time-box:** 2 sessions (~10h)

- `ml/train_share_of_model.py`: pulls 90d history from Supabase, joins citation snapshots with feature_daily, trains LightGBM regressor per engine
- 6 models (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot)
- Target: probability_of_citation_within_30d (regression bounded [0,1])
- Holdout last 7 days for eval; track MAE + AUC; reject promotion if MAE > previous model + 0.05
- Save artifacts to Supabase storage with `model_v{timestamp}_{engine}.pkl`
- Modal scheduling: weekly cron via Modal `schedule` decorator; max compute time 30min/run; cost cap via Modal env
- Audit log table `ai_model_versions` (version, engine, training_size, mae, auc, hyperparams jsonb, promoted_at)
- Smoke + eval notebook checked into PR

## F4.3 — `score-prediction` inference edge fn + nightly batch

**Repo:** Reviuzy
**Time-box:** 1 session (~5h)

- Edge fn `score-prediction`: loads latest promoted model artifact, computes prediction for `{ tenant_id, engine, horizon_days }`
- Top-5 drivers: SHAP value computation client-side or precomputed at training time and stored
- Counterfactual: small grid search varying input features (review_velocity, content_cadence) and recomputing probability
- Nightly batch cron: scores all Growth+ tenants × 6 engines × {30, 60, 90} horizons; writes to `ai_predictions` table
- Smoke `smoke-score-prediction.mjs` (10 cases: model load, fallback to baseline if model missing, RLS, rate-limit, valid output schema)

## F4.4 — Public client dashboard + counterfactual sandbox

**Repo:** Reviuzy (consumed by AiLys via existing dashboard surface)
**Time-box:** 2 sessions (~10h)

- Dashboard widget `/dashboard/predictions`: time-series chart with shaded prediction band (recharts or chart.js); per-engine tabs
- Top drivers card: bar chart of top-5 SHAP values with explanatory text
- Counterfactual sandbox: 4 sliders (review velocity, content cadence, GBP post cadence, photo cadence); recomputes prediction live via debounced edge fn calls
- Mobile-first per hard rule #13: stacked layout on 375px, two-column on 768px+
- Email weekly digest: Resend template with prediction summary + delta + top driver

## F4.5 — Admin model lineage + AiLys help articles

**Repo:** Reviuzy + AiLys
**Time-box:** 1 session (~4h)

- Reviuzy `/admin/ml-models`: list versions, MAE/AUC trends, promote/rollback buttons (admin only)
- AiLys help articles EN+FR-CA: `prediction-engine-explained`, `confidence-interval-meaning`, `counterfactual-usage-guide`
- AiLys cross-repo proxy `prediction-stats-proxy`
- STATE.md update + tag `v0.16.0-predictive-complete`

## Dependencies

F4.1 → F4.2 → F4.3 → F4.4 → F4.5 (mostly serial). F4.5 help articles can start in parallel with F4.4.

**External dep:** Modal Labs account creation + funding (~$50 starter credit covers 6+ months). Operator action.

## Definition of Done

- [ ] First trained model deployed to staging with eval notebook in PR
- [ ] MAE < 0.20 on holdout (industry baseline)
- [ ] Inference latency p99 < 500ms
- [ ] Counterfactual sandbox responsive on 375px mobile viewport
- [ ] Modal cost telemetry < $200/mo with alarm at $150
- [ ] Help articles live before dashboard surface
- [ ] A/B test framework operational for next model promotion
