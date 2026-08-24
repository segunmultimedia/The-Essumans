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
  "border transition-all duration-200 ease-out",
  "cursor-pointer select-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "focus-visible:outline-2 focus-visible:outline-[#B89558] focus-visible:outline-offset-2",
].join(" ");

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#5C202C] text-[#FBF7F1] border-[#5C202C] hover:bg-[#FBF7F1] hover:text-[#5C202C] hover:border-[#5C202C] hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-transparent text-[#1E1E1E] border-[#1E1E1E] hover:bg-[#5C202C] hover:text-[#FBF7F1] hover:border-[#5C202C] hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98]",
  "ghost-light":
    "bg-transparent text-white border-white/60 hover:bg-white hover:text-[#5C202C] hover:border-white hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98]",
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
