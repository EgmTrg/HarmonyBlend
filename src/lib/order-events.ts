import { db } from "@/db";
import { orderStatusHistory } from "@/db/schema";
import { publishOrderStatusEvent, type OrderStatusEvent } from "@/lib/rabbitmq";

// Single choke point for every order status transition: writes the audit
// row and fans the event out over RabbitMQ. The publish is fire-and-forget
// — a broker hiccup must never fail an order/checkout action.
export async function recordOrderStatusChange(event: OrderStatusEvent) {
  await db.insert(orderStatusHistory).values(event);
  publishOrderStatusEvent(event).catch((err) => {
    console.error("[order-events] failed to publish status change", err);
  });
}
