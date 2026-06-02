import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { sampleRequestSchema } from "@/lib/validation-schemas";
import { submitSampleRequest } from "@/lib/sample-request-api";

// In-app B2B sample request. Replaces the legacy mailto CTA: structured intake
// (Kategorie, Menge, Pfad), client-side zod validation, server-side submit.
// Compliance-first — B2B confirmation gate, no consumer/therapeutic framing.

const SELECT_CLASS =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

type FieldErrors = Record<string, string>;

export function SampleRequestDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [company, setCompany] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [productCategory, setProductCategory] = useState("flower");
  const [quantityKg, setQuantityKg] = useState("");
  const [targetPathway, setTargetPathway] = useState("wholesale");
  const [context, setContext] = useState("");
  const [b2bConfirmed, setB2bConfirmed] = useState(false);

  function reset() {
    setCompany("");
    setContactEmail("");
    setProductCategory("flower");
    setQuantityKg("");
    setTargetPathway("wholesale");
    setContext("");
    setB2bConfirmed(false);
    setErrors({});
  }

  async function handleSubmit() {
    const parsed = sampleRequestSchema.safeParse({
      company,
      contactEmail,
      productCategory,
      quantityKg: quantityKg === "" ? undefined : Number(quantityKg),
      targetPathway,
      context,
      b2bConfirmed,
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setBusy(true);
    try {
      await submitSampleRequest(parsed.data);
      toast.success(t("sampleRequest.success", "Sample-Request übermittelt"));
      reset();
      setOpen(false);
    } catch (err) {
      toast.error(
        t("sampleRequest.error", "Übermittlung fehlgeschlagen") +
          (err instanceof Error ? `: ${err.message}` : "")
      );
    } finally {
      setBusy(false);
    }
  }

  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-xs text-red-300">{errors[k]}</p> : null;

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        <button
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/20"
        >
          <Mail className="h-4 w-4" /> {t("sampleRequest.cta", "Sample anfragen")}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("sampleRequest.title", "B2B Sample-Request")}</DialogTitle>
          <DialogDescription>
            {t(
              "sampleRequest.subtitle",
              "Bedarf strukturieren — CannaWorld koordiniert qualifizierten Supplier, EU-Release und Logistik. Reiner B2B-/Compliance-Intake."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label htmlFor="sr-company">{t("sampleRequest.company", "Firma")}</Label>
            <Input id="sr-company" value={company} onChange={(e) => setCompany(e.target.value)} />
            {err("company")}
          </div>
          <div>
            <Label htmlFor="sr-email">{t("sampleRequest.email", "Kontakt-E-Mail")}</Label>
            <Input id="sr-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            {err("contactEmail")}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="sr-cat">{t("sampleRequest.category", "Kategorie")}</Label>
              <select id="sr-cat" className={SELECT_CLASS} value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                <option value="flower">{t("sampleRequest.cat.flower", "Blüte")}</option>
                <option value="extract">{t("sampleRequest.cat.extract", "Extrakt")}</option>
                <option value="other">{t("sampleRequest.cat.other", "Andere")}</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sr-qty">{t("sampleRequest.quantity", "Menge (kg)")}</Label>
              <Input id="sr-qty" type="number" min="0" step="0.1" value={quantityKg} onChange={(e) => setQuantityKg(e.target.value)} />
              {err("quantityKg")}
            </div>
          </div>
          <div>
            <Label htmlFor="sr-path">{t("sampleRequest.pathway", "Ziel-Pfad")}</Label>
            <select id="sr-path" className={SELECT_CLASS} value={targetPathway} onChange={(e) => setTargetPathway(e.target.value)}>
              <option value="wholesale">{t("sampleRequest.path.wholesale", "Großhandel (§52a AMG)")}</option>
              <option value="pharmacy_supply">{t("sampleRequest.path.pharmacy", "Apotheken-Belieferung")}</option>
              <option value="processing">{t("sampleRequest.path.processing", "Verarbeitung / EU-GMP-Hub")}</option>
            </select>
          </div>
          <div>
            <Label htmlFor="sr-ctx">{t("sampleRequest.contextLabel", "Kontext (optional)")}</Label>
            <Textarea id="sr-ctx" rows={3} value={context} onChange={(e) => setContext(e.target.value)} />
            {err("context")}
          </div>
          <label className="flex items-start gap-2 text-xs text-white/70">
            <Checkbox checked={b2bConfirmed} onCheckedChange={(c) => setB2bConfirmed(c === true)} />
            <span>
              {t(
                "sampleRequest.b2b",
                "Ich bestätige B2B-Bezug — keine Verbraucherabgabe, kein Therapieversprechen."
              )}
            </span>
          </label>
          {err("b2bConfirmed")}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => { setOpen(false); reset(); }} disabled={busy}>
            {t("common.cancel", "Abbrechen")}
          </Button>
          <Button onClick={handleSubmit} disabled={busy}>
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("sampleRequest.submit", "Anfrage senden")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
