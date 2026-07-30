import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read The Privacy Policy Of 143 Studios And Learn How Website Information Is Collected, Used And Protected.",
  alternates: {
    canonical: "https://143studios.online/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black px-4 py-20 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-3xl border border-red-900 bg-zinc-950 p-6 sm:p-8 md:p-12">
          <header>
            <p className="font-bold text-red-500">
              143 Studios
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-gray-400">
              Last Updated: July 29, 2026
            </p>
          </header>

          <div className="mt-12 space-y-10 text-gray-300">
            <PolicySection title="Introduction">
              <p>
                143 Studios Respects Your Privacy And Is
                Committed To Protecting Information Shared
                Through Our Website And Services.
              </p>
            </PolicySection>

            <PolicySection title="Information We May Collect">
              <p>
                We May Collect Information Submitted Through
                Contact Forms, Business Inquiries Or Other
                Communication Methods Available On The Website.
              </p>

              <p className="mt-4">
                This May Include Your Name, Email Address,
                Phone Number, Company Name, Project Information
                And Message.
              </p>
            </PolicySection>

            <PolicySection title="Automatically Collected Information">
              <p>
                Basic Technical Information Such As Browser
                Type, Device Type, Pages Visited, Referring
                Website And General Usage Information May Be
                Collected Automatically.
              </p>
            </PolicySection>

            <PolicySection title="How We Use Information">
              <p>
                Information May Be Used To Respond To
                Inquiries, Provide Services, Improve Website
                Performance, Maintain Security And Communicate
                Important Updates.
              </p>
            </PolicySection>

            <PolicySection title="Cookies And Analytics">
              <p>
                The Website May Use Cookies Or Similar
                Technologies To Understand Website Traffic,
                Remember Preferences And Improve Performance.
              </p>

              <p className="mt-4">
                Visitors May Control Cookies Through Their
                Browser Settings.
              </p>
            </PolicySection>

            <PolicySection title="Third-Party Platforms">
              <p>
                Our Website May Link To Spotify, Apple Music,
                YouTube, YouTube Music, Instagram, Facebook,
                TikTok And Other Third-Party Services.
              </p>

              <p className="mt-4">
                143 Studios Does Not Control The Privacy
                Practices Of Those External Platforms.
              </p>
            </PolicySection>

            <PolicySection title="Information Sharing">
              <p>
                143 Studios Does Not Sell Personal
                Information. Information May Be Shared With
                Trusted Service Providers When Necessary To
                Operate The Website, Provide Services Or Meet
                Legal Requirements.
              </p>
            </PolicySection>

            <PolicySection title="Information Security">
              <p>
                Reasonable Administrative And Technical
                Measures Are Used To Protect Information.
                However, No Internet Transmission Or Storage
                System Can Be Guaranteed To Be Completely
                Secure.
              </p>
            </PolicySection>

            <PolicySection title="Information Retention">
              <p>
                Information May Be Retained For As Long As
                Necessary To Respond To Requests, Provide
                Services, Maintain Business Records And Meet
                Legal Or Security Requirements.
              </p>
            </PolicySection>

            <PolicySection title="Children">
              <p>
                The Website Is Not Intended To Knowingly
                Collect Personal Information From Children
                Without Appropriate Permission From A Parent
                Or Legal Guardian.
              </p>
            </PolicySection>

            <PolicySection title="Your Choices">
              <p>
                You May Contact 143 Studios To Request Access
                To, Correction Of Or Deletion Of Personal
                Information Previously Submitted, Subject To
                Applicable Requirements.
              </p>
            </PolicySection>

            <PolicySection title="Policy Updates">
              <p>
                This Privacy Policy May Be Updated When Our
                Website, Services Or Business Practices Change.
                The Updated Version Will Be Published On This
                Page.
              </p>
            </PolicySection>

            <PolicySection title="Contact 143 Studios">
              <p>
                Questions About This Privacy Policy May Be
                Submitted Through The Official Contact Page.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex font-bold text-red-500 transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Contact 143 Studios →
              </Link>
            </PolicySection>
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

function PolicySection({
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