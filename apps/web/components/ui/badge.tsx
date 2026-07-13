import * as React from "react";
import { cn } from "../../lib/utils";

const styles = {
  neutral: "border border-white/[.06] bg-white/[.045] text-white/42",
  success: "border border-emerald-400/10 bg-emerald-400/10 text-emerald-300",
  warning: "border border-amber-300/10 bg-amber-300/10 text-amber-200",
  danger: "border border-rose-400/10 bg-rose-400/10 text-rose-300",
  purple: "border border-violet-400/10 bg-violet-400/10 text-violet-300",
};

export function Badge({ className, tone = "neutral", ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof styles }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-semibold", styles[tone], className)} {...props} />;
}
