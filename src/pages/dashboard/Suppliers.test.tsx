import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Suppliers from "./Suppliers";

vi.mock("@/hooks/use-suppliers", () => ({
  useSuppliers: () => ({
    data: [
      {
        id: "1",
        supplier_number: "SUP-001",
        name: "Anchor Farm Co., Ltd.",
        category: "cultivation",
        country: "Thailand",
        contact_name: "Mr. Ice",
        contact_email: "ice@example.com",
        contact_phone: null,
        address: null,
        city: null,
        gmp_score: 78,
        quality_score: 85,
        delivery_score: 90,
        documentation_score: 70,
        overall_score: 81,
        status: "qualified",
        qualification_date: "2026-01-01",
        next_review_date: "2026-07-01",
        review_interval_days: 180,
        approved_by: null,
        approved_at: null,
        rejection_reason: null,
        gmp_certificate_url: null,
        gmp_certificate_expiry: null,
        iso_certified: true,
        license_number: "PORT-11-001",
        last_audit_id: null,
        facility_id: null,
        notes: null,
        tags: [],
        created_by: null,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      },
      {
        id: "2",
        supplier_number: "SUP-002",
        name: "Green Chrono",
        category: "cultivation",
        country: "Thailand",
        contact_name: null,
        contact_email: null,
        contact_phone: null,
        address: null,
        city: null,
        gmp_score: 51,
        quality_score: 55,
        delivery_score: 60,
        documentation_score: 45,
        overall_score: 52,
        status: "under_review",
        qualification_date: null,
        next_review_date: null,
        review_interval_days: 180,
        approved_by: null,
        approved_at: null,
        rejection_reason: null,
        gmp_certificate_url: null,
        gmp_certificate_expiry: null,
        iso_certified: false,
        license_number: null,
        last_audit_id: null,
        facility_id: null,
        notes: null,
        tags: [],
        created_by: null,
        created_at: "2026-02-01T00:00:00Z",
        updated_at: "2026-02-01T00:00:00Z",
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

describe("Suppliers page", () => {
  it("renders heading + supplier count", () => {
    render(<Suppliers />);
    expect(screen.getByText("Suppliers")).toBeInTheDocument();
    expect(screen.getByText(/2 von 2 Suppliers/)).toBeInTheDocument();
  });

  it("renders both supplier cards", () => {
    render(<Suppliers />);
    expect(screen.getByText("Anchor Farm Co., Ltd.")).toBeInTheDocument();
    expect(screen.getByText("Green Chrono")).toBeInTheDocument();
  });

  it("filters by search query", () => {
    render(<Suppliers />);
    fireEvent.change(screen.getByPlaceholderText(/Supplier suchen/), { target: { value: "Anchor" } });
    expect(screen.getByText("Anchor Farm Co., Ltd.")).toBeInTheDocument();
    expect(screen.queryByText("Green Chrono")).not.toBeInTheDocument();
  });

  it("filters by status select", () => {
    render(<Suppliers />);
    fireEvent.change(screen.getByDisplayValue("Alle Status"), { target: { value: "qualified" } });
    expect(screen.getByText("Anchor Farm Co., Ltd.")).toBeInTheDocument();
    expect(screen.queryByText("Green Chrono")).not.toBeInTheDocument();
  });
});
