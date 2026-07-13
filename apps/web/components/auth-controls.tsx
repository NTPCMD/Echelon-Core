"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ArrowUpRight, Building2, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotificationsBell } from "./consumer/notifications-bell";

// Auth controls for the top nav when Clerk is enabled. Instead of Clerk's
// prebuilt modal, we route to the custom /auth/login and /auth/register pages
// (Echelon-branded, with the customer/business toggle). Styling matches the
// non-Clerk fallback in marketing-header so the header looks identical either way.
export function AuthControls() {
  const pathname = usePathname();
  const { isLoaded, isSignedIn, orgId } = useAuth();
  const businessIntent = pathname === "/for-business" || pathname.startsWith("/business-dashboard");
  const loginHref = businessIntent ? "/auth/login?mode=business" : "/auth/login";
  const registerHref = businessIntent ? "/auth/register?mode=business" : "/auth/register";

  if (!isLoaded || !isSignedIn) {
    return (
      <>
        <Link
          href={loginHref}
          className="text-[11px] font-medium text-white/38 transition hover:text-white/75"
        >
          Log in
        </Link>
        <Link
          href={registerHref}
          className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-violet-400/20 bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] px-4 text-[11px] font-semibold text-white shadow-[0_10px_28px_rgba(108,92,231,.2)] transition hover:-translate-y-px hover:shadow-[0_14px_34px_rgba(108,92,231,.28)]"
        >
          Join Echelon <ArrowUpRight className="size-3.5" />
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href={orgId ? "/business-dashboard" : "/dashboard"}
        className="text-[11px] font-medium text-white/38 transition hover:text-white/75"
      >
        {orgId ? "Business dashboard" : "Dashboard"}
      </Link>
      <NotificationsBell />
      <UserButton
        appearance={{
          elements: {
            avatarBox: "size-9",
            userButtonPopoverCard: "bg-[#131318] border border-white/[.08]",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Personal dashboard"
            href="/auth/continue?mode=consumer&returnTo=%2Fdashboard"
            labelIcon={<UserRound className="size-4" />}
          />
          <UserButton.Link
            label="Business workspace"
            href="/auth/continue?mode=business&returnTo=%2Fbusiness-dashboard"
            labelIcon={<Building2 className="size-4" />}
          />
        </UserButton.MenuItems>
      </UserButton>
    </>
  );
}
