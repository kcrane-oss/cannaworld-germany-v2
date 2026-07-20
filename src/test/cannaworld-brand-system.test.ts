import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");

describe("CannaWorld family design contract", () => {
  it("uses the shared ecosystem bar and brand mark", () => {
    const source = read("src/components/UniverseBar.tsx");
    expect(source).toContain("/cannaworld-mark.png");
    expect(source).toContain("CannaWorld Universe");
    for (const domain of ["cannaworld-thailand.com", "cannaworld-europe.com", "cannaworld-germany.de", "cannaworld-marketplace.com", "gmp-aicert.com"]) {
      expect(source).toContain(domain);
    }
  });

  it("maps the Germany experience onto the forest and emerald family palette", () => {
    const css = read("src/index.css");
    expect(css).toContain("--color-dark: #07110d");
    expect(css).toContain("--color-accent: #22C55E");
    expect(css).toContain("--color-cyan-300: #4ade80");
    expect(read("src/App.tsx")).toContain("CANNAWORLD");
  });
});
