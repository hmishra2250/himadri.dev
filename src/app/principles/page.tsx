import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { StackOpinions } from "@/components/principles/StackOpinions";

export const metadata: Metadata = buildPageMetadata("/principles");

export default function PrinciplesPage() {
  return <StackOpinions />;
}
