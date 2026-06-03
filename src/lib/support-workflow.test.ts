import { describe, it, expect } from "vitest";
import {
  SUPPORT_STATUSES,
  SUPPORT_TIERS,
  isSupportStatus,
  isSupportTier,
  isTerminalStatus,
  isActionable,
} from "./support-workflow";

describe("support-workflow", () => {
  it("recognises valid statuses and tiers", () => {
    expect(isSupportStatus("waiting")).toBe(true);
    expect(isSupportStatus("nope")).toBe(false);
    expect(isSupportTier(2)).toBe(true);
    expect(isSupportTier(9)).toBe(false);
  });

  it("treats only 'closed' as terminal", () => {
    expect(isTerminalStatus("closed")).toBe(true);
    expect(isTerminalStatus("resolved")).toBe(false);
    expect(isTerminalStatus("open")).toBe(false);
  });

  it("flags actionable (open) conversations, excluding resolved/closed", () => {
    expect(isActionable("open")).toBe(true);
    expect(isActionable("assigned")).toBe(true);
    expect(isActionable("waiting")).toBe(true);
    expect(isActionable("resolved")).toBe(false);
    expect(isActionable("closed")).toBe(false);
    expect(isActionable("garbage")).toBe(false);
  });

  it("exposes six statuses and four tiers", () => {
    expect(SUPPORT_STATUSES).toHaveLength(6);
    expect(SUPPORT_TIERS).toHaveLength(4);
  });
});
