import Link from "next/link";

type ArtistCardProps = {
  artist: {
    id: string;
    slug: string;
    stageName: string;
    artistType: string;
    genres: string[];
    image: string;
    tagline: string;
  };
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.slug}`}>
      <div className="cursor-pointer overflow-hidden rounded-2xl border border-red-900 bg-black transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

        <img
          src={artist.image}
          alt={artist.stageName}
          className="h-72 w-full object-cover"
        />

        <div className="p-6">

          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            143 Studios Artist
          </span>

          <h3 className="mt-4 text-3xl font-black text-white">
            {artist.stageName}
          </h3>

          <p className="mt-2 text-gray-400">
            {artist.artistType}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-red-700 px-3 py-1 text-sm text-red-400"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="mt-5 italic text-gray-500">
            "{artist.tagline}"
          </p>

          <div className="mt-6 font-bold text-red-500">
            View Profile →
          </div>

        </div>
      </div>
    </Link>
  );
}