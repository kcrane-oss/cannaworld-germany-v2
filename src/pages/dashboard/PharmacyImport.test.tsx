import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PharmacyImport from "./PharmacyImport";

const wrap = (node: React.ReactNode) => <MemoryRouter>{node}</MemoryRouter>;

describe("PharmacyImport page", () => {
  it("renders all 3 path cards", () => {
    render(wrap(<PharmacyImport />));
    expect(screen.getByText("Managed Import")).toBeInTheDocument();
    expect(screen.getByText("Direct Import")).toBeInTheDocument();
    expect(screen.getByText("Spezialversorgung")).toBeInTheDocument();
  });

  it("links Direct Import to /dashboard/regulatory (internal link)", () => {
    render(wrap(<PharmacyImport />));
    const directCta = screen.getByText("Decision Tree öffnen").closest("a");
    expect(directCta?.getAttribute("href")).toBe("/dashboard/regulatory");
  });

  it("links Managed Import to Gateway (external)", () => {
    render(wrap(<PharmacyImport />));
    const managedCta = screen.getByText("Im Gateway starten").closest("a");
    expect(managedCta?.getAttribute("href")).toBe("https://cannaworld-thailand.com");
    expect(managedCta?.getAttribute("target")).toBe("_blank");
  });

  it("renders bottom Decision Tree CTA", () => {
    render(wrap(<PharmacyImport />));
    const cta = screen.getByText("Decision Tree starten").closest("a");
    expect(cta?.getAttribute("href")).toBe("/dashboard/regulatory");
  });
});
