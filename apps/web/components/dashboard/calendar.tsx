"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  DollarSign,
  Filter,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { consumeDashboardIntent } from "./actions";
import { PageHeader } from "./page";

type CalendarView = "Day" | "Week" | "Month";
type EventStyle = "violet" | "sky" | "amber" | "emerald" | "rose";

interface StudioEvent {
  id: number;
  day: number;
  start: number;
  duration: number;
  title: string;
  service: string;
  lead: string;
  initials: string;
  value: string;
  style: EventStyle;
  status: "Confirmed" | "Tentative";
  location: string;
  notes: string;
}

interface EventDraft {
  title: string;
  service: string;
  lead: string;
  day: string;
  time: string;
  duration: string;
  value: string;
  style: EventStyle;
  status: "Confirmed" | "Tentative";
  location: string;
  notes: string;
}

const team = [
  {
    name: "Rav Singh",
    initials: "RS",
    color: "#9b8cff",
    tone: "violet" as const,
  },
  {
    name: "Maya Chen",
    initials: "MC",
    color: "#67c9f3",
    tone: "blue" as const,
  },
  {
    name: "Sofia Reed",
    initials: "SR",
    color: "#f4c875",
    tone: "amber" as const,
  },
  {
    name: "Daniel Cole",
    initials: "DC",
    color: "#62d3a5",
    tone: "green" as const,
  },
];

const days = [
  { weekday: "Mon", date: 10, label: "10 June" },
  { weekday: "Tue", date: 11, label: "11 June" },
  { weekday: "Wed", date: 12, label: "12 June" },
  { weekday: "Thu", date: 13, label: "13 June" },
  { weekday: "Fri", date: 14, label: "14 June", current: true },
  { weekday: "Sat", date: 15, label: "15 June" },
  { weekday: "Sun", date: 16, label: "16 June" },
];

const hours = [
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
];

const initialEvents: StudioEvent[] = [
  {
    id: 1,
    day: 0,
    start: 60,
    duration: 75,
    title: "Northstar Capital",
    service: "Product strategy sprint",
    lead: "Rav Singh",
    initials: "RS",
    value: "$2,400",
    style: "violet",
    status: "Confirmed",
    location: "WS Labs · Strategy room",
    notes:
      "Align leadership on phase-two priorities and commercial sequencing.",
  },
  {
    id: 2,
    day: 0,
    start: 240,
    duration: 45,
    title: "Aperture Group",
    service: "Technical advisory",
    lead: "Daniel Cole",
    initials: "DC",
    value: "$950",
    style: "emerald",
    status: "Confirmed",
    location: "Google Meet",
    notes: "Architecture review and platform risk assessment.",
  },
  {
    id: 3,
    day: 1,
    start: 120,
    duration: 120,
    title: "Lumen Health",
    service: "Experience workshop",
    lead: "Sofia Reed",
    initials: "SR",
    value: "$4,800",
    style: "amber",
    status: "Confirmed",
    location: "WS Labs · Workshop studio",
    notes: "Map the patient onboarding journey and prioritise service moments.",
  },
  {
    id: 4,
    day: 2,
    start: 30,
    duration: 60,
    title: "Atlas Logistics",
    service: "AI workflow audit",
    lead: "Maya Chen",
    initials: "MC",
    value: "$1,850",
    style: "sky",
    status: "Confirmed",
    location: "Microsoft Teams",
    notes: "Review dispatch workflows and automation opportunity map.",
  },
  {
    id: 5,
    day: 2,
    start: 315,
    duration: 45,
    title: "Solace Ventures",
    service: "Proposal review",
    lead: "Rav Singh",
    initials: "RS",
    value: "$1,200",
    style: "violet",
    status: "Tentative",
    location: "Google Meet",
    notes: "Walk through scope, investment and delivery plan.",
  },
  {
    id: 6,
    day: 3,
    start: 180,
    duration: 75,
    title: "Form House",
    service: "Brand system review",
    lead: "Sofia Reed",
    initials: "SR",
    value: "$1,200",
    style: "amber",
    status: "Confirmed",
    location: "WS Labs · Design room",
    notes: "Review the evolved identity system across product surfaces.",
  },
  {
    id: 7,
    day: 4,
    start: 75,
    duration: 135,
    title: "Meridian Group",
    service: "AI automation sprint",
    lead: "Maya Chen",
    initials: "MC",
    value: "$12,500",
    style: "rose",
    status: "Confirmed",
    location: "WS Labs · Workshop studio",
    notes: "Sprint kickoff, process mapping and success metrics.",
  },
  {
    id: 8,
    day: 4,
    start: 285,
    duration: 60,
    title: "Northstar Capital",
    service: "Leadership playback",
    lead: "Rav Singh",
    initials: "RS",
    value: "$1,600",
    style: "violet",
    status: "Confirmed",
    location: "Northstar HQ",
    notes: "Present validated roadmap and phase-two recommendation.",
  },
  {
    id: 9,
    day: 5,
    start: 135,
    duration: 60,
    title: "Aperture Group",
    service: "Technical advisory",
    lead: "Daniel Cole",
    initials: "DC",
    value: "$950",
    style: "emerald",
    status: "Confirmed",
    location: "Google Meet",
    notes: "Implementation checkpoint and technical decisions.",
  },
];

