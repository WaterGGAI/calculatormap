import { adSlots } from "@/lib/data";

type AdSlotProps = {
  slotKey: string;
  className?: string;
};

export function AdSlot({ slotKey, className }: AdSlotProps) {
  const slot = adSlots.find((item) => item.key === slotKey);

  if (!slot || slot.status === "empty") {
    return null;
  }

  return (
    <aside className={className} data-ad-slot={slotKey}>
      <span className="text-xs uppercase text-[var(--ink-muted)]">{slot.name}</span>
    </aside>
  );
}

export function hasActiveAdSlot(slotKey: string) {
  const slot = adSlots.find((item) => item.key === slotKey);
  return Boolean(slot && slot.status !== "empty");
}
