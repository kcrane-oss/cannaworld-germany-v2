import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';
import type { Database } from './types';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const SUPABASE_PUBLISHABLE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim();

const capacitorAuthStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const { value } = await Preferences.get({ key });
      return value;
    } catch (error) {
      console.warn(`[Supabase] Preferences.get failed for ${key}; falling back to localStorage`, error);
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await Preferences.set({ key, value });
    } catch (error) {
      console.warn(`[Supabase] Preferences.set failed for ${key}; falling back to localStorage`, error);
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.warn(`[Supabase] Preferences.remove failed for ${key}; falling back to localStorage`, error);
      if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    }
  },
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: capacitorAuthStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
