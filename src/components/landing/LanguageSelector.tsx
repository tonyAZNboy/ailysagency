import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '@/i18n/LangContext';
import { LANG_LABELS, LANG_FLAGS, SupportedLang } from '@/i18n/index';

interface LanguageSelectorProps {
  className?: string;
}

const SUPPORTED_LANGS: SupportedLang[] = [
  'en', 'es', 'fr', 'zh', 'de', 'ar',
  'hi', 'it', 'ja', 'ko', 'nl', 'pl',
  'pt', 'ru', 'tr', 'vi',
];

export function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Preserve the current path when switching languages so a user on
  // /blog/my-slug stays on the localized version of that post instead of
  // being thrown back to the landing page.
  function buildPathForLang(targetLang: SupportedLang): string {
    const path = location.pathname || '/';
    const localePrefix = path.match(/^\/([a-z]{2})(\/|$)/);
    let stripped = path;
    if (localePrefix && (SUPPORTED_LANGS as readonly string[]).includes(localePrefix[1])) {
      stripped = path.slice(3) || '/';
      if (stripped === '') stripped = '/';
    }
    if (targetLang === 'en') return stripped + (location.search || '') + (location.hash || '');
    const newPath = stripped === '/' ? `/${targetLang}` : `/${targetLang}${stripped}`;
    return newPath + (location.search || '') + (location.hash || '');
  }
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 208, maxHeight: 320 });
  const [openUpward, setOpenUpward] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Position the portal dropdown relative to the button
  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dropdownWidth = Math.min(208, viewportWidth - 16);
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 320;

      // Vertical: prefer below, flip above if not enough space
      const shouldOpenUpward = spaceBelow < dropdownHeight + 8 && spaceAbove > spaceBelow;
      const top = shouldOpenUpward
        ? rect.top + window.scrollY - Math.min(dropdownHeight, spaceAbove - 16) - 8
        : rect.bottom + window.scrollY + 8;

      // Horizontal: align to right edge of button, clamp to viewport
      const rawLeft = rect.right + window.scrollX - dropdownWidth;
      const left = Math.max(8, Math.min(rawLeft, viewportWidth - dropdownWidth - 8));

      const maxHeight = Math.min(320, shouldOpenUpward ? spaceAbove - 16 : spaceBelow - 16);

      setOpenUpward(shouldOpenUpward);
      setDropdownPos({ top, left, width: dropdownWidth, maxHeight });
    }
  };

  useEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', updatePosition, true);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  const dropdown = open ? createPortal(
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: dropdownPos.top,
        left: dropdownPos.left,
        width: `${dropdownPos.width}px`,
        maxHeight: `${dropdownPos.maxHeight}px`,
        overflowY: 'auto',
        zIndex: 999999,
        borderRadius: '10px',
        background: 'rgba(8, 18, 26, 0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 243, 255, 0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,243,255,0.08)',
      }}
    >
      <div style={{ padding: '4px 0' }}>
        {SUPPORTED_LANGS.map((code) => (
          <button
            key={code}
            onClick={() => {
              setLang(code);
              setOpen(false);
              navigate(buildPathForLang(code));
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '8px 12px',
              background: lang === code ? 'rgba(0,243,255,0.12)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              color: lang === code ? 'hsl(185 100% 50%)' : 'rgba(255,255,255,0.85)',
              fontWeight: lang === code ? 600 : 400,
              fontSize: '14px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => {
              if (lang !== code) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
            }}
            onMouseLeave={e => {
              if (lang !== code) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>{LANG_FLAGS[code]}</span>
            <span>{LANG_LABELS[code]}</span>
            {lang === code && <span style={{ marginLeft: 'auto', fontSize: '12px' }}>✓</span>}
          </button>
        ))}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs uppercase font-semibold">{lang}</span>
      </button>
      {dropdown}
    </div>
  );
}
