import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const adminEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const secretPath =
      process.env.ADMIN_SECRET_PATH
        ?.trim()
        .replace(/^\/+|\/+$/g, "");

    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      !adminEmail ||
      !secretPath
    ) {
      console.error(
        "Missing Required Admin Environment Variables."
      );

      return NextResponse.json(
        {
          isAdmin: false,
          adminPath: null,
        },
        {
          status: 500,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },

          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(
                ({ name, value, options }) => {
                  cookieStore.set(
                    name,
                    value,
                    options
                  );
                }
              );
            } catch {
              // Session refresh is handled by middleware/proxy.
            }
          },
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user?.email) {
      return NextResponse.json(
        {
          isAdmin: false,
          adminPath: null,
        },
        {
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    const isAdmin =
      user.email.trim().toLowerCase() === adminEmail;

    return NextResponse.json(
      {
        isAdmin,
        adminPath: isAdmin
          ? `/${secretPath}`
          : null,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "Admin Session Check Failed:",
      error
    );

    return NextResponse.json(
      {
        isAdmin: false,
        adminPath: null,
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}