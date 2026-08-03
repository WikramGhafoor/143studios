import Link from "next/link";

export default function AdminSettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="border-b border-red-900 bg-zinc-950 px-4 py-3 text-white sm:px-8" aria-label="Settings Navigation">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          <Link href="/admin/settings" className="rounded-lg border border-zinc-700 px-4 py-2 font-bold hover:border-red-600">All Settings</Link>
          <Link href="/admin/settings/branding-assets" className="rounded-lg border border-red-700 px-4 py-2 font-bold text-red-400 hover:bg-red-950">Branding Assets</Link>
          <Link href="/admin" className="rounded-lg border border-zinc-700 px-4 py-2 font-bold hover:border-red-600">Admin Dashboard</Link>
        </div>
      </nav>
      {children}
    </>
  );
}
