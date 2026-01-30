# Hunt Polling Contracts

This document defines polling endpoints used by Hunt for E2E and demo flows.

---

## List proposals by status

GET /api/hunt/proposals?status=CHANGES_REQUESTED

---

### Behavior

- When status = CHANGES_REQUESTED:
  - Returns proposals in stage CHANGES_REQUESTED.
- Any other status:
  - Returns an empty list.

---

### Response

{
  "status": "string",
  "count": number,
  "proposals": []
}

---

## Proposal detail

GET /api/hunt/proposals/:proposalId

---

### Behavior

- Returns proposal detail when found.
- Returns 404 when not found.

---

### Response

- Full proposal object as stored by Arise.
