"use client";

import Link from "next/link";
import { useSajuResult } from "@/hooks/useSajuResult";
import { formatBirthInfo } from "@/lib/saju";
import ResultUpgradeCards from "@/components/premium/ResultUpgradeCards";
import ResultAskAIPanel from "./ResultAskAIPanel";
import MobileShell from "@/components/MobileShell";
import DestinyScoreGauge from "./DestinyScoreGauge";
import ResultFeedback from "./ResultFeedback";
import ResultLoading from "./ResultLoading";
import ResultModePanel from "./ResultModePanel";
import ShareButtons from "./ShareButtons";
import TodayLuckPanel from "./TodayLuckPanel";

export default function ResultMainView() {
  const {
    params,
    fortune,
    luckMeta,
    questionAnswer,
    activeQuestion,
    result,
    analysis,
    isReady,
    questionLoading,
    askQuestion,
  } = useSajuResult();

  if (!isReady || !params || !result || !analysis) {
    return <ResultLoading />;
  }

  const hasAiResult = Boolean(fortune && luckMeta);

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

        <ResultAskAIPanel
          className="result-ask-ai"
          fortuneParams={params}
          onAskQuestion={askQuestion}
          questionLoading={questionLoading}
          initialAnswer={questionAnswer}
          initialQuestion={activeQuestion}
        />

        {hasAiResult && (
          <div className="result-ai-output animate-fade-in">
            <section className="result-hero-panel">
              <DestinyScoreGauge score={luckMeta!.destinyScore} starCount={luckMeta!.starCount} />

              <div className="result-oneliner">
                <p className="section-title-sm">오늘의 한줄</p>
                <p className="result-oneliner-text">{luckMeta!.oneLiner}</p>
              </div>
            </section>

            <TodayLuckPanel luck={luckMeta!} />

            <ResultModePanel
              params={params}
              result={result}
              analysis={analysis}
              fortune={fortune}
              luckMeta={luckMeta}
              questionAnswer={questionAnswer}
            />
          </div>
        )}

        <div className="lux-divider" />

        <ResultUpgradeCards />

        <div className="result-bottom-trust">
          <ResultFeedback />
          <ShareButtons />
        </div>
      </main>
    </MobileShell>
  );
}
