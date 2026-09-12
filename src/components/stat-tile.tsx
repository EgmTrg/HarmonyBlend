import type { LucideIcon } from "lucide-react";

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
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm shadow-black/[0.03] sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-ink-400 sm:text-sm">{label}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9 ${TONE_BG[tone]}`}
        >
          <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${TONE_FG[tone]}`} strokeWidth={2} />
        </span>
      </div>
      <p className="mt-2 text-lg font-semibold text-ink-900 sm:mt-3 sm:text-2xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
