import { claimById } from "@/content/proof";

const sourceLabels = {
  resume: "Resume verified",
  "design-doc": "Design source",
  "case-study-draft": "Case study evidence",
  "public-profile": "Public profile",
  "sanitized-artifact": "Sanitized representative",
  "synthetic-example": "Synthetic example",
} as const;

export function SourceBadge({ proofId }: { proofId: string }) {
  const proof = claimById(proofId);
  return (
    <span className="source-badge" title={proof.sourceLocator}>
      {sourceLabels[proof.sourceType]}
    </span>
  );
}
