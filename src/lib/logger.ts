import { db } from "@/db";
import { systemLogs } from "@/db/schema";

type LogLevel = "info" | "warn" | "error";

export async function logEvent(params: {
  level: LogLevel;
  message: string;
  source?: string;
  companyId?: string | null;
  meta?: Record<string, unknown>;
}) {
  const { level, message, source, companyId, meta } = params;

  const consoleMethod = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  consoleMethod(`[${level}]${source ? ` [${source}]` : ""} ${message}`);

  try {
    await db.insert(systemLogs).values({
      level,
      message,
      source,
      companyId: companyId ?? null,
      meta: meta ?? null,
    });
  } catch (err) {
    // Never let logging itself take down a request.
    console.error("[logger] failed to persist log entry", err);
  }
}
