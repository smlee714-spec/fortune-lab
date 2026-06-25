import type { SajuResult } from "../types";
import type { SipsungAnalysis, SipsungItem, SipsungName } from "./types";
import { SIPSUNG_MEANINGS } from "./types";

const ALL_SIPSUNG: SipsungName[] = [
  "비견",
  "겁재",
  "식신",
  "상관",
  "편재",
  "정재",
  "편관",
  "정관",
  "편인",
  "정인",
];

/** 일간 기준 천간 → 십성 매핑 (샘플: 10간 순환 테이블) */
const SIPSUNG_TABLE: SipsungName[][] = [
  ["비견", "겁재", "식신", "상관", "편재", "정재", "편관", "정관", "편인", "정인"],
  ["겁재", "비견", "상관", "식신", "정재", "편재", "정관", "편관", "정인", "편인"],
  ["편인", "정인", "비견", "겁재", "식신", "상관", "편재", "정재", "편관", "정관"],
  ["정인", "편인", "겁재", "비견", "상관", "식신", "정재", "편재", "정관", "편관"],
  ["편관", "정관", "편인", "정인", "비견", "겁재", "식신", "상관", "편재", "정재"],
  ["정관", "편관", "정인", "편인", "겁재", "비견", "상관", "식신", "정재", "편재"],
  ["편재", "정재", "편관", "정관", "편인", "정인", "비견", "겁재", "식신", "상관"],
  ["정재", "편재", "정관", "편관", "정인", "편인", "겁재", "비견", "상관", "식신"],
  ["식신", "상관", "편재", "정재", "편관", "정관", "편인", "정인", "비견", "겁재"],
  ["상관", "식신", "정재", "편재", "정관", "편관", "정인", "편인", "겁재", "비견"],
];

export function analyzeSipsung(result: SajuResult): SipsungAnalysis {
  const dayStemIdx = result.day.stemIdx;
  const table = SIPSUNG_TABLE[dayStemIdx];
  const counts: Record<SipsungName, number> = {
    비견: 0,
    겁재: 0,
    식신: 0,
    상관: 0,
    편재: 0,
    정재: 0,
    편관: 0,
    정관: 0,
    편인: 0,
    정인: 0,
  };

  const stems = [
    result.year.stemIdx,
    result.month.stemIdx,
    result.day.stemIdx,
    result.hour.stemIdx,
  ];

  for (const stemIdx of stems) {
    const name = table[stemIdx];
    counts[name]++;
  }

  const items: SipsungItem[] = ALL_SIPSUNG.map((name) => ({
    name,
    count: counts[name],
    meaning: SIPSUNG_MEANINGS[name],
    present: counts[name] > 0,
  }));

  const sorted = [...items].sort((a, b) => b.count - a.count);
  const strong = sorted.filter((i) => i.count >= 2).map((i) => i.name);
  const weak = sorted.filter((i) => i.count === 0).map((i) => i.name);

  return {
    items,
    strong: strong.length > 0 ? strong : [sorted[0].name],
    weak: weak.length > 0 ? weak.slice(0, 3) : [sorted[sorted.length - 1].name],
    summary: `강한 십성: ${(strong.length > 0 ? strong : [sorted[0].name]).join(", ")} · 부족한 십성: ${(weak.length > 0 ? weak.slice(0, 3) : [sorted[sorted.length - 1].name]).join(", ")}`,
  };
}
