"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { ArrowRight, Building2, Loader2, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { buildAuthContinuationUrl } from "../../lib/auth-intent";

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "errors" in error) {
    const errors = (error as { errors?: Array<{ longMessage?: string; message?: string }> }).errors;
    const message = errors?.[0]?.longMessage ?? errors?.[0]?.message;
    if (message) return message;
  }
  return "Echelon could not create this workspace. Check that Organizations are enabled in Clerk and try again.";
}

export function BusinessOnboarding({ returnTo }: { returnTo: string }) {
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { isLoaded, createOrganization, setActive, userMemberships } = useOrganizationList({
    userMemberships: { pageSize: 20 },
  });
  const memberships = userMemberships.data ?? [];

  const activate = async (organizationId: string) => {
    if (!setActive) return;
    setError("");
    setSelecting(organizationId);
    try {
      await setActive({ organization: organizationId, redirectUrl: returnTo });
    } catch (caught) {
      setSelecting(null);
      setError(getErrorMessage(caught));
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!businessName.trim() || !createOrganization || !setActive) return;
    setError("");
    setLoading(true);
    try {
      const organization = await createOrganization({ name: businessName.trim() });
      await setActive({ organization: organization.id, redirectUrl: returnTo });
    } catch (caught) {
      setLoading(false);
      setError(getErrorMessage(caught));
    }
  };

  return (
    <div className="rounded-[26px] border border-white/[.07] bg-[#121217] p-6 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-8">
      <span className="grid size-12 place-items-center rounded-2xl bg-violet-400/10 text-violet-200"><Building2 className="size-5" /></span>
      <p className="mt-6 text-[8px] font-semibold uppercase tracking-[.18em] text-violet-300/70">Business setup</p>
      <h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/84">Create a private workspace.</h1>
      <p className="mt-3 text-[9px] leading-5 text-white/25">Your Clerk login remains the same. This workspace becomes the boundary for business bookings, staff, customers, messages and settings.</p>

      {isLoaded && memberships.length > 0 ? (
        <div className="mt-6">
          <p className="text-[8px] font-semibold uppercase tracking-[.14em] text-white/24">Existing workspaces</p>
          <div className="mt-2 space-y-2">
            {memberships.map((membership) => (
              <button
                key={membership.id}
                type="button"
                disabled={selecting !== null || loading}
                onClick={() => void activate(membership.organization.id)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.02] p-4 text-left outline-none transition hover:border-violet-400/20 hover:bg-violet-400/[.05] focus-visible:ring-2 focus-visible:ring-violet-400/45 disabled:opacity-50"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-[10px] font-bold text-violet-200">{membership.organization.name.slice(0, 2).toUpperCase()}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-[11px] font-semibold text-white/68">{membership.organization.name}</span><span className="mt-1 block text-[8px] text-white/22">Open this existing business</span></span>
                {selecting === membership.organization.id ? <Loader2 className="size-4 animate-spin text-violet-300" /> : <ArrowRight className="size-4 text-white/18 transition group-hover:translate-x-0.5 group-hover:text-violet-300" />}
              </button>
            ))}
          </div>
          <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-white/[.06]" /><span className="text-[7px] uppercase tracking-[.15em] text-white/16">or create another</span><span className="h-px flex-1 bg-white/[.06]" /></div>
        </div>
      ) : null}

      <form onSubmit={submit} className={memberships.length ? "" : "mt-6"}>
        <label className="block text-[9px] font-medium text-white/36">
          Business or workspace name
          <div className="relative mt-2">
            <Building2 className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" />
            <input
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="WS Labs"
              autoComplete="organization"
              required
              className="h-11 w-full rounded-xl border border-white/[.075] bg-white/[.03] pl-9 pr-3 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10"
            />
          </div>
        </label>

        {error ? <p className="mt-4 rounded-xl border border-rose-400/10 bg-rose-400/[.045] p-3 text-[8px] leading-4 text-rose-200">{error}</p> : null}

        <button type="submit" disabled={!isLoaded || loading || selecting !== null || !businessName.trim()} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] disabled:opacity-40">
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Building2 className="size-3.5" />}
          {loading ? "Creating secure workspace…" : "Create business workspace"}
          {!loading ? <ArrowRight className="size-3.5" /> : null}
        </button>
      </form>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-400/10 bg-emerald-400/[.035] p-3">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
        <p className="text-[7px] leading-4 text-white/23">The same email can use both modes. Personal records use your user ID; business records use this organization ID.</p>
      </div>

      <Link href={buildAuthContinuationUrl("consumer", "/dashboard")} className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/[.08] text-[8px] font-semibold text-white/38 transition hover:bg-white/[.04] hover:text-white/65">
        <UserRound className="size-3.5" /> Continue to personal dashboard instead
      </Link>
    </div>
  );
}
