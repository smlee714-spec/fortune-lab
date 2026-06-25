"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSajuResult } from "@/hooks/useSajuResult";
import { generateDailyFortune } from "@/lib/fortune";
import { buildResultLuckMeta } from "@/lib/luck-meta";
import { ANALYSIS_MENUS } from "@/lib/result-routes";
import { formatBirthInfo } from "@/lib/saju";
import ResultUpgradeCards from "@/components/premium/ResultUpgradeCards";
import MobileShell from "@/components/MobileShell";
import AnalysisMenuCard from "./AnalysisMenuCard";
import DestinyScoreGauge from "./DestinyScoreGauge";
import FortuneEmojiCard from "./FortuneEmojiCard";
import ResultAskAIPanel from "./ResultAskAIPanel";
import ResultFeedback from "./ResultFeedback";
import ResultLoading from "./ResultLoading";
import ShareButtons from "./ShareButtons";
import TodayLuckPanel from "./TodayLuckPanel";

const FREE_FORTUNE_CARDS = [
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
    questionAnswer,
    activeQuestion,
    result,
    isReady,
    questionLoading,
    askQuestion,
  } = useSajuResult();

  const sampleFortune = useMemo(
    () => (result ? generateDailyFortune(result) : null),
    [result]
  );

  const displayFortune = fortune ?? sampleFortune;

  const displayLuckMeta = useMemo(() => {
    if (!result || !displayFortune) return null;
    if (luckMeta) return luckMeta;
    return buildResultLuckMeta(result, displayFortune.today.detail);
  }, [luckMeta, result, displayFortune]);

  if (!isReady || !params || !result || !displayFortune || !displayLuckMeta) {
    return <ResultLoading />;
  }

  const dateLabel = displayFortune.dateLabel;

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

        <section className="result-hero-panel" aria-labelledby="today-summary-title">
          <DestinyScoreGauge
            score={displayLuckMeta.destinyScore}
            starCount={displayLuckMeta.starCount}
          />

          <div className="result-oneliner">
            <p id="today-summary-title" className="section-title-sm">
              오늘의 운세
            </p>
            <p className="result-oneliner-text">{displayLuckMeta.oneLiner}</p>
            <p className="result-today-detail">{displayFortune.today.detail}</p>
          </div>
        </section>

        <section className="result-free-section" aria-labelledby="free-fortune-title">
          <h2 id="free-fortune-title" className="section-title-sm section-heading-row">
            무료 운세
          </h2>
          <div className="fortune-emoji-grid">
            {FREE_FORTUNE_CARDS.map(({ key, emoji, title }) => (
              <FortuneEmojiCard
                key={key}
                emoji={emoji}
                title={title}
                content={displayFortune[key].detail}
              />
            ))}
          </div>
        </section>

        <TodayLuckPanel luck={displayLuckMeta} />

        <section className="result-analysis-section" aria-labelledby="analysis-menu-title">
          <div className="section-heading-center">
            <p className="lux-caption">DEEP DIVE</p>
            <h2 id="analysis-menu-title" className="section-title-md mt-3">
              상세 분석
            </h2>
            <p className="result-mode-desc">카드를 눌러 명리 분석 상세를 확인하세요.</p>
          </div>

          <div className="menu-grid">
            {ANALYSIS_MENUS.map((item) => (
              <AnalysisMenuCard key={item.section} item={item} params={params} />
            ))}
          </div>
        </section>

        <div className="lux-divider" />

        <ResultUpgradeCards />

        <ResultAskAIPanel
          className="result-ask-ai"
          fortuneParams={params}
          onAskQuestion={askQuestion}
          questionLoading={questionLoading}
          initialAnswer={questionAnswer}
          initialQuestion={activeQuestion}
        />

        <div className="result-bottom-trust">
          <ResultFeedback />
          <ShareButtons />
        </div>
      </main>
    </MobileShell>
  );
}
