import { permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination } from "@/lib/routes";

const routePath = "/challenges/deck-ir-previewer";

export default function DeckIrPreviewerPage() {
  permanentRedirect(getRetiredRouteDestination(routePath));
}
