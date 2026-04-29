import type { Metadata } from "next";
import { DagSimulator } from "@/components/challenges/DagSimulator";

export const metadata: Metadata = {
  title: "DAG Execution Simulator",
  description:
    "A static simulator explaining explicit production AI workflow execution.",
};

export default function DagExecutionSimulatorPage() {
  return <DagSimulator />;
}
