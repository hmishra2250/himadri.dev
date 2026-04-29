import { claimById } from "@/content/proof";

export function SourceBadge({ proofId }: { proofId: string }) {
  const proof = claimById(proofId);
  return (
    <span
      className="source-badge"
      title={`${proof.sourcePath} - ${proof.sourceLocator}`}
    >
      {proof.confidence} confidence · {proof.sourceType}
    </span>
  );
}
