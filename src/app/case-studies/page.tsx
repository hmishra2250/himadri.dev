import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { AllCaseStudies } from "@/components/home/CaseStudyGrid";

export const metadata: Metadata = buildPageMetadata("/case-studies");

export default function CaseStudiesPage() {
  return (
    <>
      <RouteJsonLd path="/case-studies" />
      <AllCaseStudies />
    </>
  );
}
