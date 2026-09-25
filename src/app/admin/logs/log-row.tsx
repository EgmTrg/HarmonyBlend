"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Monitor, Smartphone, Tablet, X } from "lucide-react";
import { TABLE_ROW, badgeClass, type BadgeTone } from "@/lib/ui";

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
};

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

// Bilinen meta alanları için Türkçe etiketler — tanımsız anahtarlar
// camelCase'den okunabilir bir başlığa çevrilerek gösterilir, böylece
// logActivity çağrılarına yeni bir meta alanı eklendiğinde detay
// penceresinde otomatik görünür, kod değişikliği gerekmez.
const META_LABELS: Record<string, string> = {
  actorId: "Kullanıcı ID",
  actorEmail: "Kullanıcı",
  actorRole: "Rol",
  entityType: "Varlık Türü",
  entityId: "Varlık ID",
  ip: "IP",
  userAgent: "Tarayıcı Bilgisi (User-Agent)",
  browser: "Tarayıcı",
  os: "İşletim Sistemi",
  deviceType: "Cihaz",
  reason: "Sebep",
  emailAttempted: "Denenen E-posta",
  companyCodeAttempted: "Denenen Firma Kodu",
  companyId: "Firma ID",
};

function formatMetaKey(key: string): string {
  if (META_LABELS[key]) return META_LABELS[key];
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function formatMetaValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Evet" : "Hayır";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export interface LogRowData {
  id: string;
  level: string;
  message: string;
  source: string | null;
  createdAt: Date;
  meta: Record<string, unknown>;
}

export function LogRow({ row }: { row: LogRowData }) {
  const [open, setOpen] = useState(false);
  const meta = row.meta ?? {};

  const action = typeof meta.action === "string" ? meta.action : null;
  const actorEmail = typeof meta.actorEmail === "string" ? meta.actorEmail : null;
  const deviceType = typeof meta.deviceType === "string" ? meta.deviceType : null;
  const DeviceIcon = (deviceType && DEVICE_ICONS[deviceType]) || null;
  const formattedDate = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "medium" }).format(
    row.createdAt
  );
  const detailEntries = Object.entries(meta).filter(([key, value]) => key !== "action" && value !== null);

  return (
    <>
      <tr className={`${TABLE_ROW} cursor-pointer`} onClick={() => setOpen(true)}>
        <td className="py-3">
          <span className={badgeClass(LEVEL_TONES[row.level] ?? "neutral")}>
            {LEVEL_LABELS[row.level] ?? row.level}
          </span>
        </td>
        <td className="py-3 text-ink-900">
          <div className="line-clamp-1">{row.message}</div>
          {action && <code className="text-[10px] text-ink-400/70">{action}</code>}
        </td>
        <td className="py-3 text-ink-400">
          <div className="flex items-center gap-1.5">
            {DeviceIcon && <DeviceIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />}
            {actorEmail ?? "—"}
          </div>
        </td>
        <td className="whitespace-nowrap py-3 text-ink-400">{formattedDate}</td>
      </tr>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={badgeClass(LEVEL_TONES[row.level] ?? "neutral")}>
                    {LEVEL_LABELS[row.level] ?? row.level}
                  </span>
                  <h2 className="text-lg font-semibold text-ink-900">Log Detayı</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Kapat"
                  className="text-ink-400 hover:text-ink-900"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
                <div>
                  <div className="text-xs font-medium text-ink-400">Mesaj</div>
                  <div className="text-sm text-ink-900">{row.message}</div>
                </div>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium text-ink-400">Tarih</dt>
                    <dd className="text-sm text-ink-900">{formattedDate}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-ink-400">Kaynak</dt>
                    <dd className="text-sm text-ink-900">{row.source ?? "—"}</dd>
                  </div>
                  {detailEntries.map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-xs font-medium text-ink-400">{formatMetaKey(key)}</dt>
                      <dd className="break-all text-sm text-ink-900">{formatMetaValue(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
