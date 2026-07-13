import { cn } from "../../lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-gradient-to-r from-white/[.035] via-white/[.075] to-white/[.035] bg-[length:200%_100%]", className)} />;
}
