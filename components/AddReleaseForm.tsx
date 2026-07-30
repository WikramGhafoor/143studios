"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Artist = {
  id: number;
  stage_name: string | null;
};

type ReleaseFormState = {
  release_code: string;
  title: string;
  slug: string;
  artist_id: string;

  release_type: string;
  version: string;
  genre: string;
  language: string;
  release_date: string;

  cover: string;
  audio_url: string;
  duration: string;

  upc: string;
  isrc: string;

  label: string;

  copyright_c: string;
  copyright_p: string;

  description: string;
  lyrics: string;
  credits: string;

  status: string;
  featured: boolean;
  sort_order: number;

  spotify: string;
  apple_music: string;
  youtube: string;
  youtube_music: string;
};

const initialForm: ReleaseFormState = {
  release_code: "",
  title: "",
  slug: "",
  artist_id: "",

  release_type: "",
  version: "",
  genre: "",
  language: "",
  release_date: "",

  cover: "",
  audio_url: "",
  duration: "",

  upc: "",
  isrc: "",

  label: "143 Studios",

  copyright_c: "",
  copyright_p: "",

  description: "",
  lyrics: "",
  credits: "",

  status: "draft",
  featured: false,
  sort_order: 0,

  spotify: "",
  apple_music: "",
  youtube: "",
  youtube_music: "",
};

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500";

