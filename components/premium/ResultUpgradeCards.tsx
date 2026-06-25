"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { grantAdRewards } from "@/lib/premium";
import { useEntitlements } from "@/hooks/usePremium";
import AdCompleteModal from "./AdCompleteModal";
import PremiumPaymentButton from "./PremiumPaymentButton";

const AD_LOAD_DELAY_MS = 2000;

export default function ResultUpgradeCards() {
  const { isPremium, hasPaidDeepAnalysis, adRewards, syncAdRewards } = useEntitlements();
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
      }
    };
  }, []);

  function handleWatchAd() {
    if (isAdLoading || isPremium) return;

    setIsAdLoading(true);

    loadTimerRef.current = setTimeout(() => {
      grantAdRewards();
      syncAdRewards();
      setIsAdLoading(false);
      setShowCompleteModal(true);
      loadTimerRef.current = null;
    }, AD_LOAD_DELAY_MS);
  }

  const adActive = Boolean(adRewards && adRewards.aiQuestionsRemaining > 0);

  return (
    <>
      <section className="upgrade-cards-section" aria-labelledby="upgrade-cards-title">
        <h2 id="upgrade-cards-title" className="upgrade-cards-heading">
          더 깊은 운명을 만나보세요
        </h2>
        <p className="upgrade-cards-sub">
          부담 없이 시작하고, 필요할 때만 업그레이드하세요
        </p>

        <div className="upgrade-cards">
          <button
            type="button"
            className="upgrade-card upgrade-card--ad"
            onClick={handleWatchAd}
            disabled={isAdLoading || isPremium}
            aria-busy={isAdLoading}
          >
            <span className="upgrade-card-icon" aria-hidden>
              📺
            </span>
            <span className="upgrade-card-body">
              <span className="upgrade-card-title">
                {isAdLoading ? "광고 불러오는 중..." : "광고 보고 무료 이용"}
              </span>
              <span className="upgrade-card-desc">AI 질문 5회 · 심층 분석 1회</span>
              {adActive && !isPremium && (
                <span className="upgrade-card-badge">이용권 보유 중</span>
              )}
            </span>
            <span className="upgrade-card-arrow" aria-hidden>
              →
            </span>
          </button>

          {hasPaidDeepAnalysis || isPremium ? (
            <div className="upgrade-card upgrade-card--deep upgrade-card--owned">
              <span className="upgrade-card-icon" aria-hidden>
                ⭐
              </span>
              <span className="upgrade-card-body">
                <span className="upgrade-card-title">심층 분석</span>
                <span className="upgrade-card-desc">
                  {isPremium ? "Premium에 포함됨" : "구매 완료 · 이용 가능"}
                </span>
              </span>
            </div>
          ) : (
            <PremiumPaymentButton
              planId="deep_analysis"
              variant="card"
              cardTone="deep"
            >
              <span className="upgrade-card-icon" aria-hidden>
                ⭐
              </span>
              <span className="upgrade-card-body">
                <span className="upgrade-card-title">심층 분석 990원</span>
                <span className="upgrade-card-desc">대운·세운·용신·신살 AI 분석</span>
              </span>
              <span className="upgrade-card-arrow" aria-hidden>
                →
              </span>
            </PremiumPaymentButton>
          )}

          {isPremium ? (
            <div className="upgrade-card upgrade-card--premium upgrade-card--owned">
              <span className="upgrade-card-icon" aria-hidden>
                💎
              </span>
              <span className="upgrade-card-body">
                <span className="upgrade-card-title">Premium</span>
                <span className="upgrade-card-desc">이용 중 · 모든 분석 무제한</span>
              </span>
            </div>
          ) : (
            <Link href="/premium" className="upgrade-card upgrade-card--premium">
              <span className="upgrade-card-icon" aria-hidden>
                💎
              </span>
              <span className="upgrade-card-body">
                <span className="upgrade-card-title">Premium 시작하기</span>
                <span className="upgrade-card-desc">월 4,900원 · AI 무제한·광고 제거</span>
              </span>
              <span className="upgrade-card-arrow" aria-hidden>
                →
              </span>
            </Link>
          )}
        </div>
      </section>

      <AdCompleteModal
        open={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
      />
    </>
  );
}
