import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Truck, ShieldCheck, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  describeStatus,
  statusToneClass,
  buildSignedText,
  invokeGxpEdgeFn,
  PHARMACY_RECEIVE_INBOX,
  type BatchStatus,
  type PharmacyReceiveRequest,
} from "cannaworld-sdk";

interface PendingBatch {
  id: string;
  batch_number: string | null;
  status: BatchStatus;
  product: string | null;
  quantity: number | null;
  current_custody_party: string | null;
}

const CHECK_FIELDS = [
  { key: "identity_check_pass",       i18nKey: "pharmacyReceive.checkIdentity",  label: "Identität geprüft" },
  { key: "quantity_check_pass",       i18nKey: "pharmacyReceive.checkQuantity",  label: "Menge stimmt mit Lieferschein" },
  { key: "packaging_integrity_pass",  i18nKey: "pharmacyReceive.checkPackaging", label: "Verpackung unversehrt" },
  { key: "temperature_log_pass",      i18nKey: "pharmacyReceive.checkTemperature", label: "Temperatur-Log akzeptabel" },
] as const;

type CheckKey = typeof CHECK_FIELDS[number]["key"];

interface FormState {
  pharmacy_license_no: string;
  pharmacist_chamber_id: string;
  securpharm_decommission_status: PharmacyReceiveRequest["securpharm_decommission_status"];
  securpharm_alert_no: string;
  identity_check_pass: boolean;
  quantity_check_pass: boolean;
  packaging_integrity_pass: boolean;
  temperature_log_pass: boolean;
  received_units: string;
  decision: "accept" | "reject" | "partial";
  rejection_reason: string;
  sca_method: "totp" | "webauthn" | "smart_card";
  sca_proof: string;
}

const EMPTY_FORM: FormState = {
  pharmacy_license_no: "",
  pharmacist_chamber_id: "",
  securpharm_decommission_status: "verified_active",
  securpharm_alert_no: "",
  identity_check_pass: true,
  quantity_check_pass: true,
  packaging_integrity_pass: true,
  temperature_log_pass: true,
  received_units: "",
  decision: "accept",
  rejection_reason: "",
  sca_method: "totp",
  sca_proof: "",
};

