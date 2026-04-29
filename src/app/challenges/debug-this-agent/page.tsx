import type { Metadata } from "next";
import { DebugScenarioView } from "@/components/challenges/DebugScenarioView";

export const metadata: Metadata = {
  title: "Debug This Agent",
  description:
    "Inspect a representative AI workflow trace and identify the production failure mode.",
};

export default function DebugThisAgentPage() {
  return <DebugScenarioView />;
}
