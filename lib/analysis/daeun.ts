import type { SajuResult } from "../types";
import type { DaeunAnalysis, DaeunPeriod } from "./types";

const HEAVENLY_STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const EARTHLY_BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];

const KEYWORDS = [
  "학습·성장",
  "도전·변화",
  "안정·축적",
  "확장·인연",
  "전환·정리",
  "발전·명예",
  "휴식·재정비",
  "도약·기회",
];

function buildPeriod(
  startAge: number,
  stemIdx: number,
  branchIdx: number,
  keywordIdx: number
): DaeunPeriod {
  const stem = HEAVENLY_STEMS[stemIdx];
  const branch = EARTHLY_BRANCHES[branchIdx];
  const keyword = KEYWORDS[keywordIdx % KEYWORDS.length];

  return {
    startAge,
    endAge: startAge + 9,
    stem,
    branch,
    keyword,
    money: `${keyword} 시기로 ${startAge}~${startAge + 9}세에 재물 흐름이 ${keywordIdx % 2 === 0 ? "점진적으로 좋아지는" : "변동이 있으나 기회도 있는"} 편입니다.`,
    career: `직업·사업에서 ${keyword} 테마가 두드러집니다. 새로운 시도를 검토하기 좋은 구간입니다.`,
    love: `인연운이 ${keywordIdx % 3 === 0 ? "활발" : "안정"} 합니다. ${startAge + 2}~${startAge + 6}세 전후가 관계의 전환점이 될 수 있습니다.`,
    health: `컨디션 관리가 중요한 시기입니다. 무리한 확장보다 균형 잡힌 생활이 도움이 됩니다.`,
  };
}

/** 대운 — 샘플 8개 10년 주기 (추후 정밀 만세력 로직 교체) */
export function analyzeDaeun(result: SajuResult): DaeunAnalysis {
  const { gender, year } = result.birthInfo;
  const isForward = (result.year.stemIdx % 2 === 0 && gender === "male") ||
    (result.year.stemIdx % 2 !== 0 && gender === "female");

  const direction = isForward ? "순행 (앞으로 진행)" : "역행 (거슬러 올라감)";
  const startAge = gender === "male" ? 8 : 6;
  let stemIdx = result.month.stemIdx;
  let branchIdx = result.month.branchIdx;

  const periods: DaeunPeriod[] = [];

  for (let i = 0; i < 8; i++) {
    periods.push(
      buildPeriod(
        startAge + i * 10,
        ((stemIdx % 10) + 10) % 10,
        ((branchIdx % 12) + 12) % 12,
        i
      )
    );
    if (isForward) {
      stemIdx++;
      branchIdx++;
    } else {
      stemIdx--;
      branchIdx--;
    }
  }

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - year;

  return {
    direction,
    periods,
    summary: `현재 ${currentAge}세 기준, ${direction} 대운이 적용됩니다. 10년 단위로 큰 흐름이 바뀌며, 각 구간의 키워드를 참고해 계획을 세우세요.`,
  };
}
