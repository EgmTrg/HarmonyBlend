import { and, desc, eq, isNull, or } from "drizzle-orm";
import { db } from "@/db";
import { systemLogs } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { CARD, TABLE_HEAD, TABLE_ROW, badgeClass, type BadgeTone } from "@/lib/ui";
import { LogLevelFilter } from "./log-level-filter";

const LEVEL_LABELS: Record<string, string> = {
  info: "Bilgi",
  warn: "Uyarı",
  error: "Hata",
};

const LEVEL_TONES: Record<string, BadgeTone> = {
  info: "info",
  warn: "warning",
  error: "danger",
};

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const session = await requireAdminSession();
  const { level: levelFilter } = await searchParams;

  const conditions = [or(eq(systemLogs.companyId, session.user.companyId), isNull(systemLogs.companyId))];
  if (levelFilter && ["info", "warn", "error"].includes(levelFilter)) {
    conditions.push(eq(systemLogs.level, levelFilter as "info" | "warn" | "error"));
  }

  const rows = await db
    .select()
    .from(systemLogs)
    .where(and(...conditions))
    .orderBy(desc(systemLogs.createdAt))
    .limit(200);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Sistem Logları</h1>
        <p className="text-sm text-ink-400">
          Uygulama tarafında yakalanan sunucu hataları ve olayları (en son 200 kayıt).
        </p>
      </div>

      <div className={CARD}>
        <LogLevelFilter initialLevel={levelFilter ?? ""} />
      </div>

      <div className={CARD}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-3 font-medium">Seviye</th>
                <th className="pb-3 font-medium">Mesaj</th>
                <th className="pb-3 font-medium">Kaynak</th>
                <th className="pb-3 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={TABLE_ROW}>
                  <td className="py-3">
                    <span className={badgeClass(LEVEL_TONES[row.level] ?? "neutral")}>
                      {LEVEL_LABELS[row.level] ?? row.level}
                    </span>
                  </td>
                  <td className="py-3 text-ink-900">{row.message}</td>
                  <td className="py-3 text-ink-400">{row.source ?? "—"}</td>
                  <td className="py-3 text-ink-400">
                    {new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "medium" }).format(
                      row.createdAt
                    )}
                  </td>
                </tr>
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
