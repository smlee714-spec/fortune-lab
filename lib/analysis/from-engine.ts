import type { Element, SajuResult } from "@/lib/types";
import type { SajuEngineResult } from "@/lib/saju-engine";
import { STEM_ELEMENTS, BRANCH_ELEMENTS } from "@/lib/saju-meta";
import { analyzeHyungchung } from "./hyungchung";
import type {
  DaeunAnalysis,
  FullAnalysis,
  OhaengAnalysis,
  SalGuinAnalysis,
  SeunAnalysis,
  SinStrengthAnalysis,
  SipsungAnalysis,
  SipsungName,
  WonkukAnalysis,
} from "./types";
import { SIPSUNG_MEANINGS } from "./types";

const DAEUN_KEYWORDS = [
  "학습·성장",
  "도전·변화",
  "안정·축적",
  "확장·인연",
  "전환·정리",
  "발전·명예",
  "휴식·재정비",
  "도약·기회",
  "결실·수확",
  "정리·내실",
];

const SEUN_KEYWORDS = [
  "새 출발",
  "인연·확장",
  "변화·도전",
  "안정·축적",
  "성장·학습",
];

function mapWonkuk(engine: SajuEngineResult): WonkukAnalysis {
  const labels = ["년주", "월주", "일주", "시주"];
  const cells = [
    engine.yearPillar,
    engine.monthPillar,
    engine.dayPillar,
    engine.hourPillar,
  ];

  return {
    pillars: cells.map((cell, i) => ({
      label: labels[i],
      stem: {
        char: cell.stem.value,
        element: STEM_ELEMENTS[cell.stem.value] as Element,
      },
      branch: {
        char: cell.branch.value,
        element: BRANCH_ELEMENTS[cell.branch.value] as Element,
      },
    })),
  };
}

function mapOhaeng(engine: SajuEngineResult): OhaengAnalysis {
  const counts: Record<Element, number> = {
    목: 0,
    화: 0,
    토: 0,
    금: 0,
    수: 0,
  };

  for (const item of engine.fiveElements.items) {
    counts[item.element.value as Element] = item.count;
  }

  const abundant = engine.fiveElements.items
    .filter((i) => i.percent >= 22)
    .map((i) => i.element.value as Element);

  const lacking = engine.fiveElements.items
    .filter((i) => i.count === 0)
    .map((i) => i.element.value as Element);

  return {
    counts,
    abundant,
    lacking,
    summary: engine.fiveElements.summary,
    easyExplanation: engine.fiveElements.dominant
      ? engine.fiveElements.dominant.easy
      : engine.fiveElements.summary,
  };
}

function mapSipsung(engine: SajuEngineResult): SipsungAnalysis {
  const counts = engine.tenGods.counts?.value ?? {};
  const names = Object.keys(SIPSUNG_MEANINGS) as SipsungName[];

  const items = names.map((name) => ({
    name,
    count: Math.round(counts[name] ?? 0),
    meaning: SIPSUNG_MEANINGS[name],
    present: (counts[name] ?? 0) > 0,
  }));

  const strong = items
    .filter((i) => i.present)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((i) => i.name);

  const weak = items.filter((i) => !i.present).map((i) => i.name);

  return {
    items,
    strong,
    weak,
    summary: engine.tenGods.summary,
  };
}

function mapSinStrength(engine: SajuEngineResult): SinStrengthAnalysis {
  return {
    type: "중화",
    score: 0,
    personality: engine.dayMaster.easySummary,
    work: "추후 계산 — 용신·신강신약은 별도 엔진에서 제공 예정",
    money: engine.fiveElements.dominant?.easy ?? engine.fiveElements.summary,
    relationship: engine.combinations.summary,
    summary: `${engine.dayMaster.easySummary} ${engine.fiveElements.summary}`,
  };
}

function mapSalGuin(engine: SajuEngineResult): SalGuinAnalysis {
  const auspicious = engine.stars.calendarAuspicious?.value ?? [];
  const inauspicious = engine.stars.calendarInauspicious?.value ?? [];

  const items = [
    {
      id: "calendar-ji",
      name: "일진 길신",
      detected: auspicious.length > 0,
      reason: engine.stars.calendarAuspicious?.term ?? "일진 길신",
      goodPoints: auspicious.join(", ") || "해당 없음",
      caution: "-",
      realistic: engine.stars.calendarAuspicious?.easy ?? "만세력 제공 길신",
    },
    {
      id: "calendar-xiong",
      name: "일진 흉살",
      detected: inauspicious.length > 0,
      reason: engine.stars.calendarInauspicious?.term ?? "일진 흉살",
      goodPoints: "-",
      caution: inauspicious.join(", ") || "해당 없음",
      realistic: engine.stars.calendarInauspicious?.easy ?? "만세력 제공 흉살",
    },
    {
      id: "bazi-stars",
      name: "사주 신살",
      detected: false,
      reason: "추후 계산",
      goodPoints: "-",
      caution: "-",
      realistic: engine.stars.note,
    },
  ];

  return {
    items,
    detectedCount: items.filter((i) => i.detected).length,
  };
}

function mapDaeun(engine: SajuEngineResult): DaeunAnalysis {
  return {
    direction: `${engine.luckCycles.direction.value} 대운`,
    periods: engine.luckCycles.items.map((p, i) => {
      const keyword = DAEUN_KEYWORDS[i % DAEUN_KEYWORDS.length];
      const stem = p.pillar.value[0] ?? "";
      const branch = p.pillar.value[1] ?? "";
      return {
        startAge: p.startAge,
        endAge: p.endAge,
        stem,
        branch,
        keyword,
        money: p.pillar.easy,
        career: `${keyword} — ${engine.luckCycles.direction.easy}`,
        love: p.pillar.easy,
        health: "대운 전환기에는 컨디션 관리에 신경 쓰세요.",
      };
    }),
    summary: engine.luckCycles.summary,
  };
}

function mapSeun(engine: SajuEngineResult): SeunAnalysis {
  return {
    years: engine.yearLuck.items.map((s, i) => {
      const keyword = SEUN_KEYWORDS[i % SEUN_KEYWORDS.length];
      return {
        year: s.year,
        label: s.pillar.value,
        keyword,
        overall: s.pillar.easy,
        money: s.pillar.easy,
        love: s.pillar.easy,
        career: `${keyword} 키워드의 해입니다.`,
        health: "세운 변화에 맞춰 생활 리듬을 조절하세요.",
      };
    }),
    summary: engine.yearLuck.summary,
  };
}

export function generateFullAnalysisFromEngine(
  engine: SajuEngineResult,
  result: SajuResult
): FullAnalysis {
  return {
    wonkuk: mapWonkuk(engine),
    ohaeng: mapOhaeng(engine),
    sipsung: mapSipsung(engine),
    sinStrength: mapSinStrength(engine),
    salGuin: mapSalGuin(engine),
    hyungchung: analyzeHyungchung(result),
    daeun: mapDaeun(engine),
    seun: mapSeun(engine),
  };
}
