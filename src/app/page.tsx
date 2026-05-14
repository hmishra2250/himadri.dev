import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { CaseStudyGrid } from "@/components/home/CaseStudyGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { DecisionTheaterPreview } from "@/components/home/DecisionTheaterPreview";
import { Hero } from "@/components/home/Hero";
import { LatestNotes } from "@/components/home/LatestNotes";

export const metadata: Metadata = buildPageMetadata("/");

export default function Home() {
  return (
    <>
      <RouteJsonLd path="/" />
      <Hero />
      <CaseStudyGrid />
      <LatestNotes />
      <DecisionTheaterPreview />
      <ContactCTA />
    </>
  );
}
