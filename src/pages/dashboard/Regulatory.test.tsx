import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Regulatory from "./Regulatory";

describe("Regulatory decision tree", () => {
  it("starts at step 1 with 4 entity options", () => {
    render(<Regulatory />);
    expect(screen.getByText(/Welche Rolle übernimmt deine Organisation/)).toBeInTheDocument();
    for (const label of ["Apotheke", "Pharma-Großhandel", "Importeur", "Hersteller"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("walks pharmacy → direct import path to BfArM recommendation", () => {
    render(<Regulatory />);
    fireEvent.click(screen.getByText("Apotheke"));
    fireEvent.click(screen.getByText("Direct Import"));
    expect(screen.getByText(/§73 Abs\. 3 AMG/)).toBeInTheDocument();
    expect(screen.getByText(/BfArM Importerlaubnis/)).toBeInTheDocument();
  });

  it("walks pharmacy → managed import path to CannaWorld recommendation", () => {
    render(<Regulatory />);
    fireEvent.click(screen.getByText("Apotheke"));
    fireEvent.click(screen.getByText("Managed Import"));
    expect(screen.getByText(/Managed Import via CannaWorld Gateway/)).toBeInTheDocument();
  });

  it("walks wholesale path to GDP recommendation", () => {
    render(<Regulatory />);
    fireEvent.click(screen.getByText("Pharma-Großhandel"));
    fireEvent.click(screen.getByText("Wiederkehrend"));
    expect(screen.getByText(/Großhandel \+ GDP-Distribution/)).toBeInTheDocument();
    expect(screen.getByText(/§52a AMG/)).toBeInTheDocument();
  });

  it("walks importer path to QP recommendation", () => {
    render(<Regulatory />);
    fireEvent.click(screen.getByText("Importeur"));
    fireEvent.click(screen.getByText("Skalierend"));
    expect(screen.getByText(/EU-GMP-Importeur mit eigener QP/)).toBeInTheDocument();
    // §13 AMG appears in both description and required-list; both are fine.
    expect(screen.getAllByText(/§13 AMG/).length).toBeGreaterThan(0);
  });

  it("supports restart via 'Neu starten'", () => {
    render(<Regulatory />);
    fireEvent.click(screen.getByText("Apotheke"));
    fireEvent.click(screen.getByText("Direct Import"));
    fireEvent.click(screen.getByText(/Neu starten/));
    expect(screen.getByText(/Welche Rolle übernimmt deine Organisation/)).toBeInTheDocument();
  });
});