export default function AddReleaseForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [artistsLoading, setArtistsLoading] =
    useState(true);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [form, setForm] =
    useState<ReleaseFormState>(initialForm);

  useEffect(() => {
    let mounted = true;

    async function fetchArtists() {
      try {
        const { data, error } = await supabase
          .from("artists")
          .select("id, stage_name")
          .eq("status", "active")
          .order("stage_name", {
            ascending: true,
          });

        if (error) {
          console.error(
            "Load Artists Error:",
            error
          );

          if (mounted) {
            setArtists([]);
          }

          return;
        }

        if (mounted) {
          setArtists((data as Artist[] | null) ?? []);
        }
      } catch (error) {
        console.error(
          "Unexpected Load Artists Error:",
          error
        );

        if (mounted) {
          setArtists([]);
        }
      } finally {
        if (mounted) {
          setArtistsLoading(false);
        }
      }
    }

    void fetchArtists();

    return () => {
      mounted = false;
    };
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function uploadCover(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please Select A Valid Image File.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);

      if (!url) {
        alert("Cover Upload Failed.");
        return;
      }

      setForm((current) => ({
        ...current,
        cover: url,
      }));
    } catch (error) {
      console.error(
        "Cover Upload Error:",
        error
      );

      alert("Cover Upload Failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function saveRelease(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading || uploading) {
      return;
    }

    if (!form.release_code.trim()) {
      alert("Release Code Is Required.");
      return;
    }

    if (!form.title.trim()) {
      alert("Release Title Is Required.");
      return;
    }

    if (!form.slug.trim()) {
      alert("Slug Is Required.");
      return;
    }

    if (!form.artist_id) {
      alert("Please Select An Artist.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        release_code: form.release_code.trim(),
        title: form.title.trim(),
        slug: form.slug.trim(),
        artist_id: Number(form.artist_id),

        release_type:
          form.release_type.trim() || null,
        version: form.version.trim() || null,
        genre: form.genre.trim() || null,
        language: form.language.trim() || null,
        release_date: form.release_date || null,

        cover: form.cover || null,
        audio_url: form.audio_url.trim() || null,
        duration: form.duration.trim() || null,

        upc: form.upc.trim() || null,
        isrc: form.isrc.trim() || null,

        label:
          form.label.trim() || "143 Studios",

        copyright_c:
          form.copyright_c.trim() || null,
        copyright_p:
          form.copyright_p.trim() || null,

        description:
          form.description.trim() || null,
        lyrics: form.lyrics.trim() || null,
        credits: form.credits.trim() || null,

        status: form.status,
        featured: form.featured,
        sort_order:
          Number(form.sort_order) || 0,

        spotify: form.spotify.trim() || null,
        apple_music:
          form.apple_music.trim() || null,
        youtube: form.youtube.trim() || null,
        youtube_music:
          form.youtube_music.trim() || null,

        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("releases")
        .insert([payload]);

      if (error) {
        console.error(
          "Add Release Error:",
          error
        );

        alert(error.message);
        return;
      }

      alert("Release Added Successfully.");

      router.push("/admin/releases");
      router.refresh();
    } catch (error) {
      console.error(
        "Unexpected Add Release Error:",
        error
      );

      alert(
        "Release Could Not Be Added. Please Try Again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={saveRelease}
      className="space-y-8"
    >
      {/* Basic Information */}

      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Basic Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            name="release_code"
            value={form.release_code}
            onChange={handleChange}
            placeholder="Release Code — REL-0001"
            required
            className={inputClass}
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Release Title"
            required
            className={inputClass}
          />

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug — release-title"
            required
            className={inputClass}
          />

          <select
            name="artist_id"
            value={form.artist_id}
            onChange={handleChange}
            required
            disabled={artistsLoading}
            className={inputClass}
          >
            <option value="">
              {artistsLoading
                ? "Loading Artists..."
                : "Select Artist"}
            </option>

            {artists.map((artist) => (
              <option
                key={artist.id}
                value={artist.id}
              >
                {artist.stage_name ||
                  `Artist #${artist.id}`}
              </option>
            ))}
          </select>

          <select
            name="release_type"
            value={form.release_type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">
              Select Release Type
            </option>
            <option value="Single">Single</option>
            <option value="EP">EP</option>
            <option value="Album">Album</option>
            <option value="Compilation">
              Compilation
            </option>
            <option value="Live">Live</option>
            <option value="Remix">Remix</option>
          </select>

          <input
            name="version"
            value={form.version}
            onChange={handleChange}
            placeholder="Version — Original / Remix / Live"
            className={inputClass}
          />

          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Genre"
            className={inputClass}
          />

          <input
            name="language"
            value={form.language}
            onChange={handleChange}
            placeholder="Language"
            className={inputClass}
          />

          <input
            type="date"
            name="release_date"
            value={form.release_date}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration — 03:42"
            className={inputClass}
          />
        </div>
      </section>

      {/* Cover And Audio */}

      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Cover And Audio
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-bold">
              Release Cover
            </p>

            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={uploadCover}
              className={inputClass}
            />

            {uploading && (
              <p className="mt-3 text-yellow-400">
                Uploading Cover...
              </p>
            )}

            {form.cover && (
              <div className="relative mt-4 aspect-square w-full max-w-64 overflow-hidden rounded-2xl border border-red-900 bg-black">
                <Image
                  src={form.cover}
                  alt="Release Cover Preview"
                  fill
                  sizes="256px"
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 font-bold">
              Audio URL
            </p>

            <input
              name="audio_url"
              value={form.audio_url}
              onChange={handleChange}
              placeholder="Audio File URL"
              className={inputClass}
            />

            {form.audio_url && (
              <audio
                controls
                preload="none"
                src={form.audio_url}
                className="mt-5 w-full"
              >
                Your Browser Does Not Support Audio
                Playback.
              </audio>
            )}
          </div>
        </div>
      </section>

      {/* Distribution Metadata */}

      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Distribution Metadata
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            name="upc"
            value={form.upc}
            onChange={handleChange}
            placeholder="UPC"
            className={inputClass}
          />

          <input
            name="isrc"
            value={form.isrc}
            onChange={handleChange}
            placeholder="ISRC"
            className={inputClass}
          />

          <input
            name="label"
            value={form.label}
            onChange={handleChange}
            placeholder="Label"
            className={inputClass}
          />

          <input
            name="copyright_c"
            value={form.copyright_c}
            onChange={handleChange}
            placeholder="© Copyright Line"
            className={inputClass}
          />

          <input
            name="copyright_p"
            value={form.copyright_p}
            onChange={handleChange}
            placeholder="℗ Copyright Line"
            className={inputClass}
          />
        </div>
      </section>

      {/* Release Content */}

      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Release Content
        </h2>

        <div className="space-y-5">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Release Description"
            className={inputClass}
          />

          <textarea
            name="lyrics"
            value={form.lyrics}
            onChange={handleChange}
            rows={10}
            placeholder="Lyrics"
            className={inputClass}
          />

          <textarea
            name="credits"
            value={form.credits}
            onChange={handleChange}
            rows={6}
            placeholder="Credits — Singer, Lyricist, Composer, Producer..."
            className={inputClass}
          />
        </div>
      </section>

      {/* Streaming Links */}

      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Streaming Links
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            name="spotify"
            value={form.spotify}
            onChange={handleChange}
            placeholder="Spotify Release Link"
            className={inputClass}
          />

          <input
            name="apple_music"
            value={form.apple_music}
            onChange={handleChange}
            placeholder="Apple Music Release Link"
            className={inputClass}
          />

          <input
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
            placeholder="YouTube Release Link"
            className={inputClass}
          />

          <input
            name="youtube_music"
            value={form.youtube_music}
            onChange={handleChange}
            placeholder="YouTube Music Release Link"
            className={inputClass}
          />
        </div>
      </section>

      {/* Admin Settings */}

      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Admin Settings
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>

          <input
            type="number"
            name="sort_order"
            value={form.sort_order}
            onChange={handleChange}
            min={0}
            placeholder="Sort Order"
            className={inputClass}
          />
        </div>

        <label className="mt-5 flex items-center gap-3 rounded-xl border border-red-900 bg-black p-4">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                featured:
                  event.target.checked,
              }))
            }
            className="h-5 w-5"
          />

          <span className="font-bold">
            Featured Release
          </span>
        </label>
      </section>

      {/* Actions */}

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={
            loading ||
            uploading ||
            artistsLoading
          }
          className="rounded-xl bg-red-600 px-10 py-4 font-bold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving Release..."
            : uploading
              ? "Uploading Cover..."
              : artistsLoading
                ? "Loading Artists..."
                : "Save Release"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/releases")
          }
          disabled={loading || uploading}
          className="rounded-xl border border-zinc-700 px-10 py-4 font-bold text-gray-300 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}