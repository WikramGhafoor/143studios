"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { cleanSlug, optionalTitle, titleCase } from "@/lib/text-format";

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
  song_type: string;
  version: string;
  genre: string;
  subgenre: string;
  language: string;
  content_advisory: string;
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

type CustomField =
  | "release_type"
  | "song_type"
  | "version"
  | "genre"
  | "subgenre"
  | "language"
  | "content_advisory"
  | "label";

type CopyrightOwner =
  | ""
  | "143 Studios"
  | "Artist"
  | "143 Studios & Artist"
  | "Other";

const initialForm: ReleaseFormState = {
  release_code: "",
  title: "",
  slug: "",
  artist_id: "",
  release_type: "",
  song_type: "",
  version: "",
  genre: "",
  subgenre: "",
  language: "",
  content_advisory: "",
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

const options = {
  release_type: [
    "Single",
    "EP",
    "Album",
    "Compilation",
    "Live",
    "Remix",
    "Mixtape",
    "Soundtrack",
    "Deluxe Edition",
    "Reissue",
    "Music Video",
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
    "Freestyle",
    "Medley",
    "Mashup",
    "Theme Song",
    "Soundtrack",
    "Devotional",
  ],
  version: [
    "Original Version",
    "Acoustic Version",
    "Live Version",
    "Remix Version",
    "Radio Edit",
    "Extended Mix",
    "Club Mix",
    "Instrumental Version",
    "Clean Version",
    "Explicit Version",
    "Deluxe Version",
    "Anniversary Version",
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
    "Alternative",
    "Ambient",
    "Ghazal",
    "Punjabi",
    "Qawwali",
    "Sufi",
    "Nasheed",
    "Lo-Fi",
    "Instrumental",
  ],
  subgenre: [
    "Alternative Pop",
    "Indie Pop",
    "Synth-Pop",
    "Punjabi Folk",
    "Urdu Pop",
    "Desi Hip-Hop",
    "Trap",
    "Boom Bap",
    "Lo-Fi",
    "Dance-Pop",
    "Electronic Pop",
    "Soft Rock",
    "Pop Rock",
    "Acoustic Pop",
    "Devotional",
    "Drill",
    "Gangsta Rap",
    "Conscious Hip-Hop",
    "Sufi Pop",
    "Qawwali Fusion",
    "Folk Rock",
  ],
  language: [
    "Urdu",
    "Punjabi",
    "English",
    "Hindi",
    "Saraiki",
    "Pashto",
    "Sindhi",
    "Balochi",
    "Arabic",
    "Instrumental",
    "Multilingual",
    "Bengali",
    "Gujarati",
    "Kashmiri",
    "Turkish",
    "Persian",
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
} satisfies Record<CustomField, string[]>;

export default function AddReleaseForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [coverUploading, setCoverUploading] =
    useState(false);
  const [audioUploading, setAudioUploading] =
    useState(false);
  const [artistsLoading, setArtistsLoading] =
    useState(true);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [form, setForm] =
    useState<ReleaseFormState>(initialForm);

  const [customSelected, setCustomSelected] =
    useState<Record<CustomField, boolean>>({
      release_type: false,
      song_type: false,
      version: false,
      genre: false,
      subgenre: false,
      language: false,
      content_advisory: false,
      label: false,
    });

  const [copyrightCOwner, setCopyrightCOwner] =
    useState<CopyrightOwner>("143 Studios");

  const [copyrightPOwner, setCopyrightPOwner] =
    useState<CopyrightOwner>("143 Studios");

  const [customCopyrightCOwner, setCustomCopyrightCOwner] =
    useState("");

  const [customCopyrightPOwner, setCustomCopyrightPOwner] =
    useState("");

  const selectedArtist = useMemo(
    () =>
      artists.find(
        (artist) =>
          String(artist.id) === form.artist_id
      ) ?? null,
    [artists, form.artist_id]
  );

  const artistName =
    selectedArtist?.stage_name?.trim() || "";

  const releaseYear = useMemo(() => {
    const year = Number(
      form.release_date.slice(0, 4)
    );

    return year > 0
      ? year
      : new Date().getFullYear();
  }, [form.release_date]);

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
          setArtists(
            (data as Artist[] | null) ?? []
          );
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

  useEffect(() => {
    function ownerText(
      owner: CopyrightOwner,
      customOwner: string
    ) {
      if (owner === "143 Studios") {
        return "143 Studios";
      }

      if (owner === "Artist") {
        return artistName;
      }

      if (owner === "143 Studios & Artist") {
        return artistName
          ? `143 Studios & ${artistName}`
          : "143 Studios";
      }

      if (owner === "Other") {
        return customOwner.trim();
      }

      return "";
    }

    const cOwner = ownerText(
      copyrightCOwner,
      customCopyrightCOwner
    );

    const pOwner = ownerText(
      copyrightPOwner,
      customCopyrightPOwner
    );

    setForm((current) => ({
      ...current,
      copyright_c: cOwner
        ? `© ${releaseYear} ${cOwner}`
        : "",
      copyright_p: pOwner
        ? `℗ ${releaseYear} ${pOwner}`
        : "",
    }));
  }, [
    artistName,
    copyrightCOwner,
    copyrightPOwner,
    customCopyrightCOwner,
    customCopyrightPOwner,
    releaseYear,
  ]);

  function handleChange(
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => {
      const next = {
        ...current,
        [name]: value,
      };

      if (name === "title") {
        next.title = titleCase(value);
        next.slug = cleanSlug(value);
      }

      return next;
    });
  }

  function handleCustomSelect(
    field: CustomField,
    value: string
  ) {
    const isCustom = value === "Other";

    setCustomSelected((current) => ({
      ...current,
      [field]: isCustom,
    }));

    setForm((current) => ({
      ...current,
      [field]: isCustom ? "" : value,
    }));
  }

  function handleCustomInput(
    field: CustomField,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: titleCase(value),
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

    setCoverUploading(true);

    try {
      const url = await uploadToCloudinary(file, `${form.title || "release"}-cover`);

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
      setCoverUploading(false);
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

    if (!form.release_code.trim()) {
      alert(
        "Please Enter The Release Code Before Uploading Audio."
      );
      event.target.value = "";
      return;
    }

    if (!form.title.trim()) {
      alert(
        "Please Enter The Release Title Before Uploading Audio."
      );
      event.target.value = "";
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

    setAudioUploading(true);

    try {
      const prepareResponse = await fetch(
        "/api/admin/upload-audio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            releaseCode:
              form.release_code.trim(),
            releaseTitle:
              form.title.trim(),
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          }),
        }
      );

      const prepareText =
        await prepareResponse.text();

      let result: {
        success?: boolean;
        message?: string;
        workerUrl?: string;
        key?: string;
        expires?: number;
        signature?: string;
        publicUrl?: string;
      };

      try {
        result = JSON.parse(prepareText);
      } catch {
        throw new Error(
          prepareText ||
            "Upload Preparation Failed."
        );
      }

      if (
        !prepareResponse.ok ||
        !result.success ||
        !result.workerUrl ||
        !result.key ||
        !result.expires ||
        !result.signature ||
        !result.publicUrl
      ) {
        throw new Error(
          result.message ||
            "Upload Preparation Failed."
        );
      }

      const uploadResponse = await fetch(
        result.workerUrl,
        {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "X-Upload-Key": result.key,
            "X-Upload-Expires":
              String(result.expires),
            "X-Upload-Signature":
              result.signature,
            "X-Upload-Size":
              String(file.size),
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
          result.publicUrl!,
      }));

      alert("Audio Uploaded Successfully.");
    } catch (error) {
      console.error(
        "Audio Upload Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Audio Upload Failed."
      );
    } finally {
      setAudioUploading(false);
      event.target.value = "";
    }
  }

  async function saveRelease(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      loading ||
      coverUploading ||
      audioUploading
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

    if (!form.artist_id) {
      alert("Please Select An Artist.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        release_code:
          form.release_code.trim(),
        title: titleCase(form.title),
        slug: cleanSlug(form.title),
        artist_id: Number(form.artist_id),

        release_type: optionalTitle(form.release_type),
        version: optionalTitle(form.version),
        genre: optionalTitle(form.genre),
        language: optionalTitle(form.language),
        release_date:
          form.release_date || null,

        cover:
          form.cover || null,
        audio_url:
          form.audio_url.trim() || null,
        duration:
          form.duration.trim() || null,

        upc:
          form.upc.trim() || null,
        isrc:
          form.isrc.trim() || null,

        label:
          form.label.trim() ||
          "143 Studios",

        copyright_c:
          form.copyright_c.trim() || null,
        copyright_p:
          form.copyright_p.trim() || null,

        description:
          form.description.trim() || null,
        lyrics:
          form.lyrics.trim() || null,
        credits:
          form.credits.trim() || null,

        status: form.status,
        featured: form.featured,
        sort_order:
          Number(form.sort_order) || 0,

        spotify:
          form.spotify.trim() || null,
        apple_music:
          form.apple_music.trim() || null,
        youtube:
          form.youtube.trim() || null,
        youtube_music:
          form.youtube_music.trim() || null,

        song_type: optionalTitle(form.song_type),
        content_advisory: optionalTitle(form.content_advisory),
        subgenre: optionalTitle(form.subgenre),

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

  const uploading =
    coverUploading || audioUploading;

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
            placeholder="Slug — release-title"
            readOnly
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

          <CustomSelect
            label="Release Type"
            field="release_type"
            value={form.release_type}
            customSelected={
              customSelected.release_type
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
          />

          <CustomSelect
            label="Song Type"
            field="song_type"
            value={form.song_type}
            customSelected={
              customSelected.song_type
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
          />

          <CustomSelect
            label="Version"
            field="version"
            value={form.version}
            customSelected={
              customSelected.version
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
          />

          <CustomSelect
            label="Genre"
            field="genre"
            value={form.genre}
            customSelected={
              customSelected.genre
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
          />

          <CustomSelect
            label="Subgenre"
            field="subgenre"
            value={form.subgenre}
            customSelected={
              customSelected.subgenre
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
          />

          <CustomSelect
            label="Language"
            field="language"
            value={form.language}
            customSelected={
              customSelected.language
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
          />

          <CustomSelect
            label="Content Advisory"
            field="content_advisory"
            value={form.content_advisory}
            customSelected={
              customSelected.content_advisory
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
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
              disabled={uploading}
              onChange={uploadCover}
              className={inputClass}
            />

            {coverUploading && (
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
              Audio File
            </p>

            <p className="mb-3 text-sm leading-6 text-gray-400">
              Enter The Release Code And Release
              Title Before Uploading Audio.
            </p>

            <input
              type="file"
              accept="audio/*"
              disabled={uploading}
              onChange={uploadAudio}
              className={inputClass}
            />

            {audioUploading && (
              <p className="mt-3 text-yellow-400">
                Uploading Audio...
              </p>
            )}

            {form.audio_url && (
              <>
                <p className="mt-4 break-all text-green-400">
                  Audio Uploaded Successfully
                </p>

                <audio
                  controls
                  preload="none"
                  src={form.audio_url}
                  className="mt-4 w-full"
                />
              </>
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

          <CustomSelect
            label="Label"
            field="label"
            value={form.label}
            customSelected={
              customSelected.label
            }
            onSelect={handleCustomSelect}
            onCustomInput={handleCustomInput}
          />

          <div className="hidden md:block" />

          <CopyrightField
            label="© Copyright Line"
            value={copyrightCOwner}
            customValue={
              customCopyrightCOwner
            }
            generatedLine={form.copyright_c}
            onValueChange={
              setCopyrightCOwner
            }
            onCustomChange={
              setCustomCopyrightCOwner
            }
          />

          <CopyrightField
            label="℗ Phonographic Copyright Line"
            value={copyrightPOwner}
            customValue={
              customCopyrightPOwner
            }
            generatedLine={form.copyright_p}
            onValueChange={
              setCopyrightPOwner
            }
            onCustomChange={
              setCustomCopyrightPOwner
            }
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
            : coverUploading
              ? "Uploading Cover..."
              : audioUploading
                ? "Uploading Audio..."
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

type CustomSelectProps = {
  label: string;
  field: CustomField;
  value: string;
  customSelected: boolean;
  onSelect: (
    field: CustomField,
    value: string
  ) => void;
  onCustomInput: (
    field: CustomField,
    value: string
  ) => void;
};

function CustomSelect({
  label,
  field,
  value,
  customSelected,
  onSelect,
  onCustomInput,
}: CustomSelectProps) {
  return (
    <div>
      <label
        htmlFor={`${field}-select`}
        className="mb-3 block font-bold"
      >
        {label}
      </label>

      <select
        id={`${field}-select`}
        value={
          customSelected ? "Other" : value
        }
        onChange={(event) =>
          onSelect(
            field,
            event.target.value
          )
        }
        className={inputClass}
      >
        <option value="">
          Select {label}
        </option>

        {options[field].map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

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

type CopyrightFieldProps = {
  label: string;
  value: CopyrightOwner;
  customValue: string;
  generatedLine: string;
  onValueChange: (
    value: CopyrightOwner
  ) => void;
  onCustomChange: (value: string) => void;
};

function CopyrightField({
  label,
  value,
  customValue,
  generatedLine,
  onValueChange,
  onCustomChange,
}: CopyrightFieldProps) {
  return (
    <div>
      <label className="mb-3 block font-bold">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onValueChange(
            event.target
              .value as CopyrightOwner
          )
        }
        className={inputClass}
      >
        <option value="">
          Select Copyright Owner
        </option>
        <option value="143 Studios">
          143 Studios
        </option>
        <option value="Artist">
          Selected Artist
        </option>
        <option value="143 Studios & Artist">
          143 Studios & Selected Artist
        </option>
        <option value="Other">
          Other
        </option>
      </select>

      {value === "Other" && (
        <input
          value={customValue}
          onChange={(event) =>
            onCustomChange(
              event.target.value
            )
          }
          placeholder="Enter Other Copyright Owner"
          className={`${inputClass} mt-3`}
        />
      )}

      {generatedLine && (
        <div className="mt-3 rounded-xl border border-zinc-800 bg-black p-4 text-sm text-gray-300">
          {generatedLine}
        </div>
      )}
    </div>
  );
}
