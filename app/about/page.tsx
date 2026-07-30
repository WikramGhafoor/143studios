import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn More About 143 Studios, Our Story, Mission, Vision And Commitment To Artists Worldwide.",
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
  "Music Production",
  "Artist Management",
  "Music Distribution",
  "Publishing Administration",
  "Digital Marketing",
  "Brand Development",
  "Recording Studio",
  "Mixing & Mastering",
  "Content Creation",
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

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero */}
      <section className="border-b border-red-900 bg-gradient-to-b from-black to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24">
          <p className="font-bold uppercase tracking-[0.2em] text-red-500 sm:tracking-[0.3em]">
            About 143 Studios
          </p>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl md:text-7xl">
            Music Beyond Limits
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            143 Studios Is A Modern Music Label Dedicated To
            Discovering Talent, Producing Exceptional Music,
            Building Artist Brands And Delivering Creative
            Entertainment To Audiences Around The World.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">
              Our Story
            </h2>

            <p className="mt-8 leading-8 text-gray-300 sm:leading-9">
              143 Studios Was Founded With A Vision To Build A
              Professional Platform Where Artists, Producers,
              Songwriters And Creative Professionals Can Grow
              Together. Our Goal Is To Create High Quality
              Music While Helping Artists Build Long-Term
              Careers Through Modern Technology And Global
              Distribution.
            </p>

            <p className="mt-6 leading-8 text-gray-300 sm:leading-9">
              We Believe Every Artist Has A Unique Story.
              Through Recording, Publishing, Distribution,
              Branding And Digital Promotion, We Transform
              Creative Ideas Into Professional Music Projects.
            </p>
          </div>

          <div className="rounded-3xl border border-red-900 bg-zinc-950 p-6 sm:p-10">
            <h3 className="text-2xl font-black text-red-500 sm:text-3xl">
              Our Mission
            </h3>

            <p className="mt-6 leading-8 text-gray-300 sm:leading-9">
              To Empower Artists By Providing World-Class
              Music Production, Distribution, Publishing,
              Branding And Digital Solutions Under One Roof.
            </p>

            <div className="mt-10 border-t border-zinc-800 pt-8">
              <h3 className="text-2xl font-black text-red-500 sm:text-3xl">
                Our Vision
              </h3>

              <p className="mt-6 leading-8 text-gray-300 sm:leading-9">
                To Become One Of The Most Trusted Independent
                Music Labels In The World By Creating Music
                That Inspires Millions And Building Careers
                That Last For Generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-zinc-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-4xl font-black sm:text-5xl">
            Our Core Values
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
          What We Do
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service}
              className="min-w-0 rounded-2xl border border-red-900 bg-zinc-950 p-8 transition-colors hover:border-red-600"
            >
              <h3 className="break-words text-2xl font-black text-red-500">
                {service}
              </h3>

              <p className="mt-4 leading-8 text-gray-400">
                Professional Solutions Designed To Help Artists
                Build Successful Careers In Today&apos;s Music
                Industry.
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-4xl font-black sm:text-5xl">
            Why Choose 143 Studios
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
            Ready To Work With 143 Studios?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            Whether You Are An Artist, Producer, Songwriter,
            Content Creator Or Business Partner, We Are Ready
            To Build The Future Together.
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