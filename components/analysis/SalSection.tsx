import type { SalGuinAnalysis } from "@/lib/analysis/types";
import DetailAnalysisCard, { DetailRow } from "./DetailAnalysisCard";

const SAL_IDS = new Set([
  "dohwa",
  "hongyeom",
  "yeokma",
  "hwagae",
  "baekho",
  "goegang",
  "yangin",
]);

interface SalSectionProps {
  data: SalGuinAnalysis;
}

function SalGuinList({ items, emptyLabel }: { items: SalGuinAnalysis["items"]; emptyLabel: string }) {
  const detected = items.filter((i) => i.detected);

  if (detected.length === 0) {
    return (
      <p className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-6 text-center text-xs text-saju-cream/40">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {detected.map((item) => (
        <DetailAnalysisCard key={item.id} title={item.name} badge="감지됨" badgeVariant="detected">
          <DetailRow label="왜 생겼는지" value={item.reason} />
          <DetailRow label="좋은 점" value={item.goodPoints} />
          <DetailRow label="조심할 점" value={item.caution} />
          <DetailRow label="현실적 해석" value={item.realistic} />
        </DetailAnalysisCard>
      ))}
    </div>
  );
}

export default function SalSection({ data }: SalSectionProps) {
  const salItems = data.items.filter((i) => SAL_IDS.has(i.id));
  const detectedCount = salItems.filter((i) => i.detected).length;

  return (
    <div className="space-y-3">
      <p className="text-xs text-saju-cream/40">{detectedCount}개 감지됨</p>
      <SalGuinList items={salItems} emptyLabel="감지된 살이 없습니다." />
    </div>
  );
}

export function getSalPreview(data: SalGuinAnalysis): string {
  const names = data.items.filter((i) => SAL_IDS.has(i.id) && i.detected).map((i) => i.name);
  return names.length > 0 ? names.join(", ") : "감지된 살 없음";
}

export function getSalBadge(data: SalGuinAnalysis): string | undefined {
  const count = data.items.filter((i) => SAL_IDS.has(i.id) && i.detected).length;
  return count > 0 ? `${count}개` : undefined;
}
