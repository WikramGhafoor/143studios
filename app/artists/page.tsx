import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/site-pages-server";
import { formatPublicText } from "@/lib/format-content";
import { publicArtistSlug } from "@/lib/public-slugs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Meet The Official Artists Of 143 Studios And Explore Their Profiles, Music And Creative Work.",
  alternates: {
    canonical: "https://143studios.online/artists",
  },
};

type Artist = {
  id: number;
  slug: string | null;
  stage_name: string | null;
  artist_type: string | null;
  genre: string | null;
  city: string | null;
  country: string | null;
  bio: string | null;
  image: string | null;
  verified: boolean | null;
  sort_order: number | null;
};

function getArtistHref(artist: Artist) {
  return artist.slug
    ? `/artists/${publicArtistSlug(artist.slug)}`
    : `/artists/${artist.id}`;
}

function getArtistLocation(artist: Artist) {
  return [artist.city, artist.country]
    .filter(Boolean)
    .join(", ");
}

export default async function ArtistsPage() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    throw new Error("Supabase Environment Variables Are Missing.");
  }

  const { data, error } = await supabase
    .from("artists")
    .select(
      `
        id,
        slug,
        stage_name,
        artist_type,
        genre,
        city,
        country,
        bio,
        image,
        verified,
        sort_order
      `
    )
    .eq("status", "active")
    .order("sort_order", {
      ascending: true,
      nullsFirst: false,
    })
    .order("stage_name", {
      ascending: true,
    });

  const artists = (data ?? []) as Artist[];

  if (error) {
    console.error("Artists Page Error:", error);

    return (
      <div className="min-h-screen bg-black px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-red-900 bg-zinc-950 p-8 text-center sm:p-12">
          <h1 className="text-4xl font-black text-red-600 sm:text-5xl">
            Error Loading Artists
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
            We Could Not Load The Artists Right Now. Please Refresh The Page Or
            Try Again Shortly.
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24">
          <p className="font-bold uppercase tracking-[0.2em] text-red-500 sm:tracking-[0.3em]">
            Official 143 Studios Artists
          </p>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl md:text-7xl">
            Meet Our Artists
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            Discover The Official Artists Of 143 Studios And Explore Their
            Profiles, Music, Releases And Creative Journeys.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        {artists.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => {
              const artistName =
                artist.stage_name?.trim() || "Unnamed Artist";

              const artistType =
                artist.artist_type?.trim()
                  ? formatPublicText(artist.artist_type.trim())
                  : "Artist";

              const artistLocation =
                getArtistLocation(artist);

              return (
                <article
                  key={artist.id}
                  className="group min-w-0 overflow-hidden rounded-3xl border border-red-900 bg-zinc-950 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30"
                >
                  <Link
                    href={getArtistHref(artist)}
                    aria-label={`View ${artistName} Profile`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
                  >
                    <div className="relative h-80 w-full overflow-hidden bg-zinc-900">
                      {artist.image ? (
                        <Image
                          src={artist.image}
                          alt={`${artistName} Artist Profile`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-6 text-center text-gray-500">
                          No Artist Image Available
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {artist.verified && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-red-600 bg-red-950 px-3 py-1 text-xs font-bold text-red-400">
                          <span aria-hidden="true">✓</span>
                          143 Studios Verified Artist
                        </span>
                      )}

                      <h2 className="mt-5 break-words text-3xl font-black text-white">
                        {artistName}
                      </h2>

                      <p className="mt-2 font-semibold text-red-500">
                        {artistType}
                      </p>

                      {artist.genre && (
                        <p className="mt-2 break-words text-gray-400">
                          {formatPublicText(artist.genre)}
                        </p>
                      )}

                      {artistLocation && (
                        <p className="mt-1 break-words text-gray-400">
                          {artistLocation}
                        </p>
                      )}

                      {artist.bio && (
                        <p className="mt-4 line-clamp-4 leading-7 text-gray-300">
                          {formatPublicText(artist.bio)}
                        </p>
                      )}

                      <div className="mt-6 inline-flex items-center font-bold text-red-500 transition-colors group-hover:text-red-400">
                        View Profile
                        <span
                          aria-hidden="true"
                          className="ml-2 transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-red-900 bg-zinc-950 px-6 py-16 text-center">
            <h2 className="text-3xl font-black text-white">
              No Active Artists Found
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-400">
              Artist Profiles Will Appear Here When They Are Published By 143
              Studios.
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
