import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";

type LatestArtist = {
  id: number;
  artist_code: string | null;
  stage_name: string | null;
  artist_type: string | null;
  image: string | null;
  status: string | null;
  verified: boolean | null;
  featured: boolean | null;
  created_at: string | null;
};

type ReleaseArtist = {
  stage_name: string | null;
  artist_code: string | null;
};

type LatestRelease = {
  id: number;
  release_code: string | null;
  title: string | null;
  release_type: string | null;
  cover: string | null;
  status: string | null;
  featured: boolean | null;
  release_date: string | null;
  created_at: string | null;
  artists:
    | ReleaseArtist
    | ReleaseArtist[]
    | null;
};

export default async function AdminPage() {
  const [
    artistsResult,
    releasesResult,
    activeArtistsResult,
    hiddenArtistsResult,
    activeReleasesResult,
    draftReleasesResult,
    hiddenReleasesResult,
    featuredArtistsResult,
    featuredReleasesResult,
    latestArtistsResult,
    latestReleasesResult,
  ] = await Promise.all([
    supabase
      .from("artists")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("releases")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("artists")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "active"),

    supabase
      .from("artists")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "hidden"),

    supabase
      .from("releases")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "active"),

    supabase
      .from("releases")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "draft"),

    supabase
      .from("releases")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "hidden"),

    supabase
      .from("artists")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("featured", true),

    supabase
      .from("releases")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("featured", true),

    supabase
      .from("artists")
      .select(`
        id,
        artist_code,
        stage_name,
        artist_type,
        image,
        status,
        verified,
        featured,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(5),

    supabase
      .from("releases")
      .select(`
        id,
        release_code,
        title,
        release_type,
        cover,
        status,
        featured,
        release_date,
        created_at,
        artists (
          stage_name,
          artist_code
        )
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(5),
  ]);

  const queryError =
    artistsResult.error ||
    releasesResult.error ||
    activeArtistsResult.error ||
    hiddenArtistsResult.error ||
    activeReleasesResult.error ||
    draftReleasesResult.error ||
    hiddenReleasesResult.error ||
    featuredArtistsResult.error ||
    featuredReleasesResult.error ||
    latestArtistsResult.error ||
    latestReleasesResult.error;

  const totalArtists =
    artistsResult.count ?? 0;

  const totalReleases =
    releasesResult.count ?? 0;

  const activeArtists =
    activeArtistsResult.count ?? 0;

  const hiddenArtists =
    hiddenArtistsResult.count ?? 0;

  const activeReleases =
    activeReleasesResult.count ?? 0;

  const draftReleases =
    draftReleasesResult.count ?? 0;

  const hiddenReleases =
    hiddenReleasesResult.count ?? 0;

  const featuredArtists =
    featuredArtistsResult.count ?? 0;

  const featuredReleases =
    featuredReleasesResult.count ?? 0;

  const latestArtists =
    (latestArtistsResult.data ?? []) as LatestArtist[];

  const latestReleases =
    (latestReleasesResult.data ?? []) as unknown as LatestRelease[];

  return (
    <main className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <section className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-5xl font-black">
              Dashboard
            </h1>

            <p className="mt-3 text-gray-400">
              Welcome Back, Admin
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/artists/add"
              className="rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-700"
            >
              Add Artist
            </Link>

            <Link
              href="/admin/releases/add"
              className="rounded-xl border border-red-600 px-5 py-3 font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              Add Release
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-gray-300 transition hover:bg-zinc-800"
            >
              View Website
            </Link>
          </div>
        </div>

        {queryError && (
          <div className="mt-8 rounded-2xl border border-red-800 bg-red-950 p-5 text-red-300">
            <h2 className="font-black">
              Dashboard Data Error
            </h2>

            <p className="mt-2">
              {queryError.message}
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Artists"
            value={totalArtists}
            href="/admin/artists"
          />

          <DashboardCard
            title="Total Releases"
            value={totalReleases}
            href="/admin/releases"
          />

          <DashboardCard
            title="Active Artists"
            value={activeArtists}
            href="/admin/artists"
          />

          <DashboardCard
            title="Active Releases"
            value={activeReleases}
            href="/admin/releases"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <SmallDashboardCard
            title="Hidden Artists"
            value={hiddenArtists}
          />

          <SmallDashboardCard
            title="Draft Releases"
            value={draftReleases}
          />

          <SmallDashboardCard
            title="Hidden Releases"
            value={hiddenReleases}
          />

          <SmallDashboardCard
            title="Featured Artists"
            value={featuredArtists}
          />

          <SmallDashboardCard
            title="Featured Releases"
            value={featuredReleases}
          />
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">
                Latest Artists
              </h2>

              <Link
                href="/admin/artists"
                className="font-bold text-red-500 transition hover:text-red-400"
              >
                View All →
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {latestArtists.length > 0 ? (
                latestArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-black p-4"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      {artist.image ? (
                        <Image
                          src={artist.image}
                          alt={artist.stage_name || "Artist"}
                          width={64}
                          height={64}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-xs text-gray-500">
                          No Image
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-lg font-black">
                          {artist.stage_name ||
                            "Unnamed Artist"}
                        </p>

                        <p className="truncate text-sm text-gray-400">
                          {artist.artist_code ||
                            "No Artist Code"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <StatusBadge
                            status={
                              artist.status ||
                              "hidden"
                            }
                          />

                          {artist.verified && (
                            <span className="rounded-full border border-red-600 px-2 py-1 text-xs font-bold text-red-400">
                              Verified
                            </span>
                          )}

                          {artist.featured && (
                            <span className="rounded-full border border-yellow-600 px-2 py-1 text-xs font-bold text-yellow-400">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/admin/artists/edit/${artist.id}`}
                      className="shrink-0 rounded-lg border border-blue-600 px-4 py-2 font-bold text-blue-400 transition hover:bg-blue-600 hover:text-white"
                    >
                      Edit
                    </Link>
                  </div>
                ))
              ) : (
                <p className="py-10 text-center text-gray-400">
                  No Artists Found
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">
                Latest Releases
              </h2>

              <Link
                href="/admin/releases"
                className="font-bold text-red-500 transition hover:text-red-400"
              >
                View All →
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {latestReleases.length > 0 ? (
                latestReleases.map((release) => (
                  <div
                    key={release.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-black p-4"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      {release.cover ? (
                        <Image
                          src={release.cover}
                          alt={
                            release.title ||
                            "Release"
                          }
                          width={64}
                          height={64}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-xs text-gray-500">
                          No Cover
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-lg font-black">
                          {release.title ||
                            "Untitled Release"}
                        </p>

                        <p className="truncate text-sm text-gray-400">
                          {getReleaseArtistName(
                            release.artists
                          )}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {release.release_code ||
                            "No Release Code"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <StatusBadge
                            status={
                              release.status ||
                              "draft"
                            }
                          />

                          {release.featured && (
                            <span className="rounded-full border border-yellow-600 px-2 py-1 text-xs font-bold text-yellow-400">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/admin/releases/edit/${release.id}`}
                      className="shrink-0 rounded-lg border border-blue-600 px-4 py-2 font-bold text-blue-400 transition hover:bg-blue-600 hover:text-white"
                    >
                      Edit
                    </Link>
                  </div>
                ))
              ) : (
                <p className="py-10 text-center text-gray-400">
                  No Releases Found
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function DashboardCard({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-red-900 bg-zinc-950 p-6 transition hover:-translate-y-1 hover:border-red-600"
    >
      <h2 className="text-lg font-bold">
        {title}
      </h2>

      <p className="mt-3 text-4xl font-black text-red-500">
        {value}
      </p>

      <p className="mt-4 text-sm font-bold text-gray-400">
        View Details →
      </p>
    </Link>
  );
}

function SmallDashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="text-sm font-bold text-gray-400">
        {title}
      </h2>

      <p className="mt-2 text-3xl font-black text-red-500">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalizedStatus =
    status.toLowerCase();

  const className =
    normalizedStatus === "active"
      ? "border-green-700 text-green-400"
      : normalizedStatus === "hidden"
        ? "border-red-700 text-red-400"
        : "border-yellow-700 text-yellow-400";

  return (
    <span
      className={`rounded-full border px-2 py-1 text-xs font-bold ${className}`}
    >
      {toTitleCase(status)}
    </span>
  );
}

function getReleaseArtistName(
  artists:
    | ReleaseArtist
    | ReleaseArtist[]
    | null
) {
  if (!artists) {
    return "Unknown Artist";
  }

  if (Array.isArray(artists)) {
    return (
      artists[0]?.stage_name ||
      "Unknown Artist"
    );
  }

  return (
    artists.stage_name ||
    "Unknown Artist"
  );
}

function toTitleCase(value: string) {
  return value.replace(
    /\w\S*/g,
    (word) =>
      word.charAt(0).toUpperCase() +
      word.slice(1).toLowerCase()
  );
}