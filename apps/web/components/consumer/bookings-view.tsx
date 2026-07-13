"use client";

import { ArrowRight, CalendarDays, Clock3, MapPin, MessageSquare, Repeat2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { accountBookings, type BookingStatus as Status } from "../../lib/account";
import { useBookingsStore, withCreated } from "../../store/bookings";
import { Reveal } from "../marketing/reveal";

const tabs: Array<{ id: "upcoming" | "past" | "cancelled"; label: string; match: Status[] }> = [
  { id: "upcoming", label: "Upcoming", match: ["confirmed", "pending"] },
  { id: "past", label: "Past", match: ["completed"] },
  { id: "cancelled", label: "Cancelled", match: ["cancelled"] },
];

const statusStyle: Record<Status, string> = {
  confirmed: "bg-emerald-400/10 text-emerald-300",
  pending: "bg-amber-300/10 text-amber-200",
  completed: "bg-sky-400/10 text-sky-200",
  cancelled: "bg-rose-400/10 text-rose-200",
};

const statusLabel: Record<Status, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function BookingsView() {
  const overrides = useBookingsStore((state) => state.overrides);
  const created = useBookingsStore((state) => state.created);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const bookings = mounted ? withCreated(accountBookings, created, overrides) : accountBookings;

  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("upcoming");
  const active = tabs.find((item) => item.id === tab) ?? tabs[0]!;
  const visible = bookings.filter((booking) => active.match.includes(booking.status));

  return (
    <div>
      <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Your bookings</p>
          <h1 className="mt-3 text-[34px] font-semibold tracking-[-.052em] text-white/90 sm:text-[46px]">Your plans.</h1>
          <p className="mt-3 text-[11px] text-white/26">Everything you've booked across Echelon, in one place.</p>
        </div>
        <Link
          href="/services"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[9px] font-semibold text-white"
        >
          Book something new <ArrowRight className="size-3.5" />
        </Link>
      </Reveal>

      <div className="mt-8 flex gap-1 rounded-2xl border border-white/[.06] bg-[#121217] p-1">
        {tabs.map((item) => {
          const count = bookings.filter((booking) => item.match.includes(booking.status)).length;
          const isActive = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[9px] font-semibold transition ${
                isActive ? "bg-violet-400/12 text-violet-200" : "text-white/32 hover:text-white/60"
              }`}
            >
              {item.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[7px] ${isActive ? "bg-violet-400/20" : "bg-white/[.05]"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-5 grid min-h-52 place-items-center rounded-[22px] border border-dashed border-white/[.075] bg-white/[.012] text-center">
          <div>
            <span className="mx-auto grid size-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
              <CalendarDays className="size-4" />
            </span>
            <p className="mt-4 text-[11px] font-semibold text-white/40">Nothing here yet.</p>
            <p className="mx-auto mt-2 max-w-xs text-[8px] leading-4 text-white/17">
              When you book, it'll show up under {active.label.toLowerCase()}.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {visible.map((booking, index) => (
            <Reveal key={booking.id} delay={index * 0.04}>
              <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5">
                <Link href={`/bookings/${booking.id}`} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[13px] font-semibold text-white/72">{booking.service}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[7px] font-semibold ${statusStyle[booking.status]}`}>
                        {statusLabel[booking.status]}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[9px] text-white/30">{booking.business}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-[8px] text-white/24">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3" /> {booking.when}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="size-3" /> {booking.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3" /> {booking.suburb}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className="text-[15px] font-semibold text-white/70">{booking.price}</span>
                    <span className="flex items-center gap-1 text-[8px] font-semibold text-violet-300">Manage <ArrowRight className="size-3" /></span>
                  </div>
                </Link>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[.05] pt-4">
                  <Link
                    href={`/bookings/${booking.id}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-violet-400/20 bg-violet-400/10 px-3.5 text-[8px] font-semibold text-violet-200 transition hover:bg-violet-400/15"
                  >
                    Manage booking <ArrowRight className="size-3" />
                  </Link>
                  {booking.status === "confirmed" || booking.status === "pending" ? (
                    <Link
                      href="/messages"
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/[.08] px-3.5 text-[8px] font-semibold text-white/50 transition hover:text-white/80"
                    >
                      <MessageSquare className="size-3" /> Message
                    </Link>
                  ) : (
                    <Link
                      href={`/booking/${booking.slug}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/[.08] px-3.5 text-[8px] font-semibold text-white/50 transition hover:text-white/80"
                    >
                      <Repeat2 className="size-3" /> {booking.status === "completed" ? "Book again" : "Rebook"}
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
