import { useMutation } from "@tanstack/react-query";

// Stub: Gateway does not have a certificates table.
// This hook is provided for API compatibility with ported components.

export interface Certificate {
  id: string;
  session_id: string;
  user_id: string;
  certificate_number: string;
  participant_name: string;
  session_title: string;
  session_date: string;
  issued_at: string;
  created_at: string;
  expires_at: string | null;
  integrity_hash: string | null;
  identity_token: string | null;
}

export function useGenerateCertificates() {
  return useMutation({
    mutationFn: async (_input: {
      sessionId: string;
      sessionTitle: string;
      sessionDate: string;
      participants: { userId: string; name: string }[];
      expiresAt?: string | null;
    }): Promise<Certificate[]> => {
      // Certificates not supported in this deployment
      return [];
    },
  });
}
