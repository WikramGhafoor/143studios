import type { Metadata } from "next";
import Link from "next/link";
import { getSitePageServer } from "@/lib/site-pages-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn More About 143 Studios, Our Story, Mission, Vision And Commitment To Artists Worldwide.",
  alternates: {
    canonical: "https://143studios.online/about",
  },
};


type AboutPageContent = {
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

const defaultAboutContent: AboutPageContent = {
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

const coreValues = [
  {
    title: "Creativity",
    text: "Every Project Begins With Original Ideas And Authentic Storytelling.",
  },
  {
    title: "Quality",
    text: "We Focus On Professional Production And International Standards.",
  },
  {
    title: "Integrity",
    text: "Transparency, Respect And Trust Guide Every Partnership.",
  },
  {
    title: "Innovation",
    text: "We Embrace New Technologies To Reach Global Audiences.",
  },
];

const services = [
  { title: "Music Production", description: "Original Composition, Beat Production And Complete Song Development From Concept To Final Recording." },
  { title: "Artist Management", description: "Career Planning, Release Coordination, Professional Representation And Long-Term Artist Development." },
  { title: "Music Distribution", description: "Worldwide Delivery To Spotify, Apple Music, YouTube Music And Other Major Digital Platforms." },
  { title: "Publishing Administration", description: "Song Registration, Copyright Administration, Rights Management And Royalty Support." },
  { title: "Digital Marketing", description: "Focused Release Campaigns, Audience Development And Social Media Promotion For Artists And Music." },
  { title: "Brand Development", description: "Artist Identity, Visual Direction, Cover Artwork And Consistent Creative Positioning." },
  { title: "Recording Studio", description: "Professional Vocal, Instrument, Voiceover And Creative Audio Recording Services." },
  { title: "Mixing & Mastering", description: "Clear, Balanced And Release-Ready Audio Prepared For Streaming And Commercial Platforms." },
  { title: "Content Creation", description: "Music Videos, Visualizers, Lyric Videos And Promotional Content For Digital Campaigns." },
];

const benefits = [
  "Professional Music Label",
  "Global Digital Distribution",
  "Modern Recording & Production",
  "Artist Branding & Marketing",
  "Worldwide Streaming Platforms",
  "Long-Term Artist Development",
];

const statistics = [
  {
    value: "Growing",
    label: "Artists",
  },
  {
    value: "Worldwide",
    label: "Distribution",
  },
  {
    value: "Unlimited",
    label: "Creativity",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export default async function AboutPage() {
  const savedContent = await getSitePageServer("about");

  const content: AboutPageContent = {
    ...defaultAboutContent,
    ...(savedContent as Partial<AboutPageContent> | null),
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero */}
      <section className="border-b border-red-900 bg-gradient-to-b from-black to-zinc-950">
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
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">
              {content.story_title}
            </h2>

            <p className="mt-8 leading-8 text-gray-300 sm:leading-9">
              {content.story_paragraph_one}
            </p>

            <p className="mt-6 leading-8 text-gray-300 sm:leading-9">
              {content.story_paragraph_two}
            </p>
          </div>

          <div className="rounded-3xl border border-red-900 bg-zinc-950 p-6 sm:p-10">
            <h3 className="text-2xl font-black text-red-500 sm:text-3xl">
              {content.mission_title}
            </h3>

            <p className="mt-6 leading-8 text-gray-300 sm:leading-9">
              {content.mission_text}
            </p>

            <div className="mt-10 border-t border-zinc-800 pt-8">
              <h3 className="text-2xl font-black text-red-500 sm:text-3xl">
                {content.vision_title}
              </h3>

              <p className="mt-6 leading-8 text-gray-300 sm:leading-9">
                {content.vision_text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-4xl font-black sm:text-5xl">
            {content.core_values_title}
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {coreValues.map(({ title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-red-900 bg-black p-8"
              >
                <h3 className="text-2xl font-black text-red-500">
                  {title}
                </h3>

                <p className="mt-5 leading-8 text-gray-400">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <h2 className="text-center text-4xl font-black sm:text-5xl">
          {content.what_we_do_title}
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="min-w-0 rounded-2xl border border-red-900 bg-zinc-950 p-8 transition-colors hover:border-red-600"
            >
              <h3 className="break-words text-2xl font-black text-red-500">
                {service.title}
              </h3>

              <p className="mt-4 leading-8 text-gray-400">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-4xl font-black sm:text-5xl">
            {content.why_choose_title}
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex min-w-0 items-center gap-4 rounded-2xl border border-red-900 bg-black p-6"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 text-3xl text-red-500"
                >
                  ✓
                </span>

                <p className="min-w-0 break-words text-lg font-bold sm:text-xl">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-8 text-center sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map(({ value, label }) => (
            <div
              key={label}
              className="min-w-0 rounded-3xl border border-red-900 bg-zinc-950 px-4 py-10 sm:px-6"
            >
              <p className="whitespace-nowrap text-[clamp(1.75rem,3.5vw,3rem)] font-black leading-none text-red-500">
                {value}
              </p>

              <p className="mt-4 text-lg font-bold sm:text-xl">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-red-900 bg-gradient-to-b from-zinc-950 to-black py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-4xl font-black sm:text-5xl">
            {content.cta_title}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            {content.cta_text}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/artists"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700"
            >
              Meet Our Artists
            </Link>

            <Link
              href="/releases"
              className="rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white"
            >
              Explore Releases
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border-2 border-white px-8 py-4 font-bold transition-colors hover:bg-white hover:text-black"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
