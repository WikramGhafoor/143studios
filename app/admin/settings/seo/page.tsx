"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  getSitePage,
  updateSitePage,
} from "@/lib/site-pages";

type SeoSettings = {
  site_title: string;
  title_template: string;
  meta_description: string;
  application_name: string;
  keywords: string;
  author_name: string;
  creator_name: string;
  publisher_name: string;
  category: string;
  canonical_url: string;
  language: string;
  locale: string;
  robots_index: boolean;
  robots_follow: boolean;
  google_max_image_preview: string;
  google_max_snippet: number;
  google_max_video_preview: number;
  open_graph_title: string;
  open_graph_description: string;
  open_graph_site_name: string;
  open_graph_type: string;
  open_graph_image_url: string;
  open_graph_image_alt: string;
  twitter_card: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image_url: string;
  organization_name: string;
  organization_legal_name: string;
  organization_description: string;
  organization_email: string;
  founder_name: string;
  founder_alternate_name: string;
  founding_country: string;
  area_served: string;
  knows_about: string;
  google_analytics_id: string;
};

const defaultSettings: SeoSettings = {
  site_title: "143 Studios | Official Website",
  title_template: "%s | 143 Studios",
  meta_description:
    "Official Website Of 143 Studios. Music Label, Artist Management, Music Distribution, Publishing And Digital Media Company.",
  application_name: "143 Studios",
  keywords:
    "143 Studios, Wikram Ghafoor, Guru B, Music Label, Record Label, Music Distribution, Music Publishing, Recording Studio, Artist Management, Music Production, Audio Recording, Mixing, Mastering, Independent Artists, Albums, Singles, Music Videos, Digital Distribution, Pakistan Music, Pakistani Artists, Music Company",
  author_name: "143 Studios",
  creator_name: "143 Studios",
  publisher_name: "143 Studios",
  category: "Music",
  canonical_url: "https://143studios.online",
  language: "en",
  locale: "en_US",
  robots_index: true,
  robots_follow: true,
  google_max_image_preview: "large",
  google_max_snippet: -1,
  google_max_video_preview: -1,
  open_graph_title: "143 Studios",
  open_graph_description:
    "Official Website Of 143 Studios. Music Label, Artist Management, Music Distribution, Publishing And Digital Media Company.",
  open_graph_site_name: "143 Studios",
  open_graph_type: "website",
  open_graph_image_url: "/og-image.jpg",
  open_graph_image_alt: "143 Studios",
  twitter_card: "summary_large_image",
  twitter_title: "143 Studios",
  twitter_description:
    "Official Website Of 143 Studios. Music Label, Artist Management, Music Distribution, Publishing And Digital Media Company.",
  twitter_image_url: "/og-image.jpg",
  organization_name: "143 Studios",
  organization_legal_name:
    "143 Studios (SMC-Private) Limited",
  organization_description:
    "Music Label, Artist Management, Music Distribution, Publishing, Recording Studio And Digital Media Company.",
  organization_email:
    "143studiospakistan@gmail.com",
  founder_name: "Wikram Ghafoor",
  founder_alternate_name: "Guru B",
  founding_country: "Pakistan",
  area_served: "Worldwide",
  knows_about:
    "Record Label Services, Music Production, Recording Studio, Artist Management, Music Distribution, Music Publishing, Mixing And Mastering, Digital Marketing, Video Production",
  google_analytics_id: "G-KYV9X235G4",
};

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500";

