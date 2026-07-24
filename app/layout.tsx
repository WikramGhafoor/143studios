import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "143 Studios | Official Website",
  description:
    "143 Studios - Music Label, Distribution, Publishing and Digital Media Company.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        {/* Global Header with Logo */}
        <header className="w-full border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="143 Studios Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-bold text-lg tracking-wider">143 STUDIOS</span>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}