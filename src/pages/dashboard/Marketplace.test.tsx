import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Marketplace from "./Marketplace";

vi.mock("@/hooks/useBatches", () => ({
  useBatches: () => ({
    data: [
      { id: "1", batch_number: "B-001", product_name: "CW Flower", strain: "AK-47", category: "Flower", status: "released", origin_country: "TH", quantity: 10, unit: "kg", created_at: "2026-05-12T00:00:00Z" },
      { id: "2", batch_number: "B-002", product_name: "CW Extract", strain: "NL", category: "Extract", status: "approved", origin_country: "TH", quantity: 2, unit: "kg", created_at: "2026-05-10T00:00:00Z" },
      { id: "3", batch_number: "B-003", product_name: "CW Draft", strain: "OG", category: "Flower", status: "draft", origin_country: "TH", quantity: 5, unit: "kg", created_at: "2026-05-08T00:00:00Z" },
    ],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

vi.mock("@/hooks/useFarmProducers", () => ({
  useFarmProducers: () => ({
    data: [
      { id: "f1", name: "Farm A", type: "farm", province: "Chiang Mai", tier: "tier_2_gacp_certified", status: "active", created_at: "2026-01-01T00:00:00Z" },
      { id: "f2", name: "Farm B", type: "farm", province: "Chiang Rai", tier: "tier_3_hub_linked", status: "active", created_at: "2026-01-02T00:00:00Z" },
    ],
    isError: false,
  }),
}));

vi.mock("@/hooks/useBatchProvenanceLinks", () => ({
  useBatchProvenanceLinks: () => ({ data: [], isError: false }),
}));

// SampleRequestDialog pulls in the Supabase client via sample-request-api; mock it.
vi.mock("@/lib/sample-request-api", () => ({
  submitSampleRequest: vi.fn().mockResolvedValue({ id: "sr-1", status: "received" }),
}));

describe("Marketplace page", () => {
  it("renders header + qualified batches only (released/approved)", () => {
    render(<Marketplace />);
    expect(screen.getByText("Marketplace")).toBeInTheDocument();
    expect(screen.getByText("B-001")).toBeInTheDocument();
    expect(screen.getByText("B-002")).toBeInTheDocument();
    expect(screen.queryByText("B-003")).not.toBeInTheDocument();
  });

  it("includes the Marketplace external CTA", () => {
    render(<Marketplace />);
    const ctas = screen.getAllByText(/Marketplace öffnen/);
    expect(ctas.length).toBeGreaterThan(0);
    const link = ctas[0].closest("a");
    expect(link?.getAttribute("href")).toBe("https://cannaworld-marketplace.com");
  });

  it("renders the in-app Sample-Request CTA (no mailto)", () => {
    render(<Marketplace />);
    // English test locale → "Request sample"; it is a button, not a mailto link
    const cta = screen.getByText("Request sample");
    expect(cta).toBeInTheDocument();
    expect(cta.closest("a")).toBeNull();
  });

  it("shows the gatekeeper provenance chain on listings", () => {
    render(<Marketplace />);
    // English test locale; at least one listing renders the chain stages
    expect(screen.getAllByText("GACP cultivation").length).toBeGreaterThan(0);
    expect(screen.getAllByText("QP release").length).toBeGreaterThan(0);
  });

  it("renders the Thailand supply pipeline when farm producers exist", () => {
    render(<Marketplace />);
    expect(screen.getByText(/Supply-Pipeline/)).toBeInTheDocument();
    expect(screen.getByText(/Total farms/)).toHaveTextContent("2");
  });
});
