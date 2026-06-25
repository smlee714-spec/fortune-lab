"use client";

import { useMemo, useState } from "react";
import {
  EXPERT_MODE_ITEMS,
  GENERAL_MODE_ITEMS,
  type ResultMode,
} from "@/lib/result-modes";
import { buildResultItemPreview } from "@/lib/result-item-content";
import type { FullAnalysis } from "@/lib/analysis/types";
import type { DailyFortune } from "@/lib/fortune-types";
import type { ResultLuckMeta } from "@/lib/luck-meta";
import type { ResultQueryParams } from "@/lib/result-routes";
import type { SajuResult } from "@/lib/types";
import ResultItemCard from "./ResultItemCard";
import ResultModeToggle from "./ResultModeToggle";

interface ResultModePanelProps {
  params: ResultQueryParams;
  result: SajuResult;
  analysis: FullAnalysis;
  fortune: DailyFortune | null;
  luckMeta: ResultLuckMeta | null;
  questionAnswer: string | null;
}

export default function ResultModePanel({
  params,
  result,
  analysis,
  fortune,
  luckMeta,
  questionAnswer,
}: ResultModePanelProps) {
  const [mode, setMode] = useState<ResultMode>("general");

  const items = mode === "general" ? GENERAL_MODE_ITEMS : EXPERT_MODE_ITEMS;

  const ctx = useMemo(
    () => ({
      engine: result.engine,
      analysis,
      fortune,
      luckMeta,
      questionAnswer,
    }),
    [result.engine, analysis, fortune, luckMeta, questionAnswer]
  );

  return (
    <section className="result-mode-section" aria-labelledby="result-mode-title">
      <div className="section-heading-center">
        <p className="lux-caption">RESULT VIEW</p>
        <h2 id="result-mode-title" className="section-title-md mt-3">
          {mode === "general" ? "오늘의 운세" : "명리 분석"}
        </h2>
        <p className="result-mode-desc">
          {mode === "general"
            ? "쉬운 말로 읽는 오늘의 운세입니다."
            : "사주·오행·대운 등 전문 명리 데이터입니다."}
        </p>
      </div>

      <ResultModeToggle mode={mode} onChange={setMode} />

      <div className="result-item-grid">
        {items.map((item) => (
          <ResultItemCard
            key={item.id}
            item={item}
            preview={buildResultItemPreview(item.id, ctx)}
            params={params}
          />
        ))}
      </div>
    </section>
  );
}
