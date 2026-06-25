"use client";

import { DEEP_ANALYSIS_BENEFITS } from "@/lib/premium";
import { useEntitlements } from "@/hooks/usePremium";
import PremiumPaymentButton from "./PremiumPaymentButton";

export default function DeepAnalysisCheckout() {
  const { isPremium, hasPaidDeepAnalysis, loading } = useEntitlements();

  const isOwned = hasPaidDeepAnalysis || isPremium;

  return (
    <section className="deep-analysis-checkout" aria-labelledby="deep-analysis-title">
      <div className="deep-analysis-checkout-badge">1회 결제</div>
      <h2 id="deep-analysis-title" className="deep-analysis-checkout-title">
        AI 심층 분석
      </h2>
      <p className="deep-analysis-checkout-price">
        <span className="deep-analysis-checkout-amount">990원</span>
        <span className="deep-analysis-checkout-note">영구 이용</span>
      </p>
      <p className="deep-analysis-checkout-desc">
        대운·세운·용신·신살을 AI가 종합 해석합니다. 토스페이먼츠 테스트 키로 결제를
        시뮬레이션할 수 있습니다.
      </p>

      <ul className="deep-analysis-checkout-benefits">
        {DEEP_ANALYSIS_BENEFITS.map((benefit) => (
          <li key={benefit}>
            <span aria-hidden>✦</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="deep-analysis-checkout-action">
        {loading ? (
          <button type="button" className="btn-primary w-full" disabled>
            확인 중...
          </button>
        ) : isOwned ? (
          <p className="deep-analysis-checkout-owned" role="status">
            {isPremium ? "Premium에 포함되어 이용 중입니다." : "구매 완료 · 이용 가능"}
          </p>
        ) : (
          <PremiumPaymentButton planId="deep_analysis" className="btn-primary w-full">
            990원 결제하기
          </PremiumPaymentButton>
        )}
      </div>
    </section>
  );
}
