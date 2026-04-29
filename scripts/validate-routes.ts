import { validateRoutes } from "../src/lib/validation";

const errors = validateRoutes();
if (errors.length > 0) {
  console.error("Route validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Route validation passed.");
