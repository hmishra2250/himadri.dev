import { permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination } from "@/lib/routes";

const routePath = "/interview-me";

export default function InterviewMePage() {
  permanentRedirect(getRetiredRouteDestination(routePath));
}
