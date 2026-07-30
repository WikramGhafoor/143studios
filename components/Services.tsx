import Link from "next/link";

const services = [
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
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-neutral-950 px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Our{" "}
            <span className="text-red-600">
              Services
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Professional Music, Recording And Digital
            Solutions Delivered Under One Creative Platform.
          </p>
        </div>

        <div className="mt-16 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex h-full flex-col rounded-2xl border border-red-900 bg-black p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30"
            >
              <h3 className="text-2xl font-black text-white">
                {service.title}
              </h3>

              <p className="mt-5 flex-1 leading-7 text-gray-400">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center rounded-xl border border-red-600 px-8 py-4 font-bold text-red-500 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}