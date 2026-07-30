"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type AdminCheckResponse = {
  isAdmin: boolean;
  adminPath: string | null;
};

function normalizePath(path: string): string {
  if (path === "/") {
    return path;
  }

  return path.replace(/\/+$/, "");
}

function isSafeInternalPath(path: unknown): path is string {
  return (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("\\")
  );
}

export default function AdminQuickAccess() {
  const pathname = usePathname();

  const [adminPath, setAdminPath] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAdmin() {
      setLoading(true);

      try {
        const response = await fetch("/api/admin/check", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          if (isMounted) {
            setAdminPath(null);
          }

          return;
        }

        const data =
          (await response.json()) as AdminCheckResponse;

        if (!isMounted) {
          return;
        }

        if (
          data.isAdmin &&
          isSafeInternalPath(data.adminPath)
        ) {
          setAdminPath(normalizePath(data.adminPath));
        } else {
          setAdminPath(null);
        }
      } catch (error) {
        console.error(
          "Admin quick access check failed:",
          error
        );

        if (isMounted) {
          setAdminPath(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void checkAdmin();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const currentPath = normalizePath(pathname);

  if (
    loading ||
    !adminPath ||
    currentPath === adminPath
  ) {
    return null;
  }

  return (
    <Link
      href={adminPath}
      aria-label="Back To Admin Dashboard"
      className="fixed bottom-6 right-6 z-[100] rounded-xl border border-red-500 bg-red-600 px-5 py-3 font-bold text-white shadow-xl shadow-black/40 transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      ← Back To Admin Dashboard
    </Link>
  );
}