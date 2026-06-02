import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FarmReview from "./FarmReview";
import { decideFarmAudit } from "@/lib/farm-audit-api";

const refetch = vi.fn();

vi.mock("@/hooks/useFarmAuditSubmissions", () => ({
  useFarmAuditSubmissions: () => ({
    data: [
      { id: "a1", farm_name: "Green Valley", province: "Chiang Mai", self_assessment_score: 80, risk_score: 0, document_count: 3, status: "pending", created_at: "2026-05-01T00:00:00Z" },
      { id: "a2", farm_name: "Risky Farm", province: "Chiang Rai", self_assessment_score: 40, risk_score: 50, document_count: 1, status: "pending", created_at: "2026-04-01T00:00:00Z" },
      { id: "a3", farm_name: "Done Farm", province: "Phuket", self_assessment_score: 90, risk_score: 0, document_count: 3, status: "approved", created_at: "2026-03-01T00:00:00Z" },
    ],
    isLoading: false,
    isError: false,
    refetch,
  }),
}));

vi.mock("@/lib/farm-audit-api", () => ({
  decideFarmAudit: vi.fn().mockResolvedValue({ id: "a1", status: "approved" }),
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("FarmReview", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lists submissions and surfaces a risk badge", () => {
    render(<FarmReview />);
    expect(screen.getByText("Green Valley")).toBeInTheDocument();
    expect(screen.getByText("Risky Farm")).toBeInTheDocument();
    // risky submission shows its risk score
    expect(screen.getByText(/Risk 50/)).toBeInTheDocument();
  });

  it("shows action buttons only for pending submissions", () => {
    render(<FarmReview />);
    // two pending → two Release buttons; the approved one has none
    expect(screen.getAllByText("Release")).toHaveLength(2);
  });

  it("releases a submission via the API and refetches", async () => {
    render(<FarmReview />);
    fireEvent.click(screen.getAllByText("Release")[0]);
    await waitFor(() => expect(decideFarmAudit).toHaveBeenCalledWith("a1", "approved"));
    await waitFor(() => expect(refetch).toHaveBeenCalled());
  });
});
