import { buildPageMetadata } from "@/lib/seo";
import { CostAnatomy } from "@/components/challenges/CostAnatomy";

export const metadata = buildPageMetadata("/challenges/cost-anatomy");

export default function CostAnatomyPage() {
  return <CostAnatomy />;
}
