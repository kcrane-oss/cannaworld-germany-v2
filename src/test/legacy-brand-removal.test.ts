import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "../..");
const roots = ["src", "public", "scripts", "supabase/functions"];
const textExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".html", ".css", ".toml", ".sql"]);
// This guard file is the only active-source allowlist entry for the retired literal.
const legacyBrand = /shinrai/i;
const ignoredFiles = new Set([
  "src/test/legacy-brand-removal.test.ts",
  "src/test/landing-claim-boundaries.test.ts",
]);

function collectFiles(relativeRoot: string): string[] {
  const absoluteRoot = path.join(repoRoot, relativeRoot);
  if (!fs.existsSync(absoluteRoot)) return [];

  const files: string[] = [];
  const visit = (absolutePath: string) => {
    for (const entry of fs.readdirSync(absolutePath, { withFileTypes: true })) {
      const child = path.join(absolutePath, entry.name);
      if (entry.isDirectory()) {
        visit(child);
      } else if (textExtensions.has(path.extname(entry.name))) {
        files.push(child);
      }
    }
  };
  visit(absoluteRoot);
  return files;
}

describe("legacy brand removal", () => {
  it("keeps active application and function sources on canonical naming", () => {
    const offenders = roots
      .flatMap(collectFiles)
      .map((file) => ({
        file,
        relativePath: path.relative(repoRoot, file).split(path.sep).join("/"),
      }))
      .filter(({ file, relativePath }) =>
        !ignoredFiles.has(relativePath) && legacyBrand.test(fs.readFileSync(file, "utf8")),
      )
      .map(({ relativePath }) => relativePath);

    expect(offenders).toEqual([]);
  });
});
