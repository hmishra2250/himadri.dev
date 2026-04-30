import type { Metadata } from "next";
import { assertRouteEnabled } from "@/lib/route-guards";
import { DeckIrPreviewer } from "@/components/challenges/DeckIrPreviewer";

export const metadata: Metadata = {
  title: "Deck IR Previewer",
  description:
    "A synthetic Deck IR previewer showing inspectable AI-generated artifact structure.",
};

const routePath = "/challenges/deck-ir-previewer";

export default function DeckIrPreviewerPage() {
  assertRouteEnabled(routePath);
  return <DeckIrPreviewer />;
}
