import { describe, it, expect } from "vitest";
import { evaluateEscalation, SLA_MINUTES } from "./escalation";

const NOW = Date.parse("2026-06-02T12:00:00Z");
const minsAgo = (m: number) => new Date(NOW - m * 60000).toISOString();

describe("evaluateEscalation", () => {
  it("marks an actionable conversation overdue past its SLA", () => {
    const r = evaluateEscalation({ status: "open", tier: 0, priority: "urgent", updatedAt: minsAgo(120), now: NOW });
    expect(r.slaMinutes).toBe(SLA_MINUTES.urgent);
    expect(r.overdue).toBe(true);
    expect(r.suggestedTier).toBe(1); // tier+1
  });

  it("is not overdue within the SLA window", () => {
    const r = evaluateEscalation({ status: "open", tier: 1, priority: "normal", updatedAt: minsAgo(60), now: NOW });
    expect(r.overdue).toBe(false);
    expect(r.suggestedTier).toBe(1);
  });

  it("never marks resolved/closed conversations overdue", () => {
    const r = evaluateEscalation({ status: "resolved", tier: 0, priority: "urgent", updatedAt: minsAgo(9999), now: NOW });
    expect(r.overdue).toBe(false);
  });

  it("caps the suggested tier at 3", () => {
    const r = evaluateEscalation({ status: "open", tier: 3, priority: "urgent", updatedAt: minsAgo(9999), now: NOW });
    expect(r.overdue).toBe(true);
    expect(r.suggestedTier).toBe(3);
  });

  it("uses longer SLAs for lower priority", () => {
    expect(SLA_MINUTES.low).toBeGreaterThan(SLA_MINUTES.normal);
    expect(SLA_MINUTES.normal).toBeGreaterThan(SLA_MINUTES.high);
    expect(SLA_MINUTES.high).toBeGreaterThan(SLA_MINUTES.urgent);
  });
});
