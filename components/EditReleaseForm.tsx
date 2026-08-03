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
  status: string | null;
  featured: boolean | null;
  sort_order: number | null;
  spotify: string | null;
  apple_music: string | null;
  youtube: string | null;
  youtube_music: string | null;
  song_type: string | null;
  content_advisory: string | null;
  subgenre: string | null;
};

type CustomField =
  | "release_type"
  | "song_type"
  | "version"
  | "genre"
  | "subgenre"
  | "language"
  | "content_advisory"
  | "label";

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition focus:border-red-600";

const fieldOptions: Record<CustomField, string[]> = {
  release_type: [
    "Single",
    "EP",
    "Album",
    "Compilation",
    "Live",
    "Remix",
  ],
  song_type: [
    "Original",
    "Remix",
    "Acoustic",
    "Instrumental",
    "Cover",
    "Live",
    "Karaoke",
    "Demo",
  ],
  version: [
    "Original Version",
    "Radio Edit",
    "Extended Version",
    "Acoustic Version",
    "Live Version",
    "Remix Version",
    "Instrumental Version",
    "Clean Version",
    "Explicit Version",
  ],
  genre: [
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
    "Soundtrack",
  ],
  subgenre: [
    "Punjabi Hip-Hop",
    "Punjabi Rap",
    "Desi Hip-Hop",
    "Trap",
    "Boom Bap",
    "Lo-Fi Hip-Hop",
    "Alternative Pop",
    "Indie Pop",
    "Synth-Pop",
    "Dance-Pop",
    "Pop Rock",
    "Soft Rock",
    "Punjabi Folk",
    "Urdu Pop",
    "Devotional",
  ],
  language: [
    "Punjabi",
    "Urdu",
    "English",
    "Hindi",
    "Saraiki",
    "Pashto",
    "Sindhi",
    "Balochi",
    "Arabic",
    "Instrumental",
    "Multilingual",
  ],
  content_advisory: [
    "None",
    "Clean",
    "Explicit",
  ],
  label: [
    "143 Studios",
    "Independent",
  ],
};

function isOtherValue(
  field: CustomField,
  value: string
) {
  return (
    value !== "" &&
    !fieldOptions[field].includes(value)
  );
}

