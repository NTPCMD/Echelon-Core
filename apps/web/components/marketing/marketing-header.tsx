"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthControls } from "../auth-controls";
import { BrandLogo } from "../dashboard/brand-logo";

const navigation = [
  { label: "Explore", href: "/explore" },
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "For Business", href: "/for-business" },
];

export function MarketingHeader({ clerkEnabled }: { clerkEnabled: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const businessIntent = pathname === "/for-business";
  const loginHref = businessIntent ? "/auth/login?mode=business" : "/auth/login";
  const registerHref = businessIntent ? "/auth/register?mode=business" : "/auth/register";

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[.055] bg-[#08080b]/78 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3" aria-label="Echelon home">
          <BrandLogo compact className="transition group-hover:shadow-[0_0_30px_rgba(124,108,248,.22)]" />
          <span className="text-[13px] font-semibold uppercase tracking-[.22em] text-white/82">
            Echelon
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-xl px-3.5 py-2 text-[11px] font-medium transition ${
                  active ? "text-white/85" : "text-white/36 hover:bg-white/[.035] hover:text-white/72"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="marketing-nav"
                    className="absolute inset-0 -z-10 rounded-xl border border-white/[.06] bg-white/[.045]"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          {clerkEnabled ? (
            <AuthControls />
          ) : (
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
          )}
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="ml-auto grid size-10 place-items-center rounded-xl border border-white/[.065] bg-white/[.025] text-white/60 transition hover:bg-white/[.06] lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[.05] bg-[#0d0d11]/98 lg:hidden"
          >
            <nav className="mx-auto max-w-[1440px] space-y-1 px-5 py-4 sm:px-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-[12px] font-medium transition ${
                    pathname === item.href
                      ? "bg-violet-400/10 text-violet-200"
                      : "text-white/42 hover:bg-white/[.035] hover:text-white/72"
                  }`}
                >
                  {item.label}
                  <ArrowUpRight className="size-3.5 text-white/20" />
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[.055] pt-4">
                <Link
                  href={loginHref}
                  className="grid h-10 place-items-center rounded-xl border border-white/[.075] text-[11px] font-semibold text-white/55"
                >
                  Log in
                </Link>
                <Link
                  href={registerHref}
                  className="grid h-10 place-items-center rounded-xl bg-violet-500 text-[11px] font-semibold text-white"
                >
                  {businessIntent ? "Start for business" : "Join Echelon"}
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
