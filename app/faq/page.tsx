import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find Answers To Common Questions About 143 Studios, Artists, Releases And Our Services.",
  alternates: {
    canonical: "https://143studios.online/faq",
  },
};

const faqs = [
  {
    question: "What Is 143 Studios?",
    answer:
      "143 Studios Is A Music Label Offering Music Production, Artist Management, Music Distribution, Publishing, Recording Studio And Digital Media Services.",
  },
  {
    question: "How Can I Contact 143 Studios?",
    answer:
      "You Can Contact Us Through The Contact Page Or By Using Our Official Email Address.",
  },
  {
    question: "How Can I Listen To Official Releases?",
    answer:
      "All Official Releases Are Available Through The Releases Page Along With Streaming Platform Links.",
  },
  {
    question: "Where Can I View Artist Profiles?",
    answer:
      "Visit The Artists Page To Explore Official Artist Profiles, Biographies, Social Links And Discographies.",
  },
  {
    question: "Which Streaming Platforms Do You Support?",
    answer:
      "Our Releases Are Distributed Across Spotify, Apple Music, YouTube, YouTube Music And Other Major Digital Platforms.",
  },
  {
    question: "Do You Offer Music Production Services?",
    answer:
      "Yes. We Provide Recording, Music Production, Mixing, Mastering And Complete Release Preparation.",
  },
  {
    question: "Do You Provide Artist Management?",
    answer:
      "Yes. We Help Artists Develop Their Careers Through Branding, Strategy, Promotion And Professional Management.",
  },
  {
    question: "Can I Hire 143 Studios For A Project?",
    answer:
      "Yes. Visit The Contact Page Or Submit A Project Inquiry And Our Team Will Guide You Through The Process.",
  },
  {
    question: "How Often Is The Website Updated?",
    answer:
      "Artist Profiles, Releases And Company Information Are Updated Regularly As New Projects Become Available.",
  },
  {
    question: "Where Can I Learn More About 143 Studios?",
    answer:
      "Visit The About Page To Learn More About Our Mission, Vision And Company Story.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero */}

      <section className="border-b border-red-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:py-24">
          <p className="font-bold uppercase tracking-[0.2em] text-red-500 sm:tracking-[0.3em]">
            Frequently Asked Questions
          </p>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl md:text-7xl">
            Need Help?
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 sm:text-xl sm:leading-9">
            Find Answers To The Most Common Questions About
            143 Studios, Our Artists, Releases And Services.
          </p>
        </div>
      </section>

      {/* FAQ */}

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24">
        <div className="space-y-6">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-3xl border border-red-900 bg-zinc-950 p-6 transition-all open:border-red-600 sm:p-8"
            >
              <summary className="cursor-pointer list-none pr-8 text-xl font-black transition-colors hover:text-red-500 sm:text-2xl">
                {faq.question}
              </summary>

              <p className="mt-6 leading-8 text-gray-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="border-t border-red-900 bg-zinc-950 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black sm:text-4xl">
            Still Have Questions?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            If You Could Not Find The Answer You Were Looking
            For, Please Contact Our Team And We Will Be Happy
            To Assist You.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              href="/contact"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Contact Us
            </Link>

            <Link
              href="/about"
              className="rounded-xl border-2 border-red-600 px-8 py-4 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              About 143 Studios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}