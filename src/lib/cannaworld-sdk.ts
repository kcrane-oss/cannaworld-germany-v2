import { setSupabaseClient } from "cannaworld-sdk";
import { supabase } from "@/integrations/supabase/client";

setSupabaseClient(supabase);

export * from "cannaworld-sdk";
