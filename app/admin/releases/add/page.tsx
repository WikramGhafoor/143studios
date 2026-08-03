import AddReleaseForm from "@/components/AddReleaseFormV2";

export const metadata = {
  title: "Add Release | 143 Studios CMS",
};

export default function AddReleasePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-4xl font-black">
          Add Release
        </h1>

        <AddReleaseForm />

      </div>
    </main>
  );
}
