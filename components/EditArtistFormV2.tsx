"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { cleanSlug, optionalTitle, titleCase } from "@/lib/text-format";

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

const artistTypeOptions = [
  "Single Artist (Solo)", "Double Artist (Duo)", "Triple Artist (Trio)",
  "Quartet (4 Members)", "Quintet (5 Members)", "Sextet (6 Members)",
  "Septet (7 Members)", "Octet (8 Members)", "Nonet (9 Members)",
  "Band", "Music Group", "Choir", "Orchestra", "Rapper", "Singer/Rapper",
  "Songwriter", "Lyricist", "DJ", "Instrumentalist", "Vocalist", "Musician", "Performer",
  "Singer",
  "Writer",
  "Composer",
  "Producer",
  "Singer & Writer",
  "Singer & Composer",
  "Singer & Producer",
  "Writer & Composer",
  "Writer & Producer",
  "Composer & Producer",
  "Singer, Writer & Composer",
  "Singer, Writer & Producer",
  "Singer, Composer & Producer",
  "Writer, Composer & Producer",
  "Singer, Writer, Composer & Producer",
];

const genreOptions = [
  "Pop",
  "Hip-Hop",
  "Rap",
  "R&B",
  "Rock",
  "Folk",
  "Electronic",
  "Dance",
  "Classical",
  "Country",
  "Jazz",
  "Blues",
  "Soul",
  "Reggae",
  "World",
  "Punjabi",
  "Ghazal",
  "Qawwali",
  "Sufi",
  "Nasheed",
  "Lo-Fi",
  "Instrumental",
];

const cityOptions = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sheikhupura",
  "Sialkot",
];

const countryOptions = [
  "Pakistan",
  "India",
  "United Kingdom",
  "United States",
  "Canada",
  "United Arab Emirates",
  "Saudi Arabia",
  "Australia",
  "Bangladesh",
  "Germany",
];

type CustomArtistField =
  | "artist_type"
  | "genre"
  | "city"
  | "country";

const customFieldOptions: Record<
  CustomArtistField,
  string[]
> = {
  artist_type: artistTypeOptions,
  genre: genreOptions,
  city: cityOptions,
  country: countryOptions,
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

  const [customSelected, setCustomSelected] =
    useState<Record<CustomArtistField, boolean>>({
      artist_type: !!form.artist_type && !artistTypeOptions.includes(form.artist_type),
      genre: !!form.genre && !genreOptions.includes(form.genre),
      city: !!form.city && !cityOptions.includes(form.city),
      country: !!form.country && !countryOptions.includes(form.country),
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

  function handleCustomSelect(
    field: CustomArtistField,
    value: string
  ) {
    const isCustom = value === "Other";

    setCustomSelected((current) => ({
      ...current,
      [field]: isCustom,
    }));

    setForm((currentForm) => ({
      ...currentForm,
      [field]: isCustom ? "" : value,
    }));
  }

  function handleCustomInput(
    field: CustomArtistField,
    value: string
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "banner"
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please Select An Image File.");
      return;
    }

    setUploadingField(field);

    try {
      const url = await uploadToCloudinary(file, `${form.stage_name || "artist"}-${field}`);

      if (!url) {
        alert("Image Upload Failed.");
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
          : "Image Upload Failed."
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
      alert("Artist Code Is Required.");
      return;
    }

    if (!form.stage_name.trim()) {
      alert("Stage Name Is Required.");
      return;
    }

    setLoading(true);

    const payload = {
      artist_code: form.artist_code.trim(),
      stage_name: titleCase(form.stage_name),
      real_name: optionalTitle(form.real_name),
      artist_type: optionalTitle(form.artist_type),
      genre: optionalTitle(form.genre),
      city: optionalTitle(form.city),
      country: optionalTitle(form.country),
      bio: form.bio.trim() || null,
      image: form.image || null,
      banner: form.banner || null,
      slug: cleanSlug(form.stage_name),
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

    alert("Artist Updated Successfully.");

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

          <CustomSelectField


            label="Artist Type"


            field="artist_type"


            value={form.artist_type}


            customSelected={


              customSelected.artist_type


            }


            inputClass={inputClass}


            onSelect={handleCustomSelect}


            onCustomInput={


              handleCustomInput


            }


          />

          <CustomSelectField


            label="Genre"


            field="genre"


            value={form.genre}


            customSelected={


              customSelected.genre


            }


            inputClass={inputClass}


            onSelect={handleCustomSelect}


            onCustomInput={


              handleCustomInput


            }


          />

          <CustomSelectField


            label="City"


            field="city"


            value={form.city}


            customSelected={


              customSelected.city


            }


            inputClass={inputClass}


            onSelect={handleCustomSelect}


            onCustomInput={


              handleCustomInput


            }


          />

          <CustomSelectField


            label="Country"


            field="country"


            value={form.country}


            customSelected={


              customSelected.country


            }


            inputClass={inputClass}


            onSelect={handleCustomSelect}


            onCustomInput={


              handleCustomInput


            }


          />

          <input
            name="slug"
            value={form.slug}
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
                Uploading Profile Image...
              </p>
            )}

            {form.image && (
              <div className="relative mt-4 h-56 w-56 overflow-hidden rounded-2xl">
                <Image
                  src={form.image}
                  alt="Artist Profile Preview"
                  fill
                  sizes="224px"
                  unoptimized
                  className="object-cover"
                />
              </div>
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
                Uploading Banner...
              </p>
            )}

            {form.banner && (
              <div className="relative mt-4 h-56 w-full overflow-hidden rounded-2xl">
                <Image
                  src={form.banner}
                  alt="Artist Banner Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  className="object-cover"
                />
              </div>
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
              Verified By 143 Studios
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

type CustomSelectFieldProps = {
  label: string;
  field: CustomArtistField;
  value: string;
  customSelected: boolean;
  inputClass: string;
  onSelect: (
    field: CustomArtistField,
    value: string
  ) => void;
  onCustomInput: (
    field: CustomArtistField,
    value: string
  ) => void;
};

function CustomSelectField({
  label,
  field,
  value,
  customSelected,
  inputClass,
  onSelect,
  onCustomInput,
}: CustomSelectFieldProps) {
  return (
    <div>
      <select
        value={customSelected ? "Other" : value}
        onChange={(event) =>
          onSelect(field, event.target.value)
        }
        className={inputClass}
        aria-label={label}
      >
        <option value="">
          Select {label}
        </option>

        {customFieldOptions[field].map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}

        <option value="Other">
          Other
        </option>
      </select>

      {customSelected && (
        <input
          value={value}
          onChange={(event) =>
            onCustomInput(
              field,
              event.target.value
            )
          }
          placeholder={`Enter Other ${label}`}
          className={`${inputClass} mt-3`}
        />
      )}
    </div>
  );
}
