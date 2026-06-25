import {
  BRANCH_ELEMENTS,
  EARTHLY_BRANCHES,
  HEAVENLY_STEMS,
  SOLAR_TERMS,
  STEM_ELEMENTS,
} from "./constants";
import { getSolarMonthBranchIdx } from "./manseryeok";
import type { WolunMonth, WolunResult } from "./types";

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function monthPillar(year: number, monthBranchIdx: number) {
  const yearStemIdx = mod(year - 4, 10);
  const branchIdx = mod(monthBranchIdx + 2, 12);
  const baseStem = mod((yearStemIdx % 5) * 2 + 2, 10);
  const stemIdx = mod(baseStem + monthBranchIdx, 10);
  const stem = HEAVENLY_STEMS[stemIdx];
  const branch = EARTHLY_BRANCHES[branchIdx];
  return {
    stem,
    branch,
    pillar: `${stem}${branch}`,
    solarTerm: SOLAR_TERMS[monthBranchIdx]?.name ?? "",
  };
}

export function computeWolun(year?: number): WolunResult {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  const items: WolunMonth[] = [];

  for (let mi = 0; mi < 12; mi++) {
    const term = SOLAR_TERMS[mi];
    const termYear = term.month === 1 ? y + 1 : y;
    const p = monthPillar(y, mi);
    items.push({
      year: termYear,
      month: term.month,
      stem: p.stem,
      branch: p.branch,
      pillar: p.pillar,
      solarTerm: p.solarTerm,
    });
  }

  const { branchIdx, termName } = getSolarMonthBranchIdx(y, m, d);
  const current = monthPillar(y, branchIdx);

  const currentMonth: WolunMonth = {
    year: y,
    month: m,
    stem: current.stem,
    branch: current.branch,
    pillar: current.pillar,
    solarTerm: termName,
  };

  return {
    items,
    currentMonth,
    summary: `${y}년 ${m}월 월운은 ${current.pillar}(${STEM_ELEMENTS[current.stem]}·${BRANCH_ELEMENTS[current.branch]})입니다.`,
  };
}
