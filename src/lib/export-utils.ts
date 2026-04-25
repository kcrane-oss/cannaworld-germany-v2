/**
 * CSV & PDF export utilities for batches, invoices, and reports.
 */

/** Convert array of objects to CSV string */
export function toCSV(data: Record<string, unknown>[], columns?: { key: string; label: string }[]): string {
  if (data.length === 0) return "";

  const cols = columns || Object.keys(data[0]).map((k) => ({ key: k, label: k }));
  const header = cols.map((c) => `"${c.label}"`).join(",");
  const rows = data.map((row) =>
    cols.map((c) => {
      const val = row[c.key];
      if (val === null || val === undefined) return '""';
      const str = typeof val === "object" ? JSON.stringify(val) : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(",")
  );
  return [header, ...rows].join("\n");
}

/** Download a CSV string as a file */
export function downloadCSV(csv: string, filename: string) {
  if (!csv) return;

  const BOM = "\uFEFF"; // UTF-8 BOM for Excel compatibility
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Legacy support for exportToCSV */
export const exportToCSV = (data: any[], filename: string, columns?: any[]) => {
  if (!data.length) return;
  const csv = toCSV(data, columns);
  downloadCSV(csv, filename);
};

/** Open browser print dialog for PDF export of current page section */
export function printSection(elementId: string, title?: string) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html><head>
      <title>${title || "CannaWorld Export"}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; color: #1a1a2e; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; font-size: 13px; }
        th { background: #f5f5f5; font-weight: 600; }
        h1 { font-size: 18px; margin-bottom: 4px; }
        .meta { color: #666; font-size: 12px; margin-bottom: 16px; }
        @media print { body { padding: 0; } }
      </style>
    </head><body>
      <h1>${title || "CannaWorld Report"}</h1>
      <p class="meta">Exportiert am ${new Date().toLocaleDateString("de-DE")} · CannaWorld Marketplace & Gateway</p>
      ${el.innerHTML}
    </body></html>
  `);
  printWindow.document.close();
  printWindow.print();
}

/** Legacy support for exportToPDF */
export const exportToPDF = (elementId: string, title?: string) => {
  printSection(elementId, title);
};

/** Legacy support for exportComplianceReport */
export const exportComplianceReport = (data: any) => {
  // Simple implementation for build compatibility
  console.log("Compliance report export triggered", data);
  exportToCSV([data], "compliance-report.csv");
};

/** Batch columns for CSV export */
export const BATCH_CSV_COLUMNS = [
  { key: "batch_number", label: "Batch Nr." },
  { key: "product", label: "Produkt" },
  { key: "strain", label: "Sorte" },
  { key: "category", label: "Kategorie" },
  { key: "certification", label: "Zertifizierung" },
  { key: "quantity", label: "Menge" },
  { key: "unit", label: "Einheit" },
  { key: "price", label: "Preis (€)" },
  { key: "origin", label: "Herkunft" },
  { key: "status", label: "Status" },
  { key: "compliance_score", label: "Compliance" },
  { key: "thc", label: "THC %" },
  { key: "cbd", label: "CBD %" },
  { key: "trade_type", label: "Handelsart" },
  { key: "created_at", label: "Erstellt" },
];

/** Invoice columns for CSV export */
export const INVOICE_CSV_COLUMNS = [
  { key: "invoice_number", label: "Rechnungsnr." },
  { key: "invoice_type", label: "Typ" },
  { key: "status", label: "Status" },
  { key: "subtotal", label: "Netto (€)" },
  { key: "tax_amount", label: "MwSt (€)" },
  { key: "total", label: "Gesamt (€)" },
  { key: "currency", label: "Währung" },
  { key: "created_at", label: "Erstellt" },
  { key: "due_date", label: "Fällig" },
];

/** User/Profile columns for CSV export */
export const USER_CSV_COLUMNS = [
  { key: "email", label: "E-Mail" },
  { key: "contact_name", label: "Kontaktperson" },
  { key: "company_name", label: "Unternehmen" },
  { key: "country", label: "Land" },
  { key: "license_number", label: "Lizenznr." },
  { key: "verified", label: "Verifiziert" },
  { key: "created_at", label: "Registriert" },
];
