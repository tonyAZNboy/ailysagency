# Phase C.8 : Threat Model

## Attack surface

| Surface | Owner | Notes |
|---|---|---|
| `partner.ailysagency.ca` | New | Pages custom domain, brand-isolated |
| Reseller dashboard | Reviuzy | New routes `/partner/*` strategist+ + reseller-admin gate |
| Sub-tenant create flow | Reviuzy | Edge fn `reseller-create-subtenant`, RLS-scoped |
| Stripe Connect platform | Stripe | New integration; webhook hardening required |
| `reseller_invoices` table | Reviuzy | RLS: reseller-admin SELECT own invoices, service_role full |

## Secrets touched

| Secret | Storage |
|---|---|
| `STRIPE_CONNECT_SECRET_KEY` | Reviuzy edge fn env (NEW) |
| `STRIPE_CONNECT_WEBHOOK_SECRET` | Reviuzy edge fn env (NEW) |
| `RESELLER_PROGRAM_ENABLED` | Kill switch |

## Top vectors

1. **Cross-reseller leakage**: reseller A sees reseller B's sub-tenants. Mitigation: RLS predicate `is_reseller_admin(reseller_parent_id)` enforces parent_id match at SELECT.
2. **Sub-tenant pricing tampering**: a sub-tenant sees the reseller markup. Mitigation: markup is server-only field, never returned to sub-tenant queries.
3. **Stripe Connect webhook spoofing**: Mitigation: signature verification required, replay window 5 min.
4. **Reseller charge their own clients without paying AiLys**: Mitigation: Stripe Connect application fee charged at the platform level; reseller cannot bypass.
5. **Reseller branding abuse**: reseller uploads infringing logo. Mitigation: TOS bind reseller liability; abuse report flow + manual review.
6. **Sub-tenant migration to direct AiLys**: a sub-tenant tries to leave their reseller. Mitigation: documented in reseller TOS; technical migration via `client_type` change (Phase 4.5 history table preserves trail).
7. **Reseller credentialing**: a reseller-admin role grants too much. Mitigation: 3-tier reseller role (admin, viewer, support); least-privilege per role.
8. **Hostname spoofing**: someone visits `partner.fake-ailys.com`. Mitigation: HSTS + canonical link rel + email banner warning users to verify domain.
9. **Sub-tenant data exfil by reseller**: a malicious reseller dumps client data. Mitigation: reseller cannot SELECT raw review/photo data of sub-tenant; only aggregate counts. Per CLAUDE.md hard rule #9.
10. **Stripe Connect KYC drift**: reseller passes KYC then engages in fraud. Mitigation: Stripe Connect platform-level monitoring + AiLys revenue hold for 7 days on new resellers.

## Fail-closed

- `RESELLER_PROGRAM_ENABLED=false` (default until launched): all `/partner/*` routes 404
- Reseller without active Stripe Connect account: cannot create sub-tenants
- Sub-tenant without reseller_parent_id: behaves as direct AiLys client (existing pattern)
