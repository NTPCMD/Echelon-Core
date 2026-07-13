"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Application } from "../lib/applications";
import type { ConsumerProfile, FreelancerProfile, JobSeekerProfile } from "../lib/profile";
import type { EchelonRequest } from "../lib/requests";

/**
 * Unified client-side account state (localStorage, no backend yet). Everything
 * a consumer does — applying, requesting, saving, reviewing, editing their
 * profile, earning points — lands here so it persists across navigation and
 * reloads, and every surface reads the same source of truth.
 *
 * Components consuming this store must use a `mounted` guard (render seed data
 * on first paint, apply store state after mount) to avoid hydration mismatch.
 */

export type NotificationKind = "booking" | "application" | "request" | "reward" | "message" | "system";

export interface AccountNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  /** epoch ms */
  at: number;
  read: boolean;
  href?: string;
}

export interface RewardEntry {
  id: string;
  points: number;
  reason: string;
  /** epoch ms */
  at: number;
}

export interface SubmittedReview {
  id: string;
  slug: string;
  business: string;
  rating: number;
  text: string;
  /** epoch ms */
  at: number;
}

export interface ProfileOverrides {
  jobSeeker?: Partial<JobSeekerProfile>;
  freelancer?: Partial<FreelancerProfile>;
}

/** Businesses saved by default so the demo starts populated. */
export const defaultSavedSlugs = ["luma-hair-studio", "north-star-weddings", "zenith-wellness", "bassline-events"];

interface AccountState {
  applications: Application[];
  requests: EchelonRequest[];
  savedSlugs: string[];
  reviews: SubmittedReview[];
  notifications: AccountNotification[];
  profile: ProfileOverrides;
  ledger: RewardEntry[];

  submitApplication: (app: Omit<Application, "id" | "appliedOn" | "status">) => void;
  submitRequest: (req: Omit<EchelonRequest, "id" | "createdOn" | "status">) => void;
  toggleSaved: (slug: string) => void;
  addReview: (review: Omit<SubmittedReview, "id" | "at">) => void;
  notify: (n: Omit<AccountNotification, "id" | "at" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  updateJobSeeker: (patch: Partial<JobSeekerProfile>) => void;
  updateFreelancer: (patch: Partial<FreelancerProfile>) => void;
  earnPoints: (points: number, reason: string) => void;
}

const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function makeNotification(n: Omit<AccountNotification, "id" | "at" | "read">): AccountNotification {
  return { ...n, id: uid("ntf"), at: Date.now(), read: false };
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      applications: [],
      requests: [],
      savedSlugs: defaultSavedSlugs,
      reviews: [],
      notifications: [],
      profile: {},
      ledger: [],

      submitApplication: (app) =>
        set((state) => ({
          applications: [
            { ...app, id: uid("app"), appliedOn: "Just now", status: "applied" as const },
            ...state.applications,
          ],
          notifications: [
            makeNotification({
              kind: "application",
              title: app.module === "jobs" ? "Application sent" : "Pitch sent",
              body: `${app.title} — ${app.org}. We'll let you know when they respond.`,
              href: "/applications",
            }),
            ...state.notifications,
          ],
          ledger: [{ id: uid("rwd"), points: 10, reason: `Applied: ${app.title}`, at: Date.now() }, ...state.ledger],
        })),

      submitRequest: (req) =>
        set((state) => ({
          requests: [{ ...req, id: uid("req"), createdOn: "Just now", status: "sent" as const }, ...state.requests],
          notifications: [
            makeNotification({
              kind: "request",
              title: "Request sent",
              body: `${req.title} — the Concierge is finding your match.`,
              href: "/requests",
            }),
            ...state.notifications,
          ],
          ledger: [{ id: uid("rwd"), points: 5, reason: `Request: ${req.title}`, at: Date.now() }, ...state.ledger],
        })),

      toggleSaved: (slug) =>
        set((state) => ({
          savedSlugs: state.savedSlugs.includes(slug)
            ? state.savedSlugs.filter((item) => item !== slug)
            : [slug, ...state.savedSlugs],
        })),

      addReview: (review) =>
        set((state) => ({
          reviews: [{ ...review, id: uid("rev"), at: Date.now() }, ...state.reviews],
          notifications: [
            makeNotification({
              kind: "reward",
              title: "Review published — +20 pts",
              body: `Thanks for reviewing ${review.business}. Local businesses grow on your feedback.`,
              href: `/businesses/${review.slug}`,
            }),
            ...state.notifications,
          ],
          ledger: [{ id: uid("rwd"), points: 20, reason: `Review: ${review.business}`, at: Date.now() }, ...state.ledger],
        })),

      notify: (n) => set((state) => ({ notifications: [makeNotification(n), ...state.notifications] })),

      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),

      markAllRead: () =>
        set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, read: true })) })),

      updateJobSeeker: (patch) =>
        set((state) => ({ profile: { ...state.profile, jobSeeker: { ...state.profile.jobSeeker, ...patch } } })),

      updateFreelancer: (patch) =>
        set((state) => ({ profile: { ...state.profile, freelancer: { ...state.profile.freelancer, ...patch } } })),

      earnPoints: (points, reason) =>
        set((state) => ({ ledger: [{ id: uid("rwd"), points, reason, at: Date.now() }, ...state.ledger] })),
    }),
    { name: "echelon-account" },
  ),
);

/** Apply stored profile edits onto the base mock profile. */
export function mergeProfile(base: ConsumerProfile, overrides: ProfileOverrides): ConsumerProfile {
  return {
    ...base,
    jobSeeker: { ...base.jobSeeker, ...overrides.jobSeeker },
    freelancer: { ...base.freelancer, ...overrides.freelancer },
  };
}

/** Relative time for store timestamps ("Just now", "5m ago", "2h ago", "3d ago"). */
export function timeAgo(at: number): string {
  const s = Math.max(0, Math.floor((Date.now() - at) / 1000));
  if (s < 60) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Yesterday" : `${d}d ago`;
}
