"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccountStore } from "../../store/account";

/** Header bell with a live unread badge, linking to the notifications center. */
export function NotificationsBell() {
  const notifications = useAccountStore((state) => state.notifications);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const unread = mounted ? notifications.filter((n) => !n.read).length : 0;

  return (
    <Link
      href="/notifications"
      aria-label={unread > 0 ? `Notifications — ${unread} unread` : "Notifications"}
      className="relative grid size-9 place-items-center rounded-xl border border-white/[.065] bg-white/[.025] text-white/50 transition hover:bg-white/[.06] hover:text-white/80"
    >
      <Bell className="size-4" />
      {unread > 0 ? (
        <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-violet-500 px-1 text-[7px] font-semibold text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </Link>
  );
}
