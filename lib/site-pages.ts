import { supabase } from "@/lib/supabase";

export type SitePageContent = Record<
  string,
  unknown
>;

type SitePageRow = {
  id: number;
  page_key: string;
  content: SitePageContent;
  created_at: string;
  updated_at: string;
};

export async function getSitePage(
  pageKey: string
): Promise<SitePageContent | null> {
  const cleanPageKey = pageKey.trim();

  if (!cleanPageKey) {
    return null;
  }

  const { data, error } = await supabase
    .from("site_pages")
    .select(
      "id, page_key, content, created_at, updated_at"
    )
    .eq("page_key", cleanPageKey)
    .maybeSingle();

  if (error) {
    console.error(
      `Get Site Page Error (${cleanPageKey}):`,
      error
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return (data as SitePageRow).content;
}

export async function updateSitePage(
  pageKey: string,
  content: SitePageContent
): Promise<SitePageContent> {
  const cleanPageKey = pageKey.trim();

  if (!cleanPageKey) {
    throw new Error("Page Key Is Required.");
  }

  const updatedAt = new Date().toISOString();

  const { data, error } = await supabase
    .from("site_pages")
    .upsert(
      {
        page_key: cleanPageKey,
        content,
        updated_at: updatedAt,
      },
      {
        onConflict: "page_key",
      }
    )
    .select(
      "id, page_key, content, created_at, updated_at"
    )
    .single();

  if (error) {
    console.error(
      `Update Site Page Error (${cleanPageKey}):`,
      error
    );

    throw new Error(error.message);
  }

  return (data as SitePageRow).content;
}
