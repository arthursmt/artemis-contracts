# Artemis — Payload Mapping by App (v1)

This document maps what each app sends, accepts, normalizes, and consumes regarding proposal submission and proposal reading.

Canonical payload definition:
- docs/payload-v1.md

Goal:
- Remove implicit “fixes” and make payload behavior explicit.
- Define what is canonical vs compatibility-only.

---

## Hunt (Frontend — Agents)

### Sends (target canonical v1)
Hunt must send one of the envelope shapes below, with the inner payload matching v1 canonical types:
- groupId: string
- members[].memberId: string
- members[].requestedAmount: number OR members[].loanAmount: number

Envelope shapes:
- Shape A: { groupId, members, ... }
- Shape B: { proposalId, payload: { groupId, members, ... } }

### Must NOT rely on
- Hub fixing types silently
- Arise generating stable member IDs for UX

If Hunt needs stable member identifiers for UI, it must send memberId explicitly.

### Known legacy behavior (compatibility-only)
Some payloads may still contain:
- members[].id as number
- members[].requestedAmount as currency-formatted string (e.g. "$5,000.00")

This legacy behavior must be removed for full v1 alignment.

---

## Hub (Integration Hub)

### Accepts
- Shape A: { groupId, members, ... }
- Shape B: { proposalId, payload: { groupId, members, ... } }

### Normalizes (compatibility-only, temporary)
Hub may normalize legacy fields before forwarding to Arise:
- members[].id (number) -> members[].memberId (string)
- members[].requestedAmount (currency string) -> members[].requestedAmount (number)

This exists only to keep E2E stable while Hunt migrates fully to canonical v1.

### Forwards
Hub forwards the inner payload (canonical v1) to Arise submit endpoint.

---

## Arise (Backend — Source of Truth)

### Validates
Arise validates the inner payload using the canonical schema constraints:
- groupId is string
- members[] has at least 1 member
- memberId is string
- requestedAmount/loanAmount is number
- one of requestedAmount or loanAmount must exist

### Normalizes (backend responsibility)
Arise may normalize payload for storage and derived fields:
- Compute totalAmount if missing
- Assign memberId if missing (implementation detail, not a recommended client behavior)

### Persists
Arise stores the normalized payload as the system record and serves it to Gate/Hunt read endpoints.

---

## Gate (Frontend — Backoffice)

### Consumes
Gate reads proposals from Arise and displays the persisted system record.
Gate does not submit new proposals in v1.

Decision flows are documented separately (reject/changes/polling phase).

---

## Completion Criteria (Payload Alignment = DONE)
Payload alignment (v1) is complete only when:
1) Hunt emits canonical v1 consistently:
   - memberId is string
   - requestedAmount/loanAmount is number
   - no members[].id number dependency
2) Hub no longer needs compatibility normalization for submit
3) Arise remains strict and accepts v1 without any “special-case” client assumptions

---

## Notes for Future Versions
Any breaking change to payload fields/types must be introduced as an explicit v2 document, not silent drift.
