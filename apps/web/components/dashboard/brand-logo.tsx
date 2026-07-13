"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function BrandLogo({ compact = false, loading = false, className }: { compact?: boolean; loading?: boolean; className?: string }) {
  return (
    <motion.div
      aria-label="Echelon"
      initial={false}
      animate={{ scale: compact ? 0.86 : 1, rotate: compact ? -1 : 0 }}
      whileHover={{ rotate: 1.5, scale: compact ? 0.9 : 1.025 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={cn("group relative isolate overflow-hidden rounded-[14px] bg-[#0b0b0e] ring-1 ring-white/[.08]", compact ? "size-9" : "size-11", className)}
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [.18, .34, .18], scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-1 rounded-full bg-violet-500/30 blur-xl"
      />
      <Image src="/logo.png" alt="Echelon" fill sizes={compact ? "36px" : "44px"} className="relative z-10 object-cover" priority />
      {[0, 1, 2].map((bar) => (
        <motion.span
          key={bar}
          aria-hidden
          animate={loading ? { opacity: [.35, 1, .35], y: [0, -1.5, 0] } : { opacity: 0 }}
          whileHover={{ y: -(bar + 1) * .65 }}
          transition={loading ? { duration: 1.6, delay: bar * .18, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 260, damping: 22 }}
          className="absolute inset-0 z-20 bg-[url('/logo.png')] bg-cover"
          style={{ clipPath: `inset(${[28, 44, 59][bar]}% 23% ${[57, 40, 24][bar]}% 22%)` }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] bg-gradient-to-br from-white/[.05] to-transparent" />
    </motion.div>
  );
}
