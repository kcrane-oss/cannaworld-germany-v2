// Status workflow for B2B sample requests (admin view). Pure + testable.

export const SAMPLE_REQUEST_STATUSES = [
  "received",
  "in_review",
  "fulfilled",
  "declined",
] as const;

export type SampleRequestStatus = (typeof SAMPLE_REQUEST_STATUSES)[number];

/** Allowed forward transitions; fulfilled/declined are terminal. */
export const SAMPLE_REQUEST_TRANSITIONS: Record<SampleRequestStatus, SampleRequestStatus[]> = {
  received: ["in_review", "declined"],
  in_review: ["fulfilled", "declined"],
  fulfilled: [],
  declined: [],
};

export const SAMPLE_REQUEST_STATUS_LABELS: Record<SampleRequestStatus, { key: string; de: string }> = {
  received: { key: "sampleAdmin.status.received", de: "Eingegangen" },
  in_review: { key: "sampleAdmin.status.in_review", de: "In Prüfung" },
  fulfilled: { key: "sampleAdmin.status.fulfilled", de: "Erfüllt" },
  declined: { key: "sampleAdmin.status.declined", de: "Abgelehnt" },
};

export function isSampleRequestStatus(value: string): value is SampleRequestStatus {
  return (SAMPLE_REQUEST_STATUSES as readonly string[]).includes(value);
}

export function canTransition(from: SampleRequestStatus, to: SampleRequestStatus): boolean {
  return SAMPLE_REQUEST_TRANSITIONS[from]?.includes(to) ?? false;
}

export function nextStatuses(from: string): SampleRequestStatus[] {
  return isSampleRequestStatus(from) ? SAMPLE_REQUEST_TRANSITIONS[from] : [];
}
