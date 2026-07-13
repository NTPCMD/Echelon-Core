import * as React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("h-10 w-full rounded-xl border border-white/[.075] bg-white/[.035] px-3.5 text-sm text-white/85 outline-none transition placeholder:text-white/25 focus:border-violet-400/45 focus:bg-white/[.055] focus:ring-4 focus:ring-violet-500/10", className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";
