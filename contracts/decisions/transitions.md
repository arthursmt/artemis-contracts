# Decision Transitions

This document defines how decisions move proposals between stages.

---

## Transition table

Current Stage: DOC_REVIEW  
- APPROVE → RISK_REVIEW  
- REQUEST_CHANGES → CHANGES_REQUESTED  
- REJECT → REJECTED  

Current Stage: RISK_REVIEW  
- APPROVE → APPROVED  
- REQUEST_CHANGES → CHANGES_REQUESTED  
- REJECT → REJECTED  

Current Stage: APPROVED  
- Any decision → blocked  

Current Stage: REJECTED  
- Any decision → blocked  

---

## Notes

- Reject is terminal from any non-terminal stage.
- Approve is progressive: DOC_REVIEW → RISK_REVIEW → APPROVED.
- CHANGES_REQUESTED is exited only via re-submission from Hunt.
