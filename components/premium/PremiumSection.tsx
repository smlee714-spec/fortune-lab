"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AD_REWARD_DESCRIPTION,
  LOCKED_AI_MESSAGE,
  PREMIUM_BENEFITS,
  PREMIUM_PRICE,
  UNLOCKED_AI_MESSAGE,
} from "@/lib/premium";
import AdCompleteModal from "./AdCompleteModal";
import LockIcon from "./LockIcon";

const AD_LOAD_DELAY_MS = 2000;

interface PremiumSectionProps {
  premiumPreview?: string;
}

export default function PremiumSection({ premiumPreview }: PremiumSectionProps) {
  const [adWatched, setAdWatched] = useState(false);
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
    if (isAdLoading || adWatched) return;

    try {
      setIsAdLoading(true);

      loadTimerRef.current = setTimeout(() => {
        try {
          setIsAdLoading(false);
          setAdWatched(true);
          setShowCompleteModal(true);
        } catch (error) {
          console.error("광고 시청 완료 처리 중 오류:", error);
          setIsAdLoading(false);
        } finally {
          loadTimerRef.current = null;
        }
      }, AD_LOAD_DELAY_MS);
    } catch (error) {
      console.error("광고 불러오기 중 오류:", error);
      setIsAdLoading(false);
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
        loadTimerRef.current = null;
      }
    }
  }

  return (
    <>
      <section className="revenue-section premium-v2" aria-labelledby="revenue-section-title">
        <div className="premium-v2-header">
          <h2 id="revenue-section-title" className="premium-v2-title">
            🔒 {LOCKED_AI_MESSAGE}
          </h2>
        </div>

        {adWatched ? (
          <div className="revenue-unlocked-panel">
            <p className="revenue-unlocked-icon" aria-hidden>
              ✦
            </p>
            <p className="revenue-unlocked-message">{UNLOCKED_AI_MESSAGE}</p>
            {premiumPreview ? (
              <p className="revenue-unlocked-preview">{premiumPreview}</p>
            ) : (
              <p className="revenue-unlocked-desc">
                광고 시청으로 AI 심층 분석 1회가 열렸습니다.
              </p>
            )}
          </div>
        ) : (
          <div className="premium-lock-card">
            <div className="premium-lock-card-inner">
              <LockIcon className="h-5 w-5 text-[var(--saju-gold-light)]" />
              <p>심층 분석 리포트가 잠겨 있습니다</p>
            </div>
            {premiumPreview && (
              <p className="revenue-locked-preview">{premiumPreview}</p>
            )}
          </div>
        )}

        <div className="revenue-benefits premium-v2-benefits">
          <p className="revenue-benefits-title">혜택</p>
          <ul className="revenue-benefits-list">
            {PREMIUM_BENEFITS.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>

        {!adWatched && (
          <div className="revenue-actions">
            <button
              type="button"
              className="btn-revenue-ad"
              onClick={handleWatchAd}
              disabled={isAdLoading}
              aria-busy={isAdLoading}
            >
              <span className="btn-revenue-icon" aria-hidden>
                📺
              </span>
              <span className="btn-revenue-text">
                <span className="btn-revenue-label">
                  {isAdLoading ? "광고를 불러오는 중..." : "광고 보고 무료 이용"}
                </span>
                {!isAdLoading && (
                  <span className="btn-revenue-desc">{AD_REWARD_DESCRIPTION}</span>
                )}
              </span>
            </button>

            <Link href="/premium" className="btn-revenue-premium">
              <span className="btn-revenue-icon" aria-hidden>
                ⭐
              </span>
              <span className="btn-revenue-text">
                <span className="btn-revenue-label">Premium 시작하기</span>
                <span className="btn-revenue-price">{PREMIUM_PRICE}</span>
              </span>
            </Link>
          </div>
        )}

        {adWatched && (
          <div className="revenue-actions">
            <Link href="/premium" className="btn-revenue-premium">
              <span className="btn-revenue-icon" aria-hidden>
                ⭐
              </span>
              <span className="btn-revenue-text">
                <span className="btn-revenue-label">Premium 시작하기</span>
                <span className="btn-revenue-price">{PREMIUM_PRICE}</span>
              </span>
            </Link>
          </div>
        )}
      </section>

      <AdCompleteModal
        open={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
      />
    </>
  );
}
