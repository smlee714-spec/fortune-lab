import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { consumePendingOrder } from "@/lib/payments/orders";
import { confirmTossPayment } from "@/lib/payments/toss";
import { getPremiumPlan } from "@/lib/premium/plans";
import {
  buildDeepAnalysisCookieOptions,
  buildPremiumCookieOptions,
  createDeepAnalysisPurchase,
  createMonthlySubscription,
  deepAnalysisToSession,
  getDeepAnalysisCookieName,
  getPremiumCookieName,
  subscriptionToSession,
} from "@/lib/premium/session";
import type { ConfirmPaymentRequest, ConfirmPaymentResponse } from "@/lib/premium/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ConfirmPaymentRequest;
    const { paymentKey, orderId, amount } = body;

    if (!paymentKey || !orderId || typeof amount !== "number") {
      return NextResponse.json(
        { error: "결제 정보가 올바르지 않습니다." },
        { status: 400 },
      );
    }

    const pendingOrder = consumePendingOrder(orderId);
    if (!pendingOrder) {
      return NextResponse.json(
        { error: "만료되었거나 유효하지 않은 주문입니다." },
        { status: 400 },
      );
    }

    if (pendingOrder.amount !== amount) {
      return NextResponse.json(
        { error: "결제 금액이 일치하지 않습니다." },
        { status: 400 },
      );
    }

    const payment = await confirmTossPayment({ paymentKey, orderId, amount });

    if (payment.totalAmount !== pendingOrder.amount) {
      return NextResponse.json(
        { error: "승인된 결제 금액이 일치하지 않습니다." },
        { status: 400 },
      );
    }

    const plan = getPremiumPlan(pendingOrder.planId);
    const cookieStore = await cookies();

    if (plan.planType === "subscription") {
      const subscription = createMonthlySubscription({
        planId: "premium_monthly",
        customerKey: pendingOrder.customerKey,
        paymentKey: payment.paymentKey,
      });

      cookieStore.set(
        getPremiumCookieName(),
        subscriptionToSession(subscription),
        buildPremiumCookieOptions(new Date(subscription.currentPeriodEnd)),
      );

      const response: ConfirmPaymentResponse = {
        success: true,
        planId: pendingOrder.planId,
        planType: plan.planType,
        subscription,
      };

      return NextResponse.json(response);
    }

    const deepAnalysis = createDeepAnalysisPurchase({
      customerKey: pendingOrder.customerKey,
      paymentKey: payment.paymentKey,
    });

    cookieStore.set(
      getDeepAnalysisCookieName(),
      deepAnalysisToSession(deepAnalysis),
      buildDeepAnalysisCookieOptions(),
    );

    const response: ConfirmPaymentResponse = {
      success: true,
      planId: pendingOrder.planId,
      planType: plan.planType,
      deepAnalysis,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[payments/confirm]", error);
    const message =
      error instanceof Error ? error.message : "결제 승인 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
