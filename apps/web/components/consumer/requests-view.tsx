"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getModule } from "../../lib/modules";
import { requests as seedRequests, type RequestStatus } from "../../lib/requests";
import { useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

const statusStyle: Record<RequestStatus, string> = {
  sent: "bg-white/[.06] text-white/45",
  matched: "bg-sky-400/10 text-sky-200",
  in_progress: "bg-violet-400/12 text-violet-200",
  completed: "bg-emerald-400/10 text-emerald-300",
  closed: "bg-white/[.05] text-white/35",
};

const statusLabel: Record<RequestStatus, string> = {
  sent: "Sent",
  matched: "Matched",
  in_progress: "In progress",
  completed: "Completed",
  closed: "Closed",
};

const tabs: Array<{ id: "open" | "completed" | "all"; label: string }> = [
  { id: "open", label: "Open" },
  { id: "completed", label: "Completed" },
  { id: "all", label: "All" },
];

const openStatuses: RequestStatus[] = ["sent", "matched", "in_progress"];

export function RequestsView() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("open");
  const submitted = useAccountStore((state) => state.requests);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const requests = mounted ? [...submitted, ...seedRequests] : seedRequests;

  const visible = requests.filter((request) => {
    if (tab === "open") return openStatuses.includes(request.status);
    if (tab === "completed") return request.status === "completed" || request.status === "closed";
    return true;
  });

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Requests</p>
          <h1 className="mt-3 text-[30px] font-semibold tracking-[-.05em] text-white/90 sm:text-[40px]">What you've asked Echelon.</h1>
          <p className="mt-3 text-[11px] text-white/26">Everything the Concierge is handling for you, across every module.</p>
        </div>
        <Link href="/" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[9px] font-semibold text-white">
          <Sparkles className="size-3.5" /> New request
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
            <p className="text-[11px] font-semibold text-white/40">No requests here.</p>
            <p className="mx-auto mt-2 max-w-xs text-[8px] leading-4 text-white/17">Ask Echelon for anything local and it'll show up here as it's handled.</p>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {visible.map((request, index) => {
            const module = getModule(request.module);
            const Icon = module?.icon ?? Sparkles;
            return (
              <Reveal key={request.id} delay={index * 0.04}>
                <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5">
                  <div className="flex items-start gap-4">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${module?.accent.bg ?? "bg-violet-400/10"} ${module?.accent.text ?? "text-violet-200"}`}>
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[13px] font-semibold text-white/72">{request.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[7px] font-semibold ${statusStyle[request.status]}`}>{statusLabel[request.status]}</span>
                      </div>
                      <p className="mt-1.5 text-[9px] leading-5 text-white/30">{request.summary}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-[8px] text-white/24">
                        <span className="font-semibold text-white/34">{module?.name ?? "Concierge"}</span>
                        <span>·</span>
                        <span>{request.createdOn}</span>
                        {request.provider ? (<><span>·</span><span>Matched with <span className="text-white/40">{request.provider}</span></span></>) : null}
                      </div>
                      {request.routedTo && request.routedTo.length > 0 ? (
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="text-[7px] uppercase tracking-[.1em] text-white/20">Routed to</span>
                          {request.routedTo.map((slug) => {
                            const m = getModule(slug);
                            return (
                              <span key={slug} className={`rounded-full px-2 py-0.5 text-[7px] font-semibold ${m?.accent.bg ?? "bg-white/[.05]"} ${m?.accent.text ?? "text-white/40"}`}>
                                {m?.name ?? slug}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                    {module && module.slug !== "concierge" ? (
                      <Link href={`/explore/${module.slug}`} className="mt-1 hidden shrink-0 items-center gap-1 text-[8px] font-semibold text-violet-300 sm:flex">
                        Open <ArrowRight className="size-3" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
