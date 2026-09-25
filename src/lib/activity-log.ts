import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { logEvent } from "@/lib/logger";

type Actor = { id: string | null; email?: string | null; role?: string | null } | null;

type RequestMeta = {
  ip: string | null;
  userAgent: string | null;
  browser: string | null;
  os: string | null;
  // "mobile" | "tablet" | "desktop" | ... — UAParser leaves device.type
  // undefined for a plain desktop browser, so that case is normalized to
  // "desktop" explicitly rather than left blank.
  deviceType: string | null;
};

// Best-effort request metadata (IP + parsed User-Agent: browser/OS/device).
// Only meaningful inside a request context (Server Action, Route Handler,
// Server Component render); returns nulls anywhere else (e.g. a standalone
// script) instead of throwing.
async function requestMeta(): Promise<RequestMeta> {
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const userAgent = headerList.get("user-agent");

    let browser: string | null = null;
    let os: string | null = null;
    let deviceType: string | null = null;
    if (userAgent) {
      const parsed = new UAParser(userAgent).getResult();
      browser = parsed.browser.name ? `${parsed.browser.name} ${parsed.browser.version ?? ""}`.trim() : null;
      os = parsed.os.name ? `${parsed.os.name} ${parsed.os.version ?? ""}`.trim() : null;
      deviceType = parsed.device.type ?? "desktop";
    }

    return {
      ip: forwardedFor?.split(",")[0]?.trim() ?? headerList.get("x-real-ip") ?? null,
      userAgent,
      browser,
      os,
      deviceType,
    };
  } catch {
    return { ip: null, userAgent: null, browser: null, os: null, deviceType: null };
  }
}

// Central activity-log write point: every user-facing action that changes
// state (or a security-relevant attempt, like a failed login) goes through
// this so `/admin/logs` has one consistent shape to render and filter on —
// `action` + `actorEmail` identify *what happened and who did it* at a
// glance, everything else (ids, before/after values, failure reason) lives
// in `meta`.
export async function logActivity(params: {
  action: string;
  message: string;
  source: string;
  level?: "info" | "warn" | "error";
  actor?: Actor;
  companyId?: string | null;
  entityType?: string;
  entityId?: string | null;
  meta?: Record<string, unknown>;
}) {
  const { ip, userAgent, browser, os, deviceType } = await requestMeta();

  await logEvent({
    level: params.level ?? "info",
    message: params.message,
    source: params.source,
    companyId: params.companyId ?? null,
    meta: {
      action: params.action,
      actorId: params.actor?.id ?? null,
      actorEmail: params.actor?.email ?? null,
      actorRole: params.actor?.role ?? null,
      entityType: params.entityType ?? null,
      entityId: params.entityId ?? null,
      ip,
      userAgent,
      browser,
      os,
      deviceType,
      ...params.meta,
    },
  });
}
