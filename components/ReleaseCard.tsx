import Image from "next/image";
import Link from "next/link";
import { publicReleaseSlug } from "@/lib/public-slugs";

type Release = {
  id: string | number;
  slug: string;
  title: string;
  artist: string;
  type: string;
  releaseDate: string;
  cover: string;
};

export default function ReleaseCard({
  release,
}: {
  release: Release;
}) {
  const releaseTitle =
    release.title?.trim() || "Untitled Release";

  const artistName =
    release.artist?.trim() || "Unknown Artist";

  const releaseType =
    release.type?.trim() || "";

  return (
    <Link
      href={`/releases/${publicReleaseSlug(release.slug)}`}
      aria-label={`View ${releaseTitle}`}
      className="group flex h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-red-900 bg-black transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">
        <div className="relative aspect-square overflow-hidden bg-zinc-900">
          {release.cover ? (
            <Image
              src={release.cover}
              alt={`${releaseTitle} Cover Artwork`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-gray-500">
              No Cover Artwork Available
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="break-words text-3xl font-black text-white">
            {releaseTitle}
          </h3>

          <p className="mt-2 break-words font-bold text-red-500">
            {artistName}
          </p>

          {releaseType && (
            <p className="mt-2 break-words text-gray-400">
              {releaseType}
            </p>
          )}

          {release.releaseDate && (
            <p className="mt-2 text-gray-400">
              {release.releaseDate}
            </p>
          )}

          <div className="mt-auto pt-6 font-bold text-red-500 transition-colors group-hover:text-red-400">
            View Release
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
