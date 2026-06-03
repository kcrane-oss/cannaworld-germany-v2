// Read-aloud / text-to-speech via the Web Speech Synthesis API. Defensive: every
// entry point no-ops gracefully where speech synthesis is unavailable (SSR,
// older browsers, locked-down webviews). German by default.

export function isSpeechAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    typeof window.SpeechSynthesisUtterance !== "undefined"
  );
}

/** Speak the given text aloud (cancels anything currently speaking). Returns
 *  false if speech is unavailable or the text is empty. */
export function speak(text: string, lang = "de-DE"): boolean {
  if (!isSpeechAvailable() || !text.trim()) return false;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // a touch slower — easier to follow
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
  if (isSpeechAvailable()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
  }
}
