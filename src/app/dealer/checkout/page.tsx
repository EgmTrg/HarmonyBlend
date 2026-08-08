import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealerPaymentMethods, paymentMethods } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { CheckoutForm } from "./checkout-form";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand: brandId } = await searchParams;
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  if (!brandId) notFound();

  const [dealerBrand] = await db
    .select({ id: brands.id, name: brands.name })
    .from(dealerBrands)
    .innerJoin(brands, eq(dealerBrands.brandId, brands.id))
    .where(
      and(
        eq(dealerBrands.dealerId, dealerId),
        eq(dealerBrands.brandId, brandId),
        eq(dealerBrands.isActive, true)
      )
    )
    .limit(1);

  if (!dealerBrand) notFound();

  const enabledPaymentMethods = await db
    .select({ id: paymentMethods.id, code: paymentMethods.code, label: paymentMethods.label })
    .from(dealerPaymentMethods)
    .innerJoin(paymentMethods, eq(dealerPaymentMethods.paymentMethodId, paymentMethods.id))
    .where(
      and(
        eq(dealerPaymentMethods.dealerId, dealerId),
        eq(dealerPaymentMethods.brandId, brandId),
        eq(dealerPaymentMethods.isEnabled, true)
      )
    )
    .orderBy(paymentMethods.label);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Ödeme — {dealerBrand.name}</h1>
        <p className="text-sm text-ink-400">Sepetinizi gözden geçirin ve ödeme tipini seçin.</p>
      </div>

      <CheckoutForm brandId={dealerBrand.id} paymentMethods={enabledPaymentMethods} />
    </div>
  );
}
