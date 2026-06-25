import type { SajuResult } from "../types";
import type { SeunAnalysis, SeunYearItem } from "./types";

const KEYWORDS = ["정리", "도약", "확장", "안정", "변화", "성장", "휴식", "기회"];

function buildYearItem(
  year: number,
  label: string,
  seed: number,
  dayStemIdx: number
): SeunYearItem {
  const keyword = KEYWORDS[(seed + dayStemIdx + year) % KEYWORDS.length];
  const tone = seed % 3;

  const tones = [
    {
      overall: `${year}년은 ${keyword}의 해입니다. 큰 그림을 그리기 좋은 시기입니다.`,
      money: "수입보다 지출 관리가 중요합니다. 꾸준한 저축이 도움이 됩니다.",
      love: "새로운 만남보다 기존 관계를 다독이기 좋은 해입니다.",
      career: "현재 위치에서 실력을 쌓는 것이 유리합니다.",
      health: "규칙적인 수면과 식사가 컨디션을 지킵니다.",
    },
    {
      overall: `${year}년은 ${keyword}과 기회가 함께하는 해입니다. 적극적인 시도가 긍정적입니다.`,
      money: "부수입·투자 기회가 생길 수 있습니다. 정보 수집 후 결정하세요.",
      love: "적극적인 표현이 관계를 발전시킵니다.",
      career: "이직·승진·새 프로젝트에 도전하기 좋습니다.",
      health: "활동량을 늘리되, 과로는 피하세요.",
    },
    {
      overall: `${year}년은 ${keyword}과 균형이 핵심인 해입니다. 급하지 않게 한 걸음씩 나아가세요.`,
      money: "큰 지출 결정은 상반기보다 하반기가 유리할 수 있습니다.",
      love: "서로의 속도를 맞추면 관계가 깊어집니다.",
      career: "협업·네트워킹이 성과로 이어집니다.",
      health: "스트레칭·가벼운 운동으로 긴장을 풀어주세요.",
    },
  ];

  return {
    year,
    label,
    keyword,
    ...tones[tone],
  };
}

/** 세운 — 올해·내년·3년치 샘플 분석 */
export function analyzeSeun(result: SajuResult, baseYear = new Date().getFullYear()): SeunAnalysis {
  const seed = result.day.stemIdx * 7 + result.day.branchIdx * 3;

  const years: SeunYearItem[] = [
    buildYearItem(baseYear, "올해", seed, result.day.stemIdx),
    buildYearItem(baseYear + 1, "내년", seed + 1, result.day.stemIdx),
    buildYearItem(baseYear + 2, "후년", seed + 2, result.day.stemIdx),
  ];

  return {
    years,
    summary: `${baseYear}~${baseYear + 2}년 3년간의 흐름입니다. 매년 테마가 다르니, 해당 연도의 키워드를 참고해 계획을 세우세요.`,
  };
}
