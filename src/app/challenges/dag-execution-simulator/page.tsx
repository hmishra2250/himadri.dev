import { permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination } from "@/lib/routes";

const routePath = "/challenges/dag-execution-simulator";

export default function DagExecutionSimulatorPage() {
  permanentRedirect(getRetiredRouteDestination(routePath));
}
