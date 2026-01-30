# Proposal Payload Contract

This document defines the canonical proposal payload sent from Hunt -> Hub -> Arise.

Arise validates the canonical payload using `proposalPayloadSchema`, and then derives additional fields via `normalizeProposalPayload`.

## Canonical payload (Format A)

This is the preferred, canonical shape.

```json
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
