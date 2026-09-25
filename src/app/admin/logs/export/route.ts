import { and, desc, eq, gte, isNull, lt, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { systemLogs } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { resolvePeriodRange, type PeriodKey } from "@/lib/date-range";

const LEVEL_LABELS: Record<string, string> = {
  info: "Bilgi",
  warn: "Uyarı",
  error: "Hata",
};

function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const session = await requireAdminSession();
  const { searchParams } = new URL(request.url);

  const levelFilter = searchParams.get("level") ?? undefined;
  const periodParam = searchParams.get("period") as PeriodKey | null;
  const hasExplicitPeriod = (["today", "week", "month", "last_month", "custom"] as PeriodKey[]).includes(
    periodParam as PeriodKey
  );
  const periodRange = hasExplicitPeriod
    ? resolvePeriodRange(
        periodParam as PeriodKey,
        searchParams.get("start") ?? undefined,
        searchParams.get("end") ?? undefined
      )
    : null;

  const conditions = [or(eq(systemLogs.companyId, session.user.companyId), isNull(systemLogs.companyId))];
  if (levelFilter && ["info", "warn", "error"].includes(levelFilter)) {
    conditions.push(eq(systemLogs.level, levelFilter as "info" | "warn" | "error"));
  }
  if (periodRange) {
    conditions.push(gte(systemLogs.createdAt, periodRange.start));
    conditions.push(lt(systemLogs.createdAt, periodRange.end));
  }

  const rows = await db
    .select()
    .from(systemLogs)
    .where(and(...conditions))
    .orderBy(desc(systemLogs.createdAt));

  const header = ["Seviye", "İşlem", "Mesaj", "Kullanıcı", "IP", "Tarayıcı", "İşletim Sistemi", "Cihaz", "Kaynak", "Tarih"];
  const lines = [header.map(csvCell).join(",")];
  for (const row of rows) {
    const meta = (row.meta ?? {}) as Record<string, unknown>;
    lines.push(
      [
        LEVEL_LABELS[row.level] ?? row.level,
        meta.action ?? "",
        row.message,
        meta.actorEmail ?? "",
        meta.ip ?? "",
        meta.browser ?? "",
        meta.os ?? "",
        meta.deviceType ?? "",
        row.source ?? "",
        new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "medium" }).format(row.createdAt),
      ]
        .map(csvCell)
        .join(",")
    );
  }
  // Excel'in UTF-8'i doğru tanıması için BOM ekleniyor (Türkçe karakterler için gerekli).
  const csv = "﻿" + lines.join("\r\n");

  const rangeLabel = periodRange
    ? periodRange.label
        .normalize("NFKD")
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/[^\d a-zA-Z-]/g, "")
        .trim()
        .replace(/\s+/g, "-") || "aralik"
    : "tum-kayitlar";
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="loglar-${rangeLabel}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
