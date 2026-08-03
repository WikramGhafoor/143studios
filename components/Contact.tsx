import Link from "next/link";
import { getSitePage } from "@/lib/site-pages";
import {
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

type HomepageContactContent = {
  contact_title_prefix?: string;
  contact_title_highlight?: string;
  contact_description?: string;
  contact_email_label?: string;
  contact_email?: string;
  contact_whatsapp_label?: string;
  contact_whatsapp_button_text?: string;
  contact_whatsapp_link?: string;
  contact_button_text?: string;
  contact_button_link?: string;
  social_title?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  tiktok_url?: string;
  whatsapp_channel_url?: string;
};

export default async function Contact() {
  const savedContent =
    await getSitePage("homepage");

  const content =
    (savedContent as HomepageContactContent | null) ??
    {};

  const email =
    content.contact_email ??
    "143studiospakistan@gmail.com";

  return (
    <section
      id="contact"
      className="bg-black px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-black text-white sm:text-5xl">
          {content.contact_title_prefix ??
            "Contact"}{" "}
          <span className="text-red-600">
            {content.contact_title_highlight ??
              "Us"}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          {content.contact_description ??
            "Get In Touch With 143 Studios For Music Production, Distribution, Publishing And Professional Creative Services."}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="flex h-full flex-col rounded-2xl border border-red-900 bg-neutral-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">
            <FaEnvelope className="mx-auto mb-4 text-4xl text-red-600" />

            <h3 className="text-2xl font-black text-white">
              {content.contact_email_label ??
                "Email"}
            </h3>

            <a
              href={`mailto:${email}`}
              className="mt-4 break-all text-gray-400 transition hover:text-red-500"
            >
              {email}
            </a>
          </article>

          <article className="flex h-full flex-col rounded-2xl border border-red-900 bg-neutral-950 p-8 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-900/30">
            <FaWhatsapp className="mx-auto mb-4 text-4xl text-green-500" />

            <h3 className="text-2xl font-black text-white">
              {content.contact_whatsapp_label ??
                "WhatsApp"}
            </h3>

            <a
              href={
                content.contact_whatsapp_link ??
                "https://wa.me/923044457505"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              {content.contact_whatsapp_button_text ??
                "Chat On WhatsApp"}
            </a>
          </article>
        </div>

        <div className="mt-12">
          <Link
            href={
              content.contact_button_link ??
              "/contact"
            }
            className="inline-flex items-center rounded-xl bg-red-600 px-8 py-4 font-bold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            {content.contact_button_text ??
              "Start A Project"}
          </Link>
        </div>

        <div className="mt-14 rounded-2xl border border-red-900 bg-neutral-950 p-8">
          <h3 className="text-2xl font-black text-white">
            {content.social_title ??
              "Follow 143 Studios"}
          </h3>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-4xl">
            <a
              href={
                content.facebook_url ??
                "https://www.facebook.com/profile.php?id=61590549212493"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-500 transition hover:scale-125 hover:text-white"
            >
              <FaFacebook />
            </a>

            <a
              href={
                content.instagram_url ??
                "https://www.instagram.com/143studios.guru"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-500 transition hover:scale-125 hover:text-white"
            >
              <FaInstagram />
            </a>

            <a
              href={
                content.youtube_url ??
                "https://www.youtube.com/@143StudiosOfficial"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-red-600 transition hover:scale-125 hover:text-white"
            >
              <FaYoutube />
            </a>

            <a
              href={
                content.tiktok_url ??
                "https://www.tiktok.com/@143studios"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white transition hover:scale-125 hover:text-red-500"
            >
              <FaTiktok />
            </a>

            <a
              href={
                content.whatsapp_channel_url ??
                "https://whatsapp.com/channel/0029VbCpgUcGufIyFHUFlw37"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="text-green-500 transition hover:scale-125 hover:text-white"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
