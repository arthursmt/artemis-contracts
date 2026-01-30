# Gate Decision Submission

This document defines how Gate submits decisions to Arise.

---

## Endpoint

POST /api/gate/proposals/:proposalId/decision

---

## Purpose

- Record a decision made by a Gate reviewer.
- Enforce valid stage transitions.
- Persist decision history.
- Update proposal stage.

---

## Request body

Validated using `insertDecisionSchema`.

{
  "stage": "DOC_REVIEW | RISK_REVIEW",
  "decision": "APPROVE | REJECT | REQUEST_CHANGES",
  "reason": "string (optional)"
}

---

## Validation rules

- Proposal must exist.
- Proposal must not be in APPROVED or REJECTED.
- Decision stage must match proposal current stage.

---

## Success response (201)

{
  "success": true,
  "decisionId": "string",
  "previousStage": "string",
  "newStage": "string",
  "decision": "string"
}

---

## Error cases

400 Bad Request  
- Invalid payload
- Invalid stage transition

404 Not Found  
- Proposal does not exist
