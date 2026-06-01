import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pill, ShieldAlert, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  describeStatus,
  statusToneClass,
  buildSignedText,
  hashBtmPrescription,
  invokeGxpEdgeFn,
  PHARMACY_DISPENSE_INBOX,
  type BatchStatus,
  type PharmacyDispenseRequest,
} from "cannaworld-sdk";

const DEV_BTM_SALT_PLACEHOLDER = "DEV_SALT_REPLACE_IN_PROD";
const BTM_SALT = ((import.meta.env.VITE_BTM_SALT as string | undefined) ?? "").trim();
// Fail-safe: a real, non-placeholder salt must be configured. Otherwise BtM
// prescription hashes would be wrong/inconsistent — dispensing is blocked
// rather than silently hashing with a dev placeholder.
const BTM_SALT_CONFIGURED = BTM_SALT.length > 0 && BTM_SALT !== DEV_BTM_SALT_PLACEHOLDER;

interface DispensableBatch {
  id: string;
  batch_number: string | null;
  status: BatchStatus;
  product: string | null;
  quantity: number | null;
}

interface FormState {
  pharmacy_license_no: string;
  pharmacist_chamber_id: string;
  btm_rx_no: string;           // PLAINTEXT only client-side; hashed before send
  doctor_lanr: string;          // also hashed before send
  patient_kv_no: string;        // pseudonymisiert
  dispensed_units: string;
  dispensed_g: string;
  securpharm_decommission_id: string;
  contraindication_check: boolean;
  patient_counseling: boolean;
  sca_method: "totp" | "webauthn" | "smart_card";
  sca_proof: string;
}

const EMPTY: FormState = {
  pharmacy_license_no: "",
  pharmacist_chamber_id: "",
  btm_rx_no: "",
  doctor_lanr: "",
  patient_kv_no: "",
  dispensed_units: "",
  dispensed_g: "",
  securpharm_decommission_id: "",
  contraindication_check: true,
  patient_counseling: true,
  sca_method: "totp",
  sca_proof: "",
};

