import { buildPageMetadata } from "@/lib/seo";
import { assertRouteEnabled } from "@/lib/route-guards";
import { DagSimulator } from "@/components/challenges/DagSimulator";

export const metadata = buildPageMetadata("/challenges/dag-execution-simulator");

const routePath = "/challenges/dag-execution-simulator";

export default function DagExecutionSimulatorPage() {
  assertRouteEnabled(routePath);
  return <DagSimulator />;
}
