export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600"></div>

        <h2 className="mt-8 text-3xl font-black text-white">
          143 Studios
        </h2>

        <p className="mt-4 text-gray-400">
          Loading...
        </p>
      </div>
    </main>
  );
}