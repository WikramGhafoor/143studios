import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import {
  SiApplemusic,
  SiYoutubemusic,
} from "react-icons/si";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ReleaseArtist = {
  id: number;
  artist_code: string | null;
  stage_name: string | null;
  slug: string | null;
  image: string | null;
  verified: boolean | null;
  status: string | null;
};

type Release = {
  id: number;
  release_code: string | null;
  title: string | null;
  slug: string | null;
  artist_id: number | null;
  release_type: string | null;
  version: string | null;
  genre: string | null;
  language: string | null;
  release_date: string | null;
  cover: string | null;
  audio_url: string | null;
  duration: string | null;
  upc: string | null;
  isrc: string | null;
  label: string | null;
  copyright_c: string | null;
  copyright_p: string | null;
  description: string | null;
  lyrics: string | null;
  credits: string | null;
  featured: boolean | null;
  spotify: string | null;
  apple_music: string | null;
  youtube: string | null;
  youtube_music: string | null;
  artists: ReleaseArtist | ReleaseArtist[] | null;
};

type RelatedRelease = {
  id: number;
  title: string | null;
  slug: string | null;
  cover: string | null;
  release_type: string | null;
  release_date: string | null;
  featured: boolean | null;
};

function getArtist(
  artists: Release["artists"]
): ReleaseArtist | null {
  if (!artists) {
    return null;
  }

  if (Array.isArray(artists)) {
    return artists[0] ?? null;
  }

  return artists;
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

function getDescription(
  title: string,
  artistName: string,
  description: string | null
): string {
  const cleanDescription = description
    ?.replace(/\s+/g, " ")
    .trim();

  if (cleanDescription) {
    return cleanDescription.slice(0, 160);
  }

  return `${title} By ${artistName}. Official Music Release From 143 Studios.`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("releases")
    .select(`
      title,
      slug,
      cover,
      description,
      status,
      artists (
        stage_name,
        status
      )
    `)
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) {
    return {
      title: "Release Not Found",
      description:
        "The Requested Release Could Not Be Found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const artistData = Array.isArray(data.artists)
    ? data.artists[0]
    : data.artists;

  if (
    !artistData ||
    artistData.status !== "active"
  ) {
    return {
      title: "Release Not Found",
      description:
        "The Requested Release Could Not Be Found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    data.title?.trim() || "143 Studios Release";

  const artistName =
    artistData.stage_name?.trim() || "143 Studios";

  const description = getDescription(
    title,
    artistName,
    data.description
  );

  const image = data.cover || "/og-image.jpg";
  const canonicalUrl = `https://143studios.online/releases/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "143 Studios",
      type: "music.song",
      images: [
        {
          url: image,
          alt: `${title} Cover Artwork`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ReleasePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("releases")
    .select(`
      id,
      release_code,
      title,
      slug,
      artist_id,
      release_type,
      version,
      genre,
      language,
      release_date,
      cover,
      audio_url,
      duration,
      upc,
      isrc,
      label,
      copyright_c,
      copyright_p,
      description,
      lyrics,
      credits,
      featured,
      spotify,
      apple_music,
      youtube,
      youtube_music,
      artists (
        id,
        artist_code,
        stage_name,
        slug,
        image,
        verified,
        status
      )
    `)
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const release = data as Release;
  const artist = getArtist(release.artists);

  if (!artist || artist.status !== "active") {
    notFound();
  }

  const releaseTitle =
    release.title?.trim() || "Untitled Release";

  const artistName =
    artist.stage_name?.trim() || "Unknown Artist";

  const artistHref = artist.slug
    ? `/artists/${artist.slug}`
    : null;

  const formattedDate = formatDate(
    release.release_date
  );

  let relatedReleases: RelatedRelease[] = [];

  if (release.artist_id) {
    const { data: relatedData, error: relatedError } =
      await supabase
        .from("releases")
        .select(`
          id,
          title,
          slug,
          cover,
          release_type,
          release_date,
          featured
        `)
        .eq("artist_id", release.artist_id)
        .eq("status", "active")
        .neq("id", release.id)
        .order("featured", {
          ascending: false,
        })
        .order("sort_order", {
          ascending: true,
          nullsFirst: false,
        })
        .order("release_date", {
          ascending: false,
        })
        .limit(6);

    if (relatedError) {
      console.error(
        "Related Releases Error:",
        relatedError
      );
    } else {
      relatedReleases =
        (relatedData as RelatedRelease[] | null) ?? [];
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Cover */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-red-900 bg-zinc-950">
              {release.cover ? (
                <Image
                  src={release.cover}
                  alt={`${releaseTitle} Cover Artwork`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-gray-500">
                  No Release Cover Available
                </div>
              )}
            </div>
          </div>

          {/* Release Information */}
          <div className="flex min-w-0 flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold">
                {release.release_type?.trim() ||
                  "Release"}
              </span>

              {release.version && (
                <span className="rounded-full border border-red-700 px-4 py-2 text-sm font-bold text-red-400">
                  {release.version}
                </span>
              )}

              {release.featured && (
                <span className="rounded-full border border-yellow-500 bg-yellow-950 px-4 py-2 text-sm font-bold text-yellow-300">
                  Featured
                </span>
              )}
            </div>

            {release.release_code && (
              <p className="mt-7 break-words font-bold text-red-500">
                {release.release_code}
              </p>
            )}

            <h1 className="mt-3 break-words text-4xl font-black sm:text-5xl md:text-6xl">
              {releaseTitle}
            </h1>

            {artistHref ? (
              <Link
                href={artistHref}
                className="mt-5 inline-flex w-fit flex-wrap items-center gap-3 text-2xl font-bold text-red-500 transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <span>{artistName}</span>

                {artist.verified && (
                  <VerifiedBadge />
                )}
              </Link>
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-3 text-2xl font-bold text-red-500">
                <span>{artistName}</span>

                {artist.verified && (
                  <VerifiedBadge />
                )}
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {formattedDate && (
                <InfoCard
                  label="Release Date"
                  value={formattedDate}
                />
              )}

              {release.genre && (
                <InfoCard
                  label="Genre"
                  value={release.genre}
                />
              )}

              {release.language && (
                <InfoCard
                  label="Language"
                  value={release.language}
                />
              )}

              {release.duration && (
                <InfoCard
                  label="Duration"
                  value={release.duration}
                />
              )}

              {release.label && (
                <InfoCard
                  label="Label"
                  value={release.label}
                />
              )}

              {release.isrc && (
                <InfoCard
                  label="ISRC"
                  value={release.isrc}
                />
              )}

              {release.upc && (
                <InfoCard
                  label="UPC"
                  value={release.upc}
                />
              )}

              {artist.artist_code && (
                <InfoCard
                  label="Artist Code"
                  value={artist.artist_code}
                />
              )}
            </div>

            {/* Streaming Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              {isSafeExternalUrl(release.spotify) && (
                <PlatformButton
                  href={release.spotify}
                  label="Spotify"
                  icon={<FaSpotify />}
                  className="border-green-600 text-green-400 hover:bg-green-600"
                />
              )}

              {isSafeExternalUrl(
                release.apple_music
              ) && (
                <PlatformButton
                  href={release.apple_music}
                  label="Apple Music"
                  icon={<SiApplemusic />}
                  className="border-pink-600 text-pink-400 hover:bg-pink-600"
                />
              )}

              {isSafeExternalUrl(release.youtube) && (
                <PlatformButton
                  href={release.youtube}
                  label="YouTube"
                  icon={<FaYoutube />}
                  className="border-red-600 text-red-400 hover:bg-red-600"
                />
              )}

              {isSafeExternalUrl(
                release.youtube_music
              ) && (
                <PlatformButton
                  href={release.youtube_music}
                  label="YouTube Music"
                  icon={<SiYoutubemusic />}
                  className="border-red-700 text-red-300 hover:bg-red-700"
                />
              )}
            </div>

            {/* Audio Preview */}
            {isSafeExternalUrl(release.audio_url) && (
              <div className="mt-10 rounded-2xl border border-red-900 bg-zinc-950 p-5">
                <p className="mb-4 font-bold text-red-500">
                  Listen Preview
                </p>

                <audio
                  controls
                  controlsList="nodownload"
                  preload="none"
                  src={release.audio_url}
                  className="w-full"
                >
                  Your Browser Does Not Support Audio
                  Playback.
                </audio>
              </div>
            )}
          </div>
        </div>

        {release.description && (
          <ContentSection title="About This Release">
            <p className="whitespace-pre-line text-lg leading-8 text-gray-300">
              {release.description}
            </p>
          </ContentSection>
        )}

        {release.lyrics && (
          <ContentSection title="Lyrics">
            <div className="whitespace-pre-line text-lg leading-9 text-gray-300">
              {release.lyrics}
            </div>
          </ContentSection>
        )}

        {release.credits && (
          <ContentSection title="Credits">
            <div className="whitespace-pre-line text-lg leading-8 text-gray-300">
              {release.credits}
            </div>
          </ContentSection>
        )}

        {(release.copyright_c ||
          release.copyright_p) && (
          <ContentSection title="Copyright Information">
            <div className="space-y-3 text-gray-300">
              {release.copyright_c && (
                <p>{release.copyright_c}</p>
              )}

              {release.copyright_p && (
                <p>{release.copyright_p}</p>
              )}
            </div>
          </ContentSection>
        )}

        {/* Related Releases */}
        <section className="mt-16 rounded-3xl border border-red-900 bg-zinc-950 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="break-words text-3xl font-black">
              More From {artistName}
            </h2>

            {artistHref && (
              <Link
                href={artistHref}
                className="font-bold text-red-500 transition-colors hover:text-red-400"
              >
                View Artist Profile →
              </Link>
            )}
          </div>

          {relatedReleases.length > 0 ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {relatedReleases.map((item) => {
                const itemTitle =
                  item.title?.trim() ||
                  "Untitled Release";

                const itemHref = item.slug
                  ? `/releases/${item.slug}`
                  : null;

                const itemDate = formatDate(
                  item.release_date
                );

                const cardContent = (
                  <>
                    <div className="relative aspect-square overflow-hidden bg-zinc-900">
                      {item.cover ? (
                        <Image
                          src={item.cover}
                          alt={`${itemTitle} Cover Artwork`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center px-5 text-center text-gray-500">
                          No Cover Available
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      {item.featured && (
                        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                          Featured
                        </span>
                      )}

                      <h3 className="mt-4 break-words text-2xl font-black">
                        {itemTitle}
                      </h3>

                      <p className="mt-2 text-red-500">
                        {item.release_type?.trim() ||
                          "Release"}
                      </p>

                      {itemDate && (
                        <p className="mt-2 text-sm text-gray-400">
                          {itemDate}
                        </p>
                      )}

                      {itemHref && (
                        <div className="mt-5 font-bold text-red-500">
                          View Release →
                        </div>
                      )}
                    </div>
                  </>
                );

                return itemHref ? (
                  <Link
                    key={item.id}
                    href={itemHref}
                    aria-label={`View ${itemTitle}`}
                    className="group overflow-hidden rounded-2xl border border-red-900 bg-black transition duration-300 hover:-translate-y-1 hover:border-red-600"
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-red-900 bg-black"
                  >
                    {cardContent}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="mt-6 text-gray-400">
              No Other Active Releases Available.
            </p>
          )}
        </section>

        <div className="mt-16 text-center">
          <Link
            href="/releases"
            className="inline-block rounded-xl border-2 border-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            ← Back To Releases
          </Link>
        </div>
      </section>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="rounded-full border border-red-600 bg-red-950 px-3 py-1 text-xs font-bold text-red-300">
      ✓ Verified Artist
    </span>
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

      <div className="mt-6">{children}</div>
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

      <p className="mt-2 break-words text-lg font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function PlatformButton({
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