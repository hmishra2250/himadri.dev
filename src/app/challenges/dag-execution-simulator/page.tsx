import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { assertRouteEnabled } from "@/lib/route-guards";
import { DagSimulator } from "@/components/challenges/DagSimulator";

export const metadata: Metadata = buildPageMetadata(
  "/challenges/dag-execution-simulator",
);

const routePath = "/challenges/dag-execution-simulator";

export default function DagExecutionSimulatorPage() {
  assertRouteEnabled(routePath);
  return (
    <>
      <RouteJsonLd path="/challenges/dag-execution-simulator" />
      <DagSimulator />
    </>
  );
}
