import * as React from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "default" | "sm" | "icon";

const variants: Record<ButtonVariant, string> = {
  default: "border border-violet-400/20 bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] text-white shadow-[0_10px_30px_rgba(108,92,231,.22),inset_0_1px_0_rgba(255,255,255,.22)] hover:-translate-y-px hover:from-[#897afc] hover:to-[#6e5de8] hover:shadow-[0_14px_38px_rgba(108,92,231,.3)]",
  secondary: "border border-white/[.06] bg-white/[.06] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] hover:bg-white/[.09] hover:text-white",
  outline: "border border-white/[.09] bg-white/[.025] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,.025)] hover:border-white/[.16] hover:bg-white/[.06] hover:text-white",
  ghost: "text-white/50 hover:bg-white/[.06] hover:text-white/90",
  destructive: "border border-rose-400/20 bg-rose-500/90 text-white hover:bg-rose-500",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-10 px-4",
  sm: "h-8 rounded-lg px-3 text-xs",
  icon: "size-9 p-0",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0e] disabled:pointer-events-none disabled:opacity-40 active:translate-y-0 active:scale-[.985]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
