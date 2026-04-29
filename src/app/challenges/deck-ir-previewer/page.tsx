import type { Metadata } from "next";
import { DeckIrPreviewer } from "@/components/challenges/DeckIrPreviewer";

export const metadata: Metadata = {
  title: "Deck IR Previewer",
  description:
    "A synthetic Deck IR previewer showing inspectable AI-generated artifact structure.",
};

export default function DeckIrPreviewerPage() {
  return <DeckIrPreviewer />;
}
