"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";

type Artist = {
  id: number;
  artist_code: string | null;
  stage_name: string | null;
  real_name: string | null;
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
  verified: boolean | null;
  featured: boolean | null;
  sort_order: number | null;
};

export default function EditArtistForm({
  artist,
}: {
  artist: Artist;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [uploadingField, setUploadingField] = useState<
    "image" | "banner" | null
  >(null);

  const [form, setForm] = useState({
    artist_code: artist.artist_code || "",
    stage_name: artist.stage_name || "",
    real_name: artist.real_name || "",
    artist_type: artist.artist_type || "",
    genre: artist.genre || "",
    city: artist.city || "",
    country: artist.country || "",
    bio: artist.bio || "",
    image: artist.image || "",
    banner: artist.banner || "",
    slug: artist.slug || "",
    status: artist.status || "active",
    spotify: artist.spotify || "",
    apple_music: artist.apple_music || "",
    youtube: artist.youtube || "",
    youtube_music: artist.youtube_music || "",
    instagram: artist.instagram || "",
    facebook: artist.facebook || "",
    tiktok: artist.tiktok || "",
    website: artist.website || "",
    verified: artist.verified || false,
    featured: artist.featured || false,
    sort_order: artist.sort_order || 0,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "banner"
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setUploadingField(field);

    try {
      const url = await uploadToCloudinary(file);

      if (!url) {
        alert("Image upload failed");
        return;
      }

      setForm((currentForm) => ({
        ...currentForm,
        [field]: url,
      }));
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );
    } finally {
      setUploadingField(null);
    }
  }

  async function updateArtist(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!form.artist_code.trim()) {
      alert("Artist Code is required");
      return;
    }

    if (!form.stage_name.trim()) {
      alert("Stage Name is required");
      return;
    }

    if (!form.slug.trim()) {
      alert("Slug is required");
      return;
    }

    setLoading(true);

    const payload = {
      artist_code: form.artist_code.trim(),
      stage_name: form.stage_name.trim(),
      real_name: form.real_name.trim() || null,
      artist_type: form.artist_type.trim() || null,
      genre: form.genre.trim() || null,
      city: form.city.trim() || null,
      country: form.country.trim() || null,
      bio: form.bio.trim() || null,
      image: form.image || null,
      banner: form.banner || null,
      slug: form.slug.trim(),
      status: form.status,
      spotify: form.spotify.trim() || null,
      apple_music: form.apple_music.trim() || null,
      youtube: form.youtube.trim() || null,
      youtube_music: form.youtube_music.trim() || null,
      instagram: form.instagram.trim() || null,
      facebook: form.facebook.trim() || null,
      tiktok: form.tiktok.trim() || null,
      website: form.website.trim() || null,
      verified: form.verified,
      featured: form.featured,
      sort_order: Number(form.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("artists")
      .update(payload)
      .eq("id", artist.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Artist Updated Successfully");

    router.push("/admin/artists");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition focus:border-red-600";

  return (
    <form
      onSubmit={updateArtist}
      className="space-y-8"
    >
      {/* BASIC INFORMATION */}
      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Basic Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            name="artist_code"
            value={form.artist_code}
            onChange={handleChange}
            placeholder="Artist Code — ART-0001"
            required
            className={inputClass}
          />

          <input
            name="stage_name"
            value={form.stage_name}
            onChange={handleChange}
            placeholder="Stage Name"
            required
            className={inputClass}
          />

          <input
            name="real_name"
            value={form.real_name}
            onChange={handleChange}
            placeholder="Real Name"
            className={inputClass}
          />

          <input
            name="artist_type"
            value={form.artist_type}
            onChange={handleChange}
            placeholder="Artist Type — Singer / Rapper / Producer"
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
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className={inputClass}
          />

          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className={inputClass}
          />

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug — artist-stage-name"
            required
            className={inputClass}
          />
        </div>

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={7}
          placeholder="Artist Biography"
          className={`${inputClass} mt-5`}
        />
      </section>

      {/* IMAGES */}
      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Images
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-bold">
              Artist Profile Image
            </p>

            <input
              type="file"
              accept="image/*"
              disabled={uploadingField !== null}
              onChange={(e) =>
                handleImageUpload(e, "image")
              }
              className={inputClass}
            />

            {uploadingField === "image" && (
              <p className="mt-3 text-yellow-400">
                Uploading profile image...
              </p>
            )}

            {form.image && (
              <img
                src={form.image}
                alt="Artist profile preview"
                className="mt-4 h-56 w-56 rounded-2xl object-cover"
              />
            )}
          </div>

          <div>
            <p className="mb-3 font-bold">
              Artist Banner
            </p>

            <input
              type="file"
              accept="image/*"
              disabled={uploadingField !== null}
              onChange={(e) =>
                handleImageUpload(e, "banner")
              }
              className={inputClass}
            />

            {uploadingField === "banner" && (
              <p className="mt-3 text-yellow-400">
                Uploading banner...
              </p>
            )}

            {form.banner && (
              <img
                src={form.banner}
                alt="Artist banner preview"
                className="mt-4 h-56 w-full rounded-2xl object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* MUSIC PROFILES */}
      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Music Profiles
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            name="spotify"
            value={form.spotify}
            onChange={handleChange}
            placeholder="Spotify Profile Link"
            className={inputClass}
          />

          <input
            name="apple_music"
            value={form.apple_music}
            onChange={handleChange}
            placeholder="Apple Music Profile Link"
            className={inputClass}
          />

          <input
            name="youtube"
            value={form.youtube}
            onChange={handleChange}
            placeholder="YouTube Channel Link"
            className={inputClass}
          />

          <input
            name="youtube_music"
            value={form.youtube_music}
            onChange={handleChange}
            placeholder="YouTube Music Profile Link"
            className={inputClass}
          />
        </div>
      </section>

      {/* SOCIAL PROFILES */}
      <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
        <h2 className="mb-6 text-2xl font-black">
          Social Profiles
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <input
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            placeholder="Instagram Profile Link"
            className={inputClass}
          />

          <input
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            placeholder="Facebook Profile Link"
            className={inputClass}
          />

          <input
            name="tiktok"
            value={form.tiktok}
            onChange={handleChange}
            placeholder="TikTok Profile Link"
            className={inputClass}
          />

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Official Website Link"
            className={inputClass}
          />
        </div>
      </section>

      {/* ADMIN SETTINGS */}
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

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-red-900 bg-black p-4">
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(e) =>
                setForm((currentForm) => ({
                  ...currentForm,
                  verified: e.target.checked,
                }))
              }
              className="h-5 w-5"
            />

            <span className="font-bold">
              Verified by 143 Studios
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-red-900 bg-black p-4">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm((currentForm) => ({
                  ...currentForm,
                  featured: e.target.checked,
                }))
              }
              className="h-5 w-5"
            />

            <span className="font-bold">
              Featured Artist
            </span>
          </label>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={loading || uploadingField !== null}
          className="rounded-xl bg-red-600 px-10 py-4 font-bold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Updating Artist..."
            : uploadingField
              ? "Uploading Image..."
              : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/artists")}
          disabled={loading || uploadingField !== null}
          className="rounded-xl border border-zinc-700 px-10 py-4 font-bold text-gray-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

