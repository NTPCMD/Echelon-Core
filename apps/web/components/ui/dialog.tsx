"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4">
          <motion.button
            aria-label="Close dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className={cn(
              "relative z-10 flex max-h-[calc(100vh-32px)] w-full max-w-xl flex-col overflow-hidden rounded-[24px] border border-white/[.09] bg-[#121217] shadow-[0_36px_120px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.04)]",
              className,
            )}
          >
            <header className="flex items-start gap-4 border-b border-white/[.06] px-5 py-4">
              <div className="flex-1">
                <h2
                  id="dialog-title"
                  className="text-base font-semibold tracking-[-.025em] text-white/88"
                >
                  {title}
                </h2>
                {description ? (
                  <p className="mt-1 text-[10px] leading-4 text-white/30">
                    {description}
                  </p>
                ) : null}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-xl text-white/28 transition hover:bg-white/[.055] hover:text-white/70"
              >
                <X className="size-4" />
              </button>
            </header>
            <div className="overflow-y-auto p-5">{children}</div>
            {footer ? (
              <footer className="flex items-center justify-end gap-2 border-t border-white/[.06] bg-black/10 px-5 py-4">
                {footer}
              </footer>
            ) : null}
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
