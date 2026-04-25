import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

const tones: Record<BadgeTone, string> = {
  neutral: "border-[var(--line)] bg-[var(--surface-muted)] text-[var(--ink-muted)]",
  success: "border-[#b7d8cf] bg-[#e3f4ee] text-[#0a5f54]",
  warning: "border-[#ead49f] bg-[#fff3d8] text-[var(--warning)]",
  danger: "border-[#efc7c2] bg-[#fde8e6] text-[var(--alert)]"
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-sm border px-2 py-1 text-xs font-semibold", tones[tone], className)}
      {...props}
    />
  );
}
