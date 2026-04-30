# Phase E.19 — Test matrix

| Layer | Count | Description |
|---|---|---|
| Unit tests (helper) | 4 | `getLocalizedHelpArticle(article, 'en')` returns EN fields. `(article, 'fr')` returns FR when present. `(article, 'fr')` falls back to EN when FR missing. `(article, 'invalid-lang')` falls back to EN. |
| Smoke script cases | 5 | (a) EN URL renders EN. (b) FR URL renders FR when sister exists. (c) FR URL falls back to EN when sister missing. (d) Unknown slug returns 404. (e) Unknown lang prefix falls back to EN. |
| Manual browser gates | 6 | Per Section 2 gate 8-9 of skill: |
| | | 1. `/help/contest-scope-client-runs-it` (EN) at 375x812 — title + body in EN. |
| | | 2. `/fr/help/contest-scope-client-runs-it` (FR) at 375x812 — title + body in FR with the PR #36+#37 NFC procurement clarifications visible. |
| | | 3. `/help/<slug>` at 768x1024 — no horizontal overflow, layout intact. |
| | | 4. `/fr/help/<slug>` at 768x1024 — same. |
| | | 5. `<html lang>` attribute = "fr" on FR URL. |
| | | 6. Breadcrumb "Home" / "Help" labels show in FR ("Accueil" / "Aide" or equivalent) when on FR URL. |
| Live curl gates | n/a | This is a static SPA route. No server-side endpoint to curl. The deploy.yml CI build is the proof the bundle compiles + the unit/smoke gates assert the helper logic. |
| i18n locale switch | 1 | Switching to FR-CA via the lang switcher on a help article URL navigates to `/fr/help/<slug>` AND the body re-renders in FR. |
| Admin panel surface | n/a | Help articles are static project data; no per-tenant admin gating (hard rule #11 N/A for static content per its own definition: "for new SHIPPED capabilities"). |
| Help center articles | n/a | This PR DOES NOT add a new help article. It fixes the rendering of existing ones. Hard rule #10 satisfied because the affected articles already exist in EN + FR. |

## Acceptance criteria

- All 4 unit tests green
- All 5 smoke cases green
- All 6 manual browser gates pass
- `tsc --noEmit` clean
- `audit-translations-deep.mjs` exit 0 (no new i18n keys added in this PR)
- `audit-blog-translations.mjs` exit 0 (this PR does not touch blog)
- em-dash sweep clean on edited files
- npm run build green
- New smoke script wired into deploy.yml
- STATE.md updated in same commit
- No new dependency added

## Time-box

1.5h estimate. Escape hatch fires at 3.0h.
