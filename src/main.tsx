import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { RootErrorBoundary } from '@/components/RootErrorBoundary'
import './index.css'

const root = document.getElementById("root")
if (!root) throw new Error("Root element #root not found")
createRoot(root).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
)
