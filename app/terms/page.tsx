import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms Of Service",
  description:
    "Read The Terms Of Service Governing The Use Of The Official 143 Studios Website.",
  alternates: {
    canonical: "https://143studios.online/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black px-4 py-20 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-3xl border border-red-900 bg-zinc-950 p-6 sm:p-8 md:p-12">
          <header>
            <p className="font-bold text-red-500">
              143 Studios
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Terms Of Service
            </h1>

            <p className="mt-4 text-gray-400">
              Last Updated: July 29, 2026
            </p>
          </header>

          <div className="mt-12 space-y-10 text-gray-300">
            <TermsSection title="Acceptance Of Terms">
              <p>
                By Accessing Or Using The Official 143 Studios Website, You Agree
                To Follow These Terms Of Service. Do Not Use The Website If You
                Do Not Agree With These Terms.
              </p>
            </TermsSection>

            <TermsSection title="About The Website">
              <p>
                The Website Provides Information About 143 Studios, Its Artists,
                Releases, Services, Business Activities, Official Profiles And
                Related Music Projects.
              </p>
            </TermsSection>

            <TermsSection title="Permitted Use">
              <p>
                You May Use The Website For Personal, Informational And
                Legitimate Business Purposes. You Must Use The Website In A
                Lawful Manner And Must Not Interfere With Its Security,
                Availability Or Operation.
              </p>
            </TermsSection>

            <TermsSection title="Prohibited Activities">
              <p>
                Users Must Not Attempt To Access Restricted Administrative
                Areas, Bypass Security, Introduce Harmful Code, Scrape Protected
                Information, Copy Website Content For Unauthorized Commercial
                Use, Or Impersonate 143 Studios, Its Artists Or Its
                Representatives.
              </p>
            </TermsSection>

            <TermsSection title="Intellectual Property">
              <p>
                Unless Otherwise Stated, Website Content, Branding, Logos,
                Graphics, Text, Artist Profiles, Release Information, Images,
                Videos, Audio, Designs And Other Materials Are Owned By Or
                Licensed To 143 Studios.
              </p>

              <p className="mt-4">
                Content Must Not Be Copied, Reproduced, Distributed, Modified,
                Published, Sold Or Commercially Exploited Without Prior Written
                Permission From The Relevant Rights Holder.
              </p>
            </TermsSection>

            <TermsSection title="Music And Release Rights">
              <p>
                Music, Lyrics, Artwork, Recordings, Videos, Artist Names And
                Release Metadata May Be Protected By Copyright, Trademark,
                Contract, Publishing, Master Recording Or Other Intellectual
                Property Rights.
              </p>

              <p className="mt-4">
                Availability Of A Release On This Website Does Not Grant
                Visitors Permission To Download, Reproduce, Distribute, Remix,
                Monetize, License Or Otherwise Exploit That Release.
              </p>
            </TermsSection>

            <TermsSection title="Artist Information">
              <p>
                Artist Profiles And Release Catalogues Are Provided For Official
                Information And Promotion. Contact With Artists Represented By
                143 Studios Should Be Made Through Official 143 Studios
                Communication Channels Where Applicable.
              </p>
            </TermsSection>

            <TermsSection title="Third-Party Links">
              <p>
                The Website May Link To Spotify, Apple Music, YouTube, YouTube
                Music, Instagram, Facebook, TikTok And Other External Platforms.
              </p>

              <p className="mt-4">
                143 Studios Is Not Responsible For The Availability, Content,
                Security, Policies Or Services Of Third-Party Platforms.
              </p>
            </TermsSection>

            <TermsSection title="Accuracy Of Information">
              <p>
                We Aim To Keep Website Information Accurate And Current.
                However, Release Dates, Streaming Links, Credits, Artist
                Information, Services And Other Details May Change Without Prior
                Notice.
              </p>
            </TermsSection>

            <TermsSection title="Service Availability">
              <p>
                The Website May Be Updated, Suspended, Restricted Or Temporarily
                Unavailable Due To Maintenance, Security, Technical Issues Or
                Business Requirements.
              </p>
            </TermsSection>

            <TermsSection title="Disclaimer">
              <p>
                The Website And Its Content Are Provided On An As-Available
                Basis. 143 Studios Does Not Guarantee That Every Feature Will
                Always Be Available, Error-Free Or Uninterrupted.
              </p>
            </TermsSection>

            <TermsSection title="Limitation Of Liability">
              <p>
                To The Extent Permitted By Applicable Law, 143 Studios Will Not
                Be Responsible For Indirect, Incidental, Special Or
                Consequential Losses Resulting From Use Of, Or Inability To Use,
                The Website Or Third-Party Services.
              </p>
            </TermsSection>

            <TermsSection title="Changes To These Terms">
              <p>
                These Terms May Be Updated When The Website, Services, Business
                Activities Or Legal Requirements Change. Continued Use Of The
                Website After An Update Means You Accept The Revised Terms.
              </p>
            </TermsSection>

            <TermsSection title="Contact 143 Studios">
              <p>
                Questions About These Terms May Be Submitted Through The
                Official Contact Page Of The 143 Studios Website.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex font-bold text-red-500 transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Contact 143 Studios →
              </Link>
            </TermsSection>
          </div>

          <footer className="mt-14 border-t border-zinc-800 pt-8">
            <Link
              href="/"
              className="inline-flex rounded-xl border border-red-600 px-6 py-3 font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              ← Back To Home
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-black text-white">
        {title}
      </h2>

      <div className="mt-4 break-words leading-8">
        {children}
      </div>
    </section>
  );
}