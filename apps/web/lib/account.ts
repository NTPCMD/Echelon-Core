/**
 * Shared mock data for the signed-in consumer experience (dashboard, bookings,
 * saved). Purely for UI/UX scaffolding — no persistence or AI. Keeping it in
 * one place means the dashboard summary and the /bookings page never drift.
 */

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface AccountBooking {
  id: string;
  business: string;
  slug: string;
  service: string;
  /** Human-friendly date+time, e.g. "Tomorrow · 2:00 PM". */
  when: string;
  /** Compact date chip, e.g. "Tue 14". */
  dateChip: { day: string; date: string };
  duration: string;
  durationMinutes: number;
  /** Local wall-clock start, "YYYY-MM-DDTHH:MM:SS" — used for calendar export. */
  startLocal: string;
  suburb: string;
  address: string;
  price: string;
  /** Human-readable booking reference. */
  reference: string;
  status: BookingStatus;
}

export const accountBookings: AccountBooking[] = [
  {
    id: "bk-1",
    business: "Luma Hair Studio",
    slug: "luma-hair-studio",
    service: "Signature Cut & Finish",
    when: "Tomorrow · 2:00 PM",
    dateChip: { day: "Tue", date: "14" },
    duration: "60 min",
    durationMinutes: 60,
    startLocal: "2026-07-14T14:00:00",
    suburb: "Northbridge",
    address: "Shop 4, 123 William St, Northbridge WA 6003",
    price: "$89",
    reference: "ECH-8F2K9",
    status: "confirmed",
  },
  {
    id: "bk-2",
    business: "Zenith Wellness",
    slug: "zenith-wellness",
    service: "Remedial Massage 60 min",
    when: "Fri 17 Jul · 10:30 AM",
    dateChip: { day: "Fri", date: "17" },
    duration: "60 min",
    durationMinutes: 60,
    startLocal: "2026-07-17T10:30:00",
    suburb: "Subiaco",
    address: "45 Rokeby Rd, Subiaco WA 6008",
    price: "$95",
    reference: "ECH-3QP7M",
    status: "pending",
  },
  {
    id: "bk-3",
    business: "Soleil Beauty Lounge",
    slug: "soleil-beauty-lounge",
    service: "Signature Glow Facial",
    when: "Sat 27 Jun · 11:00 AM",
    dateChip: { day: "Sat", date: "27" },
    duration: "75 min",
    durationMinutes: 75,
    startLocal: "2026-06-27T11:00:00",
    suburb: "Mount Lawley",
    address: "678 Beaufort St, Mount Lawley WA 6050",
    price: "$125",
    reference: "ECH-1XB4T",
    status: "completed",
  },
  {
    id: "bk-4",
    business: "Apex Performance",
    slug: "apex-performance",
    service: "Fitness Assessment",
    when: "Mon 15 Jun · 9:00 AM",
    dateChip: { day: "Mon", date: "15" },
    duration: "45 min",
    durationMinutes: 45,
    startLocal: "2026-06-15T09:00:00",
    suburb: "West Perth",
    address: "12 Kings Park Rd, West Perth WA 6005",
    price: "$50",
    reference: "ECH-9KD2R",
    status: "cancelled",
  },
];

export function getBooking(id: string): AccountBooking | undefined {
  return accountBookings.find((booking) => booking.id === id);
}

export const upcomingBookings = accountBookings.filter(
  (booking) => booking.status === "confirmed" || booking.status === "pending",
);

/** Lightweight rewards state for the dashboard. */
export const rewards = {
  points: 240,
  tier: "Explorer",
  nextTier: "Insider",
  toNextTier: 60,
  tierCeiling: 300,
};

export interface ActivityItem {
  id: string;
  kind: "booking" | "review" | "saved" | "reward";
  title: string;
  detail: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  {
    id: "act-1",
    kind: "booking",
    title: "Booking confirmed",
    detail: "Signature Cut & Finish at Luma Hair Studio",
    time: "2h ago",
  },
  {
    id: "act-2",
    kind: "reward",
    title: "Earned 40 points",
    detail: "For completing your facial at Soleil Beauty Lounge",
    time: "2 weeks ago",
  },
  {
    id: "act-3",
    kind: "review",
    title: "You left a review",
    detail: "5 stars for Soleil Beauty Lounge",
    time: "2 weeks ago",
  },
  {
    id: "act-4",
    kind: "saved",
    title: "Saved a business",
    detail: "Added BassLine Events to your shortlist",
    time: "3 weeks ago",
  },
];

export const accountStats = {
  upcoming: upcomingBookings.length,
  saved: 4,
  rewardPoints: rewards.points,
  reviews: 3,
};
