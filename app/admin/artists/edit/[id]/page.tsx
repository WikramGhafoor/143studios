import { supabase } from "@/lib/supabase";
import EditArtistForm from "@/components/EditArtistFormV2";

export default async function EditArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: artist, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !artist) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-black text-red-600">
          Artist Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-black mb-8">
        Edit Artist
      </h1>

      <EditArtistForm artist={artist} />

    </main>
  );
}
