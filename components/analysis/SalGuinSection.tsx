import type { SalGuinAnalysis } from "@/lib/analysis/types";
import DetailAnalysisCard, { DetailRow } from "./DetailAnalysisCard";

interface SalGuinSectionProps {
  data: SalGuinAnalysis;
}

export default function SalGuinSection({ data }: SalGuinSectionProps) {
  const detected = data.items.filter((i) => i.detected);
  const notDetected = data.items.filter((i) => !i.detected);

  return (
    <div className="space-y-3">
      <p className="text-xs text-saju-cream/40">
        {detected.length}개 감지됨 · 총 {data.items.length}개 항목 분석
      </p>

      {detected.length === 0 ? (
        <div className="analysis-card text-center text-xs text-saju-cream/40">
          감지된 살/귀인이 없습니다. 아래 참고 항목을 확인하세요.
        </div>
      ) : (
        detected.map((item) => (
          <DetailAnalysisCard
            key={item.id}
            title={item.name}
            badge="감지됨"
            badgeVariant="detected"
          >
            <DetailRow label="왜 생겼는지" value={item.reason} />
            <DetailRow label="좋은 점" value={item.goodPoints} />
            <DetailRow label="조심할 점" value={item.caution} />
            <DetailRow label="현실적 해석" value={item.realistic} />
          </DetailAnalysisCard>
        ))
      )}

      {notDetected.length > 0 && (
        <details className="analysis-card">
          <summary className="cursor-pointer text-xs font-medium text-saju-cream/40">
            감지되지 않은 항목 ({notDetected.length}개) 보기
          </summary>
          <div className="mt-3 space-y-2">
            {notDetected.map((item) => (
              <p key={item.id} className="text-xs text-saju-cream/30">
                {item.name} — 해당 없음
              </p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
