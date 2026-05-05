import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { assertRouteEnabled } from "@/lib/route-guards";
import { DeckIrPreviewer } from "@/components/challenges/DeckIrPreviewer";

export const metadata: Metadata = buildPageMetadata("/challenges/deck-ir-previewer");

const routePath = "/challenges/deck-ir-previewer";

export default function DeckIrPreviewerPage() {
  assertRouteEnabled(routePath);
  return <DeckIrPreviewer />;
}
