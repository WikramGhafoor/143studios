"use client";

import { useRouter } from "next/navigation";

export default function StatusButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {

  const router = useRouter();


  async function changeStatus() {

    const newStatus =
      status === "active"
        ? "hidden"
        : "active";


    const confirmChange = confirm(
      status === "active"
        ? "Hide this artist from public website?"
        : "Activate this artist on public website?"
    );


    if (!confirmChange) return;


    const res = await fetch(
      "/api/admin/artists/status",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id,
          status: newStatus,
        }),
      }
    );


    const result = await res.json();


    if (!res.ok) {

      alert(result.error || "Status update failed");
      return;

    }


    router.refresh();

  }


  return (

    <button
      onClick={changeStatus}
      className={
        status === "active"
          ? "rounded-lg border border-red-600 px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white"
          : "rounded-lg border border-green-600 px-4 py-2 text-green-500 hover:bg-green-600 hover:text-white"
      }
    >

      {status === "active"
        ? "Hide"
        : "Activate"
      }

    </button>

  );
}