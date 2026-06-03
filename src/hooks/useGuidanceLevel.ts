import { useState } from "react";
import { getStoredLevel, setStoredLevel, type GuidanceLevel } from "@/lib/guidance-level";

// Persisted guidance level (localStorage). Default "simple" so the least
// experienced user is served first; the user can raise it, and the adaptive
// logic (suggestLevel) can lower it again over time.
export function useGuidanceLevel() {
  const [level, setLevelState] = useState<GuidanceLevel>(() => getStoredLevel());

  function setLevel(next: GuidanceLevel) {
    setStoredLevel(next);
    setLevelState(next);
  }

  return { level, setLevel };
}
