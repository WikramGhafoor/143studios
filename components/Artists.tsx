export default function Artists() {
  return (
    <section
      id="artists"
      className="bg-neutral-950 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl text-center">

        <h2 className="text-5xl font-black text-white">
          Our <span className="text-red-600">Artists</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Meet The Talented Artists Working With 143 Studios. Our Platform Is
          Dedicated To Supporting Emerging And Established Artists Through
          Professional Music Production, Distribution, Publishing And Creative
          Services.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {/* Artist Card */}

          <div className="rounded-2xl border border-red-900 bg-black p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-red-600 bg-neutral-900 text-4xl text-red-500">
              🎤
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              Coming Soon
            </h3>

            <p className="mt-4 text-gray-400">
              Official Artists Will Be Featured Here With Their Profiles,
              Releases And Music Journey.
            </p>

          </div>

          {/* Artist Card */}

          <div className="rounded-2xl border border-red-900 bg-black p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-red-600 bg-neutral-900 text-4xl text-red-500">
              🎧
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              Coming Soon
            </h3>

            <p className="mt-4 text-gray-400">
              Discover New Talent, Exclusive Collaborations And Professional
              Music Projects.
            </p>

          </div>

          {/* Artist Card */}

          <div className="rounded-2xl border border-red-900 bg-black p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-red-600 bg-neutral-900 text-4xl text-red-500">
              ⭐
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              Join 143 Studios
            </h3>

            <p className="mt-4 text-gray-400">
              Interested In Working With 143 Studios? Artist Registration Will
              Be Available Soon.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}