export default function PharmacyReceive() {
  const { t } = useTranslation();
  const [batches, setBatches] = useState<PendingBatch[]>([]);
  const [selected, setSelected] = useState<PendingBatch | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        // current_custody_party wurde via migration 20260519100000 hinzugefügt — kann noch nicht in App-Types sein
        .from("batches")
        .select("id, batch_number, status, product, quantity, current_custody_party" as "id, batch_number, status, product, quantity")
        // Cast: App-side supabase types lag behind status-enum migration 20260519100000
        .in("status", PHARMACY_RECEIVE_INBOX as unknown as never)
        .order("updated_at", { ascending: false })
        .limit(50);
      if (!active) return;
      if (error) setFeedback({ kind: "err", text: error.message });
      setBatches((data as unknown as PendingBatch[]) ?? []);
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  const setCheck = (key: CheckKey, v: boolean) => setForm((f) => ({ ...f, [key]: v }));

  async function handleSubmit() {
    if (!selected) return;
    if (form.decision !== "accept" && !form.rejection_reason) {
      setFeedback({ kind: "err", text: t("pharmacyReceive.reasonRequired", "Begründung erforderlich bei Reject/Partial") });
      return;
    }
    setBusy(true);
    setFeedback(null);

    try {
      const signed_text = buildSignedText({
        action: "pharmacy_receive",
        batch_id: selected.id,
        decision: form.decision,
        details: {
          pharmacy_license_no: form.pharmacy_license_no,
          securpharm: form.securpharm_decommission_status,
        },
        signed_at_iso: new Date().toISOString(),
      });

      const body: PharmacyReceiveRequest = {
        batch_id: selected.id,
        pharmacy_license_no: form.pharmacy_license_no,
        pharmacist_chamber_id: form.pharmacist_chamber_id,
        securpharm_decommission_status: form.securpharm_decommission_status,
        securpharm_alert_no: form.securpharm_alert_no || undefined,
        identity_check_pass: form.identity_check_pass,
        quantity_check_pass: form.quantity_check_pass,
        packaging_integrity_pass: form.packaging_integrity_pass,
        temperature_log_pass: form.temperature_log_pass,
        received_units: form.received_units ? Number(form.received_units) : undefined,
        accepted_units: form.decision === "accept" && form.received_units ? Number(form.received_units) : undefined,
        decision: form.decision,
        rejection_reason: form.rejection_reason || undefined,
        signature_payload: {
          signed_text,
          sca_method: form.sca_method,
          sca_proof: form.sca_proof,
        },
      };

      const res = await invokeGxpEdgeFn<PharmacyReceiveRequest, { ok: boolean; status_after?: string; error?: string }>(
        supabase, "pharmacy-receive", body,
      );
      if (!res.ok) {
        setFeedback({ kind: "err", text: res.error || "unknown_error" });
        setBusy(false);
        return;
      }
      setFeedback({ kind: "ok", text: t("pharmacyReceive.acceptRecorded", "Annahme erfasst. Neuer Status: {{status}}", { status: res.status_after ?? t("pharmacyReceive.statusUnknown", "unklar") }) });
      setBatches((bs) => bs.filter((b) => b.id !== selected.id));
      setSelected(null);
      setForm(EMPTY_FORM);
    } catch (e) {
      setFeedback({ kind: "err", text: String((e as Error).message ?? e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-white/[0.025] p-6 shadow-[0_0_42px_rgba(214,168,75,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-white" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <Truck className="h-4 w-4" /> {t("pharmacyReceive.heroBadge", "Apothekenannahme (GDP)")}
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">{t("pharmacyReceive.heroTitle", "Wareneingang Apotheke")}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            {t("pharmacyReceive.heroSubtitle", "Annahme von Cannabis-Chargen vom Großhandel nach GDP 2013/C 343/01 Ch. 5 + Securpharm-Decommission (EU FMD). Jede Annahme erfordert SCA-Signatur (TOTP/WebAuthn).")}
          </p>
        </div>
      </section>

      {feedback && (
        <div className={`rounded-2xl border p-4 text-sm ${feedback.kind === "ok" ? "border-emerald-300/30 bg-emerald-400/[0.05] text-emerald-100" : "border-rose-300/30 bg-rose-400/[0.05] text-rose-100"}`}>
          {feedback.kind === "ok" ? <CheckCircle2 className="mr-2 inline h-4 w-4" /> : <AlertCircle className="mr-2 inline h-4 w-4" />}
          {feedback.text}
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/70">{t("pharmacyReceive.incomingBatches", "Eingehende Chargen")}</h2>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-white/40" />}
          </div>
          {!loading && batches.length === 0 && (
            <p className="text-sm text-white/50">{t("pharmacyReceive.noOpenReceipts", "Keine offenen Annahmen.")}</p>
          )}
          <ul className="space-y-2">
            {batches.map((b) => {
              const d = describeStatus(b.status);
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(b)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${selected?.id === b.id ? "border-cyan-300/60 bg-cyan-300/[0.08]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white">{b.batch_number ?? b.id.slice(0, 8)}</div>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusToneClass(d.tone)}`}>
                        {d.label_de}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-white/55">{b.product ?? "—"}  ·  Custody: {b.current_custody_party ?? "—"}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-white/45">
              <ShieldCheck className="mb-3 h-10 w-10 opacity-50" />
              <p className="text-sm">{t("pharmacyReceive.selectBatchPrompt", "Wähle eine Charge zur Annahme links aus.")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white">{t("pharmacyReceive.receiveHeading", "Annahme:")} {selected.batch_number ?? selected.id.slice(0, 8)}</h2>
                <p className="text-xs text-white/55">{selected.product ?? "—"}</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyReceive.pharmacyLicenseLabel", "Apotheke-Lizenz")}</div>
                  <input className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.pharmacy_license_no} onChange={(e) => setForm((f) => ({ ...f, pharmacy_license_no: e.target.value }))} />
                </label>
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyReceive.chamberIdLabel", "Apothekerkammer-ID")}</div>
                  <input className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.pharmacist_chamber_id} onChange={(e) => setForm((f) => ({ ...f, pharmacist_chamber_id: e.target.value }))} />
                </label>
                <label className="text-xs md:col-span-2">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyReceive.securpharmLabel", "Securpharm-Decommission")}</div>
                  <select className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.securpharm_decommission_status} onChange={(e) => setForm((f) => ({ ...f, securpharm_decommission_status: e.target.value as FormState["securpharm_decommission_status"] }))}>
                    <option value="verified_active">verified_active (OK)</option>
                    <option value="verified_inactive">verified_inactive</option>
                    <option value="alert">alert (FMD)</option>
                    <option value="unknown">unknown</option>
                    <option value="skipped_btm">skipped_btm (Bulk-BtM)</option>
                  </select>
                </label>
                {form.securpharm_decommission_status === "alert" && (
                  <label className="text-xs md:col-span-2">
                    <div className="mb-1 font-bold uppercase tracking-wider text-rose-200">{t("pharmacyReceive.fmdAlertLabel", "FMD Alert-Nr")}</div>
                    <input className="w-full rounded-xl border border-rose-300/40 bg-rose-400/[0.05] px-3 py-2 text-sm" value={form.securpharm_alert_no} onChange={(e) => setForm((f) => ({ ...f, securpharm_alert_no: e.target.value }))} />
                  </label>
                )}
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyReceive.receivedUnitsLabel", "Empfangene Einheiten")}</div>
                  <input type="number" className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.received_units} onChange={(e) => setForm((f) => ({ ...f, received_units: e.target.value }))} />
                </label>
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyReceive.decisionLabel", "Entscheidung")}</div>
                  <select className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.decision} onChange={(e) => setForm((f) => ({ ...f, decision: e.target.value as FormState["decision"] }))}>
                    <option value="accept">{t("pharmacyReceive.decisionAccept", "Annehmen")}</option>
                    <option value="partial">{t("pharmacyReceive.decisionPartial", "Teilannahme")}</option>
                    <option value="reject">{t("pharmacyReceive.decisionReject", "Ablehnen")}</option>
                  </select>
                </label>
                {form.decision !== "accept" && (
                  <label className="text-xs md:col-span-2">
                    <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyReceive.reasonLabel", "Begründung (Pflicht)")}</div>
                    <textarea className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" rows={2} value={form.rejection_reason} onChange={(e) => setForm((f) => ({ ...f, rejection_reason: e.target.value }))} />
                  </label>
                )}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">{t("pharmacyReceive.gdpChecksHeading", "GDP-Annahme-Checks (Ch. 5.5)")}</div>
                <div className="space-y-2">
                  {CHECK_FIELDS.map((cf) => (
                    <label key={cf.key} className="flex items-center gap-2 text-sm text-white/80">
                      <input type="checkbox" checked={form[cf.key]} onChange={(e) => setCheck(cf.key, e.target.checked)} />
                      {t(cf.i18nKey, cf.label)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-amber-300/20 bg-amber-400/[0.04] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-200">{t("pharmacyReceive.scaHeading", "SCA-Signatur (Annex 11)")}</div>
                <div className="grid gap-2 md:grid-cols-2">
                  <select className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.sca_method} onChange={(e) => setForm((f) => ({ ...f, sca_method: e.target.value as FormState["sca_method"] }))}>
                    <option value="totp">{t("pharmacyReceive.scaTotp", "TOTP (6-stellig)")}</option>
                    <option value="webauthn">WebAuthn</option>
                    <option value="smart_card">Smart Card</option>
                  </select>
                  <input placeholder={t("pharmacyReceive.scaProofPlaceholder", "SCA-Proof (z.B. TOTP-Code)")} className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.sca_proof} onChange={(e) => setForm((f) => ({ ...f, sca_proof: e.target.value }))} />
                </div>
              </div>

              <button
                type="button"
                disabled={busy || !form.pharmacy_license_no || !form.pharmacist_chamber_id || !form.sca_proof}
                onClick={handleSubmit}
                className="w-full rounded-2xl border border-cyan-300/40 bg-cyan-300/15 px-4 py-3 text-sm font-bold uppercase tracking-wider text-cyan-100 transition hover:bg-cyan-300/25 disabled:opacity-40"
              >
                {busy ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : t("pharmacyReceive.submitButton", "Annahme bestätigen + signieren")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
