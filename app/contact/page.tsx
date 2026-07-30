import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import {
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact 143 Studios For Record Label, Music Production, Distribution, Publishing And Artist Services.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}

      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-red-500">
            Contact 143 Studios
          </p>

          <h1 className="mt-6 text-5xl font-black md:text-7xl">
            Start Your Project
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-400">
            Whether You Need Record Label Services, Music Production,
            Distribution, Publishing Or Artist Management,
            Send Us Your Inquiry And Our Team Will Contact You.
          </p>
        </div>
      </section>

      {/* Contact */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Form */}

          <div>

            <h2 className="text-4xl font-black">
              Send An Inquiry
            </h2>

            <p className="mt-5 text-gray-400">
              Complete The Form Below And We Will Contact You As Soon As Possible.
            </p>

            <InquiryForm />

          </div>

          {/* Contact Info */}

          <div>

            <div className="rounded-3xl border border-red-900 bg-zinc-950 p-8">

              <h2 className="text-3xl font-black">
                Contact Information
              </h2>

              <div className="mt-8 space-y-8">

                <div className="flex items-center gap-5">
                  <FaEnvelope className="text-3xl text-red-500" />

                  <div>
                    <p className="font-bold">
                      Email
                    </p>

                    <a
                      href="mailto:143studiospakistan@gmail.com"
                      className="text-gray-400 hover:text-red-500"
                    >
                      143studiospakistan@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <FaWhatsapp className="text-3xl text-green-500" />

                  <div>
                    <p className="font-bold">
                      WhatsApp
                    </p>

                    <a
                      href="https://wa.me/923044457505"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-500"
                    >
                      +92 304 4457505
                    </a>
                  </div>
                </div>

              </div>

            </div>

            <div className="mt-8 rounded-3xl border border-red-900 bg-zinc-950 p-8">

              <h2 className="text-3xl font-black">
                Follow 143 Studios
              </h2>

              <div className="mt-8 flex flex-wrap gap-6 text-4xl">

                <a
                  href="https://www.facebook.com/profile.php?id=61590549212493"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:scale-110"
                >
                  <FaFacebook />
                </a>

                <a
                  href="https://www.instagram.com/143studios.guru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:scale-110"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.youtube.com/@143StudiosOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:scale-110"
                >
                  <FaYoutube />
                </a>

                <a
                  href="https://www.tiktok.com/@143studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110"
                >
                  <FaTiktok />
                </a>

                <a
                  href="https://whatsapp.com/channel/0029VbCpgUcGufIyFHUFlw37"
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