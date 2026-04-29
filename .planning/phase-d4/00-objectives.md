# Phase D.4 : Sentry + structured audit log standardization

## Business goal

Currently 100+ catch blocks across edge fns silently log errors to stdout (Logpush captures, but ops grep manually). Production errors vanish unless someone notices. D.4 wires Sentry (or compatible) for actionable alerting + standardizes audit log shape across all edge fns to ride on top of D.1's audit_log table.

D.4 ships:
1. Sentry SDK integration in Reviuzy edge fns + frontend
2. Standardized error envelope (typed Result<T> across all fns)
3. Audit log shape standardization (every action follows same schema)
4. Per-tenant alert routing for high-severity errors
5. Operator dashboard listing recent errors with filters

This is observability hardening, not new feature work.

## Hours saved + revenue uplift

- **Hours saved:** ~10h/mo on incident triage (errors visible vs grep-discovered)
- **Reliability uplift:** mean time to detection drops from hours/days to minutes
- **Revenue indirect:** retains clients who would have churned silently after broken features

## Who benefits

- **Operator:** alerted on every spike in error rate
- **Strategist:** sees per-tenant error patterns
- **Client:** experiences fewer silent failures (errors surface + get fixed)

## Deliverable scope

**AiLys side (~2h):**
1. Help article `service-reliability-and-error-handling` EN + FR-CA (light: explains we monitor errors, what to expect when something breaks, how to report)
2. STATE.md update

**Reviuzy side (~6h):**
1. Sentry SDK install + DSN env wire
2. Edge fn helper `_shared/observability.ts` standardizing error capture + audit log
3. Refactor catch blocks across top 30 edge fns to use the helper
4. Frontend Sentry integration (User context = tenant_id, scrubbed)
5. Operator dashboard `/admin/errors` with filter by tenant/action/severity
6. Per-tenant Slack/email alert option (Agency tier only)

## Cost estimate per invocation

- **Sentry free tier:** 5k errors/month free; expect ~1k/month at 50 clients
- **At 100 clients:** ~$26/mo Sentry team plan; absorbed in ops budget

## Why this dep (Section 10)

**New dep:** `@sentry/node` + `@sentry/react` (justified: industry-standard observability, no internal alternative provides same alerting + grouping)

## Acceptance criteria

- [ ] Sentry receives errors from at least 5 sample fn paths
- [ ] No PII in Sentry payloads (scrub config + test)
- [ ] Audit log entries follow standard schema (verb.subject.action)
- [ ] Operator dashboard shows last 100 errors with filters
- [ ] Agency tier can opt into Slack alerts for their own tenant errors
- [ ] AiLys help article published EN + FR-CA

## Strategic note

D.4 depends on D.1 being live (audit_log standardization rides on the table). D.4 can ship parallel with D.2 (no blocking dependency between them).
