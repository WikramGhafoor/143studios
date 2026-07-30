import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import {
  SiApplemusic,
  SiYoutubemusic,
} from "react-icons/si";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type Artist = {
  id: number;
  artist_code: string | null;
  stage_name: string | null;
  artist_type: string | null;
  genre: string | null;
  city: string | null;
  country: string | null;
  bio: string | null;
  image: string | null;
  banner: string | null;
  slug: string | null;
  status: string | null;
  spotify: string | null;
  apple_music: string | null;
  youtube: string | null;
  youtube_music: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  website: string | null;
  created_at: string | null;
  verified: boolean | null;
  featured: boolean | null;
  real_name: string | null;
};

type ArtistRelease = {
  id: number;
  title: string | null;
  slug: string | null;
  cover: string | null;
  release_type: string | null;
  release_date: string | null;
  featured: boolean | null;
  spotify: string | null;
  apple_music: string | null;
  youtube: string | null;
  youtube_music: string | null;
};

function cleanMetadataDescription(
  bio: string | null,
  artistName: string
): string {
  const cleanBio = bio
    ?.replace(/\s+/g, " ")
    .trim();

  if (cleanBio) {
    return cleanBio.slice(0, 160);
  }

  return `${artistName} Is An Official Artist Of 143 Studios. Explore Their Profile, Music And Official Releases.`;
}

function formatDate(date: string | null): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getJoinedYear(date: string | null): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return String(parsedDate.getFullYear());
}

