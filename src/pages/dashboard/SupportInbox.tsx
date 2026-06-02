import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Inbox, Loader2, AlertTriangle, Send, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useSupportConversations, type SupportConversationRow } from "@/hooks/useSupportConversations";
import { useSupportMessages, type SupportMessageRow } from "@/hooks/useSupportMessages";
import { replyToConversation, updateConversation } from "@/lib/support-api";
import {
  SUPPORT_STATUSES,
  SUPPORT_STATUS_LABELS,
  SUPPORT_TIERS,
  SUPPORT_TIER_LABELS,
  isActionable,
  type SupportStatus,
  type SupportTier,
} from "@/lib/support-workflow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const SELECT_CLASS =
  "h-8 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring";

type Filter = "all" | "open" | "mine";

export default function SupportInbox() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: conversations = [], isLoading, isError, error, refetch } = useSupportConversations();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<Filter>("open");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  const messages = useSupportMessages(selectedId);

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      if (filter === "open") return isActionable(c.status ?? "");
      if (filter === "mine") return c.assigned_to && c.assigned_to === user?.id;
      return true;
    });
  }, [conversations, filter, user?.id]);

  const selected = conversations.find((c) => c.id === selectedId);

  async function doReply() {
    if (!selectedId || !reply.trim()) return;
    setBusy(true);
    try {
      await replyToConversation(selectedId, reply.trim());
      toast.success(t("support.replied", "Antwort gesendet"));
      setReply("");
      await Promise.all([messages.refetch(), refetch()]);
    } catch (err) {
      toast.error(t("support.replyError", "Senden fehlgeschlagen") + errSuffix(err));
    } finally {
      setBusy(false);
    }
  }

  async function patch(p: { status?: SupportStatus; tier?: SupportTier; assigned_to?: string | null }) {
    if (!selectedId) return;
    setBusy(true);
    try {
      await updateConversation(selectedId, p);
      toast.success(t("support.updated", "Aktualisiert"));
      await refetch();
    } catch (err) {
      toast.error(t("support.updateError", "Aktualisierung fehlgeschlagen") + errSuffix(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-cyan-300" />
          <h1 className="text-2xl font-black tracking-tight">{t("support.title", "Support-Inbox")}</h1>
        </div>
        <div className="flex gap-1 rounded-lg border border-white/10 bg-black/20 p-1 text-xs">
          {(["open", "mine", "all"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md px-3 py-1 font-semibold transition",
                filter === f ? "bg-cyan-300/20 text-cyan-200" : "text-white/55 hover:text-white"
              )}
            >
              {t(`support.filter.${f}`, f === "open" ? "Offen" : f === "mine" ? "Meine" : "Alle")}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-300/30 bg-red-400/5 p-4 text-sm text-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <div className="font-bold">{t("support.loadError", "Konversationen konnten nicht geladen werden")}</div>
              <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : ""}</div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,360px)_1fr]">
          {/* List */}
          <div className="space-y-2">
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center text-sm text-white/55">
                {t("support.empty", "Keine Konversationen")}
              </div>
            )}
            {filtered.map((c: SupportConversationRow) => {
              const status = (c.status ?? "open") as SupportStatus;
              const label = SUPPORT_STATUS_LABELS[status] ?? { key: "", de: status };
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={cn(
                    "w-full rounded-xl border p-3 text-left transition",
                    selectedId === c.id ? "border-cyan-300/50 bg-cyan-300/5" : "border-white/10 bg-black/20 hover:border-white/25"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold text-white">{c.subject ?? "—"}</span>
                    <span className="shrink-0 text-[10px] uppercase text-white/45">{c.channel}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-white/50">
                    <span className="rounded-full border border-white/15 bg-white/5 px-1.5 py-0.5">{t(label.key, label.de)}</span>
                    <span>{t(SUPPORT_TIER_LABELS[(c.tier ?? 0) as SupportTier].key, SUPPORT_TIER_LABELS[(c.tier ?? 0) as SupportTier].de)}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            {!selected && (
              <div className="flex h-full min-h-40 items-center justify-center text-sm text-white/45">
                {t("support.selectHint", "Konversation auswählen")}
              </div>
            )}
            {selected && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
                  <span className="text-sm font-bold text-white">{selected.subject ?? "—"}</span>
                  <select
                    className={SELECT_CLASS}
                    value={(selected.status ?? "open") as SupportStatus}
                    disabled={busy}
                    onChange={(e) => patch({ status: e.target.value as SupportStatus })}
                    aria-label={t("support.statusLabel", "Status")}
                  >
                    {SUPPORT_STATUSES.map((s) => (
                      <option key={s} value={s}>{t(SUPPORT_STATUS_LABELS[s].key, SUPPORT_STATUS_LABELS[s].de)}</option>
                    ))}
                  </select>
                  <select
                    className={SELECT_CLASS}
                    value={(selected.tier ?? 0) as SupportTier}
                    disabled={busy}
                    onChange={(e) => patch({ tier: Number(e.target.value) as SupportTier })}
                    aria-label={t("support.tierLabel", "Stufe")}
                  >
                    {SUPPORT_TIERS.map((tier) => (
                      <option key={tier} value={tier}>{t(SUPPORT_TIER_LABELS[tier].key, SUPPORT_TIER_LABELS[tier].de)}</option>
                    ))}
                  </select>
                  <Button size="sm" variant="outline" disabled={busy} onClick={() => patch({ assigned_to: user?.id ?? null, status: "assigned" })}>
                    <UserCheck className="mr-1 h-3 w-3" /> {t("support.assignMe", "Mir zuweisen")}
                  </Button>
                </div>

                {/* Thread */}
                <div className="max-h-80 space-y-2 overflow-y-auto">
                  {messages.isLoading && <Loader2 className="h-5 w-5 animate-spin text-cyan-300" />}
                  {(messages.data ?? []).map((m: SupportMessageRow) => (
                    <div
                      key={m.id}
                      className={cn(
                        "rounded-xl border p-2.5 text-sm",
                        m.direction === "inbound"
                          ? "border-white/10 bg-white/[0.04]"
                          : m.direction === "internal"
                            ? "border-amber-300/20 bg-amber-400/5"
                            : "border-cyan-300/20 bg-cyan-300/5"
                      )}
                    >
                      <div className="mb-0.5 text-[10px] uppercase tracking-wider text-white/40">
                        {m.author_kind} · {m.direction}
                      </div>
                      <div className="text-white/85">{m.body}</div>
                    </div>
                  ))}
                  {!messages.isLoading && (messages.data ?? []).length === 0 && (
                    <div className="text-xs text-white/45">{t("support.noMessages", "Noch keine Nachrichten")}</div>
                  )}
                </div>

                {/* Reply */}
                <div className="border-t border-white/10 pt-3">
                  <Textarea
                    rows={3}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder={t("support.replyPlaceholder", "Antwort an den Partner…")}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" disabled={busy || !reply.trim()} onClick={doReply}>
                      {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      {t("support.send", "Senden")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function errSuffix(err: unknown): string {
  return err instanceof Error ? `: ${err.message}` : "";
}
