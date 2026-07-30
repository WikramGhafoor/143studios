"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ToggleReleaseStatus({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);

    const newStatus =
      status === "active" ? "hidden" : "active";

    const { error } = await supabase
      .from("releases")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={
        status === "active"
          ? "rounded-lg border border-yellow-500 px-4 py-2 text-yellow-400 hover:bg-yellow-600 hover:text-white"
          : "rounded-lg border border-green-600 px-4 py-2 text-green-400 hover:bg-green-600 hover:text-white"
      }
    >
      {loading
        ? "..."
        : status === "active"
        ? "Hide"
        : "Activate"}
    </button>
  );
}