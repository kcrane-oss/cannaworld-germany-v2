export interface ApiResult<T> {
  data: T | null;
  error: string | null;
}

export type JsonRecord = Record<string, unknown>;

export const toErrorMessage = (error: unknown, fallback = "Unknown error"): string => {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
};

export const getPayloadError = (payload: unknown): string | null => {
  if (typeof payload !== "object" || payload === null || !("error" in payload)) return null;
  const error = (payload as { error?: unknown }).error;
  return error ? toErrorMessage(error, "Request failed") : null;
};

export const readResponseError = async (response: Response, fallback = "Request failed"): Promise<string> => {
  const text = await response.text();
  const detail = text.trim();
  return detail ? `${fallback} (${response.status}): ${detail}` : `${fallback} (${response.status})`;
};
