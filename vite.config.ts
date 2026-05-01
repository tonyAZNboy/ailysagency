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
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor split for cache stability
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/react-router")) {
            return "vendor-router";
          }
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }
          if (id.includes("node_modules/@radix-ui")) {
            return "vendor-radix";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          if (id.includes("node_modules/react-helmet-async")) {
            return "vendor-helmet";
          }
          if (id.includes("node_modules/react-markdown") || id.includes("node_modules/remark") || id.includes("node_modules/micromark") || id.includes("node_modules/mdast")) {
            return "vendor-markdown";
          }
          // 16 locale i18n translations
          if (id.includes("/src/i18n/translations/")) {
            return "i18n";
          }
          // Blog post sister files (FR siblings eager-loaded via import.meta.glob)
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
