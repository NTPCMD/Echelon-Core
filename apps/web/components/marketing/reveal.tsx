"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function GlowOrb({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      animate={{ opacity: [0.18, 0.32, 0.18], scale: [0.96, 1.08, 0.96] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={cn("pointer-events-none absolute rounded-full blur-[100px]", className)}
    />
  );
}
