import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GatekeeperProvenance } from "./GatekeeperProvenance";
import { deriveBatchProvenance } from "@/lib/marketplace-provenance";

describe("GatekeeperProvenance", () => {
  it("renders the three chain stages (English test locale)", () => {
    const provenance = deriveBatchProvenance({ status: "released", originCountry: "TH" });
    render(<GatekeeperProvenance provenance={provenance} />);
    expect(screen.getByText("GACP cultivation")).toBeInTheDocument();
    expect(screen.getByText("EU-GMP hub")).toBeInTheDocument();
    expect(screen.getByText("QP release")).toBeInTheDocument();
  });

  it("renders a title", () => {
    const provenance = deriveBatchProvenance({ status: "approved", originCountry: "TH" });
    render(<GatekeeperProvenance provenance={provenance} />);
    expect(screen.getByText(/Gatekeeper provenance/)).toBeInTheDocument();
  });
});
