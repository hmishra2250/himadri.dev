import { permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination } from "@/lib/routes";

const routePath = "/challenges";

export default function ChallengesPage() {
  permanentRedirect(getRetiredRouteDestination(routePath));
}
