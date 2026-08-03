import Link from "next/link";

const cards = [
  {
    title: "Website Settings",
    description: "Manage Global Website Information.",
    href: "/admin/settings/website",
  },
  {
    title: "Homepage",
    description: "Manage Homepage Content.",
    href: "/admin/settings/homepage",
  },
  {
    title: "About",
    description: "Manage About Page.",
    href: "/admin/settings/about",
  },
  {
    title: "Services",
    description: "Manage Services Page.",
    href: "/admin/settings/services",
  },
  {
    title: "Contact",
    description: "Manage Contact Page.",
    href: "/admin/settings/contact",
  },
  {
    title: "SEO",
    description: "Manage Global SEO.",
    href: "/admin/settings/seo",
  },
  {
    title: "Guru Assistant",
    description: "Manage Guru Assistant Settings.",
    href: "/admin/settings/guru-assistant",
  },
];

export default function AdminSettingsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-5xl font-black">
        Settings
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-red-900 bg-zinc-950 p-6 transition hover:border-red-600 hover:bg-zinc-900"
          >
            <h2 className="text-2xl font-black">
              {card.title}
            </h2>

            <p className="mt-3 text-gray-400">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
