"use client";

import type { TierDefinition } from "@/lib/premium/types";
import PremiumCheckout from "./PremiumCheckout";
import PremiumPaymentButton from "./PremiumPaymentButton";

type Entitlements = {
  isPremium: boolean;
  hasPaidDeepAnalysis: boolean;
  adRewards: {
    aiQuestionsRemaining: number;
    deepAnalysisRemaining: number;
  } | null;
  loading: boolean;
};

interface TierPlanCardProps {
  tier: TierDefinition;
  entitlements: Entitlements;
}

export default function TierPlanCard({ tier, entitlements }: TierPlanCardProps) {
  const { isPremium, hasPaidDeepAnalysis, adRewards } = entitlements;

  const isOwned =
    (tier.id === "premium" && isPremium) ||
    (tier.id === "deep_analysis" && (hasPaidDeepAnalysis || isPremium));

  const adActive = Boolean(adRewards && adRewards.aiQuestionsRemaining > 0);

  const toneClass =
    tier.id === "free"
      ? "tier-card--free"
      : tier.id === "ad"
        ? "tier-card--ad"
        : tier.id === "deep_analysis"
          ? "tier-card--deep"
          : "tier-card--premium";

  return (
    <article className={`tier-card ${toneClass} ${isOwned ? "tier-card--owned" : ""}`}>
      <div className="tier-card-header">
        <div>
          <h2 className="tier-card-name">{tier.name}</h2>
          <p className="tier-card-headline">{tier.headline}</p>
        </div>
        <p className="tier-card-price">{tier.priceLabel}</p>
      </div>

      <ul className="tier-card-benefits">
        {tier.benefits.map((benefit) => (
          <li key={benefit}>
            <span className="tier-card-check" aria-hidden>
              ✦
            </span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="tier-card-action">
        {tier.id === "free" && (
          <p className="tier-card-status">기본 제공 · 별도 결제 없음</p>
        )}

        {tier.id === "ad" && (
          <p className="tier-card-status">
            {adActive
              ? `이용권 보유 · AI ${adRewards?.aiQuestionsRemaining}회 남음`
              : "결과 화면에서 광고 시청으로 획득"}
          </p>
        )}

        {tier.id === "deep_analysis" && isOwned && (
          <p className="tier-card-status">
            {isPremium ? "Premium에 포함됨" : "구매 완료 · 이용 가능"}
          </p>
        )}

        {tier.id === "deep_analysis" && !isOwned && tier.planId && (
          <PremiumPaymentButton planId={tier.planId}>⭐ AI 심층 분석 990원</PremiumPaymentButton>
        )}

        {tier.id === "premium" && isOwned && (
          <p className="tier-card-status">✦ Premium 이용 중</p>
        )}

        {tier.id === "premium" && !isOwned && tier.planId && (
          <PremiumCheckout planId={tier.planId} label="💎 Premium 시작하기" />
        )}
      </div>
    </article>
  );
}
