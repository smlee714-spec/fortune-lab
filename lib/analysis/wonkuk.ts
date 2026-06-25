import { BRANCH_ELEMENTS, STEM_ELEMENTS } from "../saju";
import type { SajuResult } from "../types";
import type { WonkukAnalysis, WonkukPillar } from "./types";

const PILLAR_LABELS = [
  { key: "hour" as const, label: "시주" },
  { key: "day" as const, label: "일주" },
  { key: "month" as const, label: "월주" },
  { key: "year" as const, label: "년주" },
];

export function analyzeWonkuk(result: SajuResult): WonkukAnalysis {
  const pillars: WonkukPillar[] = PILLAR_LABELS.map(({ key, label }) => {
    const pillar = result[key];
    return {
      label,
      stem: { char: pillar.stem, element: STEM_ELEMENTS[pillar.stem] },
      branch: { char: pillar.branch, element: BRANCH_ELEMENTS[pillar.branch] },
    };
  });

  return { pillars };
}
