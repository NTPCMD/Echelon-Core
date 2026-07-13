"use client";

import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { BrandLogo } from "./brand-logo";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .42, ease: [.22, 1, .36, 1] }} className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>{eyebrow ? <p className="mb-2 text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/70">{eyebrow}</p> : null}<h1 className="text-[27px] font-semibold tracking-[-.045em] text-white/95 sm:text-[32px]">{title}</h1><p className="mt-2 max-w-2xl text-[13px] leading-5 text-white/35">{description}</p></div>
      {action}
    </motion.div>
  );
}

export function SectionHeading({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return <div className="flex items-start justify-between gap-4"><div><h2 className="text-[13px] font-semibold tracking-[-.01em] text-white/82">{title}</h2>{description ? <p className="mt-1 text-[10px] leading-4 text-white/28">{description}</p> : null}</div>{action ?? null}</div>;
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; action?: React.ReactNode }) {
  return <div className="grid min-h-48 place-items-center rounded-[20px] border border-dashed border-white/[.09] bg-white/[.018] p-8 text-center"><div><span className="mx-auto grid size-10 place-items-center rounded-xl border border-white/[.06] bg-white/[.035] text-white/35"><Icon className="size-4" /></span><h3 className="mt-3 text-sm font-semibold text-white/75">{title}</h3><p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-white/30">{description}</p>{action ? <div className="mt-4">{action}</div> : null}</div></div>;
}

export function PageSkeleton() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><BrandLogo loading compact /><div><Skeleton className="h-7 w-44" /><Skeleton className="mt-2 h-3 w-72 max-w-full" /></div></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32" />)}</div><div className="grid gap-4 xl:grid-cols-3"><Skeleton className="h-96 xl:col-span-2" /><Skeleton className="h-96" /></div></div>;
}

export const stagger = { hidden: {}, show: { transition: { staggerChildren: .06 } } };
export const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: .35 } } };
