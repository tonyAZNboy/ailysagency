import { Component, ReactNode } from "react";

/**
 * Per-section error boundary for the audit results page.
 *
 * One unlocked section throwing should not crash the entire audit page.
 * The user has already received the lead capture + PDF email at this point;
 * blowing up the UI on a render bug is a UX disaster.
 *
 * On catch: log to console (visible in DevTools) and render a small inline
 * fallback so the rest of the audit page keeps rendering. Sentry capture
 * would happen via the parent RootErrorBoundary if a section never recovered,
 * but per-section the strategy is to swallow gracefully.
 */
interface Props {
  /** Human-readable section name for the fallback message + console log. */
  name: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class SectionBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    console.error(`[SectionBoundary:${this.props.name}]`, error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="status"
          className="rounded-2xl border border-amber-400/30 bg-amber-500/5 backdrop-blur-md p-4 text-xs text-amber-200/80"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300 mb-1">
            Section indisponible
          </div>
          <p className="leading-relaxed">
            Cette section n'a pas pu charger. Le reste du rapport reste accessible
            et le PDF est en route vers votre courriel.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