export default function PharmacyDispense() {
  const { t } = useTranslation();
  const [batches, setBatches] = useState<DispensableBatch[]>([]);
  const [selected, setSelected] = useState<DispensableBatch | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("batches")
        .select("id, batch_number, status, product, quantity")
        .in("status", PHARMACY_DISPENSE_INBOX as unknown as never)
        .order("updated_at", { ascending: false })
        .limit(50);
      if (!active) return;
      if (error) setFeedback({ kind: "err", text: error.message });
      setBatches((data as unknown as DispensableBatch[]) ?? []);
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  async function handleSubmit() {
    if (!selected) return;
    if (!form.btm_rx_no || form.btm_rx_no.length < 4) {
      setFeedback({ kind: "err", text: t("pharmacyDispense.errorBtmRxMissing", "BtM-Rezept-Nr fehlt") });
      return;
    }
    if (!form.contraindication_check || !form.patient_counseling) {
      setFeedback({ kind: "err", text: t("pharmacyDispense.errorDutiesMissing", "Beide Apotheker-Pflichten müssen dokumentiert sein") });
      return;
    }
    if (!form.dispensed_units || Number(form.dispensed_units) <= 0) {
      setFeedback({ kind: "err", text: t("pharmacyDispense.errorQtyZero", "Menge muss > 0 sein") });
      return;
    }
    if (!BTM_SALT_CONFIGURED) {
      setFeedback({
        kind: "err",
        text: t("pharmacyDispense.errorBtmSaltMissing", "BtM-Hashing nicht konfiguriert (VITE_BTM_SALT fehlt oder ist der Dev-Platzhalter). Abgabe blockiert, um inkonsistente BtM-Rezept-Hashes zu verhindern. Bitte Betreiber kontaktieren."),
      });
      return;
    }
    setBusy(true);
    setFeedback(null);

    try {
      // Datenschutzkonforme Hashes — Klartext verlässt Browser nicht
      const rxHash = await hashBtmPrescription(form.btm_rx_no, BTM_SALT);
      const doctorHash = form.doctor_lanr ? await hashBtmPrescription(form.doctor_lanr, BTM_SALT) : undefined;
      const patientPseudonym = form.patient_kv_no ? await hashBtmPrescription(form.patient_kv_no, BTM_SALT) : undefined;

      const signed_text = buildSignedText({
        action: "pharmacy_dispense",
        batch_id: selected.id,
        details: {
          pharmacy: form.pharmacy_license_no,
          rx_hash_prefix: rxHash.slice(0, 12),
          units: form.dispensed_units,
        },
        signed_at_iso: new Date().toISOString(),
      });

      const body: PharmacyDispenseRequest = {
        batch_id: selected.id,
        pharmacy_license_no: form.pharmacy_license_no,
        pharmacist_chamber_id: form.pharmacist_chamber_id,
        btm_prescription_no_hash: rxHash,
        prescribing_doctor_id_hash: doctorHash,
        patient_pseudonym: patientPseudonym,
        dispensed_quantity_units: Number(form.dispensed_units),
        dispensed_quantity_g: form.dispensed_g ? Number(form.dispensed_g) : undefined,
        securpharm_decommission_id: form.securpharm_decommission_id || undefined,
        contraindication_check_performed: form.contraindication_check,
        patient_counseling_documented: form.patient_counseling,
        signature_payload: {
          signed_text,
          sca_method: form.sca_method,
          sca_proof: form.sca_proof,
        },
      };

      const res = await invokeGxpEdgeFn<PharmacyDispenseRequest, { ok: boolean; remaining_stock_units?: number; error?: string }>(
        supabase, "pharmacy-dispense", body,
      );
      if (!res.ok) {
        setFeedback({ kind: "err", text: res.error || "unknown_error" });
        setBusy(false);
        return;
      }
      setFeedback({ kind: "ok", text: t("pharmacyDispense.successMsg", "Abgabe protokolliert. Reststand: {{units}} Einheiten.", { units: res.remaining_stock_units ?? "?" }) });
      setForm({ ...EMPTY, pharmacy_license_no: form.pharmacy_license_no, pharmacist_chamber_id: form.pharmacist_chamber_id });
    } catch (e) {
      setFeedback({ kind: "err", text: String((e as Error).message ?? e) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-300/12 via-white/[0.045] to-cyan-300/10 p-6 shadow-[0_0_42px_rgba(167,139,250,0.08)] md:p-8">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-violet-300/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-[2rem] bg-gradient-to-r from-violet-300 via-purple-400 to-cyan-300" />
        <div className="relative max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
            <Pill className="h-4 w-4" /> BtM-Abgabe an Patient
          </div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">Patienten-Abgabe</h1>
          <p className="mt-4 text-base leading-7 text-white/60">
            BtMG/BtMVV-konforme Ausgabe an Patient nach Rezept. BtM-Rezept-Nr wird sofort SHA-256 gehashed —
            Klartext verlässt den Browser nicht. Kontraindikations-Check und Beratungspflicht §20 ApBetrO sind Pflicht.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-300/30 bg-amber-400/[0.04] p-4 text-sm leading-6 text-amber-100">
        <ShieldAlert className="mr-2 inline h-4 w-4" />
        <strong>Datenschutz:</strong> BtM-Rezept-Nr, Arzt-LANR und KV-Nr werden ausschließlich clientseitig zu SHA-256-Hashes verarbeitet (Art. 9 DSGVO).
      </section>

      {feedback && (
        <div className={`rounded-3xl border p-4 text-sm ${feedback.kind === "ok" ? "border-emerald-300/30 bg-emerald-400/[0.05] text-emerald-100" : "border-rose-300/30 bg-rose-400/[0.05] text-rose-100"}`}>
          {feedback.kind === "ok" ? <CheckCircle2 className="mr-2 inline h-4 w-4" /> : <AlertCircle className="mr-2 inline h-4 w-4" />}
          {feedback.text}
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/70">{t("pharmacyDispense.availableBatches", "Verfügbare Chargen")}</h2>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-white/40" />}
          </div>
          {!loading && batches.length === 0 && <p className="text-sm text-white/50">{t("pharmacyDispense.noBatchesReady", "Keine abgabebereiten Chargen.")}</p>}
          <ul className="space-y-2">
            {batches.map((b) => {
              const d = describeStatus(b.status);
              return (
                <li key={b.id}>
                  <button type="button" onClick={() => setSelected(b)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${selected?.id === b.id ? "border-violet-300/60 bg-violet-400/[0.08]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white">{b.batch_number ?? b.id.slice(0, 8)}</div>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusToneClass(d.tone)}`}>{d.label_de}</span>
                    </div>
                    <div className="mt-1 text-xs text-white/55">{b.product ?? "—"}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          {!selected ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-white/45">
              <Pill className="mb-3 h-10 w-10 opacity-50" />
              <p className="text-sm">{t("pharmacyDispense.selectBatch", "Charge zur Abgabe wählen.")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">{t("pharmacyDispense.dispenseFor", "Abgabe")}: {selected.batch_number ?? selected.id.slice(0, 8)}</h2>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyDispense.fieldPharmacyLicense", "Apotheke-Lizenz")}</div>
                  <input className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.pharmacy_license_no} onChange={(e) => setForm((f) => ({ ...f, pharmacy_license_no: e.target.value }))} />
                </label>
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyDispense.fieldPharmacistId", "Apothekerkammer-ID")}</div>
                  <input className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.pharmacist_chamber_id} onChange={(e) => setForm((f) => ({ ...f, pharmacist_chamber_id: e.target.value }))} />
                </label>
                <label className="text-xs md:col-span-2">
                  <div className="mb-1 font-bold uppercase tracking-wider text-violet-200">{t("pharmacyDispense.fieldBtmRx", "BtM-Rezept-Nr (wird sofort gehashed)")}</div>
                  <input className="w-full rounded-xl border border-violet-300/30 bg-violet-400/[0.05] px-3 py-2 font-mono text-sm" value={form.btm_rx_no} onChange={(e) => setForm((f) => ({ ...f, btm_rx_no: e.target.value }))} />
                </label>
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyDispense.fieldDoctorLanr", "Arzt-LANR (optional)")}</div>
                  <input className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 font-mono text-sm" value={form.doctor_lanr} onChange={(e) => setForm((f) => ({ ...f, doctor_lanr: e.target.value }))} />
                </label>
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyDispense.fieldPatientKv", "KV-Nr (optional, pseudonymisiert)")}</div>
                  <input className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 font-mono text-sm" value={form.patient_kv_no} onChange={(e) => setForm((f) => ({ ...f, patient_kv_no: e.target.value }))} />
                </label>
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyDispense.fieldUnits", "Abgegebene Einheiten")}</div>
                  <input type="number" className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.dispensed_units} onChange={(e) => setForm((f) => ({ ...f, dispensed_units: e.target.value }))} />
                </label>
                <label className="text-xs">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyDispense.fieldWeight", "Abgegebenes Gewicht (g)")}</div>
                  <input type="number" step="0.01" className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.dispensed_g} onChange={(e) => setForm((f) => ({ ...f, dispensed_g: e.target.value }))} />
                </label>
                <label className="text-xs md:col-span-2">
                  <div className="mb-1 font-bold uppercase tracking-wider text-white/55">{t("pharmacyDispense.fieldSecurpharm", "Securpharm Decommission-ID")}</div>
                  <input className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 font-mono text-sm" value={form.securpharm_decommission_id} onChange={(e) => setForm((f) => ({ ...f, securpharm_decommission_id: e.target.value }))} />
                </label>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input type="checkbox" checked={form.contraindication_check} onChange={(e) => setForm((f) => ({ ...f, contraindication_check: e.target.checked }))} />
                  {t("pharmacyDispense.checkContraindication", "Kontraindikations-Check durchgeführt")}
                </label>
                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input type="checkbox" checked={form.patient_counseling} onChange={(e) => setForm((f) => ({ ...f, patient_counseling: e.target.checked }))} />
                  {t("pharmacyDispense.checkCounseling", "Patient beraten (§20 ApBetrO)")}
                </label>
              </div>

              <div className="rounded-2xl border border-amber-300/20 bg-amber-400/[0.04] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-200">{t("pharmacyDispense.scaTitle", "SCA-Signatur")}</div>
                <div className="grid gap-2 md:grid-cols-2">
                  <select className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.sca_method} onChange={(e) => setForm((f) => ({ ...f, sca_method: e.target.value as FormState["sca_method"] }))}>
                    <option value="totp">TOTP</option>
                    <option value="webauthn">WebAuthn</option>
                    <option value="smart_card">Smart Card</option>
                  </select>
                  <input placeholder={t("pharmacyDispense.scaProofPlaceholder", "SCA-Proof")} className="rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm" value={form.sca_proof} onChange={(e) => setForm((f) => ({ ...f, sca_proof: e.target.value }))} />
                </div>
              </div>

              <button type="button" disabled={busy} onClick={handleSubmit}
                className="w-full rounded-2xl border border-violet-300/40 bg-violet-400/15 px-4 py-3 text-sm font-bold uppercase tracking-wider text-violet-100 transition hover:bg-violet-400/25 disabled:opacity-40">
                {busy ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : t("pharmacyDispense.submitButton", "Abgabe signieren")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
