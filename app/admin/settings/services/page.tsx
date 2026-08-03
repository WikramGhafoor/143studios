"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getSitePage,
  updateSitePage,
} from "@/lib/site-pages";

type ServiceItem = {
  title: string;
  description: string;
  icon: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ServicesSettings = {
  eyebrow: string;
  hero_title: string;
  hero_description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  services_title: string;
  services_description: string;
  services: ServiceItem[];
  process_title: string;
  process_description: string;
  process_steps: ProcessStep[];
  benefits_title: string;
  benefits_description: string;
  service_benefits: string[];
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  cta_button_link: string;
};

const iconOptions = [
  "CompactDisc",
  "Music",
  "Microphone",
  "VolumeUp",
  "UserTie",
  "ShareAlt",
  "Copyright",
  "Palette",
  "Bullhorn",
  "Video",
  "Headphones",
];

const defaultSettings: ServicesSettings = {
  eyebrow: "143 Studios Services",
  hero_title: "Professional Music Services",
  hero_description:
    "From Record Label Services, Music Production And Artist Management To Distribution, Publishing, Branding And Digital Promotion, 143 Studios Provides Complete Creative And Business Solutions Under One Roof.",
  primary_button_text: "Start A Project",
  primary_button_link: "/contact?service=General%20Inquiry",
  secondary_button_text: "Explore Releases",
  secondary_button_link: "/releases",
  services_title: "Our Professional Services",
  services_description:
    "Flexible Services For Independent Artists, Signed Artists, Producers, Songwriters, Content Creators And Business Partners.",
  services: [
    {
      title: "Record Label",
      description:
        "Official Record Label Services Including Artist Signing, Music Releases, Catalog Management, Release Strategy And Long-Term Artist Development.",
      icon: "CompactDisc",
    },
    {
      title: "Music Production",
      description:
        "Complete Music Production Services From Initial Concept And Composition To Final Professional Recording.",
      icon: "Music",
    },
    {
      title: "Recording Studio",
      description:
        "Professional Recording Solutions For Vocals, Instruments, Voiceovers, Podcasts And Creative Audio Projects.",
      icon: "Microphone",
    },
    {
      title: "Mixing And Mastering",
      description:
        "Professional Mixing And Mastering Designed To Deliver Clear, Balanced And Release-Ready Audio.",
      icon: "VolumeUp",
    },
    {
      title: "Artist Management",
      description:
        "Long-Term Artist Development, Career Planning, Brand Strategy, Release Coordination And Professional Representation.",
      icon: "UserTie",
    },
    {
      title: "Music Distribution",
      description:
        "Worldwide Digital Distribution Across Spotify, Apple Music, YouTube Music And Other Major Streaming Platforms.",
      icon: "ShareAlt",
    },
    {
      title: "Music Publishing",
      description:
        "Publishing Administration, Song Registration, Rights Management And Support For Songwriters And Composers.",
      icon: "Copyright",
    },
    {
      title: "Release Management",
      description:
        "Complete Release Planning Including Metadata, Cover Artwork, Distribution, Scheduling And Platform Delivery.",
      icon: "CompactDisc",
    },
    {
      title: "Artist Branding",
      description:
        "Professional Artist Identity, Visual Direction, Cover Artwork, Promotional Design And Brand Development.",
      icon: "Palette",
    },
    {
      title: "Digital Marketing",
      description:
        "Strategic Digital Campaigns For Music Releases, Artists, Social Media Growth And Audience Development.",
      icon: "Bullhorn",
    },
    {
      title: "Video Production",
      description:
        "Music Videos, Visualizers, Lyric Videos, Promotional Content And Social Media Video Production.",
      icon: "Video",
    },
    {
      title: "Digital Media",
      description:
        "Content Creation, Social Media Management, Promotional Assets And Digital Campaign Support.",
      icon: "Headphones",
    },
  ],
  process_title: "Our Working Process",
  process_description:
    "A Clear And Professional Workflow From The First Conversation To Final Delivery And Launch.",
  process_steps: [
    {
      number: "01",
      title: "Consultation",
      description:
        "We Discuss Your Goals, Project Requirements, Creative Direction And Expected Results.",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Our Team Creates A Clear Production, Branding, Distribution Or Marketing Plan.",
    },
    {
      number: "03",
      title: "Production",
      description:
        "The Project Moves Into Recording, Design, Editing, Distribution Or Campaign Development.",
    },
    {
      number: "04",
      title: "Review",
      description:
        "We Review The Work, Apply Final Changes And Prepare Everything For Professional Delivery.",
    },
    {
      number: "05",
      title: "Launch",
      description:
        "The Final Project Is Delivered, Published, Distributed Or Launched Across Selected Platforms.",
    },
  ],
  benefits_title: "Why Choose 143 Studios",
  benefits_description:
    "Professional Support, Transparent Communication And Long-Term Creative Development.",
  service_benefits: [
    "Professional Quality",
    "Transparent Process",
    "Global Distribution",
    "Artist-Focused Strategy",
    "Modern Technology",
    "Long-Term Development",
    "Official Release Support",
    "Dedicated Communication",
  ],
  cta_title: "Ready To Start Your Project?",
  cta_description:
    "Contact 143 Studios And Tell Us About Your Music, Artist, Production Or Creative Project.",
  cta_button_text: "Contact 143 Studios",
  cta_button_link: "/contact?service=General%20Inquiry",
};

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500";

export default function AdminServicesSettingsPage() {
  const [form, setForm] =
    useState<ServicesSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      const savedContent =
        await getSitePage("services");

      if (!mounted) {
        return;
      }

      if (savedContent) {
        setForm({
          ...defaultSettings,
          ...(savedContent as Partial<ServicesSettings>),
          services:
            (savedContent.services as ServiceItem[] | undefined) ??
            defaultSettings.services,
          process_steps:
            (savedContent.process_steps as ProcessStep[] | undefined) ??
            defaultSettings.process_steps,
          service_benefits:
            (savedContent.service_benefits as string[] | undefined) ??
            defaultSettings.service_benefits,
        });
      }

      setLoading(false);
    }

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField(
    name: keyof ServicesSettings,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function updateService(
    index: number,
    field: keyof ServiceItem,
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

  function updateProcessStep(
    index: number,
    field: keyof ProcessStep,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      process_steps: current.process_steps.map(
        (step, stepIndex) =>
          stepIndex === index
            ? {
                ...step,
                [field]: value,
              }
            : step
      ),
    }));
  }

  function updateBenefit(
    index: number,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      service_benefits:
        current.service_benefits.map(
          (benefit, benefitIndex) =>
            benefitIndex === index
              ? value
              : benefit
        ),
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
      await updateSitePage("services", form);
      alert(
        "Services Page Settings Saved Successfully."
      );
    } catch (error) {
      console.error(
        "Save Services Settings Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Services Page Settings Could Not Be Saved."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-gray-400">
          Loading Services Settings...
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
              Services Settings
            </h1>

            <p className="mt-3 text-gray-400">
              Manage The Existing Services Page Content.
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
              value={form.eyebrow}
              onChange={(event) =>
                updateField(
                  "eyebrow",
                  event.target.value
                )
              }
              placeholder="143 Studios Services"
              className={inputClass}
            />

            <input
              value={form.hero_title}
              onChange={(event) =>
                updateField(
                  "hero_title",
                  event.target.value
                )
              }
              placeholder="Professional Music Services"
              className={inputClass}
            />

            <textarea
              value={form.hero_description}
              onChange={(event) =>
                updateField(
                  "hero_description",
                  event.target.value
                )
              }
              rows={6}
              placeholder="Hero Description"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                value={form.primary_button_text}
                onChange={(event) =>
                  updateField(
                    "primary_button_text",
                    event.target.value
                  )
                }
                placeholder="Primary Button Text"
                className={inputClass}
              />

              <input
                value={form.primary_button_link}
                onChange={(event) =>
                  updateField(
                    "primary_button_link",
                    event.target.value
                  )
                }
                placeholder="Primary Button Link"
                className={inputClass}
              />

              <input
                value={form.secondary_button_text}
                onChange={(event) =>
                  updateField(
                    "secondary_button_text",
                    event.target.value
                  )
                }
                placeholder="Secondary Button Text"
                className={inputClass}
              />

              <input
                value={form.secondary_button_link}
                onChange={(event) =>
                  updateField(
                    "secondary_button_link",
                    event.target.value
                  )
                }
                placeholder="Secondary Button Link"
                className={inputClass}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Services Section">
            <input
              value={form.services_title}
              onChange={(event) =>
                updateField(
                  "services_title",
                  event.target.value
                )
              }
              placeholder="Our Professional Services"
              className={inputClass}
            />

            <textarea
              value={form.services_description}
              onChange={(event) =>
                updateField(
                  "services_description",
                  event.target.value
                )
              }
              rows={4}
              placeholder="Services Section Description"
              className={inputClass}
            />

            <div className="space-y-6">
              {form.services.map(
                (service, index) => (
                  <div
                    key={`${service.title}-${index}`}
                    className="rounded-2xl border border-zinc-800 bg-black p-5"
                  >
                    <h3 className="mb-4 text-lg font-black text-red-500">
                      Service {index + 1}
                    </h3>

                    <div className="grid gap-5 md:grid-cols-2">
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

                      <select
                        value={service.icon}
                        onChange={(event) =>
                          updateService(
                            index,
                            "icon",
                            event.target.value
                          )
                        }
                        className={inputClass}
                      >
                        {iconOptions.map(
                          (icon) => (
                            <option
                              key={icon}
                              value={icon}
                            >
                              {icon}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <textarea
                      value={service.description}
                      onChange={(event) =>
                        updateService(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      rows={5}
                      placeholder="Service Description"
                      className={`${inputClass} mt-5`}
                    />
                  </div>
                )
              )}
            </div>
          </SettingsSection>

          <SettingsSection title="Working Process">
            <input
              value={form.process_title}
              onChange={(event) =>
                updateField(
                  "process_title",
                  event.target.value
                )
              }
              placeholder="Our Working Process"
              className={inputClass}
            />

            <textarea
              value={form.process_description}
              onChange={(event) =>
                updateField(
                  "process_description",
                  event.target.value
                )
              }
              rows={4}
              placeholder="Process Section Description"
              className={inputClass}
            />

            <div className="space-y-6">
              {form.process_steps.map(
                (step, index) => (
                  <div
                    key={`${step.number}-${index}`}
                    className="rounded-2xl border border-zinc-800 bg-black p-5"
                  >
                    <h3 className="mb-4 text-lg font-black text-red-500">
                      Process Step {index + 1}
                    </h3>

                    <div className="grid gap-5 md:grid-cols-2">
                      <input
                        value={step.number}
                        onChange={(event) =>
                          updateProcessStep(
                            index,
                            "number",
                            event.target.value
                          )
                        }
                        placeholder="Step Number"
                        className={inputClass}
                      />

                      <input
                        value={step.title}
                        onChange={(event) =>
                          updateProcessStep(
                            index,
                            "title",
                            event.target.value
                          )
                        }
                        placeholder="Step Title"
                        className={inputClass}
                      />
                    </div>

                    <textarea
                      value={step.description}
                      onChange={(event) =>
                        updateProcessStep(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      rows={4}
                      placeholder="Step Description"
                      className={`${inputClass} mt-5`}
                    />
                  </div>
                )
              )}
            </div>
          </SettingsSection>

          <SettingsSection title="Benefits Section">
            <input
              value={form.benefits_title}
              onChange={(event) =>
                updateField(
                  "benefits_title",
                  event.target.value
                )
              }
              placeholder="Why Choose 143 Studios"
              className={inputClass}
            />

            <textarea
              value={form.benefits_description}
              onChange={(event) =>
                updateField(
                  "benefits_description",
                  event.target.value
                )
              }
              rows={4}
              placeholder="Benefits Section Description"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-2">
              {form.service_benefits.map(
                (benefit, index) => (
                  <input
                    key={index}
                    value={benefit}
                    onChange={(event) =>
                      updateBenefit(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Benefit ${index + 1}`}
                    className={inputClass}
                  />
                )
              )}
            </div>
          </SettingsSection>

          <SettingsSection title="Call To Action">
            <input
              value={form.cta_title}
              onChange={(event) =>
                updateField(
                  "cta_title",
                  event.target.value
                )
              }
              placeholder="CTA Title"
              className={inputClass}
            />

            <textarea
              value={form.cta_description}
              onChange={(event) =>
                updateField(
                  "cta_description",
                  event.target.value
                )
              }
              rows={4}
              placeholder="CTA Description"
              className={inputClass}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                value={form.cta_button_text}
                onChange={(event) =>
                  updateField(
                    "cta_button_text",
                    event.target.value
                  )
                }
                placeholder="CTA Button Text"
                className={inputClass}
              />

              <input
                value={form.cta_button_link}
                onChange={(event) =>
                  updateField(
                    "cta_button_link",
                    event.target.value
                  )
                }
                placeholder="CTA Button Link"
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
              ? "Saving Services Settings..."
              : "Save Services Settings"}
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
