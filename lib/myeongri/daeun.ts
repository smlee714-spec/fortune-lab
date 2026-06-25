import {
  BRANCH_ELEMENTS,
  EARTHLY_BRANCHES,
  HEAVENLY_STEMS,
  STEM_ELEMENTS,
} from "./constants";
import { daysToNearestSolarTerm } from "./manseryeok";
import type { DaeunPeriod, DaeunResult, FourPillarsResult, MyeongriInput } from "./types";

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function computeDaeun(
  input: MyeongriInput,
  pillars: FourPillarsResult
): DaeunResult {
  const { gender, year, month, day } = input;
  const yearStemYang = pillars.year.stemIdx % 2 === 0;
  const forward =
    (gender === "male" && yearStemYang) ||
    (gender === "female" && !yearStemYang);

  const days = daysToNearestSolarTerm(year, month, day, forward);
  const startAge = Math.max(1, Math.round(days / 3));

  let stemIdx = pillars.month.stemIdx;
  let branchIdx = pillars.month.branchIdx;

  const periods: DaeunPeriod[] = [];

  for (let i = 0; i < 10; i++) {
    if (forward) {
      stemIdx = mod(stemIdx + 1, 10);
      branchIdx = mod(branchIdx + 1, 12);
    } else {
      stemIdx = mod(stemIdx - 1, 10);
      branchIdx = mod(branchIdx - 1, 12);
    }

    const stem = HEAVENLY_STEMS[stemIdx];
    const branch = EARTHLY_BRANCHES[branchIdx];
    const periodStart = startAge + i * 10;
    periods.push({
      index: i,
      startAge: periodStart,
      endAge: periodStart + 9,
      stem,
      branch,
      stemElement: STEM_ELEMENTS[stem],
      branchElement: BRANCH_ELEMENTS[branch],
    });
  }

  const currentAge = new Date().getFullYear() - year;
  const currentPeriodIndex = periods.findIndex(
    (p) => currentAge >= p.startAge && currentAge <= p.endAge
  );

  return {
    direction: forward ? "순행" : "역행",
    startAge,
    periods,
    currentPeriodIndex: currentPeriodIndex >= 0 ? currentPeriodIndex : null,
    summary: `${forward ? "순행" : "역행"} 대운, ${startAge}세부터 시작. 현재 ${currentAge}세.`,
  };
}
