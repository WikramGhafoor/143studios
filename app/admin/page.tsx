export default function AdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        143 Studios Admin Panel
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <a
          href="/admin/artists"
          className="rounded-xl bg-zinc-900 p-6 border border-zinc-800 hover:border-red-600 transition"
        >
          <h2 className="text-2xl font-bold">👤 Artists</h2>
          <p className="mt-2 text-zinc-400">
            Manage Artists
          </p>
        </a>

        <a
          href="/admin/releases"
          className="rounded-xl bg-zinc-900 p-6 border border-zinc-800 hover:border-red-600 transition"
        >
          <h2 className="text-2xl font-bold">🎵 Releases</h2>
          <p className="mt-2 text-zinc-400">
            Manage Releases
          </p>
        </a>

        <a
          href="/admin/uploads"
          className="rounded-xl bg-zinc-900 p-6 border border-zinc-800 hover:border-red-600 transition"
        >
          <h2 className="text-2xl font-bold">🖼 Uploads</h2>
          <p className="mt-2 text-zinc-400">
            Upload Images
          </p>
        </a>

        <a
          href="/admin/settings"
          className="rounded-xl bg-zinc-900 p-6 border border-zinc-800 hover:border-red-600 transition"
        >
          <h2 className="text-2xl font-bold">⚙ Settings</h2>
          <p className="mt-2 text-zinc-400">
            Website Settings
          </p>
        </a>

      </div>
    </main>
  );
}