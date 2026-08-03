"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { cleanSlug, optionalTitle, titleCase } from "@/lib/text-format";

const artistOptions = {
  artist_type: [
    "Single Artist (Solo)", "Double Artist (Duo)", "Triple Artist (Trio)",
    "Quartet (4 Members)", "Quintet (5 Members)", "Sextet (6 Members)",
    "Septet (7 Members)", "Octet (8 Members)", "Nonet (9 Members)",
    "Band", "Music Group", "Choir", "Orchestra", "Singer", "Rapper",
    "Singer/Rapper", "Songwriter", "Composer", "Lyricist", "Producer",
    "DJ", "Instrumentalist", "Vocalist", "Musician", "Performer",
    "Writer/Composer/Singer/Rapper/Producer",
  ],
  genre: [
    "Alternative", "Ambient", "Blues", "Classical", "Country", "Dance",
    "Electronic", "Folk", "Ghazal", "Hip-Hop", "Hip-Hop/Rap", "Indie",
    "Instrumental", "Jazz", "Lo-Fi", "Nasheed", "Pop", "Punjabi",
    "Qawwali", "R&B", "Rap", "Rock", "Sad", "Sufi", "World",
  ],
  city: [
    "Faisalabad", "Gujranwala", "Islamabad", "Karachi", "Lahore",
    "Multan", "Peshawar", "Quetta", "Rawalpindi", "Sheikhupura", "Sialkot",
  ],
  country: [
    "Pakistan", "India", "Bangladesh", "United Arab Emirates", "Saudi Arabia",
    "United Kingdom", "United States", "Canada", "Australia", "Germany",
  ],
} as const;

type ArtistOptionField = keyof typeof artistOptions;

export default function AddArtistPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<
    "image" | "banner" | null
  >(null);
  const [otherFields, setOtherFields] = useState<Record<ArtistOptionField, boolean>>({
    artist_type: false,
    genre: false,
    city: false,
    country: false,
  });

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
      [name]: name === "stage_name" ? titleCase(value) : value,
      ...(name === "stage_name" ? { slug: cleanSlug(value) } : {}),
    }));
  }

  function handleOption(field: ArtistOptionField, value: string) {
    const isOther = value === "Other";
    setOtherFields((current) => ({ ...current, [field]: isOther }));
    setForm((current) => ({ ...current, [field]: isOther ? "" : value }));
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
      const url = await uploadToCloudinary(
        file,
        `${form.stage_name || "artist"}-${field}`
      );

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

    setLoading(true);

    const generatedSlug = cleanSlug(form.stage_name);

    const payload = {
      artist_code: form.artist_code.trim(),
      stage_name: titleCase(form.stage_name),
      artist_type: optionalTitle(form.artist_type),
      genre: optionalTitle(form.genre),
      city: optionalTitle(form.city),
      country: optionalTitle(form.country),
      bio: form.bio.trim() || null,
      image: form.image || null,
      banner: form.banner || null,
      slug: generatedSlug,
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
      real_name: optionalTitle(form.real_name),
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

              {(["artist_type", "genre", "city", "country"] as ArtistOptionField[]).map((field) => (
                <div key={field}>
                  <select
                    value={otherFields[field] ? "Other" : form[field]}
                    onChange={(event) => handleOption(field, event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select {titleCase(field.replace("_", " "))}</option>
                    {artistOptions[field].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {otherFields[field] && (
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={`Enter Other ${titleCase(field.replace("_", " "))}`}
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </div>
              ))}

              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="Slug — artist-stage-name"
                readOnly
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
                  <Image
                    src={form.image}
                    alt="Artist profile preview"
                    width={224}
                    height={224}
                    unoptimized
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
                  <Image
                    src={form.banner}
                    alt="Artist banner preview"
                    width={1200}
                    height={224}
                    unoptimized
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
