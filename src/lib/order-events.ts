import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, orders, orderStatusHistory, users } from "@/db/schema";
import { publishOrderStatusEvent, type OrderStatusEvent } from "@/lib/rabbitmq";
import { logActivity } from "@/lib/activity-log";

// Single choke point for every order status transition: writes the audit
// row, fans the event out over RabbitMQ, and records it in the activity
// log. Publish and logging are both fire-and-forget — a broker hiccup or a
// logging failure must never fail an order/checkout action.
export async function recordOrderStatusChange(event: OrderStatusEvent) {
  await db.insert(orderStatusHistory).values(event);

  publishOrderStatusEvent(event).catch((err) => {
    console.error("[order-events] failed to publish status change", err);
  });

  logOrderStatusActivity(event).catch((err) => {
    console.error("[order-events] failed to log activity", err);
  });
}

async function logOrderStatusActivity(event: OrderStatusEvent) {
  const [orderRow] = await db
    .select({ companyId: brands.companyId })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(eq(orders.id, event.orderId))
    .limit(1);

  let actor: { id: string; email: string; role: string } | null = null;
  if (event.changedBy) {
    const [user] = await db
      .select({ email: users.email, role: users.role })
      .from(users)
      .where(eq(users.id, event.changedBy))
      .limit(1);
    if (user) actor = { id: event.changedBy, email: user.email, role: user.role };
  }

  await logActivity({
    action: "order.status_changed",
    message: `Sipariş durumu değişti: ${event.fromStatus ?? "(yeni)"} → ${event.toStatus}${
      event.note ? ` — ${event.note}` : ""
    }`,
    source: "order-events.recordOrderStatusChange",
    actor,
    companyId: orderRow?.companyId ?? null,
    entityType: "order",
    entityId: event.orderId,
    meta: { fromStatus: event.fromStatus, toStatus: event.toStatus, note: event.note ?? null },
  });
}
