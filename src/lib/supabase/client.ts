import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_KEY } from './env';

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
