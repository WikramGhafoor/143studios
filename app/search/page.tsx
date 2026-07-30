import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Official Artists, Music Releases, Genres And Catalog Codes On 143 Studios.",
  robots: {
    index: false,
    follow: true,
  },
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

type SearchArtist = {
  id: number;
  artist_code: string | null;
  stage_name: string | null;
  artist_type: string | null;
  genre: string | null;
  image: string | null;
  slug: string | null;
  verified: boolean | null;
};

type ReleaseArtist = {
  stage_name: string | null;
  slug: string | null;
};

type SearchRelease = {
  id: number;
  release_code: string | null;
  title: string | null;
  slug: string | null;
  release_type: string | null;
  genre: string | null;
  cover: string | null;
  release_date: string | null;
  featured: boolean | null;
  artists: ReleaseArtist | ReleaseArtist[] | null;
};

function normalizeSearchQuery(
  value: string | string[] | undefined
): string {
  const rawValue = Array.isArray(value)
    ? value[0]
    : value;

  return (rawValue ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 100);
}

function escapePostgrestSearch(value: string): string {
  return value
    .replace(/[,%()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(date: string | null): string | null {
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

function getReleaseArtist(
  artists: SearchRelease["artists"]
): ReleaseArtist | null {
  if (!artists) {
    return null;
  }

  if (Array.isArray(artists)) {
    return artists[0] ?? null;
  }

  return artists;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const searchQuery = normalizeSearchQuery(params.q);
  const databaseQuery =
    escapePostgrestSearch(searchQuery);

  let artists: SearchArtist[] = [];
  let releases: SearchRelease[] = [];

  let artistsError: string | null = null;
  let releasesError: string | null = null;

  if (databaseQuery.length >= 2) {
    const [artistsResult, releasesResult] =
      await Promise.all([
        supabase
          .from("artists")
          .select(`
            id,
            artist_code,
            stage_name,
            artist_type,
            genre,
            image,
            slug,
            verified
          `)
          .eq("status", "active")
          .or(
            [
              `stage_name.ilike.%${databaseQuery}%`,
              `real_name.ilike.%${databaseQuery}%`,
              `artist_code.ilike.%${databaseQuery}%`,
              `genre.ilike.%${databaseQuery}%`,
            ].join(",")
          )
          .order("featured", {
            ascending: false,
          })
          .order("sort_order", {
            ascending: true,
            nullsFirst: false,
          })
          .order("stage_name", {
            ascending: true,
          }),

        supabase
          .from("releases")
          .select(`
            id,
            release_code,
            title,
            slug,
            release_type,
            genre,
            cover,
            release_date,
            featured,
            artists (
              stage_name,
              slug
            )
          `)
          .eq("status", "active")
          .or(
            [
              `title.ilike.%${databaseQuery}%`,
              `release_code.ilike.%${databaseQuery}%`,
              `genre.ilike.%${databaseQuery}%`,
              `release_type.ilike.%${databaseQuery}%`,
            ].join(",")
          )
          .order("featured", {
            ascending: false,
          })
          .order("sort_order", {
            ascending: true,
            nullsFirst: false,
          })
          .order("release_date", {
            ascending: false,
          }),
      ]);

    artists =
      (artistsResult.data as SearchArtist[] | null) ?? [];

    releases =
      (releasesResult.data as SearchRelease[] | null) ?? [];

    artistsError =
      artistsResult.error?.message ?? null;

    releasesError =
      releasesResult.error?.message ?? null;
  }

  const totalResults =
    artists.length + releases.length;

  const queryTooShort =
    Boolean(searchQuery) && databaseQuery.length < 2;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24">
          <p className="font-bold uppercase tracking-[0.2em] text-red-500 sm:tracking-[0.3em]">
            Search 143 Studios
          </p>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl md:text-7xl">
            Search Artists And Releases
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl">
            Search By Artist Name, Release Title, Genre,
            Artist Code Or Release Code.
          </p>

          <form
            action="/search"
            method="GET"
            role="search"
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 sm:flex-row"
          >
            <label
              htmlFor="site-search"
              className="sr-only"
            >
              Search Artists And Releases
            </label>

            <input
              id="site-search"
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search Artists Or Releases"
              minLength={2}
              maxLength={100}
              required
              autoComplete="off"
              className="min-w-0 flex-1 rounded-xl border border-red-900 bg-zinc-950 px-5 py-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {!searchQuery && (
          <div className="rounded-3xl border border-red-900 bg-zinc-950 p-8 text-center">
            <h2 className="text-3xl font-black">
              Start Your Search
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-400">
              Enter At Least Two Characters To Search The
              143 Studios Artist And Release Catalog.
            </p>
          </div>
        )}

        {queryTooShort && (
          <div className="rounded-3xl border border-yellow-800 bg-yellow-950/30 p-8 text-center">
            <h2 className="text-2xl font-black text-yellow-300">
              Search Term Is Too Short
            </h2>

            <p className="mt-4 text-yellow-100/80">
              Please Enter At Least Two Search Characters.
            </p>
          </div>
        )}

        {databaseQuery.length >= 2 && (
          <>
            <p
              aria-live="polite"
              className="text-center font-bold text-red-500"
            >
              {totalResults}{" "}
              {totalResults === 1
                ? "Result"
                : "Results"}{" "}
              Found For &ldquo;{searchQuery}&rdquo;
            </p>

            {(artistsError || releasesError) && (
              <div className="mt-8 rounded-2xl border border-red-800 bg-red-950/40 p-5 text-red-300">
                <h2 className="font-black">
                  Some Search Results Could Not Be Loaded
                </h2>

                {artistsError && (
                  <p className="mt-2">
                    Artist Search Is Temporarily Unavailable.
                  </p>
                )}

                {releasesError && (
                  <p className="mt-2">
                    Release Search Is Temporarily Unavailable.
                  </p>
                )}
              </div>
            )}

            <section
              aria-labelledby="artist-results-heading"
              className="mt-14"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2
                  id="artist-results-heading"
                  className="text-3xl font-black"
                >
                  Artists
                </h2>

                <span className="font-bold text-red-500">
                  {artists.length}{" "}
                  {artists.length === 1
                    ? "Result"
                    : "Results"}
                </span>
              </div>

              {artists.length > 0 ? (
                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {artists.map((artist) => {
                    const artistName =
                      artist.stage_name?.trim() ||
                      "Unnamed Artist";

                    const artistHref = artist.slug
                      ? `/artists/${artist.slug}`
                      : null;

                    const cardContent = (
                      <>
                        <SearchImage
                          src={artist.image}
                          alt={`${artistName} Artist Profile`}
                          fallback="No Artist Image Available"
                        />

                        <div className="p-6">
                          {artist.verified && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-600 bg-red-950 px-3 py-1 text-xs font-bold text-red-400">
                              <span aria-hidden="true">
                                ✓
                              </span>
                              143 Studios Verified Artist
                            </span>
                          )}

                          <h3 className="mt-4 break-words text-2xl font-black">
                            {artistName}
                          </h3>

                          <p className="mt-2 text-red-500">
                            {artist.artist_type?.trim() ||
                              "Artist"}
                          </p>

                          {artist.genre && (
                            <p className="mt-2 break-words text-gray-400">
                              {artist.genre}
                            </p>
                          )}

                          {artist.artist_code && (
                            <p className="mt-2 break-words text-sm text-gray-500">
                              {artist.artist_code}
                            </p>
                          )}

                          {artistHref && (
                            <p className="mt-5 font-bold text-red-500">
                              View Profile →
                            </p>
                          )}
                        </div>
                      </>
                    );

                    return artistHref ? (
                      <Link
                        key={artist.id}
                        href={artistHref}
                        aria-label={`View ${artistName} Profile`}
                        className="group min-w-0 overflow-hidden rounded-2xl border border-red-900 bg-zinc-950 transition duration-300 hover:-translate-y-2 hover:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <article
                        key={artist.id}
                        className="min-w-0 overflow-hidden rounded-2xl border border-red-900 bg-zinc-950"
                      >
                        {cardContent}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyResult message="No Artists Found." />
              )}
            </section>

            <section
              aria-labelledby="release-results-heading"
              className="mt-16"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2
                  id="release-results-heading"
                  className="text-3xl font-black"
                >
                  Releases
                </h2>

                <span className="font-bold text-red-500">
                  {releases.length}{" "}
                  {releases.length === 1
                    ? "Result"
                    : "Results"}
                </span>
              </div>

              {releases.length > 0 ? (
                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {releases.map((release) => {
                    const artist = getReleaseArtist(
                      release.artists
                    );

                    const releaseTitle =
                      release.title?.trim() ||
                      "Untitled Release";

                    const releaseHref = release.slug
                      ? `/releases/${release.slug}`
                      : null;

                    const releaseDate = formatDate(
                      release.release_date
                    );

                    const cardContent = (
                      <>
                        <SearchImage
                          src={release.cover}
                          alt={`${releaseTitle} Cover Artwork`}
                          fallback="No Cover Artwork Available"
                        />

                        <div className="p-6">
                          {release.featured && (
                            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                              Featured
                            </span>
                          )}

                          <h3 className="mt-4 break-words text-2xl font-black">
                            {releaseTitle}
                          </h3>

                          <p className="mt-2 break-words text-red-500">
                            {artist?.stage_name?.trim() ||
                              "Unknown Artist"}
                          </p>

                          <p className="mt-2 text-gray-400">
                            {release.release_type?.trim() ||
                              "Release"}
                          </p>

                          {release.genre && (
                            <p className="mt-2 break-words text-gray-500">
                              {release.genre}
                            </p>
                          )}

                          {release.release_code && (
                            <p className="mt-2 break-words text-sm text-gray-500">
                              {release.release_code}
                            </p>
                          )}

                          {releaseDate && (
                            <p className="mt-2 text-sm text-gray-500">
                              {releaseDate}
                            </p>
                          )}

                          {releaseHref && (
                            <p className="mt-5 font-bold text-red-500">
                              View Release →
                            </p>
                          )}
                        </div>
                      </>
                    );

                    return releaseHref ? (
                      <Link
                        key={release.id}
                        href={releaseHref}
                        aria-label={`View ${releaseTitle}`}
                        className="group min-w-0 overflow-hidden rounded-2xl border border-red-900 bg-zinc-950 transition duration-300 hover:-translate-y-2 hover:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <article
                        key={release.id}
                        className="min-w-0 overflow-hidden rounded-2xl border border-red-900 bg-zinc-950"
                      >
                        {cardContent}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyResult message="No Releases Found." />
              )}
            </section>
          </>
        )}
      </section>
    </div>
  );
}

function SearchImage({
  src,
  alt,
  fallback,
}: {
  src: string | null;
  alt: string;
  fallback: string;
}) {
  return (
    <div className="relative aspect-square overflow-hidden bg-zinc-900">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-6 text-center text-gray-500">
          {fallback}
        </div>
      )}
    </div>
  );
}

function EmptyResult({
  message,
}: {
  message: string;
}) {
  return (
    <p className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center text-gray-400">
      {message}
    </p>
  );
}