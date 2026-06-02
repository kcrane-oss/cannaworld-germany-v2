import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminConsole from "./AdminConsole";
import { setStaffRole } from "@/lib/staff-api";

const staffRefetch = vi.fn();

vi.mock("@/hooks/useStaffRoles", () => ({
  useStaffRoles: () => ({
    data: [
      { user_id: "u1", display_name: "Alice Admin", roles: ["admin"] },
      { user_id: "u2", display_name: "Bob Staff", roles: ["compliance"] },
    ],
    isLoading: false,
    isError: false,
    refetch: staffRefetch,
  }),
}));

vi.mock("@/hooks/useSupportConversations", () => ({
  useSupportConversations: () => ({
    data: [
      { id: "c1", status: "open", tier: 0, priority: "urgent", updated_at: "2026-01-01T00:00:00Z" },
      { id: "c2", status: "resolved", tier: 1, priority: "low", updated_at: "2026-06-02T00:00:00Z" },
    ],
    isError: false,
  }),
}));

vi.mock("@/hooks/useSampleRequests", () => ({
  useSampleRequests: () => ({
    data: [{ id: "s1", status: "received" }, { id: "s2", status: "fulfilled" }],
    isError: false,
  }),
}));

vi.mock("@/lib/staff-api", () => ({
  APP_ROLES: ["admin", "compliance", "auditor", "importer", "exporter", "inspector", "logistics", "farm", "shop", "trader", "pharmacy", "lab_provider"],
  setStaffRole: vi.fn().mockResolvedValue({ user_id: "u2", role: "auditor", granted: true }),
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("AdminConsole", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders the team with roles", () => {
    render(<AdminConsole />);
    expect(screen.getByText("Alice Admin")).toBeInTheDocument();
    expect(screen.getByText("Bob Staff")).toBeInTheDocument();
  });

  it("computes the ops overview (open + overdue conversations, open samples, team size)", () => {
    render(<AdminConsole />);
    // open conversations = 1 (c1), open samples = 1 (received), team = 2
    expect(screen.getByText("Open conversations").parentElement?.parentElement).toHaveTextContent("1");
    expect(screen.getByText("Team").parentElement?.parentElement).toHaveTextContent("2");
  });

  it("grants a role via the API and refetches", async () => {
    render(<AdminConsole />);
    // Bob's first available role in the select defaults to the first APP_ROLE not held.
    const addButtons = screen.getAllByText("Add");
    fireEvent.click(addButtons[addButtons.length - 1]);
    await waitFor(() => expect(setStaffRole).toHaveBeenCalled());
    await waitFor(() => expect(staffRefetch).toHaveBeenCalled());
  });
});
