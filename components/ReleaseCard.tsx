import Image from "next/image";
import Link from "next/link";

type Release = {
  id: string;
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
  return (
    <Link href={`/releases/${release.slug}`}>

      <div className="rounded-3xl border border-red-900 bg-neutral-950 p-6 transition hover:scale-105 hover:border-red-600">

        <Image
          src={release.cover}
          alt={release.title}
          width={500}
          height={500}
          className="rounded-2xl object-cover"
        />

        <h2 className="mt-5 text-2xl font-black text-white">
          {release.title}
        </h2>

        <p className="mt-2 font-bold text-red-500">
          {release.artist}
        </p>

        <p className="mt-2 text-gray-400">
          {release.type}
        </p>

        <p className="mt-2 text-gray-400">
          {release.releaseDate}
        </p>

      </div>

    </Link>
  );
}