import type { ReactNode } from "react";

type BadgeTone = "neutral" | "brand" | "success" | "warning" | "info";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-[#edf2f3] text-[#506a74]",
  brand: "bg-brand-100 text-brand-800",
  success: "bg-[#e5f5ed] text-[#287357]",
  warning: "bg-[#fff4dc] text-[#8a681d]",
  info: "bg-[#e5f3f6] text-[#276b7e]",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ children, tone = "neutral", icon, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium ${TONE_CLASSES[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
