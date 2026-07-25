console.log("Release Page Loaded");
import Image from "next/image";
import Link from "next/link";
import { releases } from "@/data/releases";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReleasePage({ params }: Props) {

  const { slug } = await params;

  const release = releases.find(
    (item) => item.slug === slug
  );

  if (!release) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold">
          Release Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2">

          <Image
            src={release.cover}
            alt={release.title}
            width={700}
            height={700}
            className="rounded-3xl object-cover"
          />

          <div>

            <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold">
              {release.type}
            </span>

            <h1 className="mt-6 text-5xl font-black">
              {release.title}
            </h1>

            <p className="mt-4 text-2xl font-bold text-red-500">
              {release.artist}
            </p>

            <p className="mt-6 text-lg text-gray-400">
              Release Date: {release.releaseDate}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              {release.spotify && (
                <a
                  href={release.spotify}
                  target="_blank"
                  className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
                >
                  Spotify
                </a>
              )}

              {release.appleMusic && (
                <a
                  href={release.appleMusic}
                  target="_blank"
                  className="rounded-xl bg-gray-700 px-6 py-3 font-bold text-white"
                >
                  Apple Music
                </a>
              )}

              {release.youtube && (
                <a
                  href={release.youtube}
                  target="_blank"
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white"
                >
                  YouTube
                </a>
              )}

            </div>

          </div>

        </div>

        <div className="mt-20 text-center">

          <Link
            href="/releases"
            className="inline-block rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-white transition hover:bg-red-600"
          >
            ← Back To Releases
          </Link>

        </div>

      </section>

    </main>
  );
}