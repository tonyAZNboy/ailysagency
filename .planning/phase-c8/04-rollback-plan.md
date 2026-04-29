# Phase C.8 : Rollback Plan

## Levels

### Level 1: Pause new reseller signups
Set `RESELLER_PROGRAM_ENABLED=false`. New `/partner/apply` returns "we are not accepting partners at this time". Existing resellers continue.

### Level 2: Suspend a specific reseller
`UPDATE tenants SET subscription_status='suspended' WHERE id=$reseller_id`. Sub-tenants migrate to direct AiLys (manual support, takes 1 business day per sub-tenant).

### Level 3: Disable Stripe Connect platform
Revoke OAuth tokens, freeze application fees. Existing payouts complete; new ones halt.

### Level 4: Full revert
Drop `client_type='reseller'`, `reseller_parent_id`, `markup_pct`, `reseller_invoices` table. Migrate sub-tenants to direct billing manually.

## Stripe Connect cleanup

- Outstanding payouts honored per Stripe rules (cannot retract once initiated)
- KYC data retained per Stripe retention policy (separate from AiLys data)
- Document migration of any active Stripe Connect accounts before revert

## Cross-tenant data preservation

Sub-tenants never lose their workspace data on reseller offboarding. The `reseller_parent_id` is nullable; setting it to null transitions them to direct AiLys client (Phase 4.5 client_type history table preserves trail).

## Pre-flight

Run on staging:
1. Onboard reseller A
2. Reseller A creates 2 sub-tenants
3. Suspend reseller A (Level 2)
4. Verify sub-tenants accessible directly
5. Roll back fully (Level 4)
6. Verify migrations clean

## Incident log

(empty)
