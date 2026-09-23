import amqp, { type Channel } from "amqplib";

// Fanout exchange: nothing consumes it yet (no queue is bound), this just
// publishes the event stream so a consumer can be added later without any
// change here.
const EXCHANGE = "order.status";

export type OrderStatusEvent = {
  orderId: string;
  fromStatus: string | null;
  toStatus: string;
  changedBy: string | null;
  note?: string | null;
};

let channelPromise: Promise<Channel | null> | undefined;

// Resolves to null when RABBITMQ_URL isn't set or the broker can't be
// reached — publishing then silently no-ops, since this is best-effort
// event fan-out, not something the order flow should ever depend on.
function getChannel(): Promise<Channel | null> {
  if (!channelPromise) {
    channelPromise = (async () => {
      const url = process.env.RABBITMQ_URL;
      if (!url) return null;
      try {
        const connection = await amqp.connect(url);
        connection.on("error", (err) => console.error("[rabbitmq] connection error", err));
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE, "fanout", { durable: true });
        return channel;
      } catch (err) {
        console.error("[rabbitmq] failed to connect, publishing disabled", err);
        return null;
      }
    })();
  }
  return channelPromise;
}

export async function publishOrderStatusEvent(event: OrderStatusEvent) {
  const channel = await getChannel();
  if (!channel) return;
  const payload = Buffer.from(JSON.stringify({ ...event, publishedAt: new Date().toISOString() }));
  channel.publish(EXCHANGE, "", payload, { contentType: "application/json", persistent: true });
}