export default function EditReleaseForm({
  release,
}: {
  release: Release;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] =
    useState(false);
  const [uploadingAudio, setUploadingAudio] =
    useState(false);
  const [artistsLoading, setArtistsLoading] =
    useState(true);
  const [artists, setArtists] = useState<Artist[]>([]);

  const [form, setForm] = useState({
    release_code: release.release_code || "",
    title: release.title || "",
    slug: release.slug || "",
    artist_id: release.artist_id
      ? String(release.artist_id)
      : "",
    release_type: release.release_type || "",
    song_type: release.song_type || "",
    version: release.version || "",
    genre: release.genre || "",
    subgenre: release.subgenre || "",
    language: release.language || "",
    content_advisory:
      release.content_advisory || "",
    release_date: release.release_date || "",
    cover: release.cover || "",
    audio_url: release.audio_url || "",
    duration: release.duration || "",
    upc: release.upc || "",
    isrc: release.isrc || "",
    label: release.label || "143 Studios",
    copyright_c: release.copyright_c || "",
    copyright_p: release.copyright_p || "",
    description: release.description || "",
    lyrics: release.lyrics || "",
    credits: release.credits || "",
    status: release.status || "draft",
    featured: release.featured ?? false,
    sort_order: release.sort_order ?? 0,
    spotify: release.spotify || "",
    apple_music: release.apple_music || "",
    youtube: release.youtube || "",
    youtube_music: release.youtube_music || "",
  });

  const [otherSelected, setOtherSelected] =
    useState<Record<CustomField, boolean>>({
      release_type: isOtherValue(
        "release_type",
        release.release_type || ""
      ),
      song_type: isOtherValue(
        "song_type",
        release.song_type || ""
      ),
      version: isOtherValue(
        "version",
        release.version || ""
      ),
      genre: isOtherValue(
        "genre",
        release.genre || ""
      ),
      subgenre: isOtherValue(
        "subgenre",
        release.subgenre || ""
      ),
      language: isOtherValue(
        "language",
        release.language || ""
      ),
      content_advisory: isOtherValue(
        "content_advisory",
        release.content_advisory || ""
      ),
      label: isOtherValue(
        "label",
        release.label || "143 Studios"
      ),
    });

  useEffect(() => {
    let mounted = true;

    async function loadArtists() {
      try {
        const { data, error } = await supabase
          .from("artists")
          .select("id, stage_name")
          .eq("status", "active")
          .order("stage_name", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        if (mounted) {
          setArtists(
            (data as Artist[] | null) ?? []
          );
        }
      } catch (error) {
        console.error(
          "Load Artists Error:",
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

    void loadArtists();

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

  function handleSelectChange(
    field: CustomField,
    value: string
  ) {
    const selectedOther = value === "Other";

    setOtherSelected((current) => ({
      ...current,
      [field]: selectedOther,
    }));

    setForm((current) => ({
      ...current,
      [field]: selectedOther ? "" : value,
    }));
  }

  function handleOtherChange(
    field: CustomField,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
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

    setUploadingCover(true);

    try {
      const url = await uploadToCloudinary(file);

      if (!url) {
        throw new Error("Cover Upload Failed.");
      }

      setForm((current) => ({
        ...current,
        cover: url,
      }));
    } catch (error) {
      console.error("Cover Upload Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Cover Upload Failed."
      );
    } finally {
      setUploadingCover(false);
      event.target.value = "";
    }
  }

  async function uploadAudio(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("audio/")) {
      alert("Please Select A Valid Audio File.");
      event.target.value = "";
      return;
    }

    const maximumSize = 100 * 1024 * 1024;

    if (file.size > maximumSize) {
      alert(
        "Audio File Must Be Smaller Than 100 MB."
      );
      event.target.value = "";
      return;
    }

    setUploadingAudio(true);

    try {
      const prepareResponse = await fetch(
        "/api/admin/upload-audio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          }),
        }
      );

      const prepareText =
        await prepareResponse.text();

      let preparation: {
        success?: boolean;
        message?: string;
        workerUrl?: string;
        key?: string;
        expires?: number;
        signature?: string;
        publicUrl?: string;
      };

      try {
        preparation = JSON.parse(prepareText);
      } catch {
        throw new Error(
          prepareText ||
            "Upload Preparation Failed."
        );
      }

      if (
        !prepareResponse.ok ||
        !preparation.success ||
        !preparation.workerUrl ||
        !preparation.key ||
        !preparation.expires ||
        !preparation.signature ||
        !preparation.publicUrl
      ) {
        throw new Error(
          preparation.message ||
            "Upload Preparation Failed."
        );
      }

      const uploadResponse = await fetch(
        preparation.workerUrl,
        {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "X-Upload-Key": preparation.key,
            "X-Upload-Expires": String(
              preparation.expires
            ),
            "X-Upload-Signature":
              preparation.signature,
            "X-Upload-Size": String(file.size),
          },
          body: file,
        }
      );

      const uploadText =
        await uploadResponse.text();

      let uploadResult: {
        success?: boolean;
        message?: string;
        url?: string;
      };

      try {
        uploadResult = JSON.parse(uploadText);
      } catch {
        throw new Error(
          uploadText ||
            "Audio Could Not Be Uploaded."
        );
      }

      if (
        !uploadResponse.ok ||
        !uploadResult.success
      ) {
        throw new Error(
          uploadResult.message ||
            "Audio Could Not Be Uploaded To R2."
        );
      }

      setForm((current) => ({
        ...current,
        audio_url:
          uploadResult.url ||
          preparation.publicUrl ||
          "",
      }));

      alert("Audio Uploaded Successfully.");
    } catch (error) {
      console.error("Audio Upload Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Audio Upload Failed."
      );
    } finally {
      setUploadingAudio(false);
      event.target.value = "";
    }
  }

  async function updateRelease(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      loading ||
      uploadingCover ||
      uploadingAudio
    ) {
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
        audio_url:
          form.audio_url.trim() || null,
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
        song_type:
          form.song_type.trim() || null,
        content_advisory:
          form.content_advisory.trim() || null,
        subgenre:
          form.subgenre.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("releases")
        .update(payload)
        .eq("id", release.id);

      if (error) {
        throw error;
      }

      alert("Release Updated Successfully.");

      router.push("/admin/releases");
      router.refresh();
    } catch (error) {
      console.error(
        "Update Release Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Release Could Not Be Updated."
      );
    } finally {
      setLoading(false);
    }
  }

  const busy =
    loading ||
    uploadingCover ||
    uploadingAudio;

  return (
    <form
      onSubmit={updateRelease}
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

          <CustomSelectField
            label="Release Type"
            field="release_type"
            value={form.release_type}
            otherSelected={
              otherSelected.release_type
            }
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
          />

          <CustomSelectField
            label="Song Type"
            field="song_type"
            value={form.song_type}
            otherSelected={
              otherSelected.song_type
            }
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
          />

          <CustomSelectField
            label="Version"
            field="version"
            value={form.version}
            otherSelected={otherSelected.version}
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
          />

          <CustomSelectField
            label="Genre"
            field="genre"
            value={form.genre}
            otherSelected={otherSelected.genre}
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
          />

          <CustomSelectField
            label="Subgenre"
            field="subgenre"
            value={form.subgenre}
            otherSelected={
              otherSelected.subgenre
            }
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
          />

          <CustomSelectField
            label="Language"
            field="language"
            value={form.language}
            otherSelected={
              otherSelected.language
            }
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
          />

          <CustomSelectField
            label="Content Advisory"
            field="content_advisory"
            value={form.content_advisory}
            otherSelected={
              otherSelected.content_advisory
            }
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
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
              disabled={busy}
              onChange={uploadCover}
              className={inputClass}
            />

            {uploadingCover && (
              <p className="mt-3 text-yellow-400">
                Uploading Cover...
              </p>
            )}

            {form.cover && (
              <div className="relative mt-4 h-64 w-64 overflow-hidden rounded-2xl border border-red-900 bg-black">
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
              Audio File
            </p>

            <input
              type="file"
              accept="audio/*"
              disabled={busy}
              onChange={uploadAudio}
              className={inputClass}
            />

            {uploadingAudio && (
              <p className="mt-3 text-yellow-400">
                Uploading Audio...
              </p>
            )}

            <input
              name="audio_url"
              value={form.audio_url}
              onChange={handleChange}
              placeholder="Audio File URL"
              className={`${inputClass} mt-4`}
            />

            {form.audio_url && (
              <audio
                controls
                preload="none"
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

          <CustomSelectField
            label="Label"
            field="label"
            value={form.label}
            otherSelected={otherSelected.label}
            onSelect={handleSelectChange}
            onOtherChange={handleOtherChange}
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
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                featured: event.target.checked,
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
          disabled={busy || artistsLoading}
          className="rounded-xl bg-red-600 px-10 py-4 font-bold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Updating Release..."
            : uploadingCover
              ? "Uploading Cover..."
              : uploadingAudio
                ? "Uploading Audio..."
                : artistsLoading
                  ? "Loading Artists..."
                  : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/releases")
          }
          disabled={busy}
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
  field: CustomField;
  value: string;
  otherSelected: boolean;
  onSelect: (
    field: CustomField,
    value: string
  ) => void;
  onOtherChange: (
    field: CustomField,
    value: string
  ) => void;
};

function CustomSelectField({
  label,
  field,
  value,
  otherSelected,
  onSelect,
  onOtherChange,
}: CustomSelectFieldProps) {
  return (
    <div>
      <select
        value={otherSelected ? "Other" : value}
        onChange={(event) =>
          onSelect(field, event.target.value)
        }
        className={inputClass}
        aria-label={label}
      >
        <option value="">
          Select {label}
        </option>

        {fieldOptions[field].map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

        <option value="Other">Other</option>
      </select>

      {otherSelected && (
        <input
          value={value}
          onChange={(event) =>
            onOtherChange(
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
