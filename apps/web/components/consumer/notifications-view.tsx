"use client";

import {
  BellOff,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCheck,
  ClipboardList,
  MessageSquareText,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type AccountNotification, type NotificationKind, timeAgo, useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

const kindIcon: Record<NotificationKind, typeof CalendarCheck> = {
  booking: CalendarCheck,
  application: BriefcaseBusiness,
  request: ClipboardList,
  reward: Trophy,
  message: MessageSquareText,
  system: Sparkles,
};

const kindTone: Record<NotificationKind, string> = {
  booking: "bg-emerald-400/10 text-emerald-300",
  application: "bg-sky-400/10 text-sky-200",
  request: "bg-fuchsia-400/10 text-fuchsia-200",
  reward: "bg-amber-300/10 text-amber-100",
  message: "bg-violet-400/10 text-violet-200",
  system: "bg-white/[.05] text-white/45",
};

/** Static, always-read seed so the center never looks dead on first visit. */
const seedNotifications: Array<Omit<AccountNotification, "at"> & { time: string }> = [
  {
    id: "seed-1",
    kind: "message",
    title: "Luma Hair Studio replied",
    body: "“If you have a reference photo, feel free to send it through beforehand.”",
    time: "Today",
    read: true,
    href: "/messages",
  },
  {
    id: "seed-2",
    kind: "system",
    title: "Welcome to Echelon",
    body: "One search bar for every local need. Services is live — the other modules are in preview.",
    time: "2 weeks ago",
    read: true,
    href: "/explore",
  },
];

export function NotificationsView() {
  const notifications = useAccountStore((state) => state.notifications);
  const markRead = useAccountStore((state) => state.markRead);
  const markAllRead = useAccountStore((state) => state.markAllRead);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const live = mounted ? notifications : [];
  const unread = live.filter((n) => !n.read).length;
  const isEmpty = live.length === 0 && seedNotifications.length === 0;

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Notifications</p>
          <h1 className="mt-3 text-[30px] font-semibold tracking-[-.05em] text-white/90 sm:text-[40px]">
            What's happening.
          </h1>
          <p className="mt-3 text-[11px] text-white/26">
            {unread > 0 ? `${unread} unread` : "You're all caught up."}
          </p>
        </div>
        {unread > 0 ? (
          <button
            onClick={markAllRead}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/55 transition hover:text-white/85"
          >
            <CheckCheck className="size-3.5" /> Mark all read
          </button>
        ) : null}
      </div>

      {isEmpty ? (
        <div className="mt-8 grid min-h-60 place-items-center rounded-[24px] border border-dashed border-white/[.075] bg-white/[.012] text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-white/[.04] text-white/30">
              <BellOff className="size-5" />
            </span>
            <p className="mt-4 text-[12px] font-semibold text-white/42">Nothing yet.</p>
            <p className="mx-auto mt-2 max-w-xs text-[9px] leading-4 text-white/18">
              Bookings, applications and requests will show up here as they happen.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-2.5">
          {live.map((notification, index) => {
            const Icon = kindIcon[notification.kind];
            const inner = (
              <div
                className={`flex items-start gap-4 rounded-[20px] border p-4 transition ${
                  notification.read
                    ? "border-white/[.05] bg-[#121217]"
                    : "border-violet-400/15 bg-gradient-to-br from-violet-500/[.06] to-[#121217] hover:border-violet-400/25"
                }`}
              >
                <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${kindTone[notification.kind]}`}>
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-[11px] font-semibold ${notification.read ? "text-white/50" : "text-white/75"}`}>
                      {notification.title}
                    </p>
                    {!notification.read ? <span className="size-1.5 shrink-0 rounded-full bg-violet-400" /> : null}
                  </div>
                  <p className="mt-1 text-[9px] leading-5 text-white/28">{notification.body}</p>
                  <p className="mt-1.5 text-[7px] text-white/18">{timeAgo(notification.at)}</p>
                </div>
              </div>
            );
            return (
              <Reveal key={notification.id} delay={Math.min(index, 6) * 0.03}>
                {notification.href ? (
                  <Link href={notification.href} onClick={() => markRead(notification.id)} className="block">
                    {inner}
                  </Link>
                ) : (
                  <button onClick={() => markRead(notification.id)} className="block w-full text-left">
                    {inner}
                  </button>
                )}
              </Reveal>
            );
          })}

          {seedNotifications.map((notification, index) => {
            const Icon = kindIcon[notification.kind];
            return (
              <Reveal key={notification.id} delay={Math.min(live.length + index, 8) * 0.03}>
                <Link href={notification.href ?? "/dashboard"} className="block">
                  <div className="flex items-start gap-4 rounded-[20px] border border-white/[.05] bg-[#121217] p-4">
                    <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${kindTone[notification.kind]}`}>
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-white/50">{notification.title}</p>
                      <p className="mt-1 text-[9px] leading-5 text-white/28">{notification.body}</p>
                      <p className="mt-1.5 text-[7px] text-white/18">{notification.time}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
