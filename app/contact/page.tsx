import type { Metadata } from "next";
import { getSitePageServer } from "@/lib/site-pages-server";

export const dynamic = "force-dynamic";
import InquiryForm from "@/components/InquiryForm";
import {
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

type ContactPageContent = {
  metadata_title: string;
  metadata_description: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  inquiry_title: string;
  inquiry_description: string;
  contact_information_title: string;
  email_label: string;
  email_address: string;
  whatsapp_label: string;
  whatsapp_number: string;
  whatsapp_link: string;
  social_title: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  tiktok_url: string;
  whatsapp_channel_url: string;
};

const defaultContactContent: ContactPageContent = {
  metadata_title: "Contact",
  metadata_description:
    "Contact 143 Studios For Record Label, Music Production, Distribution, Publishing And Artist Services.",
  hero_eyebrow: "Contact 143 Studios",
  hero_title: "Start Your Project",
  hero_description:
    "Whether You Need Record Label Services, Music Production, Distribution, Publishing Or Artist Management, Send Us Your Inquiry And Our Team Will Contact You.",
  inquiry_title: "Send An Inquiry",
  inquiry_description:
    "Complete The Form Below And We Will Contact You As Soon As Possible.",
  contact_information_title:
    "Contact Information",
  email_label: "Email",
  email_address:
    "143studiospakistan@gmail.com",
  whatsapp_label: "WhatsApp",
  whatsapp_number: "+92 304 4457505",
  whatsapp_link:
    "https://wa.me/923044457505",
  social_title: "Follow 143 Studios",
  facebook_url:
    "https://www.facebook.com/profile.php?id=61590549212493",
  instagram_url:
    "https://www.instagram.com/143studios.guru",
  youtube_url:
    "https://www.youtube.com/@143StudiosOfficial",
  tiktok_url:
    "https://www.tiktok.com/@143studios",
  whatsapp_channel_url:
    "https://whatsapp.com/channel/0029VbCpgUcGufIyFHUFlw37",
};

async function getContactContent(): Promise<ContactPageContent> {
  const savedContent = await getSitePageServer("contact");

  return {
    ...defaultContactContent,
    ...(savedContent as Partial<ContactPageContent> | null),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactContent();

  return {
    title: content.metadata_title,
    description: content.metadata_description,
    alternates: {
      canonical: "https://143studios.online/contact",
    },
  };
}

export default async function ContactPage() {
  const content = await getContactContent();
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}

      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-red-500">
            {content.hero_eyebrow}
          </p>

          <h1 className="mt-6 text-5xl font-black md:text-7xl">
            {content.hero_title}
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-400">
            {content.hero_description}
          </p>
        </div>
      </section>

      {/* Contact */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Form */}

          <div>

            <h2 className="text-4xl font-black">
              {content.inquiry_title}
            </h2>

            <p className="mt-5 text-gray-400">
              {content.inquiry_description}
            </p>

            <InquiryForm />

          </div>

          {/* Contact Info */}

          <div>

            <div className="rounded-3xl border border-red-900 bg-zinc-950 p-8">

              <h2 className="text-3xl font-black">
                {content.contact_information_title}
              </h2>

              <div className="mt-8 space-y-8">

                <div className="flex items-center gap-5">
                  <FaEnvelope className="text-3xl text-red-500" />

                  <div>
                    <p className="font-bold">
                      {content.email_label}
                    </p>

                    <a
                      href={`mailto:${content.email_address}`}
                      className="text-gray-400 hover:text-red-500"
                    >
                      {content.email_address}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <FaWhatsapp className="text-3xl text-green-500" />

                  <div>
                    <p className="font-bold">
                      {content.whatsapp_label}
                    </p>

                    <a
                      href={content.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-500"
                    >
                      {content.whatsapp_number}
                    </a>
                  </div>
                </div>

              </div>

            </div>

            <div className="mt-8 rounded-3xl border border-red-900 bg-zinc-950 p-8">

              <h2 className="text-3xl font-black">
                {content.social_title}
              </h2>

              <div className="mt-8 flex flex-wrap gap-6 text-4xl">

                <a
                  href={content.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:scale-110"
                >
                  <FaFacebook />
                </a>

                <a
                  href={content.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:scale-110"
                >
                  <FaInstagram />
                </a>

                <a
                  href={content.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:scale-110"
                >
                  <FaYoutube />
                </a>

                <a
                  href={content.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110"
                >
                  <FaTiktok />
                </a>

                <a
                  href={content.whatsapp_channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:scale-110"
                >
                  <FaWhatsapp />
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
