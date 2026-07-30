"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type InquiryFormState = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectTitle: string;
  message: string;
  website: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

const inquiryTypes = [
  "General Inquiry",
  "Record Label",
  "Music Production",
  "Recording Studio",
  "Mixing And Mastering",
  "Artist Management",
  "Music Distribution",
  "Music Publishing",
  "Release Management",
  "Artist Branding",
  "Digital Marketing",
  "Video Production",
  "Digital Media",
  "Brand Partnership",
  "Press And Media",
];

const initialFormState: InquiryFormState = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  projectTitle: "",
  message: "",
  website: "",
};

export default function InquiryForm() {
  const searchParams = useSearchParams();

  const requestedService = useMemo(() => {
    const service = searchParams.get("service")?.trim();

    if (!service) {
      return "";
    }

    return inquiryTypes.includes(service)
      ? service
      : "";
  }, [searchParams]);

  const [formData, setFormData] =
    useState<InquiryFormState>(initialFormState);

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] =
    useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (!requestedService) {
      return;
    }

    setFormData((current) => ({
      ...current,
      service: requestedService,
    }));
  }, [requestedService]);

  function updateField(
    field: keyof InquiryFormState,
    value: string
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setStatusMessage("");
    setStatusType(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.success) {
        setStatusType("error");
        setStatusMessage(
          data.message ||
            "Your Inquiry Could Not Be Sent. Please Try Again."
        );

        return;
      }

      setStatusType("success");
      setStatusMessage(data.message);

      setFormData({
        ...initialFormState,
        service: requestedService,
      });
    } catch (error) {
      console.error("Inquiry Form Error:", error);

      setStatusType("error");
      setStatusMessage(
        "An Unexpected Error Occurred. Please Try Again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6"
      noValidate
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(event) =>
            updateField("website", event.target.value)
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter Your Full Name"
          value={formData.fullName}
          maxLength={100}
          autoComplete="name"
          onChange={(value) =>
            updateField("fullName", value)
          }
        />

        <FormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter Your Email Address"
          value={formData.email}
          maxLength={254}
          autoComplete="email"
          onChange={(value) =>
            updateField("email", value)
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter Your Phone Number"
          value={formData.phone}
          maxLength={40}
          autoComplete="tel"
          required={false}
          onChange={(value) =>
            updateField("phone", value)
          }
        />

        <div>
          <label
            htmlFor="service"
            className="font-bold text-white"
          >
            Service
          </label>

          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={(event) =>
              updateField("service", event.target.value)
            }
            className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition-colors focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <option value="">
              Select A Service
            </option>

            {inquiryTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FormField
        id="projectTitle"
        label="Project Title"
        type="text"
        placeholder="Enter Your Project Title"
        value={formData.projectTitle}
        maxLength={150}
        autoComplete="off"
        onChange={(value) =>
          updateField("projectTitle", value)
        }
      />

      <div>
        <label
          htmlFor="message"
          className="font-bold text-white"
        >
          Project Details
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={8}
          maxLength={5000}
          value={formData.message}
          onChange={(event) =>
            updateField("message", event.target.value)
          }
          placeholder="Tell Us About Your Project, Goals, Timeline And Requirements"
          className="mt-3 w-full resize-y rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
        />

        <p className="mt-2 text-right text-sm text-gray-500">
          {formData.message.length}/5000
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-black p-5">
        <p className="text-sm leading-7 text-gray-400">
          Please Do Not Include Passwords, Payment Details Or
          Other Sensitive Information In This Form.
        </p>
      </div>

      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl border px-5 py-4 text-sm font-semibold ${
            statusType === "success"
              ? "border-green-800 bg-green-950/50 text-green-300"
              : "border-red-800 bg-red-950/50 text-red-300"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-red-600 px-8 py-4 font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? "Sending Inquiry..."
          : "Send Inquiry"}
      </button>
    </form>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  maxLength: number;
  autoComplete: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  maxLength,
  autoComplete,
  required = true,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-bold text-white"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
      />
    </div>
  );
}