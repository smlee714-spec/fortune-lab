export const PREMIUM_PRICE = "월 4,900원";
export const DEEP_ANALYSIS_PRICE = "990원";

export const FREE_BENEFITS = ["오늘의 운세", "기본 사주", "AI 질문 1회"] as const;

export const AD_BENEFITS = ["광고 1개 시청", "AI 질문 5회", "심층 분석 1회"] as const;

export const DEEP_ANALYSIS_BENEFITS = [
  "대운",
  "세운",
  "월운",
  "용신",
  "신살",
  "AI 종합 분석",
] as const;

export const PREMIUM_BENEFITS = [
  "AI 질문 무제한",
  "광고 제거",
  "궁합",
  "타로",
  "관상",
  "손금",
  "모든 분석",
] as const;

export const LOCKED_AI_MESSAGE = "AI 심층 분석";

export const UNLOCKED_AI_MESSAGE = "AI 심층 분석이 열렸습니다";

export const AD_REWARD_DESCRIPTION = "AI 질문 5회 · 심층 분석 1회";

export {
  PAYMENT_PLANS,
  PREMIUM_PLANS,
  DEFAULT_PREMIUM_PLAN_ID,
  getPremiumPlan,
  isPlanPurchasable,
} from "./premium/plans";
export { SERVICE_TIERS, getTier } from "./premium/tiers";
export {
  grantAdRewards,
  getAdRewards,
  hasFreeAiQuestionAvailable,
  markFreeAiQuestionUsed,
  AD_REWARD_GRANT,
  FREE_AI_QUESTIONS,
} from "./premium/entitlements-client";
export type {
  PremiumPlanId,
  PremiumPlan,
  TierId,
  TierDefinition,
  PremiumSubscription,
  DeepAnalysisPurchase,
  PremiumStatusResponse,
  PreparePaymentResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  PlanType,
} from "./premium/types";
