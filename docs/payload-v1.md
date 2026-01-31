# Artemis Contracts — Payload v1 (Canonical)

## What this document is
This document defines the canonical (v1) payload for proposal submission across:
- Hunt (agent frontend)
- Hub (integration/normalization)
- Arise (API source of truth)
- Gate (backoffice)

The goal is to eliminate implicit adaptations and make the contract explicit.

---

## Canonical types (v1)
These types are canonical because Arise validates them as such:

- members[].memberId is string
- members[].requestedAmount is number (or loanAmount is number)

Any client sending:
- members[].id as number
- members[].requestedAmount as currency-formatted string (e.g. "$5,000.00")

is non-canonical and must be treated as compatibility-only behavior.

---

## ProposalPayload v1 (canonical)
    type ProposalPayloadV1 = {
      groupId: string
      groupName?: string
      leaderName?: string
      leaderPhone?: string

      members: Array<{
        memberId: string

        name?: string
        firstName?: string
        lastName?: string

        // Exactly one of these must exist:
        requestedAmount?: number
        loanAmount?: number

        isLeader?: boolean
        phone?: string
        idNumber?: string
        evidencePhotos?: string[]
        signature?: string

        // Optional nested fields
        pnl?: Record<string, number>
      }>

      totalAmount?: number
      contractText?: string
      evidencePhotos?: string[]
      formData?: Record<string, unknown>
    }

---

## Validation rules (v1)
- groupId is required and must be a string.
- members[] is required and must have at least 1 member.
- Each member must include a canonical memberId (string).
- Each member must include either requestedAmount or loanAmount (number).

---

## Envelope shapes (integration)
Clients may send either:
- Shape A: { groupId, members, ... }
- Shape B: { proposalId, payload: { groupId, members, ... } }

Canonical validation applies to the inner payload object.

---

## Compatibility notes (temporary)
Until all clients fully comply with v1:
- Hub may normalize legacy fields:
  - members[].id (number) -> members[].memberId (string)
  - members[].requestedAmount (currency string) -> members[].requestedAmount (number)

This normalization is temporary and should be removed once Hunt emits canonical v1 consistently.
