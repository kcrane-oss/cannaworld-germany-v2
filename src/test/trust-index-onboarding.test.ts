import { describe, expect, it } from "vitest";
import de from "@/i18n/locales/de.json";
import en from "@/i18n/locales/en.json";
import { ROLE_CONFIGS } from "@/components/onboarding/config/role-configs";

type TranslationTree = Record<string, unknown>;

function resolveTranslation(tree: TranslationTree, key: string): unknown {
  return key.split(".").reduce<unknown>((value, segment) => {
    if (!value || typeof value !== "object") return undefined;
    return (value as TranslationTree)[segment];
  }, tree);
}

describe("Trust Index onboarding semantics", () => {
  it("uses the canonical Trust Index configuration for every role", () => {
    for (const config of Object.values(ROLE_CONFIGS)) {
      expect(config.trustIndexAxes.length).toBeGreaterThan(0);
      expect(config.trustIndexAxes.reduce((sum, axis) => sum + axis.weight, 0)).toBe(100);
      expect(config.steps.some((step) => step.label === "ob.step_trust_index") || config.steps.length <= 3).toBe(true);
    }
  });

  it("resolves every Trust Index label in German and English", () => {
    const keys = new Set<string>(["ob.step_trust_index"]);

    for (const config of Object.values(ROLE_CONFIGS)) {
      for (const axis of config.trustIndexAxes) {
        keys.add(axis.label);
        for (const question of axis.questions) {
          keys.add(question.label);
          for (const option of question.options) keys.add(option.label);
        }
      }
    }

    for (const locale of [de, en] as TranslationTree[]) {
      for (const key of keys) {
        const value = resolveTranslation(locale, key);
        expect(value, `missing translation: ${key}`).toBeTypeOf("string");
        expect(value).not.toBe(key);
      }
    }
  });

  it("contains no retired brand label in active onboarding configuration or locales", () => {
    const retiredBrand = ["shin", "rai"].join("");
    const activeContent = JSON.stringify({ ROLE_CONFIGS, de, en }).toLowerCase();
    expect(activeContent).not.toContain(retiredBrand);
  });
});
