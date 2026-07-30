"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminSidebar() {

  const router = useRouter();

  async function logout() {

    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();

  }

  return (
    <aside className="w-72 bg-zinc-950 border-r border-red-900 p-6">

      <h2 className="text-3xl font-black text-white">
        143 <span className="text-red-600">Admin</span>
      </h2>

      <nav className="mt-10 space-y-3">

        <Link
          href="/admin"
          className="block rounded-xl px-4 py-3 hover:bg-red-600"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/artists"
          className="block rounded-xl px-4 py-3 hover:bg-red-600"
        >
          Artists
        </Link>

        <Link
          href="/admin/releases"
          className="block rounded-xl px-4 py-3 hover:bg-red-600"
        >
          Releases
        </Link>

        <Link
          href="/admin/uploads"
          className="block rounded-xl px-4 py-3 hover:bg-red-600"
        >
          Uploads
        </Link>

        <Link
          href="/admin/settings"
          className="block rounded-xl px-4 py-3 hover:bg-red-600"
        >
          Settings
        </Link>

        <button
          onClick={logout}
          className="mt-10 w-full rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700"
        >
          Logout
        </button>

      </nav>

    </aside>
  );
}