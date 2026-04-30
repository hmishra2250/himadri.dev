import { notFound } from "next/navigation";
import { routeIsEnabled } from "@/lib/routes";

export function assertRouteEnabled(path: string) {
  if (!routeIsEnabled(path)) notFound();
}
