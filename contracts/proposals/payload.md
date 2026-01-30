# Proposal Payload Contract

This document defines the canonical proposal payload sent from Hunt → Hub → Arise.

Arise is the source of truth. It validates the canonical payload using
`proposalPayloadSchema` and derives additional fields using
`normalizeProposalPayload`.

---

## Canonical payload (Format A)

This is the preferred and canonical payload shape.

{
  "groupId": "string",
  "members": [
    {
      "memberId": "string",
      "fullName": "string",
      "document": {
        "type": "string",
        "value": "string"
      },
      "documents": [
        {
          "type": "string",
          "url": "string"
        }
      ]
    }
  ]
}

---

## Field notes

- `groupId` identifies the application / proposal container.
- `members[]` represents all applicants in the proposal.
- All member fields must strictly match the Arise schema
  (`proposalPayloadSchema`).

---

## Wrapped payload (Format B)

Clients or the Hub MAY send a wrapped payload.  
Arise MUST accept this format, but MUST validate only the inner payload.

{
  "proposalId": "string (optional)",
  "payload": {
    "groupId": "string",
    "members": [
      {
        "memberId": "string",
        "fullName": "string",
        "document": {
          "type": "string",
          "value": "string"
        },
        "documents": [
          {
            "type": "string",
            "url": "string"
          }
        ]
      }
    ]
  }
}

---

## Validation rules

- Only the inner payload (`payload`) is validated.
- `proposalId` is ignored during validation.
- Schema validation errors MUST return HTTP 400 from Arise.

---

## Ownership

- Hunt: builds the payload.
- Hub: forwards without mutation.
- Arise: validates, normalizes, persists.
