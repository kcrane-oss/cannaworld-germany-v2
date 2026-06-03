import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SampleRequests from "./SampleRequests";
import { updateSampleRequestStatus } from "@/lib/sample-request-api";

const refetch = vi.fn();

vi.mock("@/hooks/useSampleRequests", () => ({
  useSampleRequests: () => ({
    data: [
      {
        id: "r1",
        company: "Apotheke Nord",
        contact_email: "e@apo.de",
        product_category: "flower",
        quantity_kg: 5,
        target_pathway: "wholesale",
        context: "Pilotbedarf Q3",
        status: "received",
        created_at: "2026-05-01T00:00:00Z",
      },
      {
        id: "r2",
        company: "Großhandel Süd",
        contact_email: "buy@gh.de",
        product_category: "extract",
        quantity_kg: 2,
        target_pathway: "processing",
        context: null,
        status: "fulfilled",
        created_at: "2026-04-20T00:00:00Z",
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
    refetch,
  }),
}));

vi.mock("@/lib/sample-request-api", () => ({
  updateSampleRequestStatus: vi.fn().mockResolvedValue({ id: "r1", status: "in_review" }),
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("SampleRequests admin page", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lists incoming requests", () => {
    render(<SampleRequests />);
    expect(screen.getByText("Apotheke Nord")).toBeInTheDocument();
    expect(screen.getByText("Großhandel Süd")).toBeInTheDocument();
  });

  it("offers forward transitions for an open request and none for a terminal one", () => {
    render(<SampleRequests />);
    // received → In review / Declined available (English test locale)
    expect(screen.getByText("→ In review")).toBeInTheDocument();
    expect(screen.getByText("→ Declined")).toBeInTheDocument();
    // fulfilled is terminal — no "→ ..." button leads back
    expect(screen.queryByText("→ Received")).not.toBeInTheDocument();
  });

  it("transitions status via the API and refetches", async () => {
    render(<SampleRequests />);
    fireEvent.click(screen.getByText("→ In review"));
    await waitFor(() => expect(updateSampleRequestStatus).toHaveBeenCalledWith("r1", "in_review"));
    await waitFor(() => expect(refetch).toHaveBeenCalled());
  });
});
