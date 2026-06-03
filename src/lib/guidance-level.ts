// Guidance level for accessible, "anyone can do it" onboarding. Pure + testable.
// Affects BOTH language (simpler wording + more help) AND scope (fewer optional
// fields) — "simple" is the default so the least experienced user is served first.
// Seeds the adaptive-over-time behaviour via suggestLevel().

export const GUIDANCE_LEVELS = ["simple", "standard", "expert"] as const;
export type GuidanceLevel = (typeof GUIDANCE_LEVELS)[number];

export const DEFAULT_LEVEL: GuidanceLevel = "simple";

export const GUIDANCE_LEVEL_LABELS: Record<GuidanceLevel, { key: string; de: string }> = {
  simple: { key: "guidance.level.simple", de: "Einfach" },
  standard: { key: "guidance.level.standard", de: "Standard" },
  expert: { key: "guidance.level.expert", de: "Experte" },
};

function rank(level: GuidanceLevel): number {
  return GUIDANCE_LEVELS.indexOf(level);
}

/**
 * Optional fields are hidden at "simple" to reduce scope; everything shows at
 * standard/expert. (Required fields are never hidden.)
 */
export function showsOptional(level: GuidanceLevel): boolean {
  return rank(level) >= rank("standard");
}

/** Whether to show extra inline help/explanations (most at simple, none at expert). */
export function showsHelp(level: GuidanceLevel): boolean {
  return level !== "expert";
}

/** Pick level-appropriate copy; falls back to the nearest provided variant. */
export function pickCopy(
  level: GuidanceLevel,
  variants: { simple: string; standard: string; expert?: string }
): string {
  if (level === "expert") return variants.expert ?? variants.standard;
  if (level === "standard") return variants.standard;
  return variants.simple;
}

// --- Persistence (localStorage, no backend needed) ---------------------------

export const STORAGE_KEY = "cw.guidance-level";

export function getStoredLevel(): GuidanceLevel {
  try {
    const v = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (v && (GUIDANCE_LEVELS as readonly string[]).includes(v)) return v as GuidanceLevel;
  } catch {
    /* localStorage unavailable */
  }
  return DEFAULT_LEVEL;
}

export function setStoredLevel(level: GuidanceLevel): void {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, level);
  } catch {
    /* ignore */
  }
}

// --- Adaptive over time ------------------------------------------------------

export interface InteractionSignals {
  /** Validation errors the user hit. */
  errors: number;
  /** Times the user asked for help / read-aloud. */
  helpRequests: number;
  /** Average seconds spent per field. */
  secondsPerField: number;
}

function step(level: GuidanceLevel, dir: -1 | 1): GuidanceLevel {
  const i = Math.min(GUIDANCE_LEVELS.length - 1, Math.max(0, rank(level) + dir));
  return GUIDANCE_LEVELS[i];
}

/**
 * Suggest a level from interaction signals. Struggle (errors/help/slowness) moves
 * toward "simple"; effortless fast completion moves toward "expert". One step at a
 * time, so adjustments are gentle.
 */
export function suggestLevel(current: GuidanceLevel, signals: InteractionSignals): GuidanceLevel {
  const struggle = signals.errors + signals.helpRequests;
  if (struggle >= 3 || signals.secondsPerField > 40) return step(current, -1); // simpler
  if (struggle === 0 && signals.secondsPerField > 0 && signals.secondsPerField < 8) return step(current, 1); // harder
  return current;
}
