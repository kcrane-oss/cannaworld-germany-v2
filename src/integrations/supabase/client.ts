import { createClient } from '@supabase/supabase-js';
import { Preferences } from '@capacitor/preferences';
import type { Database } from './types';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const SUPABASE_PUBLISHABLE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim();

const isServiceRoleKey = (key: string): boolean => {
  if (/service[_-]?role/i.test(key)) return true;
  const [, payload] = key.split('.');
  if (!payload) return false;
  try {
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded?.role === 'service_role';
  } catch {
    return false;
  }
};

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error('[Supabase] Missing env: VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
}

if (isServiceRoleKey(SUPABASE_PUBLISHABLE_KEY)) {
  throw new Error('[Supabase] Refusing to initialize browser client with a service-role key');
}

const getBrowserStorage = () =>
  typeof localStorage !== 'undefined' &&
  typeof localStorage.getItem === 'function' &&
  typeof localStorage.setItem === 'function' &&
  typeof localStorage.removeItem === 'function'
    ? localStorage
    : null;

const capacitorAuthStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const { value } = await Preferences.get({ key });
      return value;
    } catch (error) {
      console.warn(`[Supabase] Preferences.get failed for ${key}; falling back to localStorage`, error);
      return getBrowserStorage()?.getItem(key) ?? null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await Preferences.set({ key, value });
    } catch (error) {
      console.warn(`[Supabase] Preferences.set failed for ${key}; falling back to localStorage`, error);
      getBrowserStorage()?.setItem(key, value);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await Preferences.remove({ key });
    } catch (error) {
      console.warn(`[Supabase] Preferences.remove failed for ${key}; falling back to localStorage`, error);
      getBrowserStorage()?.removeItem(key);
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
