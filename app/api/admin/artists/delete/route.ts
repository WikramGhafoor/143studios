import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const adminEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();

    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      !adminEmail
    ) {
      console.error(
        "Supabase Or Admin Environment Variables Are Missing."
      );

      return NextResponse.json(
        {
          error:
            "Server Configuration Is Incomplete.",
        },
        {
          status: 500,
        }
      );
    }

    const cookieStore = await cookies();

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
                ({
                  name,
                  value,
                  options,
                }) => {
                  cookieStore.set(
                    name,
                    value,
                    options
                  );
                }
              );
            } catch {
              /*
               * Cookie updates can fail in some
               * server-only rendering contexts.
               */
            }
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (
      authError ||
      !user?.email ||
      user.email.toLowerCase() !== adminEmail
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body = (await request.json()) as {
      id?: unknown;
    };

    const id =
      typeof body.id === "number" ||
      typeof body.id === "string"
        ? body.id
        : null;

    if (
      id === null ||
      String(id).trim().length === 0
    ) {
      return NextResponse.json(
        {
          error: "Artist ID Is Required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error: deleteError } =
      await supabase
        .from("artists")
        .delete()
        .eq("id", id);

    if (deleteError) {
      console.error(
        "Delete Artist Error:",
        deleteError
      );

      return NextResponse.json(
        {
          error:
            "Artist Could Not Be Deleted.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Delete Artist Route Error:",
      error
    );

    return NextResponse.json(
      {
        error: "Delete Failed.",
      },
      {
        status: 500,
      }
    );
  }
}