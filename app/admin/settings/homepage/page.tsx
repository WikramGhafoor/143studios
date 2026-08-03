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

type HomeService = {
  title: string;
  description: string;
};

type HomepageSettings = {
  hero_company_name: string;
  hero_company_highlight: string;
  hero_tagline: string;
  hero_founder_title: string;
  hero_founder_name: string;
  hero_founder_brand: string;
  hero_primary_button_text: string;
  hero_primary_button_link: string;
  hero_secondary_button_text: string;
  hero_secondary_button_link: string;
  hero_scroll_text: string;

  about_title_prefix: string;
  about_title_highlight: string;
  about_paragraph_one: string;
  about_paragraph_two: string;

  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;

  services_title_prefix: string;
  services_title_highlight: string;
  services_description: string;
  services_button_text: string;
  services_button_link: string;
  services: HomeService[];

  contact_title_prefix: string;
  contact_title_highlight: string;
  contact_description: string;
  contact_email_label: string;
  contact_email: string;
  contact_whatsapp_label: string;
  contact_whatsapp_button_text: string;
  contact_whatsapp_link: string;
  contact_button_text: string;
  contact_button_link: string;
  social_title: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  tiktok_url: string;
  whatsapp_channel_url: string;
};

const defaultSettings: HomepageSettings = {
  hero_company_name: "143",
  hero_company_highlight: "Studios",
  hero_tagline:
    "Music Label • Distribution • Publishing • Recording Studio",
  hero_founder_title: "Founder & CEO",
  hero_founder_name: "Wikram Ghafoor",
  hero_founder_brand: "GURU",
  hero_primary_button_text: "Explore Services",
  hero_primary_button_link: "#services",
  hero_secondary_button_text: "Contact Us",
  hero_secondary_button_link: "#contact",
  hero_scroll_text: "Scroll Down",

  about_title_prefix: "About",
  about_title_highlight: "143 Studios",
  about_paragraph_one:
    "143 Studios Is An Independent Registered Music Company Based In Pakistan, Dedicated To Building Artists, Developing Original Music And Delivering Professional Digital Entertainment Solutions Worldwide.",
  about_paragraph_two:
    "From Song Writing And Music Production To Recording, Distribution, Publishing, Promotion And Visual Content, We Provide Complete Creative Support For Artists Under One Platform.",

  mission_title: "Our Mission",
  mission_text:
    "Empowering Artists Through Creativity, Technology And Professional Music Solutions.",
  vision_title: "Our Vision",
  vision_text:
    "Building A Global Platform For Artists And Creating A New Standard In Independent Music.",

  services_title_prefix: "Our",
  services_title_highlight: "Services",
  services_description:
    "Professional Music, Recording And Digital Solutions Delivered Under One Creative Platform.",
  services_button_text: "View All Services →",
  services_button_link: "/services",
  services: [
    {
      title: "Record Label",
      description:
        "Professional Record Label Services Including Artist Development, Music Releases And Long-Term Career Growth.",
    },
    {
      title: "Song Writing",
      description:
        "Creating Professional Lyrics And Original Song Concepts With Creative Storytelling.",
    },
    {
      title: "Music Production",
      description:
        "Professional Music Production, Composition, Beat Making And Complete Audio Development.",
    },
    {
      title: "Recording Studio",
      description:
        "High-Quality Vocal Recording Sessions Using Professional Studio Equipment And Engineering.",
    },
    {
      title: "Mixing & Mastering",
      description:
        "Industry Standard Mixing And Mastering For Streaming Platforms, Radio And Commercial Release.",
    },
    {
      title: "Music Distribution",
      description:
        "Worldwide Distribution Across Spotify, Apple Music, YouTube Music And Major Digital Stores.",
    },
    {
      title: "Music Publishing",
      description:
        "Publishing Administration, Copyright Management And Royalty Collection Services.",
    },
    {
      title: "Artist Management",
      description:
        "Brand Development, Career Strategy, Promotion And Professional Artist Management.",
    },
  ],

  contact_title_prefix: "Contact",
  contact_title_highlight: "Us",
  contact_description:
    "Get In Touch With 143 Studios For Music Production, Distribution, Publishing And Professional Creative Services.",
  contact_email_label: "Email",
  contact_email: "143studiospakistan@gmail.com",
  contact_whatsapp_label: "WhatsApp",
  contact_whatsapp_button_text: "Chat On WhatsApp",
  contact_whatsapp_link:
    "https://wa.me/923044457505",
  contact_button_text: "Start A Project",
  contact_button_link: "/contact",
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

export default function AdminHomepageSettingsPage() {
  const [form, setForm] =
    useState<HomepageSettings>(defaultSettings);
  const [loading, setLoading] =
    useState(true);
  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const savedContent =
          await getSitePage("homepage");

        if (!mounted) {
          return;
        }

        if (savedContent) {
          setForm({
            ...defaultSettings,
            ...(savedContent as Partial<HomepageSettings>),
            services:
              (savedContent.services as
                | HomeService[]
                | undefined) ??
              defaultSettings.services,
          });
        }
      } catch (error) {
        console.error(
          "Load Homepage Settings Error:",
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

  function updateService(
    index: number,
    field: keyof HomeService,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      services: current.services.map(
        (service, serviceIndex) =>
          serviceIndex === index
            ? {
                ...service,
                [field]: value,
              }
            : service
      ),
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
      await updateSitePage("homepage", form);

      alert(
        "Homepage Settings Saved Successfully."
      );
    } catch (error) {
      console.error(
        "Save Homepage Settings Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Homepage Settings Could Not Be Saved."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-gray-400">
          Loading Homepage Settings...
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
              Homepage Settings
            </h1>

            <p className="mt-3 text-gray-400">
              Manage The Existing Homepage Content.
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
            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="hero_company_name"
                value={form.hero_company_name}
                onChange={handleChange}
                placeholder="143"
                className={inputClass}
              />

              <input
                name="hero_company_highlight"
                value={
                  form.hero_company_highlight
                }
                onChange={handleChange}
                placeholder="Studios"
                className={inputClass}
              />
            </div>

            <input
              name="hero_tagline"
              value={form.hero_tagline}
              onChange={handleChange}
              placeholder="Music Label • Distribution • Publishing • Recording Studio"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-3">
              <input
                name="hero_founder_title"
                value={form.hero_founder_title}
                onChange={handleChange}
                placeholder="Founder & CEO"
                className={inputClass}
              />

              <input
                name="hero_founder_name"
                value={form.hero_founder_name}
                onChange={handleChange}
                placeholder="Wikram Ghafoor"
                className={inputClass}
              />

              <input
                name="hero_founder_brand"
                value={form.hero_founder_brand}
                onChange={handleChange}
                placeholder="GURU"
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="hero_primary_button_text"
                value={
                  form.hero_primary_button_text
                }
                onChange={handleChange}
                placeholder="Explore Services"
                className={inputClass}
              />

              <input
                name="hero_primary_button_link"
                value={
                  form.hero_primary_button_link
                }
                onChange={handleChange}
                placeholder="#services"
                className={inputClass}
              />

              <input
                name="hero_secondary_button_text"
                value={
                  form.hero_secondary_button_text
                }
                onChange={handleChange}
                placeholder="Contact Us"
                className={inputClass}
              />

              <input
                name="hero_secondary_button_link"
                value={
                  form.hero_secondary_button_link
                }
                onChange={handleChange}
                placeholder="#contact"
                className={inputClass}
              />
            </div>

            <input
              name="hero_scroll_text"
              value={form.hero_scroll_text}
              onChange={handleChange}
              placeholder="Scroll Down"
              className={inputClass}
            />
          </SettingsSection>

          <SettingsSection title="About Section">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="about_title_prefix"
                value={form.about_title_prefix}
                onChange={handleChange}
                placeholder="About"
                className={inputClass}
              />

              <input
                name="about_title_highlight"
                value={
                  form.about_title_highlight
                }
                onChange={handleChange}
                placeholder="143 Studios"
                className={inputClass}
              />
            </div>

            <textarea
              name="about_paragraph_one"
              value={form.about_paragraph_one}
              onChange={handleChange}
              rows={6}
              placeholder="About Paragraph One"
              className={inputClass}
            />

            <textarea
              name="about_paragraph_two"
              value={form.about_paragraph_two}
              onChange={handleChange}
              rows={6}
              placeholder="About Paragraph Two"
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

          <SettingsSection title="Services Section">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="services_title_prefix"
                value={
                  form.services_title_prefix
                }
                onChange={handleChange}
                placeholder="Our"
                className={inputClass}
              />

              <input
                name="services_title_highlight"
                value={
                  form.services_title_highlight
                }
                onChange={handleChange}
                placeholder="Services"
                className={inputClass}
              />
            </div>

            <textarea
              name="services_description"
              value={
                form.services_description
              }
              onChange={handleChange}
              rows={4}
              placeholder="Services Description"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="services_button_text"
                value={
                  form.services_button_text
                }
                onChange={handleChange}
                placeholder="View All Services →"
                className={inputClass}
              />

              <input
                name="services_button_link"
                value={
                  form.services_button_link
                }
                onChange={handleChange}
                placeholder="/services"
                className={inputClass}
              />
            </div>

            <div className="space-y-6">
              {form.services.map(
                (service, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-zinc-800 bg-black p-5"
                  >
                    <h3 className="mb-4 text-lg font-black text-red-500">
                      Service {index + 1}
                    </h3>

                    <input
                      value={service.title}
                      onChange={(event) =>
                        updateService(
                          index,
                          "title",
                          event.target.value
                        )
                      }
                      placeholder="Service Title"
                      className={inputClass}
                    />

                    <textarea
                      value={service.description}
                      onChange={(event) =>
                        updateService(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      rows={4}
                      placeholder="Service Description"
                      className={`${inputClass} mt-5`}
                    />
                  </div>
                )
              )}
            </div>
          </SettingsSection>

          <SettingsSection title="Contact Section">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="contact_title_prefix"
                value={
                  form.contact_title_prefix
                }
                onChange={handleChange}
                placeholder="Contact"
                className={inputClass}
              />

              <input
                name="contact_title_highlight"
                value={
                  form.contact_title_highlight
                }
                onChange={handleChange}
                placeholder="Us"
                className={inputClass}
              />
            </div>

            <textarea
              name="contact_description"
              value={form.contact_description}
              onChange={handleChange}
              rows={4}
              placeholder="Contact Description"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="contact_email_label"
                value={
                  form.contact_email_label
                }
                onChange={handleChange}
                placeholder="Email"
                className={inputClass}
              />

              <input
                type="email"
                name="contact_email"
                value={form.contact_email}
                onChange={handleChange}
                placeholder="Email Address"
                className={inputClass}
              />

              <input
                name="contact_whatsapp_label"
                value={
                  form.contact_whatsapp_label
                }
                onChange={handleChange}
                placeholder="WhatsApp"
                className={inputClass}
              />

              <input
                name="contact_whatsapp_button_text"
                value={
                  form.contact_whatsapp_button_text
                }
                onChange={handleChange}
                placeholder="Chat On WhatsApp"
                className={inputClass}
              />

              <input
                type="url"
                name="contact_whatsapp_link"
                value={
                  form.contact_whatsapp_link
                }
                onChange={handleChange}
                placeholder="WhatsApp Link"
                className={inputClass}
              />

              <input
                name="contact_button_text"
                value={
                  form.contact_button_text
                }
                onChange={handleChange}
                placeholder="Start A Project"
                className={inputClass}
              />

              <input
                name="contact_button_link"
                value={
                  form.contact_button_link
                }
                onChange={handleChange}
                placeholder="/contact"
                className={inputClass}
              />

              <input
                name="social_title"
                value={form.social_title}
                onChange={handleChange}
                placeholder="Follow 143 Studios"
                className={inputClass}
              />
            </div>

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
              ? "Saving Homepage Settings..."
              : "Save Homepage Settings"}
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
