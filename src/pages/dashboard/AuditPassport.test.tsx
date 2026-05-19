import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AuditPassport from "./AuditPassport";

vi.mock("@/hooks/use-suppliers", () => ({
  useSuppliers: () => ({
    data: [
      {
        id: "1",
        supplier_number: "SUP-001",
        name: "Anchor Farm",
        category: "cultivation",
        country: "TH",
        contact_name: null,
        contact_email: null,
        contact_phone: null,
        address: null,
        city: null,
        gmp_score: 82,
        quality_score: 85,
        delivery_score: 80,
        documentation_score: 88,
        overall_score: 84,
        status: "qualified",
        qualification_date: null,
        next_review_date: null,
        review_interval_days: 180,
        approved_by: null,
        approved_at: null,
        rejection_reason: null,
        gmp_certificate_url: null,
        gmp_certificate_expiry: null,
        iso_certified: true,
        license_number: null,
        last_audit_id: null,
        facility_id: null,
        notes: null,
        tags: [],
        created_by: null,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

describe("AuditPassport page", () => {
  it("renders header + 4 passport signal tiles", () => {
    render(<AuditPassport />);
    expect(screen.getByText("Audit Passport")).toBeInTheDocument();
    expect(screen.getByText("Facility Proof")).toBeInTheDocument();
    expect(screen.getByText("Document Proof")).toBeInTheDocument();
    expect(screen.getByText("ISO Proof")).toBeInTheDocument();
    expect(screen.getByText("Qualified Status")).toBeInTheDocument();
  });

  it("renders supplier row with 4/4 passport signals met", () => {
    render(<AuditPassport />);
    expect(screen.getByText("Anchor Farm")).toBeInTheDocument();
    expect(screen.getByText(/4 von 4 Passport-Signalen erfüllt/)).toBeInTheDocument();
  });

  it("has AICert deep-link in header", () => {
    render(<AuditPassport />);
    const ctas = screen.getAllByText(/AICert/);
    expect(ctas.length).toBeGreaterThan(0);
  });
});
