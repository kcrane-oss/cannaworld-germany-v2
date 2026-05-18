import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DocumentRow {
  id: string;
  document_number: string;
  document_type: string;
  category: string;
  description: string | null;
  file_name: string | null;
  file_url: string | null;
  file_size_bytes: number | null;
  file_type: string | null;
  effective_from: string | null;
  effective_until: string | null;
  approved_at: string | null;
  created_at: string;
}

export function useDocuments() {
  return useQuery({
    queryKey: ["germany-documents"],
    queryFn: async (): Promise<DocumentRow[]> => {
      const { data, error } = await supabase
        .from("documents")
        .select("id, document_number, document_type, category, description, file_name, file_url, file_size_bytes, file_type, effective_from, effective_until, approved_at, created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? []) as DocumentRow[];
    },
  });
}
