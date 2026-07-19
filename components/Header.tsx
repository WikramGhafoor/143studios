"use client";

import { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-red-900 bg-black/90 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <a
          href="/"
          className="group flex items-center gap-4"
        >
          <Image
            src="/logo.png"
            alt="143 Studios"
            width={60}
            height={60}
            priority
            className="transition duration-300 group-hover:scale-105"
          />

          <div>

            <h1 className="text-2xl font-black text-white">
              143 Studios
            </h1>

            <p className="mt-1 text-sm font-semibold tracking-wide text-red-500">
              Our Dreams Beyond Beats
            </p>

          </div>

        </a>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          {[
            ["About", "#about"],
            ["Services", "#services"],
            ["Artists", "#artists"],
            ["Releases", "#releases"],
            ["Contact", "#contact"],
          ].map(([title, link]) => (
            <a
              key={title}
              href={link}
              className="relative font-medium text-white transition duration-300 hover:text-red-500 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {title}
            </a>
          ))}

        </nav>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-white md:hidden"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="border-t border-red-900 bg-neutral-950 md:hidden">

          <nav className="flex flex-col px-6 py-6">

            {[
              ["About", "#about"],
              ["Services", "#services"],
              ["Artists", "#artists"],
              ["Releases", "#releases"],
              ["Contact", "#contact"],
            ].map(([title, link]) => (

              <a
                key={title}
                href={link}
                onClick={() => setMenuOpen(false)}
                className="border-b border-neutral-800 py-4 text-lg font-medium text-white transition hover:text-red-500"
              >
                {title}
              </a>

            ))}

          </nav>

        </div>

      )}

    </header>
  );
}