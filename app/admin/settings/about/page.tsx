"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getSitePage,
  updateSitePage,
} from "@/lib/site-pages";

type AboutSettings = {
  eyebrow: string;
  hero_title: string;
  hero_description: string;
  story_title: string;
  story_paragraph_one: string;
  story_paragraph_two: string;
  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;
  core_values_title: string;
  what_we_do_title: string;
  why_choose_title: string;
  cta_title: string;
  cta_text: string;
};

const defaultSettings: AboutSettings = {
  eyebrow: "About 143 Studios",
  hero_title: "Music Beyond Limits",
  hero_description:
    "143 Studios Is A Modern Music Label Dedicated To Discovering Talent, Producing Exceptional Music, Building Artist Brands And Delivering Creative Entertainment To Audiences Around The World.",
  story_title: "Our Story",
  story_paragraph_one:
    "143 Studios Was Founded With A Vision To Build A Professional Platform Where Artists, Producers, Songwriters And Creative Professionals Can Grow Together. Our Goal Is To Create High Quality Music While Helping Artists Build Long-Term Careers Through Modern Technology And Global Distribution.",
  story_paragraph_two:
    "We Believe Every Artist Has A Unique Story. Through Recording, Publishing, Distribution, Branding And Digital Promotion, We Transform Creative Ideas Into Professional Music Projects.",
  mission_title: "Our Mission",
  mission_text:
    "To Empower Artists By Providing World-Class Music Production, Distribution, Publishing, Branding And Digital Solutions Under One Roof.",
  vision_title: "Our Vision",
  vision_text:
    "To Become One Of The Most Trusted Independent Music Labels In The World By Creating Music That Inspires Millions And Building Careers That Last For Generations.",
  core_values_title: "Our Core Values",
  what_we_do_title: "What We Do",
  why_choose_title: "Why Choose 143 Studios",
  cta_title: "Ready To Work With 143 Studios?",
  cta_text:
    "Whether You Are An Artist, Producer, Songwriter, Content Creator Or Business Partner, We Are Ready To Build The Future Together.",
};

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500";

export default function AdminAboutSettingsPage() {
  const [form, setForm] =
    useState<AboutSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      const savedContent =
        await getSitePage("about");

      if (!mounted) {
        return;
      }

      if (savedContent) {
        setForm({
          ...defaultSettings,
          ...(savedContent as Partial<AboutSettings>),
        });
      }

      setLoading(false);
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
      await updateSitePage("about", form);
      alert("About Page Settings Saved Successfully.");
    } catch (error) {
      console.error(
        "Save About Settings Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "About Page Settings Could Not Be Saved."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-gray-400">
          Loading About Settings...
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
              About Settings
            </h1>

            <p className="mt-3 text-gray-400">
              Manage The Existing About Page Content.
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
          <SettingsSection title="Hero Section">
            <input
              name="eyebrow"
              value={form.eyebrow}
              onChange={handleChange}
              placeholder="About 143 Studios"
              className={inputClass}
            />

            <input
              name="hero_title"
              value={form.hero_title}
              onChange={handleChange}
              placeholder="Music Beyond Limits"
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

          <SettingsSection title="Our Story">
            <input
              name="story_title"
              value={form.story_title}
              onChange={handleChange}
              placeholder="Our Story"
              className={inputClass}
            />

            <textarea
              name="story_paragraph_one"
              value={form.story_paragraph_one}
              onChange={handleChange}
              rows={6}
              placeholder="First Story Paragraph"
              className={inputClass}
            />

            <textarea
              name="story_paragraph_two"
              value={form.story_paragraph_two}
              onChange={handleChange}
              rows={6}
              placeholder="Second Story Paragraph"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="Mission And Vision">
            <input
              name="mission_title"
              value={form.mission_title}
              onChange={handleChange}
              placeholder="Our Mission"
              className={inputClass}
            />

            <textarea
              name="mission_text"
              value={form.mission_text}
              onChange={handleChange}
              rows={5}
              placeholder="Mission Text"
              className={inputClass}
            />

            <input
              name="vision_title"
              value={form.vision_title}
              onChange={handleChange}
              placeholder="Our Vision"
              className={inputClass}
            />

            <textarea
              name="vision_text"
              value={form.vision_text}
              onChange={handleChange}
              rows={5}
              placeholder="Vision Text"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="Section Headings">
            <input
              name="core_values_title"
              value={form.core_values_title}
              onChange={handleChange}
              placeholder="Our Core Values"
              className={inputClass}
            />

            <input
              name="what_we_do_title"
              value={form.what_we_do_title}
              onChange={handleChange}
              placeholder="What We Do"
              className={inputClass}
            />

            <input
              name="why_choose_title"
              value={form.why_choose_title}
              onChange={handleChange}
              placeholder="Why Choose 143 Studios"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="Call To Action">
            <input
              name="cta_title"
              value={form.cta_title}
              onChange={handleChange}
              placeholder="Ready To Work With 143 Studios?"
              className={inputClass}
            />

            <textarea
              name="cta_text"
              value={form.cta_text}
              onChange={handleChange}
              rows={5}
              placeholder="Call To Action Text"
              className={inputClass}
            />
          </SettingsSection>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving About Settings..."
              : "Save About Settings"}
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
