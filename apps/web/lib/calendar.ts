/**
 * Calendar export helpers — real, working add-to-calendar. Given an event with
 * a local start time and duration, produces Google/Outlook "add event" URLs and
 * a downloadable .ics (Apple Calendar, Outlook desktop, etc.). No dependencies.
 */

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  /** Local wall-clock start, "YYYY-MM-DDTHH:MM:SS" (no timezone). */
  startLocal: string;
  durationMinutes: number;
}

const TIMEZONE = "Australia/Perth";

function parts(local: string) {
  const [datePart = "1970-01-01", timePart = "00:00:00"] = local.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm, ss = 0] = timePart.split(":").map(Number);
  return { y: y ?? 1970, m: m ?? 1, d: d ?? 1, hh: hh ?? 0, mm: mm ?? 0, ss: ss ?? 0 };
}

const pad = (n: number, len = 2) => String(n).padStart(len, "0");

/** Compact calendar stamp, e.g. "20260714T140000" (floating local time). */
function stamp(local: string) {
  const { y, m, d, hh, mm, ss } = parts(local);
  return `${pad(y, 4)}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}${pad(ss)}`;
}

/** Add minutes to a local wall-clock string, returning the same literal format. */
function addMinutes(local: string, minutes: number) {
  const { y, m, d, hh, mm, ss } = parts(local);
  // Use UTC math so wall-clock arithmetic is timezone-agnostic.
  const next = new Date(Date.UTC(y, m - 1, d, hh, mm, ss) + minutes * 60000);
  return `${pad(next.getUTCFullYear(), 4)}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}T${pad(next.getUTCHours())}:${pad(next.getUTCMinutes())}:${pad(next.getUTCSeconds())}`;
}

export function googleCalendarUrl(event: CalendarEvent): string {
  const start = stamp(event.startLocal);
  const end = stamp(addMinutes(event.startLocal, event.durationMinutes));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    ctz: TIMEZONE,
  });
  // Keep the slash between start/end unencoded — Google expects dates=START/END.
  return `https://calendar.google.com/calendar/render?${params.toString()}&dates=${start}/${end}`;
}

export function outlookCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: event.startLocal,
    enddt: addMinutes(event.startLocal, event.durationMinutes),
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function icsContent(event: CalendarEvent): string {
  const start = stamp(event.startLocal);
  const end = stamp(addMinutes(event.startLocal, event.durationMinutes));
  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const uid = `${start}-${Math.random().toString(36).slice(2, 10)}@echelonapp.net`;
  const esc = (value: string) => value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Echelon//Bookings//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${esc(event.title)}`,
    `DESCRIPTION:${esc(event.description)}`,
    `LOCATION:${esc(event.location)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Trigger a client-side download of the .ics file (Apple Calendar et al.). */
export function downloadIcs(event: CalendarEvent, filename = "echelon-booking.ics") {
  const blob = new Blob([icsContent(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Google Maps directions/search link for an address. */
export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
