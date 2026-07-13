"use client";

import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { accountBookings } from "../../lib/account";
import { useBookingsStore, withCreated } from "../../store/bookings";
import { Reveal } from "../marketing/reveal";

const statusStyle: Record<string, string> = {
  confirmed: "bg-emerald-400/10 text-emerald-300",
  pending: "bg-amber-300/10 text-amber-200",
};

/**
 * Dashboard preview of upcoming bookings. Reads the persisted bookings store so
 * cancellations/reschedules made on the detail page are reflected here too.
 */
export function UpcomingBookings() {
  const overrides = useBookingsStore((state) => state.overrides);
  const created = useBookingsStore((state) => state.created);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const merged = mounted ? withCreated(accountBookings, created, overrides) : accountBookings;
  const upcoming = merged.filter((b) => b.status === "confirmed" || b.status === "pending");

  return (
    <Reveal>
      <section className="rounded-[24px] border border-white/[.06] bg-[#121217] p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-semibold text-white/62">Upcoming bookings</h2>
            <p className="mt-1 text-[8px] text-white/18">Your confirmed local plans</p>
          </div>
          <Link href="/bookings" className="flex items-center gap-1 text-[8px] font-semibold text-violet-300">
            View all <ArrowRight className="size-3" />
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="mt-6 grid min-h-52 place-items-center rounded-[18px] border border-dashed border-white/[.075] bg-white/[.012] text-center">
            <div>
              <span className="mx-auto grid size-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><CalendarDays className="size-4" /></span>
              <p className="mt-4 text-[11px] font-semibold text-white/40">Your calendar is open.</p>
              <Link href="/services" className="mt-5 inline-flex h-9 items-center gap-2 rounded-xl border border-violet-400/15 bg-violet-400/10 px-4 text-[8px] font-semibold text-violet-200">Find a service <ArrowRight className="size-3" /></Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {upcoming.map((booking) => (
              <Link
                key={booking.id}
                href={`/bookings/${booking.id}`}
                className="flex items-center gap-4 rounded-[18px] border border-white/[.055] bg-white/[.014] p-4 transition hover:border-white/[.11]"
              >
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/[.07] bg-[#0e0e13] text-center">
                  <span className="text-[7px] font-semibold uppercase tracking-[.08em] text-violet-300/70">{booking.dateChip.day}</span>
                  <span className="text-[17px] font-semibold leading-none text-white/78">{booking.dateChip.date}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[12px] font-semibold text-white/70">{booking.service}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[7px] font-semibold capitalize ${statusStyle[booking.status] ?? "bg-white/[.05] text-white/40"}`}>{booking.status}</span>
                  </div>
                  <p className="mt-1 text-[8px] text-white/28">{booking.business}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[8px] text-white/22">
                    <span className="flex items-center gap-1"><Clock3 className="size-2.5" />{booking.when}</span>
                    <span className="flex items-center gap-1"><MapPin className="size-2.5" />{booking.suburb}</span>
                  </div>
                </div>
                <span className="hidden shrink-0 items-center gap-1 rounded-xl border border-white/[.08] px-3 py-2 text-[8px] font-semibold text-white/45 sm:inline-flex">
                  Manage <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Reveal>
  );
}
