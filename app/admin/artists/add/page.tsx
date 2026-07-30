"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function AddArtistPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<
    "image" | "banner" | null
  >(null);

  const [form, setForm] = useState({
    artist_code: "",
    stage_name: "",
    real_name: "",
    artist_type: "",
    genre: "",
    city: "",
    country: "",
    bio: "",
    image: "",
    banner: "",
    slug: "",
    status: "active",
    spotify: "",
    apple_music: "",
    youtube: "",
    youtube_music: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    website: "",
    verified: false,
    featured: false,
    sort_order: 0,
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

  async function saveArtist(e: React.FormEvent<HTMLFormElement>) {
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
      artist_type: form.artist_type.trim(),
      genre: form.genre.trim(),
      city: form.city.trim(),
      country: form.country.trim(),
      bio: form.bio.trim(),
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
      real_name: form.real_name.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("artists")
      .insert([payload]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Artist Added Successfully");

    router.push("/admin/artists");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition focus:border-red-600";

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-black">
          Add <span className="text-red-600">Artist</span>
        </h1>

        <p className="mt-3 text-gray-400">
          Create a complete 143 Studios artist profile.
        </p>

        <form
          onSubmit={saveArtist}
          className="mt-10 space-y-8"
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

          {/* MEDIA */}
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
                placeholder="Sort Order"
                min={0}
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

          <button
            type="submit"
            disabled={loading || uploadingField !== null}
            className="rounded-xl bg-red-600 px-10 py-4 font-bold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Saving Artist..."
              : uploadingField
                ? "Uploading Image..."
                : "Save Artist"}
          </button>
        </form>
      </div>
    </main>
  );
}