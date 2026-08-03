import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/site-pages-server";
import { publicReleaseSlug } from "@/lib/public-slugs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "Explore Official Singles, Albums, EPs And Music Releases From 143 Studios And Its Artists.",
  alternates: {
    canonical: "https://143studios.online/releases",
  },
};

type ReleaseArtist = {
  stage_name: string | null;
  artist_code: string | null;
  verified: boolean | null;
};

type Release = {
  id: number;
  title: string | null;
  slug: string | null;
  cover: string | null;
  release_type: string | null;
  release_date: string | null;
  featured: boolean | null;
  sort_order: number | null;
  spotify: string | null;
  apple_music: string | null;
  youtube: string | null;
  youtube_music: string | null;
  artists: ReleaseArtist | ReleaseArtist[] | null;
};

function getReleaseArtist(
  artists: Release["artists"]
): ReleaseArtist | null {
  if (!artists) {
    return null;
  }

  if (Array.isArray(artists)) {
    return artists[0] ?? null;
  }

  return artists;
}

function formatReleaseDate(date: string | null): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isSafeExternalUrl(url: string | null): url is string {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    return (
      parsedUrl.protocol === "https:" ||
      parsedUrl.protocol === "http:"
    );
  } catch {
    return false;
  }
}

export default async function ReleasesPage() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase Environment Variables Are Missing.");
  }

  const { data, error } = await supabase
    .from("releases")
    .select(`
      id,
      title,
      slug,
      cover,
      release_type,
      release_date,
      featured,
      sort_order,
      spotify,
      apple_music,
      youtube,
      youtube_music,
      artists (
        stage_name,
        artist_code,
        verified
      )
    `)
    .eq("status", "active")
    .order("featured", {
      ascending: false,
    })
    .order("sort_order", {
      ascending: true,
      nullsFirst: false,
    })
    .order("release_date", {
      ascending: false,
    });

  if (error) {
    console.error("Releases Page Error:", error);

    return (
      <div className="min-h-screen bg-black px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-red-900 bg-zinc-950 p-8 text-center sm:p-12">
          <h1 className="text-4xl font-black text-red-600 sm:text-5xl">
            Failed To Load Releases
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
            We Could Not Load The Releases Right Now. Please Refresh
            The Page Or Try Again Shortly.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Back To Home
          </Link>
        </div>
      </div>
    );
  }

  const releases = (data ?? []) as Release[];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero */}
      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24">
          <p className="font-bold uppercase tracking-[0.2em] text-red-500 sm:tracking-[0.3em]">
            Official 143 Studios Music
          </p>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl md:text-7xl">
            Official Releases
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            Explore Official Singles, Albums, EPs And Music Releases
            From 143 Studios And Our Artists.
          </p>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        {releases.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {releases.map((release) => {
              const artist = getReleaseArtist(
                release.artists
              );

              const releaseTitle =
                release.title?.trim() || "Untitled Release";

              const artistName =
                artist?.stage_name?.trim() || "Unknown Artist";

              const formattedDate = formatReleaseDate(
                release.release_date
              );

              const releaseHref = release.slug
                ? `/releases/${publicReleaseSlug(release.slug)}`
                : null;

              return (
                <article
                  key={release.id}
                  className="group min-w-0 overflow-hidden rounded-3xl border border-red-900 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30"
                >
                  {releaseHref ? (
                    <Link
                      href={releaseHref}
                      aria-label={`View ${releaseTitle}`}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
                    >
                      <ReleaseCover
                        cover={release.cover}
                        title={releaseTitle}
                      />
                    </Link>
                  ) : (
                    <ReleaseCover
                      cover={release.cover}
                      title={releaseTitle}
                    />
                  )}

                  <div className="p-5">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        {releaseHref ? (
                          <Link
                            href={releaseHref}
                            className="transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <h2 className="break-words text-2xl font-black">
                              {releaseTitle}
                            </h2>
                          </Link>
                        ) : (
                          <h2 className="break-words text-2xl font-black">
                            {releaseTitle}
                          </h2>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <p className="break-words font-semibold text-red-500">
                            {artistName}
                          </p>

                          {artist?.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-red-600 bg-red-950 px-2 py-1 text-xs font-bold text-red-400">
                              <span aria-hidden="true">
                                ✓
                              </span>

                              143 Studios Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {release.featured && (
                        <span className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="mt-4 space-y-1 text-sm text-gray-400">
                      {release.release_type?.trim() && (
                        <p>{release.release_type.trim()}</p>
                      )}

                      {formattedDate && (
                        <p>{formattedDate}</p>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {isSafeExternalUrl(release.spotify) && (
                        <ExternalPlatformLink
                          href={release.spotify}
                          label="Spotify"
                          className="border-green-600 text-green-400 hover:bg-green-600"
                        />
                      )}

                      {isSafeExternalUrl(
                        release.apple_music
                      ) && (
                        <ExternalPlatformLink
                          href={release.apple_music}
                          label="Apple Music"
                          className="border-pink-600 text-pink-400 hover:bg-pink-600"
                        />
                      )}

                      {isSafeExternalUrl(release.youtube) && (
                        <ExternalPlatformLink
                          href={release.youtube}
                          label="YouTube"
                          className="border-red-600 text-red-400 hover:bg-red-600"
                        />
                      )}

                      {isSafeExternalUrl(
                        release.youtube_music
                      ) && (
                        <ExternalPlatformLink
                          href={release.youtube_music}
                          label="YouTube Music"
                          className="border-red-700 text-red-300 hover:bg-red-700"
                        />
                      )}
                    </div>

                    {releaseHref && (
                      <Link
                        href={releaseHref}
                        className="mt-6 inline-flex items-center font-bold text-red-500 transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        View Release

                        <span
                          aria-hidden="true"
                          className="ml-2 transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-red-900 bg-zinc-950 px-6 py-16 text-center">
            <h2 className="text-3xl font-black">
              No Active Releases Found
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-400">
              Official Releases Will Appear Here When They Are
              Published By 143 Studios.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl border-2 border-red-600 px-7 py-3 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white"
            >
              Back To Home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function ReleaseCover({
  cover,
  title,
}: {
  cover: string | null;
  title: string;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
      {cover ? (
        <Image
          src={cover}
          alt={`${title} Cover Artwork`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-6 text-center text-gray-500">
          No Cover Artwork Available
        </div>
      )}
    </div>
  );
}

function ExternalPlatformLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen On ${label}`}
      className={`rounded-lg border px-3 py-2 text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${className}`}
    >
      {label}
    </a>
  );
}
