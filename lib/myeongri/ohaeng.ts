import type { Element } from "@/lib/types";
import {
  BRANCH_ELEMENTS,
  HIDDEN_STEMS,
  STEM_ELEMENTS,
} from "./constants";
import type { Branch, Stem } from "./constants";
import type { FourPillarsResult, OhaengResult } from "./types";

const ELEMENTS: Element[] = ["목", "화", "토", "금", "수"];

export function computeOhaeng(pillars: FourPillarsResult): OhaengResult {
  const tally: Record<Element, { count: number; sources: string[] }> = {
    목: { count: 0, sources: [] },
    화: { count: 0, sources: [] },
    토: { count: 0, sources: [] },
    금: { count: 0, sources: [] },
    수: { count: 0, sources: [] },
  };

  const add = (el: Element, label: string, weight = 1) => {
    tally[el].count += weight;
    tally[el].sources.push(label);
  };

  const pillarNames = ["년", "월", "일", "시"] as const;
  const cells = [pillars.year, pillars.month, pillars.day, pillars.hour];

  cells.forEach((cell, i) => {
    const p = pillarNames[i];
    add(STEM_ELEMENTS[cell.stem as Stem], `${p}간 ${cell.stem}`);
    add(BRANCH_ELEMENTS[cell.branch as Branch], `${p}지 ${cell.branch}`);
    const hidden = HIDDEN_STEMS[cell.branch as Branch];
    hidden.forEach((hs, hi) => {
      const w = hi === 0 ? 0.6 : 0.2;
      add(STEM_ELEMENTS[hs], `${p}지장간 ${hs}`, w);
    });
  });

  const total = ELEMENTS.reduce((s, e) => s + tally[e].count, 0);

  const counts = ELEMENTS.map((element) => ({
    element,
    count: Math.round(tally[element].count * 10) / 10,
    percent: total > 0 ? Math.round((tally[element].count / total) * 1000) / 10 : 0,
    sources: tally[element].sources,
  }));

  const sorted = [...counts].sort((a, b) => b.count - a.count);
  const dominant = sorted[0]?.element ?? "토";
  const avg = total / 5;
  const lacking = counts.filter((c) => c.count < avg * 0.5).map((c) => c.element);

  const balance =
    lacking.length === 0
      ? "오행이 비교적 고르게 분포합니다."
      : `${lacking.join(", ")} 기운이 상대적으로 약합니다.`;

  return { counts, dominant, lacking, balance };
}
