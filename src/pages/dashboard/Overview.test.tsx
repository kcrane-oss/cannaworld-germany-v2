import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Overview from "./Overview";

// Mock the auth + dashboard-stats hooks before importing the component under test.
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ user: { id: "test-user", email: "test@cannaworld.de" }, loading: false }),
}));
vi.mock("@/hooks/useDashboardStats", () => ({
  useDashboardStats: () => ({
    data: {
      activeTradeCases: 3,
      batchesInProgress: 7,
      openRecalls: 0,
      activeShipments: 2,
      totalInventoryItems: 12,
      lowStockAlerts: 1,
    },
    isLoading: false,
    isError: false,
    isFetching: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

function wrap(node: React.ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter>{node}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe("Overview page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Importer Dashboard header", () => {
    render(wrap(<Overview />));
    expect(screen.getByText("Importer Dashboard")).toBeInTheDocument();
    expect(screen.getByText(/Germany Command Center/)).toBeInTheDocument();
  });

  it("renders all 6 KPI tiles with mocked values", () => {
    render(wrap(<Overview />));
    expect(screen.getByText("Aktive Trade Cases")).toBeInTheDocument();
    expect(screen.getByText("Chargen in Prüfung")).toBeInTheDocument();
    expect(screen.getByText("QP Release ausstehend")).toBeInTheDocument();
    expect(screen.getByText("Aktive Sendungen")).toBeInTheDocument();
    expect(screen.getByText("Inventar-Positionen")).toBeInTheDocument();
    expect(screen.getByText("Offene Recalls")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // activeTradeCases
    expect(screen.getByText("2")).toBeInTheDocument(); // activeShipments
    expect(screen.getByText("12")).toBeInTheDocument(); // inventory items
  });

  it("renders Quick Pivot CTAs to Gateway / Marketplace / AICert", () => {
    render(wrap(<Overview />));
    expect(screen.getByText(/Gateway öffnen/)).toBeInTheDocument();
    expect(screen.getByText(/Marketplace öffnen/)).toBeInTheDocument();
    expect(screen.getByText(/AICert öffnen/)).toBeInTheDocument();
  });
});
