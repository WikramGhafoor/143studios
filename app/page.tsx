import Hero from "@/components/Hero";
import About from "@/components/About";
import MissionVision from "@/components/MissionVision";
import Services from "@/components/Services";
import Artists from "@/components/Artists";
import Releases from "@/components/Releases";
import Contact from "@/components/Contact";
import { getSitePageServer } from "@/lib/site-pages-server";

export const dynamic = "force-dynamic";

type HomepageContent = {
  hero_company_name?: string;
  hero_company_highlight?: string;
  hero_tagline?: string;
  hero_founder_title?: string;
  hero_founder_name?: string;
  hero_founder_brand?: string;
  hero_primary_button_text?: string;
  hero_primary_button_link?: string;
  hero_secondary_button_text?: string;
  hero_secondary_button_link?: string;
  hero_scroll_text?: string;
};

export default async function Home() {
  const savedContent =
    await getSitePageServer("homepage");

  const content =
    (savedContent as HomepageContent | null) ??
    {};

  return (
    <>
      <Hero
        companyName={
          content.hero_company_name
        }
        companyHighlight={
          content.hero_company_highlight
        }
        tagline={content.hero_tagline}
        founderTitle={
          content.hero_founder_title
        }
        founderName={
          content.hero_founder_name
        }
        founderBrand={
          content.hero_founder_brand
        }
        primaryButtonText={
          content.hero_primary_button_text
        }
        primaryButtonLink={
          content.hero_primary_button_link
        }
        secondaryButtonText={
          content.hero_secondary_button_text
        }
        secondaryButtonLink={
          content.hero_secondary_button_link
        }
        scrollText={
          content.hero_scroll_text
        }
      />

      <About />

      <MissionVision />

      <Services />

      <Artists />

      <Releases />

      <Contact />
    </>
  );
}
