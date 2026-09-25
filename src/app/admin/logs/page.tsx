import { and, desc, eq, gte, isNull, lt, or } from "drizzle-orm";
import { Download } from "lucide-react";
import { db } from "@/db";
import { systemLogs } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { resolvePeriodRange, type PeriodKey } from "@/lib/date-range";
import { CARD, TABLE_HEAD, BUTTON_PRIMARY } from "@/lib/ui";
import { PeriodFilter } from "@/components/period-filter";
import { LogLevelFilter } from "./log-level-filter";
import { LogRow } from "./log-row";

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; period?: string; start?: string; end?: string }>;
}) {
  const session = await requireAdminSession();
  const {
    level: levelFilter,
    period: periodParam,
    start: startParam,
    end: endParam,
  } = await searchParams;

  const hasExplicitPeriod = (["today", "week", "month", "last_month", "custom"] as PeriodKey[]).includes(
    periodParam as PeriodKey
  );
  const periodRange = hasExplicitPeriod
    ? resolvePeriodRange(periodParam as PeriodKey, startParam, endParam)
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
    .orderBy(desc(systemLogs.createdAt))
    .limit(200);

  const exportParams = new URLSearchParams();
  if (levelFilter) exportParams.set("level", levelFilter);
  if (hasExplicitPeriod) {
    exportParams.set("period", periodParam as PeriodKey);
    if (startParam) exportParams.set("start", startParam);
    if (endParam) exportParams.set("end", endParam);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Sistem Logları</h1>
          <p className="text-sm text-ink-400">
            Kullanıcı işlemleri (giriş, sipariş, kayıt oluşturma/silme vb.) ve yakalanan sunucu hataları
            (ekranda en son 200 kayıt gösterilir; seçili tarih aralığındaki tüm kayıtlar için CSV indirin).
            Detayları görmek için bir satıra tıklayın.
          </p>
        </div>
        <a href={`/admin/logs/export?${exportParams.toString()}`} className={BUTTON_PRIMARY}>
          <Download className="mr-2 h-4 w-4" strokeWidth={2} />
          CSV Olarak İndir
        </a>
      </div>

      <div className={CARD}>
        <div className="flex flex-col gap-4">
          <PeriodFilter
            period={hasExplicitPeriod ? (periodParam as PeriodKey) : ""}
            start={startParam ?? ""}
            end={endParam ?? ""}
          />
          <LogLevelFilter initialLevel={levelFilter ?? ""} />
        </div>
      </div>

      <div className={CARD}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-3 font-medium">Seviye</th>
                <th className="pb-3 font-medium">Mesaj</th>
                <th className="pb-3 font-medium">Kullanıcı</th>
                <th className="pb-3 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <LogRow key={row.id} row={{ ...row, meta: (row.meta ?? {}) as Record<string, unknown> }} />
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-ink-400">
                    Kayıtlı log yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
