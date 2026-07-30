"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiSearch, HiX } from "react-icons/hi";

type NavigationLink = {
  title: string;
  href: string;
};

const navigationLinks: NavigationLink[] = [
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Artists", href: "/artists" },
  { title: "Releases", href: "/releases" },
  { title: "Search", href: "/search" },
  { title: "Contact", href: "/contact" },
];

function isActiveRoute(
  pathname: string,
  href: string
): boolean {
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-red-900 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          aria-label="143 Studios Home"
          className="group flex min-w-0 items-center gap-3 sm:gap-4"
        >
          <Image
            src="/logo.png"
            alt="143 Studios Logo"
            width={60}
            height={60}
            priority
            sizes="60px"
            className="h-[52px] w-[52px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[60px] sm:w-[60px]"
          />

          <div className="min-w-0">
            <div className="truncate text-xl font-black text-white sm:text-2xl">
              143 Studios
            </div>

            <p className="mt-1 hidden text-sm font-semibold tracking-wide text-red-500 sm:block">
              Our Dreams Beyond Beats
            </p>
          </div>
        </Link>

        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigationLinks.map(({ title, href }) => {
            const active = isActiveRoute(
              pathname,
              href
            );

            return (
              <Link
                key={href}
                href={href}
                aria-current={
                  active ? "page" : undefined
                }
                className={`relative flex items-center gap-2 font-medium transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 ${
                  active
                    ? "text-red-500 after:w-full"
                    : "text-white after:w-0 hover:text-red-500 hover:after:w-full"
                }`}
              >
                {title === "Search" && (
                  <HiSearch
                    aria-hidden="true"
                    className="text-lg"
                  />
                )}

                {title}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label={
            menuOpen ? "Close Menu" : "Open Menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="rounded-lg p-2 text-3xl text-white transition-colors hover:bg-neutral-900 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 md:hidden"
        >
          {menuOpen ? (
            <HiX aria-hidden="true" />
          ) : (
            <HiMenu aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-red-900 bg-neutral-950 md:hidden"
        >
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col px-4 py-4 sm:px-6"
          >
            {navigationLinks.map(
              ({ title, href }) => {
                const active = isActiveRoute(
                  pathname,
                  href
                );

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={
                      active ? "page" : undefined
                    }
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={`flex items-center gap-2 border-b border-neutral-800 py-4 text-lg font-medium transition-colors last:border-b-0 ${
                      active
                        ? "text-red-500"
                        : "text-white hover:text-red-500"
                    }`}
                  >
                    {title === "Search" && (
                      <HiSearch
                        aria-hidden="true"
                        className="text-xl"
                      />
                    )}

                    {title}
                  </Link>
                );
              }
            )}
          </nav>
        </div>
      )}
    </header>
  );
}