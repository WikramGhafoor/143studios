"use client";

import { useState } from "react";
import { releases } from "@/data/releases";
import ReleaseCard from "../../components/ReleaseCard";
import Link from "next/link";

export default function ReleasesPage() {

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");


  const filteredReleases = releases.filter((release) => {

    const matchesSearch =
      release.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesType =
      type === "All" || release.type === type;

    return matchesSearch && matchesType;

  });


  return (

    <main className="min-h-screen bg-black px-6 py-24 text-white">

      <div className="mx-auto max-w-7xl">


        <div className="text-center">

          <h1 className="text-5xl font-black">
            All <span className="text-red-600">Releases</span>
          </h1>


          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
            Explore official music releases from 143 Studios artists.
          </p>


          <p className="mt-6 text-gray-400">
            Total Releases:
            <span className="ml-2 font-bold text-red-500">
              {filteredReleases.length}
            </span>
          </p>


          <input
            type="text"
            placeholder="Search Releases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mx-auto mt-8 block w-full max-w-2xl rounded-xl border border-red-900 bg-neutral-950 px-5 py-4 text-white"
          />


          <div className="mt-6 flex justify-center gap-4">

            {["All", "Single", "Album"].map((item) => (

              <button
                key={item}
                onClick={() => setType(item)}
                className="rounded-xl border border-red-600 px-5 py-2 font-bold text-white transition hover:bg-red-600"
              >
                {item}
              </button>

            ))}

          </div>

        </div>



        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {filteredReleases.map((release) => (

            <ReleaseCard
              key={release.id}
              release={release}
            />

          ))}


        </div>



        <div className="mt-16 text-center">

          <Link
            href="/"
            className="rounded-xl border-2 border-red-600 px-6 py-3 font-bold hover:bg-red-600"
          >
            ← Back To Home
          </Link>

        </div>


      </div>

    </main>

  );
}