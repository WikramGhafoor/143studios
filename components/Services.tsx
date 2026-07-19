export default function Services() {
  const services = [
    {
      title: "Song Writing",
      description:
        "Creating Professional Lyrics And Song Concepts With Creative Storytelling And Artistic Expression.",
    },
    {
      title: "Music Composing",
      description:
        "Creating Original Melodies, Harmonies And Musical Arrangements For Unique Sound Experiences.",
    },
    {
      title: "Beat Production",
      description:
        "Producing Professional Beats And Instrumentals For Artists Across Multiple Music Genres.",
    },
    {
      title: "Song Recording",
      description:
        "Professional Vocal Recording Services With Quality Audio Production And Studio Support.",
    },
    {
      title: "Music Distribution",
      description:
        "Distributing Music Worldwide Across Digital Streaming Platforms And Music Stores.",
    },
    {
      title: "Music Publishing",
      description:
        "Managing Music Rights, Publishing Opportunities And Creative Works For Artists.",
    },
    {
      title: "Music Promotion",
      description:
        "Promoting Music Releases Through Digital Marketing And Audience Growth Strategies.",
    },
    {
      title: "Video Services",
      description:
        "Creating Professional Music Videos, Visual Content And Digital Media Experiences.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-neutral-950 px-6 py-24"
    >

      <div className="mx-auto max-w-7xl text-center">

        <h2 className="text-5xl font-black text-white">
          Our <span className="text-red-600">Services</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
          Professional Music And Digital Solutions Crafted Under 143 Studios.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-red-900 bg-black p-8 transition hover:scale-105 hover:border-red-500"
            >

              <h3 className="text-xl font-bold text-white">
                {service.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {service.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}