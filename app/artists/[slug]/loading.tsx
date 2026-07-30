export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="animate-pulse">
        <div className="h-[420px] w-full bg-zinc-800" />

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="aspect-square rounded-3xl bg-zinc-800" />

            <div className="space-y-6 lg:col-span-2">
              <div className="h-6 w-40 rounded bg-zinc-800" />
              <div className="h-14 w-3/4 rounded bg-zinc-800" />
              <div className="h-8 w-1/3 rounded bg-zinc-800" />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-24 rounded-2xl bg-zinc-800"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 h-48 rounded-3xl bg-zinc-800" />

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-red-900 bg-zinc-950"
              >
                <div className="aspect-square bg-zinc-800" />

                <div className="space-y-4 p-6">
                  <div className="h-7 w-2/3 rounded bg-zinc-800" />
                  <div className="h-5 w-1/2 rounded bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}