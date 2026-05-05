import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { StackOpinions } from "@/components/principles/StackOpinions";

export const metadata: Metadata = buildPageMetadata("/principles");

export default function PrinciplesPage() {
  return (
    <>
      <RouteJsonLd path="/principles" />
      <StackOpinions />
    </>
  );
}
