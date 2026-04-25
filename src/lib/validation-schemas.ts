import { z } from "zod";

export const recallFormSchema = z.object({
  title: z.string().trim().min(1, "Titel ist erforderlich").max(200, "Titel max. 200 Zeichen"),
  reason: z.string().trim().min(1, "Begründung ist erforderlich").max(2000, "Begründung max. 2000 Zeichen"),
  severity: z.enum(["class_1", "class_2", "class_3"]),
  description: z.string().max(5000, "Beschreibung max. 5000 Zeichen").optional().default(""),
  affected_markets: z.array(z.string().length(2)).default([]),
  selected_batches: z.array(z.string().uuid()).default([]),
});

export type RecallFormData = z.infer<typeof recallFormSchema>;

export const tradeCaseFormSchema = z.object({
  exporter_name: z.string().trim().min(1, "Exporteur ist erforderlich").max(200),
  importer_name: z.string().trim().min(1, "Importeur ist erforderlich").max(200),
  product_type: z.string().min(1, "Produkttyp ist erforderlich"),
  exporter_country: z.string().length(2),
  importer_country: z.string().length(2),
  estimated_quantity: z.number().min(0).optional(),
  unit: z.string().default("kg"),
  notes: z.string().max(5000).optional().default(""),
});

export type TradeCaseFormData = z.infer<typeof tradeCaseFormSchema>;

export const shipmentFormSchema = z.object({
  origin_country: z.string().min(2, "Herkunftsland ist erforderlich"),
  destination_country: z.string().min(2, "Zielland ist erforderlich"),
  carrier: z.string().max(200).optional(),
  tracking_number: z.string().max(100).optional(),
  estimated_departure: z.string().optional(),
  estimated_arrival: z.string().optional(),
  notes: z.string().max(5000).optional(),
});

export type ShipmentFormData = z.infer<typeof shipmentFormSchema>;

export const onboardingStep1Schema = z.object({
  companyName: z.string().trim().min(1, "Firmenname ist erforderlich").max(200, "Max. 200 Zeichen"),
  registrationNumber: z.string().max(100, "Max. 100 Zeichen").optional().default(""),
  country: z.string().min(1, "Land ist erforderlich"),
  licenseNumber: z.string().max(100, "Max. 100 Zeichen").optional().default(""),
  qualifiedPerson: z.string().max(200, "Max. 200 Zeichen").optional().default(""),
});

export type OnboardingStep1Data = z.infer<typeof onboardingStep1Schema>;
