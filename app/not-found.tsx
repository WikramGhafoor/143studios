import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-2xl text-center">
        <h1 className="text-8xl font-black text-red-600">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-black">
          Page Not Found
        </h2>

        <p className="mt-6 leading-8 text-gray-400">
          The Page You Are Looking For Does Not Exist
          Or Has Been Moved.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link
            href="/"
            className="rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-700"
          >
            Back To Home
          </Link>

          <Link
            href="/search"
            className="rounded-xl border border-red-600 px-8 py-4 font-bold text-red-500 transition hover:bg-red-600 hover:text-white"
          >
            Search Website
          </Link>
        </div>
      </div>
    </main>
  );
}