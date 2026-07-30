import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteReleaseButton from "./DeleteReleaseButton";
import ToggleReleaseStatus from "./ToggleReleaseStatus";

export default async function AdminReleasesPage() {
  const { data: releases, error } = await supabase
    .from("releases")
    .select(`
      *,
      artists (
        id,
        stage_name,
        artist_code,
        verified
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="text-5xl font-black">
            Releases
          </h1>

          <p className="mt-3 font-bold text-red-500">
            Total Releases: {releases?.length || 0}
          </p>
        </div>

        <Link
          href="/admin/releases/add"
          className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-700"
        >
          + Add Release
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-800 bg-red-950 p-4 text-red-300">
          {error.message}
        </p>
      )}

      <div className="mt-10 overflow-x-auto rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <table className="w-full min-w-[1050px]">
          <thead>
            <tr className="border-b border-red-900">
              <th className="py-4 text-left">Cover</th>
              <th className="py-4 text-left">Code</th>
              <th className="py-4 text-left">Title</th>
              <th className="py-4 text-left">Artist</th>
              <th className="py-4 text-left">Type</th>
              <th className="py-4 text-left">Release Date</th>
              <th className="py-4 text-left">Status</th>
              <th className="py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {releases?.length ? (
              releases.map((release) => (
                <tr
                  key={release.id}
                  className="border-b border-zinc-800"
                >
                  <td className="py-4">
                    {release.cover ? (
                      <img
                        src={release.cover}
                        alt={release.title || "Release Cover"}
                        width={64}
                        height={64}
                        loading="lazy"
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 text-xs text-gray-500">
                        No Cover
                      </div>
                    )}
                  </td>

                  <td className="py-4 text-gray-400">
                    {release.release_code || "—"}
                  </td>

                  <td className="py-4 font-bold">
                    {release.title || "Untitled Release"}
                  </td>

                  <td className="py-4">
                    <p className="flex items-center gap-2 text-red-500">
                      <span>
                        {release.artists?.stage_name ||
                          "Unknown Artist"}
                      </span>

                      {release.artists?.verified && (
                        <span className="rounded-full border border-red-600 bg-red-950 px-2 py-1 text-xs font-bold text-red-400">
                          ✓ 143 Studios Verified
                        </span>
                      )}
                    </p>

                    <p className="text-sm text-gray-500">
                      {release.artists?.artist_code || ""}
                    </p>
                  </td>

                  <td className="py-4 text-gray-400">
                    {release.release_type || "—"}
                  </td>

                  <td className="py-4 text-gray-400">
                    {release.release_date || "—"}
                  </td>

                  <td className="py-4">
                    <span
                      className={
                        release.status === "active"
                          ? "rounded-lg bg-green-900 px-3 py-1 font-semibold text-green-400"
                          : release.status === "hidden"
                            ? "rounded-lg bg-red-900 px-3 py-1 font-semibold text-red-400"
                            : "rounded-lg bg-yellow-900 px-3 py-1 font-semibold text-yellow-400"
                      }
                    >
                      {release.status
                        ? release.status.charAt(0).toUpperCase() +
                          release.status.slice(1)
                        : "Draft"}
                    </span>
                  </td>

                  <td className="py-4">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/admin/releases/edit/${release.id}`}
                        className="rounded-lg border border-blue-600 px-4 py-2 text-blue-400 transition hover:bg-blue-600 hover:text-white"
                      >
                        Edit
                      </Link>

                      <ToggleReleaseStatus
                        id={release.id}
                        status={release.status}
                      />

                      <DeleteReleaseButton
                        id={release.id}
                        title={
                          release.title ||
                          "Untitled Release"
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-400"
                >
                  No Releases Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}