"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getDetectedHyungchung } from "@/lib/analysis";
import type { FullAnalysis } from "@/lib/analysis/types";
import { useSajuResult } from "@/hooks/useSajuResult";
import { getGuinPreview } from "@/components/analysis/GuinSection";
import { getSalPreview } from "@/components/analysis/SalSection";
import DaeunSection from "@/components/analysis/DaeunSection";
import GuinSection from "@/components/analysis/GuinSection";
import HyungchungSection from "@/components/analysis/HyungchungSection";
import OhaengSection from "@/components/analysis/OhaengSection";
import SalSection from "@/components/analysis/SalSection";
import SeunSection from "@/components/analysis/SeunSection";
import SinStrengthSection from "@/components/analysis/SinStrengthSection";
import SipsungSection from "@/components/analysis/SipsungSection";
import WonkukSection from "@/components/analysis/WonkukSection";
import {
  buildResultPath,
  getMenuItem,
  isValidSection,
  type ResultSection,
} from "@/lib/result-routes";
import type { SajuResult } from "@/lib/types";
import DetailPageLayout, {
  DetailContentCard,
  DetailSummaryCard,
} from "./DetailPageLayout";
import ResultLoading from "./ResultLoading";

interface ResultDetailViewProps {
  section: string;
}

export default function ResultDetailView({ section }: ResultDetailViewProps) {
  const router = useRouter();
  const { params, result, analysis, isReady } = useSajuResult();

  useEffect(() => {
    if (!isValidSection(section)) {
      if (params) router.replace(buildResultPath("/result", params));
      else router.replace("/");
    }
  }, [section, router, params]);

  if (!isValidSection(section)) {
    return <ResultLoading />;
  }

  if (!isReady || !params || !result || !analysis) {
    return <ResultLoading />;
  }

  const menu = getMenuItem(section);
  const summary = getSectionSummary(section, result, analysis);

  return (
    <DetailPageLayout
      title={menu.title}
      technicalTitle={menu.technicalTitle}
      termGuide={menu.termGuide}
      params={params}
    >
      <DetailSummaryCard>{summary}</DetailSummaryCard>
      <DetailContentCard title="내 사주 분석">
        {renderSectionContent(section, analysis)}
      </DetailContentCard>
    </DetailPageLayout>
  );
}

function getSectionSummary(
  section: ResultSection,
  result: SajuResult,
  analysis: FullAnalysis
): string {
  const { hour, day, month, year } = result;
  const pillars = `${hour.stem}${hour.branch} · ${day.stem}${day.branch} · ${month.stem}${month.branch} · ${year.stem}${year.branch}`;

  switch (section) {
    case "basic":
      return `나의 사주 네 기둥은 ${pillars}입니다. 가운데 일주의 ${day.stem}이 나를 대표하며, ${analysis.wonkuk.pillars[1].stem.element}의 기운을 지녔습니다.`;
    case "elements":
      return analysis.ohaeng.easyExplanation;
    case "tengods":
      return `나에게 두드러진 십성은 ${analysis.sipsung.strong.join(", ")}입니다. ${analysis.sipsung.weak.length > 0 ? `보완하면 좋은 십성은 ${analysis.sipsung.weak.join(", ")}입니다.` : ""}`;
    case "strength":
      return `나는 ${analysis.sinStrength.type} 유형입니다. ${analysis.sinStrength.summary}`;
    case "stars": {
      const sal = getSalPreview(analysis.salGuin);
      const guin = getGuinPreview(analysis.salGuin);
      return `특별한 기운 — 살: ${sal} / 귀인: ${guin}`;
    }
    case "conflicts": {
      const detected = getDetectedHyungchung(analysis.hyungchung.items);
      return detected.length > 0
        ? `주의·변화 패턴이 ${detected.length}가지 감지되었습니다: ${detected.map((i) => i.label).join(", ")}`
        : "뚜렷한 충돌 패턴은 없어 비교적 안정적인 구조입니다.";
    }
    case "bigluck":
      return analysis.daeun.summary;
    case "yearluck":
      return analysis.seun.summary;
    default:
      return "";
  }
}

function renderSectionContent(section: ResultSection, analysis: FullAnalysis) {
  switch (section) {
    case "basic":
      return <WonkukSection data={analysis.wonkuk} />;
    case "elements":
      return <OhaengSection data={analysis.ohaeng} />;
    case "tengods":
      return <SipsungSection data={analysis.sipsung} />;
    case "strength":
      return <SinStrengthSection data={analysis.sinStrength} />;
    case "stars":
      return (
        <div className="space-y-8">
          <div>
            <h3 className="mb-2 font-serif text-sm font-semibold text-saju-gold">살 (殺)</h3>
            <p className="mb-4 text-xs leading-relaxed text-saju-cream/45">
              도화살, 역마살 등 나만의 특별한 기운입니다. 매력·변화·재능과 함께 주의할 점도 알려 줍니다.
            </p>
            <SalSection data={analysis.salGuin} />
          </div>
          <div>
            <h3 className="mb-2 font-serif text-sm font-semibold text-saju-gold">귀인 (貴人)</h3>
            <p className="mb-4 text-xs leading-relaxed text-saju-cream/45">
              천을귀인, 문창귀인 등 어려울 때 도움을 주는 좋은 기운입니다.
            </p>
            <GuinSection data={analysis.salGuin} />
          </div>
        </div>
      );
    case "conflicts":
      return <HyungchungSection data={analysis.hyungchung} />;
    case "bigluck":
      return <DaeunSection data={analysis.daeun} />;
    case "yearluck":
      return <SeunSection data={analysis.seun} />;
    default:
      return null;
  }
}
