import { permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination } from "@/lib/routes";

const routePath = "/principles";

export default function PrinciplesPage() {
  permanentRedirect(getRetiredRouteDestination(routePath));
}
