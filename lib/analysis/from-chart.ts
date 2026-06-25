import type { Element, SajuResult } from "@/lib/types";
import type { MyeongriChart } from "@/lib/myeongri/types";
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

function mapWonkuk(chart: MyeongriChart): WonkukAnalysis {
  const labels = ["년주", "월주", "일주", "시주"];
  const cells = [
    chart.pillars.year,
    chart.pillars.month,
    chart.pillars.day,
    chart.pillars.hour,
  ];

  return {
    pillars: cells.map((cell, i) => ({
      label: labels[i],
      stem: {
        char: cell.stem,
        element: STEM_ELEMENTS[cell.stem] as Element,
      },
      branch: {
        char: cell.branch,
        element: BRANCH_ELEMENTS[cell.branch] as Element,
      },
    })),
  };
}

function mapOhaeng(chart: MyeongriChart): OhaengAnalysis {
  const counts: Record<Element, number> = {
    목: 0,
    화: 0,
    토: 0,
    금: 0,
    수: 0,
  };

  for (const c of chart.ohaeng.counts) {
    counts[c.element as Element] = Math.round(c.count);
  }

  const abundant = chart.ohaeng.counts
    .filter((c) => c.percent >= 22)
    .map((c) => c.element as Element);

  return {
    counts,
    abundant,
    lacking: chart.ohaeng.lacking as Element[],
    summary: chart.ohaeng.balance,
    easyExplanation: `가장 강한 오행은 ${chart.ohaeng.dominant}입니다. ${chart.ohaeng.balance}`,
  };
}

function mapSipsung(chart: MyeongriChart): SipsungAnalysis {
  const items = chart.sipsung.items.map((item) => ({
    name: item.name as SipsungName,
    count: Math.round(item.count),
    meaning: SIPSUNG_MEANINGS[item.name as SipsungName],
    present: item.count > 0,
  }));

  const strong = chart.sipsung.dominant as SipsungName[];
  const weak = items.filter((i) => !i.present).map((i) => i.name);

  return {
    items,
    strong,
    weak,
    summary: chart.sipsung.summary,
  };
}

function mapSinStrength(chart: MyeongriChart): SinStrengthAnalysis {
  const y = chart.yongsin;
  const type = y.strength;

  const personality =
    type === "신강"
      ? "자기 주관이 뚜렷하고 추진력이 강합니다."
      : type === "신약"
        ? "섬세하고 주변 환경의 영향을 잘 받습니다."
        : "상황에 따라 유연하게 대처하는 편입니다.";

  return {
    type,
    score: y.strengthScore,
    personality,
    work:
      type === "신강"
        ? "리더십·독립적 업무에 강점이 있습니다."
        : "협업·전문성 심화에 강점이 있습니다.",
    money:
      type === "신강"
        ? "적극적 투자·사업 확장 기회를 잘 잡을 수 있습니다."
        : "꾸준한 저축·안정적 수입 구조가 유리합니다.",
    relationship:
      type === "신강"
        ? "주도적이나 상대의 의견도 들어주면 관계가 좋아집니다."
        : "배려심이 깊어 인연이 오래갑니다.",
    summary: y.reasoning,
  };
}

function mapSalGuin(chart: MyeongriChart): SalGuinAnalysis {
  const detectedNames = new Set(chart.sinsal.items.map((i) => i.name));

  const catalog = [
    { id: "dohwa", name: "도화살" },
    { id: "yeokma", name: "역마살" },
    { id: "cheonui", name: "천을귀인" },
    { id: "hwagae", name: "화개살" },
  ];

  const items = catalog.map((c) => {
    const found = chart.sinsal.items.find((i) => i.name === c.name);
    const detected = detectedNames.has(c.name);
    return {
      id: c.id,
      name: c.name,
      detected,
      reason: found?.basis ?? `${c.name} 해당 조건 미충족`,
      goodPoints: found?.description ?? "해당 신살이 검출되지 않았습니다.",
      caution: detected ? "과하면 균형을 해칠 수 있으니 조절이 필요합니다." : "-",
      realistic: found?.description ?? "현재 사주에서 두드러지지 않습니다.",
    };
  });

  return {
    items,
    detectedCount: items.filter((i) => i.detected).length,
  };
}

function mapDaeun(chart: MyeongriChart): DaeunAnalysis {
  return {
    direction: `${chart.daeun.direction} 대운`,
    periods: chart.daeun.periods.map((p, i) => {
      const keyword = DAEUN_KEYWORDS[i % DAEUN_KEYWORDS.length];
      return {
        startAge: p.startAge,
        endAge: p.endAge,
        stem: p.stem,
        branch: p.branch,
        keyword,
        money: `${p.stem}${p.branch} 대운 — ${keyword} 시기의 재물 흐름입니다.`,
        career: `${p.stemElement}·${p.branchElement} 기운이 직업운에 반영됩니다.`,
        love: `${keyword} 테마가 인연에도 영향을 줍니다.`,
        health: "대운 전환기에는 컨디션 관리에 신경 쓰세요.",
      };
    }),
    summary: chart.daeun.summary,
  };
}

function mapSeun(chart: MyeongriChart): SeunAnalysis {
  return {
    years: chart.seun.items.map((s, i) => {
      const keyword = SEUN_KEYWORDS[i % SEUN_KEYWORDS.length];
      return {
        year: s.year,
        label: `${s.pillar}(${s.stemElement}·${s.branchElement})`,
        keyword,
        overall: `${s.year}년 세운 ${s.pillar} — ${keyword}의 해입니다.`,
        money: `${s.stemElement} 기운이 재물 흐름에 영향을 줍니다.`,
        love: `${s.branchElement} 기운이 인연·관계에 작용합니다.`,
        career: `${keyword} 키워드로 직업·사업을 계획해 보세요.`,
        health: "세운 변화에 맞춰 생활 리듬을 조절하세요.",
      };
    }),
    summary: chart.seun.summary,
  };
}

/** 명리 엔진 JSON → UI 분석 모델 */
export function generateFullAnalysisFromChart(
  chart: MyeongriChart,
  result: SajuResult
): FullAnalysis {
  return {
    wonkuk: mapWonkuk(chart),
    ohaeng: mapOhaeng(chart),
    sipsung: mapSipsung(chart),
    sinStrength: mapSinStrength(chart),
    salGuin: mapSalGuin(chart),
    hyungchung: analyzeHyungchung(result),
    daeun: mapDaeun(chart),
    seun: mapSeun(chart),
  };
}
