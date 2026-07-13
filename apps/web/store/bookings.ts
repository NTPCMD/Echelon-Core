"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AccountBooking, BookingStatus } from "../lib/account";

/**
 * Client-side booking state. Cancellations and reschedules are stored as
 * per-booking overrides in localStorage so they persist across navigation and
 * reloads (no backend yet). Merged onto the mock `accountBookings` at render.
 */

export interface BookingOverride {
  status?: BookingStatus;
  when?: string;
  startLocal?: string;
  dateChip?: { day: string; date: string };
  /** True once a reschedule has been requested from the business. */
  rescheduleRequested?: boolean;
}

interface ReschedulePatch {
  when: string;
  startLocal: string;
  dateChip: { day: string; date: string };
}

interface BookingsState {
  overrides: Record<string, BookingOverride>;
  /** Bookings created by the user through the booking flow (newest first). */
  created: AccountBooking[];
  cancel: (id: string) => void;
  reschedule: (id: string, patch: ReschedulePatch) => void;
  addBooking: (booking: AccountBooking) => void;
  reset: (id: string) => void;
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set) => ({
      overrides: {},
      created: [],
      addBooking: (booking) => set((state) => ({ created: [booking, ...state.created] })),
      cancel: (id) =>
        set((state) => ({
          overrides: { ...state.overrides, [id]: { ...state.overrides[id], status: "cancelled" } },
        })),
      reschedule: (id, patch) =>
        set((state) => ({
          overrides: {
            ...state.overrides,
            [id]: { ...state.overrides[id], ...patch, status: "confirmed", rescheduleRequested: true },
          },
        })),
      reset: (id) =>
        set((state) => {
          const overrides = { ...state.overrides };
          delete overrides[id];
          return { overrides };
        }),
    }),
    { name: "echelon-bookings" },
  ),
);

/** Full booking list: user-created bookings first, then seed data, all with overrides applied. */
export function withCreated(
  seed: AccountBooking[],
  created: AccountBooking[],
  overrides: Record<string, BookingOverride>,
): Array<AccountBooking & { rescheduleRequested?: boolean }> {
  const seedIds = new Set(seed.map((b) => b.id));
  return [...created.filter((b) => !seedIds.has(b.id)), ...seed].map((b) => mergeBooking(b, overrides));
}

/** Merge any stored override onto a base booking. */
export function mergeBooking<
  T extends {
    id: string;
    status: BookingStatus;
    when: string;
    startLocal: string;
    dateChip: { day: string; date: string };
  },
>(booking: T, overrides: Record<string, BookingOverride>): T & { rescheduleRequested?: boolean } {
  const override = overrides[booking.id];
  if (!override) return booking;
  return { ...booking, ...override };
}
