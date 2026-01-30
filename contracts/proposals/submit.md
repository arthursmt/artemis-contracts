# Proposal Submission Endpoint

This document defines the proposal submission contract handled by Arise.

---

## Endpoint

POST /api/proposals/submit

---

## Purpose

- Accept proposal submissions forwarded by the Hub.
- Validate the proposal payload.
- Normalize derived fields.
- Persist the proposal.
- Initialize the proposal stage.

---

## Request body

Accepts both formats defined in `payload.md`:

- Canonical payload (Format A)
- Wrapped payload (Format B)

---

## Validation

- Validation is performed using `proposalPayloadSchema`.
- Validation failures return HTTP 400.

---

## Normalization

After validation, Arise derives additional fields using
`normalizeProposalPayload`.

---

## Success response (201)

{
  "success": true,
  "proposalId": "string",
  "stage": "string",
  "submittedAt": "string"
}

---

## Error responses

400 Bad Request  
- Schema validation failed.

500 Internal Server Error  
- Unexpected server failure.

---

## Logging expectations

On receipt:
- contentLength
- bodyKeys
- membersCount
- groupId
- wrapped (boolean)

On validation failure:
- flattened schema errors

On success:
- proposalId
- resulting stage
