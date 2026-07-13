"use client";
import { cn } from "../../lib/utils";

export function Switch({ checked, onCheckedChange, label }: { checked: boolean; onCheckedChange: (checked: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onCheckedChange(!checked)} className={cn("relative h-6 w-11 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50", checked ? "border-violet-400/30 bg-violet-500 shadow-[0_0_18px_rgba(124,108,248,.25)]" : "border-white/10 bg-white/10")}>
      <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow-md transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}
