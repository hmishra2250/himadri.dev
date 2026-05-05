import { buildPageMetadata } from "@/lib/seo";
import { StackOpinions } from "@/components/principles/StackOpinions";

export const metadata = buildPageMetadata("/principles");

export default function PrinciplesPage() {
  return <StackOpinions />;
}
