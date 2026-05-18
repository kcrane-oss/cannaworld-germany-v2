import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Batches from "./Batches";

vi.mock("@/hooks/useBatches", () => ({
  useBatches: () => ({
    data: [
      {
        id: "1",
        batch_number: "BATCH-2026-001",
        product_name: "CW Whole Flower",
        strain: "AK-47",
        category: "Flower",
        status: "submitted",
        origin_country: "Thailand",
        quantity: 25,
        unit: "kg",
        created_at: "2026-05-12T00:00:00Z",
      },
      {
        id: "2",
        batch_number: "BATCH-2026-002",
        product_name: "CW Extract",
        strain: "Northern Lights",
        category: "Extract",
        status: "released",
        origin_country: "Thailand",
        quantity: 5,
        unit: "kg",
        created_at: "2026-04-20T00:00:00Z",
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

describe("Batches page", () => {
  it("renders heading and batch table", () => {
    render(<Batches />);
    expect(screen.getByText("Batches")).toBeInTheDocument();
    expect(screen.getByText("BATCH-2026-001")).toBeInTheDocument();
    expect(screen.getByText("BATCH-2026-002")).toBeInTheDocument();
  });

  it("filters by search query", () => {
    render(<Batches />);
    fireEvent.change(screen.getByPlaceholderText(/Charge suchen/), { target: { value: "AK-47" } });
    expect(screen.getByText("BATCH-2026-001")).toBeInTheDocument();
    expect(screen.queryByText("BATCH-2026-002")).not.toBeInTheDocument();
  });

  it("renders 'released' status with emerald tint", () => {
    const { container } = render(<Batches />);
    const badge = Array.from(container.querySelectorAll("span")).find((el) => el.textContent === "released");
    expect(badge).toBeTruthy();
    expect(badge?.className).toContain("emerald");
  });
});
