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

type WebSpeechRecognitionResult = {
  isFinal: boolean;
  0: { transcript: string };
};

type WebSpeechRecognitionEvent = {
  results: ArrayLike<WebSpeechRecognitionResult>;
};

type WebSpeechRecognitionErrorEvent = {
  error: string;
};

type WebSpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: WebSpeechRecognitionEvent) => void) | null;
  onerror: ((event: WebSpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type WebSpeechRecognitionConstructor = new () => WebSpeechRecognitionInstance;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: WebSpeechRecognitionConstructor;
  webkitSpeechRecognition?: WebSpeechRecognitionConstructor;
};

const getWebSpeechRecognition = (): WebSpeechRecognitionConstructor | undefined => {
  const speechWindow = window as SpeechRecognitionWindow;
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
};

const isNativePlatform = () => Capacitor.isNativePlatform();

export function useNativeSpeech(opts?: UseNativeSpeechOpts) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isNative] = useState(isNativePlatform);
  const [isSupported, setIsSupported] = useState(() => !isNativePlatform() && Boolean(getWebSpeechRecognition()));
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const webRecognitionRef = useRef<WebSpeechRecognitionInstance | null>(null);
  const segmentCountRef = useRef(0);
  const language = opts?.language || "de-DE";
  const continuous = opts?.continuous ?? true;
  const onSegment = opts?.onSegment;

  // Detect native speech availability after mount.
  useEffect(() => {
    if (!isNative) return;

    SpeechRecognition.available().then(({ available }) => {
      setIsSupported(available);
    }).catch(() => setIsSupported(false));
  }, [isNative]);

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

      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Spracherkennung fehlgeschlagen");
        setIsListening(false);
      }
    } else {
      // ─── Web Speech API ───
      const SpeechRecognitionCtor = getWebSpeechRecognition();
      if (!SpeechRecognitionCtor) {
        setError("Spracherkennung nicht unterstützt");
        return;
      }

      const recognition = new SpeechRecognitionCtor();
      recognition.lang = language;
      recognition.continuous = continuous;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
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
          onSegment?.({
            id: `web-${segmentCountRef.current}`,
            text: finalText.trim(),
            language,
            timestamp: Date.now(),
            isFinal: true,
          });
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        if (event.error === "no-speech" || event.error === "aborted") return;
        setError(`Fehler: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        // Auto-restart for continuous mode
        if (webRecognitionRef.current && continuous) {
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
  }, [isNative, language, continuous, onSegment, requestPermission]);

  // Stop listening
  const stop = useCallback(async () => {
    if (isNative) {
      try {
        const result = await SpeechRecognition.stop() as unknown as { matches?: string[] };
        if (result?.matches?.[0]) {
          const finalText = result.matches[0];
          setTranscript((prev) => prev + (prev ? " " : "") + finalText);
          segmentCountRef.current++;
          onSegment?.({
            id: `native-${segmentCountRef.current}`,
            text: finalText,
            language,
            timestamp: Date.now(),
            isFinal: true,
          });
        }
        SpeechRecognition.removeAllListeners();
      } catch { /* Native stop may throw if recognition has already ended. */ }
    } else {
      const rec = webRecognitionRef.current;
      webRecognitionRef.current = null;
      rec?.stop();
    }
    setIsListening(false);
    setInterimTranscript("");
  }, [isNative, language, onSegment]);

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
