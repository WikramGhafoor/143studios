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

type WebsiteSettings = {
  company_name: string;
  registered_name: string;
  company_type: string;
  company_description: string;
  website_url: string;
  logo_url: string;
  favicon_url: string;
  default_og_image_url: string;
  business_email: string;
  public_email: string;
  phone_number: string;
  whatsapp_number: string;
  whatsapp_link: string;
  address: string;
  city: string;
  country: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  tiktok_url: string;
  whatsapp_channel_url: string;
  footer_company_name: string;
  footer_description: string;
  footer_navigation_title: string;
  footer_legal_title: string;
  footer_copyright_name: string;
  footer_rights_text: string;
};

const defaultSettings: WebsiteSettings = {
  company_name: "143 Studios",
  registered_name: "143 Studios (SMC-Private) Limited",
  company_type: "Registered Music And Entertainment Company",
  company_description:
    "143 Studios Is A Registered Music And Entertainment Company Providing Professional Music, Recording, Publishing, Distribution And Creative Services.",
  website_url: "https://143studios.online",
  logo_url: "/logo.png",
  favicon_url: "/favicon.ico",
  default_og_image_url: "/og-image.jpg",
  business_email: "contact@143studios.online",
  public_email: "143studiospakistan@gmail.com",
  phone_number: "+92 304 4457505",
  whatsapp_number: "+92 304 4457505",
  whatsapp_link: "https://wa.me/923044457505",
  address: "",
  city: "",
  country: "Pakistan",
  facebook_url:
    "https://www.facebook.com/profile.php?id=61590549212493",
  instagram_url:
    "https://www.instagram.com/143studios.guru",
  youtube_url:
    "https://www.youtube.com/@143StudiosOfficial",
  tiktok_url:
    "https://www.tiktok.com/@143studios",
  whatsapp_channel_url:
    "https://whatsapp.com/channel/0029VbCpgUcGufIyFHUFlw37",
  footer_company_name: "143 Studios",
  footer_description:
    "Music Label, Distribution, Publishing, Artist Management, Recording Studio And Digital Media Company.",
  footer_navigation_title: "Navigation",
  footer_legal_title: "Legal",
  footer_copyright_name:
    "143 Studios (SMC-Private) Limited.",
  footer_rights_text: "All Rights Reserved.",
};

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500";

export default function AdminWebsiteSettingsPage() {
  const [form, setForm] =
    useState<WebsiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const savedContent =
          await getSitePage("website");

        if (!mounted) {
          return;
        }

        if (savedContent) {
          setForm({
            ...defaultSettings,
            ...(savedContent as Partial<WebsiteSettings>),
          });
        }
      } catch (error) {
        console.error(
          "Load Website Settings Error:",
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
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
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
      await updateSitePage("website", form);

      alert(
        "Website Settings Saved Successfully."
      );
    } catch (error) {
      console.error(
        "Save Website Settings Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Website Settings Could Not Be Saved."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-gray-400">
          Loading Website Settings...
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
              Website Settings
            </h1>

            <p className="mt-3 text-gray-400">
              Manage Global Company, Contact, Branding And Footer Information.
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
          <SettingsSection title="Company Information">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Company Name"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
              />

              <Field
                label="Registered Name"
                name="registered_name"
                value={form.registered_name}
                onChange={handleChange}
              />

              <Field
                label="Company Type"
                name="company_type"
                value={form.company_type}
                onChange={handleChange}
              />

              <Field
                label="Website URL"
                name="website_url"
                type="url"
                value={form.website_url}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Company Description"
              name="company_description"
              value={form.company_description}
              onChange={handleChange}
              rows={6}
            />
          </SettingsSection>

          <SettingsSection title="Branding">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Logo URL"
                name="logo_url"
                value={form.logo_url}
                onChange={handleChange}
              />

              <Field
                label="Favicon URL"
                name="favicon_url"
                value={form.favicon_url}
                onChange={handleChange}
              />

              <Field
                label="Default Open Graph Image URL"
                name="default_og_image_url"
                value={form.default_og_image_url}
                onChange={handleChange}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Contact Information">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Business Email"
                name="business_email"
                type="email"
                value={form.business_email}
                onChange={handleChange}
              />

              <Field
                label="Public Email"
                name="public_email"
                type="email"
                value={form.public_email}
                onChange={handleChange}
              />

              <Field
                label="Phone Number"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
              />

              <Field
                label="WhatsApp Number"
                name="whatsapp_number"
                value={form.whatsapp_number}
                onChange={handleChange}
              />

              <Field
                label="WhatsApp Link"
                name="whatsapp_link"
                type="url"
                value={form.whatsapp_link}
                onChange={handleChange}
              />

              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />

              <Field
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={4}
            />
          </SettingsSection>

          <SettingsSection title="Social Links">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Facebook URL"
                name="facebook_url"
                type="url"
                value={form.facebook_url}
                onChange={handleChange}
              />

              <Field
                label="Instagram URL"
                name="instagram_url"
                type="url"
                value={form.instagram_url}
                onChange={handleChange}
              />

              <Field
                label="YouTube URL"
                name="youtube_url"
                type="url"
                value={form.youtube_url}
                onChange={handleChange}
              />

              <Field
                label="TikTok URL"
                name="tiktok_url"
                type="url"
                value={form.tiktok_url}
                onChange={handleChange}
              />

              <Field
                label="WhatsApp Channel URL"
                name="whatsapp_channel_url"
                type="url"
                value={form.whatsapp_channel_url}
                onChange={handleChange}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Footer Settings">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Footer Company Name"
                name="footer_company_name"
                value={form.footer_company_name}
                onChange={handleChange}
              />

              <Field
                label="Navigation Heading"
                name="footer_navigation_title"
                value={form.footer_navigation_title}
                onChange={handleChange}
              />

              <Field
                label="Legal Heading"
                name="footer_legal_title"
                value={form.footer_legal_title}
                onChange={handleChange}
              />

              <Field
                label="Copyright Name"
                name="footer_copyright_name"
                value={form.footer_copyright_name}
                onChange={handleChange}
              />

              <Field
                label="Rights Text"
                name="footer_rights_text"
                value={form.footer_rights_text}
                onChange={handleChange}
              />
            </div>

            <TextAreaField
              label="Footer Description"
              name="footer_description"
              value={form.footer_description}
              onChange={handleChange}
              rows={5}
            />
          </SettingsSection>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving Website Settings..."
              : "Save Website Settings"}
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
}: {
  label: string;
  name: keyof WebsiteSettings;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
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
  name: keyof WebsiteSettings;
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
