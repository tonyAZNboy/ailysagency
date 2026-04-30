import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { RootErrorBoundary } from '@/components/RootErrorBoundary'
import { installClientErrorCapture } from '@/lib/clientErrorCapture'
import './index.css'

// Phase E.11: install client-side error capture before React mounts
// so window.onerror + unhandledrejection events from React itself are caught.
// Endpoint is fail-closed via CLIENT_ERROR_ENABLED env var (defaults to drop).
installClientErrorCapture()

const root = document.getElementById("root")
if (!root) throw new Error("Root element #root not found")
createRoot(root).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
)