export default function AdminSeoSettingsPage() {
  const [form, setForm] =
    useState<SeoSettings>(defaultSettings);
  const [loading, setLoading] =
    useState(true);
  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const savedContent =
          await getSitePage("seo");

        if (!mounted) {
          return;
        }

        if (savedContent) {
          setForm({
            ...defaultSettings,
            ...(savedContent as Partial<SeoSettings>),
          });
        }
      } catch (error) {
        console.error(
          "Load SEO Settings Error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  function handleChange(
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) {
    const target = event.target;
    const { name } = target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "checkbox"
    ) {
      setForm((current) => ({
        ...current,
        [name]: target.checked,
      }));

      return;
    }

    if (
      target instanceof HTMLInputElement &&
      target.type === "number"
    ) {
      setForm((current) => ({
        ...current,
        [name]: Number(target.value),
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [name]: target.value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);

    try {
      await updateSitePage("seo", form);

      alert(
        "SEO Settings Saved Successfully."
      );
    } catch (error) {
      console.error(
        "Save SEO Settings Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "SEO Settings Could Not Be Saved."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-gray-400">
          Loading SEO Settings...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-4 text-white sm:p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">
              SEO Settings
            </h1>

            <p className="mt-3 text-gray-400">
              Manage Global Metadata, Search Visibility, Social Sharing And Structured Data.
            </p>
          </div>

          <Link
            href="/admin/settings"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-gray-300 transition-colors hover:bg-zinc-800"
          >
            Back To Settings
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          <SettingsSection title="General SEO">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Default Site Title"
                name="site_title"
                value={form.site_title}
                onChange={handleChange}
              />

              <Field
                label="Title Template"
                name="title_template"
                value={form.title_template}
                onChange={handleChange}
              />

              <Field
                label="Application Name"
                name="application_name"
                value={form.application_name}
                onChange={handleChange}
              />

              <Field
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              />

              <Field
                label="Author Name"
                name="author_name"
                value={form.author_name}
                onChange={handleChange}
              />

              <Field
                label="Creator Name"
                name="creator_name"
                value={form.creator_name}
                onChange={handleChange}
              />

              <Field
                label="Publisher Name"
                name="publisher_name"
                value={form.publisher_name}
                onChange={handleChange}
              />

              <Field
                label="Canonical URL"
                name="canonical_url"
                type="url"
                value={form.canonical_url}
                onChange={handleChange}
              />

              <Field
                label="Language"
                name="language"
                value={form.language}
                onChange={handleChange}
              />

              <Field
                label="Locale"
                name="locale"
                value={form.locale}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Meta Description"
              name="meta_description"
              value={form.meta_description}
              onChange={handleChange}
              rows={5}
            />

            <TextAreaField
              label="Keywords — Separate With Commas"
              name="keywords"
              value={form.keywords}
              onChange={handleChange}
              rows={6}
            />
          </SettingsSection>

          <SettingsSection title="Search Engine Visibility">
            <div className="grid gap-5 md:grid-cols-2">
              <CheckboxField
                label="Allow Search Engine Indexing"
                name="robots_index"
                checked={form.robots_index}
                onChange={handleChange}
              />

              <CheckboxField
                label="Allow Search Engine Links To Be Followed"
                name="robots_follow"
                checked={form.robots_follow}
                onChange={handleChange}
              />

              <SelectField
                label="Google Image Preview"
                name="google_max_image_preview"
                value={
                  form.google_max_image_preview
                }
                onChange={handleChange}
                options={[
                  {
                    value: "none",
                    label: "None",
                  },
                  {
                    value: "standard",
                    label: "Standard",
                  },
                  {
                    value: "large",
                    label: "Large",
                  },
                ]}
              />

              <NumberField
                label="Google Maximum Snippet"
                name="google_max_snippet"
                value={form.google_max_snippet}
                onChange={handleChange}
              />

              <NumberField
                label="Google Maximum Video Preview"
                name="google_max_video_preview"
                value={
                  form.google_max_video_preview
                }
                onChange={handleChange}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Open Graph">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Open Graph Title"
                name="open_graph_title"
                value={form.open_graph_title}
                onChange={handleChange}
              />

              <Field
                label="Open Graph Site Name"
                name="open_graph_site_name"
                value={
                  form.open_graph_site_name
                }
                onChange={handleChange}
              />

              <SelectField
                label="Open Graph Type"
                name="open_graph_type"
                value={form.open_graph_type}
                onChange={handleChange}
                options={[
                  {
                    value: "website",
                    label: "Website",
                  },
                  {
                    value: "article",
                    label: "Article",
                  },
                  {
                    value: "music.song",
                    label: "Music Song",
                  },
                  {
                    value: "music.album",
                    label: "Music Album",
                  },
                  {
                    value: "profile",
                    label: "Profile",
                  },
                ]}
              />

              <Field
                label="Open Graph Image URL"
                name="open_graph_image_url"
                value={
                  form.open_graph_image_url
                }
                onChange={handleChange}
              />

              <Field
                label="Open Graph Image Alt Text"
                name="open_graph_image_alt"
                value={
                  form.open_graph_image_alt
                }
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Open Graph Description"
              name="open_graph_description"
              value={
                form.open_graph_description
              }
              onChange={handleChange}
              rows={5}
            />
          </SettingsSection>

          <SettingsSection title="Twitter Card">
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Twitter Card Type"
                name="twitter_card"
                value={form.twitter_card}
                onChange={handleChange}
                options={[
                  {
                    value: "summary",
                    label: "Summary",
                  },
                  {
                    value: "summary_large_image",
                    label: "Summary Large Image",
                  },
                  {
                    value: "player",
                    label: "Player",
                  },
                  {
                    value: "app",
                    label: "App",
                  },
                ]}
              />

              <Field
                label="Twitter Title"
                name="twitter_title"
                value={form.twitter_title}
                onChange={handleChange}
              />

              <Field
                label="Twitter Image URL"
                name="twitter_image_url"
                value={form.twitter_image_url}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Twitter Description"
              name="twitter_description"
              value={
                form.twitter_description
              }
              onChange={handleChange}
              rows={5}
            />
          </SettingsSection>

          <SettingsSection title="Organization Structured Data">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Organization Name"
                name="organization_name"
                value={form.organization_name}
                onChange={handleChange}
              />

              <Field
                label="Legal Organization Name"
                name="organization_legal_name"
                value={
                  form.organization_legal_name
                }
                onChange={handleChange}
              />

              <Field
                label="Organization Email"
                name="organization_email"
                type="email"
                value={
                  form.organization_email
                }
                onChange={handleChange}
              />

              <Field
                label="Founder Name"
                name="founder_name"
                value={form.founder_name}
                onChange={handleChange}
              />

              <Field
                label="Founder Alternate Name"
                name="founder_alternate_name"
                value={
                  form.founder_alternate_name
                }
                onChange={handleChange}
              />

              <Field
                label="Founding Country"
                name="founding_country"
                value={form.founding_country}
                onChange={handleChange}
              />

              <Field
                label="Area Served"
                name="area_served"
                value={form.area_served}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Organization Description"
              name="organization_description"
              value={
                form.organization_description
              }
              onChange={handleChange}
              rows={5}
            />

            <TextAreaField
              label="Organization Knows About — Separate With Commas"
              name="knows_about"
              value={form.knows_about}
              onChange={handleChange}
              rows={5}
            />
          </SettingsSection>

          <SettingsSection title="Analytics">
            <Field
              label="Google Analytics Measurement ID"
              name="google_analytics_id"
              value={form.google_analytics_id}
              onChange={handleChange}
              placeholder="G-XXXXXXXXXX"
            />
          </SettingsSection>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving SEO Settings..."
              : "Save SEO Settings"}
          </button>
        </form>
      </div>
    </main>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
      <h2 className="mb-6 text-2xl font-black">
        {title}
      </h2>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  name: keyof SeoSettings;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-gray-300">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

function NumberField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: keyof SeoSettings;
  value: number;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-gray-300">
        {label}
      </span>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows,
}: {
  label: string;
  name: keyof SeoSettings;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  rows: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-gray-300">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={inputClass}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: keyof SeoSettings;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-gray-300">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxField({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: keyof SeoSettings;
  checked: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-red-900 bg-black p-4">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5"
      />

      <span className="font-bold text-gray-300">
        {label}
      </span>
    </label>
  );
}
