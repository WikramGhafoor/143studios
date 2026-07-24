import { artists } from "@/data/artists";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtistProfilePage({ params }: Props) {
  const { slug } = await params;

  const artist = artists.find(
    (artist) => artist.slug === slug
  );

  if (!artist) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Artist Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-5xl px-6 py-20">

        <h1 className="text-6xl font-black text-red-600">
          {artist.stageName}
        </h1>

        <p className="mt-4 text-2xl text-gray-300">
          {artist.artistType}
        </p>

        <p className="mt-8 text-lg text-gray-400">
          {artist.bio}
        </p>

      </div>

    </div>
  );
}