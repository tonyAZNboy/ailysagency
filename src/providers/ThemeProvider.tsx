import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// Keep API compatible with the usage across the app
export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string; // kept for compatibility with next-themes API
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // If the landing page has forced dark mode, don't override it
  if (root.getAttribute('data-force-dark') === 'true') {
    root.classList.add('dark');
    return;
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { transition: none !important; }';
  document.head.appendChild(style);
  
  root.classList.toggle("dark", isDark);
  
  window.getComputedStyle(root).opacity;
  document.head.removeChild(style);
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // initialize from localStorage or system
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored ?? defaultTheme;
    setThemeState(initial);
    applyTheme(initial);
  }, [defaultTheme]);

  // sync changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  // respond to system changes when using system theme
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const stored = (localStorage.getItem("theme") as Theme | null) ?? defaultTheme;
      if (stored === "system") applyTheme("system");
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [defaultTheme]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    setTheme: (t: Theme) => setThemeState(t),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  // Provide a safe fallback during HMR or if rendered outside provider
  if (!ctx) {
    return { theme: "system" as Theme, setTheme: () => {} };
  }
  return ctx;
}
