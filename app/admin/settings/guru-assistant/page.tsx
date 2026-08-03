"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  getSitePage,
  updateSitePage,
} from "@/lib/site-pages";

type GuruAssistantSettings = {
  enabled: boolean;
  assistant_name: string;
  welcome_message: string;
  input_placeholder: string;
  avatar_url: string;
  position: string;
  theme: string;
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

const defaultSettings: GuruAssistantSettings = {
  enabled: false,
  assistant_name: "Guru Assistant",
  welcome_message: "",
  input_placeholder: "Type Your Message...",
  avatar_url: "",
  position: "Bottom Right",
  theme: "Dark",
  accent_color: "#dc2626",
  show_on_homepage: true,
  show_on_public_pages: true,
  show_on_admin_pages: false,
  suggested_prompt_one: "",
  suggested_prompt_two: "",
  suggested_prompt_three: "",
  suggested_prompt_four: "",
  fallback_message:
    "I Could Not Find That Information Right Now.",
  contact_button_text: "Contact 143 Studios",
  contact_button_link: "/contact",
};

const inputClass =
  "w-full rounded-xl border border-red-900 bg-zinc-950 p-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500";

export default function AdminGuruAssistantSettingsPage() {
  const [form, setForm] =
    useState<GuruAssistantSettings>(
      defaultSettings
    );
  const [loading, setLoading] =
    useState(true);
  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const savedContent =
          await getSitePage("guru_assistant");

        if (!mounted) {
          return;
        }

        if (savedContent) {
          setForm({
            ...defaultSettings,
            ...(savedContent as Partial<
              GuruAssistantSettings
            >),
          });
        }
      } catch (error) {
        console.error(
          "Load Guru Assistant Settings Error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  function handleChange(
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) {
    const target = event.target;
    const { name } = target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "checkbox"
    ) {
      setForm((current) => ({
        ...current,
        [name]: target.checked,
      }));

      return;
    }

    setForm((current) => ({
      ...current,
      [name]: target.value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) {
      return;
    }

    setSaving(true);

    try {
      await updateSitePage(
        "guru_assistant",
        form
      );

      alert(
        "Guru Assistant Settings Saved Successfully."
      );
    } catch (error) {
      console.error(
        "Save Guru Assistant Settings Error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Guru Assistant Settings Could Not Be Saved."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-gray-400">
          Loading Guru Assistant Settings...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-4 text-white sm:p-6 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">
              Guru Assistant Settings
            </h1>

            <p className="mt-3 text-gray-400">
              Manage Guru Assistant Visibility, Branding And Messages.
            </p>
          </div>

          <Link
            href="/admin/settings"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-gray-300 transition-colors hover:bg-zinc-800"
          >
            Back To Settings
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >
          <SettingsSection title="Status And Visibility">
            <CheckboxField
              label="Enable Guru Assistant"
              name="enabled"
              checked={form.enabled}
              onChange={handleChange}
            />

            <div className="grid gap-5 md:grid-cols-3">
              <CheckboxField
                label="Show On Homepage"
                name="show_on_homepage"
                checked={
                  form.show_on_homepage
                }
                onChange={handleChange}
              />

              <CheckboxField
                label="Show On Public Pages"
                name="show_on_public_pages"
                checked={
                  form.show_on_public_pages
                }
                onChange={handleChange}
              />

              <CheckboxField
                label="Show On Admin Pages"
                name="show_on_admin_pages"
                checked={
                  form.show_on_admin_pages
                }
                onChange={handleChange}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Branding">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Assistant Name"
                name="assistant_name"
                value={form.assistant_name}
                onChange={handleChange}
              />

              <Field
                label="Avatar URL"
                name="avatar_url"
                value={form.avatar_url}
                onChange={handleChange}
                placeholder="Add Your Assistant Avatar URL"
              />

              <SelectField
                label="Position"
                name="position"
                value={form.position}
                onChange={handleChange}
                options={[
                  "Bottom Right",
                  "Bottom Left",
                ]}
              />

              <SelectField
                label="Theme"
                name="theme"
                value={form.theme}
                onChange={handleChange}
                options={[
                  "Dark",
                  "Light",
                  "System",
                ]}
              />

              <Field
                label="Accent Color"
                name="accent_color"
                value={form.accent_color}
                onChange={handleChange}
                type="color"
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Messages">
            <TextAreaField
              label="Welcome Message"
              name="welcome_message"
              value={form.welcome_message}
              onChange={handleChange}
              rows={5}
              placeholder="Add Your Final Welcome Message Here"
            />

            <Field
              label="Input Placeholder"
              name="input_placeholder"
              value={form.input_placeholder}
              onChange={handleChange}
            />

            <TextAreaField
              label="Fallback Message"
              name="fallback_message"
              value={form.fallback_message}
              onChange={handleChange}
              rows={4}
            />
          </SettingsSection>

          <SettingsSection title="Suggested Prompts">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Suggested Prompt One"
                name="suggested_prompt_one"
                value={
                  form.suggested_prompt_one
                }
                onChange={handleChange}
              />

              <Field
                label="Suggested Prompt Two"
                name="suggested_prompt_two"
                value={
                  form.suggested_prompt_two
                }
                onChange={handleChange}
              />

              <Field
                label="Suggested Prompt Three"
                name="suggested_prompt_three"
                value={
                  form.suggested_prompt_three
                }
                onChange={handleChange}
              />

              <Field
                label="Suggested Prompt Four"
                name="suggested_prompt_four"
                value={
                  form.suggested_prompt_four
                }
                onChange={handleChange}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Contact Escalation">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Contact Button Text"
                name="contact_button_text"
                value={
                  form.contact_button_text
                }
                onChange={handleChange}
              />

              <Field
                label="Contact Button Link"
                name="contact_button_link"
                value={
                  form.contact_button_link
                }
                onChange={handleChange}
              />
            </div>
          </SettingsSection>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-red-600 px-8 py-4 font-bold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving Guru Assistant Settings..."
              : "Save Guru Assistant Settings"}
          </button>
        </form>
      </div>
    </main>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
      <h2 className="mb-6 text-2xl font-black">
        {title}
      </h2>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  name: keyof GuruAssistantSettings;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-gray-300">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string;
  name: keyof GuruAssistantSettings;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  rows: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-gray-300">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: keyof GuruAssistantSettings;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLSelectElement>
  ) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-gray-300">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxField({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: keyof GuruAssistantSettings;
  checked: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-red-900 bg-black p-4">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5"
      />

      <span className="font-bold text-gray-300">
        {label}
      </span>
    </label>
  );
}
