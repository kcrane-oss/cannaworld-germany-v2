import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SupportInbox from "./SupportInbox";
import { replyToConversation, updateConversation } from "@/lib/support-api";

const convRefetch = vi.fn();
const msgRefetch = vi.fn();

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: "staff-1" }, session: {}, loading: false, signOut: vi.fn() }),
}));

vi.mock("@/hooks/useSupportConversations", () => ({
  useSupportConversations: () => ({
    data: [
      { id: "c1", channel: "email", partner_id: null, subject: "CoA Frage", status: "open", tier: 0, priority: "normal", assigned_to: null, external_ref: "ext-1", created_at: "2026-05-01T00:00:00Z", updated_at: "2026-05-01T00:00:00Z" },
      { id: "c2", channel: "chat", partner_id: null, subject: "Gelöster Fall", status: "resolved", tier: 1, priority: "low", assigned_to: "staff-1", external_ref: "ext-2", created_at: "2026-04-01T00:00:00Z", updated_at: "2026-04-01T00:00:00Z" },
    ],
    isLoading: false,
    isError: false,
    error: null,
    refetch: convRefetch,
  }),
}));

vi.mock("@/hooks/useSupportMessages", () => ({
  useSupportMessages: () => ({
    data: [
      { id: "m1", conversation_id: "c1", direction: "inbound", author_kind: "partner", author_id: null, body: "Ist die Charge freigegeben?", delivered: true, created_at: "2026-05-01T00:00:00Z" },
    ],
    isLoading: false,
    isError: false,
    refetch: msgRefetch,
  }),
}));

vi.mock("@/lib/support-api", () => ({
  replyToConversation: vi.fn().mockResolvedValue({ message_id: "m2" }),
  updateConversation: vi.fn().mockResolvedValue({ id: "c1" }),
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("SupportInbox", () => {
  beforeEach(() => vi.clearAllMocks());

  it("defaults to the 'open' filter and hides resolved conversations", () => {
    render(<SupportInbox />);
    expect(screen.getByText("CoA Frage")).toBeInTheDocument();
    expect(screen.queryByText("Gelöster Fall")).not.toBeInTheDocument();
  });

  it("shows the thread when a conversation is selected", () => {
    render(<SupportInbox />);
    fireEvent.click(screen.getByText("CoA Frage"));
    expect(screen.getByText("Ist die Charge freigegeben?")).toBeInTheDocument();
  });

  it("sends a reply through the API and refetches", async () => {
    render(<SupportInbox />);
    fireEvent.click(screen.getByText("CoA Frage"));
    fireEvent.change(screen.getByPlaceholderText(/Reply to the partner/), { target: { value: "Ja, freigegeben." } });
    fireEvent.click(screen.getByText("Send"));
    await waitFor(() => expect(replyToConversation).toHaveBeenCalledWith("c1", "Ja, freigegeben."));
    await waitFor(() => expect(msgRefetch).toHaveBeenCalled());
  });

  it("assigns the conversation to the current user", async () => {
    render(<SupportInbox />);
    fireEvent.click(screen.getByText("CoA Frage"));
    fireEvent.click(screen.getByText("Assign to me"));
    await waitFor(() =>
      expect(updateConversation).toHaveBeenCalledWith("c1", { assigned_to: "staff-1", status: "assigned" })
    );
  });

  it("reveals resolved conversations under the 'All' filter", () => {
    render(<SupportInbox />);
    fireEvent.click(screen.getByText("All"));
    expect(screen.getByText("Gelöster Fall")).toBeInTheDocument();
  });
});
