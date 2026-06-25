import {
  EARTHLY_BRANCHES,
  SOLAR_TERMS,
  SOLAR_TERM_MONTH_BRANCH,
} from "./constants";
import type { Branch } from "./constants";
import type { ManseryeokResult } from "./types";

function toDateKey(year: number, month: number, day: number): number {
  return year * 10000 + month * 100 + day;
}

/** 절기 기준 월지 인덱스 (0=寅 … 11=丑) */
export function getSolarMonthBranchIdx(
  year: number,
  month: number,
  day: number
): { branchIdx: number; termName: string; yearForPillar: number } {
  const dateKey = toDateKey(year, month, day);
  const ipchun = toDateKey(year, 2, 4);

  let termIdx = 11;
  let termName = "소한";

  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    const term = SOLAR_TERMS[i];
    const termYear = term.month === 1 ? year + 1 : year;
    const key = toDateKey(termYear, term.month, term.day);
    if (dateKey >= key) {
      termIdx = i;
      termName = term.name;
    }
  }

  const branchIdx = termIdx;
  const yearForPillar = dateKey < ipchun ? year - 1 : year;

  return {
    branchIdx,
    termName,
    yearForPillar,
  };
}

export function getMonthBranch(
  year: number,
  month: number,
  day: number
): Branch {
  const { branchIdx } = getSolarMonthBranchIdx(year, month, day);
  return SOLAR_TERM_MONTH_BRANCH[branchIdx];
}

/** 시지 (23~01 자시부터 2시간 단위) */
export function getHourBranchIdx(hour: number): number {
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

export function computeManseryeok(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  isLunar?: boolean
): ManseryeokResult {
  const { branchIdx, termName, yearForPillar } = getSolarMonthBranchIdx(
    year,
    month,
    day
  );
  const hourBranchIdx = getHourBranchIdx(hour);
  const ipchunKey = toDateKey(year, 2, 4);
  const dateKey = toDateKey(year, month, day);

  return {
    solarDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`,
    lunarNote: isLunar
      ? "음력 입력 — 양력 변환 없이 절기 기준으로 계산 (정밀 음력 변환은 추후 확장)"
      : "양력 기준 절기 만세력",
    yearForPillar,
    monthBranchIdx: branchIdx,
    monthBranch: SOLAR_TERM_MONTH_BRANCH[branchIdx],
    solarTermName: termName,
    hourBranchIdx,
    hourBranch: EARTHLY_BRANCHES[hourBranchIdx],
    isBeforeIpchun: dateKey < ipchunKey,
  };
}

/** 다음/이전 절기까지 일수 (대운 시작 나이용) */
export function daysToNearestSolarTerm(
  year: number,
  month: number,
  day: number,
  forward: boolean
): number {
  const birth = new Date(year, month - 1, day);
  const candidates: Date[] = [];

  for (let y = year - 1; y <= year + 1; y++) {
    for (const term of SOLAR_TERMS) {
      const termYear = term.month === 1 ? y + 1 : y;
      candidates.push(new Date(termYear, term.month - 1, term.day));
    }
  }

  candidates.sort((a, b) => a.getTime() - b.getTime());

  if (forward) {
    const next = candidates.find((d) => d.getTime() > birth.getTime());
    if (!next) return 3;
    return Math.max(1, Math.round((next.getTime() - birth.getTime()) / 86400000));
  }

  const prev = [...candidates].reverse().find((d) => d.getTime() < birth.getTime());
  if (!prev) return 3;
  return Math.max(1, Math.round((birth.getTime() - prev.getTime()) / 86400000));
}
