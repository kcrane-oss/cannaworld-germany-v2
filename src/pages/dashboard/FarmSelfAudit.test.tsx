import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FarmSelfAudit from "./FarmSelfAudit";

// submitFarmAudit pulls in the Supabase client; mock it.
vi.mock("@/lib/farm-audit-api", () => ({ submitFarmAudit: vi.fn().mockResolvedValue({ submission_id: "x" }) }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("FarmSelfAudit guidance level", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to the simple level: plain farm-name label, province hidden", () => {
    render(<FarmSelfAudit />);
    // English test locale
    expect(screen.getByText("Farm self-audit")).toBeInTheDocument();
    expect(screen.getByLabelText("What's your farm called?")).toBeInTheDocument();
    expect(screen.queryByLabelText("Province")).not.toBeInTheDocument();
  });

  it("reveals optional fields when raising the level to Standard", () => {
    render(<FarmSelfAudit />);
    fireEvent.click(screen.getByText("Standard"));
    expect(screen.getByLabelText("Province")).toBeInTheDocument();
    // standard uses the technical farm-name label
    expect(screen.getByLabelText("Farm name")).toBeInTheDocument();
  });

  it("drops inline help at the expert level", () => {
    render(<FarmSelfAudit />);
    // help visible at simple
    expect(screen.getByText(/Only tick what's actually true/)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Expert"));
    expect(screen.queryByText(/Only tick what's actually true/)).not.toBeInTheDocument();
  });

  it("persists the chosen level", () => {
    const { unmount } = render(<FarmSelfAudit />);
    fireEvent.click(screen.getByText("Standard"));
    unmount();
    render(<FarmSelfAudit />);
    // remembered → province visible again without re-selecting
    expect(screen.getByLabelText("Province")).toBeInTheDocument();
  });
});
