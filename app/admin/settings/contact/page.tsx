"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getSitePage,
  updateSitePage,
} from "@/lib/site-pages";

type ContactSettings = {
  metadata_title: string;
  metadata_description: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  inquiry_title: string;
  inquiry_description: string;
  contact_information_title: string;
  email_label: string;
  email_address: string;
  whatsapp_label: string;
  whatsapp_number: string;
  whatsapp_link: string;
  social_title: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  tiktok_url: string;
  whatsapp_channel_url: string;
};

const defaultSettings: ContactSettings = {
  metadata_title: "Contact",
  metadata_description:
    "Contact 143 Studios For Record Label, Music Production, Distribution, Publishing And Artist Services.",
  hero_eyebrow: "Contact 143 Studios",
  hero_title: "Start Your Project",
  hero_description:
    "Whether You Need Record Label Services, Music Production, Distribution, Publishing Or Artist Management, Send Us Your Inquiry And Our Team Will Contact You.",
  inquiry_title: "Send An Inquiry",
  inquiry_description:
    "Complete The Form Below And We Will Contact You As Soon As Possible.",
  contact_information_title:
    "Contact Information",
  email_label: "Email",
  email_address:
    "143studiospakistan@gmail.com",
  whatsapp_label: "WhatsApp",
  whatsapp_number: "+92 304 4457505",
  whatsapp_link:
    "https://wa.me/923044457505",
  social_title: "Follow 143 Studios",
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
};

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500";

export default function AdminContactSettingsPage() {
  const [form, setForm] =
    useState<ContactSettings>(defaultSettings);
  const [loading, setLoading] =
    useState(true);
  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const savedContent =
          await getSitePage("contact");

        if (!mounted) {
          return;
        }

        if (savedContent) {
          setForm({
            ...defaultSettings,
            ...(savedContent as Partial<ContactSettings>),
          });
        }
      } catch (error) {
        console.error(
          "Load Contact Settings Error:",
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
    event: React.ChangeEvent<
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
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);

    try {
      await updateSitePage("contact", form);

      alert(
        "Contact Page Settings Saved Successfully."
      );
    } catch (error) {
      console.error(
        "Save Contact Settings Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Contact Page Settings Could Not Be Saved."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-gray-400">
          Loading Contact Settings...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-4 text-white sm:p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">
              Contact Settings
            </h1>

            <p className="mt-3 text-gray-400">
              Manage The Existing Contact Page Content.
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
          <SettingsSection title="SEO">
            <input
              name="metadata_title"
              value={form.metadata_title}
              onChange={handleChange}
              placeholder="Page Title"
              className={inputClass}
            />

            <textarea
              name="metadata_description"
              value={form.metadata_description}
              onChange={handleChange}
              rows={4}
              placeholder="Page Description"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="Hero Section">
            <input
              name="hero_eyebrow"
              value={form.hero_eyebrow}
              onChange={handleChange}
              placeholder="Contact 143 Studios"
              className={inputClass}
            />

            <input
              name="hero_title"
              value={form.hero_title}
              onChange={handleChange}
              placeholder="Start Your Project"
              className={inputClass}
            />

            <textarea
              name="hero_description"
              value={form.hero_description}
              onChange={handleChange}
              rows={5}
              placeholder="Hero Description"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="Inquiry Section">
            <input
              name="inquiry_title"
              value={form.inquiry_title}
              onChange={handleChange}
              placeholder="Send An Inquiry"
              className={inputClass}
            />

            <textarea
              name="inquiry_description"
              value={form.inquiry_description}
              onChange={handleChange}
              rows={4}
              placeholder="Inquiry Description"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="Contact Information">
            <input
              name="contact_information_title"
              value={
                form.contact_information_title
              }
              onChange={handleChange}
              placeholder="Contact Information"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="email_label"
                value={form.email_label}
                onChange={handleChange}
                placeholder="Email Label"
                className={inputClass}
              />

              <input
                type="email"
                name="email_address"
                value={form.email_address}
                onChange={handleChange}
                placeholder="Email Address"
                className={inputClass}
              />

              <input
                name="whatsapp_label"
                value={form.whatsapp_label}
                onChange={handleChange}
                placeholder="WhatsApp Label"
                className={inputClass}
              />

              <input
                name="whatsapp_number"
                value={form.whatsapp_number}
                onChange={handleChange}
                placeholder="WhatsApp Number"
                className={inputClass}
              />
            </div>

            <input
              type="url"
              name="whatsapp_link"
              value={form.whatsapp_link}
              onChange={handleChange}
              placeholder="WhatsApp Link"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="Social Links">
            <input
              name="social_title"
              value={form.social_title}
              onChange={handleChange}
              placeholder="Follow 143 Studios"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="url"
                name="facebook_url"
                value={form.facebook_url}
                onChange={handleChange}
                placeholder="Facebook URL"
                className={inputClass}
              />

              <input
                type="url"
                name="instagram_url"
                value={form.instagram_url}
                onChange={handleChange}
                placeholder="Instagram URL"
                className={inputClass}
              />

              <input
                type="url"
                name="youtube_url"
                value={form.youtube_url}
                onChange={handleChange}
                placeholder="YouTube URL"
                className={inputClass}
              />

              <input
                type="url"
                name="tiktok_url"
                value={form.tiktok_url}
                onChange={handleChange}
                placeholder="TikTok URL"
                className={inputClass}
              />

              <input
                type="url"
                name="whatsapp_channel_url"
                value={
                  form.whatsapp_channel_url
                }
                onChange={handleChange}
                placeholder="WhatsApp Channel URL"
                className={inputClass}
              />
            </div>
          </SettingsSection>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving Contact Settings..."
              : "Save Contact Settings"}
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
  children: React.ReactNode;
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
