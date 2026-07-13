import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SavedView } from "../../components/consumer/saved-view";
import { Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";

export const metadata = {
  title: "Saved — Echelon",
  description: "Your shortlist of saved local businesses and opportunities.",
};

export default async function SavedPage() {
  await requireConsumerContext("/saved");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1120px]">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Your shortlist</p>
              <h1 className="mt-3 text-[34px] font-semibold tracking-[-.052em] text-white/90 sm:text-[46px]">Saved.</h1>
              <p className="mt-3 text-[11px] text-white/26">The places and people you're keeping an eye on.</p>
            </div>
            <Link
              href="/explore"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.08] px-5 text-[9px] font-semibold text-white/55 transition hover:text-white/85"
            >
              Explore more <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>

          <SavedView />
        </div>
      </main>
    </MarketingShell>
  );
}
