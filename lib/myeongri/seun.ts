import {
  BRANCH_ELEMENTS,
  EARTHLY_BRANCHES,
  HEAVENLY_STEMS,
  STEM_ELEMENTS,
} from "./constants";
import type { SeunResult } from "./types";

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function yearPillar(year: number) {
  const stemIdx = mod(year - 4, 10);
  const branchIdx = mod(year - 4, 12);
  const stem = HEAVENLY_STEMS[stemIdx];
  const branch = EARTHLY_BRANCHES[branchIdx];
  return {
    stem,
    branch,
    pillar: `${stem}${branch}`,
    stemElement: STEM_ELEMENTS[stem],
    branchElement: BRANCH_ELEMENTS[branch],
  };
}

export function computeSeun(birthYear: number, range = 5): SeunResult {
  const currentCalendarYear = new Date().getFullYear();
  const start = currentCalendarYear - 2;
  const items = [];

  for (let y = start; y < start + range; y++) {
    const p = yearPillar(y);
    items.push({
      year: y,
      age: y - birthYear,
      ...p,
    });
  }

  const currentYear =
    items.find((it) => it.year === currentCalendarYear) ?? items[2];

  return {
    birthYear,
    items,
    currentYear,
    summary: `${currentCalendarYear}년 세운은 ${currentYear.pillar}(${currentYear.stemElement}·${currentYear.branchElement})입니다.`,
  };
}
