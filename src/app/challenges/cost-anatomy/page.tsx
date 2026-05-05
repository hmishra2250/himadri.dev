import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CostAnatomy } from "@/components/challenges/CostAnatomy";

export const metadata: Metadata = buildPageMetadata("/challenges/cost-anatomy");

export default function CostAnatomyPage() {
  return <CostAnatomy />;
}
