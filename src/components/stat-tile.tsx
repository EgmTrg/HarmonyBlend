import type { LucideIcon } from "lucide-react";
import { CARD } from "@/lib/ui";

export type StatTileTone = "purple" | "success" | "warning" | "info" | "danger";

const TONE_BG: Record<StatTileTone, string> = {
  purple: "bg-purple-bg",
  success: "bg-success-bg",
  warning: "bg-warning-bg",
  info: "bg-info-bg",
  danger: "bg-danger-bg",
};

const TONE_FG: Record<StatTileTone, string> = {
  purple: "text-purple-fg",
  success: "text-success-fg",
  warning: "text-warning-fg",
  info: "text-info-fg",
  danger: "text-danger-fg",
};

export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone: StatTileTone;
}) {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-400">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${TONE_BG[tone]}`}>
          <Icon className={`h-4 w-4 ${TONE_FG[tone]}`} strokeWidth={2} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
