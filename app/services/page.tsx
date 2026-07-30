import type { Metadata } from "next";
import Link from "next/link";
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

const services = [
  {
    title: "Record Label",
    description:
      "Official Record Label Services Including Artist Signing, Music Releases, Catalog Management, Release Strategy And Long-Term Artist Development.",
    icon: FaCompactDisc,
  },
  {
    title: "Music Production",
    description:
      "Complete Music Production Services From Initial Concept And Composition To Final Professional Recording.",
    icon: FaMusic,
  },
  {
    title: "Recording Studio",
    description:
      "Professional Recording Solutions For Vocals, Instruments, Voiceovers, Podcasts And Creative Audio Projects.",
    icon: FaMicrophone,
  },
  {
    title: "Mixing And Mastering",
    description:
      "Professional Mixing And Mastering Designed To Deliver Clear, Balanced And Release-Ready Audio.",
    icon: FaVolumeUp,
  },
  {
    title: "Artist Management",
    description:
      "Long-Term Artist Development, Career Planning, Brand Strategy, Release Coordination And Professional Representation.",
    icon: FaUserTie,
  },
  {
    title: "Music Distribution",
    description:
      "Worldwide Digital Distribution Across Spotify, Apple Music, YouTube Music And Other Major Streaming Platforms.",
    icon: FaShareAlt,
  },
  {
    title: "Music Publishing",
    description:
      "Publishing Administration, Song Registration, Rights Management And Support For Songwriters And Composers.",
    icon: FaCopyright,
  },
  {
    title: "Release Management",
    description:
      "Complete Release Planning Including Metadata, Cover Artwork, Distribution, Scheduling And Platform Delivery.",
    icon: FaCompactDisc,
  },
  {
    title: "Artist Branding",
    description:
      "Professional Artist Identity, Visual Direction, Cover Artwork, Promotional Design And Brand Development.",
    icon: FaPalette,
  },
  {
    title: "Digital Marketing",
    description:
      "Strategic Digital Campaigns For Music Releases, Artists, Social Media Growth And Audience Development.",
    icon: FaBullhorn,
  },
  {
    title: "Video Production",
    description:
      "Music Videos, Visualizers, Lyric Videos, Promotional Content And Social Media Video Production.",
    icon: FaVideo,
  },
  {
    title: "Digital Media",
    description:
      "Content Creation, Social Media Management, Promotional Assets And Digital Campaign Support.",
    icon: FaHeadphones,
  },
];

const processSteps = [
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
];

const serviceBenefits = [
  "Professional Quality",
  "Transparent Process",
  "Global Distribution",
  "Artist-Focused Strategy",
  "Modern Technology",
  "Long-Term Development",
  "Official Release Support",
  "Dedicated Communication",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero */}
      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24">
          <p className="font-bold uppercase tracking-[0.2em] text-red-500 sm:tracking-[0.3em]">
            143 Studios Services
          </p>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl md:text-7xl">
            Professional Music Services
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            From Record Label Services, Music Production And Artist Management
            To Distribution, Publishing, Branding And Digital Promotion, 143
            Studios Provides Complete Creative And Business Solutions Under One
            Roof.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/contact?service=General%20Inquiry"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Start A Project
            </Link>

            <Link
              href="/releases"
              className="rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Explore Releases
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="text-center">
          <h2 className="text-4xl font-black sm:text-5xl">
            Our Professional Services
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Flexible Services For Independent Artists, Signed Artists,
            Producers, Songwriters, Content Creators And Business Partners.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
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
              Our Working Process
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
              A Clear And Professional Workflow From The First Conversation To
              Final Delivery And Launch.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step) => (
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
              Complete Music Solutions
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Built For Modern Artists
            </h2>

            <p className="mt-8 text-lg leading-9 text-gray-300">
              The Modern Music Industry Requires More Than Recording A Song.
              Artists Need Strong Branding, Reliable Distribution, Accurate
              Metadata, Professional Promotion And Long-Term Career Planning.
            </p>

            <p className="mt-6 text-lg leading-9 text-gray-300">
              143 Studios Brings These Services Together So Artists Can Focus
              On Their Creativity While Our Team Supports The Business,
              Production And Digital Side Of Their Careers.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {serviceBenefits.map((item) => (
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
            Let Us Build Your Next Project
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            Tell Us About Your Music, Creative Project Or Business Requirement.
            Our Team Will Help You Choose The Right Services And Next Steps.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/contact?service=General%20Inquiry"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700"
            >
              Contact 143 Studios
            </Link>

            <Link
              href="/about"
              className="rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white"
            >
              Learn About Us
            </Link>

            <Link
              href="/artists"
              className="rounded-xl border-2 border-white px-8 py-4 font-bold transition-colors hover:bg-white hover:text-black"
            >
              Meet Our Artists
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}