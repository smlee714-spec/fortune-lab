"use client";

import Link from "next/link";
import { useSajuResult } from "@/hooks/useSajuResult";
import { ANALYSIS_MENUS } from "@/lib/result-routes";
import { formatBirthInfo } from "@/lib/saju";
import PremiumSection from "@/components/premium/PremiumSection";
import AskAIPanel from "@/components/ai/AskAIPanel";
import MobileShell from "@/components/MobileShell";
import AnalysisMenuCard from "./AnalysisMenuCard";
import DestinyScoreGauge from "./DestinyScoreGauge";
import FortuneEmojiCard from "./FortuneEmojiCard";
import ResultFeedback from "./ResultFeedback";
import ResultFortuneError from "./ResultFortuneError";
import ResultFortuneLoading from "./ResultFortuneLoading";
import ResultLoading from "./ResultLoading";
import ShareButtons from "./ShareButtons";
import TodayLuckPanel from "./TodayLuckPanel";

const FORTUNE_CARDS = [
  { key: "love" as const, emoji: "❤️", title: "연애운" },
  { key: "wealth" as const, emoji: "💰", title: "재물운" },
  { key: "career" as const, emoji: "💼", title: "직업운" },
  { key: "health" as const, emoji: "🏥", title: "건강운" },
];

export default function ResultMainView() {
  const {
    params,
    fortune,
    luckMeta,
    premiumPreview,
    result,
    isReady,
    fortuneLoading,
    fortuneError,
    refetchFortune,
  } = useSajuResult();

  if (!isReady || !params || !result) {
    return <ResultLoading />;
  }

  const dateLabel =
    fortune?.dateLabel ??
    new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });

  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page result-page">
        <header className="result-header">
          <Link href="/" className="lux-btn-ghost result-back">
            <span aria-hidden>←</span>
            <span>홈</span>
          </Link>

          <p className="result-complete-badge">✨ 운명 분석 완료</p>
          <p className="result-birth-info">{formatBirthInfo(result.birthInfo)}</p>
          <p className="result-date-label">{dateLabel}</p>
        </header>

        {fortuneLoading && <ResultFortuneLoading />}

        {!fortuneLoading && fortuneError && (
          <ResultFortuneError message={fortuneError} onRetry={refetchFortune} />
        )}

        {!fortuneLoading && !fortuneError && fortune && luckMeta && (
          <>
            <section className="result-hero-panel">
              <DestinyScoreGauge score={luckMeta.destinyScore} starCount={luckMeta.starCount} />

              <div className="result-oneliner">
                <p className="section-title-sm">오늘의 한줄</p>
                <p className="result-oneliner-text">{luckMeta.oneLiner}</p>
              </div>
            </section>

            <TodayLuckPanel luck={luckMeta} />

            <section className="result-free-section" aria-labelledby="free-fortune-title">
              <div className="section-heading-row">
                <span className="free-badge">FREE</span>
                <h2 id="free-fortune-title" className="section-title-md">
                  무료 결과
                </h2>
              </div>

              <div className="fortune-emoji-grid">
                {FORTUNE_CARDS.map(({ key, emoji, title }) => (
                  <FortuneEmojiCard
                    key={key}
                    emoji={emoji}
                    title={title}
                    content={fortune[key].detail}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <AskAIPanel className="result-ask-ai" />

        <div className="lux-divider" />

        <section className="result-analysis-section">
          <div className="section-heading-center">
            <p className="lux-caption">DEEP ANALYSIS</p>
            <h2 className="section-title-md mt-3">분석 메뉴</h2>
          </div>

          <div className="menu-grid">
            {ANALYSIS_MENUS.map((item) => (
              <AnalysisMenuCard key={item.section} item={item} params={params} />
            ))}
          </div>
        </section>

        <div className="lux-divider" />

        <div className="result-premium-wrap">
          <PremiumSection premiumPreview={premiumPreview ?? undefined} />
        </div>

        <div className="result-bottom-trust">
          <ResultFeedback />
          <ShareButtons />
        </div>
      </main>
    </MobileShell>
  );
}
