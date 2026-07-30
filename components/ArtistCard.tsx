import Image from "next/image";
import Link from "next/link";

type ArtistCardProps = {
  artist: {
    id: string | number;
    slug: string;
    stageName: string;
    artistType: string;
    genres: string[];
    image: string;
    tagline: string;
    verified: boolean;
  };
};

export default function ArtistCard({
  artist,
}: ArtistCardProps) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group flex h-full"
    >
      <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-red-900 bg-black transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

        {/* Image */}

        <div className="relative aspect-square overflow-hidden">
          {artist.image ? (
            <Image
              src={artist.image}
              alt={artist.stageName}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-zinc-900 text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col p-6">

          {artist.verified && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-600 bg-red-950 px-3 py-1 text-xs font-bold text-red-400">
              ✓ 143 Studios Verified Artist
            </span>
          )}

          <h3 className="mt-4 break-words text-3xl font-black text-white">
            {artist.stageName}
          </h3>

          <p className="mt-2 text-gray-400">
            {artist.artistType}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {artist.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-red-700 px-3 py-1 text-sm text-red-400"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="mt-5 line-clamp-3 italic text-gray-500">
            "{artist.tagline}"
          </p>

          <div className="mt-auto pt-6 font-bold text-red-500 transition group-hover:text-red-400">
            View Profile →
          </div>

        </div>

      </article>
    </Link>
  );
}