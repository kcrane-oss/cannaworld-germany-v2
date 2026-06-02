import { describe, it, expect } from "vitest";
import { applyTriageRules } from "./triage-rules";

describe("applyTriageRules", () => {
  it("flags compliance/safety keywords and forces tier 2, no auto-resolve", () => {
    const r = applyTriageRules("Wir müssen einen Rückruf (recall) für die Charge prüfen");
    expect(r.complianceFlag).toBe(true);
    expect(r.category).toBe("compliance");
    expect(r.forceTier).toBe(2);
    expect(r.autoResolvable).toBe(false);
  });

  it("detects urgency from keywords", () => {
    expect(applyTriageRules("Das ist dringend!").urgency).toBe("urgent");
    expect(applyTriageRules("wichtig, bitte bald").urgency).toBe("high");
    expect(applyTriageRules("nur eine Frage").urgency).toBe("normal");
  });

  it("classifies non-compliance categories", () => {
    expect(applyTriageRules("Wann ist die QP Freigabe / released?").category).toBe("status");
    expect(applyTriageRules("Bitte das CoA Zertifikat senden").category).toBe("docs");
    expect(applyTriageRules("Frage zur Lieferung / shipment").category).toBe("logistics");
    expect(applyTriageRules("Was ist der Preis / Angebot?").category).toBe("commercial");
    expect(applyTriageRules("Hallo zusammen").category).toBe("other");
  });

  it("allows auto-resolution only for non-compliance", () => {
    expect(applyTriageRules("Wann kommt die Lieferung?").autoResolvable).toBe(true);
    expect(applyTriageRules("Datenschutz Beschwerde").autoResolvable).toBe(false);
  });
});
