import { permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination } from "@/lib/routes";

const routePath = "/challenges/debug-this-agent";

export default function DebugThisAgentPage() {
  permanentRedirect(getRetiredRouteDestination(routePath));
}
