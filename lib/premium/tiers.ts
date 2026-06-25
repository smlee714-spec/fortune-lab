import type { TierDefinition } from "./types";

export const SERVICE_TIERS: readonly TierDefinition[] = [
  {
    id: "free",
    name: "무료",
    priceLabel: "0원",
    headline: "가볍게 시작하기",
    benefits: ["오늘의 운세", "기본 사주", "AI 질문 1회"],
    purchasable: false,
  },
  {
    id: "ad",
    name: "광고 보기",
    priceLabel: "무료",
    headline: "광고 1개만 시청하면",
    benefits: ["광고 1개 시청", "AI 질문 5회", "심층 분석 1회"],
    purchasable: false,
  },
  {
    id: "deep_analysis",
    name: "심층 분석",
    priceLabel: "990원",
    headline: "한 번만 결제하면",
    benefits: ["대운", "세운", "월운", "용신", "신살", "AI 종합 분석"],
    purchasable: true,
    planId: "deep_analysis",
  },
  {
    id: "premium",
    name: "Premium",
    priceLabel: "월 4,900원",
    headline: "모든 운명을 한 번에",
    benefits: [
      "AI 질문 무제한",
      "광고 제거",
      "궁합",
      "타로",
      "관상",
      "손금",
      "모든 분석",
    ],
    purchasable: true,
    planId: "premium_monthly",
  },
] as const;

export function getTier(id: TierDefinition["id"]): TierDefinition {
  const tier = SERVICE_TIERS.find((item) => item.id === id);
  if (!tier) {
    throw new Error(`Unknown tier: ${id}`);
  }
  return tier;
}
