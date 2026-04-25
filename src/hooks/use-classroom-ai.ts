import { useState, useCallback, useRef, useEffect } from "react";
import { useNativeSpeech, type SpeechSegment } from "./use-native-speech";

/**
 * Live transcription using native speech recognition (Capacitor) with Web Speech API fallback.
 * Captures speaker segments with timestamps.
 */
export interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  timestamp: string; // HH:MM:SS
  startMs: number;
}

export function useClassroomTranscription(opts?: { language?: string }) {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [currentInterim, setCurrentInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const segmentCountRef = useRef(0);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SR);
  }, []);

  const formatTime = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600).toString().padStart(2, "0");
    const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, "0");
    const s = (totalSec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const start = useCallback((speakerName = "Sprecher") => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError("Spracherkennung wird von diesem Browser nicht unterstützt.");
      return;
    }

    const recognition = new SR();
    recognition.lang = opts?.language || "de-DE";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    startTimeRef.current = Date.now();

    recognition.onstart = () => {
      setIsTranscribing(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript + " ";
        } else {
          interimText += result[0].transcript;
        }
      }

      setCurrentInterim(interimText);

      if (finalText.trim()) {
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        segmentCountRef.current++;

        const segment: TranscriptSegment = {
          id: `seg-${segmentCountRef.current}`,
          speaker: speakerName,
          text: finalText.trim(),
          timestamp: formatTime(elapsed),
          startMs: elapsed,
        };

        setSegments((prev) => [...prev, segment]);
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === "no-speech") return;
      if (event.error === "aborted") return;
      setError(`Sprachfehler: ${event.error}`);
    };

    recognition.onend = () => {
      // Auto-restart if still transcribing (Web Speech API stops after silence)
      if (recognitionRef.current) {
        try {
          recognition.start();
        } catch {
          setIsTranscribing(false);
        }
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [opts?.language]);

  const stop = useCallback(() => {
    const rec = recognitionRef.current;
    recognitionRef.current = null;
    rec?.stop();
    setIsTranscribing(false);
    setCurrentInterim("");
  }, []);

  const reset = useCallback(() => {
    stop();
    setSegments([]);
    segmentCountRef.current = 0;
    setError(null);
  }, [stop]);

  const getFullTranscript = useCallback((): string => {
    return segments
      .map((s) => `[${s.timestamp}] ${s.speaker}: ${s.text}`)
      .join("\n");
  }, [segments]);

  return {
    isTranscribing,
    segments,
    currentInterim,
    error,
    isSupported,
    start,
    stop,
    reset,
    getFullTranscript,
  };
}

/**
 * AI Summary generation for classroom transcripts.
 * Uses Anthropic API via Supabase Edge Function or direct call.
 */
export function useClassroomSummary() {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = useCallback(
    async (
      transcript: string,
      sessionTitle: string,
      opts?: { language?: string }
    ) => {
      if (!transcript.trim()) {
        setError("Kein Transkript vorhanden");
        return;
      }

      setIsSummarizing(true);
      setError(null);
      setSummary(null);

      try {
        // Use the gateway's summarize edge function or direct API
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        // Try edge function first
        const response = await fetch(`${supabaseUrl}/functions/v1/classroom-ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
          },
          body: JSON.stringify({
            action: "summarize",
            transcript,
            sessionTitle,
            language: opts?.language || "de",
          }),
        });

        if (!response.ok) {
          // Fallback: generate summary client-side with transcript
          const fallbackSummary = generateLocalSummary(transcript, sessionTitle);
          setSummary(fallbackSummary);
          return;
        }

        const data = await response.json();
        setSummary(data.summary);
      } catch (e: unknown) {
        // Fallback to local summary
        const fallbackSummary = generateLocalSummary(transcript, sessionTitle);
        setSummary(fallbackSummary);
      } finally {
        setIsSummarizing(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setSummary(null);
    setError(null);
  }, []);

  return { generateSummary, isSummarizing, summary, error, reset };
}

function generateLocalSummary(transcript: string, title: string): string {
  const lines = transcript.split("\n").filter((l) => l.trim());
  const duration = lines.length > 0 ? lines[lines.length - 1].match(/\[(\d{2}:\d{2}:\d{2})\]/)?.[1] || "unbekannt" : "unbekannt";
  const speakers = new Set(lines.map((l) => l.match(/\] (.+?):/)?.[1]).filter(Boolean));
  const wordCount = transcript.split(/\s+/).length;

  return `## Zusammenfassung: ${title}

**Dauer:** ${duration}
**Sprecher:** ${Array.from(speakers).join(", ") || "unbekannt"}
**Wörter:** ${wordCount}

### Transkript-Auszug
${lines.slice(0, 10).join("\n")}
${lines.length > 10 ? `\n... und ${lines.length - 10} weitere Segmente` : ""}

---
*Automatische Zusammenfassung · Für detaillierte AI-Analyse wird eine Verbindung zum AI-Service benötigt.*`;
}
