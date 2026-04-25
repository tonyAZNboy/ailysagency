import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SupportedLang,
  translations,
  detectLang,
  isRTL,
  LANG_LABELS,
} from './index';
import type { TranslationKeys } from './index';

interface LangContextType {
  lang: SupportedLang;
  t: TranslationKeys;
  setLang: (lang: SupportedLang) => void;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SupportedLang>(() => detectLang());

  const setLang = useCallback((newLang: SupportedLang) => {
    setLangState(newLang);
    localStorage.setItem('reviuzy_lang', newLang);

    // Update document dir for RTL support
    document.documentElement.dir = isRTL(newLang) ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;

    // Update meta og:locale for SEO
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', newLang);
  }, []);

  useEffect(() => {
    // Apply dir on first load
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] ?? translations['en'];

  return (
    <LangContext.Provider value={{ lang, t, setLang, isRTL: isRTL(lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextType {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
