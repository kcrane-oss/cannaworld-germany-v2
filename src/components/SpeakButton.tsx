import { Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { speak, isSpeechAvailable } from "@/lib/speech";

// "Vorlesen" — reads the given text aloud. Renders nothing where speech
// synthesis is unavailable, so callers can drop it in unconditionally.
export function SpeakButton({ text, className }: { text: string; className?: string }) {
  const { t } = useTranslation();
  if (!isSpeechAvailable()) return null;

  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={t("guidance.readAloud", "Vorlesen")}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-200 transition hover:bg-cyan-300/20",
        className
      )}
    >
      <Volume2 className="h-3 w-3" /> {t("guidance.readAloud", "Vorlesen")}
    </button>
  );
}
