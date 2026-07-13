"use client";

import { CalendarCheck, Gift, MessageSquareText, Star, Trophy, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rewards } from "../../lib/account";
import { timeAgo, useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

/** Fixed history so the ledger isn't empty before the user earns anything. */
const seedLedger = [
  { id: "seed-l1", points: 40, reason: "Completed: Signature Glow Facial", time: "2 weeks ago" },
  { id: "seed-l2", points: 20, reason: "Review: Soleil Beauty Lounge", time: "2 weeks ago" },
  { id: "seed-l3", points: 25, reason: "Booking: Fitness Assessment", time: "1 month ago" },
  { id: "seed-l4", points: 100, reason: "Welcome to Echelon", time: "2 months ago" },
];

const earnWays = [
  { icon: CalendarCheck, label: "Book a service", points: "+25 pts", note: "Every confirmed booking" },
  { icon: Star, label: "Leave a review", points: "+20 pts", note: "Help local businesses grow" },
  { icon: MessageSquareText, label: "Send a request", points: "+5 pts", note: "Concierge, tasks, stays & more" },
  { icon: UserRoundPlus, label: "Apply for a role", points: "+10 pts", note: "Jobs and freelance pitches" },
];

export function RewardsView() {
  const ledger = useAccountStore((state) => state.ledger);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const earned = mounted ? ledger.reduce((sum, entry) => sum + entry.points, 0) : 0;
  const balance = rewards.points + earned;
  const pct = Math.min(100, Math.round((balance / rewards.tierCeiling) * 100));
  const toNext = Math.max(0, rewards.tierCeiling - balance);

  return (
    <div>
      <Reveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Echelon Rewards</p>
            <h1 className="mt-3 text-[30px] font-semibold tracking-[-.05em] text-white/90 sm:text-[40px]">
              Earn as you live locally.
            </h1>
            <p className="mt-3 text-[11px] text-white/26">Points on every booking, review and request — across every module.</p>
          </div>
        </div>
      </Reveal>

      {/* Balance card */}
      <Reveal delay={0.05}>
        <div className="mt-8 rounded-[26px] border border-amber-300/14 bg-gradient-to-br from-amber-400/[.08] via-[#121217] to-[#121217] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Gift className="size-4 text-amber-200" />
                <span className="rounded-full bg-amber-300/10 px-2.5 py-1 text-[8px] font-semibold text-amber-100">
                  {rewards.tier} tier
                </span>
              </div>
              <p className="mt-4 text-[40px] font-semibold tracking-[-.05em] text-amber-100">
                {balance} <span className="text-[16px] text-amber-100/60">pts</span>
              </p>
              {mounted && earned > 0 ? (
                <p className="mt-1 text-[8px] text-emerald-300">+{earned} earned by you on this device</p>
              ) : null}
            </div>
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between text-[8px]">
                <span className="text-white/30">{rewards.tier}</span>
                <span className="text-white/30">{rewards.nextTier}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[.07]">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-[8px] text-white/26">
                {toNext > 0 ? (
                  <>
                    <span className="font-semibold text-white/50">{toNext} pts</span> to {rewards.nextTier} — keep going.
                  </>
                ) : (
                  <span className="font-semibold text-emerald-300">You've reached {rewards.nextTier}! 🎉</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Ways to earn */}
      <Reveal delay={0.08}>
        <h2 className="mt-10 text-[18px] font-semibold tracking-[-.03em] text-white/78">Ways to earn.</h2>
      </Reveal>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {earnWays.map((way, index) => (
          <Reveal key={way.label} delay={index * 0.04}>
            <div className="h-full rounded-[20px] border border-white/[.06] bg-[#121217] p-5">
              <span className="grid size-9 place-items-center rounded-xl bg-amber-300/10 text-amber-100">
                <way.icon className="size-4" />
              </span>
              <p className="mt-4 text-[11px] font-semibold text-white/62">{way.label}</p>
              <p className="mt-1 text-[8px] text-white/24">{way.note}</p>
              <p className="mt-3 text-[12px] font-semibold text-amber-100">{way.points}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* History */}
      <Reveal delay={0.1}>
        <h2 className="mt-10 text-[18px] font-semibold tracking-[-.03em] text-white/78">History.</h2>
      </Reveal>
      <div className="mt-5 overflow-hidden rounded-[22px] border border-white/[.06] bg-[#121217]">
        {(mounted ? ledger : []).map((entry) => (
          <div key={entry.id} className="flex items-center justify-between gap-4 border-b border-white/[.045] px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300">
                <Trophy className="size-3.5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold text-white/58">{entry.reason}</p>
                <p className="mt-0.5 text-[7px] text-white/20">{timeAgo(entry.at)}</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-300">+{entry.points}</span>
          </div>
        ))}
        {seedLedger.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between gap-4 border-b border-white/[.045] px-5 py-4 last:border-0">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-white/[.04] text-white/35">
                <Trophy className="size-3.5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold text-white/50">{entry.reason}</p>
                <p className="mt-0.5 text-[7px] text-white/20">{entry.time}</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-white/40">+{entry.points}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[22px] border border-violet-400/12 bg-gradient-to-br from-violet-500/[.07] to-[#121217] p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-[12px] font-semibold text-white/68">Redemptions are coming.</p>
          <p className="mt-1 text-[9px] text-white/26">Soon you'll spend points on discounts and perks at local businesses.</p>
        </div>
        <Link href="/services" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[9px] font-semibold text-white">
          Earn more — book something
        </Link>
      </div>
    </div>
  );
}
