import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CaseStudyGrid } from "@/components/home/CaseStudyGrid";

export const metadata: Metadata = buildPageMetadata("/case-studies");

export default function CaseStudiesPage() {
  return <CaseStudyGrid />;
}
