import { getDetectedHyungchung } from "@/lib/analysis";
import type { HyungchungAnalysis } from "@/lib/analysis/types";
import DetailAnalysisCard, { DetailRow } from "./DetailAnalysisCard";

interface HyungchungSectionProps {
  data: HyungchungAnalysis;
}

const TYPE_COLOR: Record<string, string> = {
  충: "text-saju-fire",
  형: "text-saju-earth",
  파: "text-saju-metal",
  해: "text-saju-water",
  합: "text-saju-wood",
};

export default function HyungchungSection({ data }: HyungchungSectionProps) {
  const detected = getDetectedHyungchung(data.items);

  return (
    <div className="space-y-3">
      <p className="text-xs text-saju-cream/40">
        {detected.length}개 관계 감지됨 · 충·형·파·해·합 분석
      </p>

      {detected.length === 0 ? (
        <div className="analysis-card text-center text-xs leading-relaxed text-saju-cream/40">
          원국에서 뚜렷한 충·형·파·해·합이 감지되지 않았습니다.
          <br />
          이는 갈등이 적고 비교적 안정적인 구조일 수 있습니다.
        </div>
      ) : (
        detected.map((item) => (
          <DetailAnalysisCard
            key={item.id}
            title={item.label}
            badge={item.type}
            badgeVariant="relation"
          >
            <p className={`mb-2 text-xs font-medium ${TYPE_COLOR[item.type] ?? "text-saju-cream/60"}`}>
              {item.chars}
            </p>
            <DetailRow label="충돌 의미" value={item.conflict} />
            <DetailRow label="인간관계" value={item.relationship} />
            <DetailRow label="직업·일" value={item.work} />
            <DetailRow label="돈·재물" value={item.money} />
            <DetailRow label="건강" value={item.health} />
            <DetailRow label="현실적 조언" value={item.advice} />
          </DetailAnalysisCard>
        ))
      )}
    </div>
  );
}
