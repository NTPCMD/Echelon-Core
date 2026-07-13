"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Hash,
  Loader2,
  MapPin,
  MessageSquare,
  Navigation,
  Repeat2,
  ShieldCheck,
  Star,
  Store,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AccountBooking, BookingStatus } from "../../lib/account";
import { type CalendarEvent, mapsUrl } from "../../lib/calendar";
import { useAccountStore } from "../../store/account";
import { mergeBooking, useBookingsStore } from "../../store/bookings";
import { Reveal } from "../marketing/reveal";
import { AddToCalendar } from "./add-to-calendar";

const statusStyle: Record<BookingStatus, string> = {
  confirmed: "bg-emerald-400/10 text-emerald-300",
  pending: "bg-amber-300/10 text-amber-200",
  completed: "bg-sky-400/10 text-sky-200",
  cancelled: "bg-rose-400/10 text-rose-200",
};

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function to12h(time: string) {
  const [h = 0, m = 0] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function nextDays(count: number) {
  const base = new Date();
  return Array.from({ length: count }).map((_, index) => {
    const date = new Date(base);
    date.setDate(base.getDate() + index + 1);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return {
      iso,
      day: new Intl.DateTimeFormat("en-AU", { weekday: "short" }).format(date),
      date: String(date.getDate()),
      month: new Intl.DateTimeFormat("en-AU", { month: "short" }).format(date),
    };
  });
}

export function BookingDetail({ booking }: { booking: AccountBooking }) {
  const overrides = useBookingsStore((state) => state.overrides);
  const cancelBooking = useBookingsStore((state) => state.cancel);
  const rescheduleBooking = useBookingsStore((state) => state.reschedule);
  const addReview = useAccountStore((state) => state.addReview);

  // Guard against SSR/client hydration mismatch: render base data first,
  // then apply persisted overrides once mounted on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const merged = mounted ? mergeBooking(booking, overrides) : booking;
  const status: BookingStatus = merged.status;
  const { when, startLocal, dateChip } = merged;
  const rescheduleRequested = mounted ? Boolean(overrides[booking.id]?.rescheduleRequested) : false;

  const [modal, setModal] = useState<null | "cancel" | "reschedule" | "review">(null);
  const [busy, setBusy] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);

  // Reschedule form state
  const days = useMemo(() => nextDays(7), []);
  const [pickDate, setPickDate] = useState(days[0]?.iso ?? "");
  const [pickTime, setPickTime] = useState(timeSlots[3] ?? "14:00");

  // Review form state
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const isUpcoming = status === "confirmed" || status === "pending";
  const isCompleted = status === "completed";
  const isCancelled = status === "cancelled";

  const calendarEvent: CalendarEvent = {
    title: `${booking.service} — ${booking.business}`,
    description: `Echelon booking ${booking.reference}. ${booking.service} with ${booking.business}.`,
    location: booking.address,
    startLocal,
    durationMinutes: booking.durationMinutes,
  };

  function confirmCancel() {
    setBusy(true);
    setTimeout(() => {
      cancelBooking(booking.id);
      setBusy(false);
      setModal(null);
    }, 800);
  }

  function confirmReschedule() {
    setBusy(true);
    setTimeout(() => {
      const picked = days.find((d) => d.iso === pickDate) ?? days[0];
      if (picked) {
        rescheduleBooking(booking.id, {
          when: `${picked.day} ${picked.date} ${picked.month} · ${to12h(pickTime)}`,
          startLocal: `${picked.iso}T${pickTime}:00`,
          dateChip: { day: picked.day, date: picked.date },
        });
      }
      setBusy(false);
      setModal(null);
    }, 800);
  }

  function submitReview() {
    setBusy(true);
    setTimeout(() => {
      addReview({ slug: booking.slug, business: booking.business, rating, text: reviewText.trim() });
      setBusy(false);
      setReviewDone(true);
      setModal(null);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-[1120px]">
      <Link href="/bookings" className="inline-flex items-center gap-2 text-[9px] font-semibold text-white/30 transition hover:text-white/65">
        <ArrowLeft className="size-3.5" /> All bookings
      </Link>

      {isCancelled ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-rose-400/12 bg-rose-400/[.05] p-4">
          <XCircle className="size-4 shrink-0 text-rose-300" />
          <p className="text-[9px] text-rose-100/80">This booking was cancelled. You can rebook the same service any time.</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[8px] font-semibold capitalize ${statusStyle[status]}`}>{status}</span>
            <span className="flex items-center gap-1 text-[8px] text-white/28"><Hash className="size-2.5" />{booking.reference}</span>
          </div>
          <h1 className="mt-3 text-[30px] font-semibold tracking-[-.05em] text-white/92 sm:text-[40px]">{booking.service}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-white/32"><Store className="size-3.5" />{booking.business}</p>
        </div>
        <span className="text-[26px] font-semibold tracking-[-.04em] text-white/72">{booking.price}</span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main */}
        <div className="space-y-4">
          <Reveal>
            <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-white/[.07] bg-[#0e0e13] text-center">
                  <span className="text-[7px] font-semibold uppercase tracking-[.08em] text-violet-300/70">{dateChip.day}</span>
                  <span className="text-[19px] font-semibold leading-none text-white/80">{dateChip.date}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-white/72">{when}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[9px] text-white/26"><Clock3 className="size-3" />{booking.duration} appointment</p>
                  {rescheduleRequested && !isCancelled ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-300/[.08] px-2 py-1 text-[7px] font-semibold text-amber-200/90">
                      <Repeat2 className="size-2.5" /> New time requested — business notified
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-white/[.05] pt-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-violet-300" />
                  <div className="flex-1">
                    <p className="text-[9px] font-medium text-white/45">{booking.business}</p>
                    <p className="mt-0.5 text-[9px] text-white/24">{booking.address}</p>
                    <a href={mapsUrl(`${booking.business}, ${booking.address}`)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[8px] font-semibold text-violet-300 transition hover:text-violet-200">
                      <Navigation className="size-3" /> Get directions
                    </a>
                  </div>
                </div>
              </div>

              {!isCancelled ? (
                <div className="mt-5 border-t border-white/[.05] pt-5">
                  <AddToCalendar event={calendarEvent} filename={`echelon-${booking.reference}.ics`} />
                </div>
              ) : null}
            </div>
          </Reveal>

          {/* Actions */}
          <Reveal delay={0.05}>
            <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5 sm:p-6">
              <h2 className="text-[11px] font-semibold text-white/55">Manage this booking</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {isUpcoming ? (
                  <>
                    <button onClick={() => setModal("reschedule")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/55 transition hover:text-white/85">
                      <Repeat2 className="size-3.5" /> Reschedule
                    </button>
                    <Link href="/messages" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/55 transition hover:text-white/85">
                      <MessageSquare className="size-3.5" /> Message business
                    </Link>
                    <button onClick={() => setModal("cancel")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-rose-400/14 bg-rose-400/[.05] px-4 text-[9px] font-semibold text-rose-200/85 transition hover:bg-rose-400/10">
                      <XCircle className="size-3.5" /> Cancel booking
                    </button>
                  </>
                ) : null}
                {isCompleted ? (
                  <>
                    {reviewDone ? (
                      <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-400/14 bg-emerald-400/[.06] px-4 text-[9px] font-semibold text-emerald-200"><Check className="size-3.5" /> Review submitted</span>
                    ) : (
                      <button onClick={() => setModal("review")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-amber-300/16 bg-amber-300/[.06] px-4 text-[9px] font-semibold text-amber-100 transition hover:bg-amber-300/12">
                        <Star className="size-3.5" /> Leave a review
                      </button>
                    )}
                    <Link href={`/booking/${booking.slug}`} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/55 transition hover:text-white/85">
                      <Repeat2 className="size-3.5" /> Book again
                    </Link>
                  </>
                ) : null}
                {isCancelled ? (
                  <Link href={`/booking/${booking.slug}`} className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[9px] font-semibold text-white transition hover:-translate-y-px">
                    <Repeat2 className="size-3.5" /> Rebook this service
                  </Link>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Reveal>
            <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-200"><Building2 className="size-4" /></span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-white/62">{booking.business}</p>
                  <p className="text-[8px] text-white/24">{booking.suburb}, Perth</p>
                </div>
              </div>
              <Link href={`/businesses/${booking.slug}`} className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-white/[.08] text-[8px] font-semibold text-white/55 transition hover:text-white/85">
                View business profile
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5">
              <h2 className="text-[10px] font-semibold text-white/52">Payment</h2>
              <div className="mt-4 space-y-2.5 text-[9px]">
                <div className="flex items-center justify-between"><span className="text-white/28">{booking.service}</span><span className="text-white/55">{booking.price}</span></div>
                <div className="flex items-center justify-between border-t border-white/[.05] pt-2.5"><span className="text-white/28">Total</span><span className="font-semibold text-white/70">{booking.price}</span></div>
              </div>
              <p className="mt-3 text-[7px] leading-4 text-white/18">Payment is handled securely at the business. This is a preview — no charge is made.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5">
              <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-300" /><h2 className="text-[10px] font-semibold text-white/52">Need a hand?</h2></div>
              <p className="mt-3 text-[8px] leading-4 text-white/24">Questions about your booking? Message the business directly or reach Echelon support.</p>
              <Link href="/contact" className="mt-3 inline-flex items-center gap-1 text-[8px] font-semibold text-violet-300">Contact support →</Link>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5 backdrop-blur-sm"
            onClick={() => !busy && setModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-[24px] border border-white/[.09] bg-[#131318] p-6 shadow-[0_40px_120px_rgba(0,0,0,.6)]"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-[15px] font-semibold text-white/82">
                  {modal === "cancel" ? "Cancel booking?" : modal === "reschedule" ? "Request a reschedule" : "Leave a review"}
                </h3>
                <button onClick={() => !busy && setModal(null)} className="grid size-7 place-items-center rounded-lg text-white/30 transition hover:bg-white/[.05] hover:text-white/70"><X className="size-4" /></button>
              </div>

              {modal === "cancel" ? (
                <div className="mt-3">
                  <p className="text-[10px] leading-5 text-white/32">You're cancelling <span className="text-white/60">{booking.service}</span> at {booking.business} ({when}). Free cancellation up to 24 hours before.</p>
                  <div className="mt-6 flex gap-2">
                    <button onClick={() => setModal(null)} disabled={busy} className="h-11 flex-1 rounded-xl border border-white/[.08] text-[9px] font-semibold text-white/55">Keep booking</button>
                    <button onClick={confirmCancel} disabled={busy} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500/90 text-[9px] font-semibold text-white disabled:opacity-50">
                      {busy ? <Loader2 className="size-3.5 animate-spin" /> : <XCircle className="size-3.5" />} Cancel it
                    </button>
                  </div>
                </div>
              ) : null}

              {modal === "reschedule" ? (
                <div className="mt-4">
                  <p className="text-[9px] font-medium text-white/34">Pick a new day</p>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    {days.map((d) => {
                      const active = d.iso === pickDate;
                      return (
                        <button key={d.iso} onClick={() => setPickDate(d.iso)} className={`grid h-16 w-14 shrink-0 place-items-center rounded-xl border text-center transition ${active ? "border-violet-400/40 bg-violet-400/12" : "border-white/[.07] bg-white/[.02] hover:border-white/[.14]"}`}>
                          <span className={`text-[7px] font-semibold uppercase ${active ? "text-violet-200" : "text-white/30"}`}>{d.day}</span>
                          <span className={`text-[15px] font-semibold ${active ? "text-white/85" : "text-white/50"}`}>{d.date}</span>
                          <span className="text-[6px] text-white/22">{d.month}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-[9px] font-medium text-white/34">Pick a time</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => {
                      const active = t === pickTime;
                      return (
                        <button key={t} onClick={() => setPickTime(t)} className={`h-10 rounded-xl border text-[9px] font-semibold transition ${active ? "border-violet-400/40 bg-violet-400/12 text-violet-100" : "border-white/[.07] bg-white/[.02] text-white/45 hover:text-white/75"}`}>{to12h(t)}</button>
                      );
                    })}
                  </div>
                  <button onClick={confirmReschedule} disabled={busy} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white disabled:opacity-50">
                    {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />} Request this time
                  </button>
                  <p className="mt-2 text-center text-[7px] text-white/20">The business confirms the new time — you'll be notified.</p>
                </div>
              ) : null}

              {modal === "review" ? (
                <div className="mt-4">
                  <p className="text-[9px] text-white/32">How was {booking.service} at {booking.business}?</p>
                  <div className="mt-3 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setRating(n)} className="transition hover:scale-110">
                        <Star className={`size-7 ${n <= rating ? "fill-amber-300 text-amber-300" : "text-white/15"}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    placeholder="Share a little about your experience…"
                    className="mt-4 w-full rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 py-3 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:ring-4 focus:ring-violet-500/10"
                  />
                  <button onClick={submitReview} disabled={busy} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white disabled:opacity-50">
                    {busy ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle2 className="size-3.5" />} Submit review
                  </button>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
