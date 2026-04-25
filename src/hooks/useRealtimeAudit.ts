import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AuditProvider = "openai" | "gemini";

export interface GmpChecklistItem {
  id: string;
  timestamp: string;
  status: "ok" | "issue" | "pending";
  category: string;
  description: string;
}

export interface RealtimeAuditState {
  provider: AuditProvider | null;
  isConnected: boolean;
  isConnecting: boolean;
  isSaving: boolean;
  transcript: string[];
  aiAnalysis: string[];
  checklist: GmpChecklistItem[];
  error: string | null;
  lastSavedId: string | null;
}

const SYSTEM_PROMPT_GEMINI = `Du bist ein GMP/GACP-Audit-Assistent für Cannabis-Qualitätsprüfungen.
Analysiere was du siehst und hörst in Echtzeit und bewerte:
- Reinraum-Bedingungen und Hygiene
- Etikettierung und Dokumentation  
- Prozesskonformität (SOPs)
- Temperatur- und Lagerbedingungen
- Mitarbeiter-Schutzausrüstung (PPE)

Antworte auf Deutsch. Gib konkrete Bewertungen (konform/nicht konform) mit Begründung.
Erstelle automatisch Checklisten-Einträge im Format: [OK] oder [MANGEL] gefolgt von der Beschreibung.`;

