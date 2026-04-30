import type { Metadata } from "next";
import { assertRouteEnabled } from "@/lib/route-guards";
import { DagSimulator } from "@/components/challenges/DagSimulator";

export const metadata: Metadata = {
  title: "DAG Execution Simulator",
  description:
    "A static simulator explaining explicit production AI workflow execution.",
};

const routePath = "/challenges/dag-execution-simulator";

export default function DagExecutionSimulatorPage() {
  assertRouteEnabled(routePath);
  return <DagSimulator />;
}
