"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { buildResultItemDetail } from "@/lib/result-item-content";
import { getResultModeItem, isValidResultItemId } from "@/lib/result-modes";
import { useSajuResult } from "@/hooks/useSajuResult";
import { buildResultPath } from "@/lib/result-routes";
import DetailPageLayout from "./DetailPageLayout";
import ResultLoading from "./ResultLoading";

interface ResultItemDetailViewProps {
  itemId: string;
}

function DetailBlock({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: string;
}) {
  return (
    <section className="result-detail-block">
      <div className="result-detail-block-head">
        <span className="result-detail-step">{step}</span>
        <h2 className="result-detail-block-title">{title}</h2>
      </div>
      <p className="result-detail-block-body">{children}</p>
    </section>
  );
}

export default function ResultItemDetailView({ itemId }: ResultItemDetailViewProps) {
  const router = useRouter();
  const {
    params,
    result,
    analysis,
    fortune,
    luckMeta,
    questionAnswer,
    isReady,
  } = useSajuResult();

  useEffect(() => {
    if (!isValidResultItemId(itemId)) {
      if (params) router.replace(buildResultPath("/result", params));
      else router.replace("/");
    }
  }, [itemId, router, params]);

  const detail = useMemo(() => {
    if (!isValidResultItemId(itemId) || !result || !analysis) return null;
    return buildResultItemDetail({
      itemId,
      engine: result.engine,
      analysis,
      fortune,
      luckMeta,
      questionAnswer,
    });
  }, [itemId, result, analysis, fortune, luckMeta, questionAnswer]);

  if (!isValidResultItemId(itemId)) {
    return <ResultLoading />;
  }

  if (!isReady || !params || !detail) {
    return <ResultLoading />;
  }

  const meta = getResultModeItem(itemId);

  return (
    <DetailPageLayout
      title={detail.title}
      technicalTitle={meta?.mode === "expert" ? "전문가 모드" : "일반 모드"}
      params={params}
    >
      <p className="result-detail-preview">{detail.preview}</p>

      <div className="result-detail-stack">
        <DetailBlock step={1} title="명리학 설명">
          {detail.technical}
        </DetailBlock>
        <DetailBlock step={2} title="쉬운 설명">
          {detail.easy}
        </DetailBlock>
        <DetailBlock step={3} title="AI 해석">
          {detail.ai}
        </DetailBlock>
      </div>
    </DetailPageLayout>
  );
}
