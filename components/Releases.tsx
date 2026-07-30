import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ReleaseCard from "./ReleaseCard";

type ReleaseArtist = {
  stage_name: string | null;
};

type FeaturedRelease = {
  id: number;
  slug: string | null;
  title: string | null;
  release_type: string | null;
  release_date: string | null;
  cover: string | null;
  artists: ReleaseArtist | ReleaseArtist[] | null;
};

function getArtistName(
  artists: FeaturedRelease["artists"]
): string {
  if (!artists) {
    return "Unknown Artist";
  }

  const artist = Array.isArray(artists)
    ? artists[0]
    : artists;

  return (
    artist?.stage_name?.trim() ||
    "Unknown Artist"
  );
}

function formatReleaseDate(
  value: string | null
): string {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Releases() {
  const { data, error } = await supabase
    .from("releases")
    .select(`
      id,
      slug,
      title,
      release_type,
      release_date,
      cover,
      artists (
        stage_name
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
    })
    .limit(6);

  if (error) {
    console.error(
      "Homepage Releases Error:",
      error
    );

    return null;
  }

  const releases =
    ((data as FeaturedRelease[] | null) ?? [])
      .filter(
        (
          release
        ): release is FeaturedRelease & {
          slug: string;
        } =>
          Boolean(release.slug?.trim())
      );

  if (releases.length === 0) {
    return null;
  }

  return (
    <section
      id="releases"
      className="bg-black px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h2 className="text-4xl font-black text-white sm:text-5xl">
              Latest{" "}
              <span className="text-red-600">
                Releases
              </span>
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              Explore Official Music Releases From
              143 Studios Across All Major Streaming
              Platforms.
            </p>
          </div>

          <Link
            href="/releases"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-red-600 px-6 py-3 font-semibold text-red-500 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            View All Releases →
          </Link>
        </div>

        <div className="mt-16 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          {releases.map((release) => (
            <ReleaseCard
              key={release.id}
              release={{
                id: release.id,
                slug: release.slug,
                title:
                  release.title?.trim() ||
                  "Untitled Release",
                artist: getArtistName(
                  release.artists
                ),
                type:
                  release.release_type?.trim() ||
                  "Release",
                releaseDate:
                  formatReleaseDate(
                    release.release_date
                  ),
                cover: release.cover || "",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}