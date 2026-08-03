import type { Metadata } from "next";
import Link from "next/link";
import { getSitePage } from "@/lib/site-pages";
import {
  FaBullhorn,
  FaCompactDisc,
  FaCopyright,
  FaHeadphones,
  FaMicrophone,
  FaMusic,
  FaPalette,
  FaShareAlt,
  FaUserTie,
  FaVideo,
  FaVolumeUp,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Record Label, Music Production, Artist Management, Music Distribution, Publishing, Branding And Digital Media Services From 143 Studios.",
};

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

type ServicesPageContent = {
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
  service_area_eyebrow: string;
  service_area_title: string;
  service_area_paragraph_one: string;
  service_area_paragraph_two: string;
  service_benefits: string[];
  cta_title: string;
  cta_description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  cta_tertiary_text: string;
  cta_tertiary_link: string;
};

const serviceIcons = {
  CompactDisc: FaCompactDisc,
  Music: FaMusic,
  Microphone: FaMicrophone,
  VolumeUp: FaVolumeUp,
  UserTie: FaUserTie,
  ShareAlt: FaShareAlt,
  Copyright: FaCopyright,
  Palette: FaPalette,
  Bullhorn: FaBullhorn,
  Video: FaVideo,
  Headphones: FaHeadphones,
};

const defaultServicesContent: ServicesPageContent = {
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
    { title: "Record Label", description: "Official Record Label Services Including Artist Signing, Music Releases, Catalog Management, Release Strategy And Long-Term Artist Development.", icon: "CompactDisc" },
    { title: "Music Production", description: "Complete Music Production Services From Initial Concept And Composition To Final Professional Recording.", icon: "Music" },
    { title: "Recording Studio", description: "Professional Recording Solutions For Vocals, Instruments, Voiceovers, Podcasts And Creative Audio Projects.", icon: "Microphone" },
    { title: "Mixing And Mastering", description: "Professional Mixing And Mastering Designed To Deliver Clear, Balanced And Release-Ready Audio.", icon: "VolumeUp" },
    { title: "Artist Management", description: "Long-Term Artist Development, Career Planning, Brand Strategy, Release Coordination And Professional Representation.", icon: "UserTie" },
    { title: "Music Distribution", description: "Worldwide Digital Distribution Across Spotify, Apple Music, YouTube Music And Other Major Streaming Platforms.", icon: "ShareAlt" },
    { title: "Music Publishing", description: "Publishing Administration, Song Registration, Rights Management And Support For Songwriters And Composers.", icon: "Copyright" },
    { title: "Release Management", description: "Complete Release Planning Including Metadata, Cover Artwork, Distribution, Scheduling And Platform Delivery.", icon: "CompactDisc" },
    { title: "Artist Branding", description: "Professional Artist Identity, Visual Direction, Cover Artwork, Promotional Design And Brand Development.", icon: "Palette" },
    { title: "Digital Marketing", description: "Strategic Digital Campaigns For Music Releases, Artists, Social Media Growth And Audience Development.", icon: "Bullhorn" },
    { title: "Video Production", description: "Music Videos, Visualizers, Lyric Videos, Promotional Content And Social Media Video Production.", icon: "Video" },
    { title: "Digital Media", description: "Content Creation, Social Media Management, Promotional Assets And Digital Campaign Support.", icon: "Headphones" },
  ],
  process_title: "Our Working Process",
  process_description:
    "A Clear And Professional Workflow From The First Conversation To Final Delivery And Launch.",
  process_steps: [
    { number: "01", title: "Consultation", description: "We Discuss Your Goals, Project Requirements, Creative Direction And Expected Results." },
    { number: "02", title: "Planning", description: "Our Team Creates A Clear Production, Branding, Distribution Or Marketing Plan." },
    { number: "03", title: "Production", description: "The Project Moves Into Recording, Design, Editing, Distribution Or Campaign Development." },
    { number: "04", title: "Review", description: "We Review The Work, Apply Final Changes And Prepare Everything For Professional Delivery." },
    { number: "05", title: "Launch", description: "The Final Project Is Delivered, Published, Distributed Or Launched Across Selected Platforms." },
  ],
  service_area_eyebrow: "Complete Music Solutions",
  service_area_title: "Built For Modern Artists",
  service_area_paragraph_one:
    "The Modern Music Industry Requires More Than Recording A Song. Artists Need Strong Branding, Reliable Distribution, Accurate Metadata, Professional Promotion And Long-Term Career Planning.",
  service_area_paragraph_two:
    "143 Studios Brings These Services Together So Artists Can Focus On Their Creativity While Our Team Supports The Business, Production And Digital Side Of Their Careers.",
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
  cta_title: "Let Us Build Your Next Project",
  cta_description:
    "Tell Us About Your Music, Creative Project Or Business Requirement. Our Team Will Help You Choose The Right Services And Next Steps.",
  cta_primary_text: "Contact 143 Studios",
  cta_primary_link: "/contact?service=General%20Inquiry",
  cta_secondary_text: "Learn About Us",
  cta_secondary_link: "/about",
  cta_tertiary_text: "Meet Our Artists",
  cta_tertiary_link: "/artists",
};

