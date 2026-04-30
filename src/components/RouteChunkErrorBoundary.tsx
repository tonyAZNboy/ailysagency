// Phase E.7: error boundary specifically for React.lazy chunk fetch failures.
//
// Why this exists: Phase E.5 introduced lazy-loaded route chunks. If a user
// opens a stale tab during/after a deploy, the cached HTML references chunk
// hashes that no longer exist on the server. The chunk fetch throws a
// ChunkLoadError or 404, which crashes the Suspense subtree. The generic
// RootErrorBoundary catches it but shows a developer-style stack trace.
// This boundary specifically handles chunk fetch failures with a friendly
// recovery flow.
//
// Auto-recovery strategy:
// - On first ChunkLoadError, set a sessionStorage flag and reload the page
//   (browser refetches the latest index.html with current chunk hashes)
// - If the same error recurs after reload (flag already set), show the
//   manual recovery UI to avoid an infinite reload loop
//
// Bilingual EN+FR-CA inline (no new i18n keys, zero parity drift)

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; isChunkError: boolean; error: Error | null };

const RELOAD_FLAG_KEY = "ailys_chunk_reload_attempted";

function isChunkLoadError(error: Error | unknown): boolean {
  if (!(error instanceof Error)) return false;
  // Vite + Rollup typically throws errors with these signatures on chunk fetch fail:
  // - "Failed to fetch dynamically imported module"
  // - "Loading chunk N failed"
  // - "Importing a module script failed"
  // - error.name === "ChunkLoadError"
  const msg = error.message || "";
  return (
    error.name === "ChunkLoadError" ||
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Loading chunk \d+ failed/i.test(msg) ||
    /Importing a module script failed/i.test(msg) ||
    /error loading dynamically imported module/i.test(msg)
  );
}

export class RouteChunkErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, isChunkError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    const isChunk = isChunkLoadError(error);
    return { hasError: true, isChunkError: isChunk, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("RouteChunkErrorBoundary caught:", error, errorInfo);
    if (isChunkLoadError(error) && typeof window !== "undefined") {
      const alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG_KEY) === "true";
      if (!alreadyReloaded) {
        sessionStorage.setItem(RELOAD_FLAG_KEY, "true");
        // Auto-reload to fetch latest index.html. The new index references
        // current chunk hashes, so the lazy import succeeds.
        window.location.reload();
      }
      // If alreadyReloaded, fall through to manual recovery UI below.
    }
  }

  resetAndReload = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(RELOAD_FLAG_KEY);
      window.location.reload();
    }
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const isFr = typeof document !== "undefined" && document.documentElement.lang === "fr";
    const heading = this.state.isChunkError
      ? (isFr ? "Mise a jour disponible" : "Update available")
      : (isFr ? "Une erreur s'est produite" : "Something went wrong");
    const body = this.state.isChunkError
      ? (isFr
          ? "L'application a ete mise a jour pendant que vous etiez sur cette page. Rechargez pour continuer avec la derniere version."
          : "The app updated while you were on this page. Reload to continue with the latest version.")
      : (isFr
          ? "Une erreur inattendue est survenue. Rechargez la page pour reprendre."
          : "An unexpected error occurred. Reload the page to recover.");
    const cta = isFr ? "Recharger la page" : "Reload page";

    return (
      <div
        role="alert"
        aria-live="assertive"
        className="min-h-screen bg-background text-foreground flex items-center justify-center p-6"
      >
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm">
          <div className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-3">AiLys</div>
          <h1 className="text-xl sm:text-2xl font-bold mb-3">{heading}</h1>
          <p className="text-sm text-zinc-300 mb-6 leading-relaxed">{body}</p>
          <button
            type="button"
            onClick={this.resetAndReload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-zinc-900 font-semibold text-sm hover:bg-amber-300 transition min-h-[44px]"
          >
            {cta}
          </button>
          {!this.state.isChunkError && this.state.error && (
            <details className="mt-6">
              <summary className="text-xs text-zinc-500 cursor-pointer hover:text-zinc-300">
                {isFr ? "Details techniques" : "Technical details"}
              </summary>
              <pre className="mt-2 p-3 rounded bg-black/40 text-[11px] text-zinc-400 overflow-auto max-h-40">
                {this.state.error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }
}
