import type { ReactNode } from "react";

type BadgeTone = "neutral" | "brand" | "success" | "warning" | "info";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "border-line bg-surface/80 text-muted",
  brand: "border-brand-200 bg-brand-50 text-brand-800",
  success: "border-[#d5e4d8] bg-[#f3f8f4] text-[#355845]",
  warning: "border-[#e8dfc8] bg-[#faf6ec] text-[#7a6230]",
  info: "border-brand-100 bg-brand-50/70 text-brand-700",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-medium tracking-[0.04em] uppercase ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
