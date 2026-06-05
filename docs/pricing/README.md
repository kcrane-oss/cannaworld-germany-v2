# CannaWorld Pricing — Thailand Export

Full service-catalogue pricing sheets (all ~30 services across 5 layers, with
à-la-carte prices for everything not included in a package).

- `cannaworld-services-th.pdf` — Thai (เอกสารราคาภาษาไทย)
- `cannaworld-services-en.pdf` — English

## Regenerate

The PDFs are produced by `scripts/generate-pricing-pdf.cjs` (pdfkit; Thai uses
the system Loma OpenType font). To rebuild:

```bash
npm i -D pdfkit          # dev-only, not part of the app bundle
node scripts/generate-pricing-pdf.cjs
```

> Prices are a worked draft for discussion — not validated against real cost data.
