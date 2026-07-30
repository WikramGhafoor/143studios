export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-red-900 bg-zinc-950 p-8">

        <h1 className="text-4xl font-black text-center">
          Admin <span className="text-red-600">Login</span>
        </h1>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-3 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-zinc-700 bg-black px-5 py-3 text-white"
          />

          <button
            className="w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700"
          >
            Login
          </button>

        </div>

      </div>

    </main>
  );
}