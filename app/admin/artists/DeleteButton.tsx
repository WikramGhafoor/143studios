"use client";

export default function DeleteButton({ id }: { id: string }) {

  async function handleDelete() {

    const confirmDelete = confirm(
      "Are you sure you want to delete this artist?"
    );

    if (!confirmDelete) return;


    const res = await fetch(
      "/api/admin/artists/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );


    if (res.ok) {
      window.location.reload();
    } else {
      alert("Delete failed");
    }

  }


  return (
    <button
  className="rounded-lg border border-red-600 px-4 py-2 font-semibold text-red-500 transition-all duration-200 hover:bg-red-600 hover:text-white"
>
  Delete
</button>
  );
}