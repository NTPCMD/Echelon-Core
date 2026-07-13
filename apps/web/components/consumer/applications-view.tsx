"use client";

import { ArrowRight, BriefcaseBusiness, MapPin, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { applications as seedApplications, type ApplicationStatus } from "../../lib/applications";
import { useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

const statusStyle: Record<ApplicationStatus, string> = {
  applied: "bg-white/[.06] text-white/45",
  viewed: "bg-sky-400/10 text-sky-200",
  interview: "bg-violet-400/12 text-violet-200",
  offer: "bg-emerald-400/10 text-emerald-300",
  declined: "bg-rose-400/10 text-rose-200",
};

const statusLabel: Record<ApplicationStatus, string> = {
  applied: "Applied",
  viewed: "Viewed",
  interview: "Interview",
  offer: "Offer",
  declined: "Not selected",
};

const tabs: Array<{ id: "active" | "jobs" | "freelance" | "all"; label: string }> = [
  { id: "active", label: "Active" },
  { id: "jobs", label: "Jobs" },
  { id: "freelance", label: "Freelance" },
  { id: "all", label: "All" },
];

export function ApplicationsView() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("active");
  const submitted = useAccountStore((state) => state.applications);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const applications = mounted ? [...submitted, ...seedApplications] : seedApplications;

  const visible = applications.filter((app) => {
    if (tab === "active") return app.status !== "declined";
    if (tab === "jobs") return app.module === "jobs";
    if (tab === "freelance") return app.module === "freelancing";
    return true;
  });

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Applications</p>
          <h1 className="mt-3 text-[30px] font-semibold tracking-[-.05em] text-white/90 sm:text-[40px]">Where you've applied.</h1>
          <p className="mt-3 text-[11px] text-white/26">Track every job application and freelance pitch in one pipeline.</p>
        </div>
        <Link href="/explore/jobs" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[9px] font-semibold text-white">
          Find more roles <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="mt-8 flex gap-1 rounded-2xl border border-white/[.06] bg-[#121217] p-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex-1 rounded-xl py-2.5 text-[9px] font-semibold transition ${tab === item.id ? "bg-violet-400/12 text-violet-200" : "text-white/32 hover:text-white/60"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-5 grid min-h-52 place-items-center rounded-[22px] border border-dashed border-white/[.075] bg-white/[.012] text-center">
          <div>
            <p className="text-[11px] font-semibold text-white/40">Nothing here yet.</p>
            <p className="mx-auto mt-2 max-w-xs text-[8px] leading-4 text-white/17">Apply to a role or pitch for a brief and it'll show up here.</p>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {visible.map((app, index) => (
            <Reveal key={app.id} delay={index * 0.04}>
              <Link
                href={`/explore/${app.module}/${app.listingId}`}
                className="block rounded-[22px] border border-white/[.06] bg-[#121217] p-5 transition hover:border-white/[.11]"
              >
                <div className="flex items-start gap-4">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${app.module === "jobs" ? "bg-sky-400/10 text-sky-200" : "bg-amber-300/10 text-amber-100"}`}>
                    {app.module === "jobs" ? <BriefcaseBusiness className="size-4" /> : <Zap className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[13px] font-semibold text-white/72">{app.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[7px] font-semibold ${statusStyle[app.status]}`}>{statusLabel[app.status]}</span>
                    </div>
                    <p className="mt-1 text-[9px] text-white/30">{app.org}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[8px] text-white/24">
                      <span className="flex items-center gap-1"><MapPin className="size-2.5" />{app.location}</span>
                      <span>{app.pay}</span>
                      <span>{app.appliedOn}</span>
                    </div>
                    {app.note ? (
                      <p className="mt-3 rounded-lg border border-white/[.05] bg-white/[.015] px-3 py-2 text-[8px] text-white/35">{app.note}</p>
                    ) : null}
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-white/18" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
