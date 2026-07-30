import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ArtistCard from "./ArtistCard";

type FeaturedArtist = {
  id: number;
  slug: string | null;
  stage_name: string | null;
  artist_type: string | null;
  genre: string | null;
  image: string | null;
  bio: string | null;
  verified: boolean | null;
};

type FeaturedArtistWithSlug = FeaturedArtist & {
  slug: string;
};

export default async function Artists() {
  const { data, error } = await supabase
    .from("artists")
    .select(`
      id,
      slug,
      stage_name,
      artist_type,
      genre,
      image,
      bio,
      verified
    `)
    .eq("status", "active")
    .eq("featured", true)
    .order("sort_order", {
      ascending: true,
      nullsFirst: false,
    })
    .order("stage_name", {
      ascending: true,
    })
    .limit(6);

  if (error) {
    console.error(
      "Homepage Featured Artists Error:",
      error
    );

    return null;
  }

  const artists = (
    (data as FeaturedArtist[] | null) ?? []
  ).filter(
    (
      artist
    ): artist is FeaturedArtistWithSlug =>
      typeof artist.slug === "string" &&
      artist.slug.trim().length > 0
  );

  if (artists.length === 0) {
    return null;
  }

  return (
    <section
      id="artists"
      className="bg-neutral-950 px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h2 className="text-4xl font-black text-white sm:text-5xl">
              Our{" "}
              <span className="text-red-600">
                Featured Artists
              </span>
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              Meet The Official Artists Of 143 Studios.
              Click Any Artist To View Their Profile,
              Biography, Releases And Streaming Links.
            </p>
          </div>

          <Link
            href="/artists"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-red-600 px-6 py-3 font-semibold text-red-500 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            View All Artists →
          </Link>
        </div>

        <div className="mt-16 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => {
            const genres = artist.genre
              ? artist.genre
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              : [];

            const cleanBio = artist.bio
              ?.replace(/\s+/g, " ")
              .trim();

            const tagline = cleanBio
              ? cleanBio.length > 90
                ? `${cleanBio.slice(0, 90)}...`
                : cleanBio
              : "143 Studios Artist";

            return (
              <ArtistCard
                key={artist.id}
                artist={{
                  id: artist.id,
                  slug: artist.slug,
                  stageName:
                    artist.stage_name?.trim() ||
                    "Unnamed Artist",
                  artistType:
                    artist.artist_type?.trim() ||
                    "Artist",
                  genres,
                  image: artist.image || "",
                  tagline,
                  verified:
                    artist.verified ?? false,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}