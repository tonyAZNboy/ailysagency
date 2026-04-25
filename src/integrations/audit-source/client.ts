// AiLys Agency · Audit data source
//
// We reuse Reviuzy's `reputation-audit` edge function (which is already
// production-tested and pulls real GBP data via Google APIs). Reviuzy is a
// sister product run by the same team, and this audit endpoint is a public
// lead-gen surface, so calling it from AiLys is fine.
//
// Once AiLys has its own Supabase project + edge function deployed, swap
// this client to use the env-driven supabase client (../supabase/client.ts).
//
// TODO(audit-source): migrate to AiLys's own Supabase project once provisioned.
import { createClient } from "@supabase/supabase-js";

const REVIUZY_URL = "https://qucxhksrpqunlyjjvuae.supabase.co";
const REVIUZY_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1Y3hoa3NycHF1bmx5amp2dWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NjU4ODEsImV4cCI6MjA3MDU0MTg4MX0.Bd4wu_DdAJN8OknkoXBjCpIt8F4q-j54LrkzE_zioVs";

export const auditSourceClient = createClient(REVIUZY_URL, REVIUZY_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
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
