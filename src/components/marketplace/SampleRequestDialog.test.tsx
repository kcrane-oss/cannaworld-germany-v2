import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SampleRequestDialog } from "./SampleRequestDialog";
import { submitSampleRequest } from "@/lib/sample-request-api";

vi.mock("@/lib/sample-request-api", () => ({
  submitSampleRequest: vi.fn().mockResolvedValue({ id: "sr-1", status: "received" }),
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

function openDialog() {
  render(<SampleRequestDialog />);
  // English test locale → CTA reads "Request sample"
  fireEvent.click(screen.getByText("Request sample"));
}

describe("SampleRequestDialog", () => {
  beforeEach(() => vi.clearAllMocks());

  it("opens the dialog from the CTA", () => {
    openDialog();
    expect(screen.getByText("B2B sample request")).toBeInTheDocument();
  });

  it("blocks submit and shows validation when required fields are empty", async () => {
    openDialog();
    fireEvent.click(screen.getByText("Send request"));
    // hardcoded German zod message for the empty company field
    expect(await screen.findByText("Firmenname ist erforderlich")).toBeInTheDocument();
    expect(submitSampleRequest).not.toHaveBeenCalled();
  });

  it("submits a valid request through the API", async () => {
    openDialog();
    fireEvent.change(screen.getByLabelText("Company"), { target: { value: "Apotheke Nord" } });
    fireEvent.change(screen.getByLabelText("Contact email"), { target: { value: "e@apo.de" } });
    fireEvent.change(screen.getByLabelText("Quantity (kg)"), { target: { value: "5" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("Send request"));

    await waitFor(() => expect(submitSampleRequest).toHaveBeenCalledTimes(1));
    expect(submitSampleRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        company: "Apotheke Nord",
        contactEmail: "e@apo.de",
        quantityKg: 5,
        productCategory: "flower",
        targetPathway: "wholesale",
        b2bConfirmed: true,
      })
    );
  });
});
