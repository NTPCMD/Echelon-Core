import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { clerkEnabled } from "../../lib/clerk";
import { BrandLogo } from "../dashboard/brand-logo";
import { MarketingHeader } from "./marketing-header";

const footerGroups: Array<{ label: string; links: Array<[string, string]> }> = [
  {
    label: "Product",
    links: [
      ["Explore", "/explore"],
      ["Services", "/services"],
      ["How it works", "/how-it-works"],
      ["Platform", "/platform"],
      ["For Business", "/for-business"],
    ],
  },
  {
    label: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
];

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="dark echelon-site min-h-screen overflow-x-clip bg-[#08080b] text-white">
      <MarketingHeader clerkEnabled={clerkEnabled} />
      {children}
      <footer className="relative border-t border-white/[.055] bg-[#09090c]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_.6fr_.6fr]">
            <div className="max-w-md">
              <Link href="/" className="inline-flex items-center gap-3">
                <BrandLogo />
                <span className="text-[13px] font-semibold uppercase tracking-[.22em] text-white/82">
                  Echelon
                </span>
              </Link>
              <p className="mt-5 text-[12px] leading-6 text-white/28">
                One intelligent platform for discovering, booking and running local commerce.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold text-violet-300 transition hover:text-violet-200"
              >
                <Mail className="size-3.5" /> Talk to Echelon <ArrowUpRight className="size-3" />
              </Link>
            </div>

            {footerGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[8px] font-semibold uppercase tracking-[.18em] text-white/20">
                  {group.label}
                </p>
                <div className="mt-4 space-y-3">
                  {group.links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block text-[11px] text-white/35 transition hover:text-white/72"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/[.055] pt-6 text-[8px] text-white/18 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Echelon. Built in Perth, Western Australia.</span>
            <span>One platform. One AI. Every opportunity.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