export default async function ServicesPage() {
  const savedContent = await getSitePage("services");

  const content: ServicesPageContent = {
    ...defaultServicesContent,
    ...(savedContent as Partial<ServicesPageContent> | null),
    services:
      (savedContent?.services as ServiceItem[] | undefined) ??
      defaultServicesContent.services,
    process_steps:
      (savedContent?.process_steps as ProcessStep[] | undefined) ??
      defaultServicesContent.process_steps,
    service_benefits:
      (savedContent?.service_benefits as string[] | undefined) ??
      defaultServicesContent.service_benefits,
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero */}
      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24">
          <p className="font-bold uppercase tracking-[0.2em] text-red-500 sm:tracking-[0.3em]">
            {content.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl md:text-7xl">
            {content.hero_title}
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            {content.hero_description}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href={content.primary_button_link}
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {content.primary_button_text}
            </Link>

            <Link
              href={content.secondary_button_link}
              className="rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {content.secondary_button_text}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="text-center">
          <h2 className="text-4xl font-black sm:text-5xl">
            {content.services_title}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            {content.services_description}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service) => {
            const Icon =
              serviceIcons[
                service.icon as keyof typeof serviceIcons
              ] ?? FaMusic;
            const contactUrl = `/contact?service=${encodeURIComponent(
              service.title
            )}`;

            return (
              <article
                key={service.title}
                className="group min-w-0 rounded-3xl border border-red-900 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/20"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-700 bg-red-950 text-2xl text-red-400 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <Icon aria-hidden="true" />
                </div>

                <h3 className="mt-7 break-words text-2xl font-black">
                  {service.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-400">
                  {service.description}
                </p>

                <Link
                  href={contactUrl}
                  className="mt-6 inline-block font-bold text-red-500 transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  Request This Service →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-4xl font-black sm:text-5xl">
              {content.process_title}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              {content.process_description}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {content.process_steps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-red-900 bg-black p-7"
              >
                <p className="text-4xl font-black text-red-600">
                  {step.number}
                </p>

                <h3 className="mt-5 text-2xl font-black">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[0.18em] text-red-500 sm:tracking-[0.25em]">
              {content.service_area_eyebrow}
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              {content.service_area_title}
            </h2>

            <p className="mt-8 text-lg leading-9 text-gray-300">
              {content.service_area_paragraph_one}
            </p>

            <p className="mt-6 text-lg leading-9 text-gray-300">
              {content.service_area_paragraph_two}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {content.service_benefits.map((item) => (
              <div
                key={item}
                className="flex min-w-0 items-center gap-4 rounded-2xl border border-red-900 bg-zinc-950 p-5"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl font-black text-red-500"
                >
                  ✓
                </span>

                <p className="min-w-0 break-words font-bold">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-red-900 bg-gradient-to-b from-zinc-950 to-black py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black sm:text-5xl">
            {content.cta_title}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            {content.cta_description}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href={content.cta_primary_link}
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700"
            >
              {content.cta_primary_text}
            </Link>

            <Link
              href={content.cta_secondary_link}
              className="rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white"
            >
              {content.cta_secondary_text}
            </Link>

            <Link
              href={content.cta_tertiary_link}
              className="rounded-xl border-2 border-white px-8 py-4 font-bold transition-colors hover:bg-white hover:text-black"
            >
              {content.cta_tertiary_text}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}