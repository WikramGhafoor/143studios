import Image from "next/image";
import Link from "next/link";
import { publicArtistSlug } from "@/lib/public-slugs";

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
      href={`/artists/${publicArtistSlug(artist.slug)}`}
      aria-label={`View ${artist.stageName} Profile`}
      className="group flex h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-red-900 bg-black transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">
        {/* Image */}

        <div className="relative aspect-square overflow-hidden bg-zinc-900">
          {artist.image ? (
            <Image
              src={artist.image}
              alt={`${artist.stageName} Artist Profile`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-gray-500">
              No Artist Image Available
            </div>
          )}
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col p-6">
          {artist.verified && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-600 bg-red-950 px-3 py-1 text-xs font-bold text-red-400">
              <span aria-hidden="true">✓</span>
              143 Studios Verified Artist
            </span>
          )}

          <h3 className="mt-4 break-words text-3xl font-black text-white">
            {artist.stageName}
          </h3>

          {artist.artistType && (
            <p className="mt-2 break-words text-gray-400">
              {artist.artistType}
            </p>
          )}

          {artist.genres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {artist.genres
                .slice(0, 3)
                .map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-red-700 px-3 py-1 text-sm text-red-400"
                  >
                    {genre}
                  </span>
                ))}
            </div>
          )}

          {artist.tagline && (
            <p className="mt-5 line-clamp-3 italic text-gray-500">
              &ldquo;{artist.tagline}&rdquo;
            </p>
          )}

          <div className="mt-auto pt-6 font-bold text-red-500 transition-colors group-hover:text-red-400">
            View Profile
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
