import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-query", "react-router-dom"],
  },
  optimizeDeps: {
    include: ["@tanstack/react-query", "react", "react-dom", "react-router-dom"],
  },
  build: {
    // Bumped from default 500. Eager hot-path (Index + i18n + blog registry) is
    // still large by design; cold-path pages are already code-split per E.5.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Data-only split. Splitting React/Helmet/Router into separate vendor
        // chunks triggers TDZ on react-helmet-async ("Cannot access 'O' before
        // initialization") because rollup hoists re-exported React bindings
        // across chunk boundaries before they've been assigned by the React
        // module in another chunk. Verified via PR #96 -> PR #100 revert and
        // local repro at v0.14.3 where rootChildren=0 in vite preview.
        // Keeping all node_modules in the default index chunk avoids the
        // circular-init issue. We still get major wins by chunking the large
        // data-side modules (i18n + EN/FR blog posts) which have no React
        // import cycles.
        manualChunks: (id) => {
          if (id.includes("/src/i18n/translations/")) {
            return "i18n";
          }
          if (id.includes("/src/blog/posts/") && id.endsWith(".fr.tsx")) {
            return "blog-posts-fr";
          }
          if (id.includes("/src/blog/posts/")) {
            return "blog-posts-en";
          }
          return undefined;
        },
      },
    },
  },
}));
