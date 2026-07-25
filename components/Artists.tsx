import Link from "next/link";
import { artists } from "@/data/artists";
import ArtistCard from "./ArtistCard";

export default function Artists() {
  return (
    <section
      id="artists"
      className="bg-neutral-950 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-5xl font-black text-white">
              Our <span className="text-red-600">Featured Artists</span>
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
  Meet The Official Artists Of 143 Studios. Click Any Artist To View
  Their Profile, Biography, Releases And Streaming Links.
</p>

          </div>

          <Link
            href="/artists"
            className="inline-flex items-center justify-center rounded-lg border border-red-600 px-6 py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-600 hover:text-white"
          >
            View All Artists →
          </Link>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
            />
          ))}
        </div>

      </div>
    </section>
  );
}