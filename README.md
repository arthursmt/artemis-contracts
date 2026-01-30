# Artemis Contracts (Source of Truth)

This repository is the single source of truth for Artemis cross-app contracts.

It defines:
- Canonical API payloads and response shapes
- Proposal stages (state machine)
- Decisions and transitions
- Events / audit trail (minimum viable spec)
- Naming conventions and versioning rules

## Why this repo exists

Artemis is a multi-app ecosystem:

HUNT (UI)
  ↓
HUB (orchestrates / normalizes / observes)
  ↓
ARISE (business rules, validation, persistence)
  ↓
GATE (human workflow)

To avoid integration drift, all apps must implement the same contracts defined here.

## Golden rules

- Arise is the source of truth for business rules and persistence.
- Hub must stay thin: normalization + routing + observability.
- Hunt and Gate must treat these documents as the canonical contract.

## Structure

- contracts/
  - proposals/
    - payload.md
    - stages.md
  - decisions/
    - payload.md
    - transitions.md
  - events/
    - events.md
  - api/
    - endpoints.md

## Versioning

- Backwards-compatible changes: update docs + add notes.
- Breaking changes: bump a contract version in the relevant doc and update all consuming apps.

## Status

Initial contracts are aligned to the currently implemented Arise endpoints:
- POST /api/proposals/submit
- GET /api/hunt/proposals
- GET /api/hunt/proposals/:proposalId
- GET /api/gate/proposals
- GET /api/gate/proposals/:proposalId
- POST /api/gate/proposals/:proposalId/decision
