import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/home/CaseStudyGrid";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Production AI systems, ML infrastructure, computer vision, and AR/vision case studies from Himadri Mishra.",
};

export default function CaseStudiesPage() {
  return <CaseStudyGrid />;
}
