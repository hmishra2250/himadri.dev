import { validateContent } from "../src/lib/validation";

const errors = validateContent();
if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Content validation passed.");
