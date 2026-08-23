import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/session";
import { resolvePeriodRange, type PeriodKey } from "@/lib/date-range";
import { getFilteredOrderIds, getOrderDocumentData } from "@/lib/order-document";
import { buildOrdersPdf } from "@/lib/pdf/order-pdf";

export async function GET(request: NextRequest) {
  const session = await requireAdminSession();
  const { searchParams } = new URL(request.url);

  const brandId = searchParams.get("brand") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const periodParam = searchParams.get("period") as PeriodKey | null;
  const hasExplicitPeriod = (["today", "week", "month", "last_month", "custom"] as PeriodKey[]).includes(
    periodParam as PeriodKey
  );
  const dateRange = hasExplicitPeriod
    ? resolvePeriodRange(
        periodParam as PeriodKey,
        searchParams.get("start") ?? undefined,
        searchParams.get("end") ?? undefined
      )
    : null;

  const orderIds = await getFilteredOrderIds(session.user.companyId, { brandId, status, dateRange });
  const orderList = await getOrderDocumentData(session.user.companyId, orderIds);

  const buffer = await buildOrdersPdf(orderList);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="siparisler-${new Date().toISOString().slice(0, 10)}.pdf"`,
    },
  });
}
