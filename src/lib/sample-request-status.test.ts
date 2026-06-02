import { describe, it, expect } from "vitest";
import {
  SAMPLE_REQUEST_STATUSES,
  canTransition,
  nextStatuses,
  isSampleRequestStatus,
} from "./sample-request-status";

describe("sample-request-status", () => {
  it("recognises valid statuses", () => {
    expect(isSampleRequestStatus("received")).toBe(true);
    expect(isSampleRequestStatus("bogus")).toBe(false);
  });

  it("allows the documented forward transitions", () => {
    expect(canTransition("received", "in_review")).toBe(true);
    expect(canTransition("received", "declined")).toBe(true);
    expect(canTransition("in_review", "fulfilled")).toBe(true);
  });

  it("blocks invalid or backward transitions", () => {
    expect(canTransition("received", "fulfilled")).toBe(false);
    expect(canTransition("fulfilled", "received")).toBe(false);
    expect(canTransition("declined", "in_review")).toBe(false);
  });

  it("treats fulfilled and declined as terminal", () => {
    expect(nextStatuses("fulfilled")).toEqual([]);
    expect(nextStatuses("declined")).toEqual([]);
  });

  it("returns no transitions for an unknown status string", () => {
    expect(nextStatuses("weird")).toEqual([]);
  });

  it("covers exactly four statuses", () => {
    expect(SAMPLE_REQUEST_STATUSES).toHaveLength(4);
  });
});
