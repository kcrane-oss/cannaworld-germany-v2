import { describe, it, expect, beforeEach } from "vitest";
import {
  DEFAULT_LEVEL,
  showsOptional,
  showsHelp,
  pickCopy,
  getStoredLevel,
  setStoredLevel,
  suggestLevel,
} from "./guidance-level";

describe("guidance-level", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to simple (serve the least experienced first)", () => {
    expect(DEFAULT_LEVEL).toBe("simple");
    expect(getStoredLevel()).toBe("simple");
  });

  it("hides optional fields + shows help at simple, opposite at expert", () => {
    expect(showsOptional("simple")).toBe(false);
    expect(showsOptional("standard")).toBe(true);
    expect(showsOptional("expert")).toBe(true);
    expect(showsHelp("simple")).toBe(true);
    expect(showsHelp("expert")).toBe(false);
  });

  it("picks level-appropriate copy with sensible fallback", () => {
    const v = { simple: "S", standard: "M", expert: "L" };
    expect(pickCopy("simple", v)).toBe("S");
    expect(pickCopy("standard", v)).toBe("M");
    expect(pickCopy("expert", v)).toBe("L");
    expect(pickCopy("expert", { simple: "S", standard: "M" })).toBe("M"); // no expert → standard
  });

  it("persists the level", () => {
    setStoredLevel("expert");
    expect(getStoredLevel()).toBe("expert");
  });

  it("ignores a corrupt stored value", () => {
    localStorage.setItem("cw.guidance-level", "garbage");
    expect(getStoredLevel()).toBe("simple");
  });

  it("adapts down on struggle and up on effortless speed", () => {
    expect(suggestLevel("standard", { errors: 3, helpRequests: 0, secondsPerField: 10 })).toBe("simple");
    expect(suggestLevel("standard", { errors: 0, helpRequests: 0, secondsPerField: 60 })).toBe("simple");
    expect(suggestLevel("simple", { errors: 0, helpRequests: 0, secondsPerField: 4 })).toBe("standard");
    expect(suggestLevel("simple", { errors: 5, helpRequests: 5, secondsPerField: 90 })).toBe("simple"); // floors at simple
    expect(suggestLevel("standard", { errors: 1, helpRequests: 0, secondsPerField: 20 })).toBe("standard"); // no change
  });
});
