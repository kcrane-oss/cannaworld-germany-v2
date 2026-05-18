import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CrossAppCTA from "./CrossAppCTA";

describe("CrossAppCTA", () => {
  it("renders the Marketplace deep-link banner for moduleKey='marketplace'", () => {
    render(<CrossAppCTA moduleKey="marketplace" />);
    expect(screen.getByText(/CannaWorld Marketplace · operatives Master-System/)).toBeInTheDocument();
    const cta = screen.getByText(/In Marketplace öffnen/).closest("a");
    expect(cta?.getAttribute("href")).toBe("https://cannaworld-marketplace.com");
    expect(cta?.getAttribute("target")).toBe("_blank");
    expect(cta?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("routes audit-passport, compliance, analytics → AICert", () => {
    for (const key of ["audit-passport", "compliance", "analytics"]) {
      const { unmount } = render(<CrossAppCTA moduleKey={key} />);
      const cta = screen.getByText(/In AICert öffnen/).closest("a");
      expect(cta?.getAttribute("href")).toBe("https://gmp-aicert.com");
      unmount();
    }
  });

  it("routes suppliers, trade-cases, pharmacy-import → Gateway", () => {
    for (const key of ["suppliers", "trade-cases", "pharmacy-import"]) {
      const { unmount } = render(<CrossAppCTA moduleKey={key} />);
      const cta = screen.getByText(/In Gateway öffnen/).closest("a");
      expect(cta?.getAttribute("href")).toBe("https://cannaworld-thailand.com");
      unmount();
    }
  });

  it("routes regulatory → Europe", () => {
    render(<CrossAppCTA moduleKey="regulatory" />);
    const cta = screen.getByText(/In Europe öffnen/).closest("a");
    expect(cta?.getAttribute("href")).toBe("https://cannaworld-europe.com");
  });

  it("returns null for unknown moduleKey (overview, settings, profile, services)", () => {
    for (const key of ["overview", "settings", "profile", "services", "qp-release", "logistics", "warehouse", "documents"]) {
      const { container, unmount } = render(<CrossAppCTA moduleKey={key} />);
      expect(container.firstChild).toBeNull();
      unmount();
    }
  });
});
