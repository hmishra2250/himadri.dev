import path from "node:path";
import type { NextConfig } from "next";
import {
  assetRedirectRoutes,
  getRetiredRouteDestination,
  retiredRedirectRoutes,
} from "./src/lib/routes";

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      ...retiredRedirectRoutes.map((route) => ({
        source: route.path,
        destination: getRetiredRouteDestination(route.path),
        permanent: true,
      })),
      ...assetRedirectRoutes,
    ];
  },
};

export default nextConfig;
