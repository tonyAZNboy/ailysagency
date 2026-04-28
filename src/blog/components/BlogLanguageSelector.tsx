/**
 * Language selector for AiLys blog pages.
 *
 * AiLys ships 16 locales, all hand-authored. The blog uses URL-prefixed routes
 * (`/<lang>/blog/...`) for non-EN locales; EN uses the bare path (`/blog/...`).
 * On switch this component:
 *   1. Calls `setLang(code)` so the rest of the app re-renders in the new
 *      locale (this also persists to localStorage).
 *   2. Navigates to the URL the caller built via `buildPath(code)`.
 *
 * The 16 locales are ordered to match `SUPPORTED_LANGS` from src/i18n/index.ts.
 */
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, Globe, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/i18n/LangContext'
import {
  SUPPORTED_LANGS,
  LANG_LABELS,
  LANG_FLAGS,
  type SupportedLang,
} from '@/i18n'

/** English display name per locale, used as a secondary line in the dropdown. */
const ENGLISH_NAME: Record<SupportedLang, string> = {
  en: 'English',
  fr: 'French (Canada)',
  es: 'Spanish',
  zh: 'Chinese',
  ar: 'Arabic',
  ru: 'Russian',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  nl: 'Dutch',
  pl: 'Polish',
  ja: 'Japanese',
  ko: 'Korean',
  tr: 'Turkish',
  vi: 'Vietnamese',
  hi: 'Hindi',
}

/**
 * Display order for the dropdown. Pinned locales (the most common AiLys
 * audiences) appear first, then the rest in source order from SUPPORTED_LANGS.
 */
const PINNED: SupportedLang[] = ['en', 'fr', 'es']
const REST: SupportedLang[] = SUPPORTED_LANGS.filter((c) => !PINNED.includes(c))

interface LangEntry {
  code: SupportedLang
  flag: string
  nativeName: string
  englishName: string
}

const ENTRIES: LangEntry[] = SUPPORTED_LANGS.map((code) => ({
  code,
  flag: LANG_FLAGS[code],
  nativeName: LANG_LABELS[code],
  englishName: ENGLISH_NAME[code],
}))

const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ')

interface BlogLanguageSelectorProps {
  /**
   * Build the destination path for a given language code. The caller decides
   * whether to add `/<lang>` prefix (typical) or strip it for English.
   * Example: `(code) => code === 'en' ? '/blog/foo' : `/${code}/blog/foo``
   */
  buildPath: (lang: SupportedLang) => string
}

const Item = memo(function Item({
  entry,
  isActive,
  onSelect,
}: {
  entry: LangEntry
  isActive: boolean
  onSelect: (code: SupportedLang) => void
}) {
  return (
    <button
      onClick={() => onSelect(entry.code)}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
        isActive
          ? 'bg-cyan-500/10 text-cyan-400'
          : 'text-white/70 hover:bg-white/5 hover:text-white',
      )}
    >
      <span
        className="shrink-0 text-xl leading-none"
        aria-hidden="true"
      >
        {entry.flag}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-medium truncate">{entry.nativeName}</span>
        {entry.nativeName !== entry.englishName && (
          <span className="block text-[11px] text-white/30 truncate">{entry.englishName}</span>
        )}
      </span>
      {isActive && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
    </button>
  )
})

export const BlogLanguageSelector = memo(function BlogLanguageSelector({
  buildPath,
}: BlogLanguageSelectorProps) {
  const { lang: currentLang, setLang } = useLang()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50)
  }, [open])

  const current = ENTRIES.find((l) => l.code === currentLang) || ENTRIES[0]

  const pinnedEntries = PINNED.map((c) => ENTRIES.find((e) => e.code === c)!).filter(Boolean)
  const restEntries = REST.map((c) => ENTRIES.find((e) => e.code === c)!).filter(Boolean)

  const filtered = search.trim()
    ? ENTRIES.filter((l) => {
        const q = search.toLowerCase()
        return (
          l.englishName.toLowerCase().includes(q) ||
          l.nativeName.toLowerCase().includes(q) ||
          l.code.toLowerCase().includes(q)
        )
      })
    : null

  const switchLang = useCallback(
    (code: SupportedLang) => {
      setOpen(false)
      setSearch('')
      if (code === currentLang) return
      setLang(code)
      navigate(buildPath(code))
    },
    [currentLang, buildPath, navigate, setLang],
  )

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-white/60 hover:text-white/90 transition-colors"
        style={{
          background: 'rgba(10, 20, 40, 0.4)',
          border: '1px solid rgba(0, 229, 255, 0.15)',
        }}
        aria-label="Change blog language"
      >
        <Globe className="w-3.5 h-3.5 sm:hidden" />
        <span className="hidden sm:inline text-base leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span className="hidden sm:inline">{current.nativeName}</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-2 right-2 top-14 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 max-h-[420px] rounded-xl overflow-hidden z-[100]"
            style={{
              background: 'rgba(8, 15, 30, 0.95)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(0, 229, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 229, 255, 0.05)',
            }}
          >
            <div className="p-2 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="w-full pl-9 pr-3 py-2 bg-white/5 rounded-lg text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-cyan-500/30"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-[350px] p-1.5 custom-scrollbar">
              {filtered ? (
                filtered.length > 0 ? (
                  filtered.map((entry) => (
                    <Item
                      key={entry.code}
                      entry={entry}
                      isActive={entry.code === currentLang}
                      onSelect={switchLang}
                    />
                  ))
                ) : (
                  <p className="text-center text-white/30 text-sm py-6">No languages found</p>
                )
              ) : (
                <>
                  {pinnedEntries.map((entry) => (
                    <Item
                      key={entry.code}
                      entry={entry}
                      isActive={entry.code === currentLang}
                      onSelect={switchLang}
                    />
                  ))}
                  <div className="my-1.5 mx-3 border-t border-white/8" />
                  {restEntries.map((entry) => (
                    <Item
                      key={entry.code}
                      entry={entry}
                      isActive={entry.code === currentLang}
                      onSelect={switchLang}
                    />
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
