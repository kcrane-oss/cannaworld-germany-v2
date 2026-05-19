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

  it("renders Sample-Request mailto", () => {
    render(<Marketplace />);
    const link = screen.getByText(/Sample anfragen/).closest("a");
    expect(link?.getAttribute("href")?.startsWith("mailto:info@cannaworld-germany.de")).toBe(true);
  });
});
