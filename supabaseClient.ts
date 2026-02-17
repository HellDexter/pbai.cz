
import { createClient } from '@supabase/supabase-js';

// URL vašeho projektu - Exportujeme ji, aby ji mohl použít i Admin klient v LoginScreen
export const SUPABASE_URL = 'https://eowcpeqfujcugfcjrhze.supabase.co';

// Váš PUBLIC (anon) klíč - tento je bezpečný pro použití v prohlížeči
const supabaseAnonKey = 'sb_publishable_zPGy3yn2OV6Z2Ha6ONoC3A_aKD1flKP';

export const supabase = createClient(SUPABASE_URL, supabaseAnonKey);
