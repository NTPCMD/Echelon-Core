"use client";

import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { ArrowRight, Building2, Loader2, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  buildAuthContinuationUrl,
  buildBusinessOnboardingUrl,
  type AccountMode,
} from "../../lib/auth-intent";

export function AuthContinuation({ mode, returnTo }: { mode: AccountMode; returnTo: string }) {
  const router = useRouter();
  const { orgId } = useAuth();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: { pageSize: 20 },
  });
  const started = useRef(false);
  const [error, setError] = useState("");
  const [selecting, setSelecting] = useState<string | null>(null);
  const memberships = userMemberships.data ?? [];

  const activate = async (organizationId: string | null) => {
    if (!setActive) return;
    setError("");
    setSelecting(organizationId ?? "personal");
    try {
      await setActive({ organization: organizationId, redirectUrl: returnTo });
    } catch {
      setSelecting(null);
      setError("Echelon could not switch account context. Please try again.");
    }
  };

  useEffect(() => {
    if (!isLoaded || userMemberships.isLoading || !setActive || started.current || error) return;

    if (mode === "consumer") {
      started.current = true;
      void activate(null);
      return;
    }

    const activeMembership = memberships.find((membership) => membership.organization.id === orgId);
    if (activeMembership) {
      started.current = true;
      void activate(activeMembership.organization.id);
      return;
    }

    if (memberships.length === 1) {
      started.current = true;
      void activate(memberships[0]!.organization.id);
      return;
    }

    if (memberships.length === 0) {
      started.current = true;
      router.replace(buildBusinessOnboardingUrl(returnTo));
    }
  }, [error, isLoaded, memberships, mode, orgId, returnTo, router, setActive, userMemberships.isLoading]);

  const choosingBusiness = mode === "business" && memberships.length > 1 && !userMemberships.isLoading;

  return (
    <div className="rounded-[26px] border border-white/[.07] bg-[#121217] p-6 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-8">
      <span className="grid size-12 place-items-center rounded-2xl bg-violet-400/10 text-violet-200">
        {choosingBusiness ? <Building2 className="size-5" /> : <Loader2 className="size-5 animate-spin" />}
      </span>
      <p className="mt-6 text-[8px] font-semibold uppercase tracking-[.18em] text-violet-300/70">Secure handoff</p>
      <h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/84">
        {choosingBusiness ? "Choose a workspace." : `Preparing your ${mode === "business" ? "business" : "personal"} dashboard.`}
      </h1>
      <p className="mt-3 text-[9px] leading-5 text-white/25">
        {choosingBusiness
          ? "This identity belongs to more than one business. Choose which isolated workspace to open."
          : "Echelon is confirming the correct account context before loading any private information."}
      </p>

      {choosingBusiness ? (
        <div className="mt-6 space-y-2">
          {memberships.map((membership) => (
            <button
              key={membership.id}
              type="button"
              disabled={selecting !== null}
              onClick={() => void activate(membership.organization.id)}
              className="group flex w-full items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.02] p-4 text-left outline-none transition hover:border-violet-400/20 hover:bg-violet-400/[.05] focus-visible:ring-2 focus-visible:ring-violet-400/45 disabled:opacity-50"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-[10px] font-bold text-violet-200">
                {membership.organization.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold text-white/70">{membership.organization.name}</span>
                <span className="mt-1 block text-[8px] text-white/22">{membership.role === "org:admin" ? "Owner or administrator" : "Team member"}</span>
              </span>
              {selecting === membership.organization.id ? <Loader2 className="size-4 animate-spin text-violet-300" /> : <ArrowRight className="size-4 text-white/18 transition group-hover:translate-x-0.5 group-hover:text-violet-300" />}
            </button>
          ))}
        </div>
      ) : null}

      {error ? <div className="mt-5 rounded-xl border border-rose-400/10 bg-rose-400/[.045] p-3 text-[8px] text-rose-200"><p>{error}</p><button type="button" onClick={() => { started.current = false; setError(""); }} className="mt-2 font-semibold text-rose-100 underline decoration-rose-300/30 underline-offset-4">Try again</button></div> : null}

      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-emerald-400/10 bg-emerald-400/[.035] p-3">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
        <p className="text-[7px] leading-4 text-white/23">Personal data is scoped to your user identity. Business data is scoped to the selected organization.</p>
      </div>

      {choosingBusiness ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link href={buildBusinessOnboardingUrl(returnTo)} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[.08] text-[8px] font-semibold text-white/42 transition hover:bg-white/[.04] hover:text-white/70">
            <Building2 className="size-3.5" /> Create another business
          </Link>
          <Link href={buildAuthContinuationUrl("consumer", "/dashboard")} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[.08] text-[8px] font-semibold text-white/42 transition hover:bg-white/[.04] hover:text-white/70">
            <UserRound className="size-3.5" /> Use personal account
          </Link>
        </div>
      ) : null}
    </div>
  );
}