const eventStyles: Record<EventStyle, string> = {
  violet:
    "border-violet-400/20 bg-gradient-to-br from-violet-400/[.16] to-violet-500/[.055] text-violet-100 shadow-[0_12px_26px_rgba(66,50,150,.13)]",
  sky: "border-sky-400/15 bg-gradient-to-br from-sky-400/[.13] to-sky-500/[.045] text-sky-100 shadow-[0_12px_26px_rgba(22,93,130,.1)]",
  amber:
    "border-amber-300/15 bg-gradient-to-br from-amber-300/[.12] to-amber-500/[.035] text-amber-50 shadow-[0_12px_26px_rgba(120,80,14,.1)]",
  emerald:
    "border-emerald-400/15 bg-gradient-to-br from-emerald-400/[.12] to-emerald-500/[.035] text-emerald-50 shadow-[0_12px_26px_rgba(12,102,70,.1)]",
  rose: "border-rose-400/15 bg-gradient-to-br from-rose-400/[.13] to-rose-500/[.04] text-rose-50 shadow-[0_12px_26px_rgba(120,30,60,.1)]",
};

const dotStyles: Record<EventStyle, string> = {
  violet: "bg-violet-400",
  sky: "bg-sky-400",
  amber: "bg-amber-300",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
};

const miniMonth = [
  26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6,
];

const emptyDraft = (day = 4): EventDraft => ({
  title: "",
  service: "Product strategy session",
  lead: "Rav Singh",
  day: String(day),
  time: "09:00",
  duration: "60",
  value: "",
  style: "violet",
  status: "Confirmed",
  location: "WS Labs · Strategy room",
  notes: "",
});

const inputClass =
  "mt-2 h-10 w-full rounded-xl border border-white/[.075] bg-white/[.035] px-3 text-[11px] text-white/80 outline-none transition focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10";

