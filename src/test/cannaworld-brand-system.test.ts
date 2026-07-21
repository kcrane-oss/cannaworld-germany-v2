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

  it("maps Germany onto the Obsidian, Graphite, Ice and Siam-gold family palette", () => {
    const css = read("src/index.css");
    expect(css).toContain("--color-dark: #080C14");
    expect(css).toContain("--color-card: #121927");
    expect(css).toContain("--color-text: #EAF2FF");
    expect(css).toContain("--color-accent: #D6A84B");
    expect(css).toContain("--color-platinum: #B8C2D1");
    expect(css).toContain("--color-cyan-300: #D6A84B");
    expect(css).not.toContain("--color-accent: #22C55E");
    expect(css).not.toContain("--color-dark: #07110d");
  });

  it("carries the Germany shell and subtle family watermark through every route class", () => {
    const app = read("src/App.tsx");
    const css = read("src/index.css");
    expect(app).toContain("CANNAWORLD");
    expect(app.match(/cw-app-shell/g)?.length).toBeGreaterThanOrEqual(7);
    expect(app).toContain('alt="CannaWorld Germany"');
    expect(css).toContain(".cw-app-shell::after");
    expect(css).toContain('url("/cannaworld-mark.png")');
  });

  it("represents linked product brands with their current accents", () => {
    const cta = read("src/components/CrossAppCTA.tsx");
    const marketplace = read("src/pages/dashboard/Marketplace.tsx");
    expect(cta).toContain("#22D3EE");
    expect(cta).toContain("#E8874A");
    expect(cta).toContain("TINT_CLASSES.gold");
    expect(marketplace).toContain("#B8C2D1");
    expect(marketplace).toContain("#E8874A");
  });
});
