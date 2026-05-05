import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { CostAnatomy } from "@/components/challenges/CostAnatomy";

export const metadata: Metadata = buildPageMetadata("/challenges/cost-anatomy");

export default function CostAnatomyPage() {
  return (
    <>
      <RouteJsonLd path="/challenges/cost-anatomy" />
      <CostAnatomy />
    </>
  );
}
