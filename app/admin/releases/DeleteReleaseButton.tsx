"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DeleteReleaseButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function deleteRelease() {
    const confirmed = window.confirm(
      `کیا آپ "${title}" کو مکمل Delete کرنا چاہتے ہیں؟`
    );

    if (!confirmed) return;

    setDeleting(true);

    const { error } = await supabase
      .from("releases")
      .delete()
      .eq("id", id);

    setDeleting(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Release Deleted Successfully");

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={deleteRelease}
      disabled={deleting}
      className="rounded-lg border border-red-600 px-4 py-2 font-semibold text-red-500 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}