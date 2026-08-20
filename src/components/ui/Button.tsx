"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost-light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  fullWidth?: boolean;
}

const base = [
  "inline-flex items-center justify-center gap-2",
  "min-h-[48px] px-8",
  "font-sans font-medium text-sm tracking-[0.12em] uppercase",
  "border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
  "cursor-pointer select-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "focus-visible:outline-2 focus-visible:outline-[#C9A96E] focus-visible:outline-offset-2",
].join(" ");

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#C9A96E] text-[#1E1E1E] border-[#C9A96E] hover:bg-[#1E1E1E] hover:text-[#C9A96E] hover:border-[#1E1E1E] hover:-translate-y-[2px] hover:shadow-lg active:scale-[0.98]",
  secondary:
    "bg-transparent text-[#1E1E1E] border-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-[#FAF8F5] hover:-translate-y-[2px] hover:shadow-lg active:scale-[0.98]",
  "ghost-light":
    "bg-transparent text-white border-white/60 hover:bg-white hover:text-[#1E1E1E] hover:border-white hover:-translate-y-[2px] hover:shadow-lg active:scale-[0.98]",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        base,
        variants[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
