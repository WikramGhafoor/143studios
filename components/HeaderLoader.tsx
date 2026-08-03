import Header from "@/components/Header";
import { getSitePageServer } from "@/lib/site-pages-server";

type WebsiteSettings = {
  company_name?: string;
  logo_url?: string;
};

export default async function HeaderLoader() {
  const saved = await getSitePageServer("website") as WebsiteSettings | null;

  return (
    <Header
      companyName={saved?.company_name || "143 Studios"}
      logoUrl={saved?.logo_url || "/logo.png"}
    />
  );
}

