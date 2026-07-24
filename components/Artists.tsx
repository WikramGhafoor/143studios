import { artists } from "@/data/artists";
import ArtistCard from "./ArtistCard";

export default function Artists() {
  return (
    <section
      id="artists"
      className="bg-neutral-950 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <h2 className="text-5xl font-black text-white">
            Our <span className="text-red-600">Artists</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Meet the official artists of 143 Studios. Click any artist to view
            their profile, biography, releases and streaming links.
          </p>

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