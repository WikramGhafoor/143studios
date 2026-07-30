"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Artist = {
  id: number;
  stage_name: string;
};

export default function AddReleaseForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [artists, setArtists] = useState<Artist[]>([]);

  const [form, setForm] = useState({
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
  });

  useEffect(() => {
    loadArtists();
  }, []);

  async function loadArtists() {
    const { data } = await supabase
      .from("artists")
      .select("id, stage_name")
      .eq("status", "active")
      .order("stage_name");

    if (data) setArtists(data);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function uploadCover(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const url = await uploadToCloudinary(file);

    setUploading(false);

    if (!url) {
      alert("Cover upload failed");
      return;
    }

    setForm((current) => ({
      ...current,
      cover: url,
    }));
  }

  const inputClass =
    "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white";
      async function saveRelease(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!form.release_code.trim()) {
      alert("Release Code is required");
      return;
    }

    if (!form.title.trim()) {
      alert("Release Title is required");
      return;
    }

    if (!form.slug.trim()) {
      alert("Slug is required");
      return;
    }

    if (!form.artist_id) {
      alert("Please select an artist");
      return;
    }

    setLoading(true);

    const payload = {
      release_code: form.release_code.trim(),
      title: form.title.trim(),
      slug: form.slug.trim(),
      artist_id: Number(form.artist_id),

      release_type: form.release_type.trim() || null,
      version: form.version.trim() || null,
      genre: form.genre.trim() || null,
      language: form.language.trim() || null,
      release_date: form.release_date || null,

      cover: form.cover || null,
      audio_url: form.audio_url.trim() || null,
      duration: form.duration.trim() || null,

      upc: form.upc.trim() || null,
      isrc: form.isrc.trim() || null,

      label: form.label.trim() || "143 Studios",

      copyright_c: form.copyright_c.trim() || null,
      copyright_p: form.copyright_p.trim() || null,

      description: form.description.trim() || null,
      lyrics: form.lyrics.trim() || null,
      credits: form.credits.trim() || null,

      status: form.status,
      featured: form.featured,
      sort_order: Number(form.sort_order) || 0,

      spotify: form.spotify.trim() || null,
      apple_music: form.apple_music.trim() || null,
      youtube: form.youtube.trim() || null,
      youtube_music: form.youtube_music.trim() || null,

      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("releases")
      .insert([payload]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Release Added Successfully");

    router.push("/admin/releases");
    router.refresh();
  }

  return (
    <form
      onSubmit={saveRelease}
      className="space-y-8"
    >
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
            className={inputClass}
          >
            <option value="">
              Select Artist
            </option>

            {artists.map((artist) => (
              <option
                key={artist.id}
                value={artist.id}
              >
                {artist.stage_name}
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
            <option value="Compilation">Compilation</option>
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

      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Cover and Audio
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
                Uploading cover...
              </p>
            )}

            {form.cover && (
              <img
                src={form.cover}
                alt="Release cover preview"
                className="mt-4 h-64 w-64 rounded-2xl object-cover"
              />
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
                src={form.audio_url}
                className="mt-5 w-full"
              />
            )}
          </div>
        </div>
      </section>

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
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                featured: e.target.checked,
              }))
            }
            className="h-5 w-5"
          />

          <span className="font-bold">
            Featured Release
          </span>
        </label>
      </section>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-xl bg-red-600 px-10 py-4 font-bold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving Release..."
            : uploading
              ? "Uploading Cover..."
              : "Save Release"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/releases")}
          disabled={loading || uploading}
          className="rounded-xl border border-zinc-700 px-10 py-4 font-bold text-gray-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}