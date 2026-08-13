"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";
import Link from "next/link";
import { Button } from "@/shared/components/Button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  // ✅ Login page ko hamesha render hone do
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground/70">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                href="/admin/dashboard"
                className="text-xl font-serif font-bold text-gradient"
              >
                Utsavam Admin
              </Link>

              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/admin/dashboard"
                  className="text-sm text-foreground/70 hover:text-secondary"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/portfolio"
                  className="text-sm text-foreground/70 hover:text-secondary"
                >
                  Portfolio
                </Link>
                <Link
                  href="/admin/services"
                  className="text-sm text-foreground/70 hover:text-secondary"
                >
                  Services
                </Link>
                <Link
                  href="/admin/bookings"
                  className="text-sm text-foreground/70 hover:text-secondary"
                >
                  Bookings
                </Link>
                <Link
                  href="/admin/hero-media"
                  className="text-sm text-foreground/70 hover:text-secondary"
                >
                  Hero Media
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-foreground/70 hover:text-secondary"
              >
                View Site
              </Link>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">{children}</div>
    </div>
  );
}
