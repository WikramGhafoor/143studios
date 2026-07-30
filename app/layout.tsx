import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminQuickAccess from "@/components/AdminQuickAccess";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://143studios.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "143 Studios | Official Website",
    template: "%s | 143 Studios",
  },

  description:
    "Official Website Of 143 Studios. Music Label, Artist Management, Music Distribution, Publishing And Digital Media Company.",

  applicationName: "143 Studios",

  keywords: [
    "143 Studios",
    "Wikram Ghafoor",
    "Guru B",
    "Music Label",
    "Record Label",
    "Music Distribution",
    "Music Publishing",
    "Recording Studio",
    "Artist Management",
    "Music Production",
    "Audio Recording",
    "Mixing",
    "Mastering",
    "Independent Artists",
    "Albums",
    "Singles",
    "Music Videos",
    "Digital Distribution",
    "Pakistan Music",
    "Pakistani Artists",
    "Music Company",
  ],

  authors: [
    {
      name: "143 Studios",
      url: siteUrl,
    },
  ],

  creator: "143 Studios",
  publisher: "143 Studios",
  category: "Music",

  alternates: {
    canonical: siteUrl,
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "143 Studios",
    description:
      "Official Website Of 143 Studios. Music Label, Artist Management, Music Distribution, Publishing And Digital Media Company.",
    url: siteUrl,
    siteName: "143 Studios",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "143 Studios",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "143 Studios",
    description:
      "Official Website Of 143 Studios. Music Label, Artist Management, Music Distribution, Publishing And Digital Media Company.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "143 Studios",
      legalName: "143 Studios (SMC-Private) Limited",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      image: `${siteUrl}/og-image.jpg`,
      description:
        "Music Label, Artist Management, Music Distribution, Publishing, Recording Studio And Digital Media Company.",
      email: "143studiospakistan@gmail.com",
      founder: {
        "@type": "Person",
        name: "Wikram Ghafoor",
        alternateName: "Guru ",
      },
      foundingLocation: {
        "@type": "Country",
        name: "Pakistan",
      },
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61590549212493",
        "https://www.instagram.com/143studios.guru",
        "https://www.youtube.com/@143StudiosOfficial",
        "https://www.tiktok.com/@143studios",
        "https://whatsapp.com/channel/0029VbCpgUcGufIyFHUFlw37",
      ],
      knowsAbout: [
        "Record Label Services",
        "Music Production",
        "Recording Studio",
        "Artist Management",
        "Music Distribution",
        "Music Publishing",
        "Mixing And Mastering",
        "Digital Marketing",
        "Video Production",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "143 Studios",
      description:
        "Official Website Of 143 Studios.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input":
          "required name=search_term_string",
      },
    },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-zinc-950 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <Header />

        <AdminQuickAccess />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}