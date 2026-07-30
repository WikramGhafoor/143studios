import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function normalizeSecretPath(value: string | undefined) {
  return value?.trim().replace(/^\/+|\/+$/g, "") ?? "";
}

function copyResponseCookies(
  source: NextResponse,
  destination: NextResponse
) {
  source.cookies.getAll().forEach((cookie) => {
    destination.cookies.set(cookie);
  });

  return destination;
}

function notFoundResponse(
  sessionResponse?: NextResponse
) {
  const response = new NextResponse(
    "404 - Page Not Found",
    {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control":
          "no-store, no-cache, must-revalidate",
      },
    }
  );

  return sessionResponse
    ? copyResponseCookies(sessionResponse, response)
    : response;
}

function redirectResponse(
  destination: URL,
  sessionResponse: NextResponse
) {
  const response = NextResponse.redirect(destination);

  return copyResponseCookies(
    sessionResponse,
    response
  );
}

function setSecretAccessCookie(
  response: NextResponse
) {
  response.cookies.set(
    "admin_secret_access",
    "allowed",
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    }
  );

  return response;
}

export async function middleware(
  request: NextRequest
) {
  const secretPath = normalizeSecretPath(
    process.env.ADMIN_SECRET_PATH
  );

  const adminEmail = process.env.ADMIN_EMAIL
    ?.trim()
    .toLowerCase();

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !secretPath ||
    !adminEmail ||
    !supabaseUrl ||
    !supabaseAnonKey
  ) {
    console.error(
      "Required Admin Or Supabase Environment Variables Are Missing."
    );

    return notFoundResponse();
  }

  const pathname = request.nextUrl.pathname;
  const secretBasePath = `/${secretPath}`;

  const isSecretPath =
    pathname === secretBasePath ||
    pathname.startsWith(`${secretBasePath}/`);

  const isAdminPath =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (!isSecretPath && !isAdminPath) {
    return NextResponse.next();
  }

  let sessionResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(name, value);
            }
          );

          sessionResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              sessionResponse.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const userEmail = user?.email
    ?.trim()
    .toLowerCase();

  const isApprovedAdmin =
    !error &&
    Boolean(userEmail) &&
    userEmail === adminEmail;

  /*
   * Secret Admin Entry URL
   */
  if (isSecretPath) {
    if (user && !isApprovedAdmin) {
      return notFoundResponse(sessionResponse);
    }

    const secretSubPath =
      pathname.slice(secretBasePath.length);

    const destination = request.nextUrl.clone();

    destination.pathname = user
      ? secretSubPath
        ? `/admin${secretSubPath}`
        : "/admin"
      : "/admin/login";

    const response = redirectResponse(
      destination,
      sessionResponse
    );

    return setSecretAccessCookie(response);
  }

  /*
   * Direct /admin Access
   */
  const hasSecretAccess =
    request.cookies.get("admin_secret_access")
      ?.value === "allowed";

  if (!hasSecretAccess) {
    return notFoundResponse(sessionResponse);
  }

  const isLoginPage =
    pathname === "/admin/login";

  if (user && !isApprovedAdmin) {
    return notFoundResponse(sessionResponse);
  }

  if (!user && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/admin/login";

    return redirectResponse(
      loginUrl,
      sessionResponse
    );
  }

  if (isApprovedAdmin && isLoginPage) {
    const dashboardUrl = request.nextUrl.clone();

    dashboardUrl.pathname = "/admin";

    return redirectResponse(
      dashboardUrl,
      sessionResponse
    );
  }

  return sessionResponse;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-icon.png|android-chrome-192.png|android-chrome-512.png|site.webmanifest|og-image.jpg|logo.png|hero-bg.png).*)",
  ],
};