function minutesToTime(start: number) {
  const total = 8 * 60 + start;
  const hours24 = Math.floor(total / 60);
  const minutes = total % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hour = hours24 % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function draftFromEvent(event: StudioEvent): EventDraft {
  const total = 8 * 60 + event.start;
  return {
    title: event.title,
    service: event.service,
    lead: event.lead,
    day: String(event.day),
    time: `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`,
    duration: String(event.duration),
    value: event.value.replace("$", "").replaceAll(",", ""),
    style: event.style,
    status: event.status,
    location: event.location,
    notes: event.notes,
  };
}

function MiniCalendar({
  selectedDate,
  onSelect,
  monthLabel,
  onPrevious,
  onNext,
}: {
  selectedDate: number;
  onSelect: (date: number) => void;
  monthLabel: string;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold text-white/68">{monthLabel}</p>
        <div className="flex">
          <button
            aria-label="Previous month"
            onClick={onPrevious}
            className="grid size-7 place-items-center rounded-lg text-white/22 hover:bg-white/[.045] hover:text-white/65"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            aria-label="Next month"
            onClick={onNext}
            className="grid size-7 place-items-center rounded-lg text-white/22 hover:bg-white/[.045] hover:text-white/65"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-[8px] font-medium uppercase tracking-wider text-white/16">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-y-1">
        {miniMonth.map((date, index) => {
          const muted = index < 6 || index > 35;
          const active = date === selectedDate && !muted;
          return (
            <button
              key={`${date}-${index}`}
              onClick={() => !muted && onSelect(date)}
              className={cn(
                "relative mx-auto grid size-7 place-items-center rounded-lg text-[9px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/45",
                muted
                  ? "text-white/10"
                  : "text-white/38 hover:bg-white/[.05] hover:text-white/75",
                active &&
                  "bg-violet-500 text-white shadow-[0_0_18px_rgba(124,108,248,.25)] hover:bg-violet-500",
              )}
            >
              {date}
              {date === 14 && !muted ? (
                <span className="absolute bottom-0.5 size-0.5 rounded-full bg-white" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TeamFilters({
  selected,
  onToggle,
  onSelectAll,
}: {
  selected: string[];
  onToggle: (name: string) => void;
  onSelectAll: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between px-2 pb-2">
        <p className="text-[9px] font-semibold uppercase tracking-[.14em] text-white/22">
          Team calendars
        </p>
        <button
          onClick={onSelectAll}
          className="text-[8px] font-medium text-violet-300/70 hover:text-violet-200"
        >
          {selected.length === team.length ? "Clear" : "Select all"}
        </button>
      </div>
      <div className="space-y-1.5">
        {team.map((member) => {
          const active = selected.includes(member.name);
          return (
            <button
              key={member.name}
              onClick={() => onToggle(member.name)}
              className="group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-white/[.03]"
            >
              <span className="relative">
                <Avatar
                  initials={member.initials}
                  tone={member.tone}
                  className="size-7"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border-2 border-[#121217]"
                  style={{ background: member.color }}
                />
              </span>
              <span className="flex-1 text-[9px] font-medium text-white/42 group-hover:text-white/68">
                {member.name}
              </span>
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-md border transition",
                  active
                    ? "border-violet-400/30 bg-violet-500 text-white"
                    : "border-white/[.08] bg-white/[.02] text-transparent",
                )}
              >
                <Check className="size-2.5" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EventForm({
  draft,
  onChange,
}: {
  draft: EventDraft;
  onChange: (draft: EventDraft) => void;
}) {
  const set = <K extends keyof EventDraft>(key: K, value: EventDraft[K]) =>
    onChange({ ...draft, [key]: value });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-[10px] font-medium text-white/42 sm:col-span-2">
        Client or event title
        <Input
          autoFocus
          value={draft.title}
          onChange={(event) => set("title", event.target.value)}
          placeholder="e.g. Northstar Capital"
          className="mt-2"
        />
      </label>
      <label className="text-[10px] font-medium text-white/42 sm:col-span-2">
        Service
        <Input
          value={draft.service}
          onChange={(event) => set("service", event.target.value)}
          className="mt-2"
        />
      </label>
      <label className="text-[10px] font-medium text-white/42">
        Date
        <select
          value={draft.day}
          onChange={(event) => set("day", event.target.value)}
          className={inputClass}
        >
          {days.map((day, index) => (
            <option key={day.date} value={index}>
              {day.weekday}, {day.label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-[10px] font-medium text-white/42">
        Start time
        <Input
          type="time"
          min="08:00"
          max="18:00"
          value={draft.time}
          onChange={(event) => set("time", event.target.value)}
          className="mt-2"
        />
      </label>
      <label className="text-[10px] font-medium text-white/42">
        Duration
        <select
          value={draft.duration}
          onChange={(event) => set("duration", event.target.value)}
          className={inputClass}
        >
          {[30, 45, 60, 75, 90, 120, 180].map((duration) => (
            <option key={duration} value={duration}>
              {duration < 60
                ? `${duration} minutes`
                : `${duration / 60} ${duration === 60 ? "hour" : "hours"}`}
            </option>
          ))}
        </select>
      </label>
      <label className="text-[10px] font-medium text-white/42">
        Team lead
        <select
          value={draft.lead}
          onChange={(event) => set("lead", event.target.value)}
          className={inputClass}
        >
          {team.map((member) => (
            <option key={member.name}>{member.name}</option>
          ))}
        </select>
      </label>
      <label className="text-[10px] font-medium text-white/42">
        Value
        <Input
          value={draft.value}
          onChange={(event) => set("value", event.target.value)}
          placeholder="2400"
          className="mt-2"
        />
      </label>
      <label className="text-[10px] font-medium text-white/42">
        Status
        <select
          value={draft.status}
          onChange={(event) =>
            set("status", event.target.value as EventDraft["status"])
          }
          className={inputClass}
        >
          <option>Confirmed</option>
          <option>Tentative</option>
        </select>
      </label>
      <label className="text-[10px] font-medium text-white/42 sm:col-span-2">
        Location
        <Input
          value={draft.location}
          onChange={(event) => set("location", event.target.value)}
          className="mt-2"
        />
      </label>
      <label className="text-[10px] font-medium text-white/42 sm:col-span-2">
        Notes
        <textarea
          rows={3}
          value={draft.notes}
          onChange={(event) => set("notes", event.target.value)}
          placeholder="Add preparation notes or context…"
          className="mt-2 w-full resize-none rounded-xl border p-3 text-[11px] outline-none"
        />
      </label>
      <fieldset className="sm:col-span-2">
        <legend className="text-[10px] font-medium text-white/42">
          Calendar colour
        </legend>
        <div className="mt-2 flex gap-2">
          {(["violet", "sky", "amber", "emerald", "rose"] as EventStyle[]).map(
            (style) => (
              <button
                type="button"
                key={style}
                onClick={() => set("style", style)}
                aria-label={`Use ${style}`}
                className={cn(
                  "grid size-8 place-items-center rounded-xl border transition",
                  draft.style === style
                    ? "border-white/30 bg-white/[.07]"
                    : "border-white/[.055] bg-white/[.02]",
                )}
              >
                <span className={cn("size-3 rounded-full", dotStyles[style])} />
                {draft.style === style ? (
                  <Check className="absolute size-2 text-white" />
                ) : null}
              </button>
            ),
          )}
        </div>
      </fieldset>
    </div>
  );
}

function MonthView({
  events,
  selectedDate,
  onSelectDate,
  onSelectEvent,
}: {
  events: StudioEvent[];
  selectedDate: number;
  onSelectDate: (date: number) => void;
  onSelectEvent: (event: StudioEvent) => void;
}) {
  const monthCells = Array.from({ length: 35 }, (_, index) => index + 1);
  return (
    <div className="min-w-[760px]">
      <div className="grid grid-cols-7 border-b border-white/[.055] bg-white/[.012]">
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <div
            key={day}
            className="border-l border-white/[.045] px-3 py-3 text-[8px] font-semibold uppercase tracking-[.12em] text-white/18 first:border-l-0"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {monthCells.map((date) => {
          const weekDay = (date + 5) % 7;
          const relevantEvents =
            date >= 10 && date <= 16
              ? events.filter((event) => event.day === date - 10)
              : [];
          return (
            <button
              key={date}
              onClick={() => onSelectDate(date)}
              className={cn(
                "min-h-28 border-b border-l border-white/[.045] p-2 text-left transition first:border-l-0 hover:bg-white/[.02]",
                selectedDate === date && "bg-violet-400/[.025]",
                weekDay > 4 && "bg-black/[.07]",
              )}
            >
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-lg text-[9px] text-white/35",
                  date === 14 && "bg-violet-500 text-white",
                )}
              >
                {date}
              </span>
              <div className="mt-2 space-y-1">
                {relevantEvents.slice(0, 3).map((event) => (
                  <span
                    key={event.id}
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      onSelectEvent(event);
                    }}
                    className={cn(
                      "block truncate rounded-md border px-1.5 py-1 text-[7px]",
                      eventStyles[event.style],
                    )}
                  >
                    {minutesToTime(event.start)} · {event.title}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PremiumCalendarPage() {
  const [view, setView] = useState<CalendarView>("Week");
  const [selectedDate, setSelectedDate] = useState(14);
  const [selectedTeam, setSelectedTeam] = useState(
    team.map((member) => member.name),
  );
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState(initialEvents);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [draft, setDraft] = useState<EventDraft>(() => emptyDraft());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<StudioEvent | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toast, setToast] = useState("");

  const visibleEvents = useMemo(
    () =>
      weekOffset === 0
        ? events.filter(
            (event) =>
              selectedTeam.includes(event.lead) &&
              `${event.title} ${event.service} ${event.lead}`
                .toLowerCase()
                .includes(query.toLowerCase()),
          )
        : [],
    [events, query, selectedTeam, weekOffset],
  );
  const selectedDayIndex = Math.max(0, Math.min(6, selectedDate - 10));
  const displayDays = view === "Day" ? [days[selectedDayIndex]!] : days;

  const toggleTeam = (name: string) =>
    setSelectedTeam((current) =>
      current.includes(name)
        ? current.filter((member) => member !== name)
        : [...current, name],
    );
  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const openCreate = useCallback(
    (day = selectedDayIndex, time = "09:00") => {
      setEditingId(null);
      setDraft({ ...emptyDraft(day), time });
      setFormOpen(true);
    },
    [selectedDayIndex],
  );

  useEffect(() => {
    if (consumeDashboardIntent("event")) openCreate();
  }, [openCreate]);

  const openEdit = (event: StudioEvent) => {
    setSelectedEvent(null);
    setEditingId(event.id);
    setDraft(draftFromEvent(event));
    setFormOpen(true);
  };

  const saveEvent = () => {
    if (!draft.title.trim()) return;
    const member =
      team.find((person) => person.name === draft.lead) ?? team[0]!;
    const [hour = 9, minute = 0] = draft.time.split(":").map(Number);
    const nextEvent: StudioEvent = {
      id: editingId ?? Date.now(),
      day: Number(draft.day),
      start: Math.max(0, (hour - 8) * 60 + minute),
      duration: Number(draft.duration),
      title: draft.title.trim(),
      service: draft.service.trim(),
      lead: draft.lead,
      initials: member.initials,
      value: draft.value
        ? `$${Number(draft.value.replaceAll(",", "")).toLocaleString("en-AU")}`
        : "—",
      style: draft.style,
      status: draft.status,
      location: draft.location.trim(),
      notes: draft.notes.trim(),
    };
    setEvents((current) =>
      editingId
        ? current.map((event) => (event.id === editingId ? nextEvent : event))
        : [...current, nextEvent],
    );
    setFormOpen(false);
    announce(editingId ? "Event updated" : "Event added to calendar");
  };

  const deleteEvent = (id: number) => {
    setEvents((current) => current.filter((event) => event.id !== id));
    setSelectedEvent(null);
    announce("Event removed");
  };

  const handleDrop = (
    day: number,
    clientY: number,
    element: HTMLDivElement,
    eventId: number,
  ) => {
    const rect = element.getBoundingClientRect();
    const raw = Math.max(0, Math.min(600, clientY - rect.top));
    const snapped = Math.round(raw / 15) * 15;
    setEvents((current) =>
      current.map((event) =>
        event.id === eventId ? { ...event, day, start: snapped } : event,
      ),
    );
    announce("Booking rescheduled");
  };

  const weekLabel =
    weekOffset === 0
      ? "10–16 June 2026"
      : weekOffset < 0
        ? "3–9 June 2026"
        : "17–23 June 2026";
  const monthLabel = new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric" }).format(new Date(2026, 5 + monthOffset, 1));

  return (
    <>
      <PageHeader
        eyebrow={`Operations · ${visibleEvents.length} bookings visible`}
        title="Calendar"
        description="Plan client sessions, protect focus time and keep the studio operating at full signal."
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setWeekOffset(0);
                setSelectedDate(14);
              }}
            >
              Today
            </Button>
            <Button onClick={() => openCreate()}>
              <Plus className="size-4" /> New event
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden space-y-4 xl:block">
          <Card>
            <CardContent className="p-4">
              <MiniCalendar
                selectedDate={selectedDate}
                monthLabel={monthLabel}
                onPrevious={() => {
                  setMonthOffset((offset) => Math.max(-1, offset - 1));
                  announce("Previous month loaded");
                }}
                onNext={() => {
                  setMonthOffset((offset) => Math.min(1, offset + 1));
                  announce("Next month loaded");
                }}
                onSelect={(date) => {
                  setSelectedDate(date);
                  if (date >= 10 && date <= 16) setView("Day");
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <TeamFilters
                selected={selectedTeam}
                onToggle={toggleTeam}
                onSelectAll={() =>
                  setSelectedTeam((current) =>
                    current.length === team.length
                      ? []
                      : team.map((member) => member.name),
                  )
                }
              />
            </CardContent>
          </Card>
          <Card className="border-violet-400/10 bg-gradient-to-br from-violet-500/[.07] to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.12em] text-violet-200/60">
                <Sparkles className="size-3.5" /> Capacity signal
              </div>
              <p className="mt-3 text-xl font-semibold tracking-[-.04em] text-white/85">
                78%
              </p>
              <p className="mt-1 text-[9px] leading-4 text-white/26">
                Team utilisation this week. Friday is closest to capacity.
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-white/[.055]">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-violet-600 to-violet-300 shadow-[0_0_14px_rgba(124,108,248,.25)]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[.12em] text-white/22">
                  Tentative
                </p>
                <Badge>
                  {
                    events.filter((event) => event.status === "Tentative")
                      .length
                  }
                </Badge>
              </div>
              <p className="mt-3 text-[9px] leading-4 text-white/26">
                Requests awaiting client confirmation appear here.
              </p>
            </CardContent>
          </Card>
        </aside>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-white/[.055] p-3 sm:flex-row sm:items-center sm:p-4">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous period"
                onClick={() =>
                  setWeekOffset((offset) => Math.max(-1, offset - 1))
                }
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next period"
                onClick={() =>
                  setWeekOffset((offset) => Math.min(1, offset + 1))
                }
              >
                <ChevronRight className="size-4" />
              </Button>
              <button onClick={() => { setWeekOffset(0); setSelectedDate(14); announce("Returned to the current week"); }} aria-label="Return to current week" className="ml-1 flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[11px] font-semibold text-white/72 transition hover:bg-white/[.035]">
                {weekLabel} <ChevronDown className="size-3.5 text-white/22" />
              </button>
            </div>
            <div className="relative min-w-0 flex-1 sm:max-w-[250px]">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find booking…"
                className="h-9 pl-8 text-[10px]"
              />
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <Button
                variant="outline"
                size="icon"
                className="size-9 xl:hidden"
                aria-label="Filter calendars"
                onClick={() => setFiltersOpen(true)}
              >
                <Filter className="size-3.5" />
              </Button>
              <div className="flex rounded-xl border border-white/[.06] bg-white/[.02] p-0.5">
                {(["Day", "Week", "Month"] as CalendarView[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => setView(option)}
                    className={cn(
                      "relative rounded-[9px] px-3 py-1.5 text-[9px] font-semibold transition",
                      view === option
                        ? "text-white/80"
                        : "text-white/22 hover:text-white/50",
                    )}
                  >
                    {view === option ? (
                      <motion.span
                        layoutId="calendar-view"
                        className="absolute inset-0 rounded-[9px] border border-white/[.07] bg-white/[.07] shadow-sm"
                      />
                    ) : null}
                    <span className="relative">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {view === "Month" ? (
              <MonthView
                events={visibleEvents}
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  if (date >= 10 && date <= 16) setView("Day");
                }}
                onSelectEvent={setSelectedEvent}
              />
            ) : (
              <div
                className={cn(
                  view === "Day" ? "min-w-[680px]" : "min-w-[960px]",
                )}
              >
                <div
                  className={cn(
                    "grid border-b border-white/[.055] bg-white/[.012]",
                    view === "Day"
                      ? "grid-cols-[68px_1fr]"
                      : "grid-cols-[68px_repeat(7,1fr)]",
                  )}
                >
                  <div className="flex items-end justify-center pb-3 text-[8px] uppercase tracking-wider text-white/14">
                    GMT+8
                  </div>
                  {displayDays.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setView("Day");
                      }}
                      className={cn(
                        "group border-l border-white/[.045] py-3 text-center transition hover:bg-white/[.02]",
                        selectedDate === day.date && "bg-white/[.018]",
                      )}
                    >
                      <p
                        className={cn(
                          "text-[8px] font-semibold uppercase tracking-[.14em]",
                          day.current ? "text-violet-300/80" : "text-white/22",
                        )}
                      >
                        {day.weekday}
                      </p>
                      <p
                        className={cn(
                          "mx-auto mt-1.5 grid size-8 place-items-center rounded-xl text-[11px] font-semibold transition",
                          day.current
                            ? "bg-violet-500 text-white shadow-[0_0_22px_rgba(124,108,248,.28)]"
                            : "text-white/52 group-hover:bg-white/[.045] group-hover:text-white/80",
                        )}
                      >
                        {day.date}
                      </p>
                      <div className="mt-1.5 flex justify-center gap-1">
                        {visibleEvents
                          .filter((event) => event.day === days.indexOf(day))
                          .slice(0, 3)
                          .map((event) => (
                            <span
                              key={event.id}
                              className={cn(
                                "size-1 rounded-full",
                                dotStyles[event.style],
                              )}
                            />
                          ))}
                      </div>
                    </button>
                  ))}
                </div>
                <div
                  className={cn(
                    "grid h-[650px]",
                    view === "Day"
                      ? "grid-cols-[68px_1fr]"
                      : "grid-cols-[68px_repeat(7,1fr)]",
                  )}
                >
                  <div className="relative bg-black/5">
                    {hours.map((time, index) => (
                      <span
                        key={time}
                        className="absolute right-3 -translate-y-1/2 text-[8px] font-medium text-white/16"
                        style={{ top: index * 60 }}
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                  {displayDays.map((day) => {
                    const dayIndex = days.indexOf(day);
                    return (
                      <div
                        key={day.date}
                        onDoubleClick={(mouseEvent) => {
                          const rect =
                            mouseEvent.currentTarget.getBoundingClientRect();
                          const start =
                            Math.round((mouseEvent.clientY - rect.top) / 15) *
                            15;
                          const total = 8 * 60 + start;
                          openCreate(
                            dayIndex,
                            `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`,
                          );
                        }}
                        onDragOver={(dragEvent) => dragEvent.preventDefault()}
                        onDrop={(dragEvent) => {
                          const id = Number(
                            dragEvent.dataTransfer.getData("text/event-id"),
                          );
                          if (id)
                            handleDrop(
                              dayIndex,
                              dragEvent.clientY,
                              dragEvent.currentTarget,
                              id,
                            );
                        }}
                        className={cn(
                          "relative border-l border-white/[.045]",
                          day.current && "bg-violet-400/[.012]",
                        )}
                      >
                        {hours.map((time, index) => (
                          <div
                            key={time}
                            className="absolute left-0 right-0 border-t border-white/[.04]"
                            style={{ top: index * 60 }}
                          />
                        ))}
                        {day.current && weekOffset === 0 ? (
                          <div
                            className="absolute left-0 right-0 z-20 flex items-center"
                            style={{ top: 226 }}
                          >
                            <span className="-ml-1 size-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,124,255,.9)]" />
                            <span className="h-px flex-1 bg-gradient-to-r from-violet-400/80 to-violet-400/15" />
                            <span className="absolute -left-[52px] -top-2 rounded-md bg-violet-500 px-1.5 py-0.5 text-[7px] font-semibold text-white">
                              11:46
                            </span>
                          </div>
                        ) : null}
                        {visibleEvents
                          .filter((event) => event.day === dayIndex)
                          .map((event, eventIndex) => (
                            <motion.button
                              draggable
                              onDragStartCapture={(dragEvent) =>
                                dragEvent.dataTransfer.setData(
                                  "text/event-id",
                                  String(event.id),
                                )
                              }
                              onClick={() => setSelectedEvent(event)}
                              key={event.id}
                              initial={{ opacity: 0, scale: 0.96, y: 4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.08 + eventIndex * 0.04 }}
                              whileHover={{ y: -2, scale: 1.005 }}
                              whileTap={{ scale: 0.985 }}
                              className={cn(
                                "absolute z-10 overflow-hidden rounded-xl border p-2.5 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-violet-400/45",
                                view === "Day"
                                  ? "left-3 right-3"
                                  : "left-1.5 right-1.5",
                                eventStyles[event.style],
                              )}
                              style={{
                                top: event.start,
                                height: Math.max(45, event.duration),
                              }}
                              aria-label={`${event.title}, ${event.service}, ${event.lead}`}
                            >
                              <div className="flex items-start gap-2">
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <p className="truncate text-[9px] font-semibold">
                                      {event.title}
                                    </p>
                                    {event.status === "Tentative" ? (
                                      <span className="rounded bg-white/10 px-1 py-0.5 text-[6px] uppercase tracking-wider opacity-60">
                                        Tentative
                                      </span>
                                    ) : null}
                                  </div>
                                  <p className="mt-0.5 truncate text-[8px] opacity-55">
                                    {minutesToTime(event.start)} ·{" "}
                                    {event.service}
                                  </p>
                                  {event.duration > 60 || view === "Day" ? (
                                    <div className="mt-2 flex items-center gap-1.5">
                                      <Avatar
                                        initials={event.initials}
                                        className="size-4 text-[6px]"
                                      />
                                      <span className="truncate text-[7px] opacity-45">
                                        {event.lead}
                                      </span>
                                      <span className="ml-auto text-[7px] font-semibold opacity-55">
                                        {event.value}
                                      </span>
                                    </div>
                                  ) : null}
                                </div>
                                <MoreHorizontal className="size-3 shrink-0 opacity-30" />
                              </div>
                            </motion.button>
                          ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/[.055] bg-white/[.012] px-4 py-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-[8px] text-white/22">
              <Clock3 className="size-3.5" /> Double-click a time to add · Drag
              events to reschedule
            </div>
            <div className="flex items-center gap-4 sm:ml-auto">
              <span className="flex items-center gap-1.5 text-[8px] text-white/24">
                <span className="size-1.5 rounded-full bg-emerald-400" />{" "}
                Available
              </span>
              <span className="flex items-center gap-1.5 text-[8px] text-white/24">
                <span className="size-1.5 rounded-full bg-violet-400" />{" "}
                {visibleEvents.length} bookings
              </span>
              <span className="flex items-center gap-1.5 text-[8px] text-white/24">
                <Users className="size-3" /> 78% capacity
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingId ? "Edit event" : "Add event"}
        description="Create a client session, internal block or tentative booking."
        footer={
          <>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEvent} disabled={!draft.title.trim()}>
              {editingId ? "Save changes" : "Add to calendar"}
            </Button>
          </>
        }
      >
        <EventForm draft={draft} onChange={setDraft} />
      </Dialog>

      <Dialog
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title ?? "Event details"}
        {...(selectedEvent
          ? {
              description: `${days[selectedEvent.day]?.weekday}, ${days[selectedEvent.day]?.label} · ${minutesToTime(selectedEvent.start)}`,
            }
          : {})}
        footer={
          selectedEvent ? (
            <>
              <Button
                variant="destructive"
                onClick={() => deleteEvent(selectedEvent.id)}
              >
                <Trash2 className="size-3.5" /> Delete
              </Button>
              <Button onClick={() => openEdit(selectedEvent)}>
                <Pencil className="size-3.5" /> Edit event
              </Button>
            </>
          ) : null
        }
      >
        {selectedEvent ? (
          <div>
            <div className="flex items-start gap-3">
              <Avatar initials={selectedEvent.initials} className="size-11" />
              <div>
                <p className="text-sm font-semibold text-white/78">
                  {selectedEvent.service}
                </p>
                <p className="mt-1 text-[10px] text-white/30">
                  Led by {selectedEvent.lead}
                </p>
              </div>
              <Badge
                tone={
                  selectedEvent.status === "Confirmed" ? "success" : "warning"
                }
                className="ml-auto"
              >
                {selectedEvent.status}
              </Badge>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[.055] bg-white/[.025] p-3">
                <div className="flex items-center gap-2 text-[9px] text-white/25">
                  <Clock3 className="size-3.5" /> Time
                </div>
                <p className="mt-2 text-[11px] font-medium text-white/62">
                  {minutesToTime(selectedEvent.start)} ·{" "}
                  {selectedEvent.duration} min
                </p>
              </div>
              <div className="rounded-xl border border-white/[.055] bg-white/[.025] p-3">
                <div className="flex items-center gap-2 text-[9px] text-white/25">
                  <DollarSign className="size-3.5" /> Value
                </div>
                <p className="mt-2 text-[11px] font-medium text-white/62">
                  {selectedEvent.value}
                </p>
              </div>
              <div className="rounded-xl border border-white/[.055] bg-white/[.025] p-3 sm:col-span-2">
                <div className="flex items-center gap-2 text-[9px] text-white/25">
                  {selectedEvent.location.includes("Meet") ||
                  selectedEvent.location.includes("Teams") ? (
                    <Video className="size-3.5" />
                  ) : (
                    <MapPin className="size-3.5" />
                  )}{" "}
                  Location
                </div>
                <p className="mt-2 text-[11px] font-medium text-white/62">
                  {selectedEvent.location}
                </p>
              </div>
            </div>
            {selectedEvent.notes ? (
              <div className="mt-4 rounded-xl border border-white/[.055] bg-white/[.018] p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[.12em] text-white/20">
                  Preparation notes
                </p>
                <p className="mt-2 text-[11px] leading-5 text-white/38">
                  {selectedEvent.notes}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </Dialog>

      <Dialog
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Calendar filters"
        description="Choose which team calendars are visible."
        footer={
          <Button onClick={() => setFiltersOpen(false)}>Apply filters</Button>
        }
      >
        <TeamFilters
          selected={selectedTeam}
          onToggle={toggleTeam}
          onSelectAll={() =>
            setSelectedTeam((current) =>
              current.length === team.length
                ? []
                : team.map((member) => member.name),
            )
          }
        />
      </Dialog>

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[10px] font-medium text-emerald-200 shadow-2xl"
        >
          <Check className="size-3.5" /> {toast}
        </motion.div>
      ) : null}
    </>
  );
}
