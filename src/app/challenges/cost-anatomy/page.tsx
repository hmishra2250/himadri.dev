import type { Metadata } from "next";
import { CostAnatomy } from "@/components/challenges/CostAnatomy";

export const metadata: Metadata = {
  title: "Cost Anatomy",
  description:
    "A normalized static model of AI workflow unit economics and production cost controls.",
};

export default function CostAnatomyPage() {
  return <CostAnatomy />;
}