function isSafeExternalUrl(
  value: string | null
): value is string {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("artists")
    .select(`
      stage_name,
      artist_type,
      genre,
      bio,
      image,
      slug,
      status
    `)
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) {
    return {
      title: "Artist Not Found",
      description:
        "The Requested Artist Could Not Be Found On 143 Studios.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const artistName =
    data.stage_name?.trim() || "143 Studios Artist";

  const description = cleanMetadataDescription(
    data.bio,
    artistName
  );

  const image = data.image || "/og-image.jpg";

  const canonicalUrl =
    `https://143studios.online/artists/${data.slug}`;

  return {
    title: artistName,
    description,

    keywords: [
      artistName,
      data.artist_type?.trim() || "Artist",
      data.genre?.trim() || "Music",
      "143 Studios",
      "Official Artist",
      "Pakistan Music",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: `${artistName} | 143 Studios`,
      description,
      url: canonicalUrl,
      siteName: "143 Studios",
      type: "profile",
      images: [
        {
          url: image,
          alt: `${artistName} Artist Profile`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${artistName} | 143 Studios`,
      description,
      images: [image],
    },
  };
}

export default async function ArtistProfilePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const { data, error: artistError } =
    await supabase
      .from("artists")
      .select(`
        id,
        artist_code,
        stage_name,
        artist_type,
        genre,
        city,
        country,
        bio,
        image,
        banner,
        slug,
        status,
        spotify,
        apple_music,
        youtube,
        youtube_music,
        instagram,
        facebook,
        tiktok,
        website,
        created_at,
        verified,
        featured,
        real_name
      `)
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();

  if (artistError || !data) {
    notFound();
  }

  const artist = data as Artist;

  const {
    data: releaseData,
    error: releasesError,
  } = await supabase
    .from("releases")
    .select(`
      id,
      title,
      slug,
      cover,
      release_type,
      release_date,
      featured,
      spotify,
      apple_music,
      youtube,
      youtube_music
    `)
    .eq("artist_id", artist.id)
    .eq("status", "active")
    .order("featured", {
      ascending: false,
    })
    .order("sort_order", {
      ascending: true,
      nullsFirst: false,
    })
    .order("release_date", {
      ascending: false,
    });

  if (releasesError) {
    console.error(
      "Artist Releases Error:",
      releasesError
    );
  }

  const releases =
    (releaseData as ArtistRelease[] | null) ?? [];

  const artistName =
    artist.stage_name?.trim() || "Unnamed Artist";

  const artistType =
    artist.artist_type?.trim() || "Artist";

  const genres = artist.genre
    ? artist.genre
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean)
    : [];

  const location = [
    artist.city?.trim(),
    artist.country?.trim(),
  ]
    .filter(Boolean)
    .join(", ");

  const joinedYear = getJoinedYear(
    artist.created_at
  );

  const hasOfficialProfiles = [
    artist.spotify,
    artist.apple_music,
    artist.youtube,
    artist.youtube_music,
    artist.instagram,
    artist.facebook,
    artist.tiktok,
    artist.website,
  ].some(isSafeExternalUrl);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Banner */}
      <section className="relative h-[360px] w-full overflow-hidden sm:h-[420px]">
        {artist.banner ? (
          <Image
            src={artist.banner}
            alt={`${artistName} Banner`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-zinc-950" />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"
        />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold">
                143 Studios Artist
              </span>

              {artist.verified && (
                <span className="inline-flex items-center gap-2 rounded-full border border-red-500 bg-red-950/80 px-4 py-2 text-sm font-bold text-red-300">
                  <span aria-hidden="true">✓</span>
                  143 Studios Verified Artist
                </span>
              )}

              {artist.featured && (
                <span className="rounded-full border border-yellow-500 bg-yellow-950/80 px-4 py-2 text-sm font-bold text-yellow-300">
                  Featured Artist
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Artist Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-red-900 bg-zinc-950">
              {artist.image ? (
                <Image
                  src={artist.image}
                  alt={`${artistName} Artist Profile`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-gray-500">
                  No Artist Image Available
                </div>
              )}
            </div>
          </div>

          {/* Artist Information */}
          <div className="min-w-0 lg:col-span-2">
            <p className="break-words font-bold text-red-500">
              {artist.artist_code || "143 Studios"}
            </p>

            <h1 className="mt-3 break-words text-4xl font-black sm:text-5xl md:text-6xl">
              {artistName}
            </h1>

            <p className="mt-4 break-words text-2xl font-semibold text-red-500">
              {artistType}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {artist.real_name && (
                <InfoCard
                  label="Real Name"
                  value={artist.real_name}
                />
              )}

              {location && (
                <InfoCard
                  label="Location"
                  value={location}
                />
              )}

              {artist.artist_code && (
                <InfoCard
                  label="Artist Code"
                  value={artist.artist_code}
                />
              )}

              {joinedYear && (
                <InfoCard
                  label="On 143 Studios Since"
                  value={joinedYear}
                />
              )}
            </div>

            {genres.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-black">
                  Genres
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-red-600 bg-red-600/10 px-5 py-2 font-bold text-red-400"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Biography */}
        {artist.bio && (
          <ContentSection title="Biography">
            <p className="whitespace-pre-line text-lg leading-8 text-gray-300">
              {artist.bio}
            </p>
          </ContentSection>
        )}

        {/* Official Profiles */}
        {hasOfficialProfiles && (
          <ContentSection title="Official Profiles">
            <div className="flex flex-wrap gap-4">
              {isSafeExternalUrl(artist.spotify) && (
                <SocialButton
                  href={artist.spotify}
                  label="Spotify"
                  icon={<FaSpotify />}
                  className="border-green-600 text-green-400 hover:bg-green-600"
                />
              )}

              {isSafeExternalUrl(
                artist.apple_music
              ) && (
                <SocialButton
                  href={artist.apple_music}
                  label="Apple Music"
                  icon={<SiApplemusic />}
                  className="border-pink-600 text-pink-400 hover:bg-pink-600"
                />
              )}

              {isSafeExternalUrl(artist.youtube) && (
                <SocialButton
                  href={artist.youtube}
                  label="YouTube"
                  icon={<FaYoutube />}
                  className="border-red-600 text-red-400 hover:bg-red-600"
                />
              )}

              {isSafeExternalUrl(
                artist.youtube_music
              ) && (
                <SocialButton
                  href={artist.youtube_music}
                  label="YouTube Music"
                  icon={<SiYoutubemusic />}
                  className="border-red-700 text-red-300 hover:bg-red-700"
                />
              )}

              {isSafeExternalUrl(
                artist.instagram
              ) && (
                <SocialButton
                  href={artist.instagram}
                  label="Instagram"
                  icon={<FaInstagram />}
                  className="border-pink-500 text-pink-400 hover:bg-pink-600"
                />
              )}

              {isSafeExternalUrl(artist.facebook) && (
                <SocialButton
                  href={artist.facebook}
                  label="Facebook"
                  icon={<FaFacebook />}
                  className="border-blue-600 text-blue-400 hover:bg-blue-600"
                />
              )}

              {isSafeExternalUrl(artist.tiktok) && (
                <SocialButton
                  href={artist.tiktok}
                  label="TikTok"
                  icon={<FaTiktok />}
                  className="border-zinc-400 text-white hover:bg-white hover:text-black"
                />
              )}

              {isSafeExternalUrl(artist.website) && (
                <SocialButton
                  href={artist.website}
                  label="Website"
                  icon={<FaGlobe />}
                  className="border-gray-500 text-gray-300 hover:bg-gray-600"
                />
              )}
            </div>
          </ContentSection>
        )}

        {/* Releases */}
        <section className="mt-16 rounded-3xl border border-red-900 bg-zinc-950 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-black">
              Official Releases
            </h2>

            <span className="font-bold text-red-500">
              {releases.length}{" "}
              {releases.length === 1
                ? "Release"
                : "Releases"}
            </span>
          </div>

          {releasesError && (
            <p className="mt-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-red-400">
              Releases Could Not Be Loaded Right Now.
            </p>
          )}

          {!releasesError && releases.length > 0 ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {releases.map((release) => {
                const releaseTitle =
                  release.title?.trim() ||
                  "Untitled Release";

                const releaseHref = release.slug
                  ? `/releases/${release.slug}`
                  : null;

                const releaseDate = formatDate(
                  release.release_date
                );

                return (
                  <article
                    key={release.id}
                    className="group min-w-0 overflow-hidden rounded-2xl border border-red-900 bg-black transition duration-300 hover:-translate-y-1 hover:border-red-600"
                  >
                    {releaseHref ? (
                      <Link
                        href={releaseHref}
                        aria-label={`View ${releaseTitle}`}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset"
                      >
                        <ReleaseCover
                          cover={release.cover}
                          title={releaseTitle}
                        />
                      </Link>
                    ) : (
                      <ReleaseCover
                        cover={release.cover}
                        title={releaseTitle}
                      />
                    )}

                    <div className="p-5">
                      {release.featured && (
                        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                          Featured
                        </span>
                      )}

                      {releaseHref ? (
                        <Link
                          href={releaseHref}
                          className="transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        >
                          <h3 className="mt-4 break-words text-2xl font-black">
                            {releaseTitle}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="mt-4 break-words text-2xl font-black">
                          {releaseTitle}
                        </h3>
                      )}

                      <p className="mt-2 text-red-500">
                        {release.release_type?.trim() ||
                          "Release"}
                      </p>

                      {releaseDate && (
                        <p className="mt-2 text-sm text-gray-400">
                          {releaseDate}
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap gap-3">
                        {isSafeExternalUrl(
                          release.spotify
                        ) && (
                          <SmallLink
                            href={release.spotify}
                            label="Spotify"
                          />
                        )}

                        {isSafeExternalUrl(
                          release.apple_music
                        ) && (
                          <SmallLink
                            href={release.apple_music}
                            label="Apple Music"
                          />
                        )}

                        {isSafeExternalUrl(
                          release.youtube
                        ) && (
                          <SmallLink
                            href={release.youtube}
                            label="YouTube"
                          />
                        )}

                        {isSafeExternalUrl(
                          release.youtube_music
                        ) && (
                          <SmallLink
                            href={release.youtube_music}
                            label="YouTube Music"
                          />
                        )}
                      </div>

                      {releaseHref && (
                        <Link
                          href={releaseHref}
                          className="mt-6 inline-flex items-center font-bold text-red-500 transition-colors hover:text-red-400"
                        >
                          View Release

                          <span
                            aria-hidden="true"
                            className="ml-2 transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            !releasesError && (
              <p className="mt-6 text-lg text-gray-400">
                No Official Releases Available Yet.
              </p>
            )
          )}
        </section>

        {/* Back Button */}
        <div className="mt-16 text-center">
          <Link
            href="/artists"
            className="inline-block rounded-xl border-2 border-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            ← Back To Artists
          </Link>
        </div>
      </section>
    </div>
  );
}

function ReleaseCover({
  cover,
  title,
}: {
  cover: string | null;
  title: string;
}) {
  return (
    <div className="relative aspect-square overflow-hidden bg-zinc-900">
      {cover ? (
        <Image
          src={cover}
          alt={`${title} Cover Artwork`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-6 text-center text-gray-500">
          No Cover Artwork Available
        </div>
      )}
    </div>
  );
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16 rounded-3xl border border-red-900 bg-zinc-950 p-6 sm:p-8">
      <h2 className="text-3xl font-black">
        {title}
      </h2>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-red-900 bg-zinc-950 p-5">
      <h3 className="text-sm font-bold text-gray-500">
        {label}
      </h3>

      <p className="mt-2 break-words text-lg font-bold">
        {value}
      </p>
    </div>
  );
}

function SocialButton({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label}`}
      className={`inline-flex items-center gap-3 rounded-xl border px-5 py-3 font-bold transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${className}`}
    >
      <span
        aria-hidden="true"
        className="text-xl"
      >
        {icon}
      </span>

      <span>{label}</span>

      <span aria-hidden="true">↗</span>
    </a>
  );
}

function SmallLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label}`}
      className="rounded-lg border border-red-700 px-3 py-2 text-sm font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      {label} ↗
    </a>
  );
}