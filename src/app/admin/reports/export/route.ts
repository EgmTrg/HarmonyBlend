import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/session";
import { resolvePeriodRange, type PeriodKey } from "@/lib/date-range";
import { getBrandSalesReport, getInactiveDealersReport } from "@/lib/reports";

export async function GET(request: NextRequest) {
  const session = await requireAdminSession();
  const companyId = session.user.companyId;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const workbook = new ExcelJS.Workbook();
  let filename: string;

  if (type === "sales") {
    const periodParam = searchParams.get("period") as PeriodKey | null;
    const hasExplicitPeriod = (["today", "week", "month", "last_month", "custom"] as PeriodKey[]).includes(
      periodParam as PeriodKey
    );
    const period = hasExplicitPeriod ? (periodParam as PeriodKey) : "month";
    const periodRange = resolvePeriodRange(
      period,
      searchParams.get("start") ?? undefined,
      searchParams.get("end") ?? undefined
    );
    const brandId = searchParams.get("brand") ?? undefined;
    const rows = await getBrandSalesReport(companyId, periodRange, brandId);

    const sheet = workbook.addWorksheet("Marka Bazlı Satışlar");
    sheet.columns = [
      { header: "Marka", key: "brand", width: 30 },
      { header: "Sipariş Sayısı", key: "orderCount", width: 16 },
      { header: "Ciro", key: "revenue", width: 18 },
    ];
    sheet.getRow(1).font = { bold: true };
    for (const row of rows) {
      sheet.addRow({ brand: row.brandName, orderCount: row.orderCount, revenue: row.revenue });
    }
    sheet.getColumn("revenue").numFmt = "#,##0.00 ₺";

    filename = `marka-bazli-satislar-${periodRange.label.replace(/\s+/g, "-")}.xlsx`;
  } else if (type === "inactive-dealers") {
    const thresholdDays = Number(searchParams.get("threshold") ?? "30") || 30;
    const rows = await getInactiveDealersReport(companyId, thresholdDays);

    const sheet = workbook.addWorksheet("Pasif Bayiler");
    sheet.columns = [
      { header: "Bayi", key: "dealer", width: 32 },
      { header: "Marka(lar)", key: "brands", width: 28 },
      { header: "Son Sipariş Tarihi", key: "lastOrder", width: 18 },
      { header: "Kaç Gündür Sipariş Yok", key: "days", width: 20 },
    ];
    sheet.getRow(1).font = { bold: true };
    for (const row of rows) {
      sheet.addRow({
        dealer: row.dealerName,
        brands: row.brandNames,
        lastOrder: row.lastOrderAt ? row.lastOrderAt.toLocaleDateString("tr-TR") : "Hiç sipariş vermedi",
        days: row.daysSinceLastOrder ?? "—",
      });
    }

    filename = `pasif-bayiler-${thresholdDays}-gun.xlsx`;
  } else {
    return NextResponse.json({ error: "Geçersiz rapor tipi" }, { status: 400 });
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
