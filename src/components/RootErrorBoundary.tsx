import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

export class RootErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("RootErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            padding: "2rem",
            maxWidth: "600px",
            margin: "2rem auto",
            fontFamily: "system-ui, sans-serif",
            background: "#1a1a2e",
            color: "#eee",
            borderRadius: "8px",
            border: "1px solid #333",
          }}
        >
          <h1 style={{ marginTop: 0, color: "#f03" }}>Something went wrong</h1>
          <p style={{ marginBottom: "1rem" }}>
            The app crashed. Open the browser console (F12 → Console) for details.
          </p>
          <pre
            style={{
              padding: "1rem",
              background: "#0f0f1a",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "13px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#00e6ff",
              color: "#0f0f23",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