export function useRealtimeAudit() {
  const [state, setState] = useState<RealtimeAuditState>({
    provider: null,
    isConnected: false,
    isConnecting: false,
    isSaving: false,
    transcript: [],
    aiAnalysis: [],
    checklist: [],
    error: null,
    lastSavedId: null,
  });

  const sessionStartedAtRef = useRef<Date | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const geminiSessionTokenRef = useRef<string | null>(null);
  const geminiIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addTranscript = useCallback((text: string) => {
    setState((prev) => ({
      ...prev,
      transcript: [...prev.transcript, `${new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} — ${text}`],
    }));
  }, []);

  const addAnalysis = useCallback((text: string) => {
    setState((prev) => ({
      ...prev,
      aiAnalysis: [...prev.aiAnalysis, text],
    }));

    // Parse checklist items from AI response
    const lines = text.split("\n");
    for (const line of lines) {
      const okMatch = line.match(/\[OK\]\s*(.+)/i);
      const issueMatch = line.match(/\[MANGEL\]\s*(.+)/i);
      if (okMatch || issueMatch) {
        const item: GmpChecklistItem = {
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString("de-DE"),
          status: okMatch ? "ok" : "issue",
          category: "GMP",
          description: (okMatch?.[1] || issueMatch?.[1] || "").trim(),
        };
        setState((prev) => ({
          ...prev,
          checklist: [...prev.checklist, item],
        }));
      }
    }
  }, []);

  const connectOpenAI = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      const { data, error } = await supabase.functions.invoke("realtime-audit-token", {
        body: { provider: "openai" },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      const { session, websocket_url } = data;
      const ephemeralKey = session.client_secret?.value;
      if (!ephemeralKey) throw new Error("No ephemeral key received from OpenAI");

      // Create WebRTC peer connection for OpenAI Realtime
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Get user media (audio + video)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      mediaStreamRef.current = stream;

      // Add audio track to peer connection
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        pc.addTrack(audioTrack, stream);
      }

      // Create data channel for events
      const dc = pc.createDataChannel("oai-events");
      dc.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          
          if (msg.type === "response.audio_transcript.done") {
            addTranscript(`KI: ${msg.transcript}`);
          }
          if (msg.type === "conversation.item.input_audio_transcription.completed") {
            addTranscript(`Auditor: ${msg.transcript}`);
          }
          if (msg.type === "response.text.done") {
            addAnalysis(msg.text);
          }
          if (msg.type === "response.done") {
            const output = msg.response?.output;
            if (output) {
              for (const item of output) {
                if (item.type === "message") {
                  for (const content of item.content || []) {
                    if (content.type === "text") {
                      addAnalysis(content.text);
                    }
                    if (content.transcript) {
                      addTranscript(`KI: ${content.transcript}`);
                    }
                  }
                }
              }
            }
          }
        } catch {
          // ignore parse errors
        }
      };

      // Create and set local SDP offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send SDP to OpenAI Realtime API
      const sdpRes = await fetch(`${websocket_url}?model=gpt-4o-realtime-preview-2025-06-03`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp,
      });

      if (!sdpRes.ok) {
        const errText = await sdpRes.text();
        throw new Error(`OpenAI SDP error: ${sdpRes.status} ${errText}`);
      }

      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

      // Set up periodic frame sending via data channel
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack && dc.readyState === "open") {
        startFrameCapture(stream, dc);
      } else {
        dc.onopen = () => {
          if (videoTrack) startFrameCapture(stream, dc);
        };
      }

      sessionStartedAtRef.current = new Date();
      setState((prev) => ({
        ...prev,
        provider: "openai",
        isConnected: true,
        isConnecting: false,
      }));
    } catch (err: any) {
      console.error("OpenAI connect error:", err);
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: err.message || "OpenAI-Verbindung fehlgeschlagen",
      }));
    }
  }, [addTranscript, addAnalysis]);

  const connectGemini = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Step 1: Create a server-side session via the relay
      const { data: createData, error: createError } = await supabase.functions.invoke("gemini-audio-relay", {
        body: { action: "create" },
      });

      if (createError) throw new Error(createError.message);
      if (createData?.error) throw new Error(createData.error);

      const { sessionToken, model } = createData;
      geminiSessionTokenRef.current = sessionToken;

      // Step 2: Start media capture and periodic relay
      sessionStartedAtRef.current = new Date();
      setState((prev) => ({
        ...prev,
        provider: "gemini",
        isConnected: true,
        isConnecting: false,
      }));

      // Start media capture with relay-based sending
      startGeminiRelayCapture(sessionToken);
    } catch (err: any) {
      console.error("Gemini connect error:", err);
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: err.message || "Gemini-Verbindung fehlgeschlagen",
      }));
    }
  }, [addTranscript, addAnalysis]);

  const startGeminiRelayCapture = useCallback(async (sessionToken: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      mediaStreamRef.current = stream;

      // Video: capture frames every 3 seconds and relay through edge function
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext("2d")!;
      const video = document.createElement("video");
      video.srcObject = stream;
      video.muted = true;
      await video.play();

      const frameInterval = setInterval(async () => {
        if (!geminiSessionTokenRef.current) {
          clearInterval(frameInterval);
          return;
        }
        ctx.drawImage(video, 0, 0, 640, 480);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        const base64Image = dataUrl.split(",")[1];

        try {
          const { data, error } = await supabase.functions.invoke("gemini-audio-relay", {
            body: {
              action: "send",
              sessionToken,
              mediaChunks: [{ mimeType: "image/jpeg", data: base64Image }],
              textMessage: "Analysiere dieses Bild im Kontext des laufenden GMP-Audits. Identifiziere Konformität oder Mängel.",
              setupConfig: { systemPrompt: SYSTEM_PROMPT_GEMINI },
            },
          });

          if (data?.text) {
            addAnalysis(data.text);
          }
        } catch (err) {
          console.error("Gemini relay send error:", err);
        }
      }, 3000);

      geminiIntervalRef.current = frameInterval;
    } catch (err) {
      console.error("Media capture error:", err);
    }
  }, [addAnalysis]);

  const startFrameCapture = useCallback((stream: MediaStream, dc: RTCDataChannel) => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d")!;
    const video = document.createElement("video");
    video.srcObject = stream;
    video.muted = true;
    video.play();

    setInterval(() => {
      if (dc.readyState !== "open") return;
      ctx.drawImage(video, 0, 0, 640, 480);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
      const base64 = dataUrl.split(",")[1];

      dc.send(JSON.stringify({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [{
            type: "input_image",
            image: base64,
          }],
        },
      }));

      dc.send(JSON.stringify({
        type: "response.create",
        response: {
          modalities: ["text"],
          instructions: "Analysiere dieses Bild im Kontext des laufenden GMP-Audits. Identifiziere Konformität oder Mängel.",
        },
      }));
    }, 3000);
  }, []);

  const connect = useCallback(async (provider: AuditProvider) => {
    if (provider === "openai") {
      await connectOpenAI();
    } else {
      await connectGemini();
    }
  }, [connectOpenAI, connectGemini]);

  const saveSession = useCallback(async (): Promise<string | null> => {
    // Capture current state before clearing
    const currentState = state;
    if (!currentState.provider || (currentState.transcript.length === 0 && currentState.checklist.length === 0)) {
      return null;
    }

    setState((prev) => ({ ...prev, isSaving: true }));

    try {
      const startedAt = sessionStartedAtRef.current || new Date();
      const endedAt = new Date();
      const durationSeconds = Math.round((endedAt.getTime() - startedAt.getTime()) / 1000);

      const okCount = currentState.checklist.filter((c) => c.status === "ok").length;
      const issueCount = currentState.checklist.filter((c) => c.status === "issue").length;

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("audit_session_results")
        .insert({
          user_id: userData.user.id,
          provider: currentState.provider,
          started_at: startedAt.toISOString(),
          ended_at: endedAt.toISOString(),
          duration_seconds: durationSeconds,
          transcript: currentState.transcript as any,
          ai_analysis: currentState.aiAnalysis as any,
          checklist: currentState.checklist as any,
          checklist_ok_count: okCount,
          checklist_issue_count: issueCount,
        })
        .select("id")
        .single();

      if (error) throw error;

      setState((prev) => ({ ...prev, isSaving: false, lastSavedId: data?.id || null }));
      return data?.id || null;
    } catch (err: any) {
      console.error("Failed to save audit session:", err);
      setState((prev) => ({ ...prev, isSaving: false, error: `Speichern fehlgeschlagen: ${err.message}` }));
      return null;
    }
  }, [state]);

  const disconnect = useCallback(async () => {
    // Save session before disconnecting
    await saveSession();

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Close WebRTC
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    // Stop media streams
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Close Gemini relay session
    if (geminiSessionTokenRef.current) {
      supabase.functions.invoke("gemini-audio-relay", {
        body: { action: "close", sessionToken: geminiSessionTokenRef.current },
      }).catch(() => {});
      geminiSessionTokenRef.current = null;
    }

    // Clear Gemini interval
    if (geminiIntervalRef.current) {
      clearInterval(geminiIntervalRef.current);
      geminiIntervalRef.current = null;
    }

    sessionStartedAtRef.current = null;

    setState({
      provider: null,
      isConnected: false,
      isConnecting: false,
      isSaving: false,
      transcript: [],
      aiAnalysis: [],
      checklist: [],
      error: null,
      lastSavedId: null,
    });
  }, [saveSession]);

  const sendTextMessage = useCallback(async (text: string) => {
    if (state.provider === "gemini" && geminiSessionTokenRef.current) {
      try {
        const { data } = await supabase.functions.invoke("gemini-audio-relay", {
          body: {
            action: "send",
            sessionToken: geminiSessionTokenRef.current,
            textMessage: text,
            setupConfig: { systemPrompt: SYSTEM_PROMPT_GEMINI },
          },
        });
        if (data?.text) {
          addAnalysis(data.text);
        }
      } catch (err) {
        console.error("Gemini text send error:", err);
      }
    }

    if (state.provider === "openai" && pcRef.current) {
      // OpenAI uses data channel - already handled via existing dc
    }
  }, [state.provider, addAnalysis]);

  return {
    ...state,
    connect,
    disconnect,
    saveSession,
    sendTextMessage,
  };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
