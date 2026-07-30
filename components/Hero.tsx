import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 py-24 sm:px-6"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/75"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.20),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto max-w-5xl animate-fade-in text-center">
        <div className="relative mx-auto mb-6 h-28 w-28 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)] md:h-36 md:w-36">
          <Image
            src="/logo.png"
            alt="143 Studios Logo"
            fill
            priority
            sizes="(max-width: 768px) 112px, 144px"
            className="object-contain"
          />
        </div>

        <h1
          id="hero-heading"
          className="text-5xl font-black tracking-wide text-white drop-shadow-lg sm:text-6xl md:text-8xl"
        >
          143 <span className="text-red-600">Studios</span>
        </h1>

        <p className="mt-6 text-base leading-8 text-gray-300 sm:text-lg">
          Music Label • Distribution • Publishing • Recording
          Studio
        </p>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white">
            Founder &amp; CEO
          </h2>

          <p className="mt-2 text-3xl font-extrabold text-red-500 sm:text-4xl">
            Wikram Ghafoor
          </p>

          <p className="mt-2 text-xl font-bold tracking-[0.35em] text-yellow-400 sm:text-2xl">
            GURU
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-6">
          <a
            href="#services"
            className="rounded-xl bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-600/40 transition duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Explore Services
          </a>

          <a
            href="#contact"
            className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition duration-300 hover:scale-105 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Contact Us
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <a
            href="#about"
            aria-label="Scroll Down To About Section"
            className="inline-block text-gray-300 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <span aria-hidden="true">↓</span>
            <br />

            <span className="text-sm tracking-widest">
              Scroll Down
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}