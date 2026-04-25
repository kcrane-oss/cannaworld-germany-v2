import { useState, useCallback, useRef } from "react";

/**
 * Live Translation for Classroom sessions.
 * Translates speech segments in real-time using Claude Haiku (cheapest).
 * Supports DE ↔ EN ↔ TH ↔ ZH in all directions.
 */

export type TranslationLanguage = "de" | "en" | "th" | "zh";

export interface TranslationLanguageConfig {
  code: TranslationLanguage;
  label: string;
  speechCode: string; // Web Speech API language code
  flag: string;
  nativeName: string;
}

export const TRANSLATION_LANGUAGES: TranslationLanguageConfig[] = [
  { code: "de", label: "Deutsch",  speechCode: "de-DE", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "en", label: "English",  speechCode: "en-US", flag: "🇺🇸", nativeName: "English" },
  { code: "th", label: "Thai",     speechCode: "th-TH", flag: "🇹🇭", nativeName: "ภาษาไทย" },
  { code: "zh", label: "Chinese",  speechCode: "zh-CN", flag: "🇨🇳", nativeName: "中文" },
];

export interface Subtitle {
  id: string;
  original: string;
  translated: string;
  sourceLang: TranslationLanguage;
  targetLang: TranslationLanguage;
  timestamp: string;
  speaker?: string;
}

interface UseLiveTranslationOpts {
  sourceLang: TranslationLanguage;
  targetLang: TranslationLanguage;
  supabaseUrl: string;
  supabaseKey: string;
}

export function useLiveTranslation(opts: UseLiveTranslationOpts) {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queueRef = useRef<string[]>([]);
  const processingRef = useRef(false);
  const subtitleCountRef = useRef(0);

  const formatTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  // Translate a single text segment via Edge Function (Haiku for cost)
  const translateSegment = useCallback(async (text: string): Promise<string> => {
    if (opts.sourceLang === opts.targetLang) return text;
    if (!text.trim()) return "";

    try {
      const response = await fetch(`${opts.supabaseUrl}/functions/v1/classroom-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: opts.supabaseKey,
        },
        body: JSON.stringify({
          action: "translate",
          text,
          sourceLang: opts.sourceLang,
          targetLang: opts.targetLang,
        }),
      });

      if (!response.ok) {
        // Fallback: client-side with Anthropic directly won't work (no API key in browser)
        // Return with [untranslated] marker
        return `[${text}]`;
      }

      const data = await response.json();
      return data.translation || text;
    } catch {
      return `[${text}]`;
    }
  }, [opts.sourceLang, opts.targetLang, opts.supabaseUrl, opts.supabaseKey]);

  // Process translation queue sequentially (avoid rate limits)
  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    while (queueRef.current.length > 0) {
      const text = queueRef.current.shift()!;
      const translated = await translateSegment(text);

      subtitleCountRef.current++;
      const subtitle: Subtitle = {
        id: `sub-${subtitleCountRef.current}`,
        original: text,
        translated,
        sourceLang: opts.sourceLang,
        targetLang: opts.targetLang,
        timestamp: formatTime(),
      };

      setSubtitles((prev) => [...prev.slice(-50), subtitle]); // Keep last 50
    }

    processingRef.current = false;
  }, [translateSegment, opts.sourceLang, opts.targetLang]);

  // Add text to translation queue
  const translate = useCallback((text: string, speaker?: string) => {
    if (!text.trim()) return;
    queueRef.current.push(text);
    processQueue();
  }, [processQueue]);

  const clear = useCallback(() => {
    setSubtitles([]);
    subtitleCountRef.current = 0;
  }, []);

  return {
    subtitles,
    translate,
    clear,
    isTranslating,
    error,
  };
}

/**
 * Get language config by code
 */
export function getLangConfig(code: TranslationLanguage): TranslationLanguageConfig {
  return TRANSLATION_LANGUAGES.find((l) => l.code === code) ?? TRANSLATION_LANGUAGES[0];
}

/**
 * Get all possible translation directions as pairs
 */
export function getTranslationPairs(): Array<{ from: TranslationLanguageConfig; to: TranslationLanguageConfig }> {
  const pairs = [];
  for (const from of TRANSLATION_LANGUAGES) {
    for (const to of TRANSLATION_LANGUAGES) {
      if (from.code !== to.code) {
        pairs.push({ from, to });
      }
    }
  }
  return pairs; // 12 pairs: DE↔EN, DE↔TH, DE↔ZH, EN↔TH, EN↔ZH, TH↔ZH (each direction)
}
