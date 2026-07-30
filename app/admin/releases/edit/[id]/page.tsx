import { supabase } from "@/lib/supabase";
import EditReleaseForm from "@/components/EditReleaseForm";

export default async function EditReleasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: release, error } = await supabase
    .from("releases")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !release) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-4xl font-black text-red-600">
          Release Not Found
        </h1>

        {error && (
          <p className="mt-4 text-gray-400">
            {error.message}
          </p>
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-5xl font-black">
          Edit Release
        </h1>

        <EditReleaseForm release={release} />
      </div>
    </main>
  );
}