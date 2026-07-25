"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { artists } from "@/data/artists";

export default function ArtistsPage() {
  const [search, setSearch] = useState("");
  const filteredArtists = artists.filter((artist) =>
  artist.stageName
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-black">
            All <span className="text-red-600">Artists</span>
            <input
  type="text"
  placeholder="Search Artists..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mt-6 w-full rounded-xl border border-red-900 bg-neutral-950 px-5 py-4 text-white outline-none focus:border-red-600"
/>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
            Explore All Official Artists Of 143 Studios. Discover Profiles,
            Biographies, Releases And Streaming Links.
          </p>

          <p className="mt-4 font-bold text-red-500">
            Total Artists: {artists.length}
          </p>
          <Link
  href="/"
  className="mt-6 inline-block rounded-xl border-2 border-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-600"
>
  ← Back To Home
</Link>

        </div>


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {filteredArtists.map((artist) => (

            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="group overflow-hidden rounded-3xl border border-red-900 bg-neutral-950 transition hover:border-red-600"
            >

              <div className="relative h-80 w-full">

                <Image
                  src={artist.image}
                  alt={artist.stageName}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

              </div>


              <div className="p-6">

                <h2 className="text-3xl font-black">
                  {artist.stageName}
                </h2>

                <p className="mt-2 text-red-500 font-bold">
                  {artist.artistType}
                </p>

                <p className="mt-3 text-gray-400">
                  {artist.city}, {artist.country}
                </p>


                <div className="mt-5 inline-block rounded-lg border border-red-600 px-5 py-2 text-sm font-bold text-red-500">
                  View Profile →
                </div>

              </div>


            </Link>

          ))}

        </div>


      </div>

    </main>
  );
}