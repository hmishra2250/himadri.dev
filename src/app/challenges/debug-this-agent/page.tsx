import { buildPageMetadata } from "@/lib/seo";
import { DebugScenarioView } from "@/components/challenges/DebugScenarioView";

export const metadata = buildPageMetadata("/challenges/debug-this-agent");

export default function DebugThisAgentPage() {
  return <DebugScenarioView />;
}
