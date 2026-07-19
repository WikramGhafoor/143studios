import {
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-black px-6 py-24"
    >
      <div className="mx-auto max-w-5xl text-center">

        <h2 className="text-5xl font-black text-white">
          Contact <span className="text-red-600">Us</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
          Get In Touch With 143 Studios For Music Production, Distribution,
          Publishing And Creative Services.
        </p>

        {/* Contact Cards */}

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {/* Email */}

          <div className="rounded-2xl border border-red-900 bg-neutral-950 p-8 transition duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-900/30">

            <FaEnvelope className="mx-auto mb-4 text-4xl text-red-600" />

            <h3 className="text-xl font-bold text-white">
              Email
            </h3>

            <a
              href="mailto:143studiospakistan@gmail.com"
              className="mt-3 block text-gray-400 transition hover:text-red-500"
            >
              143studiospakistan@gmail.com
            </a>

          </div>

          {/* WhatsApp */}

          <div className="rounded-2xl border border-red-900 bg-neutral-950 p-8 transition duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-900/30">

            <FaWhatsapp className="mx-auto mb-4 text-4xl text-green-500" />

            <h3 className="text-xl font-bold text-white">
              WhatsApp
            </h3>

            <a
              href="https://wa.me/YOUR_WHATSAPP_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-green-700"
            >
              Contact Us
            </a>

          </div>

        </div>

        {/* Social Media */}

        <div className="mt-12 rounded-2xl border border-red-900 bg-neutral-950 p-8">

          <h3 className="text-2xl font-bold text-white">
            Follow 143 Studios
          </h3>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-4xl">

            <a
              href="#"
              className="text-blue-500 transition duration-300 hover:scale-125 hover:text-white"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="text-pink-500 transition duration-300 hover:scale-125 hover:text-white"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="text-red-600 transition duration-300 hover:scale-125 hover:text-white"
            >
              <FaYoutube />
            </a>

            <a
              href="#"
              className="text-white transition duration-300 hover:scale-125 hover:text-red-500"
            >
              <FaTiktok />
            </a>

            <a
              href="#"
              className="text-green-500 transition duration-300 hover:scale-125 hover:text-white"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}