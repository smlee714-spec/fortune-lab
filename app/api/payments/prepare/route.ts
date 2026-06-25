import { NextResponse } from "next/server";
import { createPendingOrder } from "@/lib/payments/orders";
import { getTossClientKey } from "@/lib/payments/toss";
import { getPremiumPlan, isPlanPurchasable } from "@/lib/premium/plans";
import type { PremiumPlanId } from "@/lib/premium/types";

interface PrepareBody {
  planId?: PremiumPlanId;
  customerKey?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PrepareBody;
    const planId = body.planId ?? "premium_monthly";

    if (!isPlanPurchasable(planId)) {
      return NextResponse.json(
        { error: "해당 플랜은 아직 구매할 수 없습니다." },
        { status: 400 },
      );
    }

    const plan = getPremiumPlan(planId);
    const customerKey =
      typeof body.customerKey === "string" && body.customerKey.length > 0
        ? body.customerKey
        : `guest_${crypto.randomUUID()}`;

    const order = createPendingOrder({
      planId,
      amount: plan.priceKrw,
      customerKey,
    });

    return NextResponse.json({
      orderId: order.orderId,
      amount: order.amount,
      orderName: plan.orderName,
      planId: order.planId,
      planType: plan.planType,
      customerKey: order.customerKey,
      clientKey: getTossClientKey(),
    });
  } catch (error) {
    console.error("[payments/prepare]", error);
    const message =
      error instanceof Error ? error.message : "결제 준비 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
