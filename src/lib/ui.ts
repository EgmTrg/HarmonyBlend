export const CARD = "rounded-2xl border border-border bg-card p-6 shadow-sm shadow-black/[0.03]";

export const INPUT =
  "rounded-lg border border-border bg-card px-3 py-2 text-sm text-ink-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-100";

export const LABEL = "text-xs font-medium text-ink-400";

export const BUTTON_PRIMARY =
  "inline-flex items-center justify-center rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-700";

export const BUTTON_GHOST_DANGER = "text-xs font-medium text-danger-fg hover:underline";

export const BUTTON_GHOST = "text-xs font-medium text-accent-600 hover:underline";

export const TABLE_HEAD = "border-b border-border text-left text-xs font-medium text-ink-400";

export const TABLE_ROW = "border-b border-border/70 last:border-0";

export type BadgeTone = "success" | "neutral" | "info" | "warning" | "danger";

const BADGE_TONE_CLASSES: Record<BadgeTone, string> = {
  success: "bg-success-bg text-success-fg",
  info: "bg-info-bg text-info-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  neutral: "bg-content text-ink-400",
};

export function badgeClass(tone: BadgeTone) {
  return `rounded-full px-2.5 py-0.5 text-xs font-medium ${BADGE_TONE_CLASSES[tone]}`;
}
