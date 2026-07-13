import type { Metadata } from "next";
import { BookingDetail } from "../../../components/consumer/booking-detail";
import { BookingDetailLookup } from "../../../components/consumer/booking-detail-lookup";
import { MarketingShell } from "../../../components/marketing/site-shell";
import { accountBookings, getBooking } from "../../../lib/account";
import { requireConsumerContext } from "../../../lib/auth-context";

export function generateStaticParams() {
  return accountBookings.map((booking) => ({ id: booking.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const booking = getBooking(id);
  return {
    title: booking ? `${booking.service} — ${booking.business} · Echelon` : "Booking — Echelon",
    description: booking ? `Manage your ${booking.service} booking at ${booking.business}.` : "Manage your Echelon booking.",
  };
}

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await requireConsumerContext(`/bookings/${id}`);

  const booking = getBooking(id);

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        {booking ? <BookingDetail booking={booking} /> : <BookingDetailLookup id={id} />}
      </main>
    </MarketingShell>
  );
}
