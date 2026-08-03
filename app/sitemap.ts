import type { MetadataRoute } from "next";
import { createServerSupabaseClient } from "@/lib/site-pages-server";
import { publicArtistSlug, publicReleaseSlug } from "@/lib/public-slugs";

const base = "https://143studios.online";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/artists",
    "/releases",
    "/search",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return staticPages;
  }

  const [artistsResult, releasesResult] = await Promise.all([
    supabase
      .from("artists")
      .select("slug, updated_at")
      .eq("status", "active")
      .not("slug", "is", null),
    supabase
      .from("releases")
      .select("slug, updated_at")
      .eq("status", "active")
      .not("slug", "is", null),
  ]);

  const artistPages: MetadataRoute.Sitemap = (artistsResult.data ?? [])
    .filter((artist) => Boolean(artist.slug?.trim()))
    .map((artist) => ({
      url: `${base}/artists/${publicArtistSlug(artist.slug!)}`,
      lastModified: artist.updated_at || undefined,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const releasePages: MetadataRoute.Sitemap = (releasesResult.data ?? [])
    .filter((release) => Boolean(release.slug?.trim()))
    .map((release) => ({
      url: `${base}/releases/${publicReleaseSlug(release.slug!)}`,
      lastModified: release.updated_at || undefined,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...artistPages, ...releasePages];
}
