import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FarmTierFunnel } from "./FarmTierFunnel";
import type { FarmTier } from "@/lib/farm-onboarding";

// The test i18n resolves to English locale (see src/test/setup.ts), so assert
// on the English tier labels.
const producers: { tier: FarmTier | null }[] = [
  { tier: "tier_0_registered" },
  { tier: "tier_0_registered" },
  { tier: "tier_1_gacp_ready" },
  { tier: "tier_2_gacp_certified" },
  { tier: "tier_3_hub_linked" },
  { tier: null }, // unregistered / missing tier is ignored
];

describe("FarmTierFunnel", () => {
  it("renders all four tier labels", () => {
    render(<FarmTierFunnel producers={producers} />);
    expect(screen.getByText("Registered")).toBeInTheDocument();
    expect(screen.getByText("GACP-ready")).toBeInTheDocument();
    expect(screen.getByText("GACP-certified")).toBeInTheDocument();
    expect(screen.getByText("Hub-linked")).toBeInTheDocument();
  });

  it("shows the total count excluding producers without a tier", () => {
    render(<FarmTierFunnel producers={producers} />);
    // 5 of the 6 producers carry a valid tier
    expect(screen.getByText(/Total farms/)).toHaveTextContent("5");
  });

  it("renders without crashing for an empty funnel", () => {
    render(<FarmTierFunnel producers={[]} />);
    expect(screen.getByText(/Total farms/)).toHaveTextContent("0");
  });
});
