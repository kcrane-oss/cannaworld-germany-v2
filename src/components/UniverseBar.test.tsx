import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";

// Mock the Supabase client because UniverseBar's cross-login handler imports
// it. We never invoke the click in these tests, so a stub is sufficient.
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) },
    functions: { invoke: vi.fn().mockResolvedValue({ data: null, error: null }) },
  },
}));

import UniverseBar from "./UniverseBar";

describe("UniverseBar", () => {
  it("renders all 5 CannaWorld apps", () => {
    render(<UniverseBar current="germany" />);
    expect(screen.getByText("Gateway")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText("Marketplace")).toBeInTheDocument();
    expect(screen.getByText("AICert")).toBeInTheDocument();
  });

  it("marks 'germany' as the current app with self-link to '/'", () => {
    render(<UniverseBar current="germany" />);
    const germanyLink = screen.getByText("Germany").closest("a");
    expect(germanyLink).not.toBeNull();
    expect(germanyLink?.getAttribute("href")).toBe("/");
    expect(germanyLink?.getAttribute("target")).toBe("_self");
    expect(germanyLink?.className).toContain("bg-white/10");
  });

  it("opens the other 4 apps in a new tab with noopener", () => {
    render(<UniverseBar current="germany" />);
    const externalLabels = ["Gateway", "Europe", "Marketplace", "AICert"];
    for (const label of externalLabels) {
      const link = screen.getByText(label).closest("a");
      expect(link?.getAttribute("target")).toBe("_blank");
      expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
      expect(link?.getAttribute("href")?.startsWith("https://")).toBe(true);
    }
  });

  it("renders the EU Import CTA pointing at Gateway intake", () => {
    render(<UniverseBar current="germany" />);
    const importLink = screen.getByText(/EU Import/).closest("a");
    expect(importLink?.getAttribute("href")).toBe("https://cannaworld-thailand.com/import");
    expect(importLink?.getAttribute("target")).toBe("_blank");
  });

  it("supports being mounted for other apps too (no germany lock-in)", () => {
    const { rerender } = render(<UniverseBar current="marketplace" />);
    const marketplaceLink = screen.getByText("Marketplace").closest("a");
    expect(marketplaceLink?.getAttribute("href")).toBe("/");

    rerender(<UniverseBar current="aicert" />);
    const aicertLink = screen.getByText("AICert").closest("a");
    expect(aicertLink?.getAttribute("href")).toBe("/");
    // ...and germany is now external
    const germanyLink = screen.getByText("Germany").closest("a");
    expect(germanyLink?.getAttribute("href")).toBe("https://cannaworld-germany.de");

    // satisfy `within` import usage so it is not flagged unused (also catches
    // accidental DOM duplication of the CW Universe brand label).
    const universe = screen.getAllByText("CannaWorld Universe");
    expect(within(universe[0].parentElement as HTMLElement).getByText("CannaWorld Universe")).toBeInTheDocument();
    expect(marketplaceLink).not.toBe(null);
  });
});
