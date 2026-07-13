"use client";

import { ArrowLeft, CalendarX2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBookingsStore } from "../../store/bookings";
import { BookingDetail } from "./booking-detail";

/**
 * Client-side fallback for bookings created through the booking flow (which
 * live in the persisted store, not in the mock seed the server can see).
 */
export function BookingDetailLookup({ id }: { id: string }) {
  const created = useBookingsStore((state) => state.created);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-[1120px]">
        <div className="h-64 animate-pulse rounded-[24px] border border-white/[.06] bg-[#121217]" />
      </div>
    );
  }

  const booking = created.find((item) => item.id === id);
  if (!booking) {
    return (
      <div className="mx-auto grid max-w-[560px] place-items-center py-16 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-white/[.04] text-white/30">
          <CalendarX2 className="size-6" />
        </span>
        <h1 className="mt-5 text-[20px] font-semibold text-white/75">Booking not found.</h1>
        <p className="mt-2 max-w-xs text-[9px] leading-5 text-white/26">
          This booking doesn't exist on this device. It may have been made in another browser, or the link is old.
        </p>
        <Link href="/bookings" className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[9px] font-semibold text-white">
          <ArrowLeft className="size-3.5" /> All bookings
        </Link>
      </div>
    );
  }

  return <BookingDetail booking={booking} />;
}
