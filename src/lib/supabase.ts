// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Client-side Supabase client (with realtime)
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// Server-side Supabase client (without realtime for API routes)
export const createServerSupabaseClient = () => {
	return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
};
