/**
 * The Requests hub — everything a consumer asks Echelon to do across modules
 * that isn't a straight booking or job application: one-off tasks, stay
 * enquiries, event RSVPs, networking connects, and multi-part Concierge asks.
 * The Concierge is the front door that dispatches these to the right module.
 * Mock/UI only.
 */

export type RequestStatus = "sent" | "matched" | "in_progress" | "completed" | "closed";

export interface EchelonRequest {
  id: string;
  /** Module slug the request was routed to. "concierge" = multi-part. */
  module: string;
  title: string;
  summary: string;
  createdOn: string;
  status: RequestStatus;
  /** Who's fulfilling it, once matched. */
  provider?: string;
  /** For Concierge asks: the modules it fanned out to. */
  routedTo?: string[];
}

export const requests: EchelonRequest[] = [
  {
    id: "req-1",
    module: "concierge",
    title: "Plan my sister's hens weekend",
    summary: "Accommodation for 8, a private dinner and a fun activity — first weekend of August.",
    createdOn: "Today",
    status: "in_progress",
    routedTo: ["stays", "events", "services"],
  },
  {
    id: "req-2",
    module: "tasks",
    title: "End-of-lease clean",
    summary: "2-bed apartment in Victoria Park, need bond-back guarantee before the 25th.",
    createdOn: "Yesterday",
    status: "matched",
    provider: "SparkleWorks",
  },
  {
    id: "req-3",
    module: "networking",
    title: "Intro to a startup mentor",
    summary: "Looking for a product mentor who's scaled a local SaaS.",
    createdOn: "3 days ago",
    status: "matched",
    provider: "David Okoro",
  },
  {
    id: "req-4",
    module: "stays",
    title: "Quiet cabin for a writing weekend",
    summary: "Off-grid, 2 nights, within 2 hours of Perth.",
    createdOn: "1 week ago",
    status: "completed",
    provider: "Karri Retreats",
  },
  {
    id: "req-5",
    module: "events",
    title: "RSVP — Perth Founders Breakfast",
    summary: "Reserved a spot for this Saturday.",
    createdOn: "1 week ago",
    status: "completed",
    provider: "Startup West",
  },
  {
    id: "req-6",
    module: "tasks",
    title: "Flat-pack assembly",
    summary: "Wardrobe + desk, Joondalup.",
    createdOn: "2 weeks ago",
    status: "closed",
    provider: "Riley T.",
  },
];

export const requestStats = {
  open: requests.filter((r) => r.status === "sent" || r.status === "matched" || r.status === "in_progress").length,
  total: requests.length,
};
