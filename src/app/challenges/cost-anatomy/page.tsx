import { permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination } from "@/lib/routes";

const routePath = "/challenges/cost-anatomy";

export default function CostAnatomyPage() {
  permanentRedirect(getRetiredRouteDestination(routePath));
}
