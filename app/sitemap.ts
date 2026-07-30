import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    "https://143studios.online";

  return [
    {
      url: base,
    },
    {
      url: `${base}/about`,
    },
    {
      url: `${base}/services`,
    },
    {
      url: `${base}/artists`,
    },
    {
      url: `${base}/releases`,
    },
    {
      url: `${base}/search`,
    },
    {
      url: `${base}/contact`,
    },
    {
      url: `${base}/faq`,
    },
    {
      url: `${base}/privacy-policy`,
    },
    {
      url: `${base}/terms`,
    },
  ];
}