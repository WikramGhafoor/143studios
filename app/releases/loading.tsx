export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mx-auto h-14 w-64 rounded-2xl bg-zinc-800" />

        <div className="mx-auto mt-6 h-5 w-96 max-w-full rounded bg-zinc-800" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-red-900 bg-zinc-950"
            >
              <div className="aspect-square bg-zinc-800" />

              <div className="space-y-4 p-6">
                <div className="h-7 w-2/3 rounded bg-zinc-800" />
                <div className="h-5 w-1/2 rounded bg-zinc-800" />
                <div className="h-4 w-1/3 rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}