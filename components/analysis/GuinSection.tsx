import type { SalGuinAnalysis } from "@/lib/analysis/types";
import DetailAnalysisCard, { DetailRow } from "./DetailAnalysisCard";

const GUIN_IDS = new Set(["chunul", "munchang", "cheondeok", "woldeok"]);

interface GuinSectionProps {
  data: SalGuinAnalysis;
}

export default function GuinSection({ data }: GuinSectionProps) {
  const guinItems = data.items.filter((i) => GUIN_IDS.has(i.id));
  const detected = guinItems.filter((i) => i.detected);
  const detectedCount = detected.length;

  return (
    <div className="space-y-3">
      <p className="text-xs text-saju-cream/40">{detectedCount}개 감지됨</p>
      {detected.length === 0 ? (
        <p className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-6 text-center text-xs text-saju-cream/40">
          감지된 귀인이 없습니다.
        </p>
      ) : (
        <div className="space-y-4">
          {detected.map((item) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export function getGuinPreview(data: SalGuinAnalysis): string {
  const names = data.items.filter((i) => GUIN_IDS.has(i.id) && i.detected).map((i) => i.name);
  return names.length > 0 ? names.join(", ") : "감지된 귀인 없음";
}

export function getGuinBadge(data: SalGuinAnalysis): string | undefined {
  const count = data.items.filter((i) => GUIN_IDS.has(i.id) && i.detected).length;
  return count > 0 ? `${count}개` : undefined;
}
