"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

   window.location.href = "/admin";
   
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">

      <form
        onSubmit={login}
        className="w-full max-w-md rounded-2xl border border-red-900 bg-zinc-950 p-8 space-y-5"
      >

        <h1 className="text-4xl font-black text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-red-900 bg-zinc-900 p-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-red-900 bg-zinc-900 p-4"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-red-600 p-4 font-bold hover:bg-red-700"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

    </main>
  );
}