import { headers } from "next/headers";

// Projede NEXTAUTH_URL gibi bir base-URL env değişkeni yok; e-posta
// içindeki mutlak linkler için istek başlıklarından türetiyoruz —
// localhost geliştirmede ve prod'da (Vercel'in x-forwarded-* başlıkları)
// ek konfigürasyon gerektirmeden çalışır.
export async function getRequestOrigin(): Promise<string> {
  const headerList = await headers();
  const origin = headerList.get("origin");
  if (origin) return origin;

  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("host") ?? "localhost:3000";
  return `${protocol}://${host}`;
}
