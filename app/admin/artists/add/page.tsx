"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function AddArtistPage() {
    const [stageName, setStageName] = useState("");
const [realName, setRealName] = useState("");
const [artistType, setArtistType] = useState("");
const [genre, setGenre] = useState("");
const [city, setCity] = useState("");
const [bio, setBio] = useState("");
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Add New Artist
      </h1>

      <form className="max-w-2xl space-y-5">

        <input
          type="text"
          placeholder="Stage Name"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          type="text"
          placeholder="Real Name"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          type="text"
          placeholder="Artist Type"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          type="text"
          placeholder="Genre"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          type="text"
          placeholder="City"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <textarea
          rows={6}
          placeholder="Artist Bio"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
        />

        <button
          type="submit"
          className="rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
        >
          Save Artist
        </button>

      </form>
    </main>
  );
}