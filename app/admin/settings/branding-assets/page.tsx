"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ChangeEvent } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getSitePage, updateSitePage, type SitePageContent } from "@/lib/site-pages";

type AssetField = "logo_url" | "favicon_url" | "default_og_image_url";

const assets = [
  { field: "logo_url", label: "Website Logo", accept: "image/png,image/jpeg,image/webp,image/svg+xml" },
  { field: "favicon_url", label: "Favicon / PNG Icon", accept: "image/png,image/x-icon,image/vnd.microsoft.icon" },
  { field: "default_og_image_url", label: "Default Social Share Image", accept: "image/png,image/jpeg,image/webp" },
] satisfies Array<{ field: AssetField; label: string; accept: string }>;

export default function BrandingAssetsPage() {
  const [settings, setSettings] = useState<SitePageContent>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<AssetField | null>(null);

  useEffect(() => {
    void getSitePage("website")
      .then((saved) => setSettings(saved || {}))
      .finally(() => setLoading(false));
  }, []);

  async function upload(event: ChangeEvent<HTMLInputElement>, field: AssetField) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(field);
    try {
      const url = await uploadToCloudinary(file, `143-studios-${field.replace(/_url$/, "")}`);
      const next = { ...settings, [field]: url };
      await updateSitePage("website", next);
      setSettings(next);
      alert("Branding Asset Uploaded And Saved Successfully.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Branding Asset Upload Failed.");
    } finally {
      setUploading(null);
      event.target.value = "";
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-black p-10 text-white">Loading Branding Assets...</main>;
  }

  return (
    <main className="min-h-screen bg-black p-4 text-white sm:p-8 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">Branding Assets</h1>
            <p className="mt-3 text-gray-400">Upload Or Replace The Website Logo, Favicon, PNG Icon And Social Share Image.</p>
          </div>
          <Link href="/admin/settings" className="rounded-xl border border-zinc-700 px-5 py-3 font-bold">Back To Settings</Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {assets.map(({ field, label, accept }) => {
            const currentUrl = typeof settings[field] === "string" ? settings[field] : "";
            return (
              <section key={field} className="rounded-3xl border border-red-900 bg-zinc-950 p-6">
                <h2 className="text-2xl font-black">{label}</h2>
                {currentUrl && (
                  <div className="relative mt-5 h-48 overflow-hidden rounded-2xl bg-black">
                    <Image src={currentUrl} alt={`${label} Preview`} fill className="object-contain" unoptimized />
                  </div>
                )}
                <input
                  type="file"
                  accept={accept}
                  disabled={uploading !== null}
                  onChange={(event) => upload(event, field)}
                  className="mt-5 w-full rounded-xl border border-red-900 bg-black p-4"
                />
                {uploading === field && <p className="mt-3 text-yellow-400">Uploading {label}...</p>}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
