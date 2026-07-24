import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/artists";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtistProfilePage({ params }: Props) {
  const { slug } = await params;

  const artist = artists.find(
    (item) => item.slug === slug
  );

  if (!artist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold">
          Artist Not Found
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Banner */}
      <section className="relative h-[420px] w-full overflow-hidden">

        <Image
          src={artist.banner}
          alt={`${artist.stageName} Banner`}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12">

            <div className="flex items-center gap-3">

              <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
                143 Studios Artist
              </span>

              <span className="rounded-full border border-red-600 px-4 py-2 text-sm font-bold text-red-400">
                Verified
              </span>

            </div>

          </div>
        </div>

      </section>
        {/* Artist Main Profile */}
        <section className="mx-auto max-w-6xl px-6 py-16">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Artist Image */}
            <div className="md:col-span-1">

              <div className="overflow-hidden rounded-3xl border border-red-900 bg-neutral-950">

                <Image
                  src={artist.image}
                  alt={artist.stageName}
                  width={600}
                  height={600}
                  className="h-auto w-full object-cover"
                />

              </div>

            </div>


            {/* Artist Information */}
            <div className="md:col-span-2">

              <h1 className="text-6xl font-black text-white">
                {artist.stageName}
              </h1>

              <p className="mt-4 text-2xl font-semibold text-red-500">
                {artist.artistType}
              </p>


              <div className="mt-8 grid gap-4 sm:grid-cols-2">


                <div className="rounded-xl border border-red-900 bg-neutral-950 p-5">

                  <h3 className="text-sm font-bold text-gray-500">
                    Artist ID
                  </h3>

                  <p className="mt-2 text-lg font-bold text-white">
                    {artist.id}
                  </p>

                </div>



                <div className="rounded-xl border border-red-900 bg-neutral-950 p-5">

                  <h3 className="text-sm font-bold text-gray-500">
                    Real Name
                  </h3>

                  <p className="mt-2 text-lg font-bold text-white">
                    {artist.realName}
                  </p>

                </div>



                <div className="rounded-xl border border-red-900 bg-neutral-950 p-5">

                  <h3 className="text-sm font-bold text-gray-500">
                    Location
                  </h3>

                  <p className="mt-2 text-lg font-bold text-white">
                    {artist.city}, {artist.country}
                  </p>

                </div>



                <div className="rounded-xl border border-red-900 bg-neutral-950 p-5">

                  <h3 className="text-sm font-bold text-gray-500">
                    Signed Since
                  </h3>

                  <p className="mt-2 text-lg font-bold text-white">
                    {artist.signedSince}
                  </p>

                </div>


              </div>
              {/* Genres */}

              <div className="mt-10">

                <h2 className="text-2xl font-black text-white">
                  Genres
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">

                  {artist.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-red-600 bg-red-600/10 px-5 py-2 font-bold text-red-400"
                    >
                      {genre}
                    </span>
                  ))}

                </div>

              </div>


              {/* Tagline */}

              <div className="mt-10 rounded-2xl border border-red-900 bg-neutral-950 p-6">

                <h2 className="text-2xl font-black text-white">
                  Artist Motto
                </h2>

                <p className="mt-3 text-xl font-semibold text-red-400">
                  "{artist.tagline}"
                </p>

              </div>


            </div>

          </div>


          {/* Biography */}

          <div className="mt-16 rounded-3xl border border-red-900 bg-neutral-950 p-8">

            <h2 className="text-3xl font-black text-white">
              Biography
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              {artist.bio}
            </p>

          </div>
          {/* Social Links */}

          <div className="mt-16 rounded-3xl border border-red-900 bg-neutral-950 p-8">

            <h2 className="text-3xl font-black text-white">
              Follow Artist
            </h2>


            <div className="mt-6 flex flex-wrap gap-4">


              {artist.socials.spotify && (
                <a
                  href={artist.socials.spotify}
                  target="_blank"
                  className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:scale-105"
                >
                  Spotify
                </a>
              )}


              {artist.socials.appleMusic && (
                <a
                  href={artist.socials.appleMusic}
                  target="_blank"
                  className="rounded-xl bg-gray-700 px-6 py-3 font-bold text-white transition hover:scale-105"
                >
                  Apple Music
                </a>
              )}


              {artist.socials.youtube && (
                <a
                  href={artist.socials.youtube}
                  target="_blank"
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:scale-105"
                >
                  YouTube
                </a>
              )}


              {artist.socials.instagram && (
                <a
                  href={artist.socials.instagram}
                  target="_blank"
                  className="rounded-xl bg-pink-600 px-6 py-3 font-bold text-white transition hover:scale-105"
                >
                  Instagram
                </a>
              )}


              {artist.socials.facebook && (
                <a
                  href={artist.socials.facebook}
                  target="_blank"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105"
                >
                  Facebook
                </a>
              )}


              {artist.socials.tiktok && (
                <a
                  href={artist.socials.tiktok}
                  target="_blank"
                  className="rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:scale-105"
                >
                  TikTok
                </a>
              )}


            </div>

          </div>



          {/* Releases Section */}

          <div className="mt-16 rounded-3xl border border-red-900 bg-neutral-950 p-8">

            <h2 className="text-3xl font-black text-white">
              Releases
            </h2>


            {artist.releases.length === 0 ? (

              <p className="mt-5 text-lg text-gray-400">
                No Official Releases Available Yet.
              </p>

            ) : (

              <div className="mt-6 grid gap-5 md:grid-cols-3">

                {artist.releases.map((release) => (
                  <div
                    key={release}
                    className="rounded-xl border border-red-900 p-5"
                  >
                    {release}
                  </div>
                ))}

              </div>

            )}

          </div>
          {/* Back Button */}

          <div className="mt-16 text-center">

            <Link
              href="/#artists"
              className="inline-block rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-white transition hover:bg-red-600"
            >
              Back To Artists
            </Link>

          </div>


        </section>

      </main>
  );
}