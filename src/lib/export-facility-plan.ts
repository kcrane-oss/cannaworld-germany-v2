import jsPDF from "jspdf";
import type { ComplianceFinding } from "./facility-compliance-rules";

interface PlanInfo {
  title: string;
  plan_number: string;
  version_major: number;
  version_minor: number;
  status: string;
  regulatory_framework: string;
  created_at: string;
  total_area_sqm: number | null;
}

interface ZoneInfo {
  name: string;
  classification: string;
  area_sqm: number | null;
  pressure_differential: string | null;
  temperature_range: string | null;
  air_changes_per_hour: number | null;
}

interface ApprovalInfo {
  action: string;
  performer_name: string;
  performer_role: string | null;
  comment: string | null;
  signature_url: string | null;
  created_at: string;
}

interface ExportOptions {
  plan: PlanInfo;
  zones: ZoneInfo[];
  findings: ComplianceFinding[];
  approvals: ApprovalInfo[];
  svgElement?: SVGSVGElement | null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

async function imageUrlToDataUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = url;
  });
}

async function svgToDataUrl(svg: SVGSVGElement): Promise<string> {
  return new Promise((resolve, reject) => {
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);
    // Replace CSS custom properties with fallbacks for rendering
    svgString = svgString.replace(/hsl\(var\(--[^)]+\)\)/g, "#333");
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.viewBox.baseVal.width || 1200;
      canvas.height = svg.viewBox.baseVal.height || 800;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function exportFacilityPlanPdf(options: ExportOptions): Promise<void> {
  const { plan, zones, findings, approvals, svgElement } = options;
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  const margin = 15;

  // ── Page 1: Cover ──
  pdf.setFontSize(28);
  pdf.setFont("helvetica", "bold");
  pdf.text("GMP Facility Plan", pw / 2, 50, { align: "center" });

  pdf.setFontSize(18);
  pdf.text(plan.title, pw / 2, 70, { align: "center" });

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  const coverLines = [
    `Plan-Nr.: ${plan.plan_number}`,
    `Version: ${plan.version_major}.${plan.version_minor}`,
    `Status: ${plan.status}`,
    `Framework: ${plan.regulatory_framework}`,
    `Erstellt: ${formatDate(plan.created_at)}`,
    plan.total_area_sqm ? `Gesamtfläche: ${plan.total_area_sqm} m²` : "",
  ].filter(Boolean);
  let cy = 90;
  for (const line of coverLines) {
    pdf.text(line, pw / 2, cy, { align: "center" });
    cy += 7;
  }

  // ── Page 2: Canvas image ──
  if (svgElement) {
    try {
      const dataUrl = await svgToDataUrl(svgElement);
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Raumplan / Blueprint", margin, 15);
      const imgW = pw - 2 * margin;
      const imgH = imgW * (800 / 1200);
      pdf.addImage(dataUrl, "PNG", margin, 22, imgW, Math.min(imgH, ph - 35));
    } catch {
      throw new Error("Blueprint-Rendering fehlgeschlagen. PDF wurde nicht erzeugt, um keinen unvollständigen Export auszugeben.");
    }
  }

  // ── Page 3: Zone table ──
  pdf.addPage();
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Zonenliste", margin, 15);

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "bold");
  const colX = [margin, margin + 50, margin + 110, margin + 140, margin + 175, margin + 210];
  const headers = ["Name", "Klassifikation", "Fläche (m²)", "Druck", "Temperatur", "Luftwechsel/h"];
  let ty = 25;
  headers.forEach((h, i) => pdf.text(h, colX[i], ty));
  ty += 2;
  pdf.setDrawColor(180);
  pdf.line(margin, ty, pw - margin, ty);
  ty += 5;

  pdf.setFont("helvetica", "normal");
  for (const z of zones) {
    if (ty > ph - 15) { pdf.addPage(); ty = 20; }
    pdf.text(z.name.substring(0, 25), colX[0], ty);
    pdf.text(z.classification, colX[1], ty);
    pdf.text(z.area_sqm?.toString() ?? "–", colX[2], ty);
    pdf.text(z.pressure_differential ?? "–", colX[3], ty);
    pdf.text(z.temperature_range ?? "–", colX[4], ty);
    pdf.text(z.air_changes_per_hour?.toString() ?? "–", colX[5], ty);
    ty += 6;
  }

  // ── Page 4: Compliance ──
  if (findings.length > 0) {
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Compliance-Ergebnisse", margin, 15);

    ty = 25;
    pdf.setFontSize(9);
    for (const f of findings) {
      if (ty > ph - 15) { pdf.addPage(); ty = 20; }
      const icon = f.severity === "error" ? "✗" : f.severity === "warning" ? "⚠" : "ℹ";
      pdf.setFont("helvetica", "bold");
      pdf.text(`${icon} [${f.rule}]`, margin, ty);
      pdf.setFont("helvetica", "normal");
      pdf.text(f.message, margin + 40, ty, { maxWidth: pw - margin - 50 });
      ty += 8;
    }
  }

  // ── Page 5: Approval History ──
  if (approvals.length > 0) {
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Approval-Historie", margin, 15);

    ty = 25;
    pdf.setFontSize(9);
    for (const a of approvals) {
      if (ty > ph - 35) { pdf.addPage(); ty = 20; }
      pdf.setFont("helvetica", "bold");
      pdf.text(`${formatDate(a.created_at)} – ${a.action.replace(/_/g, " ")}`, margin, ty);
      pdf.setFont("helvetica", "normal");
      pdf.text(`${a.performer_name} (${a.performer_role ?? "–"})`, margin + 80, ty);
      ty += 5;
      if (a.comment) {
        pdf.text(a.comment, margin + 5, ty, { maxWidth: pw - margin - 20 });
        ty += 6;
      }
      if (a.signature_url) {
        try {
          const signatureDataUrl = await imageUrlToDataUrl(a.signature_url);
          pdf.setFontSize(8);
          pdf.text("Digitale Signatur", margin + 5, ty + 3);
          pdf.addImage(signatureDataUrl, "PNG", margin + 32, ty - 2, 28, 12);
          ty += 14;
        } catch {
          pdf.setFontSize(8);
          pdf.text("Signatur vorhanden, konnte im Export nicht geladen werden.", margin + 5, ty + 3);
          ty += 8;
        }
      }
      ty += 3;
    }
  }

  pdf.save(`${plan.plan_number}_v${plan.version_major}.${plan.version_minor}_engineering-pack.pdf`);
}
