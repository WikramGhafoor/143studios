import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteButton from "./DeleteButton";
import StatusButton from "./StatusButton";

export default async function AdminArtistsPage() {

  const { data: artists, error } = await supabase
    .from("artists")
    .select("*")
    .order("stage_name", { ascending: true });

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-black">
            Artists
          </h1>

          <p className="mt-3 text-red-500 font-bold">
            Total Artists: {artists?.length || 0}
          </p>
        </div>

        <Link
          href="/admin/artists/add"
          className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
        >
          + Add Artist
        </Link>

      </div>

      {error && (
        <p className="mt-6 text-red-500">
          {error.message}
        </p>
      )}

      <div className="mt-10 rounded-2xl border border-red-900 bg-zinc-950 p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-red-900">

              <th className="py-4 text-left">
                Image
              </th>

              <th className="py-4 text-left">
                Stage Name
              </th>

              <th className="py-4 text-left">
                Type
              </th>

              <th className="py-4 text-left">
                Genre
              </th>

              <th className="py-4 text-left">
                Country
              </th>

              <th className="py-4 text-left">
                Status
              </th>

              <th className="py-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {artists?.map((artist) => (

              <tr
                key={artist.id}
                className="border-b border-zinc-800"
              >

                <td className="py-4">

                  {artist.image && (
                    <Image
                      src={artist.image}
                      alt={artist.stage_name}
                      width={60}
                      height={60}
                      className="rounded-xl object-cover"
                    />
                  )}

                </td>

                <td className="py-4 font-bold">
                  {artist.stage_name}
                </td>

                <td className="py-4 text-red-500">
                  {artist.artist_type}
                </td>

                <td className="py-4 text-gray-400">
                  {artist.genre}
                </td>

                <td className="py-4 text-gray-400">
                  {artist.country}
                </td>

                {/* STATUS */}
                <td className="py-4">

                  <span
                    className={
                      artist.status === "active"
                        ? "rounded-lg bg-green-900 px-3 py-1 text-green-400 font-semibold"
                        : "rounded-lg bg-red-900 px-3 py-1 text-red-400 font-semibold"
                    }
                  >
                    {artist.status}
                  </span>

                </td>

                {/* ACTION */}
                <td className="py-4">

                  <div className="flex gap-3">

                    <Link
  href={`/admin/artists/edit/${artist.id}`}
  className="rounded-lg border border-blue-600 px-4 py-2 text-blue-400 hover:bg-blue-600 hover:text-white"
>
  Edit
</Link>

                    <StatusButton
                      id={artist.id}
                      status={artist.status}
                    />

                    <DeleteButton
                      id={artist.id}
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}