import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { DebugScenarioView } from "@/components/challenges/DebugScenarioView";

export const metadata: Metadata = buildPageMetadata("/challenges/debug-this-agent");

export default function DebugThisAgentPage() {
  return <DebugScenarioView />;
}
