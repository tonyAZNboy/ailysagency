import { en } from './translations/en';
import { es } from './translations/es';
import { fr } from './translations/fr';
import { zh } from './translations/zh';
import { de } from './translations/de';
import { ar } from './translations/ar';
import { hi } from './translations/hi';
import { it } from './translations/it';
import { ja } from './translations/ja';
import { ko } from './translations/ko';
import { nl } from './translations/nl';
import { pl } from './translations/pl';
import { pt } from './translations/pt';
import { ru } from './translations/ru';
import { tr } from './translations/tr';
import { vi } from './translations/vi';

export type SupportedLang =
  | 'en' | 'es' | 'fr' | 'zh' | 'de' | 'ar'
  | 'hi' | 'it' | 'ja' | 'ko' | 'nl' | 'pl'
  | 'pt' | 'ru' | 'tr' | 'vi';

export const SUPPORTED_LANGS: SupportedLang[] = [
  'en', 'es', 'fr', 'zh', 'de', 'ar',
  'hi', 'it', 'ja', 'ko', 'nl', 'pl',
  'pt', 'ru', 'tr', 'vi',
];

export const RTL_LANGS: SupportedLang[] = ['ar'];

export const LANG_LABELS: Record<SupportedLang, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  de: 'Deutsch',
  ar: 'العربية',
  hi: 'हिन्दी',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
};

export const LANG_FLAGS: Record<SupportedLang, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  zh: '🇨🇳',
  de: '🇩🇪',
  ar: '🇸🇦',
  hi: '🇮🇳',
  it: '🇮🇹',
  ja: '🇯🇵',
  ko: '🇰🇷',
  nl: '🇳🇱',
  pl: '🇵🇱',
  pt: '🇧🇷',
  ru: '🇷🇺',
  tr: '🇹🇷',
  vi: '🇻🇳',
};

export const translations: Record<SupportedLang, typeof en> = {
  en, es, fr, zh, de, ar, hi, it, ja, ko, nl, pl, pt, ru, tr, vi,
};

export function detectLang(): SupportedLang {
  // 1. Check URL path prefix e.g. /es/... or /fr/...
  const pathLang = window.location.pathname.split('/')[1] as SupportedLang;
  if (SUPPORTED_LANGS.includes(pathLang)) return pathLang;

  // 2. Check localStorage
  const stored = localStorage.getItem('reviuzy_lang') as SupportedLang;
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;

  // 3. Check browser language
  const browserLang = navigator.language.slice(0, 2) as SupportedLang;
  if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;

  return 'en';
}

export function isRTL(lang: SupportedLang): boolean {
  return RTL_LANGS.includes(lang);
}

export { en };
export type TranslationKeys = typeof en;
