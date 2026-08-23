import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/session";
import { getOrderDocumentData } from "@/lib/order-document";
import { buildOrdersPdf } from "@/lib/pdf/order-pdf";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  const { id } = await params;

  const [order] = await getOrderDocumentData(session.user.companyId, [id]);
  if (!order) return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });

  const buffer = await buildOrdersPdf([order]);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="siparis-${order.id.slice(0, 8)}.pdf"`,
    },
  });
}
