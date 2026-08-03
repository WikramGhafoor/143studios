import GuruAssistant, { type GuruAssistantSettings } from "@/components/GuruAssistant";
import { getSitePageServer } from "@/lib/site-pages-server";

const defaults: GuruAssistantSettings = {
  enabled: false,
  assistant_name: "Guru Assistant",
  welcome_message: "",
  input_placeholder: "Type Your Message...",
  avatar_url: "",
  position: "Bottom Right",
  accent_color: "#dc2626",
  show_on_homepage: true,
  show_on_public_pages: true,
  show_on_admin_pages: false,
  suggested_prompt_one: "",
  suggested_prompt_two: "",
  suggested_prompt_three: "",
  suggested_prompt_four: "",
  fallback_message: "I Could Not Find That Information Right Now.",
  contact_button_text: "Contact 143 Studios",
  contact_button_link: "/contact",
};

export default async function GuruAssistantLoader() {
  const saved = await getSitePageServer("guru_assistant");
  const settings = {
    ...defaults,
    ...(saved as Partial<GuruAssistantSettings> | null),
  };

  return <GuruAssistant settings={settings} />;
}

