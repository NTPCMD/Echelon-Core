/**
 * Mock conversation threads between a consumer and local businesses. UI/UX
 * scaffolding only — no realtime, no persistence.
 */

export interface ChatMessage {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Thread {
  id: string;
  business: string;
  slug: string;
  /** What the conversation is about, shown under the business name. */
  context: string;
  unread: number;
  lastTime: string;
  messages: ChatMessage[];
}

export const threads: Thread[] = [
  {
    id: "th-luma",
    business: "Luma Hair Studio",
    slug: "luma-hair-studio",
    context: "Signature Cut & Finish · Tomorrow 2:00 PM",
    unread: 1,
    lastTime: "10:24 AM",
    messages: [
      { id: "m1", from: "me", text: "Hi! Looking forward to tomorrow. Could I get a wash included?", time: "9:58 AM" },
      { id: "m2", from: "them", text: "Absolutely — a wash is part of the Signature service. See you at 2! 💇", time: "10:12 AM" },
      { id: "m3", from: "them", text: "If you have a reference photo, feel free to send it through beforehand.", time: "10:24 AM" },
    ],
  },
  {
    id: "th-zenith",
    business: "Zenith Wellness",
    slug: "zenith-wellness",
    context: "Remedial Massage · Fri 17 Jul",
    unread: 0,
    lastTime: "Yesterday",
    messages: [
      { id: "m1", from: "me", text: "Do you do deep tissue for lower back?", time: "Yesterday" },
      { id: "m2", from: "them", text: "Yes, that's our specialty. I'll focus on the lumbar area for your session.", time: "Yesterday" },
    ],
  },
  {
    id: "th-bassline",
    business: "BassLine Events",
    slug: "bassline-events",
    context: "DJ enquiry · Wedding in October",
    unread: 2,
    lastTime: "Mon",
    messages: [
      { id: "m1", from: "me", text: "Hi, are you available for a wedding on 17 October?", time: "Mon 9:00 AM" },
      { id: "m2", from: "them", text: "We are! 8-hour package includes MC and lighting. Want me to send details?", time: "Mon 11:30 AM" },
      { id: "m3", from: "them", text: "Also — do you have a rough guest count and venue yet?", time: "Mon 11:31 AM" },
    ],
  },
];

export function getThread(id: string): Thread | undefined {
  return threads.find((thread) => thread.id === id);
}

export const totalUnread = threads.reduce((sum, thread) => sum + thread.unread, 0);
