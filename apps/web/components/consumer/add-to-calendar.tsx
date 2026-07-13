"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type CalendarEvent, downloadIcs, googleCalendarUrl, outlookCalendarUrl } from "../../lib/calendar";

/**
 * Add-to-calendar control. Google/Outlook open a prefilled "new event" page;
 * Apple downloads a .ics the OS opens in Calendar. Fully working, no backend.
 */
export function AddToCalendar({ event, filename }: { event: CalendarEvent; filename?: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function flash() {
    setDone(true);
    setOpen(false);
    setTimeout(() => setDone(false), 2200);
  }

  const options: Array<{ label: string; onClick: () => void }> = [
    {
      label: "Google Calendar",
      onClick: () => {
        window.open(googleCalendarUrl(event), "_blank", "noopener,noreferrer");
        flash();
      },
    },
    {
      label: "Apple Calendar (.ics)",
      onClick: () => {
        downloadIcs(event, filename);
        flash();
      },
    },
    {
      label: "Outlook",
      onClick: () => {
        window.open(outlookCalendarUrl(event), "_blank", "noopener,noreferrer");
        flash();
      },
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 text-[9px] font-semibold text-violet-200 transition hover:bg-violet-400/15"
      >
        {done ? <Check className="size-3.5" /> : <CalendarPlus className="size-3.5" />}
        {done ? "Added to calendar" : "Add to calendar"}
        {!done ? <ChevronDown className={`size-3 transition ${open ? "rotate-180" : ""}`} /> : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/[.08] bg-[#16161c] p-1 shadow-[0_24px_70px_rgba(0,0,0,.5)]"
          >
            {options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={option.onClick}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-[9px] font-medium text-white/55 transition hover:bg-white/[.05] hover:text-white/85"
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
