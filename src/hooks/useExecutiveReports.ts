import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenants } from "./useTenants";
import { useToast } from "./use-toast";

interface ExecutiveReport {
  id: string;
  report_type: string;
  content: string;
  data_snapshot: any;
  generated_by: string;
  created_at: string;
}

export function useExecutiveReports() {
  const [reports, setReports] = useState<ExecutiveReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { activeTenantId } = useTenants();
  const { toast } = useToast();

  const fetchReports = useCallback(async () => {
    if (!activeTenantId) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("executive_reports")
        .select("*")
        .eq("tenant_id", activeTenantId)
        .order("created_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      setReports((data as any) || []);
    } catch (e) {
      console.error("Failed to fetch reports:", e);
    } finally {
      setIsLoading(false);
    }
  }, [activeTenantId]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const generateReport = useCallback(async () => {
    if (!activeTenantId) return;
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("executive-report", {
        body: { tenantId: activeTenantId },
      });
      if (error) throw error;
      toast({ title: "Report Generated", description: "Your executive report is ready." });
      await fetchReports();
      return data.report;
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate report", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  }, [activeTenantId, fetchReports, toast]);

  return { reports, isLoading, isGenerating, generateReport, refetch: fetchReports };
}
