import { useState, useCallback, useRef, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

/**
 * Universal Speech Recognition hook.
 * Uses native Capacitor plugin on iOS/Android, falls back to Web Speech API on desktop.
 * Supports multiple languages for real-time translation workflows.
 */

export interface SpeechSegment {
  id: string;
  text: string;
  language: string;
  timestamp: number;
  isFinal: boolean;
}

interface UseNativeSpeechOpts {
  language?: string;
  continuous?: boolean;
  onSegment?: (segment: SpeechSegment) => void;
}

export function useNativeSpeech(opts?: UseNativeSpeechOpts) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const webRecognitionRef = useRef<any>(null);
  const segmentCountRef = useRef(0);
  const language = opts?.language || "de-DE";

  // Detect platform
  useEffect(() => {
    const native = Capacitor.isNativePlatform();
    setIsNative(native);

    if (native) {
      // Check native availability
      SpeechRecognition.available().then(({ available }) => {
        setIsSupported(available);
      }).catch(() => setIsSupported(false));
    } else {
      // Check Web Speech API
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSupported(!!SR);
    }
  }, []);

  // Request permission (native only)
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isNative) {
      setHasPermission(true);
      return true;
    }
    try {
      const { speechRecognition } = await SpeechRecognition.requestPermissions();
      const granted = speechRecognition === "granted";
      setHasPermission(granted);
      return granted;
    } catch {
      setHasPermission(false);
      return false;
    }
  }, [isNative]);

  // Start listening
  const start = useCallback(async () => {
    setError(null);

    if (isNative) {
      // ─── Native (Capacitor) ───
      try {
        const permitted = await requestPermission();
        if (!permitted) {
          setError("Mikrofon-Berechtigung benötigt");
          return;
        }

        setIsListening(true);

        // Listen for partial results
        SpeechRecognition.addListener("partialResults", (data: { matches: string[] }) => {
          if (data.matches?.[0]) {
            setInterimTranscript(data.matches[0]);
          }
        });

        await SpeechRecognition.start({
          language,
          maxResults: 5,
          prompt: "",
          partialResults: true,
          popup: false,
        });

        // On native, start() resolves when speech ends
        // We get results from the resolved promise
        // For continuous mode, we restart in a loop

      } catch (e: any) {
        setError(e.message || "Spracherkennung fehlgeschlagen");
        setIsListening(false);
      }
    } else {
      // ─── Web Speech API ───
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) {
        setError("Spracherkennung nicht unterstützt");
        return;
      }

      const recognition = new SR();
      recognition.lang = language;
      recognition.continuous = opts?.continuous ?? true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let finalText = "";
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript + " ";
          } else {
            interim += result[0].transcript;
          }
        }
        if (finalText) {
          setTranscript((prev) => prev + finalText);
          segmentCountRef.current++;
          opts?.onSegment?.({
            id: `web-${segmentCountRef.current}`,
            text: finalText.trim(),
            language,
            timestamp: Date.now(),
            isFinal: true,
          });
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event: any) => {
        if (event.error === "no-speech" || event.error === "aborted") return;
        setError(`Fehler: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        // Auto-restart for continuous mode
        if (webRecognitionRef.current && opts?.continuous !== false) {
          try {
            recognition.start();
          } catch {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      webRecognitionRef.current = recognition;
      recognition.start();
    }
  }, [isNative, language, opts?.continuous, opts?.onSegment, requestPermission]);

  // Stop listening
  const stop = useCallback(async () => {
    if (isNative) {
      try {
        const result = (await SpeechRecognition.stop()) as any;
        if (result?.matches?.[0]) {
          const finalText = result.matches[0];
          setTranscript((prev) => prev + (prev ? " " : "") + finalText);
          segmentCountRef.current++;
          opts?.onSegment?.({
            id: `native-${segmentCountRef.current}`,
            text: finalText,
            language,
            timestamp: Date.now(),
            isFinal: true,
          });
        }
        SpeechRecognition.removeAllListeners();
      } catch { /* ignore */ }
    } else {
      const rec = webRecognitionRef.current;
      webRecognitionRef.current = null;
      rec?.stop();
    }
    setIsListening(false);
    setInterimTranscript("");
  }, [isNative, language, opts?.onSegment]);

  // Reset
  const reset = useCallback(() => {
    stop();
    setTranscript("");
    setInterimTranscript("");
    setError(null);
    segmentCountRef.current = 0;
  }, [stop]);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    isNative,
    hasPermission,
    start,
    stop,
    reset,
    requestPermission,
  };
}

/**
 * Supported languages for speech recognition.
 */
export const SPEECH_LANGUAGES = [
  { code: "de-DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "en-GB", label: "English (UK)", flag: "🇬🇧" },
  { code: "th-TH", label: "ไทย", flag: "🇹🇭" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "ja-JP", label: "日本語", flag: "🇯🇵" },
  { code: "fr-FR", label: "Français", flag: "🇫🇷" },
  { code: "es-ES", label: "Español", flag: "🇪🇸" },
] as const;

export type SpeechLanguageCode = (typeof SPEECH_LANGUAGES)[number]["code"];
