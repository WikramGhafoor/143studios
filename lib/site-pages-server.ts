import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { SitePageContent } from "@/lib/site-pages";

export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function getSitePageServer(
  pageKey: string
): Promise<SitePageContent | null> {
  const cleanPageKey = pageKey.trim();
  const supabase = createServerSupabaseClient();

  if (!cleanPageKey || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("site_pages")
    .select("content")
    .eq("page_key", cleanPageKey)
    .maybeSingle();

  if (error || !data) {
    if (error) {
      console.error(`Get Site Page Error (${cleanPageKey}):`, error);
    }

    return null;
  }

  return data.content as SitePageContent;
}
