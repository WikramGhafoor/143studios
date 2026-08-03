"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type GuruAssistantSettings = {
  enabled: boolean;
  assistant_name: string;
  welcome_message: string;
  input_placeholder: string;
  avatar_url: string;
  position: string;
  accent_color: string;
  show_on_homepage: boolean;
  show_on_public_pages: boolean;
  show_on_admin_pages: boolean;
  suggested_prompt_one: string;
  suggested_prompt_two: string;
  suggested_prompt_three: string;
  suggested_prompt_four: string;
  fallback_message: string;
  contact_button_text: string;
  contact_button_link: string;
};

export default function GuruAssistant({
  settings,
}: {
  settings: GuruAssistantSettings;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const isAdmin = pathname.startsWith("/admin");
  const isHomepage = pathname === "/";
  const allowed = isAdmin
    ? settings.show_on_admin_pages
    : isHomepage
      ? settings.show_on_homepage
      : settings.show_on_public_pages;

  if (!settings.enabled || !allowed) {
    return null;
  }

  const prompts = [
    settings.suggested_prompt_one,
    settings.suggested_prompt_two,
    settings.suggested_prompt_three,
    settings.suggested_prompt_four,
  ].filter(Boolean);

  function submit(value: string) {
    if (!value.trim()) return;
    setMessage(value.trim());
    setReply(settings.fallback_message);
  }

  const right = settings.position !== "Bottom Left";

  return (
    <div className={`fixed bottom-5 z-50 ${right ? "right-5" : "left-5"}`}>
      {open && (
        <section
          aria-label={settings.assistant_name}
          className="mb-4 w-[min(92vw,380px)] overflow-hidden rounded-3xl border border-red-900 bg-zinc-950 shadow-2xl"
        >
          <header className="flex items-center gap-3 border-b border-red-900 bg-black p-4">
            {settings.avatar_url ? (
              <Image
                src={settings.avatar_url}
                alt=""
                width={42}
                height={42}
                className="h-11 w-11 rounded-full object-cover"
                unoptimized
              />
            ) : (
              <span className="grid h-11 w-11 place-items-center rounded-full bg-red-600 font-black">G</span>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-black">{settings.assistant_name}</h2>
              <p className="text-xs text-green-400">Online</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Guru Assistant" className="p-2 text-xl">×</button>
          </header>

          <div className="max-h-[55vh] space-y-4 overflow-y-auto p-4 text-sm">
            <p className="rounded-2xl bg-zinc-900 p-4 leading-6 text-gray-200">
              {settings.welcome_message || "Welcome To 143 Studios. How Can We Help You?"}
            </p>

            {prompts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => submit(prompt)} className="rounded-full border border-red-900 px-3 py-2 text-left text-xs hover:border-red-500">
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {message && <p className="ml-8 rounded-2xl bg-red-700 p-4">{message}</p>}
            {reply && <p className="mr-8 rounded-2xl bg-zinc-900 p-4 leading-6 text-gray-200">{reply}</p>}

            {reply && (
              <Link href={settings.contact_button_link || "/contact"} className="block rounded-xl bg-red-600 px-4 py-3 text-center font-bold hover:bg-red-700">
                {settings.contact_button_text || "Contact 143 Studios"}
              </Link>
            )}
          </div>

          <form className="flex gap-2 border-t border-red-900 p-3" onSubmit={(event) => { event.preventDefault(); submit(message); }}>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={settings.input_placeholder} aria-label="Message" className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-red-500" />
            <button type="submit" className="rounded-xl bg-red-600 px-4 font-bold hover:bg-red-700">Send</button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={`${open ? "Close" : "Open"} ${settings.assistant_name}`}
        className="ml-auto grid h-16 w-16 place-items-center rounded-full bg-red-600 text-2xl font-black text-white shadow-xl hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        style={{ backgroundColor: settings.accent_color || undefined }}
      >
        G
      </button>
    </div>
  );
}

