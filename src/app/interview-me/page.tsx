import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { InterviewMe } from "@/components/interview/InterviewMe";

export const metadata: Metadata = buildPageMetadata("/interview-me");

export default function InterviewMePage() {
  return (
    <>
      <RouteJsonLd path="/interview-me" />
      <InterviewMe />
    </>
  );
}
