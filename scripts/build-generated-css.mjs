import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const tailwindBin = resolve(root, "node_modules", ".bin", "tailwindcss");
const outputFile = resolve(root, "app", "globals.generated.css");

const args = [
  "-i",
  "./app/globals.css",
  "-o",
  "./app/globals.generated.css",
  "--config",
  "./tailwind.config.js",
  "--content",
  "./app/**/*.{ts,tsx}",
  "--content",
  "./components/**/*.{ts,tsx}",
];

if (existsSync(outputFile) && process.env.FORCE_CSS_BUILD !== "1") {
  console.warn(
    "[css:build] Reusing existing app/globals.generated.css (set FORCE_CSS_BUILD=1 to regenerate)"
  );
  process.exit(0);
}

try {
  execFileSync(tailwindBin, args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
} catch (error) {
  if (existsSync(outputFile)) {
    console.warn(
      "[css:build] Tailwind regeneration failed; keeping existing app/globals.generated.css"
    );
    process.exit(0);
  }

  throw error;
}
