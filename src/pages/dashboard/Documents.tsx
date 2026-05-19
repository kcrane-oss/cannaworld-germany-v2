import { useState, useMemo } from "react";
import { useDocuments, type DocumentRow } from "@/hooks/useDocuments";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FolderOpen, FileText, Download, Loader2, AlertTriangle, Search, ExternalLink, Sparkles } from "lucide-react";

const TYPE_TINT: Record<string, string> = {
  coa: "bg-purple-400/10 text-purple-300 border-purple-300/30",
  batch_record: "bg-cyan-400/10 text-cyan-300 border-cyan-300/30",
  license: "bg-emerald-400/10 text-emerald-300 border-emerald-300/30",
  sop: "bg-blue-400/10 text-blue-300 border-blue-300/30",
  certificate: "bg-amber-400/10 text-amber-300 border-amber-300/30",
};

function formatBytes(bytes: number | null) {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function Documents() {
  const { data: docs = [], isLoading, isError, error } = useDocuments();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [parsingDocId, setParsingDocId] = useState<string | null>(null);

  // Pasted-text CoA parser. The simplest production-safe baseline: the user
  // copy-pastes the CoA text and we extract structured fields via the
  // germany-coa-parse Edge Function (deterministic regex). Binary PDF → text
  // OCR is the Phase 4b upgrade swap-in.
  const parseCoA = async (doc: DocumentRow) => {
    const text = window.prompt(
      `Text aus dem CoA "${doc.document_number}" einfügen (Copy-Paste aus PDF). Lässt sich auch leer absenden, um einen Test-Run zu machen.`,
      "",
    );
    if (text == null) return;
    setParsingDocId(doc.id);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke("germany-coa-parse", {
        body: {
          document_id: doc.id,
          source_file_url: doc.file_url,
          extracted_text: text || "THC 18.5% CBD 0.4% Lead 0.5 mg/kg E. coli 5 cfu/g",
        },
      });
      if (invokeError) throw invokeError;
      const d = data as { thc_percent?: number; cbd_percent?: number; confidence?: number };
      toast.success("CoA geparst", {
        description: `THC ${d.thc_percent ?? "—"}% · CBD ${d.cbd_percent ?? "—"}% · Konfidenz ${Math.round((d.confidence ?? 0) * 100)}%`,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "CoA-Parser fehlgeschlagen");
    } finally {
      setParsingDocId(null);
    }
  };

  const docTypes = useMemo(() => {
    const set = new Set<string>();
    for (const d of docs) if (d.document_type) set.add(d.document_type);
    return Array.from(set).sort();
  }, [docs]);

  const filtered = useMemo(() => {
    return docs.filter((d: DocumentRow) => {
      if (typeFilter !== "all" && d.document_type !== typeFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        d.document_number?.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.file_name?.toLowerCase().includes(q) ||
        d.category?.toLowerCase().includes(q)
      );
    });
  }, [docs, query, typeFilter]);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-emerald-300/10 p-6 shadow-[0_0_42px_rgba(34,211,238,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <FolderOpen className="h-4 w-4" /> Document Vault
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">Documents</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Zentrale Ablage für CoA, Batch Records, SOPs, Lizenznachweise und QP-Pakete.
            Upload + Klassifizierung erfolgen im Gateway / AICert — Germany zeigt die deutsche
            Vault-Sicht read-only.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Dokument suchen (Nummer, Datei, Kategorie, Beschreibung)…"
              className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-300/60 focus:outline-none"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white focus:border-cyan-300/60 focus:outline-none"
          >
            <option value="all">Alle Typen</option>
            {docTypes.map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-white/45">
          <span>{filtered.length} von {docs.length} Dokumenten</span>
          <a
            href="https://gmp-aicert.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
          >
            In AICert hochladen <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </section>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-300/30 bg-red-400/5 p-5 text-sm text-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <div className="font-bold">Dokumente konnten nicht geladen werden</div>
              <div className="mt-1 text-red-200/80">{error instanceof Error ? error.message : "Unbekannter Fehler"}</div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <FolderOpen className="mx-auto mb-4 h-10 w-10 text-white/30" />
          <div className="text-lg font-bold text-white">Keine Dokumente gefunden</div>
          <div className="mt-2 text-sm text-white/55">
            CoA, Batch Records und QP-Pakete werden im Gateway / AICert hochgeladen.
          </div>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <section className="grid gap-3 md:grid-cols-2">
          {filtered.map((doc: DocumentRow) => {
            const tint = TYPE_TINT[doc.document_type?.toLowerCase()] ?? "bg-white/5 text-white/60 border-white/15";
            return (
              <div key={doc.id} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-cyan-300/30">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 ring-1 ring-cyan-300/25">
                    <FileText className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tint}`}>
                        {doc.document_type}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/45">{doc.category}</span>
                    </div>
                    <div className="mt-2 truncate text-sm font-bold text-white">{doc.document_number}</div>
                    {doc.description && (
                      <div className="mt-1 line-clamp-2 text-xs text-white/55">{doc.description}</div>
                    )}
                    <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
                      <span>{doc.file_name ?? "—"} · {formatBytes(doc.file_size_bytes)}</span>
                      <div className="flex items-center gap-3">
                        {doc.document_type?.toLowerCase() === "coa" && (
                          <button
                            type="button"
                            onClick={() => parseCoA(doc)}
                            disabled={parsingDocId === doc.id}
                            className="inline-flex items-center gap-1 text-purple-300 hover:text-purple-200 disabled:opacity-50"
                          >
                            {parsingDocId === doc.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Sparkles className="h-3 w-3" />
                            )}
                            CoA parsen
                          </button>
                        )}
                        {doc.file_url ? (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
                          >
                            <Download className="h-3 w-3" /> Download
                          </a>
                        ) : (
                          <span className="text-white/30">Kein File</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
