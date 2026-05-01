// AiLys Agency · Audit data source
//
// We reuse the `reputation-audit` edge function deployed under the
// Reviuzy Inc Supabase project (production-tested, pulls real GBP data
// via Google APIs). Reviuzy Inc is the legal entity operating AiLys
// Agency; the audit endpoint is the same legal-entity infra. Calling
// it from the AiLys frontend is fine; it's a public lead-gen surface.
//
// Once AiLys has its own Supabase project + edge function deployed, swap
// this client to use the env-driven supabase client (../supabase/client.ts).
//
// TODO(audit-source): migrate to AiLys's own Supabase project once provisioned.
import { createClient } from "@supabase/supabase-js";

const REVIUZY_URL = "https://qucxhksrpqunlyjjvuae.supabase.co";
const REVIUZY_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1Y3hoa3NycHF1bmx5amp2dWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NjU4ODEsImV4cCI6MjA3MDU0MTg4MX0.Bd4wu_DdAJN8OknkoXBjCpIt8F4q-j54LrkzE_zioVs";

// Distinct storageKey so this client does not collide with the main supabase
// client (../supabase/client.ts). Both call createClient under the same browser
// context; without unique storageKeys, Supabase warns "Multiple GoTrueClient
// instances detected" at runtime. We do not persist auth on the audit source
// (anon-only public lead-gen), so storage is effectively unused, but the key
// must still be unique to silence the warning.
export const auditSourceClient = createClient(REVIUZY_URL, REVIUZY_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    storageKey: "ailys-audit-source-auth",
  },
});

export interface AuditResult {
  reputation_score: number;
  diagnostic_summary: string;
  weakness_analysis: string;
  growth_projection: string;
  competitor_gap: string;
  revenue_projection: string;
  ai_response_example: string;
  action_plan: string;
  sentiment_breakdown: string;
  platform_presence: string;
  response_rate_analysis: string;
  review_velocity: string;
  local_seo_impact: string;
  customer_retention_insight: string;
}
