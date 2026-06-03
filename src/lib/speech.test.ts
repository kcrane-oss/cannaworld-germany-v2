import { describe, it, expect, vi, afterEach } from "vitest";
import { isSpeechAvailable, speak, stopSpeaking } from "./speech";

const original = {
  speechSynthesis: (window as unknown as { speechSynthesis?: unknown }).speechSynthesis,
  Utterance: (window as unknown as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance,
};

function install() {
  const speakFn = vi.fn();
  const cancelFn = vi.fn();
  (window as unknown as { speechSynthesis: unknown }).speechSynthesis = { speak: speakFn, cancel: cancelFn };
  (window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = class {
    text: string;
    lang = "";
    rate = 1;
    constructor(text: string) {
      this.text = text;
    }
  };
  return { speakFn, cancelFn };
}

afterEach(() => {
  (window as unknown as { speechSynthesis?: unknown }).speechSynthesis = original.speechSynthesis;
  (window as unknown as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance = original.Utterance;
  vi.restoreAllMocks();
});

describe("speech", () => {
  it("reports availability and speaks when the API is present", () => {
    const { speakFn } = install();
    expect(isSpeechAvailable()).toBe(true);
    expect(speak("Hallo Welt")).toBe(true);
    expect(speakFn).toHaveBeenCalledTimes(1);
  });

  it("does not speak empty text", () => {
    const { speakFn } = install();
    expect(speak("   ")).toBe(false);
    expect(speakFn).not.toHaveBeenCalled();
  });

  it("no-ops gracefully when speech synthesis is unavailable", () => {
    (window as unknown as { speechSynthesis?: unknown }).speechSynthesis = undefined;
    expect(isSpeechAvailable()).toBe(false);
    expect(speak("Test")).toBe(false);
    expect(() => stopSpeaking()).not.toThrow();
  });
});
