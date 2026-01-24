import { z } from "zod";
/**
 * Workflow enums (source of truth)
 */
export declare const ProposalStage: {
    readonly DOC_REVIEW: "DOC_REVIEW";
    readonly RISK_REVIEW: "RISK_REVIEW";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly CHANGES_REQUESTED: "CHANGES_REQUESTED";
};
export type ProposalStageType = typeof ProposalStage[keyof typeof ProposalStage];
export declare const DecisionType: {
    readonly APPROVE: "APPROVE";
    readonly REJECT: "REJECT";
    readonly FINAL_REJECT: "FINAL_REJECT";
};
export type DecisionTypeType = typeof DecisionType[keyof typeof DecisionType];
/**
 * Member (group loan) — array of objects, each with stable memberId.
 */
export declare const memberSchema: z.ZodObject<{
    memberId: z.ZodString;
    name: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    idNumber: z.ZodOptional<z.ZodString>;
    loanAmount: z.ZodNumber;
    evidencePhotos: z.ZodOptional<z.ZodArray<z.ZodString>>;
    signature: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Member = z.infer<typeof memberSchema>;
/**
 * Proposal payload (Hunt -> Arise)
 */
export declare const proposalPayloadSchema: z.ZodObject<{
    groupId: z.ZodString;
    groupName: z.ZodString;
    leaderName: z.ZodString;
    leaderPhone: z.ZodOptional<z.ZodString>;
    members: z.ZodArray<z.ZodObject<{
        memberId: z.ZodString;
        name: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        idNumber: z.ZodOptional<z.ZodString>;
        loanAmount: z.ZodNumber;
        evidencePhotos: z.ZodOptional<z.ZodArray<z.ZodString>>;
        signature: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    totalAmount: z.ZodNumber;
    contractText: z.ZodOptional<z.ZodString>;
    evidencePhotos: z.ZodOptional<z.ZodArray<z.ZodString>>;
    formData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export type ProposalPayload = z.infer<typeof proposalPayloadSchema>;
/**
 * Gate decision request (Gate -> Arise)
 */
export declare const insertDecisionSchema: z.ZodObject<{
    stage: z.ZodEnum<{
        DOC_REVIEW: "DOC_REVIEW";
        RISK_REVIEW: "RISK_REVIEW";
    }>;
    decision: z.ZodEnum<{
        APPROVE: "APPROVE";
        REJECT: "REJECT";
    }>;
    reasons: z.ZodArray<z.ZodString>;
    comment: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
}, z.core.$strip>;
export type InsertDecision = z.infer<typeof insertDecisionSchema>;
