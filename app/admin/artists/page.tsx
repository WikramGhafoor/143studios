export default function ArtistsAdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Artist Manager
      </h1>

      <a
  href="/admin/artists/add"
  className="inline-block rounded-lg bg-red-600 px-5 py-3 font-bold hover:bg-red-700"
>
  + Add New Artist
</a>

      <div className="mt-10 rounded-xl border border-zinc-800 p-6">

        <p>No Artists Added Yet.</p>

      </div>

    </main>
  );
}