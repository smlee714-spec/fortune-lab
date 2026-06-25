"use client";

import Link from "next/link";
import { useSajuResult } from "@/hooks/useSajuResult";
import { ANALYSIS_MENUS } from "@/lib/result-routes";
import { formatBirthInfo } from "@/lib/saju";
import PremiumSection from "@/components/premium/PremiumSection";
import FortuneSummaryCard from "@/components/FortuneSummaryCard";
import MobileShell from "@/components/MobileShell";
import AnalysisMenuCard from "./AnalysisMenuCard";
import ResultLoading from "./ResultLoading";

export default function ResultMainView() {
  const { params, fortune, result, isReady } = useSajuResult();

  if (!isReady || !params || !fortune || !result) {
    return <ResultLoading />;
  }

  return (
    <MobileShell>
      <main className="animate-fade-in responsive-page">
        <header className="relative mb-10 pt-1 text-center md:mb-12">
          <Link href="/" className="lux-btn-ghost absolute left-0 top-1 text-xs sm:text-sm">
            <span aria-hidden>←</span>
            <span>다시 입력하기</span>
          </Link>

          <p className="lux-caption">UNMYEONG LAB</p>
          <h1 className="mt-3 font-serif text-2xl font-light tracking-[0.14em] md:text-3xl">
            운명랩
          </h1>
          <p className="mt-2 text-sm font-light tracking-wide text-[var(--saju-gold-light)]">
            오늘의 운세
          </p>
          <p className="mt-3 text-sm font-light text-[var(--saju-cream-dim)] md:text-base">
            {formatBirthInfo(result.birthInfo)}
          </p>
          <p className="mt-1 text-xs text-[var(--saju-cream-dim)] opacity-60">
            {fortune.dateLabel}
          </p>
        </header>

        {/* 무료 영역 */}
        <section className="mb-10 md:mb-12" aria-labelledby="free-section-title">
          <div className="mb-5 flex items-center gap-3">
            <span className="free-badge">FREE</span>
            <h2 id="free-section-title" className="font-serif text-base font-light tracking-wide">
              오늘의 운세
            </h2>
          </div>

          <div className="fortune-grid">
            <div className="grid-span-full">
              <FortuneSummaryCard
                item={fortune.overall}
                displayTitle="오늘의 총평"
                featured
              />
            </div>
            <FortuneSummaryCard item={fortune.love} />
            <FortuneSummaryCard item={fortune.wealth} />
            <FortuneSummaryCard item={fortune.career} />
            <FortuneSummaryCard item={fortune.health} />
          </div>
        </section>

        <div className="lux-divider" />

        {/* 기본 사주 분석 (무료) */}
        <section className="pt-8">
          <div className="mb-6 text-center md:mb-8">
            <p className="lux-caption">ANALYSIS</p>
            <h2 className="mt-3 font-serif text-lg font-light tracking-wide md:text-xl">
              더 알아보기
            </h2>
          </div>

          <div className="menu-grid">
            {ANALYSIS_MENUS.map((item) => (
              <AnalysisMenuCard key={item.section} item={item} params={params} />
            ))}
          </div>
        </section>

        <div className="lux-divider" />

        {/* 수익 구조 — 프리미엄 영역 */}
        <div className="pb-6 pt-8">
          <PremiumSection />
        </div>
      </main>
    </MobileShell>
  );
}
