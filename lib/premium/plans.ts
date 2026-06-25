import type { PremiumPlan, PremiumPlanId } from "./types";

export const PAYMENT_PLANS: Record<PremiumPlanId, PremiumPlan> = {
  deep_analysis: {
    id: "deep_analysis",
    name: "AI 심층 분석",
    description: "대운·세운·용신·신살 AI 종합 분석",
    priceKrw: 990,
    priceLabel: "990원",
    planType: "one_time",
    interval: "none",
    availability: "active",
    orderName: "운명랩 AI 심층 분석",
  },
  premium_monthly: {
    id: "premium_monthly",
    name: "Premium",
    description: "AI 무제한·광고 제거·모든 분석",
    priceKrw: 4900,
    priceLabel: "월 4,900원",
    planType: "subscription",
    interval: "month",
    availability: "active",
    orderName: "운명랩 Premium (월간)",
  },
};

/** @deprecated PAYMENT_PLANS 사용 */
export const PREMIUM_PLANS = PAYMENT_PLANS;

export const DEFAULT_PREMIUM_PLAN_ID: PremiumPlanId = "premium_monthly";

export function getPremiumPlan(planId: PremiumPlanId): PremiumPlan {
  return PAYMENT_PLANS[planId];
}

export function isPlanPurchasable(planId: PremiumPlanId): boolean {
  return PAYMENT_PLANS[planId].availability === "active";
}
