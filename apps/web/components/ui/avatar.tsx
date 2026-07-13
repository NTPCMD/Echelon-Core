import { cn } from "../../lib/utils";

export function Avatar({ initials, className, tone = "violet" }: { initials: string; className?: string; tone?: "violet" | "blue" | "green" | "amber" | "rose" }) {
  const tones = {
    violet: "border border-violet-300/10 bg-violet-400/12 text-violet-200",
    blue: "border border-sky-300/10 bg-sky-400/12 text-sky-200",
    green: "border border-emerald-300/10 bg-emerald-400/12 text-emerald-200",
    amber: "border border-amber-200/10 bg-amber-300/12 text-amber-100",
    rose: "border border-rose-300/10 bg-rose-400/12 text-rose-200",
  };
  return <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold", tones[tone], className)}>{initials}</span>;
}
