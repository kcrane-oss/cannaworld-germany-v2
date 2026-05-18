import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Compliance from "./Compliance";

describe("Compliance page", () => {
  it("renders heading + framework switcher", () => {
    render(<Compliance />);
    expect(screen.getByText("EU-GMP / GDP / GACP")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EU-GMP" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "GDP" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "GACP" })).toBeInTheDocument();
  });

  it("switches framework when a tab is clicked", () => {
    render(<Compliance />);
    fireEvent.click(screen.getByRole("button", { name: "GDP" }));
    expect(screen.getByText(/Good Distribution Practice/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "GACP" }));
    expect(screen.getByText(/Good Agricultural & Collection Practice/)).toBeInTheDocument();
  });

  it("renders coverage % + summary counts", () => {
    render(<Compliance />);
    expect(screen.getByText("Gesamtcoverage")).toBeInTheDocument();
    expect(screen.getByText("Abgedeckt")).toBeInTheDocument();
    expect(screen.getByText("Teilweise")).toBeInTheDocument();
    expect(screen.getByText("Fehlt")).toBeInTheDocument();
  });
});
