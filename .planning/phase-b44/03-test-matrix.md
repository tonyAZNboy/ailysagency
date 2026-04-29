# Phase B.4.4 : Test Matrix

## B.4.4.AiLys.1 + B.4.4.AiLys.2

| Gate | Type | Count | Status |
|---|---|---|---|
| 1. tsc | CI | 1 | required |
| 2. audit-translations-deep | CI | 1 | required |
| 3. audit-blog-translations | CI | 1 | required |
| 4. em-dash sweep | CI | 1 | required |
| 5. existing smokes (66 cases) | CI | 5 scripts | required |
| 6. NEW smoke admin-audit-pdf-stats (12 cases) | CI | 1 | required |
| 7. build | CI | 1 | required |
| 8. live curl | manual | 4 | required |
| 9. browser preview | manual | n/a (no UI in AiLys) | skip |
| 10. FR-CA locale | manual | n/a (no UI strings) | skip |
| 11. admin panel | manual | n/a (lives in Reviuzy) | skip in AiLys, required in Reviuzy |
| 12. EN+FR-CA help articles | manual | 0 (this is internal observability) | skip |
| 13. STATE.md same-commit | gate | 1 | required |

**Live curl scenarios (gate 8):**
1. GET `/api/admin/audit-pdf-stats` with no auth headers : 401 missing_headers
2. GET with bad caller : 403 caller_not_allowed
3. GET with valid HMAC : 200 + valid JSON shape
4. POST with valid HMAC : 405 method_not_allowed

## B.4.4.Rvz.1 + B.4.4.Rvz.2 + B.4.4.Rvz.3

| Test | Cases |
|---|---|
| Edge fn signs HMAC correctly | 1 |
| Edge fn rejects non-strategist | 1 |
| Edge fn caches 30s | 1 |
| Hook fetches | 1 |
| Hook handles 503 | 1 |
| Page strategist+ render | 1 |
| Page member-role 403 | 1 |
| Cost card formatting | 1 |
| Empty state | 1 |
| Populated state (50 rows) | 1 |

**Total Reviuzy:** 10 vitest cases.

## Cross-repo aggregate

- AiLys: 12 new smoke cases
- Reviuzy: 10 new vitest cases
- Total new automated coverage: 22 cases

## Manual verification gates (operator)

After both repos ship:

1. ✅ AiLys live curl 4 scenarios pass
2. ✅ Reviuzy admin page loads, shows recent invocations
3. ✅ Cost card matches expected (today_count * $0.0003)
4. ✅ Refresh button updates timestamps
5. ✅ Member role gets 403 on Reviuzy nav entry
6. ✅ Strategist sees the page
