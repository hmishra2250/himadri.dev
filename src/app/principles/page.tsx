import type { Metadata } from "next";
import { StackOpinions } from "@/components/principles/StackOpinions";

export const metadata: Metadata = {
  title: "Production AI Principles",
  description:
    "Evidence-backed production AI beliefs about agents, evals, observability, cost, and architecture.",
};

export default function PrinciplesPage() {
  return <StackOpinions />;
}
