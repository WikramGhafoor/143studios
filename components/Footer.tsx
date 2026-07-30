import Link from "next/link";

type FooterLink = {
  title: string;
  href: string;
};

const navigationLinks: FooterLink[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Artists", href: "/artists" },
  { title: "Releases", href: "/releases" },
  { title: "Search", href: "/search" },
  { title: "Contact", href: "/contact" },
];

const legalLinks: FooterLink[] = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms Of Service",
    href: "/terms",
  },
  {
    title: "Frequently Asked Questions",
    href: "/faq",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-red-900 bg-zinc-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 text-center md:grid-cols-3 md:text-left">
          <section aria-labelledby="footer-company-heading">
            <h2
              id="footer-company-heading"
              className="text-3xl font-black text-white"
            >
              143 Studios
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Music Label, Distribution, Publishing,
              Artist Management, Recording Studio And
              Digital Media Company.
            </p>
          </section>

          <section aria-labelledby="footer-navigation-heading">
            <h2
              id="footer-navigation-heading"
              className="text-xl font-black text-white"
            >
              Navigation
            </h2>

            <nav
              aria-label="Footer Navigation"
              className="mt-5 flex flex-col gap-4"
            >
              {navigationLinks.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-400 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  {title}
                </Link>
              ))}
            </nav>
          </section>

          <section aria-labelledby="footer-legal-heading">
            <h2
              id="footer-legal-heading"
              className="text-xl font-black text-white"
            >
              Legal
            </h2>

            <nav
              aria-label="Legal Navigation"
              className="mt-5 flex flex-col gap-4"
            >
              {legalLinks.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-400 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  {title}
                </Link>
              ))}
            </nav>
          </section>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} 143 Studios (SMC-Private)
            Limited.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}