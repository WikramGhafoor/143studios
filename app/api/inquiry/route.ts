import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InquiryRequest = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  projectTitle?: unknown;
  message?: unknown;
  website?: unknown;
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 40;
const MAX_SERVICE_LENGTH = 100;
const MAX_PROJECT_TITLE_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 5000;

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(
  body: {
    success: boolean;
    message: string;
  },
  status: number
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const inquiryEmail = process.env.INQUIRY_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !inquiryEmail || !fromEmail) {
      console.error(
        "RESEND_API_KEY, INQUIRY_EMAIL Or RESEND_FROM_EMAIL Is Missing."
      );

      return jsonResponse(
        {
          success: false,
          message:
            "The Inquiry Service Is Temporarily Unavailable. Please Try Again Later.",
        },
        500
      );
    }

    const contentType = request.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return jsonResponse(
        {
          success: false,
          message: "Invalid Request Format.",
        },
        415
      );
    }

    const body = (await request.json()) as InquiryRequest;

    const fullName = cleanText(body.fullName);
    const email = cleanText(body.email).toLowerCase();
    const phone = cleanText(body.phone);
    const service = cleanText(body.service);
    const projectTitle = cleanText(body.projectTitle);
    const message = cleanText(body.message);
    const website = cleanText(body.website);

    /*
     * Honeypot Field
     * Real Visitors Will Leave This Empty.
     */
    if (website) {
      return jsonResponse(
        {
          success: true,
          message: "Your Inquiry Has Been Sent Successfully.",
        },
        200
      );
    }

    if (
      !fullName ||
      !email ||
      !service ||
      !projectTitle ||
      !message
    ) {
      return jsonResponse(
        {
          success: false,
          message: "Please Complete All Required Fields.",
        },
        400
      );
    }

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          message: "Please Enter A Valid Email Address.",
        },
        400
      );
    }

    if (
      fullName.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      phone.length > MAX_PHONE_LENGTH ||
      service.length > MAX_SERVICE_LENGTH ||
      projectTitle.length > MAX_PROJECT_TITLE_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "One Or More Fields Are Too Long. Please Shorten Your Inquiry.",
        },
        400
      );
    }

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not Provided");
    const safeService = escapeHtml(service);
    const safeProjectTitle = escapeHtml(projectTitle);
    const safeMessage = escapeHtml(message).replaceAll(
      "\n",
      "<br />"
    );

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [inquiryEmail],
      replyTo: email,
      subject: `New 143 Studios Inquiry: ${projectTitle}`,
      text: [
        "New Inquiry Received From 143 Studios Website",
        "",
        `Full Name: ${fullName}`,
        `Email Address: ${email}`,
        `Phone Number: ${phone || "Not Provided"}`,
        `Selected Service: ${service}`,
        `Project Title: ${projectTitle}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div
          style="
            margin: 0;
            padding: 32px;
            background: #09090b;
            color: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <div
            style="
              max-width: 680px;
              margin: 0 auto;
              overflow: hidden;
              border: 1px solid #7f1d1d;
              border-radius: 18px;
              background: #18181b;
            "
          >
            <div
              style="
                padding: 28px;
                background: #000000;
                border-bottom: 1px solid #7f1d1d;
              "
            >
              <p
                style="
                  margin: 0 0 8px;
                  color: #ef4444;
                  font-size: 13px;
                  font-weight: 700;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                "
              >
                143 Studios Website
              </p>

              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  line-height: 1.3;
                "
              >
                New Inquiry Received
              </h1>
            </div>

            <div style="padding: 28px;">
              <table
                role="presentation"
                style="
                  width: 100%;
                  border-collapse: collapse;
                  color: #d4d4d8;
                "
              >
                <tr>
                  <td
                    style="
                      width: 170px;
                      padding: 10px 0;
                      color: #a1a1aa;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Full Name
                  </td>

                  <td style="padding: 10px 0;">
                    ${safeFullName}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      color: #a1a1aa;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Email Address
                  </td>

                  <td style="padding: 10px 0;">
                    <a
                      href="mailto:${safeEmail}"
                      style="color: #f87171;"
                    >
                      ${safeEmail}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      color: #a1a1aa;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Phone Number
                  </td>

                  <td style="padding: 10px 0;">
                    ${safePhone}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      color: #a1a1aa;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Selected Service
                  </td>

                  <td style="padding: 10px 0;">
                    ${safeService}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 0;
                      color: #a1a1aa;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Project Title
                  </td>

                  <td style="padding: 10px 0;">
                    ${safeProjectTitle}
                  </td>
                </tr>
              </table>

              <div
                style="
                  margin-top: 24px;
                  padding: 22px;
                  border: 1px solid #3f3f46;
                  border-radius: 14px;
                  background: #09090b;
                "
              >
                <p
                  style="
                    margin: 0 0 12px;
                    color: #f87171;
                    font-weight: 700;
                  "
                >
                  Message
                </p>

                <p
                  style="
                    margin: 0;
                    color: #d4d4d8;
                    line-height: 1.8;
                  "
                >
                  ${safeMessage}
                </p>
              </div>

              <p
                style="
                  margin: 24px 0 0;
                  color: #71717a;
                  font-size: 13px;
                  line-height: 1.7;
                "
              >
                Reply Directly To This Email To Respond To
                ${safeFullName}.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Inquiry Error:", error);

      return jsonResponse(
        {
          success: false,
          message:
            "Your Inquiry Could Not Be Sent. Please Try Again.",
        },
        500
      );
    }

    console.log("Inquiry Email Sent:", data?.id);

    return jsonResponse(
      {
        success: true,
        message:
          "Thank You! Your Inquiry Has Been Sent Successfully. Our Team Will Contact You Soon.",
      },
      200
    );
  } catch (error) {
    console.error("Inquiry API Error:", error);

    return jsonResponse(
      {
        success: false,
        message:
          "An Unexpected Error Occurred. Please Try Again.",
      },
      500
    );
  }
}