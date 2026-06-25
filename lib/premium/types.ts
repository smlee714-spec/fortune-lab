export type PremiumPlanId = "deep_analysis" | "premium_monthly";

export type PlanType = "one_time" | "subscription";

export type PlanAvailability = "active" | "coming_soon";

export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "pending";

export type BillingInterval = "month" | "none";

export type TierId = "free" | "ad" | "deep_analysis" | "premium";

export interface PremiumPlan {
  id: PremiumPlanId;
  name: string;
  description: string;
  priceKrw: number;
  priceLabel: string;
  planType: PlanType;
  interval: BillingInterval;
  availability: PlanAvailability;
  orderName: string;
}

export interface TierDefinition {
  id: TierId;
  name: string;
  priceLabel: string;
  headline: string;
  benefits: readonly string[];
  purchasable: boolean;
  planId?: PremiumPlanId;
}

export interface PremiumSubscription {
  planId: "premium_monthly";
  customerKey: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  paymentKey?: string;
  billingKey?: string;
}

export interface DeepAnalysisPurchase {
  planId: "deep_analysis";
  customerKey: string;
  purchasedAt: string;
  paymentKey?: string;
}

export interface PremiumStatusResponse {
  isPremium: boolean;
  hasDeepAnalysis: boolean;
  subscription: PremiumSubscription | null;
  deepAnalysis: DeepAnalysisPurchase | null;
}

export interface PreparePaymentResponse {
  orderId: string;
  amount: number;
  orderName: string;
  planId: PremiumPlanId;
  planType: PlanType;
  customerKey: string;
  clientKey: string;
}

export interface ConfirmPaymentRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  planId: PremiumPlanId;
  planType: PlanType;
  subscription?: PremiumSubscription;
  deepAnalysis?: DeepAnalysisPurchase;
}
