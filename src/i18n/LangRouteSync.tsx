import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from './LangContext';
import { SUPPORTED_LANGS, type SupportedLang } from './index';

/**
 * Phase E.20: route-aware LangContext sync.
 *
 * `LangProvider` runs `detectLang()` only once at mount, so when the user
 * navigates client-side from `/blog/<slug>` to `/fr/help/<slug>` (or any
 * cross-locale link), the chrome (Navbar/Footer/forms) keeps rendering in
 * the stale lang. This component watches `useLocation().pathname` and
 * calls `setLang(newLang)` when the URL prefix changes.
 *
 * Mount point: must live INSIDE `<BrowserRouter>` (otherwise
 * `useLocation()` throws). It is mounted as the first child of the
 * Router in `src/App.tsx`. Renders nothing.
 *
 * Idempotency: only fires `setLang` when the derived prefix differs
 * from current `lang`. When pathname has no recognized lang prefix
 * (e.g. `/`, `/help/<slug>`), this hook does NOT mutate `lang` —
 * preserves any user-stored preference (localStorage choice via the
 * lang switcher) and matches the contract that prefix-less URLs
 * inherit the user's last explicit lang choice.
 */
export function LangRouteSync(): null {
  const { pathname } = useLocation();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const segment = pathname.split('/')[1] as SupportedLang;
    if (!SUPPORTED_LANGS.includes(segment)) {
      // No lang prefix on this route. Leave lang as-is to honor the
      // user's last explicit selection (localStorage / initial detect).
      return;
    }
    if (segment === lang) {
      // Already in sync. No setLang call. This is the idempotency
      // guard that prevents an infinite loop with the lang switcher
      // (which calls setLang AND navigate simultaneously).
      return;
    }
    setLang(segment);
  }, [pathname, lang, setLang]);

  return null;
}
