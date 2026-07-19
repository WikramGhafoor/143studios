export default function Releases() {
  return (
    <section
      id="releases"
      className="bg-black px-6 py-24"
    >
      <div className="mx-auto max-w-6xl text-center">

        <h2 className="text-5xl font-black text-white">
          Latest <span className="text-red-600">Releases</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Explore Official Music Releases From 143 Studios. Singles, Albums,
          EPs And Future Projects Will Be Available Here Across All Major
          Streaming Platforms.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {/* Release Card */}

          <div className="rounded-2xl border border-red-900 bg-neutral-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl border-2 border-red-600 bg-black text-5xl">
              💿
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              Coming Soon
            </h3>

            <p className="mt-4 text-gray-400">
              Official Singles And Albums Will Be Released Here Soon.
            </p>

          </div>

          {/* Release Card */}

          <div className="rounded-2xl border border-red-900 bg-neutral-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl border-2 border-red-600 bg-black text-5xl">
              🎵
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              New Music
            </h3>

            <p className="mt-4 text-gray-400">
              New Projects, Collaborations And Exclusive Releases Will Appear
              Here.
            </p>

          </div>

          {/* Release Card */}

          <div className="rounded-2xl border border-red-900 bg-neutral-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl border-2 border-red-600 bg-black text-5xl">
              🚀
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              Stay Tuned
            </h3>

            <p className="mt-4 text-gray-400">
              Follow 143 Studios To Be The First To Listen To Upcoming Releases.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}