import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { useTenants } from '@/hooks/useTenants';

interface OnboardingSteps {
  welcome_seen: boolean;
  google_connected: boolean;
  location_added: boolean;
  first_content_created: boolean;
  calendar_viewed: boolean;
}

interface OnboardingProgress {
  id: string;
  user_id: string;
  tenant_id: string | null;
  steps_completed: OnboardingSteps;
  onboarding_completed: boolean;
  onboarding_skipped: boolean;
  started_at: string;
  completed_at: string | null;
}

const DEFAULT_STEPS: OnboardingSteps = {
  welcome_seen: false,
  google_connected: false,
  location_added: false,
  first_content_created: false,
  calendar_viewed: false,
};

export function useOnboarding() {
  const { user } = useAuth();
  const { activeTenantId, tenants } = useTenants();
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch onboarding progress
  const fetchProgress = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('onboarding_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        // Parse steps_completed safely
        const stepsCompleted = typeof data.steps_completed === 'object' && data.steps_completed !== null
          ? { ...DEFAULT_STEPS, ...(data.steps_completed as Record<string, boolean>) }
          : DEFAULT_STEPS;
        
        setProgress({
          ...data,
          steps_completed: stepsCompleted as OnboardingSteps,
        });
      } else {
        // Create initial progress record using upsert to handle race conditions
        const { data: newData, error: upsertError } = await (supabase
          .from('onboarding_progress') as never)
          .upsert({
            user_id: user.id,
            tenant_id: activeTenantId || null,
            steps_completed: DEFAULT_STEPS,
          }, { 
            onConflict: 'user_id',
            ignoreDuplicates: false 
          })
          .select()
          .single();

        if (upsertError) {
          // If upsert failed, try fetching again (record might have been created by another process)
          const { data: retryData, error: retryError } = await supabase
            .from('onboarding_progress')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (retryError) throw retryError;
          
          if (retryData) {
            const stepsCompleted = typeof retryData.steps_completed === 'object' && retryData.steps_completed !== null
              ? { ...DEFAULT_STEPS, ...(retryData.steps_completed as Record<string, boolean>) }
              : DEFAULT_STEPS;
            
            setProgress({
              ...retryData,
              steps_completed: stepsCompleted as OnboardingSteps,
            });
          }
        } else if (newData) {
          const stepsCompleted = typeof newData.steps_completed === 'object' && newData.steps_completed !== null
            ? { ...DEFAULT_STEPS, ...(newData.steps_completed as Record<string, boolean>) }
            : DEFAULT_STEPS;
          
          setProgress({
            ...newData,
            steps_completed: stepsCompleted as OnboardingSteps,
          });
        }
      }
    } catch (err) {
      console.error('Error fetching onboarding progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to load onboarding');
    } finally {
      setLoading(false);
    }
  }, [user, activeTenantId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Auto-detect completed steps based on actual data
  const detectCompletedSteps = useCallback(async (): Promise<Partial<OnboardingSteps>> => {
    if (!activeTenantId) return {};

    const detected: Partial<OnboardingSteps> = {};

    try {
      // Check if Google is connected
      const { count: googleCount } = await supabase
        .from('google_accounts')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', activeTenantId);
      
      if (googleCount && googleCount > 0) {
        detected.google_connected = true;
      }

      // Check if locations exist
      const { count: locationCount } = await supabase
        .from('locations')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', activeTenantId);
      
      if (locationCount && locationCount > 0) {
        detected.location_added = true;
      }

      // Check if any content has been created
      const { count: postCount } = await supabase
        .from('scheduled_posts')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', activeTenantId);
      
      if (postCount && postCount > 0) {
        detected.first_content_created = true;
      }
    } catch (err) {
      console.error('Error detecting completed steps:', err);
    }

    return detected;
  }, [activeTenantId]);

  // Auto-sync detected steps when tenant is available
  useEffect(() => {
    const syncDetectedSteps = async () => {
      if (!progress || !user || !activeTenantId || progress.onboarding_completed) return;

      const detected = await detectCompletedSteps();
      
      if (Object.keys(detected).length === 0) return;

      // Check if any detected steps are not yet marked
      let hasNewCompletions = false;
      const updatedSteps = { ...progress.steps_completed };

      for (const [key, value] of Object.entries(detected)) {
        if (value && !updatedSteps[key as keyof OnboardingSteps]) {
          updatedSteps[key as keyof OnboardingSteps] = true;
          hasNewCompletions = true;
        }
      }

      if (!hasNewCompletions) return;

      // Check if all steps are complete
      const allComplete = Object.values(updatedSteps).every(v => v === true);

      try {
        const { error: updateError } = await supabase
          .from('onboarding_progress')
          .update({
            steps_completed: updatedSteps,
            onboarding_completed: allComplete,
            completed_at: allComplete ? new Date().toISOString() : null,
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;

        setProgress(prev => prev ? {
          ...prev,
          steps_completed: updatedSteps,
          onboarding_completed: allComplete,
          completed_at: allComplete ? new Date().toISOString() : null,
        } : null);
      } catch (err) {
        console.error('Error syncing detected steps:', err);
      }
    };

    syncDetectedSteps();
  }, [progress?.id, activeTenantId, user, detectCompletedSteps]);

  // Mark a step as complete
  const markStepComplete = useCallback(async (step: keyof OnboardingSteps) => {
    if (!progress || !user) return;

    const updatedSteps = {
      ...progress.steps_completed,
      [step]: true,
    };

    // Check if all steps are complete
    const allComplete = Object.values(updatedSteps).every(v => v === true);

    try {
      const { error: updateError } = await supabase
        .from('onboarding_progress')
        .update({
          steps_completed: updatedSteps,
          onboarding_completed: allComplete,
          completed_at: allComplete ? new Date().toISOString() : null,
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProgress(prev => prev ? {
        ...prev,
        steps_completed: updatedSteps,
        onboarding_completed: allComplete,
        completed_at: allComplete ? new Date().toISOString() : null,
      } : null);
    } catch (err) {
      console.error('Error updating onboarding step:', err);
    }
  }, [progress, user]);

  // Skip onboarding
  const skipOnboarding = useCallback(async () => {
    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from('onboarding_progress')
        .update({
          onboarding_skipped: true,
          onboarding_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProgress(prev => prev ? {
        ...prev,
        onboarding_skipped: true,
        onboarding_completed: true,
        completed_at: new Date().toISOString(),
      } : null);
    } catch (err) {
      console.error('Error skipping onboarding:', err);
    }
  }, [user]);

  // Mark onboarding as fully complete
  const markComplete = useCallback(async () => {
    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from('onboarding_progress')
        .update({
          onboarding_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setProgress(prev => prev ? {
        ...prev,
        onboarding_completed: true,
        completed_at: new Date().toISOString(),
      } : null);
    } catch (err) {
      console.error('Error completing onboarding:', err);
    }
  }, [user]);

  // Calculate completion percentage
  const completionPercentage = progress?.steps_completed
    ? Math.round(
        (Object.values(progress.steps_completed).filter(Boolean).length /
          Object.keys(progress.steps_completed).length) *
          100
      )
    : 0;

  // Check if onboarding should be shown
  const shouldShowOnboarding = 
    !loading && 
    progress && 
    !progress.onboarding_completed && 
    !progress.onboarding_skipped;

  return {
    progress,
    loading,
    error,
    completionPercentage,
    shouldShowOnboarding,
    markStepComplete,
    markComplete,
    skipOnboarding,
    detectCompletedSteps,
    refetch: fetchProgress,
  };
}
