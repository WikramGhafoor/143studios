export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-6"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Red Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.20),transparent_65%)]"></div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center animate-fade-in">

        <h1 className="text-6xl font-black tracking-wide text-white drop-shadow-lg md:text-8xl">
          143 <span className="text-red-600">Studios</span>
        </h1>

        <p className="mt-5 text-2xl font-semibold text-gray-200">
          Official Website
        </p>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          Music Label • Distribution • Publishing • Recording Studio
        </p>

        <div className="mt-12">

          <h2 className="text-2xl font-bold text-white">
            Founder & CEO
          </h2>

          <h3 className="mt-2 text-4xl font-extrabold text-red-500">
            Wikram Ghafoor
          </h3>

          <p className="mt-2 text-2xl font-bold tracking-[0.35em] text-yellow-400">
            GURU
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-14 flex flex-wrap justify-center gap-6">

          <a
            href="#services"
            className="rounded-xl bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-600/40 transition duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/80"
          >
            Explore Services
          </a>

          <a
            href="#contact"
            className="rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition duration-300 hover:scale-105 hover:bg-white hover:text-black"
          >
            Contact Us
          </a>

        </div>

        {/* Scroll Down */}

        <div className="mt-16 animate-bounce">

          <a
            href="#about"
            className="text-gray-300 transition hover:text-red-500"
          >
            ↓
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