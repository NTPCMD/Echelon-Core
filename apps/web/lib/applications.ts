/**
 * Mock application tracking for Jobs and Freelancing. When a consumer applies
 * to a role or pitches for a brief, it lands here with a status pipeline.
 * UI/UX scaffolding only.
 */

export type ApplicationStatus = "applied" | "viewed" | "interview" | "offer" | "declined";

export interface Application {
  id: string;
  module: "jobs" | "freelancing";
  listingId: string;
  title: string;
  org: string;
  location: string;
  pay: string;
  appliedOn: string;
  status: ApplicationStatus;
  note?: string;
}

export const applications: Application[] = [
  {
    id: "app-1",
    module: "jobs",
    listingId: "job-growth-lead",
    title: "Growth Marketing Lead",
    org: "Meridian Software",
    location: "Perth CBD",
    pay: "$120k–$140k",
    appliedOn: "Applied 2 days ago",
    status: "viewed",
    note: "Your profile was viewed by the hiring manager.",
  },
  {
    id: "app-2",
    module: "freelancing",
    listingId: "free-brand",
    title: "Brand & Identity project",
    org: "Studio Marlowe",
    location: "Mount Lawley",
    pay: "$1,800 fixed",
    appliedOn: "Pitched 3 days ago",
    status: "interview",
    note: "Intro call booked for Thursday.",
  },
  {
    id: "app-3",
    module: "jobs",
    listingId: "job-rn",
    title: "Registered Nurse — Aged Care",
    org: "Rosewood Care Group",
    location: "Subiaco",
    pay: "$45–$52/hr",
    appliedOn: "Applied 1 week ago",
    status: "applied",
  },
  {
    id: "app-4",
    module: "jobs",
    listingId: "job-barista",
    title: "Weekend Barista",
    org: "Coastline Coffee Co.",
    location: "Fremantle",
    pay: "$32/hr",
    appliedOn: "Applied 2 weeks ago",
    status: "offer",
    note: "Offer received — respond by Friday.",
  },
  {
    id: "app-5",
    module: "freelancing",
    listingId: "free-copy",
    title: "Conversion copywriting brief",
    org: "Priya N.",
    location: "Remote",
    pay: "$85/hr",
    appliedOn: "Pitched 3 weeks ago",
    status: "declined",
    note: "They went with another freelancer this time.",
  },
];

export const applicationStats = {
  active: applications.filter((a) => a.status !== "declined").length,
  total: applications.length,
};
